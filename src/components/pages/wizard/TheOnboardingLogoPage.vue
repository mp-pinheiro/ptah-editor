<template>
  <TheOnboardingStepLayout @skipSteps="skipSteps">
    <base-caption>
      Instruction
    </base-caption>
    <div class="b-instruction" />
    <div class="b-panel__control">
      <BaseCaption help="https://docs.stg.ptah.super.com/docs/customization/">
        Logo
      </BaseCaption>
      <div class="b-panel__col">
        <base-uploader
          :value="logo"
          label="Logo"
          @change="uploadLogo"
        />
      </div>
    </div>
  </TheOnboardingStepLayout>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import TheOnboardingStepLayout from '@src/components/pages/wizard/TheOnboardingStepLayout'

export default {
  name: 'TheOnboardingLogoPage',

  components: {
    TheOnboardingStepLayout
  },

  computed: {
    ...mapState('Onboarding', [
      'logo'
    ])
  },

  created () {
    this.setActiveStep('logo')
  },

  mounted () {
    this.uploadLogo(this.logo)

    try {
      this.$gtag.event('Wizard_logo', { 'event_category': 'LANDING' })
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    ...mapActions('Onboarding', [
      'activateCheckListItem',
      'deactivateCheckListItem'
    ]),
    ...mapMutations('Onboarding', [
      'setActiveStep',
      'setLogo'
    ]),

    uploadLogo (value) {
      this.setLogo(value)
      if (value === '' || value === null) {
        this.deactivateCheckListItem('logo')
      } else {
        this.activateCheckListItem('logo')
      }
    },

    skipSteps () {
      this.$emit('skipSteps')
    }
  }
}
</script>

<style lang="sass" scoped>
  .b-instruction
    background-image: url(https://cdn.ptah.pro/tst/5ef4948bf835ea00018fb774/d0514ec7-cf58-4238-8c5d-b083b33a2e39.gif)
</style>
