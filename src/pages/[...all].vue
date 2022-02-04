<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <div class="rounded bg-gray-700 px-8 py-6 text-center">
      <h1 class="text-2xl">{{ t('pageNotFound') }}</h1>

      <router-view />

      <Button class="mt-6 w-full" to="/">
        {{ t('returnToCombatArea') }}
      </Button>
    </div>
  </div>
</template>
