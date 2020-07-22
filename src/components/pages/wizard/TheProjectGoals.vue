<template>
  <div class="b-project-goals">
    <h1>What would you like your landing page to do?</h1>

    <div class="b-project-goals__list">
      <figure
        class="b-project-goals__item"
        v-for="(goal, index) in goals"
        :key="index"
        @click="selectGoal(goal)">
        <img :src="goal.icon" :alt="goal.name">
        <figcaption>{{goal.name}}</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'TheProjectGoals',

  computed: {
    ...mapState('Onboarding', ['goals', 'presets'])
  },

  mounted () {
    try {
      this.$gtag.event('Wizard_goals', { 'event_category': 'LANDING' })
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    ...mapMutations('Onboarding', ['setGoal', 'setPreset']),

    selectGoal (goal) {
      this.setGoal(goal.id)
      if (goal.id === 0) { // blank page
        this.setPreset(0)
        this.$router.push({ path: `/dashboard/wizard/welcome` })
      } else {
        this.$router.push({ path: `/dashboard/wizard/templates` })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.b-project-goals
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

  h1
    font-weight: 600
    font-size: 2.4rem
    line-height: 3.5rem
    color: $dark-grey
    margin-bottom: 8rem

  &__list
    display: flex
    justify-content: flex-start
    flex-wrap: wrap
    width: 77.5rem

  &__item
    width: 24.5rem
    height: 19rem
    margin: 0 0 2rem 0
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    transition: all .2s ease-out
    cursor: pointer

    figcaption
      font-weight: 600
      font-size: 1.4rem
      line-height: 1.3
      color: $dark-grey
      margin: 2rem 0 .7rem

    &:hover
      box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.08)
      border-radius: 5px
</style>
