<template>
  <div class="b-palette">
    <div class="b-palette__row">
      <BaseCaption>Page colors</BaseCaption>

      <div class="b-palette__col" v-for="(color, index) in colors" :key="`picker-${ _uid }-${ index }`">
        <base-color-picker
          :label="labelsArray[index]"
          v-model="colors[index]"
          @change="changePaletteColor($event, index)"></base-color-picker>
      </div>
    </div>

    <BaseCaption>
      Color palette generator
    </BaseCaption>
    <div class="b-palette__col">
      <p class="b-palette__generator-text">
        Simply upload an image, and we’ll use the hues in the image to create your palette.
      </p>

      <div class="b-palette__col" v-if="palette">
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

      <div class="b-palette__controls" :class="{ 'b-palette__loaded': palette }">
        <base-upload-button
          :value="imagePalette"
          :palette="palette"
          @change="changeImagePalette"
          @upload="getInputSrcFiles"
          :progress="progress"
          @startProgress="startProgress"
        >
        </base-upload-button>
        <base-button v-if="palette" color="main-green" size="small" @click="applyPalette">
          Apply palette
        </base-button>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash-es'
import ColorThief from 'colorthief/dist/color-thief.umd.js'

export default {
  name: 'TheColorPalette',
  data () {
    return {
      imageForColorThief: null,
      progress: false,
      colorLabels: {
        headers: 'Headers',
        text: 'Plain text',
        button: 'Button color',
        buttonText: 'Button text',
        buttonHover: 'Button hover color',
        add1: 'Additional color'
      }
    }
  },

  computed: {
    ...mapState(['currentLanding']),

    colors () {
      return Object.values(this.currentLanding.settings.colors).slice(0, 6)
    },

    labelsArray () {
      return Object.values(this.colorLabels)
    },

    palette () {
      return this.currentLanding.settings.palette
    },

    imagePalette () {
      return this.currentLanding.settings.imageForPalette
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

        this.storeSaveSettingsPalette({ palette: _.uniqBy(palette) })
        this.progress = false
      }, 1000)
    },

    imagePalette () {
      // this.applySettings()
    }
  },

  methods: {
    ...mapActions(['storeSaveSettingsPalette', 'storeColorSettings', 'activateCheckListItem']),

    changePaletteColor (e, index) {
      let colors = this.colors.slice()
      colors[index] = this.getRgbaString(e.rgba)
      this.storeColorSettings(colors)
      this.activateCheckListItem('colors')
    },

    getRgbaString (colorObject) {
      const color = Object.values(colorObject).toString()
      return `rgba(${color})`
    },

    getRgbaFromArray (colorArray) {
      return `rgba(${colorArray.toString()}, 1)`
    },

    changeImagePalette (value) {
      if (value === null) {
        this.activateCheckListItem('colors')
        this.storeSaveSettingsPalette({ palette: null, image: null })
      }
    },

    getInputSrcFiles (value) {
      this.progress = true
      this.imageForColorThief = value
    },

    startProgress (value) {
      this.progress = value
    },

    applyPalette () {
      this.storeColorSettings(this.palette)
    }
  }
}
</script>
