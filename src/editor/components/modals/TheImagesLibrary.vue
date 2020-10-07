<template>
  <div class="b-images-library-overlay">
    <div class="b-images-library">
      <div class="b-images-library__close" @click.prevent="$emit('close')">
        <IconBase
          name="close"
          width="14"
          height="14"
          color="#575A5F"
        />
      </div>

      <header>
        <h1>{{ title }}</h1>

        <div class="b-images-library__tabs"
          v-if="type === 'image'"
        >
          <base-switch-tabs
            :list="tabs"
            v-model="activeTab"
            color="#00ADB6"
          />
        </div>
      </header>

      <div class="b-images-library__loading" v-if="loading">
        <base-loading />
      </div>

      <MyMedia
        v-if="!loading && activeTab === 'my'"
        :src="src"
        :selected="selected"
        :list="list"
        :type="type"
        @select="select"
        @preview="preview"
        @add="addFile"
      />

      <StockMedia
        v-if="!loading && activeTab === 'stock'"
        :src="src"
        :selected="selected"
        :list="list"
        :type="type"
        @select="select"
        @preview="preview"
        @add="addFile"
      />

      <footer v-if="!loading">
        <div class="b-images-library-footer">
          <div class="b-images-library-footer__limit">
            <div class="b-images-library-footer__limit-line" v-if="activeTab === 'my'">
              <div class="b-line-limit">
                <span
                  class="b-line-limit__line"
                  :class="[
                    { '_yellow' : widthLimit > 50 },
                    { '_red' : widthLimit > 80 }
                  ]"
                  :style="{ 'width': widthLimit + '%' }"
                />
                <span class="b-line-limit__total">
                  <span :class="[
                    { '_yellow' : widthLimit > 50 },
                    { '_red' : widthLimit > 80 }
                  ]">{{ totalSize }}Mb</span> / {{ total }}Mb
                </span>
              </div>
              <!--div
                class="b-line-text"
                :class="[
                  { '_yellow' : widthLimit > 50 },
                  { '_red' : widthLimit > 80 }
                ]"
              >
                <span>Upgrade</span> plan to upload your media without limits
              </div-->
            </div>
          </div>
          <div class="b-images-library-footer__btn">
            <base-button
              @click="apply"
              class="b-publication__button"
              size="small"
              color="main-green">
              Apply
            </base-button>
          </div>
        </div>
      </footer>

      <Preview
        v-if="isShowPreview"
        @close="isShowPreview = false"
        @select="select"
        :previewItem="previewItem"
        :list="list"
        :type="type"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Preview from './TheImagesLibraryPreview'
import MyMedia from './TheImageLibraryMyMedia'
import StockMedia from './TheImageLibraryStockMedia'
import { VALID_TYPES } from '@editor/util'

const TITLES = {
  'image': 'Select an image',
  'video': 'Select a video',
  'pdf': 'Select a pdf file'
}

export default {
  name: 'TheImagesLibrary',
  components: {
    Preview,
    MyMedia,
    StockMedia
  },
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
      list: [],
      widthLimit: 0,
      selected: null,
      isShowPreview: false,
      previewItem: null,
      total: null,
      totalSize: null,
      tabs: [
        { value: 'my', text: 'My Media' },
        { value: 'stock', text: 'Free Stock' }
      ],
      activeTab: 'my'
    }
  },

  computed: {
    ...mapState('User', ['library']),

    title () {
      return TITLES[this.type]
    }
  },

  mounted () {
    this.upload()
    this.selected = this.src
  },

  methods: {
    ...mapActions('User', ['getUploads']),

    upload () {
      this.loading = true

      this.getUploads()
        .then(() => {
          this.list = this.library.uploads.filter(item => {
            return item.mimeType.indexOf(this.type) !== -1
          })
          this.widthLimit = this.setWidthLimit()
          this.setTotal()
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          console.warn(err)
        })
    },

    select (url) {
      this.selected = url
    },

    setWidthLimit () {
      let oneTime = ((this.library.totalSize + this.library.quoteRest) / 100).toFixed(2)

      return 100 - (this.library.quoteRest / oneTime)
    },

    setTotal () {
      this.totalSize = (this.library.totalSize / 1048576).toFixed(2)
      this.total = ((this.library.quoteRest + this.library.totalSize) / 1048576)
    },

    addFile (file) {
      this.selected = file.path
      this.upload()
    },

    apply () {
      this.$emit('select', this.selected)
    },

    preview (item) {
      this.previewItem = item
      this.isShowPreview = true
    }
  }
}
</script>

