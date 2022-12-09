import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../layouts";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../lib/redux";
import { useRouter } from "next/router";
import {NotificationManager} from 'react-notifications'



const approveList = () => {
    const router = useRouter();
    const approveListId = router.query.approveListId;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
    const [errors,setErrors]=useState(undefined)
  
    const onSubmit=(data)=>{
        console.log(data)
        const token = sessionStorage.getItem('token');
       fetch(`https://app.mtalkz.cloud/api/voice-campaigns/${approveListId}/approve`,
       {
        method:"POST",
        body:JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
          "Content-Type": "application/json"
         }
       }
      )
          .then((res) => {
            setStatus({ type: "success",message:"Approved Successfully" });
            setStatus(undefined); 
            router.push("/voice-campaign")
          })
          .catch((err) => {
            if(err.response.data.errors){
                setErrors(err.response.data.errors)
              }else{
                setErrors(undefined)
                setStatus({ type: "error",message: err.response.data.message });
              }
          });
       }


  
    const { register, handleSubmit, watch } = useForm();
  
  
 
return (
    <Layout>
     <SectionTitle title="Approve List" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Approved List successfully', 'Success')}
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
          <span className="text-default">List Id</span>
     <span className="text-red-600" >*</span>

          <input
            name="list_id"
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter List Id"
            required
            minLength={3}
            maxLength={225}
          />
        </label>
        {errors && errors.list_id && (
          errors.list_id.map((err)=>{
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
      onClick={()=>{        router.push("/voice-campaign");
    }}
    />
        <input
          type="submit"
          className="btn cursor-pointer btn-default btn-block btn-indigo mt-5"
          value="Approve"
        />
      </div>
    </form>
        </div>
      </div>
    </Layout>
  );
};

export default withRedux(approveList);