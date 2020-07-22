<template>
  <div class="b-checklist-item" :class="{ 'active' : active }">
    <div class="b-checklist-item__row">
      <div class="b-checklist-item__mark">
        <icon-base name="checkMark" width="15" />
      </div>
      <div class="b-checklist-item__text">
        <slot />
      </div>
    </div>
    <slot class="b-checklist-item__description" name="description" />
  </div>
</template>

<script>
export default {
  name: 'CheckListItem',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
.b-checklist-item
  margin-bottom: 1.5rem
  $this: &

  &__row
    display: flex
    justify-content: stretch
    align-items: center

  &.active
    #{$this}__mark
      background: $main-green
    #{$this}__text
      color: $main-green

  &__mark
    width: 2.6rem
    min-width: 2.6rem
    height: 2.6rem
    display: flex
    justify-content: center
    align-items: center
    border-radius: 50%

    background: #CACBCB

    svg
      fill: #fff

  &__text
    width: 100%
    font-size: 1.2rem
    font-weight: bold
    letter-spacing: 0.065em
    line-height: 1.6rem
    text-transform: uppercase
    margin-left: 1.5rem

    color: #CACBCB

  &__description
    font-size: 1rem
    letter-spacing: 0.065em
    line-height: 1.5rem
    margin-left: 4.2rem
    padding-top: 0.6rem

    color: #575A5F
</style>
