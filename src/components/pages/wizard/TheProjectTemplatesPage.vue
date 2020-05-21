<template>
  <div class="b-project-templates">
    <aside class="b-project-templates__left">
      <h1>What would you like your langing page to do?</h1>
      <ul class="b-project-templates__goals-list">
        <li class="b-project-templates__goal"
            :class="{ 'selected': g.id === goal }"
            v-for="(g, index) in goals"
            :key="index"
            @click="selectGoal(g)">
          <img :src="g.icon" :alt="g.name">
          <div class="b-project-templates__goal-name">{{g.name}}</div>
        </li>
      </ul>
    </aside>
    <div class="b-project-templates__container">
      <base-scroll-container>
        <div class="b-project-templates__container--list">
            <figure
              class="b-project-templates__template"
              :class="{ selected:  selectedPreset === template.id}"
              v-for="(template, index) in presetsList"
              :key="index"
              @click="selectPreset(template)"
            >
              <img :src="template.image" :alt="template.type">
              <ul class="b-project-templates__template-palette">
                <li><icon-base name="palette" width="14" color="#A2A5A5"></icon-base></li>
                <li
                  class="color"
                  v-for="(color, index) in template.palette"
                  :key="index"
                  :style="{ 'background-color': color }"></li>
              </ul>
            </figure>
        </div>
      </base-scroll-container>
      <div class="b-project-templates__container--controls">
        <base-button
          color="main-green"
          size="small"
          :disabled="selectedPreset === null"
          @click="$router.push({ path: `/dashboard/wizard/welcome` })">
          next
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import filter from 'lodash-es/filter'
import IconBase from '../../base/icons/IconBase'

export default {
  name: 'TheProjectTemplatesPage',
  components: { IconBase },
  data () {
    return {
      selectedPreset: null
    }
  },

  computed: {
    ...mapState('Onboarding', ['goals', 'goal', 'presets']),

    presetsList () {
      return filter(this.presets, (o) => o.categories.indexOf(this.goal) > -1)
    }
  },

  methods: {
    ...mapMutations('Onboarding', ['setGoal', 'setPreset']),

    selectGoal (goal) {
      this.selectedPreset = null
      this.setGoal(goal.id)
    },

    selectPreset (preset) {
      this.selectedPreset = preset.id
      this.setPreset(preset)
    }
  }
}
</script>

<style lang="sass" scoped>
.b-project-templates
  display: flex
  overflow: hidden
  border-radius: 10px

  h1
    font-weight: 600
    font-size: 1.4rem
    line-height: 2.4rem
    text-align: center
    padding: 0 1.7rem
    margin: 3rem 0 2.3rem

  &__left
    width: 22rem
    background: #FFFFFF
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.12)

  &__container
    width: 52rem
    display: flex
    flex-direction: column

    &--list
      flex-grow: 1
      height: 44.2rem
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      padding: 3.6rem 5.2rem

    &--controls
      height: 7rem
      background: #F3F6F6
      display: flex
      justify-content: flex-end
      align-items: center
      padding: 2.7rem

  &__goals-list
    margin: 0
    padding: 0
    border-top: 1px solid rgba(165,165,165,.1)

  &__goal
    display: flex
    align-items: center
    padding: 1.7rem .7rem 1.7rem 2.2rem
    transition: all .2s ease-out
    color: #A2A5A5
    cursor: pointer
    font-weight: 600

    &:hover, &.selected
      color: $dark-grey

      img
        filter: none

    img
      width: 4.4rem
      margin-right: 2rem
      filter: grayscale(1)

    &-name
      font-size: 1.2rem
      line-height: 1.6rem

  &__template
    padding: 0
    margin: 0 0 3.3rem
    width: 20rem
    cursor: pointer

    img
      width: 20rem
      height: 13.5rem
      transition: all .2s ease-out
      border-radius: 3px
      margin-bottom: 1rem

    &.selected img
      border: 3px solid $main-green
      box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.2)

    &-palette
      display: flex
      align-items: center
      margin: 0
      padding: 0

      li
        list-style: none
        margin: 0
        padding: 0

      li:first-child
        margin-right: 1.2rem

      .color
        width: 1.2rem
        height: 1.2rem
        border-radius: 50%
        margin-right: .2rem
</style>
