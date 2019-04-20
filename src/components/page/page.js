import React from 'react';
import { Link } from '@reach/router';

import PrivateLink from '../private-link/private-link.js';

const Page = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <PrivateLink to="/admin">Admin</PrivateLink>
          <PrivateLink to="/doors">Doors</PrivateLink>
          <PrivateLink to="/people">People</PrivateLink>
          <PrivateLink to="/events">Events</PrivateLink>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Page;
