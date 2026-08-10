import { useState, useEffect, useRef } from 'react';
import InteractiveSticker from './components/InteractiveSticker';
import { motion, AnimatePresence } from 'framer-motion';
import SplashCursor from './components/SplashCursor';
import StarCursor from './components/StarCursor';
import CircularGallery from './components/CircularGallery';
import AchievementFolder from './components/AchievementFolder';
import WatercolorBg from './components/WatercolorBg';
import PixelCard from './components/PixelCard';
import Sudoku from './components/Sudoku';
import WhackAMole from './components/WhackAMole';
import MemoryMatch from './components/MemoryMatch';
import WordOfTheDay from './components/WordOfTheDay';
import RotatingText from './components/RotatingText';
import GooeyNav from './components/GooeyNav';
import PixelTransition from './components/PixelTransition';
import './App.css';

/* ============================================================
   TYPEWRITER HOOK
   ============================================================ */
function useTypewriter(texts, speed = 90, pause = 2200) {
  const [display, setDisplay]   = useState('');
  const [textIdx, setTextIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIdx];
    let timeout;

    if (!deleting && charIdx < currentText.length) {
      timeout = setTimeout(() => {
        setDisplay(currentText.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx >= currentText.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplay(currentText.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setTextIdx((t) => (t + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
}

/* ============================================================
   CONSTANTS
   ============================================================ */
const CERT_LINK =
  'https://drive.google.com/drive/folders/13OskhkOoAEXNbHRoSz-eRo-FWLyGGSZo?usp=drive_link';

/* Pastel SVG tile generator matching the dotted boundary card design */
const makeTile = (fill, nameLines, provider) => {
  const line1 = nameLines[0] || '';
  const line2 = nameLines[1] || '';
  const line3 = nameLines[2] || '';
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'>
      <!-- Card background -->
      <rect width='600' height='800' rx='45' fill='${fill}'/>
      <!-- Dotted inner boundary in soft neutral tone -->
      <rect x='25' y='25' width='550' height='750' rx='35' fill='none' 
            stroke='#9a9a9a' stroke-width='4' stroke-dasharray='14,14' opacity='0.35'/>
      
      <!-- Main title in center -->
      <text x='300' y='330' fill='#3A3A3A' font-size='40' font-weight='500' 
            font-family='Cormorant Garamond, Georgia, serif' text-anchor='middle'>${line1}</text>
      ${line2 ? `<text x='300' y='390' fill='#3A3A3A' font-size='40' font-weight='500' font-family='Cormorant Garamond, Georgia, serif' text-anchor='middle'>${line2}</text>` : ''}
      ${line3 ? `<text x='300' y='450' fill='#3A3A3A' font-size='40' font-weight='500' font-family='Cormorant Garamond, Georgia, serif' text-anchor='middle'>${line3}</text>` : ''}
      
      <!-- Powered by footer -->
      <text x='300' y='670' fill='#9a9a9a' font-size='22' 
            font-family='Manrope, sans-serif' text-anchor='middle'>Powered by:</text>
      <text x='300' y='710' fill='#6B6B6B' font-size='24' font-weight='500' 
            font-family='Manrope, sans-serif' text-anchor='middle'>${provider}</text>
    </svg>`
  )}`;
};

const pastelColors = ['#F5F1EA', '#e8ede6', '#f0ebe0', '#efe6de', '#e8e4ef', '#e2e0ea', '#dfe8dc'];

const certListRaw = [
  { name: ['Computer', 'Communications Network'], provider: 'Univ of Colorado (Coursera)' },
  { name: ['Computer', 'Networking Bits'], provider: 'Google (Coursera)' },
  { name: ['Digital Systems', 'Basics'], provider: 'Coursera' },
  { name: ['Fundamentals Network', 'Communication'], provider: 'Univ of Colorado (Coursera)' },
  { name: ['Generative AI', 'Essentials'], provider: 'Udemy' },
  { name: ['Git and GitHub', 'Mastery'], provider: 'Coursera / Google' },
  { name: ['Intro Hardware', '& OS'], provider: 'Coursera' },
  { name: ['Java Programming', 'Mastery'], provider: 'Cipher Schools' },
  { name: ['Java With', 'OOPs'], provider: 'Cipher Schools' },
  { name: ['Master', 'Generative AI'], provider: 'Udemy' },
  { name: ['No Code AI', 'Apps'], provider: 'Coursera' },
  { name: ['Object Oriented', 'Programming'], provider: 'Cipher Schools' },
  { name: ['Packet Switching', 'Networks'], provider: 'Univ of Colorado (Coursera)' },
  { name: ['Peer-to-Peer', 'Local Networks'], provider: 'Univ of Colorado (Coursera)' },
  { name: ['Responsive Web', 'Design'], provider: 'freeCodeCamp' },
  { name: ['Slogans of India', 'Quiz'], provider: 'MYBharat' },
  { name: ['Social Media', 'Security'], provider: 'NPTEL' },
  { name: ['TCP/IP Advanced', 'Topics'], provider: 'Univ of Colorado (Coursera)' },
];

const certItems = certListRaw.map((item, index) => ({
  image: makeTile(pastelColors[index % pastelColors.length], item.name, item.provider),
  text: '',
}));

const ROLES = ['developer', 'poet', 'reader', 'dreamer', 'builder', 'creator'];

const CERTS = [
  { name: 'Computer\nNetworking\nBits',           provider: 'Google · Coursera',                    color: 'cream',  tilt: -3   },
  { name: 'Peer-to-Peer\nLocal Networks',          provider: 'Univ. of Colorado · Coursera',          color: 'sage',   tilt: -1.5 },
  { name: 'Generative AI\nFundamentals',           provider: 'Udemy',                                 color: 'butter', tilt: 0,   featured: true },
  { name: 'Privacy &\nSecurity Online',            provider: 'NPTEL',                                 color: 'peach',  tilt: 1.5  },
  { name: 'Computer\nCommunications\nNetwork',     provider: 'Univ. of Colorado · Coursera',          color: 'sage',   tilt: 3    },
];

const PROJECTS = [
  {
    id: 'poet-verse',
    title: 'Poet-verse',
    subtitle: 'a home for poems',
    tag: 'Web App',
    date: 'Jan 2026',
    color: '#eae2d6',
    shortDesc: 'A poetic web community for sharing verses, stories, and thoughts with a clean intuitive UI.',
    longDesc: 'Poet-verse is a dedicated web platform designed for writers and poetry lovers to publish, discover, and discuss poetry seamlessly in a calm, journal-styled environment.',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'MySQL', 'Node.js'],
    highlights: [
      'Increased daily user engagement by 40% through clean intuitive UI',
      'Optimised database queries reducing retrieval times by 30%',
      'Rich text editor for verse formatting & community discussions',
    ],
    liveLink: 'https://poetverse.vercel.app/',
    githubLink: 'https://github.com/surbhiprasad555/poetverse',
  },
  {
    id: 'noteverse',
    title: 'Noteverse',
    subtitle: 'your digital notebook',
    tag: 'Web App',
    date: 'May 2026',
    color: '#e3ebd8',
    shortDesc: 'A platform to seamlessly create, star, and archive your personal notes.',
    longDesc: 'Noteverse is a dedicated digital notebook designed for users to seamlessly make notes, star their favorite ones, and archive older content in a clean, intuitive environment.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    highlights: [
      'Allows users to create, star, and archive notes effortlessly',
      'Clean and intuitive user interface for seamless note-taking',
    ],
    liveLink: 'https://wonderful-tree-0a597b500.7.azurestaticapps.net/',
    githubLink: 'https://github.com/surbhiprasad555/noteverse',
  },
  {
    id: 'investment-agent',
    title: 'AI Investment Research Agent',
    subtitle: 'automated financial analysis',
    tag: 'AI Web App',
    date: 'Aug 2026',
    color: '#dbe7f4',
    shortDesc: 'An AI-powered web app that simplifies researching publicly listed companies by generating structured investment reports.',
    longDesc: 'The AI Investment Research Agent is a serverless application built on Cloudflare Workers that uses LangChain and an LLM to collect and analyze financial data, generating professional investment research reports for any given publicly listed company.',
    tech: ['JavaScript', 'LangChain', 'OpenAI', 'Cloudflare Workers', 'Node.js'],
    highlights: [
      'Centralized processing through LangChain for clean, structured AI reports',
      'Global edge deployment with serverless Cloudflare Workers for low latency',
      'Generates structured investment insights instead of raw financial numbers'
    ],
    liveLink: 'https://investment-agent.quxxndied.workers.dev/',
    githubLink: 'https://github.com/surbhiprasad555/indide-iim-by-surbhi',
  }
];

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const typeText = useTypewriter(ROLES);
  const dragStart = useRef(null);
  const [secretOpen, setSecretOpen] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const [passwordError, setPasswordError] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [navScrolled, setNavScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  /* Reduced-motion: disable decorative cursor overlays for users who opt out */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  /* Nav scroll detection */
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll-reveal: smooth fade-in as sections enter viewport */
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target); // only reveal once
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ── Watercolor gingham + stars background ────────────── */}
      <WatercolorBg />

      {/* ── Fluid cursor overlay ─────────────────────────────── */}
      {!reducedMotion && <StarCursor />}
      {!reducedMotion && (
        <SplashCursor
          DENSITY_DISSIPATION={2.8}
          VELOCITY_DISSIPATION={1.8}
          SPLAT_RADIUS={0.18}
          CURL={2.5}
          RAINBOW_MODE={true}
          TRANSPARENT={true}
        />
      )}

      {/* ── Navigation ───────────────────────────────────────── */}
      <nav className="nav" style={{ width: '220px' }}>
        <a href="#hero" className="nav-brand" style={{ marginBottom: '40px' }}>Surbhi</a>
        <div style={{ height: '500px', position: 'relative' }}>
          <GooeyNav
            items={[
              { label: "home", href: "#hero" },
              { label: "skills", href: "#skills" },
              { label: "projects", href: "#projects" },
              { label: "certificates", href: "#certs" },
              { label: "Little wins", href: "#achievements" },
              { label: "Muse", href: "#secrets" }
            ]}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
      </nav>

      <main className="notebook-bg">

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <section className="hero" id="hero" style={{ position: 'relative' }}>
          <InteractiveSticker message="Breaking news: you are ridiculously cute."  
            id="hero-cat"
            src="/stickers/10cat-removebg-preview.svg" 
            alt="cat" 
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '2%',
              width: '320px',
              pointerEvents: 'auto',
              cursor: 'pointer',
              zIndex: 10
            }} 
          />

          <PixelTransition
            firstContent={
              <img
                src="/surbhipic.jpeg"
                alt="Surbhi"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            }
            secondContent={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  backgroundColor: "var(--ink)"
                }}
              >
                <p style={{ fontWeight: 500, fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#ffffff" }}>Meow!</p>
              </div>
            }
            gridSize={8}
            pixelColor="var(--ink)"
            once={false}
            animationStepDuration={0.4}
            className="custom-pixel-card"
          />
          <div className="hero-inner">
            <p className="hero-eyebrow">~ open pages, open code ~</p>

            <h1 className="hero-name" style={{ position: 'relative', display: 'inline-block' }}>
              <span 
                onClick={() => setShowAboutModal(true)} 
                style={{ cursor: 'pointer' }}
                title="About me"
              >
                Surbhi
              </span>
              <InteractiveSticker message="A little ribbon for the beautiful mess that is life."  
                src="/stickers/bow-removebg-preview.svg" 
                alt="bow" 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '-25px',
                  width: '90px',
                  transform: 'rotate(-10deg)',
                  pointerEvents: 'none',
                  filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))'
                }} 
              />
            </h1>

            <div className="hero-typewriter" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ marginRight: '8px' }}>a</span>
              <RotatingText
                texts={ROLES}
                mainClassName="rotating-text-main"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="rotating-text-split"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
                splitBy="characters"
                auto
                loop
              />
            </div>

            <p className="hero-bio">
              I build worlds with code and find them in words.
              Between the lines of syntax and stanzas I live —
              crafting interfaces that feel like poetry, reading
              books that feel like home, and writing commits that
              sometimes rhyme.
            </p>

            <div className="hero-cta">
              <a href="/surbhi_cv.pdf" download className="btn-ghost">Download CV ↓</a>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <button onClick={() => setShowContactModal(true)} className="btn-ghost">Let's connect</button>
                <InteractiveSticker message="You were never meant to dim yourself."  
                  src="/stickers/2star-removebg-preview.svg" 
                  alt="star" 
                  style={{ position: 'absolute', bottom: '-35px', right: '15px', width: '55px', transform: 'rotate(-5deg)', pointerEvents: 'none', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.05))' }} 
                />
                <InteractiveSticker message="You were never meant to dim yourself."  
                  src="/stickers/2star-removebg-preview.svg" 
                  alt="star" 
                  style={{ position: 'absolute', bottom: '-15px', right: '-25px', width: '45px', transform: 'rotate(15deg)', pointerEvents: 'none', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.05))' }} 
                />
              </div>
            </div>

            <div className="hero-links">
              <a href="https://github.com/surbhiprasad555" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span className="hero-sep">·</span>
              <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <span className="hero-sep">·</span>
              <a href="https://discord.gg/57wXZynCC" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              <span className="hero-sep">·</span>
              <a href="https://instagram.com/heyyemrys" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>


        </section>

        <div className="divider" aria-hidden="true">- - - - - - - - - -  0_0  - - - - - - - - - -</div>

        {/* ══════════════════════════════════════════════════════
            SKILLS
        ══════════════════════════════════════════════════════ */}
        <section className="section scroll-reveal" id="skills" style={{ position: 'relative' }}>
          <h2 className="section-title">Tools & tricks</h2>
          <p className="section-sub">The languages I speak, digital & otherwise</p>

          <div className="skills-grid" style={{ position: 'relative' }}>
            <img 
              src="/stickers/1banner-removebg-preview.svg"
              alt="banner"
              className="skills-banner"
            />
            <div className="skill-group">
              <h3 className="skill-group-title cursor-target">Languages</h3>
              <div className="tags">
                {['Python', 'C', 'C++', 'Java', 'JavaScript', 'PHP', 'HTML', 'CSS'].map((s) => (
                  <span key={s} className="tag cursor-target">{s}</span>
                ))}
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-group-title cursor-target">Databases</h3>
              <div className="tags">
                {['MySQL', 'MongoDB', 'Supabase', 'MS SQL Server'].map((s) => (
                  <span key={s} className="tag cursor-target">{s}</span>
                ))}
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-group-title cursor-target">Tools & Cloud</h3>
              <div className="tags">
                {['VS Code', 'Git', 'GitHub', 'Cursor', 'Microsoft Azure', 'AWS', 'GoogleFirebase'].map((s) => (
                  <span key={s} className="tag cursor-target">{s}</span>
                ))}
              </div>
            </div>

            <div className="skill-group">
              <h3 className="skill-group-title cursor-target">Soft Skills</h3>
              <div className="tags">
                {['Structured Thinking', 'Decision-Making', 'Leadership', 'Result Oriented'].map((s) => (
                  <span key={s} className="tag tag-soft cursor-target">{s}</span>
                ))}
              </div>
            </div>
            
            <InteractiveSticker message="I saw nothing. I know nothing. Carry on."  
              src="/stickers/9cat-removebg-preview.svg"
              alt="black cat"
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '-190px',
                width: '280px',
                pointerEvents: 'none',
                zIndex: 10
              }}
            />

            <InteractiveSticker message="Somewhere between chaos and calm, you found yourself."  
              src="/stickers/3flower-removebg-preview.svg"
              alt="sunflowers"
              style={{
                position: 'absolute',
                bottom: '-40px',
                right: '-75px',
                width: '200px',
                pointerEvents: 'none',
                zIndex: 10
              }}
            />
          </div>
        </section>

        <div className="divider" aria-hidden="true">- - - - - - - - - -  0_0  - - - - - - - - - -</div>

        {/* ══════════════════════════════════════════════════════
            PROJECTS
        ══════════════════════════════════════════════════════ */}
        <section className="section scroll-reveal" id="projects">
          <h2 className="section-title">Chapters I've written</h2>
          <p className="section-sub">
            Hover to view preview · click any book to read full story &amp; live link
          </p>

          <div className="books-row">
            
            {/* Banner / Garland */}
            <img 
              src="/stickers/2banner-removebg-preview.svg" 
              alt="banner"
              className="project-banner"
            />

            {PROJECTS.map((proj, index) => (
              <div key={proj.id} className="book-wrapper cursor-target" onClick={() => setSelectedProject(proj)}>
                
                {/* Left Cat */}
                {index === 0 && (
                  <InteractiveSticker message="Stretch. Breathe. Pretend you have your life together."  
                    src="/stickers/7cat-removebg-preview.svg" 
                    alt="Left Cat" 
                    className="project-left-cat"
                  />
                )}

                {/* Middle Cats */}
                {index === 1 && (
                  <InteractiveSticker message="We discussed it. You’re officially our favorite."  
                    src="/stickers/11cat-removebg-preview.svg" 
                    alt="Group of 3 Cats" 
                    className="project-bottom-cats"
                  />
                )}

                {/* Right Cat */}
                {index === 2 && (
                  <InteractiveSticker message="Keep going. Your story is getting prettier."  
                    src="/stickers/14cat-removebg-preview.svg" 
                    alt="Right Cat" 
                    className="project-right-cat"
                  />
                )}

                <div className="book">
                  <div className="book-inside">
                    <h3>{proj.title}</h3>
                    <span className="book-date">{proj.date}</span>
                    <p className="book-short-desc">{proj.shortDesc}</p>
                    <span className="book-read-more">Click For Details</span>
                  </div>
                  <div className="cover" style={{ background: proj.color }}>
                    <div className="cover-content">
                      <span className="cover-tag">{proj.tag}</span>
                      <p className="cover-title">{proj.title}</p>
                      <span className="cover-sub">{proj.subtitle}</span>
                    </div>
                    <div className="cover-back" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Aesthetic Dialog Modal */}
          {selectedProject && (
            <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
                <span className="modal-tag">{selectedProject.tag}</span>
                <h2 className="modal-title">{selectedProject.title}</h2>
                <span className="modal-date">{selectedProject.date}</span>

                <p className="modal-long-desc">{selectedProject.longDesc}</p>

                <div className="modal-tech-box">
                  <h4>Tech Stack Used:</h4>
                  <div className="tags">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-highlights">
                  <h4>Key Highlights:</h4>
                  <ul>
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-actions">
                  <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Live Demo
                  </a>
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    GitHub Code
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="divider" aria-hidden="true">- - - - - - - - - -  0_o  - - - - - - - - - -</div>

        {/* ══════════════════════════════════════════════════════
            CERTIFICATES — 3D CircularGallery Carousel
        ══════════════════════════════════════════════════════ */}
        <section className="certs-section scroll-reveal" id="certs">
          <div className="certs-box">
            {/* Custom Stickers placed according to user's layout dots */}
            <InteractiveSticker message="Make a wish. I’ll pretend I’m not listening."  src="/stickers/1star-removebg-preview.svg" alt="star" className="cert-star-1" />
            <InteractiveSticker message="Make a wish. I’ll pretend I’m not listening."  src="/stickers/1star-removebg-preview.svg" alt="star" className="cert-star-2" />
            <InteractiveSticker message="Small cat. Serious business. You’re wonderful."  src="/stickers/16cat-removebg-preview.svg" alt="orange cat" className="cert-cat-left" />
            <InteractiveSticker message={"Don't worry.\nI'm silently judging everyone except you."}  src="/stickers/15cat-removebg-preview.svg" alt="striped cat" className="cert-cat-right" />
            <InteractiveSticker message="You’re blooming, even if you don’t notice it yet."  src="/stickers/1flower-removebg-preview.svg" alt="flower" className="cert-flower-1" />
            <InteractiveSticker message="You’re blooming, even if you don’t notice it yet."  src="/stickers/1flower-removebg-preview.svg" alt="flower" className="cert-flower-2" />
            <InteractiveSticker message="You’re blooming, even if you don’t notice it yet."  src="/stickers/1flower-removebg-preview.svg" alt="flower" className="cert-flower-3" />

            <h2 className="certs-box-title">
              Sparkly certifications I actually stayed awake for
            </h2>

            <div
              className="gallery-wrap"
              onMouseDown={(e) => { dragStart.current = { x: e.clientX, y: e.clientY }; }}
              onMouseUp={(e) => {
                if (!dragStart.current) return;
                const dx = Math.abs(e.clientX - dragStart.current.x);
                const dy = Math.abs(e.clientY - dragStart.current.y);
                if (dx < 8 && dy < 8) {
                  window.open(CERT_LINK, '_blank', 'noopener,noreferrer');
                }
                dragStart.current = null;
              }}
              title="Click to view all certificates on Google Drive"
            >
              <CircularGallery
                items={certItems}
                bend={2.5}
                textColor="#2d2935"
                borderRadius={0.12}
                scrollSpeed={2}
                scrollEase={0.03}
                font="500 22px Cormorant Garamond"
                fontUrl="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&display=swap"
              />
            </div>

            <p className="certs-hint">
              Drag or scroll to rotate · click any card to view on{' '}
              <a href={CERT_LINK} target="_blank" rel="noopener noreferrer">Google Drive</a>
            </p>
          </div>
        </section>

        <div className="divider" aria-hidden="true">- - - - - - - - - -  &gt;_0  - - - - - - - - - -</div>

        {/* ══════════════════════════════════════════════════════
            ACHIEVEMENTS
        ══════════════════════════════════════════════════════ */}
        <section className="section ach-section-wrap scroll-reveal" id="achievements" style={{ position: 'relative' }}>
          <h2 className="section-title">Small victories, cherished</h2>
          <p className="section-sub ach-instruction-text">Every little achievement here has a story behind it—late nights, tiny wins, unexpected lessons, and lots of learning. Take a peek around; I hope reading these moments is just as enjoyable as living them was.</p>

          {/* Whimsical Stickers for Achievements */}
          <InteractiveSticker message="Excuse me… are you always this adorable?"  src="/stickers/4cat.svg" alt="blue cat" className="ach-cat-4" />
          <InteractiveSticker message="pssst… look over here 👀"  src="/stickers/1arrow-removebg-preview.svg" alt="arrow" className="ach-arrow-1" />
          <InteractiveSticker message="A little softness for your little corner of the world."  src="/stickers/12cat-removebg-preview.svg" alt="small cat" className="ach-cat-12" />
          <InteractiveSticker message="I’m mysterious. You’re adorable. Fair trade."  src="/stickers/5cat-removebg-preview.svg" alt="black cat" className="ach-cat-5" />

          <div className="ach-folder-center">
            <AchievementFolder />
          </div>
        </section>

        <div className="divider" aria-hidden="true">- - - - - - - - - -  0_&lt;  - - - - - - - - - -</div>

        {/* ══════════════════════════════════════════════════════
            PRIVATE — Password-protected gratitude letter
        ══════════════════════════════════════════════════════ */}
        <section className="secrets-section scroll-reveal" id="secrets" style={{ position: 'relative' }}>
          {/* Cats gathering around the secret section! */}
          <InteractiveSticker message="I have important news: you’re doing great."  src="/stickers/6cat-removebg-preview.svg" alt="grey tabby cat" className="secrets-cat-6" />
          <InteractiveSticker message="We came as a pair. You’re still the cutest one here."  src="/stickers/2cat.svg" alt="green cats" className="secrets-cat-2" />

          <h2 className="section-title">And then there are things I keep.</h2>
          <p className="section-sub">Some words are only for those who know the key</p>

          <div className="private-card-center" style={{ position: 'relative' }}>
            <InteractiveSticker message="Tiny tiger, big main-character energy."  src="/stickers/3cat.svg" alt="cat 3" className="secrets-cat-3" />
            <InteractiveSticker message="You have the face of someone who deserves a tiny adventure."  src="/stickers/13cat-removebg-preview.svg" alt="cat 13" className="secrets-cat-13" />
            <InteractiveSticker message="you missed something cute →"  src="/stickers/2arrow-removebg-preview.svg" alt="arrow 2" className="secrets-arrow-2" />
            <InteractiveSticker message="follow me, I know a secret"  src="/stickers/3arrow-removebg-preview.svg" alt="arrow 3" className="secrets-arrow-3" />
            <InteractiveSticker message="← probably important. probably."  src="/stickers/5arrow-removebg-preview.svg" alt="arrow 5" className="secrets-arrow-5" />
            <InteractiveSticker message="this way, little wanderer"  src="/stickers/4arrow-removebg-preview.svg" alt="arrow 4" className="secrets-arrow-4" />
            <InteractiveSticker message="pssst… look over here 👀"  src="/stickers/1arrow-removebg-preview.svg" alt="arrow 1" className="secrets-arrow-1" />
            <Sudoku />
            <WhackAMole />
            <MemoryMatch />
            <WordOfTheDay />
            <PixelCard
              variant="blue"
              gap={4}
              speed={40}
              colors="#B8B0CC,#A09ABF,#B3C2AD,#C9BAAF,#C29A94"
            >
              <div
                className="private-card-overlay"
                onClick={() => {
                  setShowPasswordPrompt(true);
                  setPasswordValue('');
                  setPasswordError(false);
                }}
              >
                <div className="private-card-404">
                  <h3>ERROR 404</h3>
                  <p>
                    Productivity not found.<br/>
                    No one is judging you here but cats.<br/>
                    Would you like to replace it<br/>
                    with a tiny game instead?
                  </p>
                  <div className="private-card-buttons">
                    <span>[Yes, please.]</span>
                    <span>[Still yes.]</span>
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>

          {/* ── Password prompt modal ── */}
          {showPasswordPrompt && (
            <div className="modal-overlay" onClick={() => setShowPasswordPrompt(false)}>
              <div className="password-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowPasswordPrompt(false)}>×</button>
                <span className="password-modal-icon">The key</span>
                <h3 className="password-modal-title">Enter the key</h3>
                <p className="password-modal-sub">This letter is for those who know me</p>
                <form
                  className="password-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (passwordValue === '555') {
                      setShowPasswordPrompt(false);
                      setLetterOpen(true);
                      setPasswordError(false);
                    } else {
                      setPasswordError(true);
                    }
                  }}
                >
                  <input
                    type="password"
                    className={`password-input ${passwordError ? 'password-input-error' : ''}`}
                    placeholder="password"
                    value={passwordValue}
                    onChange={(e) => { setPasswordValue(e.target.value); setPasswordError(false); }}
                    autoFocus
                  />
                  {passwordError && <p className="password-error">Not Quite — Try Again</p>}
                  <button type="submit" className="btn-primary password-submit">Unlock</button>
                </form>
              </div>
            </div>
          )}

          {/* ── Gratitude letter modal ── */}
          {letterOpen && (
            <div className="modal-overlay" onClick={() => setLetterOpen(false)}>
              <div className="letter-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setLetterOpen(false)}>×</button>
                <div className="letter-scroll">
                  <h2 className="letter-title">A Letter of Gratitude</h2>
                  <p className="letter-greeting">Dear Reader,</p>
                  <p className="letter-body">As I sit down to write this, my heart is filled with gratitude.</p>
                  <p className="letter-body">To my family, thank you for being my first home, my greatest strength, and my constant source of love. Your sacrifices, encouragement, and unwavering belief in me have shaped the person I am today. I carry your values with me in everything I do.</p>
                  <p className="letter-body">To my friends, thank you for walking beside me through every chapter of life. Thank you for the laughter, the memories, the honest conversations, and for standing by me during both the happiest and the most difficult moments. Life is brighter because of your presence.</p>
                  <p className="letter-body">To every teacher, mentor, and person who has guided me, thank you for sharing your knowledge, your patience, and your wisdom. Every lesson you taught has helped me grow in ways I continue to discover.</p>
                  <p className="letter-body">To every stranger who has shown kindness, every challenge that made me stronger, and every opportunity that helped me learn—thank you. Even the difficult moments have become valuable lessons that shaped my character.</p>
                  <p className="letter-body">Above all, I want to express my love and gratitude to my country. It is the land that gave me my identity, my language, my culture, and countless opportunities to dream, learn, and grow. I am proud to belong here, and I hope to contribute positively to its future in whatever way I can.</p>
                  <p className="letter-body">Life is a journey made meaningful not by what we achieve alone, but by the people who walk beside us. I am deeply grateful for every person who has been a part of my story. Whether our paths crossed for a moment or for a lifetime, you have left an imprint on my heart.</p>
                  <p className="letter-body">Thank you for your love, your support, your faith, and your kindness. I hope to carry these gifts forward by treating others with the same compassion and gratitude that I have received.</p>
                  <p className="letter-closing">With all my heart,</p>
                  <p className="letter-signature">Surbhi</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ==============================================
            FOOTER
        =============================================== */}
        <footer className="magical-footer scroll-reveal">
          lets revist again through the magical portfolio of Surbhiiiii  &gt;_&lt;
        </footer>

        {/* ==============================================
            CONTACT MODAL
        =============================================== */}
        {showContactModal && (
          <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
            <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowContactModal(false)}>×</button>
              <h3 className="contact-modal-title">Let's connect</h3>
              
              <div className="contact-socials">
                <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/surbhiprasad555" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://discord.gg/57wXZynCC" target="_blank" rel="noopener noreferrer">Discord</a>
                <a href="https://instagram.com/heyyemrys" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>

              <div className="contact-divider">or send a mail</div>

              <form 
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `mailto:surbhiprasad555@gmail.com?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(contactMessage)}`;
                  setShowContactModal(false);
                  setContactSubject('');
                  setContactMessage('');
                }}
              >
                <input
                  type="text"
                  placeholder="Subject"
                  className="contact-input"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  required
                />
                <textarea
                  placeholder="Message"
                  className="contact-textarea"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                ></textarea>
                <button type="submit" className="contact-submit">Send mail</button>
              </form>
            </div>
          </div>
        )}

        {/* ==============================================
            ABOUT ME MODAL
        =============================================== */}
        {showAboutModal && (
          <div className="modal-overlay" onClick={() => setShowAboutModal(false)}>
            <div className="contact-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
              <button className="modal-close" onClick={() => setShowAboutModal(false)}>×</button>
              <h3 className="contact-modal-title">About Me</h3>
              <div style={{ padding: '10px 20px 20px', lineHeight: '1.6', fontSize: '0.95rem', color: 'var(--ink)' }}>
                "I’m a Computer Science student specializing in Cloud Computing, with a passion for turning ideas into meaningful digital experiences. I enjoy exploring the space where technology meets creativity, building websites, applications, and solutions that are both functional and thoughtfully designed. I’m curious by nature and always eager to learn, experiment, and take on new challenges. For me, every project is more than just code - it is a chance to solve a problem, tell a story, and create something that feels a little different. I believe in growing through every experience, staying curious, and turning small sparks of inspiration into something real."
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
