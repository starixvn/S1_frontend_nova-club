import IconButton from 'app/components/IconButton'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useAlert from 'app/hooks/useAlert'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { copyToClipboard } from 'app/utils'
import isDesktop from 'app/utils/isDesktop'
import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import React from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { IResponse } from 'services/common/types'
import {
  usePlayerProfileQuery,
  usePlayerRealNameMutation,
} from 'services/playerApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import MobileProfileItem from './MobileProfileItem'

type UpdateNameValueProps = {
  realName: string
}

const ProfileDetails = () => {
  const { token } = useAppSelector((state) => state.auth.info) || {}
  const { t } = useLocalization()
  const { data: playerData } = usePlayerProfileQuery(undefined, {
    skip: !token,
  })
  const isPlayerName = !!playerData?.firstName
  const desktop = isDesktop()

  const [updatePlayerName] = usePlayerRealNameMutation()
  const { showAlert } = useAlert()
  const { push } = useRouter()

  async function updateRealName(realName) {
    const { success, message } = await updatePlayerName({
      realName,
      username: playerData?.username ?? '',
    })
      .unwrap()
      .catch((e: IResponse) => {
        console.log('error', e)
        showAlert(e)
        return e
      })

    if (success) {
      Toast.show({ type: 'success', text1: message })
      return true
    }

    return false
  }

  const onSubmit = async (
    { realName }: UpdateNameValueProps,
    actions: FormikHelpers<UpdateNameValueProps>
  ) => {
    try {
      if (realName) {
        const sanitizedRealName = realName.trim().replace(/\s\s+/g, ' ')
        const success = await updateRealName(sanitizedRealName)

        if (success) {
          setTimeout(() => {
            push('/deposit')
          }, 150)
        }
      }
    } catch (error) {
      showAlert(t('status.systemError'))
    }
  }

  const formik = useFormik<UpdateNameValueProps>({
    enableReinitialize: true,
    initialValues: {
      realName: '',
    },
    validationSchema: Yup.object({
      realName: validation.vietnameseCharacter,
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    isValid,
    dirty,
    submitForm,
  } = formik
  return (
    <PageWithBackHeader
      header={{ title: t('common.profile') }}
      disableScrollView
      hideHeader={desktop}
    >
      <FormContainer sx={{ my: '$4' }}>
        {desktop ? (
          <>
            {isPlayerName && desktop ? (
              <Input
                responsive
                inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
                label={t('common.realName')}
                editable={false}
                value={`${playerData?.firstName || ''} ${
                  playerData?.lastName || ''
                }`}
              />
            ) : (
              <Input
                inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
                responsive
                label={t('common.realName')}
                value={values.realName}
                autoComplete="off"
                autoCorrect={false}
                spellCheck={false}
                onChangeText={handleChange('realName')}
                onBlur={handleBlur('realName')}
                placeholder={t('accountVerification.placeHolder')}
                error={
                  errors.realName
                    ? t(errors.realName, {
                        field: t('bank.accountName'),
                      })
                    : undefined
                }
              />
            )}
            <Input
              responsive
              inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
              label={t('common.username')}
              editable={false}
              value={playerData?.username || ''}
            />

            <Input
              inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
              responsive
              label={t('common.phone')}
              editable={false}
              value={playerData?.contractNumber || ''}
            />
            <Input
              inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
              responsive
              label={t('common.playerId')}
              editable={false}
              value={playerData?.player_id.toString() || ''}
              action={() => {
                return (
                  <IconButton
                    sx={{ ml: '$2' }}
                    size={16}
                    name="copy"
                    onPress={() =>
                      copyToClipboard(playerData?.player_id.toString())
                    }
                  />
                )
              }}
            />
            <Input
              inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
              responsive
              label={t('common.currency')}
              editable={false}
              value={playerData?.currency || ''}
            />

            {!isPlayerName && (
              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty}
                onPress={submitForm}
                sx={{ mt: '$3', my: '$4', mx: '$6' }}
              >
                {t('common.submit')}
              </Button>
            )}
          </>
        ) : (
          <MobileProfileItem playerData={playerData} />
        )}
      </FormContainer>
    </PageWithBackHeader>
  )
}

export default ProfileDetails
