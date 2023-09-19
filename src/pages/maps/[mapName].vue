<script setup lang="ts">
const props = defineProps<{
  mapKey: string
  mapName: string
  mapBgColor: string
}>()
</script>

<template>
  <h1
    class="absolute z-20 py-2 text-xl font-bold tracking-wide text-yellow-100 bg-gray-800 rounded container-padding-x left-4 top-4"
  >
    {{ mapName }}
  </h1>

  <client-only>
    <Map :mapKey="mapKey" :mapBgColor="mapBgColor" class="absolute top-0 bottom-0 left-0 right-0 z-10" />
  </client-only>
</template>
