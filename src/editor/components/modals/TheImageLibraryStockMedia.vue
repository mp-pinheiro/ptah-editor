<template>
  <div class="b-images-library-stock-media">
    <div class="b-images-library-stock-media__container">
      <div class="b-images-library-stock-media__search">
        <div>
          <base-text-field
            class="b-search-input"
            placeholder="Search in free stock"
            v-model="search"
            @input="searchItems"
          />
        </div>
        <div class="b-select">
          <base-select
            v-model="color"
            :options="colorList"
            @input="searchItems"
          />
        </div>
        <div class="b-select">
          <base-select
            v-model="orientation"
            :options="orientationList"
            @input="searchItems"
          />
        </div>
        <div class="b-images-library-stock-media__paginator">
          <div @click="prev">
            <icon-base
              :class="{'_active': page !== 1}"
              name="galleryArrowLeft"
            />
          </div>
          <div>{{ (page - 1) * step }}–{{ page * step }}</div>
          <div @click="next">
            <icon-base
              :class="{'_active': page !== totalPages}"
              name="galleryArrowRight"
            />
          </div>
          <div> of {{ total }}</div>
        </div>
      </div>
        <div class="b-images-library-stock-media__loading" v-if="loading">
          <base-loading />
        </div>
        <div class="b-images-library-stock-media__container-scroll" v-if="!loading">
          <base-scroll-container v-if="list.length > 0">
            <div class="b-uploads-list">
              <div
                class="b-uploads-list__item"
                v-for="(item, index) in list" :key="index"
                :style="{ 'background-image': item.urls.thumb ? `url(${item.urls.thumb})` : 'none' }"
                :class="{ '_active': checkSelected(item) }"
              >
                <template v-if="checkSelected(item)">
                  <span
                    class="b-uploads-list__item-icon-check"
                    @click.stop="select(item)"
                  >
                    <IconBase
                      name="checkMark"
                      color="#00ADB6"
                      width="24"
                      height="17"
                    />
                  </span>
                  <span
                    class="b-uploads-list__item-icon-close"
                    @click.stop="select(item)"
                  >
                    <IconBase
                      name="close"
                      color="#00ADB6"
                      width="24"
                      height="17"
                    />
                  </span>
                </template>

                <template v-else>
                  <div
                    class="b-uploads-list__item-controls"
                  >
                    <div class="b-controls">
                      <div
                        v-for="(size, key) in item.urls" :key="key"
                        v-if="key !== 'full' && key !== 'raw'"
                        class="control control_column"
                        @click.stop="select(size)"
                      >
                        {{ checkWidthByKey(key) }}
                      </div>
                    </div>
                    <div
                      class="control"
                      @click.stop="preview(item)"
                    >
                      <icon-base
                        name="previewTemplate"
                        width="30"
                        height="30"
                      />
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </base-scroll-container>
          <div v-else>
            Can’t find any images
          </div>
        </div>
      </div>

    <Preview
      v-if="isShowPreview"
      @close="isShowPreview = false"
      @select="select"
      :previewItem="previewItem"
      :list="list"
      :type="type"
      :stock="true"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { VALID_TYPES } from '@editor/util'
import { throttle } from 'lodash-es'
import Unsplash, { toJson } from 'unsplash-js'
import Preview from './TheImagesLibraryPreview'

const unsplash = new Unsplash({
  accessKey: process.env.VUE_APP_UNSPLASH_ACCESS_KEY
})

const COLOR_LIST = [
  { value: '', name: 'all' },
  { value: 'black_and_white', name: 'black & white' },
  { value: 'black', name: 'black' },
  { value: 'white', name: 'white' },
  { value: 'yellow', name: 'yellow' },
  { value: 'orange', name: 'orange' },
  { value: 'red', name: 'red' },
  { value: 'purple', name: 'purple' },
  { value: 'magenta', name: 'magenta' },
  { value: 'green', name: 'green' },
  { value: 'teal', name: 'teal' },
  { value: 'blue', name: 'blue' }
]
const ORIENTATION_LIST = [
  { value: 'landscape', name: 'landscape' },
  { value: 'portrait', name: 'portrait' },
  { value: 'squarish', name: 'squarish' }
]

