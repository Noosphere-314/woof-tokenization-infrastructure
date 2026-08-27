import React from 'react'
import { Reveal, SectionHead } from '../components/ui.jsx'

const USE_CASES = [
  { chip: '01 · Credit', title: 'Private Credit & Trade Finance', items: [
    'Automated waterfall tranches', 'Real-time on-chain valuation',
    'Branded portal with integrated KYC, fiat rails and one-click yield payouts' ] },
  { chip: '02 · Yield', title: 'Active Yield & Arbitrage Vaults', items: [
    'Auto-compounding and algorithmic share pricing',
    'Direct liquidity integrations with lending markets', 'Automated risk controls' ] },
  { chip: '03 · Equity', title: 'Pre-IPO & Asset Syndicates', items: [
    'Regulatory-compliant digital shares',
    'Digital onboarding, instant accredited verification, automated distribution',
    'Built-in P2P order matching and private settlement rails' ] },
]

export function UseCases() {
  return (
    <section id="usecases"><div className="wrap">
      <SectionHead eyebrow="Use Cases" title="Built for products that live on-chain, not just tokens" />
      <div className="cards3">
        {USE_CASES.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div className="card">
              <span className="chip">{c.chip}</span>
              <h3>{c.title}</h3>
              <ul>{c.items.map(x => <li key={x}>{x}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div></section>
  )
}

const ROWS = [
  ['Audience', 'Small businesses & startups', 'Tier-1 institutions ($50M+)', 'Private Credit, PayFi & Yield funds ($5M–$50M)'],
  ['Cost & Time', 'Low', 'High + 6–12 month procurement', <a key="e" href="#book">Enquire →</a>],
  ['Code Ownership', 'SaaS rental', 'Proprietary black box', '100% full source code ownership'],
  ['Financial Logic', 'Static tokens only', 'No custom DeFi logic', 'Fully custom DeFi logic'],
  ['Fees', 'Monthly subscription + per-investor metering', '10–50 bps cut of total TVL', '0% of your capital — fixed SLA / retainer'],
]

export function Compare() {
  return (
    <section id="compare"><div className="wrap">
      <SectionHead eyebrow="Compare" title="Where Woof RWA sits">
        Between rented SaaS and enterprise monopolies there is a gap: funds that need real financial logic and want to own it.
      </SectionHead>
      <Reveal>
        <div className="tbl-scroll">
          <table>
            <thead><tr>
              <th></th>
              <th>No-Code / SaaS<small>DigiShares, Brickken</small></th>
              <th>Enterprise Monopolies<small>Securitize, Tokeny</small></th>
              <th className="col-woof">Woof RWA<small>custom, owned by you</small></th>
            </tr></thead>
            <tbody>
              {ROWS.map(([label, a, b, w]) => (
                <tr key={label}>
                  <th>{label}</th><td>{a}</td><td>{b}</td><td className="col-woof">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div></section>
  )
}

const WORK = ['Compound', 'Moonwell', 'Euler', 'Silo', 'f(x) Protocol', 'See our work →']

export function Work() {
  const items = [...WORK, ...WORK]
  return (
    <section id="work"><div className="wrap">
      <Reveal>
        <div className="band">
          <p className="big">Woof is a <b>core contributor team to Compound</b> and other blue-chip DeFi protocols. We have shipped production code in lending markets, oracles, risk parameters and liquidations — the exact machinery a tokenized fund needs on both sides: issuance and collateral.</p>
          <div className="marquee"><div className="marquee-track">
            {items.map((w, i) => <a key={i} href="https://woof.software" target="_blank" rel="noreferrer">{w}</a>)}
          </div></div>
          <p className="foot">Logos are draft placeholders — final list and links to case studies TBD.</p>
        </div>
      </Reveal>
      <div className="strip">
        {[
          ['Audited code', 'External audits on every release; audit-ready repos and CI from day one.'],
          ['Battle-tested EVM standards', 'ERC-3643 · ERC-7540 · ERC-4626 — compliance enforced at transfer level, not by an API after the fact.'],
          ['Regulation-aligned', 'Structured to fit Reg D / Reg S offerings and MiFID II distribution, with your counsel in the loop.'],
        ].map(([t, p], i) => (
          <Reveal key={t} delay={i * 0.08}><div className="card"><p className="t">{t}</p><p>{p}</p></div></Reveal>
        ))}
      </div>
    </div></section>
  )
}
