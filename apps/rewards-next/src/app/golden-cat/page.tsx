import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import GoldenCatGame from '@games/golden-cat'
import AssetPreloader from '@games/shared/components/AssetPreloader'

export default function Home() {
  return (
    <main>
      <AssetPreloader
        name="golden-cat"
        image={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/images/lucky_catspin.jpg`}
      >
        <GoldenCatGame />
      </AssetPreloader>
    </main>
  )
}
