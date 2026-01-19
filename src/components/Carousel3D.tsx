import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ArrowRightCircleIcon, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import RecruitICon from "@/assets/logo/RecruitIcon.png"
import bumpermandi from "@/assets/logo/bumpermandi.png"
import eclelon from "@/assets/logo/eclelon.png"
import utility from "@/assets/logo/Utility.png"
import cloudgavel from "@/assets/logo/cloudgavel.png"
import rajvir from "@/assets/logo/RLogo.png"
import captable from "@/assets/logo/Captable.png"


interface Project {
  id: number;
  title: string;
  category: string; // now treated as Business Model
  industryDomain?: string;
  applications?: ("web" | "mobile" | "tablet")[];
  description: string;
  color: string;
  link: string;
  isViewAll?: boolean;
  logo?: string;
}

// Google Prime Colors
const googleColors = [
  "linear-gradient(135deg, #9BCF7A 0%, #F28C28 100%)",    // Eclelon – Organic green + warm accent (growth, sustainability)
  "linear-gradient(135deg, #FFA24C 0%, #E56A2E 100%)",   // CloudGavel – Soft cloud orange with depth (trust, legal-tech)
  "linear-gradient(135deg, #6FA8FF 0%, #2E5AAC 100%)",  // Utility – Calm global blue with subtle highlight (network, scale)
  "linear-gradient(135deg, #E7C15A 0%, #9C7A1E 100%)",  // Bumper Mandi – Premium gold with earthy undertone (agri + value)
  "linear-gradient(135deg, #0F2A44 0%, #5F87A8 100%)",  // Captable – Deep blue with subtle highlight (finance, transparency)
  "linear-gradient(135deg, #8B5CF6 0%, #F472B6 100%)", // Purple-Pink
];
const projects: Project[] = [
  {
    id: 1,
    title: "Utility Plus",
    category: "SaaS",
    industryDomain: "Public Utilities / Government",
    applications: ["web", "mobile", "tablet"],
    description:
      "Help agencies manage billing, track records, and streamline user data efficiently. Improved the existing UX for better usability.",
    color: googleColors[2],
    link: "#",
    logo: utility,
  },
  {
    id: 2,
    title: "CloudGavel",
    category: "SaaS",
    industryDomain: "Law Enforcement / Justice",
    applications: ["web", "mobile"],
    description:
      "An innovative eWarrant solution that streamlines the warrant approval process, enabling law enforcement efficiency.",
    color: googleColors[1],
    link: "#",
    logo: cloudgavel,
  },
  {
    id: 3,
    title: "Echelon Constructors",
    category: "ERP",
    industryDomain: "Construction",
    applications: ["web"],
    description:
      "Construction Project Management Software designed to handle project planning, scheduling, and resource management.",
    color: googleColors[0],
    link: "#",
    logo: eclelon,
  },
  {
    id: 4,
    title: "Captable",
    category: "Fintech",
    industryDomain: "Finance / Investment",
    applications: ["web"],
    description:
      "Help agencies manage billing, track records, and streamline user data efficiently. Improved the existing UX.",
    color: googleColors[4],
    link: "#",
    logo: captable,
  },
  {
    id: 5,
    title: "Bumper Mandi",
    category: "AgriTech",
    industryDomain: "Agriculture",
    applications: ["mobile", "web"],
    description:
      "A digital mandi app that helps farmers sell grain securely and transparently. Simplifies transactions, ensures fair pricing, verified buyers, and real-time updates.",
    color: googleColors[3],
    link: "#",
    logo: bumpermandi,
  },
  {
    id: 6,
    title: "React Portfolio Website",
    category: "Web Development",
    industryDomain: "Personal / Creative",
    applications: ["web"],
    description:
      "A modern, responsive portfolio website using React with smooth navigation, reusable components, and a clean UI. Maintained on GitHub with organized commits and clear documentation.",
    color: googleColors[5],
    link: "#",
    logo: rajvir,
  },
  {
    id: 7,
    title: "View All Projects",
    category: "Projects",
    description: "Explore my complete collection of design and development work across various industries and platforms.",
    color: googleColors[6],
    link: "/projects",
    isViewAll: true,
  },
];

