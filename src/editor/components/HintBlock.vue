<template>
  <div class="b-hint-block">
    <div class="b-hint-block__text">
      <span class="b-hint-block__icon">
        <IconBase
          width="20"
          height="20"
          name="info"
          color="#FFCF0D"
        />
      </span>
      <span>
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HintBlock',

  props: {
    text: String
  }
}
</script>

<style lang="sass" scoped>
  .b-hint-block
    width: 25rem
    margin: 0 auto
    &__pic
      display: block
      width: 22rem
      margin: 7rem auto 4rem
    &__icon
      width: 2rem
      height: 2rem
      margin: 0 2rem 0 0
    &__text
      display: flex
      align-items: flex-start

      font-weight: 600
      font-size: 1.2rem
      line-height: 1.6rem
      letter-spacing: 0.065em
</style>
