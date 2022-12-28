import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {HTTP_METHODS} from "../../utils/constants";
import {NotificationManager} from 'react-notifications';
import { WithContext as ReactTags } from 'react-tag-input';
import Switch from 'react-switch'
import Select from "react-select";
import {Badge} from '../../components/badges'

import Link from "next/link";

const Card = ({data,permissions,navigateActivate}) => {
    const cardInfo=data;
  console.log(data,permissions);
  return (
     <div style={{display:"flex",border:"2px solid", marginBottom:"10px",width:"70%"}}>
        <div style={{width: "20%",
            padding: "10px"}}>
        <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com"></img>
        </div>
        <div style={{background: "lightgray",
            width: "2px"}}></div>
        <div style={{width: "70%"}}>
          <div className="text-center">{cardInfo.channel_name}</div>
          <div style={{height:"2px",background: "lightgray"}}></div>
          <div>{"A card info to the practice wait tst that report after that keen interest"}
          <div style={{display:"flex"}}>
          {
            cardInfo.tags.map((tag)=>{
                return (
                    <div style={{marginLeft:"2px"}}>

                    <Badge  size={'default'} color="pink" rounded>
                    {tag}
                  </Badge>
                  </div>
                    
                )
            })
          }
          </div>
          </div>
        </div>
        <div style={{background: "lightgray",
        width: "2px"}}></div>
        <div style={{width: "15%"}}>
          
          {cardInfo.is_active && <div> <div style={{background: "green",
            color: "white"}}  className="text-center">active</div> <div style={{height:"2px",background: "lightgray"}}></div></div>}
        <div  onClick={()=>{navigateActivate(data.id)}}  className="text-center" style={{background: "darkblue",
            color: "white",cursor: "pointer"}}>Activate</div><div style={{height:"2px",background: "lightgray"}}></div>
            <div>
            <div className="flex justify-evenly ">
            {permissions.view &&  <Link href={`/integration/view/${data.id}`}>
            <p>
              <i className="icon-eye text-1xl font-bold mb-2"></i>
            </p>
        </Link>}
        {permissions.delete &&   <p
          style={{
           
            cursor: "pointer",
            lineHeight: "normal",
          }}
          onClick={() => ConfirmationPopup(data.id)}><i className="icon-trash text-1xl font-bold mb-2"></i>
    </p> }
    
    {permissions.update &&  <Link href={`/integration/update/${data.id}`}>
    <p>
      <i className="icon-note text-1xl font-bold mb-2"></i>
    </p>
    </Link>}
          
    
    </div>
            </div>
     </div>

     </div>
  )
 

};
export default Card

