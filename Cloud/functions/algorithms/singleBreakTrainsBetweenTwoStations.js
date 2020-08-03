const alternateRoutes = require('../data/alternateRoutes.json');
const trainsVisitingStation = require('../data/trainsVisitingStation.json');
const distanceData = require('../data/distance.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');
const { connection } = require('mongoose');

require('./directTrainsBetweenTwoStations.js')();

module.exports = function() {
	this.singleBreakTrainsBetweenTwoStations = function(origin, destination, userDate) {
		const result = [];
		var minDistance = 100000;

		const date = new Date(userDate);

		for (var connection in alternateRoutes) {
			var day = date.getDay();
			var trainBetweenConnectionOrigin = directTrainsBetweenTwoStations(origin, connection, day, userDate);

			if (trainBetweenConnectionOrigin.length > 0) {
				const { number, originDeparture } = trainBetweenConnectionOrigin[0];

				day =
					(day +
						dayShift(
							originDeparture,
							distance[number][connection].duration,
							distance[number][origin].duration,
						)) %
					7;

				var trainBetweenConnectionDestination = directTrainsBetweenTwoStations(
					connection,
					destination,
					day,
					userDate,
				);

				if (trainBetweenConnectionOrigin.length !== 0 && trainBetweenConnectionDestination.length !== 0) {
					const totalDistance =
						trainBetweenConnectionOrigin[0].totalDistance +
						trainBetweenConnectionDestination[0].totalDistance;

					if (minDistance > totalDistance) {
						minDistance = totalDistance;
					}
					result.push({
						connection: connection,
						distance: totalDistance,
						'origin-connection': trainBetweenConnectionOrigin,
						'connection-destination': trainBetweenConnectionDestination,
					});
				}
			}
		}
		return filterByDistance(result, minDistance);
	};

	this.filterByDistance = function(results, minDistance) {
		const result = [];
		for (key in results) {
			if (minDistance < 1000 && results[key].distance <= 1.1 * minDistance) {
				result.push(results[key]);
			}
			if (minDistance > 1000 && results[key].distance <= 1.03 * minDistance) {
				result.push(results[key]);
			}
		}
		return result;
	};

	this.dayShift = function(originDeparture, connectionDuration, originDuration) {
		const connectionTimes = connectionDuration.split(':');
		const originTime = originDuration.split(':');

		const connectionMin = parseInt(connectionTimes[1], 10);
		const originMin = parseInt(originTime[1], 10);
		const connectionHr = parseInt(connectionTimes[0], 10);
		const originHr = parseInt(originTime[0], 10);
		const minuteDiff = connectionMin - originMin;
		var carryDur = 0;
		if (minuteDiff < 0) {
			carryDur = 1;
		}
		const durationMinutes = (minuteDiff % 60 + 60) % 60;
		const durationHours = connectionHr - originHr - carryDur;

		const originTimes = originDeparture.split(':');

		const originHours = parseInt(originTimes[0], 10);
		const originMinutes = parseInt(originTimes[1], 10);

		const minuteAddition = durationMinutes + originMinutes;
		const carryFromMinutes = Math.floor(minuteAddition / 60);

		const hourAddition = originHours + carryFromMinutes + durationHours;
		const shiftInDay = Math.floor(hourAddition / 24);
		return shiftInDay;
	};
};
