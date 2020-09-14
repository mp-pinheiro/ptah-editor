<template>
  <div id="settings-fonts">
    <v-style v-if="visibleFonts.length > 0">
      <template v-for="font in visibleFonts">
        {{
          selectFonts[checkSpace(font.family)] === undefined
            ? `@import url("https://fonts.googleapis.com/css?family=${font.family}");`
            : ''
        }}
      </template>
    </v-style>
    <form id="fonts-form" @submit.prevent="saveFonts">
      <base-fieldset class="b-setup-fonts" v-if="!isChange">
        <div class="b-setup-fonts-header">
          <span>
            Load time:
            <span :style="{ color: status.color }">
              {{ status.text }}
            </span>
          </span>
        </div>
        <div class="b-setup-fonts-content">
          <base-scroll-container
            class="b-scrolled-content"
            v-if="isLoaded"
          >
            <div class="b-setup-fonts-list">
              <div v-for="(el, key) in setupFonts" :key="key" class="b-setup-fonts-list__item">
                <div class="b-setup-fonts-list__sample" :style="{
                  'font-family': `${setupFonts[key]}`,
                  'font-style': `${setupFontsStyle[key].style}`,
                  'font-weight': `${setupFontsStyle[key].weight}`,
                }">
                  Lorem ipsum dolor amet, consectetur adipisicing elit.
                </div>
                <div class="b-setup-fonts-list__font">
                  <div class="b-setup-fonts-list__font-row">
                    <div class="b-setup-fonts-list__font-usage">{{ textFonts[key] }}</div>
                    <div class="b-setup-fonts-list__font-name">{{ setupFonts[key] }}</div>
                  </div>
                  <span class="b-setup-fonts-list__item-buttons">
                    <div class="b-setup-fonts-list__font-check">
                      <icon-base
                        name="check-mark"
                        color="#fff"
                        width="15"
                        height="15"
                      />
                    </div>
                    <div class="change-font" @click="changeFont(el, key)">
                      <icon-base
                        name="recycle"
                        color="#fff"
                        width="20"
                        height="20"
                      />
                      <span>change my font</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </base-scroll-container>
        </div>
      </base-fieldset>
      <base-fieldset class="library" v-if="isChange">

        <!-- dirty hack -->
        <div class="library__close">
          <span
            class="b-panel__close"
            @click="isChange = false"
          >
            <IconBase
              name="close"
              width="13"
              height="12"
              color="#a2a5a5"
            />
          </span>
        </div>

        <div class="b-font-filter">
          <div>
            <base-text-field
              class="b-font-filter__search"
              placeholder="Search ..."
              v-model="search"
            />
          </div>
        </div>

        <div class="b-fonts-block" v-if="fontsLoaded">
          <div class="b-fonts-block__list"
            ref="blockFonts"
            :class="{ '_m': editFont !== null }"
          >
            <base-scroll-container
              class="b-scrolled-content"
              v-if="isLoaded"
            >
                <ul class="b-fonts-list">
                  <li class="b-fonts-list__item"
                      :class="[
                        { '_applied' : selectedEl === font.family },
                        { '_selected' : selectFonts[checkSpace(font.family)] !== undefined }
                      ]"
                      v-for="(font, index) in visibleFonts"
                      :key="index"
                  >
                    <span
                      class="b-fonts-list__item-check"
                      v-if="containsFont(font.family)"
                    >
                      <icon-base
                        name="check-mark"
                        color="#fff"
                        width="15"
                        height="15"
                      />
                    </span>
                    <div class="b-fonts-list__item-family">
                      {{ font.family  }}
                      <!--<span class="b-fonts-list__item-category">
                        {{ font.category  }}
                      </span>-->
                    </div>
                    <div class="b-fonts-list__item-button"
                      v-if="selectedEl === font.family"
                    >
                      <font-variants
                        :font="font"
                        :variants="getVariants(font)"
                        :tempStyles="tempStyles"
                        @input="toggleFontVariant($event)"
                      >
                      </font-variants>
                      <font-subsets
                        :font="font"
                        :subsets="getSubsets(font)"
                        @input="toggleFontSubset($event)"
                      >
                      </font-subsets>
                    </div>
                    <div class="b-simple-text"
                      v-if="selectedEl === font.family"
                      :style="{
                        'font-family': `${setupFonts[selectedKey]}`,
                        'font-style': `${tempStyles.style}`,
                        'font-weight': `${tempStyles.weight}`,
                      }">
                      {{ defText }}
                    </div>
                    <div v-else class="b-simple-text"
                      :style="{
                        'font-family': `${font.family}`,
                      }">
                      {{ defText }}
                    </div>

                    <div
                      class="add-font"
                      @click="applyFont(font)"
                    >
                      <icon-base
                        name="plus"
                        color="#fff"
                        width="20"
                        height="20"
                      />
                      <span>Apply to {{textFonts[selectedKey]}}</span>
                    </div>
                  </li>
                </ul>
            </base-scroll-container>
          </div>

        </div><!-- /.b-fonts-block -->
      </base-fieldset>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import { mapState, mapActions } from 'vuex'
