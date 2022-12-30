import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {ax} from "../../../utils/apiCalls"
import { NotificationManager } from 'react-notifications'
import Switch from 'react-switch'
import { useSelector, shallowEqual } from 'react-redux'
import ls from 'local-storage'


const updateID = () => {
  const router = useRouter();
  const updateid = router.query.updateID;
  const [res, setRes] = useState({});
  const [status, setStatus] = useState(undefined);
  const [errors,setErrors]=useState(undefined)
  const [checked, handleChange] = useState(false)
  const isSystemUser = ls.get("isSystemUser");

  const getOrganizationDetails = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/organizations/${updateid}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          setRes(res.data.organization);
          handleChange(res.data.organization.is_reseller===1?true:false);
        })
        .catch((err) => {
          console.error("get /organizations error", err);
        });
    }
  };
  

  useEffect(() => {
    
    getOrganizationDetails();
  }, []);


  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => {
    data.is_reseller=checked;
    if (typeof window !== "undefined") {
      data.port = parseInt(data.port);
      const token = localStorage.getItem('token');
      ax.put(`/organizations/${updateid}`, data, {
        headers: {

          'Authorization': `Bearer ${token}`
        }
      })
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



  return (
    <Layout>
      <SectionTitle title="Update Organization" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Updated details successfully', 'Success')}
          </div>
        </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
           {NotificationManager.error(status.message,'Error')}
          </div>
        </div>
      )}



      <div className="flex flex-wrap">
        <div className="w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col text-sm mb-4 lg:w-1/3"
          >
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
                  placeholder="Enter your name"
                  defaultValue={res.name}
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
                  placeholder="Enter your email"
                  defaultValue={res.email}
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
                  placeholder="Enter your phone no"
                  defaultValue={res.phone}
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
                  placeholder="Enter your Address"
                  defaultValue={res.address}
                />
              </label>
              {errors && errors.address && (
                errors.address.map((err)=>{
                 return <p className="mt-1 text-xs text-red-500">{err}</p>
                })
               
              )}
            </div>

              {/*input*/}
              {isSystemUser == 1 &&   <div className="w-full mb-4">
              <label className="block">
                <span className="text-default">Port</span>
                <input
                  name="port"
                  type="number"
                  ref={register()}
                  defaultValue={res.port}
                  className="form-input mt-1 text-xs block w-full bg-white"
                  placeholder="Enter port number"
                  title="the value range should be between 1024 - 65535"
                />
              </label>
              {errors && errors.port && (
                errors.port.map((err)=>{
                 return <p className="mt-1 text-xs text-red-500">{err}</p>
                })
              )}
            </div>}



   <div className="flex justify-between">
   <div className="mt-1">
   <span className="text-default">Reseller</span>
   </div>
   <div className="ml-5 ">
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
 
 </div>


            <div className="w-full flex">
            <input
            type="cancel"
            className="btn cursor-pointer btn-default btn-block btn-red mt-5 text-center mr-5 "
            value="Cancel"
            onClick={()=>{        router.push("/organization");
          }}
          />
              <input
                type="submit"
                className="btn cursor-pointer btn-default btn-block btn-indigo mt-5"
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