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
  unlockLevel?: number
}

export const weapons: Record<string, WeaponConfig> = {
  ACR: {
    name: 'ACR',
    imageName: 'ACR',
    hasModel: true,
    modelFov: 2,
    weaponType: 'automatic-rifles',
    unlockLevel: 18
  },
  AK15: {
    name: 'AK-15',
    imageName: 'AK15',
    modelFov: 0.25,
    weaponType: 'automatic-rifles',
    unlockLevel: 10
  },
  AK74: {
    name: 'AK-74',
    imageName: 'AK74',
    hasModel: true,
    modelFov: 40,
    weaponType: 'automatic-rifles',
    unlockLevel: 0
  },
  AUGA3: {
    name: 'AUG A3',
    imageName: 'AUGA3',
    hasModel: true,
    modelFov: 0.3,
    weaponType: 'automatic-rifles',
    unlockLevel: 19
  },
  FAL: {
    name: 'FAL',
    imageName: 'FAL',
    weaponType: 'automatic-rifles',
    unlockLevel: 22
  },
  G36C: {
    name: 'G36C',
    imageName: 'G36C',
    hasModel: true,
    modelFov: 2,
    weaponType: 'automatic-rifles',
    unlockLevel: 25
  },
  FAMAS: {
    name: 'FAMAS',
    imageName: 'FAMAS',
    unlockLevel: 28,
    weaponType: 'automatic-rifles'
  },
  M4A1: {
    name: 'M4A1',
    imageName: 'M4A1',
    hasModel: true,
    modelFov: 0.4,
    weaponType: 'automatic-rifles',
    unlockLevel: 0
  },
  'Scar-H': {
    name: 'SCAR-H',
    imageName: 'Scar-H',
    hasModel: true,
    modelFov: 0.45,
    weaponType: 'automatic-rifles',
    unlockLevel: 10
  },
  Mp7: {
    name: 'MP7',
    imageName: 'Mp7',
    hasModel: true,
    modelFov: 0.8,
    weaponType: 'submachine-guns',
    unlockLevel: 0
  },
  UMP45: {
    name: 'UMP-45',
    imageName: 'UMP45',
    hasModel: true,
    modelFov: 0.4,
    weaponType: 'submachine-guns',
    unlockLevel: 0
  },
  PP2000: {
    name: 'PP-2000',
    imageName: 'PP2000',
    hasModel: true,
    modelFov: 3,
    weaponType: 'submachine-guns',
    unlockLevel: 13
  },
  KrissVector: {
    name: 'Kriss Vector',
    imageName: 'KrissVector',
    hasModel: true,
    modelFov: 0.8,
    weaponType: 'submachine-guns',
    unlockLevel: 35
  },
  MP5: {
    name: 'MP5',
    imageName: 'MP5',
    weaponType: 'submachine-guns',
    unlockLevel: 43
  },
  MK20: {
    name: 'MK-20',
    imageName: 'MK20',
    hasModel: true,
    modelFov: 4,
    weaponType: 'marksman-rifles',
    unlockLevel: 6
  },
  M110: {
    name: 'M110',
    imageName: 'M110',
    hasModel: true,
    modelFov: 4,
    weaponType: 'marksman-rifles',
    unlockLevel: 20
  },
  MK14: {
    name: 'MK-14 EBR',
    imageName: 'MK14',
    hasModel: true,
    modelFov: 5,
    weaponType: 'marksman-rifles',
    unlockLevel: 50
  },
  HoneyBadger: {
    name: 'Honey Badger',
    imageName: 'HoneyBadger',
    hasModel: true,
    modelFov: 1,
    weaponType: 'personal-defence',
    unlockLevel: 40
  },
  ASVAL: {
    name: 'AS VAL',
    imageName: 'ASVAL',
    hasModel: true,
    modelFov: 0.2,
    weaponType: 'carbines',
    unlockLevel: 40
  },
  L86A1: {
    name: 'L86A1',
    imageName: 'L86A1',
    hasModel: true,
    modelFov: 0.45,
    weaponType: 'light-support-guns',
    unlockLevel: 0
  },
  M249: {
    name: 'M249',
    imageName: 'M249',
    hasModel: true,
    modelFov: 2,
    weaponType: 'light-support-guns',
    unlockLevel: 0
  },
  SSG69: {
    name: 'SSG 69',
    imageName: 'SSG69',
    hasModel: true,
    modelFov: 0.4,
    weaponType: 'sniper-rifles',
    unlockLevel: 0
  },
  SV98: {
    name: 'SV-98',
    imageName: 'SV98',
    weaponType: 'sniper-rifles',
    unlockLevel: 8
  },
  L96: {
    name: 'L96',
    imageName: 'L96',
    hasModel: true,
    modelFov: 0.4,
    weaponType: 'sniper-rifles',
    unlockLevel: 27
  },
  M200: {
    name: 'M200',
    imageName: 'M200',
    weaponType: 'sniper-rifles',
    unlockLevel: 32
  },
  M9: {
    name: 'M9',
    imageName: 'M9',
    unlockLevel: 0,
    weaponType: 'pistols'
  },
  MP443: {
    name: 'MP443',
    imageName: 'M9',
    unlockLevel: 0,
    weaponType: 'pistols'
  },
  USP: {
    name: 'USP',
    imageName: 'USP',
    unlockLevel: 7,
    weaponType: 'pistols'
  },
  UNICA: {
    name: 'UNICA',
    imageName: 'UNICA',
    hasModel: true,
    modelFov: 1,
    unlockLevel: 12,
    weaponType: 'pistols'
  },
  GLOCK18: {
    name: 'GLOCK 18',
    imageName: 'GLOCK18',
    unlockLevel: 13,
    weaponType: 'pistols'
  },
  'DESERT-EAGLE': {
    name: 'Desert Eagle',
    imageName: 'DESERT-EAGLE',
    unlockLevel: 60,
    weaponType: 'pistols'
  },
  Pickaxe: {
    name: 'Pickaxe',
    imageName: 'Pickaxe',
    unlockLevel: 0,
    weaponType: 'misc'
  },
  Sledgehammer: {
    name: 'Sledgehammer',
    imageName: 'Sledgehammer',
    unlockLevel: 0,
    weaponType: 'misc'
  }
}

