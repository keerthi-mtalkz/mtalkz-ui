import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {ax} from "../../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import Select from "react-select";
import Switch from 'react-switch'


const updateID = () => {
    const router = useRouter();
    const updateid = router.query.updateID;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
const [errors,setErrors] = useState(undefined)
  

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

  
    const { register, handleSubmit, watch } = useForm();

    const validateFields=()=>{
      if(selectedPermission.length ===0)
      {
      setErrors({permission_ids:['Permissions are required']})
      return false
      }
      else return true
    }

    const onSubmit = (data) => {
      const isValid=validateFields()
      if (typeof window !== "undefined"&& isValid) {
        let _selectedPermissions=selectedPermission.map((permission)=> permission.value )
        data.permission_ids=_selectedPermissions
      const token1 = localStorage.getItem('token');
      ax.put(`/roles/${updateid}`, data, {headers: {
        'Authorization': `Bearer ${token1}`
      }})
        .then((res) => {
          setStatus({ type: "success" });
      setTimeout(() => {
        router.push("/role");
      }, 1000);
        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });
        });
      }
    };

    let handleSwitch = (value) => {
      setSelectedPermission([]);
      let permissions=[]
      value &&  value.map((selectedPermission)=>{
        permissions.push({label:selectedPermission.label, value:selectedPermission.value})
      })
          setSelectedPermission([...permissions])
    }
  
  
 
return (
    <Layout>
     <SectionTitle title="Update Role" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Updated role details successfully', 'Success')}
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
     <span className="text-red-600" >*</span>

          <input
            name="name"
            type="text"
            ref={register()}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter Role Name"
            defaultValue={res.name}
            required
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
            placeholder="Enter Role Description"
            defaultValue={res.description}
          />
        </label>
        {errors && errors.description && (
          errors.description.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
        )}
      </div>


       
 
      <div style={{ width: "330px" }}>
      <div className="mb-1"> <span className="text-default">Permissions</span>
      
     <span className="text-red-600" >*</span>
      
      </div>
      <Select
        options={permissions}
        placeholder="Select Permissions"
        onChange={handleSwitch}
        isMulti={true}
        value={selectedPermission}
        
      />
      {errors && errors.permission_ids && (
        errors.permission_ids.map((err)=>{
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
      onClick={()=>{        router.push("/role");
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