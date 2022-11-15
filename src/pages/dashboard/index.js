import React, { useState, useEffect } from "react";
import { withRedux } from "../../lib/redux";
import Layout from "../../layouts";
import SectionTitle from "../../components/section-title";
import WidgetTitle from "../../components/widget-title";
import ProgressBarWidget from "../../components/dashboard-1/progress-bar-widget";
import DoughnutChart1 from "../../components/dashboard-1/doughnut-chart-1";
import Table1 from "../../components/dashboard-1/table-1";
import IconWidget from "../../components/dashboard-1/icon-widget";
import BarChart1 from "../../components/dashboard-1/bar-chart-1";
import LineChart1 from "../../components/dashboard-1/line-chart-1";
import TextWidget from "../../components/dashboard-1/text-widget";
import Table2 from "../../components/dashboard-1/table-2";
import { NotificationManager } from "react-notifications";
import Widget from "../../components/widget";
import Card from "../../components/card";

import {
  InlineSelect,
  InlineInvalidSelect,
  InlineValidSelect,
} from "../../components/forms/selects";
import router from "next/router";
import { useRouter } from "next/router";

const Dashboard1 = () => {
  const router = useRouter();
  const [message, didShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // let token = localStorage.getItem('token')
      // router.push("/");
    }

    if (message) return;
    // NotificationManager.info("You have 5 new messages", null, 1500);
    didShow(true);
  }, [message]);
  return (
    <Layout>
      <div className="w-full lg:px-2">
        {/* <SectionTitle title="Dashboard" subtitle="" /> */}
        <Widget title="Email Overview" description={<span></span>}>
          <div className="flex flex-row flex-wrap w-full children-x-4">
            <div className="w-1/4">
              <label className="inline-flex items-center children-x-2">
                <span className="text-default whitespace-no-wrap">Show</span>
                <select className="form-select block w-full mt-1 text-sm border border-red-500">
                  <option>Today</option>
                  <option>Last 24 Hours</option>
                  <option>Yesterday</option>
                  <option>This Week</option>
                  <option>Last 7 days</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Week</option>
                  <option>Last 30 days</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                  <option>Last Year</option>
                  <option>Last 90 days</option>
                  <option>Last 365 days</option>
                  <option>last Year</option>
                  <option>Custom</option>
                </select>
              </label>
            </div>
            <div className="w-1/4">
              <label className="inline-flex items-center children-x-2">
                <span className="text-default whitespace-no-wrap">By</span>
                <select className="form-select block w-full mt-1 text-sm border border-red-500">
                  <option>Day</option>
                </select>
              </label>
            </div>
          </div>
        </Widget>
        <div className="flex flex-row flex-wrap w-full mb-4">
          {/* <ProgressBarWidget /> */}
          <Card title="Total Received SMS" totalMeg="10" />
          <Card title="Total Opened Message" totalMeg="45" />
          <Card title="Total Clicked SMS" totalMeg="50" />
          <Card title="Total Marked SMS" totalMeg="90" />
        </div>

        <div className="flex flex-wrap py-2">
          <div className="w-full lg:w-1/2 mb-4">
            <BarChart1 title="Open Rate" subtitle="All time performance" />
          </div>
          <div className="w-full lg:w-1/2 mb-4">
            {/* <DoughnutChart1 title="Online store" subtitle="Weekly sales" /> */}
            <LineChart1
              title="Total Opened SMS"
              subtitle="Sales and conversions"
            />
          </div>
        </div>

        <div className="w-full flex flex-row flex-wrap mb-4">
          <div className="w-full lg:w-1/2 mb-4">
            <LineChart1
              title="Click Through Rate"
              subtitle="Sales and conversions"
            />
          </div>
          <div className="w-full lg:w-1/2 mb-4">
            <BarChart1
              title="Total Clicked Email"
              subtitle="All time performance"
            />
          </div>
        </div>

        {/* <div className="flex flex-wrap w-full mb-8">
          <TextWidget />
        </div> */}

        {/* <div className="flex flex-wrap w-full mb-4">
          <Table2 title="Employees" subtitle="Online status" />
        </div> */}
      </div>
    </Layout>
  );
};
// export async function getServerSideProps(ctx){
//   const {auth} = parseCookies(ctx)
//   if(!auth){
//   const {res} = ctx
//   res.writeHead(302,{Location:"/"})
//   res.end()

//   }
//   return{
//     props:{}
//   }

//   }

export default withRedux(Dashboard1);
