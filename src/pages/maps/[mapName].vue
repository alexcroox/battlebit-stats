<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { getMapConfig, maps } from '~/lib/map-config'

const props = defineProps<{ mapName: string }>()
const { t } = useI18n()

let currentMapConfig = $ref({})
const currentMapBgColor = $ref('#000')
let hasMapError = false

watchEffect(() => {
  try {
    currentMapConfig = getMapConfig(props.mapName)
  } catch (e) {
    console.error(e)
    hasMapError = true
  }

  console.log({ currentMapConfig })
})

const mapElement = $ref(null)

let tileLayer, map
const maxZoom = 6
const minZoom = 2
const mapWidth = 4096
const mapHeight = 4096

const mapMaxResolution = 0.25
const mapMinResolution = Math.pow(2, maxZoom) * mapMaxResolution
const mapExtent = [0, -mapWidth, mapHeight, 0]
const tileExtent = [0, 0, 16384, 16384]
const crs = L.CRS.Simple

crs.projection.bounds = new L.Bounds([tileExtent[0], tileExtent[1]], [tileExtent[2], tileExtent[3]])
crs.infinite = false
crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3])

crs.scale = function (zoom) {
  return Math.pow(2, zoom) / mapMinResolution
}
crs.zoom = function (scale) {
  return Math.log(scale * mapMinResolution) / Math.LN2
}

watch(
  () => props.mapName,
  (newMapName) => {
    switchTileLayer(newMapName)
  }
)

function switchTileLayer(mapName) {
  tileLayer.setUrl(`/maps/${mapName}/tiles/{z}/{x}/{y}.jpg`).redraw()
  map.invalidateSize()
}

onMounted(() => {
  map = new L.Map(mapElement, {
    minZoom,
    maxZoom,
    attributionControl: false,
    zoomControl: false,
    zoomAnimation: true,
    fadeAnimation: true,
    crs
  })

  L.control
    .zoom({
      position: 'topright'
    })
    .addTo(map)

  tileLayer = L.tileLayer(`/maps/${props.mapName}/tiles/{z}/{x}/{y}.jpg`, {
    noWrap: true,
    tms: true,
    minZoom,
    maxZoom
  }).addTo(map)

  map.fitBounds([
    crs.unproject(L.point(mapExtent[2], mapExtent[3])),
    crs.unproject(L.point(mapExtent[0], mapExtent[1]))
  ])

  map.setView([mapWidth / 2, mapWidth / 2])

  map.on('dragend', function (e) {
    debugMap()
  })

  map.on('zoomend', function (e) {
    debugMap()
  })

  function debugMap() {
    const currentCenter = map.getCenter()
    const currentZoom = map.getZoom()

    /* eslint-disable no-console */
    console.log(currentCenter, currentZoom)
  }
})
</script>

<template>
  <div class="flex h-full flex-col overflow-hidden">
    <div class="container-padding-x flex items-center space-x-4 overflow-x-auto overflow-y-hidden py-2">
      <router-link
        v-for="[mapLinkName] of Object.entries(maps)"
        :key="mapLinkName"
        :to="`/maps/${mapLinkName}`"
        class="map-link relative my-2 block h-24 w-32 shrink-0 overflow-hidden rounded"
      >
        <img :src="`/maps/${mapLinkName}/thumbnail.jpg`" class="image-cover z-20 rounded" />

        <span
          class="map-link-name absolute left-0 right-0 top-0 z-10 rounded-t bg-gray-800 px-1 py-1 text-center text-xs uppercase"
        >
          {{ mapLinkName }}
        </span>
      </router-link>
    </div>

    <div class="relative h-full w-full flex-auto">
      <h1
        class="container-padding-x absolute left-4 top-4 z-20 rounded bg-gray-800 py-2 text-xl font-bold uppercase tracking-wide text-yellow-200"
      >
        {{ props.mapName }}
      </h1>

      <div
        ref="mapElement"
        class="absolute top-0 right-0 bottom-0 left-0 z-10"
        :style="{ backgroundColor: currentMapConfig.bgColor }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map-link.router-link-exact-active {
  @apply border-2 border-yellow-200;
  & .map-link-name {
    @apply text-yellow-200;
  }
}
</style>
