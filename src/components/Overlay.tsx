import { motion } from "framer-motion";
import { useStore } from "../store/useStore";
import {
  identity,
  stats,
  projects,
  skillGroups,
  experience,
} from "../data/site";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

function Section({
  id,
  index,
  active,
  className = "",
  children,
}: {
  id: string;
  index: number;
  active: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`panel ${className}`}
      data-index={index}
      data-active={active}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Overlay() {
  // panels: hero, 7 projects, skills, experience, contact = 11
  const panelCount = 4 + projects.length;

  return (
    <div id="root">
      {/* HERO */}
      <Section id="hero" index={0} active={2} className="hero">
        <motion.p
          className="eyebrow"
          initial="hidden"
          animate="show"
          custom={0}
          variants={reveal}
        >
          {identity.location} · Available for AI engineering roles
        </motion.p>
        <motion.h1 initial="hidden" animate="show" custom={1} variants={reveal}>
          {identity.name}
        </motion.h1>
        <motion.p
          className="role"
          initial="hidden"
          animate="show"
          custom={2}
          variants={reveal}
        >
          {identity.roleLong}
        </motion.p>
        <motion.p
          className="tagline"
          initial="hidden"
          animate="show"
          custom={3}
          variants={reveal}
        >
          I architect the <b>AI-native engineering systems</b> that ship 35+
          production features a month — at <b>HIPAA-grade rigor</b>, not demo
          quality.
        </motion.p>
        <motion.div
          className="stats"
          initial="hidden"
          animate="show"
          custom={4}
          variants={reveal}
        >
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="v">{s.value}</div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </motion.div>
        <div className="scroll-hint">
          <span>Scroll</span>
          <i />
        </div>
      </Section>

      {/* PROJECTS */}
      {projects.map((p, i) => (
        <Section
          key={p.id}
          id={p.id}
          index={i + 1}
          active={i}
          className="project-panel"
        >
          <div className="project">
            <div className="left">
              <motion.div
                className="pindex"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={0}
                variants={reveal}
              >
                {p.index}
              </motion.div>
              <motion.p
                className="eyebrow"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={1}
                variants={reveal}
                style={{ color: p.accent }}
              >
                Project {p.index} / {String(projects.length).padStart(2, "0")}
              </motion.p>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={2}
                variants={reveal}
              >
                {p.title}
              </motion.h2>
              <motion.p
                className="psub"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={3}
                variants={reveal}
                style={{ color: p.accent }}
              >
                {p.subtitle}
              </motion.p>
              <motion.div
                className="meta"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={4}
                variants={reveal}
              >
                <span>{p.year}</span>
                <span>{p.role}</span>
              </motion.div>
            </div>

            <motion.div
              className="right"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              custom={3}
              variants={reveal}
            >
              <p className="desc">{p.description}</p>
              <div
                className="outcome"
                style={{ borderLeftColor: p.accent }}
              >
                {p.outcome}
              </div>
              <div className="chips">
                {p.stack.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              {p.link ? (
                <a
                  className="plink"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ borderColor: p.accent }}
                >
                  {p.linkLabel ?? "View project"} ↗
                </a>
              ) : p.linkLabel ? (
                <span className="plink is-static">{p.linkLabel}</span>
              ) : null}
            </motion.div>
          </div>
        </Section>
      ))}

      {/* SKILLS */}
      <Section id="skills" index={projects.length + 1} active={1}>
        <motion.p
          className="eyebrow"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
          variants={reveal}
        >
          Capabilities
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          custom={1}
          variants={reveal}
          style={{
            fontFamily: '"Zen Dots", sans-serif',
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 3.4rem)",
            marginTop: "0.6rem",
          }}
        >
          The stack behind the systems
        </motion.h2>
        <div className="skill-grid">
          {skillGroups.map((g, i) => (
            <motion.div
              className="skill-card"
              key={g.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              variants={reveal}
            >
              <h3>{g.label}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" index={projects.length + 2} active={2}>
        <motion.p
          className="eyebrow"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
          variants={reveal}
        >
          Trajectory · 8+ years
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          custom={1}
          variants={reveal}
          style={{
            fontFamily: '"Zen Dots", sans-serif',
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 3.4rem)",
            marginTop: "0.6rem",
          }}
        >
          Where I&apos;ve shipped
        </motion.h2>
        <div className="timeline">
          {experience.map((e, i) => (
            <motion.div
              className="tl-item"
              key={`${e.company}-${e.title}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              custom={i}
              variants={reveal}
            >
              <div className="tl-top">
                <h3>
                  {e.title} <span className="co">· {e.company}</span>
                </h3>
                <span className="dates">{e.dates}</span>
              </div>
              <p>{e.summary}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section
        id="contact"
        index={projects.length + 3}
        active={3}
        className="contact"
      >
        <motion.p
          className="eyebrow"
          style={{ justifyContent: "center" }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          custom={0}
          variants={reveal}
        >
          Let&apos;s build
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          custom={1}
          variants={reveal}
        >
          Ship AI systems
          <br />
          that actually hold up.
        </motion.h2>
        <motion.div
          className="cta-row"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          custom={2}
          variants={reveal}
        >
          <a className="btn" href={`mailto:${identity.email}`}>
            {identity.email}
          </a>
          <a className="btn" href={identity.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a
            className="btn"
            href={`https://${identity.linkedin}`}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </Section>

      <NavDots count={panelCount} />
    </div>
  );
}

function NavDots({ count }: { count: number }) {
  const panel = useStore((s) => s.panel);
  const scrollToId = useStore((s) => s.scrollToId);
  const ids = [
    "hero",
    ...projects.map((p) => p.id),
    "skills",
    "experience",
    "contact",
  ];
  return (
    <nav className="dots" aria-label="Section navigation">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={panel === i ? "on" : ""}
          aria-label={`Go to ${ids[i] ?? `section ${i}`}`}
          onClick={() => scrollToId(ids[i])}
        />
      ))}
    </nav>
  );
}
