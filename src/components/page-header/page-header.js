import React from 'react';

const PageHeader = ({ Icon, children, ...props }) => {
  return (
    <h1 {...props}>
      <Icon height={40} width={40} className="header-icon" />
      {children}
    </h1>
  );
};

export default PageHeader;
