<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import '~/assets/css/index.css'

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', href: '/images/brand/favicon.png' },
    { rel: 'apple-touch-icon', href: '/images/brand/pwa-192x192.png' },
    { rel: 'mask-icon', href: '/images/brand/safari-pinned-tab.png', color: '#00aba9' },
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
  ogImage: '/images/brand/og.png',
})
</script>
