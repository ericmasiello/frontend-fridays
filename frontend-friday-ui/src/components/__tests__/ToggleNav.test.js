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

  wrapper.find('[data-test="ToggleButton-button"]').simulate('click');

  expect(wrapper.find('[data-test="ToggleButton-button"]').props()['aria-expanded']).toBe(true);
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

  wrapper.find('[data-test="ToggleButton-button"]').simulate('click');

  expect(wrapper.find('[data-test="ToggleButton-button"]').hasClass('toggle-button--open')).toBe(true);
})

/*
ToggleNav,
  ToggleButton,
  ToggleList,
  ToggleItem,
  ToggleLink
*/

describe('ToggleNav', () => {

  it('should render as a <div /> by default',() => {
    const wrapper = mount(<ToggleNav />);

    expect(wrapper.find('[data-test="ToggleNavComponent"]').type()).toEqual('div');
  });

  it('should render as a custom component',() => {
    const wrapper = mount(<ToggleNav as="span" />);

    expect(wrapper.find('[data-test="ToggleNavComponent"]').type()).toEqual('span');
  });

  it('should be able to pass a custom className',() => {
    const wrapper = mount(<ToggleNav className="foo" />);

    expect(wrapper.find('[data-test="ToggleNavComponent"]').hasClass('foo')).toBe(true);
  });

  it('should be able to pass arbitrary props',() => {
    const wrapper = mount(<ToggleNav data-foo="true" />);

    expect(wrapper.find('[data-test="ToggleNavComponent"][data-foo="true"]')).toHaveLength(1);
  });
})

describe('ToggleList', () => {
  it('should be hidden by default',() => {
    const wrapper = mount(
      <ToggleNav>
        <ToggleButton>Hello</ToggleButton>
        <ToggleList>
          <ToggleItem><ToggleLink>Value 1</ToggleLink></ToggleItem>
          <ToggleItem><ToggleLink>Value 2</ToggleLink></ToggleItem>
        </ToggleList>
      </ToggleNav>
    );

    const listWrapper = wrapper.find('[data-test="ToggleList-ul"]');

    expect(listWrapper.props()['style'].display).toEqual('none');
  });

  it('should be visible after clicking the <ToggleButton />',() => {
    const wrapper = mount(
      <ToggleNav>
        <ToggleButton>Hello</ToggleButton>
        <ToggleList>
          <ToggleItem><ToggleLink>Value 1</ToggleLink></ToggleItem>
          <ToggleItem><ToggleLink>Value 2</ToggleLink></ToggleItem>
        </ToggleList>
      </ToggleNav>
    );

    wrapper.find('[data-test="ToggleButton-button"]').simulate('click')

    const listWrapper = wrapper.find('[data-test="ToggleList-ul"]');

    expect(listWrapper.props()['style'].display).not.toEqual('none');
  });
})

describe('ToggleLink', () => {
  it('should support passing a custom `onClick` handler',() => {

    const fn = jest.fn();

    const wrapper = mount(
      <ToggleNav>
        <ToggleButton>Hello</ToggleButton>
        <ToggleList>
          <ToggleItem>
            <ToggleLink onClick={fn}>Value 1</ToggleLink>
          </ToggleItem>
        </ToggleList>
      </ToggleNav>
    );

    wrapper.find('[data-test="ToggleLink-component"]').simulate('click');

    expect(fn).toHaveBeenCalled();
  });
});
