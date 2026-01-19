import {
  Figma,
  Layers,
  Globe,
  Shield,
  Coffee,
  Notebook,
  Palette,
  Image,
  Kanban,
} from "lucide-react";

/* ===========================
   TOOLS DATA (ICON REPLACED)
   =========================== */

const tools = [
  {
    name: "Figma",
    icon: <Figma className="w-6 h-6 lg:w-8 lg:h-8" />,
  },
  {
    name: "Framer",
    icon: <Layers className="w-6 h-6 lg:w-8 lg:h-8" />,
  },
  {
    name: "WordPress",
    icon: <Globe className="w-6 h-6 lg:w-8 lg:h-8" />,
  },
  {
    name: "Angular",
    icon: <Shield className="w-6 h-6 lg:w-8 lg:h-8" />,
  },
  {
    name: "Java",
    icon: <Coffee className="w-6 h-6 lg:w-8 lg:h-8" />,
  },
  {
    name: "Notion",
    icon: <Notebook className="w-6 h-6 lg:w-8 lg:h-8" />,
  },
  {
    name: "Canva",
    icon: <Palette className="w-6 h-6 lg:w-8 lg:h-8" />,
  },
  {
    name: "Photoshop",
    icon: <Image className="w-6 h-6 lg:w-8 lg:h-8" />,
  },
  {
    name: "Jira",
    icon: <Kanban className="w-6 h-6 lg:w-8 lg:h-8" />,
  },
];

/* ===========================
   COMPONENT (UNCHANGED)
   =========================== */

export const ToolsStrip = () => {
  // Duplicate tools for seamless loop
  const duplicatedTools = [...tools, ...tools];

  return (
    <div className="w-full mt-16 lg:mt-12 animate-fade-in-up animation-delay-500 my-[48px]">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center mb-6 lg:mb-8">
        Tools I Work With
      </p>

      {/* Carousel container with mask */}
      <div className="relative overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-scroll-left">
          {duplicatedTools.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 px-6 lg:px-10 group"
            >
              <div className="text-muted-foreground/50 group-hover:text-primary transition-colors duration-300">
                {tool.icon}
              </div>
              <span className="text-[10px] lg:text-xs uppercase tracking-wider text-muted-foreground/40 group-hover:text-muted-foreground transition-colors duration-300 whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
