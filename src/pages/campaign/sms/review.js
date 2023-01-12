import React from "react";
import { useRouter } from "next/router";
import { withRedux } from "../../../lib/redux";
import {createFlow,dummycreateFlow} from "./helper"
import {Badge} from '../../../components/badges'

const Review = ({goBack}) => {
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
        apiData.tags.push(tag.text)
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
    <div style={{width:"60%",wordBreak:"break-all"}} className="p-4   m-10 bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
    <div className="w-full mr-2 mb-4">
    <label className="block">
      <span className="text-default font-semibold">Name</span>
      <input
      disabled={true}
        name="campaignName"
        type="text"
        className="form-input mt-1 text-xs block w-full bg-white"
        placeholder="Please enter campaign name"
        value={createFlow.name}
      />
    </label>
    <label className="block mt-2">
    <span className="text-default font-semibold">Tags</span>
   <div className="flex mt-1">
   {createFlow.tags.map(tag=>{
    return (
      <div className="mr-2">
     <Badge  color={"pink "} alt size="default" rounded>
     {tag.text}
   </Badge>
   </div>
    )  
})}
   </div>    
 
  </label>
  <label className="block mt-2">
  <span className="text-default font-semibold">Send To</span>
  {createFlow.target_lists.map((tl,i)=>{
  return  <input
    disabled={true}
      name={tl+i}
      type="text"
      className="form-input mt-1 text-xs block w-full bg-white"
      placeholder="Please enter campaign name"
      value={tl.label}
    />
  })}
  </label>

 {createFlow.exclude_lists.length > 0 &&  <label className="block mt-2">
 <span className="text-default font-semibold">Don't Send To</span>
 {createFlow.exclude_lists.map((tl,i)=>{
 return  <input
   disabled={true}
     name={tl+i}
     type="text"
     className="form-input mt-1 text-xs block w-full bg-white"
     placeholder="Please enter campaign name"
     value={tl.label}
   />
 })}
 </label>}

 <label className="block mt-2">
 <span className="text-default font-semibold">Content</span>
 <textarea
 name="message"
 className="text-xs form-textarea mt-1  block w-full"
 rows="3"
 value={createFlow.message}
 disabled={true}
 placeholder="Your message"></textarea>
</label>

<label className="block mt-2">
  <span className="text-default font-semibold">Target Attribute</span>
   <input
     disabled={true}
      name={"targetAttribute"}
      type="text"
      className="form-input mt-1 text-xs block w-full bg-white"
      value={createFlow.target_attribute[0].label}
    />
  </label>
   
  <div className="mt-2">
  <input
    name="shortLinks"
    type="checkbox"
    className="form-checkbox"
    checked={createFlow.shorten_link}
    disabled={true}
  />
  <label className="text-default font-semibold ml-3">Automatically Shorten Links</label>
</div>
<div className="mt-2">
<input
  name="shortLinks"
  type="checkbox"
  className="form-checkbox"
  checked={createFlow.unicode}
  disabled={true}
/>
<label className="text-default font-semibold ml-3">Unicode Message</label>
</div>

  </div>
    <div>
    </div>
 </div>
 <div>
 <button
 className="ml-3 mr-3  btn btn-default btn-indigo create-btn" type="button" onClick={() => {
   goBack()
 }}>
 Back
</button>
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

