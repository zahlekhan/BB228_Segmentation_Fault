const trainsVisitingStation = require('../data/trainsVisitingStation.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');
const runningDays = require('../data/runningDays.json');

module.exports = function() {
	this.directTrainsBetweenTwoStations = (origin, destination, day, date) => {
		var originTrains = trainsVisitingStation[origin];
		var destinationTrains = trainsVisitingStation[destination];

		var directTrains = [];

		for (trainNumber in originTrains) {
			try {
				if (
					destinationTrains[trainNumber] !== undefined &&
					distance[trainNumber][origin].distance < distance[trainNumber][destination].distance &&
					runningDays[origin][trainNumber][day] === true
				) {
					var arrivalAtOrigin = trainsVisitingStation[origin][trainNumber].arrival;
					var departureAtOrigin = trainsVisitingStation[origin][trainNumber].departure;
					var arrivalAtDestination = trainsVisitingStation[destination][trainNumber].arrival;

					const { duration, shiftInDay } = reachingDate(
						date,
						arrivalAtOrigin,
						distance[trainNumber][destination].duration,
						distance[trainNumber][origin].duration,
					);
					directTrains.push({
						number: trainNumber,
						name: trainNumberToName[trainNumber][0],
						origin: origin,
						boardingDate: date,
						destination: destination,
						reachingDate: shiftInDay,
						originDeparture: departureAtOrigin,
						destinationArrival: arrivalAtDestination,
						duration: duration,
						totalDistance:
							-distance[trainNumber][origin].distance + distance[trainNumber][destination].distance,
						day: day,
					});
				}
			} catch (error) {
				continue;
			}
		}

		return directTrains;
	};

	this.reachingDate = function(boardingDate, originDeparture, connectionDuration, originDuration) {
		var monthDays = {
			jan: 31,
			feb: 28,
			mar: 31,
			apr: 30,
			may: 31,
			jun: 30,
			jul: 31,
			aug: 31,
			sep: 30,
			oct: 31,
			nov: 30,
			dec: 31,
		};
		var monthToIndex = {
			jan: 0,
			feb: 1,
			mar: 2,
			apr: 3,
			may: 4,
			jun: 5,
			jul: 6,
			aug: 7,
			sep: 8,
			oct: 9,
			nov: 10,
			dec: 11,
		};
		var indexToMonth = {
			0: 'jan',
			1: 'feb',
			2: 'mar',
			3: 'apr',
			4: 'may',
			5: 'jun',
			6: 'jul',
			7: 'aug',
			8: 'sep',
			9: 'oct',
			10: 'nov',
			11: 'dec',
		};

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

		const dateSplit = boardingDate.split(' ');
		const date = parseInt(dateSplit[0], 10);
		const month = dateSplit[1];
		const year = parseInt(dateSplit[2], 10);

		const dateShift = date + shiftInDay;
		const dateCarry = Math.floor((date + shiftInDay) / monthDays[month]);
		const newDate = dateShift % monthDays[month];

		const newMonthIndex = (monthToIndex[month] + dateCarry) % 12;

		const newMonth = indexToMonth[newMonthIndex];

		return {
			shiftInDay: newDate.toString() + ' ' + newMonth.toString(),
			duration: durationHours.toString() + ':' + durationMinutes.toString(),
		};
	};
};
