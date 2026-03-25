import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Typewriter } from "react-simple-typewriter";
import { SiMedium } from "react-icons/si";
import toast, { Toaster } from "react-hot-toast";
import CV from "@/assets/Office Hemanta Adhikari.pdf";


const Scene3D = lazy(() => import("./Scene3D"));

const Hero = () => {
  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = CV;
    link.download = "Hemanta_Adhikari_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CV downloaded successfully!");
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 pt-20 pb-12 relative overflow-hidden"
      aria-label="Hero section - Introduction"
    >
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      <Toaster position="top-right" reverseOrder={false} />

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/80 backdrop-blur-sm" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent backdrop-blur-sm" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm border border-primary/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-muted-foreground font-medium">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-display leading-[1.1]">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="block text-foreground"
            >
              Hi, I'm
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="block gradient-text-animated"
            >
              <Typewriter
                words={[
                  "Hemanta Adhikari",
                  "Software Engineer",
                  "Full Stack Team Lead",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-sm text-muted-foreground mb-6 font-display font-light max-w-2xl"
          >
            Experienced in building scalable applications, dashboards, and
            microservices integration with React, Node.js, TypeScript, and
            real-time systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <a href="#contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  Get In Touch
                </Button>
              </a>
              <a href="#projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-8 h-12 text-base border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/60 transition-all duration-300 backdrop-blur-sm"
                >
                  View Projects
                </Button>
              </a>

              <Button
                size="lg"
                onClick={handleDownloadCV}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold rounded-xl px-8 h-12 text-base shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300"
              >
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-sm"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>Kathmandu, Nepal</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a
                href="mailto:pukarlamichhane567@gmail.com"
                className="hover:text-primary transition-colors truncate"
              >
                adhikarihemanta932@gmail.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex gap-3"
          >
            {[
              {
                href: "https://github.com/Hemanta-dev",
                icon: Github,
                label: "GitHub",
              },
              {
                href: "https://www.linkedin.com/in/hemanta-adhikari-484264227/",
                icon: Linkedin,
                label: "LinkedIn",
              },
              {
                href: "https://medium.com/@adhikarihemanta932",
                icon: SiMedium,
                label: "Medium",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl glass-card group hover:border-primary/40 transition-all duration-300"
                aria-label={`Visit ${link.label}`}
              >
                <link.icon
                  className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors"
                  aria-hidden="true"
                />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/60">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
