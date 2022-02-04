<script setup lang="ts">
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { classes, weapons } from '../../../lib/weapon-config'

const props = defineProps<{
  classSlug: string
  weaponSlug: string
}>()
const { t } = useI18n()

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

const currentClassConfig = $computed(() => classes[props.classSlug])
const activeWeapon = $computed(() => weapons[props.weaponSlug])
</script>

<template>
  <div class="arsenal h-full w-full">
    <div class="arsenal-grid relative flex h-full w-full flex-wrap items-start md:flex-nowrap">
      <div class="order-2 w-full flex-shrink-0 px-4 pb-8 md:order-1 md:w-[230px]">
        <div v-for="[weaponType, weaponTypeWeapons] in Object.entries(currentClassConfig.weapons)" :key="weaponType">
          <h2 class="container-padding-x mt-6 capitalize">{{ weaponType.replace('-', ' ') }}</h2>

          <router-link
            v-for="weaponKey in weaponTypeWeapons"
            :key="weaponKey"
            :to="`/weapons/${props.classSlug}/${weaponKey}`"
            class="container-padding-x mt-2 flex items-center space-x-4 rounded border-2 border-transparent bg-gray-900 py-1 hover:text-yellow-100"
            :class="{ 'border-yellow-100': props.weaponSlug === weaponKey }"
            @click="scrollToTop()"
          >
            <img :src="`/images/weapons/${weaponType}/${weaponKey}.png`" class="h-8" />
            <span>{{ weaponKey }}</span>
          </router-link>
        </div>
      </div>

      <div
        class="order-1 w-full items-center overflow-hidden md:order-2 md:flex md:w-auto md:flex-auto md:flex-col md:justify-between xl:absolute xl:left-1/2 xl:mt-4 xl:-translate-x-1/2"
      >
        <div class="overflow-hidden">
          <div
            class="flex w-full items-center justify-between space-x-2 overflow-x-auto overflow-y-hidden py-4 px-4 md:w-auto"
          >
            <router-link
              v-for="[soldierClass, classConfig] of Object.entries(classes)"
              :key="soldierClass"
              :to="`/weapons/${soldierClass}/${activeWeapon.name}`"
              class="group flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded border-2 border-transparent bg-gray-700 bg-opacity-60 transition-all hover:border-yellow-100"
              :class="{ 'border-yellow-100': props.classSlug === soldierClass }"
            >
              <img :src="`/images/classes/${classConfig.imageName}.png`" class="h-8 rounded" />

              <p class="mt-1 font-medium group-hover:text-yellow-100">
                {{ classConfig.name }}
              </p>
            </router-link>
          </div>

          <div class="mt-4 flex justify-center xl:hidden">
            <div class="flex items-center space-x-4 rounded bg-gray-800 px-4 py-2 text-yellow-100 md:mt-8">
              <FontAwesomeIcon :icon="faExclamationTriangle" />
              <span>{{ t('pageWorkingInProgress') }}</span>
            </div>
          </div>
        </div>

        <div class="mt-12 flex flex-col items-center justify-center text-center md:mt-0 md:flex-auto xl:hidden">
          <div>
            <h1 class="text-4xl">{{ props.weaponSlug }}</h1>
            <img :src="`/images/weapons/${activeWeapon.weaponType}/${activeWeapon.imageName}.png`" class="mt-4 block" />
          </div>
        </div>
      </div>

      <div
        class="position-center-x absolute top-[150px] hidden items-center space-x-2 rounded bg-gray-800 px-4 py-2 text-center text-yellow-100 xl:flex"
      >
        <FontAwesomeIcon :icon="faExclamationTriangle" />
        <span>This page is a work in progress pending more data collection</span>
      </div>

      <div class="position-center absolute hidden text-center xl:block">
        <h1 class="text-4xl">{{ props.weaponSlug }}</h1>
        <img :src="`/images/weapons/${activeWeapon.weaponType}/${activeWeapon.imageName}.png`" class="mt-4 block" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.arsenal {
  background: #384251;
  background: radial-gradient(ellipse at center, #384251, #111927);
}
.arsenal-grid {
  background-image: repeating-linear-gradient(#374151 0 1px, transparent 1px 100%),
    repeating-linear-gradient(90deg, #374151 0 1px, transparent 1px 100%);
  background-size: 71px 71px;
}
</style>
