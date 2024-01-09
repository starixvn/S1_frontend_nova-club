import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import MysteryDropGame from '@games/mystery-drop'
import AssetPreloader from '@games/shared/components/AssetPreloader'

export default function Home() {
  return (
    <main>
      <AssetPreloader
        name="mystery-drop"
        image={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/images/mystery_event.jpg`}
      >
        <MysteryDropGame />
      </AssetPreloader>
    </main>
  )
}
