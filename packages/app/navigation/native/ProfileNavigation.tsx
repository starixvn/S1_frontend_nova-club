import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from 'app/features/profile'
import ProfileDetails from 'app/features/profile/profile-details'
import BankAccountScreen from 'app/features/profile/bank-account'
import AddBankAccountScreen from 'app/features/profile/bank-account/add-bank-account'
import OverviewScreen from 'app/features/profile/overview'
import ManageCredentialsPage from 'app/features/profile/manage-credentials'

const Profile = createStackNavigator<{
  Profile: undefined
  Overview: undefined
  ProfileDetails: undefined
  ManageCredentials: undefined
  BankAccount: undefined
  AddBankAccount: undefined
}>()

function ProfileNavigation() {
  return (
    <Profile.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Profile.Screen name="Profile" component={ProfileScreen} />
      <Profile.Screen name="Overview" component={OverviewScreen} />
      <Profile.Screen name="ProfileDetails" component={ProfileDetails} />
      <Profile.Screen
        name="ManageCredentials"
        component={ManageCredentialsPage}
      />
      <Profile.Screen name="BankAccount" component={BankAccountScreen} />
      <Profile.Screen name="AddBankAccount" component={AddBankAccountScreen} />
    </Profile.Navigator>
  )
}

export default ProfileNavigation
