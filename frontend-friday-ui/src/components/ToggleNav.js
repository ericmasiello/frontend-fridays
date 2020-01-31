import React, { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // FIXME: Fix this behavior
  // We want it to apply this behavior but don't want
  // this behavior to happen when we click on the
  // <ToggleButton /> element. How do we do this??
  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose)
    }
  }, [handleClose]);

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

  const classes = classNames(styles['toggle-button'], {
    [styles['toggle-button--open']]: open
  });

  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
      className={classes}
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
    <div className={styles['toggle-list-wrapper']}>
      <ul
        className={styles['toggle-list']}
        style={style}
      >
        {children}
      </ul>
    </div>
  );
}

export function ToggleItem(props) {
  const { as: Component = 'li', ...rest } = props;
  return (
    <Component className={styles['toggle-item']} {...rest} />
  );
}

export function ToggleLink(props) {
  const { setOpen } = useContext(ToggleContext);
  const { as: Component = 'a', onClick, ...rest } = props;
  return (
    <Component
      onClick={(event) => {
        // FIXME: We need to put focus back on the <ToggleButton />
        // once a user makes a selection below. How do we do that?
        event.persist();
        setOpen(false);
        if (onClick) {
          onClick(event);
        }
      }}
      className={styles['toggle-link']}
      {...rest}
    />
  );
}
