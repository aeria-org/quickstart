import { useApp, defineOptions, AeriaMain } from 'aeria-ui'
import waltzPtbr from '@aeria-ui/i18n-ptbr'
import { ptbr } from './i18n/index.js'
import { routes } from './routes.js'

import '@aeria-ui/ui/style.css'
import 'aeria-app-layout/style.css'
import './style/main.css'
import './style/main.less'

const options = defineOptions({
  component: AeriaMain,
  routes,
  i18n: {
    current: 'pt_BR',
    locales: {
      pt_BR: [
        waltzPtbr,
        ptbr,
      ],
    },
  },
  menuSchema: [
    '/dashboard/',
    '/dashboard/pizza',
    '/dashboard/user',
  ],
})

useApp(options).then((app) => {
  app.mount()
})

