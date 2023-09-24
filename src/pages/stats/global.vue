<script setup lang="ts">
useHead({
  title: 'Global Leaderboards',
})

const {
  data,
  pending: isLoading,
  refresh: fetchLeaderboard,
} = await useFetch('https://publicapi.battlebit.cloud/Leaderboard/Get', {
  immediate: false,
  key: 'leaderboard',
})

let leaderboards: Leaderboard[] = []
let uniquePlayerNames: string[] = []
let keyedData = {}
let selectedPlayerName = ref('')
let selectedPlayerLeaderboardPositions = ref({})
let searchTerm = ref('')
let clanSearchTerm = ref('')

onMounted(() => {
  fetchLeaderboard()
})

interface Leaderboard {
  title: string
  shortTitle?: string
  key: string
  list: {
    Name: string
    Value: string
  }[]
}

// Flatten collection by key
watchEffect(() => {
  if (!data?.value) {
    return false
  }

  data.value.forEach(leaderboard => {
    const key = Object.keys(leaderboard)[0]

    if (key === 'TopClans') {
      return
    }

    keyedData[key] = leaderboard[key]

    leaderboard[key].forEach(item => {
      if (item.Name && !uniquePlayerNames.includes(item.Name)) {
        uniquePlayerNames.push(item.Name)
      }
    })
  })

  leaderboards = [
    {
      title: 'Top XP',
      key: 'MostXP',
      list: keyedData['MostXP'].slice(0, 50),
    },
    {
      title: 'Objectives completed',
      shortTitle: 'Objectives',
      key: 'MostObjectivesComplete',
      list: keyedData['MostObjectivesComplete'].slice(0, 50),
    },
    {
      title: 'Kills',
      key: 'MostKills',
      list: keyedData['MostKills'].slice(0, 50),
    },
    {
      title: 'Heals',
      key: 'MostHeals',
      list: keyedData['MostHeals'].slice(0, 50),
    },
    {
      title: 'Revives',
      key: 'MostRevives',
      list: keyedData['MostRevives'].slice(0, 50),
    },
    {
      title: 'Vehicles destroyed',
      key: 'MostVehiclesDestroyed',
      list: keyedData['MostVehiclesDestroyed'].slice(0, 50),
    },
    {
      title: 'Vehicle repairs',
      key: 'MostVehicleRepairs',
      list: keyedData['MostVehicleRepairs'].slice(0, 50),
    },
    {
      title: 'Road kills',
      key: 'MostRoadkills',
      list: keyedData['MostRoadkills'].slice(0, 50),
    },
    {
      title: 'Longest kill',
      key: 'MostLongestKill',
      list: keyedData['MostLongestKill'].slice(0, 50),
    },
  ]
})

const filteredPlayerResults = computed(() => {
  if (searchTerm.value === '') {
    return []
  }

  let matches = 0

  return uniquePlayerNames.filter(playerName => {
    if (playerName.toLowerCase().includes(searchTerm.value.toLowerCase()) && matches < 20) {
      matches++
      return playerName
    }
  })
})

