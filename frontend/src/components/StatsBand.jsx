import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Counter = ({ end, duration = 2.5, suffix = '', active = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTimestamp = null;
    let rafId;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };
    rafId = window.requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, active]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export const StatsBand = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { label: 'Years Experience', value: 15, suffix: '+' },
    { label: 'Corporate Clients', value: 500, suffix: '+' },
    { label: 'Filings Completed', value: 10000, suffix: '+' }
  ];

  return (
    <div ref={ref} className="bg-primary text-white py-4 sm:py-6 md:py-8">
      <div className="container px-3 sm:px-6">
        <div className="grid grid-cols-3 gap-1 sm:gap-6 text-center divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="px-1.5 sm:px-4 py-1 md:py-0">
              <div className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-accent mb-0.5 sm:mb-2">
                <Counter 
                  end={stat.value} 
                  duration={2.5} 
                  suffix={stat.suffix}
                  active={inView}
                />
              </div>
              <div className="text-gray-300 font-medium tracking-tight sm:tracking-wide uppercase text-[10px] sm:text-xs md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
