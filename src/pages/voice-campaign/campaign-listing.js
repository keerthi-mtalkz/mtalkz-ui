import React from 'react'
import SectionTitle from "../../components/section-title";
import Link from "next/link";
import {ax} from "../../utils/apiCalls";
import {withRedux} from '../../lib/redux'

const CampaignListing = () => {

  const getListofcampaign=async ()=>{
    const token = localStorage.getItem('token');
    await ax
      .get("/voice-campaigns", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
      })
      .catch((err) => {
      });
  }

  React.useEffect(()=>{
    getListofcampaign()
  },[])



  return (
    <div>
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
      
    </div>
  )
}

export default withRedux(CampaignListing) 
