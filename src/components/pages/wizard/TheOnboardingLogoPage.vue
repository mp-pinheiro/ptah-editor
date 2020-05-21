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
  },

  created () {
    this.setActiveStep('logo')
  }
}
</script>

<style lang="sass" scoped>
  .b-instruction
    background-image: url(https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/c8687195-e928-4178-a81b-212211f7a879.gif)
</style>
