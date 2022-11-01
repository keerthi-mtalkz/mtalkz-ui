import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {ax} from "../../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import { WithContext as ReactTags } from 'react-tag-input';
import Switch from 'react-switch'
import Select from "react-select";
import {HTTP_METHODS} from "../../../utils/constants";


const updateID = () => {
    const router = useRouter();
    const updateid = router.query.updateID;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
    const [approval, handleApproval] = useState(false)
  const [access, handleAccess] = useState(false)
    const [tags, setTags] = React.useState([
    ]);
    const [params, setParams] = React.useState([
    ]);
  const [permissions,setPermissions]=useState([])
  const [selectedPermissions,setSelectedPermissions]=useState([])


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


    const fetch = async () => {
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/integrations/${updateid}`, {headers: {
        
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          setRes(res.data.integration);
          handleAccess(res.data.integration.requires_approval===1?true:false)
          handleApproval(res.data.integration.requires_access===1 ? true : false)
          let _tags=[]
          let _params=[];
          res.data.integration.tags.map((tag)=>{
           _tags.push({id: tag, text: tag})
          })
          setTags(_tags)
          res.data.integration.param_names.map((tag)=>{
            _params.push({id: tag, text: tag})
           })
           setParams(_params)
         getPermissions();
        })
        .catch((err) => {
        setStatus({ type: "error", err });
          console.error("get /integration error", err);
        });
      }
    };

    useEffect(() => {
      fetch();
    }, []);

  
    const { register, handleSubmit, watch, errors } = useForm();

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
      ax.put(`/integrations/${updateid}`, data, {headers: {
        'Authorization': `Bearer ${token}`
      }})
        .then((res) => {
          setRes(res.data);
        setStatus({ type: "success" });
          router.push("/integration");
        })
        .catch((err) => {
          console.error("get /integration error", err);
          setStatus({ type: "error", err });
        });
      }
    };
  
  
 
return (
    <Layout>
     <SectionTitle title="UPDATE INTEGRATION" subtitle="" />
     {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Updated integration successfully', 'Success')}
        </div>
      </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.error(errors, 'Error')}
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
            <span className="text-default">Route</span>
            <input
              name="route"
              type="text"
              ref={register({ required: true })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Route in dot notation"
              required
              value={res.route}
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
               value={res.name}
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
                value={res.slug}
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
                value={res.channel_slug}

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
                  value={res.icon_url}
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
                  value={res.description}

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
        value={res.api_url}

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
        </div>
      </div>
    </Layout>
  );
};

export default withRedux(updateID);