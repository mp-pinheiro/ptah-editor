<script>
import Swiper from 'swiper'
import { mapActions } from 'vuex'
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

import 'swiper/dist/css/swiper.min.css'
import swiperOptions from '@editor/swiper'

import { randomPoneId } from '../../../editor/util'

const GROUP_NAME = 'Galleries'
const NAME = 'CarouselAshOfGods01'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/d5b944d2-6c49-4259-8e6d-b67c85c53d40.jpg'
const DESCRIPTION = 'Fullscreen sliding gallery'

const C_IMAGES = [
  {
    name: 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/03c8b3e6-ac5c-4551-a1a9-0c637b28aa99.jpg',
    path: 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/03c8b3e6-ac5c-4551-a1a9-0c637b28aa99.jpg'
  },
  {
    name: 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/dc84c267-2632-45bc-a267-9b7c590c8f53.jpg',
    path: 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/dc84c267-2632-45bc-a267-9b7c590c8f53.jpg'
  },
  {
    name: 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/7eafde86-4ba6-4e2f-8f25-a3d9fd9f97cb.jpg',
    path: 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/7eafde86-4ba6-4e2f-8f25-a3d9fd9f97cb.jpg'
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'height': '100vh',
      'padding-bottom': '100px'
    },
    swiper: {
      autoHeight: true,
      pagination: { el: swiperOptions.pagination },
      navigation: {
        nextEl: swiperOptions.next,
        prevEl: swiperOptions.prev
      },
      frameWidth: 12,
      paginationColor: '#ECD19A',
      navColor: '#ECD19A',
      navSize: '12px'
    },
    galleryImages: C_IMAGES
  },
  container: {},
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: DESCRIPTION,

  mixins: [defaults, sectionMedia],

  cover: COVER,

  $schema: {
    mainStyle: types.GallerySlider,
    container: types.StyleObject
  },

  inject: ['device'],

  data () {
    return {
      container: null,
      options: '',
      paginationClass: ''
    }
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

  methods: {
    ...mapActions('Sidebar', [
      'setControlPanel'
    ])
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, SCHEMA_CUSTOM))
    }

    this.paginationClass = `custom-bullets-${randomPoneId()}`
    this.options = JSON.stringify(this.$sectionData.mainStyle.swiper)
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
  }
}
</script>

<template>
  <section
    v-styler:section="$sectionData.mainStyle"
    :class="[$sectionData.mainStyle.classes, device.type]"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    class="b-gallery-carousel">

    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <!-- TODO: need drag&drop here -->
      <div class="b-grid__row" v-if="$sectionData.mainStyle.galleryImages.length < 1">
        <div class="b-empty-carousel">
          Add image in the settings section
        </div>
      </div>
      <div class="b-grid__row">
        <div :class="`b-grid__col-${$sectionData.mainStyle.swiper.frameWidth}`">
          <div
            ref="swiper"
            :data-options="options"
            class="swiper-container b-gallery-carousel-body">

            <div class="swiper-wrapper b-gallery-carousel-body__items">
              <div
                v-for="(item, index) in $sectionData.mainStyle.galleryImages"
                :key="`slide-${index}-${_uid}`"
                :class="{ 'swiper-slide-active': index === 0 }"
                class="swiper-slide b-gallery-carousel-body-item">
                <!--<div :style="`background-image:url(${item.path})`" class="swiper-slide-item"></div>-->
                <img :src="item.path" class="swiper-slide-image" alt="">
              </div>
            </div>

            <!-- Navigation -->
            <div
              ref="next"
              :style="{'color': $sectionData.mainStyle.swiper.navColor }"
              v-show="$sectionData.mainStyle.galleryImages.length > 1 && $sectionData.mainStyle.swiper.showNavigation"
              class="swiper-button-next">
              <icon-base name="galleryArrowRight" height="50"></icon-base>
            </div>
            <div
              ref="prev"
              :style="{'color': $sectionData.mainStyle.swiper.navColor }"
              v-show="$sectionData.mainStyle.galleryImages.length > 1 && $sectionData.mainStyle.swiper.showNavigation"
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
              v-show="$sectionData.mainStyle.galleryImages.length > 1 && $sectionData.mainStyle.swiper.showPagination"
              class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
            <span
              v-for="(_, index) in $sectionData.mainStyle.galleryImages"
              :key="`bullet-${index}-${_uid}`"
              :class="{ 'swiper-pagination-bullet-inactive': index !== 0 }"
              :aria-label="`Go to slide ${index + 1}`"
              class="swiper-pagination-bullet"
              tabindex="0"
              role="button">
            </span>
            </div>

          </div>
        </div>
      </div><!-- /_b-row -->
    </div><!-- /_b-grid -->

  </section>
</template>

<style lang="sass" scoped>
  .swiper-pagination-bullet
    opacity: 1
    &-inactive
      opacity: .35 !important
      background: black !important
</style>
