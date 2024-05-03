import RewardLauncher from 'app/features/rewards/Launcher/RewardGameLauncher'
import { useRouter } from 'next/router'
import { usePlayerProfileQuery } from 'services/playerApi'

const Launcher = () => {
  const { replace } = useRouter()
  const { data: profileData } = usePlayerProfileQuery()
  const disableEvent = !!profileData?.disabled_event ?? false

  if (disableEvent) replace('/rewards/redeem/list')
  return <RewardLauncher />
}

export default Launcher
