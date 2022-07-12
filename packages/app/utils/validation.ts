import { COUNTRY_CODE } from 'app/constant/country'
import * as Yup from 'yup'
import { isValidPhoneNum } from './phoneValidation'

const ALPHANUMERIC_REGEX = RegExp(/^(?=.*[0-9])(?=.*[a-z])([a-z0-9]+)$/)

const validation = {
  username: Yup.string()
    .min(6, 'validation.userNameMinMaxLength')
    .max(20, 'validation.userNameMinMaxLength')
    .matches(ALPHANUMERIC_REGEX, 'validation.alphanumeric')
    .required('validation.required'),

  password: Yup.string()
    .required('validation.required')
    .min(6, 'validation.passwordMinMaxLength')
    .max(12, 'validation.passwordMinMaxLength'),

  confirmPassword: Yup.string()
    .required('validation.required')
    .min(6, 'validation.passwordMinMaxLength')
    .max(12, 'validation.passwordMinMaxLength')
    .matches(ALPHANUMERIC_REGEX, 'form.tips.password')
    .oneOf([Yup.ref('password'), null], 'validation.passwordNotMatch'),

  passwordRestrict: Yup.string()
    .required('validation.required')
    .min(6, 'validation.passwordMinMaxLength')
    .max(12, 'validation.passwordMinMaxLength')
    .matches(
      // RegExp(/^(?=.*[0-9a-z])(?=.*[!@#$%^&*])([a-z0-9!@#$%^&*]+)$/i),
      ALPHANUMERIC_REGEX,
      'form.tips.password'
    ),

  email: Yup.string().email('validation.email').required('validation.required'),

  accountName: Yup.string().required('form.tips.realName'),
  accountNo: Yup.number()
    .typeError('validation.numberOnly')
    .required('form.tips.needAccountNo'),
  sysId: Yup.number().nullable().required('validation.required'),

  amount: Yup.number()
    .typeError('validation.numberOnly')
    .required('form.tips.needAmount'),

  bank: Yup.object().required('form.tips.bank'),
  paymentMode: Yup.string().required('form.tips.paymentMode'),
  cardType: Yup.string().required('form.tips.cardType'),
  cardValue: Yup.string().required('form.tips.cardValue'),
  cardCode: Yup.string().required('form.tips.cardValue'),
  cardSerialNo: Yup.string().required('form.tips.cardSerialNo'),
  phoneNumber: Yup.string()
    .required('validation.required')
    .test({
      name: 'is-number',
      test: (value) => {
        if (!value) return false

        return /^\d+$/.test(value)
      },
      message: 'validation.numberOnly',
    })
    .test({
      name: 'phone-validation',
      test: (value) => {
        // WIP: 2nd argument should b get from redux
        return isValidPhoneNum(value, COUNTRY_CODE.Vietnam)
      },
      message: 'validation.invalidPhone',
    }),

  transferTo: Yup.string().required('form.tips.transferTo'),
  verifyCode: Yup.string()
    .required('validation.required')
    .min(6, 'validation.otpLength')
    .max(6, 'validation.otpLength'),
}

export const getErrorMessage = (error: any) => {
  let errorMessage = 'common.systemError'

  if (typeof error === 'object' && 'message' in error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
  }

  return errorMessage
}

export default validation
