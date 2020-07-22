<template>
  <TheOnboardingStepLayout @skipSteps="skipSteps">
    <template v-if="palette === null">
      <div class="b-panel__control">
        <base-caption>
          Instruction
        </base-caption>
        <div class="b-instruction" />
      </div>
    </template>
    <div class="b-panel__control">
      <div class="b-palette">
        <BaseCaption>
          Color palette generator
        </BaseCaption>
        <div class="b-palette__col">
          <p class="b-palette__generator-text">
            Simply upload an image, and we’ll use the hues in the image to create your palette.
          </p>

          <div class="b-palette__col" v-if="palette !== null">
            <div class="b-gen-palette">
              <ul class="b-gen-palette__list">
                <li class="b-gen-palette__list-item b-gen-palette__list-item_palette">
                  <IconBase
                    width="24"
                    height="24"
                    name="palette"
                    color="#A2A5A5"
                  />
                </li>
                <li
                  v-for="(color, index) in palette"
                  :key="color + index"
                  :style="{'background-color' : color}"
                  class="b-gen-palette__list-item"
                />
              </ul>
            </div>
          </div>

          <div class="b-palette__controls" :class="{ 'b-palette__loaded': palette !== null }">
            <base-upload-button
              :value="imageForPalette"
              @upload="getInputSrcFiles"
              :progress="progress"
              @startProgress="startProgress"
              :palette="palette"
            >
            </base-upload-button>
            <base-button v-if="palette !== null" color="main-green" size="small" @click="applyPalette">
              Apply palette
            </base-button>
          </div>
        </div>
      </div>
    </div>
    <template v-if="palette !== null">
      <div class="b-panel__control">
        <BaseCaption>
          Main colors
        </BaseCaption>

        <div class="b-palette__col"
          v-for="(color, index) in colorsList"
          :key="`picker-${ _uid }-${ index }`"
        >
          <base-color-picker
            :label="labelsArray[index]"
            v-model="colorsList[index]"
            @change="changePaletteColor($event, index)"
          />
        </div>
      </div>
    </template>
  </TheOnboardingStepLayout>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import TheOnboardingStepLayout from '@src/components/pages/wizard/TheOnboardingStepLayout'
import ColorThief from 'colorthief/dist/color-thief.umd'
import _ from 'lodash-es'

export default {
  name: 'TheOnboardingColorsPage',

  components: {
    TheOnboardingStepLayout
  },

  data () {
    return {
      imageForColorThief: null,
      progress: false,
      colorLabels: {
        headers: 'Main title',
        text: 'Plain text',
        button: 'Button background',
        buttonText: 'Button text',
        buttonHover: 'Button hover color',
        add1: 'Additional color'
      }
    }
  },

  computed: {
    ...mapState('Onboarding', [
      'colors',
      'palette',
      'imageForPalette'
    ]),

    colorsList () {
      return Object.values(this.colors)
    },

    labelsArray () {
      return Object.values(this.colorLabels)
    }
  },

  watch: {
    imageForColorThief (images) {
      const image = images[0] || images
      const reader = new FileReader()
      const preview = document.createElement('img')
      const colorThief = new ColorThief()

      preview.crossOrigin = 'Anonymous'
      preview.setAttribute('width', '100')
      preview.setAttribute('height', '200')

      reader.readAsDataURL(image)
      reader.onloadend = function () {
        preview.src = reader.result
      }

      setTimeout(() => {
        const getPalette = colorThief.getPalette(preview, 6)

        if (getPalette === null) {
          this.progress = false
          return
        }

        const palette = getPalette.map(c => {
          return this.getRgbaFromArray(c)
        })

        this.setPalette(_.uniqBy(palette))
        this.setImageForPalette(this.imageForPalette)
        this.progress = false
      }, 1000)
    }
  },

  created () {
    this.setActiveStep('colors')
  },

  mounted () {
    if (this.palette !== null) {
      this.applyPalette()
    } else {
      this.deactivateCheckListItem('colors')
    }

    try {
      this.$gtag.event('Wizard_colors', { 'event_category': 'LANDING' })
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    ...mapActions('Onboarding', [
      'activateCheckListItem',
      'deactivateCheckListItem',
      'updateColors'
    ]),

    ...mapMutations('Onboarding', [
      'setActiveStep',
      'setPalette',
      'setImageForPalette'
    ]),

    changePaletteColor (e, index) {
      let colors = this.colorsList.slice()
      colors[index] = this.getRgbaString(e.rgba)
      this.updateColors(colors)
    },

    getRgbaString (colorObject) {
      const color = Object.values(colorObject).toString()
      return `rgba(${color})`
    },

    getRgbaFromArray (colorArray) {
      return `rgba(${colorArray.toString()}, 1)`
    },

    getInputSrcFiles (value) {
      this.progress = true
      this.imageForColorThief = value
    },

    startProgress (value) {
      this.progress = value
    },

    applyPalette () {
      this.activateCheckListItem('colors')
      this.updateColors(this.palette)
    },

    skipSteps () {
      this.$emit('skipSteps')
    }
  }
}
</script>

<style lang="sass" scoped>
  .b-instruction
    background-image: url(https://cdn.ptah.pro/tst/5ef4948bf835ea00018fb774/3ee39b42-fda8-40ec-8ba6-d1f82e6059c6.gif)
</style>
