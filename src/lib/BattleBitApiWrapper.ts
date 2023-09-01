const API_URL = 'https://publicapi.battlebit.cloud/Servers/GetServerList'

enum GameMode {
  TDM = 'TDM',
  CONQ = 'CONQ',
  VoxelFortify = 'VoxelFortify',
  FRONTLINE = 'FRONTLINE',
  DOMI = 'DOMI',
  CaptureTheFlag = 'CaptureTheFlag',
  INFCONQ = 'INFCONQ',
  RUSH = 'RUSH',
  VoxelTrench = 'VoxelTrench',
  FFA = 'FFA',
  ELI = 'ELI'
}

enum MapSize {
  Tiny = 'Tiny',
  Big = 'Big',
  Ultra = 'Ultra',
  Medium = 'Medium',
  Small = 'Small'
}

enum DayNight {
  Day = 'Day',
  Night = 'Night'
}

enum Anticheat {
  None = 'None',
  EAC = 'EAC'
}

export interface Server {
  Name: string
  Map: string
  MapSize: MapSize
  Gamemode: GameMode
  Players: number
  QueuePlayers: number
  MaxPlayers: number
  Hz: number
  DayNight: DayNight
  IsOfficial: boolean
  HasPassword: boolean
  Anticheat: Anticheat
  Build: string
}

export const getServerList = async (): Promise<Server[]> => {
  const response = await fetch(API_URL)
  const data = await response.json()

  return data
}

export interface PopulationStats {
  playerCount: number
  queueCount: number
  serverCount: number
}

export const getCurrentPopulationStats = async (): Promise<PopulationStats> => {
  const servers = await getServerList()
  const playerCount = servers.reduce((acc, server) => acc + server.Players, 0)
  const queueCount = servers.reduce((acc, server) => acc + server.QueuePlayers, 0)

  return {
    playerCount,
    queueCount,
    serverCount: servers.length
  }
}
