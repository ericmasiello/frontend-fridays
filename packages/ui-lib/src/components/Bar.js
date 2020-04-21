import React from 'react';
import PropTypes from 'prop-types';

function Bar(props) {
  const { as: Component, className, ...rest } = props;
  return <Component className={className} {...rest} />;
}

// FIXME: Including static properties is breaking tree shaking
// Bar.defaultProps = {
//   as: 'div',
//   className: 'i-am-foo',
// }

// Bar.propTypes = {
//   as: PropTypes.elementType,
// }

export default Bar;
