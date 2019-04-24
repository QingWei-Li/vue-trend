export default {
  props: ['gradient', 'gradientDirection', 'id'],

  render(h) {
    const {
      gradient,
      gradientDirection,
      id
    } = this
    const len = gradient.length - 1 || 1
    const stops = gradient
      .slice()
      .reverse()
      .map((color, index) =>
        h('stop', {
          attrs: {
            offset: index / len,
            'stop-color': color
          }
        })
      )

    return h('defs', [
      h(
        'linearGradient', {
          attrs: {
            id,
            /*
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
            */
            x1: +(gradientDirection === 'left'),
            y1: +(gradientDirection === 'top'),
            x2: +(gradientDirection === 'right'),
            y2: +(gradientDirection === 'bottom')
          }
        },
        stops
      )
    ])
  }
}