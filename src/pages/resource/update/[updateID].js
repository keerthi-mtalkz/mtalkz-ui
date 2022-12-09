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
      const token = sessionStorage.getItem('token');
      await ax
        .get(`/resources/${updateid}`, {headers: {
        
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          setRes(res.data.resource);

        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });


          console.error("get /resource error", err);
        });
      }
    };

    useEffect(() => {
      
      fetch();
    }, []);

  
    const { register, handleSubmit, watch } = useForm();
    const onSubmit = (data) => {
      if (typeof window !== "undefined") {
      const token = sessionStorage.getItem('token');
      ax.put(`/resources/${updateid}`, data, {headers: {
        'Authorization': `Bearer ${token}`
      }})
        .then((res) => {
          setRes(res.data);
        setStatus({ type: "success" });
        setTimeout(() => {
          router.push("/resource");
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
     <SectionTitle title="Update Resource" subtitle="" />
     {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Updated resource successfully', 'Success')}
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
     <span className="text-red-600" >*</span>

          <input
            name="slug"
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter Resource Slug"
            defaultValue={res.slug}
            required
            maxLength={255}
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
            placeholder="Enter Resource name"
            defaultValue={res.name}
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

         {/*input*/}
         <div className="w-full mb-4">
         <label className="block">
           <span className="text-default">Description</span>
     <span className="text-red-600" >*</span>

           <input
             name="description"
             type="text"
             ref={register({ required: true })}
             className="form-input mt-1 text-xs block w-full bg-white"
             placeholder="Enter Resource description"
             defaultValue={res.description}
             required
             maxLength={255}
           />
         </label>
         {errors && errors.description && (
          errors.description.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
        )}
       </div>


      {/*input*/}

      <div className="w-full flex">
      <input
      type="cancel"
      className="btn cursor-pointer btn-default btn-block btn-red mt-5 text-center mr-5 "
      value="Cancel"
      onClick={()=>{        router.push("/resource");
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