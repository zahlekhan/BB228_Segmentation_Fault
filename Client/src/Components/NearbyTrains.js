import React from 'react';
import { Loader } from 'semantic-ui-react';
import API from '../utils/API.js';

import AlternateTrains from './AlternateTrains.js';

class NearbyTrains extends React.Component {
	state = {
		trains: null,
		loading: false,
	};

	loadTrains = async () => {
		const { origin, destination, date } = this.props;
		const requestBody = {
			origin: origin,
			destination: destination,
			date: date,
			state: 'origin',
		};
		this.setState({ loading: true });
		const trains = await API.post('/alternate-trains-from-nearby', requestBody);
		this.setState({ trains: trains.data, loading: false });
	};

	componentDidMount() {
		this.loadTrains();
	}

	render() {
		const { trains } = this.state;
		return (
			<React.Fragment>
				<Loader active={this.state.loading} inline='centered' />
				{trains !== null ? (
					trains.map((train) => (train.length !== 0 ? <AlternateTrains trains={train} /> : null))
				) : null}
			</React.Fragment>
		);
	}
}

export default NearbyTrains;
