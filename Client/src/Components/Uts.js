import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { mic } from 'react-icons-kit/icomoon/mic';
import { Image, Button, Modal } from 'semantic-ui-react';

import UserContext from '../contexts/UserContext.js';
import RasaUtsAPI from '../utils/RasaUtsAPI.js';
const Uts = () => {
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

	const userContext = useContext(UserContext);
	const { language } = userContext;
	var recognition = new SpeechRecognition();
	recognition.lang = language;

	const [ isOpen, setIsOpen ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ number, setNumber ] = useState(null);
	const [ trains, setTrains ] = useState(null);
	const [ origin, setOrigin ] = useState(null);
	const [ destination, setDestination ] = useState(null);
	const [ via, setVia ] = useState(null);

	const listenSpeech = () => {
		setLoading(true);
		recognition.start();
	};

	const stopListnening = () => {
		setLoading(false);
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
			const { trains, origin, destination, via, number } = entityExtraction.data;
			setTrains(trains);
			setOrigin(origin);
			setDestination(destination);
			setVia(via);
			setNumber(number);
			setIsOpen(true);
		} catch (error) {
			console.log(error);
		}

		stopListnening();
		setLoading(false);
		setIsOpen(false);
	};

	return (
		<React.Fragment>
			<div style={{textAlign:'center'}}>
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
					<div>
						{origin !== null && destination !== null && via !== null && trains !== null ? (
							<div style={{fontSize:2+'rem', margin:1+'rem'}}>
								Your {number} ticket from {origin} to {destination} via {via} is ready, are you sure you
								want to book your ticket?
								<Button style={{display:'block',textAlign:'center',margin:'auto',lineHeight:2+'rem'}} class="ui disabled button" disabled="" tabindex="-1">Book Now </Button>
							</div>
							
						) : null}
					</div>
				</StyledButton>

				<Modal
					open={loading}
					close={loading === false}
					style={{
						top: 'unset',
						left: 'unset',
						height: 'unset',
						textAlign: 'center',
					}}
				>
					<Modal.Header style={{}}>Loading</Modal.Header>
					<Modal.Content image style={{ justifyContent: 'center' }}>
						<Image wrapped size='medium' src='./microphone.gif' />
					</Modal.Content>
				</Modal>
			</div>
		</React.Fragment>
	);
};

const StyledButton = styled(Button)`
`;

export default Uts;
