<template>
  <div class="b-panel">
    <h6 class="b-panel__title">
      Form
    </h6>

    <IndicatorPlatform />

    <div class="b-panel__layout _top-9">
      <div class="layout _top-2 _pr-05">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Form styles-->
            <div class="b-panel__control">
              <!-- All styles -->
              <div class="b-panel__control">
                <control-form-styles/>
              </div>

              <!-- Padding/Margin -->
              <div class="b-panel__control">
                <control-box />
              </div>
            </div>
          </div>
        </base-scroll-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ControlFormStyles from './../controls/TheControlFormStyles'
import ControlBox from '../controls/TheControlBox'
import IndicatorPlatform from '../IndicatorPlatform'

export default {
  name: 'ThePanelForm',

  props: {
    builder: {
      type: Object,
      required: true
    }
  },

  components: {
    IndicatorPlatform,
    ControlFormStyles,
    ControlBox
  },

  computed: {
    ...mapState('Sidebar', [
      'settingObjectLabel',
      'isMobile'
    ])
  }
}
</script>