<style lang="sass" scoped>
.b-images-library-overlay
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 9999999
  display: flex
  align-items: center
  justify-content: center

  background: rgba(#000, 0.6)

.b-images-library
  width: 92.5rem
  height: 60rem
  padding: 2.8rem 3rem 2.8rem
  position: relative

  margin-top: -9rem

  background: #ffffff
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 3px 4px rgba(0, 0, 0, 0.12), 0 1px 5px rgba(0, 0, 0, 0.2)
  border-radius: 1rem

  text-align: center

  header
    margin: 0 0 2rem
    padding: 0

  h1
    font-weight: 600
    font-size: 1.3rem
    line-height: 1.8rem
    letter-spacing: 0.065em
    color: #575A5F !important
    text-transform: uppercase

  &__tabs
    width: 31.5rem
    margin: 2.6rem auto 0

  &__close
    position: absolute
    top: 1.7rem
    right: 1.7rem
    z-index: 1

    cursor: pointer

    width: 3.6rem
    height: 3.6rem

    display: flex
    justify-content: center
    align-items: center

    border-radius: 100%
    transition: background .3s cubic-bezier(.2,.85,.4,1.275)
    & svg
      transition: fill .3s cubic-bezier(.2,.85,.4,1.275)
    &:hover
      cursor: pointer
      background: rgba(#000000, 0.05)
    &:active
      cursor: pointer
      background: rgba(#00ADB6, 0.05)
      & svg
        fill: $main-green

  &__container
    position: absolute
    top: 14rem
    right: 1rem
    bottom: 8rem
    left: 3rem
    &-scroll
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0

.b-uploads-list
  width: 100%
  height: auto
  display: flex
  flex-wrap: wrap
  padding: 0 0 10rem
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
    background-size: 100% auto
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
      top: 0
      right: 0
      bottom: 0
      left: 0
      opacity: 0
      transition: all .2s ease-out

      .control
        cursor: pointer
        margin: 0 .75rem
        opacity: .6
        &:hover
          opacity: 1

    &._no-border #{$this}-controls
      display: none
.b-images-library-footer
  position: absolute
  bottom: 0
  right: 0
  left: 0
  height: 5.8rem
  background-color: #F3F6F6
  border-radius: 0 0 .5rem .5rem

  display: flex
  justify-content: space-between
  align-items: center

  padding: 1.6rem 3rem 1.6rem 5.8rem
  &__limit
    display: flex
    flex-direction: column
    justify-content: space-between
    &-line
      display: flex
      flex-direction: column
      align-items: flex-start
      max-width: 34rem

.b-line-limit
  width: 34rem
  height: .6rem
  margin-bottom: .8rem
  background-color: #ffffff
  border-radius: 2.5rem
  position: relative
  &__total
    position: absolute
    top: -.2rem
    left: 102%
    font-size: 1rem
    white-space: nowrap
    span
      &._yellow
        color: #FFE600
      &._red
        color: #D36083
  &__line
    position: absolute
    left: 0
    top: 0
    bottom: 0
    background: #00ADB6
    border-radius: 2.5rem
    &._yellow
      background: #FFE600
    &._red
      background: #D36083

.b-line-text
  font-size: 1rem
  line-height: 1.2rem
  & span
    color: #00ADB6
  &._yellow span
    color: #FFE600
  &._red span
    color: #D36083
</style>
