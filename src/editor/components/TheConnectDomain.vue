<template>
  <div class="b-connect-domain-overlay">
    <div class="b-connect-domain">
      <div class="b-connect-domain__loading" v-if="loading">
        <base-loading></base-loading>
      </div>
      <div class="b-connect-domain__close b-panel__close"
        @click.prevent="$emit('toggleShowConnectDomain', false)"
      >
        <IconBase
          name="close"
          width="14"
          height="14"
          color="#575A5F"
        />
      </div>
      <header>
        <h1>Custom domain</h1>
      </header>

      <div class="b-connect-domain__container">
        <div class="b-connect-domain__options b-connect-domain__container--side">
          <div class="b-connect-domain__option">
            <p>Connect your custom domain</p>

            <div class="b-connect-domain__domain" :class="{'error': domainLocalError}">
              <IconBase name="globus" width="18" height="18" />

              <template v-if="isDomainProvided">
                <a :href="`${prot}${domainLocalName}`" target="_blank">
                  {{ prot }}{{domainLocalName}}
                </a>
              </template>
              <template v-else>
                {{ prot }}
                <input
                  type="text"
                  @keyup="clearErrors"
                  v-model="domainLocalName"
                  placeholder="ptah.pro"
                />
              </template>
            </div>

            <div class="b-connect-domain__domain--error" v-if="domainLocalError">
              {{domainLocalErrorText}}
            </div>

            <div class="b-connect-domain__hint-block">
                <div>Please update the DNS records of your domain. </div>
                Add the DNS record (e.g., A, CNAME, or TXT records)
                pointing to 2 IP addresses 75.2.110.42, 99.83.211.206.
                <div>Domain activation will take place no later than
                24 hours.</div>
            </div>

            <div class="b-connect-domain__buttons">
              <base-button
                @click.prevent="$emit('toggleShowConnectDomain', false)"
                class="b-connect-domain__button"
                size="small"
                color="transparent"
              >
                Back
              </base-button>
              <base-button
                :disabled="isDomainProvided"
                @click="publishLanding"
                class="b-connect-domain__button"
                size="small"
                color="gradient"
              >
                Connect
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { merge } from 'lodash-es'
import { isValidUrl } from '@editor/util'
import HintBlock from './HintBlock'

