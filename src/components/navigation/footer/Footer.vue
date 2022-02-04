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
    <div class="flex items-stretch space-x-2 md:space-x-6 lg:space-x-12">
      <a
        href="https://discord.com/invite/battlebit"
        target="_blank"
        title="Join the BattleBit discord"
        rel="noopener noreferrer"
        class="flex items-center space-x-2 hover:text-yellow-100"
      >
        <FontAwesomeIcon :icon="faDiscord" />
        <span class="hidden lg:block">{{ t('joinTheCommunity') }}</span>
      </a>

      <a
        href="https://www.patreon.com/battlebit/posts"
        target="_blank"
        title="Follow BattleBit Twitter"
        rel="noopener noreferrer"
        class="flex items-center space-x-2 hover:text-yellow-100"
      >
        <FontAwesomeIcon :icon="faTwitter" />
        <span class="hidden lg:block">{{ t('followOnTwitter') }}</span>
      </a>

      <a
        href="https://www.patreon.com/battlebit/posts"
        target="_blank"
        title="Become a patron"
        rel="noopener noreferrer"
        class="flex items-center space-x-2 hover:text-yellow-100"
      >
        <FontAwesomeIcon :icon="faPatreon" />
        <span class="hidden lg:block">{{ t('becomeAPatron') }}</span>
      </a>
    </div>

    <p class="text-xs text-gray-300">
      <span class="text-gray-50">Site created by Titan#7652</span
      ><span class="ml-2 hidden md:inline-block">This site is not affiliated with OkiStudio</span>
    </p>
  </nav>
</template>
