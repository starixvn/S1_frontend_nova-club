import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from 'app/features/profile'
import ProfileDetails from 'app/features/profile/profile-details'
import ChangePasswordScreen from 'app/features/profile/change-password'
import BankAccountScreen from 'app/features/profile/bank-account'

const Profile = createStackNavigator<{
  Profile: undefined
  ProfileDetails: undefined
  ChangePassword: undefined
  BankAccount: undefined
}>()

function ProfileNavigation() {
  return (
    <Profile.Navigator>
      <Profile.Screen name="Profile" component={ProfileScreen} />
      <Profile.Screen name="ProfileDetails" component={ProfileDetails} />
      <Profile.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Profile.Screen name="BankAccount" component={BankAccountScreen} />
    </Profile.Navigator>
  )
}

export default ProfileNavigation
