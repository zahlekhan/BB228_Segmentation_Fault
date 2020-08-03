import React, { useEffect, useState } from 'react';
import AlternateTrainsCards from './AlternateTrainsCard';

const AlternateTrains = (props) => {
	const [ journeys, setJourneys ] = useState(null);

	const timePlay = (timeOne, timeTwo, sign) => {
		//utility function, this will result timeOne + sign*timeTwo sign ={+1,-1}
		const timeOneSplit = timeOne.split(':');
		const timeTwoSplit = timeTwo.split(':');

		const timeOneHr = parseInt(timeOneSplit[0], 10);
		const timeOneMin = parseInt(timeOneSplit[1], 10);

		const timeTwoHr = parseInt(timeTwoSplit[0], 10);
		const timeTwoMin = parseInt(timeTwoSplit[1], 10);

		let carry = 0;

		var minCalculation = timeOneMin + sign * timeTwoMin;
		if (minCalculation < 0) {
			carry = -1;
			minCalculation = (minCalculation % 60 + 60) % 60;
		} else if (minCalculation >= 60) {
			carry = 1;
			minCalculation = minCalculation % 60;
		}
		const hourCalculation = timeOneHr + sign * timeTwoHr + carry;
		return { hour: hourCalculation, minute: minCalculation };
	};

	const differenceOfHours = (trainOC, trainCD, minTimeDifference, maxTimeDifference) => {
		const timeGap = timePlay(trainCD.originDeparture, trainOC.destinationArrival, -1);

		if (timeGap.hour <= maxTimeDifference && timeGap.hour >= minTimeDifference) {
			return { value: true, timeGap: timeGap };
		}

		return false;
	};

	const setJourneyFixtures = (trains) => {
		var fixtures = [];
		for (var key in trains) {
			const trainsBetweenOC = trains[key]['origin-connection'];
			const trainsBetweenCD = trains[key]['connection-destination'];
			const connection = trains[key]['connection'];
			for (var keyOC in trainsBetweenOC) {
				const trainOC = trainsBetweenOC[keyOC];
				for (var keyCD in trainsBetweenCD) {
					const trainCD = trainsBetweenCD[keyCD];
					const { value, timeGap } = differenceOfHours(trainOC, trainCD, 1, 7);
					if (value === true) {
						const fixtureDump = {
							originToConnection: trainOC,
							connectionToDestination: trainCD,
							connection: connection,
							timeGap: timeGap,
						};
						fixtures.push(fixtureDump);
					}
				}
			}
		}
		return fixtures;
	};

	useEffect(
		() => {
			const { trains } = props;
			const fixtures = setJourneyFixtures(trains);
			setJourneys(fixtures);
		},
		[ props ],
	);

	return (
		<div>
			{journeys !== null && journeys.length !== 0 ? (
				journeys.map((journey, index) => <AlternateTrainsCards journey={journey} key={index} />)
			) : null}
		</div>
	);
};

export default AlternateTrains;
