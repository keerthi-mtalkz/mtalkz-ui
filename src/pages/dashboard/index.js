import React, { useState, useEffect } from "react";
import { withRedux } from "../../lib/redux";
import Layout from "../../layouts";
import Widget from "../../components/widget";
import Card from "../../components/card";
import axios from "axios";
import Datatable from "../../components/datatable";
import { CSVLink } from "react-csv";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Calendar, DateRangePicker } from "react-date-range";

const Dashboard1 = () => {
  const [results, setresults] = useState([]);
  const [connectedCount, setConnectedCount] = useState(0);
  const [averageDuration, setAverageDuration] = useState(0);
  const [stats, setStats] = useState({});
  const [chatbotId, setChatbotId] = useState('');
  const [cbVolumes, setCbVolumes] = useState({});
  const [cbDateRange, setcbDateRange] = useState({startDate: new Date(0), endDate: new Date(), key: 'selection'});
  const [vcDateRange, setvcDateRange] = useState({startDate: new Date(0), endDate: new Date(), key: 'selection'});


  const formatDuration = (duration) => {
    return Math.floor(duration/60) + ':' + (duration%60).toLocaleString('en-US', {minimumIntegerDigits: 2});
  }

  const handleCBSelect = (e) => {
    const cb = e.target.value;
    setChatbotId(cb);
  }

  const handleCBDateChange = (range) => {
    setcbDateRange({ ...(range.selection), key: 'select' });
  }

  const handleVCDateChange = (range) => {
    setvcDateRange({ ...(range.selection), key: 'select' });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url = `https://cb.mtalkz.cloud/stats?chatbot_id=${chatbotId}&start=${+(cbDateRange.startDate)}&end=${+(cbDateRange.endDate)}`;

    axios.get(url, {headers:{
      'Accept': 'application/json',
      'x-api-key': token
    }}).then(data => {
      if (!chatbotId) {
        setStats(data.data);
      }
      setCbVolumes(data.data?.volumes || {});
    }).catch(err => console.error(err.message));
  }, [chatbotId, cbDateRange]);

  useEffect(() => {
    axios.get("https://mtalkz.cloud/stats/callpatch?apiKey=9i5Qf4dnYmT67uFEAj5", {headers: {"Access-Control-Allow-Origin": ["https://mtalkz.cloud","http://localhost:3333"]}}).then(data => {
      setresults(data.data.results);
      let totalDuration = 0, totalConnected = 0;
      data.data.results.forEach(r => {
        totalDuration += +(r.duration);
        totalConnected += +(r.call_connected);
      })
      setAverageDuration(data.data.count ? Math.floor(totalDuration/data.data.count) : 0);
      setConnectedCount(totalConnected);
    }).catch(err => console.error(err.message));
  }, [vcDateRange]);

  const columns = [
    {
      Header: 'Circle',
      accessor: 'circle'
    },
    {
      Header: 'Received',
      sortable: false,
      Cell: (data) => {
        return (
         <div>{data.row.original.call_connected==1 ? '✅' : '⛔'}</div>
        )
      }
    },
    {
      Header: 'Duration',
      sortable: false,
      Cell: (data) => {
        return (
         <div>{formatDuration(data.row.original.duration)}</div>
        )
      }
    },
    {
      Header: 'Status',
      accessor: 'hangup_cause_reason'
    },
    {
      Header: 'Date/Time',
      accessor: 'start'
    },
  
  ]
  return (
    <Layout>
      <div className="w-full lg:px-2">
        {/* Chatbots Overview */}
        <Widget title="Chatbots Overview" right={
          <DateRangePicker ranges={[cbDateRange]} onChange={handleCBDateChange}/>
        }>
          <div className="flex flex-row flex-wrap w-full mb-4">
            <Card title="Total Chatbots" totalMeg={stats.chatbots?.length || 0} />
            <Card title="Published Chatbots" totalMeg={stats.chatbots?.filter(cb => cb.published).length || 0} />
            <Card title="Unique Users" totalMeg={stats.phones?.length || 0} />
            <Card title="User Sessions" totalMeg={stats.sessions || 0} />
          </div>

          <div className='flex flex-col w-full mb-4 lg:w-1/2'>
            <div className="flex flex-row mx-1 items-center justify-center">
              <div className="title text-base font-base font-bold font-poppins  text-center w-1/2">Chatbot</div>
              <select className="form-select block mt-1 text-sm border border-red-500 w-1/2" onChange={handleCBSelect} value={chatbotId}>
                <option value="" disabled>(All Chatbots)</option>
                {stats.chatbots?.map(cb => {
                  return <option key={cb._id} value={cb._id}>{cb.name}</option>
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-row flex-wrap w-full mb-4">
            <Card title="Messages Received" totalMeg={cbVolumes.new_message || 0} />
            <Card title="Messages Sent" totalMeg={cbVolumes.sending_message || 0} />
            <Card title="Messages Delivered" totalMeg={cbVolumes.message_response || 0} />
            <Card title="API Calls" totalMeg={cbVolumes.api_call || 0} />
          </div>
        </Widget>

        {/* Voice Call Campaign */}
        <Widget title="Voice Messaging" right={
          <DateRangePicker ranges={[vcDateRange]} onChange={handleVCDateChange}/>
        }>
          <div className="flex flex-row flex-wrap w-full mb-4">
            {/* <ProgressBarWidget /> */}
            <Card title="Total Calls Made" totalMeg={results.length} />
            <Card title="Total Calls Connected" totalMeg={connectedCount} />
            <Card title="Average Duration" totalMeg={formatDuration(averageDuration)} />
          </div>
          <div className="flex flex-wrap py-2">
            <div className="w-full lg:w-1/2 mb-4">
            <Datatable columns={columns} data={results} customclassName="usertableList" />
            <CSVLink data={results} filename={"voice-calls.csv"} className="btn btn-default btn-indigo btn-rounded">Download CSV</CSVLink>
            </div>
            <iframe className="w-full lg:w-1/2 mb-4" src="https://mtalkz.cloud/stats/callpatch?apiKey=9i5Qf4dnYmT67uFEAj5&pie=1" style={{height: 450}}>
              </iframe>
          </div>
        </Widget>

        {/* <SectionTitle title="Dashboard" subtitle="" /> */}
        {/* <Widget title="SMS Campaign Overview" description={<span></span>}>
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
              title="Total Clicked SMS"
              subtitle="All time performance"
            />
          </div>
        </div> */}

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
