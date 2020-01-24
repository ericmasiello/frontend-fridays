import React, { createContext, useState, useContext, useMemo } from 'react';
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

export const ToggleContext = createContext();

// ToggleContext.Provider
// ToggleContext.Consumer

export function ToggleNav(props) {
  const [ open, setOpen ] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open])
  const { children } = props;
  return (
    <ToggleContext.Provider value={value}>
      <div className={styles['toggle-nav']}>
        {children}
      </div>
    </ToggleContext.Provider>
  )
}

export function ToggleButton(props) {
  const { open, setOpen } = useContext(ToggleContext);
  const { children } = props;
  return (
    <button
      onClick={() => { setOpen(!open)}}
      className={styles['toggle-button']}
    >
      {children}
    </button>
  );
}

export function ToggleList(props) {
  const { open } = useContext(ToggleContext);
  const { children } = props;

  const style = {
    display: open ? 'block' : 'none',
  };

  return (
    <ul
      className={styles['toggle-list']}
      style={style}
    >
      {children}
    </ul>
  );
}

export function ToggleItem(props) {
  const { as: Component = 'li', ...rest } = props;
  return (
    <Component className={styles['toggle-item']} {...rest} />
  );
}

export function ToggleLink(props) {
  const { as: Component = 'a', ...rest } = props;
  return (
    <Component className={styles['toggle-link']} {...rest} />
  );
}
