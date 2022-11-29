import React, {useState} from 'react'

const ModalHeader = ({onClick}) => (
  <div className="modal-header">
    <h3 className="text-xl font-semibold">Delete Confirmation</h3>
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className={`text-secondary stroke-current inline-block h-5 w-5`}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
)



const ModalFooter = ({onClick,onSubmit}) => (
  <div className="modal-footer children-x-2">
    <button style={{background:"red",padding:"10px",color:"white"}} type="button" onClick={onClick}>
      Cancel
    </button>
    <button  style={{background:"#667eea",padding:"10px", width:"60px",color:"white"}} type="button" onClick={onSubmit}>
    Ok
  </button>
  </div>
)



const ConfirmationModal = ({onCancel,onSubmit}) => {
  return (
    <>
          <div className="backdrop fade-in fixed inset-0 z-40 bg-black" ></div>
          <div className="modal show justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-4 mx-auto max-w-lg">
              <div className="modal-content" style={{width:"550px"}}>
                <ModalHeader onClick={() => onCancel()} />
                <p className="ml-5">Are you sure?</p>
                <p className="ml-5">Do you want to delete</p>
                <ModalFooter onClick={() => onCancel()}  onSubmit={()=>onSubmit()}/>
              </div>
            </div>
          </div>
      
    </>
  )
}

export default ConfirmationModal