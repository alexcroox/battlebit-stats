<script setup lang="ts">
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div class="flex h-full flex-col items-center sm:justify-center">
    <div class="mx-4 mt-8 rounded bg-gray-700 px-4 py-6 sm:mt-0 sm:px-8">
      <div class="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-8">
        <img src="/images/ranks/10.png" class="mx-auto block h-24" />

        <div>
          <div class="flex items-center space-x-4 sm:space-x-2">
            <FontAwesomeIcon :icon="faInfoCircle" />
            <span>{{ t('comingSoonIfStats') }}</span>
          </div>

          <Button class="mt-6 w-full md:w-auto" to="/">
            {{ t('returnToCombatArea') }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
