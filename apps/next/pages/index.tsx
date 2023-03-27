import HomeScreen from 'app/features/home/screen'
import layouts from '../layouts'

// @ts-expect-error: To be fix
HomeScreen.getLayout = layouts.TAB()
export default HomeScreen
