import React from 'react'
import Diagram from './Diagram.jsx'
import { Reveal } from '../components/ui.jsx'
import { Footer } from '../sections/Close.jsx'

const NAV = [
  ['#architecture', 'Architecture'], ['#standards', 'Standards'], ['#nav', 'NAV pipeline'],
  ['#integrations', 'Integrations'], ['#ownership', 'Ownership'], ['#collateral', 'Collateral'], ['#boundary', 'Boundary'],
]

const STANDARDS = [
  ['ERC-3643', 'Permissioned token (T-REX)', 'Eligibility is checked inside the transfer, not by an API after settlement. Identity registry + modular compliance rules.', 'Balances cannot move to a wallet that fails your rules — including on a secondary venue you never approved.'],
  ['ERC-7540', 'Asynchronous vault', 'Subscription and redemption requests are queued, then fulfilled at the NAV of the settlement cycle.', 'Funds do not price continuously. Synchronous vaults force a live price and break on any illiquid book.'],
  ['ERC-4626', 'Vault accounting base', 'Share/asset conversion, the accounting layer ERC-7540 extends.', 'Integrators already read it. Free compatibility with existing tooling and dashboards.'],
  ['ERC-20', 'Transfer surface', 'The token still looks like ERC-20 to every wallet, explorer and protocol.', 'Compliance must not cost you the entire integration surface of the chain.'],
]

const CORE = [
  ['Token', 'Permissioned share class. Mint, burn, forced transfer for court orders and lost keys, pause. One contract per share class.'],
  ['Identity registry', 'Maps wallets to verified identities and their claims (jurisdiction, accreditation, expiry). Claims are issued by your KYC provider, not by us.'],
  ['Compliance modules', 'Composable rules evaluated on every transfer: country allow/deny, holder caps, per-investor caps, lockups, transfer windows, non-transferability during redemption.'],
  ['Vault', 'Request → fulfil lifecycle for subscriptions and redemptions. Cycle length is yours: T+1, T+7, monthly.'],
  ['NAV adapter', 'Consumes the signed price feed, enforces staleness and deviation bounds, halts fulfilment rather than settling on a bad price.'],
  ['Distribution', 'Coupons and dividends pushed pro-rata, or accrued into share price. Reporting export for your fund administrator.'],
]

const NAVSTEPS = [
  ['Source', 'Your fund administrator produces NAV on your existing schedule. Nothing about your accounting changes.'],
  ['Sign', 'The value is signed off-chain by an authorised key set — usually the administrator plus one internal approver.'],
  ['Publish', 'Pushed on-chain through RedStone or Chainlink, or a first-party feed you control. The choice is a cost/decentralisation trade-off, not a technical lock-in.'],
  ['Guard', 'Staleness window, maximum deviation per publication, and a circuit breaker. If any bound is breached, fulfilment halts and nothing settles at a wrong price.'],
  ['Consume', 'The vault fulfils the queue at the published NAV. Lending markets read the same feed — one price, one source of truth.'],
]

const SLOTS = [
  ['Investor verification', 'Sumsub · Persona · Onfido · your existing provider', 'You', 'Claims are issued once and reused across every product you launch.'],
  ['Custody', 'Fireblocks · BitGo · Copper · self-custody with MPC', 'You', 'We never hold keys or client assets.'],
  ['Price feed', 'RedStone · Chainlink · first-party signed feed', 'You', 'Feed choice affects which lending markets will list you.'],
  ['Fiat & stablecoin rails', 'Your banking partner or PSP', 'You', 'We build the reconciliation, not the licence.'],
  ['Fund administration', 'Your existing administrator', 'You', 'The NAV pipeline plugs into their output — no migration.'],
  ['Transfer agent / registrar', 'Licensed partner where your structure requires one', 'You', 'Required for most US structures. Scope it before contracts, not after.'],
  ['Legal & offering docs', 'Your counsel', 'You', 'We encode the rules they define. We do not define them.'],
  ['Contracts, portals, pipeline', 'Woof', 'You, on delivery', 'Source code, deployment keys and repositories transfer to you.'],
]

const CHECKS = [
  ['A price a risk committee can model', 'Signed NAV with a published staleness window and deviation bounds — not a manual multisig update.'],
  ['Redemption that holds under stress', 'A documented queue, a defined cycle, and a reserve sleeve so redemptions clear without touching the illiquid book.'],
  ['Liquidation logic that works off-chain hours', 'What a liquidator receives, how they exit, and what happens when the underlying market is closed.'],
  ['An issuer who can answer the review', 'Risk teams ask about the administrator, the auditor, the custodian and the failure modes. We sit on that call with you.'],
]

const NOT = [
  'We are not a broker-dealer, investment adviser, transfer agent or law firm, and we do not custody client assets.',
  'We do not issue your token — you do. We do not act as risk manager for your fund.',
  'We do not provide legal or tax opinions on your structure, and we do not select your jurisdiction for you.',
  'We do not resell a licence with our own token in the fee model. Fixed engagement fee, no basis points on your AUM.',
]

