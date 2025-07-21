import { useApp } from 'aeria-ui'
import aeriaEn from '@aeria-ui/i18n-en'
import { en } from './i18n/index.js'
import { routes } from './routes.js'
import Main from './main.vue'
import NoResults from './components/no-results.vue'

const { app, mount } = await useApp({
  component: Main,
  routes,
  i18n: {
    current: 'en',
    locales: {
      en: [
        aeriaEn,
        en,
      ],
    },
  },

})

app.provide('noResultsComponent', NoResults)
mount()

