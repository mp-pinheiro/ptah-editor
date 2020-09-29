<template>
<div class="b-html-code-control">
  <!-- Html code -->
  <div class="b-panel__control _code">
    <base-caption>
      Html code
    </base-caption>
    <div class="b-panel__col _code">
      <div class="b-hint-block">
        <div class="b-hint-block__text">
          <span class="b-hint-block__icon">
            <IconBase
              width="20"
              height="20"
              name="info"
              color="#FFCF0D"
            />
          </span>
          <span>
            You can customize the appearance of this element on the
            <span
              class="b-hint-block__link"
             @click="showCodeTab"
            >
              Code tab
            </span>
          </span>
        </div>
      </div>
      <textarea
        id="js"
        class="b-textarea"
        :placeholder="$t('el.htmlCode')"
        v-model="vCode"
        @input="updateSettings"
      />
    </div>
  </div>
</div>
</template>

<script>
import { merge } from 'lodash-es'
import { mapState, mapActions } from 'vuex'
import HintBlock from './../HintBlock'

export default {
  name: 'TheControlHtmlCode',

  components: {
    HintBlock
  },

  data () {
    return {
      vCode: ''
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    settings () {
      return this.settingObjectOptions.settings
    }
  },

  mounted () {
    this.vCode = this.settings.code
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    updateSettings () {
      let settings = {}
      settings['code'] = this.vCode
      this.updateSettingOptions(merge({}, this.settingObjectOptions, { settings }))
    },

    showCodeTab () {
      this.$router.push({
        path: `/editor/${this.$route.params.slug}/settings/addJsScrips`,
        query: {
          tab: 'css'
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.b-html-code-control
  height: 100%
  position: relative
  /deep/
    .b-panel__control._code,
    .b-panel__col._code
      max-width: 28rem
      height: 70%

.b-textarea
  border: 1px solid rgba(162, 165, 165, 0.5)
  box-sizing: border-box
  border-radius: 5px

  width: 100%
  height: 100%
  padding: 1rem 1.2rem
  margin: 1rem 0 0

  resize: none
  &:focus
    border: 2px solid $main-green
    outline: none

.b-hint-block
  width: 25rem
  margin: 0 auto
  &__pic
    display: block
    width: 22rem
    margin: 7rem auto 4rem
  &__icon
    width: 2rem
    height: 2rem
    margin: 0 2rem 0 0
  &__text
    display: flex
    align-items: flex-start
    font-weight: 600
    font-size: 1.2rem
    line-height: 1.6rem
    letter-spacing: 0.065em
  &__link
    color: $blue
    cursor: pointer
</style>
