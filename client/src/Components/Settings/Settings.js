import React, { Component } from 'react';

import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import Preferences from './Preferences';

class Settings extends Component {
  render() {
    return (
      <div className="Settings">
        <ChangeEmail />
        <ChangePassword />
        <Preferences />
      </div>
    );
  }
}

export default Settings;
