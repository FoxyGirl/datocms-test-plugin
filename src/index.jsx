import React from 'react'
import { render } from 'react-dom'

// import Main from './Main'
// eslint-disable-next-line no-use-before-define
window.DatoCmsPlugin.init(plugin => {
  plugin.startAutoResizer()

  const container = document.createElement('div')
  document.body.appendChild(container)

  // render(<Main plugin={plugin} />, container);
  render(<div>Hello, DatoCMS World!!</div>, container)
})
