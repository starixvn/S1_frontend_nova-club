import useLocalization from 'app/provider/localization'
import {
  Image,
  Pressable,
  Row,
  ScrollView,
  SxProp,
  Text,
  View,
  styled,
} from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import * as DropdownMenu from 'zeego/dropdown-menu'
import Icon from '../Icon'
import Label from '../Label'
import { DropdownMenuContent } from './DropMenu'
import { SelectProps } from './Select'

export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuTrigger = DropdownMenu.Trigger
export const DropdownMenuItemTitle = DropdownMenu.ItemTitle
export const DropdownMenuItem = DropdownMenu.Item

type SelectWithDropdownProps<T> = {
  enabledLabel?: boolean
  isLabelValue?: boolean
  autoTranslate?: boolean
  renderEmpty?: () => JSX.Element
  containerStyle?: SxProp
} & Pick<
  SelectProps<T>,
  'label' | 'placeholder' | 'options' | 'value' | 'onSelected'
>

const SelectWithDropdown = <T,>({
  label,
  enabledLabel = true,
  isLabelValue = false,
  autoTranslate = true,
  placeholder,
  options,
  value,
  renderEmpty,
  onSelected,
  containerStyle,
  ...rest
}: SelectWithDropdownProps<T>) => {
  const { t } = useLocalization()

  const selectedLabel = options?.find((el) => el.value === value)
  const parseLabel = isLabelValue
    ? (selectedLabel?.value as string)
    : selectedLabel?.label

  const finalizeLabel = autoTranslate ? t(parseLabel || '') : parseLabel

  return (
    <ContainerView {...rest}>
      {enabledLabel && label && <Label>{`${label} :`}</Label>}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Pressable>
            <View sx={{}}>
              <Row
                sx={{
                  py: '$2',
                  px: 24,
                  borderWidth: 1,
                  borderColor: '$primary.200',
                  borderRadius: 10,
                  minHeight: 48,
                  minWidth: 40,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text sx={{ opacity: value || finalizeLabel ? 1 : 0.5 }}>
                  {typeof value === 'string' || typeof value === 'number'
                    ? finalizeLabel
                    : placeholder}
                </Text>
                <Icon name="down" color="white" />
              </Row>
            </View>
          </Pressable>
        </DropdownMenu.Trigger>
        <DropdownMenuContent side="bottom" align="end">
          <ScrollView
            contentContainerStyle={{ maxHeight: 350 }}
            indicatorSx={{ bg: 'transparent' }}
          >
            <View>
              {options && options.length > 0 ? (
                options.map((item) => {
                  return (
                    <DropdownMenuItem
                      key={item.value}
                      style={{ marginBottom: 12 }}
                      onSelect={() => onSelected(item.value)}
                    >
                      <Row sx={{ alignItems: 'center', gap: 12 }}>
                        {item.icon && (
                          <SolitoImage
                            src={item.icon ?? ''}
                            height={60}
                            width={60}
                            alt=""
                          />
                        )}
                        <Text sx={{ p: 8 }}>{t(item.label)}</Text>
                      </Row>
                    </DropdownMenuItem>
                  )
                })
              ) : renderEmpty ? (
                renderEmpty()
              ) : (
                <Image
                  source={require('app/assets/images/empty-result.png')}
                  sx={{
                    aspectRatio: 1,
                    width: 100,
                    height: 100,
                    margin: 'auto',
                  }}
                  resizeMode="contain"
                  alt=""
                />
              )}
            </View>
          </ScrollView>
        </DropdownMenuContent>
      </DropdownMenu.Root>
    </ContainerView>
  )
}

const ContainerView = styled(View)({ mb: '$3' })

export default SelectWithDropdown
