import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {HTTP_METHODS} from "../../utils/constants";
import {NotificationManager} from 'react-notifications';

const addIntegration = () => {
  const router = useRouter();
  const [res, setRes] = useState({});
  const [status, setStatus] = useState(undefined);

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    ax.post("/integrations", data, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setRes(res.data);
        setStatus({ type: "success" });
        router.push("/integration");
      })
      .catch((err) => {
        setStatus({ type: "error", err });
        console.error("get /Integrations error", err);
      });

    }
  };


  return (
    <Layout>
    <SectionTitle title="Create Integration" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Added integration successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        {   NotificationManager.error(errors,"Error")}
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
          <span className="text-default">Route</span>
          <input
            name="route"
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Route in dot notation"
            required
          />
        </label>
        {errors.route && (
          <p className="mt-1 text-xs text-red-500">{errors.route}</p>
        )}
      </div>

         {/*input*/}
         <div className="w-full mb-4">
         <label className="block">
           <span className="text-default">Name</span>
           <input
             name="name"
             type="text"
             ref={register({ required: true })}
             className="form-input mt-1 text-xs block w-full bg-white"
             placeholder="Enter Integartion name"
             required
           />
         </label>
         {errors.name && (
           <p className="mt-1 text-xs text-red-500">{errors.name}</p>
         )}
         </div>

          {/*input*/}
          <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Slug</span>
            <input
              name="slug"
              type="text"
              ref={register({ required: true })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter  Integration Slug"
              required
            />
          </label>
          {errors.slug && (
            <p className="mt-1 text-xs text-red-500">{errors.slug}</p>
          )}
          </div>

          {/*input*/}
          <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Channel Slug</span>
            <input
              name="channel_slug"
              type="text"
              ref={register({ required: true })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter Integration Channel Slug "
              required
            />
          </label>
          {errors.channel_slug && (
            <p className="mt-1 text-xs text-red-500">{errors.channel_slug}</p>
          )}
          </div>
            {/*input*/}
            <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">Icon Url</span>
              <input
                name="icon_url"
                type="url"
                ref={register({ required: true })}
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter Integration URL "
                required
              />
            </label>
            {errors.icon_url && (
              <p className="mt-1 text-xs text-red-500">{errors.icon_url}</p>
            )}
            </div>

             {/*input*/}
             <div className="w-full mb-4">
             <label className="block">
               <span className="text-default">Description</span>
               <input
                 name="description"
                 type="url"
                 ref={register({ required: true })}
                 className="form-input mt-1 text-xs block w-full bg-white"
                 placeholder="Enter Integration URL "
                 required
               />
             </label>
             {errors.description && (
               <p className="mt-1 text-xs text-red-500">{errors.description}</p>
             )}
             </div>
  {/*input*/}
  <div className="w-full mb-4">
  <label className="block">
    <span className="text-default">Api Url</span>
    <input
      name="api_url"
      type="url"
      ref={register({ required: true })}
      className="form-input mt-1 text-xs block w-full bg-white"
      placeholder="Enter Integration Api URL "
      required
    />
  </label>
  {errors.api_url && (
    <p className="mt-1 text-xs text-red-500">{errors.api_url}</p>
  )}
  </div>

  {/*input*/}
  <div className="w-full mb-4">
  <label className="block">
    <span className="text-default">Http Method</span>
    <select
    name="http_method"
    ref={register()}
    className="form-select block w-full mt-1 text-xs">
    {HTTP_METHODS.map((method)=>{
      return (
        <option value={method.value}>{method.label}</option>
      )
    })}
   
  </select>
    <input
      name="api_url"
      type="url"
      ref={register({ required: true })}
      className="form-input mt-1 text-xs block w-full bg-white"
      placeholder="Enter Integration Api URL "
      required
    />
  </label>
  {errors.api_url && (
    <p className="mt-1 text-xs text-red-500">{errors.api_url}</p>
  )}
  </div>

      <div className="w-full">
        <input
          type="submit"
          className="btn btn-default btn-block btn-indigo "
          value="Submit"
        />
      </div>
    </form>
    </Layout>
  );
};
export default withRedux(addIntegration);

