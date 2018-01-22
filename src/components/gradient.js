export default {
  props: ['gradient', 'id'],

  render (h) {
    const { gradient, id } = this
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
        'linearGradient',
        {
          attrs: {
            id,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          }
        },
        stops
      )
    ])
  }
}
