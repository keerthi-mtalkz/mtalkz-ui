import axios from 'axios'
export const ax = axios.create({
  
    baseURL: 'https://app.mtalkz.cloud/api',
    // baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': `Bearer ${token}`
     }
     
  })
  
