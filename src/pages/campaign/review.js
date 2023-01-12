import React, { useState } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications';
import Select from "react-select";
import Switch from 'react-switch';
import CustomModal from "../../components/custommodal";
import Breadcrumb from '../../components/breadcrumbs';
import {createFlow,dummycreateFlow} from "./helper"

const Review = () => {
  const router = useRouter();
 let keys = Object.keys(createFlow);
 console.log(typeof(createFlow["tags"]),createFlow["tags"],"shorten_linkshorten_link")

 const saveAndSubmit = async() =>{
    const token = localStorage.getItem('token');
    await ax
      .post("http://20.193.136.151:5000/campaigns/",
      createFlow,
      {
        headers: {
          'x-api-key': `${token}`
        }
      })
      .then((res) => {
        console.log(res)
        keys.map((key)=>{
            createFlow[key]=dummycreateFlow[key]
        })
        router.push("/campaign")
      })
      .catch((err) => {
        console.error("get /campaigns error", err);
      });
 }


  return (
    <div>
    <div style={{width:"50%"}} className="p-4  m-10 bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
    {keys.map(key =>{
       console.log(createFlow[key],"ceateflow")
       return (
         <div className="flex p-2 ">
         <div className="font-semibold" style={{width:"40%"}}>{key}</div>
         <div  className="font-semibold" style={{width:"20%"}}>:</div>
       {typeof(createFlow[key]) == "string" && <div  style={{width:"40%"}}>{createFlow[key]}</div>}  
       {typeof(createFlow[key]) == "boolean" && <div  style={{width:"40%"}}>{createFlow[key]?"true":"false"}</div>}
       {typeof(createFlow[key]) == "object" &&
       <div>
       {
       createFlow[key].map((element)=><div>{element.value ? element.value :element.text }</div>)
       }
       </div>
   }  
         </div>
       )
    })}
    <div>
    </div>
 </div>
 <div>
 <button className="btn btn-default btn-gray" type="button" onClick={()=>{
    keys.map((key)=>{
        createFlow[key]=dummycreateFlow[key]
    })
    router.push("/campaign")
 }} >
 Cancel
</button>
 <button
 className="ml-3  btn btn-default btn-indigo create-btn"
 type="button"
 onClick={()=>{saveAndSubmit()}}
>
Submit
</button>
 </div>
  
    </div>
     
  );
};
export default withRedux(Review);

