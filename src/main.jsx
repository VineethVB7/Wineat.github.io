import React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Mail, MapPin, Code2, Server, Database, Cpu, ShieldCheck, Menu, X, Sun, Moon } from 'lucide-react'
import GvsPage from './GvsPage'
import ThemeTransition from './ThemeTransition'
import './styles.css'
import './theme.css'
import './mode-overrides.css'
import './theme-transition.css'

const projects = [
  { number: '01', title: 'GVS — Gyroscopic Vehicle System', type: 'Personal / Experimental', description: 'An ongoing engineering project exploring vehicle dynamics, sensor data, and a visual system for understanding and controlling induced current.', tags: ['React', 'Data Visualization', 'Vehicle Systems'], featured: true, href: '#gvs' },
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

function useHashRoute() {
  const [route, setRoute] = React.useState(() => window.location.hash || '#top')
  React.useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#top')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  return route
}

function useTheme() {
  const [theme, setTheme] = React.useState(() => localStorage.getItem('portfolio-theme') || 'dark')
  const [transition, setTransition] = React.useState(null)
  const toggleTheme = React.useCallback(() => {
    if (transition) return
    const next = theme === 'dark' ? 'light' : 'dark'
    setTransition(theme)
    setTheme(next)
    localStorage.setItem('portfolio-theme', next)
  }, [theme, transition])

  const finishTransition = React.useCallback(() => {
    setTransition(null)
  }, [])

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return { theme, toggleTheme, transition, finishTransition }
}

function ThemeToggle({ theme, toggleTheme }) {
  const light = theme === 'light'
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${light ? 'dark' : 'light'} mode`} title={`Switch to ${light ? 'dark' : 'light'} mode`}>
      {light ? <Moon size={16} /> : <Sun size={16} />}
      <span>{light ? 'Dark' : 'Light'}</span>
    </button>
  )
}

function App() {
  const route = useHashRoute()
  const { theme, toggleTheme, transition, finishTransition } = useTheme()
  const [open, setOpen] = React.useState(false)
  const closeMenu = () => setOpen(false)

  const content = route === '#gvs' ? (
    <GvsPage theme={theme} toggleTheme={toggleTheme} />
  ) : (
    <div className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Vineeth home"><span className="brand-mark">V</span><span>VINEETH</span></a>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={21} /> : <Menu size={21} />}</button>
          <div className={`nav-links ${open ? 'is-open' : ''}`}>
            <a href="#about" onClick={closeMenu}>About</a><a href="#work" onClick={closeMenu}>Work</a><a href="#stack" onClick={closeMenu}>Stack</a><a href="#cybersecurity" onClick={closeMenu}>Security</a><a href="#contact" onClick={closeMenu}>Contact</a>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a className="nav-cta" href="https://github.com/VineethVB7" target="_blank" rel="noreferrer" onClick={closeMenu}>GitHub <ArrowUpRight size={15} /></a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="hero container">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse" /> SOFTWARE DEVELOPER · INDIA</div>
            <h1>I build software<br /><em>that moves ideas forward.</em></h1>
            <p className="hero-text">I build web applications and backend services, with a focus on practical engineering, reliable systems, and data-driven problem solving.</p>
            <div className="hero-actions"><a className="button primary" href="#work">Explore my work <ArrowUpRight size={17} /></a><a className="button secondary" href="#contact">Let's connect</a></div>
          </div>
          <div className="hero-orbit" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core">V<span>VB7</span></div><div className="orbit-dot dot-one" /><div className="orbit-dot dot-two" /></div>
        </section>

        <div className="ticker" aria-hidden="true"><div className="ticker-track"><span className="ticker-content">BUILD · SHIP · LEARN · ITERATE · fail · BUILD · SHIP · LEARN · ITERATE · BUILD · SHIP · LEARN · ITERATE · BUILD · SHIP · LEARN · ITERATE · fail · BUILD · SHIP · LEARN · ITERATE · fail · BUILD · SHIP · LEARN · ITERATE · BUILD · SHIP · LEARN · ITERATE · fail · BUILD · SHIP · LEARN · ITERATE ·</span><span className="ticker-content">BUILD · SHIP · LEARN · ITERATE · fail · BUILD · SHIP · LEARN · ITERATE · BUILD · SHIP · LEARN · ITERATE · BUILD · SHIP · LEARN · ITERATE · fail · BUILD · SHIP · LEARN · ITERATE · fail · BUILD · SHIP · LEARN · ITERATE · BUILD · SHIP · LEARN · ITERATE · fail · BUILD · SHIP · LEARN · ITERATE ·</span></div></div>

        <section id="about" className="section container about-grid">
          <div className="section-label">01 / ABOUT</div>
          <div><h2>Curious by default.<br /><span>Practical by design.</span></h2><div className="about-copy"><p>I enjoy taking complicated requirements and turning them into systems that are easier to understand, use, and maintain.</p><p>My work spans frontend interfaces, Java/Spring services, databases, event-driven systems, and real-time communication. Outside day-to-day product work, I like using software to explore engineering ideas through projects such as GVS.</p></div><div className="facts"><div><strong>01</strong><span>Systems<br />thinking</span></div><div><strong>02</strong><span>Full-stack<br />development</span></div><div><strong>03</strong><span>Always<br />experimenting</span></div></div></div>
        </section>

        <section id="work" className="section work-section"><div className="container"><div className="section-heading"><div className="section-label">02 / SELECTED WORK</div><p>Selected work across enterprise platforms, real-time systems, and independent engineering experiments.</p></div><div className="project-list">{projects.map(project => {
          const content = <><div className="project-number">{project.number}</div><div className="project-main"><div className="project-meta">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="project-arrow"><ArrowUpRight size={25} /></div></>
          return project.href ? <a className={`project ${project.featured ? 'featured' : ''}`} href={project.href} key={project.number} aria-label={`View details for ${project.title}`}>{content}</a> : <article className={`project ${project.featured ? 'featured' : ''}`} key={project.number}>{content}</article>
        })}</div></div></section>

        <section id="stack" className="section container stack-section"><div className="section-label">03 / TOOLKIT</div><div className="stack-content"><h2>The tools behind<br /><span>the work.</span></h2><div className="skills-grid">{skills.map(({ icon: Icon, label, items }) => <div className="skill-card" key={label}><Icon size={22} strokeWidth={1.5} /><h3>{label}</h3><p>{items}</p></div>)}</div></div></section>

        <section id="cybersecurity" className="section container cyber-section"><div className="section-label">04 / NEXT FRONTIER</div><div className="cyber-content"><div className="cyber-heading"><div className="cyber-icon"><ShieldCheck size={25} strokeWidth={1.5} /></div><div className="eyebrow">A FIELD I'M EXPLORING</div><h2>Aspiring<br /><em>cybersecurity enthusiast.</em></h2></div><div className="cyber-copy"><p>I'm interested in understanding how systems can be tested, protected, and made more resilient. Cybersecurity is a field I'm actively aspiring to grow into, alongside my software engineering journey.</p><p>I'm keen to deepen my knowledge of network security, ethical hacking, vulnerability assessment, and secure application design — always with a focus on responsible, defensive learning.</p><div className="cyber-topics"><span>Network Security</span><span>Ethical Hacking</span><span>Vulnerability Assessment</span><span>Secure Development</span></div></div></div></section>

        <section className="section statement-section"><div className="container statement"><div className="quote-mark">“</div><p>I like building at the intersection of <span>software, systems, and curiosity — with glorious purpose.</span></p></div></section>

        <section id="contact" className="section container contact-section"><div className="section-label">05 / CONTACT</div><div className="contact-content"><div><div className="eyebrow">HAVE AN IDEA?</div><h2>Let's make<br /><em>something useful.</em></h2></div><div className="contact-side"><p>I'm interested in thoughtful teams, meaningful engineering challenges, and opportunities to build software that makes a practical difference.</p><div className="contact-links"><a href={`mailto:${EMAIL}`}><Mail size={18} /> {EMAIL} <ArrowUpRight size={15} /></a><a href="https://github.com/VineethVB7" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a></div><div className="location"><MapPin size={16} /> India · Open to opportunities</div></div></div></section>
      </main>
      <footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} Vineeth</span><span>Designed & built from scratch</span><a href="#top">Back to top ↑</a></div></footer>
    </div>
  )

  return <>{content}{transition && <ThemeTransition type={transition} onComplete={finishTransition} />}</>
}

createRoot(document.getElementById('root')).render(<App />)
