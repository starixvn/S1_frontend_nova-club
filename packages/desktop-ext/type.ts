import { FC, ReactNode } from 'react'

export type RewardLayoutContent = FC<{
  children: ReactNode
}> & {
  ExtendedView: () => JSX.Element
}

export type RewardLayoutWithExtendedView = {
  children: ReactNode & {
    ExtendedView: () => JSX.Element
  }
}
