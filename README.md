<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/7565692/23977197/9da0b77c-0a27-11e7-8f14-4d3845a524a0.png" width="500" alt="Vue Trend">
  <br>
  <h1>Vue Trend</h1>
  <p>🌈 Simple, elegant spark lines for Vue.js</p>
  <br>
  <a href="https://www.npmjs.org/package/vuetrend"><img src="https://img.shields.io/npm/v/vuetrend.svg?style=flat-square" alt="npm"></a>
  <!-- <a href="https://travis-ci.org/qingwei-li/vue-trend"><img src="https://img.shields.io/travis/qingwei-li/vue-trend/master.svg?style=flat-square" alt="travis"></a> -->
  <img src="https://img.shields.io/badge/vue-^2.2-4fc08d.svg?colorA=2c3e50&style=flat-square" alt="vue">

  <!-- <a href="https://codecov.io/github/qingwei-li/vue-trend"><img src="https://img.shields.io/codecov/c/github/qingwei-li/vue-trend.svg" alt="travis"></a> -->

</div>

## Installation

```shell
npm i vuetrend -S
```

## Usage

```js
import Vue from 'vue';
import Trend from 'vuetrend';

Vue.use(Trend);
```

_vue template_

```html
<trend
  :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
  auto-draw
  smooth>
</trend>
```

[Live Demo](https://jsfiddle.net/nyh18bLq/)

## Inspired

[unsplash/react-trend](https://github.com/unsplash/react-trend) - 📈 Simple, elegant spark lines

## Props

| Name             | Type           | Default     | Description                                                                                                                                                                                                                                       | Example                                                                      |
| ---------------- | -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| data             | Number\|Object | `undefined` | The data accepted by Vue Trend is incredibly simple: An array of y-axis values to graph.                                                                                                                                                          | `[120, 149, 193.4, 200, 92]` or `[{ value: 4 }, { value: 6 }, { value: 8 }]` |
| gradient         | String         | `['#000']`    | Colour can be specified as any SVG-supported format (named, rgb, hex, etc).                                                                                                                                                                       | `['#0FF', '#F0F', '#FF0']`                                                   | - |
| width            | Number         | auto        | Set an explicit width for your SVG.                                                                                                                                                                                                               | -                                                                            |
| height           | Number         | auto        | Set an explicit height for your SVG.                                                                                                                                                                                                              | -                                                                            |
| padding          | Number         | `8`         | If you set a very large `strokeWidth` on your line, you may notice that it gets "cropped" towards the edges.                                                                                                                                      | -                                                                            |
| smooth           | Boolean        | `false`     | Smooth allows the peaks to be 'rounded' out so that the line has no jagged edges.                                                                                                                                                                 | -                                                                            |
| radius           | Number         | `10`        | When using **smoothing**, you may wish to control the amount of curve around each point. This prop has no effect if `smooth` isn't set to `true`.                                                                                                 | -                                                                            |
| autoDraw         | Boolean        | `false`     | Allow the line to draw itself on mount. Set to `true` to enable, and customize using `autoDrawDuration` and `autoDrawEasing`.                                                                                                                     | -                                                                            |
| autoDrawDuration | Number         | `2000`      | The amount of time, in milliseconds, that the autoDraw animation should span. This prop has no effect if `autoDraw` isn't set to `true`.                                                                                                          | -                                                                            |
| autoDrawEasing   | String         | `ease`      | The easing function to use for the autoDraw animation. Accepts any transition timing function within [the CSS spec](http://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp) (eg. `linear`, `ease`, `ease-in`, `cubic-bezier`...). | -                                                                            |
| max              | Number         | `-Infinity` | Specify max value                                                                                                                                                                                                                                 | -                                                                            |
| min              | Number         | `Infinity` | Specify min value, This is useful if you have multiple lines. See [#8](https://github.com/QingWei-Li/vue-trend/issues/8)                                                                                                                          | -                                                                            |

#### SVG Props

By default, all properties not recognized by Vue Trend will be delegated to the SVG. The line inherits these properties if none of its own override them.

This means that, among other properties, you can use:

* `stroke` to set a solid colour,
* `strokeWidth` to change the default line thickness,
* `strokeOpacity` to create a transparent line,
* `strokeLinecap`/`strokeLinejoin` to control the edges of your line,
* `strokeDasharray` to create a dashed line, and
* `strokeDashoffset` to control where the dashes start.

## Development

```sh
yarn
yarn dev
# open localhost:4000
```

## TODO

* Unit test

## License

MIT
