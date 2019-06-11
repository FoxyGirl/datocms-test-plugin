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
    isVisibleFullLink: false,
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
    } = plugin
    this.unsubscribe = plugin.addFieldChangeListener('slug', value => {
      this.setState({ slug: value })
    })
    this.setState({
      slug,
      locale,
      urlPrefix,
      modelName,
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleClick = () => {
    this.setState(prevState => ({
      isVisibleFullLink: !prevState.isVisibleFullLink,
    }))
  }

  render() {
    const { plugin } = this.props
    // eslint-disable-next-line object-curly-newline
    const { slug, locale, urlPrefix, modelName, isVisibleFullLink } = this.state
    const fullLink = `${urlPrefix}${locale}/${modelName}/${slug}`
    console.log('Main plugin', plugin)
    console.log('=====')

    return (
      <div className="container">
        <div className="link-wrap">
          <a href={fullLink} title={slug} target="_blank" rel="noopener noreferrer" className="preview-link">
            Preview link
          </a>
          <button type="button" onClick={this.handleClick}>
            {`${isVisibleFullLink ? 'Hide' : 'Show'} full link`}
          </button>
        </div>
        {isVisibleFullLink && <p>{fullLink}</p>}
      </div>
    )
  }
}
