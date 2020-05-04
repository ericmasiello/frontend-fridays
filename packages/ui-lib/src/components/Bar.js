import React from 'react';
import PropTypes from 'prop-types';

function Bar(props) {
  const { as: Component, className, ...rest } = props;
  return <Component className={className} {...rest} />;
}

Bar.defaultProps = {
  as: 'div',
  className: 'i-am-bar',
};

Bar.propTypes = {
  as: PropTypes.elementType,
};

export default Bar;
