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
    <div class="relative flex h-3 items-stretch bg-gray-600 p-[1px]">
      <div class="bg-gray-800" :style="{ width: `${percentageComplete}%` }" />
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
