import { Image, Pressable, Row, ScrollView, Text, View } from 'dripsy'
import React, { ReactNode } from 'react'
import { SelectOptions } from 'services/common/types'
import { SolitoImage } from 'solito/image'
import * as DropdownMenu from 'zeego/dropdown-menu'
import Icon from '../Icon'
import Label from '../Label'
import { DropdownMenuContent } from './DropMenu'
import useLocalization from 'app/provider/localization'

export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuTrigger = DropdownMenu.Trigger
export const DropdownMenuItemTitle = DropdownMenu.ItemTitle
export const DropdownMenuItem = DropdownMenu.Item

type SelectWithDropdownProps = {
  label?: string
  placeholder?: string
  options: SelectOptions[]
  value: string | undefined
  onSelected: (arg0) => void
  renderEmpty?: () => JSX.Element
}

const SelectWithDropdown = ({
  label,
  placeholder,
  options,
  value,
  renderEmpty,
  onSelected,
}: SelectWithDropdownProps) => {
  const { t } = useLocalization()

  return (
    <View sx={{ mb: '$3' }}>
      {label && <Label>{`${label} :`}</Label>}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Pressable>
            <Row
              sx={{
                borderWidth: 1,
                borderColor: '$primary.100',
                borderRadius: 12,
                py: 12,
                px: 24,
                justifyContent: 'space-between',
              }}
            >
              <Text sx={{ opacity: value ? 1 : 0.5 }}>
                {value ? value : placeholder}
              </Text>
              <Icon name="down" color="white" />
            </Row>
          </Pressable>
        </DropdownMenu.Trigger>
        <DropdownMenuContent side="bottom" align="end">
          <ScrollView
            contentContainerStyle={{ maxHeight: 300 }}
            indicatorSx={{ bg: 'transparent' }}
            showsVerticalScrollIndicator={false}
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
    </View>
  )
}

export default SelectWithDropdown
