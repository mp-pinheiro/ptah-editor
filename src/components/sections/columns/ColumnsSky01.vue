<script>
import * as types from '@editor/types'
import { merge, cloneDeep } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Columns'
const NAME = 'ColumnsSky01'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/e27f0d40-5dae-420f-8b46-2ef969a9b525.jpg'
const DESCRIPTION = 'Three columns with button'

const C_CUSTOM_COLUMN = [
  {
    element: {
      styles: {
        'background-image': 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/7484fb62-96cb-4507-b8d9-36494f0dc79e.png")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '224px',
        'height': '190px'
      },
      media: {
        'is-mobile': {
          'width': '122px',
          'height': '122px'
        }
      }
    }
  }
]

const C_CUSTOM_COLUMN2 = cloneDeep(C_CUSTOM_COLUMN)
C_CUSTOM_COLUMN2[0].element.styles['background-image'] = 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/6693bc33-4f7b-4055-9240-f1b4036275b1.png")'

const C_CUSTOM_COLUMN3 = cloneDeep(C_CUSTOM_COLUMN)
C_CUSTOM_COLUMN3[0].element.styles['background-image'] = 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/ff2a51e9-163f-4ec1-a993-df96bbcc1211.png")'

const C_CUSTOM = [
  {
    element: {
      text: '<h2>GAME DESCRIPTION</h2>',
      styles: {
        'font-size': '2.8rem',
        'color': '#5E42AE',
        'padding-top': '40px',
        'padding-bottom': '40px'
      },
      media: {
        'is-mobile': {
          'font-size': '3.2rem',
          'padding-top': '20px',
          'padding-bottom': '30px'
        }
      }
    }
  },
  {
    element: {
      text: '<p>The dialogue choices you make, journey paths you take and battles you fight truly ' +
        'affect the story and the world around you. The team’s resources and time are limited. ' +
        'The dialogue choices you make, journey paths you take and battles you fight truly affect ' +
        'the story and the world around you. The team’s resources and time are limited.</p>',
      styles: {
        'font-size': '1.8rem',
        'color': '#5E42AE',
        'padding-top': '0',
        'padding-bottom': '50px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'padding-top': '0',
          'padding-bottom': '50px'
        }
      }
    }
  }
]

const C_CUSTOM_1 = [
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

const C_CUSTOM_CONTAINER = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center',
    'padding-left': '20px',
    'padding-right': '20px'
  },
  media: {
    'is-mobile': {
      'padding-top': '40px'
    }
  }
}

const C_CUSTOM_CONTAINER_1 = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center',
    'padding-top': '60px',
    'padding-bottom': '60px'
  },
  media: {
    'is-mobile': {
      'padding-top': '40px',
      'padding-bottom': '60px'
    }
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#ffffff',
      'padding-top': '60px',
      'padding-bottom': '60px',
      'padding-left': '100px',
      'padding-right': '100px'
    },
    media: {
      'is-mobile': {
        'padding-top': '20px',
        'padding-bottom': '60px',
        'padding-left': '10px',
        'padding-right': '10px'
      }
    },
    count: 3
  },
  container: merge({}, C_CUSTOM_CONTAINER),
  container1: merge({}, C_CUSTOM_CONTAINER),
  container2: merge({}, C_CUSTOM_CONTAINER),
  container3: merge({}, C_CUSTOM_CONTAINER),
  container4: merge({}, C_CUSTOM_CONTAINER),
  container5: merge({}, C_CUSTOM_CONTAINER_1),
  components: merge({}, C_CUSTOM),
  components1: merge({}, C_CUSTOM_COLUMN),
  components2: merge({}, C_CUSTOM_COLUMN2),
  components3: merge({}, C_CUSTOM_COLUMN3),
  components4: merge({}, C_CUSTOM_COLUMN),
  components5: merge({}, C_CUSTOM_1),
  edited: true
}

const HEADER = [
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

const BOTTOM = [
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-fs',
    label: 'button'
  }
]

const COMPONENTS = [
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-image',
    label: 'pic'
  }
]

