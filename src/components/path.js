import { genPoints, linearPath, smoothPath } from '../helpers/path'

export default {
  props: ['smooth', 'data', 'boundary', 'radius', 'id'],

  render (h) {
    const points = genPoints(this.data, this.boundary)
    const d = (this.smooth ? smoothPath : linearPath)(points, this.radius)

    return h('path', {
      attrs: { d, fill: 'none', stroke: `url(#${this.id})` }
    })
  }
}
