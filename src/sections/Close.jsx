import React, { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal, SectionHead } from '../components/ui.jsx'

const FAQS = [
  ['Who owns the code and the contracts?',
   'You do. Full source, deployment keys and infrastructure are handed over. No per-investor metering, no per-entity licence, no vendor token anywhere in your fee model.'],
  ['How long does it take to launch?',
   'A standard issuance on our pre-built stack goes live in about 30 days from an approved scope. Fully custom builds — bespoke vault logic, exotic assets, multichain — run 8–12 weeks to production, including an external audit.'],
  ['Do you handle the legal and regulatory side?',
   'We build the software and encode your compliance rules on-chain (eligibility, lockups, jurisdictions). The legal structure itself — offering documents, licensing, transfer agent — stays with your counsel and licensed partners; we integrate with them and have done Reg D / Reg S and MiFID II-aligned setups.'],
  ['What does it cost?',
   'Fixed scope, fixed price — typically in the range of a year of enterprise SaaS fees, except you keep the asset. Integration work starts smaller; a full platform is a bigger engagement. The scope call gives you a concrete number, free.'],
  ['Can you actually get our token accepted as collateral?',
   'We build to the listing requirements lending protocols enforce — NAV oracle, redemption mechanism, liquidation logic — and we run the risk-review process with you. We are contributors to blue-chip lending protocols, so we know what the reviewer asks. Acceptance is the protocol’s decision; our job is that you arrive with every box checked.'],
  ['Why not just use Brickken or Securitize?',
   'If a SaaS constructor covers your needs, use it — honestly. Our clients are funds that hit its limits: real subscription/redemption queues, custom DeFi logic, their own jurisdiction, or fee models that stop making sense at scale. And Securitize is excellent if you pass their selection and their pricing fits your AUM.'],
]

export function Faq() {
  const [open, setOpen] = useState(0)
  const reduce = useReducedMotion()
  return (
    <section id="faq" className="alt"><div className="wrap">
      <SectionHead eyebrow="FAQ" title="The questions every fund asks first" />
      <div className="faq">
        {FAQS.map(([q, a], i) => {
          const isOpen = open === i
          return (
            <Reveal key={q} delay={i * 0.04}>
              <div className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  {q}<span className="ic">+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="faq-a">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div></section>
  )
}

const encode = (data) => Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&')

export function Book() {
  const [state, setState] = useState('idle')
  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = Object.fromEntries(new FormData(form).entries())
    setState('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'scope-request', ...data }),
      })
      setState('ok')
      form.reset()
    } catch {
      setState('error')
    }
  }
  return (
    <section id="book"><div className="wrap">
      <Reveal>
        <div className="inner"><div className="in2">
          <div className="pitch">
            <span className="eyebrow" style={{ color: '#3c5f9e', display: 'block', marginBottom: 14 }}>Book a Scope</span>
            <h2>First architecture call is free</h2>
            <p>We map your fund structure, jurisdiction and distribution to a concrete scope in one session.</p>
            <ul>
              <li>A concrete scope and a fixed number — not a sales deck</li>
              <li>Token standard and vault flow recommendation for your asset</li>
              <li>An honest answer if a SaaS platform fits you better</li>
            </ul>
          </div>
          <form className="form" name="scope-request" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit}>
            <input type="hidden" name="form-name" value="scope-request" />
            <p hidden><label>Don&rsquo;t fill this out: <input name="bot-field" /></label></p>
            <div><label htmlFor="f-name">Name</label><input id="f-name" name="name" required autoComplete="name" /></div>
            <div><label htmlFor="f-company">Fund / company</label><input id="f-company" name="company" required autoComplete="organization" /></div>
            <div><label htmlFor="f-email">Work email</label><input id="f-email" name="email" type="email" required autoComplete="email" /></div>
            <div><label htmlFor="f-asset">What are you tokenizing?</label>
              <select id="f-asset" name="asset" defaultValue="Private credit">
                <option>Private credit</option><option>Yield / arbitrage strategies</option>
                <option>Pre-IPO / equity</option><option>Real estate</option>
                <option>Fund shares</option><option>Other / not sure yet</option>
              </select>
            </div>
            <div><label htmlFor="f-msg">Anything else</label><textarea id="f-msg" name="message" /></div>
            {state === 'ok'
              ? <p className="ok">Got it — we&rsquo;ll reply within one business day.</p>
              : <button className="btn" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Request the call'}</button>}
            {state === 'error' && <p className="privacy">Something went wrong — email us instead: hello@woof.software</p>}
            <p className="privacy">We use your details only to reply. No newsletters.</p>
          </form>
        </div></div>
      </Reveal>
    </div></section>
  )
}

export function Footer() {
  return (
    <footer><div className="wrap">
      <div className="in">
        <span><b style={{ color: 'var(--text)' }}>Woof RWA</b> · Tokenization Infrastructure for Digital Assets</span>
        <span className="draft">Draft v1 · internal preview</span>
        <a href="https://woof.software" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}>woof.software →</a>
      </div>
      <p className="legal">Woof builds software and engineering infrastructure. Woof is not a broker-dealer, investment adviser, transfer agent or law firm, and nothing on this page is an offer of securities or legal, tax or investment advice. Regulatory roles are performed by the issuer and its licensed partners. Product names and standards referenced (ERC-3643, ERC-7540, ERC-4626) are open standards; third-party marks belong to their owners.</p>
    </div></footer>
  )
}
