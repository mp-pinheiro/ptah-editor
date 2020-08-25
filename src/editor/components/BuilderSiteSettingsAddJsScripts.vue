<template>
  <builder-modal-content-layout>
    <div class="b-add-js-scripts">
      <base-button-tabs
        :list="tabs"
        v-model="activeTab"
        class="b-add-js-scripts-tabs"
      />
      <div class="layout" v-if="activeTab === 'js'">
          <div class="layout-padding">
            <div class="b-panel__control">
              <base-caption>
                Add JS
              </base-caption>
              <div class="b-panel__col">
                <textarea
                  id="js"
                  class="b-textarea"
                  placeholder="Add Js Scripts"
                  v-model="script"
                />
              </div>
            </div>
          </div>
      </div>
      <div class="layout" v-if="activeTab === 'libs'">
        <div class="layout-padding">
          <div class="b-panel__control">
            <base-caption>
              Add library
            </base-caption>
            <hint-block
              class="hintBlock"
              text="Please, add JS libraries (for example, jquery) by listing their URLs below"
            />
            <div class="b-panel__col">
              <div class="b-lib-row" v-for="(lib, index) in libs"
                :key="index"
              >
                <base-text-field
                  class="b-lib-row__input"
                  v-model="libs[index]"
                  :hasError="errors[index]"
                  errorText="Invalid url"
                  placeholder="Script url (like https://code.jquery.com/jquery-3.5.1.js)"
                  @input="valid(index)"
                />
                <div class="b-lib-row__buttons">
                  <span class="del"
                    tooltip="Remove"
                    tooltip-position="top"
                    v-show="libs.length > 1 && index > 0"
                    @click="libs.splice(index, 1)"
                  >
                    <icon-base
                      name="close"
                      color="#B1B1B1"
                      width="10" height="10"
                    />
                  </span>
                  <span class="plus"
                    tooltip="Add"
                    tooltip-position="top"
                    v-show="index === 0 && libs.length < 4"
                    @click="libs.push('')"
                  >
                    <icon-base
                      name="plus"
                      color="#B1B1B1"
                      width="10" height="10"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="layout" v-if="activeTab === 'css'">
        <div class="layout-padding">
          <div class="b-panel__control">
            <base-caption>
              Add custom CSS
            </base-caption>
            <div class="b-panel__col">
                <textarea
                  id="css"
                  class="b-textarea"
                  placeholder="Add CSS styles"
                  v-model="css"
                />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div slot="controls">
      <BaseButton
        color="gray"
        size="small"
        :transparent="true"
        @click="close()"
      >
        {{ $t('nav.cancel') }}
      </BaseButton>
      <BaseButton
        color="blue"
        size="small"
        @click="applySettings"
        :disabled="disabled"
      >
        {{ $t('nav.save') }}
      </BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import { isValidUrl } from '@editor/util'
import HintBlock from './HintBlock'

export default {
  name: 'BuilderSiteSettingsAddJsScripts',

  components: {
    HintBlock,
    BuilderModalContentLayout
  },

  data () {
    return {
      script: '',
      css: '',
      libs: [],
      errors: [],
      tabs: [
        { value: 'js', text: 'Js' },
        { value: 'libs', text: 'JS Libraries' },
        { value: 'css', text: 'Css' }
      ],
      activeTab: 'js',
      disabled: false
    }
  },

  computed: {
    ...mapState(['currentLanding'])
  },

  mounted () {
    this.script = this.currentLanding.settings.script
    this.css = this.currentLanding.settings.css
    this.libs = this.currentLanding.settings.libs
    this.errors = this.libs.map(() => false)
  },

  methods: {
    ...mapActions(['storeSettings', 'activateCheckListItem']),
    ...mapActions('Sidebar', ['toggleSidebar']),

    applySettings () {
      this.storeSettings({
        script: this.script,
        css: this.css,
        libs: this.libs
      })

      this.activateCheckListItem('code')

      this.close()
    },

    close () {
      this.toggleSidebar(false)
      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    valid (index) {
      let v = true
      let url = this.libs[index]

      if (url !== '') {
        v = isValidUrl(url)
      }

      this.errors[index] = !v
      this.setDisabled()
    },

    setDisabled () {
      let dis = false

      this.errors.forEach((err) => {
        if (err) {
          dis = true
        }
      })

      this.disabled = dis
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-add-js-scripts
  height: 100%
  position: relative
  /deep/
    .b-panel__control,
    .b-panel__row,
    .b-panel__col
      max-width: 30rem

.b-textarea
  border: 1px solid rgba(162, 165, 165, 0.5)
  box-sizing: border-box
  border-radius: 5px

  width: 100%
  height: 100%
  padding: 2rem 2.2rem

  resize: none
  &:focus
    border: 2px solid $main-green
    outline: none

.layout
  &-padding
    display: flex
    width: 100%
    height: 95%
    padding: 0
    .b-panel__control
      width: 100%
      height: 100%
      display: flex
      flex-direction: column
      align-items: stretch
    .b-panel__col
      height: 100%

.b-lib-row
  display: flex
  justify-content: flex-start
  align-items: flex-start

  margin-bottom: .5rem
  &__input
    max-width: 20rem
  &__buttons
    width: 2rem
    margin: 0.8rem 0.5rem 0.5rem
  & span
    display: flex
    align-items: center
    justify-content: center

    width: 2rem
    height: 2rem

    border-radius: 100%
    border: 0.2rem solid $ligth-grey

    transition: all .3s cubic-bezier(.2,.85,.4,1.275)
    &:hover
      cursor: pointer
      background-color: $white
    &.del svg
      fill: $ligth-grey
    &.del:hover
      border: 0.2rem solid $orange
      & svg
        fill: $orange
    &.plus svg
      fill: $main-green
    &.plus:hover
      border: 0.2rem solid $main-green
      & svg
        fill: $main-green

.hintBlock
  margin-bottom: 2rem
</style>
