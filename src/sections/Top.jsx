import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'

const LINKS = [
  ['#usecases', 'Use Cases'], ['#compare', 'Compare'], ['#stack', 'Stack'],
  ['#collateral', 'Collateral'], ['#process', 'Process'], ['#faq', 'FAQ'],
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

export function Hero() {
  const reduce = useReducedMotion()
  const stagger = reduce ? {} : {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  }
  const t = (d) => reduce ? {} : { transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } }
  return (
    <header className="hero" id="top">
      <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
      <div className="hero-in">
        <motion.span className="eyebrow" {...stagger} {...t(0)}>Tokenization Infrastructure for Digital Assets</motion.span>
        <motion.h1 {...stagger} {...t(0.08)}>
          Institutional-Grade{' '}
          <motion.span
            className="hl"
            initial={reduce ? false : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >RWA &amp; Yield</motion.span>{' '}
          Infrastructure
        </motion.h1>
        <motion.p className="sub" {...stagger} {...t(0.16)}>Your own RWA platform live in 30 days.*</motion.p>
        <motion.div {...stagger} {...t(0.24)}>
          <a className="btn" href="#book">Book a scope call</a>
        </motion.div>
        <motion.p className="note" {...stagger} {...t(0.3)}>*From approved scope, on our pre-built issuance stack. Fully custom builds: 8&ndash;12 weeks.</motion.p>
        <motion.div className="hero-stats" {...stagger} {...t(0.38)}>
          <div className="stat"><b>100%</b><span>source code ownership</span></div>
          <div className="stat"><b>0%</b><span>cut of your capital</span></div>
          <div className="stat"><b>8&ndash;12 wk</b><span>scope to production</span></div>
        </motion.div>
      </div>
    </header>
  )
}
