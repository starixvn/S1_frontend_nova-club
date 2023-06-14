import IconButton from 'app/components/IconButton'
import { copyToClipboard } from 'app/utils'
import { Text, View } from 'dripsy'

type AccountDefailProps = {
  accountName: string
  accountNumber: string
}

const AccountDetail = ({ accountName, accountNumber }: AccountDefailProps) => {
  return (
    <View sx={{ bg: '$primary.200', py: 2, mb: 20 }}>
      <View
        sx={{ bg: '$primary.500', flexDirection: 'column', py: '$3', px: '$4' }}
      >
        <View>
          <Text>Account Name :</Text>
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text>{accountName}</Text>
            </View>

            <View>
              <IconButton
                name={'copy'}
                color={'white'}
                size={12}
                onPress={() => copyToClipboard(accountName)}
              />
            </View>
          </View>
        </View>

        <View sx={{ mt: '$2' }}>
          <Text>Account No :</Text>
          <View
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text>{accountNumber}</Text>
            <IconButton
              name={'copy'}
              color={'white'}
              size={12}
              onPress={() => copyToClipboard(accountNumber)}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default AccountDetail
