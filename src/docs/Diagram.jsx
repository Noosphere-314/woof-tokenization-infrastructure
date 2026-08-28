import React from 'react'

const BANDS = [
  {
    y: 74, label: 'Access', tone: 'plain',
    items: [['Investor portal', 'subscribe · redeem · positions · documents'], ['Admin console', 'mint · burn · whitelist · NAV · distributions']],
  },
  {
    y: 196, label: 'On-chain core', tone: 'accent',
    items: [['Fund vault', 'ERC-7540'], ['Compliance token', 'ERC-3643'], ['Identity registry', 'on-chain claims'], ['Compliance modules', 'transfer rules']],
  },
  {
    y: 318, label: 'Data & services', tone: 'plain',
    items: [['NAV oracle', 'signed feed + staleness'], ['KYC / KYB', 'issuer of claims'], ['Custody', 'MPC or qualified'], ['Fiat & stablecoin', 'on/off ramp']],
  },
  {
    y: 440, label: 'Distribution', tone: 'good',
    items: [['Lending markets', 'collateral listing'], ['Secondary venues', 'permissioned AMM / OTC'], ['Other chains', 'restrictions preserved']],
  },
]

const W = 900, PAD = 132, GAP = 14, BH = 66

function band(b, i) {
  const inner = W - PAD - 24
  const n = b.items.length
  const bw = (inner - GAP * (n - 1)) / n
  const stroke = b.tone === 'accent' ? 'var(--accent)' : b.tone === 'good' ? 'var(--good)' : 'var(--line)'
  const fill = b.tone === 'accent' ? 'rgba(93,166,253,.12)' : b.tone === 'good' ? 'rgba(92,224,161,.10)' : 'var(--card)'
  return (
    <g key={i}>
      <text x="16" y={b.y + BH / 2 + 4} className="d-band">{b.label}</text>
      {b.items.map(([t, s], j) => {
        const x = PAD + j * (bw + GAP)
        return (
          <g key={j}>
            <rect x={x} y={b.y} width={bw} height={BH} rx="12" fill={fill} stroke={stroke} strokeWidth="1" />
            <text x={x + bw / 2} y={b.y + 27} className="d-t">{t}</text>
            <text x={x + bw / 2} y={b.y + 46} className="d-s">{s}</text>
          </g>
        )
      })}
    </g>
  )
}

export default function Diagram() {
  return (
    <div className="d-wrap">
      <svg viewBox={`0 0 ${W} 530`} role="img" aria-label="Reference architecture: access layer, on-chain core, data and services, distribution">
        <defs>
          <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
          </marker>
          <marker id="ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--good)" />
          </marker>
        </defs>

        <text x="16" y="26" className="d-cap">Every box below is yours: deployed under your brand, in a repository you own.</text>

        {BANDS.map(band)}

        <path d="M300 140 L300 196" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ar)" />
        <path d="M620 140 L620 196" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#ar)" />
        <path d="M300 384 L300 262" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#ar)" />
        <path d="M490 384 L490 262" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#ar)" />
        <path d="M680 384 L680 262" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#ar)" />
        <path d="M420 262 L420 440" stroke="var(--good)" strokeWidth="1.5" markerEnd="url(#ag)" />

        <text x="432" y="356" className="d-e">token, once compliant, becomes collateral</text>
      </svg>
      <p className="d-legend">
        <span className="l-a" /> control and value flow · <span className="l-d" /> data feeds into the core · <span className="l-g" /> the collateral path most issuers never build
      </p>
    </div>
  )
}
