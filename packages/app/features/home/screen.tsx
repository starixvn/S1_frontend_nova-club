import { Text, useSx, View, H1, P, Row, A, Image } from 'dripsy'
import TextInput from 'app/components/form/TextInput'
import { useState } from 'react'
import { Button } from 'react-native'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'

export function HomeScreen() {
    const sx = useSx()
    const [testV, setTestV] = useState('')

    return (
        <View
            sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                p: 16,
                bg: '#033E74',
            }}
        >
            <H1 sx={{ fontWeight: '800' }}>Welcome to Solito.</H1>
            <View sx={{ maxWidth: 600 }}>
                <P sx={{ textAlign: 'center' }}>
                    Here is a basic starter to show you how you can navigate
                    from one screen to another. This screen uses the same code
                    on Next.js and React Native.
                </P>
                <TextInput
                    error={testV ? undefined : 'This field is required'}
                    _input={{
                        placeholder: 'Username',
                        value: testV,
                        onChangeText: setTestV,
                        placeholderTextColor: '$border',
                    }}
                />
                <TextInput
                    prefix="+63"
                    _icon="sl"
                    _input={{
                        placeholder: 'Password',
                        value: testV,
                        onChangeText: setTestV,
                    }}
                />
                <TextInput
                    prefix="+643"
                    _input={{ value: testV, onChangeText: setTestV }}
                    actions={[
                        {
                            label: 'testtt',
                            onPress: () => {},
                        },
                    ]}
                />
                <TextInput
                    prefix="+633"
                    _input={{ value: testV, onChangeText: setTestV }}
                    actions={[() => <Button title={'passnode'} />]}
                />
            </View>
            <View sx={{ height: 32 }} />

            <Row>
                <TextLink
                    href="/user/wilson"
                    textProps={{
                        style: sx({
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'blue',
                        }),
                    }}
                >
                    Regular Link
                </TextLink>
                <View sx={{ width: 32 }} />
                <TextLink
                    href="/test-carousel"
                    textProps={{
                        style: sx({
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'blue',
                        }),
                    }}
                >
                    Carousel
                </TextLink>
                <View sx={{ width: 32 }} />
                <TextLink
                    href="/test-modal"
                    textProps={{
                        style: sx({
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: 'blue',
                        }),
                    }}
                >
                    Modal
                </TextLink>
                <View sx={{ width: 32 }} />
                <MotiLink
                    href="/user/fernando"
                    animate={({ hovered, pressed }) => {
                        'worklet'

                        return {
                            scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                            rotateZ: pressed
                                ? '0deg'
                                : hovered
                                ? '-3deg'
                                : '0deg',
                        }
                    }}
                    transition={{
                        type: 'timing',
                        duration: 150,
                    }}
                >
                    <Text
                        selectable={false}
                        sx={{
                            fontSize: 16,
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                    >
                        Moti Link
                    </Text>
                </MotiLink>
            </Row>
        </View>
    )
}
