import React from "react";
import { NotificationManager } from 'react-notifications';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import Breadcrumb from '../../components/breadcrumbs';
import Datatable from "../../components/datatable";
import axios from "axios";
import { useRouter } from "next/router";
import {Badge} from '../../components/badges'
import ConfirmationModal from "../../components/confirmationmodal"
import {ax} from "../../utils/apiCalls";

const ViewList = () => {
  const router = useRouter();
  const [status, setStatus] = React.useState(undefined);
  const [showDeletePopup,setShowDeletePopup]=React.useState(false)
  const [deleteId,setDeleteId]=React.useState(undefined)

  const items2 = [
    {title: 'List & Segments', url: '/listSegments', last: false},
  ]
  const [data,setData] = React.useState(undefined);

  const ConfirmationPopup=(data)=>{
    console.log(data.customer_id,"data.customer_iddata.customer_id")
    setDeleteId(data.customer_id)
    setShowDeletePopup(true)
   }

   const onCancel=()=>{
  setStatus(undefined)
    setShowDeletePopup(false)

   }

   const onSubmit=()=>{
    deleteCustomerApi()
   }

   const deleteCustomerApi=()=>{
    const token = localStorage.getItem('token');
      ax.delete(`http://20.193.136.151:5000/customers/${deleteId}`,
      {headers: {
        'x-api-key': ` ${token}`
       }}
      )
        .then((res) => {
          setShowDeletePopup(false)
        setStatus({ type: "success" });
          setTimeout(() => {
        setStatus(undefined);
        getListDetails();
          }, 1000);
        })
        .catch((err) => {
          setShowDeletePopup(false)
        setStatus({ type: "error",message: err.response.data.message });
          console.error("get /roles error", err.message);
        });
  
 }

  const getListDetails=()=>{
  const token = localStorage.getItem('token');
    axios({
        method: 'get',
        url: `http://20.193.136.151:5000/lists/${router.query.listId}`,
        headers:{
          "x-api-key": `Bearer ${token}`,
        }
      }).then((response)=>{
        console.log(response.data)
        setData(response.data)
      }).catch((error)=>{
        setStatus({ type: "error",message: error.response.data.error });
      })
  }

  React.useEffect(()=>{
    getListDetails()
  },[])

  const navigateCustomer = (customer_id)=>{
    router.push({pathname:"/listSegments/customer360",query:{customerId:customer_id}});

  }

  const columns =  [
    {
      Header: 'Profile',
      Cell:(data)=>{
        return (
          <div className="font-semibold" style={{color: "blue"}}>{data.row.original.customer_id}</div>
          )}
    },
    {
      Header: 'Added',
      sortable:true,
          Cell:(data)=>{
            return (<div className="flex  ">
            {  (new Date(data.row.original.created_at)).toLocaleString('en-HI', {dateStyle: 'medium', timeStyle: 'short'})}
             </div>)}
    },
    {
      Header: 'Last Modifies On',
      sortable:true,
          Cell:(data)=>{
            return (
              <div className="flex  ">
           {data.row.original.updated_at ?<span>{(new Date(data.row.original.updated_at)).toLocaleString('en-HI', {dateStyle: 'medium', timeStyle: 'short'})}
           </span>:'-'}
             </div>)}
    },
    {
      Header: 'Actions',
      sortable: false,
      cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
      Cell: (data) => {
        return (
          <div className="flex justify-evenly"> 
     {<div onClick={()=>{navigateCustomer(data.row.original.customer_id)}}>
            <p>
              <i className="icon-eye text-1xl font-bold mb-2"></i>
            </p>
        </div>}
      { <p
        style={{
          cursor: "pointer",
          lineHeight: "normal",
        }}
        onClick={() => ConfirmationPopup(data.row.original)}><i className="icon-trash text-1xl font-bold mb-2"></i>
        </p>}   
        {
           <div onClick={()=>{
            router.push(`/listSegments/updateCustomerID/${data.row.original.customer_id}`)
           }}>
          <p>
            <i className="icon-note text-1xl font-bold mb-2"></i>
          </p>
      </div>
        }  
        </div>
        )
      }

    }

  ]

  return (
    <Layout className="overflow-x-scroll">
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.error(status.message, 'Error')}
          </div>
        </div>
      )}
      <div className="w-full">
      <div className='flex text-center'>
      <div >
        <Breadcrumb items={items2} />
      </div>
      <div style={{ marginTop: "-5px" }} className='font-bold mb-1 p-1 text-lg'>{ router.query.name}</div>
    </div>
    <div className="flex">
    {
      data && data.tags && data.tags.map((item,index)=>{
        return  <div key={index} style={{marginRight:"10px", display:"flex"}}>
        <Badge  size={'default'} color="blue" rounded >
        {item }
      </Badge>
        </div>
      })
    }
    </div>
    <div className="mt-2">{data?.description}</div>
       <div className=" mt-2 mb-2" style={{background:"lightgrey",height:"2px"}}></div>
       <div>{data?.members?.length} Members</div>
      </div>
     {data &&  <Datatable columns={columns}  data={data.members}  ></Datatable> }
    </Layout>
  )
}

export default withRedux(ViewList)
