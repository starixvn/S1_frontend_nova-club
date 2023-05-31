import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Audio, AVPlaybackStatusToSet } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'
import { useEffect, useRef, useState } from 'react'

export type SoundType = 'bgm'

export interface SoundController {
  play: (s: SoundType) => void
  stop: (s: SoundType) => void
}

const useSoundController = () => {
  const sounds = useRef<Record<SoundType, Sound | null>>({
    bgm: null,
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
      bgm: 'uefa_bgm',
    }

    const { sound: audio } = await Audio.Sound.createAsync(
      {
        uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/prediction/${soundMap[type]}.mp3`,
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

  useEffect(() => {
    playBGM()
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
