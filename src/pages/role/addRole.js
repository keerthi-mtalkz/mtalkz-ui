import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import Switch from 'react-switch'

const addRole = () => {
  const router = useRouter();
  const [res, setRes] = useState({});
  const [status, setStatus] = useState(undefined);

  const { register, handleSubmit, watch } = useForm();
  const [checked, handleChange] = useState(false)
const [permissions,setPermissions]=useState([])
 const [selectedPermission,setSelectedPermission]=useState("")
const [errors,setErrors] = useState(undefined)
const standard = {};
const additional = [];
let selectstandard={}
const [_standard,_setStandard ]=  useState({});
const [_additional,_setAdditional ]=  useState([]);





const titelize = (slug) => slug.split("-").map(w => w.charAt(0).toUpperCase() + w.substring(1)).join(' ');

const renderSwitch = (perm,key=null,index=0) => {
 
  let permissions={..._standard};
 return <Switch
    onChange={(checked) =>{
      permissions[key][index].selected=checked
       _setStandard({...permissions})}}
    checked={perm.selected}
    handleDiameter={24}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
    height={20}
    width={48}
    className="react-switch"
  />
}
const renderSwitchadd = (perm,i) => {
  let permissions=[..._additional]
 return <Switch
    onChange={(checked) =>{
      permissions[i].selected=checked;
      _setAdditional([...permissions])
    }}
    checked={perm.selected}
    handleDiameter={24}
    uncheckedIcon={false}
    checkedIcon={false}
    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.2)"
    height={20}
    width={48}
    className="react-switch"
  />
}

  const onSubmit = (data) => {
    let _selectedPermissions=[]

    if (typeof window !== "undefined") {
      data.is_system_role=checked;
      Object.keys(_standard).map(key => {
        const perms = _standard[key];
        perms.map((perm)=>{
          perm && perm.selected && _selectedPermissions.push(perm.id)

        })
      })
      _additional.map((add)=>{
        add.selected && _selectedPermissions.push(add.id)
      })
        data.permission_ids=_selectedPermissions
    const token = localStorage.getItem('token');
    ax.post("/roles", data, { headers: {
        'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setRes(res.data);
        setStatus({ type: "success" });
        setTimeout(() => {
        router.push("/role");
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

  const getPermissions = async () => {
    if(permissions.length == 0){
      const token = localStorage.getItem('token');
      await ax
        .get("/permissions", {headers: {
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          let permissions=res.data
          permissions.forEach(_permission => {
            const element=_permission.route;
            const parts = element.split('.');
            const entity = parts[0];
            const permission = parts.slice(1).join('.');
            const idx = ['index','show','store','update','destroy'].indexOf(permission);
            if ( idx >= 0) {
              if (!standard[entity]) {
                standard[entity] = [null, null, null, null, null];
                selectstandard[entity] = [null, null, null, null, null];
              }
              standard[entity][idx] = permission;
              selectstandard[entity][idx]={permission: permission,selected:false,id:_permission.id}
            } else {
              additional.push({parts:parts,selected:false,id:_permission.id});
            }
            _setStandard({...selectstandard})
            _setAdditional([...additional])
          });

        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });
      });
    }
   
  };

  useEffect(()=>{
    getPermissions();
  },[])


  return (
    <Layout>
    <SectionTitle title="Create Role" subtitle="" />
         {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Role Added Successfully', '')}
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
     <span className="text-red-600" >*</span>

          <input
            name="name"
            type="text"
            ref={register()}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter Role Name"
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
           required
         />
       </label>
       {errors && errors.description && (
        errors.description.map((err)=>{
         return <p className="mt-1 text-xs text-red-500">{err}</p>
        })
       
      )}
     </div>

       {/*input*/}
       <div className="w-full mb-4">
       <label className="block">
       <div className="flex justify-between">
       <div className="mt-1">
       <span className="text-default">System Role</span>
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
      
       </label>
       {errors && errors.is_system_role && (
        errors.is_system_role.map((err)=>{
         return <p className="mt-1 text-xs text-red-500">{err}</p>
        })
       
      )}
     </div>

    
   <div>
   <span className="text-default">Standard Permissions</span>
   <table className='table' style={{marginBottom:"25px"}}>
     <thead>
       <tr>
         <th></th>
         <th>List</th>
         <th>Show</th>
         <th>Create</th>
         <th>Update</th>
         <th>Delete</th>
       </tr>
     </thead>
     <tbody>
       {Object.keys(_standard).map(key => {
         const perms = _standard[key];
         return (
           <tr key={key}>
             <td>{titelize(key)}</td>
             <td>{perms[0] ? renderSwitch(perms[0],key,0) : ''}</td>
             <td>{perms[1] ? renderSwitch(perms[1],key,1) : ''}</td>
             <td>{perms[2] ? renderSwitch(perms[2],key,2) : ''}</td>
             <td>{perms[3] ? renderSwitch(perms[3],key,3) : ''}</td>
             <td>{perms[4] ? renderSwitch(perms[4],key,4) : ''}</td>
           </tr>
         )
       })}
     </tbody>
   </table>
   <h6>Additional Permissions</h6>
   <table className='table'>
     <tbody>
       {_additional.map((perm,i) => {
         const [entity, ...permission] = perm.parts;
         return (
           <tr key={perm.parts.join('.')}>
             <td>{titelize(entity) + ' - ' + titelize(permission.reverse().join('-'))}</td>
             <td>{renderSwitchadd(perm,i)}</td>
           </tr>
         )
       })}
     </tbody>
   </table>
 </div>

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
          className="btn btn-default cursor-pointer btn-block btn-indigo mt-5"
          value="Add"
        />
      </div>
    </form>

    </Layout>
  );
};
export default withRedux(addRole);

