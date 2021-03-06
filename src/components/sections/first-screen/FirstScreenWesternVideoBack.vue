<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'FirstScreen'
const NAME = 'FirstScreenWesternVideoBack'
const BG_SECTION = 'url(https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/b60a3198-6d5e-4cdd-baa7-cedc7bd3fa50.jpg)'
const date = Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000

const COMPONENTS = [
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
    class: 'b-text-fs',
    label: 'text'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text-fs',
    label: 'text'
  },
  {
    name: 'Timer',
    element: types.Timer,
    type: 'timer',
    class: 'b-timer-fs',
    label: 'timer'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-fs',
    label: 'button'
  },
  {
    name: 'SocialNetworks',
    element: types.SocialNetworks,
    type: 'networks',
    class: 'b-social-networks-fs',
    label: 'Social Networks'
  }
]

const C_CUSTOM = [
  {
    element: {
      styles: {
        'background-image': 'url(https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/02eb3d8d-fefe-4b31-9d19-40a403c8c32a.png)',
        'background-color': 'rgba(0, 0, 0, 0)',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'width': '246px',
        'height': '96px',
        'margin-top': '25px',
        'margin-bottom': '25px'
      }
    }
  },
  {
    element: {
      text: '<h2><b>Here should be a little text describing your beautiful game</b></h2>',
      styles: {
        'font-size': '3.6rem',
        'line-height': '1.2',
        'color': '#ffffff',
        'margin-top': '10px',
        'margin-right': '80px',
        'margin-bottom': '10px',
        'margin-left': '80px'
      },
      media: {
        'is-mobile': {
          'margin-right': '32px',
          'margin-left': '32px'
        }
      }
    }
  },
  {
    element: {
      text: '<h3><b>Time left</b></h3>',
      styles: {
        'font-size': '3.6rem',
        'line-height': '1.2',
        'color': '#ffffff',
        'margin-top': '21px'
      }
    }
  },
  {
    element: {
      timer: {
        timestamp: date,
        UTC: new Date().getTimezoneOffset() / 60 * (-1),
        labels: {
          show: false
        },
        colorTile: 'rgba(0,0,0,0)'
      },
      styles: {
        'background-color': 'rgba(0,0,0,0)',
        'font-size': '4rem',
        'font-weight': '800',
        'line-height': '1',
        'color': '#ffffff',
        'margin-bottom': '62px'
      }
    }
  },
  {
    element: {
      text: '<b>Call to Action</b>',
      styles: {
        'background-color': '#1A83FF',
        'color': '#ffffff',
        'font-size': '2rem',
        'text-align': 'center',
        'width': '240px',
        'height': '64px',
        'border-radius': '10px',
        'margin-top': '25px',
        'margin-bottom': '25px'
      },
      pseudo: {
        'hover': {
          'color': '#1A83FF !important',
          'background-color': '#ffffff !important'
        }
      }
    }
  },
  {
    element: {
      socialNetworks: {
        'facebook': {
          name: 'Facebook',
          expand: false,
          visible: true,
          url: ''
        },
        'instagram': {
          name: 'Instagram',
          expand: false,
          visible: true,
          url: ''
        },
        'twitter': {
          name: 'Twitter',
          expand: false,
          visible: true,
          url: ''
        },
        'youtube': {
          name: 'Youtube',
          expand: false,
          visible: true,
          url: ''
        }
      },
      styles: {
        'margin-top': '25px'
      },
      colorFill: {
        color: '#1A83FF'
      },
      sizeIcons: {
        width: 30
      }
    }
  }
]

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-size': 'cover',
      'background-color': '#000000',
      'background-repeat': 'no-repeat',
      'background-attachment': 'scroll',
      'height': '100vh'
    },
    media: {
      'is-mobile': {
        'background-image': 'url(https://cdn.ptah.pro/prod/5ee8d62d480c4e00018c404d/58090ad9-01f3-4105-848b-dad73cb7733d.jpg)',
        'background-position': '46% 0%',
        'background-size': 'auto'
      }
    },
    backgroundType: 'video',
    backgroundVideo: 'https://s3-eu-west-1.amazonaws.com/dev.s3.ptah.super.com/video/12d0f9ed-754f-4c45-b84b-907db319ee09.mp4',
    overlay: {
      color: '#000000',
      opacity: '0.5'
    }
  },
  components: _.merge({}, C_CUSTOM),
  container: {
    width: 7
  },
  edited: true
}

export default {
  name: NAME,

  group: GROUP_NAME,

  description: 'Western title Maximum main screen',

  mixins: [defaults, sectionMedia],

  cover: '/img/covers/first-screen-western-video-back.jpg',

  $schema: {
    mainStyle: types.StyleObject,
    container: types.StyleObject,
    components: COMPONENTS
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
    class="b-first-screen-western-video-back"
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
              container-path="$sectionData.container"
              components-path="$sectionData.components"
              class="b-sandbox">

            <draggable :list="$sectionData.components" class="b-draggable-slot b-draggable-slot_100" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
              <div v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                <component
                  v-styler:for="{ el: $sectionData.components[index].element, path: `$sectionData.components[${index}].element`, type: $sectionData.components[index].type, label: component.label }"
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
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
</style>
