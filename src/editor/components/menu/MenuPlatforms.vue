<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    inactiveColor: '#A2A5A5',
    items: [
      {
        name: 'is-mobile',
        icon: {
          name: 'platformMobile',
          width: 25,
          height: 25
        },
        tooltip: 'Mobile - 370px'
      },
      /*
      {
        name: 'is-laptop',
        icon: {
          name: 'platformLaptop',
          width: 20.5,
          height: 13.7
        }
      },
      */
      {
        name: 'is-desktop',
        icon: {
          name: 'platformDesktop',
          width: 28,
          height: 25
        },
        tooltip: 'Responsive'
      }
    ]
  }),

  computed: {
    ...mapState('Sidebar', [
      'device',
      'mainGreenColor'
    ])
  },

  watch: {
    disabled (value) {
      if (value) {
        this.selectDevice('is-desktop')
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'setControlPanel',
      'setDevice',
      'toggleSidebar',
      'toggleSectionsTreeMenu'
    ]),

    selectDevice (type) {
      this.setControlPanel(false)
      this.toggleSectionsTreeMenu(true)
      this.setDevice(type)
    }
  }
}
</script>

<template>
  <div class="b-menu-platforms b-on-boarding-tips-step-7">
    <button
      :disabled="disabled"
      v-for="(item, index) in items"
      class="b-menu-platforms__button"
      tooltip-position="bottom"
      :key="index"
      :tooltip="item.tooltip"
      :class="[
        `b-menu-platforms__button_${item.name}`,
        { '_active': device === item.name },
        { '_disabled': disabled }
      ]"
      @click.prevent="selectDevice(item.name)">
      <icon-base
        :name="item.icon.name"
        :width="item.icon.width"
        :height="item.icon.height"
        :color="device === item.name && !disabled ? mainGreenColor : inactiveColor">
      </icon-base>
    </button>
  </div>
</template>

<style lang="sass" scoped>
.b-menu-platforms
  width: 14rem
  height: 5.6rem
  border:
  padding: 1rem
  display: flex
  align-items: center
  justify-content: center
  &__button
    background-color: transparent

    padding: 0
    width: 4rem
    height: 4rem
    border: none

    display: flex
    align-items: center
    justify-content: center

    outline: none
    cursor: pointer
    & svg
      transition: 0.3s ease-in-out
    &:not(._disabled):hover
      svg
        fill: $main-green
    &:not(._disabled)._active
      color: $main-green
    &_mobile
      border-right: none
    &_laptop,
    &_desktop
      border-left: none
    @media only screen and (max-width: 1280px)
      &
        width: 2rem
        height: 2rem
        margin: 0 .5rem

</style>
