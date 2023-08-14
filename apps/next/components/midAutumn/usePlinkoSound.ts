import React from 'react'
import { Howl, Howler } from 'howler'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

const bgm = new Howl({
  src: [`${MEDIA_DOMAIN}${CONTENT_URI}/event/plinko/bgm.mp3`],
  autoplay: true,
  loop: true,
  volume: 0.35,
})

const bounce = new Howl({
  src: [`${MEDIA_DOMAIN}${CONTENT_URI}/event/plinko/bounce.mp3`],
  autoplay: true,
  volume: 0.4,
})

const win = new Howl({
  src: [`${MEDIA_DOMAIN}${CONTENT_URI}/event/plinko/win.mp3`],
  autoplay: true,
  volume: 0.5,
})

const usePlinkoSound = () => {
  return { bgm, bounce, win }
}

export default usePlinkoSound
