<template>
  <div class="b-project-welcome">
    <img
      src="https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/a0a569c1-d89a-4bf8-bfda-28483f4b264f.png"
      class="b-project-welcome__pic"
      alt="">

    <h1>First, let’s upload your elements!</h1>

    <p class="b-project-welcome__intro">Create an elements library to simplify editing of your landing page.</p>

    <div class="b-project-welcome__controls">
      <div>
        <base-button
          color="main-green"
          size="small"
          @click="start"
        >
          Let’s start
        </base-button>
      </div>
      <div>
        <base-button
          color="transparent"
          size="small"
          @click="skipSteps"
          :disabled="skip"
        >
          Skip tour
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheProjectWelcomePage',

  data () {
    return {
      skip: false
    }
  },

  mounted () {
    try {
      this.$gtag.event('Wizard_welcome', { 'event_category': 'LANDING' })
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    start () {
      this.$router.push({ path: `/dashboard/wizard/logo` })
    },

    skipSteps () {
      this.skip = true
      this.$emit('skipSteps')
    }
  }
}
</script>

<style lang="sass" scoped>
.b-project-welcome
  margin: 5.8rem 14rem 3rem
  text-align: center

  h1
    font-weight: bold
    font-size: 2.6rem
    line-height: 6.6rem
    color: $dark-grey

  &__intro
    font-size: 1.2rem
    line-height: 1.8rem
    margin: 2rem 0 4rem
    color: #A2A5A5

  &__pic
    width: 19rem
    height: 14rem
</style>
