import React, {useState} from 'react'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import {ax} from "../../utils/apiCalls";
import { useRouter } from "next/router";
import {NotificationManager} from 'react-notifications'

let socialMediaColors = {
  facebook: '#365397',
  linkedin: '#006db3',
  google: '#e0452c',
  github: '#2f2f2f'
}

const CreateAccount = () => {
  const {register, handleSubmit, watch} = useForm()
  const [status, setStatus] = useState(undefined);
  const [errors,setErrors] = useState(undefined)
  const router = useRouter();

  const onSubmit =async (data) => {
    await ax
    .post(`/auth/register`,data )
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
      { NotificationManager.success('Sign up successful', 'Success')}
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col text-sm mb-4">
        {/*input*/}
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Name</span>
            <input
              name="name"
              type="text"
              ref={register({required: true})}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your name"
              required
            />
          </label>
          {errors && errors.name && (
            errors.name.map((err)=>{
             return <p className="mt-1 text-xs text-red-500">{err}</p>
            })
           
          )}
</div>
        {/*input*/}
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
              autoComplete="off"
              
            />
          </label>
          {errors && errors.email && (
            errors.email.map((err)=>{
             return <p className="mt-1 text-xs text-red-500">{err}</p>
            })
           
          )}
        </div>

        {/*input*/}
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Password</span>
            <input
              name="password"
              type="password"
              ref={register({required: true})}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter your password"
              required
              autoComplete="off"
            />
          </label>
          {errors && errors.password && (
            errors.password.map((err)=>{
             return <p className="mt-1 text-xs text-red-500">{err}</p>
            })
           
          )}
        </div>

        {/*input*/}
        <div className="w-full mb-4">
          <div className="inline-block">
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  name="terms"
                  ref={register()}
                  type="checkbox"
                  className="form-checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <span className="ltr:ml-2 rtl:mr-2">
                  I agree to the{' '}
                  <Link href="/pages/terms-of-service">
                    <a className="link">Terms of service</a>
                  </Link>{' '}
                  and{' '}
                  <Link href="/pages/privacy-policy">
                    <a className="link">Privacy policy</a>
                  </Link>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="w-full">
          <input
            type="submit"
            className="btn btn-default btn-block btn-indigo btn-rounded"
            value="Sign up"
          />
        </div>
      </form>

      <div className="w-full mb-4 text-center">
        <p className="text-secondary mb-2">Or sign up with</p>
        <div className="flex w-full flex-row justify-center items-center children-x-2">
          <i
            className={`icon-social-facebook text-xl`}
            style={{color: socialMediaColors['facebook']}}></i>
          <i
            className={`icon-social-google text-xl`}
            style={{color: socialMediaColors['google']}}></i>
          <i
            className={`icon-social-linkedin text-xl`}
            style={{color: socialMediaColors['linkedin']}}></i>
          <i
            className={`icon-social-github text-xl`}
            style={{color: socialMediaColors['github']}}></i>
        </div>
      </div>

      <div className="w-full children-x-1">
        <span className="text-secondary">Already have an account?</span>
        <span>
          <Link href="/pages/login">
            <a className="link">
              Login here
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

export default CreateAccount
