<script setup lang="ts">
useHead({
  title: 'Top Clans',
})

const {
  data,
  pending: isLoading,
  refresh: fetchClans,
} = await useFetch('https://publicapi.battlebit.cloud/Leaderboard/Get', {
  immediate: false,
  key: 'leaderboard',
})

let maxRows = ref(100)
let topClans = []
let clanSearchTerm = ref('')

onMounted(() => {
  fetchClans()
})

// Flatten collection by key
watchEffect(() => {
  if (!data?.value) {
    return false
  }

  data.value.forEach(leaderboard => {
    const key = Object.keys(leaderboard)[0]

    if (key === 'TopClans') {
      topClans = leaderboard[key].map((clan, index) => {
        return {
          name: clan.Clan,
          tag: clan.Tag,
          members: clan.MaxPlayers,
          xp: clan.XP,
          position: index + 1,
        }
      })
    } else {
      return false
    }
  })
})

const filteredClans = computed(() => {
  if (clanSearchTerm.value === '') {
    return topClans.slice(0, maxRows.value)
  }

  let matches = 0

  return topClans.filter(clan => {
    if (
      (clan.name.toLowerCase().includes(clanSearchTerm.value.toLowerCase()) ||
        `[${clan.tag.toLowerCase()}]`.includes(clanSearchTerm.value.toLowerCase())) &&
      matches < 20
    ) {
      matches++
      return clan
    }
  })
})
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-full">
    <Loader />
  </div>

  <div v-else class="flex-auto p-4 bg-gray-800 border-t border-gray-700">
    <StatList
      class="flex-auto mx-auto mb-6 border border-gray-700 self-baseline lg:flex-initial md:max-w-4xl"
      :title="$t('topMaxClans', { maxRows: maxRows.toLocaleString() })"
    >
      <template #actions>
        <div>
          <div class="relative max-w-[190px]">
            <input
              v-model="clanSearchTerm"
              type="text"
              class="pr-6 pl-10 py-1.5 w-full relative z-1 bg-gray-700 border border-gray-500 rounded focus:outline-none focus:border-gray-400"
              placeholder="Search all clans"
              autofocus
            />

            <Icon
              @click="clanSearchTerm = ''"
              name="bi:search"
              class="absolute text-xl text-white cursor-pointer left-2 position-center-y z-2"
            />

            <Icon
              v-if="clanSearchTerm"
              @click="clanSearchTerm = ''"
              name="bi:x"
              class="absolute text-xl text-white cursor-pointer right-2 position-center-y z-2"
            />
          </div>
        </div>
      </template>

      <template #body>
        <table class="w-full max-w-full overflow-x-hidden overflow-y-auto border-collapse">
          <thead>
            <tr v-if="filteredClans.length > 0">
              <th align="left" class="px-2 py-1 md:px-6">Clan</th>
              <th align="center">
                <Icon name="fa6-solid:people-group" class="md:!hidden" />
                <span class="hidden md:block">{{ $t('members') }}</span>
              </th>
              <th align="left" class="px-2 py-1 md:px-6">XP</th>
            </tr>
          </thead>

          <tbody class="">
            <tr v-if="filteredClans.length === 0">
              <td colspan="3" class="px-4 py-4 text-center md:px-6">
                <h4 class="text-2xl">
                  {{ $t('noClansFound') }}
                </h4>

                <p class="mt-4">That clan isn't in the top 5,000 yet</p>
              </td>
            </tr>

            <tr
              v-for="(item, index) in filteredClans"
              :key="`top-clans-${item.name}`"
              class="overflow-hidden even:bg-gray-900 odd:bg-gray-800"
            >
              <td
                align="left"
                class="w-full px-2 py-1 overflow-hidden truncate max-w-0 md:px-6 whitespace-nowrap text-ellipsis"
              >
                <span class="mr-2 font-mono text-gray-500">
                  <span class="inline-block mr-0.5">#</span>
                  <span>{{ item.position }}</span>
                </span>

                <span>{{ item.name }} [{{ item.tag }}]</span>
              </td>

              <td align="center" class="font-mono text-sm md:text-base">{{ item.members }}</td>

              <td class="px-2 py-1 font-mono text-sm md:px-6 md:text-base whitespace-nowrap">
                {{ Number(item.xp).toLocaleString() }} XP
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </StatList>
  </div>
</template>
