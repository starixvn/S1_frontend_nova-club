import CheckBox from 'app/components/CheckBox'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { Pressable, styled, Text, View } from 'dripsy'

const UserAgreement = ({ onAgree, isAgree }) => {
  const { t } = useLocalization()

  return (
    <SytledView>
      <CheckBox onCheck={onAgree} isCheck={isAgree} />
      <Pressable hitSlop={10} onPress={() => onAgree(!isAgree)}>
        <StyleText>
          {t('auth.readAndAgree')}{' '}
          <StylePressableText>{t('common.userAgreement')}</StylePressableText>
        </StyleText>
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

const StyledBouncePressable = styled(BouncePressable)({
  bg: '#FFFFFF',
  borderRadius: 2,
  height: 15,
  aspectRatio: 1,
})

const StyleText = styled(Text)({
  fontSize: 12,
  ml: '$1a',
  color: '#DBDBDB',
})

const StylePressableText = styled(Text)({
  fontSize: 11,
  color: '#FF7070',
  textDecorationLine: 'underline',
})

export default UserAgreement
