<template>
  <div class="flex h-full flex-col justify-between">
    <Header />

    <main class="flex-auto">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
