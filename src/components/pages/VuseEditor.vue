<template>
    <VuseBuilder
      v-bind:show-intro="showIntro"
      @saved="onDownload"
      @preview="onPreview"
      @save="onSave"
    />
</template>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import Vuse from '@editor/vuse'
import pwa from '@editor/plugins/pwa'
import Uploader from '@editor/plugins/Uploader.vue'

// slot base
import Sandbox from '@components/slots/Sandbox'

// elements
import Button from '@components/elements/Button'
import TextElement from '@components/elements/TextElement'
import Pic from '@components/elements/Pic'
import Logo from '@components/elements/Logo'
import Delimiter from '@components/elements/Delimiter'
import AvailablePlatforms from '@components/elements/AvailablePlatforms'
import AgeRestrictions from '@components/elements/AgeRestrictions'
import SocialNetworks from '@components/elements/SocialNetworks'
import IconWithText from '@components/elements/IconWithText'
import VideoElement from '@components/elements/VideoElement'
import IframeElement from '@components/elements/IframeElement'
import Timer from '@components/elements/Timer'
import Form from '@components/elements/Form'
import ToggleElement from '@components/elements/ToggleElement'

// sections
// --- header
import HeaderAshOfGods01 from '@components/sections/header/HeaderAshOfGods01'
import HeaderAshOfGods02 from '@components/sections/header/HeaderAshOfGods02'
import HeaderAshOfGods03 from '@components/sections/header/HeaderAshOfGods03'
import ActionButtonHeader from '@components/sections/header/ActionButtonHeader'
import ActionButtonFantasyHeader from '@components/sections/header/ActionButtonFantasyHeader'
import SmmHeader from '@components/sections/header/SmmHeader'
import SmmFantasyHeader from '@components/sections/header/SmmFantasyHeader'
import CenteredLogoHeader from '@components/sections/header/CenteredLogoHeader'
import ActionButtonWesternHeader from '@components/sections/header/ActionButtonWesternHeader'

// --- First screen
import FirstScreenAshOfGods01 from '@components/sections/first-screen/FirstScreenAshOfGods01'
import FirstScreenAshOfGods02 from '@components/sections/first-screen/FirstScreenAshOfGods02'
import FirstScreenAshOfGods03 from '@components/sections/first-screen/FirstScreenAshOfGods03'
import FirstScreenAshOfGods04 from '@components/sections/first-screen/FirstScreenAshOfGods04'
import FirstScreenAshOfGods05 from '@components/sections/first-screen/FirstScreenAshOfGods05'
import FirstScreenAshOfGods06 from '@components/sections/first-screen/FirstScreenAshOfGods06'
import FirstScreenAshOfGods07 from '@components/sections/first-screen/FirstScreenAshOfGods07'
import FirstScreenAshOfGods08 from '@components/sections/first-screen/FirstScreenAshOfGods08'
import FirstScreenAshOfGods09 from '@components/sections/first-screen/FirstScreenAshOfGods09'

import FirstScreenSpace01 from '@components/sections/first-screen/FirstScreenSpace01'
import FirstScreenSpace02 from '@components/sections/first-screen/FirstScreenSpace02'
import FirstScreenSpaceVideoBack from '@components/sections/first-screen/FirstScreenSpaceVideoBack'
import FirstScreenSpaceVideoPlayer from '@components/sections/first-screen/FirstScreenSpaceVideoPlayer'
import FirstScreenFantasy01 from '@components/sections/first-screen/FirstScreenFantasy01'
import FirstScreenFantasy02 from '@components/sections/first-screen/FirstScreenFantasy02'
import FirstScreenFantasyVideoBack from '@components/sections/first-screen/FirstScreenFantasyVideoBack'
import FirstScreenWestern01 from '@components/sections/first-screen/FirstScreenWestern01'
import FirstScreenWesternVideoPlayer01 from '@components/sections/first-screen/FirstScreenWesternVideoPlayer01'
import FirstScreenWesternVideoPlayer02 from '@components/sections/first-screen/FirstScreenWesternVideoPlayer02'
import FirstScreenWesternVideoBack from '@components/sections/first-screen/FirstScreenWesternVideoBack'
// --- gallery
import GallerySwitch from '@components/sections/galleries/GallerySwitch'
import GallerySwitchFantasy from '@components/sections/galleries/GallerySwitchFantasy'
import GalleryPopup from '@components/sections/galleries/GalleryPopup'
import GalleryPopupFantasy from '@components/sections/galleries/GalleryPopupFantasy'
import GalleryPopupWestern from '@components/sections/galleries/GalleryPopupWestern'
// --- products
import ProductsAshOfGods01 from '@components/sections/products/ProductsAshOfGods01'
import ProductsAshOfGods02 from '@components/sections/products/ProductsAshOfGods02'
import Products from '@components/sections/products/Products'
import ProductsFantasy from '@components/sections/products/ProductsFantasy'
import ProductsExtend from '@components/sections/products/ProductsExtend'
import ProductsExtendFantasy from '@components/sections/products/ProductsExtendFantasy'
// --- columns
import FeaturesAshOfGods01 from '@components/sections/columns/FeaturesAshOfGods01'
import FeaturesAshOfGods02 from '@components/sections/columns/FeaturesAshOfGods02'
import FeaturesAshOfGods03 from '@components/sections/columns/FeaturesAshOfGods03'
import FeaturesAshOfGods04 from '@components/sections/columns/FeaturesAshOfGods04'
import FeaturesAshOfGods05 from '@components/sections/columns/FeaturesAshOfGods05'
import FeaturesAshOfGods06 from '@components/sections/columns/FeaturesAshOfGods06'
import FeaturesAshOfGods07 from '@components/sections/columns/FeaturesAshOfGods07'
import FeaturesAshOfGods08 from '@components/sections/columns/FeaturesAshOfGods08'
import AwardsAshOfGods01 from '@components/sections/columns/AwardsAshOfGods01'
import AwardsAshOfGods02 from '@components/sections/columns/AwardsAshOfGods02'

