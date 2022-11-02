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



const User=()=>{
    const [userData,setUserData]=React.useState([]);
    
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
          console.error("get /fetchUsers error", err);
        });
   }

   const deleteUserApi=(id)=>{
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token');
      const answer = window.confirm("are you sure?");
      if (answer) {
        ax.delete(`/users/${id}`, {headers: {
          'Authorization': `Bearer ${token}`
         }})
          .then((res) => {
            setTimeout(() => {
              getUsersApi();
            }, 1000);
          })
          .catch((err) => {
            console.error("get /usres error", err.message);
          });
      } else {
        console.log("Thing was not saved to the database.");
      }
    }
   }

  


    useEffect(()=>{
      getUsersApi()
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
          Header: 'Organization id',
          accessor: 'organization_id'
        },
        {
          Header: 'Actions',
          sortable: false,
          cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
          Cell: (data) => {
            console.log('row', data.row);
            return (<div className="flex justify-evenly"> <Link href={`/user/view/${data.row.original.id}`}>
                <p>
                  <i className="icon-eye text-1xl font-bold mb-2"></i>
                </p>
            </Link> <p
              style={{
    
                cursor: "pointer",
                lineHeight: "normal",
              }}
              onClick={() => deleteUserApi(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
              </p>
              <Link href={`/user/update/${data.row.original.id}`}>
                  <p>
                    <i className="icon-note text-1xl font-bold mb-2"></i>
                  </p>
              </Link>
              <Link href={`/user/setRole/${data.row.original.id}`}>
                  <p>
                    <i className="icon-refresh text-1xl font-bold mb-2"></i>
                  </p>
              </Link>
    
            </div>
            )
          }
    
        }
      ]
      return (
        <Layout>
     <SectionTitle title="User Management" subtitle="" />

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
          <Link href={`/user/addUser`}>
              <button
                className="ml-3  btn btn-default btn-indigo create-btn w-full"
                type="button"
              >
                Add User
              </button>
          </Link>
        </div>
      </div>
        <Datatable columns={columns} data={userData} customclassName="usertableList" />
        </Layout>
        )
}

export default withRedux(User)
