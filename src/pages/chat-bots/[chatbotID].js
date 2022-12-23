import ls from 'local-storage';
import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { NotificationManager } from 'react-notifications';
import { shallowEqual, useSelector } from 'react-redux';
import Switch from 'react-switch';
import { Badge } from '../../components/badges';
import ConfirmationModal from "../../components/confirmationmodal";
import Datatable from "../../components/datatable";
import SectionTitle from '../../components/section-title';
import { UnderlinedTabs } from "../../components/tabs";
import Layout from '../../layouts';
import { withRedux } from '../../lib/redux';
import { ax } from "../../utils/apiCalls";

const ChatbotConfiguration = () => {
  /** Chatbot data Management */
  const { register, handleSubmit } = useForm();
  const [chatbot, setChatbot] = useState({});
  const [flowCharts, setFlowCharts] = useState([]);
  const [status, setStatus] = useState(undefined);
  const [flowchartWelcome, setFlowchartWelcome] = useState(false);
  const [errors, setErrors] = useState(undefined);
  const router = useRouter();
  const handleDataUpdate = (e) => {
    const { name, value } = e.target;
    setChatbot({ ...chatbot, [name]: value });
  }

  /** Chatbot Operations */
  const chatid = useRouter().query.chatbotID;
  const token = ls.get("token");

  const fetchChatbot = () => {
    ax.get('/chatbots/' + chatid, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      const cb = res?.data;
      if (cb) {
        setChatbot(cb.chatbot);
        setFlowchartWelcome(cb.chatbot?.welcome_type === 'flowchart');
        setFlowCharts(cb.flowcharts);
      }
    }).catch((err) => {
      console.error("errorhgfg ufuf fur uyiefjef fhref ")
    });
  }

  const onSubmit = () => {
    const data = {
      name: chatbot.name,
      published: chatbot.published,
      welcome_type: flowchartWelcome ? 'flowchart' : 'message',
      welcome_text: chatbot.welcome_text,
      welcome_flowchart_id: chatbot.welcome_flowchart_id,
      unrecognized_input_message: chatbot.unrecognized_input_message,
      timeout_seconds: chatbot.timeout_seconds || null,
      timeout_message: chatbot.timeout_message || null,
      exit_keyword: chatbot.exit_keyword || null,
      exit_message: chatbot.exit_message || null
    }
    ax.put('/chatbots/' + chatid, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setStatus({ type: "success", message: "Saved chatbot successfully" });
      setTimeout(() => {
        router.push("/chat-bots");
      }, 1000);
    }).catch((err) => {
      if (err.response.data.errors) {
        setErrors(err.response.data.errors)
      } else {
        setStatus({ type: "error", message: err.response.data.message });
      }
    });
  }

  useEffect(() => {
    fetchChatbot();
  }, [])

  return (
    <div>
      <SectionTitle title="Update Chatbot" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Chatbot Updated Successfully', '')}
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row col-gap-4 text-sm mb-4"
      >
        {/*input*/}
        <div className="w-full lg:w-1/3">
          <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">Name</span>
              <span className="text-red-600" >*</span>

              <input
                name="name"
                type="text"
                ref={register({ required: true, maxLength: 25 })}
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter chatbot name"
                value={chatbot.name}
                onChange={handleDataUpdate}
                required
              />
            </label>
            {errors && errors.name && (
              errors.name.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })
            )}
          </div>

          <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">Unrecognize Input Message</span>
              <span className="text-red-600" >*</span>

              <textarea
                name="unrecognized_input_message"
                ref={register({ required: false, maxLength: 255 })}
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter Unrecognize Input Message"
                onChange={handleDataUpdate}
                value={chatbot.unrecognized_input_message}
              ></textarea>
            </label>
            {errors && errors.unrecognized_input_message && (
              errors.unrecognized_input_message.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })
            )}
          </div>

          <div className="w-full mb-3">
            <label className="block">
              <span className="text-default">Welcome Type</span>
            </label>
          </div>
          <div className="grid grid-cols-3 w-full mb-4">
            <span>Message</span>
            <Switch
              checked={flowchartWelcome}
              onChange={(checked) => setFlowchartWelcome(checked)}
              offColor="#2c5282"
              onColor="#553c9a"
              uncheckedIcon={false}
              checkedIcon={false}
            />
            <span>Flowchart</span>
          </div>

          {flowchartWelcome ?
            <div className="w-full mb-4">
              <label className="block">
                <span className="text-default">Welcome Flowchart</span>
                <span className="text-red-600">*</span>

                <select
                  name="welcome_flowchart_id"
                  ref={register()}
                  className="form-select mt-1 text-xs block w-full bg-white"
                  value={chatbot.welcome_flowchart_id}
                  onChange={handleDataUpdate}
                >
                  <option>(Select a Flowchart)</option>
                  {flowCharts.map(fc => (
                    <option value={fc.id}>{fc.name}</option>
                  ))}
                </select>
              </label>

              {errors && errors.welcome_flowchart_id && (
                errors.welcome_flowchart_id.map((err) => {
                  return <p className="mt-1 text-xs text-red-500">{err}</p>
                })
              )}
            </div>
            :
            <div className="w-full mb-4">
              <label className="block">
                <span className="text-default">Welcome Text</span>
                <span className="text-red-600">*</span>

                <textarea
                  name="welcome_text"
                  ref={register({ required: false, maxLength: 255 })}
                  className="form-input mt-1 text-xs block w-full bg-white"
                  placeholder="Enter message"
                  onChange={handleDataUpdate}
                  value={chatbot.welcome_text}
                ></textarea>
              </label>

              {errors && errors.welcome_text && (
                errors.welcome_text.map((err) => {
                  return <p className="mt-1 text-xs text-red-500">{err}</p>
                })
              )}
            </div>
          }

          <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">Node Execution Limit (per User Session)</span>
              <span className="text-red-600">*</span>

              <input
                name="node_execution_limit"
                type="number"
                min="5"
                max="100"
                step="1"
                ref={register({ required: true, min: 5, max: 100 })}
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter a number"
                value={chatbot.node_execution_limit}
                onChange={handleDataUpdate}
              />
            </label>
            {errors && errors.node_execution_limit && (
              errors.node_execution_limit.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })
            )}
          </div>

          <div className="w-full mb-4">
            <label className="block flex justify-between">
              <span className="text-default">Published</span>

              <Switch
                checked={chatbot.published}
                onChange={(checked) => handleDataUpdate({ target: { name: 'published', value: checked } })}
              />
            </label>
            {errors && errors.timeout_seconds && (
              errors.timeout_seconds.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">TimeOut (in seconds)</span>

              <input
                name="timeout_seconds"
                type="number"
                min="1"
                max="3600"
                step="1"
                ref={register({ required: false, min: 1, max: 3600 })}
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter Time Out Duration"
                value={chatbot.timeout_seconds}
                onChange={handleDataUpdate}
              />
            </label>
            {errors && errors.timeout_seconds && (
              errors.timeout_seconds.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })
            )}
          </div>

          <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">TimeOut Message</span>

              <textarea
                name="timeout_message"
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter Time Out Message"
                onChange={handleDataUpdate}
                value={chatbot.timeout_message}
              ></textarea>
            </label>
            {errors && errors.timeout_message && (
              errors.timeout_message.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })
            )}
          </div>

          <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">Exit Keyword</span>

              <input
                name="exit_keyword"
                type="text"
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter Exit Keyword"
                value={chatbot.exit_keyword}
                onChange={handleDataUpdate}
              />
            </label>
            {errors && errors.exit_keyword && (
              errors.exit_keyword.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })
            )}
          </div>

          <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">Exit Message</span>

              <textarea
                name="exit_message"
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter Exit Message"
                onChange={handleDataUpdate}
                value={chatbot.exit_message}
              ></textarea>
            </label>
            {errors && errors.exit_message && (
              errors.exit_message.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })
            )}
          </div>
          <div className="w-full">
            <input
              type="submit"
              className="btn btn-default btn-block btn-indigo btn-rounded"
              value="Submit"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

