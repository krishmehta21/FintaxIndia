import {
  motion,
  useReducedMotion,
} from "motion/react";
import { useState, useEffect } from "react";

const IMG = {
  img1: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=600",
  img2: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600", 
  img3: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=600", 
  img4: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600", 
  img5: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600", 
  img6: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600", 
  img7: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600", 
  img8: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600", 
};

const SCALE = {
  1: 0.9,
  2: 0.8,
  3: 0.9,
  4: 0.8,
  5: 0.8,
  6: 0.9,
  7: 0.9,
  8: 0.7,
};
const s = (i) => SCALE[i] ?? 1;

const CARDS = [
  {
    item: { src: IMG.img1, alt: "Team" },
    target: { x: -35, y: -38, rotate: -8, scale: s(8), w: 17, h: 22 },
    targetSm: { x: -25, y: -42 },
    z: 2,
    floatOffset: 12
  },
  {
    item: { src: IMG.img2, alt: "Accounting" },
    target: { x: 35, y: -35, rotate: 12, scale: s(7), w: 18, h: 32 },
    targetSm: { x: 25, y: -42 },
    z: 3,
    floatOffset: -10
  },
  {
    item: { src: IMG.img3, alt: "Office workers" },
    target: { x: -45, y: 0, rotate: -4, scale: s(6), w: 15, h: 32 },
    targetSm: { x: -25, y: -18 },
    z: 4,
    floatOffset: 8
  },
  {
    item: { src: IMG.img4, alt: "Corporate" },
    target: { x: 0, y: -38, rotate: -2, scale: s(5), w: 25, h: 25 },
    targetSm: { x: 25, y: -18 },
    z: 5,
    floatOffset: -8
  },
  {
    item: { src: IMG.img5, alt: "Building" },
    target: { x: 42, y: 8, rotate: 6, scale: s(4), w: 18, h: 32 },
    targetSm: { x: -25, y: 22 },
    z: 6,
    floatOffset: 15
  },
  {
    item: { src: IMG.img6, alt: "Handshake" },
    target: { x: -32, y: 38, rotate: 8, scale: s(3), w: 22, h: 25 },
    targetSm: { x: 25, y: 22 },
    z: 7,
    floatOffset: -12
  },
  {
    item: { src: IMG.img7, alt: "Meeting" },
    target: { x: 0, y: 38, rotate: 3, scale: s(2), w: 20, h: 26 },
    targetSm: { x: -25, y: 42 },
    z: 8,
    floatOffset: 10
  },
  {
    item: { src: IMG.img8, alt: "Calculator" },
    target: { x: 38, y: 38, rotate: -5, scale: s(1), w: 16, h: 20 },
    targetSm: { x: 25, y: 42 },
    z: 9,
    floatOffset: -14
  },
];

const SCATTER_START = 0.12;
const SCATTER_END = 0.9;

const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i, total) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const SUB = "Financial strategies, tax planning, and corporate compliance built around your business.";

const RESPONSIVE = {
  desktop: {
    scale: null,
    small: false,
    colX: null,
    card: null,
  },
  small: {
    scale: 0.72,
    small: true,
    colX: 22,
    card: { w: 40, h: 20 },
  },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function Card({
  card,
  reduce,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  cardRadius,
}) {
  const { item, target, floatOffset } = card;

  const restScale = scaleMul ?? target.scale ?? 1;

  const sm = isSmall && card.targetSm ? card.targetSm : null;
  const endX = sm
    ? colX != null
      ? Math.sign(sm.x) * colX
      : sm.x
    : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = isSmall ? 0 : target.rotate;
  
  const w = fixedCard ? fixedCard.w : target.w;
  const h = fixedCard ? fixedCard.h : target.h;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: `${w}vw`,
        height: `${h}vh`,
        zIndex: card.z ?? 1,
        x: `calc(-50% + ${endX}vw)`,
        y: `calc(-50% + ${endY}vh)`,
        rotate: endRotate,
        scale: restScale,
      }}
      animate={reduce ? {} : {
        y: [`calc(-50% + ${endY}vh)`, `calc(-50% + ${endY + floatOffset/5}vh)`, `calc(-50% + ${endY}vh)`],
        rotate: [endRotate, endRotate + floatOffset/4, endRotate]
      }}
      transition={{
        duration: 8 + Math.abs(floatOffset) % 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <CardFace item={item} cardRadius={cardRadius} />
    </motion.div>
  );
}

function CardFace({ item, cardRadius }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden max-md:rounded-[4vw]"
      style={{ borderRadius: `${cardRadius}px` }}
    >
      <img
        src={item.src}
        alt={item.alt ?? ""}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export function StackSpreadStage({
  cards,
  bgColor = "#ececeb",
  cardRadius = 8,
  textColor = "#141414",
}) {
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } =
    useResponsive();

  const noScale = reduce === true;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", backgroundColor: bgColor }}
    >
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-4 md:px-8 text-center"
          initial={{ opacity: 0, scale: noScale ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2
            className="w-full text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-4 drop-shadow-xl"
            style={{ color: textColor }}
          >
            Strategic Planning.<br />
           <span className="opacity-70">
              That Delivers.
           </span>
          </h2>
          <p
            className="w-full max-w-[42ch] text-sm md:text-lg lg:text-xl leading-relaxed tracking-tight mx-auto drop-shadow-md"
            style={{ color: textColor, opacity: 0.9 }}
          >
            {SUB}
          </p>
        </motion.div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          {cards.map((card, i) => (
            <Card
              key={i}
              card={card}
              reduce={reduce}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              cardRadius={cardRadius}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function StackSpread({
  bgColor = "#0F172A",
  cardRadius = 16,
  textColor = "#FFFFFF",
}) {
  return (
    <StackSpreadStage
      cards={CARDS}
      bgColor={bgColor}
      cardRadius={cardRadius}
      textColor={textColor}
    />
  );
}
