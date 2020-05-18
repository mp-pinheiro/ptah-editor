 <template>
  <builder-modal-content-layout
    class="b-integrations-google-analitycs"
    >
    <div>
      <div class="b-integrations-google-analitycs__inner">
        <base-caption>Google Tag Manager</base-caption>
        <base-text-field
          v-model="gtmId"
          placeholder="GTM-XXXXXX">
          <template slot="label">
            GTM container ID
            <base-help
              class="help"
              :hasLink="true"
              link="https://developers.google.com/tag-manager/quickstart"
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
  name: 'BuilderSiteSettingsIntegrationsGoogleTag',

  components: {
    BaseCaption,
    BuilderModalContentLayout
  },

  data () {
    return {
      gtmId: ''
    }
  },

  computed: {
    ...mapState(['currentLanding'])
  },

  watch: {
    currentLanding () {
      this.updateGoogleTag()
    }
  },

  mounted () {
    this.updateGoogleTag()
  },

  methods: {
    ...mapActions([
      'storeSettings',
      'activateCheckListItem'
    ]),

    updateGoogleTag () {
      const settings = this.currentLanding.settings

      this.gtmId = settings.gtmId
    },

    applySettings () {
      const data = {
        gtmId: this.gtmId
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
.b-integrations-google-analitycs
  &__inner
    padding: 0

  .help
    position: absolute
    right: 0
    top: 0
</style>
