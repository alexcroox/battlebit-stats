export interface MapConfig {
  bgColor: string
  name: string
  description?: string
  descriptionShort?: string
}

export const maps: Record<string, MapConfig> = {
  'multu-islands': {
    bgColor: '#535264',
    name: 'Multu Islands',
    description: 'Awaiting description'
  },
  construction: {
    bgColor: '#653F3D',
    name: 'Construction',
    description: 'Awaiting description'
  },
  district: {
    bgColor: '#363D2D',
    name: 'District',
    description: 'Awaiting description'
  },
  salhan: {
    bgColor: '#855B40',
    name: 'Salhan',
    descriptionShort: 'Salhan is an urban-desert map',
    description:
      'Salhan is an urban-desert map sized at 2x2 km. The origins of the map comes from Iraq. It is more focused on close/medium range combat.'
  },
  'sandy-sunset': {
    bgColor: '#864A28',
    name: 'Sandy Sunset',
    description: 'Awaiting description'
  },
  wakistan: {
    bgColor: '#222812',
    name: 'Wakistan',
    descriptionShort: 'Wakistan is a forest map',
    description:
      'Wakistan is a forest map at 2x2 km. The origins of the map come from the mountain of Tebulosmta in Georgia. It has picturesque mountains, forests, and rivers. Its topography gives players who seize hills an advantage over their enemies.'
  },
  range: {
    bgColor: '#9BBAAE',
    name: 'Range',
    description: 'Awaiting description'
  },
  'hot-land': {
    bgColor: '#86542D',
    name: 'Hot Land',
    description: 'Awaiting description'
  }
}

export function getMapConfig(mapName: string) {
  if (!(mapName in maps)) {
    throw new Error(`Map ${mapName} not found`)
  }

  return maps[mapName]
}
