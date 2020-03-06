import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ToggleNav, ToggleButton, ToggleList, ToggleItem, ToggleLink, ToggleProvider, useToggleNav } from './ToggleNav';

function PropGetterDemo() {
  const { open, setOpen, buttonProps, itemProps } = useToggleNav();

  /*
    TODO:
    1. Our tests busted. Can we fix them?

    2. The behavior for the button to toggle open state
    should be handled for us by the buttonProps() prop getter.

    3. we need to make sure window onclick function doesn't
    get triggered when we click the button.

    4. Can we refactor our existing components to use our propGetters?

    BONUS: Can we make the window onclick behavior optional?
    BONUS: Could the configurable autoclose behavior be extended to <ToggleNav />?
  */
  return (
    <div>
      <button onClick={() => setOpen(!open)} {...buttonProps()}>Click me!</button>
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
