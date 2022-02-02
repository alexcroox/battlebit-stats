<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'BattleBit Stats',
  meta: [{ name: 'description', content: 'Stats, maps and information about the BattleBit Remastered game' }]
})
</script>

<template>
  <router-view />
</template>
