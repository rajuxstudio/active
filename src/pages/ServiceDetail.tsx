import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Layout, 
  Lightbulb, 
  Code2, 
  Brush,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const servicesData: Record<string, {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  focusAreas: string[];
  longDescription: string;
  process: { title: string; description: string }[];
  deliverables: string[];
}> = {
  "ux-ui": {
    title: "UX/UI Design",
    description: "I design intuitive, user-first interfaces grounded in usability, structure, and visual clarity — ensuring every interaction feels purposeful and easy to use.",
    icon: Layout,
    color: "from-primary to-accent",
    focusAreas: [
      "User research & journeys",
      "Wireframes → high-fidelity UI",
      "Design systems & accessibility"
    ],
    longDescription: "Great design isn't just about aesthetics — it's about creating experiences that feel natural and intuitive. I focus on understanding your users, their needs, and their behaviors to craft interfaces that guide them effortlessly toward their goals. Every pixel serves a purpose, every interaction is intentional.",
    process: [
      { title: "Discovery", description: "Understanding your business goals, user needs, and competitive landscape" },
      { title: "Research", description: "User interviews, journey mapping, and identifying pain points" },
      { title: "Wireframing", description: "Low-fidelity sketches and information architecture" },
      { title: "Visual Design", description: "High-fidelity mockups with your brand identity" },
      { title: "Prototyping", description: "Interactive prototypes for testing and validation" },
      { title: "Handoff", description: "Developer-ready specs and design system documentation" }
    ],
    deliverables: [
      "User research findings & personas",
      "User flow diagrams",
      "Wireframes (low & high fidelity)",
      "Visual design mockups",
      "Interactive prototypes",
      "Design system documentation",
      "Developer handoff files"
    ]
  },
  "product": {
    title: "Product Design",
    description: "From early concepts to production-ready designs, I create research-driven digital products that solve real user and business problems.",
    icon: Lightbulb,
    color: "from-success to-primary",
    focusAreas: [
      "Product strategy & thinking",
      "UX problem-solving",
      "Scalable, system-based design"
    ],
    longDescription: "Product design is about solving the right problems in the right way. I work alongside you to define product strategy, validate ideas quickly, and build solutions that scale. My approach combines user-centered thinking with business acumen to create products that people love and that drive results.",
    process: [
      { title: "Strategy", description: "Aligning product vision with business objectives" },
      { title: "Ideation", description: "Brainstorming and concept exploration" },
      { title: "Validation", description: "Testing assumptions with real users" },
      { title: "Design", description: "Creating scalable, systematic solutions" },
      { title: "Iteration", description: "Refining based on feedback and data" },
      { title: "Launch Support", description: "Ensuring successful product release" }
    ],
    deliverables: [
      "Product strategy documentation",
      "Feature prioritization",
      "User stories & requirements",
      "Design specifications",
      "Usability test reports",
      "Launch-ready design files"
    ]
  },
  "web": {
    title: "Web Development",
    description: "I build responsive, high-performance websites that translate design into clean, maintainable code — without compromising speed, usability, or scalability.",
    icon: Code2,
    color: "from-warning to-destructive",
    focusAreas: [
      "Modern JavaScript frameworks",
      "Component-driven architecture",
      "Performance & responsiveness"
    ],
    longDescription: "Development isn't just about writing code — it's about building experiences that perform flawlessly across all devices and contexts. I specialize in modern web technologies, creating fast, accessible, and maintainable applications that bring designs to life exactly as envisioned.",
    process: [
      { title: "Architecture", description: "Planning the technical foundation" },
      { title: "Setup", description: "Configuring development environment and tools" },
      { title: "Development", description: "Building components and features" },
      { title: "Integration", description: "Connecting APIs and backend services" },
      { title: "Testing", description: "Ensuring quality across browsers and devices" },
      { title: "Deployment", description: "Launching to production with CI/CD" }
    ],
    deliverables: [
      "Fully responsive website/application",
      "Clean, documented codebase",
      "Performance optimization",
      "SEO implementation",
      "Analytics integration",
      "Deployment setup"
    ]
  },
  "identity": {
    title: "Identity Design",
    description: "I craft cohesive brand identities — from logos to visual systems — that communicate clarity, trust, and personality across digital touchpoints.",
    icon: Brush,
    color: "from-accent to-primary",
    focusAreas: [
      "Logo & visual identity",
      "Brand systems",
      "Digital-first storytelling"
    ],
    longDescription: "Your brand is more than a logo — it's the feeling people get when they interact with your product. I create comprehensive identity systems that tell your story consistently across every touchpoint, building recognition, trust, and emotional connection with your audience.",
    process: [
      { title: "Brand Discovery", description: "Understanding your values, audience, and positioning" },
      { title: "Research", description: "Competitive analysis and market research" },
      { title: "Concept Development", description: "Exploring visual directions" },
      { title: "Refinement", description: "Perfecting the chosen direction" },
      { title: "System Creation", description: "Building comprehensive brand guidelines" },
      { title: "Application", description: "Applying across all touchpoints" }
    ],
    deliverables: [
      "Logo design (primary & variations)",
      "Color palette & typography",
      "Brand guidelines document",
      "Icon & illustration style",
      "Social media templates",
      "Business collateral designs"
    ]
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to="/#services" className="text-primary hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32">
        <div className="container">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="px-4"
          >
            {/* Back Button */}
                      <Link
            to="/#services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

            {/* Service Header */}
            <motion.div variants={itemVariants} className="flex items-start gap-6 mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                <Icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-3">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Service
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{service.title}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">{service.description}</p>
              </div>
            </motion.div>

            {/* Long Description */}
            <motion.div 
              variants={itemVariants}
              className="p-8 rounded-3xl bg-card border border-border/50 mb-12"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">{service.longDescription}</p>
            </motion.div>

            {/* Focus Areas */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Focus Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.focusAreas.map((area, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-2xl bg-muted/50 border border-border/30"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="font-medium text-foreground">{area}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">My Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.process.map((step, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Deliverables */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">What You'll Get</h2>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.deliverables.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
          </motion.div>
        </div>
      </main>

      {/* Service Request Form */}
      <section id="request-form" className="py-16 lg:py-24 px-4 bg-muted/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8"
          >
            <ServiceRequestForm defaultService={service.title} />
          </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServiceDetail;
