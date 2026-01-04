import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Smartphone, Monitor } from "lucide-react";
import {
  SiFigma,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFirebase,
  SiFlutter,
  SiAdobexd,
  SiWordpress,
  SiFramer
} from "react-icons/si";
import WorkHeader from "@/components/WorkHeader";
import { useState } from "react";
import ProjectBentoCard from "@/components/ProjectBentoCard";
import TemplateCard from "@/components/TemplateCard";
import { developmentDB } from "@/database/development.db";
import { uxuiDB } from "@/database/uxui.db";
import { templatesDB } from "@/database/templates.db";

const googleColors = [
  "linear-gradient(135deg, #4285F4 0%, #2B5CBC 100%)",
  "linear-gradient(135deg, #EA4335 0%, #C5221F 100%)",
  "linear-gradient(135deg, #FBBC04 0%, #E8A400 100%)",
  "linear-gradient(135deg, #34A853 0%, #1E8E3E 100%)",
  "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
  "linear-gradient(135deg, #EA4335 0%, #FBBC04 100%)",
];

const projectsData = [...uxuiDB, ...developmentDB];
const templatesData = templatesDB;

const Projects = () => {
  const [activeTab, setActiveTab] = useState("ux-ui");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = project.category === activeTab;
    const matchesSearch = !searchQuery.trim() || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
    const filteredTemplates = templatesData.filter((template) => {
    const matchesSearch = !searchQuery.trim() || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const tabProjects = projectsData.filter((p) => p.category === activeTab);
  

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Back Link------------------------------------------------------------------------------------------ */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          {/* header Section---------------------------------------------------------------------------------------------------------*/}
          <WorkHeader
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onSearch={setSearchQuery}
            projectCount={activeTab === "templates" ? templatesData.length : tabProjects.length}
            avgTime="3-4 weeks"
            successRate="98%"
          />
{/* Projects Grid */}
        <div className="mt-10">
          {activeTab === "templates" ? (
            // Template Gallery View
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template, index) => (
                  <TemplateCard key={template.name} template={template} index={index} />
                ))
              ) : (
                <div className="col-span-full bento-card p-12 text-center rounded-3xl">
                  <p className="text-muted-foreground text-lg">No templates found matching your search.</p>
                </div>
              )}
            </div>
          ) : (
            // Bento Card View for UX/UI and Development
            <div className="space-y-8">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <ProjectBentoCard key={project.name} project={project} index={index} />
                ))
              ) : (
                <div className="bento-card p-12 text-center rounded-3xl">
                  <p className="text-muted-foreground text-lg">No projects found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
