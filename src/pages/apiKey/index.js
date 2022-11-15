import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import SectionTitle from '../../components/section-title'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import React from 'react'
import {NotificationManager} from 'react-notifications'




const ApiKey=()=>{
 const [apiKeys,setApiKeys]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");

  const getApiKeys = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/api-keys", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setApiKeys(res.data);
      })
      .catch((err) => {
        console.error("get /apiKeys error", err);
      });
  };

  const handleDelete=(id)=>{
    if (typeof window !== "undefined") {
        const token = localStorage.getItem('token');
        const answer = window.confirm("are you sure?");
        if (answer) {
            ax.delete(`/api-keys/${id}`, {headers: {
                'Authorization': `Bearer ${token}`
               }})
                .then((res) => {
                  setStatus({ type: "success" });
                  setTimeout(() => {
                    getApiKeys();
                  }, 1000);
                })
                .catch((err) => {
                  setStatus({ type: "error",message: err.response.data.message });
                  setTimeout(() => {
                    setStatus(undefined)
                  }, 1000);
                });
        }
    }
  }

  React.useEffect(() => {
    getApiKeys();
  }, []);


  const columns =  [
    {
      Header: 'ID',
      accessor: 'id'
    },
      {
        Header: 'Key',
        accessor: 'key'
      },
      {
        Header: 'Status',
        accessor: 'is_active',
      },
      {
        Header: 'Resource',
        accessor: 'resource.name'
      },
      {
        Header: 'Total Credits',
        accessor: 'total_credits',
      },
    
      {
        Header: 'Active Credits',
        accessor: 'credits',
       
      },
      {
        Header: 'Actions',
        sortable: false,
        cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
        Cell: (data) => {
       
        return (<div className="flex justify-evenly"> <Link href={`/apiKey/view/${data.row.original.id}`}>
          <p>
            <i className="icon-eye text-1xl font-bold mb-2"></i>
          </p>
      </Link> <p
        style={{
         
          cursor: "pointer",
          lineHeight: "normal",
        }}
        onClick={() => handleDelete(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>
<Link href={`/apiKey/update/${data.row.original.id}`}>
                      <p>
                        <i className="icon-note text-1xl font-bold mb-2"></i>
                      </p>
                  </Link>

</div>
        )}
       
      }
    ]
  //const data = React.useMemo(() => countries, [])
  return (
    <Layout>
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
      <Link href={`/apiKey/addApiKey`}>
          <button
            className="ml-3  btn btn-default btn-indigo create-btn w-full"
            type="button"
          >
            Add ApiKey
          </button>
      </Link>
    </div>
  </div>
  {status?.type === "success" && (
    <div className="flex flex-wrap w-full">
    <div className="p-2">
    { NotificationManager.success('Deleted ApiKey successfully', 'Success')}
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
    <Datatable columns={columns} data={apiKeys?.filter((val) => {
      if (searchQuery == "") {
        return val;
      } else if (
       (val.key.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ) 
      ) {
        return val;
      }
    })
    .map((value, idx) => {return value})}  />
    </Layout>
    )
}

export default withRedux(ApiKey)
