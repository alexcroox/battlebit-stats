<script setup lang="ts">
import { faDiscord, faPatreon, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { isDark, toggleDark } from '~/composables'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="container-padding-x flex w-full items-center justify-between bg-gray-800 py-2 text-sm">
    <div class="flex items-center space-x-12">
      <a
        href="https://discord.com/invite/battlebit"
        target="_blank"
        title="Join the BattleBit discord"
        rel="noopener noreferrer"
        class="hover:text-yellow-100"
      >
        <FontAwesomeIcon :icon="faDiscord" class="mr-1" />
        {{ t('joinTheCommunity') }}
      </a>

      <a
        href="https://www.patreon.com/battlebit/posts"
        target="_blank"
        title="Follow BattleBit Twitter"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon :icon="faTwitter" class="mr-1" />
        {{ t('followOnTwitter') }}
      </a>

      <a
        href="https://www.patreon.com/battlebit/posts"
        target="_blank"
        title="Become a patron"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon :icon="faPatreon" class="mr-1" />
        {{ t('becomeAPatron') }}
      </a>
    </div>

    <p class="text-xs text-gray-300">
      <span class="text-gray-50">Site created by Titan#7652</span>. This site is not affiliated with OkiStudio
    </p>
  </nav>
</template>
