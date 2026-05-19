import axios from 'axios'

const api = axios.create({

  baseURL:
    'https://vizhuthugal-backend.onrender.com/api',

})

export default api