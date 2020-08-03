import React from 'react';
import { Form, Button, Grid, Popup, Modal, Dropdown, Image, Radio } from 'semantic-ui-react';
import { Icon } from 'react-icons-kit';
import { sad } from 'react-icons-kit/icomoon/sad';
import { loop } from 'react-icons-kit/icomoon/loop';
import { arrowRight2 } from 'react-icons-kit/icomoon/arrowRight2';
import { calendar } from 'react-icons-kit/icomoon/calendar';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Calendar from 'react-calendar';

import API from '../utils/API';
import JourneyCard from './JourneyCard.js';
import AlternateTrains from './AlternateTrains.js';
import Speech from './Speech.js';
import WithContexts from './WithContexts.js';
import Features from './Features.js';
import NearbyTrains from './NearbyTrains.js';

const languages = [
	{
		key: 'en',
		text: 'English',
		value: 'en',
	},
	{
		key: 'hi-In',
		text: 'हिन्दी',
		value: 'hi-In',
	},
	{
		key: 'ml',
		text: 'Malyalam',
		value: 'ml',
	},
];

class UserForm extends React.Component {
	state = {
		origin: '',
		destination: '',
		date: '',
		trains: null,
		alternateTrains: null,
		nearbyTrains: false,
		loading: false,
		record: false,
		radioValue: 'direct',
	};

	componentDidMount() {
		var value = new Date();
		value = value.toString();
		const dateSplit = value.split(' ');
		const month = dateSplit[1];
		const day = dateSplit[2];
		const year = dateSplit[3];
		const senderDate = day.toString() + ' ' + month.toLowerCase().toString() + ' ' + year.toString();
		this.setState({
			date: senderDate,
		});
	}

	searchAlternateTrains = async () => {
		this.setState({ loading: true });
		const { origin, destination, date } = this.state;
		const body = { origin: origin, destination: destination, date: date };
		try {
			const trains = await API.post(`/alternate-trains/`, body);

			this.setState({
				alternateTrains: trains.data,
				loading: false,
			});
		} catch (error) {
			toast.error('Invalid Station Details');
			this.setState({ loading: false });
		}
	};

	submitData = async (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const { origin, destination, date } = this.state;
		const body = { origin: origin, destination: destination, date: date };
		try {
			const trains = await API.post(`/direct-trains/`, body);
			this.setState({
				trains: trains.data,
				loading: false,
			});
		} catch (error) {
			toast.error('Invalid Station Details');
			this.setState({ loading: false });
		}
	};

	speechToTextResult = async (origin, destination, date) => {
		if (date === undefined) {
			this.setState({
				origin: origin,
				destination: destination,
				loading: true,
			});
		} else {
			this.setState({
				origin: origin,
				destination: destination,
				date: date,
				loading: true,
			});
		}

		const body = { origin: origin, destination: destination, date: date };
		try {
			const trains = await API.post(`/direct-trains/`, body);
			this.setState({
				trains: trains.data,
				loading: false,
			});
		} catch (error) {
			toast.error('Invalid Station Details');
			this.setState({ loading: false });
		}
	};

	changeInDestinationForm = (event) => {
		event.preventDefault();
		this.setState({
			destination: event.target.value.toUpperCase(),
			trains: null,
			alternateTrains: null,
			nearbyTrains: false,
			radioValue: 'direct',
		});
	};

	changeInOriginForm = (event) => {
		event.preventDefault();
		this.setState({
			origin: event.target.value.toUpperCase(),
			trains: null,
			alternateTrains: null,
			nearbyTrains: false,
			radioValue: 'direct',
		});
	};

	changeLanguage = (event, { value }) => {
		event.preventDefault();
		this.props.context.changeLanguage(value);
	};

	changeDate = (value) => {
		value = value.toString();
		const dateSplit = value.split(' ');

		const month = dateSplit[1];
		const day = dateSplit[2];
		const year = dateSplit[3];

		const senderDate = day.toString().slice(0, 2) + ' ' + month.toLowerCase().toString() + ' ' + year.toString();
		this.setState({
			date: senderDate,
			calenderView: 'none',
			trains: null,
			nearbyTrains: false,
			radioValue: 'direct',
		});
	};

	changeRadio = (event, { value }) => {
		event.preventDefault();
		this.setState({ radioValue: value });

		if (value === 'alternate') {
			this.searchAlternateTrains();
		}
		if (value !== 'nearby') {
			this.setState({ nearbyTrains: false });
		} else if (value === 'nearby') {
			this.setState({ nearbyTrains: true });
		}
	};

