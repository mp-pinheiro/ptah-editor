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
            v-if="activeStep !== 'colors'"
          >
            Skip tour
          </base-button>
        </div>
        <div>
          <base-button
            color="main-green-transparent"
            size="middle"
            @click="back"
            v-if="activeStep !== 'logo'"
          >
            Back
          </base-button>
        </div>
        <div>
          <base-button
            color="main-green"
            size="middle"
            @click="nextStep"
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
    ]),

    steps () {
      return Object.keys(this.checkList)
    },

    activeStepIndex () {
      return this.steps.indexOf(this.activeStep)
    },

    next () {
      if (this.activeStepIndex === this.steps.length - 1) {
        return ''
      }

      return this.steps[this.activeStepIndex + 1]
    },

    prev () {
      if (this.activeStepIndex === 0) {
        return ''
      }

      return this.steps[this.activeStepIndex - 1]
    }
  },
  methods: {
    back () {
      if (this.prev === '') {
        this.skipSteps()
      } else {
        this.$router.push({ path: `/dashboard/wizard/${this.prev}` })
      }
    },

    nextStep () {
      if (this.next === '') {
        this.skipSteps()
      } else {
        this.$router.push({ path: `/dashboard/wizard/${this.next}` })
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
    width: 45rem
    height: 26.9rem

    border: .2rem solid #00ADb6
    border-radius: .5rem

    margin: 0 auto 4.5rem
    background-size: cover
</style>
