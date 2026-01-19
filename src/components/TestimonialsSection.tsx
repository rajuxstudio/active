import { Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";
import rupaAvatar from "@/assets/rupa-avatar.png";
import vsSibiAvatar from "@/assets/vs-sibi-avatar.png";

const testimonials = [
  {
    quote: "I highly recommend Rajvir for his exceptional label and logo design skills. His designs not only captivate visually but also enhance product presentation and user interaction. His creativity, professionalism, and deep understanding of design make him a valuable asset to any team.",
    author: "V.S. Sibi",
    role: "Entrepreneur | UX-Product Designer | Ex-Amazon",
    date: "April 11, 2025",
    rating: 5.0,
    avatar: vsSibiAvatar,
  },
  {
    quote: "Raj Vir played a pivotal role in my professional growth. His ability to break down complex concepts into easily understandable modules was truly impressive. What sets him apart is his unwavering commitment to mentoring. I owe a significant part of my success as a UX designer to his mentorship.",
    author: "Rupa Mothukuri",
    role: "User Experience Design (UX) | Product Design",
    date: "Feb 10, 2025",
    rating: 5.0,
    avatar: rupaAvatar,
  },
  {
    quote: "Rajvir is a UX treasure trove. We had the opportunity to work with him on our UX process which involved various aspects of user behavior. He was able to decipher minute details very quickly and give us insights into the UX flow that were fundamentally critical to our application.",
    author: "Syed Asim",
    role: "AI Product Leader (Robotics & EdTech)",
    date: "Feb 28, 2022",
    rating: 5.0,
    avatar: null,
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  // Calculate position on vertical semi-circle arc
  const getPosition = (index: number, total: number, isMobile: boolean) => {
    const offset = index - activeIndex;
    const normalizedOffset = ((offset % total) + total) % total;
    const adjustedOffset = normalizedOffset > total / 2 ? normalizedOffset - total : normalizedOffset;
    
    const angleSpread = isMobile ? 40 : 45;
    const angle = adjustedOffset * angleSpread;
    const angleRad = (angle * Math.PI) / 180;
    
    const radius = isMobile ? 70 : 100;
    
    const x = Math.sin(Math.abs(angleRad)) * radius * 0.3;
    const y = Math.sin(angleRad) * radius;
    
    return { x, y, angle: adjustedOffset };
  };

  return (
    <section className="min-h-screen flex flex-col justify-center py-16 lg:py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[200px] md:h-[400px] rounded-full bg-accent/5 blur-[100px] md:blur-[150px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-20">
          <span className="inline-block px-4 py-2 rounded-full glass text-xs md:text-sm font-medium text-accent mb-4 lg:mb-6">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 lg:mb-6">
            Results that speaks volume
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Find out how our happy clients are raving about us.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center gap-8 max-w-sm mx-auto">
          {/* Horizontal avatar row for mobile */}
          <div className="flex items-center justify-center gap-4">
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  className="cursor-pointer transition-all duration-500"
                  onClick={() => handleClick(index)}
                >
                  <div
                    className={`rounded-full transition-all duration-500 flex items-center justify-center font-display font-bold overflow-hidden ${
                      isActive
                        ? "w-14 h-14 ring-2 ring-accent ring-offset-2 ring-offset-background bg-gradient-accent text-accent-foreground text-lg scale-100"
                        : "w-10 h-10 bg-muted text-muted-foreground text-sm scale-90 opacity-50"
                    }`}
                  >
                    {testimonial.avatar ? (
                      <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
                    ) : (
                      testimonial.author.charAt(0)
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active author info for mobile */}
          <div className="text-center transition-all duration-500">
            <div className="font-display font-semibold text-foreground text-lg">
              {testimonials[activeIndex].author}
            </div>
            <div className="flex items-center justify-center gap-1 text-sm mt-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-accent font-medium">{testimonials[activeIndex].rating}</span>
              <span className="text-muted-foreground text-xs">on {testimonials[activeIndex].date}</span>
            </div>
          </div>

          {/* Quote for mobile */}
          <div className="relative px-2">
            <div className="relative w-8 h-8 mb-4 mx-auto">
              <Quote className="w-full h-full text-accent/20 absolute top-0.5 left-0.5 blur-[1px]" />
              <Quote className="w-full h-full text-accent relative drop-shadow-sm" style={{ filter: 'drop-shadow(1px 2px 2px hsl(var(--accent) / 0.3))' }} />
            </div>
            
            <div className="relative min-h-[180px]">
              {testimonials.map((testimonial, index) => (
                <p
                  key={index}
                  className={`text-lg leading-relaxed text-foreground/90 font-light italic text-center transition-all duration-500 absolute inset-0 ${
                    index === activeIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
                >
                  {testimonial.quote}
                </p>
              ))}
            </div>

            <div className="mt-6 text-muted-foreground text-center text-sm">
              — {testimonials[activeIndex].role}
            </div>
          </div>

          {/* Navigation dots for mobile */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-accent w-6"
                    : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row items-center justify-center gap-24  mx-auto">
          {/* Left side - Quote */}
          <div className="flex-1 ">
            <div className="relative">
              <div className="relative w-8 h-8 lg:w-10 lg:h-10 mb-4 lg:mb-6">
                <Quote className="w-full h-full text-accent/20 absolute top-0.5 left-0.5 blur-[1px]" />
                <Quote className="w-full h-full text-accent relative drop-shadow-sm" style={{ filter: 'drop-shadow(1px 2px 2px hsl(var(--accent) / 0.3))' }} />
              </div>
              
              <div className="relative min-h-[140px] lg:min-h-[160px]">
                {testimonials.map((testimonial, index) => (
                  <p
                    key={index}
                    className={`text-lg lg:text-2xl leading-relaxed text-foreground/90 font-light italic transition-all duration-500 absolute inset-0 ${
                      index === activeIndex
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    {testimonial.quote}
                  </p>
                ))}
              </div>

              <div className="mt-6 lg:mt-8 text-sm lg:text-base text-muted-foreground transition-all duration-500">
                — {testimonials[activeIndex].role}
              </div>
            </div>
          </div>

          {/* Right side - Semi-circle rotating carousel */}
          <div className="relative w-64 h-72 flex items-center justify-center">

            {testimonials.map((testimonial, index) => {
              const { x, y, angle } = getPosition(index, testimonials.length, false);
              const isActive = index === activeIndex;
              const absAngle = Math.abs(angle);

              return (
                <div
                  key={index}
                  className="absolute cursor-pointer transition-all duration-700 ease-out"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    zIndex: isActive ? 10 : 5 - absAngle,
                  }}
                  onClick={() => handleClick(index)}
                >
                  <div
                    className={`relative transition-all duration-500 ${
                      isActive ? "scale-100" : "scale-75 opacity-60"
                    }`}
                  >
                    <div
                      className={`rounded-full transition-all duration-500 flex items-center justify-center font-display font-bold overflow-hidden ${
                        isActive
                          ? "w-16 h-16 ring-2 ring-accent ring-offset-2 ring-offset-background bg-gradient-accent text-accent-foreground text-xl"
                          : "w-12 h-12 bg-muted text-muted-foreground text-sm"
                      }`}
                    >
                      {testimonial.avatar ? (
                        <img src={testimonial.avatar} alt={testimonial.author} className="w-full h-full object-cover" />
                      ) : (
                        testimonial.author.charAt(0)
                      )}
                    </div>

                    <div
                      className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-right transition-all duration-500 ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4 pointer-events-none"
                      }`}
                    >
                      <div className="font-display font-semibold text-foreground">
                        {testimonial.author}
                      </div>
                      <div className="flex items-center justify-end gap-1 text-sm">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="text-accent font-medium">{testimonial.rating}</span>
                        <span className="text-muted-foreground text-xs">on {testimonial.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
