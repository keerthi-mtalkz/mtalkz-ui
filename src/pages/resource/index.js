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

const Resource=()=>{
 const [resources,setResources]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");
 const [permissions,setPermissions]=React.useState({get:false,update:false,delete:false,view:false})
 const [deleteId,setDeleteId]=React.useState(undefined)
 const [showDeletePopup,setShowDeletePopup]=React.useState(false)
 const {userpermissions} = useSelector(
  state => ({
    userpermissions: state.userpermissions,
  }),
  shallowEqual
)
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
        let permissions={get:false,update:false,delete:false,view:false,add:false}
        permissions["get"]= userpermissions.includes("resources.index") && getResources()
        permissions["update"]= userpermissions.includes("resources.update")
        permissions["delete"]= userpermissions.includes("resources.destroy")
        permissions["view"]= userpermissions.includes("resources.show")
        permissions["add"]= userpermissions.includes("resources.store")
        setPermissions({...permissions})
  };
    

  React.useEffect(() => {
    
    getPermissions()
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
    deleteResource()
   }

     const deleteResource = () => {

  const token = localStorage.getItem('token');

    ax.delete(`/resources/${deleteId}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setShowDeletePopup(false)
        setStatus({ type: "success" });
        setTimeout(() => {
          setStatus(undefined)

            getResources();
        }, 1000);
      })
      .catch((err) => {
        setShowDeletePopup(false)

        setStatus({ type: "error",message: err.response.data.message });
      });
  
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
        onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
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
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

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
