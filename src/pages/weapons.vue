<script setup lang="ts">
import { filename } from 'pathe/utils'
import { classes, weapons } from '~/lib/weaponConfig'

const route = useRoute()
const router = useRouter()

if (!route.params.classSlug || !route.params.weaponSlug) {
  router.replace('/weapons/assault/M4A1')
}

const classSlug = computed(() => route.params.classSlug as string)
const weaponSlug = computed(() => route.params.weaponSlug as string)

const currentClassConfig = computed(() => classes[classSlug.value])
const activeWeapon = computed(() => weapons[weaponSlug.value])

const objectModel = computed(() => ({
  name: activeWeapon?.value.name,
  filePath: activeWeapon?.value.hasModel
    ? `https://asset.battlebitstats.com/weapons/${activeWeapon?.value.imageName}.obj`
    : null,
  fov: activeWeapon?.value.modelFov,
}))

const classGlob = import.meta.glob('/assets/images/classes/*.png', { eager: true })

const classImages = Object.fromEntries(
  Object.entries(classGlob).map(([key, value]) => [filename(key), value.default]),
)
</script>

<template>
  <div class="arsenal h-[calc(100vh-90px)] overflow-hidden">
    <div class="relative flex flex-col w-full h-full arsenal-grid md:flex-row">
      <div
        class="scrollbar-vertical relative z-20 order-2 h-full w-full overflow-y-auto px-4 pb-8 md:order-1 md:max-w-[320px]"
      >
        <div
          v-if="currentClassConfig?.weapons"
          v-for="[weaponType, weaponTypeWeapons] in Object.entries(currentClassConfig.weapons)"
          :key="weaponType"
        >
          <h2 class="mt-6 capitalize container-padding-x">{{ weaponType.replace(/-/g, ' ') }}</h2>

          <NuxtLink
            v-for="weaponKey in weaponTypeWeapons"
            :key="weaponKey"
            :to="`/weapons/${classSlug}/${weaponKey}`"
            class="flex items-center justify-between py-1 mt-2 bg-gray-900 border-2 border-transparent rounded container-padding-x hover:text-yellow-100"
            :class="{ 'border-yellow-100': weaponSlug === weaponKey }"
          >
            <span class="flex items-center space-x-4">
              <img
                :src="`https://asset.battlebitstats.com/weapons/${weapons[weaponKey].imageName}.png`"
                class="h-8"
              />
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
        <div class="md:overflow-hidden">
          <div
            class="flex items-center justify-between w-full px-4 py-4 space-x-2 overflow-x-auto overflow-y-hidden scrollbar-horizontal md:w-auto"
          >
            <NuxtLink
              v-for="[soldierClass, classConfig] of Object.entries(classes)"
              :key="soldierClass"
              :to="`/weapons/${soldierClass}/${classes[soldierClass].demoWeapon}`"
              class="relative z-20 flex flex-col items-center justify-center flex-shrink-0 w-20 h-20 transition-all bg-gray-700 border-2 border-transparent rounded group bg-opacity-60 hover:border-yellow-100"
              :class="{ 'border-yellow-100': classSlug === soldierClass }"
            >
              <img :src="classImages[classConfig.imageName]" class="h-8 rounded" />

              <p class="mt-1 font-medium group-hover:text-yellow-100">
                {{ classConfig.name }}
              </p>
            </NuxtLink>
          </div>
        </div>

        <NuxtPage
          v-if="currentClassConfig"
          :objectModel="objectModel"
          :hasModel="activeWeapon.hasModel"
          :imageName="activeWeapon.imageName"
          :weaponSlug="weaponSlug"
        />
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
