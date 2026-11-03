import React from 'react'
import { ArrowLeft, ArrowUpRight, Database, Gauge, Layers3, Radio, Zap } from 'lucide-react'

const sections = [
  { icon: Gauge, number: '01', title: 'The idea', text: 'GVS is an experimental engineering project exploring whether a controlled gyroscopic system can be used to influence vehicle dynamics and how induced electrical current can be measured, modelled, and visualized.' },
  { icon: Database, number: '02', title: 'Data first', text: 'The project is being developed around recorded vehicle and sensor data. The software layer turns those measurements into graphs and analysis so the physical system can be evaluated before moving deeper into hardware.' },
  { icon: Radio, number: '03', title: 'Current direction', text: 'The immediate focus is a visualization model for the amount of current expected to be induced under different operating conditions. Hardware implementation comes later, after the software model and assumptions are understood.' },
]

function GvsPage() {
  return (
    <div className="gvs-page">
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#top" aria-label="Back to Vineeth home"><span className="brand-mark">V</span><span>VINEETH</span></a>
          <a className="gvs-back" href="#top"><ArrowLeft size={15} /> Back to portfolio</a>
        </nav>
      </header>

      <main>
        <section className="gvs-hero container">
          <div className="gvs-kicker">01 / PERSONAL EXPERIMENT</div>
          <h1>GVS — <em>Gyroscopic</em><br />Vehicle System.</h1>
          <p className="gvs-intro">An ongoing engineering experiment combining vehicle dynamics, sensor data, visualization, and the study of induced electrical current.</p>
          <div className="gvs-tags"><span>React</span><span>Data Visualization</span><span>Vehicle Systems</span><span>Experimental</span></div>
        </section>

        <section className="gvs-diagram-section">
          <div className="container">
            <div className="gvs-system-card">
              <div className="gvs-system-copy">
                <div className="gvs-kicker">SYSTEM MODEL</div>
                <h2>Measure first.<br /><span>Build second.</span></h2>
                <p>The GVS software layer is intentionally being developed before the complete hardware system. This makes it possible to reason about expected behaviour, inspect recorded data, and identify what needs to be measured.</p>
              </div>
              <div className="gvs-flow">
                <div className="flow-node"><Database size={20} /><strong>Vehicle data</strong><small>Recorded measurements</small></div>
                <div className="flow-line" />
                <div className="flow-node"><Layers3 size={20} /><strong>GVS model</strong><small>Calculations & assumptions</small></div>
                <div className="flow-line" />
                <div className="flow-node accent"><Zap size={20} /><strong>Induced current</strong><small>Estimated output</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section container gvs-sections">
          {sections.map(({ icon: Icon, number, title, text }) => (
            <article className="gvs-detail" key={number}>
              <div className="gvs-detail-number">{number}</div>
              <Icon className="gvs-detail-icon" size={24} strokeWidth={1.5} />
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </section>

        <section className="gvs-status">
          <div className="container gvs-status-grid">
            <div><div className="gvs-kicker">PROJECT STATUS</div><h2>Software model<br /><em>in progress.</em></h2></div>
            <div className="gvs-status-list">
              <div><span>01</span><p>Sensor and vehicle data collection</p><b>Active</b></div>
              <div><span>02</span><p>Current-induction visualization model</p><b>Active</b></div>
              <div><span>03</span><p>Hardware prototype and validation</p><b>Next</b></div>
            </div>
          </div>
        </section>

        <section className="section container gvs-next">
          <div className="gvs-kicker">WHAT COMES NEXT</div>
          <h2>Turn the model into<br /><em>a measurable system.</em></h2>
          <p>Future iterations will connect the visualization model to more complete sensor inputs, refine the calculations, and eventually use the software to guide physical experimentation.</p>
          <div className="gvs-actions">
            <a className="button primary" href="#top">Back to portfolio <ArrowLeft size={16} /></a>
            <a className="button secondary" href="https://github.com/VineethVB7" target="_blank" rel="noreferrer">View GitHub <ArrowUpRight size={16} /></a>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} Vineeth</span><span>GVS · Gyroscopic Vehicle System</span><a href="#top">Back to top ↑</a></div></footer>
    </div>
  )
}

export default GvsPage
