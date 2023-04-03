import { StackActions, useNavigation } from '@react-navigation/native'
import useAgentAlert from 'agent/hooks/useAgentAlert'
import useAgentLoading from 'agent/hooks/useAgentLoading'
import { useDeleteBankAccountMutation } from 'agent/services/accountApi'
import { DeleteBankAccount } from 'agent/services/accountApi.type'
import { IResponse } from 'agent/services/common/agentAxiosBaseQuery'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import { Image, styled, View } from 'dripsy'
import React, { useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useModal } from 'react-native-modalfy'
import Icon from '../Icon'
import IconButton from '../Icon/IconButton'
import Select, { CloseSelectForwardRef, Options, SelectProps } from './Select'
const StyledTouchableOpacity = styled(TouchableOpacity)()
const TOTAL_CARD = 3

export type SelectWithdrawalBank<T> = Omit<
  SelectProps<T>,
  '_actionSheetContent' | 'onSelected'
> & { onDeleteDone?: () => void; onSelected: (value: Options<T>) => void }

export default function SelectWithdrawalBank<T>(
  props: SelectWithdrawalBank<T>
) {
  // const navigation = useNavigation()

  const { push } = useContextualRouter()
  const [DeleteBankAccount] = useDeleteBankAccountMutation()
  const selectRef = useRef<CloseSelectForwardRef>(null)
  const { showAlert } = useAgentAlert()
  const { onSelected, options } = props
  const cardLength = options.length
  const totalAddBankCard = TOTAL_CARD - cardLength
  const { openModal } = useModal()
  const { toggleLoading } = useAgentLoading()

  const handleDelete = async (id: number) => {
    toggleLoading(true)
    try {
      const { message, success } = await DeleteBankAccount({
        id,
      })
        .unwrap()
        .catch((err: IResponse<DeleteBankAccount>) => {
          console.log('Error: ', err)
          return err
        })

      if (success) {
        showAlert(message)
        props.onDeleteDone?.()
      }
    } catch (e) {
      console.log('Catch Error: ', e)
    } finally {
      toggleLoading(false)
    }
  }

  function deleteBankConfirmation(id: number) {
    openModal('AgentCommonConfirmationModal', {
      title: 'common.importantNote',
      body: 'common.confirmDelete',
      close: false,
      onConfirm: () => handleDelete(id),
    })
  }

  return (
    <Select
      {...props}
      ref={selectRef}
      _actionSheetContent={({ closeActionSheet }) => {
        return (
          <SelectBodyContainer>
            {props.options.map((option, index) => {
              return (
                <BankIconOuterContainer key={index.toString()}>
                  <BankIconInnerContainer
                    key={index.toString()}
                    onPress={() => {
                      onSelected(option)
                      closeActionSheet()
                    }}
                  >
                    {option.icon && (
                      <BankIconImage
                        source={
                          typeof option.icon === 'string'
                            ? { uri: option.icon }
                            : option.icon
                        }
                        resizeMode={'contain'}
                      />
                    )}
                  </BankIconInnerContainer>
                  <DeleteBankButton
                    onPress={() => {
                      selectRef.current?.closeActionSheet()
                      option.id && deleteBankConfirmation(parseInt(option.id))
                      // toggleLoading(true)
                    }}
                    name="bin"
                    color="#0c7dff"
                  />
                </BankIconOuterContainer>
              )
            })}
            {Array.from({ length: totalAddBankCard }, (_, i) => {
              return (
                <AddBankContainer
                  key={`addBankCard-${i}`}
                  onPress={() => {
                    selectRef.current?.closeActionSheet()
                    push('/agent/wallet/withdrawal/add-bank')
                  }}
                >
                  <Icon name={'add'} color={'grey'} size={25} />
                </AddBankContainer>
              )
            })}
          </SelectBodyContainer>
        )
      }}
    />
  )
}
const AddBankContainer = styled(StyledTouchableOpacity)({
  borderColor: 'grey',
  borderRadius: 15,
  m: '$2',
  alignItems: 'center',
  justifyContent: 'center',
  width: 100,
  height: 100,
  shadowColor: '#000',
  backgroundColor: 'white',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.4,
  shadowRadius: 10,
})

const DeleteBankButton = styled(IconButton)({
  position: 'absolute',
  bottom: 0,
  right: -15,
  zIndex: 1,
})

const BankIconImage = styled(Image)({
  width: 100,
  height: 100,
  borderRadius: 15,
})

const BankIconOuterContainer = styled(View)({
  m: '$2',
  shadowColor: '#000',
  backgroundColor: 'white',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  borderRadius: 15,
  shadowOpacity: 0.13,
  shadowRadius: 10,
})

const BankIconInnerContainer = styled(StyledTouchableOpacity)({
  shadowColor: '#0c7dff',
  backgroundColor: 'white',
  shadowOffset: {
    width: 0,
    height: -5,
  },
  borderRadius: 15,
  shadowOpacity: 0.33,
  shadowRadius: 5,
})

const SelectBodyContainer = styled(View)({
  flexDirection: 'row',
  p: '$2',
  flexWrap: 'wrap',
  justifyContent: 'center',
})
