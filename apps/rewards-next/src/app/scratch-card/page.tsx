import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import ScratchCardGame from '@games/scratch-card'
import AssetPreloader from '@games/shared/components/AssetPreloader'

export default function ScratchCard() {
  return (
    <main>
      <AssetPreloader
        name="scratch-card"
        image={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/images/scratch_card.png`}
      >
        <ScratchCardGame />
      </AssetPreloader>
    </main>
  )
}
