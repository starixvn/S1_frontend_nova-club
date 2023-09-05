import NiceModal, { useModal } from '@ebay/nice-modal-react'
import React from 'react'
import { useWindowSize } from 'utils-pixi/resize/ResizeProvider'

/**
 * Example
 * 
    NiceModal.show(Modal, {
      message:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      onClose: () => console.log('Click modal'),
    })
 */

type AlertModalProps = {
  message: string
  onClose?: () => void
}

export const AlertModal = NiceModal.create(
  ({ message, onClose }: AlertModalProps) => {
    const modal = useModal()

    const bgWidth = 280

    const handleClick = () => {
      onClose && onClose()
      modal.remove()
    }

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: ' #00000099',
        }}
        onClick={handleClick}
      >
        <div
          style={{
            width: bgWidth,
            height: bgWidth * 0.4,
            background: 'linear-gradient(#50509E, #32325A)',
            borderRadius: 24,
            padding: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ color: 'white', textAlign: 'center' }}>{message}</div>
        </div>
        <button
          style={{
            width: bgWidth + 48,
            marginTop: 12,
            backgroundColor: '#E69B0D',
            padding: `8px 24px`,
            border: 0,
            borderRadius: 12,
            color: 'white',
            fontSize: 20,
            borderTop: '1px solid white',
          }}
          onClick={handleClick}
        >
          Đóng
        </button>
      </div>
    )
  }
)
