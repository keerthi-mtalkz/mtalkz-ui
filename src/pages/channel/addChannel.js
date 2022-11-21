import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'

const addChannel = () => {
  const router = useRouter();
  const [status, setStatus] = useState(undefined);
  const [errors,setErrors]=useState(undefined)


  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    ax.post("/channels", data, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
        setTimeout(() => {
        router.push("/channel");
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

  useEffect(()=>{
    
  },[])

  return (
    <Layout>
    <SectionTitle title="Create Channel" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Added Channel successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        {   NotificationManager.error(status.message,"Error")}
      </div>
      )}

      <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-sm mb-4 lg:w-1/3"
    >
      {/*input*/}
      <div className="w-full mb-4">
        <label className="block">
          <span className="text-default">Slug</span>
     <span className="text-red-600" >*</span>

          <input
            name="slug"
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter Channel Slug"
            required
            maxLength={255}
            pattern="[a-z0-9\-]+"
            title="only lowercase charecters, numeric  and dash allowed"
          />
        </label>
        {errors && errors.slug && (
          errors.slug.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
        )}
      </div>

         {/*input*/}
         <div className="w-full mb-4">
         <label className="block">
           <span className="text-default">Name</span>
     <span className="text-red-600" >*</span>

           <input
             name="name"
             type="text"
             ref={register({ required: true })}
             className="form-input mt-1 text-xs block w-full bg-white"
             placeholder="Enter Channel name"
             required
             maxLength={255}
           />
         </label>
         {errors && errors.name && (
          errors.name.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
        )}
         </div>

      <div className="w-full flex">
      <input
      type="cancel"
      className="btn cursor-pointer btn-default btn-block btn-red mt-5 text-center mr-5 "
      value="Cancel"
      onClick={()=>{        router.push("/channel");
    }}
    />
        <input
          type="submit"
          className="btn  cursor-pointer btn-default btn-block btn-indigo mt-5"
          value="Submit"
        />
      </div>
    </form>
    </Layout>
  );
};
export default withRedux(addChannel);