import { throttle, uniq } from 'lodash-es'

import Vue from 'vue'
import FontSubsets from './FontSubsets'
import FontVariants from './FontVariants'

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
})

export default {
  name: 'BuilderSiteSettingsFonts',

  components: {
    FontVariants,
    FontSubsets,
    BuilderModalContentLayout
  },

  data () {
    return {
      list: [],
      search: '', // filter fonts
      editFont: null,
      defText: 'Lorem ipsum dolor amet, consectetur adipisicing elit.',
      statusList: [
        { text: 'fast', color: 'green' },
        { text: 'medium', color: 'orange' },
        { text: 'slow', color: 'red' },
        { text: 'slow', color: 'red' },
        { text: 'slow', color: 'red' }
      ],
      textFonts: {
        'h1': this.$i18n.t('font.h1'),
        'p': this.$i18n.t('font.p'),
        'btn': this.$i18n.t('font.btn')
      },
      isChange: false,
      selectedEl: null,
      selectedKey: null,
      isLoaded: false,
      topEl: null,
      bottomEl: null,
      topList: null,
      visibleFonts: [],
      filteredFonts: [],
      tempFonts: [],
      tempStyles: {},
      isLoadingFonts: false
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    fonts () {
      return this.currentLanding.settings.fonts || {}
    },

    fontsLoaded () {
      return true
    },

    selectFonts () {
      return this.fonts
    },

    setupFonts () {
      return this.currentLanding.settings.setupFonts || {}
    },

    setupFontsStyle () {
      return this.currentLanding.settings.setupFontsStyle || {}
    },

    status () {
      const length = Object.keys(this.selectFonts).length - 1
      return this.statusList[length] || this.statusList[0]
    }
  },

  watch: {
    isChange (value) {
      const delay = 250
      this.filterFonts()
      value
        ? window.addEventListener('wheel', throttle(this.renderFonts, delay))
        : window.removeEventListener('wheel', throttle(this.renderFonts, delay))
      this.search = ''
    },

    search () {
      this.searchFonts()
    }
  },

  methods: {
    ...mapActions([
      'storeSettings',
      'storeSaveSettingsFonts',
      'storeSaveSettingsSetupFonts',
      'storeSaveSettingsSetupFontsStyle',
      'activateCheckListItem'
    ]),

    getFontsData () {
      this.isLoaded = false
      axios('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDKi8oKqvLuCASo7XZg4wY_D3CMib_Sg9U&sort=popularity')
        .then(response => {
          this.list = response.data.items
          this.isLoaded = true
        })
        .catch(err => {
          this.list = this.fonts
          this.isLoaded = true
          console.warn(err)
        })
    },

    filterFonts () {
      let defFonts = this.list

      defFonts.forEach((font, index) => {
        if (this.selectFonts[this.checkSpace(font.family)]) {
          defFonts.unshift(...defFonts.splice(index, 1))
        }
      })

      this.filteredFonts = defFonts.filter((font) => ~font.family.toLowerCase().indexOf(this.search.toLowerCase()))
      this.filterVisibledFonts()
    },

    searchFonts: throttle(function () {
      this.visibleFonts = this.list.filter((font) => ~font.family.toLowerCase().indexOf(this.search.toLowerCase()))
    }, 300),

    filterVisibledFonts () {
      let defFonts = this.visibleFonts

      defFonts.forEach((font, index) => {
        if (this.selectFonts[this.checkSpace(font.family)]) {
          defFonts.unshift(...defFonts.splice(index, 1))
        }
      })

      this.visibleFonts = defFonts
    },

    saveFonts () {
      this.storeSettings({
        fonts: this.selectFonts
      })

      this.isLoaded = false

      this.close()
    },

    close () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    storeFonts () {
      this.storeSaveSettingsFonts(this.selectFonts)
    },

    storeSetupFonts (font) {
      let setupFonts = {}

      setupFonts[this.selectedKey] = font.family

      this.storeSaveSettingsSetupFonts(setupFonts)
    },

    storeSetupFontsStyle (styles) {
      let setupFontsStyle = {}

      setupFontsStyle[this.selectedKey] = {
        style: styles.style,
        weight: styles.weight
      }

      this.storeSaveSettingsSetupFontsStyle(setupFontsStyle)
    },

    applyFont (font) {
      this.activateCheckListItem('fonts')
      const name = this.checkSpace(font.family)

      if (this.selectFonts[name] === undefined) {
        this.selectFonts[name] = {
          variants: ['regular'],
          subsets: ['latin']
        }
        this.tempStyles = { style: 'normal', weight: '400' }
        this.storeSetupFontsStyle(this.tempStyles)
      } else {
        this.storeSetupFontsStyle(this.tempStyles)
        this.setSelectFontsVariants(name)
      }

      this.editFont = font
      this.storeFonts()
      this.storeSetupFonts(font)

      this.removeFont(this.selectedEl)

      this.selectedEl = font.family
      this.editFont = null
      this.isChange = false
    },

    setSelectFontsVariants (name) {
      let style = this.tempStyles.style === 'normal' ? '' : 'italic'
      let variant = `${this.tempStyles.weight}${style}`

      this.selectFonts[name].variants.push(variant)
      this.checkVariants(name)
    },

    checkVariants (name) {
      let keyFont = []
      let variants = []

      for (let key in this.setupFonts) {
        if (this.checkSpace(this.setupFonts[key]) === name) {
          keyFont.push(key)
        }
      }

      keyFont.forEach(key => {
        let style = this.setupFontsStyle[key].style === 'normal' ? '' : 'italic'
        let variant = `${this.setupFontsStyle[key].weight}${style}`

        variants.push(variant)

        this.selectFonts[name].variants = uniq(variants)
      })
    },

    checkSpace (family) {
      if (family.indexOf(' ') !== -1) {
        return family.replace(/\s/g, '+')
      } else {
        return family
      }
    },

    containsFont (family) {
      return this.selectFonts[this.checkSpace(family)] !== undefined
    },

    loadedFont (font) {
      return this.visibleFonts.find(f => f.family === this.checkSpace(font))
    },

    getSubsets (font) {
      const name = this.checkSpace(font.family)

      return font.subsets.map((subset) => {
        return {
          name: subset,
          status: this.selectFonts[name].subsets.indexOf(subset) > -1
        }
      })
    },

    toggleFontSubset ({ font, subsets }) {
      const name = this.checkSpace(font.family)
      this.selectFonts[name].subsets = subsets
      this.storeFonts()
    },

    getVariants (font) {
      const name = this.checkSpace(font.family)

      return font.variants.map((variant) => {
        return {
          name: variant,
          status: this.selectFonts[name].variants.indexOf(variant) > -1
        }
      })
    },

    toggleFontVariant ({ variant }) {
      this.setTempStyles(variant)
      this.storeFonts()
    },

    setTempStyles (variant) {
      const arr = variant.split('italic')

      if (arr.length === 1) {
        this.tempStyles = {
          style: 'normal',
          weight: arr[0]
        }
      } else {
        this.tempStyles = {
          style: 'italic',
          weight: arr[0]
        }
      }
    },

    removeFont (family) {
      if (this.editFont !== null && this.editFont.family === family) {
        this.editFont = null
      }

      let isFind = false

      for (let key in this.setupFonts) {
        if (this.setupFonts[key] === family) {
          isFind = true
        }
      }

      if (!isFind) {
        delete this.selectFonts[this.checkSpace(family)]
      }

      this.storeFonts()
    },

    renderFonts (e) {
      let elements = []
      const length = this.visibleFonts.length ? this.visibleFonts.length : 0

      if (!this.isChange || this.isLoadingFonts || (e && e.deltaY < 0)) {
        return
      }

      this.isLoadingFonts = true

      elements = this.filteredFonts.slice(length, length + 6)

      elements.forEach(el => {
        if (this.loadedFont(el.family) !== undefined) {
          return
        }

        this.visibleFonts.push({
          family: el.family,
          variants: el.variants,
          category: el.category,
          subsets: el.subsets
        })

        this.tempFonts = this.visibleFonts
      })

      setTimeout(() => {
        this.isLoadingFonts = false
      }, 600)
    },

    changeFont (el, key) {
      this.selectedEl = el
      this.selectedKey = key
      this.isChange = !this.isChange
      this.tempStyles = this.setupFontsStyle[key]

      this.$nextTick(() => {
        this.renderFonts()
      })
    }
  },

  created () {
    this.getFontsData()
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

@mixin checkMark
  position: absolute
  bottom: 0
  right: 0
  width: 3.5rem
  height: 3.5rem

  display: flex
  align-items: center
  justify-content: center

  background: $main-green
  border-radius: 10px 0 7px 0

@mixin control
  position: absolute
  bottom: 0
  right: 0
  width: 3.5rem
  height: 3.5rem

  display: flex
  align-items: center
  justify-content: center

  transition: width 0.3s ease-in-out

  cursor: pointer

  span
    display: block
    font-size: 1rem
    font-weight: bold
    text-transform: uppercase
    color: #fff
    opacity: 0
    width: 0
    transition: opacity 0.5s
    white-space: nowrap

  &:hover
    width: 16rem
    padding: 0 1rem
    span
      opacity: 1
      width: auto
      margin-left: .7rem

#settings-fonts, #fonts-form
  height: 100%

.library
  height: calc(100% - 1.5rem)
  margin-bottom: 0

.b-fonts-block
  display: flex
  justify-content: stretch
  height: 100%
  position: relative

  &__list
    width: 100%
    position: absolute
    top: 0
    bottom: 0
    left: 0
    &._m
      width: 70%
  &__controls
    display: flex
    justify-content: flex-end

.b-font-filter
  display: flex
  flex-direction: column
  justify-content: center
  &__search
    width: 27rem
    margin: 0 3.2rem 1rem 1.5rem
    /deep/
      & input
        padding-left: 3.6rem
        background: url("https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/b01c391b-3cd1-4e5f-995c-0ee270376479.png") no-repeat 1rem center
  &__sw
    width: $size-step * 5.5
    margin-left: $size-step
  &__text
    width: 27rem

.b-fonts-list
  padding: 0 0 0 1.5rem
  margin: 0
  &__item
    $this: &
    width: 27rem
    min-height: 10rem
    padding: 0
    margin: 0 0 1.5rem
    list-style: none

    display: flex
    flex-direction: column
    align-items: flex-start

    border: 2px solid #575A5F
    border-radius: 10px

    position: relative

    .add-font
      display: none

    &._selected
      flex-direction: column
      align-items: flex-start
      border: 2px solid $main-green

    &-family
      height: 4.5rem
      font-size: 1.6rem
      line-height: 4.5rem
      letter-spacing: 0.065em
      border-bottom: 1px solid #F4F4F4

      width: 100%
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      padding: 0 1.8rem

    &._applied
      background-color: rgba($main-green, .1)
      #{$this}-category
        color: #fff
      #{$this}-family
        border-bottom: 1px solid $main-green
    &-category
      color: $gray300
    &-button
      width: 100%
      display: flex
    &:hover
      .add-font
        display: flex
    &-check
      @include checkMark

.b-scrolled-content
  margin: 0
  &__inner
    height: 100%
    margin: 0
.b-remove-btn
  width: 140px

.b-font-edit
  min-width: 30%
  position: relative
  border-left: 1px solid #C4C4C4
  &__close
    position: absolute
    z-index: 1
    top: $size-step / 2
    right: $size-step / 2
    cursor: pointer
    &:hover svg
      fill: $main-green
  &__list
    position: relative
    z-index: 0
    margin: 0
    padding: 0
    &-item
      list-style: none
      font-size: 1.2rem
      line-height: 1.6rem
  &__padd
    margin: $size-step/2 $size-step $size-step $size-step/2
    display: flex
    flex-direction: column

.b-font-edit-variants
  padding-bottom: $size-step
  &__header
    font-weight: bold
    padding: 0 0 $size-step/2 $size-step/2
  &__content
    height: 300px
    .b-font-edit__list-item
      position: relative
      font-size: 1.6rem
      line-height: 1.5
      color: #818181
      cursor: pointer
      padding-left: $size-step/2
      .b-fonts-list__item-check
        left: 0
        top: 3px

.b-header-fonts-block
  display: flex
  align-items: center
  margin-bottom: 32px
  &__logo
    width: 193px
    height: 50px
    margin-left: -14px
  &__text
    font-size: 16px
    line-height: 19px
    color: #333333
    margin-left: 36px
    text-align: left

.b-setup-fonts
  margin: 0
  height: 100%

  position: relative
  &-header
    display: flex
    justify-content: center
    align-items: center
    padding: 1rem
    font-size: 1.8rem
    line-height: 2.2rem
  &-content
    position: absolute

    top: 5rem
    right: 0
    bottom: 0
    left: 0
  &-list
    padding: 0 1rem 0 0
    margin: 0
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    &__item
      $this: &
      border: 2px solid $main-green
      box-sizing: border-box
      border-radius: 10px
      margin-bottom: 1.5rem
      width: 27rem

      .change-font
        display: none

      &:hover
        .b-setup-fonts-list__font-check
          display: none
        .change-font
          display: flex

    &__sample
      min-height: 6rem
      display: flex
      align-items: center
      padding: 1rem 1.3rem
      font-size: 1.8rem
      line-height: 1.4
      letter-spacing: 0.065em
      box-sizing: border-box
    &__font
      display: flex
      align-items: center
      min-height: 6rem
      position: relative
      padding: 1rem 4rem 1rem 1.4rem
      background: rgba($main-green, 0.1)
      border-top: 2px solid $main-green
      box-sizing: border-box
      &-row
        display: flex
        align-items: center
        justify-content: space-between
        width: 100%
      &-usage
        font-weight: 800
        font-size: 1.4rem
        line-height: 2.2rem
        letter-spacing: 0.065em
        text-transform: uppercase
        color: $main-green
        text-align: left
        margin: 0 0.8rem 0 0
        white-space: nowrap
      &-name
        font-size: 1.6rem
        line-height: 2rem
        margin: 0 0.8rem
        text-align: right
      &-check
        @include checkMark

.b-simple-text
  min-height: 6rem
  box-sizing: border-box
  padding: .8rem 4rem 1.8rem 1.8rem
  font-size: 1.8rem
  line-height: 1.4
  letter-spacing: 0.065em
  border-top: 1px solid #F4F4F4

  overflow: hidden
  ._applied &
    border-top: 1px solid $main-green

.change-font
  @include control
  background: $red-violet
  border-radius: 10px 0 7px 0

.add-font
  @include control
  background: $yellow
  border-radius: 10px 0 7px 0

.library__close
  position: absolute
  right: 1.6rem
  top: -5rem
  background: #fff
  width: 3.6rem
  height: 3.6rem
  display: flex
  justify-content: center
  align-items: center
  z-index: 10
  cursor: pointer

  .b-panel__close
    position: absolute
    top: 0
    left: 0
    right: 0
</style>
