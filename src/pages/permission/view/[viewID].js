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
  
    const fetchPermissions = async () => {
        if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/permissions/${viewid}`, {headers: {
        
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          setRes(res.data.permission);
        })
        .catch((err) => {
        setStatus({ type: "error", err });
          console.error("get /permissions error", err);
        });
    }
    };

    useEffect(() => {
      
      fetchPermissions();
    }, []);

 
  
  

return (
    <Layout>
     <SectionTitle title="View Permission" subtitle="" />
    
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.error(errors, 'Error')}
        </div>
      </div>
      )}
    

<div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  
                    <div className="flex-1 min-w-1">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Route
                        </p>
                      
                    </div>
                    <div className="inline-flex truncate items-center truncate text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.route}</p>
                    </div>
                   
                </div>
            </li>
          

         
       
        </ul>
   </div>
   <div className="flow-root">
   <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
       <li className="py-3 sm:py-4">
           <div className="flex items-center space-x-4">
             
               <div className="flex-1 min-w-1">
                   <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                   Name
                   </p>
                 
               </div>
               <div className="inline-flex truncate items-center truncate text-base font-semibold text-gray-900 dark:text-white">
               <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.name}</p>
               </div>
              
           </div>
       </li>
     

    
  
   </ul>
</div>
<div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  
                    <div className="flex-1 min-w-1">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Description
                        </p>
                      
                    </div>
                    <div className="inline-flex truncate items-center truncate text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.description}</p>
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