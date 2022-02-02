import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app }) => {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}
