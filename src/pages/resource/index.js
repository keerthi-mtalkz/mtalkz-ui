import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import React from "react";
import SectionTitle from '../../components/section-title'

const Resource=()=>{
 const [resources,setResources]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");
 const [permissions,setPermissions]=React.useState({get:false,update:false,delete:false,view:false})


  const getResources = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/resources", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setResources(res.data);
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
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
        if(permission.route == "resources.index"){
          permissions["get"] = true;
        } else if(permission.route == "resources.update"){
          permissions["update"] = true;
        }else if(permission.route == "resources.destroy"){
          permissions["delete"] = true;
        }else if(permission.route == "resources.show"){
          permissions["view"] = true;
        }else if(permission.route == "resources.store"){
          permissions["add"] = true;
        }
        })
        setPermissions({...permissions})
      })
      .catch((err) => {
        console.error("get /permissions error", err);
      });
  };
    

  React.useEffect(() => {
    getPermissions()
    getResources();
  }, []);

     const deleteResource = (id) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  const answer = window.confirm("are you sure?");
  if (answer) {
    ax.delete(`/resources/${id}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
        setTimeout(() => {
            getResources();
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


  const columns =  [
      {
        Header: 'Slug',
        accessor: 'slug'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Actions',
        sortable: false,
        cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
        Cell: (data) => {
       
        return (<div className="flex justify-evenly">
        {permissions.view && 
        <Link href={`/resource/view/${data.row.original.id}`}>
          <p>
            <i className="icon-eye text-1xl font-bold mb-2"></i>
          </p>
      </Link> }
      {permissions.delete &&  <p
        style={{
         
          cursor: "pointer",
          lineHeight: "normal",
        }}
        onClick={() => deleteResource(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>}
{permissions.update && <Link href={`/resource/update/${data.row.original.id}`}>
<p>
  <i className="icon-note text-1xl font-bold mb-2"></i>
</p>
</Link>}
     

</div>
        )}
       
      }
    ]
  return (
    <Layout>
    <SectionTitle title="Resource Management" subtitle="" />

    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Deleted Resource successfully', 'Success')}
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
        {permissions.add &&  <Link href={`/resource/addResource`}>
        <button
          className="ml-3  btn btn-default btn-indigo create-btn w-full"
          type="button"
        >
          Add Resource
        </button>
    </Link>}
       
      </div>
    </div>
    <Datatable  columns={columns}  data={resources?.filter((val) => {
      if (searchQuery == "") {
        return val;
      } else if (
       (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.slug.toLowerCase().includes(searchQuery.toLocaleLowerCase())) 
      ) {
        return val;
      }
    })
    .map((value, idx) => {return value})} />
    </Layout>
    )
}

export default withRedux(Resource)
