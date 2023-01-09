import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {HTTP_METHODS} from "../../utils/constants";
import {NotificationManager} from 'react-notifications';
import { WithContext as ReactTags } from 'react-tag-input';
import Switch from 'react-switch'
import Select from "react-select";

const activateIntegration = () => {
  const router = useRouter();
  const [res, setRes] = useState({});
  const [status, setStatus] = useState(undefined);
 const [checked, handleChange] = useState(false)

  const { register, handleSubmit, watch } = useForm();
  const [tags, setTags] = React.useState([
  ]);
  const [params, setParams] = React.useState([
  ]);
  const activateID = router.query.activateID;
  
  const fetchIntegrations = async () => {
    if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  await ax
    .get(`/integrations/${activateID}`, {headers: {
    
      'Authorization': `Bearer ${token}`
     }})
    .then((res) => {
      setRes(res.data.integration);
    })
    .catch((err) => {
    setStatus({ type: "error", err });
      console.error("get /integrations error", err);
    });
}
};
const onSubmit = (data) => {
 data.is_default_for_channel  = checked;
 const token = localStorage.getItem('token');
    ax.post(`/integrations/${activateID}/activate`, data, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
        setTimeout(() => {
        router.push("/integration");
        }, 1000);
      })
      .catch((err) => {
        if(err.response.data.errors){
          setErrors(err.response.data.errors)
        }else{
          setStatus({ type: "error",message: err.response.data.message });
        }
        setTimeout(() => {
          router.push("/integration");
          }, 1000);
      });
    }


useEffect(() => {
  fetchIntegrations();
}, []);

  
 

  return (
    <Layout>
    <SectionTitle title="Activate Integration" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Activated integration successfully', 'Success')}
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
    <div style={{    width:" 40%"
    }}> 
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col text-sm mb-4 "
  >
    <div className="w-full mb-4">
    <label className="block">
      <span className="text-default">Name</span>
      <input
        name="name"
        type="text"
        ref={register()}
        className="form-input mt-1 text-xs block w-full bg-white"
        required
        defaultValue={res.name}
        title="Please enter a name"
      
      />
    </label>
  </div>
  {res.param_names?.map((name,i)=>{
      return(
        <div className="w-full mb-4">
        <label className="block">
          <span className="text-default">{name}</span>
          <input
            name={name+i}
            type="text"
            ref={register()}
            className="form-input mt-1 text-xs block w-full bg-white"
            required
            title={`please enter ${name}`}
            placeholder={`please enter ${name}`}
          />
        </label>
      </div>
      )
  })}
  <div className="flex justify-between">
  <div  className="mt-1">
  <span className="text-default">Default for channel</span>
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
onClick={()=>{        router.push("/integration");
}}
/>
  <input
    type="submit"
    className="btn cursor-pointer btn-default btn-block btn-indigo  mt-5"
    value="Add"
  />
</div>
</form>
    </div>
    </Layout>
  );
};
export default withRedux(activateIntegration);

