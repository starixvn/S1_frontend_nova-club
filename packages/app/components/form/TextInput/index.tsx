import Icon, { IconComponentProps } from 'app/components/Icon'
import {
    styled,
    Text,
    useDripsyTheme,
    View,
    TextInput as DripsyTextInput,
} from 'dripsy'
import { AnimatePresence, MotiText } from 'moti'
import { FC, useState } from 'react'
import { Button } from 'react-native'

export interface TextInputAction {
    label: string
    onPress: () => void
}
type DripsyTextInputProps = React.ComponentProps<typeof DripsyTextInput>

export interface TextInputProps {
    error?: string
    prefix?: string
    _input: DripsyTextInputProps
    _icon?: IconComponentProps | string
    actions?: (FC | TextInputAction)[]
}

const TextInput: FC<TextInputProps> = (props) => {
    const { error, actions } = props

    const { theme } = useDripsyTheme()
    return (
        <TextInputWrap {...props}>
            <TextInputContent error={error}>
                <TextInputFocusArea {...props} />
                {actions && (
                    <TextInputActions>
                        {actions.map((action, i) => {
                            if ('label' in action) {
                                return (
                                    <Button
                                        key={'b-actions' + i}
                                        onPress={action.onPress}
                                        title={action.label}
                                    />
                                )
                            } else {
                                const Action = action
                                return <Action key={'b-actions' + i} />
                            }
                        })}
                    </TextInputActions>
                )}
            </TextInputContent>
            <TextInputHints>
                <AnimatePresence>
                    {error && (
                        <MotiText
                            animate={{
                                height: [0, theme.text.body.fontSize * 1.5],
                                opacity: [0, 1],
                            }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ type: 'timing', duration: 300 }}
                        >
                            <Text variants={['error', 'sm']}>{error}</Text>
                        </MotiText>
                    )}
                </AnimatePresence>
            </TextInputHints>
        </TextInputWrap>
    )
}

const TextInputWrap = styled(View, {
    themeKey: 'forms',
    defaultVariant: 'wrapper',
})(() => ({}))

const TextInputIconWrap = styled(View)(() => ({
    borderRadius: '50%',
    backgroundColor: '#1e79d4',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    mr: '$2',
}))

const TextInputContent = styled(View)(({ error }: { error?: string }) => ({
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: error ? '$error' : '$border',
}))

const TextInputActions = styled(View)(() => ({
    justifyContent: 'center',
    ml: '$2',
}))

const TextInputHints = styled(View)(() => ({
    justifyContent: 'center',
    pt: '$1',
}))

const TextInputFocusArea: FC<TextInputProps> = ({ prefix, _icon, _input }) => {
    const [leftP, setLeftP] = useState(0)
    const { theme } = useDripsyTheme()
    return (
        <View
            sx={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: 40,
            }}
        >
            <View
                sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onLayout={(event) => {
                    var { x, y, width, height } = event.nativeEvent.layout
                    setLeftP(width)
                }}
            >
                {typeof _icon === 'string' ? (
                    <TextInputIconWrap>
                        <Icon name={_icon} size={20} />
                    </TextInputIconWrap>
                ) : typeof _icon === 'object' ? (
                    <TextInputIconWrap>
                        <Icon {..._icon} />
                    </TextInputIconWrap>
                ) : null}
                {prefix && <Text sx={{ mr: '$2' }}>{prefix}</Text>}
            </View>
            <DripsyTextInput
                placeholder="This filed"
                placeholderTextColor={'$border'}
                sx={{
                    pl: leftP,
                    flex: 1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
                {..._input}
            />
        </View>
    )
}

export default styled(TextInput)()
