import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import React from "react";

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
        setStatus({ type: "error", err });
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
        console.error("get /Integrations error", err.message);
        setStatus({ type: "error", err });
      });
  } else {
    console.log("Thing was not saved to the database.");
  }
}
};


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
        Header: 'Actions',
        sortable: false,
        cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
        Cell: (data) => {
       
        return (<div className="flex justify-evenly"> <Link href={`/integration/view/${data.row.original.id}`}>
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
    <Layout className="overflow-x-auto">
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
        { NotificationManager.error(error, 'Error')}
         
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
    <Datatable columns={columns} data={integrations} />
    </Layout>
    )
}

export default withRedux(Integration)
