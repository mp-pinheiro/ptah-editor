<template>
  <div
    class="variants"
    :class="{ 'variants__active': open }"
    @click="open = !open"
    v-click-outside="close"
  >
    <div class="variants__toggle">
      Style: {{ `${tempStyles.weight}${tempStyles.style === 'normal' ? '' : 'italic' }` }}
    </div>
    <div class="variants__container-list">
      <base-scroll-container>
        <ul class="variants__list">
          <li class="variants__item"
              v-for="(variant, index) in variants"
              :key="index"
              @click="toggleVariantStatus(variant)"
          >
          <span
            class="variants__check"
            v-if="variant.status"
          >
            <icon-base name="checkMark" width="12" height="15" />
          </span>
            {{ variant.name }}
          </li>
        </ul>
      </base-scroll-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FontVariants',

  props: {
    font: {
      type: Object,
      required: true
    },
    tempStyles: {
      type: Object,
      required: true
    },
    variants: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      open: false
    }
  },

  methods: {
    close () {
      this.open = false
    },

    toggleVariantStatus (variant) {
      this.$emit('input', { font: this.font, variant: variant.name })
    }
  }
}
</script>

<style lang="sass" scoped>
$w: 100%
$h: 4rem

.variants
  position: relative
  width: $w
  $this: &

  &__active
    #{$this}__toggle
      background: rgba(0, 173, 182, 0.1)
      box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.15)
    #{$this}__container-list
      overflow: auto
      min-height: $h * 2.5

  &__toggle
    color: $main-green
    width: $w
    height: $h

    padding-left: 1.8rem

    display: flex
    align-items: center
    justify-content: flex-start

    cursor: pointer
    font-size: 1.4rem

  &__container-list
    position: absolute
    top: $h
    overflow: hidden
    width: $w
    height: 0
    padding: 0
    border-radius: 0 0 5px 5px
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25)
    transition: all .2s ease-out
    background: #fff
    z-index: 2

    max-height: 20rem
  &__list
    margin: 0
    padding: 0

  &__item
    height: 3.5rem
    width: 100%
    padding: 0 2.7rem
    display: flex
    align-items: center
    font-size: 1.2rem
    cursor: pointer

    &:hover
      background: rgba(0, 173, 182, 0.05)
      color: $main-green

    svg
      fill: $main-green
      margin: 2px 0 0 -17px
</style>
