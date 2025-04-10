import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// INTERCEPTORS: 

// Request interceptor to add the token to the request headers
// Response interceptor to handle the error response from the server

api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN_SONRISADIGITAL')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api

// API INTERCEPTOR RESPONSE

/*api.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401) {
            localStorage.removeItem('AUTH_TOKEN_SONRISADIGITAL')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)*/