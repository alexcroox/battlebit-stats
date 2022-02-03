<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import Leaflet from 'leaflet'
import { getMapConfig } from '~/lib/map-config'

const props = defineProps<{ mapName: string }>()
const { t } = useI18n()

let currentMapConfig = $ref({})

watchEffect(() => {
  currentMapConfig = getMapConfig(props.mapName)
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
const crs = Leaflet.CRS.Simple

crs.projection.bounds = new Leaflet.Bounds([tileExtent[0], tileExtent[1]], [tileExtent[2], tileExtent[3]])
crs.infinite = false
crs.transformation = new Leaflet.Transformation(1, -tileExtent[0], -1, tileExtent[3])

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
  map = new Leaflet.Map(mapElement, {
    minZoom,
    maxZoom,
    attributionControl: false,
    zoomControl: false,
    zoomAnimation: true,
    fadeAnimation: true,
    crs
  })

  Leaflet.control
    .zoom({
      position: 'topright'
    })
    .addTo(map)

  tileLayer = Leaflet.tileLayer(`/maps/${props.mapName}/tiles/{z}/{x}/{y}.jpg`, {
    noWrap: true,
    tms: true,
    minZoom,
    maxZoom
  }).addTo(map)

  map.fitBounds([
    crs.unproject(Leaflet.point(mapExtent[2], mapExtent[3])),
    crs.unproject(Leaflet.point(mapExtent[0], mapExtent[1]))
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
  <div ref="mapElement" :style="{ backgroundColor: currentMapConfig.bgColor }" />
</template>

<style lang="scss" scoped>
.map-link.router-link-exact-active {
  @apply border-2 border-yellow-200;
  & .map-link-name {
    @apply text-yellow-200;
  }
}
</style>
