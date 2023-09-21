<script setup lang="ts">
import { getMapConfig, maps, MapConfig } from '~/lib/mapConfig'
const route = useRoute()
const router = useRouter()

watchEffect(() => {
  if (!route.params.mapName) {
    router.replace('/maps/isle')
  }
})

let mapKey = computed(() => route.params.mapName as string)

let currentMapConfig = ref<MapConfig>({
  name: '',
  bgColor: '',
})

let hasMapError = ref(false)

watchEffect(() => {
  try {
    if (!mapKey.value) {
      return
    }

    currentMapConfig.value = getMapConfig(mapKey.value)
    hasMapError.value = false
  } catch (e) {
    console.error(e)
    hasMapError.value = true
  }
})
</script>

<template>
  <div class="flex flex-col h-full overflow-hidden">
    <div
      v-dragscroll.x
      class="flex items-center py-2 space-x-4 overflow-hidden momentum-scroll container-padding-x"
    >
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

        <span class="absolute left-0 right-0 z-30 px-2 text-center select-none map-link-name top-1">
          {{ mapConfig.name }}
        </span>
      </NuxtLink>
    </div>

    <div class="relative flex-auto w-full h-full">
      <div v-if="hasMapError" class="absolute px-8 py-6 text-center bg-gray-800 rounded position-center">
        <h1 class="text-2xl">{{ $t('mapNotFound') }}</h1>
      </div>

      <NuxtPage v-else :mapKey="mapKey" :mapName="currentMapConfig.name" :mapBgColor="currentMapConfig.bgColor" />
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
