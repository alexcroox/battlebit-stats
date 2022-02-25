<script setup lang="ts">
const props = defineProps<{
  title: string
  stat: string
  suffix: string
}>()
</script>

<template>
  <div class="rounded-md bg-gray-800 px-4 py-2 text-center">
    <h4 class="text-xl text-gray-300 md:text-2xl">{{ title }}</h4>

    <p class="mt-3 mb-2 text-4xl font-semibold">{{ stat }}</p>

    <p class="text-gray-400">{{ suffix }}</p>
  </div>
</template>
