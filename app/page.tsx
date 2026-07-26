"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Database,
  GitBranch,
  Camera,
  BriefcaseBusiness,
  Mail,
  Menu,
  Server,
  Sparkles,
  X,
  Wrench,
  Cloud,
} from "lucide-react";

const skills = [
  { title: "Frontend", icon: Code2, items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { title: "Backend", icon: Server, items: ["Node.js", "REST APIs", "Authentication", "Python"] },
  { title: "Databases", icon: Database, items: ["PostgreSQL", "MongoDB", "Prisma", "Redis"] },
  { title: "Cloud", icon: Cloud, items: ["Vercel", "AWS", "Docker", "CI/CD"] },
  { title: "Tools", icon: Wrench, items: ["Figma", "Git", "GSAP", "Framer Motion"] },
];

const projects = [
  {
    number: "01",
    title: "Sika Link",
    type: "Digital platform",
    copy: "A focused web product built to make access, connection and everyday digital interactions feel simple and direct.",
    stack: ["Product Design", "Web Development", "Responsive UI"],
    tone: "blue",
    url: "https://sika-link-one.vercel.app/",
    image: "/project-sika-link.png",
    orientation: "landscape",
  },
  {
    number: "02",
    title: "Flash’d",
    type: "Social experience",
    copy: "A bold, fast-moving digital experience with an energetic interface designed around discovery and engagement.",
    stack: ["Web Application", "Interaction Design", "Frontend"],
    tone: "silver",
    url: "https://flashd-beta-v1-six.vercel.app/",
    image: "/project-flashd.png",
    orientation: "landscape",
  },
  {
    number: "03",
    title: "Crafts by Tee",
    type: "Creative commerce",
    copy: "A warm, craft-led digital storefront that gives handmade products a considered and approachable online home.",
    stack: ["E-commerce", "Brand Design", "Responsive UI"],
    tone: "warm",
    url: "https://craftsbytee.vercel.app/",
    image: "/project-crafts-by-tee.png",
    orientation: "landscape",
  },
  {
    number: "04",
    title: "Best Buy Construction",
    type: "Construction commerce",
    copy: "A practical product experience for discovering professional tools and building materials with clarity and confidence.",
    stack: ["Product Catalogue", "E-commerce", "Web Development"],
    tone: "construction",
    url: "https://bestbuyconstruction-product.com/",
    image: "/project-best-buy.png",
    orientation: "landscape",
  },
];

const socials = [
  { label: "GitHub", icon: GitBranch, href: "https://github.com/" },
  { label: "LinkedIn", icon: BriefcaseBusiness, href: "https://linkedin.com/" },
  { label: "Email", icon: Mail, href: "mailto:hello@kelvin.dev" },
  { label: "X", icon: X, href: "https://x.com/" },
  { label: "Instagram", icon: Camera, href: "https://instagram.com/" },
];

function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / 2200) * 100));
      setProgress(p);
      if (p < 100) frame = requestAnimationFrame(tick);
      else window.setTimeout(onDone, 450);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <motion.div className="loader" exit={{ opacity: 0, filter: "blur(18px)" }} transition={{ duration: 0.75 }}>
      <div className="loader-mark" aria-label="Kelvin">
        {"KELVIN".split("").map((letter, i) => (
          <span key={letter + i} className={`cutout cutout-${i}`}>{letter}</span>
        ))}
      </div>
      <div className="loader-count">{String(progress).padStart(3, "0")}%</div>
      <div className="loader-track"><span style={{ width: `${progress}%` }} /></div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  const navMark = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (loading || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const ctx = gsap.context(() => {
      if (!reduceMotion && portrait.current && navMark.current) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          const target = navMark.current!.getBoundingClientRect();
          const source = portrait.current!.getBoundingClientRect();
          gsap.timeline({
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 35%", scrub: 0.7 },
          })
            .to(portrait.current, {
              x: target.left + target.width / 2 - (source.left + source.width / 2),
              y: target.top + target.height / 2 - (source.top + source.height / 2),
              scale: 0.09, borderRadius: "50%", filter: "blur(8px)", ease: "power2.inOut",
            }, 0)
            .to(".portrait-copy", { opacity: 0, y: -25, ease: "power1.in" }, 0.05)
            .to(portrait.current, { opacity: 0, duration: 0.15 }, 0.82)
            .fromTo(navMark.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, ease: "power2.out" }, 0.82);
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 34, filter: "blur(10px)" }, {
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".project-shot").forEach((el) => {
        gsap.fromTo(el, { yPercent: -3, scale: 1.035 }, {
          yPercent: 3, scale: 1.035, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);

    const moveCursor = (e: MouseEvent) => {
      gsap.to(".cursor-dot", { x: e.clientX, y: e.clientY, duration: 0.15, overwrite: true });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      ctx.revert();
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [loading]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  if (loading) return <Loader onDone={() => setLoading(false)} />;

  return (
    <div ref={root} className="site-shell">
      <div className="cursor-dot" />
      <header className="nav-wrap">
        <nav className="nav" aria-label="Main navigation">
          <a ref={navMark} href="#home" className="nav-mark" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}>AK</a>
          <div className={`nav-links ${mobileOpen ? "is-open" : ""}`}>
            <a href="#projects" onClick={() => setMobileOpen(false)}>Projects</a>
            <a href="#skills" onClick={() => setMobileOpen(false)}>Skills</a>
            <button className={`contact-trigger ${contactOpen ? "active" : ""}`} onClick={() => setContactOpen(!contactOpen)} aria-expanded={contactOpen}>
              <span>Contact</span><ArrowDownRight size={15} />
            </button>
          </div>
          <button className="menu-button" aria-label="Toggle navigation" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className={`contact-drawer ${contactOpen ? "is-open" : ""}`}>
            <p>Let&apos;s build something with intent.</p>
            <div>
              {socials.map(({ label, icon: Icon, href }) => (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <Icon size={16} /><span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-grid" />
          <div className="hero-glow" />
          <p className="eyebrow hero-eyebrow">Independent creative developer <span>Accra, GH</span></p>
          <div ref={portrait} className="portrait">
            <Image src="/portfolio.JPG" alt="Kelvin Ankamah Adjei" fill priority sizes="(max-width: 680px) 230px, (max-width: 1200px) 25vw, 350px" />
            <div className="portrait-light" />
            <span className="portrait-id">KA—001</span>
          </div>
          <div className="portrait-copy">
            <h1>Kelvin Ankamah Adjei</h1>
            <p className="role">Designer <span>&amp;</span> Developer</p>
            <p className="intro">I engineer expressive digital experiences where clean design meets precise, purposeful code.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo("#projects")}>View projects <ArrowDownRight size={17} /></button>
              <button className="button button-ghost" onClick={() => setContactOpen(true)}>Contact <ArrowUpRight size={17} /></button>
            </div>
          </div>
          <div className="scroll-note">Scroll to explore <span /></div>
        </section>

        <section id="about" className="about section">
          <div className="section-label" data-reveal><span>01</span> About</div>
          <div className="about-layout">
            <p className="about-kicker" data-reveal>Function, feeling<br />and a little obsession.</p>
            <div data-reveal>
              <h2>I turn ambitious ideas into digital experiences that feel <em>inevitable.</em></h2>
              <p className="about-copy">I&apos;m a multidisciplinary designer and developer focused on high-performance interfaces. My work lives between systems thinking and visual storytelling—built with care, curiosity, and no wasted motion.</p>
              <div className="disciplines">
                {["Designer", "Frontend", "Backend", "Creative Developer", "Problem Solver"].map((item, i) => (
                  <span key={item}><small>0{i + 1}</small>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="skills section">
          <div className="section-label" data-reveal><span>02</span> Capabilities</div>
          <div className="section-heading" data-reveal>
            <h2>Built across the stack.</h2>
            <p>The right tool, used with intention.</p>
          </div>
          <div className="skills-grid">
            {skills.map(({ title, icon: Icon, items }, i) => (
              <motion.article key={title} className="skill-card" data-reveal whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                <div className="skill-top"><span>0{i + 1}</span><Icon size={19} /></div>
                <h3>{title}</h3>
                <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="projects section">
          <div className="section-label" data-reveal><span>03</span> Selected work</div>
          <div className="section-heading project-heading" data-reveal>
            <h2>Projects with<br /><em>horsepower.</em></h2>
            <p>Selected work across product, brand and technology.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.title} data-reveal>
                <a className={`project-visual visual-${project.tone} is-${project.orientation}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}>
                  <Image
                    className="project-shot"
                    src={project.image}
                    alt={`${project.title} website preview`}
                    fill
                    sizes="(max-width: 900px) 100vw, 62vw"
                  />
                  <span className="project-index">{project.number}</span>
                  <span className="project-watermark">{project.title.toUpperCase()}</span>
                </a>
                <div className="project-info">
                  <div>
                    <p>{project.type}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <p className="project-copy">{project.copy}</p>
                  <div className="project-meta">
                    <div>{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div>
                    <div className="project-links">
                      <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} live site`}><ArrowUpRight size={18} /></a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section section" data-reveal>
          <Sparkles size={22} />
          <p>Have a project in mind?</p>
          <h2>Let&apos;s make it<br /><em>move.</em></h2>
          <a className="button button-primary" href="mailto:hello@kelvin.dev">Start a conversation <ArrowUpRight size={18} /></a>
        </section>
      </main>

      <footer>
        <div className="footer-mark">AK</div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Kelvin Ankamah Adjei</p>
          <p>Built with Next.js · GSAP · Lenis · TailwindCSS</p>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
