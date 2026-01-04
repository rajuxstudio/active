import { useState } from "react";
import {
  SiFigma,
  SiCanva,
  SiAdobephotoshop,
  SiAdobeillustrator,
} from "react-icons/si";

interface TemplateCardProps {
  template: {
    name: string;
    image: string;
    colors: string[];
    tools: string[];
  };
  index: number;
}

const toolIcons: Record<string, any> = {
  figma: SiFigma,
  canva: SiCanva,
  photoshop: SiAdobephotoshop,
  illustrator: SiAdobeillustrator,
};

const TemplateCard = ({ template, index }: TemplateCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        className="group relative rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl"
        style={{ animationDelay: `${index * 80}ms` }}
        onClick={() => setOpen(true)}
      >
        {/* Main image */}
        <div className="relative z-10 p-4">
          <div
            className="relative aspect-[16/10] rounded-xl overflow-hidden"
            style={{
              background: `linear-gradient(
        135deg,
        ${template.colors[0] || "#f1f5f9"}20,
        ${template.colors[1] || template.colors[0] || "#e5e7eb"}30
      )`,
            }}
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 px-4 pb-4 flex items-center justify-between">
          <h3 className="text-sm font-medium truncate text-foreground">
            {template.name}
          </h3>

          <div className="flex items-center gap-2">
            {template.tools.slice(0, 3).map((tool) => {
              const Icon = toolIcons[tool];
              return (
                <div
                  key={tool}
                  className="w-7 h-7 rounded-md flex items-center justify-center
                  bg-white/80 backdrop-blur border border-black/5
                  text-muted-foreground"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* IMAGE VIEWER MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <img
            src={template.image}
            alt={template.name}
            className="max-w-[90vw] max-h-[85vh] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default TemplateCard;
