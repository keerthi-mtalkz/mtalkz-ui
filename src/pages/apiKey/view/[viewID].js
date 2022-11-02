import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {NotificationManager} from 'react-notifications'
import {ax} from "../../../utils/apiCalls";




const viewID = () => {
    const router = useRouter();
    const viewid = router.query.viewID;
  
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
  
    const fetchApiKey = async () => {
        if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/api-keys/${viewid}`, {headers: {
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          setRes(res.data.api_key);
        })
        .catch((err) => {
            setStatus({ type: "error",message: err.response.data.message });
        });
    }
    };

    useEffect(() => {
      fetchApiKey();
    }, []);

 
  
  

return (
    <Layout>
     <SectionTitle title="View ApiKey" subtitle="" />
    
     {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.error(status.message, 'Error')}
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
                        Key
                        </p>
                      
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.key}</p>
                    </div>
                </div>
            </li>
        </ul>
   </div>

   <div className="flow-root">
   <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
       <li className="py-3 sm:py-4">
           <div className="flex items-center space-x-4">
             
               <div className="flex-1 min-w-0">
                   <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                   Organization Id
                   </p>
                 
               </div>
               <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
               <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.organization_id}</p>
               </div>
           </div>
       </li>
   </ul>
</div>

<div className="flow-root">
<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
    <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Resource Id
                </p>
              
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.resource_id}</p>
            </div>
        </div>
    </li>
</ul>
</div>

<div className="flow-root">
<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
    <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Credits
                </p>
              
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.credits}</p>
            </div>
        </div>
    </li>
</ul>
</div>
  
<div className="flow-root">
<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
    <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Floating Credits
                </p>
              
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.floating_credits}</p>
            </div>
        </div>
    </li>
</ul>
</div>

<div className="flow-root">
<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
    <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Status
                </p>
              
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.is_active}</p>
            </div>
        </div>
    </li>
</ul>
</div>

<div className="flow-root">
<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
    <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-4">
          
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Total Credits
                </p>
              
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.total_credits}</p>
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