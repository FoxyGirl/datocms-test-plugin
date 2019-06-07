import React, { Component } from 'react'
import PropTypes from 'prop-types'

import connectToDatoCms from './connectToDatoCms'
import './style.sass'

@connectToDatoCms(plugin => ({
  developmentMode: plugin.parameters.global.developmentMode,
  fieldValue: plugin.getFieldValue(plugin.fieldPath),
}))
export default class Main extends Component {
  static propTypes = {
    // fieldValue: PropTypes.bool.isRequired,
    plugin: PropTypes.object.isRequired,
  }

  render() {
    // const { fieldValue,  plugin } = this.props
    const { plugin } = this.props
    const slug = plugin.getFieldValue('slug')

    const { urlPrefix } = plugin.parameters.instance
    console.log('Main plugin', plugin)
    console.log(plugin.site.attributes.name)
    console.log(plugin.itemType.attributes.api_key)
    console.log('=====')
    console.log(plugin.itemId)
    console.log(plugin.field.attributes.api_key)
    console.log(plugin.currentUser.attributes.email)
    console.log(plugin.parameters.instance.urlPrefix)

    console.log(plugin.getFieldValue(plugin.fieldPath))
    console.log(plugin.getFieldValue('slug'))

    return (
      <div className="container">
        <a href={`${urlPrefix}${slug}`} title={slug} target="_blank" rel="noopener noreferrer" className="preview-link">
          Preview link
        </a>
        <p>{`${urlPrefix}${slug}`}</p>
      </div>
    )
  }
}
