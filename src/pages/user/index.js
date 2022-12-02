import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import SectionTitle from '../../components/section-title'
import Datatable from "../../components/datatable";
import { useEffect, useState } from 'react';
import Link from "next/link";
import {ax} from "../../utils/apiCalls"
import React from "react";
import {NotificationManager} from 'react-notifications'
import ConfirmationModal from "../../components/confirmationmodal"
import {useSelector, shallowEqual} from 'react-redux'


const User=()=>{
  const {userpermissions} = useSelector(
    state => ({
      userpermissions: state.userpermissions,
    }),
    shallowEqual
  )
    const [userData,setUserData]=React.useState([]);
  const [status, setStatus] = React.useState(undefined);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [permissions,setPermissions]=React.useState({get:false,update:false,delete:false,view:false,update:false,setRole:false})
 const [showDeletePopup,setShowDeletePopup]=React.useState(false)
 const [deleteId,setDeleteId]=useState(undefined)

  const getPermissions = async () => {
    let permissions={get:false,update:false,delete:false,view:false,add:false,setRole:false}
    permissions["get"]= userpermissions.includes("users.index") && getUsersApi()
    permissions["update"]= userpermissions.includes("users.update")
    permissions["delete"]= userpermissions.includes("users.destroy")
    permissions["view"]= userpermissions.includes("users.show")
    permissions["setRole"]= userpermissions.includes("users.role.set")
    permissions["add"]= userpermissions.includes("users.store")
    setPermissions({...permissions})
  };
    
     const getUsersApi=async()=>{
    const token= localStorage.getItem("token");
      await ax
        .get("/users", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          setUserData(res.data)
        })
        .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
        });
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
    deleteUserApi()
   }

   const deleteUserApi=()=>{
 
      const token = localStorage.getItem('token');

        ax.delete(`/users/${deleteId}`, {headers: {
          'Authorization': `Bearer ${token}`
         }})
          .then((res) => {
            setShowDeletePopup(false)
        setStatus({ type: "success" });
            setTimeout(() => {
        setStatus(undefined);

              getUsersApi();
            }, 1000);
          })
          .catch((err) => {
            setShowDeletePopup(false)

            setStatus({ type: "error",message: err.response.data.message });
            console.error("get /usres error", err.message);
          });
    
   }

    useEffect(()=>{
      getPermissions()
    },[])

    const columns = [
        {
          Header: 'Name',
          accessor: 'name'
        },
        {
          Header: 'Email',
          accessor: 'email'
        },
        {
          Header: 'Organization Name',
          accessor: 'org_name'
        },
     
        {
          Header: 'Actions',
          sortable: false,
          cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
          Cell: (data) => {
            return (
              <div className="flex justify-evenly"> 
         {permissions.view &&   <Link href={`/user/view/${data.row.original.id}`}>
                <p>
                  <i className="icon-eye text-1xl font-bold mb-2"></i>
                </p>
            </Link>}
          {permissions.delete &&  <p
            style={{
  
              cursor: "pointer",
              lineHeight: "normal",
            }}
            onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
            </p>}   
            {
              permissions.update &&  <Link href={`/user/update/${data.row.original.id}`}>
              <p>
                <i className="icon-note text-1xl font-bold mb-2"></i>
              </p>
          </Link>
            }  
            {
              permissions.setRole &&  <Link href={`/user/setRole/${data.row.original.id}`}>
              <p>
                <i className="icon-refresh text-1xl font-bold mb-2"></i>
              </p>
          </Link>
            }
              
    
            </div>
            )
          }
    
        }
      ]
      return (
        <Layout>
        {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}
     <SectionTitle title="User Management" subtitle="" />
     {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Deleted user successfully', 'Success')}
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
        {permissions.add && <div className="w-1/6 ">
        {" "}
        <Link href={`/user/addUser`}>
            <button
              className="ml-3  btn btn-default btn-indigo create-btn w-full"
              type="button"
            >
              Add User
            </button>
        </Link>
      </div>}
        
      </div>
        <Datatable columns={columns} data={
          userData?.filter((val) => {
            if (searchQuery == "") {
              return val;
            } else if (
             (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.email?.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.org_name?.toLowerCase().includes(searchQuery.toLocaleLowerCase())) 
            ) {
              return val;
            }
          })
          .map((value, idx) => {return value})} customclassName="usertableList" />
        </Layout>
        )
}

export default withRedux(User)
