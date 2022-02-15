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
  <div class="">
    <img src="/images/ranks/10.png" class="mx-auto block h-24" />

    <img src="/images/classes/medic-body.png" class="mx-auto block w-48" />

    <h1 class="text-4xl">
      <span>Titan</span>

      <a
        href="https://steamcommunity.com/id/alexcroox/"
        target="_blank"
        rel="nofollow noopener"
        class="ml-4 inline-block text-base"
      >
        <FontAwesomeIcon :icon="faSteamSymbol" class="mr-1" />

        {{ t('addFriend') }}
      </a>
    </h1>
    <h2 class="text-2xl">RANK 35</h2>

    <ProgressBar :total="xp.totalForRank" :current="xp.current" class="max-w-xs">
      <template #prefix>
        {{ t('totalUntilRankUp', { total: (xp.totalForRank - xp.current).toLocaleString() }) }}
      </template>
    </ProgressBar>

    <div>
      <h4>Accuracy</h4>
      <p>10%</p>
      <p>1,463 shots hit</p>
    </div>

    <div>
      <h4>Longest kill</h4>
      <p>200m</p>
    </div>

    <div>
      <h4>Headshots</h4>
      <p>156</p>
    </div>

    <div>
      <h3 class="text-2xl">{{ t('topWeapons') }}</h3>
      <ul>
        <li v-for="(weapon, index) in favouriteWeapons" :key="weapon.key" class="mb-4 flex items-center">
          <span class="mr-8 text-3xl text-gray-500">{{ index + 1 }}</span>

          <router-link :to="`/weapons/weapon.key`" class="group flex flex-auto items-center space-x-4">
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

    <div class="max-w-xs">
      <h3 class="text-2xl">{{ t('classes') }}</h3>
      <ul>
        <li v-for="classStats in topClasses" :key="classStats.key" class="mb-4 flex items-center justify-between">
          <span class="flex items-center">
            <img :src="`/images/classes/${classes[classStats.key].imageName}-alt.png`" class="mr-2 h-12 rounded" />

            <span>
              <span class="block text-lg">{{ classes[classStats.key].name }}</span>
              <span class="block">{{ t('totalKills', { total: classStats.kills.toLocaleString() }) }}</span>
            </span>
          </span>

          <span class="text-right">
            <span class="block">{{ t('totalHours', { total: classStats.timePlayedHours.toLocaleString() }) }}</span>
            <span class="block">{{ t('totalXp', { total: classStats.xp.toLocaleString() }) }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