import Columns from '@components/sections/columns/Columns'
import ColumnsFantasy from '@components/sections/columns/ColumnsFantasy'
import ColumnsWestern from '@components/sections/columns/ColumnsWestern'
// --- carousel
import CarouselAshOfGods01 from '@components/sections/carousel/CarouselAshOfGods01'
import Carousel from '@components/sections/carousel/Carousel'
// --- forms
import CallToActionAndTextAshOfGods01 from '@components/sections/forms/CallToActionAndTextAshOfGods01'
import FormCenter from '@components/sections/forms/FormCenter'
import FormCenterFantasy from '@components/sections/forms/FormCenterFantasy'
import FormRight from '@components/sections/forms/FormRightSide'
import FormRight2 from '@components/sections/forms/FormRightSide2'
import FormLeft from '@components/sections/forms/FormLeftSideVariant'
import FormLeft2 from '@components/sections/forms/FormLeftSideVariant2'

// --- footers
import FooterAshOfGods01 from '@components/sections/footers/FooterAshOfGods01'
import FooterAshOfGods02 from '@components/sections/footers/FooterAshOfGods02'
import FooterAshOfGods03 from '@components/sections/footers/FooterAshOfGods03'
import FooterAshOfGods04 from '@components/sections/footers/FooterAshOfGods04'

// --- other
import CallToActionAshOfGods01 from '@components/sections/elements/CallToActionAshOfGods01'
import CallToActionAshOfGods02 from '@components/sections/elements/CallToActionAshOfGods02'
import SystemRequirements from '@components/sections/elements/SystemRequirements'
import SystemRequirementsFantasy from '@components/sections/elements/SystemRequirementsFantasy'
import SystemRequirementsWestern from '@components/sections/elements/SystemRequirementsWestern'
import FooterSpace from '@components/sections/footers/FooterSpace'
import FooterFantasy from '@components/sections/footers/FooterFantasy'
import FooterWestern from '@components/sections/footers/FooterWestern'
import FrequentlyAskedQuestions from '@components/sections/elements/FrequentlyAskedQuestions'
import FrequentlyAskedQuestionsWestern from '@components/sections/elements/FrequentlyAskedQuestionsWestern'
import Slider from '@components/sections/slider/Slider'
import SliderFantasy from '@components/sections/slider/SliderFantasy'
import SliderWestern from '@components/sections/slider/SliderWestern'
import SliderAshOfGods01 from '@components/sections/slider/SliderAshOfGods01'
import SliderAshOfGods02 from '@components/sections/slider/SliderAshOfGods02'
import SliderAshOfGods03 from '@components/sections/slider/SliderAshOfGods03'

import ElementsAshOfGods01 from '@components/sections/elements/ElementsAshOfGods01'
import TextWithButtonTwoColumns01 from '@components/sections/elements/TextWithButtonTwoColumns01'
import BlockTextsWithVideo01 from '@components/sections/elements/BlockTextsWithVideo01'
import BlockWithVideo01 from '@components/sections/elements/BlockWithVideo01'
import VideoAndCallToAction01 from '@components/sections/elements/VideoAndCallToAction01'

