import { Code, Database, TestTube, Palette, Wrench, Zap } from "lucide-react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    icon: Code,
    title: "Frontend",
    skills: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "Elastic UI",
      "OpenSearch UI",
      "Elastic Charts",
      "OpenSearch Charts",
      "Shadcn UI",
      "Tailwind CSS",
      "SCSS",
      "Bootstrap",
      "HTML5",
      "CSS3",
      "Redux",
      "RTK",
      "RTK Query",
      "React Hooks",
      "Axios",
    ],
    gradient: "from-primary to-primary/60",
  },
  {
    icon: Database,
    title: "Backend & Databases",
    skills: [
      "Node.js",
      "Express.js",
      "REST API",
      "GraphQL",
      "Prisma ORM",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "OpenSearch",
      "ELK Stack (Elasticsearch, Logstash, Kibana)",
    ],
    gradient: "from-secondary to-secondary/60",
  },
  {
    icon: TestTube,
    title: "Testing & QA",
    skills: [
      "Jest (Unit Testing)",
      "Cypress (E2E Testing)",
      "Integration Testing",
      "Backend Testing",
    ],
    gradient: "from-accent to-accent/60",
  },
  {
    icon: Palette,
    title: "UI & Design Tools",
    skills: [
      "Figma",
      "Responsive Design",
      "CSS/SCSS",
      "Tailwind CSS",
      "Elastic UI",
      "Shadcn UI",
      "Bootstrap",
    ],
    gradient: "from-primary to-secondary/60",
  },
  {
    icon: Wrench,
    title: "Tools & DevOps",
    skills: [
      "Git",
      "GitHub",
      "GitLab",
      "Jira",
      "Postman",
      "Linux Terminal",
      "VS Code",
      "Yarn/NPM",
      "Centrifugo",
      "Kafka",
      "Docker",
      "Swagger",
    ],
    gradient: "from-secondary to-accent/60",
  },
  {
    icon: Zap,
    title: "Architecture & Real-time Systems",
    skills: [
      "Microservices",
      "Real-time Dashboards",
      "Multi-threaded Architecture",
      "Agentless Security Monitoring",
    ],
    gradient: "from-accent to-primary/60",
  },
  {
    icon: Code,
    title: "CMS & PHP",
    skills: ["WordPress", "PHP", "MySQL"],
    gradient: "from-primary to-secondary/60",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 px-4 relative mesh-gradient">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-display">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card-3d rounded-2xl p-6 group relative overflow-hidden"
              >
                {/* Hover gradient accent */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${category.gradient} bg-opacity-10`}
                    >
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-base font-display">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
