import React from "react";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {createFlow,dummycreateFlow} from "./helper"

const Review = () => {
  const router = useRouter();
 let keys = Object.keys(createFlow);

 const saveAndSubmit = async() =>{
    const token = localStorage.getItem('token');
     const apiData= {...createFlow}
     apiData.tags = [];
     apiData.target_attribute=[];
     apiData.exclude_lists = []
     apiData.target_lists = []

     createFlow.tags.map((tag)=>{
        apiData.tags.push(tag.value)
     })
     createFlow.target_attribute.map((attribute)=>{
      apiData.target_attribute.push(attribute.value)
     })
     createFlow.target_lists.map((data) => {
      apiData.target_lists.push(data.label)
    })
    createFlow.exclude_lists.map((data) => {
      apiData.exclude_lists.push(data.label)
    })
    fetch("http://20.193.136.151:5000/campaigns/",{
      method:"POST",
      body: JSON.stringify(apiData),
      headers: {
        'x-api-key': `${token}`,
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then((res) => {
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
    <div style={{width:"50%",wordBreak:"break-all"}} className="p-4   m-10 bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
    {keys.map(key =>{
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

