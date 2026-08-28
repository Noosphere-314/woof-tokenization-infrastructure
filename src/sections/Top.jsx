import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const LINKS = [
  ['#usecases', 'Use Cases'], ['#compare', 'Compare'], ['#cost', 'Cost'], ['#stack', 'Stack'],
  ['#collateral', 'Collateral'], ['#process', 'Process'], ['#faq', 'FAQ'], ['/docs.html', 'Docs'],
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-in">
          <a className="logo" href="#top">Woof <span className="tag">RWA</span></a>
          <div className="menu">
            {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            <a className="cta" href="#book">Book a scope</a>
          </div>
          <button className="burger" aria-label="Menu" onClick={() => setOpen(true)}>☰</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="m-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="m-close" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
            {LINKS.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a className="cta" href="#book" onClick={() => setOpen(false)}>Book a scope</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const PIPE = [
  ['01', 'Compliance token'], ['02', 'Fund vault'], ['03', 'NAV feed'],
  ['04', 'Custody & fiat'], ['05', 'Collateral listing'],
]

function Pipeline() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setActive(a => (a + 1) % PIPE.length), 1600)
    return () => clearInterval(id)
  }, [reduce])
  return (
    <div className="pipe" aria-label="Issuance pipeline">
      {PIPE.map(([k, v], i) => (
        <div key={k} className={`pipe-item ${!reduce && active === i ? 'on' : ''}`}>
          <span className="k">{k}</span>
          <span className="v">{v}</span>
        </div>
      ))}
    </div>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const anim = (d) => reduce ? {} : {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  }
  return (
    <header className="hero" id="top">
      <div className="hero-in">
        <motion.span className="eyebrow" {...anim(0)}>Tokenization Infrastructure for Digital Assets</motion.span>
        <motion.h1 {...anim(0.08)}>
          Institutional-Grade <span className="grad">RWA &amp; Yield</span> Infrastructure
        </motion.h1>
        <motion.p className="sub" {...anim(0.16)}>
          Your own RWA platform live in <b>30 days</b>.* Built for funds — under your brand, in your jurisdiction, on code you own.
        </motion.p>
        <motion.div className="hero-ctas" {...anim(0.24)}>
          <a className="btn" href="#book">Book a scope call</a>
          <a className="btn ghost" href="#stack">See the stack</a>
        </motion.div>
        <motion.p className="note" {...anim(0.3)}>*From approved scope, on our pre-built issuance stack. Fully custom builds: 8–12 weeks.</motion.p>
      </div>
      <motion.div {...anim(0.4)}><Pipeline /></motion.div>
      <motion.div className="hero-stats" {...anim(0.5)}>
        <div className="stat"><b>100%</b><span>source code ownership</span></div>
        <div className="stat"><b>0%</b><span>cut of your capital</span></div>
        <div className="stat"><b>8–12 wk</b><span>scope to production</span></div>
      </motion.div>
    </header>
  )
}
