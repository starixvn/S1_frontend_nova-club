/* eslint-disable react/display-name */
import React, { ReactElement } from 'react'
import ModalLayout, { ModalLayoutProps } from './ModalLayout'
import TabLayout from './TabLayout'

type TabLayoutProps = {
  lockHeight?: boolean
}

const layouts = {
  COMMON: () => (page: ReactElement) => {
    return page
  },
  TAB: (props?: TabLayoutProps) => (page: ReactElement) => {
    return <TabLayout {...props}>{page}</TabLayout>
  },
  MODAL: (props: ModalLayoutProps) => (page: ReactElement) => {
    return <ModalLayout {...props}>{page}</ModalLayout>
  },
}

export default layouts
