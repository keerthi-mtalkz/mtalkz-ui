import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../../layouts";
import SectionTitle from "../../../components/section-title";
import { useRouter } from "next/router";
import { withRedux } from "../../../lib/redux";
import {
  NotificationError,
} from '../../../components/notifications'
import {NotificationManager} from 'react-notifications';
import {ax} from "../../../utils/apiCalls";



const viewID = () => {
    const router = useRouter();
    const viewid = router.query.viewID;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
  
    const fetch = async () => {
      if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/users/${viewid}`, {headers: {
        
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          setRes(res.data.user);
          console.log(res.data);
        })
        .catch((err) => {
          console.error("get /users error", err);
        });
      }
    };

    useEffect(() => {
      fetch();
    }, []);

  
   

return (
    <Layout>
     <SectionTitle title="VIEW USER" subtitle="" />
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
                         Email address
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
                         organization Id
                         </p>
                        
                     </div>
                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                     <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.organization_id}</p>
                     </div>
                 </div>
             </li>
             <li className="py-3 sm:py-4">
                 <div className="flex items-center space-x-4">
                    
                     <div className="flex-1 min-w-0">
                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                         Create At
                         </p>
                        
                     </div>
                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                     <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{new Date(res.created_at).toLocaleString()}</p>
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