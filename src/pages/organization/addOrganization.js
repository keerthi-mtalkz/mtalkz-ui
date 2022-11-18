import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import { status } from "nprogress";
import Switch from 'react-switch'

const addOrganization = () => {
  const router = useRouter();
  const [res, setRes] = useState({});
  const [status, setStatus] = useState(undefined);
  const [checked, handleChange] = useState(false)
  const [errors,setErrors]=useState(undefined)
   
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = (data) => {
    if (typeof window !== "undefined") {
        data.is_reseller=checked;
        data.reseller_id=2;
    const token = localStorage.getItem('token');
    ax.post("/organizations", data, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setRes(res.data);
        setStatus({ type: "success" });
        setTimeout(() => {
        router.push("/organization");
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
    NotificationManager.removeAll()
  },[])

  return (
    <Layout>
    <SectionTitle title="Create Organization" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Added Organization successfully', 'Success')}
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
          placeholder="Enter organization name"
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
          ref={register()}
          className="form-input mt-1 text-xs block w-full bg-white"
          placeholder="Enter organization email"
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
        <span className="text-default">Phone</span>
        <input
          name="phone"
          type="tel"
          ref={register()}
          className="form-input mt-1 text-xs block w-full bg-white"
          placeholder="Enter organization phone number"
        />
      </label>
      {errors && errors.phone && (
        errors.phone.map((err)=>{
         return <p className="mt-1 text-xs text-red-500">{err}</p>
        })
       
      )}
    </div>

    {/*input*/}

    {/*input*/}
    <div className="w-full mb-4">
      <label className="block">
        <span className="text-default">Address</span>
        <input
          name="address"
          type="text"
          ref={register()}
          className="form-input mt-1 text-xs block w-full bg-white"
          placeholder="Enter Organization Address"
        />
      </label>
      {errors && errors.address && (
        errors.address.map((err)=>{
         return <p className="mt-1 text-xs text-red-500">{err}</p>
        })
       
      )}
    </div>

     {/*input*/}
     <div className="w-full mb-4">
     <label className="block">
       <span className="text-default">Prefix</span>
       <input
         name="table_prefix"
         type="text"
         ref={register({ required: true })}
         className="form-input mt-1 text-xs block w-full bg-white"
         placeholder="Enter Organization Prefix"
         required
        maxLength={15}
        pattern="^[a-zA-Z0-9]*$"
        title="Allowed only alphanumeric and upto 15 max length"
       />
     </label>
     {errors && errors.table_prefix && (
      errors.table_prefix.map((err)=>{
       return <p className="mt-1 text-xs text-red-500">{err}</p>
      })
     
    )}
   </div>
    <div>
    <span className="text-default">Reseller</span>
    <Switch
      onChange={() => handleChange(!checked)}
      checked={checked}
      handleDiameter={24}
      uncheckedIcon={true}
      checkedIcon={true}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
      height={20}
      width={48}
      className="react-switch"
    />
  </div>


    <div className="w-full">
      <input
        type="submit"
        className="btn btn-default btn-block btn-indigo btn-rounded mt-5"
        value="Add"
      />
    </div>
  </form>
    </Layout>
  );
};
export default withRedux(addOrganization);

