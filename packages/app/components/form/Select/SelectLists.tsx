import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { Pressable, Text, View } from 'dripsy'
import { Dispatch, memo, MutableRefObject, SetStateAction } from 'react'
import { FlatList } from 'react-native-gesture-handler'

interface SelectListsProps {
  actionSheetRef: MutableRefObject<any>
  data: any[]
  onPress?: () => any
  selectedIndex: number
  setSelectedValue: Dispatch<SetStateAction<any>>
  setSelectedIndex: Dispatch<SetStateAction<any>>
}

const SelectLists = ({
  actionSheetRef,
  data,
  onPress: onClose,
  selectedIndex,
  setSelectedIndex,
  setSelectedValue,
}: SelectListsProps) => {
  const handleSelectedOption = (index: number) => {
    const selectedValue = data[index]

    setSelectedIndex(index)
    setSelectedValue(selectedValue)
  }

  const keyExtractor = (_: any, index: number) => {
    return index.toString()
  }

  const onSelectOption = (index: number) => {
    handleSelectedOption(index)

    // To delay action sheet from close for about 150ms
    // else it will close too fast/abruptly
    setTimeout(() => {
      onClose?.()
    }, 150)
  }

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <Pressable
        key={index}
        sx={{
          borderBottomColor: '$lightNavyBlue',
          borderBottomWidth: 1,
        }}
        onPress={() => onSelectOption(index)}
      >
        <DripsyGradient
          gradient={index === selectedIndex ? 'lightNavyBlue' : 'darkNavyBlue'}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.9, y: 0.5 }}
          sx={{ paddingY: '$3', paddingX: '$5' }}
        >
          <View
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              minHeight: 30,
            }}
          >
            <Text
              sx={{
                fontWeight: 'bold',
                fontSize: 18,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            {index === selectedIndex ? (
              <View
                sx={{
                  backgroundColor: '$lightNavyBlue2',
                  borderRadius: 50,
                  width: 25,
                  aspectRatio: 1,
                  p: '$1',
                  ml: '$3',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon name={'tick'} size={18} sx={{ color: '$dark' }} />
              </View>
            ) : null}
          </View>
        </DripsyGradient>
      </Pressable>
    )
  }

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onMomentumScrollEnd={() => actionSheetRef.current.handleChildScrollEnd}
    />
  )
}

export default memo(SelectLists)
