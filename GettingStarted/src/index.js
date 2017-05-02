import React from 'react'
import ReactDOM from 'react-dom'

import Container from './Container'

const mountNode = document.querySelector('#root')
if (mountNode) {
  ReactDOM.render(<Container/>, mountNode);
}