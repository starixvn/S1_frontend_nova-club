import { Text, View, useDripsyTheme } from 'dripsy'
import { useWindowDimensions } from 'react-native'

interface CoinBoxProps {
  title: string
  children: React.ReactNode
}

const CoinBox = ({ title, children }: CoinBoxProps) => {
  const { width } = useWindowDimensions()
  const { theme } = useDripsyTheme()
  return (
    <>
      <View sx={{ alignSelf: 'center', marginBottom: 20 }}>
        <Text sx={{ fontSize: 36, fontWeight: '900' }}>{title}</Text>
      </View>
      <View
        sx={{
          bg: 'rgba(0,0,0,0.3);',
          minWidth: 400,
          padding: 20,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
          // backdropFilter: 'blur',
        }}
      >
        {children}
      </View>
    </>
  )
}
export default CoinBox
