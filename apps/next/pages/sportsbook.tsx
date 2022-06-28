import SportsbookPage from 'app/features/sportsbook'
import layouts from '../layouts'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

const Sportsbook = () => {
  return (
    <motion.div
    // transition={{
    //   duration: 3,
    //   type: 'timing',
    //   ease: 'linear',
    // }}
    // initial={{ rotateY: -180, transformOrigin: '0 100%' }}
    // animate={{
    //   rotateY: 0,
    //   transformOrigin: '0 100%',
    //   transformStyle: 'preserve-3d',
    // }}
    // exit={{
    //   transformOrigin: '0 100%',
    //   rotateY: -180,
    //   position: 'absolute',
    //   width: '100%',
    //   height: '100vh',
    //   top: 0,
    // }}
    >
      <SportsbookPage />
    </motion.div>
  )
}

Sportsbook.getLayout = layouts.TAB()
export default Sportsbook
