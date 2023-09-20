<script setup lang="ts">
import { classes, weapons } from '~/lib/weaponConfig'
import { vehicles } from '~/lib/vehicleConfig'

const topWeapons = [
  {
    key: 'M4A1',
    kills: 516,
  },
  {
    key: 'G36C',
    kills: 249,
  },
  {
    key: 'MP5',
    kills: 67,
  },
  {
    key: 'ASVAL',
    kills: 39,
  },
  {
    key: 'GLOCK18',
    kills: 12,
  },
  {
    key: 'Sledgehammer',
    kills: 5,
  },
]

const topWeaponsListData = topWeapons.map(weapon => ({
  key: weapon.key,
  name: weapons[weapon.key].name,
  imagePath: `https://asset.battlebitstats.com/weapons/${weapons[weapon.key].imageName}.png`,
  kills: weapon.kills,
}))

const topClasses = [
  {
    key: 'medic',
    kills: 675,
    timePlayedHours: 113,
    xp: 11000,
  },
  {
    key: 'assault',
    kills: 864,
    timePlayedHours: 115,
    xp: 9251,
  },
  {
    key: 'engineer',
    kills: 735,
    timePlayedHours: 12,
    xp: 908,
  },
  {
    key: 'recon',
    kills: 312,
    timePlayedHours: 11,
    xp: 504,
  },
  {
    key: 'leader',
    kills: 78,
    timePlayedHours: 10,
    xp: 379,
  },
  {
    key: 'support',
    kills: 5,
    timePlayedHours: 0.5,
    xp: 207,
  },
]

const topVehicles = [
  {
    key: 'M1Abrams',
    kills: 56,
  },
  {
    key: 'LAV_25',
    kills: 32,
  },
  {
    key: 'BTR_82',
    kills: 22,
  },
  {
    key: 'T90',
    kills: 19,
  },
  {
    key: 'humvee',
    kills: 5,
  },
  {
    key: 'quad',
    kills: 3,
  },
]

const topVehiclesListData = topVehicles.map(vehicle => ({
  key: vehicle.key,
  name: vehicles[vehicle.key].name,
  imagePath: `https://asset.battlebitstats.com/vehicles/${vehicles[vehicle.key].imageName}.png`,
  kills: vehicle.kills,
}))

const xp = {
  totalForRank: 20000,
  current: 12254,
  prestige: 1,
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="relative z-10 flex-wrap justify-center px-4 py-8 md:flex md:space-x-16">
      <div
        class="bg-[auto_90%] bg-right-top bg-no-repeat md:bg-[auto_0%]"
        :style="{ backgroundImage: 'url(https://asset.battlebitstats.com/classes/medic-body.png)' }"
      >
        <h1 class="text-5xl">
          <span>Titan</span>

          <a
            href="https://steamcommunity.com/id/alexcroox/"
            target="_blank"
            rel="nofollow noopener"
            class="block mt-2 text-base text-gray-400 group hover:text-yellow-100"
          >
            <Icon name="fa6-brands:steam" class="mr-1" />

            <span class="group-hover:underline">{{ $t('addFriend') }}</span>
          </a>
        </h1>

        <div class="flex items-center mt-8 space-x-6 text-center">
          <div>
            <div
              class="relative h-20 w-20 rounded-full border-4 border-[#FACD10] bg-[auto_80%] bg-[center_top_5px] bg-no-repeat md:h-24 md:w-24"
              :style="{ backgroundImage: `url(~/assets/images/ranks/10.png)` }"
            >
              <span class="absolute text-3xl font-bold position-center rank-text">10</span>
            </div>

            <p class="mt-2 text-xl text-gray-400">{{ $t('rank') }}</p>
          </div>

          <div>
            <img
              :src="`https://asset.battlebitstats.com/ranks/prestige-${xp.prestige}.png`"
              class="w-20 h-20 pointer-events-none md:h-24 md:w-24"
            />

            <p class="mt-2 text-xl text-gray-400">{{ $t('prestige') }}</p>
          </div>
        </div>

        <ProgressBar :total="xp.totalForRank" :current="xp.current" class="mt-8 text-xs">
          <template #prefix>
            {{ $t('totalUntilRankUp', { total: (xp.totalForRank - xp.current).toLocaleString() }) }}
          </template>
        </ProgressBar>
      </div>

      <img src="~/assets/images/classes/medic-body.png" class="flex-shrink-0 hidden w-48 -mb-32 md:block" />

      <div class="grid grid-cols-2 gap-8 mt-8 lg:mt-0">
        <StatCard
          :title="$t('kdRatio')"
          stat="1.4"
          :suffix="$t('totalKills', { total: (847).toLocaleString() })"
        />

        <StatCard :title="$t('wlRatio')" stat="2.8" :suffix="$t('totalWins', { total: (57).toLocaleString() })" />

        <StatCard
          :title="$t('accuracy')"
          stat="65%"
          :suffix="$t('longestDistance', { meters: (220).toLocaleString() })"
        />

        <StatCard :title="$t('timePlayed')" stat="8 H" :suffix="$t('enlistedDate', { date: 'Jan 2022' })" />
      </div>
    </div>

    <div class="relative z-20 flex-auto py-8 bg-gray-800 border-t border-gray-700">
      <div class="flex flex-wrap justify-between md:space-x-4 md:px-4 lg:justify-center lg:space-x-12">
        <StatList
          class="flex-auto mb-6 self-baseline lg:flex-initial"
          :title="$t('topWeapons')"
          :listData="topWeaponsListData"
        />

        <StatList
          class="flex-auto mb-6 self-baseline lg:flex-initial"
          :title="$t('topVehicles')"
          :listData="topVehiclesListData"
        />

        <StatList class="flex-auto mb-6 self-baseline lg:flex-initial" :title="$t('topClasses')">
          <template #body>
            <li
              v-for="classStats in topClasses"
              :key="classStats.key"
              class="flex items-center justify-between mb-4 space-x-12"
            >
              <span class="flex items-center">
                <img
                  :src="`https://asset.battlebitstats.com/classes/${classes[classStats.key].imageName}-alt.png`"
                  class="h-12 mr-4"
                />

                <span>
                  <span class="block text-lg">{{ classes[classStats.key].name }}</span>
                  <span class="block text-gray-400">
                    {{ $t('totalKills', { total: classStats.kills.toLocaleString() }) }}
                  </span>
                </span>
              </span>

              <span class="text-right text-gray-400">
                <span class="block">
                  {{ $t('totalHours', { total: classStats.timePlayedHours.toLocaleString() }) }}
                </span>
                <span class="block">{{ $t('totalXp', { total: classStats.xp.toLocaleString() }) }}</span>
              </span>
            </li>
          </template>
        </StatList>
      </div>

      <div class="px-4 mt-4 text-center text-gray-500">{{ $t('theseStatsFake') }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rank-text {
  text-shadow: 0px 0px 6px #000;
}
</style>
