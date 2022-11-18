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



const setRole = () => {
    const router = useRouter();
    const updateid = router.query.setRole;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
    const [errors,setErrors]=useState(undefined)
    const [checked, handleChange] = useState(false)
    const [roles,setRoles]=useState([]);
    const [selectedRole,setSelectedRole]=useState(undefined)
    const fetch = async (roles) => {
      NotificationManager.removeAll()
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/users/${updateid}`, {headers: {
        
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
      const orgId=localStorage.getItem("orgId");
        const  current_role_id = res.data.user.org_roles[orgId]
      console.log(current_role_id,"ejhgfeyrfey")

        if(current_role_id){
          console.log(roles,"((((((((((")
         let role= roles.filter((role)=>role.value==current_role_id)
         console.log(role)
          setSelectedRole([{label:role[0].label, value:role[0].value}])
        }
        else{
          setSelectedRole([])

        }
          console.log(current_role_id,"******************")
        })
        .catch((err) => {
          console.error("get /users error", err);
        });
      }
    };
  
    let handleSwitch = (value) => {
      setSelectedRole([{label: value.label,value:value.value}])
    }

    const fetchRole = async () => {
      if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      await ax
        .get("/roles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          let roles=[];
          roles = res.data.map((role)=>{
           return  { label: role.name, value: role.id };
          })
          setRoles([...roles])
      fetch(roles);
         
        })
        .catch((err) => {
            setStatus({ type: "error",message: err.response?.data.message });
        });
      }
    };
  

    useEffect(() => {
      fetchRole();
    }, []);

  
    const { register, handleSubmit } = useForm();

    const onSubmit = () => {
      const orgId=localStorage.getItem("orgId");
      if (typeof window !== "undefined") {
        console.log(orgId,"orgIdorgId")
      const token = localStorage.getItem('token');
      ax.get(`/users/${updateid}/set-role/${selectedRole[0].value}`,{headers: {
        'Authorization': `Bearer ${token}`
      }})
        .then((res) => {
          setStatus({ type: "success" });
          setTimeout(() => {
          router.push("/user");
          }, 1000);
        })
        .catch((err) => {
            if(err.response.data.errors===[]){
                setErrors(err.response.data.errors)
                }else{
                  setStatus({ type: "error",message: err.response.data.message });
                }
        });
      }
    };
  
  
return (
    <Layout>
     <SectionTitle title="SET ROLE" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Set Role Successfull', 'Success')}
        </div>
      </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.error(status.message, "Error")}
        </div>
      </div>
      )}
    
    
   
      <div className="flex flex-wrap ">
        <div className="w-full">
        <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-sm mb-4 lg:w-1/3"
    >

    <div className="w-full mb-4">
    <label className="block">
      <span className="text-default">Role</span>
      <div style={{ width: "300px" }}>
      <Select
        options={roles}
        placeholder="Select Role"
        onChange={handleSwitch}
        value={selectedRole}
        
      />
    </div>
    </label>
    {errors  && (
      
        <p className="mt-1 text-xs text-red-500">{errors.message}</p>
     
    )}
  </div>
      {/*input*/}

      <div className="w-full">
        <input
          type="submit"
          className="btn btn-default btn-block btn-indigo btn-rounded"
          value="Set"
        />
      </div>
    </form>
        </div>
      </div>
    </Layout>
  );
};

export default withRedux(setRole);