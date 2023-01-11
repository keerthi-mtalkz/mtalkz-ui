import Link from "next/link";
import React, { useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { shallowEqual, useSelector } from 'react-redux';
import { Badge } from '../../components/badges';
import ConfirmationModal from "../../components/confirmationmodal";
import Datatable from "../../components/datatable";
import SectionTitle from '../../components/section-title';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import { ax } from "../../utils/apiCalls";
import ls from 'local-storage'
const Campaign = () => {
 const [status, setStatus] = useState(undefined);
  return (
    <Layout>
      <div className="flex flex-row pb-4">
        <div className=" w-5/6">
        <SectionTitle title="Campaigns" subtitle="" />
        </div>
        <div className="w-1/6 ">
          {" "}
          { <Link href={`/campaign/addCampaign`}>
            <button
              className="ml-3  btn btn-default btn-indigo create-btn w-full"
              type="button"
            >
             Create
            </button>
          </Link>}

        </div>
      </div>
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Deleted ApiKey successfully', 'Success')}
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
    </Layout>
  )
}

export default withRedux(Campaign)
