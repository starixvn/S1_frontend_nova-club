import RedPackGame from '@games/redpack'
import styles from './page.module.css'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import AssetPreloader from '@games/shared/components/AssetPreloader'

export default function Home() {
  return (
    <main className={styles.main}>
      <AssetPreloader
        name="redpack"
        image={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/images/lucky_angpao.jpg`}
      >
        <RedPackGame />
      </AssetPreloader>
    </main>
  )
}
