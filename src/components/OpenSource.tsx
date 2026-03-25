import { Github, GitFork, Star, ExternalLink } from "lucide-react";

const contributions = [
  // {
  //   project: "React",
  //   description: "A JavaScript library for building user interfaces",
  //   contributions: [
  //     "Fixed bug in useEffect hook dependency tracking",
  //     "Improved TypeScript definitions for React.memo",
  //     "Added documentation for Concurrent Mode features",
  //   ],
  //   stats: {
  //     stars: "220k+",
  //     forks: "45k+",
  //   },
  //   url: "https://github.com/facebook/react",
  // },
  // {
  //   project: "Next.js",
  //   description: "The React Framework for Production",
  //   contributions: [
  //     "Optimized image loading performance in production builds",
  //     "Added support for custom middleware configuration",
  //     "Fixed routing issues with dynamic segments",
  //   ],
  //   stats: {
  //     stars: "120k+",
  //     forks: "26k+",
  //   },
  //   url: "https://github.com/vercel/next.js",
  // },
  // {
  //   project: "TailwindCSS",
  //   description: "A utility-first CSS framework",
  //   contributions: [
  //     "Added new gradient utilities for complex designs",
  //     "Improved dark mode configuration options",
  //     "Fixed animation class conflicts in production",
  //   ],
  //   stats: {
  //     stars: "78k+",
  //     forks: "4k+",
  //   },
  //   url: "https://github.com/tailwindlabs/tailwindcss",
  // },
];

const OpenSource = () => {
  return (
    <section id="opensource" className="py-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Space_Grotesk']">
            Open Source <span className="gradient-text">Contributions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Contributing to the community and learning from open source projects
          </p>
        </div>

        {/* Contributions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributions.map((contribution, index) => (
            <div
              key={index}
              className="card-gradient rounded-xl p-6 hover-lift group"
            >
              {/* Header with GitHub icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <a
                  href={contribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                  aria-label={`View ${contribution.project} on GitHub`}
                >
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>

              {/* Project Name & Description */}
              <h3 className="text-xl font-bold mb-2 font-['Space_Grotesk']">
                {contribution.project}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {contribution.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="w-4 h-4" />
                  <span>{contribution.stats.stars}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <GitFork className="w-4 h-4" />
                  <span>{contribution.stats.forks}</span>
                </div>
              </div>

              {/* Contributions List */}
              <ul className="space-y-2">
                {contribution.contributions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary text-sm mt-1 shrink-0">
                      •
                    </span>
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
