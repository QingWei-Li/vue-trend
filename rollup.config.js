import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  plugins: [buble()],
  moduleName: 'VueTrend',
  external: ['vue'],
  globals: {
    vue: 'Vue'
  },
  targets: [
    { dest: 'dist/vue-trend-component.js', format: 'umd' },
    { dest: 'dist/vue-trend-component.common.js', format: 'cjs' },
    { dest: 'dist/vue-trend-component.esm.js', format: 'es' }
  ]
}
