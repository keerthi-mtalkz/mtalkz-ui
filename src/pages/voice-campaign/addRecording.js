import React from 'react'
import Layout from '../../layouts'
import {withRedux} from '../../lib/redux'
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import {ax} from "../../utils/apiCalls";

const AddRecording = () => {
  const { register, handleSubmit, watch } = useForm();
const [errors,setErrors] = React.useState(undefined)
const [status, setStatus] = React.useState(undefined);
const [file,setFile]=React.useState(undefined);
function changeHandler({
    target
  }) {
    if (!target.files.length) return;
    let files = target.files;
    setFile(files)
    
  }


  const onSubmit=(data)=>{
    let formData = new FormData();
     formData.append("audio",file);
    formData.append("name", data.name);
    const token = localStorage.getItem('token');
    console.log(formData,"sdjhfeuirfgreyifg")
    ax.post(
      `/voice-recordings`,
     formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
      })
      .catch((err) => {
      });
 

  }
  return (
    <Layout>
    <SectionTitle title="Upload" subtitle="" />
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col text-sm mb-4 "
  >
        <div className='flex mb-5 align-center'>
         <label className='mr-20 mt-3'>Reording Name</label>
         <input
         name="name"
         type="text"
         ref={register()}
         className="form-input mt-1 w-2/4 text-xs block ml-10 bg-white"
         placeholder="Enter your Recording Name"
       />
        </div>
        <div>
        <label>Attach audio file (only MP3 file)</label>
     <span className="text-red-600" >*</span>
        <input  ref={register({required: true})} name="audio" className='ml-3' type="file" accept=".mp3" onChange={(file)=>{changeHandler(file)}}>
        </input>
       </div>
       <input
       type="submit"
       className="w-3/6 mt-3 block px-4 py-2 uppercase font-bold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:outline-none active:outline-none"
       value="upload"
     />
     </form>
    <SectionTitle title="Listing" subtitle="" />

    </Layout>
  )
}

export default withRedux(AddRecording)
