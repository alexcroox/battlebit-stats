export interface MapConfig {
  bgColor: string
  name: string
}

export const maps: Record<string, MapConfig> = {
  'multu-islands': {
    bgColor: '#535264',
    name: 'Multu Islands'
  },
  construction: {
    bgColor: '#653F3D',
    name: 'Construction'
  },
  district: {
    bgColor: '#363D2D',
    name: 'District'
  },
  salhan: {
    bgColor: '#855B40',
    name: 'Salhan'
  },
  'sandy-sunset': {
    bgColor: '#864A28',
    name: 'Sandy Sunset'
  },
  wakistan: {
    bgColor: '#222812',
    name: 'Wakistan'
  },
  range: {
    bgColor: '#222812',
    name: 'Range'
  },
  'hot-land': {
    bgColor: '#86542D',
    name: 'Hot Land'
  }
}

export function getMapConfig(mapName: string) {
  if (!(mapName in maps)) {
    throw new Error(`Map ${mapName} not found`)
  }

  return maps[mapName]
}
