import React from 'react';
import PropTypes from 'prop-types';

function Foo(props) {
  const { as: Component, className, ...rest } = props;
  return <Component className={className} {...rest} />;
}

Foo.someStaticProperty = 'foo';

Foo.defaultProps = {
  as: 'div',
  className: 'i-am-foo',
};

Foo.propTypes = {
  as: PropTypes.elementType,
};

export default Foo;
