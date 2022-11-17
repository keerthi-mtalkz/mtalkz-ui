import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import React from "react";
import SectionTitle from '../../components/section-title'
import {Badge, CircularBadge} from '../../components/badges'
import { getColor } from '../../functions/colors';

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

     const deleteIntegration = (id) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  const answer = window.confirm("are you sure?");
  if (answer) {
    ax.delete(`/integrations/${id}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
        setTimeout(() => {
            getIntegrations();
        }, 1000);
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
      });
  } else {
    console.log("Thing was not saved to the database.");
  }
}
};

const getColorBasedOnMethod=(method)=>{
  switch(method){
    case "get" :
     return "green"
     case "post" :
      return "pink"
      case "patch" :
        return "yellow"
        case "delete " :
          return "red"
          case "head" :
            return "blue"
  }
}


  const columns =  [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Channel Name',
        accessor: 'channel_name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header:'HTTP Method',
        sortable: false,
        Cell: (data) => {

          return (<div className="flex  ">
          <Badge  size={'default'} color={getColorBasedOnMethod(data.row.original.http_method )} rounded>
            {data.row.original.http_method }
          </Badge>
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
        onClick={() => deleteIntegration(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
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
    
    <Datatable columns={columns}  data={integrations?.filter((val) => {
      if (searchQuery == "") {
        return val;
      } else if (
       (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.slug.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.channel_slug.toLowerCase().includes(searchQuery.toLocaleLowerCase())) 
      ) {
        return val;
      }
    })
    .map((value, idx) => {return value})} className="overflow-x-scroll"/>
    </Layout>
    )
}

export default withRedux(Integration)
