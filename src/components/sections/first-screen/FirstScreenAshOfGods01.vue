<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenAshOfGods01'
const BG_SECTION = 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/4473da1a-ec83-4054-8619-654dcf6e44b0.jpg)'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/9b902ac9-6f65-4199-ba4f-d08856890577.jpg'
const DESCRIPTION = 'Fantasy title Maximum main screen'

const COMPONENTS_1 = [
  {
    name: 'Logo',
    element: types.Logo,
    type: 'image',
    class: 'b-logo-fs',
    label: 'logo'
  }
]

const COMPONENTS_2 = [
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
        'background-image': 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/b9ffaacc-047b-42c5-86b8-9784b910d481.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '320px',
        'height': '96px'
      },
      media: {
        'is-mobile': {
          'width': '212px',
          'height': '74px'
        }
      }
    }
  }
]

const C_CUSTOM_2 = [
  {
    element: {
      text: '<h1>TURN-BASED RPG FEATURING ROGUE-LIKE STORYTELLING</h1>',
      styles: {
        'font-size': '4.2rem',
        'line-height': '1.3',
        'color': '#ECD19A',
        'text-align': 'left',
        'margin-top': '50px',
        'margin-bottom': '50px'
      },
      media: {
        'is-mobile': {
          'font-size': '2.2rem',
          'line-height': '1.4',
          'margin-top': '25px',
          'margin-bottom': '25px',
          'padding-right': '90px'
        }
      }
    }
  },
  {
    element: {
      text: 'BUY NOW',
      styles: {
        'background-color': '#B93A27',
        'color': '#ECD19A',
        'font-size': '2.4rem',
        'text-align': 'center',
        'width': '228px',
        'height': '62px',
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': '#ECD19A'
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
      'background-size': 'cover',
      'background-color': '#4A4A4A',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll',
      'background-position': '50% 0%',
      'height': '100vh',
      'padding-top': '20px',
      'padding-bottom': '150px',
      'padding-left': '32px',
      'padding-right': '32px'
    },
    media: {
      'is-mobile': {
        'background-position': '57% 50%',
        'padding-bottom': '60px'
      }
    }
  },
  components1: merge({}, C_CUSTOM_1),
  container1: {
    width: 12,
    styles: {
      'padding-left': '32px',
      'padding-right': '32px',
      'flex-direction': 'row',
      'justify-content': 'space-between',
      'align-items': 'center'
    },
    media: {
      'is-mobile': {
        'flex-direction': 'column',
        'justify-content': 'flex-start',
        'align-items': 'flex-start'
      }
    }
  },
  container2: {
    width: 8,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container3'],
    selfName: '$sectionData.container2',
    styles: {
      'padding-top': '160px',
      'padding-left': '32px',
      'padding-right': '32px',
      'justify-content': 'flex-start',
      'align-items': 'flex-start'
    },
    media: {
      'is-mobile': {
        'padding-top': '120px'
      }
    }
  },
  components2: merge({}, C_CUSTOM_2),
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
    container1: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    components1: COMPONENTS_1,
    components2: COMPONENTS_2,
    components3: []
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
