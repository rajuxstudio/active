import { ExternalLink, Clock, Smartphone, Monitor } from "lucide-react";
import { getTechIcon } from "@/lib/techIcons";
import { useState } from "react";


interface ProjectData {
  logo: string;
  name: any;
  colors: string[];
  font: string;
  isLive: boolean;
  description: string;
  stack: string[];
  duration: string;
  mobileMockup?: string;
  webMockup?: string;
}

interface ProjectBentoCardProps {
  project: ProjectData;
  index: number;
}

const ProjectBentoCard = ({ project, index }: ProjectBentoCardProps) => {
  const animationDelay = index * 150;
  const [activeImage, setActiveImage] = useState<string | null>(null);


  return (
    <div
      className="bento-card-3d group animate-fade-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div />

      <div className="relative p-6 lg:p-8 bg-card rounded-3xl border border-border/50">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">

          {/* LEFT SECTION */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-12 gap-4">

              {/* Logo & Name */}
              <div className="col-span-12 sm:col-span-6 p-5 rounded-2xl bg-gradient-to-br from-secondary/50 to-muted/30 border border-border/30">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden shadow-lg ring-2 ring-primary/10">
                    <img src={project.logo} alt={project.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{project.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${project.isLive ? "bg-success status-pulse" : "bg-muted-foreground"}`} />
                      <span className="text-sm text-muted-foreground">
                        {project.isLive ? "Live" : "In Development"}
                      </span>
                      {project.isLive && <ExternalLink className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="col-span-6 sm:col-span-3 p-5 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 border border-border/30">
                <p className="text-xs font-semibold mb-3">Colors</p>
                <div className="flex gap-2">
                  {project.colors.map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-xl" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>

              {/* Font & Duration */}
              <div className="col-span-6 sm:col-span-3 p-5 rounded-2xl bg-gradient-to-br from-success/5 to-primary/5 border border-border/30">
                <p className="text-xs font-semibold">Font</p>
                <p className="text-sm mb-2">{project.font}</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{project.duration}</span>
                </div>
              </div>

              {/* About */}
              <div className="col-span-12 p-5 rounded-2xl bg-gradient-to-r from-card to-secondary/20 border border-border/30">
                <p className="text-xs font-semibold mb-2">About</p>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              {/* 🔁 DESKTOP MOCKUP → MOVED HERE */}
              <div className="col-span-12 px-5 pt-5 rounded-2xl bg-gradient-to-b from-primary/5 to-secondary/20 border border-border/30">
                <p className="text-xs font-semibold mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Desktop
                </p>
                <div className="h-[220px] overflow-hidden shadow-2xl cursor-pointer 
             border-t-4 border-l-4 border-r-4 border-foreground/15 
             rounded-tl-[16px] rounded-tr-[16px]">
                  <img src={project.webMockup} alt="Desktop mockup" className="w-full h-full object-cover object-top"/>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">

            {/* 🔁 TECH STACK → MOVED HERE */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-card to-accent/5 border border-border/30">
              <p className="text-xs font-semibold mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech, i) => {
                  const { icon: Icon, color } = getTechIcon(tech);
                  return (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl border">
                      <Icon className="w-4 h-4" style={{ color }} />
                      <span className="text-sm">{tech}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MOBILE MOCKUP */}
            <div className="flex flex-col flex-1 col-span-12 px-5 pt-5 rounded-2xl 
  bg-gradient-to-b from-primary/5 to-secondary/20 border border-border/30">

              {/* Header */}
              <p className="text-xs font-semibold mb-4 flex items-center gap-2 shrink-0">
                <Smartphone className="w-4 h-4" />
                Mobile
              </p>

              {/* Auto-layout image container */}
              <div className="relative flex-1 overflow-hidden shadow-2xl cursor-pointer
    border-t-4 border-l-4 border-r-4 border-foreground/15
    rounded-tl-[16px] rounded-tr-[16px]">

                <img
                  src={project.mobileMockup}
                  alt="Mobile mockup"
                  className="absolute inset-0 w-full h-full object-top sm:object-cover"
                />
              </div>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBentoCard; 