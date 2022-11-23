import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../layouts";
import { withRedux } from "../../lib/redux";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import {NotificationManager} from 'react-notifications'
import Icon from '../../components/icon'
import ls from 'local-storage'
import ConfirmationModal from "../../components/confirmationmodal"

// fetch chatbots
const Chatbots = () => {
  const [chatbots, setChatbots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(undefined);
  const [showDeletePopup,setShowDeletePopup]=React.useState(false)
  const [deleteId,setDeleteId]=useState(undefined)
  const router = useRouter();
  const user = ls.get("user");
  const fetchChatbots = async () => {
    const token = ls.get("token");
    axios
      .get("https://cb.mtalkz.cloud/export/", {
        headers: {
          "x-api-key": `Bearer ${token}`,
        },
      })
      .then((res) => setChatbots(res.data)).catch((err)=>{
      });
  };

  // Load chatbot on load

  useEffect(() => {
    fetchChatbots();
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
    handleDelete()
   }

  // Delete Chatbot

  const handleDelete = () => {

    const token = ls.get("token");

      axios
        .get(`https://cb.mtalkz.cloud/delete/${deleteId}`, {
          headers: {
            "x-api-key": `Bearer ${token}`,
          },
        })
        .then((res) => {
          setShowDeletePopup(false)
        setStatus({ type: "success" });
        setStatus(undefined);
          fetchChatbots();
        }).catch((err)=>{
          setShowDeletePopup(false)
        setStatus({ type: "error",message: err.response.data.message });
        setStatus(undefined);
        });
    
  };

  return (
    <Layout>
    {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

    {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        { NotificationManager.success('Chatbot Deleted Successfully', '')}
        </div>
      </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        <div className="p-2">
        {   NotificationManager.error(status.message, 'Error')}
        </div>
      </div>
      )}
      <div className="flex flex-row">
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
          <Link href={`/chatbots/createChatbot`}>
            <a>
              <button
                className="ml-3  btn btn-default btn-indigo create-btn w-full"
                type="button"
              >
                Add Chatbot
              </button>
            </a>
          </Link>
        </div>
      </div>

      <div className="flex flex-row flex-wrap w-full mt-4">
        {chatbots.existingChatbots
          ?.filter((val) => {
            if (searchQuery == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((value, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col w-full mb-4 lg:w-1/3 relative"
               
              >
                <p
                  className="p-4 absolute right-0"
                  style={{
                    textAlign: "right",
                    cursor: "pointer",
                    lineHeight: "normal",
                  }}
                  onClick={() =>{ if(user.is_system_user==1){
                    !value.deleted && ConfirmationPopup(value._id)
                  }
                  } }
                >
                  <i className="icon-trash text-1xl font-bold mb-2 "></i>
                </p>
                
                <Link href={ !value.deleted ? `/chatbots/${value._id}` : `/chatbots`}>
                  <a className="w-full">
                    <div className="card bg-white shadow-lg py-4 p-4"  style={{background: value.deleted?'lightgrey':'white' }}>
                      <div className="card-body">
                        <div className="title text-base font-base font-bold font-poppins">
                          {value.name}
                        </div>
                        <p className="text-secondary pb-3">
                          Phone : {value.phone}
                        </p>
                        <hr />

                        <div className="flex justify-between pt-3">
                          <div className="col-lg-6">
                            <div className="title  font-base  font-poppins">
                              Channel Type
                            </div>

                            <p className="text-secondary ">
                              <img
                                src="/images/whatsapp.svg"
                                style={{
                                  width: 12,
                                  display: "inline",
                                  marginRight: 6,
                                }}
                                alt="WhatsApp"
                              />
                              {value.channel}
                            </p>
                          </div>
                          <div className="col-lg-6">
                            <div className="title  font-base  font-poppins">
                              Created On
                            </div>

                            <p className="text-secondary ">
                            <div >
                            <Icon icon="icon-note" className="inline-block mr-1"/>
                            {new Date(value.createdAt).toLocaleString('en-IN')}
                          </div>
                            </p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </Layout>
  );
};

export default withRedux(Chatbots);
