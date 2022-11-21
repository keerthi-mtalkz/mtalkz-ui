import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import SectionTitle from '../../components/section-title'
import Datatable from "../../components/datatable";
import {USER_COLUMN_HEADERS} from "../../utils/columns"
import { useEffect } from 'react';
import { getUsers } from '../../utils/apiCalls';
import Link from "next/link";
import {ax} from "../../utils/apiCalls"
import React from "react";
import {NotificationManager} from 'react-notifications'
import ConfirmationModal from "../../components/confirmationmodal"



const Role=()=>{
    const [roleData,setRoleData]=React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [permissions,setPermissions]=React.useState({get:false,update:false,delete:false,view:false,setRole:false})
    const [deleteId,setDeleteId]=React.useState(undefined)
    const [showDeletePopup,setShowDeletePopup]=React.useState(false)


    const [status, setStatus] = React.useState(undefined);


    const ConfirmationPopup=(id)=>{
      setDeleteId(id)
      setShowDeletePopup(true)
     }
  
     const onCancel=()=>{
    setStatus(undefined)
      setShowDeletePopup(false)
  
     }
  
     const onSubmit=()=>{
      deleteRoleApi()
     }
     const getRolesApi=async()=>{
    const token= localStorage.getItem("token");
      await ax
        .get("/roles", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          setRoleData(res.data)
        })
        .catch((err) => {
          console.error("get /getRoleDetails error", err);
        });
   }

   const deleteRoleApi=(id)=>{
      const token = localStorage.getItem('token');

        ax.delete(`/roles/${deleteId}`, {headers: {
          'Authorization': `Bearer ${token}`
         }})
          .then((res) => {
            setShowDeletePopup(false)
          setStatus({ type: "success" });
            setTimeout(() => {
          setStatus(undefined);
              getRolesApi();
            }, 1000);
          })
          .catch((err) => {
            setShowDeletePopup(false)

          setStatus({ type: "error",message: err.response.data.message });
            console.error("get /roles error", err.message);
          });
    
   }

   const getPermissions = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/permissions", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        let permissions={get:false,update:false,delete:false,view:false,add:false}
        res.data.map((permission)=>{
        if(permission.route == "roles.index"){
          permissions["get"] = true;
        } else if(permission.route == "roles.update"){
          permissions["update"] = true;
        }else if(permission.route == "roles.destroy"){
          permissions["delete"] = true;
        }else if(permission.route == "roles.show"){
          permissions["view"] = true;
        }else if(permission.route == "roles.store"){
          permissions["add"] = true;
        }
        })
        setPermissions({...permissions})
      })
      .catch((err) => {
        console.error("get /permissions error", err);
      });
  };
    


    useEffect(()=>{
      
      getPermissions();
      getRolesApi()
    },[])

    const columns = [
        {
          Header: 'Name',
          accessor: 'name'
        },
        {
          Header: 'Description',
          accessor: 'description'
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
            return (<div className="flex justify-evenly">
          {permissions.view &&  <Link href={`/role/view/${data.row.original.id}`}>
          <a>
            <p>
              <i className="icon-eye text-1xl font-bold mb-2"></i>
            </p>
          </a>
        </Link>  }  
        {permissions.delete &&    <p
          style={{

            cursor: "pointer",
            lineHeight: "normal",
          }}
          onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
          </p>}
          {permissions.update &&  <Link href={`/role/update/${data.row.original.id}`}>
          <a>
            <p>
              <i className="icon-note text-1xl font-bold mb-2"></i>
            </p>
          </a>
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

     <SectionTitle title="Role Management" subtitle="" />
     {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Deleted Role successfully', 'Success')}
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
      { permissions.add &&  <div className="w-1/6 ">
      {" "}
      <Link href={`/role/addRole`}>
      <button
      className="ml-3  btn btn-default btn-indigo create-btn w-full"
      type="button"
    >
      Add Role
    </button>
      </Link>
    </div>}  
      </div>
        <Datatable columns={columns} data={roleData?.filter((val) => {
          if (searchQuery == "") {
            return val;
          } else if (
           (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())) 
          ) {
            return val;
          }
        })
        .map((value, idx) => {return value})} customclassName="usertableList" />
        </Layout>
        )
}

export default withRedux(Role)
