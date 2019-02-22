'use strict';

function int (value) {
  return parseInt(value, 10)
}

/**
 * https://en.wikipedia.org/wiki/Collinearity
 * x=(x1+x2)/2
 * y=(y1+y2)/2
 */
function checkCollinear (p0, p1, p2) {
  return (
    int(p0.x + p2.x) === int(2 * p1.x) && int(p0.y + p2.y) === int(2 * p1.y)
  )
}

function getDistance (p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

function moveTo (to, from, radius) {
  var vector = { x: to.x - from.x, y: to.y - from.y };
  var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  var unitVector = { x: vector.x / length, y: vector.y / length };

  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius
  }
}

/**
 *  Calculate the coordinate
 * @param  {number[]|object[]}  arr
 * @param  {object}             boundary
 * @return {object[]}
 */
function genPoints (arr, ref, ref$1) {
  var minX = ref.minX;
  var minY = ref.minY;
  var maxX = ref.maxX;
  var maxY = ref.maxY;
  var max = ref$1.max;
  var min = ref$1.min;

  arr = arr.map(function (item) { return (typeof item === 'number' ? item : item.value); });
  var minValue = Math.min.apply(Math, arr.concat( [min] )) - 0.001;
  var gridX = (maxX - minX) / (arr.length - 1);
  var gridY = (maxY - minY) / (Math.max.apply(Math, arr.concat( [max] )) + 0.001 - minValue);

  return arr.map(function (value, index) {
    return {
      x: index * gridX + minX,
      y:
        maxY -
        (value - minValue) * gridY +
        +(index === arr.length - 1) * 0.00001 -
        +(index === 0) * 0.00001
    }
  })
}

/**
 * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
 */
function genPath (points, radius) {
  var start = points.shift();

  return (
    "M" + (start.x) + " " + (start.y) +
    points
      .map(function (point, index) {
        var next = points[index + 1];
        var prev = points[index - 1] || start;
        var isCollinear = next && checkCollinear(next, point, prev);

        if (!next || isCollinear) {
          return ("L" + (point.x) + " " + (point.y))
        }

        var threshold = Math.min(
          getDistance(prev, point),
          getDistance(next, point)
        );
        var isTooCloseForRadius = threshold / 2 < radius;
        var radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius;

        var before = moveTo(prev, point, radiusForPoint);
        var after = moveTo(next, point, radiusForPoint);

        return ("L" + (before.x) + " " + (before.y) + "S" + (point.x) + " " + (point.y) + " " + (after.x) + " " + (after.y))
      })
      .join('')
  )
}

var Path = {
  props: ['smooth', 'data', 'boundary', 'radius', 'id', 'max', 'min', 'gradient', 'fillOpacity'],

  render: function render (h) {
    var ref = this;
    var data = ref.data;
    var smooth = ref.smooth;
    var boundary = ref.boundary;
    var radius = ref.radius;
    var id = ref.id;
    var max = ref.max;
    var min = ref.min;
    var points = genPoints(data, boundary, { max: max, min: min });
    var d = genPath(points, smooth ? radius : 0);

    return h('path', {
      attrs: { d: d, fill: ("url(#" + id), 'fill-opacity': this.fillOpacity, stroke: ("url(#" + id + ")") }
    })
  }
};

var Gradient = {
  props: ['gradient', 'id'],

  render: function render (h) {
    var ref = this;
    var gradient = ref.gradient;
    var id = ref.id;
    var len = gradient.length - 1 || 1;
    var stops = gradient
      .slice()
      .reverse()
      .map(function (color, index) { return h('stop', {
          attrs: {
            offset: index / len,
            'stop-color': color
          }
        }); }
      );

    return h('defs', [
      h(
        'linearGradient',
        {
          attrs: {
            id: id,
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
};

var Trend$1 = {
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
    gradient: {
      type: Array,
      default: function () { return ['#000']; }
    },
    fillOpacity: {
      type: String,
      default: '0'
    },
    max: {
      type: Number,
      default: -Infinity
    },
    min: {
      type: Number,
      default: Infinity
    },
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

  watch: {
    data: {
      immediate: true,
      handler: function handler (val) {
        var this$1 = this;

        this.$nextTick(function () {
          if (this$1.$isServer || !this$1.$refs.path || !this$1.autoDraw) {
            return
          }

          var path = this$1.$refs.path.$el;
          var length = path.getTotalLength();

          path.style.transition = 'none';
          path.style.strokeDasharray = length + ' ' + length;
          path.style.strokeDashoffset = Math.abs(
            length - (this$1.lastLength || 0)
          );
          path.getBoundingClientRect();
          path.style.transition = "stroke-dashoffset " + (this$1.autoDrawDuration) + "ms " + (this$1.autoDrawEasing);
          path.style.strokeDashoffset = 0;
          this$1.lastLength = length;
        });
      }
    }
  },

  render: function render (h) {
    if (!this.data || this.data.length < 2) { return }
    var ref = this;
    var width = ref.width;
    var height = ref.height;
    var padding = ref.padding;
    var viewWidth = width || 300;
    var viewHeight = height || 75;
    var boundary = {
      minX: padding,
      minY: padding,
      maxX: viewWidth - padding,
      maxY: viewHeight - padding
    };
    var props = this.$props;

    props.boundary = boundary;
    props.id = 'vue-trend-' + this._uid;
    return h(
      'svg',
      {
        attrs: {
          width: width || '100%',
          height: height || '25%',
          viewBox: ("0 0 " + viewWidth + " " + viewHeight)
        }
      },
      [
        h(Gradient, { props: props }),
        h(Path, {
          props: props,
          ref: 'path'
        })
      ]
    )
  }
};

Trend$1.install = function (Vue) {
  Vue.component(Trend$1.name, Trend$1);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Trend$1);
}

module.exports = Trend$1;
