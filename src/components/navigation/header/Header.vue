<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <nav class="flex items-stretch justify-between bg-gray-800 px-4 uppercase text-white">
    <router-link to="/" :title="t('home')" class="py-2 font-semibold"> BattleBit Stats </router-link>

    <div class="flex items-stretch justify-between space-x-12">
      <router-link to="/" :title="t('home')" class="navigation-item py-2 font-semibold"> {{ t('home') }}</router-link>
      <router-link to="/stats" :title="t('stats')" class="navigation-item py-2 font-semibold">
        {{ t('stats') }}</router-link
      >
      <router-link to="/maps" :title="t('maps')" class="navigation-item py-2 font-semibold">
        {{ t('maps') }}</router-link
      >
      <router-link to="/weapons" :title="t('weapons')" class="navigation-item py-2 font-semibold">
        {{ t('weapons') }}</router-link
      >
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navigation-item.router-link-active {
  @apply text-gray-600;
}
</style>
