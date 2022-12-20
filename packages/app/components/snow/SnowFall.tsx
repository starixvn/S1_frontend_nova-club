import React, { useMemo } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Snowflake from './Snowflake'

export default function SnowFall({
  snowflakesCount = 50,
  fallSpeed = 'medium',
  fullScreen = false,
}) {
  const [scene, setScene] = React.useState(() => {
    if (fullScreen) {
      return
    }

    return null
  })

  const dimensionsStyle = styles.stretchDimensions

  const onLayout = ({
    nativeEvent: {
      layout: { width, height },
    },
  }) => {
    if (!fullScreen) {
      setScene({ width, height })
    }
  }

  const getSnowFall = useMemo(
    () =>
      new Array(snowflakesCount)
        .fill(true)
        .map((_, i) => (
          <Snowflake key={i} scene={scene} fallSpeed={fallSpeed} />
        )),
    [scene, fallSpeed]
  )

  return (
    <View
      style={[styles.container, dimensionsStyle]}
      onLayout={onLayout}
      pointerEvents="box-none"
    >
      {!!scene && getSnowFall}
    </View>
  )
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
