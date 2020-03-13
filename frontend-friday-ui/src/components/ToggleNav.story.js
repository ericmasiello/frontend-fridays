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

    1. Dogfood our itemProps() getter within the ToggleLink
    2. Can we make the ToggleNav component support enable/disabling the auto close functionality?
    3. Because multiple Components (i.e.) ToggleButton, ToggleLink
      are using the useToggleNav() hook, how do we make sure we don't invoke
      our  window.addEventListener multiple times?
    4. Can we generalize a pattern for our onClick handlers calling custom
      onClick handlers?
    5. Are there any optimizations we should add to our useToggleNav component?

  */
  return (
    <div>
      <button {...buttonProps({
        onClick(){
          console.log('Custom buttonProps onClick!')
        },
        className: 'foo',
        'data-rebecca': 'rebecca'
      })}>Click me!</button>
      {open && (
        <ul>
          <li>
            <button
              {...itemProps({
                onClick: () => console.log('custom!')
              })}
            >
              First item
            </button>
          </li>
          <li><button {...itemProps()}>Second item</button></li>
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
  .add('prop getters', () => (
    <ToggleProvider>
      <PropGetterDemo />
    </ToggleProvider>
  ));
