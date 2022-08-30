import { ACTION_SHEET_ID } from 'app/constant/actionSheet'
import { View } from 'dripsy'
import { useState } from 'react'
import FileInput, { FileInputValue } from './FileInput'
import MoneyInput from './MoneyInput'
import Select from './Select'

const InputBaseDemo = () => {
  const [file, setFile] = useState<FileInputValue | null>()
  const [file2, setFile2] = useState<FileInputValue | null>({
    name: 'Testsetste.jpg',
    uri: 'asldkfasdf/adsfadsfadsfdsa',
  })
  const [selectValue, setSelectValue] = useState(0)
  return (
    <View>
      <FileInput
        label="Receipt"
        sx={{ my: 30 }}
        onSelect={setFile}
        value={file}
      />
      <FileInput label="Receipt" onSelect={setFile2} value={file2} />
      <FileInput
        label="Receipt"
        onSelect={setFile2}
        value={file2}
        placeholder="Please upload a bank slip"
      />
      <MoneyInput label="test" value="1,000,000" />
      <Select
        label="Bank"
        _actionSheet={{
          sheetId: ACTION_SHEET_ID.WITHDRAWAL,
          headerTitle: 'Bank',
          actions: [
            {
              icon: 'add',
              onPress: () => {},
            },
          ],
        }}
        options={[
          {
            label: 'test1',
            value: 0,
          },
        ]}
        value={selectValue.toString()}
        onSelected={setSelectValue}
      />
    </View>
  )
}

export default InputBaseDemo