export default {
  name: 'TheConnectDomain',
  components: {
    HintBlock
  },
  props: {
    landingName: {
      required: true
    },
    builder: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: false,
      domainLocalError: false,
      domainLocalErrorText: '',
      domainLocalName: '',
      prot: 'https://'
    }
  },

  computed: {
    ...mapState(['currentLanding', 'name', 'slug']),

    isDomainProvided () {
      return this.currentLanding.settings.personalDomain.length > 0
    }
  },

  mounted () {
    this.domainLocalName = this.isDomainProvided ? this.currentLanding.settings.personalDomain : ''
  },

  methods: {
    ...mapActions('Landing', ['publish', 'setDomain']),
    ...mapMutations(['updateCurrentLanding']),

    /**
     * Publish landing on ptah.me
     */
    publishLanding () {
      let id = this.slug

      if (!isValidUrl(this.prot + this.domainLocalName)) {
        this.domainLocalError = true
        this.domainLocalErrorText = 'Invalid domain'

        return
      }

      this.loading = true

      this.domain(id)
        .then(() => {
          return this.builder.getZip()
        })
        .then((file) => {
          return this.publish({ id, file })
        })
        .then((data) => {
          this.updateCurrentLanding(merge(this.currentLanding, {
            settings: { personalDomain: data.domain }
          }))
          this.domainLocalName = data.domain

          try {
            this.$gtag.pageview({
              page_path: '/publication'
            })
            window.fbq('trackCustom', 'publication')
          } catch (e) {
            // dev mode
          }
        })
        .catch((error) => {
          this.domainLocalError = true
          this.domainLocalErrorText = error.response.status === 409 ? 'This name already exists' : 'Something went wrong'
          this.$message.error('Publication failed', {
            duration: 2500,
            dismissible: false
          })
        })
        .finally(() => { this.loading = false })
    },

    domain (id) {
      if (this.isDomainProvided) {
        this.clearErrors()
        return Promise.resolve(true)
      } else {
        return this.setDomain({
          domain: this.domainLocalName,
          personal: true,
          id
        })
      }
    },

    clearErrors () {
      this.domainLocalError = false
      this.domainLocalErrorText = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.b-connect-domain-overlay
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  display: flex
  align-items: center
  justify-content: center

  background: rgba(#000, 0.6)

  z-index: 1001

.b-connect-domain
  width: 77vw
  height: 50rem
  padding: 5.8rem 3rem 5.8rem
  position: relative

  margin-top: -9rem

  background: #ffffff
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 3px 4px rgba(0, 0, 0, 0.12), 0 1px 5px rgba(0, 0, 0, 0.2)
  border-radius: 10px

  text-align: center

  header
    margin: 0 0 6rem
    padding: 0

  h1
    font-weight: 500
    font-size: 1.6rem
    line-height: 2.2rem
    letter-spacing: 0.065em
    background: linear-gradient(270deg, #9E00FB 0%, #F9005B 100%)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent

    position: relative

    &:after
      content: ''
      position: absolute
      top: 50%
      left: 5%
      width: 35%
      height: 1px
      background: linear-gradient(270deg, #9E00FB 0%, #F9005B 100%)

    &:before
      content: ''
      position: absolute
      top: 50%
      right: 5%
      width: 35%
      height: 1px
      background: linear-gradient(90deg, #9E00FB 0%, #F9005B 108.11%)

  &__close
    position: absolute
    top: 2.2rem
    right: 2.2rem
    cursor: pointer

  &__container
    display: flex
    justify-content: space-around

    &--side
      width: 49%
      padding: 0 3.6rem
      box-sizing: border-box

  &__divider
    width: 1px
    height: 30rem
    background: linear-gradient(270deg, #9E00FB 0%, #F9005B 100%)

  &__save
    h2
      font-weight: 600
      font-size: 1.8rem
      line-height: 2.5rem
      letter-spacing: 0.065em
      color: $dark-grey !important
      margin: 2.5rem 0 1.5rem

    p
      font-size: 1.4rem
      line-height: 1.9rem
      letter-spacing: 0.065em
      color: $dark-grey !important
      margin: 0 0 3.5rem

  &__option
    font-size: 1.8rem
    line-height: 2.5rem
    font-weight: 600
    letter-spacing: 0.065em
    color: $dark-grey !important
    margin: 0 0 3rem

    p
      text-align: center

  &__button
    margin-top: 2rem

  &__domain
    max-width: 36rem
    background: #FBFBFB
    border-radius: 25px
    padding: .9rem 1.6rem
    height: 3.4rem
    text-align: left
    display: flex
    justify-content: flex-start
    align-items: center
    position: relative
    margin: 2rem auto
    font-size: 1.4rem
    border: 1px solid transparent

    &.error
      border: 1px solid #F50064
    input
      width: 100%
      padding: .5rem
      margin: 0 .5rem
      box-sizing: border-box
      font-size: 1.4rem
      background: none transparent
      border: none

      &::placeholder
        color: #CDCDCD

    svg
      margin-right: 1.6rem

    &--error
      color: #F60061
      font-size: 1rem
      line-height: 1.2rem
      margin: -1rem auto 2rem
      text-align: left
      max-width: 36rem
      padding-left: 1.2rem

  &__loading
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom: 0
    background: rgba(255, 255, 255, .8)

  &__hint-block
    font-size: 1.2rem
    line-height: 1.4
    font-weight: 500
    width: 70%
    text-align: left
    margin: 0 auto
    & > div
      margin: .5rem 0
</style>
