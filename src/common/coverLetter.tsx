import { useState, ChangeEvent, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { FileText, X, Download, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";

type RGB = [number, number, number];

interface FormState {
  company: string;
  hiringManager: string;
  companyLocation: string;
  jobTitle: string;
  phone: string;
  website: string;
  github: string;
}

interface PDFOptions extends FormState {
  today: string;
}

const NAVY: RGB = [27, 58, 107];
const BLUE: RGB = [46, 95, 163];
const DARK: RGB = [31, 41, 55];
const GRAY: RGB = [107, 114, 128];

const PAGE_W = 210;
const MARGIN_L = 22;
const MARGIN_R = 22;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;

const DEFAULTS: FormState = {
  company: "",
  hiringManager: "",
  companyLocation: "Sydney, NSW, Australia",
  jobTitle: "Software Engineer",
  phone: "+977 9742428957",
  website: "hemantaadhikari.com.np",
  github: "github.com/Hemanta-dev",
};

const getToday = (): string =>
  new Date().toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const buildParagraphs = (company: string, jobTitle: string): string[] => [
  `I am writing to express my strong interest in a ${jobTitle} position at ${company}. With over three years of hands-on experience building and leading development of enterprise-grade cybersecurity platforms, I am confident I can bring immediate value to your engineering team.`,
  `In my current role as ${jobTitle} and Team Lead at Vairav Technology Security, I have led the full-stack development of two production platforms — CTIPS (Cyber Threat Intelligence Prediction System) and UEBA (User and Entity Behaviour Analytics) — from architecture through to deployment. Working across React, TypeScript, Node.js, PostgreSQL, Kafka, and the ELK Stack, I have built scalable frontends, RESTful microservices, and real-time data pipelines used by enterprise security teams. I have also mentored junior engineers and established engineering best practices across the team.`,
  `What drives me is solving complex problems through clean, maintainable code and thoughtful system design. I thrive in collaborative environments where engineers are empowered to take ownership, and I bring both the technical depth and team leadership experience to contribute meaningfully from day one.`,
  `Having recently relocated to Sydney, I am eager to join the Australian technology community and contribute to a team that values quality engineering. I would welcome the opportunity to discuss how my background aligns with the needs of ${company}.`,
  `Thank you for considering my application. I look forward to hearing from you.`,
];

const generatePDF = (opts: PDFOptions): void => {
  const { company, hiringManager, companyLocation, jobTitle, phone, website, github, today } = opts;
  const salutation = hiringManager.trim()
    ? `Dear ${hiringManager.trim()},`
    : "Dear Hiring Manager,";

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 14, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("HEMANTA ADHIKARI", MARGIN_L, 9.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  const headerParts = [jobTitle.trim(), "adhikarihemanta932@gmail.com"];
  if (website.trim()) headerParts.push(website.trim());
  doc.text(headerParts.filter(Boolean).join("  |  "), MARGIN_L, 13, { maxWidth: CONTENT_W });

  let y = 26;

  doc.setFontSize(9.5);
  doc.setTextColor(...GRAY);
  doc.text(today, MARGIN_L, y);
  y += 10;

  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "normal");
  doc.text(hiringManager.trim() || "Hiring Manager", MARGIN_L, y);
  y += 5;
  if (company.trim()) {
    doc.setFont("helvetica", "bold");
    doc.text(company.trim(), MARGIN_L, y);
    y += 5;
    doc.setFont("helvetica", "normal");
  }
  if (companyLocation.trim()) {
    doc.text(companyLocation.trim(), MARGIN_L, y);
    y += 5;
  }
  y += 6;

  doc.text(salutation, MARGIN_L, y);
  y += 9;

  doc.setFontSize(10);
  const companyLabel = company.trim() || "your organisation";
  const role = jobTitle.trim() || "Software Engineer";
  const lineHeight = 5.2;

  for (const para of buildParagraphs(companyLabel, role)) {
    const lines = doc.splitTextToSize(para, CONTENT_W) as string[];
    doc.text(lines, MARGIN_L, y);
    y += lines.length * lineHeight + 5;
  }

  y += 4;
  doc.text("Yours sincerely,", MARGIN_L, y);
  y += 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text("Hemanta Adhikari", MARGIN_L, y);
  y += 6;

  if (jobTitle.trim()) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...BLUE);
    doc.text(jobTitle.trim(), MARGIN_L, y);
    y += 5;
  }

  doc.setFontSize(8.5);
  doc.setTextColor(...GRAY);
  const line1 = ["adhikarihemanta932@gmail.com"];
  if (phone.trim()) line1.push(phone.trim());
  doc.text(line1.join("   |   "), MARGIN_L, y);
  y += 4.5;

  const line2: string[] = [];
  if (website.trim()) line2.push(website.trim());
  if (github.trim()) line2.push(github.trim());
  if (line2.length) {
    doc.text(line2.join("   |   "), MARGIN_L, y);
    y += 4.5;
  }

  doc.text("linkedin.com/in/hemanta-adhikari-484264227", MARGIN_L, y);

  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.4);
  doc.line(MARGIN_L, 285, PAGE_W - MARGIN_R, 285);
  doc.setTextColor(...GRAY);
  doc.setFontSize(7.5);
  doc.text(companyLocation.trim() || "Sydney, NSW, Australia", MARGIN_L, 289);
  if (website.trim()) {
    doc.text(website.trim(), PAGE_W - MARGIN_R, 289, { align: "right" });
  }

  const fileCompany = company.trim().replace(/\s+/g, "_") || "CoverLetter";
  doc.save(`Hemanta_Adhikari_Cover_Letter_${fileCompany}.pdf`);
};

interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, value, onChange, placeholder, autoFocus }) => (
  <div className="mb-3.5">
    <label className="block text-xs font-medium text-foreground/70 mb-1.5">{label}</label>
    <input
      autoFocus={autoFocus}
      type="text"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-primary/20 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
    />
  </div>
);

const CoverLetterGenerator: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const today = getToday();

  const set = (key: keyof FormState) => (val: string) => setForm(prev => ({ ...prev, [key]: val }));

  const handleClose = () => {
    setOpen(false);
    setShowAdvanced(false);
    setForm(DEFAULTS);
  };

  const handleDownload = async () => {
    setGenerating(true);
    try {
      generatePDF({ ...form, today });
      handleClose();
    } finally {
      setGenerating(false);
    }
  };

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const salutationPreview = form.hiringManager.trim() ? `Dear ${form.hiringManager.trim()},` : "Dear Hiring Manager,";

  return (
    <>
      <Button size="lg" onClick={() => setOpen(true)} variant="outline">
        <FileText className="w-4 h-4" /> Cover Letter
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm"
            onClick={handleOverlayClick}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="w-full max-w-md rounded-2xl border border-primary/20 p-6 shadow-2xl overflow-y-auto max-h-[90vh] bg-background"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="font-semibold text-foreground text-base">Generate Cover Letter</h2>
                </div>
                <button onClick={handleClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary/10">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="rounded-xl border border-primary/10 bg-primary/5 p-4 mb-5 text-xs text-muted-foreground leading-relaxed">
                <p className="mb-1 text-foreground/70 font-medium text-[11px] uppercase tracking-wide">Preview</p>
                <p>{today}</p>
                <p className="mt-1">{salutationPreview}</p>
                <p className="mt-1 line-clamp-2">
                  I am writing to express my strong interest in a {form.jobTitle || "Software Engineer"} position at <span className="text-primary font-medium">{form.company.trim() || "[Company Name]"}</span>...
                </p>
              </div>

              <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium mb-3">Recipient</p>
              <Field label="Company name" value={form.company} onChange={set("company")} placeholder="e.g. Atlassian" autoFocus />
              <Field label="Hiring manager name (optional)" value={form.hiringManager} onChange={set("hiringManager")} placeholder="e.g. Sarah Johnson" />
              <Field label="Company location (optional)" value={form.companyLocation} onChange={set("companyLocation")} placeholder="e.g. Sydney, NSW, Australia" />

              <button onClick={() => setShowAdvanced(v => !v)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1 mb-3">
                {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                {showAdvanced ? "Hide" : "Edit"} your contact details
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className="border border-primary/10 rounded-xl p-4 mb-4 bg-primary/5">
                      <Field label="Job title" value={form.jobTitle} onChange={set("jobTitle")} placeholder="Software Engineer" />
                      <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="+977 9742428957" />
                      <Field label="Website" value={form.website} onChange={set("website")} placeholder="hemantaadhikari.com.np" />
                      <Field label="GitHub" value={form.github} onChange={set("github")} placeholder="github.com/Hemanta-dev" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleClose}>Cancel</Button>
                <Button className="flex-1 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={generating} onClick={handleDownload}>
                  {generating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Download className="w-4 h-4" /> Download PDF</>}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CoverLetterGenerator;