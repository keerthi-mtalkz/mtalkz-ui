import Link from "next/link";
import React, { useState } from "react";
import { NotificationManager } from 'react-notifications';
import { shallowEqual, useSelector } from 'react-redux';
import { Badge } from '../../components/badges';
import ConfirmationModal from "../../components/confirmationmodal";
import Datatable from "../../components/datatable";
import SectionTitle from '../../components/section-title';
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import { ax } from "../../utils/apiCalls";
import ls from 'local-storage'
const Chatbot = () => {
  const [chatbots, setChatbots] = useState([])
  const [status, setStatus] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [permissions, setPermissions] = React.useState({ get: false, update: false, delete: false, view: false })
  const [deleteId, setDeleteId] = React.useState(undefined)
  const [showDeletePopup, setShowDeletePopup] = React.useState(false)
  const userpermissions = ls.get('permissions')

  const getChatbots = async () => {
    const token = localStorage.getItem('token');
    await ax.get("/chatbots", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setChatbots(res.data);
    }).catch((err) => {
      setStatus({ type: "error", message: err.response.data.message });
      console.error("get /chatbots error", err);
    });
    return true;
  };

  const getPermissions = async () => {
    let permissions = { get: false, update: false, delete: false, view: false, add: false }
    permissions["get"] = userpermissions.includes("chatbots.index")
    permissions["update"] = userpermissions.includes("chatbots.update")
    permissions["delete"] = userpermissions.includes("chatbots.destroy")
    permissions["view"] = userpermissions.includes("chatbots.show")
    permissions["add"] = userpermissions.includes("chatbots.store")
    setPermissions({ ...permissions })
    if (permissions.get) {
      getChatbots();
    }
  };

  React.useEffect(() => {
    getPermissions();
  }, []);

  const ConfirmationPopup = (id) => {
    setDeleteId(id)
    setShowDeletePopup(true)
  }

  const onCancel = () => {
    setStatus(undefined)
    setShowDeletePopup(false)
  }

  const onSubmit = () => {
    deleteChatbot()
  }

  const deleteChatbot = () => {
    const token = localStorage.getItem('token');

    ax.delete(`/chatbots/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setShowDeletePopup(false)
      setStatus({ type: "success" });
      setTimeout(() => {
        setStatus(undefined);
        getChatbots();
      }, 1000);
    }).catch((err) => {
      setShowDeletePopup(false)
      setStatus({ type: "error", message: err.response.data.message });
    });
  };

  const getChannelLabel = (channel) => {
    switch (channel) {
      case 'whatsapp':
      case 'karix-wa':
        return 'WhatsApp';
      case 'web':
      case 'open-web':
        return 'Web';
    }
    return channel;
  }

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'whatsapp':
      case 'karix-wa':
        return 'green';
      case 'web':
      case 'open-web':
        return 'blue';
    }
    return 'grey';
  }

  const columns = [
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Status',
      Cell: (data) => (
        <span>
          {data.row.original.published ? <Badge size='sm' color='green' rounded>Live</Badge> : <Badge size='sm' color='gray' rounded>Draft</Badge>}
        </span>
      )
    },
    {
      Header: 'Integration',
      accessor: 'integration_name'
    },
    {
      Header: 'Channel',
      sortable: true,
      Cell: (data) => (
        <Badge size='sm' color={getChannelColor(data.row.original.channel)} rounded>{getChannelLabel(data.row.original.channel)}</Badge>
      )
    },
    {
      Header: 'ID / Callback URL',
      Cell: (data) => (
        <span>{data.row.original.channel === 'web' ? data.row.original.mongo_id : data.row.original.callback_url}</span>
      )
    },
    {
      Header: 'Actions',
      sortable: false,
      Cell: (data) => (
        <div className="flex justify-evenly ">
          {permissions.update && (
            <Link href={`/chat-bots/${data.row.original.id}`}>
              <p>
                <i className="icon-note text-1xl font-bold mb-2"></i>
              </p>
            </Link>
          )}
          {permissions.delete && (
            <p style={{ cursor: "pointer", lineHeight: "normal" }} onClick={() => ConfirmationPopup(data.row.original.id)}>
              <i className="icon-trash text-1xl font-bold mb-2"></i>
            </p>
          )}
        </div>
      )
    }
  ]
  return (
    <Layout className="overflow-x-scroll">
      {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

      <SectionTitle title="Chatbot Management" subtitle="" />

      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Deleted chatbot successfully', 'Success')}
          </div>
        </div>
      )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.error(status.message, 'Error')}
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
          {permissions.add && (
            <Link href="/chat-bots/create">
              <button
                className="ml-3  btn btn-default btn-indigo create-btn w-full"
                type="button"
              >
                Add Chatbot
              </button>
            </Link>
          )}
        </div>
      </div>

      {permissions.get ?
        <Datatable columns={columns} data={chatbots?.filter((val) => {
          if (searchQuery == "") {
            return val;
          } else if ( 
            val.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || val.channel.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
              val.integration_name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
          ) {
            return val;
          }
        }).map((value) => { return value })} className="overflow-x-scroll" />
        : <p>You do not have permissions to view Chatbots</p>
      }
    </Layout>
  )
}

export default withRedux(Chatbot)
