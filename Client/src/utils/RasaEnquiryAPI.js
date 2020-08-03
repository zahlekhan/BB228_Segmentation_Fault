import axios from 'axios';

export default axios.create({
	baseURL: process.env.REACT_APP_RASA_ENQUIRY_ENGINE,
	responseType: 'json',
});
