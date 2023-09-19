import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { AVPlaybackStatusToSet, Audio } from 'expo-av'
import { useRef } from 'react'

type SoundType = 'bg' | 'spin' | 'won' | 'hit'

const soundMap: Record<SoundType, string> = {
  bg: 'halloween-bgm',
  spin: 'slots-spin',
  hit: 'slots-stop',
  won: 'slots-win',
}

async function createAudioInstance(
  type: SoundType = 'bg',
  initialStatus?: AVPlaybackStatusToSet
) {
  try {
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: `${MEDIA_DOMAIN}${CONTENT_URI}/event/2023/halloween/${soundMap[type]}.mp3`,
      },
      {
        shouldPlay: true,
        ...initialStatus,
      }
    )

    return sound
  } catch (e) {
    console.log('load sound error', e)

    return
  }
}

export function useSoundPlayback(
  name: SoundType = 'bg',
  options?: AVPlaybackStatusToSet
) {
  const ref = useRef<Audio.Sound>()

  async function play() {
    if (ref.current) {
      await ref.current.replayAsync()
      return
    }

    ref.current = await createAudioInstance(name, options)
  }

  async function dispose() {
    if (ref.current) {
      try {
        await ref.current
          .unloadAsync()
          .then((r) => console.log('unmounted audio', name))
          .catch((e) => console.log('unmount audio failed', e))

        ref.current = undefined
      } catch (e) {
        console.log('unmount audio failed', e)
      }
    }
  }

  return [play, dispose] as const
}
