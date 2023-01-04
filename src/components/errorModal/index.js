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



const ModalFooter = ({onClick,onSubmit}) => (
  <div className="modal-footer children-x-2" style={{position:"sticky",bottom:0}}>
    <button className="btn btn-default btn-red" type="button" onClick={onSubmit}>
      OK
    </button>
  </div>
)



const ErrorModal = ({onSubmit,title="Errors",content}) => {
    console.log(content.last_upload.errors,"hcgyc")
  return (
    <>
          <div className="backdrop fade-in fixed inset-0 z-40 bg-black" ></div>
          <div className="modal show justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-4 mx-auto max-w-lg">
              <div className="modal-content" style={{width:"710px",padding:0}}>
                <ModalHeader title={title} onClick={() => onSubmit()} />
                <div style={{padding:"10px"}}>
                {
                    content.last_upload.errors.map((error)=>{
                        return (
                            <div style={{display:"flex"}}>
                            <div style={{marginRight:"10px"}}>{error.lineNum}</div>
                            <div>{error.error}</div>
                            </div>
                        )
                    })
                }
                </div>
                
               
                <ModalFooter   onSubmit={()=>onSubmit()}/>
              </div>
            </div>
          </div>
      
    </>
  )
}

export default ErrorModal
