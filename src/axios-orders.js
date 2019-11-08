import axios from 'axios';

// Define an instance, we have a baseURL, we can dismiss this basic URL and type the URL part after 
// it when we using axio functions. 
const instance = axios.create({
    baseURL: 'https://my-burger-4f40d.firebaseio.com/'
});

export default instance;