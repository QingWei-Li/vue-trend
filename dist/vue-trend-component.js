(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueTrend = factory());
}(this, (function () { 'use strict';

function int (value) {
  return parseInt(value, 10)
}

/**
 * https://en.wikipedia.org/wiki/Collinearity
 * x=(x1+x2)/2
 * y=(y1+y2)/2
 */
function checkCollinear (p0, p1, p2) {
  return int(p0.x + p2.x) === int(2 * p1.x) && int(p0.y + p2.y) === int(2 * p1.y)
}

function getDistance (p1, p2) {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
  )
}

function moveTo (to, from, radius) {
  var vector = { x: to.x - from.x, y: to.y - from.y };
  var length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
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
function genPoints (arr, ref) {
  var minX = ref.minX;
  var minY = ref.minY;
  var maxX = ref.maxX;
  var maxY = ref.maxY;

  var gridX = (maxX - minX) / (arr.length - 1);
  var gridY = (maxY - minY) / (Math.max.apply(Math, arr) - Math.min.apply(Math, arr));

  return arr.map(function (item, index) {
    var value = typeof item === 'number' ? item : item.value;

    return { x: index * gridX + minX, y: maxY - value * gridY }
  })
}

function linearPath (points) {
  var ref = points.shift();
  var x = ref.x;
  var y = ref.y;

  return "M" + x + " " + y + points.map(function (ref) {
    var x = ref.x;
    var y = ref.y;

    return ("L" + x + " " + y);
  }).join('')
}

/**
 * From https://github.com/unsplash/react-trend/blob/master/src/helpers/DOM.helpers.js#L18
 */
function smoothPath (points, radius) {
  var start = points.shift();

  return "M" + (start.x) + " " + (start.y) + points.map(function (point, index) {
    var next = points[index + 1];
    var prev = points[index - 1] || start;
    var isCollinear = next && checkCollinear(next, point, prev);

    if (!next || isCollinear) {
      return ("L" + (point.x) + " " + (point.y))
    }

    var threshold = Math.min(getDistance(prev, point), getDistance(next, point));
    var isTooCloseForRadius = (threshold / 2) < radius;
    var radiusForPoint = isTooCloseForRadius ? threshold / 2 : radius;

    var before = moveTo(prev, point, radiusForPoint);
    var after = moveTo(next, point, radiusForPoint);

    return ("L" + (before.x) + " " + (before.y) + "S" + (point.x) + " " + (point.y) + " " + (after.x) + " " + (after.y))
  }).join('')
}

var Path = {
  props: ['smooth', 'data', 'boundary', 'radius', 'id'],

  render: function render (h) {
    var points = genPoints(this.data, this.boundary);
    var d = (this.smooth ? smoothPath : linearPath)(points, this.radius);

    return h('path', {
      attrs: { d: d, fill: 'none', stroke: ("url(#" + (this.id) + ")") }
    })
  }
};

var Gradient = {
  props: ['gradient', 'id'],

  render: function render (h) {
    var ref = this;
    var gradient = ref.gradient;
    var id = ref.id;
    var len = gradient.length - 1;
    var stops = gradient.slice().reverse().map(function (color, index) { return h('stop', {
        attrs: {
          offset: index / len,
          'stop-color': color
        }
      }); }
    );

    return h('defs', [
      h('linearGradient', {
        attrs: {
          id: id,
          x1: 0, y1: 0,
          x2: 0, y2: 1
        }
      }, stops)
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

  mounted: function mounted () {
    var len = this.$refs.path.$el.getTotalLength();
    var ref = this;
    var pathId = ref.pathId;
    var autoDrawDuration = ref.autoDrawDuration;
    var autoDrawEasing = ref.autoDrawEasing;
    var autoDraw = ref.autoDraw;

    if (!autoDraw) {
      return
    }

    this.animation = "\n@keyframes " + pathId + "-autodraw {\n  0% {\n    stroke-dashoffset: " + len + ";\n    stroke-dasharray: " + len + ";\n  }\n  100% {\n    stroke-dashoffset: 0;\n    stroke-dasharray: " + len + ";\n  }\n  100% {\n    stroke-dashoffset: '';\n    stroke-dasharray: '';\n  }\n}\n@keyframes " + pathId + "-autodraw-cleanup {\n  to {\n    stroke-dashoffset: '';\n    stroke-dasharray: '';\n  }\n}\n#" + pathId + " {\n  animation:\n    " + pathId + "-autodraw " + autoDrawDuration + "ms " + autoDrawEasing + ",\n    " + pathId + "-autodraw-cleanup 1ms " + autoDrawDuration + "ms;\n}";
  },

  data: function data () {
    return { animation: '' }
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
      minX: padding, minY: padding,
      maxX: viewWidth - padding, maxY: viewHeight - padding
    };
    var props = this.$props;

    props.boundary = boundary;
    props.id = 'vue-trend-' + this._uid;
    this.pathId = props.id + '-path';

    return h('svg', {
      attrs: {
        stroke: 'black',
        'stroke-width': '1',
        width: width || '100%',
        height: height || '25%',
        viewBox: ("0 0 " + viewWidth + " " + viewHeight)
      }
    }, [
      h('style', null, this.animation),
      h(Gradient, { props: props }),
      h(Path, {
        props: props,
        attrs: { id: this.pathId },
        ref: 'path'
      })
    ])
  }
};

Trend$1.install = function (Vue) {
  Vue.component(Trend$1.name, Trend$1);
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Trend$1);
}

return Trend$1;

})));
