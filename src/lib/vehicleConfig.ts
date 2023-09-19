export interface VehicleConfig {
  name: string
  imageName: string
  hasModel?: boolean
  modelFov?: number
}

export const vehicles: Record<string, VehicleConfig> = {
  BTR_82: {
    name: 'BTR_82',
    imageName: 'BTR_82',
    hasModel: false
  },
  GasTiger: {
    name: 'GasTiger',
    imageName: 'GasTiger',
    hasModel: false
  },
  humvee: {
    name: 'humvee',
    imageName: 'humvee',
    hasModel: false
  },
  LAV_25: {
    name: 'LAV_25',
    imageName: 'LAV_25',
    hasModel: false
  },
  M1Abrams: {
    name: 'M1Abrams',
    imageName: 'M1Abrams',
    hasModel: false
  },
  PWC: {
    name: 'PWC',
    imageName: 'PWC',
    hasModel: false
  },
  quad: {
    name: 'quad',
    imageName: 'quad',
    hasModel: false
  },
  T90: {
    name: 'T90',
    imageName: 'T90',
    hasModel: false
  }
}
