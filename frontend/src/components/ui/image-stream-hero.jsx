"use client";

import React, { useId, useMemo } from "react";
import { cn } from "../../lib/utils";

const PATH = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

function keyframes(dir, name, p) {
  const steps = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale = (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    // Cinematic opacity: fade in from deep space, full brightness in midground, fade out near camera
    let opacity = 1;
    if (u < 0.15) opacity = u / 0.15; // smooth fade in (0 to 15%)
    else if (u > 0.85) opacity = 1 - (u - 0.85) / 0.15; // smooth fade out (85 to 100%)
    
    // Darkening effect: cards are darker in the far distance, but reach full brightness quickly
    let brightness = Math.min(1, 0.5 + (u * 2));
    let filter = `brightness(${brightness})`;

    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg); opacity: ${opacity.toFixed(2)}; filter: ${filter};}`
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export function ImageStreamHero({
  images = [],
  cards = 9,
  speed = 25,
  axis = 55,
  path,
  children,
  className,
  ...props
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              const img = images[i % Math.max(images.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(card, "absolute overflow-hidden bg-primary")}
                  style={{
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.1)"
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  ) : null}
                  {/* Subtle dark overlay on each card to keep text readable if they pop too bright */}
                  <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default ImageStreamHero;
