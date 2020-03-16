import React, { createContext, useState, useContext, useMemo, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ToggleNav.module.scss';

const callFnsInOrder = (...fns) => {
  return (event) => {
    fns.forEach((fn) => {
      if (!fn) {
        return;
      }
      fn(event);
    });
  }
}

export const ToggleContext = createContext({
  open: false,
  setOpen: () => {},
  buttonRef: React.createRef(),
});

export function useToggleNav(config) {
  const { open, setOpen, buttonRef, autoClose = true } = useContext(ToggleContext);
  let { enableAutoClose  } = config || {};

  enableAutoClose = typeof enableAutoClose === 'boolean'
    ? enableAutoClose
    : autoClose;

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if (enableAutoClose === false) {
      return;
    }
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose)
    }
  }, [handleClose, enableAutoClose]);

  // Is this memoization necessary?
  // I would likely want to test this in a few scenerios before
  // blindly adding memoziation code
  const toggleNavData = useMemo(() => ({
    open,
    setOpen,
    buttonProps: (customProps) => {
      const { onClick, ...rest } = customProps || {};
      return {
        'aria-expanded': open,
        ref: buttonRef,
        onClick: callFnsInOrder((event) => {
          event.stopPropagation();
          setOpen(!open);
        }, onClick),
        ...rest
      };
    },
    itemProps: (customProps) => {
      const { onClick, ...rest } = customProps || {};
      return {
        onClick: callFnsInOrder(() => {
          setOpen(false);
          buttonRef.current.focus();
        }, onClick),
        ...rest,
      }
    },
  }), [buttonRef, open, setOpen])

  return toggleNavData;
}

export function ToggleProvider(props) {
  const { autoClose, children } = props;
  const [ open, setOpen ] = useState(false);
  const buttonRef = useRef();
  const value = useMemo(() => ({
    open,
    setOpen,
    buttonRef,
    autoClose
  }), [open, autoClose]);

  return (
    <ToggleContext.Provider value={value}>
      {children}
    </ToggleContext.Provider>
  )
}

// ToggleContext.Provider
// ToggleContext.Consumer

export function ToggleNav(props) {
  const { children, as: Component = 'div', className, autoClose = true, ...rest } = props;
  const classes = classNames(styles['toggle-nav'], className)

  return (
    <ToggleProvider autoClose={autoClose}>
      <Component
        data-test="ToggleNavComponent"
        className={classes}
        {...rest}
      >
        {children}
      </Component>
    </ToggleProvider>
  )
}

export function ToggleButton(props) {
  const { open, buttonProps } = useToggleNav();
  const { className, ...rest } = props;

  const classes = classNames(styles['toggle-button'], {
    [styles['toggle-button--open']]: open
  }, className);

  return (
    <button
      {...buttonProps({
        className: classes,
        'data-test': 'ToggleButton-button',
        ...rest,
      })}
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
  const { itemProps } = useToggleNav({
    enableAutoClose: false,
  });
  const { as: Component = 'a', onClick, ...rest } = props;
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
