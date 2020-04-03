import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ToggleNav, ToggleButton, ToggleList, ToggleItem, ToggleLink, ToggleProvider, useToggleNav } from './ToggleNav';

function PropGetterDemo() {
  const { open, buttonProps, itemProps } = useToggleNav({
    enableAutoClose: false,
  });

  /*
    TODO:
    Make this thing responsive! Design the tabs!
  */
  return (
    <div>
      <button
        {...buttonProps({
          onClick() {
            console.log('Custom buttonProps onClick!');
          },
          className: 'foo',
          'data-rebecca': 'rebecca',
        })}
      >
        Click me!
      </button>
      {open && (
        <ul>
          <li>
            <button
              {...itemProps({
                onClick: () => console.log('custom!'),
              })}
            >
              First item
            </button>
          </li>
          <li>
            <button {...itemProps()}>Second item</button>
          </li>
        </ul>
      )}
    </div>
  );
}

storiesOf('ToggleNav', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div>
      <ToggleNav>
        <ToggleButton className="foo" data-test="something">
          Home
        </ToggleButton>
        <ToggleList>
          <ToggleItem>
            <ToggleLink href="#">Home</ToggleLink>
          </ToggleItem>
          <ToggleItem>
            <ToggleLink href="#settings" aria-current={true}>
              Settings
            </ToggleLink>
          </ToggleItem>
          <ToggleItem>
            <ToggleLink href="#help">Help</ToggleLink>
          </ToggleItem>
          <ToggleItem>
            <ToggleLink as="button" onClick={() => alert('hi')}>
              Click me
            </ToggleLink>
          </ToggleItem>
        </ToggleList>
      </ToggleNav>
      <p>I should be covered up when the toggle list is visible</p>
    </div>
  ))
  .add('prop getters', () => (
    <ToggleProvider>
      <PropGetterDemo />
    </ToggleProvider>
  ));
