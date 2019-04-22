import React from 'react';
import { Link } from '@reach/router';

import './page.css';
import PrivateLink from '../private-link/private-link.js';

const Page = ({ children }) => {
  return (
    <div>
      <header className="header">
        <nav>
          <Link to="/" className="header__item">
            Home
          </Link>
          <PrivateLink to="/admin" className="header__item">
            Admin
          </PrivateLink>
          <PrivateLink to="/doors" className="header__item">
            Doors
          </PrivateLink>
          <PrivateLink to="/people" className="header__item">
            People
          </PrivateLink>
          <PrivateLink to="/events" className="header__item">
            Events
          </PrivateLink>
        </nav>
      </header>
      <div className="page-content">{children}</div>
    </div>
  );
};

export default Page;