import store from '@store'

const ELEMENTS = {
  Uploader,
  Sandbox,
  Button,
  TextElement,
  Pic,
  Logo,
  Delimiter,
  AvailablePlatforms,
  AgeRestrictions,
  SocialNetworks,
  IconWithText,
  VideoElement,
  IframeElement,
  Timer,
  Form,
  ToggleElement
}

const COMPONENTS = {
  HeaderAshOfGods01,
  HeaderAshOfGods02,
  HeaderAshOfGods03,
  ActionButtonHeader,
  SmmHeader,
  CenteredLogoHeader,
  ActionButtonFantasyHeader,
  SmmFantasyHeader,
  ActionButtonWesternHeader,

  FirstScreenAshOfGods01,
  FirstScreenAshOfGods02,
  FirstScreenAshOfGods03,
  FirstScreenAshOfGods04,
  FirstScreenAshOfGods05,
  FirstScreenAshOfGods06,
  FirstScreenAshOfGods07,
  FirstScreenAshOfGods08,
  FirstScreenAshOfGods09,
  FirstScreenSpace01,
  FirstScreenSpace02,
  FirstScreenSpaceVideoBack,
  FirstScreenSpaceVideoPlayer,
  FirstScreenFantasy01,
  FirstScreenFantasy02,
  FirstScreenFantasyVideoBack,
  FirstScreenWestern01,
  FirstScreenWesternVideoPlayer01,
  FirstScreenWesternVideoPlayer02,
  FirstScreenWesternVideoBack,

  Slider,
  SliderFantasy,
  SliderWestern,
  SliderAshOfGods01,
  SliderAshOfGods02,
  SliderAshOfGods03,

  FeaturesAshOfGods01,
  FeaturesAshOfGods02,
  FeaturesAshOfGods03,
  FeaturesAshOfGods04,
  FeaturesAshOfGods05,
  FeaturesAshOfGods06,
  FeaturesAshOfGods07,
  FeaturesAshOfGods08,
  AwardsAshOfGods01,
  AwardsAshOfGods02,
  Columns,
  ColumnsFantasy,
  ColumnsWestern,

  GallerySwitch,
  GalleryPopup,
  CarouselAshOfGods01,
  Carousel,
  GalleryPopupFantasy,
  GallerySwitchFantasy,
  GalleryPopupWestern,

  ProductsAshOfGods01,
  ProductsAshOfGods02,
  Products,
  ProductsExtend,
  ProductsFantasy,
  ProductsExtendFantasy,

  CallToActionAndTextAshOfGods01,
  FormCenter,
  FormCenterFantasy,
  FormRight,
  FormLeft,
  FormRight2,
  FormLeft2,
  ElementsAshOfGods01,
  TextWithButtonTwoColumns01,
  BlockTextsWithVideo01,
  BlockWithVideo01,
  VideoAndCallToAction01,

  CallToActionAshOfGods01,
  CallToActionAshOfGods02,
  SystemRequirements,
  SystemRequirementsFantasy,
  SystemRequirementsWestern,
  FrequentlyAskedQuestions,
  FrequentlyAskedQuestionsWestern,

  FooterAshOfGods01,
  FooterAshOfGods02,
  FooterAshOfGods03,
  FooterAshOfGods04,
  FooterSpace,
  FooterFantasy,
  FooterWestern
}

Vuse.mix({ components: ELEMENTS })

for (let component in COMPONENTS) {
  Vuse.component(component, COMPONENTS[component])
}

Vuse.use(pwa)

Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
})

export default {
  computed: {
    // TODO: delete this when CRUD UI is complete
    showIntro () {
      return this.$route.params.slug === 'new'
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      await store.dispatch('getLandingForUser', to.params.slug)
      to.meta.title = store.state.name + ' - Ptah'
      next()
    } catch (e) {
      console.warn(e)
      next({ path: '/404' })
    }
  },

  created () {
    Vue.use(Vuse, {
      js: '/js/cjs.js',
      css: '/ptah_sections.css'
    })
  },

  mounted () {
    const body = document.querySelector('body')
    body.classList.add('b-body_app')

    this.$Progress.finish()
  },

  methods: {
    ...mapActions([
      'saveLanding'
    ]),
    onDownload (builder) {
      builder.export('pwa')
    },
    onPreview (builder) {
      builder.export('preview')
    },
    onSave (builder) {
      this.saveLanding(builder.export('json'))
    }
  }
}
</script>
