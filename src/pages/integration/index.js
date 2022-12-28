import {withRedux} from '../../lib/redux'
import Layout from '../../layouts'
import Link from "next/link";
import { useState } from 'react';
import Datatable from "../../components/datatable";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications'
import React from "react";
import SectionTitle from '../../components/section-title'
import {Badge} from '../../components/badges'
import ConfirmationModal from "../../components/confirmationmodal"
import {useSelector, shallowEqual} from 'react-redux';
import Card from "./card"
import { useRouter } from "next/router";
import { Pagination } from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'

const Integration=()=>{
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 1;
  const integrationLength=0;
 const [integrations,setIntegrations]=useState([])
 const [status, setStatus] = useState(undefined);
 const [searchQuery, setSearchQuery] = useState("");
 const [permissions,setPermissions]=React.useState({get:false,update:false,delete:false,view:false})
 const [deleteId,setDeleteId]=React.useState(undefined)
 const [showDeletePopup,setShowDeletePopup]=React.useState(false)
 const {userpermissions} = useSelector(
  state => ({
    userpermissions: state.userpermissions,
  }),
  shallowEqual
)

  const getIntegrations = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/integrations", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setIntegrations(res.data);
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
        console.error("get /Integrations error", err);
      });
  };

  const getPermissions = async () => {
        let permissions={get:false,update:false,delete:false,view:false,add:false}
        permissions["get"]= userpermissions.includes("integrations.index") && getIntegrations()
        permissions["update"]= userpermissions.includes("integrations.update")
        permissions["delete"]= userpermissions.includes("integrations.destroy")
        permissions["view"]= userpermissions.includes("integrations.show")
        permissions["add"]= userpermissions.includes("integrations.store")
        setPermissions({...permissions})
  };

  React.useEffect(() => {
    
    getPermissions();
  }, []);

  const ConfirmationPopup=(id)=>{
    setDeleteId(id)
    setShowDeletePopup(true)
   }

   const onCancel=()=>{
  setStatus(undefined)
    setShowDeletePopup(false)

   }

   const onSubmit=()=>{
    deleteIntegration()
   }

     const deleteIntegration = () => {

  const token = localStorage.getItem('token');

    ax.delete(`/integrations/${deleteId}`, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setShowDeletePopup(false)

        setStatus({ type: "success" });
        setTimeout(() => {
        setStatus(undefined);

            getIntegrations();
        }, 1000);
      })
      .catch((err) => {
        setShowDeletePopup(false)

        setStatus({ type: "error",message: err.response.data.message });
      });
 
};

const navigateActivate=(id,type=undefined)=>{
  if(type){
    ConfirmationPopup(id);
    return
  }
  router.push({
    pathname:  "/integration/activateIntegration",
    query: { activateID: id },
  }
   )
}
  return (
    <Layout className="overflow-x-scroll">
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

    <SectionTitle title="Integration Management" subtitle="" />

    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Deleted integration successfully', 'Success')}
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
      <div className="flex flex-row pb-4">
      <div className=" w-5/6">
        <input
          type="text"
          name="search"
          className="w-full p-2 ..."
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="w-1/6 ">
        {" "}
        {!  permissions.add &&  <Link href={`/integration/addIntegration`}>
        <button
          className="ml-3  btn btn-default btn-indigo create-btn w-full"
          type="button"
        >
          Add Integration
        </button>
    </Link>}
       
      </div>
    </div>
    {integrations?.filter((val) => {
      if (searchQuery == "") {
        return val;
      } else if (
       (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.slug.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        val.channel_slug.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        val.http_method.toLowerCase().includes(searchQuery.toLocaleLowerCase())
        ) 
      ) {
        return val;
      }
    }).slice((currentPage - 1) * pagePostsLimit, currentPage * pagePostsLimit)
    .map((value, idx) => {return (
      <Card data={value} permissions={permissions} navigateActivate={navigateActivate}></Card>
    )})}
    <Pagination
      currentPage={currentPage}
      itemsPerPage={pagePostsLimit}
      onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      totalItems={integrations?.filter((val) => {
        if (searchQuery == "") {
          return val;
        } else if (
         (val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.slug.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
          val.channel_slug.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
          val.http_method.toLowerCase().includes(searchQuery.toLocaleLowerCase())
          ) 
        ) {
          return val;
        }
      }).length}
      pageNeighbours={2}
    />










     
    </Layout>
    )
}

export default withRedux(Integration)
