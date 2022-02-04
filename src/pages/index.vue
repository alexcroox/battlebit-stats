<script setup lang="ts">
import { faSteamSymbol } from '@fortawesome/free-brands-svg-icons'
import { maps } from '../lib/map-config'

const { t } = useI18n()

/*
Known issues:

Wakistan map not as high res as others
Hot Land map not as high res as others
Dusty Dew map not available as raw map was tiny
Eduardovo map not available as raw map was tiny
WineParadise map not available as raw map was tiny
*/
</script>

<template>
  <div class="container-padding-x">
    <div class="mt-4">
      <h2 class="relative z-20 text-2xl font-medium">Next public play test</h2>
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
          Request access
        </Button>
      </div>
    </div>

    <div class="mt-8">
      <h2 class="relative z-20 text-2xl font-medium">Interactive maps</h2>
      <p class="text-gray-400">Zoom and pan your way through the upcoming battlefields</p>

      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <router-link
          v-for="[mapSlug, mapConfig] of Object.entries(maps)"
          :key="mapSlug"
          :to="`/maps/${mapSlug}`"
          class="flex items-center rounded bg-gray-700 px-2 py-2"
        >
          <img :src="`/maps/${mapSlug}/thumbnail.jpg`" class="h-20 rounded" />

          <div class="ml-4">
            <span class="block text-xl font-medium">
              {{ mapConfig.name }}
            </span>

            <p v-if="mapConfig.descriptionShort" class="text-sm text-gray-400">{{ mapConfig.descriptionShort }}</p>
            <p v-else class="text-sm text-gray-400">{{ t('awaitingDescription') }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
