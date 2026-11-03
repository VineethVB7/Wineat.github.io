import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Code2, Server, Database, Cpu, Menu, X } from 'lucide-react'
import './styles.css'

const projects = [
  { number: '01', title: 'GVS — Gyroscopic Vehicle System', type: 'Personal / Experimental', description: 'An ongoing engineering project exploring vehicle dynamics, sensor data, and a visual system for understanding and controlling induced current.', tags: ['React', 'Data Visualization', 'Vehicle Systems'], featured: true },
  { number: '02', title: 'Workflow & Approval Platform', type: 'Enterprise Systems', description: 'Designed workflow-builder and approval-ladder capabilities for configurable business processes, including forms, process mappings, deployment, and runtime submissions.', tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Kafka'] },
  { number: '03', title: 'Real-time Chat Platform', type: 'Backend / Realtime', description: 'Worked on a service-oriented chat system using MQTT and WebSocket/STOMP patterns, with room management, message history, attachments, and notification flows.', tags: ['Angular', 'Spring Boot', 'MQTT', 'MongoDB'] },
  { number: '04', title: 'License Management System', type: 'Web Application', description: 'A frontend-heavy application focused on managing licenses and related business workflows with a modern React interface.', tags: ['React', 'Vite', 'REST APIs'] },
]

const skills = [
  { icon: Code2, label: 'Frontend', items: 'Angular · React · TypeScript · JavaScript' },
  { icon: Server, label: 'Backend', items: 'Java · Spring Boot · REST APIs' },
  { icon: Database, label: 'Data', items: 'PostgreSQL · MongoDB · SQL' },
  { icon: Cpu, label: 'Systems', items: 'Kafka · MQTT · WebSocket · Docker · Git' },
]

const EMAIL = 'vineethbhagavati237@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/vineeth-bhagavati-4b5371246'

function App() {
  const [open, setOpen] = React.useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Vineeth home"><span className="brand-mark">V</span><span>VINEETH</span></a>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={21} /> : <Menu size={21} />}</button>
          <div className={`nav-links ${open ? 'is-open' : ''}`}>
            <a href="#about" onClick={closeMenu}>About</a><a href="#work" onClick={closeMenu}>Work</a><a href="#stack" onClick={closeMenu}>Stack</a><a href="#contact" onClick={closeMenu}>Contact</a>
            <a className="nav-cta" href="https://github.com/VineethVB7" target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub <ArrowUpRight size={15} /></a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse" /> SOFTWARE DEVELOPER · INDIA</div>
            <h1>I build software<br /><em>that moves ideas forward.</em></h1>
            <p className="hero-text">Full-stack developer working across modern web applications, backend systems, data, and experiments that sit at the edge of software and the physical world.</p>
            <div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowUpRight size={17} /></a><a className="button secondary" href="#contact">Let's connect</a></div>
          </div>
          <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core">V<span>VB7</span></div><div className="orbit-dot dot-one" /><div className="orbit-dot dot-two" /></div>
        </section>

        <div className="ticker" aria-hidden="true"><div className="ticker-track">BUILD · SHIP · LEARN · ITERATE · BUILD · SHIP · LEARN · ITERATE · BUILD · SHIP · LEARN · ITERATE · </div></div>

        <section id="about" className="section container about-grid">
          <div className="section-label">01 / ABOUT</div>
          <div><h2>Curious by default.<br /><span>Practical by design.</span></h2><div className="about-copy"><p>I enjoy taking complicated requirements and turning them into systems that are easier to understand, use, and maintain.</p><p>My work spans frontend interfaces, Java/Spring services, databases, event-driven systems, and real-time communication. Outside day-to-day product work, I like using software to explore engineering ideas through projects such as GVS.</p></div><div className="facts"><div><strong>01</strong><span>Systems<br />thinking</span></div><div><strong>02</strong><span>Full-stack<br />development</span></div><div><strong>03</strong><span>Always<br />experimenting</span></div></div></div>
        </section>

        <section id="work" className="section work-section"><div className="container"><div className="section-heading"><div className="section-label">02 / SELECTED WORK</div><p>Things I've built, explored, and helped bring to life.</p></div><div className="project-list">{projects.map(project => <article className={`project ${project.featured ? 'featured' : ''}`} key={project.number}><div className="project-number">{project.number}</div><div className="project-main"><div className="project-meta">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="project-arrow"><ArrowUpRight size={25} /></div></article>)}</div></div></section>

        <section id="stack" className="section container stack-section"><div className="section-label">03 / TOOLKIT</div><div className="stack-content"><h2>The tools behind<br /><span>the work.</span></h2><div className="skills-grid">{skills.map(({ icon: Icon, label, items }) => <div className="skill-card" key={label}><Icon size={22} strokeWidth={1.5} /><h3>{label}</h3><p>{items}</p></div>)}</div></div></section>

        <section className="section statement-section"><div className="container statement"><div className="quote-mark">“</div><p>I like building at the intersection of <span>software, systems, and curiosity.</span></p></div></section>

        <section id="contact" className="section container contact-section"><div className="section-label">04 / CONTACT</div><div className="contact-content"><div><div className="eyebrow">HAVE AN IDEA?</div><h2>Let's make<br /><em>something useful.</em></h2></div><div className="contact-side"><p>I'm always interested in interesting engineering problems, ambitious products, and conversations about things worth building.</p><div className="contact-links"><a href={`mailto:${EMAIL}`}><Mail size={18} /> {EMAIL} <ArrowUpRight size={15} /></a><a href="https://github.com/VineethVB7" target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={15} /></a><a href={LINKEDIN} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={15} /></a></div><div className="location"><MapPin size={16} /> India · Open to opportunities</div></div></div></section>
      </main>
      <footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} Vineeth</span><span>Designed & built from scratch</span><a href="#top">Back to top ↑</a></div></footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
