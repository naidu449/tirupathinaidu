import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

function getExperience() {
  const start = new Date("2024-03-01");
  const now = new Date();
  const diffMs = now - start;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const years = diffDays / 365.25;
  const result = parseFloat(years.toFixed(1));
  return result % 1 === 0 ? `${result.toFixed(0)}` : `${result.toFixed(1)}`;
}

const EXP = getExperience();

const SKILLS = {
  "Languages": ["Java 8", "Java 11", "Java 17"],
  "Core Java": ["OOPs", "Collections", "Multithreading", "Streams", "Lambdas", "Optional"],
  "Frameworks": ["Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA"],
  "API & Testing": ["REST API", "Swagger/OpenAPI", "Postman", "JUnit", "Mockito"],
  "Database": ["PostgreSQL", "MySQL", "Hibernate", "JPA", "SQL Optimization"],
  "Security": ["JWT", "Spring Security", "AES-256", "RSA Encryption"],
  "Tools & Process": ["Git", "Maven", "Apache Tomcat", "Agile", "Scrum"],
};

const PROJECTS = [
  {
    name: "Aadhaar Authentication System",
    description:
      "This was one of my most challenging projects — a system that handles 2,000 to 3,000 Aadhaar verification requests every single day. I built the entire Spring Boot backend from scratch, including OTP, biometric, and demographic checks, and connected it with UIDAI's government APIs. Getting the response time down to ~0.2 seconds by fixing slow PostgreSQL queries was something I'm genuinely proud of.",
    tech: ["Spring Boot", "Spring Security", "JWT", "AES-256", "PostgreSQL", "REST API"],
    highlights: ["~0.2s API response time via query indexing", "Built end-to-end — design to deployment", "UIDAI government API integration"],
  },
  {
    name: "Digital Payment Web Application",
    description:
      "I worked on the backend of a payment app that talks to third-party .NET payment APIs. My job was to make sure transactions were processed correctly, errors were handled gracefully, and every piece of payment data stayed encrypted throughout. I also fixed several production bugs on my own just by tracing through logs — that taught me a lot about owning your code.",
    tech: ["Spring Boot", "JPA", "Hibernate", "JWT", "AES-256", "Agile"],
    highlights: ["End-to-end payment data encryption", "Third-party .NET API integration", "Self-resolved production incidents"],
  },
  {
    name: "Central KYC (Know Your Customer)",
    description:
      "I built and maintained the REST APIs that handle KYC verification for customers. One thing I really improved here was setting up Spring scheduled jobs to automatically sync bulk data — before that it was all manual work. After the project went live, I stayed involved in performance tuning and cleanup to make sure everything ran smoothly.",
    tech: ["Spring Boot", "REST API", "Spring Scheduler", "JPA", "PostgreSQL"],
    highlights: ["Automated bulk data sync with Spring Scheduler", "Post-live tuning & bug fixes", "Improved data accuracy across all flows"],
  },
];

