<template>
  <div class="b-project-name">
    <h1>Welcome, {{user.name}}</h1>

    <p class="b-project-name__intro">
      You’re just one step away from starting your landing! <br>
      Create a new project.
    </p>

    <div class="b-project-name__form">
      <base-text-field
        ref="name"
        class="b-project-name__input"
        v-model="projectName"
        label="Project name"
        placeholder="Enter a project name"
        :hasError="invalid"
        :errorText="$t('d.cmodalErrorText')"
        :maxLength="120"
      />
      <base-button
        color="transparent"
        size="small"
        @click="back"
       >
        Cancel
      </base-button>
      <base-button
        color="main-green"
        size="small"
        :disabled="projectName.length === 0"
        @click="onSubmit"
      >
        Create
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'TheProjectNamePage',

  data () {
    return {
      invalid: false
    }
  },

  computed: {
    ...mapState('User', ['user']),
    ...mapState('Onboarding', ['name']),

    projectName: {
      get () {
        return this.name
      },

      set (value) {
        this.setName(value)
      }
    }
  },

  created () {
    this.getUser()

    try {
      this.$gtag.event('Wizard_name', { 'event_category': 'LANDING' })
    } catch (e) {
      console.log(e)
    }
  },

  mounted () {
    this.projectName = ''
    this.$refs.name.$refs.inputText.focus()
  },

  methods: {
    ...mapActions('User', ['getUser']),
    ...mapMutations('Onboarding', ['setName']),

    onSubmit () {
      this.$router.push({ path: `/dashboard/wizard/goals` })
    },

    back () {
      this.projectName = ''
      this.$router.push({ path: `/dashboard/` })
    }
  }
}
</script>

<style lang="sass" scoped>
.b-project-name
  padding: 7.5rem 16.8rem
  text-align: center

  h1
    font-weight: bold
    font-size: 2.6rem
    line-height: 1.6
    color: $dark-grey
    max-width: 32rem
    word-break: break-word

  &__intro
    font-weight: 600
    font-size: 1.2rem
    line-height: 1.8rem
    margin: 2rem 0 4rem
    color: #A2A5A5

  &__input
    text-align: left
    margin-bottom: 3rem

    /deep/
      input
        height: 4.5rem
        font-size: 1.6rem
</style>
