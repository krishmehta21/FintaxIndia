import { cn } from "../../lib/utils";
import { useEffect, useRef } from "react";

function VerticalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 30,
  onItemsRef,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (onItemsRef && containerRef.current) {
      const items = Array.from(containerRef.current.querySelectorAll('.marquee-item'));
      onItemsRef(items);
    }
  }, [onItemsRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex flex-col overflow-hidden",
        className
      )}
      style={{
        "--duration": `${speed}s`,
      }}
    >
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 flex-col animate-marquee-vertical",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

const marqueeItems = [
  "Tax Planning",
  "Corporate Compliance",
  "Audit & Assurance",
  "Financial Strategy",
  "Risk Mitigation",
];

export default function CTAWithVerticalMarquee() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marqueeContainer = marqueeRef.current;
    if (!marqueeContainer) return;

    const updateOpacity = () => {
      const items = marqueeContainer.querySelectorAll('.marquee-item');
      const containerRect = marqueeContainer.getBoundingClientRect();
      const centerY = containerRect.top + containerRect.height / 2;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterY = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(centerY - itemCenterY);
        const maxDistance = containerRect.height / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const opacity = 1 - normalizedDistance * 0.75;
        item.style.opacity = opacity.toString();
      });
    };

    let frame;
    const animationFrame = () => {
      updateOpacity();
      frame = requestAnimationFrame(animationFrame);
    };

    frame = requestAnimationFrame(animationFrame);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="bg-primary text-white flex items-center justify-center px-6 py-20 md:py-32 overflow-hidden border-t border-white/10">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 max-w-xl text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              Take the First Step
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
              Pick one service area. FinTax India delivers a robust compliance and strategy plan tailored to your business objectives. Experience uncompromising financial integrity.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
              <a href="/contact" className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-accent text-primary rounded-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base text-center justify-center flex items-center">
                <span className="relative z-10">SCHEDULE CONSULTATION</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </a>
              <a href="/services" className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white rounded-xl font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/30 text-sm sm:text-base text-center justify-center flex items-center">
                <span className="relative z-10">EXPLORE EXPERTISE</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </a>
            </div>
          </div>

          {/* Right Marquee */}
          <div ref={marqueeRef} className="relative h-[280px] sm:h-[380px] lg:h-[600px] flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
              <VerticalMarquee speed={20} className="h-full">
                {marqueeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight py-3 sm:py-6 marquee-item text-white/90 text-center lg:text-left"
                  >
                    {item}
                  </div>
                ))}
              </VerticalMarquee>
              
              {/* Top vignette */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary via-primary/80 to-transparent z-10"></div>
              
              {/* Bottom vignette */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary via-primary/80 to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
