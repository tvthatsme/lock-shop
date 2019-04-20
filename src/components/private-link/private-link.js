import React, { useContext } from 'react';
import { Link } from '@reach/router';

import { SignedInUserContext } from '../../context/signed-in-user.js';

const PrivateLink = ({ children, ...props }) => {
  // Get the signed-in user from context
  const { signedInUser } = useContext(SignedInUserContext);

  // If the user is not an admin, don't render anything
  if (!signedInUser.isAdmin) {
    return null;
  } else {
    return <Link {...props}>{children}</Link>;
  }
};

export default PrivateLink;
