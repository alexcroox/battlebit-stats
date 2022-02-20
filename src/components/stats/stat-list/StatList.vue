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

const { t } = useI18n()
</script>

<template>
  <div class="rounded-md bg-gray-900 py-2">
    <div class="border-b border-gray-700 px-6 pb-2">
      <h3 class="text-2xl">{{ title }}</h3>
    </div>

    <ul class="mt-4 px-6">
      <slot name="body">
        <template v-if="listData.length > 0">
          <li v-for="(item, index) in listData" :key="item.key" class="mb-5 flex items-center">
            <span class="mr-8 text-3xl text-gray-500">{{ index + 1 }}</span>

            <span class="flex flex-auto items-center space-x-6">
              <img :src="item.imagePath" class="h-12" />

              <span>
                <span class="block">
                  {{ item.name }}
                </span>

                <span>{{ t('totalKills', { total: item.kills }) }}</span>
              </span>
            </span>
          </li>
        </template>
      </slot>
    </ul>
  </div>
</template>
