import { Row, Text, View } from 'dripsy'
import { SolitoImage } from 'solito/image'

interface BonusRowProps {
  title: string
  imageSrc?: string
  children?: React.ReactNode
  desc?: string
}

const BonusRow = (props: BonusRowProps) => {
  const { children, imageSrc, title, desc } = props

  return (
    <View sx={{ mt: '$2', flex: 1 }}>
      <Text sx={{ my: '$1' }}>{title}</Text>
      <Row sx={{ alignItems: 'center' }}>
        {!!imageSrc && (
          <SolitoImage
            alt=""
            contentFit="cover"
            width={30}
            height={30}
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