const KeywordsList = () => {
  const [keywords, setKeywords] = useState([])
  const [status, setStatus] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [permissions, setPermissions] = React.useState({ get: false, update: false, delete: false, view: false })
  const [deleteId, setDeleteId] = React.useState(undefined)
  const [showDeletePopup, setShowDeletePopup] = React.useState(false)
  const { userpermissions } = useSelector(
    state => ({
      userpermissions: state.userpermissions,
    }),
    shallowEqual
  )

  const chatid = useRouter().query.chatbotID;
  const token = ls.get("token");

  const getKeywords = () => {
    ax.get("/keywords?chatbot_id=" + chatid, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setKeywords(res.data);
    }).catch((err) => {
      setStatus({ type: "error", message: err.response.data.message });
      console.error("get /keywords error", err);
    });
  };

  const getPermissions = async () => {
    let permissions = { get: false, update: false, delete: false, view: false, add: false }
    permissions["get"] = userpermissions.includes("chatbots.index") && getKeywords()
    permissions["update"] = userpermissions.includes("chatbots.update")
    permissions["delete"] = userpermissions.includes("chatbots.destroy")
    permissions["view"] = userpermissions.includes("chatbots.show")
    permissions["add"] = userpermissions.includes("chatbots.store")
    setPermissions({ ...permissions })
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
    deleteKeyword()
  }

  const deleteKeyword = () => {
    ax.delete(`/keywords/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setShowDeletePopup(false)
      setStatus({ type: "success" });
      setTimeout(() => {
        setStatus(undefined);
        getKeywords();
      }, 1000);
    }).catch((err) => {
      setShowDeletePopup(false)
      setStatus({ type: "error", message: err.response.data.message });
    });
  };

  const columns = [
    {
      Header: 'Keyword',
      accessor: 'key',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Type',
      sortable: true,
      Cell: (data) => (
        <Badge size='sm' color={data.row.original.type === 'flowchart' ? 'blue' : 'green'} rounded>{data.row.original.type}</Badge>
      )
    },
    {
      Header: 'Flowchart / Message',
      sortable: false,
      Cell: (data) => (
        <span>
          {data.row.original.type === 'flowchart' ? data.row.original.flowchart?.name : data.row.original.message}
        </span>
      )
    },
    {
      Header: 'Actions',
      sortable: false,
      Cell: (data) => (
        <div className="flex justify-evenly ">
          {permissions.update && (
            <Link href={`keywords/update/${chatid}-${data.row.original.id}`}>
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
    <div>
      {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Deleted keyword successfully', 'Success')}
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
            <Link href={`keywords/add/${chatid}`}>
              <button
                className="ml-3  btn btn-default btn-indigo create-btn w-full"
                type="button"
              >
                Add Keyword
              </button>
            </Link>
          )}
        </div>
      </div>

      <Datatable columns={columns} data={keywords?.filter((val) => {
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
      }).map((value) => { return value })} className="overflow-x-scroll" />
    </div>
  )
}

const FlowchartsList = () => {
  const [flowcharts, setFlowcharts] = useState([])
  const [status, setStatus] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [permissions, setPermissions] = React.useState({ get: false, update: false, delete: false, view: false })
  const [deleteId, setDeleteId] = React.useState(undefined)
  const [showDeletePopup, setShowDeletePopup] = React.useState(false)
  const { userpermissions } = useSelector(
    state => ({
      userpermissions: state.userpermissions,
    }),
    shallowEqual
  )

  const chatid = useRouter().query.chatbotID;
  const token = ls.get('token');

  const getFlowcharts = () => {
    ax.get("/flowcharts?chatbot_id=" + chatid, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setFlowcharts(res.data);
    }).catch((err) => {
      setStatus({ type: "error", message: err.response.data.message });
      console.error("get /flowcharts error", err);
    });
  };

  const getPermissions = async () => {
    let permissions = { get: false, update: false, delete: false, view: false, add: false }
    permissions["get"] = userpermissions.includes("chatbots.index") && getFlowcharts()
    permissions["update"] = userpermissions.includes("chatbots.update")
    permissions["delete"] = userpermissions.includes("chatbots.destroy")
    permissions["view"] = userpermissions.includes("chatbots.show")
    permissions["add"] = userpermissions.includes("chatbots.store")
    setPermissions({ ...permissions })
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
    deleteFlowchart()
  }

  const deleteFlowchart = () => {
    ax.delete(`/flowcharts/${deleteId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setShowDeletePopup(false)
      setStatus({ type: "success" });
      setTimeout(() => {
        setStatus(undefined);
        getFlowcharts();
      }, 1000);
    }).catch((err) => {
      setShowDeletePopup(false)
      setStatus({ type: "error", message: err.response.data.message });
    });
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Variables',
      accessor: 'variables.length',
    },
    {
      Header: 'Nodes',
      accessor: 'nodes.length',
    },
    {
      Header: 'Actions',
      sortable: false,
      Cell: (data) => (
        <div className="flex justify-evenly ">
          {permissions.view && (
            <Link href={`flowcharts/${chatid}-${data.row.original.id}-1`}>
              <p>
                <i className="icon-eye text-1xl font-bold mb-2"></i>
              </p>
            </Link>
          )}
          {permissions.update && (
            <Link href={`flowcharts/${chatid}-${data.row.original.id}`}>
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
    <div>
      {showDeletePopup && <ConfirmationModal onCancel={onCancel} onSubmit={onSubmit} > </ConfirmationModal>}

      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Deleted flowchart successfully', 'Success')}
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
            <Link href={`flowcharts/${chatid}`}>
              <button
                className="ml-3  btn btn-default btn-indigo create-btn w-full"
                type="button"
              >
                Add Flow
              </button>
            </Link>
          )}
        </div>
      </div>

      <Datatable columns={columns} data={flowcharts?.filter((val) => {
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
      }).map((value) => { return value })} className="overflow-x-scroll" />
    </div>
  )
}

