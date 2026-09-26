"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/getDictionary";

interface VideoPlayerProps {
  src: string;
  poster: string;
  title: string;
  dict: Dictionary;
  className?: string;
  /** Ambient style: muted autoplay + loop while in view, small mute toggle only. */
  autoPlay?: boolean;
  /** Feature style (default false autoPlay): poster + big play button, click plays with sound. */
}

/**
 * Lazy, accessible video player. The <video>'s `src` isn't attached until
 * the player scrolls near the viewport; playback pauses automatically once
 * it scrolls out of view, so at most one clip plays at a time per section.
 */
export function VideoPlayer({ src, poster, title, dict, className, autoPlay = false }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      },
      { rootMargin: "200px", threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loaded) return;

    if (inView && (autoPlay || playing)) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, loaded, autoPlay, playing]);

  const handlePlayClick = () => {
    setPlaying(true);
    if (!autoPlay) setMuted(false);
  };

  const handlePauseClick = () => {
    setPlaying(false);
    videoRef.current?.pause();
  };

  const showControls = autoPlay ? loaded : true;
  const isActuallyPlaying = autoPlay ? inView && loaded : playing;

  return (
    <div
      ref={containerRef}
      className={cn("group relative overflow-hidden bg-navy", className)}
    >
      {loaded && (isActuallyPlaying || playing) ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop={autoPlay}
          playsInline
          preload="none"
          aria-label={title}
          className="h-full w-full object-cover"
          onEnded={() => !autoPlay && setPlaying(false)}
        />
      ) : (
        <Image
          src={poster}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      )}

      {!autoPlay && !playing && (
        <button
          type="button"
          onClick={handlePlayClick}
          aria-label={dict.video.play}
          className="absolute inset-0 flex items-center justify-center bg-navy/30 transition-colors group-hover:bg-navy/40"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-offwhite/95 text-navy shadow-xl transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      {!autoPlay && playing && showControls && (
        <button
          type="button"
          onClick={handlePauseClick}
          aria-label={dict.video.pause}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy/70 text-offwhite backdrop-blur-sm transition-colors hover:bg-navy/90"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        </button>
      )}

      {autoPlay && loaded && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? dict.video.unmute : dict.video.mute}
          aria-pressed={!muted}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy/70 text-offwhite backdrop-blur-sm transition-colors hover:bg-navy/90"
        >
          {muted ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M3 10v4h4l5 5V5L7 10H3Zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M3 10v4h4l5 5V5L7 10H3Zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12Zm2.5 0a7 7 0 0 1-4 6.32v-2.18a5 5 0 0 0 0-8.28V5.68A7 7 0 0 1 19 12Z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
