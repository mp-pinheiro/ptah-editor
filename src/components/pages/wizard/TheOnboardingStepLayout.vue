<template>
  <div class="b-step-layout">
    <div class="b-step-layout__col _left">
      <TheOnboardingSteps />
    </div>
    <div class="b-step-layout__col _right">
      <div class="b-step-layout__padding">
        <slot />
      </div>
      <div class="b-step-layout__controls">
        <div>
          <base-button
            color="transparent"
            size="small"
            @click="skipSteps"
          >
            Skip tour
          </base-button>
        </div>
        <div>
          <base-button
            color="main-green"
            size="middle"
            @click="nextStep"
            :disabled="!checkList[activeStep].status"
          >
            {{ activeStep === 'colors' ? 'Done' : 'Next step' }}
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheOnboardingSteps from '@src/components/pages/wizard/TheOnboardingSteps'

export default {
  name: 'TheOnboardingStepLayout',

  components: {
    TheOnboardingSteps
  },

  computed: {
    ...mapState('Onboarding', [
      'checkList',
      'activeStep'
    ])
  },
  methods: {
    nextStep () {
      let next = 'background'

      if (this.activeStep === 'background') {
        next = 'colors'
      }

      if (this.activeStep === 'colors') {
        this.skipSteps()
      } else {
        this.$router.push({ path: `/dashboard/wizard/${next}` })
      }
    },

    skipSteps () {
      this.$emit('skipSteps')
    }
  }
}
</script>

<style lang="sass" scoped>
  .b-step-layout
    display: flex
    justify-content: stretch
    align-items: stretch

    min-height: 58rem
    border-radius: 10px
    &__col
      min-height: 58rem
      &._left
        min-width: 27rem
      &._right
        min-width: 45rem

        display: flex
        flex-direction: column
        align-items: stretch
    &__padding
      height: 100%
      padding: 4.5rem 9.9rem 0
    &__controls
      padding: 0 2.3rem 3.3rem 0
      display: flex
      justify-content: flex-end
      align-items: center

  .b-instruction
    width: 40rem
    height: 23.8rem

    border: .2rem solid #00ADb6
    border-radius: .5rem

    margin: 0 auto 4.5rem
    background-size: contain
</style>
