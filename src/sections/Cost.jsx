import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, SectionHead } from '../components/ui.jsx'

const money = (n) => {
  if (n >= 1e6) {
    const m = n / 1e6
    return `$${m >= 10 ? Math.round(m) : m.toFixed(2)}M`
  }
  return `$${Math.round(n / 1e3)}K`
}

const YEARS = [1, 3, 5]

export function Cost() {
  const [aum, setAum] = useState(100)   // $M tokenized in the product
  const [bps, setBps] = useState(35)    // annual platform fee
  const reduce = useReducedMotion()

  const perYear = (aum * 1e6 * bps) / 10000
  const max = perYear * YEARS[YEARS.length - 1]

  return (
    <section id="cost"><div className="wrap">
      <SectionHead eyebrow="Rent vs own" title="What renting the rails costs you">
        Every platform fee is a percentage of the assets you raised. It does not stop when the build is finished —
        it runs for as long as the product lives. Move the sliders to your own numbers.
      </SectionHead>

      <div className="grid2 calc-grid">
        <Reveal>
          <div className="card calc-in">
            <label className="calc-field" htmlFor="c-aum">
              <span className="calc-lbl">Tokenized in this product</span>
              <output className="calc-val">${aum}M</output>
              <input id="c-aum" type="range" min="10" max="500" step="5"
                value={aum} onChange={e => setAum(+e.target.value)} />
              <span className="calc-hint">$10M — $500M</span>
            </label>

            <label className="calc-field" htmlFor="c-bps">
              <span className="calc-lbl">Platform fee, per year</span>
              <output className="calc-val">{bps} bps</output>
              <input id="c-bps" type="range" min="5" max="75" step="1"
                value={bps} onChange={e => setBps(+e.target.value)} />
              <span className="calc-hint">Enterprise platforms publish 10–50 bps of assets. Operated white-label deals are negotiated privately.</span>
            </label>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card calc-out">
            <h3>What that fee adds up to</h3>
            <div className="bars">
              {YEARS.map((y) => {
                const total = perYear * y
                const pct = Math.max(6, (total / max) * 100)
                return (
                  <div className="bar-row" key={y}>
                    <span className="bar-k">Year {y}</span>
                    <div className="bar-track">
                      <motion.div className="bar-fill"
                        style={{ width: `${pct}%` }}
                        animate={{ width: `${pct}%` }}
                        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 22 }}
                      />
                    </div>
                    <span className="bar-v">{money(total)}</span>
                  </div>
                )
              })}
            </div>
            <p className="calc-note">
              <b>Your build is a one-time fixed fee</b> and takes <b>0%</b> of the assets — for year six and every year after,
              the line above stays flat at what you already paid. Bring your numbers to a scope call and we put a figure next to them.
            </p>
            <a className="btn" href="#book">Get your number</a>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.16}>
        <p className="tbl-note">
          The comparison is deliberately narrow: it counts the platform fee only, not your fund administrator, custody,
          audit or legal — those cost the same either way. What changes is whether the software line is a percentage of
          your success or a number you agreed once.
        </p>
      </Reveal>
    </div></section>
  )
}
