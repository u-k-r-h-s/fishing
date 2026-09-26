"use client";

import { useRef } from "react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsapConfig";
import { FishIllustration } from "./FishIllustration";
import { WaterSurface } from "./WaterSurface";
import { UnderwaterParticles } from "./UnderwaterParticles";
import { FishingBoat } from "./FishingBoat";
import { FishingNet } from "./FishingNet";
import { buildFishInstances, LAYER_STYLE, type FishInstanceConfig } from "./fishConfig";
import { buildSwim, type FishController } from "./swimFish";
import { scheduleFishingEvents } from "./fishingEvent";

/**
 * The site's signature visual: a layered underwater scene used as the
 * hero background — swimming fish (species drawn from the real catalogue,
 * see fishConfig.ts), ambient bubbles/caustics, and an occasional
 * cinematic fishing-boat-and-net event (fishingEvent.ts). Ambient effects
 * are CSS-driven for performance; fish movement, the boat, and the net are
 * GSAP-driven. Everything here sits behind the hero's text content in
 * stacking order, so it can never visually cover the headline/CTAs.
 */
export function UnderwaterScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const boatRef = useRef<HTMLDivElement>(null);
  const netRef = useRef<HTMLDivElement>(null);
  const controllersRef = useRef<FishController[]>([]);

  useIsomorphicLayoutEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const rebuild = () => {
        const isMobile = scene.clientWidth < 640;
        controllersRef.current = buildSwim(scene, isMobile);
      };
      rebuild();

      const ro = new ResizeObserver(rebuild);
      ro.observe(scene);

      // The fishing event needs a modest amount of width to read clearly
      // (boat crossing, net descending, fish reacting) — skip it on very
      // small viewports rather than cram a busy scene into a phone screen.
      let cancelFishingEvents: (() => void) | undefined;
      if (scene.clientWidth >= 480 && boatRef.current && netRef.current) {
        cancelFishingEvents = scheduleFishingEvents({
          container: scene,
          boatEl: boatRef.current,
          netEl: netRef.current,
          getFishControllers: () => controllersRef.current,
        });
      }

      // Subtle desktop-only pointer parallax per depth layer.
      const canHover = window.matchMedia("(pointer: fine)").matches;
      let onPointerMove: ((e: PointerEvent) => void) | undefined;

      if (canHover) {
        const quickSetters = Object.entries(layerRefs.current).map(([layer, el]) => {
          if (!el) return null;
          const depth = LAYER_STYLE[layer as FishInstanceConfig["layer"]].parallax;
          return {
            x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" }),
            y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" }),
            depth,
          };
        });

        onPointerMove = (e: PointerEvent) => {
          const rect = scene.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          quickSetters.forEach((setter) => {
            if (!setter) return;
            setter.x(relX * 24 * setter.depth);
            setter.y(relY * 14 * setter.depth);
          });
        };

        scene.addEventListener("pointermove", onPointerMove);
      }

      return () => {
        ro.disconnect();
        cancelFishingEvents?.();
        if (onPointerMove) scene.removeEventListener("pointermove", onPointerMove);
      };
    }, scene);

    return () => ctx.revert();
  }, []);

  // SSR/first paint always renders the full cast; real device width is measured
  // client-side in rebuild(), which thins out background-layer fish on mobile.
  const instances = buildFishInstances();

  return (
    <div
      ref={sceneRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#062A3A] via-[#0A3A4E] to-[#0F172A]"
    >
      {/* Caustic light blobs — CSS-only, cheap ambient movement */}
      <div className="absolute -left-1/4 top-0 h-[70%] w-1/2 animate-caustic-drift rounded-full bg-aqua/10 blur-3xl" />
      <div className="absolute -right-1/4 top-1/4 h-[60%] w-1/2 animate-caustic-drift-slow rounded-full bg-mint/10 blur-3xl" />

      <WaterSurface />

      {/* Fish layers, back to front */}
      {(["background", "midground", "foreground"] as const).map((layer) => (
        <div
          key={layer}
          ref={(el) => {
            layerRefs.current[layer] = el;
          }}
          className="absolute inset-0"
          style={{ zIndex: LAYER_STYLE[layer].z }}
        >
          {instances.map((cfg, i) =>
            cfg.layer !== layer ? null : (
              <div
                key={i}
                data-fish
                data-cfg={JSON.stringify(cfg)}
                className="absolute"
                style={{
                  top: `${cfg.top}%`,
                  width: cfg.size,
                  // Subtle underwater haze per depth layer — dimmer/less
                  // saturated (not blue-tinted) the further back a fish is,
                  // so a photographic cutout reads as "underwater" instead
                  // of a sticker pasted on the background.
                  filter: [
                    LAYER_STYLE[layer].blurPx ? `blur(${LAYER_STYLE[layer].blurPx}px)` : "",
                    `brightness(${LAYER_STYLE[layer].brightness})`,
                    `saturate(${LAYER_STYLE[layer].saturate})`,
                  ]
                    .filter(Boolean)
                    .join(" "),
                  willChange: "transform",
                }}
              >
                <FishIllustration species={cfg.species} className="w-full" />
              </div>
            )
          )}
        </div>
      ))}

      {/* Boat sits just above the fish layers; the net (below) bridges the two. */}
      <div className="absolute inset-0" style={{ zIndex: 4 }}>
        <FishingNet ref={netRef} />
        <FishingBoat ref={boatRef} />
      </div>

      <UnderwaterParticles />

      {/* Bottom scrim so foreground content stays legible */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#062A3A] to-transparent" />
    </div>
  );
}
