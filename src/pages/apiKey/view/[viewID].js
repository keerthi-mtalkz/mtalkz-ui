import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import {NotificationManager} from 'react-notifications'
import {ax} from "../../../utils/apiCalls";
import {Badge, CircularBadge} from '../../../components/badges'




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
     <SectionTitle title="View API Key" subtitle="" />
    
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
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.masked_key}</p>
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
                Resource 
                </p>
              
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.resource?.name}</p>
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
                Status
                </p>
              
            </div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">


            <Badge  size={'default'} color={res.is_active==1?'green':'red'} rounded>
            {res.is_active?"Active":"Inactive" }
          </Badge>
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