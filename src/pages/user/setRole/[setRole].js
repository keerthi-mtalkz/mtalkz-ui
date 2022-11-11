import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {ax} from "../../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'



const setRole = () => {
    const router = useRouter();
    const updateid = router.query.setRole;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
    const [errors,setErrors]=useState(undefined)
    const [checked, handleChange] = useState(false)

  

  


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
          setRes(res);
        })
        .catch((err) => {
            setStatus({ type: "error",message: err.response.data.message });
        });
      }
    };
  

    useEffect(() => {
      fetchRole();
    }, []);

  
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      ax.get(`/users/${updateid}/set-role/${data.roleID}`,{headers: {
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