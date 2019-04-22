import React, { Component } from 'react';
import { Router } from '@reach/router';

// Import pages for the app
import Main from './pages/main.js';
import Admin from './pages/admin.js';
import Doors from './pages/doors.js';
import People from './pages/people.js';
import Events from './pages/events.js';

// Import context needed throughout the app
import { SignedInUserProvider } from './contexts/signed-in-user.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignedInUserProvider>
          <Router>
            <Main path="/" />
            <Admin path="admin" />
            <Doors path="doors" />
            <People path="people" />
            <Events path="events" />
          </Router>
        </SignedInUserProvider>
      </div>
    );
  }
}

export default App;
