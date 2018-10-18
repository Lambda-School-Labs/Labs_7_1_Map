import React, { Component } from 'react';
// will allow our component to access the global state of the app
import { AppContextConsumer } from './AppContext';
import Settings from './Components/Settings/Settings';
import LandingPage from './Components/LandingPage/LandingPage';
import Dashboard from './Components/Dashboard/Dashboard.js';
import SignUp from './Components/User/SignUp';
import SignIn from './Components/User/SignIn';

import './App.css';

class App extends Component {
	render() {
		return (
			<AppContextConsumer>
				{(props) => (
					<div className="App">
						<SignIn />
						<SignUp />
						{/* <LandingPage />
						<Dashboard />
						<Settings /> */}
					</div>
				)}
			</AppContextConsumer>
		);
	}
}

export default App;