export const Carousel3D = () => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragRotation, setDragRotation] = useState(0);

  const itemCount = projects.length;
  const anglePerItem = 360 / itemCount;
  const radius = 380;

  const nextSlide = useCallback(() => {
    setRotation((prev) => prev - anglePerItem);
  }, [anglePerItem]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setDragRotation(rotation);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = (clientX - startX) * 0.3;
    setRotation(dragRotation + diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const snappedRotation = Math.round(rotation / anglePerItem) * anglePerItem;
    setRotation(snappedRotation);

    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const getActiveIndex = () => {
    const normalized = (((-rotation % 360) + 360) % 360);
    return Math.round(normalized / anglePerItem) % itemCount;
  };

  const activeIndex = getActiveIndex();
  const isAnyHovered = hoveredIndex !== null;

  return (
    <div className="relative w-full py-16">
      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[900px] h-[500px] rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" />
      </div>

      {/* 3D Carousel */}
      <div
        className="relative h-[500px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
        style={{ perspective: '1400px' }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => {
          handleDragEnd();
          setIsAutoPlaying(true);
          setHoveredIndex(null);
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(-5deg)`,
          }}
        >
          <div
            className="relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {projects.map((project, index) => {
              const angle = index * anglePerItem;
              const isActive = index === activeIndex;
              const isHovered = hoveredIndex === index;

              // Calculate card position relative to front
              const relativeAngle = ((angle + rotation) % 360 + 360) % 360;
              const isBackSide = relativeAngle > 90 && relativeAngle < 270;
              const baseOpacity = isBackSide ? 0.4 : 1;
              const scale = isBackSide ? 0.85 : 1;

              // Apply blur to non-hovered cards when any card is hovered
              const shouldBlur = isAnyHovered && !isHovered;
              const opacity = shouldBlur ? 0.3 : baseOpacity;

              return (
                <div
                  key={project.id}
                  className="absolute"
                  style={{
                    width: '260px',
                    height: '360px',
                    left: '-130px',
                    top: '-170px',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`,
                    transformStyle: 'preserve-3d',
                    opacity,
                    filter: shouldBlur ? 'blur(8px)' : 'blur(0px)',
                    transition: isDragging
                      ? 'opacity 0.2s, filter 0.3s'
                      : 'opacity 0.5s, filter 0.3s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onClick={() => {
                    if (isActive) {
                      if (project.isViewAll) {
                        navigate(project.link);
                      } else {
                        window.open(project.link, "_blank");
                      }
                    } else {
                      const targetRotation = -index * anglePerItem;
                      setRotation(targetRotation);
                    }
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* 3D Glass Card */}
                  <div
                    className={cn(
                      "w-full h-full rounded-3xl overflow-hidden",
                      "transition-all duration-500 ease-out",
                      isActive && "z-10",
                      isHovered && "scale-105"
                    )}
                    style={{
                      background: 'hsl(var(--card))',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: isActive
                        ? '1px solid hsl(var(--primary) / 0.5)'
                        : '1px solid hsl(var(--border))',
                      boxShadow: isActive
                        ? `
                          0 8px 32px hsl(var(--foreground) / 0.1),
                          0 0 60px -10px hsl(var(--primary) / 0.3)
                        `
                        : `
                          0 8px 32px hsl(var(--foreground) / 0.08)
                        `,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Glass reflection overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-100"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--foreground) / 0.03) 0%, transparent 50%, transparent 100%)',
                        borderRadius: 'inherit',
                      }}
                    />

                    {/* Project Color Background with Icon */}
                    {project.isViewAll ? (
                      <div className="relative h-40 overflow-hidden flex items-center justify-center bg-muted border-b border-border">
                        <div className="w-20 h-20 rounded-2xl backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-center"
                          style={{ background: 'rgba(255, 255, 255, 0.2)' }}>

                          <ExternalLink className="w-12 h-12 text-muted-foreground" />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="relative h-40  flex items-center justify-center"
                        style={{ background: project.color }}
                      >
                        {/* Overlapping Project Logo */}
                        {project.logo && (
                          <div
                            className="absolute left-5 -translate-y-4"
                            style={{
                              top: '124px', // controls overlap depth
                              zIndex: 20,
                            }}
                          >
                            <div className="w-20 h-20 rounded-2xl backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-center"
                              style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
                              <img
                                src={project.logo}
                                alt={project.title}
                                className="w-12 h-12 object-contain"
                              />
                            </div>
                          </div>
                        )}
                        {/* Decorative pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/50 rounded-full" />
                          <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white/50 rounded-lg rotate-45" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/50 rounded-full" />
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span
                            className="inline-block px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider rounded-lg text-white leading-tight"
                            style={{
                              background: 'rgba(255,255,255,0.2)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid rgba(255,255,255,0.3)',
                            }}
                          >
                            {project.category}
                          </span>
                          <div className="flex items-center gap-2 mt-2">
                            {project.applications?.includes("web") && (
                              <span className="p-1.5 rounded-lg bg-white/20 border border-white/30 backdrop-blur">
                                <Monitor className="w-3.5 h-3.5 text-white" />
                              </span>
                            )}
                            {project.applications?.includes("mobile") && (
                              <span className="p-1.5 rounded-lg bg-white/20 border border-white/30 backdrop-blur">
                                <Smartphone className="w-3.5 h-3.5 text-white" />
                              </span>
                            )}
                            {project.applications?.includes("tablet") && (
                              <span className="p-1.5 rounded-lg bg-white/20 border border-white/30 backdrop-blur">
                                <Tablet className="w-3.5 h-3.5 text-white" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content - hidden on hover */}
                    <div
                      className={cn(
                        "p-5 pt-10 space-y-0 relative z-10 transition-all duration-300",
                        isHovered ? "opacity-0 translate-y-" : "opacity-100 translate-y-0"
                      )}
                    >


                      <h3 className="text-md font-display font-semibold text-foreground tracking-tight line-clamp-1">
                        {project.title}
                      </h3>
                      {project.industryDomain && (
                        <p className="text-sm text-muted-foreground">
                          {project.industryDomain}
                        </p>
                      )}
                      <p className=" text-xs text-muted-foreground leading-relaxed line-clamp-4">
                        {project.description}
                      </p>
                    </div>

                    {/* Hover Overlay - Shows View Project with Name */}
                    <div
                      className={cn(
                        "absolute bottom-0 left-0 right-0 p-5 flex flex-col items-center justify-center gap-2",
                        "transition-all duration-300 ease-out",
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      )}
                      style={{
                        background: 'linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.8) 70%, transparent 100%)',
                      }}
                    >
                      <span className="text-foreground font-display font-semibold text-base">
                        {project.title}
                      </span>
                      <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                        {project.isViewAll ? "Explore All" : "View Project"}
                      </span>
                      <span className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-muted hover:border-primary/30 transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};