<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenSky02'
const BG_SECTION = 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/8f281505-6207-4460-84ef-0c88dd86167e.jpg)'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/adb9a6eb-edae-4b04-9ec3-2e8faa3e4562.jpg'
const DESCRIPTION = 'Main screen with timer'

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
      styles: {
        'background-image': 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/6276c239-7f3b-404d-b630-a14db18d91c9.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '230px',
        'height': '164px'
      },
      media: {
        'is-mobile': {
          'width': '230px',
          'height': '164px'
        }
      }
    }
  },
  {
    element: {
      text: '<h3><strong>Something amazing is coming soon</strong></h3>',
      styles: {
        'font-size': '1.8rem',
        'line-height': '1.3',
        'color': '#56319F',
        'text-align': 'center',
        'margin-top': '40px',
        'margin-bottom': '10px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.4rem',
          'line-height': '1.3',
          'margin-top': '25px',
          'margin-bottom': '0',
          'padding-right': '0'
        }
      }
    }
  },
  {
    element: {
      text: '<p><strong>It’s time to take new gaming experience</h1>',
      styles: {
        'font-size': '4.6rem',
        'line-height': '1.3',
        'color': '#ffffff',
        'text-align': 'center',
        'margin-top': '0',
        'margin-bottom': '40px'
      },
      media: {
        'is-mobile': {
          'font-size': '2.2rem',
          'line-height': '1.4',
          'margin-top': '0',
          'margin-bottom': '25px',
          'padding-right': '0'
        }
      }
    }
  },
  {
    element: {
      text: 'BUY NOW',
      styles: {
        'background-color': '#F04B4C',
        'color': '#ffffff',
        'font-size': '2.4rem',
        'text-align': 'center',
        'width': '214px',
        'height': '54px',
        'border-radius': '50px',
        'border-width': '0',
        'margin-top': '50px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.8rem',
          'width': '191px',
          'height': '46px'
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
      'background-color': '#ffffff',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll',
      'background-position': '50% 0',
      'background-size': 'cover',
      'height': '100vh',
      'padding-top': '20px',
      'padding-bottom': '150px',
      'padding-left': '32px',
      'padding-right': '32px'
    },
    media: {
      'is-mobile': {
        'background-position': '50% 0',
        'padding-bottom': '150px'
      }
    },
    overlay: {
      color: '#000000',
      opacity: '0'
    }
  },
  components1: merge({}, C_CUSTOM_1),
  container1: {
    width: 6,
    styles: {
      'flex-direction': 'column',
      'justify-content': 'center',
      'align-items': 'center'
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
