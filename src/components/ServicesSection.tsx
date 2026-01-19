import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Layout,
  Brush,
  Code2,
  Briefcase,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ServiceRequestForm from "@/components/ServiceRequestForm";

/* ------------------ animations ------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ------------------ data ------------------ */

const services = {
  ux: {
    id: "ux-ui",
    title: "UX/UI Design",
    description:
      "I design clear, intuitive interfaces that make digital products easy to understand and enjoyable to use — balancing user needs, business goals, and technical feasibility.",
    icon: Layout,
    focusAreas: [
      "User research & journeys",
      "Wireframes → high-fidelity UI",
      "Design systems & accessibility",
    ],
  },
  frontend: {
    id: "web",
    title: "Frontend Development",
    description:
      "I build responsive, high-performance frontends that bring designs to life with clean, maintainable code.",
    icon: Code2,
    focusAreas: [
      "Modern JavaScript frameworks",
      "Component-driven architecture",
      "Performance & responsiveness",
    ],
  },
  product: {
    id: "product",
    title: "Product Design",
    description:
      "I help shape products from early ideas to usable solutions — focusing on structure, flows, and decisions.",
    icon: Lightbulb,
    focusAreas: [
      "Product strategy & thinking",
      "UX problem-solving",
      "MVP & feature definition",
    ],
  },
  brand: {
    id: "identity",
    title: "Brand / Identity",
    description:
      "I define clear, scalable brand identities for digital products — from logos to visual systems.",
    icon: Brush,
    focusAreas: [
      "Logo & visual identity",
      "Brand systems",
      "Digital-first storytelling",
    ],
  },
};

/* ------------------ decorative layers ------------------ */

function UxDecoration() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/30 blur-[120px]" />
    </div>
  );
}

/* ------------------ abstract design elements ------------------ */

function UiWireframeBg() {
  return (
    <svg
      className="absolute inset-6 w-full h-full opacity-[0.08] pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
    >
      <rect x="20" y="20" width="160" height="40" rx="6" stroke="currentColor" />
      <rect x="20" y="80" width="260" height="120" rx="8" stroke="currentColor" />
      <rect x="200" y="20" width="140" height="40" rx="6" stroke="currentColor" />
      <rect x="300" y="80" width="60" height="120" rx="6" stroke="currentColor" />
    </svg>
  );
}

function CodeMatrixBg() {
  return (
    <svg
      className="absolute inset-6 w-full h-full opacity-[0.08] pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
    >
      {[...Array(10)].map((_, i) => (
        <line
          key={i}
          x1={40 + i * 30}
          y1="20"
          x2={40 + i * 30}
          y2="280"
          stroke="currentColor"
          strokeDasharray="4 6"
        />
      ))}
    </svg>
  );
}

function ProductFlowBg() {
  return (
    <svg
      className="absolute inset-6 w-full h-full opacity-[0.08] pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
    >
      <circle cx="80" cy="150" r="8" fill="currentColor" />
      <circle cx="200" cy="80" r="8" fill="currentColor" />
      <circle cx="320" cy="180" r="8" fill="currentColor" />
      <path
        d="M80 150 C140 150 140 80 200 80 S260 180 320 180"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function BrandSystemBg() {
  return (
    <svg
      className="absolute inset-6 w-full h-full opacity-[0.08] pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
    >
      <rect x="60" y="40" width="80" height="80" rx="8" stroke="currentColor" />
      <rect x="160" y="40" width="180" height="24" rx="6" stroke="currentColor" />
      <rect x="160" y="80" width="140" height="16" rx="4" stroke="currentColor" />
      <rect x="60" y="160" width="280" height="80" rx="12" stroke="currentColor" />
    </svg>
  );
}
function CtaSystemBg() {
  return (
    <svg
      className="absolute inset-6 w-full h-full opacity-[0.08] pointer-events-none"
      viewBox="0 0 400 300"
      fill="none"
    >
      {/* Header block */}
      <rect
        x="40"
        y="30"
        width="200"
        height="32"
        rx="8"
        stroke="currentColor"
      />

      {/* Body text blocks */}
      <rect
        x="40"
        y="80"
        width="280"
        height="18"
        rx="6"
        stroke="currentColor"
      />
      <rect
        x="40"
        y="110"
        width="240"
        height="18"
        rx="6"
        stroke="currentColor"
      />

      {/* Action / button placeholder */}
      <rect
        x="40"
        y="160"
        width="140"
        height="40"
        rx="10"
        stroke="currentColor"
      />
    </svg>
  );
}

/* ------------------ component ------------------ */

export default function ServicesSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto">
        {/* HERO */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Services</span>
          </div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            What I <span className="gradient-text">Do</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            I help startups and teams design, build, and launch digital products —
            or step in wherever clarity and execution are needed.
          </motion.p>
        </motion.div>

        {/* GRID */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6"
        >
          {/* UX/UI */}
          <motion.div variants={itemVariants} className="md:col-span-7">
            <Link to={`/services/${services.ux.id}`} className="group block h-full">
              <div className="relative h-full p-8 rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition">
                <UxDecoration />
                <UiWireframeBg />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Layout className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold">
                        {services.ux.title}
                      </h2>
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <p className="text-muted-foreground mb-6">
                    {services.ux.description}
                  </p>
                  <div className="space-y-2">
                    {services.ux.focusAreas.map((area, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* FRONTEND */}
          <motion.div variants={itemVariants} className="md:col-span-5">
            <Link to={`/services/${services.frontend.id}`} className="group block h-full">
              <div className="relative h-full p-6 rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition">
                <CodeMatrixBg />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">
                        {services.frontend.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-6">
                    {services.frontend.description}
                  </p>
                  <div className="space-y-2">
                    {services.frontend.focusAreas.map((area, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        {area}
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </Link>
          </motion.div>

          {/* PRODUCT */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <Link to={`/services/${services.product.id}`} className="group block h-full">
              <div className="relative h-full p-6 rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-primary/30 transition">
                <ProductFlowBg />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">
                        {services.product.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {services.product.description}
                  </p>
                  <div className="space-y-2">
                    {services.product.focusAreas.map((area, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* BRAND */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <Link to={`/services/${services.brand.id}`} className="group block h-full">
              <div className="relative h-full p-6 rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-accent/30 transition">
                <BrandSystemBg />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                        <Brush className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-bold">
                        {services.brand.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {services.brand.description}
                  </p>
                  <div className="space-y-2">
                    {services.brand.focusAreas.map((area, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
                </div>
            </Link>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="md:col-span-4">
            <div className="h-full p-6 rounded-3xl bg-card border border-border/50 flex flex-col justify-center">
            
              <h3 className="text-2xl font-bold mb-3">
                Have a project in mind?
              </h3>
              <p className="text-muted-foreground mb-6">
                Tell me what you’re building, and I’ll help you find the right approach.
              </p>
              <Button variant="hero" size="lg" onClick={() => setIsFormOpen(true)}>
                Start a Conversation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* FORM */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="sr-only">Start a Project</DialogTitle>
          </DialogHeader>
          <ServiceRequestForm />
        </DialogContent>
      </Dialog>
    </section>
  );
}
