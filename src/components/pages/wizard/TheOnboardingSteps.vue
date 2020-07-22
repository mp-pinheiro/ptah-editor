<template>
  <div class="b-onboarding-steps">
    <div class="b-onboarding-steps__ptah" />

    <div class="b-progress__header">
      <radial-progress-bar
        :diameter="95"
        :completed-steps="progressInt"
        :total-steps="100"
        :strokeWidth="15"
        strokeLinecap="butt"
        :startColor="`#00ADB6`"
        :stopColor="`#00ADB6`"
        :innerStrokeColor="`#F3F6F6`"
      >
        <div class="b-progress__circle">{{ progress }}%</div>
      </radial-progress-bar>
    </div>

    <check-list-item
      v-for="(item, index) in checkList"
      :key="index"
      :active="item.status"
    >
      <span :class="{ '_active' : activeStep === index }">
        {{ item.text }}
      </span>
      <div
        class="b-checklist-item__description"
        slot="description"
        v-if="activeStep === index"
      >
        {{ item.description }}
      </div>
    </check-list-item>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import CheckListItem from '@src/editor/components/CheckListItem'
import RadialProgressBar from 'vue-radial-progress/src/RadialProgressBar'

export default {
  name: 'TheOnboardingSteps',

  components: {
    RadialProgressBar,
    CheckListItem
  },

  computed: {
    ...mapState('Onboarding', [
      'checkList',
      'activeStep'
    ]),

    ...mapGetters('Onboarding', [
      'progress'
    ]),

    progressInt () {
      return parseInt(this.progress)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-onboarding-steps
  width: 27rem
  padding: 3.8rem

  background-color: #F3F6F6
  height: 100%
  border-radius: 10px 0 0 10px
  &__ptah
    width: 7rem
    height: 2.4rem

    background-image: url('/img/ptah_logo.svg')
    background-size: cover
  & span._active
    display: inline-block
    width: 100%
    border: 2px dotted #00ADB6
    border-left: none
    border-radius: 0 2rem 2rem 0
    padding: .6rem .6rem .6rem 0
</style>
