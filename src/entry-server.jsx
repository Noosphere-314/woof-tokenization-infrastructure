import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import Docs from './docs/Docs.jsx'

export const pages = {
  'index.html': () => renderToString(<App />),
  'docs.html': () => renderToString(<Docs />),
}
