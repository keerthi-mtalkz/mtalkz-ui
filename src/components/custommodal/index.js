import React, {useState} from 'react'

const ModalHeader = ({onClick}) => (
  <div className="modal-header">
    <h3 className="text-xl font-semibold">Modal Title</h3>
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



const ModalFooter = ({onClick}) => (
  <div className="modal-footer children-x-2">
    <button className="btn btn-flat btn-red" type="button" onClick={onClick}>
      Close
    </button>
  </div>
)

function CopyContent() {
    var copyText = document.getElementById("myApiKey");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value);
  
  }

const CustomModal = ({apiKey,onClose}) => {
    const [text,setText]=useState("Copy Key")
  return (
    <>
          <div className="backdrop fade-in fixed inset-0 z-40 bg-black" ></div>
          <div className="modal show justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-4 mx-auto max-w-lg">
              <div className="modal-content" style={{width:"550px"}}>
                <ModalHeader onClick={() => onClose()} />
                <p className="ml-5">Once this modal is closed ypu won't find the key, save it securely</p>
                <div className="relative p-4 flex-auto">
                <input type="text" value={apiKey} id="myApiKey" readOnly></input>
    
  
    <button onClick={()=>{setText("Copied Key"); CopyContent()}}>{text}</button>

  </div>
                <ModalFooter onClick={() => onClose()} />
              </div>
            </div>
          </div>
      
    </>
  )
}

export default CustomModal
