import React from 'react'
import { render } from 'react-dom'
import Main from './Main'

window.DatoCmsPlugin.init(plugin => {
  console.log('plugin', plugin)
  plugin.startAutoResizer()

  const container = document.createElement('div')
  document.body.appendChild(container)

  render(<Main plugin={plugin} />, container)
  // render(<div>Hello, DatoCMS World!!</div>, container)
})
