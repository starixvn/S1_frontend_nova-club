import React, { useMemo } from 'react'
import { DropdownMenu } from './Dropdown'
import Text from './Text'
import { Row, SxProp, View } from 'dripsy'
import Icon from './Icon'

export type DropdownOption<T> = {
  label: string
  value: T
}

type Props<T> = {
  options: DropdownOption<T>[]
  onChange: (v: T) => void
  value: T
  labelSx?: SxProp
}

export default function HeaderDropdown<T>({
  value,
  onChange,
  options,
  labelSx,
}: Props<T>) {
  const label = useMemo(() => {
    return options.find((o) => o.value === value)?.label ?? ''
  }, [options, value])
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Row sx={{ alignItems: 'center', color: 'white', gap: '$1' }}>
          <Text sx={{ color: 'white', fontWeight: 'bold', ...labelSx }}>
            {label}
          </Text>
          <Icon name="arrow-down" size={12} color="$secondaryAgent" />
        </Row>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {options.map((o, i) => {
          return (
            <>
              <DropdownMenu.Item key="a" onSelect={() => onChange(o.value)}>
                <DropdownMenu.ItemTitle>{o.label}</DropdownMenu.ItemTitle>
              </DropdownMenu.Item>
              {i < options.length - 1 && <DropdownMenu.Separator />}
            </>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
