import React from 'react';
import {Input} from 'react-toolbox';

import BaseLayout from './dom/BaseLayout.js';
import render_dom_delayed from './dom/render_dom.js';

render_dom_delayed(
  <BaseLayout>
    <section>
      <Input type="text" label="Filter" multiline rows="10"/>
      <Input type="text" label="Filter all" multiline rows="10"/>
    </section>
  </BaseLayout>
);
