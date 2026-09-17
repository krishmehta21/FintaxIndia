import React from "react";

export const TestimonialCard = ({ quote, authorName, authorTitle, avatarUrl }) => {
  return (
    <div className="flex flex-col items-start gap-4 p-6 md:p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl w-[300px] md:w-[400px] flex-shrink-0 hover:bg-white/10 transition-colors duration-300">
      <p className="text-gray-300 text-base md:text-lg italic leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10 w-full">
        <img
          src={avatarUrl}
          alt={authorName}
          className="w-12 h-12 rounded-full bg-primary/50 object-cover border border-white/20"
          loading="lazy"
        />
        <div>
          <h4 className="text-base font-bold text-white">{authorName}</h4>
          <p className="text-sm text-accent">{authorTitle}</p>
        </div>
      </div>
    </div>
  );
};

export const HorizontalScroller = ({ children, speed = "40s", direction = "left" }) => {
  const animationClass =
    direction === "right" ? "animate-scroll-horizontal-reverse" : "animate-scroll-horizontal";

  return (
    <div className="w-full overflow-hidden group relative">
      <div className={`flex ${animationClass}`} style={{ "--scroll-duration": speed }}>
        <div className="flex items-stretch justify-center gap-6 px-3">{children}</div>
        <div className="flex items-stretch justify-center gap-6 px-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsSection({ data }) {
  return (
    <section className="relative flex flex-col items-center gap-12 pb-20 pt-8 w-full overflow-hidden bg-primary">
      <div className="flex flex-col items-center gap-6 text-center z-10 max-w-3xl px-4">
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
          {data.title}
        </h2>
        <p className="text-lg text-gray-400">
          {data.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-6 z-10 w-full mt-8">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                quote={t.quote}
                authorName={t.authorName}
                authorTitle={t.authorTitle}
                avatarUrl={t.avatarUrl}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>

      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)",
          zIndex: 0,
        }}
      />
      
      {/* Side Vignettes for smooth edge fade */}
      <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 md:w-32 bg-gradient-to-r from-primary to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 md:w-32 bg-gradient-to-l from-primary to-transparent z-20 pointer-events-none"></div>
    </section>
  );
}
