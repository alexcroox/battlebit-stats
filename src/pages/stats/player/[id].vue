<script setup lang="ts">
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faSteamSymbol } from '@fortawesome/free-brands-svg-icons'
import { classes, weapons } from '~/lib/weapon-config'
import { vehicles } from '~/lib/vehicle-config'

const { t } = useI18n()

const topWeapons = [
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
  },
  {
    key: 'Sledgehammer',
    kills: 5
  }
]

const topWeaponsListData = topWeapons.map((weapon) => ({
  key: weapon.key,
  name: weapons[weapon.key].name,
  imagePath: `/images/weapons/${weapons[weapon.key].imageName}.png`,
  kills: weapon.kills
}))

const topClasses = [
  {
    key: 'medic',
    kills: 675,
    timePlayedHours: 113,
    xp: 11000
  },
  {
    key: 'assault',
    kills: 864,
    timePlayedHours: 115,
    xp: 9251
  },
  {
    key: 'engineer',
    kills: 735,
    timePlayedHours: 12,
    xp: 908
  },
  {
    key: 'recon',
    kills: 312,
    timePlayedHours: 11,
    xp: 504
  },
  {
    key: 'leader',
    kills: 78,
    timePlayedHours: 10,
    xp: 379
  },
  {
    key: 'support',
    kills: 5,
    timePlayedHours: 0.5,
    xp: 207
  }
]

const topVehicles = [
  {
    key: 'M1Abrams',
    kills: 56
  },
  {
    key: 'LAV_25',
    kills: 32
  },
  {
    key: 'BTR_82',
    kills: 22
  },
  {
    key: 'T90',
    kills: 19
  },
  {
    key: 'humvee',
    kills: 5
  },
  {
    key: 'quad',
    kills: 3
  }
]

const topVehiclesListData = topVehicles.map((vehicle) => ({
  key: vehicle.key,
  name: vehicles[vehicle.key].name,
  imagePath: `/images/vehicles/${vehicles[vehicle.key].imageName}.png`,
  kills: vehicle.kills
}))

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
        <StatCard :title="t('kdRatio')" stat="1.4" :suffix="t('totalKills', { total: (847).toLocaleString() })" />

        <StatCard :title="t('wlRatio')" stat="2.8" :suffix="t('totalWins', { total: (57).toLocaleString() })" />

        <StatCard
          :title="t('accuracy')"
          stat="65%"
          :suffix="t('longestDistance', { meters: (220).toLocaleString() })"
        />

        <StatCard :title="t('timePlayed')" stat="8 H" :suffix="t('enlistedDate', { date: 'Jan 2022' })" />
      </div>
    </div>

    <div class="relative z-20 flex flex-auto justify-center space-x-12 border-t border-gray-700 bg-gray-800 py-8">
      <StatList class="self-baseline" :title="t('topWeapons')" :listData="topWeaponsListData" />

      <StatList class="self-baseline" :title="t('topVehicles')" :listData="topVehiclesListData" />

      <StatList class="self-baseline" :title="t('topClasses')">
        <template #body>
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
        </template>
      </StatList>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rank-text {
  text-shadow: 0px 0px 6px #000;
}
</style>
