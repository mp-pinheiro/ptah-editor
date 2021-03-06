<template>

<builder-layout
  :builder="builder"
  @export="submit"
  @preview="preview"
  @save="save"
>

  <div
    class="b-layout"
    id="ptah-board"
    :style="`${fontsSetup};${fontsSetupStyle}`"
  >
    <base-loading
      v-if="loading"
      class="preloader"
    />

    <IconBase
      v-if="emptySections && !isExpanded"
      name="share"
      color="#00ADB6"
      width="38"
      height="30"
      class="b-intro-arrow"
    />

    <div v-if="emptySections"
      class="b-intro"
      :class="{ '_add': isAddSectionExpanded }"
    >
      <div class="b-intro__image" />
      <div class="b-intro__chapter">
        Lets start the magic
      </div>
      <div class="b-intro__text">
        Open the side bar to select a Section for your landing page
      </div>
    </div>

    <div
      v-show="!emptySections"
      :class="{
        'is-editable': $builder.isEditing,
        'fp-scroll': currentLanding.settings.fullPageScroll === 'yes',
        'is-expanded': isExpanded
      }"
      id="artboard"
      class="artboard"
      ref="artboard"
    >

      <component
        v-if="headerSection"
        :is="headerSection.name"
        :id="headerSection.id"
        :class="[ $builder.isEditing ? device: '' ]"
        @click.native="selectSidebarSection(headerSection)">

        <!-- TODO: -->
        <!-- hide section's menu in all sections
        <menu-settings slot="menu" :section="headerSection"/>
        -->

        <div
          class="b-overlay"
          v-if="headerSection.data.mainStyle.overlay"
          :id="`bg-overlay-${ headerSection.id }`"
          slot="overlay"
          :style="{
              'background-color' : headerSection.data.mainStyle.overlay.color,
              'opacity' : headerSection.data.mainStyle.overlay.opacity
          }"
          :class="[
            isActiveSection(headerSection.id) ? '_section-active' : '',
            headerSection.data.mainStyle.applyPageStyle ? '_applyPageStyle' : '_not-applyPageStyle'
          ]"
        >
        </div>

      </component>

      <component
        v-for="section in builderSections"
        :key="section.id"
        :is="section.name"
        :id="section.id"
        :class="[
          { 'video-background': section.data.mainStyle.backgroundVideo },
          $builder.isEditing ? device: '',
          isActiveSection(section.id) ? '_section-active' : '',
          section.data.mainStyle.parallax ? '_parallax' : '',
          section.data.mainStyle.applyPageStyle ? '_applyPageStyle' : '_not-applyPageStyle'
        ]"
        :data-apply="section.data.mainStyle.applyPageStyle"
        :data-parallax="section.data.mainStyle.parallax ? 'scroll' : ''"
        :data-image-src="getImageFromBgStyles(section.data.mainStyle.styles['background-image'])"
        @click.native="selectSidebarSection(section)">

        <!-- TODO: -->
        <!-- hide section's menu in all sections
        <menu-settings slot="menu" :section="section"/>
        -->

        <video
          v-if="section.data.mainStyle.backgroundVideo && !showConfirmElementDelete && !isShowModalButton"
          :id="`bg-video-${ section.id }`"
          slot="video"
          autoplay="true"
          muted="true"
          loop>
          <source :src="section.data.mainStyle.backgroundVideo">
        </video>

        <div
          class="b-overlay"
          v-if="section.data.mainStyle.overlay"
          :id="`bg-overlay-${ section.id }`"
          slot="overlay"
          :style="{ 'background-color' : section.data.mainStyle.overlay.color, 'opacity' : section.data.mainStyle.overlay.opacity }"
        >
        </div>

      </component>

      <v-style>
        {{ parsedCss.content }}
      </v-style>

    </div>

    <!-- confirm delete element windows -->
    <base-confirm
      class="b-modal-delete-element"
      :class="{'is-expanded': isExpanded }"
      title="Delete element"
      @confirm="removeElement(selectedElement.name)"
      @close="closeDeleteElement"
      v-if="showConfirmElementDelete"
      button="Delete"
    >
      You are going to delete <span class="b-modal-delete-element__name">{{ settingObjectLabel }}</span>, this cannot be undone. Confirm deleting?
    </base-confirm>

    <base-confirm
      class="b-modal-button"
      :class="{'is-expanded': isExpanded }"
      title="Set target"
      @confirm="toggleModalButton(false)"
      @close="toggleModalButton(false)"
      v-if="isShowModalButton"
      button="Done"
    >
      <ModalButton
        :builder="$builder"
      />
    </base-confirm>
  </div>
  <onboarding-tips :builder="builder" />
