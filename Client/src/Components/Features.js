import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

class Features extends React.Component {
	render() {
		return (
			<Grid>
				<Grid.Row>
					<Grid.Column width={4} />
					<Grid.Column width={2}>
						<Icon name='comments' size='huge' />
						<br />
						Smart Enquiry
					</Grid.Column>
					<Grid.Column width={1} />
					<Grid.Column width={2}>
						<Icon name='newspaper outline' size='huge' />
						<br />
						Smart Feedback
					</Grid.Column>
					<Grid.Column width={1} />
					<Grid.Column width={2}>
						<Icon name='chart line' size='huge' />
						<br />
						Smart Analytics
					</Grid.Column>
					<Grid.Column width={4} />
				</Grid.Row>

				<Grid.Row>
					<Grid.Column width={4} />
					<Grid.Column width={2}>
						<Icon name='qrcode' size='huge' />
						<br />
						Smart Complaint
					</Grid.Column>
					<Grid.Column width={1} />
					<Grid.Column width={2}>
						<Icon name='detective' size='huge' />
						<br />
						Smart Detector
					</Grid.Column>
					<Grid.Column width={1} />
					<Grid.Column width={2}>
						<Icon name='exchange' size='huge' />
						<br />
						Smart Booking
					</Grid.Column>
					<Grid.Column width={4} />
				</Grid.Row>
			</Grid>
		);
	}
}

export default Features;
