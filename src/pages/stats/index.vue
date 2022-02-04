<script setup lang="ts">
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div class="flex h-full flex-col items-center sm:justify-center">
    <div class="mx-4 mt-8 rounded bg-gray-700 px-4 py-6 sm:mt-0 sm:px-8">
      <div class="flex items-center space-x-4 sm:space-x-2">
        <FontAwesomeIcon :icon="faInfoCircle" />
        <span>{{ t('comingSoonIfStats') }}</span>
      </div>

      <Button class="mt-6" to="/">
        {{ t('returnToCombatArea') }}
      </Button>
    </div>
  </div>
</template>
