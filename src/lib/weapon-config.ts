export type ClassWeaponConfig = Record<string, Array<string>>

export interface ClassConfig {
  name: string
  description?: string
  imageName?: string
  weapons: ClassWeaponConfig
}

export interface WeaponConfig {
  weaponType: string
  name: string
  imageName: string
  hasModel?: boolean
  modelFov?: number
}

export const weapons: Record<string, WeaponConfig> = {
  ACR: {
    name: 'ACR',
    imageName: 'ACR',
    hasModel: true,
    modelFov: 2,
    weaponType: 'automatic-rifles'
  },
  AK15: {
    name: 'AK15',
    imageName: 'AK15',
    modelFov: 0.25,
    weaponType: 'automatic-rifles'
  },
  AK74: {
    name: 'AK74',
    imageName: 'AK74',
    hasModel: true,
    modelFov: 40,
    weaponType: 'automatic-rifles'
  },
  AUGA3: {
    name: 'AUGA3',
    imageName: 'AUGA3',
    hasModel: true,
    modelFov: 0.3,
    weaponType: 'automatic-rifles'
  },
  FAL: {
    name: 'FAL',
    imageName: 'FAL',
    weaponType: 'automatic-rifles'
  },
  G36C: {
    name: 'G36C',
    imageName: 'G36C',
    hasModel: true,
    modelFov: 2,
    weaponType: 'automatic-rifles'
  },
  M4A1: {
    name: 'M4A1',
    imageName: 'M4A1',
    hasModel: true,
    modelFov: 0.4,
    weaponType: 'automatic-rifles'
  },
  'Scar-H': {
    name: 'Scar-H',
    imageName: 'Scar-H',
    hasModel: true,
    modelFov: 0.45,
    weaponType: 'automatic-rifles'
  },
  KrissVector: {
    name: 'KrissVector',
    imageName: 'KrissVector',
    weaponType: 'submachine-guns'
  },
  Mp7: {
    name: 'Mp7',
    imageName: 'Mp7',
    weaponType: 'submachine-guns'
  },
  PP2000: {
    name: 'PP2000',
    imageName: 'PP2000',
    weaponType: 'submachine-guns'
  },
  UMP45: {
    name: 'UMP45',
    imageName: 'UMP45',
    weaponType: 'submachine-guns'
  }
}

export const classes: Record<string, ClassConfig> = {
  assault: {
    name: 'Assault',
    description: 'Healz',
    imageName: 'assault',
    weapons: {
      'automatic-rifles': ['ACR', 'AK15', 'AK74', 'AUGA3', 'FAL', 'G36C', 'M4A1', 'Scar-H'],
      'submachine-guns': ['KrissVector', 'Mp7', 'PP2000', 'UMP45']
    }
  },
  medic: {
    name: 'Medic',
    description: 'Healz',
    imageName: 'medic',
    weapons: {
      'automatic-rifles': ['ACR', 'AK15', 'AK74', 'AUGA3', 'FAL', 'G36C', 'M4A1', 'Scar-H'],
      'submachine-guns': ['KrissVector', 'Mp7', 'PP2000', 'UMP45']
    }
  },
  engineer: {
    name: 'Engineer',
    description: 'Healz',
    imageName: 'engineer',
    weapons: {
      'automatic-rifles': ['ACR', 'AK15', 'AK74', 'AUGA3', 'FAL', 'G36C', 'M4A1', 'Scar-H'],
      'submachine-guns': ['KrissVector', 'Mp7', 'PP2000', 'UMP45']
    }
  },
  recon: {
    name: 'Recon',
    description: 'Healz',
    imageName: 'recon',
    weapons: {
      'automatic-rifles': ['ACR', 'AK15', 'AK74', 'AUGA3', 'FAL', 'G36C', 'M4A1', 'Scar-H'],
      'submachine-guns': ['KrissVector', 'Mp7', 'PP2000', 'UMP45']
    }
  },
  support: {
    name: 'Support',
    description: 'Healz',
    imageName: 'support',
    weapons: {
      'automatic-rifles': ['ACR', 'AK15', 'AK74', 'AUGA3', 'FAL', 'G36C', 'M4A1', 'Scar-H'],
      'submachine-guns': ['KrissVector', 'Mp7', 'PP2000', 'UMP45']
    }
  },
  leader: {
    name: 'Leader',
    description: 'Healz',
    imageName: 'leader',
    weapons: {
      'automatic-rifles': ['ACR', 'AK15', 'AK74', 'AUGA3', 'FAL', 'G36C', 'M4A1', 'Scar-H'],
      'submachine-guns': ['KrissVector', 'Mp7', 'PP2000', 'UMP45']
    }
  }
}
