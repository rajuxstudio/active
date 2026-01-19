import {
  LucideIcon,
  CheckCircle,
  MapPin,
  Figma,
  Layers,
  PenTool,
  Monitor,
  Smartphone,
  Users,
  Lightbulb,
  Target,
  Palette,
  Layout,
  Code,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TimelineCardProps {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: "education" | "work";
  icon: LucideIcon;
  achievements?: string[];
  index: number;
  isLeft: boolean;
  city?: string;
  skills?: string[];
}

/* ================= MAP BACKGROUND ================= */

const MapBackground = ({ city }: { city?: string }) => {
  const getPinPosition = (cityName: string) => {
    const hash = cityName
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      x: 30 + (hash % 40),
      y: 25 + ((hash * 7) % 50),
    };
  };

  const pinPos = city ? getPinPosition(city) : { x: 50, y: 50 };

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl opacity-[0.08] pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="gridLarge" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          </pattern>
          <pattern id="gridSmall" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-primary"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#gridSmall)" />
        <rect width="100%" height="100%" fill="url(#gridLarge)" />

        <path
          d="M 0 60 Q 50 40 100 70 T 200 50 T 300 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          opacity="0.5"
        />
      </svg>

      {city && (
        <div
          className="absolute pointer-events-none"
          style={{ left: `${pinPos.x}%`, top: `${pinPos.y}%` }}
        >
          <MapPin size={26} className="text-primary fill-primary/30" />
        </div>
      )}
    </div>
  );
};

/* ================= SKILL ICON MAP ================= */

const skillIconMap: Record<string, LucideIcon> = {
  Figma,
  "UI Design": Palette,
  "UX Design": Users,
  Prototyping: Layers,
  "Design Systems": Layout,
  "User Research": Target,
  Wireframing: PenTool,
  "Mobile Design": Smartphone,
  "Web Design": Monitor,
  Innovation: Lightbulb,
  Development: Code,
  Creative: Sparkles,
};

/* ================= TIMELINE CARD ================= */

const TimelineCard = ({
  year,
  title,
  subtitle,
  description,
  type,
  icon: Icon,
  achievements,
  index,
  isLeft,
  city,
  skills,
}: TimelineCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-10">
        <div className="w-3.5 h-3.5 rounded-full bg-primary" />
      </div>

      {/* Content */}
      <div
        className={`w-full md:w-1/2 ${
          isLeft ? "md:pr-16 pl-8 md:pl-0" : "md:pl-16 pl-8 md:pr-0"
        }`}
      >
        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          {/* Year */}
          <span className="inline-block mb-4 px-3 py-1 text-xs uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full">
            {year}
          </span>

          {/* CARD (hover-safe) */}
          <div
            className="
              group relative p-6 rounded-xl
              bg-card-gradient border border-border
              transition-all duration-300
              hover:border-primary/40 hover:shadow-xl hover:-translate-y-[2px]
              overflow-hidden
            "
          >
            {/* Floating skill icons (desktop) */}
            {skills &&
              skills.slice(0, 6).map((skill, i) => {
                const SkillIcon = skillIconMap[skill] || Sparkles;
                const positions = [
                  { top: "20%", right: "-14px" },
                  { top: "50%", right: "-14px" },
                  { top: "80%", right: "-14px" },
                  { top: "20%", left: "-14px" },
                  { top: "50%", left: "-14px" },
                  { top: "80%", left: "-14px" },
                ];
                return (
                  <div
                    key={skill}
                    className="
                      hidden md:flex absolute z-20 pointer-events-none
                      items-center justify-center w-7 h-7 rounded-full
                      bg-background/95 border border-primary/20
                      opacity-0 scale-75
                      group-hover:opacity-100 group-hover:scale-100
                      transition-all duration-500
                    "
                    style={{
                      ...positions[i],
                      transitionDelay: `${i * 60}ms`,
                    }}
                  >
                    <SkillIcon size={12} className="text-primary/80" />
                  </div>
                );
              })}

            {/* Map Background */}
            <MapBackground city={city} />

            {/* Card content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon size={20} className="text-primary" />
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {type === "education" ? "Education" : "Experience"}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                {title}
              </h3>

              <p className="text-sm text-primary/80 mb-3">{subtitle}</p>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {description}
              </p>

              {achievements && (
                <div className="space-y-2 pt-4 border-t border-border/50">
                  {achievements.map((a, i) => (
                    <div key={i} className="flex gap-2">
                      <CheckCircle size={16} className="text-primary" />
                      <span className="text-sm text-secondary-foreground">
                        {a}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};

export default TimelineCard;
