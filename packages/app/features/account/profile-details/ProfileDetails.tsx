import IconButton from 'app/components/IconButton'
import Button from 'app/components/common/Button'
import DatePicker from 'app/components/form/DatePicker'
import FormContainer from 'app/components/form/FormContainer'
import Input from 'app/components/form/Input'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useAlert from 'app/hooks/useAlert'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { copyToClipboard } from 'app/utils'
import validation from 'app/utils/validation'
import dayjs from 'dayjs'
import { View, styled } from 'dripsy'
import { FormikHelpers, useFormik } from 'formik'
import isEmpty from 'lodash/isEmpty'
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
  const isDob =
    !!playerData?.birthdate && playerData?.birthdate !== 'Invalid Date'
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
        const dateOfBirth = dob ? dayjs(dob).format('YYYY-MM-DD') : undefined

        const { success, message } = await updatePlayerName({
          realName: sanitizedRealName,
          dob: dateOfBirth,
          telegram_id: telegram ? telegram : undefined,
        })
          .unwrap()
          .catch((e: IResponse) => {
            console.log('🚀 ~ file:  ProfileDetails ~ e:', e)
            showAlert(e)
            return e
          })

        if (success) {
          Toast.show({ type: 'success', text1: message })
          // setTimeout(() => {
          //   push('/deposit')
          // }, 150)
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
      dob: Yup.date()
        // .required('validation.required')
        .max(
          dayjs().subtract(18, 'year').add(1, 'day').startOf('date').toDate(),
          'validation.dobMinAge'
        ),
      telegram: Yup.string(),
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    setFieldValue,
    setValues,
    setFieldTouched,
    isSubmitting,
    values,
    errors,
    isValid,
    dirty,
    touched,
    submitForm,
  } = formik

  useEffect(() => {
    if (playerData) {
      setValues({
        realName: playerData.firstName,
        dob: isEditable
          ? playerData.birthdate && playerData.birthdate !== 'Invalid Date'
            ? dayjs(playerData.birthdate)
            : undefined
          : playerData.birthdate,
        telegram: playerData.telegram_id,
      })
    }
  }, [playerData])

  return (
    <PageWithBackHeader
      header={{ title: t('common.profile') }}
      hideHeader={desktop}
    >
      <FormContainer
        sx={desktop || !isEditable ? { my: '$4' } : { p: '$4' }}
        hidePadding
      >
        {desktop || isEditable ? (
          <View sx={{}}>
            {isPlayerName ? (
              <Input
                responsive
                label={t('common.realName')}
                editable={false}
                value={`${playerData?.firstName || ''} ${
                  playerData?.lastName || ''
                }`}
              />
            ) : (
              <Input
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
              label={t('common.username')}
              editable={false}
              value={playerData?.username || ''}
            />

            <Input
              responsive
              label={t('common.phone')}
              editable={false}
              value={playerData?.contractNumber || ''}
            />

            {isDob ? (
              <Input
                responsive
                label={t('common.dob')}
                editable={false}
                value={playerData?.birthdate}
              />
            ) : (
              <DatePicker
                responsive
                label={t('common.dob')}
                value={values.dob}
                minimumDate={dayjs()
                  .subtract(100, 'year')
                  .startOf('date')
                  .toDate()}
                maximumDate={dayjs()
                  .subtract(18, 'year')
                  .startOf('date')
                  .toDate()}
                onChange={(value) => {
                  setFieldValue('dob', dayjs(value).toDate())
                  setFieldTouched('dob')
                }}
                error={
                  errors.dob
                    ? t(errors.dob, {
                        field: t('common.dob'),
                      })
                    : undefined
                }
              />
            )}

            <Input
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
              responsive
              label={t('common.currency')}
              editable={false}
              value={playerData?.currency || ''}
            />

            {isTelegram ? (
              <Input
                responsive
                label={t('contact.telegram')}
                editable={false}
                value={playerData?.telegram_id}
              />
            ) : (
              <Input
                responsive
                label={t('contact.telegram')}
                value={values.telegram}
                autoComplete="off"
                autoCorrect={false}
                spellCheck={false}
                onChangeText={(e) => {
                  setFieldValue('telegram', e)
                  setFieldTouched('telegram', true)
                }}
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
                disabled={!isValid || !dirty || isEmpty(touched)}
                onPress={submitForm}
                sx={{ mt: '$3', my: '$4', mx: '$5' }}
              >
                {t('common.submit')}
              </Button>
            )}
          </View>
        ) : (
          <MobileProfileItem playerData={playerData} />
        )}
      </FormContainer>
    </PageWithBackHeader>
  )
}

export default ProfileDetails
