/* eslint-disable react/display-name */
import React from 'react'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import ModalLayout, { ModalLayoutProps } from './ModalLayout'
import TabLayout from './TabLayout'

type TabLayoutProps = {
  lockHeight?: boolean
}

const defaultTween = {
  duration: 0.3,
  type: 'tween',
  ease: 'easeIn',
}

const commonVariants = {
  exit: {
    x: '100%',
  },
  enter: {
    x: 0,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    transition: defaultTween,
    transitionEnd: {
      position: 'static',
    },
  },
}

const TabVariants = {
  show: {
    opacity: 1,
    transition: defaultTween,
  },
  exit: {
    opacity: 0,
    transition: defaultTween,
  },
}

const layouts = {
  COMMON: () => (Component: ReactElement) => {
    const { asPath } = useRouter()
    return Component
    // (
    //   <motion.div
    //     key={asPath}
    //     style={{ zIndex: 10 }}
    //     variants={commonVariants}
    //     initial={'exit'}
    //     animate={'enter'}
    //     exit={'exit'}
    //     transition={{
    //       duration: 0.5,
    //       type: 'tween',
    //       ease: 'easeIn',
    //     }}
    //   >
    //     {Component}
    //   </motion.div>
    // )
  },
  TAB: (props?: TabLayoutProps) => (page: ReactElement) => {
    const { asPath } = useRouter()
    return <TabLayout {...props}>{page}</TabLayout>
    //  (
    //   <motion.div
    //     key={asPath}
    //     variants={TabVariants}
    //     initial={false}
    //     animate={'show'}
    //     exit="exit"
    //   >
    //     <TabLayout {...props}>{page}</TabLayout>
    //   </motion.div>
    // )
  },
  MODAL: (props: ModalLayoutProps) => (page: ReactElement) => {
    const { asPath } = useRouter()
    return <ModalLayout {...props}>{page}</ModalLayout>
    // (
    //   <motion.div
    //     key={asPath}
    //     style={{ zIndex: 11 }}
    //     initial={{ x: '100%', opacity: 0 }}
    //     animate={{ x: 0, opacity: 1 }}
    //     exit={{ x: '100%', opacity: 0 }}
    //     transition={{
    //       duration: 0.3,
    //       type: 'tween',
    //       ease: 'easeIn',
    //     }}
    //   >
    //     <ModalLayout {...props}>{page}</ModalLayout>
    //   </motion.div>
    // )
  },
}

export default layouts
