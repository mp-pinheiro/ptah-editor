<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Forms'
const NAME = 'FirstScreenPrimitive03'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/b804e1c9-674e-4faa-829f-1dfb948beac8.jpg'
const DESCRIPTION = 'Primitive screen with form'

const COMPONENTS_1 = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo-fs',
    label: 'logo'
  },
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
    name: 'Form',
    element: types.Form,
    type: 'form',
    class: 'b-form',
    label: 'form'
  }
]

const C_CUSTOM_1 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/ccd3d56e-e50e-4d05-acac-a0de41413f34.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '246px',
        'height': '96px'
      },
      media: {
        'is-mobile': {
          'width': '246px',
          'height': '96px'
        }
      }
    }
  },
  {
    element: {
      text: '<h1><strong>Game name</strong></h1>',
      styles: {
        'font-size': '6.2rem',
        'line-height': '1.3',
        'color': '#A2A5A5',
        'text-align': 'left',
        'margin-top': '90px',
        'margin-bottom': '20px'
      },
      media: {
        'is-mobile': {
          'font-size': '3.2rem',
          'line-height': '1.4',
          'margin-top': '25px',
          'margin-bottom': '25px',
          'padding-right': '0'
        }
      }
    }
  },
  {
    element: {
      text: '<p>Amet minim mollit non deserunt ullamco est ' +
        'sit aliqua dolor do amet sint. Velit officia ' +
        'consequat duis enim velit mollit.</p>',
      styles: {
        'font-size': '2rem',
        'line-height': '1.3',
        'color': '#A2A5A5',
        'text-align': 'left'
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
      placeholder: 'Paste your email',
      buttonText: 'CALL TO ACTION',
      styles: {
        'color': '#A2A5A5',
        'border-radius': '0',
        'font-weight': 'normal',
        'font-style': 'normal',
        'font-size': '1.4rem',
        'text-decoration': 'none',
        'margin-top': '60px',
        'margin-left': '-8px'
      },
      formStyles: {
        'button-color': '#A2A5A5',
        'buttonHoverColor': '848484',
        'buttonTextColor': '#ffffff',
        'buttonHoverTextColor': '#ffffff',
        'inputBgColor': '#E5E5E5',
        'border-radius': '0',
        'height': 55
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-size': 'auto',
      'background-color': '#F3F6F6',
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
