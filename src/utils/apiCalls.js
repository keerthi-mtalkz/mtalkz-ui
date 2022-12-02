import axios from 'axios'
export const ax = axios.create({
  
    baseURL: 'https://app.mtalkz.cloud/api',
    withCredentials: false,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': `Bearer ${token}`
     }
     
  })
  
