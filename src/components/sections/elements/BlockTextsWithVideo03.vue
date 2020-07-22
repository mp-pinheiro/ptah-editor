<script>
import * as types from '@editor/types'
import { merge } from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Elements'
const NAME = 'BlockTextsWithVideo03'
const BG_SECTION = 'url(https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/d67be5b2-c4d5-4ed4-850b-93fed0ac8184.jpg)'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/748e26fd-feaa-4504-816a-efaf4c4f6fe3.jpg'
const DESCRIPTION = 'Block with texts & video'

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
    name: 'VideoElement',
    element: types.VideoElement,
    type: 'video',
    class: 'b-video',
    label: 'video'
  }
]

const C_CUSTOM = [
  {
    element: {
      text: '<h3>Storytelling</h3>',
      styles: {
        'font-size': '3.6rem',
        'color': '#ECD19A',
        'padding-top': '0',
        'padding-bottom': '40px'
      },
      media: {
        'is-mobile': {
          'font-size': '3.2rem',
          'padding-top': '0',
          'padding-bottom': '40px'
        }
      }
    }
  },
  {
    element: {
      text: '<p>The dialogue choices you make, journey paths you take ' +
        'and battles you fight truly affect the story and the world ' +
        'around you. The team’s resources and time are limited.</p>',
      styles: {
        'font-size': '1.8rem',
        'line-height': '1.3',
        'color': '#ECD19A',
        'text-align': 'center',
        'padding-left': '300px',
        'padding-right': '300px',
        'padding-bottom': '40px'
      },
      media: {
        'is-mobile': {
          'font-size': '1.4rem',
          'padding-left': '40px',
          'padding-right': '40px',
          'padding-bottom': '40px'
        }
      }
    }
  },
  {
    element: {
      settings: {
        loop: false,
        autoplay: false,
        rel: false,
        controls: false,
        url: 'https://youtu.be/Nq9RNp-Mt0o'
      },
      styles: {
        width: '800px',
        height: '448px'
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'height': 'auto',
      'padding-top': '150px',
      'padding-bottom': '150px'
    },
    media: {
      'is-mobile': {
        'padding-top': '40px',
        'padding-bottom': '40px'
      }
    },
    overlay: {
      color: '#000000',
      opacity: '0'
    }
  },
  container: {
    width: 12,
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
