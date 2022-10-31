import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useForm } from "react-hook-form";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";


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
  
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
  
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

    useEffect(() => {
      fetchOrgs();
    }, []);

 
  
  

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
    

<div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Name
                        </p>
                      
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.name}</p>
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                   
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                       Email
                        </p>
                       
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.email}</p>
                    </div>
                </div>
            </li>

            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                   
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                       Phone No
                        </p>
                       
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.phone}</p>
                    </div>
                </div>
            </li>
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                   
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                       Address
                        </p>
                       
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.address}</p>
                    </div>
                </div>
            </li>
       
        </ul>
   </div>
</div>

   


   
    </Layout>
  );
};

export default withRedux(viewID);