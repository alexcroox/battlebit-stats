<script setup lang="ts">
import { getMapConfig, maps } from '../../lib/map-config'

const props = defineProps<{ mapName: string }>()
const { t } = useI18n()

let currentMapConfig = $ref({})
let hasMapError = $ref(false)

watchEffect(() => {
  try {
    currentMapConfig = getMapConfig(props.mapName)
    hasMapError = false
  } catch (e) {
    console.error(e)
    hasMapError = true
  }
})
</script>

<template>
  <div class="flex h-full flex-col overflow-hidden">
    <div class="container-padding-x flex items-center space-x-4 overflow-x-auto overflow-y-hidden py-2">
      <router-link
        v-for="[mapSlug, mapConfig] of Object.entries(maps)"
        :key="mapSlug"
        :to="`/maps/${mapSlug}`"
        class="map-link relative my-2 block h-24 w-32 shrink-0 overflow-hidden rounded border-2 border-transparent"
      >
        <img
          :src="`https://assets.battlebitstats.com/maps/${mapSlug}/thumbnail.jpg`"
          class="image-cover z-20 rounded"
        />

        <span
          class="map-link-name absolute left-0 right-0 top-0 z-10 rounded-t bg-gray-800 bg-opacity-70 px-1 py-1 text-center text-xs"
        >
          {{ mapConfig.name }}
        </span>
      </router-link>
    </div>

    <div class="relative h-full w-full flex-auto">
      <div v-if="hasMapError" class="position-center absolute rounded bg-gray-800 px-8 py-6 text-center">
        <h1 class="text-2xl">{{ t('mapNotFound') }}</h1>
      </div>

      <template v-else>
        <h1
          class="container-padding-x absolute left-4 top-4 z-20 rounded bg-gray-800 py-2 text-xl font-bold tracking-wide text-yellow-100"
        >
          {{ currentMapConfig.name }}
        </h1>

        <client-only>
          <Map :map-name="props.mapName" class="absolute top-0 right-0 bottom-0 left-0 z-10" />
        </client-only>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map-link.router-link-exact-active {
  @apply border-yellow-100;
  & .map-link-name {
    @apply text-yellow-100;
  }
}
</style>
