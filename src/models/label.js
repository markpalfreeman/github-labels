import Model from 'ampersand-model'

export default Model.extend({
  idAttribute: 'name',

  props: {
    name: 'string',
    color: 'string'
  }
})
