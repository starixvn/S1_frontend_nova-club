import * as Yup from 'yup'

export const USERNAME_MAX_LENGTH = 18
export const PASSWORD_MAX_LENGTH = 15

// const ALPHANUMERIC_REGEX = RegExp(/^(?=.*[0-9])(?=.*[a-z])([a-z0-9]+)$/)
const ALPHANUMERIC_REGEX = RegExp(/^[0-9A-Za-z]*$/g)
const PASSWORD_REGEX = RegExp(/^([a-zA-Z0-9!@#$%^&*]+)$/g)
const NUMERIC_REGEX = RegExp(/^[0-9]*$/)

const validation = {
  username: Yup.string()
    .min(6, 'validation.userNameMinMaxLength')
    .max(USERNAME_MAX_LENGTH, 'validation.userNameMinMaxLength')
    .matches(ALPHANUMERIC_REGEX, 'validation.username')
    .required('validation.required'),

  password: Yup.string()
    .required('validation.required')
    .min(6, 'validation.passwordMinMaxLength')
    .max(PASSWORD_MAX_LENGTH, 'validation.passwordMinMaxLength')
    .matches(PASSWORD_REGEX, 'validation.password'),

  confirmPassword: Yup.string()
    .required('validation.required')
    .min(6, 'validation.passwordMinMaxLength')
    .max(PASSWORD_MAX_LENGTH, 'validation.passwordMinMaxLength')
    .matches(PASSWORD_REGEX, 'validation.password')
    .oneOf([Yup.ref('password'), null], 'validation.passwordNotMatch'),

  passwordRestrict: Yup.string()
    .required('validation.required')
    .min(6, 'validation.passwordMinMaxLength')
    .max(PASSWORD_MAX_LENGTH, 'validation.passwordMinMaxLength')
    .matches(PASSWORD_REGEX, 'validation.password'),

  pin: Yup.string()
    .required('validation.required')
    .matches(NUMERIC_REGEX, 'validation.pin'),

  confirmPin: Yup.string()
    .required('validation.required')
    .matches(NUMERIC_REGEX, 'validation.pin')
    .oneOf([Yup.ref('pin'), null], 'validation.pinNotMatch'),

  email: Yup.string().email('validation.email').required('validation.required'),

  accountName: Yup.string().required('validation.realName'),
  accountNo: Yup.number()
    .typeError('validation.numberOnly')
    .required('validation.needAccountNo'),

  amount: Yup.string().required('validation.required'),

  bank: Yup.object().required('validation.required'),
  paymentMode: Yup.string().required('validation.required'),
  cardType: Yup.string().required('validation.required'),
  cardValue: Yup.string().required('validation.required'),
  cardCode: Yup.string().required('validation.required'),
  cardSerialNo: Yup.string().required('validation.required'),
  referralCode: Yup.string().required('validation.required'),
  phoneNumber: Yup.string()
    .required('validation.required')
    .test({
      name: 'is-number',
      test: (value) => {
        if (!value) return false

        return /^\d+$/.test(value)
      },
      message: 'validation.numberOnly',
    }),
  // .test({
  //   name: 'phone-validation',
  //   test: (value) => {
  //     // WIP: 2nd argument should b get from redux
  //     return isValidPhoneNum(value, COUNTRY_CODE.Vietnam)
  //   },
  //   message: 'validation.invalidPhone',
  // })

  verifyCode: Yup.string()
    .required('validation.required')
    .min(6, 'validation.otpLength')
    .max(6, 'validation.otpLength'),
  stringRequired: Yup.string().required('validation.required'),
}

export const getErrorMessage = (error: any) => {
  let errorMessage = 'status.systemError'

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
