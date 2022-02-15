<script setup lang="ts">
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faSteamSymbol } from '@fortawesome/free-brands-svg-icons'
import { classes, weapons } from '~/lib/weapon-config'

const router = useRouter()
const { t } = useI18n()

const favouriteWeapons = [
  {
    key: 'M4A1',
    kills: 516
  },
  {
    key: 'G36C',
    kills: 249
  },
  {
    key: 'MP5',
    kills: 67
  },
  {
    key: 'ASVAL',
    kills: 39
  },
  {
    key: 'GLOCK18',
    kills: 12
  }
]

const topClasses = [
  {
    key: 'medic',
    kills: 1415,
    timePlayedHours: 54,
    xp: 11000
  },
  {
    key: 'assault',
    kills: 1415,
    timePlayedHours: 54,
    xp: 11000
  },
  {
    key: 'engineer',
    kills: 1415,
    timePlayedHours: 54,
    xp: 11000
  },
  {
    key: 'recon',
    kills: 1415,
    timePlayedHours: 54,
    xp: 11000
  },
  {
    key: 'leader',
    kills: 1415,
    timePlayedHours: 54,
    xp: 11000
  },
  {
    key: 'support',
    kills: 1415,
    timePlayedHours: 54,
    xp: 11000
  }
]

const xp = {
  totalForRank: 20000,
  current: 12254
}
</script>

<template>
  <div class="flex h-full flex-col">
    <div class="relative z-10 flex justify-center space-x-16 py-8">
      <div>
        <h1 class="text-5xl">
          <span>Titan</span>

          <a
            href="https://steamcommunity.com/id/alexcroox/"
            target="_blank"
            rel="nofollow noopener"
            class="group mt-2 block text-base text-gray-400 hover:text-yellow-100"
          >
            <FontAwesomeIcon :icon="faSteamSymbol" class="mr-1" />

            <span class="group-hover:underline">{{ t('addFriend') }}</span>
          </a>
        </h1>

        <div class="mt-8 flex items-center space-x-6 text-center">
          <div>
            <div
              class="relative h-24 w-24 rounded-full border-4 border-[#FACD10] bg-[auto_80%] bg-[center_top_5px] bg-no-repeat"
              :style="{ backgroundImage: `url(/images/ranks/10.png)` }"
            >
              <span class="position-center rank-text absolute text-3xl font-bold">10</span>
            </div>

            <p class="mt-2 text-xl text-gray-400">{{ t('rank') }}</p>
          </div>

          <div>
            <div class="relative h-24 w-24 rounded-full border-4 border-gray-400">
              <span class="position-center rank-text absolute text-3xl font-bold">1</span>
            </div>

            <p class="mt-2 text-xl text-gray-400">{{ t('prestige') }}</p>
          </div>
        </div>

        <ProgressBar :total="xp.totalForRank" :current="xp.current" class="mt-8 text-xs">
          <template #prefix>
            {{ t('totalUntilRankUp', { total: (xp.totalForRank - xp.current).toLocaleString() }) }}
          </template>
        </ProgressBar>
      </div>

      <img src="/images/classes/medic-body.png" class="-mb-32 block w-48 flex-shrink-0" />

      <div class="grid grid-cols-2 gap-8">
        <div class="rounded-md bg-gray-800 px-4 py-2 text-center">
          <h4 class="text-2xl text-gray-300">K/D ratio</h4>
          <p class="mt-3 mb-2 text-4xl font-semibold">1.4</p>
          <p class="text-gray-400">{{ t('totalKills', { total: (847).toLocaleString() }) }}</p>
        </div>

        <div class="rounded-md bg-gray-800 px-4 py-2 text-center">
          <h4 class="text-2xl text-gray-300">W/L ratio</h4>
          <p class="mt-3 mb-2 text-4xl font-semibold">2.8</p>
          <p class="text-gray-400">{{ t('totalWins', { total: (57).toLocaleString() }) }}</p>
        </div>

        <div class="rounded-md bg-gray-800 px-4 py-2 text-center">
          <h4 class="text-2xl text-gray-300">Accuracy</h4>
          <p class="mt-3 mb-2 text-4xl font-semibold">65%</p>
          <p class="text-gray-400">220m longest</p>
        </div>

        <div class="rounded-md bg-gray-800 px-4 py-2 text-center">
          <h4 class="text-2xl text-gray-300">Time played</h4>
          <p class="mt-3 mb-2 text-4xl font-semibold">8 H</p>
          <p class="text-gray-400">Recruited Jan 2022</p>
        </div>
      </div>
    </div>

    <div class="relative z-20 flex flex-auto justify-center space-x-24 border-t border-gray-700 bg-gray-800 py-8">
      <!-- <div>
        <h4>Longest kill</h4>
        <p>200m</p>
      </div>

      <div>
        <h4>Headshots</h4>
        <p>156</p>
      </div> -->

      <div class="rounded-md bg-gray-900 py-2">
        <div class="border-b border-gray-700 px-6 pb-2">
          <h3 class="text-2xl">{{ t('topWeapons') }}</h3>
        </div>

        <ul class="mt-4 px-6">
          <li v-for="(weapon, index) in favouriteWeapons" :key="weapon.key" class="mb-4 flex items-center">
            <span class="mr-8 text-3xl text-gray-500">{{ index + 1 }}</span>

            <router-link :to="`/weapons/medic/${weapon.key}`" class="group flex flex-auto items-center space-x-6">
              <img :src="`/images/weapons/${weapons[weapon.key].imageName}.png`" class="h-8" />

              <span>
                <span class="block text-yellow-100 group-hover:underline">
                  {{ weapons[weapon.key].name }}
                </span>
                <span>{{ t('totalKills', { total: weapon.kills }) }}</span>
              </span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="rounded-md bg-gray-900 py-2">
        <div class="border-b border-gray-700 px-6 pb-2">
          <h3 class="text-2xl">{{ t('classes') }}</h3>
        </div>

        <ul class="mt-4 px-6">
          <li
            v-for="classStats in topClasses"
            :key="classStats.key"
            class="mb-4 flex items-center justify-between space-x-12"
          >
            <span class="flex items-center">
              <img :src="`/images/classes/${classes[classStats.key].imageName}-alt.png`" class="mr-4 h-12" />

              <span>
                <span class="block text-lg">{{ classes[classStats.key].name }}</span>
                <span class="block text-gray-400">
                  {{ t('totalKills', { total: classStats.kills.toLocaleString() }) }}</span
                >
              </span>
            </span>

            <span class="text-right text-gray-400">
              <span class="block">{{ t('totalHours', { total: classStats.timePlayedHours.toLocaleString() }) }}</span>
              <span class="block">{{ t('totalXp', { total: classStats.xp.toLocaleString() }) }}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rank-text {
  text-shadow: 0px 0px 6px #000;
}
</style>
