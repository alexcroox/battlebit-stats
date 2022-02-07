<script setup lang="ts">
import { faSteamSymbol } from '@fortawesome/free-brands-svg-icons'

const { t } = useI18n()
</script>

<template>
  <nav class="flex items-center justify-between bg-gray-800 px-2 py-2 text-white sm:px-4">
    <router-link
      to="/"
      :title="t('home')"
      class="hidden items-center text-xl font-extrabold uppercase tracking-wide text-yellow-50 sm:flex"
    >
      <img src="/logo-white.png" class="mr-2 h-[20px]" />
      {{ t('battleBitStats') }}
    </router-link>

    <div class="flex flex-1 items-center space-x-8 sm:flex-initial">
      <div class="flex w-full justify-between sm:w-auto sm:max-w-none sm:space-x-4 md:space-x-8">
        <NavItem to="/" :label="t('home')" />

        <NavItem to="/maps/multu-islands" :exact-path="false" :label="t('maps')" />

        <NavItem to="/weapons/assault/M4A1" :label="t('weapons')" />

        <NavItem to="/stats" :label="t('playerStats')" class="hidden md:block" />
        <NavItem to="/stats" :label="t('stats')" class="md:hidden" />
      </div>

      <Button
        to="https://store.steampowered.com/app/671860/BattleBit_Remastered/"
        :prefix-icon="faSteamSymbol"
        class="hidden lg:block"
      >
        {{ t('requestAccess') }}
      </Button>
    </div>
  </nav>
</template>
