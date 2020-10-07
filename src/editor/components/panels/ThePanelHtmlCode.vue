<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Html Code
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2 _pr-05">
        <div class="layout-padding _h100">
          <!-- Settings Html Code element -->
          <control-html-code v-if="!isMobile" />
          <disabled-mobile-mode v-else />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlHtmlCode from '../controls/TheControlHtmlCode'
import DisabledMobileMode from '../DisabledMobileMode'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelControlHtmlCode',

  components: {
    ControlHtmlCode,
    DisabledMobileMode,
    IndicatorPlatform
  },

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectOptions',
      'isMobile'
    ])
  }
}
</script>
