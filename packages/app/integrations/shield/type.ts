export interface ShieldDeviceResultResponse {
  code: string
  message: string
  result: ShieldDeviceResult
  status: boolean
}

export interface ShieldDeviceResult {
  platform: string
  session_id: string
  timestamp: string
  version: string
  device_intelligence:
    | ShieldDeviceIntelligenceIOS
    | ShieldDeviceIntelligenceAndroid
    | ShieldDeviceIntelligenceWeb
}

export interface ShieldDeviceIntelligenceIOS {
  app_tampering: boolean
  device_score: number
  hooking: boolean
  is_emulated: boolean
  is_jailbroken: boolean
  running_gps_spoofers: boolean
  running_vpn_spoofers: boolean
  shield_id: string
  suspicious_factory_reset: boolean
}

export interface ShieldDeviceIntelligenceAndroid {
  app_tampering: boolean
  auto_clicker_enabled: boolean
  device_score: number
  hooking: boolean
  is_device_masked: boolean
  is_emulated: boolean
  is_jailbroken: boolean
  running_clone_apps: boolean
  running_gps_spoofers: boolean
  running_vpn_spoofers: boolean
  shield_id: string
  suspicious_factory_reset: boolean
  virtual_os: boolean
}

export interface ShieldDeviceIntelligenceWeb {
  shield_id: string
  device_score: number
  is_bot: boolean
  is_incognito: boolean
  is_emulated: boolean
  is_tor: boolean
  is_anti_fingerprinting: boolean
  is_proxy: boolean
}
