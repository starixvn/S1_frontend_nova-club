import Icon from 'app/components/Icon'
import { View } from 'dripsy'
import { Button } from '.'
import GradientButton from './GradientButton'

const ButtonDemo = () => {
  return (
    <View sx={{ bg: '$darkNavyBlue', flex: 1 }}>
      <Button variant="xs" rounded>
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button variant="sm" rounded>
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button
        textColor="$lightNavyBlue"
        variant="sm"
        rounded
        fill={{ type: 'border', color: '$lightNavyBlue' }}
      >
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button variant="sm">
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button stretch>
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button variant="lg" fill={{ type: 'surface', color: 'orange' }}>
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button
        stretch
        variant="lg"
        fill={{
          type: 'gradient',
          color: 'main',
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
      >
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button variant="lg" fill={{ type: 'surface', color: 'orange' }}>
        <Button.Label>SIGN IN</Button.Label>
      </Button>
      <GradientButton>Sign in</GradientButton>
      <Button
        rounded
        stretch
        variant="lg"
        fill={{
          type: 'gradient',
          color: ['#33A0D0', '#0B76A5'],
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
      >
        <Icon name="lc" size={25} />
        <Button.Label>Add Bank Account</Button.Label>
      </Button>
      {/* make default color works with type defined */}
      <Button
        fill={{
          type: 'gradient',
          color: 'orangeRed',
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        containerStyle={{
          justifyContent: 'flex-start',
        }}
      >
        <Icon name="lc" size={25} />
        <Button.Label sx={{ marginRight: '$5' }}>Add Bank Account</Button.Label>
        <Icon name="lc" size={25} sx={{ marginLeft: 'auto' }} />
      </Button>
      {/* loading */}
      <Button
        loading
        fill={{
          type: 'gradient',
          color: 'orangeRed',
          start: { x: 0, y: 0 },
          end: { x: 1, y: 0 },
        }}
        containerStyle={{
          justifyContent: 'flex-start',
        }}
      >
        <Icon name="lc" size={25} />
        <Button.Label sx={{ marginRight: '$5' }}>Add Bank Account</Button.Label>
        <Icon name="lc" size={25} sx={{ marginLeft: 'auto' }} />
      </Button>
      <Button
        loading
        textColor="$lightNavyBlue"
        variant="sm"
        rounded
        fill={{ type: 'border', color: '$lightNavyBlue' }}
      >
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button loading variant="lg" fill={{ type: 'surface', color: 'orange' }}>
        <Button.Label>asdf</Button.Label>
      </Button>
    </View>
  )
}

export default ButtonDemo
