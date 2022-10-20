import axios from 'axios'
const ax = axios.create({
  
    baseURL: 'https://app.mtalkz.cloud/api',
    // baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': `Bearer ${token}`
     }
     
  })
  

export const getUsers=async ()=>{
    await ax
    .get("/users", {
      headers: {
    
        'Authorization': `Bearer ${token1}`
      }
    })
    .then((res) => {
      return res.data
    
    })
    .catch((err) => {
      console.error("get /fetchUsers error", err);
    });
}

export const LOGIN =async (data)=>{
    await ax
    .post("/auth/login", data)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error("get login error", err);
    });
}

