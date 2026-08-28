import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import Docs from './docs/Docs.jsx'
import './styles.css'

const el = document.getElementById('root')
if (el.hasChildNodes()) hydrateRoot(el, <Docs />)
else createRoot(el).render(<Docs />)
