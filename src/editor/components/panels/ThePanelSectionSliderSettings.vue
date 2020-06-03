<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Slider
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2">
        <base-scroll-container>
          <div class="layout-padding _pr-0">
            <!-- Columns settings -->
            <div class="b-panel__control" v-if="!isMobile">
              <base-caption>
                Slider settings
              </base-caption>

              <control-section-slider />
            </div>

            <disabled-mobile-mode v-else />
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlSectionSlider from '../controls/TheControlSectionSlider'
import IndicatorPlatform from '../IndicatorPlatform'
import DisabledMobileMode from '../DisabledMobileMode'

export default {
  components: {
    IndicatorPlatform,
    ControlSectionSlider,
    DisabledMobileMode
  },
  name: 'ThePanelSectionSliderSettings',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'isMobile'
    ])
  }
}
</script>
