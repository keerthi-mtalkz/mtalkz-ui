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



const Role=()=>{
    const [roleData,setRoleData]=React.useState([]);
    const [permissions,setPermissions]=React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const [status, setStatus] = React.useState(undefined);

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
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      const answer = window.confirm("are you sure?");
      if (answer) {
        ax.delete(`/roles/${id}`, {headers: {
          'Authorization': `Bearer ${token}`
         }})
          .then((res) => {
          setStatus({ type: "success" });
            setTimeout(() => {
              getRolesApi();
            }, 1000);
          })
          .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });
            console.error("get /roles error", err.message);
          });
      } else {

        console.log("Thing was not saved to the database.");
      }
    }
   }

   const getPermissions=async()=>{
    const token= localStorage.getItem("token");
      await ax
        .get("/permissions", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
        let permission=  res.data.filter((permission) => permission.route=="users.role.set");
        setPermissions(permission.length>0?true:false)
        })
        .catch((err) => {
          setStatus({ type: "error",message: err.response.data.message });
          console.error("get /getRoleDetails error", err);
        });
   }


    useEffect(()=>{
      getPermissions();
      getRolesApi()
    },[])

    const columns = [
      {
        Header: 'ID',
        accessor: 'id'
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
          Header: 'Organization id',
          accessor: 'organization_id'
        },
        {
          Header: 'Actions',
          sortable: false,
          cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
          Cell: (data) => {
            return (<div className="flex justify-evenly"> <Link href={`/role/view/${data.row.original.id}`}>
              <a>
                <p>
                  <i className="icon-eye text-1xl font-bold mb-2"></i>
                </p>
              </a>
            </Link> <p
              style={{
    
                cursor: "pointer",
                lineHeight: "normal",
              }}
              onClick={() => deleteRoleApi(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
              </p>
              <Link href={`/role/update/${data.row.original.id}`}>
                <a>
                  <p>
                    <i className="icon-note text-1xl font-bold mb-2"></i>
                  </p>
                </a>
              </Link>
          
    
            </div>
            )
          }
    
        }
      ]
      return (
        <Layout>
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
        <div className="w-1/6 ">
          {" "}
          <Link href={`/role/addRole`}>
          <button
          className="ml-3  btn btn-default btn-indigo create-btn w-full"
          type="button"
        >
          Add Role
        </button>
          </Link>
        </div>
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
