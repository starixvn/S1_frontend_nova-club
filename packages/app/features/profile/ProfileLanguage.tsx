import IconButton from 'app/components/form/IconButton'
import { styled, View } from 'dripsy'
import React, { useState } from 'react'

const ProfileLanguage = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeIconStyle = {
    borderWidth: 4,
    borderColor: 'red',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
  return (
    <StyledView>
      <IconButton
        _icon={{ name: 'sb' }}
        sx={activeIndex === 0 ? activeIconStyle : {}}
        onPress={() => setActiveIndex(0)}
      />
      <View sx={{ mx: '$2' }} />
      <IconButton
        _icon={{ name: 'sb' }}
        sx={activeIndex === 1 ? activeIconStyle : {}}
        onPress={() => setActiveIndex(1)}
      />
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  p: '$12',
}))
export default ProfileLanguage
