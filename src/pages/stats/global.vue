<script setup lang="ts">
// import { classes, weapons } from '~/lib/weaponConfig'
// import { vehicles } from '~/lib/vehicleConfig'

const { data, pending: isLoading } = await useFetch('https://publicapi.battlebit.cloud/Leaderboard/Get')

// Flatten collection by key
const keyedData = data.value.reduce((acc, item) => {
  const key = Object.keys(item)[0]

  return {
    ...acc,
    [key]: item[key],
  }
}, {})

console.log(keyedData)

let leaderboards = [
  {
    title: 'Top XP',
    list: keyedData['MostXP'],
  },
  // {
  //   title: 'Objectives completed',
  //   list: keyedData['MostObjectivesComplete'],
  // },
  // {
  //   title: 'Kills',
  //   list: keyedData['MostKills'],
  // },
  // {
  //   title: 'Heals',
  //   list: keyedData['MostHeals'],
  // },
  // {
  //   title: 'Revives',
  //   list: keyedData['MostRevives'],
  // },
  // {
  //   title: 'Vehicles destroyed',
  //   list: keyedData['MostVehiclesDestroyed'],
  // },
  // {
  //   title: 'Vehicle repairs',
  //   list: keyedData['MostVehicleRepairs'],
  // },
  // {
  //   title: 'Vehicle repairs',
  //   list: keyedData['MostVehicleRepairs'],
  // },
  // {
  //   title: 'Road kills',
  //   list: keyedData['MostRoadkills'],
  // },
  // {
  //   title: 'Longest kill',
  //   list: keyedData['MostLongestKill'],
  // },
]
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-full">
    <Loader />
  </div>

  <div
    v-else
    class="grid grid-cols-1 gap-4 p-4 bg-gray-800 border-t border-gray-700 md:grid-cols-2 lg:grid-cols-3"
  >
    <StatList
      v-for="leaderboard in leaderboards"
      :key="leaderboard.title"
      class="flex-auto mb-6 border border-gray-700 self-baseline lg:flex-initial"
      :title="leaderboard.title"
    >
      <template #body>
        <ul class="overflow-y-auto max-h-[50vh]">
          <li
            v-for="(item, index) in leaderboard.list"
            :key="`${leaderboard.title}-${item.Name}`"
            class="flex items-center justify-between px-6 py-1 space-x-4 even:bg-gray-900 odd:bg-gray-800"
          >
            <span class="flex items-center space-x-2">
              <span class="font-mono text-gray-500">
                <span class="inline-block mr-1">#</span>
                <span>{{ index + 1 }}</span>
              </span>
              <span>{{ item.Name }}</span>
            </span>

            <span class="font-mono text-sm">{{ Number(item.Value).toLocaleString() }}</span>
          </li>
        </ul>
      </template>
    </StatList>
  </div>
</template>
