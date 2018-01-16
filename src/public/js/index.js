import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Input} from 'react-toolbox';

import BaseLayout from './BaseLayout.js';

function render_dom(){
  ReactDOM.render(
    <BaseLayout>
      <section>
        <Input type="text" label="Filter" multiline rows="10"/>
        <Input type="text" label="Filter all" multiline rows="10"/>
      </section>
    </BaseLayout>,
    document.getElementById('approot')
  );
}

const loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  render_dom();
} else {
  window.addEventListener('DOMContentLoaded', render_dom, false);
}
