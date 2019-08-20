import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

storiesOf('Welcome', module).add('to Storybook', () => (
  <div>
    Test
  </div>
));

storiesOf('Button', module)
  .add('with text', () => (
    <div>
      Test2
    </div>
  ))
  .add('with some emoji', () => (
    <div>
      Test3
    </div>
  ));
