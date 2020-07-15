<script>
import * as types from '@editor/types'
import { merge, cloneDeep } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Columns'
const NAME = 'DetailsPrimitive02'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/7ef5b56c-e8d9-4952-9e60-2ea245e1ff0c.jpg'
const DESCRIPTION = 'Three columns with button'

const C_CUSTOM_COLUMN = [
  {
    element: {
      styles: {
        'background-image': 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/71734bab-e0ab-4d45-8887-c1557e6cbd34.jpg")',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '284px',
        'height': '284px'
      },
      media: {
        'is-mobile': {
          'width': '200px',
          'height': '200px'
        }
      }
    }
  },
  {
    element: {
      text: '<p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>',
      styles: {
        'font-size': '1.7rem',
        'color': '#A2A5A5',
        'padding-bottom': '40px',
        'padding-left': '20px',
        'padding-right': '20px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.5rem',
          'padding-bottom': '40px',
          'padding-left': '20px',
          'padding-right': '20px'
        }
      }
    }
  }
]

const C_CUSTOM_COLUMN2 = cloneDeep(C_CUSTOM_COLUMN)
const C_CUSTOM_COLUMN3 = cloneDeep(C_CUSTOM_COLUMN)

const C_CUSTOM = [
  {
    element: {
      text: '<h3>Details</h3>',
      styles: {
        'font-size': '3.6rem',
        'color': '#ECD19A',
        'padding-top': '50px',
        'padding-bottom': '50px'
      },
      media: {
        'is-mobile': {
          'font-size': '3.2rem',
          'padding-top': '20px',
          'padding-bottom': '30px'
        }
      }
    }
  }
]

const C_CUSTOM_1 = [
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
        'border-width': '0px',
        'margin-top': '0'
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'width': '191px',
          'height': '46px',
          'margin-top': '30px'
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
      'background-color': '#F3F6F6',
      'padding-bottom': '60px'
    },
    media: {
      'is-mobile': {
        'padding-bottom': '60px'
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
  }
]

const COMPONENTS = [
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-image',
    label: 'pic'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
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
