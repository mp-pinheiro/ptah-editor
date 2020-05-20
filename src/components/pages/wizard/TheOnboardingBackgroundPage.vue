<template>
  <TheOnboardingStepLayout>
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
  name: 'TheOnboardingBackgroundPage',

  components: {
    TheOnboardingStepLayout
  },

  computed: {
    ...mapState('Onboarding', [
      'background'
    ])
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

    uploadLogo (value) {
      this.setBackground(value)
      if (value === '' || value === null) {
        this.deactivateCheckListItem('background')
      } else {
        this.activateCheckListItem('background')
      }
    }
  },

  created () {
    this.setActiveStep('background')
  }
}
</script>

<style lang="sass" scoped>
  .b-instruction
    width: 25rem
    height: 15rem

    margin: 0 auto 4.5rem
    background-image: url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/1b89b804-5109-4dd1-a102-81516fc6dfb8.png)
    background-size: contain
</style>
