import React, { useEffect } from "react";
import Layout from '../../../layouts';
import { withRedux } from '../../../lib/redux';
import { useRouter } from "next/router";
import axios from "axios";
import SectionTitle from "../../../components/section-title";
import { NotificationManager } from 'react-notifications';

const updateCustomerID = () => {
  const router = useRouter();
  const customerId = router.query.updateCustomerID
  const [data,setData] = React.useState(undefined);
  const [status, setStatus] = React.useState(undefined);
  const [updateData,setUpdateData] = React.useState([]);
  const getListDetails=()=>{
    const token = localStorage.getItem('token');
      axios({
          method: 'get',
          url: `http://20.193.136.151:5000/customers/?customer_id=${customerId}`,
          headers:{
            "x-api-key": `Bearer ${token}`,
          }
        }).then((response)=>{
          setData(response.data)
          let data=[]
        const keys =  Object.keys(response.data[0].attributes)
        keys.map((key)=>{
            data.push({key:key,value:response.data[0].attributes[key]})
        })
        setUpdateData([...data])
        }).catch((error)=>{
            console.log(error.response)
        //   setStatus({ type: "error",message: error.response.data.message });
        })
    }

    const updateCustomer=(data)=>{
        const token = localStorage.getItem('token');
        ax.put(`http://20.193.136.151:5000/customers/?customer_id=${customerId}`, data, {headers: {
            'x-api-key': `${token}`
          }})
            .then((res) => {
            setStatus({ type: "success" });
            setTimeout(() => {
              router.push("/listSegments");
            }, 1000);
            })
            .catch((err) => {
                setStatus({ type: "error",message: err.response.data.message });
            });
    }

    React.useEffect(()=>{
        getListDetails()
    },[])

    const addAttributes = () =>{
        setUpdateData([...updateData,{key:updateData.length,value:" "}])
    }

    const deleteAttribute=(index)=>{
     let data = [...updateData];
     let filteredData=[];
     data.forEach((att,i)=>{
        if(index!=i){
            filteredData.push(att)
        }
     })
     console.log(filteredData,"filteredDatafilteredData")
     setUpdateData([...filteredData])
     
    }

    const onSubmit=()=>{
        let serverData = {};
        updateData.map((data)=>{
            try{
               serverData[data.key] =  JSON.parse(data.value);
            }catch(e){
                serverData[data.key] =  JSON.stringify(data.value);
            }
        })
        updateCustomer(serverData)
    }

  return (
    <Layout className="overflow-x-scroll">

    <div className="flex flex-row pb-4">
    <div className=" w-5/6">
    <SectionTitle title="Update Customer" subtitle="" />
    </div>
    <div className="w-1/6 mt-5">
      {" "}
      { 
      <button
        className="ml-3  btn btn-default btn-indigo create-btn w-full"
        type="button"
        onClick={()=>{addAttributes()}}
      >
        Add Attribute
      </button>
  }
     
    </div>
    <div className="w-1/6 mt-5 ml-2">
    {" "}
    { 
    <button
      className="ml-3  btn btn-default btn-indigo create-btn w-full"
      type="button"
      onClick={()=>{onSubmit()}}
    >
      Submit
    </button>
}
   
  </div>
  </div>
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Updated Customer successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        {   NotificationManager.error(status.message,"Error")}
      </div>
      )}
      <div>
      {updateData.map((data,index)=>{
        return (
            <div className="flex">
              <div style={{width:"40%"}} className="mr-10">
              <input
              type="text"
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your attribute name"
              defaultValue={data.key}
              onChange={(e)=>{
                 let data=updateData;
                 data[index].key= e.target.value}}
            />
              </div>
              <div style={{width:"40%"}} className="mr-10">
              <input
              type="text"
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your name"
              defaultValue={data.value!= " " ?  JSON.stringify(data.value) : data.value}
              onChange={(e)=>{
                let data=updateData;
                data[index].value= e.target.value}}
            />
              </div>
              <div style={{width:"20%"}}>
              <p
              className="p-4 absolute"
              style={{
                textAlign: "right",
                cursor: "pointer",
                lineHeight: "normal",
                marginTop:"-2px"
              }}
              onClick={()=>{deleteAttribute(index)}}
            >
              <i className="icon-trash text-1xl font-bold mb-2 "></i>
            </p>
              </div>

            </div>
        )
      })}
      </div>
    </Layout>
  )
}

export default withRedux(updateCustomerID)
