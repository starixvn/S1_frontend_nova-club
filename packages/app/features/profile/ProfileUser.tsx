import Avatar from 'app/components/Avatar'
import IconButton from 'app/components/form/IconButton'
import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React from 'react'
import { useModal } from 'react-native-modalfy'
import { useRouter } from 'solito/router'

type ProfileUserProps = {
  username: string
}

const ProfileUser = ({ username }: ProfileUserProps) => {
  const { t } = useLocalization()
  const { push } = useRouter()
  const { openModal } = useModal()

  const { makeContextualHref } = useContextualRouting(
    ContextualModuleKey.Profile
  )
  const toQrcodeScanner = makeContextualHref('qrcode-scanner')

  return (
    <ViewWrapper>
      <Avatar
        source={require('../../assets/images/games/fishing/fishing08.png')}
        sx={{ mr: '$2', bg: 'white' }}
      />
      <ViewTextWrapper>
        <Text
          numberOfLines={1}
          variant="sm"
          sx={{ color: '$PaleBlue', fontWeight: 'bold' }}
        >
          {t('common.hello')}
        </Text>
        <Text numberOfLines={1} variant="sm" sx={{ color: '#D6D5D5' }}>
          {username ?? ' '}
        </Text>
      </ViewTextWrapper>
      <IconButton
        name="scan"
        sx={{ mx: '$2' }}
        color={'$lightCyan'}
        onPress={() => push(toQrcodeScanner, '/qrcode-scanner')}
      />
      <IconButton
        name="bar-code"
        color={'$lightCyan'}
        onPress={() => openModal('QRTransferModal')}
      />
    </ViewWrapper>
  )
}

const ViewWrapper = styled(View)({
  px: '$3',
  py: '$1',
  flexDirection: 'row',
  alignItems: 'center',
})

const ViewTextWrapper = styled(View)({
  flex: 1,
  mr: '$2',
})

export default ProfileUser
