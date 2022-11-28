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
import ConfirmationModal from "../../components/confirmationmodal"


const Channel=()=>{
 const [channels,setChannels]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");
 const { register, handleSubmit, watch, errors } = useForm();
 const [deleteId,setDeleteId]=React.useState(undefined)
 const [showDeletePopup,setShowDeletePopup]=React.useState(false)

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
        setStatus({ type: "error",message: err.response.data.message });
      });
  };


  React.useEffect(() => {
    
    getChannels();
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
    deleteChannels()
   }

     const deleteChannels = () => {
  
  const token = localStorage.getItem('token');

    ax.delete(`/channels/${deleteId}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setShowDeletePopup(false)
        setStatus({ type: "success" });
        setTimeout(() => {
          setStatus(undefined)
            getChannels();
        }, 1000);
      })
      .catch((err) => {
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
        Header: 'Actions',
        sortable: false,
        cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
        Cell: (data) => {
       
        return (<div className="flex justify-evenly"> 
        
       <p
        style={{
         
          cursor: "pointer",
          lineHeight: "normal",
        }}
        onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
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
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

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
        { NotificationManager.error(status.message, 'Error')}
         
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
    <Datatable columns={columns}  data={channels?.filter((val) => {
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

export default withRedux(Channel)
