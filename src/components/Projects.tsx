import { useState } from "react";
import { Code2, Github, ChevronDown, ChevronUp, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  {
    role: "Software Engineer / Full Stack Team Lead",
    company: "Vairav Technology Security Pvt. Ltd.",
    duration: "Aug 2024 – Present",
    items: [
      {
        title: "Cyber Threat Intelligence Prediction System (CTIPS)",
        role: "Team Lead",
        description:
          "ML-powered cybersecurity platform for threat prediction and real-time monitoring.",
        bullets: [
          "Led full project architecture and development.",
          "Built scalable dashboards using React, TypeScript, Elastic UI.",
          "Designed backend microservices with Node.js, Prisma, OpenSearch.",
          "Implemented Kafka + Centrifugo for real-time updates.",
        ],
        tags: ["React", "TypeScript", "Node.js", "Kafka", "OpenSearch"],
        accent: "from-primary to-secondary",
      },
      {
        title: "User and Entity Behavior Analytics (UEBA)",
        role: "Team Lead",
        description:
          "Behavior analytics platform detecting anomalies using ML.",
        bullets: [
          "Developed analytics dashboards and pipelines.",
          "Built backend using Node.js, Kafka, Prisma.",
          "Implemented real-time alerting system.",
        ],
        tags: ["React", "Kafka", "OpenSearch"],
        accent: "from-secondary to-accent",
      },
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Vairav Technology Security Pvt. Ltd.",
    duration: "Dec 2023 – Aug 2024",
    items: [
      {
        title: "Incident Response Management System",
        role: "Full-Stack Developer",
        description: "System for managing alert lifecycle and investigations.",
        bullets: [
          "Built alert lifecycle workflows.",
          "Developed dashboards with React + Elastic Charts.",
          "Designed backend APIs using Node.js.",
        ],
        tags: ["React", "Node.js", "ELK Stack"],
        accent: "from-primary to-secondary",
      },
      {
        title: "Agentless",
        role: "Frontend Developer",
        description:
          "Developed dashboards for monitoring multiple database logs and security events without endpoint agents.",
        bullets: [
          "Built dashboards using OpenSearch UI and Elastic Charts for dynamic visualization.",
          "Implemented state management using RTK Query for efficient data handling.",
        ],
        tags: [
          "React",
          "Tailwind",
          "PostgreSQL",
          "OpenSearch",
          "Elastic Charts",
          "RTK Query",
        ],
        accent: "from-accent to-primary",
      },
      {
        title: "Governance, Risk, and Compliance (GRC)",
        role: "Frontend Developer",
        description: "Compliance and risk monitoring dashboards.",
        bullets: [
          "Built dashboards using Shadcn UI + Tailwind.",
          "Developed risk visualization modules.",
        ],
        tags: ["React", "Tailwind", "PostgreSQL"],
        accent: "from-accent to-primary",
      },
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Versity Tech Pvt. Ltd., Kathmandu",
    duration: "Jan 2023 – Present",
    items: [
      {
        title: "Sunaulo News",
        role: "Full-Stack Developer",
        description:
          "News portal with content management system built using WordPress with custom theme development.",
        bullets: [
          "Developed custom WordPress theme using PHP and MySQL.",
          "Built responsive UI using HTML, CSS, Bootstrap, and jQuery.",
          "Implemented CMS features for managing news content.",
        ],
        tags: ["WordPress", "PHP", "MySQL", "Bootstrap", "jQuery"],
        accent: "from-accent to-secondary",
      },
      {
        title: "SBS Education and Visa Services",
        role: "Full-Stack Developer",
        description:
          "Corporate website showcasing education and visa consultancy services.",
        bullets: [
          "Developed responsive frontend using HTML, CSS, Bootstrap, and JS.",
          "Built custom WordPress backend with PHP and MySQL.",
          "Designed user-friendly layout for service presentation.",
        ],
        tags: ["WordPress", "PHP", "JavaScript", "Bootstrap"],
        accent: "from-primary to-accent",
      },
      {
        title: "Nepal Axix Energy Traders",
        role: "Frontend Developer",
        description:
          "Static business website for electrical products and services.",
        bullets: [
          "Built static website using HTML, CSS, Bootstrap, and jQuery.",
          "Focused on clean UI and product showcase layout.",
        ],
        tags: ["HTML", "CSS", "Bootstrap", "jQuery"],
        accent: "from-secondary to-primary",
      },
    ],
  },
  {
    role: "College Projects",
    company: "Nepal College of Information Technology",
    duration: "2017 – 2022",
    items: [
      {
        title: "Automated Fare Collection System",
        role: "Full-Stack Developer",
        description:
          "IoT-based smart transport system using RFID and embedded devices.",
        bullets: [
          "Built system using Next.js, Node.js, PostgreSQL, and GraphQL.",
          "Integrated Raspberry Pi and Arduino with RFID.",
          "Developed APIs for hardware-backend communication.",
        ],
        tags: ["Next.js", "Node.js", "PostgreSQL", "GraphQL", "IoT"],
        accent: "from-primary to-accent",
      },
    ],
  },
];

const Projects = () => {
  const [expandedProjects, setExpandedProjects] = useState<
    Record<number, boolean>
  >({});
  const [showAll, setShowAll] = useState(false);

  const flatProjects = projects.flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      groupRole: group.role,
      company: group.company,
    })),
  );

  const displayedProjects = showAll ? flatProjects : flatProjects.slice(0, 4);

  const toggleProject = (index: number) => {
    setExpandedProjects((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="projects" className="py-24 md:py-32 px-4 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest font-display">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-display">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Professional projects I've built and led
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {displayedProjects.map((project: any, index: any) => {
            const isExpanded = expandedProjects[index];
            const displayBullets = isExpanded
              ? project.bullets
              : project.bullets.slice(0, 3);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                className="card-3d rounded-2xl p-6 md:p-7 group flex flex-col relative overflow-hidden"
              >
                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.accent} opacity-60`}
                />

                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold mb-1 group-hover:text-primary transition-colors font-display leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                      {project.role}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {project.groupRole} • {project.company}
                    </p>
                  </div>
                  <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0 ml-3">
                    <Code2 className="w-4 h-4 text-primary" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <ul className="mb-4 space-y-2 flex-1">
                  <AnimatePresence mode="sync">
                    {displayBullets.map((point, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-start gap-2 text-sm leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        <span className="text-muted-foreground">{point}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {project.bullets.length > 3 && (
                  <button
                    onClick={() => toggleProject(index)}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold mb-4 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                    {isExpanded
                      ? "Show Less"
                      : `+${project.bullets.length - 3} more`}
                  </button>
                )}

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="skill-tag text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4"
                  >
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20"
                      variant="default"
                      size="sm"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </Button>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

        {flatProjects.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              size="lg"
              className="rounded-xl px-8 border-primary/30 hover:border-primary/60 hover:bg-primary/5"
            >
              {showAll ? "Show Less" : "Show More Projects"}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
