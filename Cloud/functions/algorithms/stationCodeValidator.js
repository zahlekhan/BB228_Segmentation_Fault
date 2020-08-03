const stationCodetoName = require('../data/stationCodetoName.json');

module.exports = function() {
	this.stationCodeValidator = function(origin, destination) {
		try {
			if (
				stationCodetoName[origin.toUpperCase()] !== undefined &&
				stationCodetoName[destination.toUpperCase()] !== undefined
			) {
				return true;
			}
		} catch (error) {
			return false;
		}
	};
};
