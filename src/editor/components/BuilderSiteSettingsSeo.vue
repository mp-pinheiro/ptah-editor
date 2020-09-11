<template>
  <builder-modal-content-layout>
    <div class="b-seo-panel">
      <base-button-tabs
        :list="tabs"
        v-model="activeTab"
        class="b-seo-tabs"
      />
      <div class="layout layout__og" v-if="activeTab === 'seo'">
        <base-scroll-container>
          <div class="layout-padding">
            <!-- Title & Favicon -->
            <div class="b-panel__control">
              <base-caption help="Page title">
                Page title
              </base-caption>
              <div class="b-panel__col">
                <BaseTextField
                  v-model="pageTitle"
                />
              </div>
            </div>

            <div class="b-panel__control">
              <base-caption help="Favicon">
                Favicon
              </base-caption>
              <div class="b-panel__control">
                <div class="b-panel__col">
                  <base-uploader
                    v-model="favicon"
                    type="image"
                    :label="$t('s.favicon')"
                    tooltipText="32 x 32 px, .png"
                  />
                </div>
              </div>
            </div>

            <div class="b-panel__control">
              <base-caption help="Cookie policy">
                Cookie policy
              </base-caption>
              <div class="b-panel__control">
                <div class="b-panel__col">
                  <base-switcher
                    v-model="useCookie"
                    :label="$t('s.useCookie')"
                  />
                </div>
              </div>
              <div class="b-panel__control">
                <div class="b-panel__col">
                  <base-upload-input
                    type="pdf"
                    v-model="pdfFile"
                    :accept="'application/pdf'"
                    :label="$t('s.policyFile')"
                    placeholder="Paste URL or upload pdf file"
                  />
                </div>
              </div>
            </div>
        </div>
        </base-scroll-container>
      </div>

      <!-- Open Graph -->
      <div class="layout layout__og" v-if="activeTab === 'og'">
        <base-scroll-container>
          <div class="layout-padding">
            <div
              v-for="ogField in ogFields"
              :key="ogField.id"
            >
              <div class="b-panel__control">
                <BaseCaption :help="ogField.label">
                  {{ ogField.label }}
                </BaseCaption>
                <div class="b-panel__col">
                  <base-text-field
                    v-if="(ogField.id.indexOf('title') !== -1 || ogField.id.indexOf('description') !== -1 || ogField.id.indexOf('type') !== -1) && ogField.id.indexOf('locale') === -1"
                    v-model="ogField.value"
                    :placeholder="ogField.placeholder"
                  />

                  <base-uploader
                    v-if="ogField.id.indexOf('image') !== -1"
                    v-model="ogField.value"
                  />

                  <base-text-field
                    v-if="ogField.id.indexOf('url') !== -1"
                    v-model="ogField.value"
                    :hasError="error.url"
                    @input="validUrl(ogField.value)"
                  >
                    <span slot="error">
                      Please enter a valid URL
                    </span>
                  </base-text-field>

                  <div class="b-open-graph__width"
                    v-if="ogField.id.indexOf('locale') !== -1"
                  >
                    <div class="b-open-graph__row">
                      <div class="b-open-graph__col">
                        <BaseSelect
                          class="b-open-graph__select"
                          :options="locale[`${ogField.id}`].language.options"
                          v-model="locale[`${ogField.id}`].language.selected"
                          :search="true"
                        />
                      </div>
                      <div class="b-open-graph__col b-open-graph__select">
                        <BaseSelect
                          :options="locale[`${ogField.id}`].territory.options"
                          v-model="locale[`${ogField.id}`].territory.selected"
                          :search="true"
                        >
                        </BaseSelect>
                      </div>
                      <div class="b-open-graph__col"
                        v-text="localeSelected[`${ogField.id}`]"
                      />
                    </div>
                  </div>

                  <base-uploader
                    v-if="ogField.id.indexOf('video') !== -1"
                    v-model="ogField.value"
                    label="Video"
                    type="video"
                    accept="video/mp4,video/x-m4v,video/*"
                  />
                </div>
              </div>
            </div>
          </div>
        </base-scroll-container>
      </div>

      <!-- Custom meta tags -->
      <div class="layout layout__og b-meta-tag" v-if="activeTab === 'meta'">
        <div class="layout-padding">
          <div class="b-panel__control">
            <base-caption>
              Add custom meta tag
            </base-caption>
            <hint-block
              class="hintBlock"
              text="Please add custom meta tags"
            />
            <div class="b-panel__col">
              <div class="b-meta-tag-row" v-for="(tag, index) in metaTags"
                :key="index"
              >
                <base-text-field
                  class="b-meta-tag-row__input"
                  v-model="metaTags[index].name"
                  placeholder="Name"
                />
                <base-text-field
                  class="b-meta-tag-row__input"
                  v-model="metaTags[index].content"
                  placeholder="Content"
                />
                <div class="b-meta-tag-row__buttons">
                  <span class="del"
                    tooltip="Remove"
                    tooltip-position="top"
                    v-show="metaTags.length > 1 && index > 0"
                    @click="metaTags.splice(index, 1)"
                  >
                    <icon-base
                      name="close"
                      color="#B1B1B1"
                      width="10" height="10"
                    />
                  </span>
                  <span class="plus"
                    tooltip="Add"
                    tooltip-position="top"
                    v-show="index === 0 && metaTags.length < 10"
                    @click="metaTags.push({ name: '', content: ''})"
                  >
                    <icon-base
                      name="plus"
                      color="#B1B1B1"
                      width="10" height="10"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div slot="controls">
      <BaseButton size="small" color="gray" :transparent="true" @click="close()">{{ $t('nav.cancel') }}</BaseButton>
      <BaseButton size="small" color="blue" @click="applySettings">{{ $t('nav.save') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import _ from 'lodash-es'
import { isValidUrl } from '../util'
import BaseScrollContainer from '../../components/base/BaseScrollContainer'
import HintBlock from './HintBlock'

const LIST_LANG = [
  { name: 'English', value: 'en' },
  { name: 'Russian', value: 'ru' },
  { name: 'French', value: 'fr' },
  { name: 'Chinese', value: 'zh' }
]

const LIST_TERR = [
  { name: 'United Kingdom', value: 'GB' },
  { name: 'Russian Federation', value: 'RU' },
  { name: 'China', value: 'CN' },
  { name: 'France', value: 'FR' }
]

export default {
  name: 'BuilderSiteSettingsSeo',

  components: {
    BaseScrollContainer,
    BuilderModalContentLayout,
    HintBlock
  },

  data () {
    return {
      pageTitle: '',
      favicon: '',
      useCookie: null,
      pdfFile: null,
      tabs: [
        { value: 'seo', text: 'Settings' },
        { value: 'og', text: 'Open graph' },
        { value: 'meta', text: 'Meta tags' }
      ],
      activeTab: 'seo',
      ogFields: [
        {
          id: 'og:title',
          label: 'Title',
          placeholder: 'Game name',
          value: ''
        },
        {
          id: 'og:description',
          label: 'Description',
          placeholder: 'Video Game',
          value: ''
        },
        {
          id: 'og:image',
          label: 'Image',
          placeholder: 'http://www.mydomain.com/image.png',
          value: ''
        },
        {
          id: 'og:type',
          label: 'Type',
          placeholder: 'Type',
          value: 'Game'
        },
        {
          id: 'og:url',
          label: 'URL',
          placeholder: 'http://www.mydomain.com/',
          value: ''
        },
        {
          id: 'og:locale',
          label: 'Locale',
          placeholder: 'en_GB',
          value: ''
        },
        {
          id: 'og:locale:alternate',
          label: 'Locale : Alternate',
          placeholder: 'fr_FR',
          value: ''
        },
        {
          id: 'og:video',
          label: 'Video',
          placeholder: 'http://www.mydomain.com/video.mp4',
          value: ''
        }
      ],
      locale: {
        'og:locale': {
          language: {
            options: _.merge([], LIST_LANG),
            selected: { name: 'English', value: 'en' }
          },
          territory: {
            options: _.merge([], LIST_TERR),
            selected: { name: 'United Kingdom', value: 'GB' }
          }
        },
        'og:locale:alternate': {
          language: {
            options: _.merge([], LIST_LANG),
            selected: { name: 'English', value: 'en' }
          },
          territory: {
            options: _.merge([], LIST_TERR),
            selected: { name: 'United Kingdom', value: 'GB' }
          }
        }
      },
      metaTags: [],
      error: {
        url: false
      }
    }
  },

  computed: {
    ...mapState(['currentLanding', 'defaultFavicon']),
    ...mapState({
      policy: ({ currentLanding: { settings } }) => settings.cookiesPolicy
    }),

    localeSelected () {
      return {
        'og:locale': this.locale['og:locale'].language.selected.value + '_' + this.locale['og:locale'].territory.selected.value,
        'og:locale:alternate': this.locale['og:locale:alternate'].language.selected.value + '_' + this.locale['og:locale:alternate'].territory.selected.value
      }
    }
  },

  watch: {
    currentLanding () {
      this.updateSettings()
    },
    policy: {
      immediate: true,
      deep: true,
      handler (value) {
        this.updatePolicy(value)
      }
    },
    localeSelected (value) {
      for (let key in value) {
        let item = _.find(this.ogFields, { id: key })
        if (item) {
          item.value = value[key]
        }
      }
    }
  },

  created () {
    this.updateSettings()
  },

  methods: {
    ...mapActions([
      'storeSettings',
      'activateCheckListItem'
    ]),
    ...mapActions('Sidebar', ['toggleSidebar']),

    updateSettings () {
      const settings = this.currentLanding.settings

      this.pageTitle = settings.title
      this.favicon = settings.favicon

      _.map(settings.ogTags, ({ property, content }) => {
        const item = _.find(this.ogFields, { id: property })
        if (item) {
          if (property.indexOf('locale') !== -1) {
            let arr = content.split('_')
            let l = arr[0]
            let t = arr[1]

            let lName = _.find(LIST_LANG, { value: arr[0] })
            this.locale[property].language.selected.name = lName.name
            this.locale[property].language.selected.value = l

            let lTerr = _.find(LIST_TERR, { value: arr[1] })
            this.locale[property].territory.selected.name = lTerr.name
            this.locale[property].territory.selected.value = t

            item.value = content
          } else {
            item.value = content
          }
        }
      })

      this.metaTags = settings.metaTags
    },

    applySettings () {
      const ogTags = this.ogFields.filter(({ value }) => value).map(({ id, value }) => {
        return {
          property: id,
          content: value
        }
      })

      const data = {
        title: this.pageTitle,
        favicon: this.favicon,
        cookiesPolicy: {
          enabled: this.useCookie,
          pdf: this.pdfFile
        },
        ogTags: ogTags,
        metaTags: this.metaTags
      }

      // mark if more than one tag is filled in
      if (ogTags.length > 1) {
        this.activateCheckListItem('seo')
      }

      if (data.title !== '') {
        this.activateCheckListItem('title')
      }

      if (data.favicon !== '' && data.favicon !== this.defaultFavicon) {
        this.activateCheckListItem('favicon')
      }

      this.storeSettings(data)
      this.close()
    },

    updatePolicy ({ enabled, pdf }) {
      this.useCookie = enabled
      this.pdfFile = pdf
    },

    validUrl (url) {
      let v = true

      if (url !== '') {
        v = isValidUrl(url)
      }

      this.error.url = !v
    },

    close () {
      this.toggleSidebar(false)
      this.$router.push(`/editor/${this.$route.params.slug}`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_variables.sass'
.b-seo-panel
  height: 100%
  position: relative
  /deep/
  .b-panel__control,
  .b-panel__row,
  .b-panel__col
    max-width: 30rem

.b-seo-tabs
  margin-bottom: $size-step

.layout
  &__og
    padding-right: 0
  &-padding
    width: 100%
    padding: 0 5rem 0 0

.b-builder-site-settings-seo,
.b-builder-site-settings-og
  &__item
    margin-bottom: 3rem
  &__help
    margin-left: 1rem

.upload-pdf
  margin-top: 2rem

.b-open-graph
  &__select
    margin-bottom: 1.6rem

.b-meta-tag
  &-row
    display: flex
    justify-content: flex-start
    align-items: flex-start

    margin-bottom: .5rem
    &__input
      max-width: 20rem
      &:first-child
        margin-right: .5rem
    &__buttons
      display: flex
      justify-content: center
      min-width: 4rem
      margin: 0.8rem 0 0.5rem
    & span
      display: flex
      align-items: center
      justify-content: center

      width: 2rem
      height: 2rem
      margin-left: .4rem

      border-radius: 100%
      border: 0.2rem solid $ligth-grey

      transition: all .3s cubic-bezier(.2,.85,.4,1.275)
      &:hover
        cursor: pointer
        background-color: $white
      &.del svg
        fill: $ligth-grey
      &.del:hover
        border: 0.2rem solid $orange
        & svg
          fill: $orange
      &.plus svg
        fill: $main-green
      &.plus:hover
        border: 0.2rem solid $main-green
        & svg
          fill: $main-green

.hintBlock
  margin-bottom: 2rem
</style>