	render() {
		const { trains, alternateTrains, origin, date, destination, loading, radioValue, nearbyTrains } = this.state;
		return (
			<React.Fragment>
				<StyledGrid className='middle aligned stackable padded' style={{ paddingBottom: 3 + 'rem' }}>
					<Grid.Row>
						<Grid.Column width={1} style={{ padding: 0 + '!important' }} />
						<Grid.Column width={8}>
							<h1
								style={{
									fontSize: 2.75 + 'rem',
									fontWeight: 700,
									color: 'white',
									margin: 0,
								}}
							>
								{' '}
								Search Trains{' '}
							</h1>
							<span
								style={{
									fontSize: 1.25 + 'rem',
									fontWeight: 100,
									color: 'white',
								}}
							>
								{' '}
								Travel anywhere, anytime on the lifeline of the Nation{' '}
								<i style={{ width: 1 + 'rem' }} className='in flag' />
							</span>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={1} style={{ padding: '0px !important' }} />
						<Grid.Column width={4}>
							<StyledForm>
								<Form.Field>
									<Form.Input
										placeholder='Origin Station code'
										onChange={this.changeInOriginForm}
										value={origin}
									/>
								</Form.Field>
							</StyledForm>
						</Grid.Column>
						<Grid.Column width={1} style={{ textAlign: 'center' }}>
							<Icon size={32} icon={loop} style={{ color: 'white' }} />
						</Grid.Column>
						<Grid.Column width={4}>
							<StyledForm>
								<Form.Field>
									<Form.Input
										placeholder='Destination Station code'
										onChange={this.changeInDestinationForm}
										value={destination}
									/>
								</Form.Field>
							</StyledForm>
						</Grid.Column>
						<Grid.Column width={3}>
							<Grid className='middle aligned'>
								<Grid.Column width={12}>
									<StyledForm>
										<Form.Field>
											<Form.Input
												value={date}
												placeholder='Pick a Date from Calender'
												onChange={this.changeInDestinationForm}
											/>
										</Form.Field>
									</StyledForm>
								</Grid.Column>
								<Grid.Column width={4}>
									<Popup
										trigger={
											<Icon
												size={32}
												icon={calendar}
												style={{ color: 'white' }}
												onClick={this.changeCalenderModalView}
											/>
										}
										content={
											<StyledCalendar
												value={new Date(this.state.date)}
												onChange={this.changeDate}
												minDate={new Date()}
												maxDate={new Date(new Date().getTime() + 120 * 24 * 60 * 60 * 1000)}
											/>
										}
										position='bottom left'
										flowing
										hoverable
									/>
								</Grid.Column>
							</Grid>
						</Grid.Column>

						<Grid.Column width={3}>
							<Grid>
								<Grid.Column width={8}>
									<SubmitButton
										style={{
											display: 'flex',
											alignItems: 'center',
											padding: 0.5 + 'rem',
											background: '#e8e82b',
										}}
										type='submit'
										onClick={(e) => {
											this.submitData(e);
										}}
									>
										<span style={{ fontSize: 2 + 'rem' }}>Go!</span>
										<Icon size={40} icon={arrowRight2} style={{ display: 'inline' }} />
									</SubmitButton>
								</Grid.Column>
								<Grid.Column width={3} />
								<Grid.Column width={2}>
									<Speech
										onSpeechEnd={(origin, destination, date) => {
											this.speechToTextResult(origin, destination, date);
										}}
									/>
								</Grid.Column>
							</Grid>
						</Grid.Column>
					</Grid.Row>
				</StyledGrid>
				<br />
				<Grid centered padded>
					<Grid.Row>
						<Grid.Column width={6}>
							<Dropdown placeholder='English' options={languages} onChange={this.changeLanguage} />
						</Grid.Column>
						<Grid.Column width={6}>
							{/* <Radio toggle onChange={this.searchAlternateTrains} /> */}
							<Form style={{ display: 'flex', flexWrap: 'wrap' }}>
								Route Options:
								<Form.Field>
									<Radio
										label='Direct'
										name='radioGroup'
										value='direct'
										checked={radioValue === 'direct'}
										onChange={this.changeRadio}
									/>
								</Form.Field>{' '}
								<Form.Field>
									<Radio
										label='Alternate'
										name='radioGroup'
										value='alternate'
										checked={radioValue === 'alternate'}
										onChange={this.changeRadio}
									/>
								</Form.Field>{' '}
								<Form.Field>
									<Radio
										label='from Nearby stations'
										name='radioGroup'
										value='nearby'
										checked={radioValue === 'nearby'}
										onChange={this.changeRadio}
									/>
								</Form.Field>
							</Form>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				{trains === null ? <Features /> : null}

				<Grid centered>
					<Grid.Row>
						<Grid.Column computer={10} tablet={12}>
							<span>
								{trains !== null && radioValue === 'direct' ? (
									trains.map((train, index) => (
										<JourneyCard train={train} index={index} key={index} />
									))
								) : null}
								{trains !== null && trains.length === 0 && alternateTrains === null ? (
									<div className='text-center'>
										<Grid.Row>
											<Grid.Column width={1} />
											<Grid.Column width={3} />
											<Grid.Column width={12} />
										</Grid.Row>
										<h2>No direct trains available, You can search for alternate trains</h2>
										<Icon size={128} icon={sad} />
										<br />
									</div>
								) : null}

								{alternateTrains !== null &&
								alternateTrains.length !== 0 &&
								radioValue === 'alternate' ? (
									<AlternateTrains trains={alternateTrains} />
								) : null}
								{radioValue === 'nearby' && nearbyTrains === true ? (
									<NearbyTrains origin={origin} destination={destination} date={date} />
								) : null}
							</span>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Modal
					open={loading}
					close={loading === false}
					style={{
						top: 'unset',
						left: 'unset',
						height: 'unset',
						textAlign: 'center',
					}}
				>
					<Modal.Header style={{}}>Loading</Modal.Header>
					<Modal.Content image style={{ justifyContent: 'center' }}>
						<Image wrapped size='medium' src='./giftrain.gif' />
					</Modal.Content>
				</Modal>
			</React.Fragment>
		);
	}
}

const SubmitButton = styled(Button)`
  display: ${(props) => props.display};
`;

const StyledCalendar = styled(Calendar)`
  margin-left: auto !important;
  margin-right: auto !important;
`;
const StyledGrid = styled(Grid)`
  color: black;
  background: url("./tesy.png"), #2196f3;
  background-position: center bottom;
  background-size: 85%;
  background-repeat: no-repeat;
  box-shadow: 0px 5px 10px 0px rgba(50, 50, 50, 0.2);
`;
const StyledForm = styled(Form)`
  font-size: 1.5rem !important;
`;

export default WithContexts(UserForm);
