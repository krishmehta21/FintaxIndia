import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|:<>?';

export function ScrambleText({ children, stagger = 40 }) {
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(children);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef(null);
  
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    if (typeof children !== 'string') {
      setDisplayText(children);
      return;
    }

    if (!isHovered) {
      setDisplayText(children);
      return;
    }

    let startTime = null;
    const wordLength = children.length;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      let newText = '';
      let allSettled = true;
      const tick = Math.floor(elapsed / 60); // Throttle character changes to every 60ms
      
      for (let i = 0; i < wordLength; i++) {
        const charSettleTime = 200 + (i * stagger); // Increased base settle time
        
        if (elapsed >= charSettleTime) {
          newText += children[i];
        } else {
          if (children[i] === ' ') {
            newText += ' ';
          } else {
            // Pseudo-random character based on position and time tick
            const hash = Math.sin(i * 12.9898 + tick * 78.233) * 43758.5453;
            const rand = Math.abs(hash - Math.floor(hash));
            newText += CHARS[Math.floor(rand * CHARS.length)];
            allSettled = false;
          }
        }
      }
      
      setDisplayText(newText);
      
      if (!allSettled) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(children);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, children, stagger, shouldReduceMotion]);

  return (
    <span 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-block relative w-full h-full text-inherit"
    >
      {shouldReduceMotion ? children : displayText}
    </span>
  );
}
