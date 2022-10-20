import axios from "axios";


export const BASE_URl=`https://api.mtalkz.cloud/api`

export const ax = axios.create({
    baseURL: BASE_URl,
    withCredentials: true,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });


  