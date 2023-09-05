import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import FortuneCatGame from '@games/fortune-cat'
import AssetPreloader from '@games/shared/components/AssetPreloader'

export default function FortuneCat() {
  return (
    <main>
      <AssetPreloader
        imageProps={{
          width: 300,
          height: 300 / (660 / 350),
        }}
        name="fortune-cat"
        image={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/images/mega.jpg`}
      >
        <FortuneCatGame />
      </AssetPreloader>
    </main>
  )
}
