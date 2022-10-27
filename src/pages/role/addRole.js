import React, { useState, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'

const addRole = () => {
  const router = useRouter();
  const [res, setRes] = useState({});
  const [status, setStatus] = useState(undefined);

  const { register, handleSubmit, watch, errors } = useForm();



  const onSubmit = (data) => {
    if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    ax.post("/roles", data, { headers: {
        'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setRes(res.data);
        setStatus({ type: "success" });
        router.push("/roles");
    

      })
      .catch((err) => {
        console.error("get /Role error", err);
        // setStatus({ type: "error", err });
        NotificationManager.error(err.response.data.message, '')
      });
    }
  };

  return (
    <Layout>
    <SectionTitle title="Create Role" subtitle="" />
         {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Data Submitted Successfully', '')}
        </div>
      </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        {   NotificationManager.error('Error message', 'Click me!', 5000, () => {
        
        })}
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
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter your name"
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
         <span className="text-default">Description</span>
         <input
           name="description"
           type="text"
           ref={register({ required: true })}
           className="form-input mt-1 text-xs block w-full bg-white"
           placeholder="Enter your description"
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
         <input
           name="is_system_role"
           type="checkbox"
           ref={register({ required: true })}
        //    className="form-input mt-1 text-xs block w-full bg-white"
           placeholder="Enter is system role"
           value={true}
           required
         />
         <span className="text-default">Is system user</span>

       </label>
       {errors.is_system_role && (
         <p className="mt-1 text-xs text-red-500">{errors.is_system_role}</p>
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
export default withRedux(addRole);

