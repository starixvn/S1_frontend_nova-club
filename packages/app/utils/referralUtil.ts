const bannerCode = ['guzmtvf72', 'wyza958413', 'zmla227708', 'kqvvodl2w']

export function isBannedTrackingCode(tc?: string) {
  return !tc ? false : bannerCode.includes(tc.toLowerCase())
}
