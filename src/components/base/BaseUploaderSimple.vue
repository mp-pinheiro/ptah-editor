<template>
  <figure class="b-uploader-simple">

    <div class="b-uploader-simple__el" @click="onClick">
      <radial-progress-bar
        v-show="progress !== 100"
        :diameter="16"
        :completed-steps="progress"
        :total-steps="totalSteps"
        :strokeWidth="2"
        :startColor="`#55D287`"
        :stopColor="`#00ADB6`"
        :innerStrokeColor="`#E4E4E4`"
      >
      </radial-progress-bar>

      <div
        v-if="error !== false && error.statusText !== ''"
        class="b-uploader-simple__error"
      >
        {{ error.statusText }}
      </div>

      <template v-if="progress === 100">
        <!-- files -->
        <div
          class="b-uploader-simple__el--plus"
          @dragover.prevent
          @drop="onDrop"
        >

          <IconBase
            name="downloadCloud"
            width="54"
            height="38"
            color="#00ADB6"
          />
          <div>
            Drag and drop
          </div>
          <input
            :accept="accept"
            @click="$event.target.value = ''"
            @change="uploadFiles($event.target.files)"
            type="file"
            ref="input"
            hidden
          />
        </div>
      </template>

    </div>
  </figure>
</template>

<script>
import { mapActions } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
import * as _ from 'lodash-es'
import { getCookie, ERRORS } from '@editor/util'

function getFormData (file) {
  let formData = new FormData()
  formData.append('file', file)
  return formData
}

export default {
  name: 'BaseUploaderItem',

  components: {
    RadialProgressBar
  },

  props: {
    target: {
      type: String,
      default: 'library'
    },
    item: Object,
    multiple: Boolean,
    src: String,
    type: String,
    accept: {
      type: String,
      default: 'image/*,video/mp4,video/x-m4v,video/*'
    },
    label: String,
    tooltipText: String
  },

  data () {
    return {
      progress: 100,
      totalSteps: 100,
      error: false,
      openUrl: false
    }
  },

  computed: {
    pattern () {
      return new RegExp(`${this.type}`)
    },

    path () {
      return _.get(this.item, 'path') ? this.item.path : this.src
    }
  },

  methods: {
    ...mapActions('Sidebar', ['toggleShowImageLibrary']),

    async getFileData (file) {
      this.progress = 0
      this.error = false

      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()

        xhr.upload.onprogress = this.loadingProgress // --- uploading progress
        xhr.open('POST', `${process.env.VUE_APP_API}upload`)
        xhr.setRequestHeader('Authorization', `Bearer ${getCookie('token')}`)
        xhr.send(getFormData(file))

        xhr.onload = xhr.onerror = () => {
          if (xhr.status === 200) {
            try {
              let response = JSON.parse(xhr.response)
              let path = response.cdnUrl
              this.clearProgress(path)
              resolve({ name: response.file, path })
            } catch (error) {
              reject(error)
            }
          } else {
            let response = JSON.parse(xhr.response)
            this.progress = 100
            this.error = {
              status: response.error.code,
              statusText: ERRORS[response.error.message] || ''
            }
            setTimeout(() => {
              this.error = false
            }, 2000)
            reject(response.error)
          }
        }
      })
    },

    clearProgress (path) {
      if (this.type === 'image') {
        let image = new Image()
        image.src = path
        image.onload = () => requestAnimationFrame(() => { this.progress = 100 })
        return
      }
      requestAnimationFrame(() => { this.progress = 100 })
    },

    loadingProgress ({ loaded, total }) {
      this.progress = (loaded === total) ? 99 : parseInt((loaded / total * 100))
    },

    async uploadFiles (fileList) {
      let pattern = this.pattern
      let files = [...fileList].filter(({ type }) => type.match(pattern))
      for (let file of files) {
        this.$emit('add', await this.getFileData(file))
      }
    },

    onDrop (e) {
      let files = e.dataTransfer.files

      e.stopPropagation()
      e.preventDefault()

      if (!files || !files[0]) {
        return
      }

      this.uploadFiles(files)
    },

    onClick () {
      this.$refs.input.click()
    },

    inputDone (value) {
      this.$emit('add', { name: 'file', path: value })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-uploader-simple
  font-family: 'Roboto', Helvetica Neue, Helvetica, Arial, sans-serif
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0

  padding: 0
  margin: 0

  &__el
    display: flex
    align-items: center
    justify-content: center

    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0

    &--plus
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0

      color: $main-green

      background: rgba(88, 199, 205, 0.1)
      border: 1px dashed $main-green
      border-radius: 5px

      & > div
        font-size: 1rem
        line-height: 1.4rem
        margin-top: .5rem

  &__error
    position: absolute
    top: 102%
    font-size: 1rem
    line-height: 1.4rem
    margin-top: .5rem
    color: #D36083
</style>
