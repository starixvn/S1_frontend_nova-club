import { Row, Text, View } from 'dripsy'
import { SolitoImage } from 'solito/image'

interface BonusRowProps {
  title?: string
  imageSrc?: string
  children?: React.ReactNode
  desc?: string
  size?: number
}

const BonusRow = (props: BonusRowProps) => {
  const { children, imageSrc, title, desc, size = 30 } = props

  return (
    <View sx={{ mt: '$2', flex: 1 }}>
      {title && <Text sx={{ my: '$1' }}>{title}</Text>}
      <Row sx={{ alignItems: 'center' }}>
        {!!imageSrc && (
          <SolitoImage
            alt=""
            contentFit="contain"
            width={size}
            height={size}
            src={imageSrc}
            style={{ marginRight: 8 }}
          />
        )}
        <Text sx={{ flexShrink: 1 }}>{desc}</Text>

        {children}
      </Row>
    </View>
  )
}

export default BonusRow