const FlowchartsLibrary = () => {
  const [flowcharts, setFlowcharts] = useState([])
  const [status, setStatus] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [permissions, setPermissions] = React.useState({ get: false, add: false, view: false })
  const { userpermissions } = useSelector(
    state => ({
      userpermissions: state.userpermissions,
    }),
    shallowEqual
  )

  const chatid = useRouter().query.chatbotID;
  const token = ls.get('token');

  const getFlowcharts = () => {
    ax.get("/flowcharts?public=1", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setFlowcharts(res.data);
    }).catch((err) => {
      setStatus({ type: "error", message: err.response.data.message });
      console.error("get /flowcharts error", err);
    });
  };

  const getPermissions = async () => {
    let permissions = { get: false, view: false, add: false }
    permissions["get"] = userpermissions.includes("chatbots.index") && getFlowcharts()
    permissions["view"] = userpermissions.includes("chatbots.show")
    permissions["add"] = userpermissions.includes("chatbots.store")
    setPermissions({ ...permissions })
  };

  React.useEffect(() => {
    getPermissions();
  }, []);

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Variables',
      accessor: 'variables.length',
    },
    {
      Header: 'Nodes',
      accessor: 'nodes.length',
    },
    {
      Header: 'Actions',
      sortable: false,
      Cell: (data) => (
        <div className="flex justify-evenly ">
          {permissions.view && (
            <Link href={`flowcharts/import/${chatid}-${data.row.original.id}-1`}>
              <p>
                <i className="icon-eye text-1xl font-bold mb-2"></i>
              </p>
            </Link>
          )}
          {permissions.add && (
            <Link href={`flowcharts/import/${chatid}-${data.row.original.id}`}>
              <p>
                <i className="icon-note text-1xl font-bold mb-2"></i>
              </p>
            </Link>
          )}
        </div>
      )
    }
  ]
  return (
    <div>
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.error(status.message, 'Error')}
          </div>
        </div>
      )}
      <div className="flex flex-row pb-4">
        <div className=" w-full">
          <input
            type="text"
            name="search"
            className="w-full p-2 ..."
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>

      <Datatable columns={columns} data={flowcharts?.filter((val) => {
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
      }).map((value) => { return value })} className="overflow-x-scroll" />
    </div>
  )
}

const Chatbot = () => {
  const tabs = [
    { index: 0, title: "Configuration", content: <ChatbotConfiguration /> },
    { index: 1, title: "Keywords", content: <KeywordsList /> },
    { index: 2, title: "Flows", content: <FlowchartsList /> },
    { index: 3, title: "Library", content: <FlowchartsLibrary /> },
  ];
  return (
    <Layout>
      <div className="flex flex-wrap">
        <div className="w-full">
          <UnderlinedTabs tabs={tabs} />
        </div>
      </div>
    </Layout>
  )
}


export default withRedux(Chatbot)