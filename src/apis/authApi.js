import axios from 'axios'

const authApi = axios.create({
    // baseURL: 'http://projectdaw.duckdns.org:3377/API-REST', // for production server
    baseURL: 'http://localhost:3377/API-REST', // for local dev server
    // header aplication/json
    headers: {
        'Content-Type': 'application/json'
    }
})

export default authApi