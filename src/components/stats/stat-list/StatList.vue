<script setup lang="ts">
const props = defineProps<{
  title: string
  listData?: {
    key: string
    name: string
    imagePath: string
    kills: number
  }[]
}>()
</script>

<template>
  <div class="py-2 bg-gray-900 rounded">
    <div class="flex items-center justify-between w-full px-2 pb-2 border-b border-gray-700 md:px-6">
      <h3 class="text-2xl">{{ title }}</h3>
      <slot name="actions" />
    </div>

    <slot name="body">
      <ul class="px-2 mt-4 md:px-6">
        <slot name="list">
          <template v-if="listData && listData.length > 0">
            <li v-for="(item, index) in listData" :key="item.key" class="flex items-center mb-5">
              <span class="mr-8 text-3xl text-gray-500">{{ index + 1 }}</span>

              <span class="flex items-center flex-auto space-x-6">
                <img :src="item.imagePath" class="h-12" />

                <span>
                  <span class="block">
                    {{ item.name }}
                  </span>

                  <span>{{ $t('totalKills', { total: item.kills }) }}</span>
                </span>
              </span>
            </li>
          </template>
        </slot>
      </ul>
    </slot>
  </div>
</template>
