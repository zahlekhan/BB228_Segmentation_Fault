import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { toast } from 'react-toastify';
import API from '../utils/PAPI.js';

class Signup extends React.Component {
	state = {
		email: null,
		password: null,
		name: null,
		loading: false,
	};
	handleChange = (e, { name, value }) => this.setState({ [name]: value });
	changeFormFeilds = (e) => {
		const targetValue = e.target.value;
		const targetId = e.target.id;
		this.setState({ ...this.state, [targetId]: targetValue });
	};

	submitSignupDetails = async (event) => {
		event.preventDefault();
		const { name, email, password } = this.state;
		const requestBody = {
			username: email,
			name,
			password,
		};

		const signupData = await API.post('/users/signup', requestBody);
		console.log(signupData);
		const { errors } = signupData.data;
		if (!errors) {
			toast.success('Sucessfully Signed Up!');
			window.location.reload();
		} else {
			toast.error('Signup Failed!');
		}
	};

	render() {
		const { name, email, password } = this.state;

		return (
			<Grid textAlign='center' verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' color='#1b1c1d' textAlign='center'>
						Sign up to an Account
					</Header>
					<Form size='large'>
						<Segment stacked>
							<Form.Input
								fluid
								icon='user'
								iconPosition='left'
								name='name'
								value={name}
								placeholder='Name'
								onChange={this.handleChange}
							/>
							<Form.Input
								fluid
								icon='mail'
								iconPosition='left'
								name='email'
								value={email}
								placeholder='E-mail address'
								onChange={this.handleChange}
							/>
							<Form.Input
								fluid
								icon='lock'
								name='password'
								value={password}
								iconPosition='left'
								placeholder='Password'
								type='password'
								onChange={this.handleChange}
							/>

							<Button
								loading={this.state.loading}
								color='#1b1c1d'
								fluid
								size='large'
								onClick={(event) => {
									this.setState({ loading: true });
									this.submitSignupDetails(event);
								}}
							>
								Signup
							</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		);
	}
}

export default Signup;
