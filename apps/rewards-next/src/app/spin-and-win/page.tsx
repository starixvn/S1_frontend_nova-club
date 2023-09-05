import SpinWinGame from '@games/spin-and-win/components/Game'

import AssetPreloader from '@games/shared/components/AssetPreloader'
import { CONTENT_URI, MEDIA_DOMAIN } from '@env'

export default function SpinNWin() {
  return (
    <main>
      <AssetPreloader
        name="spin-and-win"
        image={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/images/spin_win.jpg`}
      >
        <SpinWinGame />
      </AssetPreloader>
    </main>
  )
}
