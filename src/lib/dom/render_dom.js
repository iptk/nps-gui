import React from 'react'
import ReactDOM from 'react-dom'

function render_dom(dom, parent){
  if(parent == undefined){
    parent = document.getElementById('approot')
  }
  ReactDOM.render(dom, parent)
}

function render_dom_delayed(dom, parent){
  const loadedStates = ['complete', 'loaded', 'interactive']

  if (loadedStates.includes(document.readyState) && document.body) {
    render_dom(dom, parent)
  } else {
    window.addEventListener(
      'DOMContentLoaded', function(){render_dom(dom, parent)}, false
    )
  }
}

export default render_dom_delayed
