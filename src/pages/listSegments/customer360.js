import React from "react";
import { NotificationManager } from 'react-notifications';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import Breadcrumb from '../../components/breadcrumbs';
import Datatable from "../../components/datatable";
import axios from "axios";
import { useRouter } from "next/router";
import {Badge} from '../../components/badges'

const Customer360 = () => {
  const router = useRouter();
  const [status, setStatus] = React.useState(undefined);
  const items2 = [
    {title: 'List & Segments', url: '/listSegments', last: false},
  ]
  const [data,setData] = React.useState(undefined);

  const getListDetails=()=>{
  const token = localStorage.getItem('token');
    axios({
        method: 'get',
        url: `http://20.193.136.151:5000/customers/?customer_id=${router.query.customerId}&skip=0&limit=10`,
        headers:{
          "x-api-key": `Bearer ${token}`,
        }
      }).then((response)=>{
        setData(response.data)
      }).catch((error)=>{})
  }

  React.useEffect(()=>{
    getListDetails()
  },[])


  return (
    <Layout className="overflow-x-scroll">
    <div  className="flex">
    <div style={{width:"70%"}}>
    {data && data.map((element)=>{
        return (
            <div className="flex p-4 w-full  bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700" style={{ padding:"10px",margin:"10px"}}>
            <div style={{width:"80%"}}>
               <div className="font-semibold">{element.customer_id}</div>
               <div className="mt-1" style={{color:"grey"}}>{JSON.stringify(element.attributes)}
               </div>
            </div>
            <div>{new Date(element.created_at).toLocaleString('en-HI', {dateStyle: 'medium', timeStyle: 'short'})}</div>
            </div>
        )
     })}
    </div>
    <div style={{width:"30%"}}>
      <div className="mb-3 p-3" style={{background:"lightgrey",marginLeft:"16px"}}>
       <span className="font-semibold">Contact</span>
       {
        data && data.map((element)=>
         Object.keys(element.attributes).filter((k)=>k.includes("phone") || k.includes("email") ).map((key)=>{
            return(
             <div style={{wordBreak:"break-all"}}>{key}  :    {JSON.stringify(element.attributes[key])  } </div> 
            ) 
         })
           
        )
       }
      </div>
      <div className="mb-3 p-3"  style={{background:"lightgrey",marginLeft:"16px"}}>
      <span className="font-semibold">Information</span>
      {
        data && data.map((element)=>
         Object.keys(element.attributes).filter((k)=>!k.includes("phone") || !k.includes("email") ).map((key)=>{
            return(
             <div style={{wordBreak:"break-all"}}>{key}  :    {JSON.stringify(element.attributes[key])  } </div> 
            ) 
         })
           
        )
       }
      </div>
    </div>
   
    </div>
    
    </Layout>
  )
}

export default withRedux(Customer360)
