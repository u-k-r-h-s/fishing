/** Rising bubbles — CSS-only, no GSAP needed for something this ambient/cheap. */
export function UnderwaterParticles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          className="absolute bottom-0 block rounded-full bg-offwhite/25 animate-bubble-rise"
          style={{
            left: `${8 + i * 9.5}%`,
            width: 4 + ((i * 7) % 10),
            height: 4 + ((i * 7) % 10),
            animationDelay: `${i * 1.6}s`,
            animationDuration: `${9 + (i % 4) * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
