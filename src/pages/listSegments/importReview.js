import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { NotificationManager } from 'react-notifications';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import { ax } from "../../utils/apiCalls";
import Breadcrumb from '../../components/breadcrumbs';
import Datatable from "../../components/datatable";
import Select from "react-select";
import ls from 'local-storage'
import Switch from 'react-switch';
import axios from "axios";
import { round } from "lodash";
import { useRouter } from "next/router";

const ImportReview = () => {
  const router = useRouter();

  const [status, setStatus] = React.useState(undefined);
  const items2 = [
    {title: 'List & Segments', url: '/listSegments', last: false},
  ]
  const [sampleRecords,setSampleRecords] = React.useState(ls.get('sampleRecord'));
  const [filepath,setFilepath] = React.useState(ls.get('filepath'))
  const [selectedCustomerId,setSelectedCustomerId]=React.useState([]);
  const [data,setData] = React.useState([]);
  const [checked, handleChange] = React.useState(false);
  const [options,setOptions] = React.useState([[]]); 
  const selectedItems=[]
React.useEffect(()=>{
  let sampleData= [ ]
  const _sampleRecords =  JSON.parse(sampleRecords);
   Object.keys(_sampleRecords).forEach((k)=>{
        if(typeof(_sampleRecords[k]) != 'object'){
          sampleData.push({columnName:k,sampleData:_sampleRecords[k],type:typeof(_sampleRecords[k])})
        }
   })
   setData([...sampleData])
  let  options =   sampleData.map((element)=>{
    return { label: element.columnName, value: element.columnName };
  })
  setOptions([...options])
},[sampleRecords])
 
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

  const handleSwitch=(value)=>{
    setSelectedCustomerId({label: value.label, value: value.value})
  }

 const onsubmit=()=>{
  const includeColumns=selectedItems.map((data)=> {
    return data.original.columnName
  })
   const data = {
    "name": router.query.name,
    "filePath": filepath,
    "customerIDColumn": selectedCustomerId.label,
    "includeColumns":includeColumns,
    "overwrite": checked
  };
  const token = localStorage.getItem('token');
  axios({
    method: 'post',
    url: "http://20.193.136.151:5000/lists/processUpload",
    data: data,
    headers:{
      "x-api-key": `Bearer ${token}`,
    }
  }).then((response)=>{
    router.push("/")
  }).catch((error)=>{})
 }

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
      <div className='flex text-center mb-2'>
      <div >
        <Breadcrumb items={items2} />
      </div>
      <div style={{ marginTop: "-5px" }} className='font-bold mb-1 p-1 text-lg'>{ router.query.name}</div>
    </div>
       <div className=" mt-2 mb-2" style={{background:"lightgrey",height:"2px"}}></div>
       <div className="font-semibold">Import review</div>
       <span>Please review the field mapping so we can add and update profiles based on your selections</span>
       <div className="w-full mb-4 flex">
       <label className="block">
         <div style={{ width: "330px" , marginTop:"20px",marginBottom:"20px"}}>
         <Select
           options={options}
           placeholder="Select Customer Id"
           onChange={handleSwitch}
         />
       </div>
       </label>
       <div className="grid grid-cols-3 w-full mb-4 align-center" style={{"align-items": "center","marginLeft":"10px","marginTop":"10px"}}>
       <Switch
         checked={checked}
         onChange={(checked) => handleChange(checked)}
        
         uncheckedIcon={false}
         checkedIcon={false}
       />
       <span>Overwrite</span>

     </div>
       
     </div>
      
       <div className="mt-5">
       <Datatable columns={columns} onCheckboxClick={(data)=>{
        if(selectedItems.length==0){
         selectedItems=[data]
        }else{
          let isSelectedItem = selectedItems.findIndex((d)=>d.id==data.id)
           if(  isSelectedItem==-1){
            selectedItems=[...selectedItems,data] 
           }else{
            selectedItems.splice(isSelectedItem,1)
           }
        }
       }}  data={data} selection={true} />
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
              onsubmit()
          }}
        />
      </div>
       </div>

    </Layout>
  )
}

export default withRedux(ImportReview)
