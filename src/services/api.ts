import axios from 'axios'

const API = axios.create({

  baseURL:
    'https://vizhuthugal-backend.onrender.com/api',

})

export default API