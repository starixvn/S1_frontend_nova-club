import useLocalization from 'app/provider/localization'
import { View, Text, Row } from 'dripsy'
import React from 'react'

interface GenericContainer {
  list?: Array<string>
  children?: React.ReactNode
}

const GenericContainer = (props: GenericContainer) => {
  const { list, children } = props
  const { t } = useLocalization()

  return (
    <View>
      {!!list && (
        <>
          {list.map((text, index) => {
            return (
              <Row key={index}>
                <Text sx={{ pr: '$2' }}>{index + 1}</Text>
                <Text>{t(text)}</Text>
              </Row>
            )
          })}
        </>
      )}

      {children}
    </View>
  )
}

export default GenericContainer
