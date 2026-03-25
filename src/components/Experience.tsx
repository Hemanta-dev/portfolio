import { motion } from "framer-motion";
import { Briefcase, ChevronRight, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer / Full-Stack Team Lead",
    company: "Vairav Technology Security Pvt. Ltd.",
    location: "Kathmandu, Nepal",
    period: "Aug 2024 – Present",
    companyUrl: "https://vairavtech.com/",
    highlights: [
      "Leading full project development of advanced cybersecurity platforms (CTIPS & UEBA) with ML-powered threat prediction.",
      "Architected scalable frontend interfaces using React, TypeScript, Elastic UI, Tailwind CSS, and SCSS.",
      "Designed robust backend microservices and APIs using Node.js, PostgreSQL, Prisma ORM, Kafka, and Centrifugo.",
      "Developed alert management and data visualization systems leveraging ELK Stack and OpenSearch.",
      "Conducted code reviews, enforced best practices, and mentored junior developers.",
      "Developed advanced agentless security dashboards to monitor distributed systems efficiently.",
    ],
  },
  {
    title: "Associate Software Engineer",
    company: "Vairav Technology Security Pvt. Ltd.",
    location: "Kathmandu, Nepal",
    period: "Dec 2023 – Aug 2024",
    companyUrl: "https://vairavtech.com/",

    highlights: [
      "Built scalable, responsive UIs for cybersecurity platforms using React, TypeScript, Elastic UI, Tailwind, and SCSS.",
      "Developed threat monitoring dashboards with ELK Stack/OpenSearch, dynamic visualizations, and alert management tools.",
      "Created backend APIs and microservices in Node.js/TypeScript with PostgreSQL, Prisma, Kafka, and Centrifugo.",
      "Implemented automated testing with Jest and Cypress.",
    ],
  },
  {
    title: "Trainee – Software Engineer",
    company: "Vairav Technology Security Pvt. Ltd.",
    location: "Kathmandu, Nepal",
    period: "Aug 2023 – Nov 2023",
    companyUrl: "https://vairavtech.com/",

    highlights: [
      "Applied ELK Stack and MERN Stack knowledge to production-grade cybersecurity platforms.",
      "Contributed to backend API development, log indexing pipelines, and frontend dashboards.",
      "Improved real-time data visualization and alert systems in collaboration with senior engineers.",
    ],
  },
  {
    title: "Intern – Software Engineer (MERN & ELK Stack)",
    company: "Vairav Technology Security Pvt. Ltd.",
    location: "Kathmandu, Nepal",
    period: "Aug 2023 – Nov 2023",
    companyUrl: "https://vairavtech.com/",

    highlights: [
      "Learned and implemented ELK Stack (Elasticsearch, Logstash, Kibana) and MERN Stack.",
      "Built prototype dashboards and web applications for security monitoring.",
      "Contributed to backend API development, log indexing pipelines, and frontend dashboards.",
      "Improved real-time data visualization and alert systems in collaboration with senior engineers.",
    ],
  },
  {
    title: "Full-Stack Developer (Entry-Level / WordPress & PHP)",
    company: "Versity Tech Pvt. Ltd.",
    location: "Kathmandu, Nepal",
    period: "Jan 2023 – Jul 2023",
    companyUrl: "https://versitytech.com/",
    highlights: [
      "Developed multiple business websites using WordPress, PHP, MySQL, HTML, CSS, JavaScript, Bootstrap, and jQuery.",
      "Built responsive, user-friendly interfaces for clients, ensuring optimal UX across devices.",
      "Created custom WordPress themes and implemented backend functionality with PHP and SQL.",
      "Projects included: Sunaulo News portal, SBS Education and Visa Services, Nepal Axix Energy Traders static site.",
      "Collaborated with team members to deliver fully functional web applications on time.",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest font-display">
              Career
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-display">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl">
            From Versity Tech to Vairav Tech, building PHP, MERN, and ML-powered
            cybersecurity platforms.
          </p>
        </motion.div>

        <div className="space-y-6 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[2.1rem] top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-secondary/20 to-transparent hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative md:pl-16"
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-5 top-8 w-5 h-5 rounded-full border-2 border-primary bg-background z-10 items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <div className="card-3d rounded-2xl p-6 md:p-8 group">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-display group-hover:text-primary transition-colors leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium mt-1.5 text-sm">
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary/80 transition-colors"
                      >
                        {exp.company}
                      </a>{" "}
                      • {exp.location}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full whitespace-nowrap self-start border border-border/50">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2.5 mt-4">
                  {exp.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm sm:text-base"
                    >
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
