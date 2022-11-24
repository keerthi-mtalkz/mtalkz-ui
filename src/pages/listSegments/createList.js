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
    <div className="w-full">
    <div className='flex'> 
    <Breadcrumb items={items2}  />
    </div>
    </div>
   </Layout>
    )
}

export default withRedux(CreateList)
