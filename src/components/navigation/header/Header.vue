<script setup lang="ts">
import { faSteamSymbol } from '@fortawesome/free-brands-svg-icons'
import { faServer, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import type { PopulationStats } from '~/lib/BattleBitApiWrapper'
import { getCurrentPopulationStats } from '~/lib/BattleBitApiWrapper'

const populationStats = $ref<PopulationStats>({})
const refreshPopulationStats = async () => {
  try {
    const stats = await getCurrentPopulationStats()
    populationStats = stats
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await refreshPopulationStats()
  setInterval(refreshPopulationStats, 5000)
})

const { t } = useI18n()
</script>

<template>
  <nav class="flex flex-shrink-0 auto-cols-min items-center justify-between bg-gray-800 px-2 py-2 text-white sm:px-4">
    <div class="grid-auto-cols grid-cols-2-[repeat(2,auto)] grid flex-grow grid-rows-2">
      <router-link
        to="/"
        :title="t('home')"
        class="hidden flex-row items-center text-xl font-extrabold uppercase tracking-wide text-yellow-50 sm:row-span-2 sm:flex"
      >
        <img src="/logo-white.png" class="mr-2 h-[20px]" />
        {{ t('battleBitStats') }}
      </router-link>
      <div class="col-span-2 flex w-full flex-1 items-center space-x-8 sm:col-span-1 sm:flex-initial">
        <div
          class="flex w-full flex-grow justify-between sm:w-auto sm:max-w-none sm:justify-end sm:space-x-4 md:space-x-8"
        >
          <NavItem to="/" :label="t('home')" />

          <NavItem to="/maps/isle" :exact-path="false" :label="t('maps')" />

          <NavItem to="/weapons/assault/M4A1" :label="t('weapons')" />

          <NavItem to="/stats/player/titan" :label="t('playerStats')" class="hidden md:block" />
          <NavItem to="/stats/player/titan" :label="t('stats')" class="md:hidden" />
        </div>

        <Button
          to="https://store.steampowered.com/app/671860/BattleBit_Remastered/"
          :prefix-icon="faSteamSymbol"
          class="hidden lg:block"
        >
          {{ t('requestAccess') }}
        </Button>
      </div>
      <div
        v-if="populationStats.playerCount > 0"
        class="col-span-2 flex bg-gray-800 py-1 px-4 text-center sm:col-span-1 sm:col-start-2 sm:row-start-2 sm:justify-end lg:px-0"
      >
        <div class="flex-grow sm:flex-grow-0 sm:px-4">
          <div class="sm:inline-block">
            <FontAwesomeIcon :icon="faUserFriends" />
            <span class="px-1 text-xl font-medium">{{ populationStats.playerCount }}</span>
          </div>
          <span class="col-start-2 hidden px-1 text-gray-400 sm:inline-block">{{ t('playersOnline') }}</span>
        </div>
        <div class="grid flex-grow px-4 sm:inline-block sm:flex-grow-0 sm:px-0">
          <div class="sm:inline-block">
            <FontAwesomeIcon :icon="faServer" />
            <span class="px-1 text-xl font-medium">{{ populationStats.serverCount }}</span>
          </div>
          <span class="col-start-2 hidden px-1 text-gray-400 sm:inline-block">{{ t('serverCount') }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>
