import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {ax} from "../../../utils/apiCalls";
import {
  NotificationInfo,
  NotificationWarning,
  NotificationError,
  NotificationSuccess
} from '../../../components/notifications'
import {NotificationManager} from 'react-notifications'



const updateID = () => {
    const router = useRouter();
    const updateid = router.query.updateID;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
  
    const fetch = async () => {
      if (typeof window !== "undefined") {
      const token1 = localStorage.getItem('token');
      await ax
        .get(`/roles/${updateid}`, {headers: {
        
          'Authorization': `Bearer ${token1}`
         }})
        .then((res) => {
          setRes(res.data.role);
          console.log(res.data.role);
        })
        .catch((err) => {
          console.error("get /role error", err);
        });
      }
    };

    useEffect(() => {
      fetch();
    }, []);

  
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
      if (typeof window !== "undefined") {
      const token1 = localStorage.getItem('token');
      ax.put(`/roles/${updateid}`, data, {headers: {
        'Authorization': `Bearer ${token1}`
      }})
        .then((res) => {
          setRes(res.data);
          setStatus({ type: "success" });
    
          router.push("/role");
        
  
        })
        .catch((err) => {
          console.error("get /roles error", err);
          setStatus({ type: "error", err });
        });
      }
    };
  
  
 
return (
    <Layout>
     <SectionTitle title="UPDATE ROLE" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Success message', 'Title here')}
        </div>
      </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
          <NotificationError />
        </div>
      </div>
      )}
    
    
   
      <div className="flex flex-wrap ">
        <div className="w-full">
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
            defaultValue={res.name}
            required
          />
        </label>
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">
          {errors.name}</p>
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
            placeholder="Enter your Description"
            defaultValue={res.description}
          />
        </label>
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description}</p>
        )}
      </div>



      {/*input*/}

      <div className="w-full">
        <input
          type="submit"
          className="btn btn-default btn-block btn-indigo btn-rounded"
          value="Update"
        />
      </div>
    </form>
        </div>
      </div>
    </Layout>
  );
};

export default withRedux(updateID);