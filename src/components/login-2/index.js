import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {ax} from "../../utils/apiCalls"
import {useDispatch} from 'react-redux'




const Login1 = () => {
  const dispatch = useDispatch()
  const {register, handleSubmit, watch, errors} = useForm()
  const router = useRouter()
  const [status, setStatus] = useState(undefined);


  const onSubmit = async(data) => {
    await ax
    .post("/auth/login", data)
    .then((res) => {
      setStatus({ type: "success" });
      res.data.user.img="m1.png"
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      localStorage.setItem("userName", res.data.user.name)

      dispatch({
        type: 'UPDATE_USER',
        value: res.data.user
      })
      setTimeout(() => {
      router.push("/dashboard");
      }, 1000);
    })
    .catch((err) => {
      console.error("get login error", err);
    });
    
  };

  return (
    <>
    {status?.type === "error" && (
      <div className="bg-red-500 text-white rounded w-full flex flex-wrap items-center justify-start p-3 text-sm mb-4">
        Invalid login. Please try again
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
          <Link href="/pages/create-account">
            <a className="link">
              Create account here
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
