import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { SiMedium } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
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
    { href: "mailto:pukarlamichhane567@gmail.com", icon: Mail, label: "Email" },
    {
      href: "https://medium.com/@adhikarihemanta932",
      icon: SiMedium,
      label: "Medium",
    },
  ];

  return (
    <footer className="border-t border-border/30 py-10 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-1 font-display">
              Hemanta <span className="gradient-text">Adhikari</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              Software Engineer & Full-Stack Team Lead{" "}
            </p>
          </div>

          <div className="flex gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="p-2.5 rounded-xl glass-card group hover:border-primary/30"
                aria-label={link.label}
              >
                <link.icon
                  className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/20 text-center text-muted-foreground text-xs flex items-center justify-center gap-1">
          <p>© {currentYear} Hemanta Adhikari. Made with</p>
          <Heart className="w-3 h-3 text-destructive fill-destructive" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
