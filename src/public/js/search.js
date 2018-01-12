import React from 'react';
import ReactDOM from 'react-dom';

import BaseLayout from './BaseLayout.js';

function render_dom(){
  ReactDOM.render(
    <h1>asdf</h1>,
    document.getElementById('approot')
  );
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  render_dom();
} else {
  window.addEventListener('DOMContentLoaded', render_dom, false);
}
