const express = require('express');
const router = express.Router();

require('../algorithms/singleBreakTrainsBetweenTwoStations.js')();
require('../algorithms/stationCodeValidator.js')();

router.post('/', (req, res, next) => {
	var origin = req.body.origin.toUpperCase();
	var destination = req.body.destination.toUpperCase();
	var date = req.body.date;

	try {
		if (stationCodeValidator(origin, destination)) {
			res.status(200).json(singleBreakTrainsBetweenTwoStations(origin, destination, date));
		} else {
			res.status(404).json('Invalid Station Details');
		}
	} catch (error) {
		throw error;
	}
});

module.exports = router;
