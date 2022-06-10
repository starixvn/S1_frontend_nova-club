// This script is to move the `icomoon.ttf` to
// `apps/next/public` folder automatically. The reason is for nextjs,
// font file (eg: .ttf) should be put into `public` folder.

const fse = require('fs-extra')
const path = require('path')

const srcDir = path.resolve(
  __dirname,
  '../../../packages/app/assets/fonts/icomoon.ttf'
)
const destDir = path.resolve(__dirname, '../public/icomoon.ttf')

function startCopyDirectory() {
  try {
    console.log(`Start copying folder from ${srcDir} ......`)
    fse.copySync(srcDir, destDir)
    console.log('\x1b[42m%s\x1b[0m', `Finished copying to ${destDir}`)
  } catch (error) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      `Faild to copy directory from ${srcDir} to ${destDir}\n`,
      error
    )
  }
}

startCopyDirectory()
