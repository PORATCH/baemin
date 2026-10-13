import { readFileSync } from 'node:fs'
import { defineConfig, mergeConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import appConfig from './vite.config.ts'

export default mergeConfig(appConfig, defineConfig({
  plugins: [
    {
      name: 'inline-baseline-favicon',
      transformIndexHtml(html) {
        const icon = readFileSync(new URL('./public/favicon.svg', import.meta.url)).toString('base64')
        return html.replace(/href="(?:\.\/|\/)?favicon\.svg"/, `href="data:image/svg+xml;base64,${icon}"`)
      },
    },
    viteSingleFile({ removeViteModuleLoader: true }),
  ],
  build: { outDir: 'web-test', copyPublicDir: false },
}))
