import React from "react";
import {Badge} from '../../components/badges'
import Link from "next/link";

const Card = ({data,permissions,navigateActivate}) => {
    const cardInfo=data;
  return  cardInfo?
       <div 
     key={data.id}
      className="p-4  max-w-2xl  rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700" style={{background:"#eff7fd",display:"flex", marginBottom:"10px"}}>
        <div style={{width: "20%",
            padding: "10px"}}>
        <img style={{"maxHeight": "64px"}} src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com"></img>
        </div>
      
        <div style={{width: "85%"}}>
          <div  className="font-bold text-lg"><span style={{marginRight:"10px"}}>{cardInfo.name}</span>
         {cardInfo.is_active && <Badge  size={'default'} color="green" rounded>
         Active
       </Badge> } 
          </div>
          <div style={{color:"gray"}}>{cardInfo.channel_slug}</div>
          <div>
          <span>{cardInfo.description}</span>
          <div style={{display:"flex","marginTop": "10px"}}>
          {
            cardInfo.tags.map((tag,i)=>{
                return (
                    <div style={{marginLeft:"2px"}} key={i}>

                    <Badge  size={'default'} color="blue" rounded>
                    {tag}
                  </Badge>
                  </div>
                    
                )
            })
          }
          </div>
          <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}} className="mt-5">
          <button
          onClick={()=>{navigateActivate(data.id)}}
          style={{
            "background": "yellowgreen",
    "padding": "10px",
    "borderRadius": "10px",
    "color": "white",
          }}
          >Activate</button> <div>
            <div style={{alignItems:"center", display:"flex"}}>
            {permissions.view && 
              <Link href={`/integration/view/${data.id}`}>
              <p>
                <i className="icon-eye text-1xl font-bold mb-2 mr-2"></i>
              </p>
          </Link>
             }
        {permissions.delete && 
          <p
          style={{
            cursor: "pointer",
            lineHeight: "normal",
          }}
          onClick={() =>navigateActivate(data.id,"delete")}><i className="icon-trash  mr-2  text-1xl font-bold mb-2"></i>
    </p>
          
         }
    
    {permissions.update &&
      <Link href={`/integration/update/${data.id}`}>
      <p>
        <i className="icon-note text-1xl  mr-2 font-bold mb-2"></i>
      </p>
      </Link>
      
     }
          
    
    </div>
            </div>
          </div>
         
          </div>
        </div>
     </div> : <div></div>
  
 

};
export default Card

