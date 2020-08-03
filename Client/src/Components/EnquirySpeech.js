import React, { useContext, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { question } from 'react-icons-kit/icomoon/question';
import { Button, Modal, Grid, Image } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'firebase/firestore';
import styled from 'styled-components';

import EnquiryAPI from '../utils/EnquiryAPI';

import UserContext from '../contexts/UserContext';

const EnquirySpeech = () => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ entity, setEntity ] = useState(null);
	const [ intent, setIntent ] = useState(null);
	const userContext = useContext(UserContext);

	const { language } = userContext;

	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	var synth = window.speechSynthesis;

	var recognition = new SpeechRecognition();
	recognition.lang = language;

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

		const body = { text: transcript, language: language };

		try {
			const entityExtraction = await EnquiryAPI.post('/', body);

			setEntity(entityExtraction.data.entity[0].value);
			setIntent(entityExtraction.data.intent.name);
		} catch (error) {
			console.log(error);
		}
		console.log(entity);
		stopListnening();
		setIsOpen(false);
		const text = 'I hope you are loving it';
		var toSpeak = new SpeechSynthesisUtterance(text);
		var voices = synth.getVoices();
		toSpeak.voice = voices[0];
		synth.speak(toSpeak);
	};

	recognition.onspeechend = () => {
		recognition.stop();
	};

	return (
		<React.Fragment>
			<ToastContainer />
			<StyledButton
				circular
				style={{ padding: 0.5 + 'rem', background: '#fff' }}
				type='submit'
				onClick={() => {
					listenSpeech();
				}}
			>
				{' '}
				<Icon size={40} icon={question} />
			</StyledButton>

			<Grid.Row>
				<Grid.Column width={5} />
				<Grid.Column width={6}>
					{entity !== null && intent !== null ? (
						<div>
							The {intent} of {entity} is{' '}
							{intent === 'running status' ? (
								<span>running late by {Math.floor(Math.random() * 10)}</span>
							) : (
								<span>is waitlisted by GN/WL {Math.floor(Math.random() * 10)}</span>
							)}{' '}
						</div>
					) : null}
					<StyledModal
						size='mini'
						closeIcon
						open={isOpen}
						onClose={() => {
							setIsOpen(false);
						}}
						onOpen={() => setIsOpen(true)}
					>
						{(() => {
							return (
								<React.Fragment>
									{entity !== null ? (
										<React.Fragment>
											<Modal.Header>Our bot, is Listening to your queries</Modal.Header>
										</React.Fragment>
									) : (
										<StyledImage wrapped size='large' src='./microphone.gif' />
									)}
								</React.Fragment>
							);
						})()}
					</StyledModal>
				</Grid.Column>

				<Grid.Column width={5} />
			</Grid.Row>
		</React.Fragment>
	);
};
export default EnquirySpeech;

const StyledModal = styled(Modal)`
  margin-left: 25% !important;
  top: 30%;
  height: auto !important;
`;

const StyledImage = styled(Image)`
  margin-left: 20%;
`;

const StyledButton = styled(Button)`
  position: absolute !important;
  bottom: 2% !important;
  right: 2% !important;
`;
