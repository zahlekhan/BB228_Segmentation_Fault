import React from 'react';
import { Divider } from 'semantic-ui-react';

import JourneyCard from './JourneyCard.js';

class AlternateTrainsCard extends React.Component {
	render() {
		const { journey } = this.props;

		const { originToConnection, connectionToDestination, timeGap, connection } = journey;
		return (
			<React.Fragment>
				<JourneyCard train={originToConnection} />
				<Divider horizontal>
					Connecting Station {': '}
					{'    '}
					{connection} {'Time Gap:'}
					{timeGap.hour + ':' + timeGap.minute}
				</Divider>
				<JourneyCard train={connectionToDestination} />
				<br />
			</React.Fragment>
		);
	}
}

export default AlternateTrainsCard;
