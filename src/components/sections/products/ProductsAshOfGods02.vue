<script>
import * as types from '@editor/types'
import * as _ from 'lodash-es'
import Seeder from '@editor/seeder'
import defaults from '../../mixins/defaults'
import sectionMedia from '../../mixins/sectionMedia'

const GROUP_NAME = 'Products'
const NAME = 'ProductsAshOfGods02'
const BG_SECTION = 'none'
const COVER = 'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/4c54cb2e-e52f-49ea-afc0-61115a120704.jpg'
const DESCRIPTION = 'Product list side expanded view'

let prev = [
  'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/17be8b91-bd31-4e34-b750-5805c1aa31a7.png',
  'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/14ba8d42-d901-44c5-99cd-7b39f0e1ba29.png',
  'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/4f82d5c0-e7a3-46f4-81ac-e1469b4792fb.png',
  'https://cdn.ptah.pro/tst/5ef9a42509b4c100015ca9d4/2478c9a1-eb5e-40bd-8558-c2d5bbfca033.png'
]

let label = [
  'Start', 'Full', 'Delux', 'Ultimate'
]

let price = [
  '9.99', '19.99', '29.99', '39.99'
]

const [
  C_CUSTOM_1,
  C_CUSTOM_2,
  C_CUSTOM_3,
  C_CUSTOM_4
] = Array.from(new Array(4), (x, i) => {
  return [
    {
      element: {
        styles: {
          'background-image': `url(${prev[i]})`,
          'background-color': 'rgba(0, 0, 0, 0)',
          'background-repeat': 'no-repeat',
          'background-size': 'contain',
          'width': '190px',
          'height': '190px'
        },
        media: {
          'is-mobile': {
            'width': '190px',
            'height': '190px'
          }
        }
      }
    },
    {
      element: {
        text: `<h3>${label[i]} edition</h3>`,
        styles: {
          'font-size': '2.4rem',
          'color': '#ECD19A',
          'padding-bottom': '30px'
        },
        media: {
          'is-mobile': {
            'font-size': '2.4rem',
            'color': '#ECD19A',
            'padding-bottom': '30px'
          }
        }
      }
    },
    {
      element: {
        text: `$${price[i]}`,
        styles: {
          'background-color': '#A1210E',
          'color': '#ECD19A',
          'font-size': '2.4rem',
          'text-align': 'center',
          'width': '214px',
          'height': '54px',
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': '#ECD19A',
          'margin-bottom': '20px'
        },
        pseudo: {
          hover: {
            'color': '#fff',
            'background-color': '#A1210E !important'
          }
        },
        media: {
          'is-mobile': {
            'font-size': '2rem',
            'width': '191px',
            'height': '46px',
            'margin-bottom': '20px'
          }
        }
      }
    }
  ]
})

const [
  C_CUSTOM_1_M,
  C_CUSTOM_2_M,
  C_CUSTOM_3_M,
  C_CUSTOM_4_M
] = Array.from(new Array(4), (x, i) => {
  return [
    {
      element: {
        styles: {
          'background-image': `url(${prev[i]})`,
          'background-color': 'rgba(0, 0, 0, 0)',
          'background-repeat': 'no-repeat',
          'background-size': 'contain',
          'width': '190px',
          'height': '190px'
        }
      }
    },
    {
      element: {
        text: `<h3>${label[i]} Edition</h3>`,
        styles: {
          'font-size': '2.4rem',
          'color': '#ECD19A'
        },
        media: {
          'is-mobile': {
            'font-size': '2.4rem'
          }
        }
      }
    }
  ]
})

const C_CUSTOM_1D = [
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Digital game copy</strong>'
      },
      styles: {
        color: '#ECD19A'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Horse</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Great sword</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Digital soundtrack</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  }
]

const C_CUSTOM_2D = [
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Digital game copy</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Horse</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Great sword</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Digital soundtrack</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  }
]

const C_CUSTOM_3D = [
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Digital game copy</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Horse</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Great sword</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: 'rgba(0,0,0,0)'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Digital soundtrack</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  }
]

const C_CUSTOM_4D = [
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Digital game copy</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Horse</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Great sword</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  },
  {
    element: {
      colorFill: {
        color: '#ECD19A'
      },
      icon: {
        value: 'checkMark',
        name: 'checkMark',
        text: '<strong>Digital soundtrack</strong>'
      },
      styles: {
        color: '#ffffff'
      }
    }
  }
]

const C_CUSTOM_CONTAINER = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center'
  }
}

const C_CUSTOM_CONTAINER_M = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'center'
  }
}

const C_CUSTOM_CONTAINER_D = {
  styles: {
    'flex-direction': 'column',
    'align-items': 'flex-start',
    'padding-top': '10px',
    'padding-left': '60px'
  },
  media: {
    'is-mobile': {
      'padding-top': '10px',
      'padding-left': '80px'
    }
  }
}

