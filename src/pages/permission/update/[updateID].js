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
    const [errors,setErrors]=useState(undefined)
  
    const fetch = async () => {
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/permissions/${updateid}`, {headers: {
        
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          setRes(res.data.permission);

        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });

          console.error("get /permission error", err);
        });
      }
    };

    useEffect(() => {
      fetch();
    }, []);

  
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = (data) => {
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      ax.put(`/permissions/${updateid}`, data, {headers: {
        'Authorization': `Bearer ${token}`
      }})
        .then((res) => {
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
     <SectionTitle title="UPDATE PERMISSION" subtitle="" />
     {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Updated permission successfully', 'Success')}
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
          <span className="text-default">Route</span>
          <input
            name="route"
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Route in dot notation"
            defaultValue={res.route}
            pattern="\([a-z-]+\.)*[a-z-]+"
            title="route should contain only alphabets, dots"
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
            defaultValue={res.name}
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
             placeholder="Enter Permission description"
             defaultValue={res.description}
           />
         </label>
         {errors && errors.description && (
          errors.description.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
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