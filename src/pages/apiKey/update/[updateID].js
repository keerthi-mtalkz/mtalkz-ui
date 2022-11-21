import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {ax} from "../../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import Switch from 'react-switch';



const updateID = () => {
    const router = useRouter();
    const updateid = router.query.updateID;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
    const { register, handleSubmit, watch } = useForm();
    const [checked, handleChange] = useState(false);
    const [errors,setErrors]=useState(undefined)
  
    const fetch = async () => {
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/api-keys/${updateid}`, {headers: {
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          setRes(res.data.api_key);
          handleChange(res.data.api_key.is_active===1?true:false)
        })
        .catch((err) => {
            setStatus({ type: "error",message: err.response.data.message });
        });
      }
    };

    useEffect(() => {
      
      fetch();
    }, []);
  
    
    const onSubmit = () => {
        const data={"is_active":checked}
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      ax.put(`/api-keys/${updateid}`, data, {headers: {
        'Authorization': `Bearer ${token}`
      }})
        .then((res) => {
          setRes(res.data);
        setStatus({ type: "success" });
          router.push("/apiKey");
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
     <SectionTitle title="Update API Key" subtitle="" />
     {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Updated Api key successfully', 'Success')}
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
       <span className="text-default">Label </span>
     <span className="text-red-600" >*</span>

       <input
         name="label"
         type="text"
         ref={register()}
         className="form-input mt-1 text-xs block w-full bg-white"
         placeholder="Some easy to recognize API Key Label"
         required
         minLength={3}
         maxLength={225}
         defaultValue={res.label}
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
        <div className="flex"> 
          <div  className="mt-1"> <span className="text-default">Active</span>
     <span className="text-red-600" >*</span>
          
          </div>
        <div className="ml-5 ">
        <Switch
        onChange={() => handleChange(!checked)}
        checked={checked}
        handleDiameter={24}
        uncheckedIcon={true}
        checkedIcon={true}
        height={20}
        width={48}
        className="react-switch"
      />
        </div>
        </div>

         
      
        </label>
        {errors && errors.is_active && (
          errors.is_active.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
        )}
      </div>
      <div className="w-full flex">
      <input
      type="cancel"
      className="btn cursor-pointer btn-default btn-block btn-red mt-5 text-center mr-5 "
      value="Cancel"
      onClick={()=>{        router.push("/apiKey");
    }}
    />
        <input
          type="submit"
          className="btn  cursor-pointer btn-default btn-block btn-indigo mt-5"
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