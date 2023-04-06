import Button from 'agent/components/Button'
import { useAgentLocalization } from 'app/provider/localization'
import { styled, useDripsyTheme, View } from 'dripsy'
import { GestureResponderEvent } from 'react-native'

interface FilterButtonSelectionProps {
  resetFilter: (event: GestureResponderEvent) => void
  handleConfirm: (event: GestureResponderEvent) => void
}

const FilterButtonSelection = ({
  resetFilter,
  handleConfirm,
}: FilterButtonSelectionProps) => {
  const { t } = useAgentLocalization()
  const { theme } = useDripsyTheme()
  return (
    <FilterButtonContainer>
      <Button
        elevation={1}
        leftIcon={{
          name: 'remove-filter',
          color: theme.colors.$primaryAgent,
        }}
        titleProps={{
          sx: {
            fontWeight: 'bold',
            color: theme.colors.$primaryAgent,
          },
        }}
        sx={{
          bg: 'white',
          borderColor: theme.colors.$primaryAgent,
          borderWidth: 1,
          shadowColor: '$darkBlueAgent',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        }}
        onPress={resetFilter}
      >
        {t('common.reset')}
      </Button>
      <Button
        elevation={1}
        leftIcon={{
          name: 'search',
        }}
        titleProps={{
          sx: {
            fontWeight: 'bold',
          },
        }}
        sx={{
          shadowColor: '$darkBlueAgent',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.8,
          shadowRadius: 5,
        }}
        onPress={handleConfirm}
      >
        {t('common.search')}
      </Button>
    </FilterButtonContainer>
  )
}

const FilterButtonContainer = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  py: '$4',
})

export default FilterButtonSelection
