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

export const ToggleContext = createContext({
  open: false,
  setOpen: () => {},
  buttonRef: React.createRef(),
});

export function useToggleNav(config) {
  const { open, setOpen, buttonRef } = useContext(ToggleContext);
  const { enableAutoClose = true  } = config || {};

  // code here to disable the damn thing./...

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if (!enableAutoClose) {
      return;
    }
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose)
    }
  }, [handleClose, enableAutoClose]);

  return {
    open,
    setOpen,
    buttonProps: (customProps) => {
      const { onClick, ...rest } = customProps || {};
      return {
        'aria-expanded': open,
        ref: buttonRef,
        onClick(event) {
          event.persist();
          event.stopPropagation();
          setOpen(!open);
          if (onClick) {
            onClick(event);
          }
        },
        ...rest
      };
    },
    itemProps: (customProps) => {
      const { onClick, ...rest } = customProps || {};
      return {
        onClick(event) {
          event.persist();
          setOpen(false);
          // setOpen(false);
          buttonRef.current.focus();
          if (onClick) {
            onClick(event);
          }
        },
        ...rest,
      }
    },
  };
}

export function ToggleProvider(props) {
  const [ open, setOpen ] = useState(false);
  const buttonRef = useRef();
  const value = useMemo(() => ({ open, setOpen, buttonRef }), [open]);

  return (
    <ToggleContext.Provider value={value}>
      {props.children}
    </ToggleContext.Provider>
  )
}

// ToggleContext.Provider
// ToggleContext.Consumer

export function ToggleNav(props) {
  const { children, as: Component = 'div', className, ...rest } = props;
  const classes = classNames(styles['toggle-nav'], className)

  return (
    <ToggleProvider>
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
      data-test="ToggleLink-component"
      {...rest}
    />
  );
}

ToggleLink.propTypes = {
  as: PropTypes.elementType,
}
