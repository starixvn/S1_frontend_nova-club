import BankEmpty from 'app/features/bank/components/BankEmpty'
import useLocalization from 'app/provider/localization'
import { toCurrency } from 'app/utils'
import { Text, View, styled } from 'dripsy'
import React, { ReactNode } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { SolitoImage } from 'solito/image'
import TouchableOpacity from '../pressable/TouchableOpacity'
import Select, { SelectProps } from './Select'

export type SelectWithCardGridProps<T> = Omit<
  SelectProps<T>,
  '_actionSheetContent'
> & { isProvider?: boolean; renderEmpty?: (args) => ReactNode }

function SelectWithCardGrid<T>(props: SelectWithCardGridProps<T>) {
  const { options, isProvider = false, renderEmpty, onSelected } = props
  const { t } = useLocalization()
  const { currency } = usePlayerProfileQuery()

  const squareStyle = isProvider
    ? {
        bg: '$primary.500',
        p: '$2',
      }
    : {
        borderColor: '$primary.100',
      }
  return (
    <Select
      {...props}
      contentContainerProps={{ sx: { bg: 'white' } }}
      _actionSheetContent={({ closeActionSheet }) => {
        return (
          <View
            sx={{
              flexDirection: 'row',
              p: '$2',
              flexWrap: 'wrap',
              justifyContent: 'center',
              bg: 'white',
            }}
          >
            {options && options.length > 0 ? (
              options.map((option, index) => {
                const limit = option?.limit

                const minAmount = toCurrency(limit?.min ?? 0, currency, {
                  symbol: false,
                  forceDecimal: false,
                })

                const maxAmount = toCurrency(limit?.max ?? 0, currency, {
                  symbol: false,
                  forceDecimal: false,
                })

                return (
                  <View key={index}>
                    <TouchableOpacity
                      sx={{
                        m: '$1',
                        borderRadius: 15,
                        borderWidth: 2,
                        overflow: 'hidden',
                        height: 72,
                        aspectRatio: 3 / 2,
                        ...squareStyle,
                      }}
                      onPress={() => {
                        onSelected(option.value)
                        closeActionSheet()
                      }}
                    >
                      {option.icon && (
                        <SolitoImage
                          src={option.icon}
                          resizeMode="contain"
                          fill
                          alt=""
                        />
                      )}
                    </TouchableOpacity>
                    {limit && (
                      <View sx={{ flex: 1 }}>
                        <StyledMinMaxText>
                          {`${t('deposit.minMax')}:`}
                        </StyledMinMaxText>
                        <StyledMinMaxText>
                          {`${minAmount}/${maxAmount}`}
                        </StyledMinMaxText>
                      </View>
                    )}
                  </View>
                )
              })
            ) : (
              <View sx={{ height: 100 }}>
                {renderEmpty ? (
                  renderEmpty(closeActionSheet)
                ) : (
                  <BankEmpty size="small" />
                )}
              </View>
            )}
          </View>
        )
      }}
    />
  )
}

export const StyledTextContainer = styled(View)({
  justifyContent: 'flex-start',
  minWidth: 30,
  maxWidth: 50,
})

export const StyledMinMaxText = styled(Text)({
  fontSize: 12,
  textAlign: 'center',
  color: 'black',
})
export const StyledMinMaxText2 = styled(Text)({
  fontSize: 12,
  textAlign: 'left',
  color: 'black',
})

export default SelectWithCardGrid
