<template>
  <TheOnboardingStepLayout @skipSteps="skipSteps">
    <base-caption>
      Instruction
    </base-caption>
    <div class="b-instruction" />
    <div class="b-row">
      <div class="b-panel__control">
        <BaseCaption>
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
      <div class="b-panel__control">
        <BaseCaption>
          Background color
        </BaseCaption>
        <div class="b-panel__col">
          <BaseColorPicker
            :label="$t('s.chooseColor')"
            :value="backgroundColor"
            @change="chooseColor"
          />
        </div>
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
      'background',
      'backgroundColor'
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
      'setBackground',
      'setBackgroundColor'
    ]),

    uploadBackground (value) {
      this.setBackground(value)
      this.toogleActivate(value)
    },

    skipSteps () {
      this.$emit('skipSteps')
    },

    chooseColor (value) {
      const color = value.rgba ? `rgba(${Object.values(value.rgba).toString()})` : value
      this.setBackgroundColor(color)
      this.toogleActivate(color)
    },

    toogleActivate (value) {
      if (value === '' || value === null) {
        this.deactivateCheckListItem('background')
      } else {
        this.activateCheckListItem('background')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .b-instruction
    background-image: url(https://cdn.ptah.pro/tst/5ef4948bf835ea00018fb774/741209ef-e283-4fa4-a4d7-55d7b3f07353.gif)
  .b-row
    display: flex
    justify-content: space-between
    align-items: flex-start
    width: 100%
    max-width: 100%
    & > div
      width: 50%
      margin-right: 1rem
    /deep/
      .b-uploader-item__controls
        max-width: 8rem
</style>
