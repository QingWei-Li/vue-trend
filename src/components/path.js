import { genPoints, genPath } from '../helpers/path'

export default {
  props: ['smooth', 'data', 'boundary', 'radius', 'id', 'max', 'min', 'gradient', 'fillOpacity'],

  render (h) {
    const { data, smooth, boundary, radius, id, max, min } = this
    const points = genPoints(data, boundary, { max, min })
    const d = genPath(points, smooth ? radius : 0)

    return h('path', {
      attrs: { d, fill: `url(#${id}`, 'fill-opacity': this.fillOpacity, stroke: `url(#${id})` }
    })
  }
}
