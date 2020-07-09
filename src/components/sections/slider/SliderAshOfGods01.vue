<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

import { mapActions } from 'vuex'

import Swiper from 'swiper'
import swiperOptions from '@editor/swiper'
import { randomPoneId } from '../../../editor/util'

const GROUP_NAME = 'Slider'
const NAME = 'SliderAshOfGods01'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/e4324a1b-1a2f-496f-a236-b4605ff6501a.jpg'
const DESCRIPTION = 'Fullscreen images slider'

let [
  C_CUSTOM_COLUMN,
  C_CUSTOM_COLUMN1,
  C_CUSTOM_COLUMN2,
  C_CUSTOM_COLUMN3,
  C_CUSTOM_COLUMN4,
  C_CUSTOM_COLUMN5
] = Array.from(new Array(6), (x, i) => {
  return []
})

const C_CUSTOM_CONTAINER = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/8e8ad3c6-1236-45d5-9112-a4d34ef6b9a7.jpg)',
    'background-size': 'cover',
    'padding-top': '32px',
    'padding-bottom': '64px'
  },
  media: {
    'is-mobile': {
      'padding-top': '32px',
      'padding-bottom': '64px'
    }
  }
}

const C_CUSTOM_CONTAINER2 = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/93567b8e-9e30-4b10-8764-57859a61a8b6.jpg)',
    'background-size': 'cover',
    'padding-top': '32px',
    'padding-bottom': '64px'
  },
  media: {
    'is-mobile': {
      'padding-top': '32px',
      'padding-bottom': '64px'
    }
  }
}

const C_CUSTOM_CONTAINER3 = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/8963f9a3-b1b8-40e2-9828-aa0e5308ee5a.jpg)',
    'background-size': 'cover',
    'padding-top': '32px',
    'padding-bottom': '64px'
  },
  media: {
    'is-mobile': {
      'padding-top': '32px',
      'padding-bottom': '64px'
    }
  }
}

const C_CUSTOM_CONTAINER4 = {
  styles: {
    'background-color': '#000000',
    'background-image': 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/23746b25-6b5e-4edf-b9e6-8793323fc75f.jpg)',
    'background-size': 'cover',
    'padding-top': '32px',
    'padding-bottom': '64px'
  },
  media: {
    'is-mobile': {
      'padding-top': '32px',
      'padding-bottom': '64px'
    }
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'height': '100vh'
    },
    swiper: {
      autoHeight: true,
      pagination: { el: swiperOptions.pagination },
      navigation: {
        nextEl: swiperOptions.next,
        prevEl: swiperOptions.prev
      },
      frameWidth: 12,
      paginationColor: '#AF2E12',
      navColor: '#AF2E12'
    },
    count: 4
  },
  container1: _.merge({}, C_CUSTOM_CONTAINER),
  container2: _.merge({}, C_CUSTOM_CONTAINER2),
  container3: _.merge({}, C_CUSTOM_CONTAINER3),
  container4: _.merge({}, C_CUSTOM_CONTAINER4),
  container5: _.merge({}, C_CUSTOM_CONTAINER2),
  container6: _.merge({}, C_CUSTOM_CONTAINER3),
  components1: _.merge({}, C_CUSTOM_COLUMN),
  components2: _.merge({}, C_CUSTOM_COLUMN1),
  components3: _.merge({}, C_CUSTOM_COLUMN2),
  components4: _.merge({}, C_CUSTOM_COLUMN3),
  components5: _.merge({}, C_CUSTOM_COLUMN4),
  components6: _.merge({}, C_CUSTOM_COLUMN5),
  edited: true
}

const COMPONENTS = []

export default {
  name: NAME,

  group: GROUP_NAME,

  description: DESCRIPTION,

  mixins: [defaults, sectionMedia],

  inject: ['device', 'isExpanded'],

  cover: COVER,

  data () {
    return {
      options: '',
      swiper: {},
      paginationClass: ''
    }
  },

  $schema: {
    mainStyle: types.BannerSection,
    container1: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    container4: types.StyleObject,
    container5: types.StyleObject,
    container6: types.StyleObject,
    components1: _.merge([], COMPONENTS),
    components2: _.merge([], COMPONENTS),
    components3: _.merge([], COMPONENTS),
    components4: _.merge([], COMPONENTS),
    components5: _.merge([], COMPONENTS),
    components6: _.merge([], COMPONENTS)
  },

  watch: {
    '$sectionData.mainStyle.swiper': {
      handler () {
        this.options = JSON.stringify(this.$sectionData.mainStyle.swiper)
      },
      deep: true
    },

    'device.type': {
      handler (value) {
        setTimeout(() => {
          this.swiper.update()
        }, 250)
      }
    },

    'isExpanded.status': {
      handler (value) {
        setTimeout(() => {
          this.swiper.update()
        }, 250)
      }
    }
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }

    this.options = JSON.stringify(this.$sectionData.mainStyle.swiper)

    this.paginationClass = `custom-bullets-${randomPoneId()}`
  },

  mounted () {
    this.$nextTick(function () {
      let self = this
      this.swiper = new Swiper(this.$refs.swiper, {
        loop: false,
        touchStartPreventDefault: false,
        navigation: {
          nextEl: this.$refs.next,
          prevEl: this.$refs.prev
        },
        pagination: {
          el: this.$refs.pagination,
          clickable: true
        },
        on: {
          slideChange: function () {
            self.setControlPanel(false)
          }
        }
      })
    })
  },

  methods: {
    ...mapActions('Sidebar', [
      'setControlPanel'
    ])
  }
}
</script>

