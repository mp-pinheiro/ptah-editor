import Draggable from 'vuedraggable'
import { mapActions } from 'vuex'
import forEach from 'lodash-es/forEach'

export default {
  components: {
    Draggable
  },

  data () {
    return {
      arrayName: ''
    }
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  watch: {
    '$sectionData': {
      handler () {
        let newState = this.$builder.export('JSON')
        this.saveState(newState)
      },
      deep: true
    },

    '$store.state.currentLanding.settings.logo': {
      handler (value) {
        if (value.length) {
          this.changeLogos(value)
        }
      }
    },

    '$store.state.currentLanding.settings.colors': {
      handler () {
        this.changeColors()
      },
      deep: true
    }
  },

  beforeDestroy () {
    this.$section.set(`$sectionData.components`, [])
  },

  mounted () {
    this.change()
  },

  methods: {
    ...mapActions(['storeSettings']),
    ...mapActions('Landing', ['saveState']),
    ...mapActions('Sidebar', ['toggleDragStop']),

    change () {
      let logo = this.$store.state.currentLanding.settings.logo
      let video = this.$store.state.currentLanding.settings.videoElUrl
      let bgColor = this.$store.state.currentLanding.settings.styles.backgroundColor
      let bg = this.$store.state.currentLanding.settings.firstScreen

      if (logo && logo.length) {
        this.changeLogos(logo)
      }

      if (bgColor && bgColor !== '') {
        this.cleanSectionBgColor()
      }

      if (this.$section.group === 'FirstScreen' && bg) {
        this.changeSectionBackground(bg)
        // rm first screen bg after first use
        this.storeSettings({
          firstScreen: false
        })
      }

      this.changeColors()

      if (video && video.length) {
        this.changeVideo(video)
      }
    },

    $_dragStop (event) {
      this.selectElement(event.moved.newIndex)

      this.toggleDragStop(false)
    },

    $_drag (arrayName) {
      this.arrayName = arrayName

      this.toggleDragStop(true)
    },

    selectElement (newIndex) {
      let idSection = this.id
      let section = document.getElementById(`section_${idSection}`)
      let el = section.querySelector(`[path="${this.arrayName}[${newIndex}].element"]`)
      let resize = el.querySelector(`.resizable.vdr`)

      if (resize) {
        el = resize
      }

      this.clickOnElement(el)
    },

    clickOnElement (el) {
      let machineEvent = new Event('mousedown', { bubbles: true })
      el.dispatchEvent(machineEvent)
    },

    changeLogos (url) {
      let paths = this.getElementPropertyPath('Logo', 'background-image')
      paths.forEach(path => this.$section.set(path, `url(${url})`))
    },

    changeSectionBackground (url) {
      let path = '$sectionData.mainStyle.styles.background-image'
      this.$section.set(path, `url(${url})`)
    },

    changeVideo (url) {
      let paths = this.getElementPropertyPath('VideoElement', 'settings.url', true)

      paths.forEach(path => this.$section.set(path, url))
    },

    changeColors () {
      // Text color
      let plainTextColor = this.$store.state.currentLanding.settings.colors.text
      if (plainTextColor !== '') {
        let textPaths = this.getElementPropertyPath('TextElement', 'color')
        let iconTextPaths = this.getElementPropertyPath('IconWithText', 'color')
        let toggle = this.getElementPropertyPath('ToggleElement', 'color')
        let social = this.getElementPropertyPath('SocialNetworks', 'colorFill.color', true)
        let platform = this.getElementPropertyPath('AvailablePlatforms', 'colorFill.color', true)
        let plainText = textPaths
          .concat(iconTextPaths)
          .concat(toggle)
          .concat(social)
          .concat(platform)

        plainText.forEach(path => this.$section.set(path, plainTextColor))
      }

      // Buttons color
      let buttonColor = this.$store.state.currentLanding.settings.colors.button
      let buttonTextColor = this.$store.state.currentLanding.settings.colors.buttonText
      let buttonHoverColor = this.$store.state.currentLanding.settings.colors.buttonHover

      if (buttonColor !== '') {
        let buttonBgPaths = this.getElementPropertyPath('Button', 'background-color')
        buttonBgPaths.forEach(path => this.$section.set(path, buttonColor))
      }

      if (buttonTextColor !== '') {
        let buttonColorPaths = this.getElementPropertyPath('Button', 'color')
        buttonColorPaths.forEach(path => this.$section.set(path, buttonTextColor))
      }

      if (buttonHoverColor !== '') {
        let buttonColorPaths = this.getElementPropertyPath('Button', 'pseudo.hover.background-color', true)
        buttonColorPaths.forEach(path => this.$section.set(path, `${buttonHoverColor} !important`))
      }
    },

    getElementPropertyPath (el, prop, root = false) {
      let paths = []

      // find all logos in section
      forEach(this.$sectionData, (value, key) => {
        let paramPath = root ? '.element' : '.element.styles'
        if (key.indexOf('components') > -1) {
          value.forEach((element, index) => {
            // TODO: element.label !== 'link' ---> fix coloring link in header
            if (element.name === el && !element.element.customColor && element.label !== 'link') {
              paths.push(`$sectionData.${key}[${index}]${paramPath}.${prop}`)
            }
          })
        }
      })

      return paths
    },

    cleanSectionBgColor () {
      if (this.$sectionData &&
        this.$sectionData.mainStyle &&
        this.$sectionData.mainStyle.styles &&
        this.$vnode.tag.indexOf('FirstScreen') === -1 &&
        this.$vnode.tag.indexOf('Header') === -1) {
        this.$sectionData.mainStyle.styles['background-color'] = 'rgba(0,0,0,0)'
      }
    }
  }
}
