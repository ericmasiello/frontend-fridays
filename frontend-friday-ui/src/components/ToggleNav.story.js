import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ToggleNav, ToggleButton, ToggleList, ToggleItem } from './ToggleNav';

storiesOf('ToggleNav', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>
      <ToggleNav>
        <ToggleButton>Home</ToggleButton>
        <ToggleList>
          <ToggleItem><a href="/">Home</a></ToggleItem>
          <ToggleItem><a href="/settings">Settings</a></ToggleItem>
          <ToggleItem><a href="/help">Help</a></ToggleItem>
          <ToggleItem><button>Click me</button></ToggleItem>
        </ToggleList>
      </ToggleNav>
    </div>
  ));