</builder-layout>
</template>

<script>
import VuseIcon from './VuseIcon'
import BuilderLayout from './BuilderLayout.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import * as _ from 'lodash-es'
import ModalButton from './modals/TheModalButton'
import { getFontsSetup, getFontsSetupStyle } from '../util'

import { sectionsGroups } from '@cscripts/sectionsGroups'
import BaseLoading from '../../components/base/BaseLoading'
import OnboardingTips from './OnboardingTips'

export default {
  name: 'VuseBuilder',

  components: {
    BaseLoading,
    VuseIcon,
    BuilderLayout,
    ModalButton,
    OnboardingTips
  },

  props: {
    showIntro: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: () => ({
        title: '',
        sections: []
      })
    }
  },

  data () {
    return {
      title: null,
      groups: {},
      isSectionsInited: false,
      sections: this.getSections(),
      parsedCss: {
        array: [],
        prop: '.artboard',
        content: ''
      },
      showConfirmElementDelete: false,
      selectedElement: null,
      loading: false
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    ...mapState('Sidebar', [
      'isExpanded',
      'device',
      'settingObjectSection',
      'settingObjectOptions',
      'settingObjectLabel',
      'isShowModal',
      'isShowModalButton',
      'controlPanel',
      'sandbox',
      'isAddSectionExpanded'
    ]),
    ...mapState('Landing', [
      'currentStateNumber'
    ]),

    builder () {
      return this.$builder
    },

    emptySections () {
      return !this.showIntro && !this.builder.sections.length
    },

    headerSection () {
      return this.builder.sections.find(section => section.isHeader)
    },

    builderSections () {
      return this.builder.sections.filter(section => !section.isHeader)
    },

    setupFonts () {
      return this.currentLanding.settings.setupFonts || {}
    },

    setupFontsStyle () {
      return this.currentLanding.settings.setupFontsStyle || {}
    },

    fontsSetup () {
      return getFontsSetup(this.setupFonts)
    },

    fontsSetupStyle () {
      return getFontsSetupStyle(this.setupFontsStyle)
    },

    components: {
      set (value) {
        this.settingObjectSection.set(this.sandbox.components, value)
      },
      get () {
        return this.settingObjectSection.get(this.sandbox.components) || []
      }
    }
  },

  watch: {
    title (value) {
      this.$builder.title = value
    },

    currentLanding (value) {
      this.initSettings()
    },

    /*
     * AutoSave landing after editing settings
     */
    'currentLanding.settings': {
      handler () {
        this.saveState(this.$builder.export('JSON'))
      },
      deep: true
    },

    'currentLanding.settings.css': {
      handler (value) {
        this.parsing(value)
      },
      deep: true
    },

    showConfirmElementDelete (value) {
      this.toggleModal(value)
      this.toggleHidePageBackgroundVideo()
    },

    isShowModalButton () {
      this.toggleHidePageBackgroundVideo()
    }
  },

  created () {
    // sets the initial data.
    this.$builder.set(this.data)
    this.$builder.settings = {
      mailchimpUrl: false
    }
    this.title = this.$builder.title
    this.themes = this.$builder.themes

    if (this.$route.params.slug !== 'new') {

    }

    this.groups = this.generateGroups()
    this.updateBuilderSections(this.sections)
    this.updateBuilderGroups(this.groups)

    this.getUser()
  },

  mounted () {
    let css = this.currentLanding.settings.css

    this.$builder.rootEl = this.$refs.artboard
    this.initSettings()
    this.fillCheckList()

    this.parsing(css)

    // listener keyUp press
    document.addEventListener('keyup', this.keyUp)
  },

  updated () {
    if (this.$builder.scrolling) {
      this.$builder.scrolling(this.$refs.artboard)
    }

    let groupList = this.$builder.sections.map(section => {
      return _.find(this.sections, { name: section.name }).group
    })

    this.$store.dispatch('Landing/updateGroups', groupList)

    try {
      this.observeGroups()
    } catch (e) { }
  },

  beforeDestroy () {
    this.$Progress.start()
    this.saveStateHandler(this.builder.export('JSON')).finally(() => {
      this.$builder.clear()
      this.clearStateStack()
      document.removeEventListener('keyup', this.keyUp)
      this.$Progress.finish()
    })
  },

  methods: {
    ...mapActions([
      'clearLandingData',
      'activateCheckListItem'
    ]),
    ...mapActions('Sidebar', [
      'updateBuilderSections',
      'updateBuilderGroups',
      'updateSectionGroups',
      'setSettingSection',
      'toggleSidebar',
      'setControlPanel',
      'toggleAddSectionMenu',
      'clearSettingObject',
      'clearSettingObjectLight',
      'toggleModal',
      'toggleSectionsTreeMenu',
      'toggleAddSectionMenu',
      'toggleProgressPanelExpanded',
      'toggleModalButton'
    ]),
    ...mapActions('Landing', [
      'saveState',
      'setState',
      'saveStateHandler'
    ]),
    ...mapActions('User', [
      'getUser'
    ]),
    ...mapMutations('Landing', [
      'clearStateStack',
      'undoFlag'
    ]),

    parsing (textCss) {
      let self = this

      this.parsedCss.array = this.parseCss(textCss)
      this.parsedCss.content = ''

      this.parsedCss.array.forEach(function (item, i, arr) {
        self.parsedCss.content += `${self.parsedCss.prop} ${item.cssText} \n`
      })
    },

    parseCss (text) {
      let tokenizer = /([\s\S]+?)\{([\s\S]*?)\}/gi
      let rules = []
      let rule, token
      let check = false

      text = text.replace(/\/\*[\s\S]*?\*\//g, '')

      while ((token = tokenizer.exec(text))) {
        let style = this.parseRule(token[2].trim())

        style.cssText = this.stringifyRule(style)
        rule = {
          selectorText: token[1].trim().replace(/\s*,\s*/, ', '),
          style: style
        }

        // Not push @media styles
        if (token[1].indexOf('@media') !== -1) {
          check = true
        }

        if (token[1].indexOf('}') !== -1 && token[1].indexOf('@media') === -1) {
          let temp = rule.selectorText.replace('}', '')
          let tempM = temp.replace('\n', '')

          rule.selectorText = tempM
          check = false
        }
        // Not push @media styles

        rule.cssText = rule.selectorText + ' { ' + rule.style.cssText + ' }'

        if (!check) rules.push(rule)
      }

      return rules
    },

    parseRule (css) {
      let tokenizer = /\s*([a-z-]+)s*:\s*((?:[^;]*url(.*?)[^;]*|[^;]*)*)\s*(?:;|$)/gi
      let obj = {}
      let token

      while ((token = tokenizer.exec(css))) {
        obj[token[1].toLowerCase()] = token[2]
      }

      return obj
    },

    stringifyRule (style) {
      let text = ''
      let keys = Object.keys(style).sort()

      for (let i = 0; i < keys.length; i++) {
        text += ' ' + keys[i] + ': ' + style[keys[i]] + ';'
      }

      return text.substring(1)
    },

    initSettings () {
      const settings = this.currentLanding.settings
      this.$builder.landing = this.$route.params.slug
      this.$builder.settings = settings

      // Open current landing/preset
      if (!this.isSectionsInited) {
        // We need to do it only once
        // otherwise sections will be overwriten on Site Settings save
        if (this.currentLanding.sections) {
          this.addTheme(this.currentLanding)
        } else {
          this.addTheme(Object.assign(this.data, this.currentLanding.theme))
        }
        this.isSectionsInited = true
      }

      this.styleArtboard(settings.styles)
      this.updateVideo()

      /* if (this.emptySections) {
        this.toggleSidebar(true)
        this.toggleSectionsTreeMenu(true)
        this.toggleAddSectionMenu(true)
      } else {
        this.toggleSidebar(true)
        this.toggleSectionsTreeMenu(true)
        this.toggleAddSectionMenu(false)
        this.toggleProgressPanelExpanded(false)
      } */
    },

    addTheme (theme) {
      this.$builder.set(theme)
    },
    save () {
      this.$emit('save', this.$builder)
    },
    submit () {
      this.$emit('saved', this.$builder)
    },
    preview: function () {
      this.$emit('preview', this.$builder)
    },
    backToLandings () {
      this.save()
      this.$router.push({ path: `/dashboard` })
    },
    styleArtboard (styles) {
      Object.keys(styles).forEach((styleName) => {
        let value = styles[styleName]
        if (styleName === 'backgroundImage' && value) {
          value = `url(${value})`
        } else if (
          (styleName === 'backgroundPositionX' || styleName === 'backgroundPositionY') &&
            !isNaN(Number(value)) &&
            value
        ) {
          value = `${value}px`
        }
        this.$refs.artboard.style[styleName] = value
      })
    },
    updateVideo () {
      const settings = this.currentLanding.settings
      if (document.getElementById('video_bg')) {
        document.getElementById('video_bg').remove() // rm old video if exist
      }

      if (!settings.video) {
        return
      }

      const node = document.createElement('video')
      node.id = 'video_bg'
      node.setAttribute('autoplay', '')
      node.setAttribute('loop', '')
      node.setAttribute('muted', '')
      if (settings.videoPosition) {
        node.classList.add(settings.videoPosition)
      }
      node.innerHTML = `<source src="${settings.video}" type="video/mp4"></source>`
      this.$refs.artboard.appendChild(node)
      node.muted = true
    },
    getSections () {
      let sections = []
      // get sections data
      sections = Object.keys(this.$builder.components).map((sec) => {
        return {
          name: sec,
          group: this.$builder.components[sec].options.group,
          cover: this.$builder.components[sec].options.cover,
          schema: this.$builder.components[sec].options.$schema,
          description: this.$builder.components[sec].options.description,
          title: _.startCase(this.$builder.components[sec].options.name)
        }
      })
      return sections
    },

    generateGroups () {
      let groups = { random: [] }
      // group sections together
      this.sections.forEach((section) => {
        let sectionGroup = section.group
        if (!sectionGroup) {
          groups.random.push(section)
          return
        }
        if (!groups[sectionGroup]) {
          groups[sectionGroup] = [section]
          return
        }
        groups[sectionGroup].push(section)
      })
      return groups
    },

    async selectSidebarSection (section) {
      let menuItem = document.getElementById(`menu-item-${section.id}`)
      if (!menuItem) {
        return
      }
      // --- coz directive v-scroll-to is called
      await this.$nextTick()
      // --- rm class/es from menu items
      document
        .querySelectorAll('.b-menu-subitem_selected')
        .forEach(el => el.classList.remove('b-menu-subitem_selected'))
      // --- add selected class and scroll to el
      menuItem.classList.add('b-menu-subitem_selected')
      menuItem.scrollIntoView()

      this.setControlPanel(false)
      this.toggleSectionsTreeMenu(true)
    },

    showSettingsBar (event, section) {
      if (event.target.closest('.styler-active')) {
        return
      }
      this.toggleSidebar(true)
      this.setSettingSection(section)
    },

    observeGroups () {
      let groups = []
      let sectionsNodes = Array.from(this.$refs.artboard.children)

      sectionsNodes = sectionsNodes.filter((node) => {
        return Array.from(node.classList).indexOf('b-section-header') < 0
      })

      this.removeGroupClasses(sectionsNodes)

      this.builderSections.forEach((section, index) => {
        if (section.data.mainStyle.absorb > 0) {
          let group = {}
          group.main = section
          group.main_element = sectionsNodes[index]
          group.absorb = section.data.mainStyle.absorb
          group.childrenNodes = sectionsNodes.slice(index + 1, index + section.data.mainStyle.absorb + 1)
          group.children = this.builderSections
            .slice(index + 1, index + section.data.mainStyle.absorb + 1)
            .map(section => section.id)

          // set attrs to calculate
          group.main_element.classList.add('ptah-g-main')
          group.main_element.dataset.absorb = group.absorb
          group.childrenNodes.forEach((el) => el.classList.add('ptah-g-child'))

          section.isMain = true

          groups.push(group)
        } else {
          section.isMain = false
        }
      })

      sectionsGroups()

      // store groups
      this.updateSectionGroups(groups)
    },

    removeGroupClasses (nodes) {
      nodes.forEach((node) => {
        node.classList.remove('ptah-g-main')

        if (node.classList.contains('ptah-g-child')) {
          node.classList.remove('ptah-g-child')
          node.style.position = 'relative'
          node.style.top = '0'
        }
      })
    },

    isActiveSection (id) {
      return this.settingObjectSection.id === id
    },

    keyUp (event) {
      if (event.key === 'Delete' && this.settingObjectOptions && this.settingObjectOptions.name && !this.controlPanel.expanded) {
        if (this.settingObjectOptions.removable && this.settingObjectOptions.name.indexOf('.element') !== -1) {
          this.selectedElement = this.settingObjectOptions
          this.deleteElement(this.selectedElement.name)
        } else {
          this.selectedElement = null
        }
      }

      if (event.code === 'KeyZ' && event.ctrlKey) {
        /* this.undoFlag(false)
        this.loading = true
        let frame = document.getElementById('artboard')
        let stateNumber = this.currentStateNumber > 0 ? this.currentStateNumber - 1 : 0
        this.clearLandingData()
        this.clearSettingObject()
        this.$builder.clear()

        setTimeout(() => {
          this.setState(stateNumber)
          this.$builder.set(this.currentLanding)
          this.$nextTick(function () {
            this.loading = false
          })
        }, 0)

        frame.normalize() */
      }
    },

    deleteElement (name) {
      if (this.selectedElement !== null) {
        this.showConfirmElementDelete = true
      }
    },

    /**
     * Get path
    */
    path (name) {
      let path = _.split(name, '.')[1]
      return _.toPath(path)
    },

    /**
     * Remove element
     * @param index
     */
    removeElement (name) {
      let p = this.path(name)
      this.selectedElement = null
      this.clearSettingObjectLight()

      const components = [...this.components]

      components.splice(parseInt(p[1]), 1)
      this.components = components
    },

    closeDeleteElement () {
      this.showConfirmElementDelete = false
      this.selectedElement = null
    },

    getImageFromBgStyles (bg) {
      if (!bg) {
        return
      }
      return bg.replace(/^url[(]/, '').replace(/[)]$/, '')
    },

    fillCheckList () {
      let settings = this.currentLanding.settings
      let list = []

      if (settings.title !== '') {
        list.push('title')
      }

      if (settings.favicon !== '') {
        list.push('favicon')
      }

      if (settings.styles.backgroundImage !== '' || settings.styles.backgroundColor !== '') {
        list.push('bg')
      }

      if (settings.css !== '' || settings.script !== '') {
        list.push('code')
      }

      list.forEach(item => this.activateCheckListItem(item))
    },

    toggleHidePageBackgroundVideo () {
      const video = document.getElementById('video_bg')

      if (video) video.classList.toggle('_hide')
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-layout
  height: 100%
.artboard
  transform-origin: top center
  margin: 0 auto
  transition: 0.2s
  position: relative
  min-height: calc(100vh - 6rem)

  display: flex
  flex-direction: column

  &.is-editable div.is-editable,
  &.is-editable a.is-editable,
  &.is-editable table.is-editable
    outline: none
    transition: border 0.25s
    border: .4rem solid transparent
    &.b-button:not(.styler-active):hover
      border: .4rem solid $main-yellow !important
    &:not(.b-button):hover
      cursor: pointer
      border-color: $main-yellow !important
      background-color: rgba(255, 230, 0, 0.1) !important
      border-radius: .5rem !important

    &:not(.b-button).styler-active
      border-color: transparent !important
      background-color: rgba(255, 230, 0, 0.1) !important
      border-radius: .5rem !important
      &:hover
        border-color: transparent !important
      .is-mobile &.b-image,
      .is-mobile &.b-logo,
      .is-tablet &.b-image,
      .is-tablet &.b-logo
        border-color: $main-yellow !important
        &:hover
          border-color: $main-yellow !important
    &._hover-red:not(.b-button).styler-active
      border-color: transparent !important
      background-color: rgba(#D36083, 0.1) !important
      border-radius: .5rem !important
      &:hover
        border-color: transparent !important
      .is-mobile &.b-image,
      .is-mobile &.b-logo,
      .is-tablet &.b-image,
      .is-tablet &.b-logo
        border-color: #D36083 !important
        &:hover
          border-color: #D36083 !important
  &.is-editable div.b-border,
  &.is-editable table.b-border
    outline: none
    transition: border 0.25s
    border: .4rem solid transparent
    &.b-button:not(.styler-active):hover
      border: .4rem solid $main-yellow !important
    &:not(.b-button):hover
      cursor: pointer
      border: .4rem solid $main-yellow !important
      background-color: rgba(255, 230, 0, 0.1) !important
      border-radius: .5rem !important
    &:not(.b-button).styler-active
      border: .4rem solid $main-yellow !important
      background-color: rgba(255, 230, 0, 0.1) !important
      border-radius: .5rem !important
      &:hover
        border: .4rem solid $main-yellow !important
      &.b-text
        cursor: pointer

  &.is-editable div.b-border,
  &.is-editable table.b-border
    outline: none
    transition: border 0.25s
    border: .4rem solid transparent
    &._hover-red.b-button:not(.styler-active):hover
      border: .4rem solid #D36083 !important
    &._hover-red:not(.b-button):hover
      cursor: pointer
      border: .4rem solid #D36083 !important
      background-color: rgba(#D36083, 0.1) !important
      border-radius: .5rem !important
    &._hover-red:not(.b-button).styler-active
      border: .4rem solid #D36083 !important
      background-color: rgba(#D36083, 0.1) !important
      border-radius: .5rem !important
      &:hover
        border: .4rem solid #D36083 !important
      &.b-text
        cursor: pointer
  &.fp-scroll section:not(.b-section-header):not(.b-section-footer):not(.is-mobile)
    height: 100vh !important
  &.fp-scroll section.is-editable:not(.b-section-header):not(.b-section-footer):not(.is-mobile)
    height: calc(100vh - 6rem) !important
  &:before,
  &:after
    content: ''
    background-color: $ligth-grey
    position: absolute
    top: 0
    bottom: 0
    width: 10000rem
    z-index: 1
  &:before
    right: 100%
  &:after
    left: 100%
.controller
  box-sizing: border-box
  &-input
    outline: none
    border: 1px solid #c1c1c1
    padding: 0.5rem 1rem
    margin: 2rem 0
    border-radius: 4rem
    width: 100%
    font-size: 1.6rem
    &:focus
      border-color: #0072FF
      box-shadow: 0 0 0 0.2rem rgba(#0072FF, 50%)

.b-intro
  width: 100%
  height: 100%
  max-width: 50rem
  margin: auto

  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

  transition: all .2s ease-out
  &._add
    padding-left: 29rem
  &__image
    width: 30rem
    height: 27rem

    background-image: url(https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/747986bb-59e9-49be-97fe-05beb5aa0765.png)
    background-size: cover
  &__chapter
    font-size: 1.8rem
    line-height: 2.6rem
    font-weight: 600
    letter-spacing: -0.06em
    color: #575A5F

    margin: 3.5rem 0 1.5rem
  &__text
    font-size: 1.2rem
    line-height: 2rem
    color: #A2A5A5
  &-arrow
    position: absolute
    top: 2.3rem
    left: 2.9rem
    transition: all .2s ease-out

.b-landing-constructor__button
  width: 100%
  height: 100%
  display: inline-block
  font-weight: 400
  text-align: center
  white-space: nowrap
  vertical-align: middle
  border: 1px solid #545b62
  border-radius: .25rem
  transition: color .15s
  background-color: #545b62
  cursor: pointer
  color: #ffffff

.b-landing-constructor__video_type
  height: 100%
  display: flex
  justify-content: center
  align-items: center

.controller-panel, .styler
  z-index: 9999

.vuse-icon
  width: 2rem
  height: 2rem
  display: inline-block
  vertical-align: middle
  .is-editable &,
  .is-editable + &,
  .is-editable ~ &,
  .controller-button &
    cursor: pointer

.floatHover
  cursor: pointer
  box-shadow: 0 14px 28px opacify(#000000, 0.125), 0 10px 10px opacify(#000000, 0.1)

.page-sections
  list-style: none
  padding: 0
  margin: 0 0 40px 0
  li
    margin: 0 0 4px
    padding: 1rem 0.5rem
    background: lighten(#18d88b, 40%)

.b-modal-delete-element
  &__name
    font-weight: 600
    text-transform: capitalize

.b-modal-button
  text-align: left
  /deep/
    .b-confirm__footer
      justify-content: center

.preloader
  z-index: 1000
  position: absolute
  background: #fff

.b-ptah-element._show-el-tip,
.b-ptah-element._show-el-tip.styler-active
  border: .4rem solid $main-yellow !important
  border-color: $main-yellow !important
</style>
