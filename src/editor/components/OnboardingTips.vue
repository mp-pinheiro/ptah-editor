<script>
import Popper from 'popper.js'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'OnBoardingTips',

  props: {
    builder: {
      required: true
    }
  },

  data () {
    return {
      count: 0,
      elements: [], // List of items with tips
      dict: [
        {
          name: '.b-on-boarding-tips-step-1',
          chapter: 'Start with section',
          text: 'Loading section is a great way to jump-start your new page. Click on the section menu icon to open the menu and select a section.'
        },
        {
          name: '.b-on-boarding-tips-step-2',
          chapter: 'Add a section',
          text: 'Select a section which is preferable to your landing page.'
        },
        {
          name: '.b-on-boarding-tips-step-3',
          chapter: 'Choose a section',
          text: 'Then click the chosen section to Preview Area.'
        },
        {
          name: '.b-on-boarding-tips-step-4',
          chapter: 'Block’s settings',
          text: 'Include the main style settings. By pressing the setting icon you can choose the section’s position.'
        },
        {
          name: '.b-on-boarding-tips-step-5',
          chapter: 'Element’s settings',
          text: 'You can dublicate and clone your element. Upload any image by clicking link/upload icons.'
        },
        {
          name: '.b-on-boarding-tips-step-6',
          chapter: 'Progress menu',
          text: 'This list helps you to find the necessary elements to fix before publishing.'
        },
        {
          name: '.b-on-boarding-tips-step-7',
          chapter: 'Device options',
          text: 'Just click on the device to change settings. Be sure that all device settings corresponds to devices patameters.'
        },
        {
          name: '.b-on-boarding-tips-step-8',
          chapter: 'Preview',
          text: 'This window helps you to see the landing page. Compare your changing and return to the tool for fixing.'
        },
        {
          name: '.b-on-boarding-tips-step-9',
          chapter: 'Publish your landing',
          text: 'This window helps you to see the landing page. Compare your changing and return to the tool for fixing.'
        }
      ],
      tips: []
    }
  },

  computed: {
    ...mapState('OnBoardingTips', [
      'isShowTips',
      'stepTips'
    ]),

    ...mapState('Sidebar', [
      'device',
      'hoverBy',
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectSection',
      'sandbox',
      'mainLeftMenu',
      'isExpanded',
      'controlPanel',
      'isSectionsTreeExpanded',
      'isProgressPanelExpanded',
      'isAddSectionExpanded'
    ]),

    sections () {
      return this.builder.sections
    },

    isSections () {
      return this.sections.length !== 0
    }
  },

  watch: {
    sections: function (val) {
      if (this.isShowTips) {
        this.initTips()
      }
    },

    isShowTips: function (value) {
      if (value) {
        this.initTips()
      } else {
        this.destroyTips()
      }
    },

    stepTips: function () {
      this.destroyTips()
      setTimeout(() => {
        this.initTips()
      }, 500)
    },

    isSectionsTreeExpanded: function (value) {
      this.destroyTips()
      setTimeout(() => {
        this.initTips()
      }, 500)
    },

    isAddSectionExpanded: function (value) {
      this.destroyTips()
      setTimeout(() => {
        this.initTips()
      }, 500)
    },

    device: function (value) {
      if (value === 'is-mobile') {
        this.destroyTips()
      } else if (this.isShowTips) {
        setTimeout(() => {
          this.initTips()
        }, 500)
      }
    },

    settingObjectOptions: {
      handler: function (val, oldVal) {
        if (this.isShowTips) {
          this.destroyTips()
          this.initTips()
        }
      },
      deep: true
    }
  },

  beforeDestroy () {
    this.destroyTips()
  },

  methods: {
    ...mapActions('OnBoardingTips', [
      'setShowTips',
      'setStepTips'
    ]),

    ...mapActions('Sidebar', [
      'toggleSidebar',
      'toggleSectionsTreeMenu',
      'toggleAddSectionMenu',
      'toggleProgressPanelExpanded',
      'setControlPanel'
    ]),

    initTips () {
      if (!this.isShowTips) {
        return
      }

      const container = document.getElementById('app')

      // Show tip for new items in the list
      this.dict.forEach((el, index) => {
        const node = this.getNode(el.name, container)

        if (!this.findInList(el.name) && node !== null && Number(this.stepTips) - 1 === index) {
          this.elements.push(node)

          this.createTip(node, this.tipNode(el.chapter, el.text))
        }
      })
    },

    createTip (referenceElement, popper) {
      const container = document.getElementById('app')
      let placement = 'right'

      if (Number(this.stepTips) === 5) {
        placement = 'left'
      }

      if (Number(this.stepTips) > 6) {
        placement = 'bottom'
      }

      const tip = new Popper(referenceElement, popper, {
        placement: placement,
        modifiers: {
          flip: {
            enabled: true,
            boundariesElement: container,
            flipVariations: true,
            flipVariationsByContent: true
          },
          preventOverflow: {
            boundariesElement: container
          }
        }
      })

      this.tips.push(tip)
    },

    tipNode (chapter, text) {
      const self = this
      const newNode = document.createElement('div')
      newNode.innerHTML = `
        <div class="b-on-boarding-tip__inner">
          <div class="b-on-boarding-tip__chapter">${chapter}</div>
          <div class="b-on-boarding-tip__text">${text}</div>
          <div class="b-on-boarding-tip__buttons">
            <span class="b-pth-base-button b-pth-base-button_transparent b-pth-base-button_small b-on-boarding-tip__skip">
              Skip tour
            </span>
            <span class="b-pth-base-button b-pth-base-button_main-red b-pth-base-button_small b-on-boarding-tip__go">
              Go it!
            </span>
          </div>
          <div class="b-on-boarding-tip__circles" />
        </div>
      `
      newNode.classList.add('b-on-boarding-tip')

      if (Number(this.stepTips) === 9) {
        newNode.classList.add('_step-9')
      }

      const skip = newNode.querySelector('.b-on-boarding-tip__skip')
      skip.addEventListener('click', function (e) {
        e.preventDefault()
        self.setShowTips(false)
      })

      const goIt = newNode.querySelector('.b-on-boarding-tip__go')
      goIt.addEventListener('click', function (e) {
        e.preventDefault()
        self.changeStep()
      })

      this.$root.$el.appendChild(newNode)

      return newNode
    },

    findInList (elName) {
      this.elements.forEach((el) => {
        if (el.classList.contains(elName)) {
          return true
        }
      })

      return false
    },

    removeClassByNode (selector, className) {
      let nodes = document.querySelectorAll(selector)

      Array.from(nodes).forEach(n => {
        n.classList.remove(className)
      })
    },

    // get reference element node
    getNode (className, container) {
      const classForSLot = '_show-slot-tip'
      const classForEl = '_show-el-tip'
      let nodeC = container.querySelector(className)

      // step 4 - block settings
      if (className === '.b-on-boarding-tips-step-4') {
        const nodes = container.querySelectorAll(className)

        if (nodes && nodes.length > 0) {
          const filterNodes = Array.from(nodes).filter(n => {
            const dragSlot = n.querySelector('.b-draggable-slot')

            if (dragSlot && dragSlot.querySelector('div') === null) {
              return false
            }

            return true
          })

          if (filterNodes.length > 0) {
            nodeC = filterNodes[0].querySelector('.b-slot__settings')
          }

          if (Number(this.stepTips) === 4) {
            filterNodes[0].classList.add('_hover')
            filterNodes[0].classList.add(classForSLot)
            nodeC.classList.add(classForSLot)
          } else {
            filterNodes[0].classList.remove(classForSLot)
            nodeC.classList.remove(classForSLot)
          }
        }
      }// end // step 4 - block settings

      // step 5 - element settings
      if (className === '.b-on-boarding-tips-step-5' && Number(this.stepTips) === 5 && this.isSections) {
        let node = null

        node = container.querySelector('.b-ptah-element')

        const newNode = document.createElement('div')
        newNode.classList.add('b-tips-controls')

        node.appendChild(newNode)

        nodeC = newNode

        node.classList.add(classForEl)
      }// end // step 5 - element settings

      return nodeC
    },

    destroyTips () {
      document.querySelectorAll('.b-on-boarding-tip').forEach(item => item.remove())
      this.tips.forEach(tip => tip.destroy())
    },

    changeStep () {
      let step = Number(this.stepTips) + 1

      if (!this.isSections && step === 4) {
        step = 6
      }

      this.activeStep(step)
    },

    activeStep (step) {
      if (step === 2) {
        this.toggleSidebar(true)
        this.toggleSectionsTreeMenu(true)
      }

      if (step === 3) {
        this.toggleSidebar(true)
        this.toggleSectionsTreeMenu(true)
        this.toggleAddSectionMenu(true)
      }

      if (step === 4) {
        this.toggleSidebar(false)
        this.toggleSectionsTreeMenu(false)
        this.toggleAddSectionMenu(false)
      }

      if (step === 5) {
        this.toggleSidebar(false)
        this.toggleSectionsTreeMenu(false)
        this.toggleAddSectionMenu(false)
      }

      if (step === 6) {
        this.removeClassByNode('._show-el-tip', '_show-el-tip')
        this.toggleSectionsTreeMenu(false)
        this.toggleAddSectionMenu(false)
        this.toggleSidebar(true)
        this.toggleProgressPanelExpanded(true)
      }

      if (step === 7) {
        this.toggleSidebar(false)
        this.toggleProgressPanelExpanded(false)
      }

      if (step === 10) {
        this.setShowTips(false)
      }

      this.setStepTips(step)
    }
  },

  created () {
    if (localStorage.getItem('isShowTips') === 'true' || localStorage.getItem('isShowTips') === null) {
      this.setShowTips(true)
    } else {
      this.setShowTips(false)
    }

    if (localStorage.getItem('stepTips') === null) {
      this.setStepTips(1)
    } else {
      this.setStepTips(parseFloat(localStorage.getItem('stepTips')))
    }
  },

  mounted () {
    this.activeStep(Number(this.stepTips))
  }
}
</script>

