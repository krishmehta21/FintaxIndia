import { useReducedMotion } from 'framer-motion';

export const useMotionVariants = () => {
  const shouldReduceMotion = useReducedMotion();

  // A helper function to conditionally apply variants based on user preference
  const getVariant = (variantObj) => {
    if (shouldReduceMotion) {
      // Reduced motion fallback: Simple instant or fast fade-in without transforms
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.1 } }
      };
    }
    return variantObj;
  };

  return {
    // 1. Section Headings: Fade in + rise ~16px, 350ms ease-out
    headingRise: getVariant({
      hidden: { opacity: 0, y: 16 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.35, ease: "easeOut" } 
      }
    }),

    // 2. Body Text/Paragraphs: Fade in only, staggered 100ms
    textFade: getVariant({
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { duration: 0.35, ease: "easeOut" } 
      }
    }),

    // Same as textFade but specifically for explicitly delayed single items
    textFadeDelay: getVariant({
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { duration: 0.35, ease: "easeOut", delay: 0.1 } 
      }
    }),

    // 3. Images/Photos: Fade in + subtle scale 1.03 to 1.0, 400ms
    imageScaleFade: getVariant({
      hidden: { opacity: 0, scale: 1.03 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 0.4, ease: "easeOut" } 
      }
    }),

    // 4. Staggered Container for Lists/Grids: Stagger children by 60ms-80ms
    staggerContainer: getVariant({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08 // 80ms stagger
        }
      }
    }),

    // 5. Staggered Item (to be used as child of staggerContainer)
    staggerItem: getVariant({
      hidden: { opacity: 0, y: 12 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.35, ease: "easeOut" } 
      }
    }),
    
    // Viewport settings for consistent once: true
    viewportConfig: { once: true, margin: "-50px" }
  };
};
