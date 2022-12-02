import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { withRedux } from '../../lib/redux';
import Layout from '../../layouts'
import { UnderlinedTabs } from "../../components/tabs";
import { NotificationManager } from 'react-notifications'
import SectionTitle from '../../components/section-title';

const CallPatchFrom = () => {
  const [status, setStatus] = useState(undefined);
  const { register, handleSubmit } = useForm();
  const [btnStatus,setBtnStatus] = useState(true);
  const onSubmit = (data) => {
    setBtnStatus(false)
    fetch("https://mtalkz.cloud/integrations/voice/callPatch",{
      method:"POST",
      body: JSON.stringify(data),
    headers: {accessToken: "2a38a30d5743afb46059905e46c4f14a",
    'Content-type': 'application/json',
    'Accept': 'application/json',
}
    } ).then(res => {
    document.getElementById("agent_number").value = "";
    document.getElementById("destination_number").value = "";

      const json = res.data;
    setBtnStatus(true)

      if (json.success) {
        setStatus({ type: "success", message: json.status?.message || "Call patched successfully" });
      } else {
        setStatus({ type: "error", message: json.error?.message || "Please try again" });
      }
      setStatus(undefined)
    }).catch(_err => {
    setBtnStatus(true)

      setStatus(undefined)
    })
  }

  return (
    <div>
      <SectionTitle title="Call Patch" subtitle="Connect to an agent" />

      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success(status.message, 'Success')}
          </div>
        </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.error(status.message, 'Error')}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-sm lg:w-1/3">
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Agent Number <span className="text-red-600" >*</span></span>
            <input
              name="agent_number"
              id="agent_number"
              type="text"
              ref={register({ required: true, maxLength: 10 })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Agent number (10-digit)"
              pattern="\d{10}"
              title="Please enter 10-digit mobile number"
              required
            />
          </label>
          <label className="block mt-4">
            <span className="text-default">Customer Number <span className="text-red-600" >*</span></span>
            <input
              name="destination_number"
              id="destination_number"
              type="text"
              ref={register({ required: true, maxLength: 10 })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Customer number (10-digit)"
              pattern="\d{10}"
              title="Please enter 10-digit mobile number"
              required
            />
          </label>
        </div>
        <div className="w-full">
          <input type="submit" style={{"background-color":btnStatus?'#434190':"grey", color:"white"}}   disabled={!btnStatus} className="btn btn-default btn-block btn-rounded" value="Connect"/>
        </div>
      </form>
    </div>
  )
}

const VoiceOBDForm = () => {
  const [status, setStatus] = useState(undefined);
  const { register, handleSubmit } = useForm();
  const [btnStatus,setBtnStatus] = useState(true);
  const [broadcastStatus,setBroadcastStatus] = useState([]);
  const [numberLength,setNumberLength] = useState([]);
  const [showDiv,setShowDiv]=useState(false);
  let dataset=[]
  const onSubmit = async(data) => {
    setBtnStatus(false)
    setBroadcastStatus([]);
    let numbers=data.target_numbers.split("\n");
    numbers = numbers.filter(e => String(e).trim());
    numbers = [...new Set(numbers)];
    setNumberLength(numbers.length)
    numbers.map((number,i)=>{
        data={
          "id": "199653",
          "field_0":number  
      }
    dataset.push( fetch("https://zaapp.azurewebsites.net/integrations/smartflo/enter/single/lead",{
      method:"POST",
      body:JSON.stringify(data),
      headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
  }
    }))
   })
   const response= await Promise.all(dataset)
   let res=[]
   numbers.map((number,i)=>{
    res.push({number:number,status:response[i].status==200?true:false})
 })
   setBroadcastStatus([...res])
   setBtnStatus(true)
   setShowDiv(true)
   setTimeout(() => {
    document.getElementById("target_numbers").value = "";
    setShowDiv(false)
  }, 5000);

  };

React.useEffect(()=>{
  console.log(broadcastStatus,dataset,"broadcastStatusbroadcastStatus");
},[broadcastStatus])

  return (
    <div>
      <SectionTitle title="Call Broadcast" subtitle="Broadcast recorded message" />

      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success(status.message, 'Success')}
          </div>
        </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.error(status.message, 'Error')}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-sm lg:w-1/3">
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Destination Numbers <span className="text-red-600" >*</span></span>
            <textarea
              name="target_numbers"
              type="text"
              id="target_numbers"
              ref={register({ required: true})}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter 1 number in each line"
              pattern="(\d{10}\n)*\d{10}"
              title="Please enter 10-digit mobile numbers, 1 number per line"
              required
            />
          </label>
        </div>
        <div className="w-full">
          <input type="submit" style={{"background-color":btnStatus?'#434190':"grey", color:"white"}}   disabled={!btnStatus}  className="btn btn-default btn-block btn-indigo btn-rounded" value="Broadcast"/>
        </div>
      </form>
      {showDiv && broadcastStatus.map((data)=>{
        return (
          <div className="flex mt-3">
          <div className="mr-3">
          {data.number} 
          </div>
          <div>
          {data.status ? '✅' : '⛔'}
          </div>
          </div>
         
        )
      }) }

     
    </div>
  )
}

const Index = () => {
  const tabs = [
    { index: 0, title: "Call Patch", content: <CallPatchFrom /> },
    { index: 1, title: "Broadcast", content: <VoiceOBDForm /> },
  ]; 
  return (
    <Layout>
      <div className="flex flex-wrap">
        <div className="w-full">
            <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </Layout>
  )
}

export default withRedux(Index)