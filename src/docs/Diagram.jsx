import React, { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/* Geometry is computed, never hand-placed: every connector starts and ends on a
   column centre, and the collateral path is routed through the 16px lane between
   columns so it never crosses a box. */
const W = 960, X0 = 140, X1 = 888, GAP = 16, BH = 70, BGAP = 62, Y0 = 56
const H = Y0 + 4 * BH + 3 * BGAP + 34

const bandY = i => Y0 + i * (BH + BGAP)
const cols = n => {
  const w = (X1 - X0 - GAP * (n - 1)) / n
  return Array.from({ length: n }, (_, j) => {
    const x = X0 + j * (w + GAP)
    return { x, w, cx: x + w / 2 }
  })
}

const BANDS = [
  {
    label: 'Access', tone: 'plain',
    items: [
      ['Investor portal', 'subscribe · redeem · positions · documents'],
      ['Admin console', 'mint · burn · whitelist · NAV · distributions'],
    ],
  },
  {
    label: 'On-chain core', tone: 'accent',
    items: [
      ['Fund vault', 'ERC-7540'],
      ['Compliance token', 'ERC-3643'],
      ['Identity registry', 'on-chain claims'],
      ['Compliance modules', 'transfer rules'],
    ],
  },
  {
    label: 'Data & services', tone: 'plain',
    items: [
      ['NAV oracle', 'signed feed + staleness'],
      ['Custody & fiat', 'MPC · qualified · rails'],
      ['KYC / KYB', 'issuer of claims'],
      ['Jurisdiction rules', 'defined by counsel'],
    ],
  },
  {
    label: 'Distribution', tone: 'good',
    items: [
      ['Secondary venues', 'permissioned AMM / OTC'],
      ['Lending markets', 'collateral listing'],
      ['Other chains', 'restrictions preserved'],
    ],
  },
]

const C4 = cols(4).map(c => c.cx)          // core and data share one 4-column grid
const A2 = cols(2).map(c => c.cx)          // access
const BUS = bandY(0) + BH + (BGAP / 2)     // 157 — bus line between access and core

// Portals drive the core through a shared bus: two feeds in, four drops out.
const CONTROL = [
  `M${A2[0]} ${bandY(0) + BH} L${A2[0]} ${BUS}`,
  `M${A2[1]} ${bandY(0) + BH} L${A2[1]} ${BUS}`,
  `M${C4[0]} ${BUS} L${C4[3]} ${BUS}`,
]
const DROPS = C4.map(x => `M${x} ${BUS} L${x} ${bandY(1)}`)

// Each service feeds the core box directly above it — the alignment is the point.
const FEEDS = C4.map(x => `M${x} ${bandY(2)} L${x} ${bandY(1) + BH}`)

// Collateral path: leaves the token, threads the lane between columns 1 and 2,
// and lands on the lending market. Never crosses a box.
const LANE = X0 + 2 * ((X1 - X0 - GAP * 3) / 4) + 1.5 * GAP  // 514
const COLL = `M460 ${bandY(1) + BH} L460 276 Q460 286 470 286 L${LANE - 10} 286 Q${LANE} 286 ${LANE} 296 L${LANE} ${bandY(3)}`

function Band({ band, i, active }) {
  const y = bandY(i)
  const cs = cols(band.items.length)
  return (
    <g>
      <text x="16" y={y + BH / 2 + 4} className="d-band">{band.label}</text>
      {band.items.map(([t, s], j) => {
        const c = cs[j]
        const hot = band.tone === 'good' && t === 'Lending markets'
        return (
          <g key={t} className={`d-box t-${band.tone} ${hot ? 'hot' : ''} ${active === i ? 'on' : ''}`}>
            <rect x={c.x} y={y} width={c.w} height={BH} rx="13" />
            <text x={c.cx} y={y + 30} className="d-t">{t}</text>
            <text x={c.cx} y={y + 49} className="d-s">{s}</text>
          </g>
        )
      })}
    </g>
  )
}

/* Wires render fully drawn by default, so the prerendered HTML and the no-JS
   view are complete. Only once mounted do they become motion paths that draw
   themselves in on scroll. The flow pulse is pure CSS and opts out via media query. */
function Wire({ d, kind, delay, animate, marker }) {
  const P = animate ? motion.path : 'path'
  const anim = animate ? {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, delay, ease: 'easeInOut' },
  } : {}
  return (
    <g>
      <P d={d} className={`d-wire ${kind}`} markerEnd={marker ? `url(#${marker})` : undefined} {...anim} />
      <path d={d} className={`d-flow ${kind}`} pathLength="1" style={{ animationDelay: `${delay + 0.6}s` }} />
    </g>
  )
}

export default function Diagram() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(-1)
  const [mounted, setMounted] = useState(false)
  const animate = mounted && !reduce

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setActive(a => (a + 1) % BANDS.length), 1900)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <div className="d-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} role="img"
        aria-label="Reference architecture: portals drive an on-chain core, services feed it data, and the compliance token continues into distribution as collateral.">
        <defs>
          <marker id="a-acc" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
          </marker>
          <marker id="a-mut" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--muted-2)" />
          </marker>
          <marker id="a-good" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--good)" />
          </marker>
        </defs>

        <text x="16" y="28" className="d-cap">Every box below is yours — deployed under your brand, in a repository you own.</text>

        {CONTROL.map((d, i) => <Wire key={`c${i}`} d={d} kind="acc" delay={0.1 + i * 0.06} animate={animate} />)}
        {DROPS.map((d, i) => <Wire key={`d${i}`} d={d} kind="acc" delay={0.3 + i * 0.06} animate={animate} marker="a-acc" />)}
        {FEEDS.map((d, i) => <Wire key={`f${i}`} d={d} kind="mut" delay={0.5 + i * 0.06} animate={animate} marker="a-mut" />)}
        <Wire d={COLL} kind="good" delay={0.8} animate={animate} marker="a-good" />

        <text x={LANE + 18} y={bandY(3) - 26} className="d-note">the leg most issuers never build</text>

        {BANDS.map((band, i) => <Band key={band.label} band={band} i={i} active={active} />)}
      </svg>

      <p className="d-legend">
        <span className="k-acc" /> control flow
        <span className="k-mut" /> data feeds
        <span className="k-good" /> collateral path
      </p>
    </div>
  )
}
