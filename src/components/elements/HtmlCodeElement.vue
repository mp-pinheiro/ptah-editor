<template>
<div class="b-html-code"
  :path="path"
  @mouseleave="mouseleave"
  @mouseover.stop="mouseover"
>
  <div
    class="b-html-code__padd"
    v-html="vCode"
  />
</div>
</template>

<script>
import elementHover from '../mixins/elementHover'

export default {
  name: 'HtmlCodeElement',

  mixins: [
    elementHover
  ],

  props: {
    path: {
      type: String
    }
  },

  data () {
    return {
      vCode: ''
    }
  },

  computed: {
    settings () {
      return this.$section.get(`$sectionData.${this.path}.settings`)
    }
  },

  watch: {
    settings (value) {
      this.vCode = value.code
    }
  },

  created () {
    this.vCode = this.settings.code
  }
}
</script>

<style lang="sass" scoped>
</style>
