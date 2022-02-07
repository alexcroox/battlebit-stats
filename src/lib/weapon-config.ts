export type ClassWeaponConfig = Record<string, Array<string>>

export interface ClassConfig {
  name: string
  description?: string
  imageName?: string
  demoWeapon: string
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
    hasModel: true,
    modelFov: 0.8,
    weaponType: 'submachine-guns'
  },
  Mp7: {
    name: 'Mp7',
    imageName: 'Mp7',
    hasModel: true,
    modelFov: 0.8,
    weaponType: 'submachine-guns'
  },
  PP2000: {
    name: 'PP2000',
    imageName: 'PP2000',
    hasModel: true,
    modelFov: 3,
    weaponType: 'submachine-guns'
  },
  UMP45: {
    name: 'UMP45',
    imageName: 'UMP45',
    hasModel: true,
    modelFov: 0.4,
    weaponType: 'submachine-guns'
  },
  MK20: {
    name: 'MK20',
    imageName: 'MK20',
    hasModel: true,
    modelFov: 4,
    weaponType: 'marksman-rifles'
  },
  M110: {
    name: 'M110',
    imageName: 'M110',
    hasModel: true,
    modelFov: 4,
    weaponType: 'marksman-rifles'
  },
  MK14: {
    name: 'MK14',
    imageName: 'MK14',
    hasModel: true,
    modelFov: 5,
    weaponType: 'marksman-rifles'
  },
  HoneyBadger: {
    name: 'Honey Badger',
    imageName: 'HoneyBadger',
    hasModel: true,
    modelFov: 1,
    weaponType: 'personal-defence'
  },
  ASVAL: {
    name: 'AS VAL',
    imageName: 'ASVAL',
    hasModel: true,
    modelFov: 0.2,
    weaponType: 'carbines'
  },
  L86A1: {
    name: 'L86A1',
    imageName: 'L86A1',
    hasModel: true,
    modelFov: 0.45,
    weaponType: 'light-support-guns'
  },
  M249: {
    name: 'M249',
    imageName: 'M249',
    hasModel: true,
    modelFov: 2,
    weaponType: 'light-support-guns'
  },
  SSG69: {
    name: 'SSG69',
    imageName: 'SSG69',
    hasModel: true,
    modelFov: 0.4,
    weaponType: 'sniper-rifles'
  },
  SV98: {
    name: 'SV-98',
    imageName: 'SV98',
    weaponType: 'sniper-rifles'
  },
  L96: {
    name: 'L96',
    imageName: 'L96',
    hasModel: true,
    modelFov: 0.4,
    weaponType: 'sniper-rifles'
  },
  M200: {
    name: 'M200',
    imageName: 'M200',
    weaponType: 'sniper-rifles'
  }
}

export const classes: Record<string, ClassConfig> = {
  leader: {
    name: 'Leader',
    description: 'Leader',
    imageName: 'leader',
    demoWeapon: 'Scar-H',
    weapons: {
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C'],
      'marksman-rifles': ['MK20', 'M110', 'MK14']
    }
  },
  assault: {
    name: 'Assault',
    description: 'Assault',
    imageName: 'assault',
    demoWeapon: 'M4A1',
    weapons: {
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C'],
      'submachine-guns': ['KrissVector', 'Mp7', 'PP2000', 'UMP45']
    }
  },
  medic: {
    name: 'Medic',
    description: 'Healz',
    imageName: 'medic',
    demoWeapon: 'HoneyBadger',
    weapons: {
      'personal-defence': ['HoneyBadger'],
      carbines: ['ASVAL'],
      'submachine-guns': ['Mp7', 'UMP45', 'PP2000', 'KrissVector'],
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C']
    }
  },
  engineer: {
    name: 'Engineer',
    description: 'Engineer',
    imageName: 'engineer',
    demoWeapon: 'UMP45',
    weapons: {
      'submachine-guns': ['KrissVector', 'Mp7', 'PP2000', 'UMP45'],
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C'],
      'marksman-rifles': ['MK20', 'M110', 'MK14'],
      'personal-defence': ['HoneyBadger'],
      carbines: ['ASVAL']
    }
  },
  support: {
    name: 'Support',
    description: 'Support',
    imageName: 'support',
    demoWeapon: 'M249',
    weapons: {
      'light-support-guns': ['L86A1', 'M249']
    }
  },
  recon: {
    name: 'Recon',
    description: 'Recon',
    imageName: 'recon',
    demoWeapon: 'L96',
    weapons: {
      'sniper-rifles': ['SSG69', 'SV98', 'L96', 'M200'],
      'marksman-rifles': ['MK20', 'M110', 'MK14'],
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C']
    }
  }
}
