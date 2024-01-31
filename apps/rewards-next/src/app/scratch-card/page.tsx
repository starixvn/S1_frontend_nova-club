import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import ScratchCardGame from '@games/scratch-card'
import AssetPreloader from '@games/shared/components/AssetPreloader'

export default function ScratchCard() {
  return (
    <main>
      <AssetPreloader
        imageProps={{
          width: 300,
          height: 300 / (660 / 350),
        }}
        name="scratch-card"
        image={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/images/mega.jpg`}
      >
        <ScratchCardGame />
      </AssetPreloader>
    </main>
  )
}
