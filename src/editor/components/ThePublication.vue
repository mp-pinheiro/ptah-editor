<template>
  <div class="b-publication-overlay">
    <div class="b-publication">
      <div class="b-publication__loading" v-if="loading">
        <base-loading></base-loading>
      </div>
      <div class="b-publication__close" @click.prevent="$emit('close')">
        <IconBase
          name="close"
          width="14"
          height="14"
          color="#575A5F"
        />
      </div>
      <header>
        <h1>Publishing</h1>
      </header>

      <div class="b-publication__container">
        <div class="b-publication__save b-publication__container--side">
          <IconBase name="landingColor" width="45" height="44" />

          <h2>Export your project!</h2>

          <p>You can download your project as a zip file</p>

          <base-button size="small" color="yellow-transparent" @click.prevent="$emit('zip')">Download ZIP</base-button>
        </div>

        <div class="b-publication__divider"></div>

        <div class="b-publication__options b-publication__container--side">
          <div class="b-publication__option">
            <p>Use this address to access your page</p>

            <div class="b-publication__domain" :class="{'error': domainLocalError}">
              <IconBase name="globus" width="18" height="18" />

              <template v-if="isDomainProvided">
                <a :href="`https://${domainLocalName}`" target="_blank">https://{{domainLocalName}}</a>
              </template>
              <template v-else>
                https://
                <input
                  type="text"
                  @keypress="clearErrors"
                  v-model="domainLocalName">
                .ptah.me
              </template>

              <div class="b-publication__domain--error" v-if="domainLocalError">
                {{domainLocalErrorText}}
              </div>
            </div>

            <base-button
              @click="publishLanding"
              class="b-publication__button"
              size="small"
              color="gradient">
              Publish
            </base-button>
          </div>

          <div class="b-publication__option disabled">
            <p>Connect your custom domain</p>
            <p><b>(coming soon)</b></p>

            <base-button class="b-publication__button" size="small" :disabled="true" color="main-green">
              Connect
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ThePublication',
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
      domainLocalName: ''
    }
  },

  computed: {
    ...mapState(['currentLanding', 'name', 'slug']),

    isDomainProvided () {
      return this.currentLanding.domain.length > 0
    }
  },

  mounted () {
    this.domainLocalName = this.isDomainProvided ? this.currentLanding.domain : this.name
  },

  methods: {
    ...mapActions('Landing', ['publish', 'setDomain']),
    ...mapMutations(['updateCurrentLanding']),

    /**
     * Publish landing on ptah.me
     */
    publishLanding () {
      let id = this.slug

      this.loading = true

      this.domain(id)
        .then(() => {
          return this.builder.getZip()
        })
        .then((file) => {
          return this.publish({ id, file })
        })
        .then((data) => {
          this.updateCurrentLanding(Object.assign(this.currentLanding, {
            domain: data.domain
          }))
          this.domainLocalName = data.domain

          try {
            this.$gtag.pageview({
              page_path: '/publication'
            })
            window.fbq('track', 'publication')
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
        return Promise.resolve(true)
      } else {
        return this.setDomain({
          domain: this.domainLocalName,
          personal: false,
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
.b-publication-overlay
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

.b-publication
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
    font-weight: 600
    font-size: 2.2rem
    line-height: 3rem
    letter-spacing: 0.065em
    color: $dark-grey !important

  &__close
    position: absolute
    top: 3.3rem
    right: 3.3rem
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
    font-size: 1.4rem
    line-height: 1.9rem
    letter-spacing: 0.065em
    color: $dark-grey !important
    margin: 0 0 3rem

    p
      text-align: left

    &.disabled
      color: #A2A5A5 !important

  &__button
    margin-top: 2rem

  &__domain
    background: #FBFBFB
    border-radius: 25px
    padding: .9rem 2.5rem
    text-align: left
    display: flex
    justify-content: flex-start
    align-items: center
    margin-top: 2rem
    position: relative

    input
      width: 25rem
      border: 1px solid $ligth-grey
      padding: .5rem
      margin: 0 .5rem
      box-sizing: border-box
      font-size: 1.6rem
      font-weight: 600
      background: linear-gradient(270deg,#9e00fb,#f9005b)
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent

    svg
      margin-right: 1.6rem

    a
      background: linear-gradient(270deg,#9e00fb,#f9005b)
      -webkit-background-clip: text
      -webkit-text-fill-color: transparent

      &:hover
        background: linear-gradient(270deg,#f9005b,#9e00fb)
        -webkit-background-clip: text
        -webkit-text-fill-color: transparent

    &--error
      position: absolute
      bottom: -1.5rem
      left: 0
      right: 0
      text-align: center
      color: $orange

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
</style>
