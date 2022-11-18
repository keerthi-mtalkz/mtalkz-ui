import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import SectionTitle from '../../components/section-title'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import React from 'react'
import {NotificationManager} from 'react-notifications'
import {Badge, CircularBadge} from '../../components/badges'




const ApiKey=()=>{
 const [apiKeys,setApiKeys]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");
 const [permissions,setPermissions]=React.useState({get:false,update:false,delete:false,view:false})

  const getApiKeys = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/api-keys", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        res.data.map((key)=>{
          key.is_active=key.is_active==1?"Active":"Inactive"
        })
        setApiKeys(res.data);
      })
      .catch((err) => {
        console.error("get /apiKeys error", err);
      });
  };
  const getPermissions = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/permissions", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        let permissions={get:false,update:false,delete:false,view:false,add:false}
        res.data.map((permission)=>{
        if(permission.route == "apikeys.index"){
          permissions["get"] = true;
        } else if(permission.route == "apikeys.update"){
          permissions["update"] = true;
        }else if(permission.route == "apikeys.destroy"){
          permissions["delete"] = true;
        }else if(permission.route == "apikeys.show"){
          permissions["view"] = true;
        }else if(permission.route == "apikeys.store"){
          permissions["add"] = true;
        }
        })
        setPermissions({...permissions})
      })
      .catch((err) => {
        console.error("get /permissions error", err);
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
    
    getPermissions()
    getApiKeys();
  }, []);

  
  const columns =  [
    {
      Header: 'Label',
      accessor: 'label'
    },
      {
        Header: 'Key',
        accessor: 'masked_key'
      },
      {
        Header:'Status',
        sortable: false,
        Cell: (data) => {

          return (<div className="flex  ">
          <Badge  size={'default'} color={data.row.original.is_active=='Active'?'green':'red'} rounded>
            {data.row.original.is_active }
          </Badge>
           </div>)}

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
       
        return (<div className="flex justify-evenly"> 
        {permissions.view && <Link href={`/apiKey/view/${data.row.original.id}`}>
        <p>
          <i className="icon-eye text-1xl font-bold mb-2"></i>
        </p>
    </Link> }
    {permissions.delete &&  <p
      style={{
       
        cursor: "pointer",
        lineHeight: "normal",
      }}
      onClick={() => handleDelete(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>}

{permissions.update && <Link href={`/apiKey/update/${data.row.original.id}`}>
<p>
  <i className="icon-note text-1xl font-bold mb-2"></i>
</p>
</Link>} 
         


</div>
        )}
       
      }
    ]
  //const data = React.useMemo(() => countries, [])
  return (
    <Layout>
    <SectionTitle title="APIKey Management" subtitle="" />

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
      {permissions.add &&   <Link href={`/apiKey/addApiKey`}>
      <button
        className="ml-3  btn btn-default btn-indigo create-btn w-full"
        type="button"
      >
        Add Api Key
      </button>
  </Link>}
     
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
