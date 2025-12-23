// --- Home.jsx ---
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const isAdmin = (() => {
    try {
      return localStorage.getItem("isAdmin") === "true";
    } catch {
      return false;
    }
  })();

  const isEmployee = (() => {
    try {
      return localStorage.getItem("isEmployee") === "true";
    } catch {
      return false;
    }
  })();

  const services = [
    {
      icon: "custom-software",
      title: "Custom Software",
      text: "Bespoke web & mobile apps tailored to your business goals.",
    },
    {
      icon: "cloud-devops",
      title: "Cloud & DevOps",
      text: "Scalable cloud architecture and automated CI/CD pipelines.",
    },
    {
      icon: "web-development",
      title: "Web Development",
      text: "High-performance, accessible, and SEO-friendly websites.",
    },
  ];

  /* Small helper components for clarity */
  const AboutSection = () => (
    <section id="about" className="about animate-down delay-6">
      <h3>Why Choose Us</h3>
      <p>
        We combine technical expertise, strategic thinking, and reliable delivery
        to help businesses modernize their operations.
      </p>
      <ul className="about-list">
        <li>✔ 10+ years of combined industry experience</li>
        <li>✔ Agile development and transparent communication</li>
        <li>✔ Enterprise‑grade security and scalable systems</li>
        <li>✔ Continuous support and maintenance</li>
      </ul>
    </section>
  );

  const ProjectsSection = () => (
    <section id="projects" className="projects animate-down delay-6">
      <h3>Featured Projects</h3>
      <div className="projects-grid">
        <article className="project-card">
          <h4>Inventory Management System</h4>
          <p>
            A complete barcode‑powered stock automation tool with reporting
            dashboard.
          </p>
        </article>
        <article className="project-card">
          <h4>Cloud Migration Suite</h4>
          <p>End‑to‑end migration from legacy infrastructure to AWS with CI/CD
            pipelines.
          </p>
        </article>
        <article className="project-card">
          <h4>Custom HR Portal</h4>
          <p>
            Employee onboarding, leave tracking, payroll, and attendance
            management.
          </p>
        </article>
      </div>
    </section>
  );

  const TestimonialsSection = () => (
    <section id="testimonials" className="testimonials animate-down delay-6">
      <h3>What Our Clients Say</h3>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <p>
            “Their team built our entire ERP system. Fast delivery and excellent
            quality.”
          </p>
          <strong>— Rakesh Sharma, Managing Director</strong>
        </div>
        <div className="testimonial-card">
          <p>
            “Professional, reliable, and the best in custom software
            development.”
          </p>
          <strong>— Priya Verma, Operations Head</strong>
        </div>
      </div>
    </section>
  );

  const FAQSection = () => (
    <section id="faq" className="faq animate-down delay-6">
      <h3>Frequently Asked Questions</h3>
      <div className="faq-list">
        <details>
          <summary>How long does a typical project take?</summary>
          <p>
            Most small-to-medium projects complete within 6–12 weeks depending
            on scope.
          </p>
        </details>
        <details>
          <summary>Do you provide maintenance?</summary>
          <p>
            Yes — we offer SLA-backed maintenance and support packages post-launch.
          </p>
        </details>
        <details>
          <summary>Which technologies do you specialise in?</summary>
          <p>
            We work with Node.js, React, Python/Django, AWS, Docker, and
            Kubernetes.
          </p>
        </details>
      </div>
    </section>
  );

  const PartnersSection = () => (
    <section id="partners" className="partners animate-down delay-6">
      <h3>Our Partners & Technologies</h3>
      <div className="partners-grid">
        <img src="/logos/aws.svg" alt="AWS" />
        <img src="/logos/react.svg" alt="React" />
        <img src="/logos/docker.svg" alt="Docker" />
        <img src="/logos/nodejs.svg" alt="Node.js" />
      </div>
    </section>
  );

  const ResourcesSection = () => (
    <section id="resources" className="resources animate-down delay-6">
      <h3>Resources & Insights</h3>
      <div className="resources-grid">
        <article className="resource-card">
          <h4>How to plan an ERP migration</h4>
          <p>Checklist and lessons from our migration projects.</p>
        </article>
        <article className="resource-card">
          <h4>Cloud cost optimisation</h4>
          <p>Proven tactics to reduce infrastructure bills by 30%+</p>
        </article>
      </div>
    </section>
  );

  const CTABanner = () => (
    <section className="cta-banner animate-down delay-6">
      <div className="cta-inner">
        <h3>Ready to transform your operations?</h3>
        <p>Schedule a free consultation with our experts.</p>
        <div className="cta-actions">
          <a href="/contact" className="btn btn-primary">Book a Call</a>
          <Link to="/enquiry" className="btn btn-outline">Send Inquiry</Link>
        </div>
      </div>
    </section>
  );

  const KeyMetrics = () => (
    <section id="metrics" className="metrics animate-down delay-6">
      <h3>Key Metrics</h3>
      <div className="metrics-grid">
        <div className="metric-card"><strong>120+</strong><span>Projects Delivered</span></div>
        <div className="metric-card"><strong>95%</strong><span>Client Satisfaction</span></div>
        <div className="metric-card"><strong>99.9%</strong><span>Uptime SLA</span></div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-col">
          <p>ABC IT Solutions — Building reliable software for businesses.</p>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>abcitsolutions@gmail.com<br/>+91 98765 XXXXX</p>
        </div>
        
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} ABC IT Solutions. All rights reserved.</div>
    </footer>
  );

  return (
    <main className="home-hero container">
      {/* HEADER */}
      <header className="home-header animate-down">
        <div className="brand">
          <div className="brand-text">
            <h1 className="brand-title">{isAdmin ? "ABC IT Solutions ERP" : "ABC IT Solutions"}</h1>
            <p className="tag">Practical solutions for growing teams</p>
          </div>
        </div>
        <nav className="nav-actions" aria-label="Primary">
          <Link to="/services" className="link-ghost">Services</Link>
          <Link to="/enquiry" className="btn btn-small">Get in touch</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero-grid animate-down delay-1" aria-labelledby="hero-heading">
        <div className="hero-text">
          <h2 id="hero-heading">Run your business with confidence</h2>
          <p className="lead">We design and build reliable software that scales with your team — from prototype to production.</p>

          <div className="hero-ctas">
            <Link to="/apply" className="btn btn-primary">Apply for Jobs</Link>
            <Link to="/enquiry" className="btn btn-outline">Make an Enquiry</Link>
          </div>

          <ul className="hero-features" aria-hidden>
            <li>Trusted by small businesses & startups</li>
            <li>Fast delivery cycles • Clear SLAs</li>
            <li>Secure by design</li>
          </ul>
        </div>

      </section>

      {/* SERVICES */}
      {(isAdmin || !isEmployee) && (
        <section id="services" className="services animate-down delay-2" aria-labelledby="services-heading">
          <h3 id="services-heading">Our Services</h3>
          <p className="section-sub">Modern tools and expert teams to accelerate your roadmap.</p>

          <div className="services-grid">
            {services.map((s, i) => (
              <article
                key={s.title}
                className="service-card animate-down"
                style={{ animationDelay: `${(i + 1) * 120 + 240}ms` }}
                aria-label={s.title}
                tabIndex={0}
              >
                <div className="service-icon-wrap">
                  <img src={`/icons/${s.icon}.svg`} alt="" aria-hidden className="service-icon" />
                </div>
                <div className="service-body">
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section id="contact" className="contact animate-down delay-5" aria-labelledby="contact-heading">
        <h3 id="contact-heading">Get Started</h3>
        <p>Need a demo or help onboarding? Tell us a bit about your project and we'll respond within one business day.</p>
        <div className="contact-actions">
          <a href="mailto:abcitsolutions@gmail.com" className="btn btn-primary">Contact Us</a>
          <Link to="/enquiry" className="btn btn-outline">Send Enquiry</Link>
        </div>
      </section>

      {/* Additional sections */}
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FAQSection />
      <KeyMetrics />
      <ResourcesSection />
      <CTABanner />
      <Footer />
    </main>
  );
};

export default Home;

