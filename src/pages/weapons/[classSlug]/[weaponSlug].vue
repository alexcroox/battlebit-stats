<script setup lang="ts">
const props = defineProps<{
  objectModel: object
  hasModel: boolean
  imageName: string
  weaponSlug: string
  classSlug: string
}>()

useHead({
  title: `${props.objectModel.name} | ${props.classSlug.charAt(0).toUpperCase() + props.classSlug.slice(1)} Class`,
})
</script>

<template>
  <ModelViewer
    :objectModel="objectModel"
    class="absolute left-0 right-0 z-10 h-[65vh] md:bottom-0 md:top-0 md:h-auto"
  />

  <div class="flex flex-col items-center flex-auto w-full mt-6 text-center md:mt-12">
    <div class="relative w-full md:h-full" :class="hasModel ? 'h-[20vh] ' : 'h-[30vh] '">
      <h1 class="absolute z-20 text-2xl position-center-x md:text-4xl">{{ weaponSlug }}</h1>

      <div v-if="!hasModel" class="absolute flex flex-col items-center justify-center w-full position-center">
        <img :src="`~/assets/images/weapons/${imageName}.png`" class="" />

        <div class="flex items-center px-4 py-2 space-x-4 text-yellow-100 bg-gray-800 rounded md:mt-4">
          <Icon name="fa-solid:exclamation-triangle" />
          <span class="text-left">{{ $t('missingModel') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
