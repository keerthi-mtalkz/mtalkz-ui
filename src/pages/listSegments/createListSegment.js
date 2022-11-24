import {withRedux} from '../../lib/redux'
import React from "react";
import Layout from '../../layouts'
import Breadcrumb from '../../components/breadcrumbs'
import * as Icon from 'react-feather'
import { useRouter } from "next/router";

const CreateListSegment=()=>{
  const router = useRouter();

  const items2 = [
    {title: 'List & Segments', url: '/listSegments', last: false},
    {title: 'Create', url: '/listSegments/createListSegment', last: true},
  ]
  return (
    <Layout className="overflow-x-scroll">
    <div className="flex flex-row mb-4">
    <div className="w-full">
      <Breadcrumb items={items2} />
      <div className='mt-10 justify-center text-center '>
        <div>Do You want to create a list or a segment</div>
        <div className='flex mt-10  justify-center text-center '>
        <div className='p-10 border-2 border-black  ' style={{width:"300px"}} onClick={()=>{router.push('/listSegments/createList')}}>
        <div className='flex justify-center'>
        <Icon.List></Icon.List>
        </div>
        <p>List</p>
       <div className='border-2 p-3 text-center border-black'>Upload a file</div>
        </div>
        <div className='p-10 border-2 ml-10 border-black' style={{width:"300px"}}>
        <div className='flex justify-center'>
        <Icon.List></Icon.List>

        </div>
        <p>Segment</p>
       <div>A dynamic segment of people based on their behaviour or properties</div>
        </div>
        </div>
      </div>
    </div>
  </div>
   
   </Layout>
    )
}

export default withRedux(CreateListSegment)
