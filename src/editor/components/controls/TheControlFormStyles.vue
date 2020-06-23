<script>
import { mapState, mapActions } from 'vuex'
import { get, merge } from 'lodash-es'
import ControlTypography from './TheControlTypography'

export default {
  data () {
    return {
      buttonBorderRadiusValue: 0,
      elHeightValue: 0
    }
  },

  components: {
    ControlTypography
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'settingObjectElement',
      'settingObjectType',
      'isMobile'
    ]),

    styles () {
      return this.settingObjectOptions.styles
    },

    formStyles () {
      return this.settingObjectOptions.formStyles
    },

    mediaFormStylesHeight: {
      get () {
        let w = get(this.settingObjectOptions, `media['is-mobile']['formStyles']['height']`)

        if (w === undefined) w = get(this.settingObjectOptions, `formStyles['height']`)

        return w
      },

      set (value) {
        let props = {}
        let formStyles = {
          height: value
        }
        let media = {
          'is-mobile': {
            'formStyles': formStyles
          }
        }

        this.isMobile ? props = { 'media': media } : props = { 'formStyles': formStyles }

        this.updateSettingOptions(merge({}, this.settingObjectOptions, props))
      }
    },

    elHeight: {
      get () {
        let h = 0

        if (this.isMobile) {
          h = this.mediaFormStylesHeight
        } else {
          h = this.formStyles.height
        }

        return h
      },

      set (value) {
        if (this.isMobile) {
          this.mediaFormStylesHeight = value
        } else {
          this.formStyles.height = value
        }
      }
    },

    buttonColor: {
      get () {
        return this.formStyles['button-color']
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
          formStyles: {
            'button-color': color
          }
        }))
      }
    },

    buttonHoverColor: {
      get () {
        return this.formStyles.buttonHoverColor
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
          formStyles: {
            buttonHoverColor: color
          }
        }))
      }
    },

    buttonTextColor: {
      get () {
        return this.formStyles.buttonTextColor
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
          formStyles: {
            buttonTextColor: color
          }
        }))
      }
    },

    buttonHoverTextColor: {
      get () {
        return this.formStyles.buttonHoverTextColor
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
          formStyles: {
            buttonHoverTextColor: color
          }
        }))
      }
    },

    inputBgColor: {
      get () {
        return this.formStyles.inputBgColor
      },

      set (value) {
        const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value

        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
          formStyles: {
            inputBgColor: color
          }
        }))
      }
    },

    buttonBorderRadius: {
      get () {
        return parseInt(this.formStyles['border-radius']) || 0
      },

      set (value) {
        this.updateSettingOptions(merge({}, this.settingObjectOptions, {
          formStyles: {
            'border-radius': value
          }
        }))
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    setButtonBorderRadius (value) {
      this.buttonBorderRadiusValue = value
    },

    setButtonBorderRadiusValue (value) {
      this.buttonBorderRadius = value
    },

    setElHeight (value) {
      this.elHeightValue = value
    },

    setElHeightValue (value) {
      this.elHeight = value
    }
  },

  mounted () {
    this.buttonBorderRadiusValue = this.buttonBorderRadius
    this.elHeightValue = this.elHeight
  }
}
</script>

<template>
  <div>
    <div v-if="!isMobile">
      <div class="b-panel__control">
        <base-caption>
          Text style
        </base-caption>

        <control-typography/>

        <div class="b-panel__col">
          <base-color-picker
            label="Background color"
            v-model="inputBgColor"
          />
        </div>
      </div>

      <div class="b-panel__control">
        <base-caption>
          Button style
        </base-caption>
        <div class="b-panel__col">
          <div class="b-panel__control">
            <base-color-picker
              label="Text color"
              v-model="buttonTextColor"
            />
          </div>
          <div class="b-panel__control">
            <base-color-picker
              label="Button color"
              v-model="buttonColor"
            />
          </div>
          <div class="b-panel__control">
            <base-range-slider
              position-label="left"
              v-model="buttonBorderRadius"
              min="0"
              max="100"
              label="Corner"
              @change="setButtonBorderRadius"
            >
              <base-number-input
                :value="buttonBorderRadiusValue"
                :minimum="0"
                :maximum="100"
                unit="%"
                @input="setButtonBorderRadiusValue"
              />
            </base-range-slider>
          </div>
        </div>
      </div>
      <div class="b-panel__control">
        <base-caption>
          Button hover style
        </base-caption>
        <div class="b-panel__col">
          <div class="b-panel__control">
            <base-color-picker
              label="Text color"
              v-model="buttonHoverTextColor"
            />
          </div>
          <div class="b-panel__control">
            <base-color-picker
              label="Button color"
              v-model="buttonHoverColor"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="b-panel">
      <div class="b-panel__control">
        <base-caption>
          Form style
        </base-caption>
        <div class="b-panel__col">
          <base-range-slider
            position-label="left"
            v-model="elHeight"
            min="32"
            max="100"
            label="Height"
            @change="setElHeight"
          >
            <base-number-input
              :value="elHeightValue"
              :minimum="32"
              :maximum="100"
              unit="px"
              @input="setElHeightValue"
            />
          </base-range-slider>
        </div>
      </div>
    </div>
  </div>
</template>
