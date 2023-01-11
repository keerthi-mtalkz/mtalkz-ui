import React, { useState } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications';
import Select from "react-select";
import Switch from 'react-switch';
import CustomModal from "../../components/custommodal";
import Breadcrumb from '../../components/breadcrumbs';
import Recipients from "./recipients";
import Content from "./content"
const addCampaign = () => {
  const router = useRouter();
  const [status, setStatus] = useState(undefined);
  const [listSegments,setListSegments]=React.useState([
]);
const [index,setIndex]=useState(0)
  const name="";

  
 
  const onSubmit = (details) => {
  
  };

  const items2 = [
    { title: 'Campaigns', url: '/listSegments', last: false },
  ]



  return (
    <Layout>
   
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        {   NotificationManager.error(status.message,"Error")}
      </div>
      )}

     <div style={{"display": "flex",
        justifyContent: "space-between"}}>
     <div className="flex">
     <Breadcrumb style = {{width:"11%"}} items={items2} />
     <div style={{marginTop:"11px"}} className="font-bold"><span>Create</span></div>
     </div>
     <div className="flex items-center">
     <div style={{cursor: "pointer"}}>
     <div
     onClick={()=>{setIndex(0)}}
     style={{    "border":" 1px solid",
     "width":" 23px",
     textAlign: "center",
     "borderRadius": "11px"}}>
  1
  </div>
  <span>Recipients</span>
     </div>
    
     <div className=" ml-1 mr-1"  style={{width:" 70px",
        "background": "lightgray",
        "height": "2px",
        "margin-left":" -37px",
        "margin-top": "-21px"
    }}></div>
        <div  style={{cursor: "pointer"}}>
        <div
     onClick={()=>{setIndex(1)}}
        
          style={{    "border":" 1px solid",
        "width":" 23px",
        textAlign: "center",
        "borderRadius": "11px"}}>
     2
     </div>
  <span>Content</span>
        </div>
       
     <div className=" ml-1 mr-1"  style={{width:" 70px",
        "background": "lightgray",
        "height": "2px",
        "margin-left":" -25px",
        "margin-top": "-21px"
    
    }}></div>
        <div  style={{cursor: "pointer"}}>
        <div 
     onClick={()=>{setIndex(2)}}
        style={{    "border":" 1px solid",
        "width":" 23px",
        textAlign: "center",
        "borderRadius": "11px"}}>
     3
     </div>
  <span>Review</span>

        </div>
      
     </div>
     </div>
      {index==0 && <Recipients saveContinue={()=>{setIndex(1)}} ></Recipients> }
      {index==1 && <Content saveContinue={()=>{setIndex(2)}}></Content> }
    

    </Layout>
  );
};
export default withRedux(addCampaign);

