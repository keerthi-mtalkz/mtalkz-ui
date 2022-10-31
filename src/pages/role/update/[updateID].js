import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {ax} from "../../../utils/apiCalls";
import {
  NotificationInfo,
  NotificationWarning,
  NotificationError,
  NotificationSuccess
} from '../../../components/notifications'
import {NotificationManager} from 'react-notifications'
import Select from "react-select";
import Switch from 'react-switch'


const updateID = () => {
    const router = useRouter();
    const updateid = router.query.updateID;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
  

    const [checked, handleChange] = useState(false)
const [permissions,setPermissions]=useState([])
 const [selectedPermission,setSelectedPermission]=useState("")


    const fetch = async () => {
      if (typeof window !== "undefined") {
      const token1 = localStorage.getItem('token');
      await ax
        .get(`/roles/${updateid}`, {headers: {
        
          'Authorization': `Bearer ${token1}`
         }})
        .then((res) => {
          setRes(res.data.role);
          let syatemRole=res.data.role.is_system_role===1?true:false;
          handleChange(syatemRole)
          let permissions=[]
          res.data.permissions.map((permission)=>{
            permissions.push({label:permission.name, value:permission.id})
          })
          setSelectedPermission([...permissions])
        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });
        setTimeout(() => {
          setStatus(undefined)
          router.push("/role");
        }, 1000);
        });
      }
    };
    
  const getPermissions = async () => {
    if(permissions.length == 0){
      const token = localStorage.getItem('token');
      await ax
        .get("/permissions", {headers: {
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          let permissions=[]
          res.data.map((permission)=>{
            permissions.push( { label: permission.name, value: permission.id })
          })
          setPermissions([...permissions]);
         fetch();
        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });
          setTimeout(() => {
            setStatus(undefined)
            router.push("/role");
          }, 1000);
        });
    }
   
  };

    useEffect(() => {
      getPermissions();
    }, []);

  
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = (data) => {
      if (typeof window !== "undefined") {
        data.is_system_role=checked;
        data.permission_ids=selectedPermission
      const token1 = localStorage.getItem('token');
      ax.put(`/roles/${updateid}`, data, {headers: {
        'Authorization': `Bearer ${token1}`
      }})
        .then((res) => {
          setRes(res.data);
          setStatus({ type: "success" });
    
          router.push("/role");
        
  
        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });
        setTimeout(() => {
          setStatus(undefined)
          router.push("/role");
        }, 1000);
          console.error("get /roles error", err);
          setStatus({ type: "error", err });
        });
      }
    };

    let handleSwitch = (value) => {
      setSelectedPermission([]);
      let permissions=[]
      value.map((selectedPermission)=>{
        permissions.push(selectedPermission.value.toString())
      })
          setSelectedPermission([...permissions])
    }
  
  
 
return (
    <Layout>
     <SectionTitle title="UPDATE ROLE" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Success message', 'Title here')}
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
          <span className="text-default">Name</span>
          <input
            name="name"
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter your name"
            defaultValue={res.name}
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
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter your Description"
            defaultValue={res.description}
          />
        </label>
      </div>


        {/*input*/}
        <div className="w-full mb-4">
        <label className="block">
        <span className="text-default">Is system user</span>
        <Switch
        onChange={() => handleChange(!checked)}
        checked={checked}
        handleDiameter={24}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
        //activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
      />
        </label>
      </div>
 
      <div style={{ width: "300px" }}>
      <Select
        options={permissions}
        placeholder="Select Permission ..."
        onChange={handleSwitch}
        isMulti={true}
        value={selectedPermission}
        
      />
    </div>


      {/*input*/}

      <div className="w-full">
        <input
          type="submit"
          className="btn btn-default btn-block btn-indigo btn-rounded"
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