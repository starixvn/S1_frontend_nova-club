import { View } from 'dripsy'
import { Button } from '.'

const ButtonDemo = () => {
  return (
    <View sx={{ bg: '$darkNavyBlue' }}>
      <Button variant="sm" roundness="sm">
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button
        textColor="$lightNavyBlue"
        variant="sm"
        roundness="lg"
        fill={{ type: 'border', color: '$lightNavyBlue' }}
      >
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button variant="sm" roundness>
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button roundness stretch>
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button variant="lg" fill={{ type: 'surface', color: 'orange' }}>
        <Button.Label>asdf</Button.Label>
      </Button>
      <Button
        stretch
        roundness="lg"
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
    </View>
  )
}

export default ButtonDemo
