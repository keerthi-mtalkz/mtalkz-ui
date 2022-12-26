import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {ax} from "../../utils/apiCalls"
import {useDispatch} from 'react-redux'
import moment from 'moment';




const Login1 = () => {
  const dispatch = useDispatch()
  const {register, handleSubmit, watch, errors} = useForm()
  const router = useRouter()
  const [status, setStatus] = useState(undefined);

  const getPermissions=async ()=>{
    const token = localStorage.getItem('token');
    await ax
      .get("/auth/permissions", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        dispatch({
          type: 'UPDATE_PERMISSIONS',
          value: res.data.permissions
        })
      })
      .catch((err) => {
    });
  }

  const onSubmit = async(data) => {
    await ax
    .post("/auth/login", data)
    .then((res) => {
      console.log()
      setStatus({ type: "success" });
      res.data.user.img="m1.png"
      localStorage.setItem("token",res.data.token)
      localStorage.setItem('tokenGeneratedTime', moment(new Date()));
      localStorage.setItem('tokenExpireTime',2880)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      localStorage.setItem("userName", res.data.user.name)

      dispatch({
        type: 'UPDATE_USER',
        value: res.data.user
      })
      getPermissions()
      setTimeout(() => {
      router.push("/dashboard");
      }, 1000);
    })
    .catch((err) => {
      if(err.response.data. message){
        setStatus({ type: "error",message: err.response.data.errors.password[0] });
      }else{
        setStatus({ type: "error", message: `Invalid credentials. Please try again with the correct credentials.` });
      }
      console.error("get login error", err.response.data.message);
    });
    
  };


  return (
    <>
    {status?.type === "error" && (
      <div className="bg-red-500 text-white rounded w-full p-3 text-sm mb-4">
       {status.message}
       <br/>
       If you need an account, please <a href="https://mtalkz.com/request-demo/" className="font-bold">reach out to us</a>.
      </div>
    )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-sm mb-4 w-full">
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Email</span>
            <input
              name="email"
              type="email"
              ref={register({required: true})}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your email"
            />
          </label>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">Email is required</p>
          )}
        </div>
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Password</span>
            <input
              name="password"
              type="password"
              ref={register({required: true})}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your password"
            />
          </label>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">Password is required</p>
          )}
        </div>

        <div className="w-full">
          <input
            type="submit"
            className="px-4 py-3 uppercase font-bold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:outline-none active:outline-none"
            value="Login"
          />
        </div>
      </form>

      

      <div className="w-full children-x-1">
        <span className="text-secondary">New user?</span>
        <span>
          <Link href="https://mtalkz.com/request-demo/">
            <a className="link">
              Request an account
            </a>
          </Link>
        </span>
      </div>
      <div className="w-full">
        <span>
          <Link href="/pages/forgot-password">
            <a className="link">
              Forgot password?
            </a>
          </Link>
        </span>
      </div>
    </>
  )
}

export default Login1