const EXPERIENCE = [
  {
    role: "Java Developer",
    company: "Transaction Analysts India Pvt Ltd",
    duration: "March 2024 – Present",
    points: [
      "I've built REST APIs that are used in real government and financial systems — things that actually matter if they break.",
      "Security isn't an afterthought for me. I've used JWT, AES-256, and RSA encryption in production apps handling sensitive user data.",
      "I once tracked down a slow PostgreSQL query in production and fixed it to respond in ~0.2 seconds. That kind of debugging is something I enjoy.",
      "I work well in Agile teams — I show up to standups, take part in code reviews, and take full ownership of my tasks.",
    ],
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const width = useWindowWidth();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((l) => document.getElementById(l));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) {
          setActive(NAV_LINKS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = () => setMobileMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [mobileMenuOpen]);

  const copyEmail = () => {
    navigator.clipboard.writeText("tirupathinaidu199@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const px = isMobile ? "5%" : isTablet ? "7%" : "10%";
  const sectionPy = isMobile ? "60px" : "90px";

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#0f1623", color: "#e8edf5", minHeight: "100vh", margin: 0 }}>

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .nav-link:hover { color: #4a9eff !important; }
        .btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .card:hover { border-color: #2e4a6a !important; transform: translateY(-2px); transition: all 0.2s; }
        .hamburger:hover { opacity: 0.75; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0f1623; }
        ::-webkit-scrollbar-thumb { background: #1e3a5a; border-radius: 3px; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 200,
        background: "rgba(15,22,35,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1e2d45",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: `0 ${px}`, height: 60, boxSizing: "border-box",
      }}>
        <div
          onClick={() => scrollTo("Home")}
          style={{ fontWeight: 800, fontSize: 20, color: "#4a9eff", letterSpacing: 1, cursor: "pointer" }}
        >
          TG.
        </div>

        {/* Desktop nav */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: isTablet ? 20 : 32, listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_LINKS.map((l) => (
              <li
                key={l}
                className="nav-link"
                onClick={() => scrollTo(l)}
                style={{
                  cursor: "pointer", fontSize: 14, fontWeight: 500,
                  color: active === l ? "#4a9eff" : "#8fa3be",
                  borderBottom: active === l ? "2px solid #4a9eff" : "2px solid transparent",
                  paddingBottom: 2, transition: "color 0.2s",
                }}
              >
                {l}
              </li>
            ))}
          </ul>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button
            className="hamburger"
            onClick={(e) => { e.stopPropagation(); setMobileMenuOpen((v) => !v); }}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: 5, padding: 4,
            }}
            aria-label="Toggle menu"
          >
            <span style={{ width: 24, height: 2, background: mobileMenuOpen ? "#4a9eff" : "#8fa3be", display: "block", transition: "all 0.2s", transform: mobileMenuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ width: 24, height: 2, background: mobileMenuOpen ? "transparent" : "#8fa3be", display: "block", transition: "all 0.2s" }} />
            <span style={{ width: 24, height: 2, background: mobileMenuOpen ? "#4a9eff" : "#8fa3be", display: "block", transition: "all 0.2s", transform: mobileMenuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        )}

        {/* Mobile dropdown */}
        {isMobile && mobileMenuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute", top: 60, left: 0, right: 0,
              background: "#0d1a2b", borderBottom: "1px solid #1e2d45",
              zIndex: 300, padding: "12px 0",
            }}
          >
            {NAV_LINKS.map((l) => (
              <div
                key={l}
                onClick={() => scrollTo(l)}
                style={{
                  padding: "14px 6%", fontSize: 15, fontWeight: 500,
                  color: active === l ? "#4a9eff" : "#c5d3e8",
                  borderLeft: active === l ? "3px solid #4a9eff" : "3px solid transparent",
                  cursor: "pointer", transition: "color 0.2s",
                }}
              >
                {l}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="Home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: `80px ${px} 40px`,
        background: "linear-gradient(135deg, #0f1623 0%, #0d1f36 60%, #0f1623 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "15%", right: isMobile ? "-10%" : "8%",
          width: isMobile ? 200 : 340, height: isMobile ? 200 : 340, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,158,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ opacity: 0, animation: "fadeUp 0.7s 0.1s forwards", maxWidth: 700 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: "#4a9eff", letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>
            👋 Open to new opportunities
          </p>
          <h1 style={{
            fontSize: isMobile ? "2.2rem" : isTablet ? "3rem" : "3.8rem",
            fontWeight: 800, lineHeight: 1.1, color: "#e8edf5", margin: "0 0 12px",
          }}>
            Tirupathinaidu<br />Gullapalli
          </h1>
          <p style={{ fontSize: isMobile ? "1rem" : "1.25rem", color: "#8fa3be", marginBottom: 24 }}>
            I build secure, fast backend systems with Java & Spring Boot
          </p>

          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {["Spring Boot", "REST API", "PostgreSQL", "JWT & AES-256", "Agile"].map((b) => (
              <span key={b} style={{
                background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.25)",
                color: "#4a9eff", borderRadius: 4, padding: "4px 12px",
                fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
              }}>{b}</span>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              { label: "Get in Touch", primary: true, action: () => scrollTo("Contact") },
              { label: "View Projects", primary: false, action: () => scrollTo("Projects") },
              { label: "💼 LinkedIn", primary: false, action: () => window.open("https://www.linkedin.com/in/tirupathinaidu-gullapalli-033b6b3a1", "_blank") },
              { label: "🐙 GitHub", primary: false, action: () => window.open("https://github.com/naidu449", "_blank") },
            ].map(({ label, primary, action }) => (
              <button
                key={label}
                className="btn"
                onClick={action}
                style={{
                  background: primary ? "#4a9eff" : "transparent",
                  color: primary ? "#0f1623" : "#4a9eff",
                  border: primary ? "none" : "1.5px solid #4a9eff",
                  borderRadius: 6, padding: isMobile ? "10px 20px" : "12px 26px",
                  fontWeight: 700, fontSize: isMobile ? 13 : 14,
                  cursor: "pointer", letterSpacing: 0.4,
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="About" style={{ padding: `${sectionPy} ${px}`, background: "#0b1220" }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#4a9eff", letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>A little about me</p>
          <h2 style={{ fontSize: isMobile ? "1.7rem" : "2.2rem", fontWeight: 800, color: "#e8edf5", marginBottom: 4 }}>About Me</h2>
          <div style={{ width: 48, height: 3, background: "#4a9eff", borderRadius: 2, marginBottom: 40 }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 32 : 48,
          }}>
            <div>
              {[
                `Hey! I'm Tirupathinaidu, a Java developer from Hyderabad with ${EXP} years of experience. I've spent most of that time building backend systems for things like Aadhaar authentication, digital payments, and KYC — basically, stuff that needs to be reliable and secure because real people depend on it.`,
                "I really enjoy the problem-solving side of this work — whether it's figuring out why an API is slow, designing a cleaner data flow, or debugging a production issue at odd hours. Spring Boot and PostgreSQL are where I feel most at home, and I take security seriously after working on financial and government systems.",
                "Right now I'm looking for my next role — ideally somewhere I can keep growing, work on meaningful problems, and be part of a team that takes quality seriously. If that sounds like your team, let's talk!",
              ].map((text, i) => (
                <p key={i} style={{ lineHeight: 1.9, color: "#8fa3be", fontSize: 15, marginBottom: 18 }}>{text}</p>
              ))}
            </div>
            <div>
              {[
                ["Location", "Hyderabad, India"],
                ["Experience", `${EXP} Years`],
                ["Degree", "B.E. – Electronics & Communication"],
                ["College", "SVCET, Hyderabad (2018–2022)"],
                ["Email", "tirupathinaidu199@gmail.com"],
                ["Phone", "+91 6303201364"],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#4a9eff", minWidth: 90, letterSpacing: 0.5, paddingTop: 1 }}>{label}</span>
                  <span style={{ color: "#c5d3e8", fontSize: 14, wordBreak: "break-word" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── SKILLS ── */}
      <section id="Skills" style={{ padding: `${sectionPy} ${px}` }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#4a9eff", letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>Things I work with</p>
          <h2 style={{ fontSize: isMobile ? "1.7rem" : "2.2rem", fontWeight: 800, color: "#e8edf5", marginBottom: 4 }}>My Skills</h2>
          <div style={{ width: 48, height: 3, background: "#4a9eff", borderRadius: 2, marginBottom: 40 }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: 18,
          }}>
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 0.07}>
                <div className="card" style={{
                  background: "#131e2f", border: "1px solid #1e2d45",
                  borderRadius: 10, padding: "20px 22px",
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#4a9eff", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14, marginTop: 0 }}>{cat}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {items.map((s) => (
                      <span key={s} style={{
                        background: "rgba(74,158,255,0.07)", border: "1px solid #1e3a5a",
                        borderRadius: 4, padding: "4px 10px", fontSize: 12, color: "#c5d3e8",
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── PROJECTS ── */}
      <section id="Projects" style={{ padding: `${sectionPy} ${px}`, background: "#0b1220" }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#4a9eff", letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>Stuff I've actually built</p>
          <h2 style={{ fontSize: isMobile ? "1.7rem" : "2.2rem", fontWeight: 800, color: "#e8edf5", marginBottom: 4 }}>My Projects</h2>
          <div style={{ width: 48, height: 3, background: "#4a9eff", borderRadius: 2, marginBottom: 40 }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gap: 22,
          }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1}>
                <div className="card" style={{
                  background: "#131e2f", border: "1px solid #1e2d45",
                  borderRadius: 12, padding: "26px 24px",
                  display: "flex", flexDirection: "column", gap: 14, height: "100%",
                }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#e8edf5", margin: 0, lineHeight: 1.3 }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: "#8fa3be", lineHeight: 1.85, margin: 0, flexGrow: 1 }}>{p.description}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tech.map((t) => (
                      <span key={t} style={{
                        background: "rgba(74,158,255,0.1)", border: "1px solid rgba(74,158,255,0.2)",
                        borderRadius: 3, padding: "2px 8px", fontSize: 11, color: "#4a9eff", fontWeight: 600,
                      }}>{t}</span>
                    ))}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {p.highlights.map((h) => (
                      <li key={h} style={{ fontSize: 12, color: "#6b8aaa", padding: "3px 0 3px 14px", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: "#4a9eff" }}>›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="Experience" style={{ padding: `${sectionPy} ${px}` }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#4a9eff", letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>Where I've worked</p>
          <h2 style={{ fontSize: isMobile ? "1.7rem" : "2.2rem", fontWeight: 800, color: "#e8edf5", marginBottom: 4 }}>Work Experience</h2>
          <div style={{ width: 48, height: 3, background: "#4a9eff", borderRadius: 2, marginBottom: 40 }} />

          {EXPERIENCE.map((e) => (
            <div key={e.company} style={{
              background: "#131e2f", border: "1px solid #1e2d45", borderRadius: 12,
              padding: isMobile ? "24px 20px" : "32px 36px",
              display: "flex", flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 24 : 40, alignItems: "flex-start",
            }}>
              <div style={{ minWidth: isMobile ? "auto" : 200 }}>
                <p style={{ fontSize: isMobile ? 18 : 20, fontWeight: 800, color: "#e8edf5", margin: "0 0 6px" }}>{e.role}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#4a9eff", margin: "0 0 6px" }}>{e.company}</p>
                <p style={{ fontSize: 12, color: "#6b8aaa", margin: 0 }}>{e.duration}</p>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                {e.points.map((pt) => (
                  <li key={pt} style={{
                    fontSize: isMobile ? 13 : 14, color: "#8fa3be", lineHeight: 1.8,
                    padding: "8px 0 8px 20px", position: "relative",
                    borderBottom: "1px solid #1a2740",
                  }}>
                    <span style={{ position: "absolute", left: 0, color: "#4a9eff", fontWeight: 700 }}>›</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" style={{ padding: `${sectionPy} ${px}`, background: "#0b1220" }}>
        <FadeIn>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#4a9eff", letterSpacing: 4, textTransform: "uppercase", marginBottom: 6 }}>Say hello 👋</p>
          <h2 style={{ fontSize: isMobile ? "1.7rem" : "2.2rem", fontWeight: 800, color: "#e8edf5", marginBottom: 4 }}>Get in Touch</h2>
          <div style={{ width: 48, height: 3, background: "#4a9eff", borderRadius: 2, marginBottom: 40 }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 32 : 48,
          }}>
            <div>
              <p style={{ lineHeight: 1.9, color: "#8fa3be", fontSize: 15, marginBottom: 28 }}>
                Whether you have a job opening, a project in mind, or just want to have a conversation about backend development — I'd love to hear from you. I usually reply within a day. Drop me an email or reach out on LinkedIn!
              </p>
              <button
                className="btn"
                onClick={copyEmail}
                style={{
                  background: "#4a9eff", color: "#0f1623", border: "none",
                  borderRadius: 6, padding: isMobile ? "12px 24px" : "14px 36px",
                  fontWeight: 700, fontSize: isMobile ? 14 : 15,
                  cursor: "pointer", transition: "all 0.2s", width: isMobile ? "100%" : "auto",
                }}
              >
                {copied ? "✓ Email Copied!" : "Copy Email Address"}
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "✉️", label: "Email", value: "tirupathinaidu199@gmail.com", onClick: () => window.open("mailto:tirupathinaidu199@gmail.com") },
                { icon: "📞", label: "Phone", value: "+91 6303201364", onClick: () => window.open("tel:+916303201364") },
                { icon: "📍", label: "Location", value: "Hyderabad, India", onClick: null },
                { icon: "💼", label: "LinkedIn", value: "tirupathinaidu-gullapalli", onClick: () => window.open("https://www.linkedin.com/in/tirupathinaidu-gullapalli-033b6b3a1", "_blank") },
                { icon: "🐙", label: "GitHub", value: "naidu449", onClick: () => window.open("https://github.com/naidu449", "_blank") },
              ].map((c) => (
                <div key={c.label} className="card" style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: "#131e2f", border: "1px solid #1e2d45",
                  borderRadius: 10, padding: "14px 18px",
                  cursor: c.onClick ? "pointer" : "default",
                }} onClick={c.onClick || undefined}>
                  <span style={{ fontSize: 18, minWidth: 28, textAlign: "center" }}>{c.icon}</span>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ fontSize: 10, color: "#6b8aaa", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 2px" }}>{c.label}</p>
                    <p style={{ fontSize: 13, color: c.onClick ? "#4a9eff" : "#c5d3e8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        textAlign: "center", padding: `28px ${px}`,
        borderTop: "1px solid #1e2d45", color: "#6b8aaa", fontSize: 13,
      }}>
        <p style={{ margin: "0 0 12px" }}>Designed & built by Tirupathinaidu Gullapalli · Hyderabad, India</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 20, marginBottom: 12 }}>
          {[
            { label: "💼 LinkedIn", url: "https://www.linkedin.com/in/tirupathinaidu-gullapalli-033b6b3a1" },
            { label: "🐙 GitHub", url: "https://github.com/naidu449" },
            { label: "✉️ Email", url: "mailto:tirupathinaidu199@gmail.com" },
          ].map(({ label, url }) => (
            <span
              key={label}
              onClick={() => window.open(url, "_blank")}
              style={{ color: "#4a9eff", cursor: "pointer", fontSize: 13 }}
            >{label}</span>
          ))}
        </div>
        <p style={{ margin: 0, color: "#3a5070", fontSize: 12 }}>Built with React</p>
      </footer>

    </div>
  );
}