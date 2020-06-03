<script>
import { mapState, mapActions } from 'vuex'
import { get, set, merge } from 'lodash-es'

export default {
  data () {
    return {
      hamPositionValue: 0
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

    sticky: {
      get: function () {
        return get(this.settingObjectOptions, 'sticky') || false
      },
      set: function (newValue) {
        this.setPosition('sticky', newValue)
      }
    },

    hamPosition: {
      get: function () {
        return get(this.settingObjectOptions, 'hamPosition') || 12
      },
      set: function (newValue) {
        this.setPosition('hamPosition', newValue)
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    setPosition (path, value) {
      let obj = set({}, path, value)
      this.updateSettingOptions(merge({}, this.settingObjectOptions, obj))
    },

    toggleSticky () {
      this.sticky = !this.sticky
    },

    setHamPosition (value) {
      this.hamPositionValue = value
    },

    setHamPositionValue (value) {
      this.positionValue = value
    }
  }
}
</script>

<template>
  <div class="b-panel__control">
    <BaseCaption>
      Menu icon position
    </BaseCaption>
    <div class="b-panel__col" v-if="!isMobile">
      <base-switcher
        :value="sticky"
        label="Sticky position"
        @change="toggleSticky"/>
    </div>
    <div class="b-panel__col" v-if="isMobile">
      <base-range-slider
        v-model="hamPosition"
        step="1"
        min="0"
        max="64"
        @change="setHamPosition"
      >
        <base-number-input
          :value="hamPositionValue"
          :minimum="0"
          :maximum="64"
          unit="px"
          @input="setHamPositionValue"
        />
      </base-range-slider>
    </div>
  </div>
</template>
