import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {ax} from "../../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'



const updateID = () => {
    const router = useRouter();
    const updateid = router.query.updateID;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
  
    const fetch = async () => {
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/channels/${updateid}`, {headers: {
        
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          setRes(res.data.channel);

        })
        .catch((err) => {
        setStatus({ type: "error", err });

          console.error("get /channel error", err);
        });
      }
    };

    useEffect(() => {
      fetch();
    }, []);

  
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      ax.put(`/channels/${updateid}`, data, {headers: {
        'Authorization': `Bearer ${token}`
      }})
        .then((res) => {
          setRes(res.data);
        setStatus({ type: "success" });
          router.push("/channel");
        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });
          setTimeout(() => {
            setStatus(undefined)
            router.push("/channel");
          }, 1000);
        });
      }
    };
  
  
 
return (
    <Layout>
     <SectionTitle title="UPDATE CHANNEL" subtitle="" />
     {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Updated channel successfully', 'Success')}
        </div>
      </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.error(status.message, 'Error')}
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
          <span className="text-default">Slug</span>
          <input
            name="slug"
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter Channel Slug"
            defaultValue={res.slug}
            required
            maxLength={255}
            pattern="[a-z0-9\-]+"
            
          />
        </label>
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
            placeholder="Enter Channel name"
            defaultValue={res.name}
            required
            maxLength={255}
          />
        </label>
      </div>

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