<template>
  <section
    class="b-top b-section-slider"
    :class="[$sectionData.mainStyle.classes, device.type]"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div
      ref="swiper"
      :data-options="options"
      class="swiper-container b-gallery-carousel-body is-editable">

      <div class="swiper-wrapper b-gallery-carousel-body__items">
        <div
          v-for="(column, key) in $sectionData"
          v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) <= $sectionData.mainStyle.count"
          :key="`slide-${key}-${_uid}`"
          :class="{ 'swiper-slide-active': key === 'components1' }"
          class="swiper-slide b-gallery-carousel-body-item">

          <div class="slide-number">{{ key.slice(-1) }}</div>

          <div class="swiper-slide-item b-top__slide">
            <sandbox
              class="b-sandbox"
              :container-path="`$sectionData.container${key.split('components')[1]}`"
              :components-path="`$sectionData.components${key.split('components')[1]}`"
              :style="`$sectionData.container${key.split('components')[1]}.styles`">
              <draggable
                v-model="$sectionData[key]"
                class="b-draggable-slot"
                :style="$sectionData[`container${key.split('components')[1]}`].styles"
                @start="$_drag(`components${key.split('components')[1]}`)" @change="$_dragStop"
                >
                <div :class="`b-draggable-slot__${component.type}`"
                     v-for="(component, index) in $sectionData[key]"
                     v-if="$sectionData[key].length !== 0"
                     :key="index">
                  <component
                    class=""
                    v-styler:for="{
                      el: $sectionData[`${key}`][index].element,
                      path: `$sectionData.${key}[${index}].element`,
                      type: $sectionData[key][index].type,
                      label: $sectionData[`${key}`][index].label }"
                    :is="component.name"
                    :href="$sectionData[key][index].element.link.href"
                    :target="$sectionData[key][index].element.link.target"
                    :path="`${key}[${index}].element`"
                    :style="$sectionData[key][index].element.styles"
                    :class="[$sectionData[key][index].element.classes, $sectionData[key][index].class]">
                    <div v-html="$sectionData[key][index].element.text"></div>
                  </component>
                </div>
              </draggable>
            </sandbox>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div
        ref="next"
        :style="{'color': $sectionData.mainStyle.swiper.navColor }"
        v-show="$sectionData.mainStyle.count > 1 && $sectionData.mainStyle.swiper.showNavigation"
        class="swiper-button-next">
        <icon-base name="galleryArrowRight" height="50"></icon-base>
      </div>
      <div
        ref="prev"
        :style="{'color': $sectionData.mainStyle.swiper.navColor }"
        v-show="$sectionData.mainStyle.count > 1 && $sectionData.mainStyle.swiper.showNavigation"
        class="swiper-button-prev">
        <icon-base name="galleryArrowLeft" height="50"></icon-base>
      </div>

      <!-- Pagination -->
      <v-style>
        .{{paginationClass}} span {
        background-color: {{$sectionData.mainStyle.swiper.paginationColor}};
        width: {{$sectionData.mainStyle.swiper.navSize}};
        height: {{$sectionData.mainStyle.swiper.navSize}};
        }
      </v-style>

      <div
        ref="pagination"
        :class="paginationClass"
        v-show="$sectionData.mainStyle.count > 1 && $sectionData.mainStyle.swiper.showPagination"
        class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
          <span
            v-for="(_, index) in $sectionData.mainStyle.count"
            :key="`bullet-${index}-${_uid}`">
              <span
                :class="{ 'swiper-pagination-bullet-inactive': index !== 0 }"
                :aria-label="`Go to slide ${index + 1}`"
                class="swiper-pagination-bullet"
                tabindex="0"
                role="button">
              </span>
          </span>
      </div>

    </div>
  </section>
</template>

<style lang="sass" scoped>
.slide-number
  display: block
  position: absolute
  top: 2rem
  right: 4rem
  z-index: 3

  font-size: 5rem
  font-weight: bold
  color: rgba($white, .5)
</style>
