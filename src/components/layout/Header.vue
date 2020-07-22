<template>
  <header class="b-page__header b-header" v-if="this.isStorefrontPreview == false">

    <div class="b-header__logo">
      <img src="https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/88a20e2f-9d25-4a37-9b2e-e7f68727837a.png" alt="Ptah logo">
    </div>

    <!-- TODO: need translations -->
    <!--<div class="b-locale-changer">
      <BaseSelect
        :options="select.options"
        v-model="select.selected"
        >
      </BaseSelect>
    </div>-->
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComponent',
  data () {
    return {
      isStorefrontPreview: false,
      colorHamburger: '#333',
      colorHome: '#333',
      select: {
        options: [
          { name: 'en', value: 'en' },
          { name: 'ru', value: 'ru' }
        ],
        selected: { name: 'en', value: 'en' }
      }
    }
  },
  watch: {
    storefrontPreview: {
      handler: function (status, old) {
        this.isStorefrontPreview = status
      },
      deep: true
    },
    select: {
      handler: function (status, old) {
        this.$i18n.locale = status.selected.value
        localStorage.setItem('locale', status.selected.value)
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['storefrontPreview'])
  },
  mounted () {
    this.select.selected = { name: this.$i18n.locale, value: this.$i18n.locale }
  },
  methods: {
    returnToBoard () {
      this.$router.push('/dashboard/')
    },
    pageIs (page) {
      return this.$route.path.indexOf(page) === 0
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/sass/_colors.sass'
@import '../../assets/sass/_variables.sass'

.b-page__header
  width: 100%
  padding: 4rem 6.5rem 1.7rem

  position: relative
  z-index: 10

  display: flex
  justify-content: space-between
  align-items: center
  &-menu
    width: 1.8rem
  &-crumbs
    width: 100%
    padding: 0 $size-step

    display: flex
    align-items: center
    &-home
      padding: 0  $size-step/4
      &_active
        cursor: pointer
        color: $grey
        opacity: 0.5
        &:hover
          opacity: 1
.b-locale-changer
  .b-pth-base-select
    border-bottom: 1px solid transparent
    &:hover
      border-bottom: 1px solid transparent
  .b-pth-base-select__dropdown
    max-height: 7rem !important
</style>
