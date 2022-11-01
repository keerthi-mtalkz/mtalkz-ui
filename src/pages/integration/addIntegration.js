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

const addIntegration = () => {
  const router = useRouter();
  const [res, setRes] = useState({});
  const [status, setStatus] = useState(undefined);
  const [approval, handleApproval] = useState(false)
  const [access, handleAccess] = useState(false)
  const [permissions,setPermissions]=useState([])
  const [selectedPermissions,setSelectedPermissions]=useState([])
  const { register, handleSubmit, watch, errors } = useForm();
  const [tags, setTags] = React.useState([
  ]);
  const [params, setParams] = React.useState([
  ]);
  const KeyCodes = {
    comma: 188,
    enter: 13
  };
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleParamDelete = i => {
    setParams(params.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };
  const handleParamsAddition = tag => {
    setParams([...params, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  const handleParamDrag = (tag, currPos, newPos) => {
    const newTags = params.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setParams(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  let handleSwitch = (value) => {
    let permissions=[];
    value.map((val)=>{
   permissions.push(val.value)
    })
    setSelectedPermissions([...permissions])
  }

  const getPermissions = async () => {
    const token= localStorage.getItem("token");
    await ax
      .get("/permissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {

        setPermissions(res?.data)
      })
      .catch((err) => {
        console.error("get /permissions error", err);
      });
  };

  const options = permissions?.map((value) => {
    return { label: value.name, value: value.id };
  });

  const onSubmit = (data) => {
    if (typeof window !== "undefined") {
      data.requires_access=access;
      data.requires_approval=approval;
      let _tags=[];
      let _params = [];
      tags.map((tag)=>{
        _tags.push(tag.id)
      })
      params.map((param)=>{
        _params.push(param.id)
      })
      data.tags=_tags;
    data.param_names=_params
    data.access_granted_to=selectedPermissions
    const token = localStorage.getItem('token');
    ax.post("/integrations", data, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setRes(res.data);
        setStatus({ type: "success" });
        router.push("/integration");
      })
      .catch((err) => {
        setStatus({ type: "error", err });
        console.error("get /Integrations error", err);
      });
    }
  };

  useEffect(()=>{
    if(permissions.length===0){
      getPermissions();
    }
  },[])


  return (
    <Layout>
    <SectionTitle title="Create Integration" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Added integration successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        {   NotificationManager.error(errors,"Error")}
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
          <span className="text-default">Route</span>
          <input
            name="route"
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Route in dot notation"
            required
          />
        </label>
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
             placeholder="Enter Integartion name"
             required
           />
         </label>
         </div>

          {/*input*/}
          <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Slug</span>
            <input
              name="slug"
              type="text"
              ref={register({ required: true })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter  Integration Slug"
              required
            />
          </label>
          </div>

          {/*input*/}
          <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Channel Slug</span>
            <input
              name="channel_slug"
              type="text"
              ref={register({ required: true })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter Integration Channel Slug "
              required
            />
          </label>
          </div>

            {/*input*/}
            <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">Icon Url</span>
              <input
                name="icon_url"
                type="url"
                ref={register({ required: true })}
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter Integration URL "
                required
              />
            </label>
            </div>

             {/*input*/}
             <div className="w-full mb-4">
             <label className="block">
               <span className="text-default">Description</span>
               <input
                 name="description"
                 type="url"
                 ref={register({ required: true })}
                 className="form-input mt-1 text-xs block w-full bg-white"
                 placeholder="Enter Integration URL "
                 required
               />
             </label>
             </div>

             <div style={{marginBottom:"10px"}}>
             <span className="text-default">Tags</span>
             <ReactTags
             tags={tags}
             delimiters={delimiters}
             handleDelete={handleDelete}
             handleAddition={handleAddition}
             handleDrag={handleDrag}
             handleTagClick={handleTagClick}
             inputFieldPosition="bottom"
             autocomplete
           />
             </div>

  {/*input*/}
  <div className="w-full mb-4">
  <label className="block">
    <span className="text-default">Api Url</span>
    <input
      name="api_url"
      type="url"
      ref={register({ required: true })}
      className="form-input mt-1 text-xs block w-full bg-white"
      placeholder="Enter Integration Api URL "
      required
    />
  </label>
  </div>

  {/*input*/}
  <div className="w-full mb-4">
  <label className="block">
    <span className="text-default">Http Method</span>
    <select
    name="http_method"
    ref={register()}
    className="form-select block w-full mt-1 text-xs">
    {HTTP_METHODS.map((method)=>{
      return (
        <option value={method.value}>{method.label}</option>
      )
    })}
  </select>
  </label>
  </div>
  
  <div style={{marginBottom:"10px"}}>
  <span className="text-default">Parameters</span>
  <ReactTags
  tags={params}
  delimiters={delimiters}
  handleDelete={handleParamDelete}
  handleAddition={handleParamsAddition}
  handleDrag={handleParamDrag}
  handleTagClick={handleTagClick}
  inputFieldPosition="bottom"
  autocomplete
/>
  </div>

  <div>
  <span className="text-default">Approval</span>

        <Switch
          onChange={() => handleApproval(!approval)}
          checked={approval}
          handleDiameter={24}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
        />
      </div>
      <div>
  <span className="text-default">Access</span>
        <Switch
          onChange={() => handleAccess(!access)}
          checked={access}
          handleDiameter={24}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
        />
      </div>

      {access &&
        <div style={{ width: "300px" }}>
          <Select
            options={options}
            placeholder="Select permissions ..."
            isMulti={true}
            onChange={handleSwitch}
            
          />
        </div>
      }

      <div className="w-full" style={{marginTop:"10px"}}>
        <input
          type="submit"
          className="btn btn-default btn-block btn-indigo "
          value="Submit"
        />
      </div>
    </form>
    </Layout>
  );
};
export default withRedux(addIntegration);
