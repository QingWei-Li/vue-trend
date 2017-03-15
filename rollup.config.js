import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  plugins: [buble()],
  moduleName: 'vue-trend',
  targets: [
    { dest: 'dist/vue-trend.js', format: 'umd' },
    { dest: 'dist/vue-trend.common.js', format: 'cjs' },
    { dest: 'dist/vue-trend.esm.js', format: 'es' }
  ]
}
