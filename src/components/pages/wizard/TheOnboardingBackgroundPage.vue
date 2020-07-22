<template>
  <TheOnboardingStepLayout @skipSteps="skipSteps">
    <base-caption>
      Instruction
    </base-caption>
    <div class="b-instruction" />
    <div class="b-panel__control">
      <BaseCaption help="https://docs.stg.ptah.super.com/docs/customization/">
        Background image
      </BaseCaption>
      <div class="b-panel__col">
        <base-uploader
          :value="background"
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
  name: 'TheOnboardingBackgroundPage',

  components: {
    TheOnboardingStepLayout
  },

  computed: {
    ...mapState('Onboarding', [
      'background'
    ])
  },

  created () {
    this.setActiveStep('background')
  },

  mounted () {
    this.uploadBackground(this.background)

    try {
      this.$gtag.event('Wizard_background', { 'event_category': 'LANDING' })
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
      'setBackground'
    ]),

    uploadBackground (value) {
      this.setBackground(value)
      if (value === '' || value === null) {
        this.deactivateCheckListItem('background')
      } else {
        this.activateCheckListItem('background')
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
    background-image: url(https://cdn.ptah.pro/tst/5ef4948bf835ea00018fb774/741209ef-e283-4fa4-a4d7-55d7b3f07353.gif)
</style>
