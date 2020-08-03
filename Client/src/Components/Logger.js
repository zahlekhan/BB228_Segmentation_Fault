import React, { useEffect, useState } from 'react';
import { Segment, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Speech from './Speech.js';
var database;

const Logger = () => {
	const [ logData, setLogData ] = useState([]);
	const [ loading, setLoading ] = useState(true);

	database = firebase.firestore();

	const loadData = async () => {
		const logs = await database.collection('Logger').orderBy('time', 'desc').get();
		setLogData(logs.docs);
		setLoading(false);
	};

	useEffect(() => {
		loadData();
	}, []);

	const flagAsWrong = async (logs) => {
		const flagged = logs.data().flagged;
		await database.collection('Logger').doc(logs.id).update({
			flagged: !flagged,
		});
		const log = await database.collection('Logger').orderBy('time', 'desc').get();
		setLogData(log.docs);
	};

	const deleteLog = async (logs) => {
		await database.collection('Logger').doc(logs.id).delete();
		const log = await database.collection('Logger').orderBy('time', 'desc').get();
		setLogData(log.docs);
	};

	return (
		<div>
			<Speech /> Logger will show recent data on top
			<br />
			{loading === true ? (
				<div>Loading...</div>
			) : (
				logData.map((logs, index) => {
					return (
						<React.Fragment>
							<Segment key={logs.id}>
								<strong>Transcript: </strong>
								{logs.data().transcript} <br />
								<strong>Origin: </strong> {logs.data().origin}
								<br /> <strong>Destination: </strong>
								{logs.data().destination}
								<br /> <strong>Date:</strong> {logs.data().date}
								<StyledButton
									color={logs.data().flagged === true ? 'red' : 'green'}
									onClick={() => {
										flagAsWrong(logs);
									}}
									size={'mini'}
								>
									{logs.data().flagged === false ? 'Flag as wrong' : 'Unflag as wrong'}
								</StyledButton>
								<StyledDeleteButton
									color='brown'
									onClick={() => {
										deleteLog(logs);
									}}
									size={'mini'}
								>
									Delete
								</StyledDeleteButton>
							</Segment>
						</React.Fragment>
					);
				})
			)}
		</div>
	);
};

const StyledButton = styled(Button)`
	position: absolute;
	right: 15%;
`;
const StyledDeleteButton = styled(Button)`
	position: absolute;
	right: 10%;
`;
export default Logger;
