<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { getMapConfig, MapConfig } from '~/lib/mapConfig'

const props = defineProps<{
  mapBgColor: string
  mapKey: string
}>()

let Leaflet
let tileLayer: L.TileLayer
let map: L.Map

watch(
  () => props.mapKey,
  newMapKey => {
    switchTileLayer(newMapKey)
  },
)

function switchTileLayer(mapKey: string) {
  tileLayer.setUrl(`https://assets.battlebitstats.com/maps/${mapKey}/tiles/{z}/{x}/{y}.jpg`).redraw()

  map.invalidateSize()
  map.setZoom(2)
}

onMounted(async () => {
  Leaflet = await import('leaflet')

  const maxZoom = 6
  const minZoom = window.innerWidth > 1025 ? 2 : 1
  const mapWidth = 4096
  const mapHeight = 4096

  const mapMaxResolution = 0.25
  const mapMinResolution = Math.pow(2, maxZoom) * mapMaxResolution
  const mapExtent = [0, -mapWidth, mapHeight, 0]
  const tileExtent = [0, 0, 16384, 16384]
  const crs = Leaflet.CRS.Simple

  // @ts-ignore
  crs.projection.bounds = new Leaflet.Bounds([tileExtent[0], tileExtent[1]], [tileExtent[2], tileExtent[3]])
  crs.infinite = false
  // @ts-ignore
  crs.transformation = new Leaflet.Transformation(1, -tileExtent[0], -1, tileExtent[3])

  crs.scale = function (zoom: number) {
    return Math.pow(2, zoom) / mapMinResolution
  }
  crs.zoom = function (scale: number) {
    return Math.log(scale * mapMinResolution) / Math.LN2
  }

  map = new Leaflet.Map('map', {
    minZoom,
    maxZoom,
    attributionControl: false,
    zoomControl: false,
    zoomAnimation: true,
    fadeAnimation: true,
    crs,
  })

  Leaflet.control
    .zoom({
      position: 'topright',
    })
    .addTo(map)

  tileLayer = Leaflet.tileLayer(`https://assets.battlebitstats.com/maps/${props.mapKey}/tiles/{z}/{x}/{y}.jpg`, {
    noWrap: true,
    tms: true,
    minZoom,
    maxZoom,
  }).addTo(map)

  map.fitBounds([
    // @ts-ignore
    crs.unproject(Leaflet.point(mapExtent[2], mapExtent[3])),
    // @ts-ignore
    crs.unproject(Leaflet.point(mapExtent[0], mapExtent[1])),
  ])

  map.setView([mapWidth / 2, mapWidth / 2])

  map.on('dragend', function () {
    debugMap()
  })

  map.on('zoomend', function () {
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
  <div id="map" :style="{ backgroundColor: props.mapBgColor }" />
</template>

<style lang="scss" scoped>
.map-link.NuxtLink-exact-active {
  @apply border-2 border-yellow-200;
  & .map-link-name {
    @apply text-yellow-200;
  }
}
</style>
