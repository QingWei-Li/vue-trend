<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/7565692/23819883/063b9ec0-0648-11e7-9682-bca9e5e9b1ad.png" width="500" alt="Vue Trend">
  <br>
  <h1>Vue Trend</h1>
  <p>🌈 Simple, elegant spark lines for Vue.js</p>
  <br>
  <a href="https://www.npmjs.org/package/vuetrend"><img src="https://img.shields.io/npm/v/vuetrend.png?style=flat-square" alt="npm"></a>
  <a href="https://travis-ci.org/qingwei-li/vue-trend"><img src="https://img.shields.io/travis/qingwei-li/vue-trend/master.png?style=flat-square" alt="travis"></a>
  <!-- <a href="https://codecov.io/github/qingwei-li/vue-trend"><img src="https://img.shields.io/codecov/c/github/qingwei-li/vue-trend.svg" alt="travis"></a> -->
</div>

<br>


## Installation
```shell
npm i vuetrend -S
```

## Usage
```javascript
import Vue from 'vue'
import Trend from 'vuetrend'

Vue.use(Trend)
```

*vue template*

```html
<trend
  :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
  auto-draw
  smooth>
</trend>
```

## API

#### SVG Props

By default, all properties not recognized by React Trend will be delegated to the SVG. The line inherits these properties if none of its own override them.

This means that, among other properties, you can use:

- `stroke` to set a solid colour,
- `strokeWidth` to change the default line thickness,
- `strokeOpacity` to create a transparent line,
- `strokeLinecap`/`strokeLinejoin` to control the edges of your line,
- `strokeDasharray` to create a dashed line, and
- `strokeDashoffset` to control where the dashes start.


#### `autoDraw`
| Type    | Required | Default|
|---------|----------|--------|
| Boolean | ✕        | `false`|

Allow the line to draw itself on mount. Set to `true` to enable, and customize using `autoDrawDuration` and `autoDrawEasing`.

**NOTE**: This property uses `strokeDasharray` and `strokeDashoffset` under the hood to perform the animation. Because of this, any values you provide for those properties will be ignored.

###### Example
```html
<trend
  :data="data"
  auto-draw
  :auto-draw-duration="3000"
  auto-draw-easing="ease-in"
/>
```


#### `autoDrawDuration`
| Type    | Required | Default|
|---------|----------|--------|
| Number  | ✕        | `2000` |

The amount of time, in milliseconds, that the autoDraw animation should span.

This prop has no effect if `autoDraw` isn't set to `true`.

###### Example
```html
<trend
  :data="data"
  auto-draw
  :auto-draw-duration="3000"
  auto-draw-easing="ease-in"
/>
```


#### `autoDrawEasing`
| Type    | Required | Default|
|---------|----------|--------|
| String  | ✕        | `ease` |

The easing function to use for the autoDraw animation. Accepts any transition timing function within [the CSS spec](http://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp) (eg. `linear`, `ease`, `ease-in`, `cubic-bezier`...).

This prop has no effect if `autoDraw` isn't set to `true`.

###### Example
```html
<trend
  :data="data"
  auto-draw
  :auto-draw-duration="3000"
  auto-draw-easing="ease-in"
/>
```


#### `data`
| Type            | Required | Default     |
|-----------------|----------|-------------|
| [Number\|Object] | ✓        | `undefined` |

The data accepted by React Trend is incredibly simple: An array of y-axis values to graph.

React Trend takes care of normalization, so don't worry about ensuring the data is in a specific range.

This does mean that all data points will be evenly-spaced. If you have irregularly-spaced data, it will not be properly represented.

As of v1.2.0, you may supply an array of data objects with a `value` property.

###### Example
```html
<trend :data="[120, 149, 193.4, 200, 92]" />
<trend :data="[{ value: 4 }, { value: 6 }, { value: 8 }]" />
```


#### `gradient`
| Type     | Required | Default     |
|----------|----------|-------------|
| [String] | ✕        | `undefined` |

React Trend supports vertical gradients. It accepts an array of 2+ colour values, and will fade evenly between them from the bottom up.

Colour can be specified as any SVG-supported format (named, rgb, hex, etc).

###### Example
```html
<trend :gradient="['#0FF', '#F0F', '#FF0']" />
```



#### `height`
| Type     | Required | Default     |
|----------|----------|-------------|
| Number   | ✕        | `undefined` |

Set an explicit height for your SVG. By default it ensures a 1:4 aspect ratio with the width, and the width expands to fill the container.

Note that in _most_ cases it is sufficient to leave this blank, and just control the size of the parent container.

###### Example
```html
<trend :width="200" :height="200" />
```


#### `padding`
| Type     | Required | Default     |
|----------|----------|-------------|
| Number   | ✕        | `8`         |

If you set a very large `strokeWidth` on your line, you may notice that it gets "cropped" towards the edges. This is because SVGs don't support overflow.

By increasing this number, you expand the space around the line, so that very thick lines aren't cropped.

In most cases you don't need to touch this value.

###### Example
```html
<trend :stroke-width="20" padding="18" />
```


#### `radius`
| Type     | Required | Default     |
|----------|----------|-------------|
| Number   | ✕        | `10`        |

When using [smoothing](#smooth), you may wish to control the amount of curve around each point. For example, a `0` radius is equivalent to not having any smoothing at all, where an impossibly-large number like `10000` will ensure that each peak is as curved as it can possibly be.

This prop has no effect if `smooth` isn't set to `true`.

###### Example
```html
<trend smooth :radius="20" :stroke-width="4" />
```


#### `smooth`
| Type     | Required | Default     |
|----------|----------|-------------|
| Boolean  | ✕        | `false`       |

Smooth allows the peaks to be 'rounded' out so that the line has no jagged edges.

By tweaking the [radius](#radius) prop, you can use this as a subtle prop to tone down the sharpness, or you can set a very high radius to create a snake-like line.

###### Example
```html
<trend smooth :radius="20" :stroke-width="4" />
```


#### `width`
| Type     | Required | Default     |
|----------|----------|-------------|
| Number   | ✕        | `undefined` |

Set an explicit width for your SVG. By default it ensures a 1:4 aspect ratio with the height, expanding to fill the width of the container.

Note that in _most_ cases it is sufficient to leave this blank, and just control the width of the parent container.

###### Example
```html
<trend :width="200" :height="200" />
```


## TODO
- Unit test


## Inspired

[unsplash/react-trend](https://github.com/unsplash/react-trend) - 📈 Simple, elegant spark lines

## License
MIT
