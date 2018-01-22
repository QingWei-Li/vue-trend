import { genPoints, genPath } from '../helpers/path'

export default {
  props: ['smooth', 'data', 'boundary', 'radius', 'id'],

  render (h) {
    const points = genPoints(this.data, this.boundary)
    const d = genPath(points, this.smooth ? this.radius : 0)

    return h('path', {
      attrs: { d, fill: 'none', stroke: `url(#${this.id})` }
    })
  }
}
