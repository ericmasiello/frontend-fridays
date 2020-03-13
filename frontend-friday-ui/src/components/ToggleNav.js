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

const callInOrder = (...fns) => {
  return (...args) => {
    fns.forEach(fn => {
      if (fn) {
        fn(...args);
      }
    })
  }
}

export const ToggleContext = createContext({
  open: false,
  setOpen: () => {},
  buttonRef: React.createRef(),
});

export function useToggleNav(config) {
  const { open, setOpen, buttonRef, autoClose } = useContext(ToggleContext);
  let { enableAutoClose = true } = config || {};

  enableAutoClose = typeof autoClose === 'boolean' ? autoClose : enableAutoClose;

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if (enableAutoClose) {
      window.addEventListener('click', handleClose);
      return () => {
        window.removeEventListener('click', handleClose)
      }
    }
  }, [handleClose, enableAutoClose]);

  return useMemo(() => ({
    open: open,
    setOpen: setOpen,
    buttonProps: (customProps = {}) => {
      const { onClick, ...rest } = customProps;
      return {
        'aria-expanded': open,
        ref: buttonRef,
        onClick: callInOrder((event) => {
          event.stopPropagation();
          setOpen(!open);
        }, onClick),
        ...rest,
      };
    },
    itemProps: (customProps = {}) => {
      const { onClick, ...rest } = customProps;
      return {
        onClick: callInOrder((event) => {
          setOpen(false);
          buttonRef.current.focus();
        }, onClick),
        ...rest,
      };
    },
  }), [open, setOpen, buttonRef]);
}

export function ToggleProvider(props) {
  const { children, autoClose = true } = props;
  const [ open, setOpen ] = useState(false);
  const buttonRef = useRef();
  const value = useMemo(() => ({ open, setOpen, buttonRef, autoClose }), [open, autoClose]);

  return (
    <ToggleContext.Provider value={value}>
      {children}
    </ToggleContext.Provider>
  )
}

// ToggleContext.Provider
// ToggleContext.Consumer

export function ToggleNav(props) {
  const { children, as: Component = 'div', className, autoClose, ...rest } = props;
  const classes = classNames(styles['toggle-nav'], className)

  return (
    <ToggleProvider autoClose={autoClose}>
      <Component className={classes} {...rest}>
        {children}
      </Component>
    </ToggleProvider>
  )
}

export function ToggleButton(props) {
  const { open, buttonProps } = useToggleNav(ToggleContext);
  const { className, ...rest } = props;

  const classes = classNames(styles['toggle-button'], {
    [styles['toggle-button--open']]: open
  }, className);

  return (
    <button
      {...buttonProps({
        className: classes,
        'data-test': 'ToggleButton-button',
        ...rest
      })}
    />
  );
}

export function ToggleList(props) {
  const { open } = useToggleNav(ToggleContext);
  const { children } = props;

  const style = {
    display: open ? 'block' : 'none',
  };

  return (
    <div className={styles['toggle-list-wrapper']}>
      <ul
        data-test="ToggleList-ul"
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
  const { itemProps } = useToggleNav(ToggleContext);
  const { as: Component = 'a', ...rest } = props;
  return (
    <Component
      {...itemProps({
        className: styles['toggle-link'],
        'data-test': 'ToggleLink-component',
        ...rest,
      })}
    />
  );
}

ToggleLink.propTypes = {
  as: PropTypes.elementType,
}
