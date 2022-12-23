import ls from 'local-storage';
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../../layouts";
import { withRedux } from "../../../../lib/redux";

const ImportFlowchart = () => {
  const router = useRouter();
  const [chatID, flowID, view] = router.query.flowchartID?.split('-') || [0, 0, 0];

  const token1 = ls.get("token");
  return (
    <Layout>
      {(chatID && flowID) ?
      <div className="ifbox">
        <iframe src={`https://cb.mtalkz.cloud/?cid=${chatID}&iid=${flowID}&ak=${token1 || ''}&view=${view}`} title="Import Flow" id="custom-iframesrc"></iframe>
      </div>:<p>Cannot import a flowchart outside a chatbot</p>}
    </Layout>
  );
};
export default withRedux(ImportFlowchart);
