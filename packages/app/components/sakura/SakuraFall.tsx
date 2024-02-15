import React, { useMemo } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import SakuraFlake from './SakuraFlake'
import { useAppSelector } from 'app/provider/redux/store'

export default function SakuraFall() {
  const snowflakesCount = 15
  const fallSpeed = 'slow'

  const splashScreenLoaded = useAppSelector(
    (s) => s.tempSetting.splashScreenLoaded
  )
  const [scene, setScene] = React.useState(null)

  const dimensionsStyle = styles.stretchDimensions

  const onLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    setScene({ width, height })
  }

  const getSnowFall = useMemo(
    () =>
      new Array(snowflakesCount)
        .fill(true)
        .map((_, i) => (
          <SakuraFlake key={i} scene={scene} fallSpeed={fallSpeed} />
        )),
    [scene, fallSpeed]
  )

  return splashScreenLoaded || Platform.OS === 'web' ? (
    <View
      style={[styles.container, dimensionsStyle]}
      onLayout={onLayout}
      pointerEvents="none"
    >
      {!!scene && getSnowFall}
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 50,
  },
  stretchDimensions: {
    width: '100%',
    height: '100%',
  },
})
