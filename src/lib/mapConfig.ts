export interface MapConfig {
  bgColor: string
  name: string
  description?: string
  descriptionShort?: string
}

export const maps: Record<string, MapConfig> = {
  azagor: {
    bgColor: '#83633C',
    name: 'Azagor',
    description: 'A desert island with a small town',
  },
  basra: {
    bgColor: '#7292a6',
    name: 'Basra',
    description: "An archipelago with a grounded container ship in the map's center",
  },
  construction: {
    bgColor: '#653F3D',
    name: 'Construction',
    description: 'A coastal, industrial construction site with a symmetrical layout',
  },
  district: {
    bgColor: '#363D2D',
    name: 'District',
    description: 'A rain-shrouded map in a hilly region with factories and military fortifications',
  },
  'dusty-dew': {
    bgColor: '#48321f',
    name: 'Dusty Dew',
    description: 'An arid, mountainous region with scattered settlements',
  },
  eduardovo: {
    bgColor: '#565948',
    name: 'Eduardovo',
    description: 'A forested rural map with farms and abandoned factories',
  },
  frugis: {
    bgColor: '#58573b',
    name: 'Frugis',
    description: 'Urban map featuring cozy, small streets and parks',
  },
  isle: {
    bgColor: '#82969F',
    name: 'Isle',
    description: 'An island with an early-warning radar system used to detect nuclear missile launches',
  },
  kodiak: {
    bgColor: '#5c5a77',
    name: 'Kodiak',
    description: 'Invasion on Alaskan town',
  },
  lonovo: {
    bgColor: '#484D37',
    name: 'Lonovo',
    description: 'A city with extensive railway yards under the cover of night',
  },
  'multu-islands': {
    bgColor: '#38312a',
    name: 'Multu Islands',
    description: 'A small island chain with a fortified military base',
  },
  namak: {
    bgColor: '#695e5a',
    name: 'Namak',
    description: 'A small yet dense urban map dominated by high-rise buildings',
  },
  'oil-dunes': {
    bgColor: '#8b5930',
    name: 'Oil Dunes',
    description: 'A sprawling oil extraction operation in flat, desert region',
  },
  outskirts: {
    bgColor: '#9b9484',
    name: 'Outskirts',
    description: 'Battle the outskirts of Lonovo near the military factory',
  },
  river: {
    bgColor: '#793922',
    name: 'River',
    description: 'A container shipping port on a river',
  },
  salhan: {
    bgColor: '#855B40',
    name: 'Salhan',
    descriptionShort: 'Salhan is an urban-desert map',
    description: 'A desert valley containing an oil refinery and a small town',
  },
  'sandy-sunset': {
    bgColor: '#864A28',
    name: 'Sandy Sunset',
    description: 'Big desert hills and canyons encircle a crowded town',
  },
  'tensa-town': {
    bgColor: '#433f36',
    name: 'Tensa Town',
    description: 'A dense map with narrow residential streets and many low-lying buildings',
  },
  valley: {
    bgColor: '#715d3a',
    name: 'Valley',
    description: 'A nuclear power plant surrounded by wind turbines and prominent hills',
  },
  wakistan: {
    bgColor: '#222812',
    name: 'Wakistan',
    descriptionShort: 'Wakistan is a forest map',
    description: 'Wide valley with long bridges that connect two cliffs',
  },
  'wine-paradise': {
    bgColor: '#613A1E',
    name: 'Wine Paradise',
    description: 'A seaside village surrounded by rural countryside and vineyards',
  },
  // range: {
  //   bgColor: '#9BBAAE',
  //   name: 'Range',
  //   description: 'Shooting range to hone your skills',
  // },
  'zalif-bay': {
    bgColor: '#8a97b0',
    name: 'ZalifBay',
    description: 'A main city in area surrounded by big desert hills and canyons',
  },
}

export function getMapConfig(mapName: string) {
  if (!(mapName in maps)) {
    throw new Error(`Map ${mapName} not found`)
  }

  return maps[mapName]
}
