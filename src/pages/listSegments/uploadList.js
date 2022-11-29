import {withRedux} from '../../lib/redux'
import React from "react";
import Layout from '../../layouts'
import Breadcrumb from '../../components/breadcrumbs'
import { WithContext as ReactTags } from 'react-tag-input';
import { useForm } from "react-hook-form";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import { useRouter } from "next/router";

const UploadList=()=>{
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm();
  const [errors,setErrors]=React.useState(undefined)
  const [status, setStatus] = React.useState(undefined);
  

   
   
  return (
    <Layout className="overflow-x-scroll">
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('List added successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.error(status.message, 'Error')}
        </div>
      </div>
      )}
      <div>Upload File</div>
    <div className='flex w-full'>
    <div>
 <p>Drag and drop your CSV here </p>
 <p>maxium file size 50mb</p>
 <input type="file" accept=".csv" />
    </div>
    <div>
    </div>
    </div>
   </Layout>
    )
}

export default withRedux(UploadList)
