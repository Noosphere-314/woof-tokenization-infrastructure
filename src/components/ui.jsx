import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 26, ...rest }) {
  const reduce = useReducedMotion()
  if (reduce) return <div {...rest}>{children}</div>
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({ eyebrow, title, children }) {
  return (
    <Reveal className="sec-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </Reveal>
  )
}
