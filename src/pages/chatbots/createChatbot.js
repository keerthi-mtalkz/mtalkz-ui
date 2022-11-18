import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import { NotificationManager } from 'react-notifications'
import SectionTitle from "../../components/section-title";
import ls from 'local-storage'

const createChatbot = () => {
  const router = useRouter();
  const [status, setStatus] = useState(undefined);
  const { register, handleSubmit } = useForm();
  const [errors,setErrors] = useState(undefined)

// Create Chatbot

  const onSubmit = (data) => {
  const token = ls.get('token');
    ax.post("https://cb.mtalkz.cloud/import", { type: "chatbot", data }, {
      headers: {
        'x-api-key': token
      }
    })
      .then((res) => {
        setStatus({ type: "success" });
        setTimeout(() => {
            router.push("/chatbots");
            }, 1000);
    })
      .catch((err) => {
        if(err?.response){
          setStatus({ type: "error",message: err.response.data.error });
        }
           
      });
  };

  return (
    <Layout>
      <SectionTitle title="Create Chatbot" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Chatbot Created Successfully', '')}
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-sm mb-4 lg:w-1/3"
      >
        {/*input*/}
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Name</span>
            <input
              name="name"
              type="text"
              ref={register({ required: true, maxLength: 25 })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your name"
              required
            />
          </label>
          {errors && errors.name && (
            errors.name.map((err)=>{
             return <p className="mt-1 text-xs text-red-500">{err}</p>
            })
          )}
        </div>


        <div className="mb-4">
          <label>
            <span className="text-default">Channel</span>
            <select className="form-select block w-full mt-1 text-sm" name="channel" ref={register} >
              <option value="whatsapp">WhatsApp</option>
              <option value="telegram" disabled={true}>Telegram</option>
              <option value="open-web" disabled={true}>Web</option>
            </select>
          </label>

        </div>

        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Phone (with Country Code)</span>
            <input
              name="phone"
              type="text"
              ref={register()}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="91xxxxxxxxxx"
              required
              pattern="^(\+91)\d{10}" 
              title="Please enter a valid phone number"
            
            />
          </label>
                     
          {errors && errors.phone && (
            errors.phone.map((err)=>{
             return <p className="mt-1 text-xs text-red-500">{err}</p>
            })
           
          )}
        </div>



        <div className="w-full">
          <input
            type="submit"
            className="btn btn-default btn-block btn-indigo btn-rounded"
            value="Submit"
          />
        </div>
      </form>

    </Layout>
  );
};
export default withRedux(createChatbot);

