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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Datatable from "../../../components/datatable";



const viewID = () => {
    const router = useRouter();
    const viewid = router.query.viewID;
    const [res, setRes] = useState({});
    const [status, setStatus] = useState(undefined);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [activities,setActivities]=useState([]);
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
      getUserActivities();
      fetch();
    }, []);

  const getUserActivities=async()=>{
    console.log("hgftyrt grr45y6 yrtur")
    const sd=moment(startDate).format("YYYY-MM-DD");
    const ed=moment(endDate).format("YYYY-MM-DD");
    const token = localStorage.getItem('token');
    await ax
    .get(`/users/${viewid}/activities/${sd}/${ed}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
    .then((res) => {
      setActivities(res.data.activities)
      console.log(res.data.activities,"hgytr");
    })
    .catch((err) => {
      console.error("get /users error", err);
    });
  }

  const columns =  [
    {
      Header: 'Activity',
      accessor: 'activity'
    },
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'Affected Table',
        accessor: 'affected_table'
      },
      {
        Header: 'Created Date',
        accessor: 'created_at'
      },

    ]

   

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
    
    <div className="flex ">
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
 <div>
 <div className="flex ml-10">
 <div>
 <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
 Start Date
 </p>
 <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
 </div>
 <div>
 <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
 End Date
 </p>
 <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
 
 </div>
 <div>
 <button
                className="  btn btn-default btn-blue create-btn "
                type="button"
                onClick={()=>{getUserActivities()}}
              >
                Get Activities
              </button>
 </div>
 </div>
 <Datatable  columns={columns} data={activities} />

 </div>
 
    </div>
    



   
    </Layout>
  );
};

export default withRedux(viewID);