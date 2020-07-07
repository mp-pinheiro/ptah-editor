<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Forms'
const NAME = 'CallToActionAndTextAshOfGods01'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/36ad916a-122d-4e9a-87ca-e9d63f6e9271.jpg'
const DESCRIPTION = 'Block with two text'

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
      text: '<h3>Get started with us</h3>',
      styles: {
        'font-size': '3.6rem',
        'color': '#ECD19A',
        'padding-top': '0',
        'padding-bottom': '50px'
      },
      media: {
        'is-mobile': {
          'font-size': '3.2rem',
          'padding-top': '0',
          'padding-bottom': '50px'
        }
      }
    }
  },
  {
    element: {
      text: '<p>“The dialogue choices you make, journey paths you take and battles you fight truly affect the story and the world around you.”</p>',
      styles: {
        'font-size': '1.8rem',
        'color': '#ECD19A',
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
  },
  {
    element: {
      placeholder: 'Paste your email',
      buttonText: 'Remind me!',
      styles: {
        'color': '#ECD19A',
        'border-radius': '0',
        'font-weight': 'normal',
        'font-style': 'normal',
        'font-size': '2rem',
        'text-decoration': 'none'
      },
      formStyles: {
        'button-color': '#B93A27',
        'buttonHoverColor': '#9E1E0B',
        'buttonTextColor': '#ECD19A',
        'buttonHoverTextColor': '#ffffff',
        'inputBgColor': '#29221C',
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
      'background-size': 'cover',
      'background-position': '100% 50%',
      'height': 'auto'
    },
    overlay: {
      color: '#000000',
      opacity: '0.5'
    }
  },
  container: {
    width: 8,
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
