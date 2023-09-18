<script setup lang="ts">
import { getMapConfig, maps } from '~/lib/map-config'

const props = defineProps<{ mapName: string }>()

let currentMapConfig = ref({})
let hasMapError = ref(false)

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
  <div class="flex flex-col h-full overflow-hidden">
    <div class="flex items-center py-2 space-x-4 overflow-x-auto overflow-y-hidden container-padding-x">
      <NuxtLink
        v-for="[mapSlug, mapConfig] of Object.entries(maps)"
        :key="mapSlug"
        :to="`/maps/${mapSlug}`"
        class="relative block w-32 h-24 my-2 overflow-hidden border-2 border-transparent rounded map-link shrink-0"
      >
        <img
          :src="`https://assets.battlebitstats.com/maps/${mapSlug}/thumbnail.jpg`"
          class="z-10 rounded image-cover"
        />

        <div class="absolute top-0 bottom-0 left-0 right-0 z-20 bg-gray-900 bg-opacity-40" />

        <span class="absolute left-0 right-0 z-30 px-2 text-center map-link-name top-1">
          {{ mapConfig.name }}
        </span>
      </NuxtLink>
    </div>

    <div class="relative flex-auto w-full h-full">
      <div v-if="hasMapError" class="absolute px-8 py-6 text-center bg-gray-800 rounded position-center">
        <h1 class="text-2xl">{{ $t('mapNotFound') }}</h1>
      </div>

      <template v-else>
        <h1
          class="absolute z-20 py-2 text-xl font-bold tracking-wide text-yellow-100 bg-gray-800 rounded container-padding-x left-4 top-4"
        >
          {{ currentMapConfig.name }}
        </h1>

        <client-only>
          <Map :map-name="props.mapName" class="absolute top-0 bottom-0 left-0 right-0 z-10" />
        </client-only>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map-link.NuxtLink-exact-active {
  @apply border-yellow-100;
  & .map-link-name {
    @apply text-yellow-100;
  }
}

.map-link-name {
  text-shadow: 0px 1px 3px #000;
}
</style>
