import Path from './path'
import Gradient from './gradient'

export default {
  name: 'Trend',

  props: {
    data: {
      type: Array,
      required: true
    },
    autoDraw: Boolean,
    autoDrawDuration: {
      type: Number,
      default: 2000
    },
    autoDrawEasing: {
      type: String,
      default: 'ease'
    },
    gradient: Array,
    height: Number,
    width: Number,
    padding: {
      type: Number,
      default: 8
    },
    radius: {
      type: Number,
      default: 10
    },
    smooth: Boolean
  },

  mounted () {
    const len = this.$refs.path.$el.getTotalLength()
    const { pathId, autoDrawDuration, autoDrawEasing, autoDraw } = this

    if (!autoDraw) {
      return
    }

    this.animation = `
@keyframes ${pathId}-autodraw {
  0% {
    stroke-dashoffset: ${len};
    stroke-dasharray: ${len};
  }
  100% {
    stroke-dashoffset: 0;
    stroke-dasharray: ${len};
  }
  100% {
    stroke-dashoffset: '';
    stroke-dasharray: '';
  }
}
@keyframes ${pathId}-autodraw-cleanup {
  to {
    stroke-dashoffset: '';
    stroke-dasharray: '';
  }
}
#${pathId} {
  animation:
    ${pathId}-autodraw ${autoDrawDuration}ms ${autoDrawEasing},
    ${pathId}-autodraw-cleanup 1ms ${autoDrawDuration}ms;
}`
  },

  data () {
    return { animation: '' }
  },

  render (h) {
    if (!this.data || this.data.length < 2) return

    const { width, height, padding } = this
    const viewWidth = width || 300
    const viewHeight = height || 75
    const boundary = {
      minX: padding, minY: padding,
      maxX: viewWidth - padding, maxY: viewHeight - padding
    }
    const props = this.$props

    props.boundary = boundary
    props.id = 'vue-trend-' + this._uid
    this.pathId = props.id + '-path'

    return h('svg', {
      attrs: {
        stroke: 'black',
        'stroke-width': '1',
        width: width || '100%',
        height: height || '25%',
        viewBox: `0 0 ${viewWidth} ${viewHeight}`
      }
    }, [
      h('style', null, this.animation),
      h(Gradient, { props }),
      h(Path, {
        props,
        attrs: { id: this.pathId },
        ref: 'path'
      })
    ])
  }
}
