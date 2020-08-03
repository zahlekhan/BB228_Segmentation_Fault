import React from 'react';

const DirectTrains = ({ origin, destination, train, index }) => {
	const trainNumber = train.number;
	const trainName = train.name !== undefined ? train.name[0] : 'MEMU Passenger';
	const timeOfDepartureAtOrigin = train.originDepartTime;
	return (
		<React.Fragment>
			<li id={index}>
				{trainNumber} - {trainName}
			</li>
			<strong>Time of Arrival at </strong>
			{train.origin}: {timeOfDepartureAtOrigin} <br />
			<strong>Originating Station: </strong>
			{train.origin} <br />
			<strong>Destination Station: </strong>
			{train.destination} <br />
			<br />
		</React.Fragment>
	);
};

export default DirectTrains;
