import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from 'app/features/profile'
import ProfileDetails from 'app/features/profile/profile-details'

const Profile = createStackNavigator()

function ProfileNavigation() {
  return (
    <Profile.Navigator>
      <Profile.Screen name="Profile" component={ProfileScreen} />
      <Profile.Screen name="ProfileDetails" component={ProfileDetails} />
    </Profile.Navigator>
  )
}

export default ProfileNavigation
