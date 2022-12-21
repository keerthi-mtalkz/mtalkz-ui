import ls from 'local-storage';
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../layouts";
import { withRedux } from "../../../lib/redux";

const index = () => {
  const router = useRouter();
  const [chatID, flowID] = router.query.flowchartID?.split('_') || [0, 0];

  const token1 = ls.get("token");
  return (
    <Layout>
      {chatID ?
      <div className="ifbox">
        <iframe src={`https://cb.mtalkz.cloud/?cid=${chatID}&fid=${flowID || ''}&ak=${token1 || ''}`} title={flowID ? "Update Flow" : "Create Flow"} id="custom-iframesrc"></iframe>
      </div>:<p>Cannot access the flowchart builder outside a chatbot</p>}
    </Layout>
  );
};
export default withRedux(index);
