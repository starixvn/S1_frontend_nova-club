import { Row, View } from 'dripsy'
import React from 'react'

const config = [
  {
    col: 4,
  },
  {
    col: 2,
  },
  {
    col: 3,
  },
  {
    col: 3,
  },
  {
    col: 3,
  },
  {
    col: 3,
  },
]

export default function GameGridSection() {
  return (
    <Row sx={{ flexWrap: 'wrap', px: '$pagePadding', gap: 10, flex: 1 }}>
      {config.map((c, i) => {
        return (
          <View
            key={i}
            sx={{
              flexGrow: c.col / 6,
              aspectRatio: c.col / 2,
              bg: 'red',
            }}
          >
            <View
              sx={{
                width: '100%',
                height: '100%',
                // bg: 'green',
                borderWidth: 1,
              }}
            ></View>
          </View>
        )
      })}
    </Row>
  )
}
