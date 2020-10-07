import Styler from './components/VuseStyler.vue'
import {getTypeFromTagName, getTypeFromSchema, randomPoneId} from './util'

function installStyler ({ builder, Vue }) {
  const StylerInstance = Vue.extend(Styler).extend({
    beforeCreate () {
      this.$builder = builder
    }
  })

  builder.styler = {
    inserted (el, binding, vnode) {
      const newNode = document.createElement('div')
      const section = vnode.context.$section
      const rootApp = vnode.context.$root.$el
      const stylerPath = `${binding.value.path}-${section.id}`
      const findStyler = document.querySelector(`.b-styler[path="${binding.value.path}-${section.id}"]`)
      const styler = findStyler || newNode
      let name
      let type = false

      rootApp.appendChild(newNode)
      el.classList.add('is-editable')
      el.setAttribute('section', section.id)

      if (binding.arg === 'for' || binding.arg === 'galleryItem' || binding.arg === 'product') {
        name = binding.value.path
      } else {
        name = binding.expression
      }

      if (binding.value.type !== undefined) {
        type = binding.value.type
        el.classList.add('b-ptah-element')
      }

      if (binding.value.el && binding.value.el.link && binding.value.el.link.behavior) {
        el.dataset.behavior = binding.value.el.link.behavior || 'auto'
      }

      if (binding.value.el && !binding.value.el.id) {
        binding.value.el.id = randomPoneId()
      }

      section.stylers.push(new StylerInstance({
        store: vnode.context.$store,
        propsData: {
          stylerPath,
          el,
          section: section,
          type: (binding.arg !== 'index' && binding.arg !== 'for' && binding.arg) || type || getTypeFromSchema(name, section.schema) || getTypeFromTagName(el.tagName),
          options: binding.arg === 'for' || binding.arg === 'galleryItem'|| binding.arg === 'product' || binding.arg === 'system' ? binding.value.el : binding.value,
          label: binding.value.label,
          name: name
        }
      }).$mount(styler))
    },

    update (el, binding, vnode) {
      if (binding.value.el && binding.value.el.behavior) {
        el.dataset.behavior = binding.value.el.behavior || 'auto'
      }
    }
  }
}

export default installStyler
