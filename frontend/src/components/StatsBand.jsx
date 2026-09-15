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
    <div ref={ref} className="bg-primary text-white py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-800">
          {stats.map((stat, index) => (
            <div key={index} className="px-4 py-6 md:py-0">
              <div className="text-4xl md:text-5xl font-heading font-bold text-accent mb-2">
                <Counter 
                  end={stat.value} 
                  duration={2.5} 
                  suffix={stat.suffix}
                  active={inView}
                />
              </div>
              <div className="text-gray-300 font-medium tracking-wide uppercase text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
