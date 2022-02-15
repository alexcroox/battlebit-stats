<script setup lang="ts">
const props = defineProps<{
  total: number
  current: number
}>()

const percentageComplete = computed(() => {
  return Math.round((props.current / props.total) * 100)
})
</script>

<template>
  <div>
    <div class="relative flex h-4 items-stretch bg-gray-400 p-[1px]">
      <div class="bg-gray-600" :style="{ width: `${percentageComplete}%` }" />
    </div>

    <p class="mt-1 flex items-center justify-between text-gray-400">
      <span class="flex items-center">
        <span class="text-gray-200">{{ props.current.toLocaleString() }}</span>
        <span class="mx-1">/</span>
        {{ props.total.toLocaleString() }}
      </span>

      <slot name="prefix" />
    </p>
  </div>
</template>
