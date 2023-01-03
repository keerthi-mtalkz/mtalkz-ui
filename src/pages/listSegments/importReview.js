import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import { ax } from "../../utils/apiCalls";
import Breadcrumb from '../../components/breadcrumbs';
import Datatable from "../../components/datatable";

const ImportReview = () => {
  const [status, setStatus] = React.useState(undefined);
  const items2 = [
    {title: 'List & Segments', url: '/listSegments', last: false},
    {title: 'Create', url: '/listSegments/createListSegment', last: true},
  ]

  const data = [
    {
    columnName:"email",
    sampleData:"kkeetrhidatadsgw@gmail.com",
    type:"string"
  },
  {
    columnName:"email",
    sampleData:"kkeetrhidatadsgw@gmail.com",
    type:"string"
  },
  {
    columnName:"email",
    sampleData:"kkeetrhidatadsgw@gmail.com",
    type:"string"
  },
  {
    columnName:"email",
    sampleData:"kkeetrhidatadsgw@gmail.com",
    type:"string"
  }
]

  const columns =  [
    {
      Header: 'Column Name',
      accessor: 'columnName'
    },
    {
      Header: 'Sample Data',
      accessor: 'sampleData'
    },
    {
      Header: 'Type',
      accessor: 'type'
    }
  ]

  return (
    <Layout className="overflow-x-scroll">
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('List added successfully', 'Success')}
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
      <div className="w-full">
      <Breadcrumb items={items2} />
       <div className=" mt-5 mb-5" style={{background:"lightgrey",height:"2px"}}></div>
       <div className="font-semibold">Import review</div>
       <span>Please review the field mapping so we can add and update profiles based on your selections</span>
       <div className="mt-5">
       <Datatable columns={columns}  data={data} />
       </div>
       <div className="w-3/5 flex">
      <input
      type="cancel"
      className="btn cursor-pointer btn-default btn-block btn-red mt-5 text-center mr-5 "
      value="Cancel"
      onClick={()=>{        
    }}
    />
        <input
          type="submit"
          className="btn cursor-pointer btn-default btn-block btn-indigo mt-5"
          value="Import"
          onClick={()=>{

          }}
        />
      </div>
       </div>

    </Layout>
  )
}

export default withRedux(ImportReview)
