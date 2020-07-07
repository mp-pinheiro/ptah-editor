<template>
  <div class="menu-tree-item" @click="$emit('click', $event)" @click.ctrl="onClickCtrl">
    <div class="menu-tree-item__header-sign">
      <IconBase name="lock" />
    </div>
    <div class="menu-tree-item__drag">
      <IconBase name="dragNew" class="drag-ico" />
      <IconBase
        class="section-ico"
        :name="groupSrc[section.group].ico"
        :width="groupSrc[section.group].width"
      />
    </div>
    <div
      class="menu-tree-item__name"
      :class="{ '_short' : areAdditionSettings }"
    >
      <span>
        {{ section.group }}
      </span>
    </div>
    <div class="menu-tree-item__controls">
      <span
        v-if="areAdditionSettings"
        class="menu-tree-item__control"
        title="Settings"
        @click="showAdditionSettings(panels[section.group], section)">
        <IconBase
          width="20"
          height="20"
          name="settingsFill"
          color="#A2A5A5"
        />
      </span>
      <span
        class="menu-tree-item__control"
        title="Size and margins"
        @click="showSettingsBar(section)">
        <IconBase
          width="24"
          height="18"
          name="overscan"
        />
      </span>
      <span
        class="menu-tree-item__control"
        title="Background image and video"
        @click="showBackgroundPanel(section)">
        <IconBase
          name="backgroundGrey"
        />
      </span>
    </div>
  </div>
</template>

<script>
import { find, merge } from 'lodash-es'
import { mapActions, mapState } from 'vuex'
import { resetIndents } from '@editor/util'

const GROUPS = [
  'Slider',
  'Columns',
  'Galleries',
  'Products',
  'Forms',
  'Elements'
]

const PANELS = {
  'Slider': 'SectionSliderSettings',
  'Columns': 'SectionColumnsSettings',
  'Galleries': 'SectionGallerySettings',
  'Products': 'SectionProductsColumnsSettings',
  'Forms': 'SectionFormSettings',
  'Elements': 'SectionSystemSettings'
}

export default {
  name: 'MenuTreeItem',
  props: {
    section: {
      required: true
    },
    isGroupItem: {
      required: false
    },
    builder: {
      required: true
    }
  },

  data () {
    return {
      panels: PANELS,
      groupSrc: {
        Header: {
          ico: 'sectionHeader',
          width: 25
        },
        FirstScreen: {
          ico: 'sectionFirstScreen',
          width: 18
        },
        Columns: {
          ico: 'sectionColumns',
          width: 26
        },
        Elements: {
          ico: 'sectionElements',
          width: 20
        },
        Footer: {
          ico: 'sectionFooter',
          width: 23
        },
        Forms: {
          ico: 'sectionForms',
          width: 21
        },
        Galleries: {
          ico: 'sectionGallery',
          width: 26
        },
        Products: {
          ico: 'sectionProducts',
          width: 26
        },
        Slider: {
          ico: 'sectionSlider',
          width: 32
        }
      }
    }
  },

  computed: {
    ...mapState('Sidebar', [
      'sectionsGroups'
    ]),

    areAdditionSettings () {
      if (this.section.group !== 'Elements') {
        if (GROUPS.indexOf(this.section.group) !== -1) {
          return true
        }
      } else if (this.section.name.indexOf('SystemRequirements') !== -1) {
        if (GROUPS.indexOf(this.section.group) !== -1) {
          return true
        }
      }
    }
  },

  methods: {
    ...mapActions('Sidebar', [
      'setSettingSection',
      'clearSettingObject',
      'setControlPanel',
      'setElement'
    ]),

    ...mapActions('Landing', [
      'saveState'
    ]),

    onClickCtrl () {
      if (!this.isGroupItem) {
        this.$emit('select', this.section)
      }
    },

    showSettingsBar (section) {
      this.setElement(document.getElementById(`section_${section.id}`))
      this.setSettingSection(section)
      this.setControlPanel('Section')
    },

    showBackgroundPanel (section) {
      this.setControlPanel('SectionBackground')
      this.setSettingSection(section)
    },

    deleteSection (section) {
      // update group
      if (this.isSlaveSection(section.id)) {
        let master = find(this.sectionsGroups, o => o.children.indexOf(section.id) > -1).main
        let absorb = master.data.mainStyle.absorb
        master.set('$sectionData.mainStyle', merge({}, master.data.mainStyle, { absorb: absorb - 1 }))
      }

      this.builder.remove(section)
      this.clearSettingObject()

      resetIndents()

      this.$emit('delete', section)

      this.saveState(this.builder.export('JSON'))
    },

    isMasterSection () {
      return !!find(this.sectionsGroups, o => o.main.id === this.sectionId)
    },

    isSlaveSection (sectionId) {
      return !!find(this.sectionsGroups, o => o.children.indexOf(sectionId) > -1)
    },

    async showAdditionSettings (panel, section) {
      this.setSettingSection(section)

      await this.$nextTick()

      this.setControlPanel(panel)
    }
  }
}
</script>

<style lang="sass" scoped>
  .menu-tree-item
    color: #A2A5A5
    font-size: 1.6rem
    line-height: 1.6rem

    display: flex
    justify-content: flex-start
    align-items: center

    max-width: 28rem
    height: 5rem
    padding: 1.3rem 1.1rem 1.3rem 1.6rem
    margin: 0 0 0 1.3rem
    cursor: pointer
    $this: &

    &__drag
      width: 3rem
      margin-right: 1.2rem
      text-align: center
      cursor: move

      .drag-ico
        display: none
        svg
          fill: #A2A5A5
          width: .4rem
          height: 1.6rem
          margin-bottom: -1px !important

    &__header-sign
      display: none
      width: 3rem
      margin-right: 1.2rem
      text-align: center
      svg
        fill: #A2A5A5
        width: 1.6rem
        height: 2.1rem
        margin-bottom: -1px !important

    &__name
      width: 14rem
      > span
        display: block
        width: 14rem
        overflow: hidden
        text-overflow: ellipsis
      &._short
        width: 10rem
        > span
          width: 10rem
    &.group-node &__name._short
        width: 6rem !important
        > span
          width: 6rem !important

    &:hover
      background: rgba(0, 0, 0, 0.05)
      & svg
        fill: #575A5F
      .menu-tree-item__name
        color: #575A5F
      #{$this}__drag
        .drag-ico
          display: block
        .section-ico
          display: none

    &:active
      box-shadow: 0 4px 16px rgba($black, 0.25)

    &.selected
      background: rgba(0, 173, 182, 0.1)
      .menu-tree-item__name
        color: #575A5F

    &.isHeader
      .menu-tree-item__drag
        display: none
      .menu-tree-item__header-sign
        display: block

    &__controls
      display: flex
      justify-content: flex-end
      flex-grow: 1
      opacity: .8

    &__control
      margin-left: 1.6rem

      &:hover
        color: $main-green
</style>
