import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import styles from './Example.module.scss';
const styles = { example: 'FIXME' };

function Example(props) {
  const { className, as: Component, ...rest } = props;
  const classes = classNames(styles.example, className);
  return <Component className={classes} {...rest} />;
}

Example.defaultProps = {
  className: 'i-am-example',
  as: 'div',
};

Example.propTypes = {
  as: PropTypes.elementType,
};

export default Example;
