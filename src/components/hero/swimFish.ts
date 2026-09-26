import { gsap } from "@/lib/gsapConfig";
import type { FishInstanceConfig } from "./fishConfig";
import { LAYER_STYLE } from "./fishConfig";

export interface FishController {
  el: HTMLElement;
  cfg: FishInstanceConfig;
  /** Quick, safe "startled" reaction — speeds the fish up briefly and gives it a flinch, without touching its position tween. */
  evade: () => void;
  /** Fades the fish out (as if netted), pausing its swim, then quietly respawns it off-screen once the fishing event is over. */
  catchFish: (respawnDelayMs: number) => void;
}

/**
 * Builds (or rebuilds, on resize) the continuous swim loop for every fish
 * in the scene. Movement is a short multi-waypoint timeline rather than a
 * single straight tween, so each pass follows a gentle curve instead of a
 * flat line, with a slight whole-body rotation "banking" the fish into its
 * vertical drift. These are photographic fish (not SVG), so there's no
 * independently-animatable tail segment to flick — the curve + banking
 * rotation is the whole of the movement, deliberately not layering on
 * anything that would make a photo look like it's being puppeted.
 */
export function buildSwim(container: HTMLElement, isMobile: boolean): FishController[] {
  const fishEls = Array.from(container.querySelectorAll<HTMLElement>("[data-fish]"));
  const width = container.clientWidth;
  const controllers: FishController[] = [];
  let midgroundIndex = 0;

  fishEls.forEach((el) => {
    const cfg: FishInstanceConfig = JSON.parse(el.dataset.cfg ?? "null");
    if (!cfg) return;

    // Mobile keeps the hero spacious (3-5 fish) rather than a full desktop
    // cast: drop the background layer entirely (it reads as visual noise at
    // small sizes) and thin the midground by half, keeping every foreground
    // fish for a clear sense of depth.
    if (isMobile) {
      if (cfg.layer === "background") {
        gsap.killTweensOf(el);
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      if (cfg.layer === "midground") {
        const shouldHide = midgroundIndex % 2 === 1;
        midgroundIndex += 1;
        if (shouldHide) {
          gsap.killTweensOf(el);
          gsap.set(el, { autoAlpha: 0 });
          return;
        }
      }
    }

    const style = LAYER_STYLE[cfg.layer];

    gsap.killTweensOf(el);

    const travel = width * 0.7 + cfg.size * 2;
    const startX = cfg.direction === 1 ? -cfg.size * 1.5 : width + cfg.size * 1.5;
    const endX = cfg.direction === 1 ? startX + travel : startX - travel;
    // The photo asset's un-flipped (scaleX > 0) orientation faces RIGHT
    // (head on the image's right edge — see FishIllustration.tsx). Moving
    // right (direction === 1) needs no flip; moving left needs scaleX < 0.
    const facingFlip = cfg.direction === 1 ? 1 : -1;

    gsap.set(el, {
      x: startX,
      y: 0,
      rotation: 0,
      opacity: style.opacity,
      scaleX: style.scale * facingFlip,
      scaleY: style.scale,
    });

    // Main path: a handful of waypoints with alternating vertical offsets
    // traces a gentle S-curve rather than a straight line; "power1.inOut"
    // between waypoints reads as natural acceleration/deceleration.
    const amp = cfg.curveAmplitude;
    const tl = gsap.timeline({ repeat: -1, delay: cfg.delay });
    const steps = 4;
    for (let i = 1; i <= steps; i++) {
      const progress = i / steps;
      const x = gsap.utils.interpolate(startX, endX, progress);
      const wave = Math.sin(progress * Math.PI * 2) * amp;
      tl.to(el, {
        x,
        y: wave,
        rotation: wave * 0.4 * facingFlip,
        duration: cfg.duration / steps,
        ease: "power1.inOut",
      });
    }
    tl.set(el, { x: startX, y: 0, rotation: 0 });

    let evadeTween: gsap.core.Tween | null = null;

    controllers.push({
      el,
      cfg,
      evade: () => {
        if (tl.progress() >= 0.999 || !tl.isActive()) return;
        evadeTween?.kill();
        tl.timeScale(2.1);
        evadeTween = gsap.to(el, {
          scale: `+=${0.06}`,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
          onComplete: () => {
            gsap.delayedCall(0.6, () => tl.timeScale(1));
          },
        });
      },
      catchFish: (respawnDelayMs) => {
        tl.pause();
        // A brief upward drift-and-shrink, as if being drawn up toward the
        // net, then a gentle fade — not an instant disappearance.
        gsap.to(el, {
          y: "-=18",
          scale: `*=0.85`,
          duration: 0.5,
          ease: "power1.out",
        });
        gsap.to(el, { opacity: 0, duration: 0.6, delay: 0.4, ease: "power1.in" });
        gsap.delayedCall(respawnDelayMs / 1000, () => {
          gsap.set(el, { x: startX, y: 0, rotation: 0, scaleX: style.scale * facingFlip, scaleY: style.scale, opacity: style.opacity });
          tl.restart();
        });
      },
    });
  });

  return controllers;
}
