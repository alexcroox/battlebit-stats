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
</script>

<template>
  <div class="pb-8 container-padding-x">
    <h1 class="flex items-center mt-2 text-xl font-extrabold tracking-wide uppercase text-yellow-50 sm:hidden">
      <img src="/logo-white.png" class="mr-2 h-[20px]" />
      {{ t('battleBitStats') }}
    </h1>

    <div class="mt-4">
      <p class="text-gray-400">{{ t('siteNotAffiliatedWith') }}</p>
    </div>

    <div class="mt-8">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('interactiveMaps') }}</h2>
      <p class="text-gray-400">{{ t('zoomAndPan') }}</p>

      <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <router-link
          v-for="[mapSlug, mapConfig] of Object.entries(maps)"
          :key="mapSlug"
          :to="`/maps/${mapSlug}`"
          class="flex items-center px-2 py-2 transition-all bg-gray-700 border-2 border-transparent rounded group hover:border-yellow-100"
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

    <!-- <div class="flex items-center mt-4 space-x-2">
      <img
        v-for="weapon in allWeapons"
        :key="weapon.name"
        :src="`/images/weapons/${weapon.weaponType}/${weapon.imageName}.png`"
        class="h-6 rounded opacity-50"
      />
    </div> -->

    <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 xl:flex">
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
      <div class="inline-flex items-center px-4 py-2 mt-4 space-x-4 bg-gray-800 rounded sm:space-x-2">
        <FontAwesomeIcon :icon="faInfoCircle" />
        <span>{{ t('comingSoonIfStats') }}</span>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('knownIssues') }}</h2>
      <p class="text-gray-400">{{ t('dataMinedSources') }}</p>
      <p class="text-gray-400">
        This website is open source so if you have corrections or new data please
        <a
          href="https://github.com/alexcroox/battlebit-stats/blob/main/README.md"
          target="_blank"
          class="underline hover:text-yellow-100"
        >
          <span>checkout our GitHub</span>
        </a>
      </p>

      <ul class="mt-4 ml-4 font-normal list-disc">
        <li><span>Wakistan map</span> file not as high res as others</li>
        <li><span>Hot Land map</span> file not as high res as others</li>
        <li>ACR, UNICA, M249, and SV-98 models are blacked out</li>
        <li>MP5 model has an extraneous magazine in its model</li>
      </ul>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
