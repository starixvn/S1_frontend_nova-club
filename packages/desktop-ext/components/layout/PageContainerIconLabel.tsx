import Icon from 'app/components/Icon'
import SectionHeader from 'app/components/SectionHeader'
import SectionLabel from 'app/components/SectionLabel'
import { Text, View } from 'dripsy'

export type PageContainerIconlabelProps = {
  icon: string
  text: string
}

const PageContainerIconlabel = ({
  icon,
  text,
}: PageContainerIconlabelProps) => {
  return (
    <View
      sx={{
        width: '100%',
        flexDirection: 'row',
        p: '$2',
        backgroundColor: '$primary.300',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
    >
      <SectionLabel
        sx={{ gap: '$1' }}
        icon={icon}
        title={text}
        titleProps={{
          sx: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
      />
    </View>
  )
}

export default PageContainerIconlabel
