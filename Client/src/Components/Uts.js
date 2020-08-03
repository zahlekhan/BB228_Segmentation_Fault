import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { mic } from 'react-icons-kit/icomoon/mic';
import { Image, Button } from 'semantic-ui-react';

import UserContext from '../contexts/UserContext.js';
import RasaUtsAPI from '../utils/RasaUtsAPI.js';
const Uts = () => {
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

	const userContext = useContext(UserContext);
	const { language } = userContext;
	var recognition = new SpeechRecognition();
	recognition.lang = language;

	const [ isOpen, setIsOpen ] = useState(false);
	const [ entity, setEntity ] = useState(null);
	const [ intent, setIntent ] = useState(null);

	const listenSpeech = () => {
		setIsOpen(true);
		recognition.start();
	};

	const stopListnening = () => {
		recognition.stop();
	};

	recognition.onresult = async (event) => {
		event.preventDefault();
		var last = event.results.length - 1;
		var transcript = event.results[last][0].transcript;

		const body = { text: transcript, language: 'en', date: '29 jul 2020' };

		try {
			const entityExtraction = await RasaUtsAPI.post('/', body);
			console.log(entityExtraction);
			setEntity(entityExtraction.data.entity[0].value);
			setIntent(entityExtraction.data.intent.name);
		} catch (error) {
			console.log(error);
		}
		console.log(entity);
		stopListnening();
		setIsOpen(false);
	};

	return (
		<div>
			<h1>Unreserved Ticketing system</h1>
			<StyledButton
				circular
				style={{ padding: 0.5 + 'rem', background: '#fff' }}
				type='submit'
				onClick={() => {
					listenSpeech();
				}}
			>
				{' '}
				<Icon size={40} icon={mic} />
			</StyledButton>
		</div>
	);
};

const StyledButton = styled(Button)`
  position: absolute !important;
  bottom: 2% !important;
  right: 2% !important;
`;

export default Uts;
