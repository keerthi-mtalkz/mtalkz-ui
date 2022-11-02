import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import { useForm } from "react-hook-form";
import React from "react";
import SectionTitle from "../../components/section-title";


const Channel=()=>{
 const [channels,setChannels]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");
 const { register, handleSubmit, watch, errors } = useForm();


  const getChannels = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/channels", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setChannels(res.data);
      })
      .catch((err) => {
        setStatus({ type: "error", err });
        console.error("get /channels error", err);
      });
  };


  React.useEffect(() => {
    getChannels();
  }, []);

     const deleteChannels = (id) => {
  if (typeof window !== "undefined") {
  const token = localStorage.getItem('token');
  const answer = window.confirm("are you sure?");
  if (answer) {
    ax.delete(`/channels/${id}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
        setTimeout(() => {
            getChannels();
        }, 1000);
      })
      .catch((err) => {
        console.error("get /channels error", err.message);
        setStatus({ type: "error", err });
      });
  } else {
    console.log("Thing was not saved to the database.");
  }
}
};


  const columns =  [
    {
      Header: 'ID',
      accessor: 'id'
    },
      {
        Header: 'Slug',
        accessor: 'slug'
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Actions',
        sortable: false,
        cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
        Cell: (data) => {
       
        return (<div className="flex justify-evenly"> <Link href={`/channel/view/${data.row.original.id}`}>
          <p>
            <i className="icon-eye text-1xl font-bold mb-2"></i>
          </p>
      </Link> <p
        style={{
         
          cursor: "pointer",
          lineHeight: "normal",
        }}
        onClick={() => deleteChannels(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
</p>
<Link href={`/channel/update/${data.row.original.id}`}>
                      <p>
                        <i className="icon-note text-1xl font-bold mb-2"></i>
                      </p>
                  </Link>
</div>
        )}
       
      }
    ]
  return (
    <Layout>
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Deleted Channel successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.error(errors, 'Error')}
         
        </div>
      </div>
      )}
     <SectionTitle title="Channel Management" subtitle="" />

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
        <Link href={`/channel/addChannel`}>
            <button
              className="ml-3  btn btn-default btn-indigo create-btn w-full"
              type="button"
            >
              Add Channel
            </button>
        </Link>
      </div>
    </div>
    <Datatable columns={columns} data={channels} />
    </Layout>
    )
}

export default withRedux(Channel)