export default {
  name: 'TheImagesLibraryStockMedia',
  components: { Preview },
  props: {
    src: String,
    type: {
      type: String,
      default: VALID_TYPES[0],
      validator: value => VALID_TYPES.includes(value)
    },
    accept: {
      type: String,
      default: 'image/*'
    }
  },

  data () {
    return {
      loading: false,
      isShowPreview: false,
      list: [],
      page: 1,
      selected: '',
      search: 'game',
      orientation: { value: 'landscape', name: 'landscape' },
      orientationList: ORIENTATION_LIST,
      color: { value: '', name: 'all' },
      colorList: COLOR_LIST,
      isChange: false,
      delay: 1000,
      previewItem: {},
      step: 30,
      total: 0,
      totalPages: 0
    }
  },

  computed: {
    ...mapState('User', ['library']),
    ...mapState('Sidebar', ['stock'])
  },

  mounted () {
    this.search = this.stock.search
    this.color = COLOR_LIST.find(color => color.value === this.stock.color)
    this.orientation = ORIENTATION_LIST.find(type => type.value === this.stock.orientation)

    this.upload()
  },

  methods: {
    ...mapActions('User', ['getUploads']),
    ...mapActions('Sidebar', ['setStock']),

    upload () {
      this.loading = true

      unsplash.search.photos(this.search, this.page, this.step, {
        orientation: this.orientation.value,
        color: this.color.value
      })
        .then(toJson)
        .then(json => {
          this.loading = false
          this.list = json.results
          this.total = json.total
          this.totalPages = json.totalPages
        })
        .catch(() => {
          this.loading = false
        })
    },

    searchItems: throttle(function () {
      this.list = []

      this.$nextTick(() => {
        this.setStock({
          search: this.search,
          color: this.color.value,
          orientation: this.orientation.value
        })

        this.upload()

        this.page = 1
      })
    }, 1000),

    select (url) {
      if (url !== this.selected) {
        this.selected = url
      } else {
        this.selected = {}
      }

      this.$emit('select', this.selected)
    },

    preview (item) {
      this.previewItem = item
      this.isShowPreview = true
    },

    addFile (file) {
      this.$emit('add', file.path)
    },

    checkSelected (item) {
      const selectedArr = this.selected !== '' ? this.selected.split('?') : ['']
      const itemArr = item.urls.thumb.split('?')

      if (selectedArr[0] === itemArr[0]) {
        return true
      }

      return false
    },

    checkWidthByKey (key) {
      if (key === 'regular') {
        return '1080px'
      } else if (key === 'small') {
        return '400px'
      } else {
        return '200px'
      }
    },

    prev () {
      if (this.page !== 1) {
        this.page--
        this.upload()
      }
    },

    next () {
      if (this.page !== this.totalPages) {
        this.page++
        this.upload()
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.b-images-library-stock-media
  &__loading
    margin: 2rem
  &__search
    display: flex
    justify-content: center
  &__paginator
    display: flex
    align-items: center
    padding: 0 1rem
    font-size: 1.2rem
    & svg
      position: relative
      top: 1px
      width: 1.8rem
      padding: 0 .4rem
      fill: #A2A5A5
      &._active
        fill: #00ADB6
        cursor: pointer

  &__container
    position: absolute
    top: 12rem
    right: 1rem
    bottom: 8rem
    left: 3rem

    background-color: #fff
    &-scroll
      position: absolute
      top: 6rem
      right: 0
      bottom: 0
      left: 0

.b-uploads-list
  width: 100%
  height: auto
  display: flex
  flex-wrap: wrap
  padding: 0 0 2rem
  &__item
    $this: &
    display: flex
    justify-content: center
    align-items: center

    border-radius: .5rem
    width: 15rem
    height: 12.3rem
    margin: 0 2.7rem 2.7rem 0

    border: 1px dashed #A2A5A5
    background-size: cover
    background-repeat: no-repeat
    background-position: center
    position: relative
    &._no-border
      border: none
      cursor: pointer
      &:hover
        border: none
    &._active
      border: 2px solid #00ADB6
      &:after
        content: ""
        position: absolute
        top: 0
        right: 0
        bottom: 0
        left: 0
        z-index: 1
        background: rgba(0, 173, 182, 0.2)
        border-radius: .5rem
        transition: all 200ms
    &:hover
      border: 2px solid #00ADB6

    &:hover #{$this}-controls
      opacity: 1

    &-icon-close
      display: none
      cursor: pointer
      position: relative
      z-index: 2
    &-name
      font-size: 1.2rem
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      padding: 2rem
      overflow: hidden
      word-break: break-word

      display: flex
      align-items: center
      justify-content: center

    &:hover .b-uploads-list__item-icon-check
      display: none

    &:hover .b-uploads-list__item-icon-close
      display: block

    &-controls
      display: flex
      justify-content: center
      align-items: center

      background: rgba($dark-grey, .9)
      border-radius: .3rem

      position: absolute
      top: -1px
      right: -1px
      bottom: -1px
      left: -1px
      opacity: 0
      transition: all .2s ease-out

      .control
        cursor: pointer
        margin: 0 .75rem
        opacity: .6
        display: flex
        align-items: center
        &_column
          opacity: .8
          font-size: 1.2rem
          color: #fff
          & svg
            opacity: .5
            margin-left: .3rem
          &:hover
            svg
              opacity: 1
        &:hover
          opacity: 1

    &._no-border #{$this}-controls
      display: none

.b-controls
  display: flex
  flex-direction: column

  & .control
    width: 100%
    display: flex
    justify-content: space-between
    margin: .4rem

.b-search-input
  /deep/
    & input
      padding-left: 3.6rem
      background: url("https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/b01c391b-3cd1-4e5f-995c-0ee270376479.png") no-repeat 1rem center

.b-select
  text-align: left
  width: 20rem
  margin-left: 1rem
</style>
