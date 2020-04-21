import React from 'react';
import PropTypes from 'prop-types';

function Foo(props) {
  const { as: Component = 'div', className = 'i-am-foo', ...rest } = props;
  return <Component className={className} {...rest} />;
}

// FIXME: Including static properties is breaking tree shaking
// Foo.defaultProps = {
//   as: 'div',
//   className: 'i-am-foo',
// }

// Foo.propTypes = {
//   as: PropTypes.elementType,
// }

export default Foo;

// NOTE: making this a function call breaks dead code elimintation (DCE)
// this explains why static properties are problematic as setters
// export default Foo()
