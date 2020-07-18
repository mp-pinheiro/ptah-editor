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
            :style="{'color': $sectionData.mainStyle.swiper.navColor }"
            v-show="$sectionData.mainStyle.galleryImages.length > 1 && $sectionData.mainStyle.swiper.showNavigation"
            class="swiper-button-next">
            <icon-base name="galleryArrowRight" height="50"></icon-base>
          </div>
          <div
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

<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

import 'swiper/dist/css/swiper.min.css'
import swiperOptions from '@editor/swiper'

import { randomPoneId } from '../../../editor/util'

const GROUP_NAME = 'Galleries'
const NAME = 'Carousel'

const C_IMAGES = [
  {
    name: '1.jpg',
    path: 'https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/92ffca95-fb34-4e53-acf7-17bc0b58dda8.jpg'
  },
  {
    name: '2.jpg',
    path: 'https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/9851f16e-02d7-418b-8af2-5497e153f536.jpg'
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    swiper: {
      autoHeight: true,
      pagination: { el: swiperOptions.pagination },
      navigation: {
        nextEl: swiperOptions.next,
        prevEl: swiperOptions.prev
      },
      frameWidth: 12,
      paginationColor: '#F4BC64',
      navColor: '#F4BC64'
    },
    galleryImages: C_IMAGES
  },
  container: {},
  edited: true
}

export default {
  name: NAME,
  group: GROUP_NAME,

  description: 'Fullscreen sliding gallery',

  mixins: [defaults, sectionMedia],

  cover: 'https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/7bec5bb3-e4e8-41d6-af24-04de9ccccada.jpg',

  $schema: {
    mainStyle: types.GallerySlider
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
    }
  },

  methods: {

  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, SCHEMA_CUSTOM))
    }

    this.paginationClass = `custom-bullets-${randomPoneId()}`

    this.options = JSON.stringify(this.$sectionData.mainStyle.swiper)
  }
}
</script>

<style lang="sass" scoped>
.swiper-pagination-bullet
  opacity: 1
  &-inactive
    opacity: .35 !important
    background: black !important
</style>
