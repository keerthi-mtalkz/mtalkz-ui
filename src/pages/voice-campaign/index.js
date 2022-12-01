import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { withRedux } from '../../lib/redux';
import {ax} from "../../utils/apiCalls";
import Layout from '../../layouts'
import { UnderlinedTabs } from "../../components/tabs";
import { NotificationManager } from 'react-notifications'
import SectionTitle from '../../components/section-title';

const CallPatchFrom = () => {
  const [status, setStatus] = useState(undefined);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Data', data);
    ax.post("https://mtalkz.cloud/integrations/voice/callPatch", data, {
      withCredentials: false,
      headers: {accessToken: "2a38a30d5743afb46059905e46c4f14a"}
    }).then(res => {
      console.log('Respose', res);
      const json = res.data;
      if (json.success) {
        setStatus({ type: "success", message: json.status?.message || "Call patched successfully" });
      } else {
        setStatus({ type: "error", message: json.error?.message || "Please try again" });
      }
    }).catch(_err => {
      setStatus({ type: "error", message: "Failed to patch the call. Pleasy try again."});
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
          <input type="submit" className="btn btn-default btn-block btn-indigo btn-rounded" value="Connect"/>
        </div>
      </form>
    </div>
  )
}

const VoiceOBDForm = () => {
  const [status, setStatus] = useState(undefined);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Target Numbers', data);
  }

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
              ref={register({ required: true, maxLength: 10 })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter 1 number in each line"
              pattern="(\d{10}\n)*\d{10}"
              title="Please enter 10-digit mobile numbers, 1 number per line"
              required
            />
          </label>
        </div>
        <div className="w-full">
          <input type="submit" className="btn btn-default btn-block btn-indigo btn-rounded" value="Broadcast"/>
        </div>
      </form>
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