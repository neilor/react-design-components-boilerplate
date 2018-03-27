import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Sample from './';

storiesOf('Sample', module)
  .add('without click handler', () => (
    <Sample
      label="option 1"
    />
  ))
  .add('with click handler', () => (
    <Sample
      label="Label"
      onClick={action('clicked')}
    />
  ));
