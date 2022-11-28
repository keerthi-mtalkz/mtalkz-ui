import {withRedux} from '../../lib/redux'
import React from "react";
import Layout from '../../layouts'
import Breadcrumb from '../../components/breadcrumbs'
import * as Icon from 'react-feather'

const CreateList=()=>{

    const items2 = [
        {title: 'List & Segments', url: '/listSegments', last: false},
        {title: 'Create', url: '/listSegments/createListSegment', last: true},
      ]
  return (
    <Layout className="overflow-x-scroll">
    <div className='flex text-center mb-6'>
    <div > 
    <Breadcrumb items={items2}  />
    </div>
    <div style={{marginTop:"-5px"}} className='font-bold mb-1 p-1 text-lg'>List</div>
    </div>
    <p >Give your list a name and then we'll add people to it</p>
   </Layout>
    )
}

export default withRedux(CreateList)
