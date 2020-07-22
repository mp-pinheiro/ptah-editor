<script>
import { StyleObject, Logo, Button } from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Header'
const NAME = 'HeaderAshOfGods03'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/843d7a37-47b3-4afe-8cd5-bfabde79a12c.jpg'
const DESCRIPTION = 'Lined up upper block with set of elements'

const defaultComponents = [
  {
    element: {
      styles: {
        'background-image': 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/f7fdc8f1-23ce-48ee-9749-ff807f15e5af.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '168px',
        'height': '51px'
      },
      media: {
        'is-mobile': {
          'margin-top': '0',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '0'
        }
      }
    }
  }
]
const defaultComponents2 = [
  {
    element: {
      text: 'ABOUT',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#ffffff',
        'text-align': 'center',
        'width': '100px',
        'height': '20px',
        'font-size': '1.4rem',
        'margin-right': '30px',
        'margin-left': '30px'
      },
      pseudo: {
        hover: {
          'color': '#9E1E0B !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    }
  },
  {
    element: {
      text: 'NEWS',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#ffffff',
        'text-align': 'center',
        'width': '100px',
        'height': '20px',
        'font-size': '1.4rem',
        'margin-right': '30px',
        'margin-left': '30px'
      },
      pseudo: {
        hover: {
          'color': '#9E1E0B !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    }
  },
  {
    element: {
      text: 'MEDIA',
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'background-image': 'none',
        'color': '#ffffff',
        'text-align': 'center',
        'width': '100px',
        'height': '20px',
        'font-size': '1.4rem',
        'margin-right': '30px',
        'margin-left': '30px'
      },
      pseudo: {
        hover: {
          'color': '#9E1E0B !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    }
  }
]

const defaultComponents3 = [
  {
    element: {
      text: 'BUY NOW',
      styles: {
        'background-color': '#B93A27',
        'color': '#ECD19A',
        'font-size': '1.6rem',
        'text-align': 'center',
        'width': '200px',
        'height': '53px',
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': '#ECD19A'
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'width': '191px',
          'height': '46px',
          'margin-left': '0',
          'margin-top': '100px',
          'margin-bottom': '30px'
        }
      },
      pseudo: {
        hover: {
          'color': '#fff !important',
          'background-color': 'rgba(0,0,0,0)'
        }
      }
    }
  }
]
const defaultSchema = {
  mainStyle: {
    hamPosition: 26,
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#0F1617',
      'padding-right': '13px',
      'padding-left': '13px',
      'padding-top': '13px',
      'padding-bottom': '13px'
    }
  },
  container: {
    styles: {
      'flex-direction': 'row',
      'justify-content': 'flex-start',
      'align-items': 'flex-start'
    },
    media: {
      'is-mobile': {
        'flex-direction': 'column',
        'margin-top': '-16px'
      }
    },
    width: 2,
    minWidth: 2,
    maxWidth: 4,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container'
  },
  container2: {
    styles: {
      'flex-direction': 'row',
      'justify-content': 'center'
    },
    media: {
      'is-mobile': {
        'flex-direction': 'column',
        'justify-content': 'flex-start',
        'align-items': 'center'
      }
    },
    width: 8,
    minWidth: 4,
    maxWidth: 8,
    grow: ['$sectionData.container', '$sectionData.container3'],
    selfName: '$sectionData.container2'
  },
  container3: {
    styles: {
      'flex-direction': 'row',
      'justify-content': 'center'
    },
    media: {
      'is-mobile': {
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center'
      }
    },
    width: 2,
    minWidth: 2,
    maxWidth: 4,
    grow: ['$sectionData.container', '$sectionData.container2'],
    selfName: '$sectionData.container3'
  },
  components: merge({}, defaultComponents),
  components2: merge({}, defaultComponents2),
  components3: merge({}, defaultComponents3),
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  cover: COVER,

  description: DESCRIPTION,

  mixins: [defaults, sectionMedia],

  $schema: {
    isHeader: true,
    mainStyle: StyleObject,
    container: StyleObject,
    container2: StyleObject,
    container3: StyleObject,
    components: [
      { name: 'Logo', element: Logo, type: 'image', class: 'b-header-logo', label: 'logo' }
    ],
    components2: [
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link' },
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link' },
      { name: 'Button', element: Button, type: 'button', class: 'b-header-link', label: 'link' }
    ],
    components3: [
      { name: 'Button', element: Button, type: 'button', class: 'b-header-button', label: 'button' }
    ],
    isToggle: false
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, defaultSchema))
    }
  },

  methods: {
    isOnlyOneButton ({ name }) {
      if (name !== 'Button') {
        return false
      }
      let buttons = this.$sectionData.components2.filter(({ name }) => name === 'Button')
      return buttons.length === 1
    },

    toggle () {
      this.$sectionData.isToggle = !this.$sectionData.isToggle
    }
  }
}
</script>

<template>
  <header
    v-styler:section="$sectionData.mainStyle"
    :class="[$sectionData.mainStyle.classes, {'_sticky' : $sectionData.mainStyle.sticky }]"
    :style="[$sectionData.mainStyle.styles, { '--bg-color': $sectionData.mainStyle.styles['background-color'] }, $sectionData.objVarsMedia]"
    class="b-smm-header b-fantasy-header b-section-header">

    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

    <div class="b-grid b-header">

      <button
        id="js-hamburger"
        class="hamburger hamburger--slider"
        type="button"
        :data-target="`#mobile-menu-${ _uid }`"
        :style="{'top': $sectionData.mainStyle.hamPosition + 'px'}"
        :class="[{ 'is-active': $sectionData.isToggle }]"
        @click.stop="toggle">

      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>

      </button>

      <div class="b-grid__row">
        <div class="b-grid__col-m-12 b-grid__col-l-12 mobile-header b-section-header__col" :class="`b-grid__col-${$sectionData.container.width}`">

          <sandbox
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            class="b-sandbox">

            <draggable
              v-model="$sectionData.components"
              :style="$sectionData.container.styles"
              class="b-draggable-slot b-draggable-slot_horizont"
              @start="$_drag('components')" @change="$_dragStop"
            >

              <div
                v-for="(component, index) in $sectionData.components"
                :key="`component-${ _uid }-${ index }`"
                v-if="$sectionData.components.length !== 0"
              >

                <component
                  v-styler:for="{
                    el: $sectionData.components[index].element,
                    type: $sectionData.components[index].type,
                    label: $sectionData.components[index].label,
                    path: `$sectionData.components[${index}].element`
                  }"
                  :is="component.name"
                  :href="component.element.link.href"
                  :target="component.element.link.target"
                  :style="component.element.styles"
                  :src="component.element.src"
                  :frameborder="component.element.frameborder"
                  :allow="component.element.allow"
                  :allowfullscreen="component.element.allowfullscreen"
                  :class="[component.element.classes, component.class]"
                  :path="`components[${index}].element`"
                  class="b-header-component">
                  <div v-html="$sectionData.components[index].element.text"></div>
                </component>

              </div>

            </draggable>

          </sandbox>

        </div>
        <div
          :id="`mobile-menu-${ _uid }`"
          class="b-grid__col-m-12 mobile-menu mobile-menu_drop"
          :class="[
            { 'mobile-menu_hide': !$sectionData.isToggle },
            { 'mobile-menu_hide': !$sectionData.isToggle },
            `b-grid__col-${$sectionData.container2.width + $sectionData.container3.width}`
          ]"
        >
          <div class="b-grid__row b-grid__row-mobile-column">
          <div :class="[`b-grid__col-${$sectionData.container2.width + parseInt($sectionData.container.width / 2)}`]">

            <sandbox
              container-path="$sectionData.container2"
              components-path="$sectionData.components2"
              class="b-sandbox">

              <draggable
                v-model="$sectionData.components2"
                :style="$sectionData.container2.styles"
                class="b-draggable-slot b-draggable-slot_horizont"
                @start="$_drag('components2')" @change="$_dragStop"
              >

                <div
                  v-for="(component, index) in $sectionData.components2"
                  :key="`component-${ _uid }-${ index }`"
                  v-if="$sectionData.components2.length"
                  :style="component.styles"
                  :class="{ 'b-button-one': isOnlyOneButton(component) }">

                  <component
                    v-styler:for="{
                      el: component.element,
                      type: component.type,
                      label: component.label,
                      path: `$sectionData.components2[${index}].element`
                    }"
                    :is="component.name"
                    :href="component.element.link.href"
                    :target="component.element.link.target"
                    :style="component.element.styles"
                    :src="component.element.src"
                    :frameborder="component.element.frameborder"
                    :allow="component.element.allow"
                    :allowfullscreen="component.element.allowfullscreen"
                    :class="[component.element.classes, component.class]"
                    :path="`components2[${index}].element`"
                    class="b-header-component">
                    <div v-html="$sectionData.components2[index].element.text"></div>
                  </component>

                </div>

              </draggable>

            </sandbox>

          </div>

          <div :class="[`b-grid__col-${$sectionData.container3.width + parseInt($sectionData.container.width / 2)}`]">

            <sandbox
              container-path="$sectionData.container3"
              components-path="$sectionData.components3"
              class="b-sandbox">

              <draggable
                v-model="$sectionData.components3"
                :style="$sectionData.container3.styles"
                class="b-draggable-slot b-draggable-slot_horizont"
                @start="$_drag('components3')" @change="$_dragStop"
              >

                <div
                  v-for="(component, index) in $sectionData.components3"
                  :key="`component-${ _uid }-${ index }`"
                  v-if="$sectionData.components3.length"
                  :style="component.styles"
                  :class="{ 'b-button-one': isOnlyOneButton(component) }">

                  <component
                    v-styler:for="{
                      el: component.element,
                      type: component.type,
                      label: component.label,
                      path: `$sectionData.components3[${index}].element`
                    }"
                    :is="component.name"
                    :href="component.element.link.href"
                    :target="component.element.link.target"
                    :style="component.element.styles"
                    :src="component.element.src"
                    :frameborder="component.element.frameborder"
                    :allow="component.element.allow"
                    :allowfullscreen="component.element.allowfullscreen"
                    :class="[component.element.classes, component.class]"
                    :path="`components3[${index}].element`"
                    class="b-header-component">
                    <div v-html="$sectionData.components3[index].element.text"></div>
                  </component>

                </div>

              </draggable>

            </sandbox>

          </div>
          </div>
        </div>
      </div>
    </div>

  </header>
</template>

<style lang="sass" scoped>
</style>
