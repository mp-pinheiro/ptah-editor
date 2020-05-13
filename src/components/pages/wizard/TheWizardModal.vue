<template>
  <transition name="slide-fade">
    <div class="b-wizard-modal__overlay">
      <div class="b-wizard-modal__content">
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheWizardModal'
}
</script>

<style lang="sass" scoped>
.b-wizard-modal
  &__overlay
    display: flex
    justify-content: center
    align-items: center

    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(0,0,0, .4)
  &__content
    background: #FFFFFF
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)
    border-radius: 10px
    min-width: 66rem
    min-height: 47rem

// Animations
.slide-fade
  &-enter-active
    transition: all .2s ease

  &-leave-active
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0)

  &-enter,
  &-leave-to
    opacity: 0
    transform: translateX(-0.8rem)
</style>
