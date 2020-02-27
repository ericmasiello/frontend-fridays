import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import {
  ToggleProvider,
  ToggleNav,
  ToggleButton,
  ToggleList,
  ToggleItem,
  ToggleLink,
  useToggleNav,
} from './ToggleNav';

function ToggleGetProps({ autoClose = true }) {
  const [ selected, setSelected ] = useState();
  const { open, getButtonProps, getLinkProps } = useToggleNav({ autoClose });
  return (
    <div>
        <button {...getButtonProps()}>
          {selected ? selected : 'Toggle Button'}
        </button>
        {open && (
          <ul>
            <li><button {...getLinkProps({
              onClick: () => setSelected('Item 1')
            })}>Item 1</button></li>
            <li><button {...getLinkProps({
              onClick: () => setSelected('Item 2')
            })}>Item 2</button></li>
          </ul>
        )}
      <p>I am currently {open ? 'Open' : 'Closed'}</p>
    </div>
  )
}

storiesOf('ToggleNav', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>
      <ToggleNav>
        <ToggleButton className="foo" data-test="something">Home</ToggleButton>
        <ToggleList>
          <ToggleItem><ToggleLink href="#">Home</ToggleLink></ToggleItem>
          <ToggleItem><ToggleLink href="#settings">Settings</ToggleLink></ToggleItem>
          <ToggleItem><ToggleLink href="#help">Help</ToggleLink></ToggleItem>
          <ToggleItem>
            <ToggleLink as="button" onClick={() => alert('hi')}>Click me</ToggleLink>
          </ToggleItem>
        </ToggleList>
      </ToggleNav>
      <p>I should be covered up when the toggle list is visible</p>
    </div>
  ))
  .add('getProps()', () => (
    <ToggleProvider>
      <ToggleGetProps />
    </ToggleProvider>
  ))
  .add('getProps() without autoClose', () => (
    <ToggleProvider>
      <ToggleGetProps autoClose={false} />
    </ToggleProvider>
  ))
  ));