function selectPlayer(playerName: string) {
  resetPlayer()

  selectedPlayerName.value = playerName

  // Loop through each leaderboard and find what position this player is in
  Object.entries(keyedData).forEach((key, value) => {
    const leaderboard = key[1]
    const leaderboardTitle = key[0]

    leaderboard.forEach((item, index) => {
      if (item.Name === playerName) {
        selectedPlayerLeaderboardPositions.value[leaderboardTitle] = {
          position: (index + 1).toLocaleString(),
          nextPosition: index.toLocaleString(),
          valueFromNextPlayer: index === 0 ? 0 : Number(leaderboard[index - 1].Value) - Number(item.Value),
        }
      }
    })
  })

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

function resetPlayer() {
  selectedPlayerName.value = ''
  searchTerm.value = ''
  selectedPlayerLeaderboardPositions.value = {}
}
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center flex-auto">
    <Loader />
  </div>

  <div
    v-else
    class="grid grid-cols-1 gap-4 p-4 bg-gray-800 border-t border-gray-700 md:grid-cols-2 lg:grid-cols-3"
  >
    <div
      class="flex flex-col items-center justify-center flex-auto px-2 pt-4 pb-6 mb-6 bg-gray-900 border border-gray-700 rounded md:px-6 lg:flex-initial"
    >
      <template v-if="selectedPlayerName">
        <h3 class="text-xl md:text-2xl">
          <span>{{ selectedPlayerName }}</span>
        </h3>

        <div class="w-full mt-6">
          <div v-for="leaderboard in leaderboards" :key="leaderboard.title" class="flex items-center space-x-4">
            <p class="w-1/2 text-lg text-right text-gray-300 whitespace-nowrap">
              {{ leaderboard.shortTitle || leaderboard.title }}
            </p>

            <p class="flex-auto text-lg">
              <span
                v-if="selectedPlayerLeaderboardPositions[leaderboard.key]"
                class="flex items-center space-x-2 text-yellow-100"
              >
                <span class="flex items-center space-x-0.5">
                  <span>#</span>
                  <span>{{ selectedPlayerLeaderboardPositions[leaderboard.key].position }}</span>
                </span>

                <span
                  v-if="selectedPlayerLeaderboardPositions[leaderboard.key].valueFromNextPlayer"
                  class="ml-2 text-sm text-gray-400"
                >
                  +{{ selectedPlayerLeaderboardPositions[leaderboard.key].valueFromNextPlayer }} to #{{
                    selectedPlayerLeaderboardPositions[leaderboard.key].nextPosition
                  }}
                </span>
              </span>

              <span v-else class="text-sm italic text-gray-400">
                {{ $t('notInTop', { total: Number(5000).toLocaleString() }) }}
              </span>
            </p>
          </div>
        </div>

        <a @click="resetPlayer()" class="mt-6 text-sm text-gray-400 cursor-pointer">
          <Icon name="bi:arrow-left" class="inline-block mr-1" />
          <span>Reset</span>
        </a>
      </template>

      <template v-else>
        <h3 class="flex items-center space-x-4 text-xl md:text-2xl">
          <Icon name="bi:search" />
          <span>{{ $t('findYourself') }}</span>
        </h3>

        <p class="mt-4 text-gray-400">Are you in the top 5,000 players?</p>

        <div class="relative mt-6">
          <div class="relative">
            <input
              v-model="searchTerm"
              type="text"
              class="px-4 py-1.5 relative z-1 bg-gray-700 border border-gray-500 rounded focus:outline-none focus:border-gray-400"
              placeholder="Player name"
              autofocus
            />

            <Icon
              v-if="searchTerm"
              @click="searchTerm = ''"
              name="bi:x"
              class="absolute text-xl text-white cursor-pointer right-2 position-center-y z-2"
            />
          </div>

          <div
            v-if="searchTerm"
            class="absolute left-0 right-0 border border-gray-500 top-[43px] bg-gray-700 max-h-[30vh] overflow-auto scrollbar-vertical"
          >
            <p v-if="filteredPlayerResults.length === 0" class="px-4 py-2 text-sm text-gray-400">
              Chin up, maybe one day...
            </p>

            <ul v-else>
              <li
                v-for="playerName in filteredPlayerResults"
                @click="selectPlayer(playerName)"
                :key="playerName"
                class="flex items-center justify-between px-4 py-1 space-x-2 cursor-pointer group hover:bg-gray-500"
              >
                <span>{{ playerName }}</span>

                <Icon name="bi:search" class="flex-shrink-0 invisible group-hover:visible" />
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>

    <StatList
      v-for="leaderboard in leaderboards"
      :key="leaderboard.title"
      class="flex-auto mb-6 border border-gray-700 self-baseline lg:flex-initial"
      :title="leaderboard.title"
    >
      <template #body>
        <ul class="overflow-y-auto scrollbar-vertical max-h-[50vh]">
          <li
            v-for="(item, index) in leaderboard.list"
            :key="`${leaderboard.title}-${item.Name}`"
            @click="selectPlayer(item.Name)"
            class="flex items-center justify-between px-2 py-1 space-x-4 cursor-pointer md:px-6 even:bg-gray-900 hover:text-yellow-100 odd:bg-gray-800"
          >
            <span class="flex items-center space-x-3 truncate">
              <span class="flex-shrink-0 font-mono text-gray-500">
                <span class="inline-block mr-0.5">#</span>
                <span>{{ index + 1 }}</span>
              </span>
              <span class="truncate">{{ item.Name }}</span>
            </span>

            <span class="flex-shrink-0 font-mono text-sm">{{ Number(item.Value).toLocaleString() }}</span>
          </li>
        </ul>
      </template>
    </StatList>
  </div>
</template>