export default {
  name: NAME,

  group: GROUP_NAME,

  description: DESCRIPTION,

  mixins: [defaults, sectionMedia],

  cover: COVER,

  $schema: {
    mainStyle: types.Columns,
    container: types.StyleObject,
    container1: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    container4: types.StyleObject,
    container5: types.StyleObject,
    components: merge([], HEADER),
    components1: merge([], COMPONENTS),
    components2: merge([], COMPONENTS),
    components3: merge([], COMPONENTS),
    components4: merge([], COMPONENTS),
    components5: merge([], BOTTOM)
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
    class="b-columns"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <sandbox
          class="b-sandbox"
          container-path="$sectionData.container"
          components-path="$sectionData.components"
        >

          <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
            <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
              <component class="b-columns-component"
                 v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: $sectionData.components[index].label }"
                 :is="component.name"
                 :href="$sectionData.components[index].element.link.href"
                 :target="$sectionData.components[index].element.link.target"
                 :path="`components[${index}].element`"
                 :style="$sectionData.components[index].element.styles"
                 :class="[$sectionData.components[index].element.classes, $sectionData.components[index].class]"
              >
                <div v-html="$sectionData.components[index].element.text"></div>
              </component>
            </div>
          </draggable>
        </sandbox>
      </div>
      <div class="b-section-padd">
        <div class="b-section-padd-border">
          <div class="b-grid__row"
            :style="{ 'align-items' : $sectionData.mainStyle.styles['align-items']}"
            >
            <div class="b-grid__col-m-12"
              :class="`b-grid__col-${12/$sectionData.mainStyle.count}`"
              v-for="(column, key) in $sectionData"
              v-if="key.indexOf('components') !== -1 && key.split('components')[1] && parseFloat(key.split('components')[1]) <= $sectionData.mainStyle.count"
              :key="key"
              >
              <sandbox
                class="b-sandbox"
                :container-path="`$sectionData.container${key.split('components')[1]}`"
                :components-path="`$sectionData.components${key.split('components')[1]}`"
                >
                <draggable v-model="$sectionData[key]" class="b-draggable-slot" :style="$sectionData[`container${key.split('components')[1]}`].styles" @start="$_drag(`components${key.split('components')[1]}`)" @change="$_dragStop">
                  <div :class="`b-draggable-slot__${component.type}`"
                     v-for="(component, index) in $sectionData[key]"
                     v-if="$sectionData[key].length !== 0"
                     :key="index"
                    >
                    <component class="b-columns-component"
                      v-styler:for="{ el: $sectionData[`${key}`][index].element, path: `$sectionData.${key}[${index}].element`, type: $sectionData[key][index].type, label: $sectionData[`${key}`][index].label }"
                      :is="component.name"
                      :href="$sectionData[key][index].element.link.href"
                      :target="$sectionData[key][index].element.link.target"
                      :path="`${key}[${index}].element`"
                      :style="$sectionData[key][index].element.styles"
                      :class="[$sectionData[key][index].element.classes, $sectionData[key][index].class]"
                      >
                      <div v-html="$sectionData[key][index].element.text"></div>
                    </component>
                  </div>
                </draggable>
              </sandbox>
            </div><!--/.b-grid__col-3 b-grid__col-m-12-->
          </div><!--/.b-grid__row-->
        </div>
      </div>
      <div class="b-grid__row">
        <sandbox
          class="b-sandbox"
          container-path="$sectionData.container5"
          components-path="$sectionData.components5"
        >

          <draggable v-model="$sectionData.components5" class="b-draggable-slot" :style="$sectionData.container5.styles" @start="$_drag('components5')" @change="$_dragStop">
            <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components5" v-if="$sectionData.components5.length !== 0" :key="index">
              <component class="b-columns-component"
                v-styler:for="{ el: $sectionData.components5[index].element, path: `$sectionData.components5[${index}].element`, type: $sectionData.components5[index].type, label: $sectionData.components5[index].label }"
                :is="component.name"
                :href="$sectionData.components5[index].element.link.href"
                :target="$sectionData.components5[index].element.link.target"
                :path="`components5[${index}].element`"
                :style="$sectionData.components5[index].element.styles"
                :class="[$sectionData.components5[index].element.classes, $sectionData.components5[index].class]"
              >
                <div v-html="$sectionData.components5[index].element.text"></div>
              </component>
            </div>
          </draggable>
        </sandbox>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
</style>
