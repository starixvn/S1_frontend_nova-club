import Footer from 'app/components/navigation/footer'
import React from 'react'
import DeferredSection from './DeferredSection'
import TopGameSection from './TopGameSection'

type Props = {}

export default function Deferrable({}: Props) {
  return (
    <>
      <TopGameSection sx={{ mb: ['$3', '$4'] }} />
      <DeferredSection />
      <Footer />
    </>
  )
}
