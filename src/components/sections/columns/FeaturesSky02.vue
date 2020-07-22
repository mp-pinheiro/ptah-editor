<script>
import * as types from '@editor/types'
import { merge, cloneDeep } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Columns'
const NAME = 'FeaturesSky02'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/31c88895-2d04-499f-8cfd-8e3ab7637d31.jpg'
const DESCRIPTION = 'Three columns additional features presentation'

const C_CUSTOM_COLUMN = [
  {
    element: {
      text: '<h2>Rogue like storytelling</h2>',
      styles: {
        'font-size': '2.8rem',
        'color': '#5E42AE',
        'padding-top': '40px',
        'padding-bottom': '40px',
        'text-align': 'left'
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
      text: '<p>The dialogue choices you make, journey paths you take and battles ' +
        'you fight truly affect the story and the world around you. ' +
        'The team’s resources and time are limited.</p>',
      styles: {
        'font-size': '1.8rem',
        'color': '#5E42AE',
        'padding-top': '0',
        'padding-bottom': '50px',
        'text-align': 'left'
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'padding-top': '0',
          'padding-bottom': '50px'
        }
      }
    }
  },
  {
    element: {
      styles: {
        'background-image': 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/ff2a51e9-163f-4ec1-a993-df96bbcc1211.png")',
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

const C_CUSTOM_COLUMN1 = [
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
  },
  {
    element: {
      text: '<h2>Rogue like storytelling</h2>',
      styles: {
        'font-size': '2.8rem',
        'color': '#5E42AE',
        'padding-top': '40px',
        'padding-bottom': '40px',
        'text-align': 'left'
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
      text: '<p>The dialogue choices you make, journey paths you take and battles ' +
        'you fight truly affect the story and the world around you. ' +
        'The team’s resources and time are limited.</p>',
      styles: {
        'font-size': '1.8rem',
        'color': '#5E42AE',
        'padding-top': '0',
        'padding-bottom': '50px',
        'text-align': 'left'
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

const C_CUSTOM_COLUMN2 = cloneDeep(C_CUSTOM_COLUMN1)
C_CUSTOM_COLUMN2[0].element.styles['background-image'] = 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/6693bc33-4f7b-4055-9240-f1b4036275b1.png")'
C_CUSTOM_COLUMN2[1].element.text = '<h2>PVE multiplayer modes</h2>'
C_CUSTOM_COLUMN2[2].element.text = '<p>Live through the story and top the global ' +
  'ratings with your characters in the multiplayer mode. Unlock new characters ' +
  'and cards, upgrade them to build your own unique strategy and tactics.</p>'

const C_CUSTOM_COLUMN3 = cloneDeep(C_CUSTOM_COLUMN1)
C_CUSTOM_COLUMN3[0].element.styles['background-image'] = 'url("https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/ff2a51e9-163f-4ec1-a993-df96bbcc1211.png")'
C_CUSTOM_COLUMN3[1].element.text = '<h2>Hand-drawn graphics</h2>'
C_CUSTOM_COLUMN3[2].element.text = '<p>The visual style of Ash of Gods has been ' +
  'inspired by the work of Ralph Bakshi, old-school Disney cartoons and the Soviet ' +
  'animation studio “Soyuzmultfilm” of the 60s.</p>'

const C_CUSTOM = []

const C_CUSTOM_CONTAINER = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center',
    'padding-left': '20px',
    'padding-right': '20px'
  }
}

const C_CUSTOM_CONTAINER_C = {
  styles: {
    'background-color': '#E2F6FE',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
    'padding-top': '27px',
    'padding-bottom': '27px',
    'padding-left': '27px',
    'padding-right': '27px',
    'margin-left': '10px',
    'margin-right': '10px'
  },
  media: {
    'is-mobile': {
      'justify-content': 'center',
      'align-items': 'center',
      'margin-top': '10px',
      'margin-bottom': '10px',
      'margin-left': '10px',
      'margin-right': '10px'
    }
  }
}

const C_CUSTOM_CONTAINER1 = {
  styles: {
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'align-items': 'flex-start',
    'padding-top': '0',
    'padding-left': '20px',
    'padding-right': '60px'
  },
  media: {
    'is-mobile': {
      'justify-content': 'center',
      'align-items': 'center',
      'margin-top': '10px',
      'margin-bottom': '10px',
      'margin-left': '10px',
      'margin-right': '10px'
    }
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'padding-top': '61px',
      'padding-bottom': '122px',
      'align-items': 'stretch'
    },
    media: {
      'is-mobile': {
        'padding-bottom': '96px'
      }
    },
    count: 3
  },
  container: merge({}, C_CUSTOM_CONTAINER),
  container1: merge({}, C_CUSTOM_CONTAINER1),
  container2: merge({}, C_CUSTOM_CONTAINER_C),
  container3: merge({}, C_CUSTOM_CONTAINER_C),
  container4: merge({}, C_CUSTOM_CONTAINER_C),
  components: merge({}, C_CUSTOM),
  components1: merge({}, C_CUSTOM_COLUMN),
  components2: merge({}, C_CUSTOM_COLUMN1),
  components3: merge({}, C_CUSTOM_COLUMN2),
  components4: merge({}, C_CUSTOM_COLUMN3),
  edited: true
}

const HEADER = []

const COMPONENTS1 = [
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-title',
    label: 'title'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description'
  },
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-image',
    label: 'pic'
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
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'description'
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
    components: merge([], HEADER),
    components1: merge([], COMPONENTS1),
    components2: merge([], COMPONENTS),
    components3: merge([], COMPONENTS),
    components4: merge([], COMPONENTS)
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
    </div>
  </section>
</template>

<style lang="sass" scoped>
</style>
