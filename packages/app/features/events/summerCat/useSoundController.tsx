import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Audio, AVPlaybackStatusToSet } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'
import { useEffect, useRef, useState } from 'react'

export type SoundType = 'bgm' | 'flip' | 'won' | 'lose'

export interface SoundController {
  play: (s: SoundType) => void
  stop: (s: SoundType) => void
}

const useSoundController = () => {
  const sounds = useRef<Record<SoundType, Sound | null>>({
    bgm: null,
    flip: null,
    lose: null,
    won: null,
  })

  async function createAudioInstance(
    type: SoundType,
    initialStatus?: AVPlaybackStatusToSet
  ) {
    if (sounds.current[type]) {
      if (initialStatus) {
        sounds.current[type]?.setStatusAsync(initialStatus)
      }
      return sounds.current[type]
    }

    const soundMap: Record<SoundType, string> = {
      bgm: 'bgm',
      flip: 'flip',
      won: 'won',
      lose: 'lose',
    }

    const { sound: audio } = await Audio.Sound.createAsync(
      {
        uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/sea-game/${soundMap[type]}.mp3`,
      },
      {
        ...initialStatus,
      }
    )

    sounds.current[type] = audio
    return audio
  }

  async function playBGM() {
    const sound = await createAudioInstance('bgm', {
      isLooping: true,
      volume: 0.1,
    })
    sound?.playAsync()
  }

  async function unloadAllSound() {
    Object.keys(sounds.current).forEach((k) => {
      const sound = sounds.current[k] as Sound
      if (sound) sound.unloadAsync()
    })

    sounds.current = {
      bgm: null,
      flip: null,
      lose: null,
      won: null,
    }
  }

  async function play(s: SoundType) {
    const sound = await createAudioInstance(s)
    await sound?.stopAsync()
    sound?.playAsync()
  }

  async function stop(s: SoundType) {
    const sound = await createAudioInstance(s)
    await sound?.stopAsync()
  }

  async function preloadSounds() {
    createAudioInstance('flip', { volume: 1 })
    createAudioInstance('won')
    createAudioInstance('lose', { volume: 1 })
  }

  useEffect(() => {
    playBGM()
    preloadSounds()
    return () => {
      unloadAllSound()
    }
  }, [])

  return {
    play,
    stop,
  } as SoundController
}

export default useSoundController
