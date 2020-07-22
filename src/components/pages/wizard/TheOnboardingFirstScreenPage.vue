<template>
  <TheOnboardingStepLayout @skipSteps="skipSteps">
    <base-caption>
      Instruction
    </base-caption>
    <div class="b-instruction" />
    <div class="b-panel__control">
      <BaseCaption help="https://docs.stg.ptah.super.com/docs/customization/">
        First screen Background image
      </BaseCaption>
      <div class="b-panel__col">
        <base-uploader
          :value="firstScreen"
          label="Image"
          @change="uploadBackground"
        />
      </div>
    </div>
  </TheOnboardingStepLayout>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import TheOnboardingStepLayout from '@src/components/pages/wizard/TheOnboardingStepLayout'

export default {
  name: 'TheOnboardingFirstScreenPage',

  components: {
    TheOnboardingStepLayout
  },

  computed: {
    ...mapState('Onboarding', [
      'firstScreen'
    ])
  },

  methods: {
    ...mapActions('Onboarding', [
      'activateCheckListItem',
      'deactivateCheckListItem'
    ]),
    ...mapMutations('Onboarding', [
      'setActiveStep',
      'setFirstScreen'
    ]),

    uploadBackground (value) {
      this.setFirstScreen(value)
      if (value === '' || value === null) {
        this.deactivateCheckListItem('firstScreen')
      } else {
        this.activateCheckListItem('firstScreen')
      }
    },

    skipSteps () {
      this.$emit('skipSteps')
    }
  },

  created () {
    this.setActiveStep('firstScreen')
  },

  mounted () {
    this.uploadBackground(this.firstScreen)
    try {
      this.$gtag.event('Wizard_firstScreen', { 'event_category': 'LANDING' })
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="sass" scoped>
  .b-instruction
    background-image: url(https://cdn.ptah.pro/tst/5ef4948bf835ea00018fb774/741209ef-e283-4fa4-a4d7-55d7b3f07353.gif)
</style>