const SCHEMA_CUSTOM = {
  mainStyle: {
    styles: {
      'background-image': BG_SECTION,
      'background-color': '#000000',
      'padding-top': '80px',
      'padding-bottom': '80px'
    },
    media: {
      'is-mobile': {
        'padding-top': '0px',
        'padding-bottom': '40px'
      }
    },
    overlay: {
      color: 'rgba(0,0,0,1)',
      opacity: '0'
    }
  },
  containerStandart: _.merge({}, C_CUSTOM_CONTAINER),
  containerStandartM: _.merge({}, C_CUSTOM_CONTAINER_M),
  containerStandartD: _.merge({}, C_CUSTOM_CONTAINER_D),
  containerFull: _.merge({}, C_CUSTOM_CONTAINER),
  containerFullM: _.merge({}, C_CUSTOM_CONTAINER_M),
  containerFullD: _.merge({}, C_CUSTOM_CONTAINER_D),
  containerDeluxe: _.merge({}, C_CUSTOM_CONTAINER),
  containerDeluxeM: _.merge({}, C_CUSTOM_CONTAINER_M),
  containerDeluxeD: _.merge({}, C_CUSTOM_CONTAINER_D),
  containerUltimate: _.merge({}, C_CUSTOM_CONTAINER),
  containerUltimateM: _.merge({}, C_CUSTOM_CONTAINER_M),
  containerUltimateD: _.merge({}, C_CUSTOM_CONTAINER_D),
  componentsStandart: _.merge({}, C_CUSTOM_1),
  componentsStandartM: _.merge({}, C_CUSTOM_1_M),
  componentsStandartD: _.merge({}, C_CUSTOM_1D),
  componentsFull: _.merge({}, C_CUSTOM_2),
  componentsFullM: _.merge({}, C_CUSTOM_2_M),
  componentsFullD: _.merge({}, C_CUSTOM_2D),
  componentsDeluxe: _.merge({}, C_CUSTOM_3),
  componentsDeluxeM: _.merge({}, C_CUSTOM_3_M),
  componentsDeluxeD: _.merge({}, C_CUSTOM_3D),
  componentsUltimate: _.merge({}, C_CUSTOM_4),
  componentsUltimateM: _.merge({}, C_CUSTOM_4_M),
  componentsUltimateD: _.merge({}, C_CUSTOM_4D),
  edited: true
}

const COMPONENTS = [
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-image',
    label: 'Pic'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'text'
  },
  {
    name: 'Button',
    element: types.Button,
    type: 'button',
    class: 'b-button-test',
    label: 'button'
  }
]

const COMPONENTS_M = [
  {
    name: 'Pic',
    element: types.Image,
    type: 'image',
    class: 'b-image',
    label: 'Pic'
  },
  {
    name: 'TextElement',
    element: types.Text,
    type: 'text',
    class: 'b-text',
    label: 'text'
  }
]

const COMPONENTS_D = [
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'iconWithText',
    class: 'b-text-icon',
    label: 'icon with text'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'iconWithText',
    class: 'b-text-icon',
    label: 'icon with text'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'iconWithText',
    class: 'b-text-icon',
    label: 'icon with text'
  },
  {
    name: 'IconWithText',
    element: types.IconWithText,
    type: 'iconWithText',
    class: 'b-text-icon',
    label: 'icon with text'
  }
]

