import { cn } from "../../lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function ElasticGallery() {
  const items = [
    {
      id: "01",
      title: "Income Tax Filing",
      category: "Enjoy stress-free and accurate income tax filing options with us.",
      src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
      alt: "Income Tax Filing",
    },
    {
      id: "02",
      title: "Financial Services",
      category: "We provide complete financial planning and management services.",
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      alt: "Financial Services",
    },
    {
      id: "03",
      title: "GST Filing",
      category: "Effective GST filing to keep your business compliant.",
      src: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1200",
      alt: "GST Filing",
    },
    {
      id: "04",
      title: "Loan Services",
      category: "Professional guidance in securing the correct loan as per your needs.",
      src: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?auto=format&fit=crop&q=80&w=1200",
      alt: "Loan Services",
    },
    {
      id: "05",
      title: "Insurance Services",
      category: "Personalised insurance plans for a secured future.",
      src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
      alt: "Insurance Services",
    },
    {
      id: "06",
      title: "Corporate Services",
      category: "We are experts at offering end-to-end corporate solutions for your business.",
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      alt: "Corporate Services",
    },
    {
      id: "07",
      title: "Market Analysis",
      category: "In-depth market research to help you make informed decisions.",
      src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
      alt: "Market Analysis",
    },
    {
      id: "08",
      title: "Quality Resourcing",
      category: "Connecting you with top-tier talent and essential resources.",
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
      alt: "Quality Resourcing",
    },
    {
      id: "09",
      title: "Talented Consultants",
      category: "Expert guidance from industry-leading professionals.",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200",
      alt: "Talented Consultants",
    },
  ];

  const [activeId, setActiveId] = useState("01");
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  // Auto-cycle animation
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = items.findIndex((item) => item.id === currentId);
        const nextIndex = (currentIndex + 1) % items.length;
        return items[nextIndex].id;
      });
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, items]);

  return (
    <div 
      className="w-full py-6 md:py-12 bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container: Fixed height on mobile/desktop to ensure animation stability */}
      <div className="mx-auto flex h-[500px] w-full max-w-7xl flex-col gap-2 px-4 md:h-[600px] md:flex-row md:gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setActiveId(item.id)}
            onClick={() => setActiveId(item.id)} // Touch support
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0a1526]",
              // Layout & Flex Transition
              "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
              // Flex Logic:
              // If active, take up 4 parts of space. If inactive, take 1 part.
              // This creates the "accordion" effect relative to siblings.
              activeId === item.id ? "flex-[4]" : "flex-[1]",
              // Brightness logic for focus
              activeId === item.id
                ? "brightness-100"
                : "brightness-50 hover:brightness-75"
            )}
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 h-full w-full">
              <img
                src={item.src}
                alt={item.alt}
                className={cn(
                  "object-cover w-full h-full transition-transform duration-1000",
                  // Subtle zoom on active
                  activeId === item.id ? "scale-100" : "scale-110"
                )}
              />
              {/* Gradient Overlay for Text Readability */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent transition-opacity duration-500",
                  activeId === item.id ? "opacity-100" : "opacity-0"
                )}
              />
            </div>

            {/* --- Content Container --- */}
            <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-4 md:p-8 z-10">
              {/* Active Content: Title & Button */}
              <div
                className={cn(
                  "flex flex-col gap-2 transition-all duration-500",
                  // Hide/Show based on active state with translation for smooth entry
                  activeId === item.id
                    ? "translate-y-0 opacity-100 delay-200"
                    : "translate-y-12 opacity-0"
                )}
              >
                {/* Title */}
                <h3 className="text-2xl font-black uppercase leading-tight text-white md:text-4xl drop-shadow-md break-words max-w-full">
                  {item.title}
                </h3>

                {/* Call to Action */}
                <Link 
                  to={`/services/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => e.stopPropagation()} 
                  className="mt-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors md:mt-4 md:text-sm drop-shadow-md w-fit"
                >
                  Explore Service{" "}
                  <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </div>

              {/* Inactive Content: Vertical Text (Desktop) / Short Label (Mobile) */}
              <div
                className={cn(
                  "absolute transition-all duration-500",
                  // Position logic
                  "bottom-4 left-1/2 -translate-x-1/2 md:bottom-8",
                  // Hide when active
                  activeId === item.id
                    ? "opacity-0 scale-50"
                    : "opacity-100 delay-500"
                )}
              >
                {/* Desktop: Vertical Text */}
                <span className="hidden whitespace-nowrap text-base lg:text-lg font-bold uppercase tracking-widest text-white [writing-mode:vertical-rl] md:block drop-shadow-lg max-h-[80%] overflow-hidden text-ellipsis">
                  {item.title}
                </span>

                {/* Mobile: Horizontal ID/Label */}
                <span className="block text-xs font-bold text-white md:hidden drop-shadow-md">
                  {item.id}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
