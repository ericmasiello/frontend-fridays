import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ToggleNav, ToggleButton, ToggleList, ToggleItem, ToggleLink } from './ToggleNav';

storiesOf('ToggleNav', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <>
      <ToggleNav>
        <ToggleButton>Home</ToggleButton>
        <ToggleList>
          <ToggleItem><ToggleLink href="/">Home</ToggleLink></ToggleItem>
          <ToggleItem><ToggleLink href="/settings">Settings</ToggleLink></ToggleItem>
          <ToggleItem><ToggleLink href="/help">Help</ToggleLink></ToggleItem>
          <ToggleItem><ToggleLink as="button">Click me</ToggleLink></ToggleItem>
        </ToggleList>
      </ToggleNav>
      <p>I should be covered up when the toggle list is visible</p>
    </>
  ));
