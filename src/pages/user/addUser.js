import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import Switch from 'react-switch'

const addUser = () => {
  const router = useRouter();
  const [status, setStatus] = useState(undefined);
  const [checked, handleChange] = useState(false)
  const [errors,setErrors]=useState(undefined)

  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    if (typeof window !== "undefined") {
        data.is_system_user=checked;
    const token = localStorage.getItem('token');
    ax.post("/users", data, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
        setTimeout(() => {
        router.push("/user");
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
    <SectionTitle title="Create User" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Added user successfully', 'Success')}
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
       <span className="text-default">Name</span>
       <input
         name="name"
         type="text"
         ref={register({ required: true })}
         className="form-input mt-1 text-xs block w-full bg-white"
         placeholder="Enter user name"
         required
         minLength={3}
         maxLength={225}
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
       <span className="text-default">Email address</span>
       <input
         name="email"
         type="email"
         ref={register({ required: true })}
         className="form-input mt-1 text-xs block w-full bg-white"
         placeholder="Enter user email"
         required
       />
     </label>
     {errors && errors.email && (
      errors.email.map((err)=>{
       return <p className="mt-1 text-xs text-red-500">{err}</p>
      })
     
    )}
   </div>

      {/*input*/}
      <div className="w-full mb-4">
      <label className="block">
        <span className="text-default">Password</span>
        <input
          name="password"
          type="text"
          ref={register({ required: true })}
          className="form-input mt-1 text-xs block w-full bg-white"
          placeholder="Enter user password"
          required
        />
      </label>
      {errors &&  errors.password && (
        errors.password.map((err)=>{
          return  <p className="mt-1 text-xs text-red-500">{err}</p>
        })
       
      )}
    </div>
    <div>
    <span className="text-default">System User</span>
    <Switch
      onChange={() => handleChange(!checked)}
      checked={checked}
      handleDiameter={24}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
      height={20}
      width={48}
      className="react-switch"
    />
  </div>
      <div className="w-full">
        <input
          type="submit"
          className="btn btn-default btn-block btn-indigo mt-5 "
          value="Submit"
        />
      </div>
    </form>
    </Layout>
  );
};
export default withRedux(addUser);

