<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Forms'
const NAME = 'FormPrimitive01'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/6ae83d70-0c07-4f88-845f-c5052175e257.jpg'
const DESCRIPTION = 'Block with subscribe form'

const COMPONENTS = [
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
  },
  {
    name: 'Form',
    element: types.Form,
    type: 'form',
    class: 'b-form',
    label: 'form'
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<h3>SHORT ACTION</h3>',
      styles: {
        'font-size': '2.8rem',
        'color': '#A2A5A5',
        'padding-top': '0',
        'padding-bottom': '30px'
      },
      media: {
        'is-mobile': {
          'font-size': '2rem',
          'padding-top': '0',
          'padding-bottom': '30px'
        }
      }
    }
  },
  {
    element: {
      text: '<p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. </p>',
      styles: {
        'font-size': '1.8rem',
        'color': '#A2A5A5',
        'padding-top': '0',
        'padding-bottom': '30px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.6rem',
          'padding-top': '0',
          'padding-bottom': '30px'
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
        'margin-top': '0',
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
      'background-color': '#F3F6F6',
      'background-size': 'cover',
      'background-position': '100% 50%',
      'height': 'auto'
    },
    overlay: {
      color: '#000000',
      opacity: '0'
    }
  },
  container: {
    width: 12,
    styles: {
      'padding-top': '80px',
      'padding-bottom': '150px'
    },
    media: {
      'is-mobile': {
        'padding-top': '80px',
        'padding-bottom': '150px'
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
    <div>
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
    </div><!--/.b-footer-->
  </section>
</template>

<style lang="sass" scoped>
</style>
