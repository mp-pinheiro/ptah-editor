<template>
  <div class="b-top-bar" id="topbar">
    <div class="b-top-bar__padd">
      <div class="b-top-bar-menu">
        <div class="b-top-bar-menu__left">
          <div class="b-top-bar-menu__crumbs">
            <span class="b-top-bar-menu__crumbs-home b-top-bar-menu__crumbs-link"
              :tooltip="homeTooltipText"
              tooltip-position="bottom"
              @click="backToLandings"
              >
              <IconBase
                name="home"
                width="20"
                height="17"
                color="#575A5F"
              />
              <span>My board</span>
            </span>
            <span class="b-top-bar-menu__crumbs-arrow">
              <IconBase
                name="arrowToRight"
                width="16"
                height="8"
                color="#575A5F"
              />
            </span>
            <span :title="landingName">
              {{ landingName | truncate(35, '...') }}
            </span>
          </div>
        </div>
        <div class="b-top-bar-menu__middle"
          :class="{'b-top-bar-menu__middle-margin' : isExpanded }"
          >
          <MenuPlatforms
            :disabled="emptySections"
            @setDevice="setDevice"
          />
        </div>
        <div class="b-top-bar-menu__right">
          <BaseButton
            @click="openHelpPage"
            color="yellow-transparent"
            size="small"
          >
            {{ $t('nav.help') }}
            <IconBase
              name="help"
              width="12"
              height="12"
            />
          </BaseButton>
          <BaseButton
            class="b-on-boarding-tips-step-8"
            @click="$emit('preview', $event)"
            color="main-green-transparent"
            size="small"
            :disabled="builder.sections.length === 0"
          >
            {{ $t('nav.preview') }}
          </BaseButton>
          <BaseButton
            @click="save"
            color="main-green"
            size="small"
            :disabled="builder.sections.length === 0 || loading"
          >
            {{ $t('nav.save') }}
          </BaseButton>
          <BaseButton
            class="b-on-boarding-tips-step-9"
             @click="publish"
             color="main-green"
             size="small"
             :disabled="builder.sections.length === 0"
          >
            {{ $t('nav.publish') }}
          </BaseButton>

          <div class="b-top-bar-menu__user" @click="redirectToAccount">
            {{shortName}}
          </div>
        </div>
      </div>
    </div>

    <the-publication
      v-if="showPublish"
      :landingName="landingName"
      :builder="builder"
      @zip="$emit('export', $event)"
      @close="showPublish = false"></the-publication>
  </div>
</template>

<script>
import MenuPlatforms from './menu/MenuPlatforms.vue'
import { mapState, mapActions } from 'vuex'
import ThePublication from './ThePublication'

export default {
  components: {
    ThePublication,
    MenuPlatforms
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

  data: () => ({
    device: null,
    showPublish: false,
    loading: false
  }),

  computed: {
    ...mapState(['currentLanding']),
    ...mapState('Sidebar', [
      'isExpanded'
    ]),

    ...mapState('Landing', [
      'onBoarding'
    ]),

    ...mapState('User', [
      'user'
    ]),

    modalContentID () {
      return this.$route.path.split('/')[4] || ''
    },

    homeTooltipText () {
      return this.$t('nav.backToDashbord')
    },

    emptySections () {
      return !this.builder.sections.length
    },

    name () {
      return this.user ? this.user.name : ''
    },

    shortName () {
      return this.getShortName(this.name)
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'clearSettingObject',
      'setControlPanel'
    ]),

    ...mapActions('Landing', [
      'saveStateHandler'
    ]),

    redirectToAccount () {
      window.location.href = `${process.env.VUE_APP_DOMAIN}/account`
    },

    setDevice (type) {
      this.$emit('setDevice', type)
    },

    backToLandings ($event) {
      this.setControlPanel(false)
      this.clearSettingObject()
      this.$emit('backToLandings', $event)
    },

    closeSiteSettings () {
      this.$router.push(`/editor/${this.$route.params.slug}`)
    },

    async itemClick (item, event) {
      await this.$nextTick()

      this.$emit(item, event)
    },

    openHelpPage () {
      window.open(process.env.VUE_APP_HELP)
    },

    getShortName (name) {
      if (!name || name === '') {
        return
      }

      const matches = name.match(/[^aeiouy]/gi)

      return matches.slice(0, 2).join('')
    },

    publish () {
      this.showPublish = true
    },

    save () {
      this.$Progress.start()
      this.loading = true

      this.saveStateHandler(this.builder.export('JSON')).finally(() => {
        this.loading = false
        this.$Progress.finish()
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-top-bar
  width: 100%
  height: 100%
  padding: 0 0 0 2.4rem

  display: flex
  align-items: center
  justify-content: center

  min-width: 98rem
  &__padd
    width: 100%
  &-menu
    display: flex
    align-items: center
    justify-content: space-between
    &__user
      width: 3.6rem
      height: 3.6rem
      border-radius: 50%
      background: $grey-middle
      color: $white
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer
      margin-left: 1rem
      transition: all .2s ease-out
      font-weight: 300
      &:hover
        background: $dark-grey

    &__left
      order: 1
      width: 45%
      display: flex
      align-items: center
      justify-content: flex-start
    &__middle
      order: 2
      width: 8rem
      &-margin
        margin: 0 0 0 33rem
    &__right
      order: 3
      width: 45%
      text-align: right
      padding-right: 2.1rem

      display: flex
      justify-content: flex-end
      align-items: center
      button
        margin: 0 1rem
        @media only screen and (max-width: 1100px)
          &
            margin: 0.5rem
            padding: 0.5rem

    &__crumbs
      display: flex

      color: $dark-grey
      font-weight: 600
      padding: 0
      white-space: nowrap
      &-home
        padding: 0 $size-step/4
        & svg
          margin-right: 2rem
      &-arrow
        padding: 0 1rem
      &-link
        display: flex
        &:hover
          cursor: pointer
</style>
