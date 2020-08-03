const express = require('express');
const router = express.Router();

require('../algorithms/directTrainsBetweenTwoStations.js')();
require('../algorithms/stationCodeValidator.js')();

router.post('/', (req, res, next) => {
	var origin = req.body.origin.toUpperCase();
	var destination = req.body.destination.toUpperCase();
	var date = req.body.date;
	var getDate = new Date(date);
	var day = getDate.getDay();
	try {
		if (stationCodeValidator(origin, destination)) {
			res.status(200).json(directTrainsBetweenTwoStations(origin, destination, day, date));
		}
	} catch (error) {
		res.status(404).json(error);
	}
	next();
});

module.exports = router;
