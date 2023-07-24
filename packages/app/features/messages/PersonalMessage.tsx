import IconButton from 'app/components/IconButton'
import RefreshButton from 'app/components/RefreshButton'
import CheckBox from 'app/components/common/CheckBox'
import FormContainer from 'app/components/form/FormContainer'
import useLocalization from 'app/provider/localization'
import isDesktop from 'app/utils/isDesktop'
import { Pressable, Row, Text, View, useResponsiveValue } from 'dripsy'
import React, { useCallback, useState } from 'react'
import { useDeleteMessagesMutation, useMessageQuery } from 'services/messageApi'
import MessageCard from './components/MessageCard'

const PersonalMessage = () => {
  const { t } = useLocalization()
  const { data, isSuccess, refetch, isFetching } = useMessageQuery()

  const [deleteMessages, { isLoading: isDeleting }] =
    useDeleteMessagesMutation()
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const isDesktop = useResponsiveValue([false, false, false, true])

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
    isSuccess && isSelectedAtLeastOne && selectedIds.length === data.length

  const selectAll = () => {
    if (isAllSelected) setSelectedIds([])
    else data && setSelectedIds(data.map((d) => d.messageId) ?? [])
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
    <FormContainer hidePadding={!isDesktop}>
      <Row sx={{ alignItems: 'center', p: '$3' }}>
        <Pressable
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: '$3',
            marginRight: 'auto',
          }}
          onPress={selectAll}
        >
          <CheckBox isCheck={isAllSelected} />
          <Text sx={{ flex: 1 }}>{t('common.selectAll')}</Text>
        </Pressable>
        <Row sx={{ gap: '$2', alignItems: 'center' }}>
          <IconButton name="bin" onPress={onDelete} />
          <RefreshButton loading={isFetching} onPress={() => refetch()} />
        </Row>
      </Row>

      {data?.map((item, i) => (
        <View
          key={item.messageId}
          sx={{
            mb: 12,
            borderWidth: isDesktop ? 2 : 0,
            borderTopWidth: 2,
            borderColor: '$primary.100',
          }}
        >
          <MessageCard
            isHtml
            index={i}
            id={item.messageId}
            content={item.message}
            selected={selectedIds.includes(item.messageId)}
            onToggle={(id) => onToggle(id)}
            title={item.subject}
            time={item.date}
          />
        </View>
      ))}
    </FormContainer>
  )
}

export default PersonalMessage
