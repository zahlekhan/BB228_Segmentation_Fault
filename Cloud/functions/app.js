const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const directTrains = require('./api/directTrains.js');
// const directTrainsNearbySt = require('./api/directTrainsNearbySt.js');
const singleBreakTrains = require('./api/singleBreakTrains.js');
// const singleBreakTrainsNearbySt = require('./api/singleBreakTrainsNearbySt.js');
// const stationDecoder = require('./api/stationDecoder.js');
// const trainNumbertoName = require('./api/trainNumbertoName.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Aceess-Control-Allow-Header', '*');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'POST GET PATCH PUT DELETE');
		return res.status(200).json({});
	}

	next();
});

app.use('/direct-trains/', directTrains);
app.use('/alternate-trains', singleBreakTrains);
// app.use('/station-decoder', stationDecoder);
// app.use('/train-name', trainNumbertoName);

module.exports = app;
