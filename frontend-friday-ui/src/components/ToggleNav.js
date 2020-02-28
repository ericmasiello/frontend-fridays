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

export function useToggleNav({ autoClose = true } = {}) {
  const value = useContext(ToggleContext);

  const handleClose = useCallback(() => {
    value.setOpen(false);
  }, [value]);


  useEffect(() => {
    if (!autoClose) {
      return;
    }
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose)
    }
  }, [handleClose, autoClose]);

  const getButtonProps = useCallback((userProps = {}) => {
    const { onClick, ...rest } = userProps;
    return {
      [`aria-expanded`]: value.open,
      ref: value.buttonRef,
      onClick: (event) => {
        event.persist();
        event.stopPropagation();
        value.setOpen(!value.open);
        if (onClick) {
          onClick(event);
        }
      },
      ...rest,
    };
  }, [value]);

  const getLinkProps = useCallback((userProps = {}) => {
    const { onClick, ...rest } = userProps;
    return {
      onClick: (event) => {
        event.persist();
        value.buttonRef.current.focus();
        if (onClick) {
          onClick(event);
        }
      },
      ...rest,
    }
  }, [value.buttonRef]);


  return useMemo(() => ({
    ...value,
    getButtonProps,
    getLinkProps,
  }), [value, getButtonProps, getLinkProps]);
}

// ToggleContext.Provider
// ToggleContext.Consumer

export function ToggleProvider(props) {
  const { defaultOpen, children } = props;
  const [ open, setOpen ] = useState(!!defaultOpen);
  const buttonRef = useRef();
  const value = useMemo(() => ({ open, setOpen, buttonRef }), [open])

  return (
    <ToggleContext.Provider value={value}>
      {children}
    </ToggleContext.Provider>
  );
}

export function ToggleNav(props) {
  const {
    children,
    as: Component = 'div',
    className,
    defaultOpen,
    ...rest
  } = props;
  const classes = classNames(styles['toggle-nav'], className);

  return (
    <ToggleProvider defaultOpen={defaultOpen}>
      <Component
        className={classes} {...rest}
        data-test="ToggleNav"
      >
        {children}
      </Component>
    </ToggleProvider>
  )
}

export function ToggleButton(props) {
  const { open, getButtonProps } = useToggleNav();
  const { className, ...rest } = props;

  const classes = classNames(styles['toggle-button'], {
    [styles['toggle-button--open']]: open
  }, className);

  return (
    <button
      {...getButtonProps({
        ...rest,
        className: classes,
        'data-test': 'ToggleButton-button',
      })}
    />
  );
}

export function ToggleList(props) {
  const { open } = useToggleNav();
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
  const { getLinkProps } = useToggleNav();
  const { as: Component = 'a', ...rest } = props;
  return (
    <Component
      {...getLinkProps({
        ...rest,
        className: styles['toggle-link'],
        'data-test': 'ToggleLink-component',
      })}
    />
  );
}

ToggleLink.propTypes = {
  as: PropTypes.elementType,
}
