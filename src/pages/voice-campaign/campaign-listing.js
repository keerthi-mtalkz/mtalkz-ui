import React from 'react'
import SectionTitle from "../../components/section-title";
import Link from "next/link";
import {ax} from "../../utils/apiCalls";
import {withRedux} from '../../lib/redux'
import Datatable from "../../components/datatable";
import ConfirmationModal from "../../components/confirmationmodal"

const CampaignListing = () => {
  const [campaign,setCampaign]=React.useState([])
  const [deleteId,setDeleteId]=React.useState(undefined)
  const [status, setStatus] = React.useState(undefined);
  const [showDeletePopup,setShowDeletePopup]=React.useState(false)

  const getListofcampaign=async ()=>{
    const token = localStorage.getItem('token');
    await ax
      .get("/voice-campaigns", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setCampaign(res.data)
      })
      .catch((err) => {
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
    deleteCampaignApi()
   }
   const deleteCampaignApi=()=>{
 
    const token = localStorage.getItem('token');

      ax.delete(`/voice-campaigns/${deleteId}`, {headers: {
        'Authorization': `Bearer ${token}`
       }})
        .then((res) => {
          setShowDeletePopup(false)
      setStatus({ type: "success" });
          setTimeout(() => {
      setStatus(undefined);

      getListofcampaign();
          }, 1000);
        })
        .catch((err) => {
          setShowDeletePopup(false)

          setStatus({ type: "error",message: err.response.data.message });
          console.error("get /usres error", err.message);
        });
  
 }

  const columns = [
    {
      Header: 'NAME',
      accessor: 'name'
    },
    {
      Header: 'CREATED ON',
      accessor: 'created_at'
    },
    {
      Header: 'STATUS',
      sortable: false,
      Cell: (data) => {
        return (
          <div className="flex justify-evenly"> 
     { 
            <p>
             {data.row.original.listed==0? "Under Review":"Listed"}
            </p>
      }
        </div>
        )
      }

    },
    {
      Header: 'Actions',
      sortable: false,
      cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
      Cell: (data) => {
        return (
          <div className="flex justify-evenly"> 
      <Link href={`/user/view/${data.row.original.id}`}>
            <p>
              <i className="icon-eye text-1xl font-bold mb-2"></i>
            </p>
        </Link>
       <p
        style={{

          cursor: "pointer",
          lineHeight: "normal",
        }}
        onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
        </p>
        </div>
        )
      }

    }
  ]

  React.useEffect(()=>{
    getListofcampaign()
  },[])



  return (
    <div>
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}
    {status?.type === "success" && (
     <div className="flex flex-wrap w-full">
     <div className="p-2">
     { NotificationManager.success('Deleted Campaign successfully', 'Success')}
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
    <SectionTitle title="Campaign Listing" subtitle="" />
    </div>

  <div className="w-1/6  mt-18">
  <Link href={{ pathname: '/voice-campaign/addUpdateCampaign' }} >
  <button
  className=" btn btn-default btn-indigo create-btn w-full"
  type="button"
>
  Add New
</button>
  </Link>
</div>
  </div>
  <Datatable columns={columns} data={
    campaign} customclassName="usertableList" />
      
    </div>
  )
}

export default withRedux(CampaignListing) 
