import { genPoints, genPath } from '../helpers/path'

export default {
  props: ['smooth', 'data', 'boundary', 'radius', 'id', 'max', 'min'],

  render (h) {
    const { data, smooth, boundary, radius, id, max, min } = this
    const points = genPoints(data, boundary, { max, min })
    const d = genPath(points, smooth ? radius : 0)

    return h('path', {
      attrs: { d, fill: 'none', stroke: `url(#${id})` }
    })
  }
}
