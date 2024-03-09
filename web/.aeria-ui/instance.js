// @ts-check
import vueRouter from 'unplugin-vue-router/vite'

/** @type {import('aeria-ui-build').InstanceConfig} */
export default {
  site: {
    title: 'Quickstart',
    signinText: 'Área restrita',
    signupForm: true,
  },
  icons: {
    libraries: [
      '@aeria-ui/ui',
      'aeria-app-layout',
    ],
  },
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
    plugins: [
      vueRouter({
        dts: './.aeria-ui/typed-router.d.ts'
      })
    ]
  },
}

