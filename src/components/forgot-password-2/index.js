import React, {useState} from 'react'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'

let socialMediaColors = {
  facebook: '#365397',
  linkedin: '#006db3',
  google: '#e0452c',
  github: '#2f2f2f',
}

const ForgotPassword2 = (data) => {
    console.log(data,"wljdgehfdewdhewdyf")
  const {register, handleSubmit, watch} = useForm()
  const [status, setStatus] = useState(undefined);
  const [errors,setErrors] = useState(undefined)
  const onSubmit = async(data) => {
    data.token=parseInt(data.token)
    await ax
    .post(`/auth/reset-password`,data )
    .then((res) => {
      setStatus({ type: "success" });
      setTimeout(() => {
        router.push("/pages/login");
      }, 1000);
    }).catch((err)=>{
      if(err.response.data.errors){
        setErrors(err.response.data.errors)
      }else{
        setErrors(undefined)
        setStatus({ type: "error",message: err.response.data.message });
      }
    })
  }
  const [checked, setChecked] = useState(true)

  return (
    <>
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Forget successfull', 'Success')}
      </div>
    </div>
    )}
    {status?.type === "error" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.error(status.message, 'Error')}
      </div>
    </div>
    )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-sm mb-4">
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Email address</span>
            <input
              name="email"
              type="email"
              ref={register({required: true})}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your email"
              required
              value={data.email}
              readOnly
            />
          </label>
          {errors && errors.name && (
            errors.name.map((err)=>{
             return <p className="mt-1 text-xs text-red-500">{err}</p>
            })
           
          )}
        </div>
        <div className="w-full mb-4">
        <label className="block">
          <span className="text-default">Token</span>
          <input
            name="token"
            type="number"
            ref={register({required: true})}
            className="form-input mt-1 text-xs block w-full bg-white"
            placeholder="Enter your token"
            required
          />
        </label>
        {errors && errors.token && (
          errors.token.map((err)=>{
           return <p className="mt-1 text-xs text-red-500">{err}</p>
          })
         
        )}
      </div>
      <div className="w-full mb-4">
      <label className="block">
        <span className="text-default">Password</span>
        <input
          name="password"
          type="text"
          ref={register({required: true})}
          className="form-input mt-1 text-xs block w-full bg-white"
          placeholder="Enter your password"
          required
        />
      </label>
      {errors && errors.password && (
        errors.password.map((err)=>{
         return <p className="mt-1 text-xs text-red-500">{err}</p>
        })
       
      )}
    </div>

        <div className="w-full">
          <input
            type="submit"
            className="btn btn-default btn-block btn-indigo btn-rounded"
            value="Reset password"
          />
        </div>
      </form>

      <div className="w-full">
        <span>
          <Link href="/pages/login">
            <a className="link">
              Go back to login
            </a>
          </Link>
        </span>
      </div>
    </>
  )
}

export default ForgotPassword2
