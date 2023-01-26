<script setup lang="ts">
import { faDiscord, faGithub, faPatreon, faTwitter } from '@fortawesome/free-brands-svg-icons'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav
    class="flex items-center justify-between w-full py-2 text-sm bg-gray-800 border-t border-gray-700 container-padding-x"
  >
    <div class="flex items-stretch space-x-6 lg:space-x-12">
      <a
        href="https://github.com/alexcroox/battlebit-stats/blob/main/README.md"
        target="_blank"
        title="View GitHub repository"
        rel="noopener noreferrer"
        class="flex items-center space-x-2 hover:text-yellow-100"
      >
        <FontAwesomeIcon :icon="faGithub" />
        <span class="hidden lg:block">{{ t('openSource') }}</span>
      </a>

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
        href="https://twitter.com/BattleBitGame"
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
      <span class="text-gray-50">
        {{ t('siteCreatedBy') }}
        <a href="https://discordapp.com/users/Titan#7652" target="_blank" class="underline hover:text-yellow-100">
          <span>Titan#7652</span>
        </a>
      </span>
      <span class="hidden ml-1 xl:inline-block">{{ t('siteNotAffiliatedWith') }}</span>
    </p>
  </nav>
</template>
