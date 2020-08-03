import React from 'react';
import { Grid, Button, Segment, Header, Divider, Icon, Card } from 'semantic-ui-react';
import Cookie from 'js-cookie';
import styled from 'styled-components';
import Collapsible from 'react-collapsible';
import FeedbackCard from './FeedbackCard.js';

const ratings = [ [ 'Security', 2.5 ], [ 'Pantry', 4.3 ], [ 'Hygiene', 3 ] ];

class JourneyCard extends React.Component {
	state = {
		collapsible: false,
		token: Cookie.get('token') ? Cookie.get('token') : null,
		username: Cookie.get('username') ? Cookie.get('username') : null,
	};

	changeCollapsible = () => {
		this.setState({
			collapsible: !this.state.collapsible,
		});
	};

	bookTicket = async () => {
		console.log('ticket booked');
	};

	render() {
		const { collapsible } = this.state;

		const {
			name,
			number,
			origin,
			destination,
			duration,
			originDeparture,
			destinationArrival,
			totalDistance,
		} = this.props.train;
		return (
			<React.Fragment>
				<StyledSegment>
					<StyledTrainName as='h3'>
						{number} - {name}
					</StyledTrainName>
					<Grid padded stackable>
						<Grid.Row>
							<Grid.Column width={3}>
								<Header as='h4'>
									<StyledDot type='origin' /> {originDeparture.slice(0, 5)} | {origin}
								</Header>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header as='h4'>
									<StyledDot type='destination' /> {destinationArrival.slice(0, 5)} | {destination}
								</Header>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header as='h4'>
									<StyledIcon name='stopwatch' />
									{duration} Hrs
								</Header>
							</Grid.Column>
							<Grid.Column width={3}>
								<Header as='h4'>
									<StyledIcon name='road' />
									{totalDistance} Kms
								</Header>
							</Grid.Column>
							<Grid.Column width={4}>
								<Button
									size='mini'
									content='Details'
									icon='angle down'
									onClick={this.changeCollapsible}
								/>
								<Button
									size='mini'
									onClick={async () => {
										await this.bookTicket();
									}}
									disabled={this.state.token ? false : true}
									style={{ background: '#2196f3', color: '#fff' }}
									content='Book'
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Collapsible open={collapsible} transitionTime={200}>
						<Divider horizontal>Journey Details</Divider>
						<Grid padded centered stackable>
							<Grid.Row>
								<Grid.Column width={4}>
									<FeedbackCard ratings={ratings} />
								</Grid.Column>
								<Grid.Column width={12}>
									<Card.Group centered>
										<Card style={{ textAlign: 'center', width: 'unset' }}>
											<Card.Content>
												<Card.Header>SL</Card.Header>
											</Card.Content>
											<Card.Content extra>
												<Button basic color='blue'>
													Check
												</Button>
											</Card.Content>
										</Card>
										<Card style={{ textAlign: 'center', width: 'unset' }}>
											<Card.Content>
												<Card.Header>CC</Card.Header>
											</Card.Content>
											<Card.Content extra>
												<Button basic color='blue'>
													Check
												</Button>
											</Card.Content>
										</Card>
										<Card style={{ textAlign: 'center', width: 'unset' }}>
											<Card.Content>
												<Card.Header>3A</Card.Header>
											</Card.Content>
											<Card.Content extra>
												<Button basic color='blue'>
													Check
												</Button>
											</Card.Content>
										</Card>
										<Card style={{ textAlign: 'center', width: 'unset' }}>
											<Card.Content>
												<Card.Header>2A</Card.Header>
											</Card.Content>
											<Card.Content extra>
												<Button basic color='blue'>
													Check
												</Button>
											</Card.Content>
										</Card>
									</Card.Group>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Collapsible>
				</StyledSegment>
			</React.Fragment>
		);
	}
}

const StyledIcon = styled(Icon)`
  display: inline-block !important;
  font-size: 16px !important;
`;
const StyledSegment = styled(Segment)`
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19) !important;
  }
`;
const StyledTrainName = styled(Header)`
  text-align: center !important;
`;

const StyledDot = styled.span`
  height: 10px;
  width: 10px;
  background-color: ${(props) => (props.type === 'origin' ? 'green' : 'red')};
  border-radius: 50%;
  display: inline-block;
}
`;

export default JourneyCard;