export default {
  name: NAME,

  group: GROUP_NAME,

  description: DESCRIPTION,

  mixins: [defaults, sectionMedia],

  cover: COVER,

  $schema: {
    mainStyle: types.ProductSection,
    container: types.StyleObject,
    containerStandart: types.StyleObject,
    containerStandartM: types.StyleObject,
    containerStandartD: types.StyleObject,
    containerFull: types.StyleObject,
    containerFullM: types.StyleObject,
    containerFullD: types.StyleObject,
    containerDeluxe: types.StyleObject,
    containerDeluxeM: types.StyleObject,
    containerDeluxeD: types.StyleObject,
    containerUltimate: types.StyleObject,
    containerUltimateM: types.StyleObject,
    containerUltimateD: types.StyleObject,
    componentsStandart: _.merge([], COMPONENTS),
    componentsStandartM: _.merge([], COMPONENTS_M),
    componentsStandartD: _.merge([], COMPONENTS_D),
    componentsFull: _.merge([], COMPONENTS),
    componentsFullM: _.merge([], COMPONENTS_M),
    componentsFullD: _.merge([], COMPONENTS_D),
    componentsDeluxe: _.merge([], COMPONENTS),
    componentsDeluxeM: _.merge([], COMPONENTS_M),
    componentsDeluxeD: _.merge([], COMPONENTS_D),
    componentsUltimate: _.merge([], COMPONENTS),
    componentsUltimateM: _.merge([], COMPONENTS_M),
    componentsUltimateD: _.merge([], COMPONENTS_D),
    heightRightStage: 0
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
    class="b-products-columns"
    :class="$sectionData.mainStyle.classes"
    :style="[$sectionData.mainStyle.styles, $sectionData.objVarsMedia]"
    v-styler:section="$sectionData.mainStyle"
  >
    <slot name="menu"/>
    <slot name="video"/>
    <slot name="overlay"/>

        <div class="b-grid">
          <div class="b-grid__row">
            <div class="b-grid__col-12">
              <sandbox
                class="b-sandbox"
                container-path="$sectionData.container"
                components-path="$sectionData.components"
              >
                <draggable v-model="$sectionData.components" class="b-draggable-slot" :style="$sectionData.container.styles" @start="$_drag('components')" @change="$_dragStop">
                  <div :class="`b-draggable-slot__${component.type}`" v-for="(component, index) in $sectionData.components" v-if="$sectionData.components.length !== 0" :key="index">
                    <component
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
          </div>
          <div class="b-section-padd">
            <div class="b-section-padd-border">
              <div class="b-grid__row b-products-columns__row"
                   :style="{ 'align-items' : $sectionData.mainStyle.styles['align-items']}">
                <div class="b-grid__col-3 b-grid__col-m-12 "
                  v-for="(product, key) in $sectionData.mainStyle.products"
                  :key="key"
                  v-if="$sectionData.mainStyle.products[key].visible"
                  >
                  <sandbox
                    class="b-sandbox"
                    :container-path="`$sectionData.container${key}`"
                    :components-path="`$sectionData.components${key}`"
                    >
                    <draggable v-model="$sectionData['components' + key]" class="b-draggable-slot" :style="$sectionData[`container${key}`].styles" @start="$_drag(`components${key}`)" @change="$_dragStop">
                      <div
                        v-for="(component, index) in $sectionData[`components${key}`]"
                        v-if="$sectionData[`components${key}`].length !== 0"
                        :key="index"
                        >
                        <component class="b-products-columns-component"
                          v-styler:for="{ el: $sectionData[`components${key}`][index].element, path: `$sectionData.components${key}[${index}].element`, type: $sectionData[`components${key}`][index].type, label: $sectionData[`components${key}`][index].label }"
                          :is="$sectionData[`components${key}`][index].name"
                          :href="$sectionData[`components${key}`][index].element.link.href"
                          :target="$sectionData[`components${key}`][index].element.link.target"
                          :path="`components${key}[${index}].element`"
                          :style="$sectionData[`components${key}`][index].element.styles"
                          :class="[$sectionData[`components${key}`][index].element.classes, $sectionData[`components${key}`][index].class]"
                          >
                          <div v-html="$sectionData[`components${key}`][index].element.text"></div>
                        </component>
                      </div>
                    </draggable>
                  </sandbox>
                  <sandbox
                    class="b-sandbox"
                    :container-path="`$sectionData.container${key}D`"
                    :components-path="`$sectionData.components${key}D`"
                    >
                    <draggable v-model="$sectionData['components' + key + 'D']" class="b-draggable-slot" :style="$sectionData[`container${key}D`].styles" @start="$_drag(`components${key}D`)" @change="$_dragStop">
                      <div
                        v-for="(component, index) in $sectionData[`components${key}D`]"
                        v-if="$sectionData[`components${key}D`].length !== 0"
                        :key="index"
                        >
                        <component class="b-products-columns-component"
                          v-styler:for="{ el: $sectionData[`components${key}D`][index].element, path: `$sectionData.components${key}D[${index}].element`, type: $sectionData[`components${key}D`][index].type, label: $sectionData[`components${key}D`][index].label }"
                          :is="$sectionData[`components${key}D`][index].name"
                          :href="$sectionData[`components${key}D`][index].element.link.href"
                          :target="$sectionData[`components${key}D`][index].element.link.target"
                          :path="`components${key}D[${index}].element`"
                          :style="$sectionData[`components${key}D`][index].element.styles"
                          :class="[$sectionData[`components${key}D`][index].element.classes, $sectionData[`components${key}D`][index].class]"
                          >
                          <div v-html="$sectionData[`components${key}D`][index].element.text"></div>
                        </component>
                      </div>
                    </draggable>
                  </sandbox>
                </div>
              </div>
            </div><!--/.b-products-columns__padd-border-->
          </div><!--/.b-products-columns__padd-->
        </div>
  </section>
</template>

<style lang="sass" scoped>
</style>
