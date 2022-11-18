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
  
    const fetchChannel = async () => {
        if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      await ax
        .get(`/channels/${viewid}`, {headers: {
        
          'Authorization': `Bearer ${token}`
         }})
        .then((res) => {
          setRes(res.data.channel);
        })
        .catch((err) => {
        setStatus({ type: "error", err });
          console.error("get /permissions error", err);
        });
    }
    };

    useEffect(() => {
      
      fetchChannel();
    }, []);

 
  
  

return (
    <Layout>
     <SectionTitle title="View Channel" subtitle="" />
    
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
                  
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Slug
                        </p>
                      
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.slug}</p>
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
                   Name
                   </p>
                 
               </div>
               <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
               <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{res.name}</p>
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