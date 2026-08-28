import React from 'react'
import { Reveal, SectionHead } from '../components/ui.jsx'

const USE_CASES = [
  { chip: '01 · Credit', title: 'Private Credit & Trade Finance', items: [
    'Automated waterfall tranches', 'Real-time on-chain valuation',
    'Branded portal with KYC, fiat rails and one-click yield payouts' ] },
  { chip: '02 · Yield', title: 'Active Yield & Arbitrage Vaults', items: [
    'Auto-compounding and algorithmic share pricing',
    'Direct liquidity integrations with lending markets', 'Automated risk controls' ] },
  { chip: '03 · Equity', title: 'Pre-IPO & Asset Syndicates', items: [
    'Regulatory-compliant digital shares',
    'Digital onboarding and instant accredited verification',
    'P2P order matching and private settlement rails' ] },
]

export function UseCases() {
  return (
    <section id="usecases"><div className="wrap">
      <SectionHead eyebrow="Use Cases" title="Built for products that live on-chain, not just tokens" />
      <div className="grid3">
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

const no = (t) => <><span className="mark no">✕</span>{t}</>
const ok = (t) => <><span className="mark ok">✓</span>{t}</>

const ROWS = [
  ['Audience',
    'Small businesses & startups',
    'Crypto-native distributors with an existing audience',
    'Tier-1 institutions ($50M+)',
    ok('Private Credit, PayFi & Yield funds ($5M–$50M)')],
  ['Time to launch',
    'Days, inside their console',
    'Days — a configured instance of the vendor’s vault',
    no('6–12 month procurement'),
    '~30 days standard · 8–12 weeks fully custom'],
  ['Who runs it day to day',
    'You, in their console',
    no('The vendor — redemptions, oracle, APIs'),
    no('The vendor'),
    ok('You, with runbooks and full handover')],
  ['Code ownership',
    no('SaaS rental'),
    no('Vendor’s codebase, shared with their own product'),
    no('Proprietary black box'),
    ok('100% full source code ownership')],
  ['Compliance depth',
    no('Off-chain checks, basic whitelist'),
    no('ERC-20 plus a whitelist — no identity layer'),
    'Deep, but only on the vendor’s rails',
    ok('ERC-3643 — eligibility enforced inside the transfer')],
  ['Financial logic',
    no('Static tokens only'),
    'Configurable, within the vendor’s vault model',
    no('No custom DeFi logic'),
    ok('Fully custom DeFi logic')],
  ['Fees',
    no('Subscription + per-investor metering'),
    no('Ongoing — service fee and a share of assets'),
    no('10–50 bps cut of total TVL'),
    ok('0% of your capital — fixed SLA / retainer')],
  ['If you walk away',
    no('Product stops with the subscription'),
    no('Product stops — code and operations were never yours'),
    no('Migration project'),
    ok('You keep everything and can run it alone')],
]

export function Compare() {
  return (
    <section id="compare" className="alt"><div className="wrap">
      <SectionHead eyebrow="Compare" title="Where Woof RWA sits">
        There are three ways to get a tokenized product today: rent a SaaS constructor, rent an operated vault from an
        issuer, or pass an enterprise vendor’s selection. All three keep the stack. We build the fourth option.
      </SectionHead>
      <Reveal>
        <div className="tbl-scroll tbl-wide">
          <table>
            <thead><tr>
              <th></th>
              <th>No-Code / SaaS<small>DigiShares, Brickken</small></th>
              <th>Operated white-label<small>issuers renting out their stack</small></th>
              <th>Enterprise platforms<small>Securitize, Tokeny</small></th>
              <th className="col-woof">Woof RWA<small>custom, owned by you</small></th>
            </tr></thead>
            <tbody>
              {ROWS.map(([label, a, b, c, w]) => (
                <tr key={label}>
                  <th>{label}</th><td>{a}</td><td>{b}</td><td>{c}</td><td className="col-woof">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="tbl-note">
          Renting is the right call for a standard product that has to be live next week. It becomes the wrong call when
          the product outgrows the vendor’s model, or when the fee follows your assets for as long as the product lives.
        </p>
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
        <div className="proof">
          <p className="big">Woof is a <b>core contributor team to Compound</b> and other blue-chip DeFi protocols. We have shipped production code in lending markets, oracles, risk parameters and liquidations — the exact machinery a tokenized fund needs on both sides: issuance and collateral.</p>
          <p className="foot">Logos are draft placeholders — final list and links to case studies TBD.</p>
        </div>
      </Reveal>
      <div className="marquee"><div className="marquee-track">
        {items.map((w, i) => <a key={i} href="https://woof.software" target="_blank" rel="noreferrer">{w}</a>)}
      </div></div>
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
