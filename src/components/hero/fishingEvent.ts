import { gsap } from "@/lib/gsapConfig";
import type { FishController } from "./swimFish";
import { WATER_SURFACE_TOP_PERCENT, fishingEventConfig, randomBetween } from "./fishConfig";

interface FishingEventParams {
  container: HTMLElement;
  boatEl: HTMLElement;
  netEl: HTMLElement;
  /** Read lazily each time an event fires, so it always sees the current fish (post-resize, etc). */
  getFishControllers: () => FishController[];
}

/**
 * Schedules the periodic boat-and-net cinematic event and returns a cancel
 * function. Each firing builds its own short-lived GSAP timeline (boat in
 * -> net down -> nearby fish react/one or two are "caught" -> net up ->
 * boat out) and fully cleans itself up before the next one is scheduled —
 * nothing accumulates between events.
 */
export function scheduleFishingEvents(params: FishingEventParams): () => void {
  const { container, boatEl, netEl, getFishControllers } = params;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let activeTimeline: gsap.core.Timeline | null = null;
  let bobTween: gsap.core.Tween | null = null;
  let cancelled = false;

  function runEvent() {
    if (cancelled) return;

    // Keep these in sync with FishingBoat.tsx / FishingNet.tsx's rendered
    // dimensions — both wrappers are positioned from `left: 0`, so the net's
    // x has to be nudged to sit centered under the boat's hull, and the
    // boat's y has to be nudged so its hull (drawn flush with the bottom of
    // its SVG canvas) actually touches the water line instead of floating
    // above it.
    const boatWidth = 112;
    const boatDisplayHeight = 58;
    const netWidth = 70;
    const netBoatOffsetX = (boatWidth - netWidth) / 2;
    const waterlineOverlap = 4;

    const width = container.clientWidth;
    const fromLeft = Math.random() > 0.5;
    const surfaceY = (WATER_SURFACE_TOP_PERCENT / 100) * container.clientHeight;
    const startX = fromLeft ? -boatWidth - 10 : width + 20;
    const exitX = fromLeft ? width + 20 : -boatWidth - 10;
    const castX = width * randomBetween([0.35, 0.65]);
    const crossDuration = randomBetween([7, 10]);

    gsap.set(boatEl, {
      x: startX,
      y: surfaceY - boatDisplayHeight + waterlineOverlap,
      opacity: 1,
      scaleX: fromLeft ? 1 : -1,
    });
    gsap.set(netEl, { x: castX + netBoatOffsetX, y: surfaceY, opacity: 0 });
    gsap.set(netEl, { scaleY: 0 });

    bobTween = gsap.to(boatEl, {
      y: `+=4`,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const controllers = getFishControllers().filter((c) => c.cfg.layer !== "background");
    const shuffled = [...controllers].sort(() => Math.random() - 0.5);
    const evaders = shuffled.slice(0, 3);
    const caught = shuffled.slice(3, 3 + fishingEventConfig.fishAffected);

    const tl = gsap.timeline({
      onComplete: () => {
        bobTween?.kill();
        bobTween = null;
        activeTimeline = null;
        scheduleNext();
      },
    });
    activeTimeline = tl;

    tl.to(boatEl, { x: castX, duration: crossDuration * 0.45, ease: "power1.inOut" })
      .to(netEl, { opacity: 1, scaleY: 1, duration: 1.1, ease: "power2.out" }, "-=0.1")
      .call(() => evaders.forEach((f) => f.evade()))
      .to({}, { duration: 0.9 }) // brief dwell so the net reads as "in the water"
      .call(() => caught.forEach((f) => f.catchFish(crossDuration * 1000)))
      .to({}, { duration: 0.8 })
      .to(netEl, { opacity: 0, scaleY: 0, duration: 0.8, ease: "power1.in" })
      .to(boatEl, { x: exitX, duration: crossDuration * 0.55, ease: "power1.in" }, "-=0.2")
      .set(boatEl, { opacity: 0 });
  }

  function scheduleNext() {
    if (cancelled) return;
    timeoutId = setTimeout(runEvent, randomBetween(fishingEventConfig.interval));
  }

  timeoutId = setTimeout(runEvent, randomBetween(fishingEventConfig.initialDelay));

  return () => {
    cancelled = true;
    if (timeoutId) clearTimeout(timeoutId);
    bobTween?.kill();
    activeTimeline?.kill();
  };
}
