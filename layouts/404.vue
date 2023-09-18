<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="flex flex-col items-center justify-center h-full">
    <div class="px-8 py-6 text-center bg-gray-800 rounded">
      <h1 class="text-2xl">{{ $t('pageNotFound') }}</h1>

      <router-view />

      <Button class="w-full mt-6" @click="router.back()">
        {{ $t('returnToCombatArea') }}
      </Button>
    </div>
  </main>
</template>
