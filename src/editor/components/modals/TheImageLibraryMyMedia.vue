<template>
  <div class="b-images-library-my-media">
    <div class="b-images-library-my-media__container">
        <div class="b-images-library-my-media__container-scroll">
          <base-scroll-container>
            <div class="b-uploads-list">
              <div class="b-uploads-list__item _no-border">
                <base-uploader-simple
                  :src="src"
                  :type="type"
                  @add="addFile"
                  :accept="accept"
                />
              </div>
              <div
                class="b-uploads-list__item"
                v-for="(item, index) in list" :key="index"
                :style="{ 'background-image': item.type === 'image' ? `url(${item.url})` : 'none' }"
                :class="{ '_active': selected === item.url }"
              >
                <template v-if="item.type !== 'image'">
                  <span class="b-uploads-list__item-name">
                    {{ item.originalFilename }}
                  </span>
                </template>
                <template v-if="selected === item.url">
                  <span
                    class="b-uploads-list__item-icon-check"
                    @click.stop="select(item.url)"
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
                    @click.stop="select(item.url)"
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
                    <div
                      class="control"
                      @click.stop="select(item.url)"
                    >
                      <icon-base
                        name="select"
                        width="30"
                        height="30"
                      />
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
                    <!--div class="control" @click="">
                      <icon-base name="deleteCircle" width="30" height="30"/>
                    </div-->
                  </div>
                </template>
              </div>
            </div>
          </base-scroll-container>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { VALID_TYPES } from '@editor/util'

export default {
  name: 'TheImagesLibraryMyMedia',

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
    },
    selected: String,
    list: Array
  },

  computed: {
    ...mapState('User', ['library'])
  },

  methods: {
    ...mapActions('User', ['getUploads']),

    select (url) {
      if (url !== this.selected) {
        this.selected = url
      } else {
        this.selected = ''
      }

      this.$emit('select', this.selected)
    },

    preview (item) {
      this.$emit('preview', item)
    },

    addFile (file) {
      this.$emit('add', file.path)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-images-library-my-media
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
</style>
