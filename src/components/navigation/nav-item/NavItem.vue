<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    to: string
  }>(),
  {
    to: '/',
  },
)
</script>

<template>
  <NuxtLink
    :to="props.to"
    :title="props.label"
    class="px-4 py-1 font-semibold rounded navigation-item hover:text-yellow-100"
  >
    {{ props.label }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
.navigation-item.router-link-active {
  @apply bg-gray-600;
}
</style>
