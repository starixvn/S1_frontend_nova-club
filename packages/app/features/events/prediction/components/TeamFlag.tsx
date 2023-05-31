import Image from 'app/components/common/Image'
import Select, {
  SelectButtonComponentProps,
} from 'app/components/form/Input/Select'
import SelectButton from 'app/components/form/Select/SelectButton'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useLocalization from 'app/provider/localization'
import { View, styled } from 'dripsy'
import uniqueId from 'lodash/uniqueId'
import { MotiPressable } from 'moti/interactions'
import React, { ComponentProps, useMemo } from 'react'
import CustomText from './CustomText'

type TeamFlagProps = {
  source: ComponentProps<typeof Image>['source']
  teamName: string
  value?: number
  onDropDownSelect: (e: { label: number; value: number }) => void
  onFlagSelect: () => void
  isSelected?: boolean
  isShowDropDownButton?: boolean
  disabled?: boolean
} & ComponentProps<typeof View>

const StyledPressable = styled(MotiPressable)({
  borderRadius: 100,
})

const TeamFlag = (props: TeamFlagProps) => {
  const {
    source,
    teamName,
    value,
    onDropDownSelect,
    onFlagSelect,
    isSelected,
    isShowDropDownButton,
    disabled,
    ...viewProps
  } = props

  const { width } = useContainerDimension()
  const { t } = useLocalization()

  const sheetId = useMemo(() => {
    return uniqueId()
  }, [])

  //   const TEAM_IAMGE_SCALING = width > 500 ? 0.18 : 0.25
  const TEAM_IAMGE_SCALING = 0.2

  const PREDITION_SCORING_LIST = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      return {
        label: i,
        value: i,
      }
    })
  }, [])

  return (
    <View {...viewProps}>
      <StyledPressable
        containerStyle={{
          borderRadius: 100,
        }}
        animate={{ scale: isSelected === true ? 1.2 : 1 }}
        onPress={onFlagSelect}
        disabled={disabled}
      >
        <Image
          source={source}
          style={{
            aspectRatio: 1,
            width: Math.min(120, width * TEAM_IAMGE_SCALING),
            height: Math.min(120, width * TEAM_IAMGE_SCALING),
          }}
        />

        {isSelected && (
          <View
            sx={{
              position: 'absolute',
              top: -5,
              bottom: -5,
              left: -5,
              right: -5,
              backgroundColor: '#FF9AD0',
              borderRadius: 100,
              zIndex: -1,
            }}
          />
        )}

        {isShowDropDownButton && !isSelected ? (
          <View
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 100,
            }}
          />
        ) : null}
      </StyledPressable>

      <CustomText
        sx={{
          fontSize: ['$1', '$2'],
          fontWeight: 'bold',
          color: '$white',
          mt: '$4',
        }}
      >
        {teamName}
      </CustomText>

      {isShowDropDownButton ? (
        <Select
          value={value}
          options={PREDITION_SCORING_LIST}
          onSelected={onDropDownSelect}
          buttonComponent={(props: SelectButtonComponentProps) => (
            <SelectButton
              chevelonButtonSize={15}
              label={value ?? t('event.prediction.score')}
              sx={{
                p: '$2',
                borderRadius: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#DD0776',
                minWidth: 86,
                mt: '$4',
              }}
              gradient={'white'}
              textProps={{
                sx: {
                  color: '$black',
                  fontFamily: 'BeVietnamProBold',
                },
              }}
              iconProps={{
                color: '#DD0776',
                size: 20,
              }}
              {...props}
            />
          )}
          _actionSheet={{
            sheetId: sheetId,
            headerTitle: t('event.prediction.score'),
          }}
        />
      ) : (
        <View sx={{ height: 39, mt: '$4' }} />
      )}
    </View>
  )
}

export default TeamFlag
