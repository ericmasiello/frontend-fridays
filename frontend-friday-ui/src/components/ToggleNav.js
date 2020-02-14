import React, { createContext, useState, useContext, useMemo, useEffect, useCallback, useRef } from 'react';
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
  const buttonRef = useRef();
  const value = useMemo(() => ({ open, setOpen, buttonRef }), [open])
  const { children } = props;

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

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
  const { open, setOpen, buttonRef } = useContext(ToggleContext);
  const { className, ...rest } = props;

  const classes = classNames(styles['toggle-button'], {
    [styles['toggle-button--open']]: open
  }, className);

  return (
    <button
      aria-expanded={open}
      ref={buttonRef}
      onClick={(event) => {
        event.stopPropagation();
        setOpen(!open);
      }}
      className={classes}
      data-test="toggle-button"
      {...rest}
    />
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

ToggleItem.propTypes = {
  as: PropTypes.elementType,
}

export function ToggleLink(props) {
  const { buttonRef } = useContext(ToggleContext);
  const { as: Component = 'a', onClick, ...rest } = props;
  return (
    <Component
      onClick={(event) => {
        event.persist();
        buttonRef.current.focus();
        if (onClick) {
          onClick(event);
        }
      }}
      className={styles['toggle-link']}
      {...rest}
    />
  );
}

ToggleLink.propTypes = {
  as: PropTypes.elementType,
}
