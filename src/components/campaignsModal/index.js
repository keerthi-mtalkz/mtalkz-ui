import React, {useState} from 'react'

const ModalHeader = ({onClick,title}) => (
  <div className="modal-header" style={{position:"sticky",top:0}}>
    <h3 className="text-xl font-semibold">{title}</h3>
    <button
      className="modal-close btn btn-transparent"
      onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`text-secondary stroke-current inline-block h-5 w-5`}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
)



const ModalFooter = ({onCancel,onSubmit}) => (
  <div className="modal-footer " style={{position:"sticky",bottom:0,justifyContent:"center"}}>
  <button className="btn btn-default btn-white w-2/5 mr-2 " style={{border:"1px solid grey"}} type="button" onClick={onCancel}>
  Cancel
</button>
    <button className=" btn btn-default btn-indigo create-btn w-2/5" type="button" onClick={onSubmit}>
      Create Campaign
    </button>
  </div>
)



const CampaignModal = ({onSelect,onCancel}) => {
    const [items,setItems]=React.useState([
        {label:"SMS",image:"/integrationIcon.png",selected:false},
        {label:"WhatsApp",image:"/integrationIcon.png",selected:false},
        {label:"Voice",image:"/integrationIcon.png",selected:false},
        {label:"Email",image:"/integrationIcon.png",selected:false},
    ])
  return (
    <>
          <div className="backdrop fade-in fixed inset-0 z-40 bg-black" ></div>
          <div className="modal show justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-4 mx-auto max-w-lg">
              <div className="modal-content" style={{width:"710px",padding:0}}>
                <ModalHeader title={"Create Campaign"}  />
                <div style={{padding:"10px"}}>
                   <span>What kind of campaign would you like to send?</span>
                   <div  className='flex justify-around'>
                   {items.map((item,index)=>{
                    return <div className='text-center'   onClick={()=>{
                        let data=items;
                        data.map((item,i)=>{
                             if(i===index){
                               item.selected=true
                             }else
                             {
                               item.selected=false

                             }
                        })
                        setItems([...data])

                   }}>
                        <div className='mt-3  border shadow-md ' style={{borderRadius:"10px",padding:"7px",borderColor:item.selected?"blue":"#dad2d21f"}}>
     <img style={{"maxHeight": "60px","maxWidth":"60px"}} src={item.image } alt=""></img>
                        </div>
                        <div>{item.label}</div>
                     </div>
                 })}
                   </div>
                   
                </div>
                
               
                <ModalFooter onCancel={()=>{onCancel()}}   onSubmit={()=>{
                  let selectedItem=  items.filter((item)=>item.selected)
                  onSelect(selectedItem[0].label.toLocaleLowerCase())
                }}/>
              </div>
            </div>
          </div>
      
    </>
  )
}

export default CampaignModal
