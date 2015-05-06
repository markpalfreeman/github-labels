import Model from 'ampersand-model'
import githubMixin from '../helpers/github-mixin'

export default Model.extend({
  url () {
    return 'https://api.github.com/repos/' + this.full_name
  },

  props: {
    id: 'number',
    name: 'string',
    full_name: 'string',
    description: 'string'
  },

  derived: {
    appUrl () {
      return '/repos/' + this.full_name
    }
  }

})
