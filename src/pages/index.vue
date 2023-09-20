<script setup lang="ts">
import { filename } from 'pathe/utils'
import { maps } from '~/lib/mapConfig'
import { classes } from '~/lib/weaponConfig'

const numberOfMaps = Object.keys(maps).length

const glob = import.meta.glob('/assets/images/classes/*.png', { eager: true })

const classImages = Object.fromEntries(Object.entries(glob).map(([key, value]) => [filename(key), value.default]))
</script>

<template>
  <div class="pb-8 container-padding-x">
    <h1 class="flex items-center mt-2 text-xl font-extrabold tracking-wide uppercase text-yellow-50 sm:hidden">
      <img src="~/assets/images/brand/logo-white.png" class="mr-2 h-[20px]" />
      {{ $t('battleBitStats') }}
    </h1>

    <div class="mt-6">
      <h2 class="relative z-20 text-2xl font-medium">{{ $t('interactiveMaps') }}</h2>
      <p class="text-gray-400">{{ $t('zoomAndPan', { total: numberOfMaps }) }}</p>

      <div class="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        <NuxtLink
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

            <p v-if="mapConfig.description" class="text-sm text-gray-400">{{ mapConfig.description }}</p>
            <p v-else class="text-sm text-gray-400">{{ $t('awaitingDescription') }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="relative z-20 text-2xl font-medium">{{ $t('weapons') }}</h2>
      <p class="text-gray-400">{{ $t('exploreCurrentWeapons') }}</p>
    </div>

    <!-- <div class="flex items-center mt-4 space-x-2">
      <img
        v-for="weapon in allWeapons"
        :key="weapon.name"
        :src="`~/assets/images/weapons/${weapon.weaponType}/${weapon.imageName}.png`"
        class="h-6 rounded opacity-50"
      />
    </div> -->

    <div class="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 xl:flex">
      <NuxtLink
        v-for="[soldierClass, classConfig] of Object.entries(classes)"
        :key="soldierClass"
        :to="`/weapons/${soldierClass}/${classes[soldierClass].demoWeapon}`"
        class="group flex flex-col items-center space-y-4 rounded border-2 border-transparent bg-gray-700 py-4 px-4 transition-all hover:border-yellow-100 sm:min-w-[180px]"
      >
        <img :src="classImages[classConfig.imageName]" class="h-20 rounded" />

        <p class="text-xl font-medium group-hover:text-yellow-100">
          {{ classConfig.name }}
        </p>
      </NuxtLink>
    </div>

    <div class="mt-12">
      <h2 class="relative z-20 text-2xl font-medium">{{ $t('playerStats') }}</h2>
      <div class="inline-flex items-center px-4 py-2 mt-4 space-x-4 bg-gray-800 rounded sm:space-x-2">
        <Icon name="fa-solid:info-circle" />
        <span>{{ $t('comingSoonIfStats') }}</span>
      </div>
    </div>

    <div class="mt-12">
      <h2 class="relative text-2xl font-medium">{{ $t('otherResources') }}</h2>

      <NuxtLink
        to="https://battlebit.fandom.com/wiki/BattleBit_Wiki"
        target="_blank"
        rel="noopener nofollow"
        class="flex items-center justify-between px-4 py-2 mt-4 space-x-6 transition-all bg-gray-700 border-2 border-transparent rounded hover:border-yellow-100 w-fit"
      >
        <span>Official Wiki</span>
        <Icon name="fa-solid:external-link-alt" />
      </NuxtLink>

      <NuxtLink
        to="https://1drv.ms/x/s!Asv3oZ5_zYmxczGsx71wEfnKlRU"
        target="_blank"
        rel="noopener nofollow"
        class="flex items-center justify-between px-4 py-2 mt-4 space-x-6 transition-all bg-gray-700 border-2 border-transparent rounded hover:border-yellow-100 w-fit"
      >
        <span>Detailed weapon stats by @Ox1gen</span>
        <Icon name="fa-solid:external-link-alt" />
      </NuxtLink>

      <NuxtLink
        to="https://battlebit.community/"
        target="_blank"
        rel="noopener nofollow"
        class="flex items-center justify-between px-4 py-2 mt-4 space-x-6 transition-all bg-gray-700 border-2 border-transparent rounded hover:border-yellow-100 w-fit"
      >
        <span>Community server scripts</span>
        <Icon name="fa-solid:external-link-alt" />
      </NuxtLink>
    </div>

    <div class="mt-12">
      <h2 class="relative z-20 text-2xl font-medium">{{ $t('knownIssues') }}</h2>
      <p class="text-gray-400">{{ $t('dataMinedSources') }}</p>
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
        <li>ACR, UNICA, M249, and SV-98 models are blacked out</li>
        <li>MP5 model has an extraneous magazine in its model</li>
      </ul>
    </div>
  </div>
</template>
