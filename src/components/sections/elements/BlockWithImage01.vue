<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Elements'
const NAME = 'BlockWithImage01'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/8156b0a4-41eb-4568-abe1-68ed94e78335.jpg'
const DESCRIPTION = 'Block with image'

const COMPONENTS_2 = [
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
      styles: {
        'background-image': 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/6276c239-7f3b-404d-b630-a14db18d91c9.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'width': '116px',
        'height': '164px'
      },
      media: {
        'is-mobile': {
          'width': '116px',
          'height': '164px'
        }
      }
    }
  },
  {
    element: {
      text: '<h2>STORYTELLING</h2>',
      styles: {
        'font-size': '2.8rem',
        'color': '#56319F',
        'padding-top': '0',
        'padding-bottom': '0',
        'text-align': 'left'
      },
      media: {
        'is-mobile': {
          'font-size': '1.8rem',
          'padding-top': '0',
          'padding-bottom': '0',
          'text-align': 'center'
        }
      }
    }
  },
  {
    element: {
      text: '<p>The dialogue choices you make, journey paths you take and battles you fight truly affect the story and the world around you. The team’s resources and time are limited.</p>',
      styles: {
        'font-size': '1.7rem',
        'line-height': '1.45',
        'color': '#56319F',
        'text-align': 'left',
        'margin-top': '20px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.4rem',
          'margin-top': '20px',
          'margin-bottom': '25px',
          'text-align': 'center'
        }
      }
    }
  }
]

const COMPONENTS_3 = [
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-image',
    label: 'pic'
  }
]

const C_CUSTOM_3 = [
  {
    element: {
      styles: {
        'background-image': 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/37ba65c2-61b0-4b0a-879c-8d8a0b9e0ae8.jpg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '640px',
        'height': '640px'
      },
      media: {
        'is-mobile': {
          'width': '280px',
          'height': '280px'
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
      'height': 'auto',
      'padding-top': '80px',
      'padding-bottom': '80px',
      'padding-left': '32px',
      'padding-right': '32px'
    },
    media: {
      'is-mobile': {
        'padding-top': '20px',
        'padding-bottom': '60px'
      }
    }
  },
  components2: merge({}, C_CUSTOM_2),
  container2: {
    width: 5,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container3'],
    selfName: '$sectionData.container2',
    styles: {
      'padding-top': '0',
      'padding-left': '0',
      'padding-right': '0',
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
    width: 7,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container3',
    styles: {
      'padding-top': '0',
      'padding-left': '60px',
      'padding-right': '0',
      'justify-content': 'flex-start',
      'align-items': 'flex-start'
    },
    media: {
      'is-mobile': {
        'padding-top': '30px',
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
