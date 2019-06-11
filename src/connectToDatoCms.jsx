import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default mapPluginToProps => BaseComponent =>
  // eslint-disable-next-line implicit-arrow-linebreak
  class ConnectToDatoCms extends Component {
    static propTypes = {
      plugin: PropTypes.object.isRequired,
    }

    constructor(props) {
      super(props)
      this.state = mapPluginToProps(props.plugin)
    }

    componentDidMount() {
      const { plugin } = this.props

      this.unsubscribe = plugin.addFieldChangeListener(plugin.fieldPath, () => {
        this.setState(mapPluginToProps(plugin))
      })
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    render() {
      return <BaseComponent {...this.props} {...this.state} />
    }
  }
