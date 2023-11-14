/* eslint-disable @next/next/no-img-element */
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { AssetBasePath } from '@games/config'
import { Back, gsap } from 'gsap'
import { useEffect } from 'react'

type WinModalProps = {
  winPrize: number
  onClose?: () => void
}

export const WinModal = NiceModal.create(
  ({ winPrize, onClose }: WinModalProps) => {
    const modal = useModal()
    const width = window.innerWidth
    const height = window.innerHeight
    const headWidth = width > 500 ? 500 : width
    const AssetPath = `${AssetBasePath}/assets/mystery-drop/images`

    const handleClose = () => {
      onClose && onClose()
      modal.remove()
    }

    useEffect(() => {
      gsap.fromTo(
        '.scale-in-center',
        { scale: 0.1 },
        {
          scale: 1,
          duration: 0.5,
          ease: Back.easeOut,
        }
      )
      gsap.to('.light', {
        rotate: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
      })
    }, [])

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: ' #00000099',
          fontFamily: 'Avertastd Regular',
        }}
        onClick={handleClose}
      >
        <div
          className="scale-in-center"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: height * 0.1,
          }}
        >
          <img
            className="light"
            src={`${AssetPath}/shine-effect.png`}
            alt=""
            style={{
              width: headWidth,
              zIndex: 1,
              position: 'absolute',
              top: -40,
            }}
          />

          <div
            style={{
              display: 'flex',
              width: headWidth,
              justifyContent: 'flex-end',
              paddingRight: 60,
            }}
          >
            <img
              src={`${AssetBasePath}/assets/shared/images/ic_cross.png`}
              alt=""
              width={36}
              height={36}
              onClick={handleClose}
            />
          </div>
          <img
            src={`${AssetPath}/board-win.png`}
            alt=""
            style={{ width: headWidth, zIndex: 3 }}
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <img
              src={`${AssetPath}/board-body.png`}
              alt=""
              style={{ width: width * 0.8, marginTop: -50 }}
            />
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 0,
                bottom: 0,
                left: 0,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ color: 'white', fontSize: 20 }}>You Win</div>
              <h1
                style={{
                  color: '#FFE200',
                  fontWeight: 'bold',
                  fontFamily: 'Avertastd Bold',
                }}
              >
                {winPrize}
              </h1>
              <div style={{ color: 'white', fontSize: 20 }}>GRAND JACKPOT</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default WinModal
