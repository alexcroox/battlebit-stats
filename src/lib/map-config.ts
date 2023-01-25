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
  district: {
    bgColor: '#363D2D',
    name: 'District',
    description: 'Awaiting description'
  },
  valley: {
    bgColor: '#000',
    name: 'Valley',
    description: 'Awaiting description'
  },
  eduardovo: {
    bgColor: '#3B4633',
    name: 'Eduardovo',
    description: 'Awaiting description'
  },
  salhan: {
    bgColor: '#855B40',
    name: 'Salhan',
    descriptionShort: 'Salhan is an urban-desert map',
    description:
      'Salhan is an urban-desert map sized at 2x2 km. The origins of the map comes from Iraq. It is more focused on close/medium range combat.'
  },
  'dusty-dew': {
    bgColor: '#3F3023',
    name: 'Dusty Dew',
    description: 'Awaiting description'
  },
  'sandy-sunset': {
    bgColor: '#864A28',
    name: 'Sandy Sunset',
    description: 'Awaiting description'
  },
  'wine-paradise': {
    bgColor: '#613A1E',
    name: 'Wine Paradise',
    description: 'Awaiting description'
  },
  wakistan: {
    bgColor: '#222812',
    name: 'Wakistan',
    descriptionShort: 'Wakistan is a forest map',
    description:
      'Wakistan is a forest map at 2x2 km. The origins of the map come from the mountain of Tebulosmta in Georgia. It has picturesque mountains, forests, and rivers. Its topography gives players who seize hills an advantage over their enemies.'
  },
  construction: {
    bgColor: '#653F3D',
    name: 'Construction',
    description: 'Awaiting description'
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
  },
  isle: {
    bgColor: '#7b8c91',
    name: 'Isle',
    description: 'Awaiting description'
  },
  azagor: {
    bgColor: '#7e5a35',
    name: 'Azagor',
    description: 'Awaiting description'
  },
  lonovo: {
    bgColor: '#4c4e44',
    name: 'Lonovo',
    description: 'Awaiting description'
  }
}

export function getMapConfig(mapName: string) {
  if (!(mapName in maps)) {
    throw new Error(`Map ${mapName} not found`)
  }

  return maps[mapName]
}
