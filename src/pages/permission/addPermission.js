import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import { status } from "nprogress";

const addPermission = () => {
  const router = useRouter();
  const [res, setRes] = useState({});
  const [status, setStatus] = useState(undefined);
  const [errors,setErrors]=useState(undefined)

  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    ax.post("/permissions", data, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setRes(res.data);
        setStatus({ type: "success" });
        setTimeout(() => {
        router.push("/permission");
        }, 1000);
      })
      .catch((err) => {
        if(err.response.data.errors){
          setErrors(err.response.data.errors)
        }else{
          setStatus({ type: "error",message: err.response.data.message });
        }
      });

    }
  };


  return (
    <Layout>
    <SectionTitle title="Create Permission" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Added permission successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        {   NotificationManager.error(status.message,"Error")}
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
        {errors && errors.route && (
          errors.route.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
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
             placeholder="Enter Permission name"
             required
           />
         </label>
         {errors && errors.name && (
          errors.name.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
        )}
         </div>

          {/*input*/}
          <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Description</span>
            <input
              name="description"
              type="text"
              ref={register()}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter Permission Description"
            />
          </label>
          {errors && errors.description && (
            errors.description.map((err)=>{
             return <p className="mt-1 text-xs text-red-500">{err}</p>
            })
           
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
export default withRedux(addPermission);

