<template>
  <main class="main">
    <github-badge slug="QingWei-Li/vue-trend" />

    <h1>Vue Trend</h1>
    <p> Simple, elegant spark lines for Vue.js</p>
    <trend
      :data="data"
      :gradient="gradient"
      auto-draw
      smooth>
    </trend>

    <pre class="code-wrap"><code class="code" v-html="code"></code></pre>

    <footer>Released under the <a href="//github.com/QingWei-Li/vue-trend/blob/master/LICENSE">MIT</a> license. <a href="//github.com/QingWei-Li/vue-trend">View source.</a></footer>
  </main>
</template>

<script>
  import Trend from '../src/index.js'
  import hanabi from 'hanabi'
  import GithubBadge from 'vue-github-badge'

  export default {
    components: { Trend, GithubBadge },

    created () {
      this.data = [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
      this.gradient = ['#6fa8dc', '#42b983', '#2c3e50']
      this.code = hanabi(`<trend
  :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
  auto-draw
  smooth>
</trend>`)
    }
  }
</script>

<style>
  h1 {
    margin: 0;
    font-size: 3rem;
    font-weight: normal;
  }

  .main {
    max-width: 650px;
    margin: 15vh auto 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    font-size: 14px;
  }

  .code-wrap {
    text-align: left;
    background-color: #f8f8f8;
    padding: 1.2em 1.4em;
    line-height: 1.5em;
    margin: 60px 0 0;
    overflow: auto;
  }

  .code {
    margin: 0;
    padding: 0;
  }

  footer {
    margin-top: 40px;
    line-height: 2;
  }

  a {
    color: #42b983;
  }
</style>
