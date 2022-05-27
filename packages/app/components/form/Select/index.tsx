import { DripsyGradient, DripsyGradientProps } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { mergeRefs } from 'app/uitls/mergeRefs'
import { Pressable, SxProp, Text, useDripsyTheme, View } from 'dripsy'
import React, {
  ComponentProps,
  Dispatch,
  forwardRef,
  SetStateAction,
  useRef,
  useState,
} from 'react'
import { Dimensions, Platform } from 'react-native'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'
import SelectButton from './SelectButton'
import SelectLists from './SelectLists'

type ActionSheetProps = ComponentProps<typeof ActionSheet>
type ButtonProps = ComponentProps<typeof SelectButton>

interface SelectProps {
  actionSheetContentProps?: DripsyGradientProps
  actionSheetProps?: ActionSheetProps
  button?: ({
    openActionSheet,
  }: {
    openActionSheet: () => any
  }) => React.ReactNode
  buttonProps?: Omit<ButtonProps, 'title' | 'onOpen'>
  buttonTitle?: string
  children?: React.ReactNode
  data: any[]
  headerProps?: DripsyGradientProps
  headerTitle?: string | number
  setSelectedValue: Dispatch<SetStateAction<any>>
}

const DEFAULT_ACTION_SHEET_ID = 'select'

const Select = (
  {
    actionSheetContentProps,
    actionSheetProps,
    button,
    buttonProps,
    buttonTitle = '',
    children,
    data,
    headerProps,
    headerTitle,
    setSelectedValue,
  }: SelectProps,
  ref: any
) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const _ref = useRef(null)

  const mergedRef = mergeRefs([_ref, ref])

  const { theme } = useDripsyTheme()
  const { bottom } = useSafeArea()

  const {
    CustomHeaderComponent,
    id: actionSheetId,
    containerStyle,
    ...restActionSheetProps
  } = actionSheetProps || {}
  const { sx: headerSx, ...restHeaderProps } = headerProps || {}
  const { sx: contentSx, ...restContentProps } = actionSheetContentProps || {}

  const mergedHeaderSx: SxProp = {
    ...{
      backgroundColor: '$darkNavyBlue',
      borderColor: '$navyBlue2',
      borderWidth: 1,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      borderBottomColor: '$lightNavyBlue',
      borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      py: '$6',
      px: 45,
    },
    ...headerSx,
  }

  const mergedContainerStyle: typeof containerStyle = {
    ...{
      backgroundColor: theme.colors.$secondary,
      borderTopStartRadius: 12,
      borderTopEndRadius: 12,
      overflow: 'hidden',
    },
    ...containerStyle,
  }

  const mergedActionSheetContentStyle: SxProp = {
    ...{
      pb: bottom,
      maxHeight: Dimensions.get('window').height * 0.5,
    },
    ...contentSx,
  }

  const onActionSheetClose = async () => {
    await SheetManager.hide(actionSheetId ?? DEFAULT_ACTION_SHEET_ID)
  }

  const HeaderComponent = CustomHeaderComponent ?? (
    <DripsyGradient sx={mergedHeaderSx} {...restHeaderProps}>
      <Text
        sx={{
          fontWeight: 'bold',
          fontSize: 22,
          textAlign: 'center',
        }}
        numberOfLines={1}
      >
        {headerTitle}
      </Text>

      <Pressable
        sx={{ position: 'absolute', right: '$12' }}
        onPress={onActionSheetClose}
      >
        <Icon name={'cross'} size={25}></Icon>
      </Pressable>
    </DripsyGradient>
  )

  const openActionSheet = () => {
    SheetManager.show(actionSheetId ?? DEFAULT_ACTION_SHEET_ID)
  }

  return (
    <>
      {!!button ? (
        button({ openActionSheet })
      ) : (
        <SelectButton
          onOpen={openActionSheet}
          title={buttonTitle}
          {...buttonProps}
        />
      )}

      <ActionSheet
        ref={mergedRef}
        id={actionSheetId ?? DEFAULT_ACTION_SHEET_ID}
        gestureEnabled={Platform.OS === 'web' ? false : true}
        CustomHeaderComponent={HeaderComponent}
        headerAlwaysVisible={true}
        extraScroll={10}
        containerStyle={mergedContainerStyle}
        {...restActionSheetProps}
      >
        <DripsyGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          sx={mergedActionSheetContentStyle}
          {...restContentProps}
        >
          {children ?? (
            <SelectLists
              actionSheetRef={_ref}
              data={data}
              onPress={onActionSheetClose}
              selectedIndex={selectedIndex}
              setSelectedValue={setSelectedValue}
              setSelectedIndex={setSelectedIndex}
            />
          )}
        </DripsyGradient>
      </ActionSheet>
    </>
  )
}

export default forwardRef(Select)
