import Trend from './components/trend'

Trend.install = function(Vue) {
  Vue.component(Trend.name, Trend)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Trend)
}

export default Trend