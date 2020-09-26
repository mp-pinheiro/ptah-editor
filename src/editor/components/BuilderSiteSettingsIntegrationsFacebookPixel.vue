 <template>
  <builder-modal-content-layout
    class="b-integrations-facebook-pixel"
    >
    <div>
      <div class="b-integrations-facebook-pixel__inner">
        <base-caption>
          Facebook Pixel Code
        </base-caption>
        <base-text-field
          v-model="fbPixel"
          placeholder="">
          <template slot="label">
            Facebook Pixel container ID
            <base-help
              class="help"
              :hasLink="true"
              link="https://developers.facebook.com/docs/facebook-pixel/implementation"
            >
            </base-help>
          </template>
        </base-text-field>
      </div>
    </div>

    <div slot="controls">
      <BaseButton size="small" color="gray" :transparent="true" @click="back()">{{ $t('nav.back') }}</BaseButton>
      <BaseButton size="small" color="blue" @click="applySettings">{{ $t('nav.apply') }}</BaseButton>
    </div>
  </builder-modal-content-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BuilderModalContentLayout from './BuilderModalContentLayout'
import BaseCaption from '../../components/base/BaseCaption'

export default {
  name: 'BuilderSiteSettingsIntegrationsFacebookPixel',

  components: {
    BaseCaption,
    BuilderModalContentLayout
  },

  data () {
    return {
      fbPixel: ''
    }
  },

  computed: {
    ...mapState(['currentLanding'])
  },

  watch: {
    currentLanding () {
      this.updateFbPixel()
    }
  },

  mounted () {
    this.updateFbPixel()
  },

  methods: {
    ...mapActions([
      'storeSettings',
      'activateCheckListItem'
    ]),

    updateFbPixel () {
      const settings = this.currentLanding.settings

      this.fbPixel = settings.fbPixel
    },

    applySettings () {
      const data = {
        fbPixel: this.fbPixel
      }

      this.activateCheckListItem('integrations')

      this.storeSettings(data)
      this.back()
    },

    back () {
      this.$router.push(`/editor/${this.$route.params.slug}/settings/integrations`)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-integrations-facebook-pixel
  &__inner
    padding: 0

  .help
    position: absolute
    right: 0
    top: 0
</style>
