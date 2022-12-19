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
import ConfirmationModal from "../../components/confirmationmodal"


const Navbar = () => {
  const [organizations,setOrganizations]=useState([])
  const [selectedOrganization,setSelectedOrganization]=useState([])
  const [showDeletePopup,setShowDeletePopup]=useState(false)
  const [deleteId,setDeleteId]=useState(undefined)

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
    const token= sessionStorage.getItem("token");
    await ax
      .get("/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then((res) => {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("user")
      sessionStorage.removeItem("orgName")
      sessionStorage.removeItem("orgId")
      router.push("/pages/login");
    })
    .catch((err) => {
      console.error("get logout error", err);
    });
  }
  
  const getOraganizations = async () => {
    const token= sessionStorage.getItem("token");
    await ax
      .get("/auth/organizations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async(res) => {
        setOrganizations(res?.data?.organizations);
      const org=  res?.data?.organizations.filter((o)=>o.id===user.current_organization_id)
      if(sessionStorage.getItem('orgName')==null){
        setSelectedOrganization([{ label: org[0].name, value: org[0].id }])
        sessionStorage.setItem('orgName',org[0].name)
        sessionStorage.setItem('orgId', org[0].id )
     
      }else{
        setSelectedOrganization([{ label: sessionStorage.getItem('orgName'), value: sessionStorage.getItem('orgId')}])
      }
      })
      .catch((err) => {
        console.error("get /organizations error", err);
      });
  };

  useEffect(()=>{
  },[selectedOrganization])

  const getPermissions=async ()=>{
    const token = sessionStorage.getItem('token');
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
  const ConfirmationPopup=(id)=>{
    setDeleteId(id)
    setShowDeletePopup(true)
   }

   const onCancel=()=>{
    setShowDeletePopup(false)

   }

   const onSubmit=()=>{
    handleSwitch(deleteId)
   }

  useEffect(()=>{
    NotificationManager.removeAll()
    getOraganizations()
   getPermissions()
  },[])

  const options = organizations?.map((value) => {
    return { label: value.name, value: value.id };
  });

  let handleSwitch = (value) => {
    const token= sessionStorage.getItem("token");
    setSelectedOrganization([{ label: value.label, value: value.value}])
 sessionStorage.setItem('orgName',value.label)
      sessionStorage.setItem('orgId', value.value )

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
    setShowDeletePopup(false)

           
        })
        .catch((err) => {
    setShowDeletePopup(false)

          console.error("get /organizations error", err.message);
        });
   
  };

  return (
    <div className="navbar navbar-1">
    {showDeletePopup && <ConfirmationModal title='Confirmation' content="Do you want to switch" onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

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
            onChange={ConfirmationPopup}
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
