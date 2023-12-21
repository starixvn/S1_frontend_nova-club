import IconButton from 'app/components/IconButton'
import Button from 'app/components/common/Button'
import FormContainer from 'app/components/form/FormContainer'
import Input, { Label } from 'app/components/form/Input'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { copyToClipboard } from 'app/utils'
import validation from 'app/utils/validation'
import { FormikHelpers, useFormik } from 'formik'
import React, { useEffect } from 'react'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { IResponse } from 'services/common/types'
import {
  usePlayerProfileQuery,
  usePlayerRealNameMutation,
} from 'services/playerApi'
import { useRouter } from 'solito/router'
import * as Yup from 'yup'
import MobileProfileItem from './MobileProfileItem'
import DatePicker from 'app/components/form/DatePicker'
import dayjs from 'dayjs'
import { Row, Text, View, useResponsiveValue } from 'dripsy'

type UpdateNameValueProps = {
  realName: string
  dob: dayjs.Dayjs | string | undefined
  telegram: string
}

const ProfileDetails = () => {
  const { t } = useLocalization()
  const { data: playerData } = usePlayerProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  const isPlayerName = !!playerData?.firstName
  const isDob = !!playerData?.birthdate
  const isTelegram = !!playerData?.telegram_id
  const isEditable = !isPlayerName || !isDob || !isTelegram

  const desktop = useIsDesktop()

  const [updatePlayerName] = usePlayerRealNameMutation()
  const { showAlert } = useAlert()
  const { push } = useRouter()

  const onSubmit = async (
    { realName, dob, telegram }: UpdateNameValueProps,
    actions: FormikHelpers<UpdateNameValueProps>
  ) => {
    try {
      if (realName) {
        const sanitizedRealName = realName.trim().replace(/\s\s+/g, ' ')

        const { success, message } = await updatePlayerName({
          realName: sanitizedRealName,
          dob: typeof dob === 'string' ? dob : dob.format('YYYY-MM-DD'),
          telegram_id: telegram,
        })
          .unwrap()
          .catch((e: IResponse) => {
            console.log(
              '🚀 ~ file: ProfileDetails.tsx:83 ~ ProfileDetails ~ e:',
              e
            )
            showAlert(e)
            return e
          })

        if (success) {
          Toast.show({ type: 'success', text1: message })
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
      dob: undefined,
      telegram: '',
    },
    validationSchema: Yup.object({
      realName: validation.vietnameseCharacter,
      dob: validation.stringRequired,
      telegram: validation.stringRequired,
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    setFieldValue,
    setValues,
    isSubmitting,
    values,
    errors,
    isValid,
    dirty,
    submitForm,
  } = formik

  useEffect(() => {
    if (playerData) {
      setValues({
        realName: playerData.firstName,
        dob: playerData.birthdate,
        telegram: playerData.telegram_id,
      })
    }
  }, [playerData])

  return (
    <PageWithBackHeader
      header={{ title: t('common.profile') }}
      disableScrollView
      hideHeader={desktop}
    >
      <FormContainer
        sx={desktop || !isEditable ? { my: '$4' } : { p: '$4' }}
        hidePadding
      >
        {desktop || isEditable ? (
          <>
            {isPlayerName ? (
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

            {isDob ? (
              <Input
                responsive
                inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
                label={t('common.dob')}
                editable={false}
                value={playerData?.birthdate}
              />
            ) : (
              <DatePicker
                responsive
                label={t('common.dob')}
                value={values.dob}
                inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
                minimumDate={dayjs()
                  .subtract(100, 'year')
                  .startOf('date')
                  .toDate()}
                maximumDate={dayjs()
                  .subtract(18, 'year')
                  .startOf('date')
                  .toDate()}
                onChange={(value) => setFieldValue('dob', dayjs(value))}
              />
            )}

            <Input
              inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
              responsive
              label={t('common.playerId')}
              editable={false}
              value={playerData?.referral_code.toString() || ''}
              action={() => {
                return (
                  <IconButton
                    sx={{ ml: '$2' }}
                    size={16}
                    name="copy"
                    onPress={() =>
                      copyToClipboard(playerData?.referral_code.toString())
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

            {isTelegram ? (
              <Input
                responsive
                inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
                label={t('contact.telegram')}
                editable={false}
                value={playerData?.telegram_id}
              />
            ) : (
              <Input
                inputContainerSx={{ flex: 1.8, flexGrow: 1.8 }}
                responsive
                label={t('contact.telegram')}
                value={values.telegram}
                autoComplete="off"
                autoCorrect={false}
                spellCheck={false}
                onChangeText={handleChange('telegram')}
                onBlur={handleBlur('telegram')}
                maxLength={32}
                error={
                  errors.telegram
                    ? t(errors.telegram, {
                        field: t('contact.telegram'),
                      })
                    : undefined
                }
              />
            )}

            {isEditable && (
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
