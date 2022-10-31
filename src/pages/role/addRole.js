import React, { useState, useEffect } from "react";
import Link from "next/link";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import Select from "react-select";
import Switch from 'react-switch'

const addRole = () => {
  const router = useRouter();
  const [res, setRes] = useState({});
  const [status, setStatus] = useState(undefined);

  const { register, handleSubmit, watch, errors } = useForm();
  const [checked, handleChange] = useState(false)
const [permissions,setPermissions]=useState([])
 const [selectedPermission,setSelectedPermission]=useState("")

  const onSubmit = (data) => {
    if (typeof window !== "undefined") {
      data.is_system_role=checked;
      data.permission_ids=selectedPermission
    const token = localStorage.getItem('token');
    ax.post("/roles", data, { headers: {
        'Authorization': `Bearer ${token}`
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

  useEffect(()=>{
    getPermissions();
  })

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
    <SectionTitle title="Create Role" subtitle="" />
         {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Data Submitted Successfully', '')}
        </div>
      </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        {   NotificationManager.error(status.message, 'Error')}
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
          <span className="text-default">Name</span>
          <input
            name="name"
            type="text"
            ref={register({ required: true })}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter your name"
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
           placeholder="Enter your description"
           required
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
       {errors.is_system_role && (
         <p className="mt-1 text-xs text-red-500">{errors.is_system_role}</p>
       )}
     </div>

     <div style={{ width: "300px" }}>
     <Select
       options={permissions}
       placeholder="Select organization ..."
       onChange={handleSwitch}
       isMulti={true}
     />
   </div>

      <div className="w-full">
        <input
          type="submit"
          className="btn btn-default btn-block btn-indigo btn-rounded"
          value="Submit"
        />
      </div>
    </form>

    </Layout>
  );
};
export default withRedux(addRole);

