import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import React from "react";
import SectionTitle from '../../components/section-title'

const Integration=()=>{
 const [integrations,setIntegrations]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");


  const getIntegrations = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/integrations", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        res.data[0].is_active=true
        setIntegrations(res.data);
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
        console.error("get /Integrations error", err);
      });
  };


  React.useEffect(() => {
    getIntegrations();
  }, []);

     const updateIntegrationStatus = (data) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  const answer = window.confirm("are you sure?");
  if (answer) {
      if(data.is_active)
      {
        deactivateIntegration(data)
      }else{
        activateIntegration(data)
      }
  } else {
    console.log("Thing was not saved to the database.");
  }
}
};

const activateIntegration = (data) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  ax.post("/integrations/${viewid}/activate", data, {headers: {
    'Authorization': `Bearer ${token}`
   }})
    .then((res) => {
     
    })
    .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
    });

  }
};

const deactivateIntegration = (data) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  ax.post("/integrations/${data.id}/deactivate", {headers: {
    'Authorization': `Bearer ${token}`
   }})
    .then((res) => {
     
    })
    .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
    });

  }
};

const getButtonStatus=(data)=>{
  if(data){
    const orgId=localStorage.getItem("orgId");
   return  data.access_granted_to.includes(orgId)
  }

}

const updateStatus=(data)=>{
  const answer = window.confirm("are you sure?");
  if(answer && getButtonStatus(data)){
    const token = localStorage.getItem('token');
    ax.post("/integrations/${data.id}/deactivate", {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
       
      })
      .catch((err) => {
        
          setStatus({ type: "error",message: err.response.data.message });
      });

  }else if(!getButtonStatus(data)){
  console.log("show popup")
  }
}


  const columns =  [
    {
      Header: 'ID',
      accessor: 'id'
    },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Slug',
        accessor: 'slug'
      },
      {
        Header: 'Channel Slug',
        accessor: 'channel_slug'
      },
     
      {
        Header: 'Param Names',
        accessor: 'param_names'
      },
      {
        Header:'Status',
        sortable: false,
        Cell: (data) => {
       
          return (<div className="flex  ">

         

          <div  className="flex rounded bg-red-300 items-center justify-start px-2 py-2 ">
           <button disabled={getButtonStatus(data.row.original)} onClick={()=>{updateStatus(data.row.original)}}>
           <p className="text-sm font-bold">{data.row.original.is_active?"Active":"Inactive" }</p>
           </button>
        
        </div>
           </div>)}

      },
      {
        Header: 'Actions',
        sortable: false,
        cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
        Cell: (data) => {
       
        return (<div className="flex justify-evenly "> <Link href={`/integration/view/${data.row.original.id}`}>
          <p>
            <i className="icon-eye text-1xl font-bold mb-2"></i>
          </p>
      </Link> <p
        style={{
         
          cursor: "pointer",
          lineHeight: "normal",
        }}
        onClick={() => updateIntegrationStatus(data.row.original)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>
<Link href={`/integration/update/${data.row.original.id}`}>
                      <p>
                        <i className="icon-note text-1xl font-bold mb-2"></i>
                      </p>
                  </Link>
</div>
        )}
       
      }
    ]
  return (
    <Layout className="overflow-x-scroll">
    
    <SectionTitle title="Integration Management" subtitle="" />

    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Deleted integration successfully', 'Success')}
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
      <div className="flex flex-row pb-4">
      <div className=" w-5/6">
        <input
          type="text"
          name="search"
          className="w-full p-2 ..."
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="w-1/6 ">
        {" "}
        <Link href={`/integration/addIntegration`}>
            <button
              className="ml-3  btn btn-default btn-indigo create-btn w-full"
              type="button"
            >
              Add Integration
            </button>
        </Link>
      </div>
    </div>
    
    <Datatable columns={columns} data={integrations}  className="overflow-x-scroll"/>
    </Layout>
    )
}

export default withRedux(Integration)
