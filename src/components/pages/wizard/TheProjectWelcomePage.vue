<template>
  <div class="b-project-welcome">
    <img src="https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/image/2a0b5386-028b-425f-a1f4-bb3ccd5088bb.png" alt="">

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
          size="small">
          Skip tour
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheProjectWelcomePage',

  methods: {
    start () {
      this.$router.push({ path: `/dashboard/wizard/logo` })
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
</style>
