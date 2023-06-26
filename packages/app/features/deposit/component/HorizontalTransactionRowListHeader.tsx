import { Text, View, styled } from 'dripsy'

const HorizontalTransactionRowListHeader = () => {
  return (
    <>
      <View sx={{ flex: 1, flexDirection: 'row', m: 10 }}>
        <View sx={{ flex: 0.3 }}>
          <HeaderText>{'No'}</HeaderText>
        </View>

        <View sx={{ flex: 0.9 }}>
          <HeaderText sx={{ textAlign: 'left' }}>{'Type'}</HeaderText>
        </View>

        <View sx={{ flex: 1, flexDirection: 'row' }}>
          <HeaderText>{'ID'}</HeaderText>
        </View>

        <View sx={{ flex: 0.8, flexDirection: 'column' }}>
          <HeaderText>{'datetime'}</HeaderText>
        </View>

        <View sx={{ flex: 0.6 }}>
          <HeaderText sx={{ textAlign: 'center' }}>{'amount'}</HeaderText>
        </View>

        <View sx={{ flex: 1 }}>
          <HeaderText sx={{ textAlign: 'center' }}>{'status'}</HeaderText>
        </View>
      </View>
    </>
  )
}

const HeaderText = styled(Text)({
  fontWeight: 'bold',
  textTransform: 'capitalize',
})
export default HorizontalTransactionRowListHeader
