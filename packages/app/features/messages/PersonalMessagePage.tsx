import CheckBox from 'app/components/CheckBox'
import RefreshButton from 'app/components/form/IconButton/RefreshButton'
import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { ActivityIndicator, styled, Text, View } from 'dripsy'
import { useCallback, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { useDeleteMessagesMutation, useMessageQuery } from 'services/messageApi'
import MessageCard from './MessageCard'

const PersonalMessagePage = () => {
  const { t } = useLocalization()
  const { data, isSuccess, refetch, isFetching } = useMessageQuery()

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

  const isSelectedAtLeastOne = selectedIds.length > 0
  const isAllSelected =
    isSuccess &&
    isSelectedAtLeastOne &&
    selectedIds.length === data?.data?.messages.length

  const selectAll = () => {
    if (isAllSelected) setSelectedIds([])
    else
      data?.data &&
        setSelectedIds(data?.data?.messages.map((d) => d.messageId) ?? [])
  }

  async function onDelete() {
    if (!isSelectedAtLeastOne) return

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
          <View sx={{ flexDirection: 'row', alignItems: 'center' }}>
            {isDeleting ? (
              <ActivityIndicator size={25} color={'$lightCyan'} />
            ) : (
              <BouncePressable
                disabled={!isSelectedAtLeastOne}
                onPress={onDelete}
              >
                <Icon
                  name="bin"
                  size={25}
                  color={isSelectedAtLeastOne ? '$text' : '$disabled'}
                />
              </BouncePressable>
            )}
            <View sx={{ pl: '$3' }}>
              <RefreshButton loading={isFetching} onPress={() => refetch()} />
            </View>
          </View>
        </StyledView>
      </DripsyGradient>
      <FlatList
        onRefresh={() => refetch()}
        keyExtractor={(item) => item.messageId.toString()}
        refreshing={isFetching}
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
