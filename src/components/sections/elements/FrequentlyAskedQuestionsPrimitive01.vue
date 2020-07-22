<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Elements'
const NAME = 'FrequentlyAskedQuestionsPrimitive01'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/86f1093f-88de-4dd2-acc1-62faf83ce7de.jpg'
const DESCRIPTION = 'Interactive FAQ presentation screen'

const C_CUSTOM_COLUMN = [
  {
    element: {
      styles: {
        'font-size': '2rem',
        'line-height': '1.3',
        'color': '#A2A5A5',
        'padding-top': '40px',
        'padding-right': '40px',
        'padding-bottom': '40px',
        'padding-left': '40px'
      },
      'sizeIcons': {
        width: 20
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'margin-top': '0',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '0',
          'text-align': 'center',
          'padding-top': '40px',
          'padding-right': '40px',
          'padding-bottom': '40px',
          'padding-left': '40px',
          'sizeIcons': {
            width: 20
          }
        }
      },
      el: {
        color: '#A2A5A5',
        isIconVisible: false,
        isTextVisible: true,
        content: `
          <table>
            <tr>
              <th>Rogue like storytelling</th>
            </tr>
            <tr>
              <td>
                <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </td>
            </tr>
          </table>
         `
      }
    }
  },
  {
    element: {
      styles: {
        'font-size': '2rem',
        'line-height': '1.3',
        'color': '#A2A5A5',
        'padding-top': '40px',
        'padding-right': '40px',
        'padding-bottom': '40px',
        'padding-left': '40px'
      },
      'sizeIcons': {
        width: 20
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'margin-top': '0',
          'margin-right': '0',
          'margin-bottom': '0',
          'margin-left': '0',
          'text-align': 'center',
          'padding-top': '40px',
          'padding-right': '40px',
          'padding-bottom': '40px',
          'padding-left': '40px',
          'sizeIcons': {
            width: 20
          }
        }
      },
      el: {
        color: '#A2A5A5',
        isIconVisible: false,
        isTextVisible: true,
        content: `
          <table>
            <tr>
              <th>Rogue like storytelling</th>
            </tr>
            <tr>
              <td>
                <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </td>
            </tr>
          </table>
         `
      }
    }
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<h1><strong>FAQ</strong></h1>',
      styles: {
        'font-size': '2.8rem',
        'line-height': '1.3',
        'color': '#A2A5A5',
        'text-align': 'center'
      },
      media: {
        'is-mobile': {
          'font-size': '2.4rem'
        }
      }
    }
  },
  {
    element: {
      text: '<p>Amet minim mollit non deserunt ullamco ' +
        'est sit aliqua dolor do amet sint.</p>',
      styles: {
        'font-size': '1.8rem',
        'line-height': '1.45',
        'color': '#848484',
        'text-align': 'center',
        'margin-top': '20px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'margin-top': '20px',
          'margin-bottom': '25px',
          'text-align': 'center',
          'padding-top': '0px',
          'padding-right': '40px',
          'padding-bottom': '40px',
          'padding-left': '40px'
        }
      }
    }
  }
]

const C_CUSTOM_CONTAINER = {
  width: 4,
  styles: {
    'flex-direction': 'column',
    'align-items': 'center'
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#F3F6F6',
      'padding-top': '24px',
      'padding-bottom': '24px',
      'height': 'auto'
    }
  },
  container: _.merge({}, C_CUSTOM_CONTAINER),
  components: _.merge({}, C_CUSTOM),
  components2: _.merge({}, C_CUSTOM_COLUMN),
  components3: _.merge({}, C_CUSTOM_COLUMN),
  container2: {
    width: 6,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container3'],
    selfName: '$sectionData.container2',
    styles: {
      'justify-content': 'flex-start',
      'align-items': 'flex-start'
    }
  },
  container3: {
    width: 6,
    minWidth: 2,
    maxWidth: 10,
    grow: ['$sectionData.container2'],
    selfName: '$sectionData.container3',
    styles: {
      'justify-content': 'flex-start',
      'align-items': 'flex-start'
    }
  },
  edited: true
}

const COMPONENTS = [
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  },
  {
    name: 'ToggleElement',
    element: types.ToggleElement,
    type: 'toggleElement',
    class: 'b-toggle-element',
    label: 'toggle element'
  }
]

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

export default {
  name: NAME,

  group: GROUP_NAME,

  description: DESCRIPTION,

  mixins: [defaults, sectionMedia],

  cover: COVER,

  $schema: {
    mainStyle: types.Columns,
    container: types.StyleObject,
    container2: types.StyleObject,
    container3: types.StyleObject,
    components: _.merge([], HEADER),
    components2: _.merge([], COMPONENTS),
    components3: _.merge([], COMPONENTS)
  },

  created () {
    if (this.$sectionData.edited === undefined) {
      Seeder.seed(_.merge(this.$sectionData, SCHEMA_CUSTOM))
    }
  }
}
</script>

<template>
  <section
    class="b-faq"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>
    <div class="b-grid">
      <div class="b-grid__row">
        <div class="b-grid__col-m-12" :class="`b-grid__col-${$sectionData.container.width}`">
          <sandbox
            class="b-sandbox"
            container-path="$sectionData.container"
            components-path="$sectionData.components"
            :style="$sectionData.container.styles"
            >
            <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
              <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component class="b-faq-component"
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
        </div><!--/.b-grid__col-12-->
      </div><!--/.b-grid__row-->
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
