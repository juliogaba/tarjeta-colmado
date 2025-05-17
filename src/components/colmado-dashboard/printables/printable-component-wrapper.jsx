
import React from 'react';

const PrintableComponentWrapper = React.forwardRef(({ children }, ref) => {
  return (
    <div ref={ref} className="printable-content">
      {children}
    </div>
  );
});

PrintableComponentWrapper.displayName = 'PrintableComponentWrapper';

export default PrintableComponentWrapper;
