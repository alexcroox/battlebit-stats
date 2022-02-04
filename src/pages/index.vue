<script setup lang="ts">
import { faSteamSymbol } from '@fortawesome/free-brands-svg-icons'
import { maps } from '../lib/map-config'

const { t } = useI18n()
</script>

<template>
  <div class="container-padding-x pb-8">
    <h1 class="mt-2 flex items-center text-xl font-extrabold uppercase tracking-wide text-yellow-50 sm:hidden">
      <img src="/logo-white.png" class="mr-2 h-[20px]" />
      {{ t('battleBitStats') }}
    </h1>

    <div class="mt-4">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('nextPublicPlayTest') }}</h2>

      <div
        class="container-padding-x relative mt-4 max-w-lg rounded bg-gray-700 bg-no-repeat py-4"
        :style="{ backgroundImage: 'url(/public/images/map-bg.png)', backgroundPosition: 'center left' }"
      >
        <div class="absolute left-0 right-0 top-0 bottom-0 z-10 bg-gray-900 bg-opacity-50" />

        <p class="relative z-20 text-2xl font-medium text-yellow-50">20th-23rd February</p>

        <p class="relative z-20 mt-1 text-lg text-gray-400">18 days <span class="ml-1 inline-block">3 hours</span></p>

        <Button
          to="https://store.steampowered.com/app/671860/BattleBit_Remastered/"
          class="relative z-20 mt-4"
          :prefix-icon="faSteamSymbol"
        >
          {{ t('requestAccess') }}
        </Button>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('interactiveMaps') }}</h2>
      <p class="text-gray-400">{{ t('zoomAndPan') }}</p>

      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <router-link
          v-for="[mapSlug, mapConfig] of Object.entries(maps)"
          :key="mapSlug"
          :to="`/maps/${mapSlug}`"
          class="group flex items-center rounded border-2 border-transparent bg-gray-700 px-2 py-2 transition-all hover:border-yellow-100"
        >
          <img :src="`/maps/${mapSlug}/thumbnail.jpg`" class="h-20 rounded" />

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

    <div class="mt-8">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('weapons') }}</h2>
      <p class="text-gray-400">Explore current weapons, stats and attachments</p>
    </div>

    <div class="mt-8">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('stats') }}</h2>
      <p class="text-gray-400">Coming soon when BattleBit exposes stats API</p>
    </div>

    <div class="mt-8">
      <h2 class="relative z-20 text-2xl font-medium">{{ t('knownIssues') }}</h2>
      <p class="text-gray-400">Data is mined from game files, so likely to be inaccurate in areas</p>
      <p class="text-gray-400">Please contact Titan on discord if you have a correction</p>

      <ul class="ml-4 mt-4 list-disc">
        <li><span>Wakistan map</span> file not as high res as others</li>
        <li><span>Hot Land map</span> file not as high res as others</li>
        <li><span>Dusty Dew map</span> not available as source map was tiny</li>
        <li><span>Eduardovo map</span> not available as source map was tiny</li>
        <li><span>WineParadise</span> map not available as source map was tiny</li>
      </ul>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
