import GamesPage from 'app/features/games'
import React, { ReactElement } from 'react'
import layouts from '../../layouts'
import TabLayout from '../../layouts/TabLayout'
import { motion, AnimatePresence } from 'framer-motion'
const Games = () => {
  return (
    <motion.div
      // transition={{
      //   duration: 3,
      //   type: 'timing',
      //   ease: 'linear',
      // }}
      // exit={{
      //   transformOrigin: '0 100%',
      //   rotateY: -180,
      //   position: 'absolute',
      //   width: '100%',
      //   height: '100vh',
      //   top: 0,
      // }}
      style={{ flexGrow: 1, display: 'flex' }}
    >
      <GamesPage />
    </motion.div>
  )
}

Games.getLayout = layouts.TAB()

export default Games
