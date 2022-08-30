import { forwardRef } from 'react'
import { Platform } from 'react-native'
import useFileInputHandler, {
  FileInputValue,
} from '../FileInput/useFileInputHandler'
import IconButton from '../IconButton'
import InputBase, { InputBaseProps, INPUT_BASE_SPACE } from './InputBase'

export interface FileInput extends Omit<InputBaseProps, 'value'> {
  loading?: boolean
  onSelect?: (v?: FileInputValue) => void
  value: FileInputValue
}

const FileInput = forwardRef<{}, FileInput>(
  ({ value, loading, onSelect, error, ...rest }, ref) => {
    const {
      webInputRef,
      handleSelect,
      handleOnChangeWebImage,
      getName,
      clearFile,
    } = useFileInputHandler({
      onSelect,
      value,
    })

    return (
      <InputBase
        onPress={handleSelect}
        ref={ref}
        value={getName()}
        error={error}
        action={
          <IconButton
            sx={{
              p: INPUT_BASE_SPACE,
            }}
            onPress={value ? clearFile : handleSelect}
            color={value || error ? '$error' : 'white'}
            size={20}
            name={value ? 'cross' : 'attachment'}
          />
        }
        {...rest}
      >
        {Platform.OS === 'web' && (
          <input
            ref={webInputRef}
            type="file"
            onChange={handleOnChangeWebImage}
            style={{
              cursor: 'pointer',
              backgroundColor: 'red',
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              opacity: 0,
            }}
          />
        )}
      </InputBase>
    )
  }
)

FileInput.displayName = 'FileInput'

export default FileInput
