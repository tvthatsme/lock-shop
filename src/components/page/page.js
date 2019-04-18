import React from 'react';
import { Link } from '@reach/router';

const Page = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/doors">Doors</Link>
          <Link to="/people">People</Link>
          <Link to="/events">Events</Link>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Page;
