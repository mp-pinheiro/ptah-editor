<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Elements'
const NAME = 'TextWithButtonTwoColumns02'
const BG_SECTION = 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/0a959767-8c8b-45e0-828f-acf64720b4b1.jpg)'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/e0d0d0f7-6ff2-4797-bb7c-684bf2375d30.jpg'
const DESCRIPTION = 'Two columns with texts and button'

const COMPONENTS_2 = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'text'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'text'
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      text: '<h2>Become legendary</h2>',
      styles: {
        'font-size': '3.6rem',
        'color': '#5E42AE',
        'padding-top': '0',
        'padding-bottom': '0'
      },
      media: {
        'is-mobile': {
          'font-size': '3.2rem',
          'padding-top': '0',
          'padding-bottom': '0'
        }
      }
    }
  },
  {
    element: {
      text: '<p>“The dialogue choices you make, journey paths you take ' +
        'and battles you fight truly affect the story and the world around you.”</p>',
      styles: {
        'font-size': '1.8rem',
        'line-height': '1.3',
        'color': '#5E42AE',
        'text-align': 'left',
        'margin-top': '20px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.4rem',
          'margin-top': '20px',
          'margin-bottom': '25px'
        }
      }
    }
  }
]

const COMPONENTS_3 = [
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button',
    label: 'button'
  }
]

const C_CUSTOM_3 = [
  {
    element: {
      text: 'BUY NOW',
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
  components2: merge({}, C_CUSTOM_2),
  container2: {
    width: 8,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container3'],
    selfName: '$sectionData.container2',
    styles: {
      'padding-top': '0',
      'padding-left': '32px',
      'padding-right': '32px',
      'justify-content': 'center',
      'align-items': 'flex-start'
    },
    media: {
      'is-mobile': {
        'padding-top': '30px',
        'align-items': 'center'
      }
    }
  },
  components3: merge({}, C_CUSTOM_3),
  container3: {
    width: 4,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container3'
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
    container2: types.StyleObject,
    container3: types.StyleObject,
    components2: COMPONENTS_2,
    components3: COMPONENTS_3
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
    class="b-block-01"
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
          :class="`b-grid__col-${$sectionData.container2.width}`"
        >
          <sandbox
            container-path="$sectionData.container2"
            components-path="$sectionData.components2"
            class="b-sandbox">
            <draggable
              v-model="$sectionData.components2"
              class="b-draggable-slot b-draggable-slot_100"
              :style="$sectionData.container2.styles"
              @start="$_drag('components2')"
              @change="$_dragStop"
            >
              <div
                v-for="(component, index) in $sectionData.components2"
                v-if="$sectionData.components2.length !== 0"
                :key="index"
              >
                <component
                  v-styler:for="{
                    el: $sectionData.components2[index].element,
                    path: `$sectionData.components2[${index}].element`,
                    type: $sectionData.components2[index].type,
                    label: component.label
                  }"
                  :is="component.name"
                  :href="$sectionData.components2[index].element.link.href"
                  :target="$sectionData.components2[index].element.link.target"
                  :path="`components2[${index}].element`"
                  :style="$sectionData.components2[index].element.styles"
                  :class="[
                    $sectionData.components2[index].element.classes,
                    $sectionData.components2[index].class
                  ]"
                >
                  <div v-html="$sectionData.components2[index].element.text"></div>
                </component>
              </div>
            </draggable>
          </sandbox>
        </div>
        <div
          class="b-grid__col-m-12"
          :class="`b-grid__col-${$sectionData.container3.width}`"
        >
          <sandbox
              container-path="$sectionData.container3"
              components-path="$sectionData.components3"
               class="b-sandbox">

            <draggable
              v-model="$sectionData.components3"
              class="b-draggable-slot b-draggable-slot_100"
              :style="$sectionData.container3.styles"
              @start="$_drag('components3')"
              @change="$_dragStop"
            >
              <div
                v-for="(component, index) in $sectionData.components3"
                v-if="$sectionData.components3.length !== 0"
                :key="index"
              >
                <component
                  v-styler:for="{
                    el: $sectionData.components3[index].element,
                    path: `$sectionData.components3[${index}].element`,
                    type: $sectionData.components3[index].type,
                    label: component.label
                  }"
                  :is="component.name"
                  :href="$sectionData.components3[index].element.link.href"
                  :target="$sectionData.components3[index].element.link.target"
                  :path="`components3[${index}].element`"
                  :style="$sectionData.components3[index].element.styles"
                  :class="[
                    $sectionData.components3[index].element.classes,
                    $sectionData.components3[index].class
                  ]"
                >
                  <div v-html="$sectionData.components3[index].element.text"></div>
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
