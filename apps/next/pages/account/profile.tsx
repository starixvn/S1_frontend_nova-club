import { DesktopAccountLayout } from 'components/layouts/desktop'
import { ActivityIndicator } from 'dripsy'
import dynamic from 'next/dynamic'

export const LazyScreen = dynamic(
  () => import('app/features/account/profile-details/ProfileDetails'),
  {
    loading: () => <ActivityIndicator />,
    ssr: false,
  }
)

const Profile = LazyScreen

Profile.DesktopLayout = DesktopAccountLayout

export default Profile
