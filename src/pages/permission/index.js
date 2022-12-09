import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import React from "react";
import SectionTitle from '../../components/section-title'
import ConfirmationModal from "../../components/confirmationmodal"
import {useSelector, shallowEqual} from 'react-redux'

const Permission=()=>{
 const [permissions,setPermissions]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");
 const [deleteId,setDeleteId]=React.useState(undefined)
 const [showDeletePopup,setShowDeletePopup]=React.useState(false)
 const {userpermissions} = useSelector(
  state => ({
    userpermissions: state.userpermissions,
  }),
  shallowEqual
)
const [_permissions,_setPermissions]=React.useState({get:false,update:false,delete:false,view:false})

  const getPermissionsApi = async () => {
    const token = sessionStorage.getItem('token');
    await ax
      .get("/permissions", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setPermissions(res.data);
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
        console.error("get /permissions error", err);
      });
  };

  const getPermissions=()=>{
    let permissions={get:false,update:false,delete:false,view:false,add:false}
    permissions["get"]= userpermissions.includes("permissions.indexU") && getPermissionsApi()
        permissions["update"]= userpermissions.includes("permissions.update")
        permissions["delete"]= userpermissions.includes("permissions.destroy")
        permissions["view"]= userpermissions.includes("permissions.show")
        permissions["add"]= userpermissions.includes("permissions.store")
        _setPermissions({...permissions})
  }

  const ConfirmationPopup=(id)=>{
    setDeleteId(id)
    setShowDeletePopup(true)
   }

   const onCancel=()=>{
  setStatus(undefined)
    setShowDeletePopup(false)

   }

   const onSubmit=()=>{
    deletePermission()
   }

  React.useEffect(() => {
    
    getPermissions();
  }, []);

     const deletePermission = () => {
 
  const token = sessionStorage.getItem('token');

    ax.delete(`/permissions/${deleteId}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setShowDeletePopup(false)

        setStatus({ type: "success" });
        setTimeout(() => {
        setStatus(undefined);

            getPermissions();
        }, 1000);
      })
      .catch((err) => {
        setShowDeletePopup(false)

        setStatus({ type: "error",message: err.response.data.message });
      });
  } 


  const columns =  [
      {
        Header: 'Route',
        accessor: 'route'
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
        {_permissions.view &&   <Link href={`/permission/view/${data.row.original.id}`}>
        <p>
          <i className="icon-eye text-1xl font-bold mb-2"></i>
        </p>
    </Link> }
       
    {_permissions.delete &&    <p
      style={{
       
        cursor: "pointer",
        lineHeight: "normal",
      }}
      onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>}

{_permissions.update && <Link href={`/permission/update/${data.row.original.id}`}>
<p>
  <i className="icon-note text-1xl font-bold mb-2"></i>
</p>
</Link> }
    

</div>
        )}
       
      }
    ]
  return (
    <Layout>
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

    <SectionTitle title="Permission Management" subtitle="" />

    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Deleted permission successfully', 'Success')}
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
        {_permissions.add &&  <Link href={`/permission/addPermission`}>
        <button
          className="ml-3  btn btn-default btn-indigo create-btn w-full"
          type="button"
        >
          Add Permission
        </button>
    </Link> } 
       
      </div>
    </div>
    <Datatable columns={columns} data={permissions?.filter((val) => {
      if (searchQuery == "") {
        return val;
      } else if (
       (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.route.toLowerCase().includes(searchQuery.toLocaleLowerCase())) 
      ) {
        return val;
      }
    })
    .map((value, idx) => {return value})} />
    </Layout>
    )
}

export default withRedux(Permission)
