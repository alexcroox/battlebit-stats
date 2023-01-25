<script setup lang="ts">
import { faSteamSymbol } from '@fortawesome/free-brands-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import utc from 'dayjs/plugin/utc.js'
import { maps } from '../lib/map-config'
import { classes } from '../lib/weapon-config'

dayjs.extend(relativeTime)
dayjs.extend(utc)

const { t } = useI18n()

const playTestTimings = {
  start: dayjs.utc('2022-04-08 15:00:00'),
  end: dayjs.utc('2022-04-07 15:00:00')
}

// const allWeapons = $computed(() => {
//   return Object.keys(weapons).map((weaponKey) => weapons[weaponKey])
// })
</script>

<template>
  <div class="container-padding-x pb-8">
    <h1 class="mt-2 flex items-center text-xl font-extrabold uppercase tracking-wide text-yellow-50 sm:hidden">
      <img src="/logo-white.png" class="mr-2 h-[20px]" />
      {{ t('battleBitStats') }}
    </h1>

    <div class="mt-4">
      <p class="text-gray-400">{{ t('siteNotAffiliatedWith') }}</p>
    </div>

    <div class="mt-12">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('interactiveMaps') }}</h2>
      <p class="text-gray-400">{{ t('zoomAndPan') }}</p>

      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <router-link
          v-for="[mapSlug, mapConfig] of Object.entries(maps)"
          :key="mapSlug"
          :to="`/maps/${mapSlug}`"
          class="group flex items-center rounded border-2 border-transparent bg-gray-700 px-2 py-2 transition-all hover:border-yellow-100"
        >
          <img :src="`https://assets.battlebitstats.com/maps/${mapSlug}/thumbnail.jpg`" class="h-20 rounded" />

          <div class="ml-4">
            <span class="block text-xl font-medium group-hover:text-yellow-100">
              {{ mapConfig.name }}
            </span>

            <p v-if="mapConfig.descriptionShort" class="text-sm text-gray-400">{{ mapConfig.descriptionShort }}</p>
            <p v-else class="text-sm text-gray-400">{{ t('awaitingDescription') }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('weapons') }}</h2>
      <p class="text-gray-400">{{ t('exploreCurrentWeapons') }}</p>
    </div>

    <!-- <div class="mt-4 flex items-center space-x-2">
      <img
        v-for="weapon in allWeapons"
        :key="weapon.name"
        :src="`/images/weapons/${weapon.weaponType}/${weapon.imageName}.png`"
        class="h-6 rounded opacity-50"
      />
    </div> -->

    <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:flex">
      <router-link
        v-for="[soldierClass, classConfig] of Object.entries(classes)"
        :key="soldierClass"
        :to="`/weapons/${soldierClass}/${classes[soldierClass].demoWeapon}`"
        class="group flex flex-col items-center space-y-4 rounded border-2 border-transparent bg-gray-700 py-4 px-4 transition-all hover:border-yellow-100 sm:min-w-[180px]"
      >
        <img :src="`/images/classes/${classConfig.imageName}.png`" class="h-20 rounded" />

        <p class="text-xl font-medium group-hover:text-yellow-100">
          {{ classConfig.name }}
        </p>
      </router-link>
    </div>

    <div class="mt-12">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('playerStats') }}</h2>
      <div class="mt-4 inline-flex items-center space-x-4 rounded bg-gray-800 px-4 py-2 sm:space-x-2">
        <FontAwesomeIcon :icon="faInfoCircle" />
        <span>{{ t('comingSoonIfStats') }}</span>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('knownIssues') }}</h2>
      <p class="text-gray-400">{{ t('dataMinedSources') }}</p>
      <p class="text-gray-400">
        Please contact
        <a href="https://discordapp.com/users/Titan#7652" target="_blank" class="underline hover:text-yellow-100">
          <span>Titan#7652</span>
        </a>
        on discord if you have a correction
      </p>

      <ul class="mt-4 ml-4 list-disc font-normal">
        <li><span>Basra, Frugis, Oil Dunes, Namak, and River maps</span> are missing as no raw map file available</li>
        <li><span>Wakistan map</span> file not as high res as others</li>
        <li><span>Hot Land map</span> file not as high res as others</li>
        <li>ACR, UNICA, M249, and SV-98 models are blacked out</li>
        <li>MP5 model has funny magazine</li>
      </ul>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
