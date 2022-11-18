import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import SectionTitle from '../../components/section-title'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import React from "react";
import {NotificationManager} from 'react-notifications'




const Organization=()=>{
 const [organizations,setOrganizations]=useState([])
 const [status, setStatus] = React.useState(undefined);
 const [searchQuery, setSearchQuery] = React.useState("");

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


  React.useEffect(() => {
   NotificationManager.removeAll()
    getOrganizations();
  }, []);

  const deleteOrganization = (id) => {
    if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    const answer = window.confirm("are you sure?");
    if (answer) {
      ax.delete(`/organizations/${id}`, {headers: {
        'Authorization': `Bearer ${token}`
       }})
        .then((res) => {
          setStatus({ type: "success" });
          setTimeout(() => {
            getOrganizations();
          }, 1000);
        })
        .catch((err) => {
          console.error("get /Integrations error", err.message);
          setStatus({ type: "error",message: err.response.data.message });
        });
    } else {
      console.log("Thing was not saved to the database.");
    }
  }
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
       
        return (<div className="flex justify-evenly"> <Link href={`/organization/view/${data.row.original.id}`}>
          <p>
            <i className="icon-eye text-1xl font-bold mb-2"></i>
          </p>
      </Link> <p
        style={{
         
          cursor: "pointer",
          lineHeight: "normal",
        }}
        onClick={() => deleteOrganization(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>
<Link href={`/organization/update/${data.row.original.id}`}>
                      <p>
                        <i className="icon-note text-1xl font-bold mb-2"></i>
                      </p>
                  </Link>

</div>
        )}
       
      }
    ]
  //const data = React.useMemo(() => countries, [])
  return (
    <Layout>
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
      <Link href={`/organization/addOrganization`}>
          <button
            className="ml-3  btn btn-default btn-indigo create-btn w-full"
            type="button"
          >
            Add Organization
          </button>
      </Link>
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
