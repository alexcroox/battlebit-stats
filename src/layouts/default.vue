<template>
  <div class="flex flex-col justify-between h-full">
    <Header />

    <main class="flex flex-col flex-auto">
      <slot />
    </main>

    <Footer />
  </div>
</template>
