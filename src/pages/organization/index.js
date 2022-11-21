import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import SectionTitle from '../../components/section-title'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import React from "react";
import {NotificationManager} from 'react-notifications'
import ConfirmationModal from "../../components/confirmationmodal"




const Organization=()=>{
 const [organizations,setOrganizations]=useState([])
 const [status, setStatus] = React.useState(undefined);
 const [searchQuery, setSearchQuery] = React.useState("");
 const [permissions,setPermissions]=React.useState({get:false,update:false,delete:false,view:false,setRole:false})
 const [deleteId,setDeleteId]=React.useState(undefined)
 const [showDeletePopup,setShowDeletePopup]=React.useState(false)

  const getOrganizations = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/organizations", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setOrganizations(res.data);
      })
      .catch((err) => {
        console.error("get /organizations error", err);
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
        if(permission.route == "organizations.index"){
          permissions["get"] = true;
        } else if(permission.route == "organizations.update"){
          permissions["update"] = true;
        }else if(permission.route == "organizations.destroy"){
          permissions["delete"] = true;
        }else if(permission.route == "organizations.show"){
          permissions["view"] = true;
        }else if(permission.route == "organizations.storeU"){
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
    getOrganizations();
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
    deleteOrganization()
   }

  const deleteOrganization = () => {
   
    const token = localStorage.getItem('token');

      ax.delete(`/organizations/${deleteId}`, {headers: {
        'Authorization': `Bearer ${token}`
       }})
        .then((res) => {
        setShowDeletePopup(false)

          setStatus({ type: "success" });
          setTimeout(() => {
        setStatus(undefined);

            getOrganizations();
          }, 1000);
        })
        .catch((err) => {
        setShowDeletePopup(false)

          console.error("get /Integrations error", err.message);
          setStatus({ type: "error",message: err.response.data.message });
        });
    
  };


  const columns =  [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },

      {
        Header: 'Phone No',
        accessor: 'phone'
      },
      {
      Header: 'Address',
      accessor: 'address',
     
    },
      {
        Header: 'Actions',
        sortable: false,
        cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
        Cell: (data) => {
       
        return (
          <div className="flex justify-evenly"> 
          {permissions.view && <Link href={`/organization/view/${data.row.original.id}`}>
          <p>
            <i className="icon-eye text-1xl font-bold mb-2"></i>
          </p>
      </Link> }
          {
            permissions.delete &&   <p
            style={{
             
              cursor: "pointer",
              lineHeight: "normal",
            }}
            onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
    </p>
          } 
     {
      permissions.update && <Link href={`/organization/update/${data.row.original.id}`}>
      <p>
        <i className="icon-note text-1xl font-bold mb-2"></i>
      </p>
  </Link>
     }


</div>
        )}
       
      }
    ]
  //const data = React.useMemo(() => countries, [])
  return (
    <Layout>
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

    <SectionTitle title="Organization Management" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Deleted Organization successfully', 'Success')}
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
      {permissions.add &&  <Link href={`/organization/addOrganization`}>
      <button
        className="ml-3  btn btn-default btn-indigo create-btn w-full"
        type="button"
      >
        Add Organization
      </button>
  </Link>}
     
    </div>
  </div>
    <Datatable columns={columns} data={organizations?.filter((val) => {
      if (searchQuery == "") {
        return val;
      } else if (
       (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.email?.toLowerCase().includes(searchQuery.toLocaleLowerCase())) 
      ) {
        return val;
      }
    })
    .map((value, idx) => {return value})} />
    </Layout>
    )
}

export default withRedux(Organization)
