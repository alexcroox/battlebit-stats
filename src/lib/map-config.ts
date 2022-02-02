type MapConfig = Record<
  string,
  {
    bgColor: string
  }
>

export const maps: MapConfig = {
  'mutlu-islands': {
    bgColor: '#535264'
  },
  construction: {
    bgColor: '#653F3D'
  },
  district: {
    bgColor: '#363D2D'
  },
  salhan: {
    bgColor: '#855B40'
  },
  'sandy-sunset': {
    bgColor: '#864A28'
  },
  wakistan: {
    bgColor: '#222812'
  },
  range: {
    bgColor: '#222812'
  },
  'hot-land': {
    bgColor: '#86542D'
  }
}

export function getMapConfig(mapName: string) {
  if (!(mapName in maps)) {
    throw new Error(`Map ${mapName} not found`)
  }

  return maps[mapName]
}
