// Polyfill for dayjs timezone plugin (Android `Intl` is not supported)
// Unless it is upgraded to RN0.65 and above
import 'intl'
import 'date-time-format-timezone'
import 'intl/locale-data/jsonp/en';

import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
