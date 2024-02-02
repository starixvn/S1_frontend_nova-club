import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import React from 'react'
import GenericContainer from './component/GenericContainer'

const list = [
  'rewards.tnc.scratchCard.tnc1',
  'rewards.tnc.scratchCard.tnc2',
  'rewards.tnc.scratchCard.tnc3',
  'rewards.tnc.scratchCard.tnc4',
  'rewards.tnc.scratchCard.tnc5',
]

const ScratchCardTnc = () => {
  return <GenericContainer list={list} />
}

export default ScratchCardTnc
