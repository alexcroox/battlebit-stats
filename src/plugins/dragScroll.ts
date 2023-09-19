import { dragscroll } from 'vue-dragscroll'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('dragscroll', dragscroll)
})
