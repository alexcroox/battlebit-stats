<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import '~/assets/css/index.css'

useHead({
  link: [
    { rel: 'icon', href: 'https://asset.battlebitstats.com/brand/favicon.png', type: 'image/png' },
    { rel: 'apple-touch-icon', href: 'https://asset.battlebitstats.com/brand/pwa-192x192.png' },
    { rel: 'mask-icon', href: 'https://asset.battlebitstats.com/brand/safari-pinned-tab.png', color: '#00aba9' },
  ],
  htmlAttrs: { lang: 'en' },
})

useSeoMeta({
  title: 'BattleBit Stats',
  titleTemplate: '%s | BattleBit Stats',
  msapplicationTileColor: '#00aba9',
  themeColor: '#1E2A38',
  viewport: 'width=device-width, initial-scale=1',
  description: 'Stats, maps and information about the BattleBit Remastered game',
  ogImage: 'https://asset.battlebitstats.com/brand/og.png',
})

if (process.client && window.navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}
</script>
