<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenPrimitive02'
const BG_SECTION = 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/6a5ba3c8-2d52-4754-811a-06bece6aa46a.jpg)'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/486a762b-cc65-4b5d-88bb-4b55a80dd538.jpg'
const DESCRIPTION = 'Primitive main screen'

const COMPONENTS_1 = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text-fs',
    label: 'text'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text-fs',
    label: 'text'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-fs',
    label: 'button'
  }
]

const C_CUSTOM_1 = [
  {
    element: {
      text: '<p>GAME NAME</p>',
      styles: {
        'font-size': '2rem',
        'line-height': '1.3',
        'color': '#848484',
        'text-align': 'center'
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'padding-right': '0'
        }
      }
    }
  },
  {
    element: {
      text: '<h1>Enter the action</h1>' +
        '<h1>sentence</h1>',
      styles: {
        'font-size': '6.4rem',
        'line-height': '1.3',
        'color': '#848484',
        'text-align': 'left',
        'margin-top': '24px',
        'margin-bottom': '20px'
      },
      media: {
        'is-mobile': {
          'font-size': '3.2rem',
          'line-height': '1.4',
          'margin-top': '24px',
          'margin-bottom': '24px',
          'padding-right': '0',
          'text-align': 'center'
        }
      }
    }
  },
  {
    element: {
      text: 'CALL TO ACTION',
      styles: {
        'background-color': '#575A5F',
        'color': '#ffffff',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '247px',
        'height': '65px',
        'border-radius': '50px',
        'border-width': '0px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'width': '191px',
          'height': '46px',
          'margin-top': '24px'
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

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-size': 'auto',
      'background-color': '#E5E5E5',
      'background-repeat': 'no-repeat',
      'background-position': '80% 50%',
      'height': '100vh',
      'padding-top': '100px',
      'padding-bottom': '100px',
      'padding-left': '32px',
      'padding-right': '32px'
    },
    media: {
      'is-mobile': {
        'background-position': '50% 50%',
        'padding-bottom': '60px'
      }
    },
    overlay: {
      color: '#000000',
      opacity: '0'
    },
    parallax: true
  },
  components1: merge({}, C_CUSTOM_1),
  container1: {
    width: 10,
    styles: {
      'flex-direction': 'column',
      'justify-content': 'center',
      'align-items': 'flex-start'
    },
    media: {
      'is-mobile': {
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center'
      }
    }
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: DESCRIPTION,

  mixins: [defaults, sectionMedia],

  cover: COVER,

  $schema: {
    mainStyle: types.StyleObject,
    container1: types.StyleObject,
    components1: COMPONENTS_1
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  }
}
</script>

<template>
  <section
    class="b-first-screen-ash-of-gods-01"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div
            class="b-grid__col-m-12"
            :class="`b-grid__col-${$sectionData.container1.width}`"
        >
          <sandbox
            container-path="$sectionData.container1"
            components-path="$sectionData.components1"
            class="b-sandbox">
            <draggable
              v-model="$sectionData.components1"
              class="b-draggable-slot b-draggable-slot_100"
              :style="$sectionData.container1.styles"
              @start="$_drag('components1')"
              @change="$_dragStop"
            >
              <div
                v-for="(component, index) in $sectionData.components1"
                v-if="$sectionData.components1.length !== 0" :key="index"
              >
                <component
                  v-styler:for="{
                    el: $sectionData.components1[index].element,
                    path: `$sectionData.components1[${index}].element`,
                    type: $sectionData.components1[index].type,
                    label: component.label
                  }"
                  :is="component.name"
                  :href="$sectionData.components1[index].element.link.href"
                  :target="$sectionData.components1[index].element.link.target"
                  :path="`components1[${index}].element`"
                  :style="$sectionData.components1[index].element.styles"
                  :class="[
                    $sectionData.components1[index].element.classes,
                    $sectionData.components1[index].class
                  ]"
                >
                  <div v-html="$sectionData.components1[index].element.text"></div>
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
</style>
