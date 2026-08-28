import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, SectionHead } from '../components/ui.jsx'

export function BestFit() {
  return (
    <section id="fit" className="alt"><div className="wrap">
      <SectionHead eyebrow="The Best Fit" title="A custom solution — for those the market skips" />
      <div className="grid2">
        <Reveal><div className="card green">
          <h3><span className="good">What you keep</span></h3>
          <ul>
            <li>Your very own minting and redemption rules</li>
            <li>Your very own jurisdiction</li>
            <li>Own brand and investor base</li>
            <li>End-to-end tech support</li>
          </ul>
        </div></Reveal>
        <Reveal delay={0.1}><div className="card">
          <h3>Who it&rsquo;s for</h3>
          <ul>
            <li>For those who don&rsquo;t fit Midas</li>
            <li>For those who don&rsquo;t want to pay Securitize</li>
            <li>For those who don&rsquo;t fit into monolith SaaS</li>
            <li>For those who want an engineering partner, not a licence</li>
          </ul>
        </div></Reveal>
      </div>
    </div></section>
  )
}

const LAYERS = [
  { n: 'Layer 1', title: 'On-chain core', items: [
    ['Compliance token · ERC-3643', 'Eligibility checked inside the transfer. Whitelists, lockups, jurisdiction rules on-chain.'],
    ['Fund vault · ERC-7540', 'Subscription and redemption queues settling at NAV: T+1, T+7, monthly.'],
    ['Multichain', 'One issuance across chains — transfer restrictions preserved everywhere.'],
  ]},
  { n: 'Layer 2', title: 'Data & compliance', items: [
    ['NAV pipeline', 'From your fund administrator to on-chain via RedStone or Chainlink, with staleness checks.'],
    ['Investor onboarding', 'KYC/KYB and accreditation via Sumsub, Persona or your provider. Reusable credentials.'],
    ['Reporting & exports', 'Positions, distributions and a full audit trail for your administrator and auditors.'],
  ]},
  { n: 'Layer 3', title: 'Operations', items: [
    ['Portals', 'Investor portal (subscribe, redeem, positions) and admin console (mint, burn, NAV, payouts).'],
    ['Custody', 'Fireblocks, BitGo, Copper — integrated with policy engines.'],
    ['Payments', 'Stablecoin and fiat rails with reconciliation built in.'],
  ]},
]

export function Stack() {
  return (
    <section id="stack"><div className="wrap">
      <SectionHead eyebrow="What We Build" title="A complete issuance stack, deployed under your brand" />
      <div className="grid3">
        {LAYERS.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.08}>
            <div className="card layer">
              <div className="lh"><span className="ln">{l.n}</span><h3>{l.title}</h3></div>
              <ol>
                {l.items.map(([t, p]) => (
                  <li key={t}><strong>{t}</strong><span>{p}</span></li>
                ))}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal><p className="own-line"><b>You own the code.</b> No per-investor metering, no per-entity licence, no vendor token in your fee model.</p></Reveal>
    </div></section>
  )
}

export function Collateral() {
  return (
    <section id="collateral" className="alt"><div className="wrap">
      <SectionHead eyebrow="Rails to Collateral" title="Most tokenized funds stop at issuance. Yours shouldn't." />
      <div className="grid2">
        <Reveal>
          <div className="card">
            <p className="lead">The asset exists on-chain and does nothing &mdash; that is where most tokenizations end.</p>
            <p className="lead">The unlock is collateral. Once your token is accepted in a lending market, <span className="good">it keeps earning yield while it is posted</span> &mdash; and that is what brings <span className="acc">leverage demand, treasury allocations and 24/7 settlement</span> to your product.</p>
            <p className="lead">We are contributors to blue-chip lending protocols. We know what the risk reviewer asks, because we have been on that side of the table.</p>
            <p className="proof-line">
              <span className="mark ok">✓</span>Already happening at institutional scale: Apollo&rsquo;s tokenized credit
              fund is accepted as collateral on Morpho, with the leveraged strategy curated by Gauntlet. Public markets,
              public numbers &mdash; the pattern is proven, and almost no issuer has built for it yet.
            </p>
            <div className="flow">
              <span className="step">Issue</span><span className="arr">→</span>
              <span className="step">List as collateral</span><span className="arr">→</span>
              <span className="step hot">Unlock leverage demand</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="card req">
            <h3>Listing requirements we build for</h3>
            <ol>
              <li><div>NAV oracle <small>with staleness handling</small></div></li>
              <li><div>Redemption mechanism <small>that holds under stress</small></div></li>
              <li><div>Liquidation logic <small>a risk committee can model</small></div></li>
              <li><div>An issuer who can answer the risk review <small>we prepare it with you</small></div></li>
            </ol>
            <p className="close"><b>We build the rails, and we run the listing process with you.</b></p>
          </div>
        </Reveal>
      </div>
    </div></section>
  )
}

const STEPS = [
  ['Scope call', 'Fund structure, jurisdiction, distribution — mapped to a concrete scope.', 'free · 1 session'],
  ['Architecture sprint', 'Token standard, vault flows, NAV source, custody and compliance design.', '1–2 weeks'],
  ['Build on the core', 'Pre-built issuance stack, customised to your rules and brand.', '4–8 weeks'],
  ['Audit & dry run', 'External audit, testnet rehearsal with your admin and seed investors.', '2–3 weeks'],
  ['Launch & listing', 'Production deploy, investor onboarding, collateral listing process.', 'ongoing'],
]

export function Process() {
  const reduce = useReducedMotion()
  return (
    <section id="process"><div className="wrap">
      <SectionHead eyebrow="Process" title="From first call to a live platform" />
      <div className="timeline">
        <motion.div
          className="tl-line"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {STEPS.map(([t, p, d], i) => (
          <Reveal key={t} delay={i * 0.12}>
            <div className="tl-item">
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3><p>{p}</p><span className="dur">{d}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div></section>
  )
}

export function Beyond() {
  return (
    <section id="beyond" className="alt"><div className="wrap">
      <SectionHead eyebrow="Beyond the First Product" title="Where your platform grows next" />
      <div className="grid4 beyond">
        {[
          ['Tranching', 'Senior and junior exposure from the same pool.'],
          ['Looping vaults', 'Leverage strategies built on your own asset.'],
          ['Reserve pool', 'A liquidity sleeve so redemptions clear without touching the illiquid book.'],
          ['Your own stablecoin', 'Payment or yield-bearing, on your reserves.'],
        ].map(([t, p], i) => (
          <Reveal key={t} delay={i * 0.06}><div className="card"><h3>{t}</h3><p>{p}</p></div></Reveal>
        ))}
      </div>
    </div></section>
  )
}

export function Why() {
  return (
    <section id="why"><div className="wrap">
      <SectionHead eyebrow="Why It Matters" title="The operating upside" />
      <Reveal>
        <div className="why">
          {[
            ['Operational efficiency', 'Lifecycle, reporting and corporate actions automated end to end — without growing your back office.'],
            ['Liquidity', 'Illiquid positions become transferable instruments with fractional access and real secondary potential.'],
            ['Global reach', 'Compliant distribution across jurisdictions, enforced at transfer level.'],
          ].map(([k, v]) => (
            <div className="row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>
          ))}
        </div>
      </Reveal>
    </div></section>
  )
}
