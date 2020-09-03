<template>
  <div class="b-base-upload">
    <base-loading
      v-if="loading"
      class="b-base-upload__loading"
    />

    <base-label class="b-base-upload__label" v-if="label">
      {{label}}
    </base-label>

    <form class="b-base-upload__inner" :class="{ 'b-base-upload__inner--focus': focus }">
      <input
        type="text"
        v-model="url"
        @focus="$emit('focus', $event), focus = true"
        @blur="$emit('blur', $event), focus = false"
        :placeholder="placeholder"
      >

      <input
        style="display: none;"
        type="file"
        :accept="accept"
        ref="uploadInput"
        @change="onUploadClick"
      />

      <a class="b-base-upload__button" @click.prevent="upload">
        <icon-base
          name="downloadCloud"
          width="24"
          color="#436FEE"
          title="Upload"
        />
      </a>

      <div
        v-if="error !== false && error.statusText !== ''"
        class="b-base-upload__error"
      >
        {{ error.statusText }}
      </div>
    </form>

    <ImagesLibrary
      :type="type"
      :accept="accept"
      v-if="isShowImageLibrary && isShow"
      @close="closeImageGallery"
      @select="selectedImageInGallery"
      :src="url"
    />
  </div>
</template>

<script>
import api from '@store/api'
import ImagesLibrary from '../../editor/components/modals/TheImagesLibrary'
import { ERRORS, VALID_TYPES } from '@editor/util'
import { mapActions, mapState } from 'vuex'

export default {
  model: {
    prop: 'value',
    event: 'upload'
  },

  components: {
    ImagesLibrary
  },

  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
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

  watch: {
    value (value) {
      this.url = value
    },
    url (value) {
      this.$emit('upload', value)
    }
  },

  data () {
    return {
      url: this.value,
      focus: false,
      loading: false,
      error: false,
      isShow: false
    }
  },

  computed: {
    ...mapState('Sidebar', ['isShowImageLibrary'])
  },

  methods: {
    ...mapActions('Sidebar', ['toggleShowImageLibrary']),

    onUploadClick (event) {
      this.loading = true
      this.error = false

      this.uploadFile(event)
        .then((response) => {
          this.url = response.data.cdnUrl
        })
        .catch((xhr) => {
          let response = xhr.response.data
          this.error = {
            status: response.error.code,
            statusText: ERRORS[response.error.message] || ''
          }
          setTimeout(() => {
            this.error = false
          }, 2000)
        })
        .finally(() => { this.loading = false })
    },

    upload () {
      // this.$refs.uploadInput.click()
      this.isShow = true
      this.toggleShowImageLibrary(true)
    },

    uploadFile (event) {
      return api.uploadFileFromInputFile(event)
    },

    selectedImageInGallery (value) {
      this.src = value
      this.$emit('upload', value)
      this.closeImageGallery()
    },

    closeImageGallery () {
      this.isShow = false
      this.toggleShowImageLibrary(false)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_variables.sass'
.b-base-upload
  width: 100%
  position: relative
  &__loading
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(255,255,255, .5)
  &__label
    margin-bottom: 0.8rem
  &__inner
    display: flex
    justify-content: space-between
    align-items: center
    border: 1px solid #A2A5A5
    box-sizing: border-box
    border-radius: 5px
    height: 3.4rem
    padding: .5rem .9rem .5rem 1.3rem

    svg
      fill: #A2A5A5

    &--focus
      border: 2px solid $main-green
      padding: .5rem .8rem .5rem 1.2rem

      input
        outline: none

      svg
        fill: $main-green

  input[type="text"]
    background: transparent
    border: none
    color: #272727
    font-size: 1.2rem
    width: 90%
    &::placeholder
      color: #CDCDCD
  &__button
    height: 16px
    cursor: pointer
    text-decoration: none

  &__error
    position: absolute
    top: 90%
    font-size: 1rem
    line-height: 1.4rem
    margin-top: .5rem
    color: #D36083
</style>
