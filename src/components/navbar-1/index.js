import Link from 'next/link'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import { Menu} from 'react-feather'
import DropdownWidget5 from '../dropdown-widgets/dropdown-widget-5'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Select from "react-select";
import { getColor, toRGB } from "../../functions/colors";
import {ax} from "../../utils/apiCalls"
import {NotificationManager} from 'react-notifications';


const Navbar = () => {
  const [organizations,setOrganizations]=useState([])
  const [selectedOrganization,setSelectedOrganization]=useState([])
  const {toggleRightSidebar, collapsed,user} = useSelector(
    state => ({
      toggleRightSidebar: state.toggleRightSidebar,
      collapsed: state.collapsed,
      user:state.user
    }),
    shallowEqual
  )
 
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
      localStorage.removeItem("orgName")
      localStorage.removeItem("orgId")
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
      .then(async(res) => {
        setOrganizations(res?.data?.organizations);
      const org=  res?.data?.organizations.filter((o)=>o.id===user.current_organization_id)
      if(localStorage.getItem('orgName')==null){
        setSelectedOrganization([{ label: org[0].name, value: org[0].id }])
        localStorage.setItem('orgName',org[0].name)
        localStorage.setItem('orgId', org[0].id )
     
      }else{
        setSelectedOrganization([{ label: localStorage.getItem('orgName'), value: localStorage.getItem('orgId')}])
      }
      })
      .catch((err) => {
        console.error("get /organizations error", err);
      });
  };

  useEffect(()=>{
  },[selectedOrganization])

  useEffect(()=>{
    getOraganizations()

  },[])

  const options = organizations?.map((value) => {
    return { label: value.name, value: value.id };
  });

  let handleSwitch = (value) => {
    const token= localStorage.getItem("token");

    setSelectedOrganization([{ label: value.label, value: value.value}])
 localStorage.setItem('orgName',value.label)
      localStorage.setItem('orgId', value.value )

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
      router.push("/dashboard");
           
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
        <div style={{ width: "300px", marginRight:"20px" }}>
          <Select
            options={options}
            // isMulti={true}
            placeholder="Select organization ..."
            onChange={handleSwitch}
            defaultValue={selectedOrganization}
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
            value={selectedOrganization}
          />
          {/*  <DropdownWidget5 />*/}
        </div>
       
        <Link href="/pages/login-1">
          <a className="btn btn-default flex lg:hidden">Logout</a>
        </Link>
     
        <div className='mr-5 cursor-pointer' onClick={()=>{logOut()}}>LOGOUT</div>
      
      </div>
    </div>
  )
}

export default Navbar
