import React from "react";
import { NotificationManager } from 'react-notifications';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import Breadcrumb from '../../components/breadcrumbs';
import Datatable from "../../components/datatable";
import axios from "axios";
import { useRouter } from "next/router";
import {Badge} from '../../components/badges'

const ViewList = () => {
  const router = useRouter();
  const [status, setStatus] = React.useState(undefined);
  const items2 = [
    {title: 'List & Segments', url: '/listSegments', last: false},
  ]
  const [data,setData] = React.useState(undefined);

  const getListDetails=()=>{
  const token = localStorage.getItem('token');
    axios({
        method: 'get',
        url: `http://20.193.136.151:5000/lists/${router.query.name}`,
        headers:{
          "x-api-key": `Bearer ${token}`,
        }
      }).then((response)=>{
        console.log(response.data)
        setData(response.data)
      }).catch((error)=>{})
  }

  React.useEffect(()=>{
    getListDetails()
  },[])
  // (new Date(created_at)).toLocaleString('en-HI', {dateStyle: 'medium', timeStyle: 'short'})
  const columns =  [
    {
      Header: 'Profile',
      accessor: 'customer_id'
    },
    {
      Header: 'Added',
      sortable:false,
          Cell:(data)=>{
            return (<div className="flex  ">
            {  (new Date(data.row.original.created_at)).toLocaleString('en-HI', {dateStyle: 'medium', timeStyle: 'short'})}
             </div>)}
    },
    {
      Header: 'Last Modifies On',
      sortable:false,
          Cell:(data)=>{
            return (
              <div className="flex  ">
           {data.row.original.updated_at ?<span>{(new Date(data.row.original.updated_at)).toLocaleString('en-HI', {dateStyle: 'medium', timeStyle: 'short'})}
           </span>:'-'}
             </div>)}
    }
  ]


  const rowClick=(data)=>{
    router.push({pathname:"/listSegments/customer360",query:{customerId:data.original.customer_id}});
  }
  return (
    <Layout className="overflow-x-scroll">
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.error(status.message, 'Error')}
          </div>
        </div>
      )}
      <div className="w-full">
      <div className='flex text-center'>
      <div >
        <Breadcrumb items={items2} />
      </div>
      <div style={{ marginTop: "-5px" }} className='font-bold mb-1 p-1 text-lg'>{ router.query.name}</div>
    </div>
    <div className="flex">
    {
      data && data.tags && data.tags.map((item)=>{
        return  <div style={{marginRight:"10px", display:"flex"}}>
        <Badge  size={'default'} color="blue" rounded >
        {item }
      </Badge>
        </div>
      })
    }
    </div>
    <div className="mt-2">{data?.description}</div>
       <div className=" mt-2 mb-2" style={{background:"lightgrey",height:"2px"}}></div>
       <div>{data?.members?.length} Members</div>
      </div>
     {data &&  <Datatable columns={columns}  data={data.members} rowClick={rowClick} ></Datatable> }
    </Layout>
  )
}

export default withRedux(ViewList)
