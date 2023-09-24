<script setup lang="ts">
const route = useRoute()
const router = useRouter()

watchEffect(() => {
  if (route.path === '/stats') {
    router.replace('/stats/global')
  }
})
</script>

<template>
  <div class="flex flex-col flex-auto">
    <div class="flex items-center mx-auto mt-2 space-x-4">
      <NuxtLink
        to="/stats/global"
        class="flex items-center justify-between py-1 mt-2 bg-gray-900 border-2 border-transparent rounded navigation-item container-padding-x hover:text-yellow-100"
      >
        Leaderboards
      </NuxtLink>

      <NuxtLink
        to="/stats/clans"
        class="flex items-center justify-between py-1 mt-2 bg-gray-900 border-2 border-transparent rounded navigation-item container-padding-x hover:text-yellow-100"
      >
        Clans
      </NuxtLink>

      <NuxtLink
        to="/stats/player/titan"
        class="flex items-center justify-between py-1 mt-2 bg-gray-900 border-2 border-transparent rounded navigation-item container-padding-x hover:text-yellow-100"
      >
        Player stats
      </NuxtLink>
    </div>

    <NuxtPage class="mt-4" />
  </div>
</template>

<style lang="scss" scoped>
.navigation-item.router-link-active {
  @apply bg-gray-600;
}
</style>