<template>
  <div></div>
</template>

<style lang="sass">
.b-on-boarding-tip
  z-index: 1000

  &__inner
    color: rgba(255, 255, 255, .4)
    font-size: 1.6rem
    line-height: 1.9rem
    position: relative
    width: 29rem

    padding: 1.7rem 1rem 1rem 1.7rem
    background: #1FDCE6
    border-radius: 1rem

  &__chapter
    font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif
    display: block
    font-weight: 600
    font-size: 2rem
    line-height: 1.4
    letter-spacing: 0.065em
    color: rgba(#575A5F, 1)

  &__text
    font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif
    display: block
    font-size: 1.2rem
    line-height: 1.5
    letter-spacing: 0.065em
    color: rgba(#575A5F, .7)

    padding: .8rem 0 1.4rem

  &__buttons
    display: flex
    justify-content: flex-end
    align-items: center
  &__skip
    color: #575A5F
    font-size: 1.2rem
    line-height: 1

    text-transform: none
  &__go
    margin-left: 2.2rem
    text-align: center

    color: #ffffff
    font-size: 1.4rem
    font-weight: 600
    letter-spacing: 0.16rem
    line-height: 1

    text-transform: none

  &__circles
    width: 3rem
    height: 3rem

    position: absolute
    top: 50%
    left: -6rem
    margin-top: -1.5rem
    background-color: rgba(31, 220, 229, 0.2)

    border-radius: 100%

    display: flex
    justify-content: center
    align-items: center
    &:after
      display: block
      content: ""

      width: 1.6rem
      height: 1.6rem

      border-radius: 100%
      background-color: #1FDCE5
  &:after
    content: ''
    display: block
    position: absolute

    top: 50%
    left: 2.5rem

    margin-top: -1rem

    border: 1rem solid transparent
    border-right: 1rem solid #1FDCE5

  &[x-placement^="right"]
    .b-on-boarding-tip__inner
      margin-left: 4.5rem

  &[x-placement^="left"]
    .b-on-boarding-tip__inner
      margin-right: 4.5rem

    .b-on-boarding-tip__circles
      left: auto
      right: -6rem
    &:after
      left: auto
      right: 2.5rem

      border: 1rem solid transparent
      border-left: 1rem solid #1FDCE5
  &[x-placement^="bottom"]
    .b-on-boarding-tip__inner
      margin-right: 0
      margin-top: 4.5rem

    .b-on-boarding-tip__circles
      left: 50%
      top: -4.5rem
      margin-left: -1.5rem
    &:after
      left: 50%
      top: 3.5rem
      margin-left: -.8rem

      border: 1rem solid transparent
      border-bottom: 1rem solid #1FDCE5
  &._step-9
    .b-on-boarding-tip__circles,
    &:after
      left: 80%
.b-tips-controls
  background: url(https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/46f0d1f5-c0c2-4287-9836-1dc5a1fa5619.png)
  background-size: cover
  width: 16rem
  height: 3.6rem

  position: absolute
  bottom: -3.6rem
  left: 50%
  margin-left: -8rem

  display: none
  opacity: 0
  transition: all

  ._show-el-tip &
    display: block
    opacity: 1
</style>
