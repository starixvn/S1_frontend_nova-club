import { StackActions, useNavigation } from '@react-navigation/native'
import Button from 'agent/components/Button'
import DatePicker from 'agent/components/DatePicker/DatePicker'
import Icon from 'agent/components/Icon'
import IconButton from 'agent/components/Icon/IconButton'
import Input from 'agent/components/Input'
import Select from 'agent/components/Select/Select'
import SelectWithCardGrid from 'agent/components/Select/SelectWithCardGrid'
import Text from 'agent/components/Text'
import { useLoginMutation } from 'agent/services/authApi'
import { AgentAuthActions } from 'agent/store/agentAuthReducer'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { RootState, useAppDispatch } from 'app/provider/redux/store'
import { View } from 'dripsy'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const [testing, settesting] = useState('')
  const [login] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const { replace } = useContextualRouter()
  const token = useSelector((s: RootState) => s.agent.access_token)

  async function handleLogin() {
    try {
      const { success, message, result } = await login({
        username: 'shlouis8',
        password: 'aloha123',
      }).unwrap()

      if (success && result) {
        dispatch(AgentAuthActions.setAgentAuthToken(result.data.access_token))
      } else {
        throw new Error(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function handleGetUserInfo() {
    try {
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    handleGetUserInfo()
  }, [])

  const [selectedValue, setSelectedValue] = useState(123)

  return (
    <View>
      <Text>DashBoard</Text>

      <Icon name="shareholder" size={48} color="blue" />

      <IconButton name="agent" size={32} color="black" bordered />
      <Select
        options={[
          { label: 'Commisiion', value: 123 },
          { label: 'Profit', value: 124 },
          { label: 'Average profit', value: 125 },
          { label: 'FAFB', value: 126 },
        ]}
        placeholder="123123"
        value={selectedValue}
        onSelected={setSelectedValue}
        label="Reset RT %"
        isRequired
      />
      <SelectWithCardGrid
        options={[
          { label: 'Commisiion', value: 123 },
          { label: 'Profit', value: 124 },
          { label: 'Average profit', value: 125 },
          { label: 'FAFB', value: 126 },
        ]}
        placeholder="123123"
        value={selectedValue}
        onSelected={setSelectedValue}
        label="Select With Card Grid"
        isRequired
      />
      <Button
        elevation={1}
        leftIcon={{
          name: 'password',
        }}
        titleProps={{
          sx: {
            fontWeight: 'bold',
          },
        }}
        onPress={() =>
          navigation.dispatch(StackActions.push('AgentChangePassword'))
        }
      >
        Hello world
      </Button>

      <Input
        leftOuterElement={
          <View sx={{ width: 25, height: 25, backgroundColor: 'brown' }} />
        }
        rightOuterElement={
          <View sx={{ width: 25, height: 25, backgroundColor: 'coral' }} />
        }
        leftInnerElement={
          <View sx={{ width: 25, height: 25, backgroundColor: 'chocolate' }} />
        }
        rightInnerElement={
          <View sx={{ width: 25, height: 25, backgroundColor: 'cornsilk' }} />
        }
        // editable={false}
        _icon="calendar"
        isRequired
        label={'testing'}
        value={testing}
        placeholder={'abc1332'}
        error={'123s12312313'}
        containerProps={{
          sx: {
            mt: 20,
          },
        }}
        onChangeText={(val) => settesting(val)}
      />

      <DatePicker
        label="Select date"
        isRequired
        value={new Date()}
        rightIcon="calendar"
        _rightIcon={{ size: 20 }}
        onChange={(value) => {}}
      />
    </View>
  )
}

export default Dashboard
