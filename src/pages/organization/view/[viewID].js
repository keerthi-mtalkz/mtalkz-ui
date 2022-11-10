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

    const fetchOrgs = async () => {
        if (typeof window !== "undefined") {
      const token1 = localStorage.getItem('token');
      await ax
        .get(`/organizations/${viewid}`, {headers: {
        
          'Authorization': `Bearer ${token1}`
         }})
        .then((res) => {
          setRes(res.data.organization);
          // console.log(res.data.organization);
        })
        .catch((err) => {
          console.error("get /organizations error", err);
        });
    }
    };
    const onSubmit = (data) => {
      data.floating==""?0: data.floating
      updateCredits(data)
      console.log(data)
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
        console.log(res.data.credit)
         setCreditsRes(res.data.credit)
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

 

  const updateCredits=async(data)=>{
    const token = localStorage.getItem('token');
    ax.post(`/organizations/${viewid}/credits/${selectedResource.value}`,data, { headers: {
      'Authorization': `Bearer ${token}`
   }})
    .then((res) => {
      setRes(res.data);
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
      setSelectedResource({label: value.label, value: value.value})
    }

return (
    <Layout>
     <SectionTitle title="View Organization" subtitle="" />
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
                    <Tooltip
              placement={"Top"}
              content={res.name}>
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.name}</p>
            </Tooltip>
                   
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
                    <Tooltip
              placement={"Top"}
              content={res.email}>
              <p className="text-sm font-medium text-gray-900 truncate truncate dark:text-white">{res.email}</p>

            </Tooltip>
                    
                    
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
                    <Tooltip
              placement={"Top"}
              content={res.phone}>
              <p className="text-sm font-medium text-gray-900 truncate truncate dark:text-white">{res.phone}</p>

            </Tooltip>
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
                    <Tooltip
                    placement={"Top"}
                    content={res.address}>
                    <p className="text-sm font-medium text-gray-900 truncate truncate dark:text-white">{res.address}</p>
                  </Tooltip>
                    </div>
                </div>
            </li>
       
        </ul>
   </div>
</div>
{permissions.get && <div >
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
  <form
  onSubmit={handleSubmit(onSubmit)}
  className="flex mt-5"
  >
  <div >
   {/*input*/}
   <div className="w-full mb-4">
   <label className="block">
     <span className="text-default">Credits</span>
     <input
       name="credits"
       type="number"
       className="form-input mt-1 text-xs block w-full bg-white"
       placeholder="Enter Credits Value"
       defaultValue={creditsRes==null?0:creditsRes?.active}
       required
  ref={register()}
     />
   </label>
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
       defaultValue={creditsRes===null?0:creditsRes?.floating}
       ref={register()}
      />
    </label>
    </div>
    <div className="w-full" style={{marginTop:"10px"}}>
    <input
      type="submit"
      className="btn btn-default btn-block btn-indigo "
      value="Submit"
    />
  </div>
  </div>
  
  </form>
  </div> }
  
  
  </div>

}

</div>


   


   
    </Layout>
  );
};

export default withRedux(viewID);