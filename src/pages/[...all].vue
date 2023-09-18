<template>
  <div class="flex flex-col items-center justify-center h-full">
    <div class="px-8 py-6 text-center bg-gray-700 rounded">
      <h1 class="text-2xl">{{ $t('pageNotFound') }}</h1>

      <router-view />

      <Button class="w-full mt-6" to="/">
        {{ $t('returnToCombatArea') }}
      </Button>
    </div>
  </div>
</template>
