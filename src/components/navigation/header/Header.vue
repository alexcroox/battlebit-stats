<script setup lang="ts">
import { faSteamSymbol } from '@fortawesome/free-brands-svg-icons'

const { t } = useI18n()
</script>

<template>
  <nav class="container-padding-x flex items-center justify-between bg-gray-800 py-2 text-white">
    <router-link
      to="/"
      :title="t('home')"
      class="hidden items-center text-xl font-extrabold uppercase tracking-wide sm:flex"
    >
      <img src="/logo-white.png" class="mr-2 h-[20px]" />
      {{ t('battleBitStats') }}
    </router-link>

    <div class="flex items-center space-x-8">
      <div class="flex w-full max-w-xs justify-between sm:w-auto sm:max-w-none sm:space-x-8">
        <NavItem to="/" :label="t('home')" />

        <NavItem to="/stats" :label="t('stats')" />

        <NavItem to="/maps/multu-islands" :exact-path="false" :label="t('maps')" />

        <NavItem to="/weapons" :label="t('weapons')" />
      </div>

      <Button to="https://store.steampowered.com/app/671860/BattleBit_Remastered/" :prefix-icon="faSteamSymbol">
        Play the game
      </Button>
    </div>
  </nav>
</template>
