import DatePicker from 'app/components/form/DatePicker'
import FilePicker from 'app/components/form/FilePicker'
import Input from 'app/components/form/Input'
import Icon from 'app/components/Icon'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Row, ScrollView, Text } from 'dripsy'
import { ImagePickerAsset } from 'expo-image-picker'
import React, { useState } from 'react'
import { Button } from 'react-native'

export default function InputScreen() {
  const { bottom, top } = useSafeArea()
  const [d, setD] = useState<Date>()
  const [file, setFile] = useState<ImagePickerAsset>()

  return (
    <ScrollView
      sx={{
        flex: 1,
        bg: '$primary.700',
        paddingTop: 100,
      }}
      contentContainerSx={{ px: '$2', paddingTop: top, paddingBottom: bottom }}
    >
      <DatePicker value={d} onChange={setD} placeholder="Select Date" />
      <DatePicker
        value={d}
        onChange={setD}
        placeholder="Select Date"
        error="Invalid Date"
      />
      <FilePicker
        value={file}
        onChange={(e) => {
          console.log('e', e)
          setFile(e)
        }}
        placeholder="Select File"
      />
      <Input
        icon="date"
        error="This field is required"
        action={({ color }) => <Icon name={'down'} color={color} />}
      />
      <Input label="Bank" placeholder="Please enter bank account" />
      <Input icon="profile-rounded" placeholder="Username" />
      <Input icon="pw" placeholder="Username" />
      <Input
        icon={({ color }) => <Icon name="date" color={color} />}
        placeholder="Username"
      />
      <Input placeholder="Username" />
      <Input placeholder="Password" secureTextEntry />
      <Input prefix="OTP" />
      <Input
        icon="date"
        prefix="+84"
        action={({ color }) => <Icon name="down" color={color} />}
      />
      <Input action={({ color }) => <Icon name="down" color={color} />} />
      <Row sx={{ justifyContent: 'space-around', gap: '$2' }}>
        <Input
          action={({ color }) => <Icon name="down" color={color} />}
          sx={{ flex: 1 }}
        />
        <Input
          action={({ color }) => <Icon name="down" color={color} />}
          sx={{ flex: 1 }}
        />
        <Input
          action={({ color }) => <Icon name="down" color={color} />}
          sx={{ flex: 1 }}
        />
      </Row>
      <Row sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
        <Input
          icon={'date'}
          action={({ color }) => <Icon name="down" color={color} />}
          sx={{ flex: 1 }}
        />
        <Text sx={{ mx: '$3' }}>-</Text>
        <Input
          icon={'date'}
          action={({ color }) => <Icon name="down" color={color} />}
          sx={{ flex: 1 }}
        />
      </Row>
    </ScrollView>
  )
}
