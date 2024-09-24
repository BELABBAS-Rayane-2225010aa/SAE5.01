import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        mock: {
          intersectionObserver: true,
          indexedDb: true,
        }
        // you can optionally set Nuxt-specific environment options
        //
        // rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
        // domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
        // overrides: {
          // other Nuxt config you want to pass
        // }
      }
    }
  }
  // any custom Vitest config you require
})