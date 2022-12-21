import ls from 'local-storage';
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../layouts";
import { withRedux } from "../../../lib/redux";

const index = () => {
  const router = useRouter();
  const [chatID, flowID] = router.query.flowchartID.split('_');
  console.log('chatID', chatID, 'flowID', flowID)

  const token1 = ls.get("token");
  return (
    <Layout>
      <div className="ifbox">
        <iframe src={`https://cb.mtalkz.cloud/?cid=${chatID || ''}&fid=${flowID || ''}&ak=${token1 || ''}`} title={flowID ? "Update Flow" : "Create Flow"} id="custom-iframesrc"></iframe>
      </div>
    </Layout>
  );
};
export default withRedux(index);
