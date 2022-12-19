import React from 'react'
import SectionTitle from "../../components/section-title";
import Link from "next/link";
import { ax } from "../../utils/apiCalls";
import {SLACK_MESG_CONTENT} from "../../utils/constants"
import { withRedux } from '../../lib/redux'
import Datatable from "../../components/datatable";
import ConfirmationModal from "../../components/confirmationmodal"
import moment from 'moment';
import { NotificationManager } from 'react-notifications'
import { Badge } from '../../components/badges'
import { useSelector, shallowEqual } from 'react-redux'
import * as Icon from 'react-feather'
import { useRouter } from "next/router";

const CampaignListing = () => {
  const router = useRouter();

  const [campaign, setCampaign] = React.useState([])
  const [deleteId, setDeleteId] = React.useState(undefined)
  const [status, setStatus] = React.useState(undefined);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showDeletePopup, setShowDeletePopup] = React.useState(false)
  const { user } = useSelector(
    state => ({
      user: state.user
    }),
    shallowEqual
  )

  console.log(user, "user")
  const getListofcampaign = async () => {
    const token = sessionStorage.getItem('token');
    await ax
      .get("/voice-campaigns", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        setCampaign(res.data)
      })
      .catch((err) => {
      });
  }

  const ConfirmationPopup = (id) => {
    setDeleteId(id)
    setShowDeletePopup(true)
  }

  const onCancel = () => {
    setStatus(undefined)
    setShowDeletePopup(false)

  }


  const onSubmit = () => {
    deleteCampaignApi()
  }
  const deleteCampaignApi = () => {

    const token = sessionStorage.getItem('token');

    ax.delete(`/voice-campaigns/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setShowDeletePopup(false)
        setStatus({ type: "success", message: "Deleted Successfully" });
        setTimeout(() => {
          setStatus(undefined);

          getListofcampaign();
        }, 1000);
      })
      .catch((err) => {
        setShowDeletePopup(false)

        setStatus({ type: "error", message: err.response.data.message });
        console.error("get /usres error", err.message);
      });

  }

  const stopCampaign=(name)=>{
    SLACK_MESG_CONTENT.blocks[2].text.text=`• Organisation: *mTalkz Mobility Services (P) LTD.* \n • Campaign Name:  *${name}*`
    fetch("https://mtalkz.cloud/postslack",{
      method:"POST",
      body: JSON.stringify(SLACK_MESG_CONTENT),
      headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
  }
    })
        .then((res) => {
          
      })
        .catch((err) => {
         
             
        });
  
  
  }
  const columns = [
    {
      Header: 'NAME',
      accessor: 'name'
    },
    {
      Header: 'CREATED ON',
      sortable: false,
      Cell: (data) => {
        return (
          <div className="flex">
            {
              <p>
                {moment(data.row.original.created_at).format("DD/MM/YYYY, hh:mm:ss A")}
              </p>
            }
          </div>
        )
      }


    },
    {
      Header: 'STATUS',
      sortable: false,
      Cell: (data) => {
        return (
          <div className="flex ">
            {
              data.row.original.listed ?
                <Badge size="default" color="green" rounded>Listed</Badge>
                :
                <Badge size="default" color="yellow" rounded>Under Review</Badge>
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
          <div className="flex">
            <Link href={{ pathname: '/voice-campaign/addUpdateCampaign', query: { campaignId: `${data.row.original.id}`, view: `1` } }}>
              <p>
                <i className="icon-eye  mr-5 text-1xl font-bold mb-2"></i>
              </p>
            </Link>
            {!data.row.original.listed ?
              <>
                <p style={{
                    cursor: "pointer",
                    lineHeight: "normal",
                  }}
                  onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash mr-5 text-1xl font-bold mb-2"></i>
                </p>
                <Link href={{ pathname: '/voice-campaign/addUpdateCampaign', query: { campaignId: `${data.row.original.id}` } }}>
                  <p>
                    <i className="icon-note text-1xl font-bold mb-2"></i>
                  </p>
                </Link>
                {user.is_system_user == 1 && <p className="ml-4"><Icon.ThumbsUp  size={20} onClick={()=>{router.push({pathname:"/voice-campaign/approveList", query:{approveListId:data.row.original.id}}) }}/></p>}
              </>:
              <>
              <p style={{
                cursor: "pointer",
                lineHeight: "normal",
              }}
              onClick={() => stopCampaign(data.row.original.name)}><Icon.StopCircle color='red' size={20} ></Icon.StopCircle>
            </p>
              </>
            }
          </div>
        )
      }

    },
  ]

  React.useEffect(() => {
    getListofcampaign()
  }, [])



  return (
    <div>
      {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}
      <SectionTitle title="Campaign Listing" subtitle="" />

      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success(status.message, 'Success')}
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
        {<div className="w-1/6 ">
          {" "}
          <Link href={{ pathname: '/voice-campaign/addUpdateCampaign' }}>
            <button
              className="ml-3  btn btn-default btn-indigo create-btn w-full"
              type="button"
            >
              Add New
            </button>
          </Link>
        </div>}

      </div>
      <Datatable columns={columns} data={
        campaign?.filter((val) => {
          if (searchQuery == "") {
            return val;
          } else if (
            (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
          ) {
            return val;
          }
        })
          .map((value, idx) => { return value })} customclassName="usertableList" />

    </div>
  )
}

export default withRedux(CampaignListing) 