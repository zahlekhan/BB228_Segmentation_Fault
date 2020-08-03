import React, { useEffect, useContext, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { mic } from 'react-icons-kit/icomoon/mic';
import { Button, Modal, Grid, Image } from 'semantic-ui-react';
import firebase from 'firebase/app';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'firebase/firestore';
import styled from 'styled-components';

import RasaAPI from '../utils/RasaAPI.js';
import API from '../utils/API.js';
import UserContext from '../contexts/UserContext';

var database;
const Speech = (props) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ abort, setabort ] = useState(false);
	const userContext = useContext(UserContext);

	const { language } = userContext;
	useEffect(() => {
		database = firebase.firestore();
	}, []);

	const { onSpeechEnd } = props;
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	var recognition = new SpeechRecognition();
	recognition.lang = language;

	const listenSpeech = () => {
		setIsOpen(true);
		setabort(false);
		localStorage.setItem('CALLAPI', 'YES');
		recognition.start();
	};

	const stopListnening = () => {
		setIsOpen(false);
		recognition.stop();
	};
	const abortRecognition = () => {
		setabort(true);
		localStorage.setItem('CALLAPI', 'NO');
		recognition.abort();
	};

	recognition.onresult = async (event) => {
		var last = event.results.length - 1;
		var transcript = event.results[last][0].transcript;

		const body = { text: transcript, language: language };
		const entityExtraction = await RasaAPI.post('/', body);

		const today = new Date();
		var data = {};
		data['date'] = today.getDate().toString() + ' jul ' + today.getFullYear();
		const iterate = entityExtraction.data;
		for (var key in iterate) {
			data[iterate[key]['entity']] = iterate[key]['value'];
		}

		const originBody = { name: data['orig'] };
		const destinationBody = { name: data['dest'] };

		await database.collection('Logger').add({
			time: new Date().getTime().toString(),
			transcript: transcript,
			destination: data['dest'] !== undefined ? data['dest'] : 'Not Captured',
			origin: data['orig'] !== undefined ? data['orig'] : 'Not Captured',
			date: data['date'] !== undefined ? data['date'] : 'Not Captured',
			flagged:
				data['orig'] !== undefined && data['dest'] !== undefined && data['date'] !== undefined ? false : true,
		});
		try {
			var origin = await API.post('/station-name-to-code', originBody);
			var destination = await API.post('/station-name-to-code', destinationBody);
			if (origin !== null && destination !== null && localStorage.getItem('CALLAPI') === 'YES') {
				onSpeechEnd(origin.data, destination.data, data['date']);
			}
		} catch (error) {
			toast.error('Unable to detect! Please try again');
		}
		setIsOpen(false);
		stopListnening();
	};

	recognition.onspeechend = () => {
		setIsOpen(false);
		recognition.stop();
	};

	return (
		<React.Fragment>
			<ToastContainer />
			<Button
				circular
				style={{ padding: 0.5 + 'rem', background: '#fff' }}
				type='submit'
				onClick={() => {
					listenSpeech();
				}}
			>
				{' '}
				<Icon size={40} icon={mic} />
			</Button>

			<Grid.Row>
				<Grid.Column width={5} />
				<Grid.Column width={6}>
					<StyledModal open={isOpen} size='small'>
						<Modal.Header>
							{abort ? (
								'Aborting! please wait for a while..'
							) : (
								'Our bot, Adil, is Listening to your queries'
							)}
						</Modal.Header>
						<StyledImage wrapped size='large' src={abort ? './trash.gif' : './microphone.gif'} />
						<StyledModal.Actions>
							<Button color='red' onClick={abortRecognition}>
								Cancel
							</Button>
						</StyledModal.Actions>
					</StyledModal>
				</Grid.Column>
				<Grid.Column width={5} />
			</Grid.Row>
		</React.Fragment>
	);
};

const StyledModal = styled(Modal)`
	margin-left: 25% !important;
	top: 20%;
	height: 450px !important;
`;

const StyledImage = styled(Image)`
	margin-left: 20%;
	height: 330px !important;
`;

export default Speech;