export const classes: Record<string, ClassConfig> = {
  leader: {
    name: 'Leader',
    description: 'Leader',
    imageName: 'leader',
    demoWeapon: 'Scar-H',
    weapons: {
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C', 'FAMAS'],
      'marksman-rifles': ['MK20', 'M110', 'MK14'],
      pistols: ['M9', 'MP443', 'USP', 'UNICA', 'GLOCK18', 'DESERT-EAGLE']
    }
  },
  assault: {
    name: 'Assault',
    description: 'Assault',
    imageName: 'assault',
    demoWeapon: 'M4A1',
    weapons: {
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C', 'FAMAS'],
      'submachine-guns': ['Mp7', 'UMP45', 'PP2000', 'KrissVector', 'MP5'],
      pistols: ['M9', 'MP443', 'USP', 'UNICA', 'GLOCK18', 'DESERT-EAGLE']
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
      'submachine-guns': ['Mp7', 'UMP45', 'PP2000', 'KrissVector', 'MP5'],
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C', 'FAMAS'],
      pistols: ['M9', 'MP443', 'USP', 'UNICA', 'GLOCK18', 'DESERT-EAGLE']
    }
  },
  engineer: {
    name: 'Engineer',
    description: 'Engineer',
    imageName: 'engineer',
    demoWeapon: 'UMP45',
    weapons: {
      'submachine-guns': ['Mp7', 'UMP45', 'PP2000', 'KrissVector', 'MP5'],
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C', 'FAMAS'],
      'marksman-rifles': ['MK20', 'M110', 'MK14'],
      'personal-defence': ['HoneyBadger'],
      carbines: ['ASVAL'],
      pistols: ['M9', 'MP443', 'USP', 'UNICA', 'GLOCK18', 'DESERT-EAGLE']
    }
  },
  support: {
    name: 'Support',
    description: 'Support',
    imageName: 'support',
    demoWeapon: 'M249',
    weapons: {
      'light-support-guns': ['L86A1', 'M249'],
      pistols: ['M9', 'MP443', 'USP', 'UNICA', 'GLOCK18', 'DESERT-EAGLE']
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
      'automatic-rifles': ['M4A1', 'AK74', 'Scar-H', 'AK15', 'ACR', 'AUGA3', 'FAL', 'G36C', 'FAMAS'],
      pistols: ['M9', 'MP443', 'USP', 'UNICA', 'GLOCK18', 'DESERT-EAGLE']
    }
  }
}
