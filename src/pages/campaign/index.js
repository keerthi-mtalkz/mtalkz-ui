import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { Badge } from '../../components/badges';
import ConfirmationModal from "../../components/confirmationmodal";
import Datatable from "../../components/datatable";
import SectionTitle from '../../components/section-title';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import * as Icon from 'react-feather'
import CampaignModal from "../../components/campaignsModal"
import { createFlow } from "./sms/helper";
import { useRouter } from "next/router";

const Campaign = () => {
  const router = useRouter();
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");
 const [deleteId, setDeleteId] = React.useState(undefined)
  const [showDeletePopup, setShowDeletePopup] = React.useState(false)
  const [campaigns,setCampaigns] = React.useState([])
const [showCampaignPopup,setShowCampaignPopup] = React.useState(false)
 const getCampaigns = async() =>{
  const token = localStorage.getItem('token');
 fetch("http://20.193.136.151:5000/campaigns/",{
  method:"GET",
  headers: {
    "Content-Type": 'application/json',
    'Accept': 'application/json',
    'x-api-key': `${token}`
  }
 }).then((res)=>{
  return res.json()
  
 }).then((response)=>{
  setCampaigns(response)
 })
 .catch((err)=>{
 })
}

useEffect(()=>{
  getCampaigns()
},[])

const ConfirmationPopup = (id) => {
  setDeleteId(id)
  setShowDeletePopup(true)
}

const onCancel = () => {
  setStatus(undefined)
  setShowDeletePopup(false)
}

const onSubmit = () => {
  handleDelete()
}



const handleDelete = () => {
  const token = localStorage.getItem('token');
  fetch(`http://20.193.136.151:5000/campaigns/${deleteId}`,{
    method:"DELETE",
    headers: {"x-api-key": token,
    'Content-type': 'application/json',
    'Accept': 'application/json',
}
  })
      .then((res) => {
        setStatus({ type: "success" });
        setStatus(undefined)
        setShowDeletePopup(false)
        getCampaigns()

    })
      .catch((err) => {
        setShowDeletePopup(false)
        if(err?.response){
          setStatus({ type: "error",message: err.response.data.error });
        }
           
      });

}

const columns = [
  {
    Header: 'NAME',
    Cell: (data) => {
      return (<div className="flex  ">
      <div>
      {data.row.original.name}
      <div className="flex mt-2 mb-2 items-center"> <Icon.MessageSquare style={{marginRight:"2px"}} size={15}  />  {data.row.original.channel}</div>
      {data.row.original.tags.map(tag =>{
        return (
         <span className=" p-1">

          <Badge   size={'default'} color={"blue"} rounded>
          {tag }
        </Badge>
        </span>
        )
      })}
      </div>
      </div>)
    }
  },
  {
    Header: 'CREATED ON',
    Cell: (data) => {
      return (
        <div className="flex  " style={{color:"grey"}}>
        {new Date(data.row.original.created_at).toLocaleDateString('en-HI', {dateStyle: 'long'})},
        {new Date(data.row.original.created_at).toLocaleTimeString('en-HI', {timeStyle: 'short'})}
      </div>)}
  },
  {
    Header: 'SENT ON',
    Cell: (data) => {
      return (
      <div className="flex  " style={{color:"grey"}}>
        {data.row.original.updated_at && new Date(data.row.original.updated_at).toLocaleDateString('en-HI', {dateStyle: 'long'})},
        { data.row.original.updated_at && new Date(data.row.original.updated_at).toLocaleTimeString('en-HI', {timeStyle: 'short'})}
     </div>)}
  },
  {
    Header: 'STATUS',
    Cell: (data) => {
      return (
      <div className="flex  " style={{color:"grey"}}>
         
          <Badge  color={data.row.original.executed_at?"grey ":"green"} alt size="default" rounded>
     {data.row.original.executed_at ? "sent" : "unsent"}
   </Badge>
        
     </div>)}
  },
  {
    Header: 'Actions',
    sortable: false,
    cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
    Cell: (data) => {
      return (<div className="flex justify-evenly">
      { <Link href={`/`}>
      <p>
      <Icon.Copy size={15} />
      </p>
    </Link>}
    { <Link href={`/`}>
    <p>
    <Icon.Send size={15} />
    </p>
  </Link>}
        {<p
          style={{

            cursor: "pointer",
            lineHeight: "normal",
          }}
          onClick={() => ConfirmationPopup(data.row.original.campaign_id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
        </p>}
        { <Link href={`/`}>
          <p>
            <i className="icon-note text-1xl font-bold mb-2"></i>
          </p>
        </Link>}
       
      </div>
      )
    }

  }
]

  return (
    <Layout>
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}
    {showCampaignPopup && <CampaignModal onCancel={()=>{setShowCampaignPopup(false)}} onSelect={(selectedItem)=>{
        createFlow.channel=selectedItem;
        if(selectedItem=="sms")
        {
          router.push("/campaign/sms");
        }
      
      console.log(selectedItem,"selectedItem");setShowCampaignPopup(false)}}></CampaignModal>}
      <div className="flex flex-row pb-4">
      <SectionTitle title="Campaigns" subtitle="" />
      </div>
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
        
            <button
              className="ml-3  btn btn-default btn-indigo create-btn w-full"
              type="button"
              onClick={()=>{setShowCampaignPopup(true)}}
            >
              Create Campaign
            </button>

        </div>
      </div>
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Deleted ApiKey successfully', 'Success')}
          </div>
        </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.error(status.message, 'Error')}

          </div>
        </div>
      )}
      <Datatable columns={columns} data={campaigns?.filter((val) => {
        if (searchQuery == "") {
          return val;
        } else if (
          (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) 
          )
        ) {
          return val;
        }
      })
        .map((value, idx) => { return value })} />
    </Layout>
  )
}

export default withRedux(Campaign)
