import { GraduationCap, BookOpen, Award } from "lucide-react";
import { motion } from "framer-motion";

const Education = () => {
  const modules = [
    "Computer Networks & Security",
    "Software Engineering",
    "Data Structures & Algorithms",
    "Database Systems",
    "Web Development",
    "Cloud Computing Basics",
  ];

  return (
    <section id="education" className="py-24 md:py-32 px-4">
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
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-primary uppercase tracking-widest font-display">
              Academic
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-display">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            My academic journey in Computer Engineering
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="card-3d rounded-2xl p-6 md:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-60" />

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 shrink-0 border border-primary/20">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-display">
                    Bachelor of Engineering (Computer Engineering)
                  </h3>
                  <p className="text-primary font-medium mt-1 text-sm">
                    Nepal College of Information Technology (NCIT), Balkumari, Lalitpur
                  </p>
                  <p className="text-muted-foreground font-medium mt-1 text-sm">
                    CGPA: 3.01 / 4.00
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full whitespace-nowrap self-start border border-border/50">
                  <Award className="w-3 h-3" />
                  2017–2022
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-5">
                Studied key topics in computer engineering including software development, database management, and networking.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {modules.map((module, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2.5 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {module}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;