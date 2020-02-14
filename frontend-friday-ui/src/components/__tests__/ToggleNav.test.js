import React from 'react';
import { mount } from 'enzyme';
import {
  ToggleNav,
  ToggleButton,
  ToggleList,
  ToggleItem,
  ToggleLink,
} from '../ToggleNav';

it('should render', () => {
  const wrapper = mount(
    <ToggleNav>
      <ToggleButton>Hello</ToggleButton>
      <ToggleList>
        <ToggleItem><ToggleLink>Value 1</ToggleLink></ToggleItem>
        <ToggleItem><ToggleLink>Value 2</ToggleLink></ToggleItem>
      </ToggleList>
    </ToggleNav>
  );

  expect(wrapper).toHaveLength(1);
})

it('should set the aria expanded to true when clicking the button', () => {
  const wrapper = mount(
    <ToggleNav>
      <ToggleButton>Hello</ToggleButton>
      <ToggleList>
        <ToggleItem><ToggleLink>Value 1</ToggleLink></ToggleItem>
        <ToggleItem><ToggleLink>Value 2</ToggleLink></ToggleItem>
      </ToggleList>
    </ToggleNav>
  );

  wrapper.find('[data-test="toggle-button"]').simulate('click');

  expect(wrapper.find('[data-test="toggle-button"]').props()['aria-expanded']).toBe(true);
})

it('should add an open className when clicked', () => {
  const wrapper = mount(
    <ToggleNav>
      <ToggleButton>Hello</ToggleButton>
      <ToggleList>
        <ToggleItem><ToggleLink>Value 1</ToggleLink></ToggleItem>
        <ToggleItem><ToggleLink>Value 2</ToggleLink></ToggleItem>
      </ToggleList>
    </ToggleNav>
  );

  wrapper.find('[data-test="toggle-button"]').simulate('click');

  expect(wrapper.find('[data-test="toggle-button"]').hasClass('toggle-button--open')).toBe(true);
})
