import React, { useReducer, useState } from 'react'
import { GradientBoxText } from 'app/components/GradientBoxText'
import { Image, ScrollView, styled, Text, View } from 'dripsy'
import { Button } from 'app/components/form/Button'
import { useAppSelector } from 'app/provider/redux/store'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import validation from 'app/utils/validation'
import Select from 'app/components/form/Select'
import fishing from 'app/config/games/fishing'
import RoundedIcon from 'app/components/RoundedIcon'
import home from 'app/config/home'
import SlotGames from 'app/features/games/SlotGames'
import hotgame from 'app/config/games/hotgame'
import lottery from 'app/config/games/lottery'
import sport from 'app/config/games/sport'
import casino from 'app/config/games/casino'
import Modal from 'app/components/modal'
import { useDispatch } from 'react-redux'
import { AlertActions } from 'app/store/alert'
import AlertModal from 'app/components/modal/AlertModal'

type AddBankAccountValues = {
  accountName: string
  bank: number
  accountNo: number
}

const AddBankAccountScreen = () => {
  const dispatch = useDispatch()
  const user = useAppSelector((state) => state.player.currentLoginUser)

  const onSubmit = async ({
    accountName,
    bank,
    accountNo,
  }: AddBankAccountValues) => {
    console.log('accountName :>> ', accountName)
    console.log('bank :>> ', bank)
    console.log('accountNo :>> ', accountNo)
  }

  const formik = useFormik<AddBankAccountValues>({
    initialValues: {
      accountName: '',
      bank: 0,
      accountNo: 0,
    },
    validationSchema: Yup.object({
      accountName: validation.accountName,
      bank: validation.sysId,
      accountNo: validation.accountNo,
    }),
    onSubmit,
  })

  const {
    handleChange,
    handleBlur,
    isSubmitting,
    values,
    errors,
    touched,
    isValid,
    dirty,
    submitForm,
  } = formik

  const handleButtonClick = () => {
    console.log('Click next')
    dispatch(
      AlertActions.addAlert({
        // title: 'Alert Dialog',
        message: 'Show modal from add bank account',
      })
    )

    // dispatch(
    //   AlertActions.addInfo({
    //     message: 'Add Info',
    //     actions: [
    //       {
    //         label: 'common.yes',
    //         onPress: () => console.log('Click yest'),
    //       },
    //       {
    //         label: 'common.no',
    //       },
    //     ],
    //   })
    // )

    // dispatch(AlertActions.addError('common.systemError'))

    // dispatch(AlertActions.addSuccess('common.systemError'))

    // setTimeout(() => {
    //   dispatch(AlertActions.dismiss())
    // }, 1000)
  }

  return (
    <StyledView>
      <GradientBoxText labelWidth={0.55}>
        <GradientBoxText.TextInput
          label="Account name"
          _input={{
            placeholder: "Please enter your 'Registered Real Name",
            editable: false,
            value: user?.firstName,
          }}
          containerStyle={{ my: '$6' }}
        />
        <GradientBoxText.TextInput
          label="Bank"
          _input={{
            placeholder: 'Please select bank',
            value: values.bank.toString(),
            onChangeText: handleChange('bank'),
            onBlur: handleBlur('bank'),
          }}
          containerStyle={{ my: '$0' }}
        />
        <Select
          headerTitle={'Period'}
          buttonTitle="Click here to oopen"
          buttonProps={{
            sx: {
              borderColor: 'transparent',
            },
            isActive: false,
          }}
          // setSelectedValue={setSelected}
        >
          <ScrollView
            sx={{
              bg: 'white',
            }}
          >
            <View
              sx={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                p: '$4',
                justifyContent: 'space-between',
              }}
            >
              {casino.gameList.map((item) => (
                <RoundedIcon
                  size="small"
                  key={item.image.toString()}
                  image={item.image}
                  containerStyle={{ m: '$2' }}
                />
              ))}
            </View>
          </ScrollView>
        </Select>
        <GradientBoxText.TextInput
          label="Account no"
          _input={{
            placeholder: 'Please enter account',
            value: values.accountNo.toString(),
            onChangeText: handleChange('accountNo'),
            onBlur: handleBlur('accountNo'),
          }}
          // error={
          //   // touched.oldPassword && errors.oldPassword
          //   //   ? errors.oldPassword
          //   //   : undefined
          // }
          containerStyle={{ my: '$0' }}
        />
      </GradientBoxText>

      <StyledButtonWrapper>
        <Button
          rounded
          stretch
          // disabled
          variant="lg"
          fill={{
            type: 'gradient',
            color: 'secondary',
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 },
          }}
          onPress={handleButtonClick}
        >
          <Button.Label>Next</Button.Label>
        </Button>
      </StyledButtonWrapper>
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  flex: 1,
  bg: '$secondary',
  pt: '$12',
}))

const StyledButtonWrapper = styled(View)(() => ({
  my: '$20',
  mx: '$12',
}))
export default AddBankAccountScreen
