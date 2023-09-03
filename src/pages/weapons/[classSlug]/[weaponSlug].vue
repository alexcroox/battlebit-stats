<script setup lang="ts">
import { faExclamationTriangle, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { classes, weapons } from '../../../lib/weapon-config'

const props = defineProps<{
  classSlug: string
  weaponSlug: string
}>()

const { t } = useI18n()

const currentClassConfig = $computed(() => classes[props.classSlug])
const activeWeapon = $computed(() => weapons[props.weaponSlug])

const objectModel = $computed(() => ({
  name: activeWeapon.name,
  filePath: activeWeapon.hasModel ? `/images/weapons/${activeWeapon.imageName}.obj` : null,
  fov: activeWeapon.modelFov
}))
</script>

<template>
  <div class="arsenal h-[calc(100vh-129px)] overflow-hidden">
    <div class="arsenal-grid relative flex h-full w-full flex-col md:flex-row">
      <div
        class="scrollbar-vertical relative z-20 order-2 h-full w-full overflow-y-auto px-4 pb-8 md:order-1 md:max-w-[320px]"
      >
        <div v-for="[weaponType, weaponTypeWeapons] in Object.entries(currentClassConfig.weapons)" :key="weaponType">
          <h2 class="container-padding-x mt-6 capitalize">{{ weaponType.replace(/-/g, ' ') }}</h2>

          <router-link
            v-for="weaponKey in weaponTypeWeapons"
            :key="weaponKey"
            :to="`/weapons/${props.classSlug}/${weaponKey}`"
            class="container-padding-x mt-2 flex items-center justify-between rounded border-2 border-transparent bg-gray-900 py-1 hover:text-yellow-100"
            :class="{ 'border-yellow-100': props.weaponSlug === weaponKey }"
          >
            <span class="flex items-center space-x-4">
              <img :src="`/images/weapons/${weapons[weaponKey].imageName}.png`" class="h-8" />
              <span v-if="weapons[weaponKey]">{{ weapons[weaponKey].name }}</span>
            </span>

            <span class="flex items-center space-x-2 text-sm text-gray-500">
              <FontAwesomeIcon :icon="faLockOpen" class="text-gray-700" />
              <span>{{ weapons[weaponKey].unlockLevel }}</span>
            </span>
          </router-link>
        </div>
      </div>

      <div
        class="relative order-1 w-full items-center md:order-2 md:flex md:w-auto md:flex-auto md:flex-col md:justify-between md:overflow-hidden"
      >
        <ModelViewer
          :objectModel="objectModel"
          class="absolute left-0 right-0 z-10 h-[65vh] md:bottom-0 md:top-0 md:h-auto"
        />

        <div class="md:overflow-hidden">
          <div
            class="scrollbar-horizontal flex w-full items-center justify-between space-x-2 overflow-x-auto overflow-y-hidden py-4 px-4 md:w-auto"
          >
            <router-link
              v-for="[soldierClass, classConfig] of Object.entries(classes)"
              :key="soldierClass"
              :to="`/weapons/${soldierClass}/${classes[soldierClass].demoWeapon}`"
              class="group relative z-20 flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded border-2 border-transparent bg-gray-700 bg-opacity-60 transition-all hover:border-yellow-100"
              :class="{ 'border-yellow-100': props.classSlug === soldierClass }"
            >
              <img :src="`/images/classes/${classConfig.imageName}.png`" class="h-8 rounded" />

              <p class="mt-1 font-medium group-hover:text-yellow-100">
                {{ classConfig.name }}
              </p>
            </router-link>
          </div>
        </div>

        <div class="mt-6 flex w-full flex-auto flex-col items-center text-center md:mt-12">
          <div class="relative w-full md:h-full" :class="activeWeapon.hasModel ? 'h-[20vh] ' : 'h-[30vh] '">
            <h1 class="position-center-x absolute z-20 text-2xl md:text-4xl">{{ props.weaponSlug }}</h1>

            <div
              v-if="!activeWeapon.hasModel"
              class="position-center absolute flex w-full flex-col items-center justify-center"
            >
              <img :src="`/images/weapons/${activeWeapon.imageName}.png`" class="" />

              <div class="flex items-center space-x-4 rounded bg-gray-800 px-4 py-2 text-yellow-100 md:mt-4">
                <FontAwesomeIcon :icon="faExclamationTriangle" />
                <span class="text-left">{{ t('missingModel') }}</span>
              </div>
            </div>
          </div>
        </div>
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
