<template>
  <main class="main">
    <github-badge slug="QingWei-Li/vue-trend" />

    <h1>Vue Trend</h1>
    <p class="headline"> Simple, elegant spark lines for Vue.js <a href="https://jsfiddle.net/nyh18bLq/">Live Demo</a></p>
    <trend
      :data="data"
      :gradient="[color1, color2, color3]"
      :padding="padding"
      :radius="radius"
      :stroke-width="width"
      :stroke-linecap="linecap"
      :gradientDirection="gradientDirection"
      auto-draw
      smooth>
    </trend>

    <div class="playground">
      <vue-tabs>
        <v-tab title="Configure">

          <div class="settings-container">
            <div class="settings-column">

              <div>
                <div class="setting-label">Gradient direction</div>
                <group class="inline-radio">
                  <div>
                    <input type="radio" id="gd-top" value="top" v-model="gradientDirection">
                    <label for="gd-top">top</label>
                  </div>
                  <div>
                    <input type="radio" id="gd-bottom" value="bottom" v-model="gradientDirection">
                    <label for="gd-bottom">bottom</label>
                  </div>
                  <div>
                    <input type="radio" id="gd-left" value="left" v-model="gradientDirection">
                    <label for="gd-left">left</label>
                  </div>
                  <div>
                    <input type="radio" id="gd-right" value="right" v-model="gradientDirection">
                    <label for="gd-right">right</label>
                  </div>
                </group>
              </div>

              <div>
                <div class="setting-label">Gradient first color</div>
                <v-swatches v-model="color1" :swatch-size="18" background-color="#f7f7f7" :swatches="['#b8f2e6', '#6fa8dc', '#42b983', '#3a86ff', '#2c3e50','#000000', '#ffe74c', '#ffbe88','#ff93df', '#f94144','#d6d6d6']" inline></v-swatches>
              </div>

              <div>
                <div class="setting-label">Gradient second color</div>
                <v-swatches v-model="color2" :swatch-size="18" background-color="#f7f7f7" :swatches="['#b8f2e6', '#6fa8dc', '#42b983', '#3a86ff', '#2c3e50','#000000', '#ffe74c', '#ffbe88','#ff93df', '#f94144','#d6d6d6']" inline></v-swatches>
              </div>

              <div>
                <div class="setting-label">Gradient third color</div>
                <v-swatches v-model="color3" :swatch-size="18" background-color="#f7f7f7" :swatches="['#b8f2e6', '#6fa8dc', '#42b983', '#3a86ff', '#2c3e50','#000000', '#ffe74c', '#ffbe88','#ff93df', '#f94144','#d6d6d6']" inline></v-swatches>
              </div>
            </div>

            <div class="settings-column">

              <div>
                <div class="setting-label">Width</div>
                <vue-slider v-model="width" :min="1" :max="12" :interval="0.1"></vue-slider>
              </div>

              <div>
                <div class="setting-label">Padding</div>
                <vue-slider v-model="padding" :min="1" :max="12" :interval="0.1"></vue-slider>
              </div>

              <div>
                <div class="setting-label">Radius</div>
                <vue-slider v-model="radius" :min="1" :max="12" :interval="0.1"></vue-slider>
              </div>

              <div>
                <div class="setting-label">Linecap</div>
                <group class="inline-radio">
                  <div>
                    <input type="radio" id="lc-butt" value="butt" v-model="linecap">
                    <label for="lc-butt">butt</label>
                  </div>
                  <div>
                    <input type="radio" id="lc-round" value="round" v-model="linecap">
                    <label for="lc-round">round</label>
                  </div>
                  <div>
                    <input type="radio" id="lc-square" value="square" v-model="linecap">
                    <label for="lc-square">square</label>
                  </div>
                </group>
              </div>

            </div>
          </div>

        </v-tab>
        <v-tab title="Code">
          <pre class="code-wrap"><code class="code" v-html="code"></code></pre>
        </v-tab>
      </vue-tabs>
    </div>

    <footer>Released under the <a href="//github.com/QingWei-Li/vue-trend/blob/master/LICENSE">MIT</a> license. <a href="//github.com/QingWei-Li/vue-trend">View source.</a></footer>
  </main>
</template>

<script>
import Trend from 'vuetrend';
import hanabi from 'hanabi';
import GithubBadge from 'vue-github-badge';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import VSwatches from 'vue-swatches'
import 'vue-swatches/dist/vue-swatches.css'
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

export default {
  components: { Trend, GithubBadge, VueSlider, VSwatches, VueTabs, VTab },

  data: function () {
    return {
      radius: 8,
      padding: 8,
      width: 1,
      gradientDirection: 'top',
      color1: '#6fa8dc',
      color2: '#42b983',
      color3: '#2c3e50',
      linecap: 'butt'
    }
  },

  computed: {
    code: function(){
      return hanabi(`<trend
  :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
  :gradientDirection="${ this.gradientDirection }"
  :gradient="['${ this.color1 }', '${ this.color2 }', '${ this.color3 }']"
  :padding="${ this.padding }"
  :radius="${ this.radius }"
  :stroke-width="${ this.width }"
  :stroke-linecap="${ this.linecap }"
  auto-draw
  smooth>
</trend>`);
    }
  },

  created() {
    this.data = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0];
  }
};
</script>

<style>
  h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: bold;
  }

  .headline {
    font-family: Courier,Courier New,monospace;
    font-size: 15px;
    font-weight: 400;
    padding: 20px 0;
  }

  .main {
    max-width: 650px;
    margin: 5vh auto 20px;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 18px;
  }

  .code-wrap {
    text-align: left;
    background-color: #f8f8f8;
    padding: 2em 1.4em;
    line-height: 1.5em;
    margin: 0;
    overflow: auto;
    font-size: 1rem;
  }

  .code {
    margin: 0;
    padding: 0;
  }

  footer {
    margin-top: 40px;
    line-height: 2;
    font-size: 0.8rem;
    color: #c1c1c1;
    font-family: Courier,Courier New,monospace;
  }

  a {
    color: #39fda4;
  }

  .playground {
    margin-top: 20px;
  }

  .setting-label {
    text-align: left;
    font-size: 1rem;
    font-weight: 700;
    padding-top: 1rem;
  }

  .settings-container {
    display: flex;
  }

  @media only screen and (max-width: 480px) {
    .settings-container {
      display:block
    }
  }

  .tab-content {
    background: #f7f7f7;
  }

  .settings-column {
    flex: auto;
    margin: 2rem 2rem 0;
    padding-bottom: 2rem;
    width: 80%;
  }

  .vue-swatches {
    display: flex;
  }

  .vue-swatches__wrapper {
    padding-left: 0 !important;
  }

  .vue-swatches__container {
    padding: 5px 0 0 !important;
    margin-bottom: 0 !important;
  }

  .vue-tabs .nav>li span.title {
    font-weight: 700;
  }

  .inline-radio {
    display: flex;
    border-radius: 3px;
    overflow: hidden;
    border: 0;
    margin-top: 10px;
  }

  .inline-radio div {
    position: relative;
    flex: 1;
    padding: 8px;
  }

  .inline-radio input {
    width: 100%;
    opacity: 0;
  }

  .inline-radio label {
    position: absolute;
    top: 0; left: 0;
    color: #333;
    width: 100%;
    height: 100%;
    background: #fff;
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    border-bottom: 3px solid #8e8e8e;
  }

  .inline-radio div:last-child label {
    border-right: 0;
  }

  .inline-radio input:checked + label {
    background: #d4d4d4;
  }

</style>
