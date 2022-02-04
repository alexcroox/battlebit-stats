<script setup lang="ts">
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center">
    <div class="rounded bg-gray-700 px-8 py-6 text-center">
      <div class="flex items-center space-x-2">
        <FontAwesomeIcon :icon="faInfoCircle" />
        <span>{{ t('comingSoonIfStats') }}</span>
      </div>

      <Button class="mt-6" to="/">
        {{ t('returnToCombatArea') }}
      </Button>
    </div>
  </div>
</template>
