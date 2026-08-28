import React from 'react'
import { Nav, Hero } from './sections/Top.jsx'
import { UseCases, Compare, Work } from './sections/Product.jsx'
import { Cost } from './sections/Cost.jsx'
import { BestFit, Stack, Collateral, Process, Beyond, Why } from './sections/Offer.jsx'
import { Faq, Book, Footer } from './sections/Close.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <UseCases />
      <Compare />
      <Cost />
      <Work />
      <BestFit />
      <Stack />
      <Collateral />
      <Process />
      <Beyond />
      <Why />
      <Faq />
      <Book />
      <Footer />
    </>
  )
}
