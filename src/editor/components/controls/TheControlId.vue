<script>
import { mapState, mapActions } from 'vuex'
import * as _ from 'lodash-es'
import { randomPoneId } from '../../util'

export default {

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions'
    ]),

    id () {
      return this.settingObjectOptions.id
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'updateSettingOptions'
    ])
  },

  mounted () {
    if (this.id === null) {
      this.updateSettingOptions(_.merge({}, this.settingObjectOptions, { id: randomPoneId() }))
    }
  }
}
</script>

<template>
  <base-caption>
    Id: <span class="poneId">{{ id }}</span>
  </base-caption>
</template>

<style lang="sass" scoped>
@import '../../../assets/sass/_colors.sass'
@import '../../../assets/sass/_variables.sass'

.poneId
  text-transform: none
  color: $gray300
</style>
