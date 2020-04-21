import React from 'react';
import classNames from 'classnames';
// import styles from './Example.module.scss';
const styles = { example: 'FIXME' };

function Example(props) {
  const { className, as: Component = 'div', ...rest } = props;
  const classes = classNames(styles.example, className);
  return <Component className={classes} {...rest} />;
}

// FIXME: Including static properties is breaking tree shaking
// Example.defaultProps = {
//   className: 'i-am-example',
// }

export default Example;
