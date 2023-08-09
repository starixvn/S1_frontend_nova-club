import useIsDesktop from 'app/hooks/useIsDesktop'
import React, { ComponentProps } from 'react'
import Select, { SelectProps } from './Select'
import SelectWithCardGrid, {
  SelectWithCardGridProps,
} from './SelectWithCardGrid'
import SelectWithDropdown from './SelectWithDropdown'

type SelectListProps<T> = {
  isGrid?: boolean
} & ComponentProps<typeof SelectWithDropdown> &
  SelectWithCardGridProps<T> &
  SelectProps<T>

const SelectList = <T,>(props: SelectListProps<T>) => {
  const desktop = useIsDesktop()

  const { isGrid, onSelected } = props

  return desktop ? (
    <SelectWithDropdown {...props} />
  ) : isGrid ? (
    <SelectWithCardGrid {...props} />
  ) : (
    <Select {...props} onSelected={(e) => onSelected(e?.value)} />
  )
}

export default SelectList
