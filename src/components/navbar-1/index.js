import Link from 'next/link'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import { Menu} from 'react-feather'
import DropdownWidget5 from '../dropdown-widgets/dropdown-widget-5'
import axios from "axios";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Select from "react-select";
import { getColor, toRGB } from "../../functions/colors";


const Navbar = () => {
  const [organizations,setOrganizations]=useState([])
  const {toggleRightSidebar, collapsed} = useSelector(
    state => ({
      toggleRightSidebar: state.toggleRightSidebar,
      collapsed: state.collapsed
    }),
    shallowEqual
  )
  const ax = axios.create({
  
    baseURL: 'https://app.mtalkz.cloud/api',
    // baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      // 'Authorization': `Bearer ${token}`
     }
     
  })
  const dispatch = useDispatch();
  const router = useRouter()


  const logOut =async ( ) =>{

    const token= localStorage.getItem("token");
    await ax
      .get("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then((res) => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/pages/login");
    })
    .catch((err) => {
      console.error("get logout error", err);
    });
  }
  
  const getOraganizations = async () => {
    const token= localStorage.getItem("token");
    await ax
      .get("/auth/organizations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrganizations(res?.data?.organizations)
     
        console.log("data Check");
      })
      .catch((err) => {
        console.error("get /organizations error", err);
      });
  };

  useEffect(()=>{
    getOraganizations()
  },[])

  const options = organizations?.map((value) => {
    return { label: value.name, value: value.id };
  });

  let handleSwitch = (value) => {
    const token= localStorage.getItem("token");


    const answer = window.confirm("are you sure?");
    if (answer) {
      // Save it!
      ax.post(
        `/auth/organizations/switch`,
        { organization_id: value.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
        
        })
        .catch((err) => {
          console.error("get /organizations error", err.message);
        });
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  return (
    <div className="navbar navbar-1">
      <div className="navbar-inner w-full flex items-center justify-start">
        <button
          onClick={() =>
            dispatch({
              type: 'SET_CONFIG',
              config: {
                key: 'collapsed',
                value: !collapsed
              }
            })
          }
          className="mx-4">
          <Menu size={20} />
        </button>
        <span className="ltr:ml-auto rtl:mr-auto"></span>
        <div style={{ width: "300px" }}>
          <Select
            options={options}
            // isMulti={true}
            placeholder="Select organization ..."
            onChange={handleSwitch}
            // defaultValue={{ label: getdata.label, value: getdata.value }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: getColor("bg-blue-500"),
                primary25: toRGB(getColor("bg-blue-500"), 0.25),
                primary50: toRGB(getColor("bg-blue-500"), 0.5),
                primary75: toRGB(getColor("bg-blue-500"), 0.75),
                danger: getColor("bg-red-500"),
                dangerLight: toRGB(getColor("bg-red-500"), 0.25),
              },
            })}
          />
        </div>
         <DropdownWidget5 />
        <Link href="/pages/login-1">
          <a className="btn btn-default flex lg:hidden">Logout</a>
        </Link>
     
        <div onClick={()=>{logOut()}}>LOGOUT</div>
      
      </div>
    </div>
  )
}

export default Navbar
