import { compressJpg, compressPng } from '@assetpack/plugin-compress'
import { pixiManifest } from '@assetpack/plugin-manifest'
import { webfont } from '@assetpack/plugin-webfont'

export default {
  entry: 'raw-assets',
  output: `../../apps/rewards-next/public/assets/scratch-card/`,
  cache: false,
  plugins: {
    webfont: webfont(),
    compressJpg: compressJpg(),
    compressPng: compressPng(),
    manifest: pixiManifest({
      output: `../../apps/rewards-next/public/assets/scratch-card/assets-manifest.json`,
    }),
  },
}
