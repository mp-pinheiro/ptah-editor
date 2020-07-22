<template>
  <div class="b-login">
    <div class="b-login__inner">

      <div class="b-login__description">
        <h1>p1.Ptah</h1>
        <p>
          Ptah is a free, powerful and open source Web Builder Framework helping you to fast create modern cross
          browser landing pages for the games and e-commerce. Mainly Ptah designed to be used as a separate product
          or like edit component inside CMS to speed up the creation of landing pages.
        </p>

        <div class="b-login__github">
          <a href="https://github.com/ProtocolONE/storefront" target="_blank">
            <img src="https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/1cc7241c-3722-4112-8ffc-cb7b296caba2.png" alt="Github">
          </a>
        </div>

        <p></p>
      </div>

      <div class="b-login__form">
        <form @submit.prevent="submit">
          <div><input type="email" v-model="email" placeholder="email"></div>
          <div><input type="password" v-model="password" placeholder="password" /></div>
          <div><button type="submit">Submit</button></div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',

  data () {
    return {
      email: '',
      password: ''
    }
  },

  beforeRouteEnter (to, from, next) {
    if (process.env.VUE_APP_PROD === '1') {
      window.location.href = `${process.env.VUE_APP_DOMAIN}/login`
    }
    next()
  },

  methods: {
    ...mapActions('User', ['login']),

    submit () {
      this.login({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push('/dashboard')
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.b-login
  background: $dark-blue
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center

  &__form
    div
      padding: 1rem 0
    input, button
      padding: .5rem

  &__inner
    height: 50rem
    width: 80rem
    display: flex

    &> div
      flex-basis: 50%
  &__description
    color: rgba($white, .8)
    padding-right: 3rem

    p
      font-size: 1.5rem
      line-height: 1.6
      margin: 0
      padding: 1rem 0

    h1
      font-size: 4.8rem
      color: $white

  &__github
    width: 5rem
    height: 5rem
    border-radius: 50%
    margin-top: 3rem

    img
      max-width: 100%

  &__already
    color: #FFFFFF
    font-size: 1.7rem
    line-height: 2.6rem
    a
      font-size: 3rem
      color: $emerald-green
      text-decoration: none
      &:hover
        text-decoration: underline

iframe
  border: none
  outline: none
</style>
