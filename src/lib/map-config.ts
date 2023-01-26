export interface MapConfig {
  bgColor: string
  name: string
  description?: string
  descriptionShort?: string
}

export const maps: Record<string, MapConfig> = {
  isle: {
    bgColor: '#82969F',
    name: 'Isle',
    description: 'Awaiting description'
  },
  basra: {
    bgColor: '#7292a6',
    name: 'Basra',
    description: 'Awaiting description'
  },
  valley: {
    bgColor: '#715d3a',
    name: 'Valley',
    description: 'Awaiting description'
  },
  'sandy-sunset': {
    bgColor: '#864A28',
    name: 'Sandy Sunset',
    description: 'Awaiting description'
  },
  salhan: {
    bgColor: '#855B40',
    name: 'Salhan',
    descriptionShort: 'Salhan is an urban-desert map',
    description:
      'Salhan is an urban-desert map sized at 2x2 km. The origins of the map comes from Iraq. It is more focused on close/medium range combat.'
  },
  district: {
    bgColor: '#363D2D',
    name: 'District',
    description: 'Awaiting description'
  },
  wakistan: {
    bgColor: '#222812',
    name: 'Wakistan',
    descriptionShort: 'Wakistan is a forest map',
    description:
      'Wakistan is a forest map at 2x2 km. The origins of the map come from the mountain of Tebulosmta in Georgia. It has picturesque mountains, forests, and rivers. Its topography gives players who seize hills an advantage over their enemies.'
  },
  lonovo: {
    bgColor: '#484D37',
    name: 'Lonovo',
    description: 'Awaiting description'
  },
  'oil-dunes': {
    bgColor: '#8b5930',
    name: 'Oil Dunes',
    description: 'Awaiting description'
  },
  construction: {
    bgColor: '#653F3D',
    name: 'Construction',
    description: 'Awaiting description'
  },
  eduardovo: {
    bgColor: '#565948',
    name: 'Eduardovo',
    description: 'Awaiting description'
  },
  'dusty-dew': {
    bgColor: '#48321f',
    name: 'Dusty Dew',
    description: 'Awaiting description'
  },
  frugis: {
    bgColor: '#58573b',
    name: 'Frugis',
    description: 'Awaiting description'
  },
  azagor: {
    bgColor: '#83633C',
    name: 'Azagor',
    description: 'Awaiting description'
  },
  river: {
    bgColor: '#793922',
    name: 'River',
    description: 'Awaiting description'
  },
  'wine-paradise': {
    bgColor: '#613A1E',
    name: 'Wine Paradise',
    description: 'Awaiting description'
  },
  'multu-islands': {
    bgColor: '#38312a',
    name: 'Multu Islands',
    description: 'Awaiting description'
  },
  range: {
    bgColor: '#9BBAAE',
    name: 'Range',
    description: 'Awaiting description'
  }
}

export function getMapConfig(mapName: string) {
  if (!(mapName in maps)) {
    throw new Error(`Map ${mapName} not found`)
  }

  return maps[mapName]
}