export default function Docs() {
  return (
    <>
      <nav className="nav scrolled">
        <div className="wrap nav-in">
          <a className="logo" href="/">Woof <span className="tag">RWA</span></a>
          <div className="menu docs-menu">
            {NAV.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
            <a className="cta" href="/#book">Book a scope</a>
          </div>
        </div>
      </nav>

      <header className="doc-hero">
        <div className="wrap">
          <span className="chip">Reference architecture · v0</span>
          <h1>What we deploy, and who owns each piece</h1>
          <p className="lead">
            This is the target architecture for a tokenized fund: the standards, the contract surface, the NAV pipeline
            and the integration slots. Written for the person who has to defend the design internally — a CTO, a head of
            operations, or the risk reviewer on the other side of a listing.
          </p>
          <p className="doc-status">
            <b>Status.</b> The reference implementation is in build — token, vault, NAV feed and both portals, targeting
            a public testnet. This page documents the architecture, not a shipped product. When the deployment is live,
            addresses and a walkthrough are published here.
          </p>
        </div>
      </header>

      <section id="architecture" className="alt">
        <div className="wrap">
          <Reveal><h2>Architecture</h2></Reveal>
          <Reveal delay={0.05}><Diagram /></Reveal>
          <div className="grid3 doc-core">
            {CORE.map(([t, d], i) => (
              <Reveal key={t} delay={0.04 * i}><div className="card"><h3>{t}</h3><p>{d}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="standards">
        <div className="wrap">
          <Reveal><h2>Standards, and why each one</h2></Reveal>
          <Reveal delay={0.05}>
            <div className="tbl-scroll">
              <table>
                <thead>
                  <tr><th>Standard</th><th>Role</th><th>What it does</th><th className="col-woof">Why it, and not something simpler</th></tr>
                </thead>
                <tbody>
                  {STANDARDS.map(([s, r, w, y]) => (
                    <tr key={s}><td><b className="mono-k">{s}</b></td><td>{r}</td><td>{w}</td><td className="col-woof">{y}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="doc-note">
              These are public standards with existing audits, tooling and integrator familiarity — not a proprietary
              format. If you replace us, the next team reads the same specifications.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="nav" className="alt">
        <div className="wrap">
          <Reveal><h2>NAV pipeline</h2></Reveal>
          <Reveal delay={0.04}>
            <p className="lead">
              The single most common failure in a tokenized fund is not the token — it is the price. Five stages, each
              with an explicit failure mode.
            </p>
          </Reveal>
          <div className="doc-steps">
            {NAVSTEPS.map(([t, d], i) => (
              <Reveal key={t} delay={0.04 * i}>
                <div className="doc-step">
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <div><strong>{t}</strong><p>{d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="integrations">
        <div className="wrap">
          <Reveal><h2>Integration slots, and who owns them</h2></Reveal>
          <Reveal delay={0.04}>
            <p className="lead">
              A tokenized fund is a stack of vendors, not one product. Here is the honest split — most of it stays
              yours, including the parts we build.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="tbl-scroll">
              <table>
                <thead><tr><th>Slot</th><th>Typical provider</th><th>Owner</th><th>Note</th></tr></thead>
                <tbody>
                  {SLOTS.map(([s, p, o, n]) => (
                    <tr key={s}>
                      <td><b className="mono-k">{s}</b></td><td>{p}</td>
                      <td><span className={o === 'Woof' ? 'acc' : 'good'}>{o}</span></td><td>{n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="ownership" className="alt">
        <div className="wrap">
          <Reveal><h2>Ownership and operations</h2></Reveal>
          <div className="grid2">
            <Reveal>
              <div className="card green">
                <h3>What transfers to you</h3>
                <ul>
                  <li>Full source: contracts, portals, NAV pipeline, deployment scripts</li>
                  <li>Repositories under your organisation, with history</li>
                  <li>Deployment and admin keys, in your custody setup</li>
                  <li>Runbooks: NAV publication, redemption cycle, incident response</li>
                  <li>Audit reports and the remediation trail</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card">
                <h3>Operating policy</h3>
                <ul>
                  <li>Upgradeability is a decision you make: immutable core, or proxy with a timelock and your multisig</li>
                  <li>Role separation: issuer, agent, compliance officer and pauser are distinct keys</li>
                  <li>External audit before mainnet — named firm, published report</li>
                  <li>Testnet deployment first, with a full redemption cycle rehearsed</li>
                  <li>Support after handover is a contract you can end without losing the product</li>
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="own-line">
              No per-investor metering, no per-entity licence, <b>no vendor token in your fee model.</b>
            </p>
          </Reveal>
        </div>
      </section>

      <section id="collateral">
        <div className="wrap">
          <Reveal><h2>Collateral readiness</h2></Reveal>
          <Reveal delay={0.04}>
            <p className="lead">
              Most tokenized funds stop at issuance and the asset sits idle. Lending markets have hard requirements
              before they list anything. This is the checklist, and it shapes the architecture from day one — retrofitting
              it later means redeploying the token.
            </p>
          </Reveal>
          <div className="grid2">
            {CHECKS.map(([t, d], i) => (
              <Reveal key={t} delay={0.04 * i}>
                <div className="card"><h3><span className="mark ok">✓</span>{t}</h3><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.12}>
            <p className="doc-note">
              We contribute to blue-chip lending protocols, so this list comes from the review side of the table, not
              from a vendor brochure. Listing is a decision of that protocol's risk process — we prepare the submission
              and answer it with you; we cannot promise the outcome.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="boundary" className="alt">
        <div className="wrap">
          <Reveal><h2>Where we stop</h2></Reveal>
          <div className="doc-not">
            {NOT.map((n, i) => (
              <Reveal key={i} delay={0.04 * i}><p><span className="mark no">✕</span>{n}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="doc-cta">
        <div className="wrap">
          <Reveal>
            <h2>Take this to your architecture call</h2>
            <p className="lead">
              First scoping session is free. Bring your fund structure, jurisdiction and distribution plan — we map them
              onto this architecture and tell you which parts you do not need.
            </p>
            <a className="btn" href="/#book">Book a scope call</a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
