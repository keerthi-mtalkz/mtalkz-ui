import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';

const AddUpdateCampaign = () => {
  const router = useRouter();
  const campaignId = router.query.campaignId || '';
  const view = router.query.view || '';
  const [token, setToken] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);
  }, [])

  return (
    <Layout>
      <iframe src={`/voice-bot-builder/index.html?token=${token}&id=${campaignId}&view=${view}`} frameBorder={0} id="custom-iframesrc"></iframe>
    </Layout>
  )
}

export default withRedux(AddUpdateCampaign)
