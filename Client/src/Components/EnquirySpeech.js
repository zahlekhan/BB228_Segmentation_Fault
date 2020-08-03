import React, { useContext, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { mic } from 'react-icons-kit/icomoon/mic';
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
		var intent1=null;
		var entity1=null;
		try {
			const entityExtraction = await EnquiryAPI.post('/', body);
			intent1=entityExtraction.data.intent.name;
			entity1=entityExtraction.data.entity[0].value;
			setEntity(entityExtraction.data.entity[0].value);
			setIntent(entityExtraction.data.intent.name);
			
		} catch (error) {
			console.log(error);
		}
		stopListnening();
		setIsOpen(false);
		// const text = 'I hope you are loving it';
		intent1 = intent1 === 'running status' ? intent1 : 'Passenger Name Record';
		
		var text1 = 'The'+intent1+'of'+entity1+'is';
		var text2 =  intent1 === 'running status' ? 'running late by 10 minutes' : 'waitlisted by GN/WL 4';
		const text = text1+text2;
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
				style={{ padding: 0.5 + 'rem', 
						background: '#fff',
						display: 'block',
						margin: 'auto',
						fontSize: 2+'rem',
					}}
				type='submit'
				onClick={() => {
					listenSpeech();
				}}
			>
				{' '}
				<Icon size={80} icon={mic} />
				Ask me live running status or PNR status
			</StyledButton>
			<Grid padded centered>
				<Grid.Row>
					
					<Grid.Column width={8}>
						{entity !== null && intent !== null ? (
							<div style={{
								textAlign:'center',
								fontSize:2+'rem'
							}}>
								The {intent} of {entity} is{' '}
								{intent === 'running status' ? (
									<span>running late by 10 minutes</span>
								) : (
									<span> waitlisted by GN/WL 4</span>
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

				</Grid.Row>
			</Grid>
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
	
`;
