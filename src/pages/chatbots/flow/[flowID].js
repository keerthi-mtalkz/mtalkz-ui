import React from "react";
import { useState } from "react";
import Layout from "../../../layouts";
import { withRedux } from "../../../lib/redux";
import { useRouter } from "next/router";
import ls from 'local-storage'





const index = () => {
  const router = useRouter();
  const chatid = router.query.flowID;
  const ak = router.query.ak;



 const token1 = ls.get("token");
  return (
    <Layout>
    
    <div className="ifbox">
      {/* <iframe src={iframSrc} id="custom-iframesrc" ></iframe> */}

      <iframe src={`https://cb.mtalkz.cloud/?cb=${chatid}&ak=${token1}`} title="Create Flow" id="custom-iframesrc"></iframe>
      </div>

    </Layout>
  );
};
export default withRedux(index);
