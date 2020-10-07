<template>
  <div class="b-base-switch-tabs">
    <div class="b-base-switch-tabs__label" v-if="label != ''">
      <base-label>
        {{ label }}
      </base-label>
    </div>
    <div class="b-base-switch-tabs__row">
      <button class="b-base-switch-tabs__button"
        type="button"
        v-for="(item, index) in list"
        :key="index"
        :class="{'_selected': isSelected(item.value)}"
        :title="item.tooltipText"
        @click="selectItem(item.value)">

        <IconBase
          width="12"
          height="12"
          class="b-base-switch-tabs-button__icon"
          v-if="item.iconName"
          :name="item.iconName"
          :color="color"
          :strokeColor="strokeColor"
        />
        <span
          class="b-base-switch-tabs-button__text"
          v-if="item.text"
          v-html="item.text"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    /**
     * Items list
     * list item should containt either text or iconName property
     *
     * @type {{value: string, ?text: string, ?iconName: string, ?tooltipText: string }[]}
     */
    list: {
      required: true,
      type: Array
    },

    /**
     * Selected value
     * Depending on its type string the component behaves differently
     *
     * @type {string}
     */
    value: {
      required: true
    },

    label: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: '#575A5F'
    },

    strokeColor: {
      type: String,
      default: 'transparent'
    }
  },

  methods: {
    isSelected (itemValue) {
      if (this.isMultiple) {
        return this.value.indexOf(itemValue) !== -1
      }
      return this.value === itemValue
    },

    selectItem (itemValue) {
      let value
      if (this.isMultiple) {
        value = this.value.slice()
        const index = this.value.indexOf(itemValue)
        if (index === -1) {
          value.push(itemValue)
        } else {
          value.splice(index, 1)
        }
      } else {
        value = itemValue
      }
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

$tabs-bg: #EEF9FA

@mixin button-style-reset()
  border: 0
  margin: 0
  padding: 0
  background: transparent
  display: inline
  font-size: inherit
  font-family: inherit
  overflow: visible

.b-base-switch-tabs
  width: auto
  margin: 0 auto
  &__label
    margin-bottom: 1.6rem
  &__row
    display: flex
    justify-content: center
    align-items: center

    background: #FFFFFF
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15)
    border-radius: 18px
  &__button
    @include button-style-reset
    cursor: pointer
    transition: all .2s ease-out

    display: flex
    flex-basis: 0
    flex-grow: 1
    flex-shrink: 0
    justify-content: center
    align-items: center
    position: relative
    z-index: 0

    background-color: transparent
    color: #A2A5A5

    height: 3rem
    padding: $size-step/4 $size-step
    margin: 0
    font-size: 1.2rem
    font-weight: 600
    white-space: nowrap

    outline: none
    &:hover
      color: $main-green
    &._selected
      background-color: $main-green
      border-radius: 18px
      color: #fff

      z-index: 1
    &._selected,
    &._selected:hover
      fill: #575A5F

    &__icon + &__text
      margin-left: 0.6rem
</style>
