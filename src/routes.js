import BuilderModalContent from '@editor/components/BuilderModalContent'
import BuilderSiteSettingsSeo from '@editor/components/BuilderSiteSettingsSeo'
import BuilderSiteSettingsPageStyle from '@editor/components/BuilderSiteSettingsPageStyle'
import BuilderSiteSettingsAddJsScripts from '@editor/components/BuilderSiteSettingsAddJsScripts'
import BuilderSiteSettingsIntegrations from '@editor/components/BuilderSiteSettingsIntegrations'
import BuilderSiteSettingsIntegrationsGoogleTag from '@editor/components/BuilderSiteSettingsIntegrationsGoogleTag'
import BuilderSiteSettingsIntegrationsGoogleAnalitycs from '@editor/components/BuilderSiteSettingsIntegrationsGoogleAnalitycs'
import BuilderSiteSettingsIntegrationsFacebookPixel from '@editor/components/BuilderSiteSettingsIntegrationsFacebookPixel'
import BuilderSiteSettingsIntegrationsMailchimp from '@editor/components/BuilderSiteSettingsIntegrationsMailchimp'
import BuilderSiteSettingsFonts from '@editor/components/BuilderSiteSettingsFonts'
import TheWizardModal from '@src/components/pages/wizard/TheWizardModal'
import TheProjectNamePage from '@src/components/pages/wizard/TheProjectNamePage'
import TheProjectWelcomePage from '@src/components/pages/wizard/TheProjectWelcomePage'
import TheOnboardingLogoPage from '@src/components/pages/wizard/TheOnboardingLogoPage'
import TheOnboardingBackgroundPage from '@src/components/pages/wizard/TheOnboardingBackgroundPage'
import TheOnboardingColorsPage from '@src/components/pages/wizard/TheOnboardingColorsPage'
import TheOnboardingFirstScreenPage from '@src/components/pages/wizard/TheOnboardingFirstScreenPage'
import TheProjectGoals from '@src/components/pages/wizard/TheProjectGoals'
import TheProjectTemplatesPage from '@src/components/pages/wizard/TheProjectTemplatesPage'
import TheProjectPreviewPage from '@src/components/pages/wizard/TheProjectPreviewPage'

const routes = [
  {
    path: '/',
    redirect: '/dashboard/'
  },
  {
    path: '/dashboard/',
    component: () => import(/* webpackChunkName: "Layout" */'@components/Layout'),
    children: [
      {
        path: '',
        meta: {
          title: 'Dashboard - Ptah'
        },
        component: () => lazyLoadView(import(/* webpackChunkName: "Dashboard" */ '@components/pages/Dashboard')),
        name: 'Dashboard',
        children: [
          {
            path: 'wizard',
            component: TheWizardModal,
            redirect: '/dashboard/',
            children: [
              {
                path: 'name',
                component: TheProjectNamePage
              },
              {
                path: 'goals',
                component: TheProjectGoals,
                meta: {
                  width: '100vw',
                  height: '100vh'
                }
              },
              {
                path: 'templates',
                component: TheProjectTemplatesPage
              },
              {
                path: 'preview',
                component: TheProjectPreviewPage,
                meta: {
                  width: '100vw',
                  height: '100vh'
                }
              },
              {
                path: 'welcome',
                component: TheProjectWelcomePage
              },
              {
                path: 'logo',
                component: TheOnboardingLogoPage
              },
              {
                path: 'background',
                component: TheOnboardingBackgroundPage
              },
              {
                path: 'firstScreen',
                component: TheOnboardingFirstScreenPage
              },
              {
                path: 'colors',
                component: TheOnboardingColorsPage
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/editor/:slug',
    component: () => import(/* webpackChunkName: "VuseEditor" */ '@components/pages/VuseEditor'),
    name: 'VuseEditor',
    meta: {
      title: 'Ptah'
    },
    alias: '',
    children: [
      {
        path: 'settings',
        component: BuilderModalContent,
        redirect: 'settings/pageStyle',
        children: [
          {
            path: 'pageStyle',
            component: BuilderSiteSettingsPageStyle
          },
          {
            path: 'seoSettings',
            component: BuilderSiteSettingsSeo
          },
          {
            path: 'addJsScrips',
            component: BuilderSiteSettingsAddJsScripts
          },
          {
            path: 'integrations',
            component: BuilderSiteSettingsIntegrations,
            children: [
              {
                path: 'googleTag',
                component: BuilderSiteSettingsIntegrationsGoogleTag
              },
              {
                path: 'googleAnalitycs',
                component: BuilderSiteSettingsIntegrationsGoogleAnalitycs
              },
              {
                path: 'facebookPixel',
                component: BuilderSiteSettingsIntegrationsFacebookPixel
              },
              {
                path: 'mailchimp',
                component: BuilderSiteSettingsIntegrationsMailchimp,
                meta: {
                  ultraWide: true
                }
              }
            ]
          },
          {
            path: 'fonts',
            component: BuilderSiteSettingsFonts,
            meta: {
              wide: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login/',
    component: () => import('@components/pages/Login'),
    name: 'Login',
    meta: {
      title: 'Login - Ptah'
    },
    alias: ''
  },
  {
    path: '/_sandbox/',
    component: () => import('@components/pages/Sandbox'),
    name: 'Sandbox',
    alias: ''
  },
  {
    path: '/oauth2/',
    component: () => import('@components/pages/MailchimpOauthComplete'),
    name: 'OauthComplete',
    alias: ''
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@components/NotFound'),
    meta: {
      title: '404 - Ptah'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView (AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: import('@components/base/BaseLoading'),
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: import('@components/base/BaseTimeout'),
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 70,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 15000
  })

  return Promise.resolve({
    functional: true,
    render (h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    }
  })
}

export default routes
