import React from 'react'
import Layout from '../../layouts'
import {withRedux} from '../../lib/redux'
import { useRouter } from "next/router";

const AddUpdateCampaign = () => {
  const router = useRouter();
  const campaignId = router.query.campaignId;
  return (
    <Layout>
    <div className="ifbox">
    <iframe src={campaignId?``:``} title="Create Campaign" id="custom-iframesrc"></iframe>
    </div>
    </Layout>
  )
}

export default withRedux(AddUpdateCampaign)
