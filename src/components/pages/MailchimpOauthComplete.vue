<template>
  <div class="oauth-complete">
    <base-loading></base-loading>
  </div>
</template>

<script>
import { getParameterByName } from '@editor/util'

export default {
  name: 'MailchimpOauthComplete',

  mounted () {
    let data = {
      code: getParameterByName('code', window.location.search),
      scope: getParameterByName('scope', window.location.search)
    }

    window.parent.postMessage(JSON.stringify(data), '*')
  }
}
</script>

<style lang="sass" scoped>
  .oauth-complete
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    background: #fff
</style>
