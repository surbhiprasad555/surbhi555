import { useMemo, useState } from 'react'

import catOne from '../2cat.svg'
import catTwo from '../2cat.svg'
import catThree from '../3cat.svg'
import catSix from '../6cat-removebg-preview.svg'
import catTwelve from '../12cat-removebg-preview.svg'
import catFourteen from '../14cat-removebg-preview.svg'
import flowerOne from '../1flower-removebg-preview.svg'
import flowerTwo from '../2flower-removebg-preview.svg'
import arrowOne from '../1arrow-removebg-preview.svg'
import bow from '../bow-removebg-preview.svg'
import starOne from '../1star-removebg-preview.svg'
import starTwo from '../2star-removebg-preview.svg'
import portrait from '../surbhipic.jpeg'

const gallery = [
  { image: catOne, title: 'Little joys', text: 'Collecting tiny moments that make ordinary days glow.' },
  { image: flowerOne, title: 'Keep blooming', text: 'A reminder to make space for curiosity and rest.' },
  { image: catFourteen, title: 'Stay curious', text: 'Reading, tinkering, and following ideas wherever they lead.' },
  { image: starOne, title: 'Make wishes', text: 'Building thoughtful digital spaces with a little magic.' },
]

const messages = [
  'You look awesome today.',
  'Keep going. Your story is getting prettier.',
  'You were never meant to dim yourself.',
]

function App() {
  const [secretOpen, setSecretOpen] = useState(false)
  const [letterOpen, setLetterOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const currentMessage = useMemo(() => messages[messageIndex], [messageIndex])

  function unlockLetter(event) {
    event.preventDefault()
    if (password === '555') {
      setSecretOpen(false)
      setLetterOpen(true)
      setPasswordError(false)
      return
    }
    setPasswordError(true)
  }

  function sendMail(event) {
    event.preventDefault()
    const params = new URLSearchParams({ subject, body: message })
    window.location.href = `mailto:surbhiprasad555@gmail.com?${params.toString()}`
    setContactOpen(false)
    setSubject('')
    setMessage('')
  }

  return (
    <div className="site-shell">
      <header className="site-nav">
        <a className="brand" href="#home" aria-label="Surbhi home">surbhi<span>✦</span></a>
        <nav aria-label="Main navigation">
          <a href="#about">about</a>
          <a href="#work">work</a>
          <a href="#secrets">little secrets</a>
          <button className="text-button" onClick={() => setContactOpen(true)}>say hello</button>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">developer · poet · dreamer</p>
            <h1>Making the web feel a little more <em>human.</em></h1>
            <p className="hero-intro">I’m Surbhi, a developer who likes thoughtful interfaces, soft colours, and ideas that stay with you.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">See my work <span>↘</span></a>
              <button className="button button-light" onClick={() => setContactOpen(true)}>Let’s connect</button>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="portrait-frame"><img src={portrait} alt="" /></div>
            <img className="sticker sticker-flower" src={flowerTwo} alt="" />
            <img className="sticker sticker-bow" src={bow} alt="" />
            <img className="sticker sticker-star" src={starTwo} alt="" />
            <span className="scribble">hello,<br />friend!</span>
          </div>
        </section>

        <section className="marquee" aria-label="A little note">
          <span>build with intention</span><b>✦</b><span>leave room for wonder</span><b>✦</b><span>build with intention</span>
        </section>

        <section className="about section" id="about">
          <div className="section-heading"><p className="eyebrow">01 / a bit about me</p><h2>Curious by nature,<br /><em>careful by craft.</em></h2></div>
          <div className="about-copy"><p>I care about the space between function and feeling. The details that help an interface make sense, then smile back.</p><p>When I’m away from my editor, you’ll probably find me with a book, a notebook, or a cat sticker collection that has become mildly unmanageable.</p><a className="underlined-link" href="https://github.com/surbhiprasad555" target="_blank" rel="noreferrer">Find me on GitHub ↗</a></div>
        </section>

        <section className="work section" id="work">
          <div className="section-heading"><p className="eyebrow">02 / things I make</p><h2>Selected <em>little worlds.</em></h2></div>
          <div className="gallery-grid">{gallery.map((item) => <article className="work-card" key={item.title}><div className="work-image"><img src={item.image} alt="" /></div><p className="card-kicker">playful · purposeful</p><h3>{item.title}</h3><p>{item.text}</p><a href="#contact" onClick={() => setContactOpen(true)} className="card-link">Tell me more ↗</a></article>)}</div>
        </section>

        <section className="secrets section" id="secrets">
          <img className="secret-cat secret-cat-left" src={catSix} alt="" aria-hidden="true" />
          <img className="secret-cat secret-cat-right" src={catTwo} alt="" aria-hidden="true" />
          <img className="secret-arrow" src={arrowOne} alt="" aria-hidden="true" />
          <div className="secret-inner"><p className="eyebrow">03 / just between us</p><h2>There are things<br />I <em>keep.</em></h2><p>Some words are only for those who know the key.</p><button className="button button-dark" onClick={() => { setSecretOpen(true); setPassword(''); setPasswordError(false) }}>Open the secret ↗</button></div>
        </section>

        <section className="note section"><img src={catTwelve} alt="" aria-hidden="true" /><p className="eyebrow">a tiny note for today</p><blockquote>“{currentMessage}”</blockquote><button className="underlined-link" onClick={() => setMessageIndex((messageIndex + 1) % messages.length)}>Another one, please ↻</button></section>
      </main>

      <footer className="footer" id="contact"><div><a className="brand" href="#home">surbhi<span>✦</span></a><p>Let’s make something lovely.</p></div><button className="button button-light" onClick={() => setContactOpen(true)}>Send a little mail ↗</button><small>© {new Date().getFullYear()} Surbhi Prasad</small></footer>

      {secretOpen && <div className="modal-backdrop" onClick={() => setSecretOpen(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSecretOpen(false)} aria-label="Close">×</button><img src={catThree} alt="" /><p className="eyebrow">a tiny password</p><h2>Enter the key</h2><p>This letter is for those who know me.</p><form onSubmit={unlockLetter}><input autoFocus type="password" value={password} onChange={(event) => { setPassword(event.target.value); setPasswordError(false) }} placeholder="password" aria-label="Password" />{passwordError && <span className="form-error">Not quite — try again.</span>}<button className="button button-dark" type="submit">Unlock</button></form></div></div>}

      {letterOpen && <div className="modal-backdrop" onClick={() => setLetterOpen(false)}><div className="modal letter-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setLetterOpen(false)} aria-label="Close">×</button><p className="eyebrow">a letter of gratitude</p><h2>Dear Reader,</h2><p>Thank you for being here, for making room for curiosity, and for walking through this little portfolio with me.</p><p>Life is a journey made meaningful by the people who walk beside us. I’m grateful for every person who has been part of my story, whether our paths crossed for a moment or a lifetime.</p><p>With all my heart,<br /><em>Surbhi</em></p></div></div>}

      {contactOpen && <div className="modal-backdrop" onClick={() => setContactOpen(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setContactOpen(false)} aria-label="Close">×</button><p className="eyebrow">let’s connect</p><h2>Say hello.</h2><div className="social-links"><a href="https://github.com/surbhiprasad555" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div><form onSubmit={sendMail}><input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Subject" required /><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="A little message" rows="4" required /><button className="button button-dark" type="submit">Send mail ↗</button></form></div></div>}
    </div>
  )
}

export default App
