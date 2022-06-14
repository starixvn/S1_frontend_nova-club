/* eslint-disable react/display-name */
import React, { ReactElement } from 'react'
import ModalLayout, { ModalLayoutProps } from './ModalLayout'
import TabLayout from './TabLayout'

const layouts = {
  COMMON: () => (page: ReactElement) => {
    return page
  },
  TAB: () => (page: ReactElement) => {
    return <TabLayout>{page}</TabLayout>
  },
  MODAL: (props: ModalLayoutProps) => (page: ReactElement) => {
    return <ModalLayout {...props}>{page}</ModalLayout>
  },
}

export default layouts
