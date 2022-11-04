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



const Role=()=>{
    const [roleData,setRoleData]=React.useState([]);
    const [apiRes,setApiRes]=React.useState("")
     const getRolesApi=async()=>{
    const token= localStorage.getItem("token");
      await ax
        .get("/roles", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          setApiRes("success")
          setRoleData(res.data)
        })
        .catch((err) => {
          setApiRes("failure")
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
            setTimeout(() => {
              getRolesApi();
          setApiRes("success")

            }, 1000);
          })
          .catch((err) => {
          setApiRes("failure")

            console.error("get /roles error", err.message);
          });
      } else {
        console.log("Thing was not saved to the database.");
      }
    }
   }

  


    useEffect(()=>{
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
              <Link href={`/role/setRole/${data.row.original.id}`}>
                <a>
                  <p>
                    <i className="icon-refresh text-1xl font-bold mb-2"></i>
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
        <div className="flex flex-row pb-4">
        <div className=" w-5/6">
          <input
            type="text"
            name="search"
            className="w-full p-2 ..."
            onChange={(e) =>{}}
            placeholder="Search..."
          />
        </div>
        <div className="w-1/6 ">
          {" "}
          <Link href={`/role/addRole`}>
            <a>
              <button
                className="ml-3  btn btn-default btn-blue create-btn w-full"
                type="button"
              >
                Create Role
              </button>
            </a>
          </Link>
        </div>
      </div>
        <Datatable columns={columns} data={roleData} customclassName="usertableList" />
        </Layout>
        )
}

export default withRedux(Role)
