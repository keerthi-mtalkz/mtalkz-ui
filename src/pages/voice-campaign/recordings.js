import React from 'react'
import {withRedux} from '../../lib/redux'
import SectionTitle from "../../components/section-title";
import Link from "next/link";
import {ax} from "../../utils/apiCalls";

const Recordings = () => {

  const getListofRecordings=async ()=>{
    const token = localStorage.getItem('token');
    await ax
      .get("/voice-recordings", {headers: {
        'Authorization': `Bearer ${token}`,
        
       }})
      .then((res) => {
      })
      .catch((err) => {
      });
  }
  React.useEffect(()=>{
    getListofRecordings()
  },[])
  return (
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
  )
}

export default withRedux(Recordings)
