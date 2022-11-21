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
import ConfirmationModal from "../../components/confirmationmodal"

const Integration=()=>{
 const [integrations,setIntegrations]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");
 const [permissions,setPermissions]=React.useState({get:false,update:false,delete:false,view:false})
 const [deleteId,setDeleteId]=React.useState(undefined)
 const [showDeletePopup,setShowDeletePopup]=React.useState(false)

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

  const getPermissions = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/permissions", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        let permissions={get:false,update:false,delete:false,view:false,add:false}
        res.data.map((permission)=>{
        if(permission.route == "integrations.index"){
          permissions["get"] = true;
        } else if(permission.route == "integrations.update"){
          permissions["update"] = true;
        }else if(permission.route == "integrations.destroy"){
          permissions["delete"] = true;
        }else if(permission.route == "integrations.show"){
          permissions["view"] = true;
        }else if(permission.route == "integrations.store"){
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
    
    getPermissions();
    getIntegrations();
  }, []);

  const ConfirmationPopup=(id)=>{
    setDeleteId(id)
    setShowDeletePopup(true)
   }

   const onCancel=()=>{
  setStatus(undefined)
    setShowDeletePopup(false)

   }

   const onSubmit=()=>{
    deleteIntegration()
   }

     const deleteIntegration = () => {

  const token = localStorage.getItem('token');

    ax.delete(`/integrations/${deleteId}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setShowDeletePopup(false)

        setStatus({ type: "success" });
        setTimeout(() => {
        setStatus(undefined);

            getIntegrations();
        }, 1000);
      })
      .catch((err) => {
        setShowDeletePopup(false)

        setStatus({ type: "error",message: err.response.data.message });
      });
 
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
       
        return (<div className="flex justify-evenly ">
        {permissions.view &&  <Link href={`/integration/view/${data.row.original.id}`}>
        <p>
          <i className="icon-eye text-1xl font-bold mb-2"></i>
        </p>
    </Link>}
    {permissions.delete &&   <p
      style={{
       
        cursor: "pointer",
        lineHeight: "normal",
      }}
      onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p> }

{permissions.update &&  <Link href={`/integration/update/${data.row.original.id}`}>
<p>
  <i className="icon-note text-1xl font-bold mb-2"></i>
</p>
</Link>}
      

</div>
        )}
       
      }
    ]
  return (
    <Layout className="overflow-x-scroll">
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

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
        {permissions.add &&  <Link href={`/integration/addIntegration`}>
        <button
          className="ml-3  btn btn-default btn-indigo create-btn w-full"
          type="button"
        >
          Add Integration
        </button>
    </Link>}
       
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
