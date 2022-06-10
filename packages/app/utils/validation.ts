import * as Yup from 'yup'

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
}

export default validation
