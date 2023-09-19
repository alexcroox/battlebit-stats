<template>
  <nav class="flex items-center justify-between px-2 py-2 text-white bg-gray-800 sm:px-4">
    <NuxtLink
      to="/"
      :title="$t('home')"
      class="items-center hidden text-xl font-extrabold tracking-wide uppercase text-yellow-50 sm:flex"
    >
      <img src="~/assets/images/brand/logo-white.png" class="mr-2 h-[20px]" />
      {{ $t('battleBitStats') }}
    </NuxtLink>

    <div class="flex items-center flex-1 space-x-8 sm:flex-initial">
      <div class="flex justify-between w-full sm:w-auto sm:max-w-none sm:space-x-4 md:space-x-8">
        <NavItem to="/" :label="$t('home')" />

        <NavItem to="/maps" :label="$t('maps')" />

        <NavItem to="/weapons" :label="$t('weapons')" />

        <NavItem to="/stats/player/titan" :label="$t('playerStats')" class="hidden md:block" />
        <NavItem to="/stats/player/titan" :label="$t('stats')" class="md:hidden" />
      </div>
    </div>
  </nav>
</template>
