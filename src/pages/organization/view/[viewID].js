import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import Select from "react-select";
import {Popover, Tooltip} from '../../../components/popovers'


import {
  NotificationInfo,
  NotificationWarning,
  NotificationError,
  NotificationSuccess
} from '../../../components/notifications'
import {NotificationManager} from 'react-notifications'
import {ax} from "../../../utils/apiCalls";




const viewID = () => {
    const router = useRouter();
    const viewid = router.query.viewID;
    const { register, handleSubmit, watch } = useForm();
  
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
 const [resources,setResources]=useState([])
 const [selectedResource,setSelectedResource]=useState([]);
 const [creditsRes,setCreditsRes]=useState("");
 const [permissions,setPermissions]=useState({get:false,update:false,delete:false})
 const [credits,setCredits]=useState(undefined)
 const [floatingcredits,setfloatingCredits]=useState(undefined)
 const [creditError,setCreditError]=useState(undefined);
 const [floatingCreditError,setFloatingError]=useState(undefined);

    const fetchOrgs = async () => {
        if (typeof window !== "undefined") {
      const token1 = localStorage.getItem('token');
      await ax
        .get(`/organizations/${viewid}`, {headers: {
        
          'Authorization': `Bearer ${token1}`
         }})
        .then((res) => {
          setRes(res.data.organization);
        })
        .catch((err) => {
          console.error("get /organizations error", err);
        });
    }
    };
    const onSubmit = () => {
      if([credits].toString().length<20 && [floatingcredits].toString().length<20){
        updateCredits()
      }else
      {
        credits&& [credits].toString().length>=20  && setCreditError("the entered value should be in between 1 to 20 digit")
        floatingcredits && [floatingcredits].toString().length>=20  && setFloatingError("the entered value should be in between 1 to 20 digit")
      }

    }

    useEffect(() => {
      
      getPermissions()
      getResources();
      fetchOrgs();
    }, []);

    const fetchCredits = async () => {
      if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    await ax
      .get(`/organizations/${viewid}/credits/${selectedResource.value}`, {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
         setCreditsRes(res.data.credit)
         if(res.data.credit){
          setCredits(res.data.credit.active);
          setfloatingCredits(res.data.credit.floating)
         }else{
          setCredits(0);
          setfloatingCredits(0)
         }
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
      });
  }
  };

  const getPermissions = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/permissions", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        let _permission={...permissions}
        res.data.map((permission)=>{
          if(permission.route=="organizations.credits.get"){
            _permission={..._permission,get:true}

          }else if(permission.route=="organizations.credits.update"){
            _permission={..._permission,update:true}

          }else if(permission.route=="organizations.credits.delete"){
            _permission={..._permission,delete:true}
          }
        })
        setPermissions({..._permission})
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response?.data.message });
      });
  };

 

  const updateCredits=async()=>{
    setCreditError(undefined);
    setFloatingError(undefined)
    const data={
      credits:credits?credits:0,
      floating_credits :floatingcredits?floatingcredits : 0
    }
    const token = localStorage.getItem('token');
    ax.post(`/organizations/${viewid}/credits/${selectedResource.value}`,data, { headers: {
      'Authorization': `Bearer ${token}`
   }})
    .then((res) => {
      setStatus({ type: "success" });
    })
    .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
    });
  }

    const getResources = async () => {
      const token = localStorage.getItem('token');
      await ax
        .get("/resources", {headers: {
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          let _resources=res.data;
          _resources= _resources.map((resource)=>{
                 return { label: resource.name, value: resource.id };
          })
          setResources(_resources);
        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });
        });
    };
  
    const handleSwitch=(value)=>{
      setStatus(undefined)
      setSelectedResource({label: value.label, value: value.value})
    }
 
return (
    <Layout>
     <SectionTitle title="View Organization" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Updated Credits Successfully', 'Success')}
        </div>
      </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
          <NotificationError />
        </div>
      </div>
      )}
    
<div className="flex">
<div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  
                    <div className="flex-1 min-w-1">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Name
                        </p>
                      
                    </div>
                    <div className="inline-flex items-center truncate text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.name}</p>
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                   
                    <div className="flex-1 min-w-1">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                       Email
                        </p>
                       
                    </div>
                    <div className="inline-flex items-center text-base truncate font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate truncate dark:text-white">{res.email}</p>
                    </div>
                </div>
            </li>

            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                   
                    <div className="flex-1 min-w-1">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                       Phone No
                        </p>
                       
                    </div>
                    <div className="inline-flex items-center truncate text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate truncate dark:text-white">{res.phone}</p>
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                   
                    <div className="flex-1 min-w-1">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                       Address
                        </p>
                       
                    </div>
                    <div className="inline-flex items-center truncate text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate truncate dark:text-white">{res.address}</p>
                    </div>
                </div>
            </li>
       
        </ul>
   </div>
</div>
{permissions.get && <div >
  <div className="ml-10 mb-3 font-semibold"> Update Credits</div>
  <div className="flex ml-10">
  <div style={{ width: "300px" }}>
  <Select
    options={resources}
    placeholder="Select Resource"
    onChange={handleSwitch}
  />  
  
  </div>
  <button
  className="ml-3  btn btn-default btn-indigo create-btn "
  type="button"
  onClick={fetchCredits}
  disabled={selectedResource.length==0}
  >
  Get Credits
  </button>
  </div>
  {(creditsRes==null) && <label className="ml-10">No active credits</label>}
  {permissions.update && creditsRes!== "" && <div className=" ml-10">
  
  <div className="mt-5" >
   {/*input*/}
   <div className="w-full mb-4">
   <label className="block">
     <span className="text-default">Credits</span>
     <input
       name="credits"
       type="number"
       className="form-input mt-1 text-xs block w-full bg-white"
       placeholder="Enter Credits Value"
       value={credits}
       onChange={(data)=>{
        setCredits(parseInt(data.target.value))
      }}
       required
  ref={register()}
     />
   </label>
   {creditError &&  (
   
      <p className="mt-1 text-xs text-red-500">{creditError}</p>
    
   
  )}
   </div>
    {/*input*/}
    <div className="w-full mb-4">
    <label className="block">
      <span className="text-default">Enter Floating Credits</span>
      <input
        name="floating"
        type="number"
        className="form-input mt-1 text-xs block w-full bg-white"
        placeholder="Enter Floating Credits"
        onChange={(data)=>{
          setfloatingCredits(parseInt(data.target.value))
        }}
       value={floatingcredits}
       ref={register()}
      />
    </label>
    {floatingCreditError &&  (
   
      <p className="mt-1 text-xs text-red-500">{floatingCreditError}</p>
    
   
  )}
    </div>
    <div className="w-full" style={{marginTop:"10px"}}>
    <input
      type="submit"
      className="btn btn-default btn-block btn-indigo "
      value="Submit"
      onClick={onSubmit}
      
    />
  </div>
  </div>
  
  </div> }
  
  
  </div>

}

</div>


   


   
    </Layout>
  );
};

export default withRedux(viewID);