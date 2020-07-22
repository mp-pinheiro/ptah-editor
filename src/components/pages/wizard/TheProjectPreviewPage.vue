<template>
  <div class="b-project-preview">
    <div class="b-project-preview__content" v-if="preset">
      <div class="b-project-preview__template">
        <base-scroll-container>
          <img :src="preset.preview" style="width: 100%" />
        </base-scroll-container>
      </div>
      <div class="b-project-preview__description">
        <h1>
          {{preset.type}}
          <div class="b-project-preview__close b-panel__close" @click="close">
            <icon-base name="close" width="14" height="14"></icon-base>
          </div>
        </h1>
        <p>{{preset.description}}</p>

        <ul>
          <li v-for="(section, index) in preset.sections" :key="index">{{section}}</li>
        </ul>

        <base-button class="b-project-preview__select" color="main-green" size="small" @click="selectPreset">Select</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TheProjectPreviewPage',
  computed: {
    ...mapState('Onboarding', ['preset'])
  },

  methods: {
    ...mapMutations('Onboarding', [
      'setPreset',
      'setColors',
      'setPalette',
      'setLogo',
      'setFonts',
      'setSetupFonts',
      'setBackground',
      'setBackgroundColor',
      'setVideo'
    ]),

    selectPreset () {
      this.setPreset(this.preset)
      this.setColors(this.preset.colors)
      this.setPalette(this.preset.palette)
      this.setLogo(this.preset.logo || '')
      this.setFonts(this.preset.fonts)
      this.setSetupFonts(this.preset.setupFonts)
      this.setBackground(this.preset.backgroundImage)
      this.setBackgroundColor(this.preset.backgroundColor)
      this.setVideo(this.preset.video)

      this.$router.push({ path: `/dashboard/wizard/welcome` })
    },

    close () {
      this.$router.push({ path: `/dashboard/wizard/templates` })
    }
  }
}
</script>

<style lang="sass" scoped>
.b-project-preview
  width: 100%
  display: flex
  justify-content: center

  &__content
    width: 110rem
    height: 100vh
    box-sizing: border-box
    padding-top: 9rem
    display: flex
    justify-content: space-between

  &__template
    width: 64rem
    height: calc(100vh - 9rem)
    background-size: contain
    background-position: 50% 50%
    background-repeat: no-repeat
    flex-shrink: 1

  &__select
    width: 11.4rem

  &__close
    position: absolute
    right: 0
    top: -8.8rem
    cursor: pointer

  &__description
    width: 33.5rem
    display: flex
    flex-direction: column
    text-align: left
    justify-content: center

    h1
      font-weight: 600
      font-size: 2.8rem
      line-height: 2.4rem
      text-transform: uppercase
      color: $dark-grey
      margin-bottom: 3rem
      position: relative

    p
      font-size: 1.6rem
      line-height: 2.4rem
      color: $dark-grey
      margin-bottom: 3rem

    ul
      margin: 0 0 4rem
      padding: 0
      color: #A2A5A5
      font-size: 1.6rem
      line-height: 2.4rem

      li
        list-style: none
</style>
