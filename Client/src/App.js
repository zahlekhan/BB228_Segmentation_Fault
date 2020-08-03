import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookie from 'js-cookie';
import './App.css';
import UserForm from './Components//UserForm.js';
import Navbar from './Components/Navbar.js';
import Logger from './Components/Logger.js';
import UserContext from './contexts/UserContext.js';
import EnquirySpeech from './Components/EnquirySpeech.js';
import Uts from './Components/Uts.js';

class App extends React.Component {
	static contextType = UserContext;
	state = {
		language: 'en',
		token: Cookie.get('token') ? Cookie.get('token') : null,
		id: Cookie.get('id') ? Cookie.get('id') : null,
		username: Cookie.get('username') ? Cookie.get('username') : null,
	};

	login = async (token, id, username) => {
		this.setState({
			token: token,
			id: id,
			username: username,
		});
		console.log(token);
		await Cookie.set('token', token, { expires: 7 });
		await Cookie.set('id', id, { expires: 7 });
		await Cookie.set('username', username, { expires: 7 });
	};

	logout = () => {
		this.setState({
			token: null,
			userId: null,
		});
		Cookie.remove('token');
		Cookie.remove('id');
		Cookie.remove('username');
	};

	changeLanguage = (language) => {
		this.setState({
			language: language,
		});
	};
	render() {
		const { token, id, username } = this.state;
		console.log(this.context);
		return (
			<UserContext.Provider
				value={{
					language: this.state.language,
					changeLanguage: this.changeLanguage,
					login: this.login,
					logout: this.logout,
					token: token,
					id: id,
					username: username,
				}}
			>
				<div>
					{' '}
					<Navbar />
					<Router>
						<Switch>
							<Route path='/' exact>
								<UserForm />
							</Route>
							<Route path='/logger' exact>
								<Logger />
							</Route>
							<Route path='/enquiry'>
								<EnquirySpeech />
							</Route>
							<Route path='/uts'>
								<Uts />
							</Route>
						</Switch>
					</Router>
				</div>
			</UserContext.Provider>
		);
	}
}

export default App;
