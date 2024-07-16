import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { Row, Text, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import { WinnerText } from '../Winner'
import useIsDesktop from 'app/hooks/useIsDesktop'
import { censorString } from 'app/utils'

type PrizeCardProps = {
  contentWidth: number
  containerImage: string
  prizeImage: string
  prize: string
  firstPrize?: boolean
  winner?: string[]
  smallSize?: boolean
}

const PrizeCard = ({
  contentWidth,
  containerImage,
  prizeImage,
  prize,
  firstPrize = false,
  winner,
  smallSize = false,
}: PrizeCardProps) => {
  const isDesktop = useIsDesktop()
  const prizeName = prize.split('/')
  const winner4Image = !!winner && containerImage.includes('winner4')

  const image = winner4Image
    ? containerImage.replace('small', 'big')
    : containerImage

  return (
    <Row
      sx={{
        width: contentWidth,
        height:
          isDesktop && winner4Image
            ? 250
            : contentWidth * (winner4Image ? 392 / 600 : 295 / 600),
        pl: '$4',
        pr: isDesktop ? '$3' : '$4',
        pt: smallSize ? 13 : '$3',
        pb: contentWidth < 380 ? 24 : '$4',
        justifyContent: 'space-between',
      }}
    >
      <SolitoImage
        src={image}
        fill
        contentFit="fill"
        alt=""
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          marginHorizontal: 'auto',
        }}
      />
      <View sx={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
        <SolitoImage
          src={prizeImage}
          width={smallSize ? 100 : 150}
          height={smallSize ? 100 : 150}
          contentFit="contain"
          contentPosition="bottom center"
          alt=""
        />
        <Text
          sx={{
            position: 'absolute',
            top: smallSize ? 4 : 16,
            left: smallSize ? 4 : 24,
            color: firstPrize ? 'black' : 'white',
            fontWeight: 'bold',
          }}
        >
          {prizeName[0]}
        </Text>
      </View>
      <View
        sx={{
          flex: isDesktop ? 0.5 : 0.45,
          ml: isDesktop && !winner4Image ? 24 : '$2',
        }}
      >
        <View
          sx={
            smallSize
              ? {}
              : {
                  height: contentWidth < 380 ? 30 : 36,
                  mt: '$1',
                  justifyContent: 'center',
                }
          }
        >
          <Text
            numberOfLines={firstPrize ? 1 : 2}
            sx={{
              fontSize: firstPrize ? 16 : isDesktop ? (smallSize ? 9 : 10) : 12,
              fontWeight: 'bold',
              color: firstPrize ? 'black' : 'white',
              lineHeight: smallSize ? 'none' : 16,
            }}
          >
            {prizeName[1]}
          </Text>
        </View>

        {winner ? (
          <View sx={{ mt: '$1', justifyContent: 'center', flex: 1 }}>
            {winner?.map((item, index) => (
              <WinnerText key={index}>
                {censorString(item, 2, item.length - 2)}
              </WinnerText>
            ))}
          </View>
        ) : (
          <View
            sx={{
              position: 'absolute',
              bottom: -10,
              left: 0,
              right: 0,
              marginHorizontal: 'auto',
              alignItems: 'center',
            }}
          >
            <SolitoImage
              src={`${MEDIA_DOMAIN}${CONTENT_URI}/event/2024/euro-cup/winning/winner-unknown.png`}
              width={smallSize ? 60 : 100}
              height={smallSize ? 60 : 100}
              contentFit="contain"
              contentPosition="bottom center"
              alt=""
              style={{}}
            />
          </View>
        )}
      </View>
    </Row>
  )
}

export default PrizeCard
