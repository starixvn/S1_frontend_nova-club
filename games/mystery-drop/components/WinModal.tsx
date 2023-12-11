/* eslint-disable @next/next/no-img-element */
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { AssetBasePath } from '@games/config'
import { Back, gsap } from 'gsap'
import { useEffect } from 'react'
import { toThousandSeparator } from 'utils-pixi/helper'
import { RewardPostMessageType } from 'utils/rewards'

type WinModalProps = {
  winPrize: string | undefined
  type: string | undefined
  onClose?: () => void
}

export const WinModal = NiceModal.create(
  ({ winPrize, type, onClose }: WinModalProps) => {
    const modal = useModal()
    const width = window.innerWidth
    const headWidth = width > 500 ? 450 : width
    const AssetPath = `${AssetBasePath}/assets/mystery-drop/images`
    let prizeType
    let boardImage

    switch (type) {
      case '1':
        prizeType = 'JACKPOT KHUYẾN KHÍCH'
        boardImage = `${AssetPath}/board-win-green-vi.png`
        break
      case '2':
        prizeType = 'JACKPOT LỘC PHÁT'
        boardImage = `${AssetPath}/board-win-blue-vi.png`
        break
      case '3':
        prizeType = 'JACKPOT ĐẠI PHÁT'
        boardImage = `${AssetPath}/board-win-red-vi.png`
        break

      default:
        prizeType = 'JACKPOT KHUYẾN KHÍCH'
        boardImage = `${AssetPath}/board-win-green-vi.png`
        break
    }

    const handleClose = () => {
      const payload = JSON.stringify({
        type: RewardPostMessageType.endGame,
      })

      if (window.ReactNativeWebView)
        window.ReactNativeWebView.postMessage(payload)
      else window.parent.postMessage(payload)

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="scale-in-center"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          onClick={handleClose}
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
              width={20}
              height={20}
              onClick={handleClose}
            />
          </div>
          <img
            src={boardImage}
            alt=""
            style={{ width: headWidth, zIndex: 3 }}
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <img
              src={`${AssetPath}/board-body.png`}
              alt=""
              style={{ width: headWidth * 0.8, marginTop: -50 }}
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
              <div style={{ color: 'white', fontSize: 24 }}>Bạn nhận được</div>
              <h1
                style={{
                  color: '#FFE200',
                  fontWeight: 'bold',
                  fontFamily: 'Avertastd Bold',
                }}
              >
                {toThousandSeparator(winPrize)}
              </h1>
              <div style={{ color: 'white', fontSize: 20 }}>{prizeType}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
