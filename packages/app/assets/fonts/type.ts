export interface UseFontRegistry {
  name: string
  file: any
}

export type FontWeight = 'Regular' | 'Semibold' | 'Bold' | 'Black'

export type FontFamilySet = {
  [key in FontWeight]: UseFontRegistry
}
