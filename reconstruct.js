const fs = require('fs');

const content = \import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashCursor from './components/SplashCursor';
import StarCursor from './components/StarCursor';
import CircularGallery from './components/CircularGallery';
import AchievementFolder from './components/AchievementFolder';
import WatercolorBg from './components/WatercolorBg';
import PixelCard from './components/PixelCard';
import TicTacToe from './components/TicTacToe';
import Sudoku from './components/Sudoku';
import WhackAMole from './components/WhackAMole';
import MemoryMatch from './components/MemoryMatch';
import WordOfTheDay from './components/WordOfTheDay';
import RotatingText from './components/RotatingText';
import GooeyNav from './components/GooeyNav';
import PixelTransition from './components/PixelTransition';
import './App.css';

export default function App() {
  const [passwordValue, setPasswordValue] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showCatMessage, setShowCatMessage] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeGameModal, setActiveGameModal] = useState(null);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SplashCursor />
      <GooeyNav scrolled={navScrolled} onContactClick={() => setShowContactModal(true)} />
      
      <main className="main-content">
        <section className="hero-section" id="home">
          <WatercolorBg />
          <StarCursor />
          <div className="hero-content" style={{ marginTop: '20vh' }}>
            <h1 className="hero-title">Surbhi Prasad</h1>
            <RotatingText texts={['Developer', 'Designer', 'Creator']} />
          </div>
        </section>

        <div className="divider" aria-hidden="true">- - - - - - - - - -  &gt;_&lt;  - - - - - - - - - -</div>

        <section className="gallery-section" id="gallery">
          <CircularGallery />
        </section>

        <div className="divider" aria-hidden="true">- - - - - - - - - -  &gt;_&lt;  - - - - - - - - - -</div>

        <section className="achievements-section" id="achievements">
          <img src="/stickers/1arrow-removebg-preview.svg" alt="arrow" className="ach-arrow-1" />
          <img src="/stickers/12cat-removebg-preview.svg" alt="small cat" className="ach-cat-12" />
          <img src="/stickers/5cat-removebg-preview.svg" alt="black cat" className="ach-cat-5" />
          <div className="ach-folder-center">
            <AchievementFolder />
          </div>
        </section>

        <div className="divider" aria-hidden="true">- - - - - - - - - -  0_&lt;  - - - - - - - - - -</div>

        <section className="secrets-section" id="secrets" style={{ position: 'relative' }}>
          <img src="/stickers/6cat-removebg-preview.svg" alt="grey tabby cat" className="secrets-cat-6" />
          <img src="/stickers/2cat.svg" alt="green cats" className="secrets-cat-2" />

          <h2 className="section-title">And then there are things I keep.</h2>
          <p className="section-sub">Some words are only for those who know the key</p>

          <div className="private-card-center" style={{ position: 'relative' }}>
            <img src="/stickers/3cat.svg" alt="cat 3" className="secrets-cat-3" />
            <img src="/stickers/13cat-removebg-preview.svg" alt="cat 13" className="secrets-cat-13" />
            <img src="/stickers/2arrow-removebg-preview.svg" alt="arrow 2" className="secrets-arrow-2" />
            <img src="/stickers/3arrow-removebg-preview.svg" alt="arrow 3" className="secrets-arrow-3" />
            <img src="/stickers/5arrow-removebg-preview.svg" alt="arrow 5" className="secrets-arrow-5" />
            <img src="/stickers/4arrow-removebg-preview.svg" alt="arrow 4" className="secrets-arrow-4" />
            <img src="/stickers/1arrow-removebg-preview.svg" alt="arrow 1" className="secrets-arrow-1" />
            
            <TicTacToe isModal={false} onEnlarge={() => setActiveGameModal('tictactoe')} />
            <Sudoku isModal={false} onEnlarge={() => setActiveGameModal('sudoku')} />
            <WhackAMole isModal={false} onEnlarge={() => setActiveGameModal('whackamole')} />
            <MemoryMatch isModal={false} onEnlarge={() => setActiveGameModal('memorymatch')} />
            <WordOfTheDay isModal={false} onEnlarge={() => setActiveGameModal('wordoftheday')} />
            
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

          {showPasswordPrompt && (
            <div className="modal-overlay" onClick={() => setShowPasswordPrompt(false)}>
              <div className="password-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setShowPasswordPrompt(false)}>✖</button>
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
                    className={\password-input \\}
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

          {letterOpen && (
            <div className="modal-overlay" onClick={() => setLetterOpen(false)}>
              <div className="letter-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setLetterOpen(false)}>✖</button>
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

        <footer className="magical-footer">
          lets revist again through the magical portfolio of Surbhiiiii  &gt;_&lt;
        </footer>

        {showContactModal && (
          <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
            <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowContactModal(false)}>✖</button>
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
                  window.location.href = \mailto:surbhiprasad555@gmail.com?subject=\&body=\\;
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

        {activeGameModal && (
          <div className="modal-overlay" onClick={() => setActiveGameModal(null)}>
            <div className="game-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close game-modal-close" onClick={() => setActiveGameModal(null)}>✖</button>
              {activeGameModal === 'tictactoe' && <TicTacToe isModal={true} />}
              {activeGameModal === 'sudoku' && <Sudoku isModal={true} />}
              {activeGameModal === 'whackamole' && <WhackAMole isModal={true} />}
              {activeGameModal === 'memorymatch' && <MemoryMatch isModal={true} />}
              {activeGameModal === 'wordoftheday' && <WordOfTheDay isModal={true} />}
            </div>
          </div>
        )}
      </main>
    </>
  );
}\;
fs.writeFileSync('C:\\\\Users\\\\Acer\\\\Downloads\\\\surbhisportfolio\\\\src\\\\App.jsx', content);
console.log('App.jsx reconstructed!');
