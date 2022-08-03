import CheckBox from 'app/components/CheckBox'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useDeleteMessagesMutation, useMessageQuery } from 'services/messageApi'
import { ActivityIndicator, styled, Text, View } from 'dripsy'
import { useCallback, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import MessageCard from './MessageCard'

const PersonalMessagePage = () => {
  const { t } = useLocalization()
  const { data, isError, isSuccess, refetch, isLoading } = useMessageQuery()

  const [deleteMessages, { isLoading: isDeleting }] =
    useDeleteMessagesMutation()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const onToggle = useCallback((id: number) => {
    setSelectedIds((prev) => {
      let idIndex = prev.indexOf(id)
      let newResult = [...prev]
      if (idIndex > -1) {
        newResult.splice(idIndex, 1)
      } else newResult.push(id)

      return newResult
    })
  }, [])

  const isAllSelected =
    isSuccess &&
    selectedIds.length > 0 &&
    selectedIds.length === data?.data?.messages.length
  const selectAll = () => {
    if (isAllSelected) setSelectedIds([])
    else
      data?.data &&
        setSelectedIds(data?.data?.messages.map((d) => d.messageId) ?? [])
  }

  async function onDelete() {
    let params = {
      isDeleteAll: false,
      ids: selectedIds,
    }
    try {
      await deleteMessages(params).unwrap()
      setSelectedIds([])
      refetch()
    } catch (e) {}
  }

  return (
    <View sx={{ backgroundColor: '$secondary', flex: 1, flexBasis: 0 }}>
      <DripsyGradient
        colors={['rgb(34,77,110)', 'rgb(26,62,90)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <StyledView>
          <TouchableOpacity onPress={selectAll}>
            <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
              <CheckBox isCheck={isAllSelected} />
              <Text sx={{ color: '#7DD7FF', pl: '$2' }}>
                {t('common.selectAll')}
              </Text>
            </View>
          </TouchableOpacity>
          <View sx={{ flexDirection: 'row' }}>
            {isDeleting ? (
              <ActivityIndicator sx={{ m: '$2' }} color={'$lightCyan'} />
            ) : (
              <BouncePressable onPress={onDelete}>
                <Icon name="bin" />
              </BouncePressable>
            )}
            <View sx={{ pl: '$3' }}>
              {isLoading ? (
                <ActivityIndicator
                  size={23}
                  color={'$lightCyan'}
                  sx={{ px: '$1' }}
                />
              ) : (
                <BouncePressable
                  onPress={() => {
                    refetch()
                  }}
                >
                  <Icon name="reload" />
                </BouncePressable>
              )}
            </View>
          </View>
        </StyledView>
      </DripsyGradient>
      <FlatList
        onRefresh={() => refetch()}
        keyExtractor={(item) => item.messageId.toString()}
        refreshing={isLoading}
        style={{ backgroundColor: '#0D2035' }}
        data={data?.data?.messages}
        renderItem={({ item, index }) => {
          return (
            <MessageCard
              isHtml
              key={item.messageId}
              id={item.messageId}
              index={index}
              title={item.subject}
              content={item.message}
              time={item.date}
              selected={selectedIds.includes(item.messageId)}
              onToggle={onToggle}
            />
          )
        }}
        // onEndReached={() => loadMore()}
        // onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <Text sx={{ textAlign: 'center', mt: '$3' }}>
            Does not have any message yet!
          </Text>
        }
      />
    </View>
  )
}

const StyledView = styled(View)({
  flexDirection: 'row',
  p: '$3',
  justifyContent: 'space-between',
  borderTopWidth: 0.5,
  borderColor: '$secondary',
  py: '$5',
})

export default PersonalMessagePage
