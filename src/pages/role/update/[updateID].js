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

    const fetch = async (st,ad) => {
      if (typeof window !== "undefined" ) {
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
          Object.keys(st).map(key => {
            const perms = st[key];
            perms.filter((p)=>p!= null).map((perm)=>{
            var selectedPermission =  res.data.permissions.find(permission=>permission.id === perm.id)
            
            if(selectedPermission){
              perm.selected = true
            }
            })
          })
          ad.map((add)=>{
            var selectedPermission =  res.data.permissions.find(permission=>permission.id === add.id)
            if(selectedPermission){
              add.selected = true
            }
          })
          _setStandard({...st})
          _setAdditional([...ad])

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
          let permissions=res.data
          setPermissions(permissions)
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
           
          });
          _setStandard({...selectstandard})
          _setAdditional([...additional])
          fetch({...selectstandard},[...additional])
         

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

  

    const onSubmit = (data) => {
    let _selectedPermissions=[]
      if (typeof window !== "undefined") {
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
    <div>
    <span className="text-default" >Standard Permissions</span>
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
   <span className="text-default">Additional Permissions</span>
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