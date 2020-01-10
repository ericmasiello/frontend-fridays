import React from 'react';
import PropTypes from 'prop-types';
import styles from './ToggleNav.module.scss';

/*
<button>Home</button>
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="/settings">Settings</a></li>
  <li><a href="/help">Help</a></li>
</ul>

*/

export function ToggleNav(props) {
  const { children } = props;
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export function ToggleButton(props) {
  const { children } = props;
  return <button>{children}</button>;
}

export function ToggleList(props) {
  const { children } = props;
  return <ul>{children}</ul>;
}

export function ToggleItem(props) {
  const { children } = props;
  return <li>{children}</li>;
}

