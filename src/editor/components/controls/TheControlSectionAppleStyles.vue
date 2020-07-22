<script>
import { mapState, mapActions } from 'vuex'
import { get, merge, set } from 'lodash-es'

export default {
  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ]),

    applyPageStyle: {
      get: function () {
        return get(this.settingObjectOptions, 'applyPageStyle') || false
      },
      set: function (newValue) {
        this.setOption('applyPageStyle', newValue)
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ]),

    setOption (path, value) {
      let obj = set({}, path, value)
      this.updateSettingOptions(merge({}, this.settingObjectOptions, obj))
    },

    toggleApplyPageStyle () {
      this.applyPageStyle = !this.applyPageStyle
    }
  }
}
</script>

<template>
  <div class="b-panel__control">
    <BaseCaption>
      Styles
    </BaseCaption>
    <div class="b-panel__col" v-if="!isMobile">
      <base-switcher
        :value="applyPageStyle"
        label="Apply page styles"
        @change="toggleApplyPageStyle"/>
    </div>
  </div>
</template>
