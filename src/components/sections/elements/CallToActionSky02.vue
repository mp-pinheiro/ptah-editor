<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Elements'
const NAME = 'CallToActionSky02'
const BG_SECTION = 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/0a959767-8c8b-45e0-828f-acf64720b4b1.jpg)'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/419261e7-0a98-45b1-bd0b-9fbf70a00534.jpg'
const DESCRIPTION = 'Block with timer & call to action a button'

const COMPONENTS = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'text'
  },
  {
    name: 'Timer',
    element: types.Timer,
    type: 'timer',
    class: 'b-timer-fs',
    label: 'timer'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button',
    label: 'button'
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<h3><strong>Something amazing is coming soon</strong></h3>',
      styles: {
        'font-size': '1.8rem',
        'line-height': '1.3',
        'color': '#5E42AE',
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
      timer: {
        timestamp: Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000,
        UTC: new Date().getTimezoneOffset() / 60 * (-1),
        labels: {
          show: true
        },
        colorTile: 'rgba(0,0,0,0)'
      },
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'font-size': '3.2rem',
        'font-weight': '800',
        'line-height': '1.3',
        'color': '#A7B4FD',
        'margin-top': '0',
        'margin-bottom': '0'
      }
    }
  },
  {
    element: {
      text: 'PRE - ORDER',
      styles: {
        'background-color': '#F04B4C',
        'color': '#ffffff',
        'font-size': '2.4rem',
        'text-align': 'center',
        'width': '226px',
        'height': '66px',
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
      'height': '80vh',
      'padding-top': '20px',
      'padding-bottom': '20px',
      'padding-left': '32px',
      'padding-right': '32px',
      'background-position': '50% 100%',
      'background-repeat': 'repeat-x',
      'background-size': 'auto'
    },
    media: {
      'is-mobile': {
        'padding-bottom': '60px',
        'background-size': 'cover'
      }
    }
  },
  container: {
    width: 8,
    styles: {
      'padding-top': '8px',
      'padding-bottom': '8px'
    },
    media: {
      'is-mobile': {
        'padding-top': '40px',
        'padding-bottom': '50px'
      }
    }
  },
  components: merge({}, C_CUSTOM),
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
    container: types.StyleObject,
    components: COMPONENTS
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
    class="b-call-to-action"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
        <div class="b-grid__row b-footer__row">
          <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
            <sandbox
              container-path="$sectionData.container"
              components-path="$sectionData.components"
              class="b-footer__col b-footer__col_1">

              <draggable v-model="$sectionData.components" class="b-draggable-slot b-draggable-slot_horizont" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
                <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                  <component
                    v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                    :is="component.name"
                    :href="$sectionData.components[index].element.link.href"
                    :target="$sectionData.components[index].element.link.target"
                    :style="$sectionData.components[index].element.styles"
                    :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
                    :path="`components[${index}].element`"
                    class="b-footer-component"
                  >
                    <div v-html="$sectionData.components[index].element.text"></div>
                  </component>
                </div>
              </draggable>
            </sandbox>
          </div>
        </div><!--/.b-grid__row.b-footer__row-->
      </div><!--/.b-grid-->
  </section>
</template>

<style lang="sass" scoped>
</style>
