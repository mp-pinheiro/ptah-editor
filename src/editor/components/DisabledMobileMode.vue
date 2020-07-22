<template>
  <div class="b-disabled-mobile-mode">
    <img
      src="https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/280afe9a-21e5-4ea4-83aa-397a2b497242.png"
      class="b-disabled-mobile-mode__pic"
      alt="">
    <div class="b-disabled-mobile-mode__text">
      <span class="b-disabled-mobile-mode__icon">
        <IconBase
          width="20"
          height="20"
          name="info"
          color="#FFCF0D"
        />
      </span>
      <span>
        Disabled for the mobile mode. Switch on Desktop for section’s settings
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisabledMobileMode'
}
</script>

<style lang="sass" scoped>
  .b-disabled-mobile-mode
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
