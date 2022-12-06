import React from 'react'
import {withRedux} from '../../lib/redux'
import SectionTitle from "../../components/section-title";
import Link from "next/link";
import {ax} from "../../utils/apiCalls";
import Datatable from "../../components/datatable";

const Recordings = () => {
  const [reordings,setRecordings]=React.useState([])

  const getListofRecordings=async ()=>{
    const token = localStorage.getItem('token');
    await ax
      .get("/voice-recordings", {headers: {
        'Authorization': `Bearer ${token}`,
        
       }})
      .then((res) => {
        setRecordings(res.data)
      })
      .catch((err) => {
      });
  }
  React.useEffect(()=>{
    getListofRecordings()
  },[])

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
      Header: 'Actions',
      sortable: false,
      cell: () => <Button variant="danger" data-tag="allowRowEvents" data-action="delete"><FontAwesomeIcon icon={faTrash} /></Button>,
      Cell: (data) => {
        return (
           <audio controls>
          <source src={data.row.original.url} type="audio/ogg"></source>
              </audio>
        )
      }

    }
  ]

  return (
    <div>
    <div className="flex flex-row pb-4">
    <div className=" w-5/6">
    <SectionTitle title="Listing" subtitle="" />
    </div>

  <div className="w-1/6  mt-18">
  <Link href={`/voice-campaign/addRecording`}>
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
    reordings} customclassName="usertableList" />
  </div>

  )
}

export default withRedux(Recordings)
