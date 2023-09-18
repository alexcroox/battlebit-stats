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
    class="navigation-item rounded py-1 px-4 font-semibold hover:text-yellow-100"
  >
    {{ props.label }}
  </NuxtLink>
</template>

<style lang="scss" scoped>
.navigation-item.NuxtLink-active {
  @apply bg-gray-600;
}
</style>
