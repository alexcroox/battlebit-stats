<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    to: string
  }>(),
  {
    to: '/'
  }
)
</script>

<template>
  <router-link
    :to="props.to"
    :title="props.label"
    class="navigation-item rounded py-1 px-4 font-semibold hover:text-yellow-100"
  >
    {{ props.label }}
  </router-link>
</template>

<style lang="scss" scoped>
.navigation-item.router-link-active {
  @apply bg-gray-600;
}
</style>
