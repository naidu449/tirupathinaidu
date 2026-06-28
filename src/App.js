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

function useInView(threshold = 0.15) {
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [copied, setCopied] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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

  const copyEmail = () => {
    navigator.clipboard.writeText("tirupathinaidu199@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const styles = {
    root: {
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "#0f1623",
      color: "#e8edf5",
      minHeight: "100vh",
      margin: 0,
    },
    nav: {
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 100,
      background: "rgba(15,22,35,0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #1e2d45",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 5%",
      height: 64,
      boxSizing: "border-box",
    },
    logo: {
      fontWeight: 700,
      fontSize: 18,
      color: "#4a9eff",
      letterSpacing: 1,
      cursor: "pointer",
    },
    navLinks: {
      display: "flex",
      gap: 32,
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: (isActive) => ({
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
      color: isActive ? "#4a9eff" : "#8fa3be",
      borderBottom: isActive ? "2px solid #4a9eff" : "2px solid transparent",
      paddingBottom: 2,
      transition: "color 0.2s, border-color 0.2s",
      letterSpacing: 0.5,
    }),
    hero: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "80px 10% 40px",
      background: "linear-gradient(135deg, #0f1623 0%, #0d1f36 60%, #0f1623 100%)",
      position: "relative",
      overflow: "hidden",
    },
    heroAccent: {
      position: "absolute",
      top: "20%",
      right: "10%",
      width: 320,
      height: 320,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(74,158,255,0.08) 0%, transparent 70%)",
      pointerEvents: "none",
    },
    heroEyebrow: {
      fontSize: 13,
      fontWeight: 600,
      color: "#4a9eff",
      letterSpacing: 3,
      textTransform: "uppercase",
      marginBottom: 16,
    },
    heroName: {
      fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
      fontWeight: 800,
      lineHeight: 1.1,
      color: "#e8edf5",
      marginBottom: 12,
    },
    heroTitle: {
      fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
      fontWeight: 400,
      color: "#8fa3be",
      marginBottom: 24,
    },
    heroBadges: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 36,
    },
    badge: {
      background: "rgba(74,158,255,0.1)",
      border: "1px solid rgba(74,158,255,0.25)",
      color: "#4a9eff",
      borderRadius: 4,
      padding: "4px 12px",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    heroCta: {
      display: "flex",
      gap: 16,
      flexWrap: "wrap",
    },
    btnPrimary: {
      background: "#4a9eff",
      color: "#0f1623",
      border: "none",
      borderRadius: 6,
      padding: "12px 28px",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      letterSpacing: 0.5,
      transition: "background 0.2s, transform 0.15s",
    },
    btnOutline: {
      background: "transparent",
      color: "#4a9eff",
      border: "1.5px solid #4a9eff",
      borderRadius: 6,
      padding: "11px 28px",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      letterSpacing: 0.5,
      transition: "background 0.2s",
    },
    section: {
      padding: "90px 10%",
    },
    sectionAlt: {
      padding: "90px 10%",
      background: "#0b1220",
    },
    sectionLabel: {
      fontSize: 11,
      fontWeight: 700,
      color: "#4a9eff",
      letterSpacing: 4,
      textTransform: "uppercase",
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
      fontWeight: 800,
      color: "#e8edf5",
      marginBottom: 48,
    },
    divider: {
      width: 48,
      height: 3,
      background: "#4a9eff",
      borderRadius: 2,
      marginBottom: 40,
      marginTop: -36,
    },
    aboutGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "start",
    },
    aboutText: {
      lineHeight: 1.9,
      color: "#8fa3be",
      fontSize: 15,
      marginBottom: 20,
    },
    infoRow: {
      display: "flex",
      gap: 16,
      alignItems: "flex-start",
      marginBottom: 14,
    },
    infoLabel: {
      fontSize: 12,
      fontWeight: 700,
      color: "#4a9eff",
      minWidth: 90,
      letterSpacing: 0.5,
      paddingTop: 1,
    },
    infoValue: {
      color: "#c5d3e8",
      fontSize: 14,
    },
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: 20,
    },
    skillCard: {
      background: "#131e2f",
      border: "1px solid #1e2d45",
      borderRadius: 10,
      padding: "22px 24px",
      transition: "border-color 0.2s",
    },
    skillCardTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: "#4a9eff",
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 14,
    },
    skillPills: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
    },
    skillPill: {
      background: "rgba(74,158,255,0.07)",
      border: "1px solid #1e3a5a",
      borderRadius: 4,
      padding: "4px 10px",
      fontSize: 12,
      color: "#c5d3e8",
    },
    projectsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: 24,
    },
    projectCard: {
      background: "#131e2f",
      border: "1px solid #1e2d45",
      borderRadius: 12,
      padding: "28px 26px",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      transition: "border-color 0.2s, transform 0.2s",
    },
    projectNum: {
      fontSize: 11,
      fontWeight: 700,
      color: "#4a9eff",
      letterSpacing: 3,
    },
    projectName: {
      fontSize: 17,
      fontWeight: 700,
      color: "#e8edf5",
      lineHeight: 1.3,
    },
    projectDesc: {
      fontSize: 13,
      color: "#8fa3be",
      lineHeight: 1.8,
    },
    projectTech: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 4,
    },
    techTag: {
      background: "rgba(74,158,255,0.1)",
      border: "1px solid rgba(74,158,255,0.2)",
      borderRadius: 3,
      padding: "2px 8px",
      fontSize: 11,
      color: "#4a9eff",
      fontWeight: 600,
    },
    highlightList: {
      listStyle: "none",
      padding: 0,
      margin: "4px 0 0",
    },
    highlightItem: {
      fontSize: 12,
      color: "#6b8aaa",
      padding: "3px 0",
      paddingLeft: 14,
      position: "relative",
    },
    expCard: {
      background: "#131e2f",
      border: "1px solid #1e2d45",
      borderRadius: 12,
      padding: "32px 36px",
      display: "flex",
      gap: 40,
      alignItems: "flex-start",
    },
    expLeft: {
      minWidth: 200,
    },
    expRole: {
      fontSize: 20,
      fontWeight: 800,
      color: "#e8edf5",
      marginBottom: 6,
    },
    expCompany: {
      fontSize: 14,
      fontWeight: 600,
      color: "#4a9eff",
      marginBottom: 6,
    },
    expDuration: {
      fontSize: 12,
      color: "#6b8aaa",
      fontWeight: 500,
    },
    expPoints: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      flex: 1,
    },
    expPoint: {
      fontSize: 14,
      color: "#8fa3be",
      lineHeight: 1.8,
      padding: "6px 0",
      paddingLeft: 20,
      position: "relative",
      borderBottom: "1px solid #1a2740",
    },
    contactGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "start",
    },
    contactInfo: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      background: "#131e2f",
      border: "1px solid #1e2d45",
      borderRadius: 10,
      padding: "18px 22px",
    },
    contactIcon: {
      fontSize: 20,
      minWidth: 32,
      textAlign: "center",
    },
    contactLabel: {
      fontSize: 11,
      color: "#6b8aaa",
      fontWeight: 600,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginBottom: 3,
    },
    contactValue: {
      fontSize: 14,
      color: "#c5d3e8",
      fontWeight: 500,
    },
    footer: {
      textAlign: "center",
      padding: "32px 10%",
      borderTop: "1px solid #1e2d45",
      color: "#6b8aaa",
      fontSize: 13,
    },
  };

  return (
    <div style={styles.root}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => scrollTo("Home")}>TG.</div>
        <ul style={styles.navLinks}>
          {NAV_LINKS.map((l) => (
            <li key={l} style={styles.navLink(active === l)} onClick={() => scrollTo(l)}>
              {l}
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="Home" style={styles.hero}>
        <div style={styles.heroAccent} />
        <div style={{ opacity: 0, animation: "fadeUp 0.7s 0.1s forwards" }}>
          <p style={styles.heroEyebrow}>👋 Open to new opportunities</p>
          <h1 style={styles.heroName}>Tirupathinaidu<br />Gullapalli</h1>
          <p style={styles.heroTitle}>I build secure, fast backend systems with Java & Spring Boot</p>
          <div style={styles.heroBadges}>
            {["Spring Boot", "REST API", "PostgreSQL", "JWT & AES-256", "Agile"].map((b) => (
              <span key={b} style={styles.badge}>{b}</span>
            ))}
          </div>
          <div style={styles.heroCta}>
            <button style={styles.btnPrimary} onClick={() => scrollTo("Contact")}>
              Get in Touch
            </button>
            <button style={styles.btnOutline} onClick={() => scrollTo("Projects")}>
              View Projects
            </button>
            <button onClick={() => window.open("https://www.linkedin.com/in/tirupathinaidu-gullapalli-033b6b3a1", "_blank")} style={{ ...styles.btnOutline, display: "inline-flex", alignItems: "center", gap: 6 }}>
              💼 LinkedIn
            </button>
            <button onClick={() => window.open("https://github.com/naidu449", "_blank")} style={{ ...styles.btnOutline, display: "inline-flex", alignItems: "center", gap: 6 }}>
              🐙 GitHub
            </button>
          </div>
        </div>
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          li:hover { color: #4a9eff !important; }
          button:hover { opacity: 0.88; transform: translateY(-1px); }
        `}</style>
      </section>

      {/* ABOUT */}
      <section id="About" style={styles.sectionAlt}>
        <FadeIn>
          <p style={styles.sectionLabel}>A little about me</p>
          <h2 style={styles.sectionTitle}>About Me</h2>
          <div style={styles.divider} />
          <div style={styles.aboutGrid}>
            <div>
              <p style={styles.aboutText}>
                Hey! I'm Tirupathinaidu, a Java developer from Hyderabad with {EXP} years of experience. I've spent most of that time building backend systems for things like Aadhaar authentication, digital payments, and KYC — basically, stuff that needs to be reliable and secure because real people depend on it.
              </p>
              <p style={styles.aboutText}>
                I really enjoy the problem-solving side of this work — whether it's figuring out why an API is slow, designing a cleaner data flow, or debugging a production issue at odd hours. Spring Boot and PostgreSQL are where I feel most at home, and I take security seriously after working on financial and government systems.
              </p>
              <p style={styles.aboutText}>
                Right now I'm looking for my next role — ideally somewhere I can keep growing, work on meaningful problems, and be part of a team that takes quality seriously. If that sounds like your team, let's talk!
              </p>
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
                <div key={label} style={styles.infoRow}>
                  <span style={styles.infoLabel}>{label}</span>
                  <span style={styles.infoValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* SKILLS */}
      <section id="Skills" style={styles.section}>
        <FadeIn>
          <p style={styles.sectionLabel}>Things I work with</p>
          <h2 style={styles.sectionTitle}>My Skills</h2>
          <div style={styles.divider} />
          <div style={styles.skillsGrid}>
            {Object.entries(SKILLS).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 0.07}>
                <div style={styles.skillCard}>
                  <p style={styles.skillCardTitle}>{cat}</p>
                  <div style={styles.skillPills}>
                    {items.map((s) => (
                      <span key={s} style={styles.skillPill}>{s}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* PROJECTS */}
      <section id="Projects" style={styles.sectionAlt}>
        <FadeIn>
          <p style={styles.sectionLabel}>Stuff I've actually built</p>
          <h2 style={styles.sectionTitle}>My Projects</h2>
          <div style={styles.divider} />
          <div style={styles.projectsGrid}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.1}>
                <div style={styles.projectCard}>
                  <h3 style={styles.projectName}>{p.name}</h3>
                  <p style={styles.projectDesc}>{p.description}</p>
                  <div style={styles.projectTech}>
                    {p.tech.map((t) => (
                      <span key={t} style={styles.techTag}>{t}</span>
                    ))}
                  </div>
                  <ul style={styles.highlightList}>
                    {p.highlights.map((h) => (
                      <li key={h} style={styles.highlightItem}>
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

      {/* EXPERIENCE */}
      <section id="Experience" style={styles.section}>
        <FadeIn>
          <p style={styles.sectionLabel}>Where I've worked</p>
          <h2 style={styles.sectionTitle}>Work Experience</h2>
          <div style={styles.divider} />
          {EXPERIENCE.map((e) => (
            <div key={e.company} style={styles.expCard}>
              <div style={styles.expLeft}>
                <p style={styles.expRole}>{e.role}</p>
                <p style={styles.expCompany}>{e.company}</p>
                <p style={styles.expDuration}>{e.duration}</p>
              </div>
              <ul style={styles.expPoints}>
                {e.points.map((pt) => (
                  <li key={pt} style={styles.expPoint}>
                    <span style={{ position: "absolute", left: 0, color: "#4a9eff", fontWeight: 700 }}>›</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="Contact" style={styles.sectionAlt}>
        <FadeIn>
          <p style={styles.sectionLabel}>Say hello 👋</p>
          <h2 style={styles.sectionTitle}>Get in Touch</h2>
          <div style={styles.divider} />
          <div style={styles.contactGrid}>
            <div>
              <p style={{ ...styles.aboutText, marginBottom: 32 }}>
                Whether you have a job opening, a project in mind, or just want to have a conversation about backend development — I'd love to hear from you. I usually reply within a day. Drop me an email or reach out on LinkedIn!
              </p>
              <button
                style={{ ...styles.btnPrimary, fontSize: 15, padding: "14px 36px" }}
                onClick={copyEmail}
              >
                {copied ? "✓ Email Copied!" : "Copy Email Address"}
              </button>
            </div>
            <div style={styles.contactInfo}>
              {[
                { icon: "✉️", label: "Email", value: "tirupathinaidu199@gmail.com", href: "mailto:tirupathinaidu199@gmail.com", onClick: () => window.open("mailto:tirupathinaidu199@gmail.com") },
                { icon: "📞", label: "Phone", value: "+91 6303201364", href: null, onClick: () => window.open("tel:+916303201364") },
                { icon: "📍", label: "Location", value: "Hyderabad, India", href: null, onClick: null },
                { icon: "💼", label: "LinkedIn", value: "tirupathinaidu-gullapalli", href: null, onClick: () => window.open("https://www.linkedin.com/in/tirupathinaidu-gullapalli-033b6b3a1", "_blank") },
                { icon: "🐙", label: "GitHub", value: "naidu449", href: null, onClick: () => window.open("https://github.com/naidu449", "_blank") },
              ].map((c) => (
                <div key={c.label} style={styles.contactItem}>
                  <span style={styles.contactIcon}>{c.icon}</span>
                  <div>
                    <p style={styles.contactLabel}>{c.label}</p>
                    {c.onClick ? (
                      <span onClick={c.onClick} style={{ ...styles.contactValue, color: "#4a9eff", cursor: "pointer" }}>
                        {c.value}
                      </span>
                    ) : (
                      <p style={styles.contactValue}>{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>Designed & built by Tirupathinaidu Gullapalli · Hyderabad, India</p>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 24 }}>
          <span onClick={() => window.open("https://www.linkedin.com/in/tirupathinaidu-gullapalli-033b6b3a1", "_blank")} style={{ color: "#4a9eff", fontSize: 13, cursor: "pointer" }}>💼 LinkedIn</span>
          <span onClick={() => window.open("https://github.com/naidu449", "_blank")} style={{ color: "#4a9eff", fontSize: 13, cursor: "pointer" }}>🐙 GitHub</span>
          <span onClick={() => window.open("mailto:tirupathinaidu199@gmail.com")} style={{ color: "#4a9eff", fontSize: 13, cursor: "pointer" }}>✉️ Email</span>
        </div>
        <p style={{ marginTop: 12, color: "#3a5070" }}>Built with React</p>
      </footer>
    </div>
  );
}