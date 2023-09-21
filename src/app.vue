<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import '~/assets/css/index.css'

useHead({
  title: 'BattleBit Stats',
  titleTemplate: '%s | BattleBit Stats',
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', href: '~/assets/images/brand/favicon.png' },
    { rel: 'apple-touch-icon', href: '~/assets/images/brand/pwa-192x192.png' },
    { rel: 'mask-icon', href: '~/assets/images/brand/safari-pinned-tab.png', color: '#00aba9' },
  ],
  meta: {
    'msapplication-TileColor': '#00aba9',
    'theme-color': '#1E2A38',
    viewport: 'width=device-width, initial-scale=1',
  },
})

useSeoMeta({
  title: 'BattleBit Stats',
  description: 'Stats, maps and information about the BattleBit Remastered game',
  ogImage: '~/assets/images/brand/og.png',
})

if (process.client && window.navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}
</script>
