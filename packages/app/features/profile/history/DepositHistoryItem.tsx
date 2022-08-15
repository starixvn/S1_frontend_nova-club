import IconButton from 'app/components/form/IconButton'
import GradientBox from 'app/components/GradientBox'
import Icon from 'app/components/Icon'
import TransactionFilePicker from 'app/components/TransactionFilePicker'
import PaymentMethod from 'app/config/deposit'
import { getStatusColor } from 'app/config/status'
import useLocalBankDeposit from 'app/hooks/deposit/useLocalBankDeposit'
import useLocalization from 'app/provider/localization'
import { copyToClipboard, toThousandSeparator } from 'app/utils'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { usePlayerProfileQuery } from 'services/playerApi'
import { ReportDepositItem } from 'services/playerApi.type'
import DateTimeCell from './DateTimeCell'

export const CELL_PAYMENT_WIDTH = 0.5
export const CELL_DATE_WIDTH = 0.2
export const CELL_STATUS_WIDTH = 0.3

type TransactionHistoryItemProps = {
  item: ReportDepositItem
}

const DepositHistoryItem = ({ item }: TransactionHistoryItemProps) => {
  const { theme } = useDripsyTheme()
  const { t } = useLocalization()
  const { data: playerData } = usePlayerProfileQuery()

  const [selectedImage, setSelectedImage] = useState('')
  const { uploadSlip } = useLocalBankDeposit({ selectedImage })

  const category = PaymentMethod.find(
    (el) => el.categoryId === item.second_category_flag
  )

  useEffect(() => {
    if (selectedImage) {
      uploadSlip(item.secure_id, true)
    }
  }, [selectedImage])

  return (
    <GradientBox sx={{ py: '$2' }}>
      <View
        sx={{
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: 'row',
          p: '$2',
          alignItems: 'center',
        }}
      >
        <View style={{ flex: CELL_PAYMENT_WIDTH }}>
          <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconWrap sx={{ bg: category?.color ?? 'white', mr: '$2' }}>
              <Icon name={category?.icon} size={ICON_SIZE * 0.6} />
            </IconWrap>

            <View>
              <View
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text sx={{ fontSize: FONT_SIZE, mr: '$1' }}>
                  {item.secure_id}
                </Text>
                <IconButton
                  name="copy"
                  color={'$lightCyan'}
                  size={12}
                  onPress={() => copyToClipboard(item.secure_id)}
                />
              </View>
              <Text sx={{ flex: 1, fontSize: FONT_SIZE, fontWeight: 'bold' }}>
                {t(category?.name)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flex: CELL_DATE_WIDTH }}>
          <DateTimeCell
            date={item.date}
            sx={{ textAlign: 'left', fontSize: FONT_SIZE }}
          />
        </View>

        <View style={{ flex: CELL_STATUS_WIDTH, alignItems: 'flex-end' }}>
          <Text sx={{ textAlign: 'center', fontSize: FONT_SIZE }}>
            {toThousandSeparator(item.amount)}
          </Text>
          <Text
            sx={{
              textAlign: 'center',
              color: getStatusColor(item.status, theme),
              fontSize: FONT_SIZE,
            }}
          >
            {item.status}
          </Text>
          <TransactionFilePicker
            // isActive={item.bank_slip_attachment}
            isActive={false}
            onPress={setSelectedImage}
          />
        </View>
      </View>
    </GradientBox>
  )
}

const FONT_SIZE = 14
const ICON_SIZE = 34
const IconWrap = styled(View)({
  height: ICON_SIZE,
  width: ICON_SIZE,
  borderRadius: ICON_SIZE,
  borderWidth: 2,
  borderColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
})

export default DepositHistoryItem
