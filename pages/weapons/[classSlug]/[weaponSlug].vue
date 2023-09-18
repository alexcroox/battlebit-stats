<script setup lang="ts">
import { classes, weapons } from '~/lib/weapon-config'

const props = defineProps<{
  classSlug: string
  weaponSlug: string
}>()

const currentClassConfig = computed(() => classes[props.classSlug])
const activeWeapon = computed(() => weapons[props.weaponSlug])

const objectModel = computed(() => ({
  name: activeWeapon.name,
  filePath: activeWeapon.hasModel ? `/images/weapons/${activeWeapon.imageName}.obj` : null,
  fov: activeWeapon.modelFov,
}))
</script>

<template>
  <div class="arsenal h-[calc(100vh-90px)] overflow-hidden">
    <div class="relative flex flex-col w-full h-full arsenal-grid md:flex-row">
      <div
        class="scrollbar-vertical relative z-20 order-2 h-full w-full overflow-y-auto px-4 pb-8 md:order-1 md:max-w-[320px]"
      >
        <div
          v-for="[weaponType, weaponTypeWeapons] in Object.entries(currentClassConfig.weapons)"
          :key="weaponType"
        >
          <h2 class="mt-6 capitalize container-padding-x">{{ weaponType.replace(/-/g, ' ') }}</h2>

          <NuxtLink
            v-for="weaponKey in weaponTypeWeapons"
            :key="weaponKey"
            :to="`/weapons/${props.classSlug}/${weaponKey}`"
            class="flex items-center justify-between py-1 mt-2 bg-gray-900 border-2 border-transparent rounded container-padding-x hover:text-yellow-100"
            :class="{ 'border-yellow-100': props.weaponSlug === weaponKey }"
          >
            <span class="flex items-center space-x-4">
              <img :src="`/images/weapons/${weapons[weaponKey].imageName}.png`" class="h-8" />
              <span v-if="weapons[weaponKey]">{{ weapons[weaponKey].name }}</span>
            </span>

            <span class="flex items-center space-x-2 text-sm text-gray-500">
              <Icon name="fa-solid:lock-open" class="text-gray-700" />
              <span>{{ weapons[weaponKey].unlockLevel }}</span>
            </span>
          </NuxtLink>
        </div>
      </div>

      <div
        class="relative items-center order-1 w-full md:order-2 md:flex md:w-auto md:flex-auto md:flex-col md:justify-between md:overflow-hidden"
      >
        <ModelViewer
          :objectModel="objectModel"
          class="absolute left-0 right-0 z-10 h-[65vh] md:bottom-0 md:top-0 md:h-auto"
        />

        <div class="md:overflow-hidden">
          <div
            class="flex items-center justify-between w-full px-4 py-4 space-x-2 overflow-x-auto overflow-y-hidden scrollbar-horizontal md:w-auto"
          >
            <NuxtLink
              v-for="[soldierClass, classConfig] of Object.entries(classes)"
              :key="soldierClass"
              :to="`/weapons/${soldierClass}/${classes[soldierClass].demoWeapon}`"
              class="relative z-20 flex flex-col items-center justify-center flex-shrink-0 w-20 h-20 transition-all bg-gray-700 border-2 border-transparent rounded group bg-opacity-60 hover:border-yellow-100"
              :class="{ 'border-yellow-100': props.classSlug === soldierClass }"
            >
              <img :src="`/images/classes/${classConfig.imageName}.png`" class="h-8 rounded" />

              <p class="mt-1 font-medium group-hover:text-yellow-100">
                {{ classConfig.name }}
              </p>
            </NuxtLink>
          </div>
        </div>

        <div class="flex flex-col items-center flex-auto w-full mt-6 text-center md:mt-12">
          <div class="relative w-full md:h-full" :class="activeWeapon.hasModel ? 'h-[20vh] ' : 'h-[30vh] '">
            <h1 class="absolute z-20 text-2xl position-center-x md:text-4xl">{{ props.weaponSlug }}</h1>

            <div
              v-if="!activeWeapon.hasModel"
              class="absolute flex flex-col items-center justify-center w-full position-center"
            >
              <img :src="`/images/weapons/${activeWeapon.imageName}.png`" class="" />

              <div class="flex items-center px-4 py-2 space-x-4 text-yellow-100 bg-gray-800 rounded md:mt-4">
                <Icon name="fa-solid:exclamation-triangle" />
                <span class="text-left">{{ $t('missingModel') }}</span>
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
