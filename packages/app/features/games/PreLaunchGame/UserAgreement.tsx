import CheckBox from 'app/components/CheckBox'
import useLocalization from 'app/provider/localization'
import { ModalStackParams } from 'app/provider/modal'
import { Pressable, styled, Text, View } from 'dripsy'
import { useModal } from 'react-native-modalfy'

const UserAgreement = ({ onAgree, isAgree }) => {
  const { t } = useLocalization()
  const { openModal } = useModal<ModalStackParams>()

  const openUserAgreement = () => {
    openModal('UserAgreementModal')
  }

  return (
    <SytledView>
      <CheckBox onCheck={onAgree} isCheck={isAgree} />
      <Pressable hitSlop={10} onPress={() => onAgree(!isAgree)}>
        <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
          <StyleText>{t('auth.readAndAgree')} </StyleText>

          <Pressable onPress={openUserAgreement}>
            <StylePressableText>{t('common.userAgreement')}</StylePressableText>
          </Pressable>
        </View>
      </Pressable>
    </SytledView>
  )
}

const SytledView = styled(View)({
  flexDirection: 'row',
  justifyContent: 'center',
  mt: '$6',
  alignItems: 'center',
})

const StyleText = styled(Text)({
  fontSize: 12,
  ml: '$1a',
  color: '#DBDBDB',
})

const StylePressableText = styled(Text)({
  fontSize: 12,
  color: '#FF7070',
  textDecorationLine: 'underline',
})

export default UserAgreement
