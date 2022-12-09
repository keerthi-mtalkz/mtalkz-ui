import React from 'react'
import { withRedux } from '../../lib/redux'
import SectionTitle from "../../components/section-title";
import Link from "next/link";
import { ax } from "../../utils/apiCalls";
import Datatable from "../../components/datatable";
import moment from 'moment';
import ConfirmationModal from "../../components/confirmationmodal"
import { NotificationManager } from 'react-notifications'

const Recordings = () => {
  const [recordings, setRecordings] = React.useState([])
  const [deleteId, setDeleteId] = React.useState(undefined)
  const [showDeletePopup, setShowDeletePopup] = React.useState(false)
  const [status, setStatus] = React.useState(undefined);
  const [searchQuery, setSearchQuery] = React.useState("");

  const getListofRecordings = async () => {
    const token = sessionStorage.getItem('token');
    await ax
      .get("/voice-recordings", {
        headers: {
          'Authorization': `Bearer ${token}`,

        }
      })
      .then((res) => {
        setRecordings(res.data)
      })
      .catch((err) => {
      });
  }
  React.useEffect(() => {
    getListofRecordings()
  }, [])

  const ConfirmationPopup = (id) => {
    setDeleteId(id)
    setShowDeletePopup(true)
  }

  const onCancel = () => {
    setStatus(undefined)
    setShowDeletePopup(false)

  }

  const onSubmit = () => {
    deleteRecordingApi()
  }

  const deleteRecordingApi = () => {

    const token = sessionStorage.getItem('token');

    ax.delete(`/voice-recordings/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setShowDeletePopup(false)
        setStatus({ type: "success" });
        setTimeout(() => {
          setStatus(undefined);
          getListofRecordings();
        }, 1000);
      })
      .catch((err) => {
        setShowDeletePopup(false)

        setStatus({ type: "error", message: err.response.data.message });
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
      Header: 'PLAYBACK',
      sortable: false,
      cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
      Cell: (data) => {
        return (
          <audio controls>
            <source src={data.row.original.url} type="audio/ogg"></source>
          </audio>
        )
      }

    },
    {
      Header: 'Actions',
      sortable: false,
      cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
      Cell: (data) => {
        return (
          <div className="flex ">
            {<p
              style={{

                cursor: "pointer",
                lineHeight: "normal",
              }}
              onClick={() => ConfirmationPopup(data.row.original.id)}><i className="icon-trash mr-5 text-1xl font-bold mb-2"></i>
            </p>}
            {
              <Link href={`/voice-campaign/updateRecording/${data.row.original.id}`}>
                <p>
                  <i className="icon-note text-1xl font-bold mb-2"></i>
                </p>
              </Link>
            }
          </div>
        )
      }

    }
  ]

  return (
    <div>
      {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Deleted Recording successfully', 'Success')}
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

      <SectionTitle title="Voice Recordings" subtitle="" />

      <div className="flex flex-row pb-4">
        <div className="pr-4 w-5/6">
          <input
            type="text"
            name="search"
            className="w-full p-2 ..."
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
        </div>

        <div className="w-1/6 mt-18">
          <Link href={`/voice-campaign/addRecording`}>
            <button className=" btn btn-default btn-indigo create-btn w-full" type="button">
              Add New
            </button>
          </Link>
        </div>

      </div>
      <Datatable columns={columns} data={
        searchQuery.trim().length ? recordings.filter(val => val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase().trim())) : recordings} customclassName="usertableList" />
    </div>

  )
}

export default withRedux(Recordings)
