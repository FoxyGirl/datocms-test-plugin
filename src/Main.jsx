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

  state = {
    slug: '',
    locale: '',
    urlPrefix: '',
    modelName: '',
    frontendUrl: '',
  }

  componentDidMount() {
    const { plugin } = this.props
    const slug = plugin.getFieldValue('slug')
    const {
      locale,
      parameters: {
        instance: { urlPrefix },
      },
      itemType: {
        attributes: { api_key: modelName },
      },
      site: {
        attributes: { frontend_url: frontendUrl },
      },
    } = plugin
    this.unsubscribe = plugin.addFieldChangeListener('slug', value => {
      this.setState({ slug: value })
    })
    this.setState({
      slug,
      locale,
      urlPrefix,
      frontendUrl,
      modelName,
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { plugin } = this.props
    // eslint-disable-next-line object-curly-newline
    const { slug, locale, urlPrefix, modelName, frontendUrl } = this.state

    console.log('Main plugin', plugin)
    console.log('=====')

    return (
      <div className="container">
        <a
          href={`${urlPrefix}${locale}/${slug}`}
          title={slug}
          target="_blank"
          rel="noopener noreferrer"
          className="preview-link"
        >
          Preview link
        </a>
        <p>{`${urlPrefix}${locale}/${slug}`}</p>
        <p style={{ color: 'red' }}>{`${frontendUrl}${locale}/${modelName}/${slug}`}</p>
      </div>
    )
  }
}
