import React, { useState } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications';
import Select from "react-select";
import Switch from 'react-switch';
import CustomModal from "../../components/custommodal";

const addApiKey = () => {
  const router = useRouter();
  const [status, setStatus] = useState(undefined);
  const [checked, handleChange] = useState(false);
  const [resources,setResources]=useState([]);
const [selectedResource,setSelectedResource]=useState([]);
  const { register, handleSubmit, watch } = useForm();
  const [errors,setErrors]=useState(undefined)
  const [showModal,setShowModal]=useState(false)
const [res,setRes]=useState(undefined)
  const getResources = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/resources", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setResources(res.data);
        // setSelectedResource({ label: res.data[0].name, value: res.data[0].id })
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
      });
  };


  const options = resources?.map((value) => {
    return { label: value.name, value: value.id };
  });

  React.useEffect(()=>{
    
    getResources()
  },[]);

  const validateFields=()=>{
   if(selectedResource.length==0)
   {
    setErrors({resource_id:["Resource is Required"]});
    return false
   }else return true
  }

  const onSubmit = (details) => {
    const isValid=validateFields()
    const data={"resource_id":selectedResource.value,"is_active":checked,"label":details.label}
    if (typeof window !== "undefined" && isValid) {
    const token = localStorage.getItem('token');
    ax.post("/api-keys", data, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setRes(res.data.api_key.key)
        setShowModal(true)
        setStatus({ type: "success" });
        
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

  const handleSwitch=(value)=>{
    setSelectedResource({label: value.label, value: value.value})
  }


  return (
    <Layout>
   
    <SectionTitle title="Create API Key" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Added ApiKey successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        {   NotificationManager.error(status.message,"Error")}
      </div>
      )}
      {showModal &&  <CustomModal apiKey={res } onClose={()=>{setShowModal(false);setTimeout(() => {
        router.push("/apiKey");
        }, 1000);}}></CustomModal>}

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
         ref={register({ required: true })}
         className="form-input mt-1 text-xs block w-full bg-white"
         placeholder="Some easy to recognize API Key Label"
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
          <span className="text-default">Resource</span>
     <span className="text-red-600" >*</span>

          <div style={{ width: "300px" }}>
          <Select
            options={options}
            placeholder="Select Resource"
            onChange={handleSwitch}
          />
        </div>
        </label>
        {errors && errors.resource_id && (
          errors.resource_id.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
        )}
      </div>
      <div className="flex">
      <div className="mt-1">
      <span className="text-default">Active</span>
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
          className="btn cursor-pointer btn-default btn-block btn-indigo mt-5"
          value="Add"
        />
      </div>
    </form>
    </Layout>
  );
};
export default withRedux(addApiKey);

