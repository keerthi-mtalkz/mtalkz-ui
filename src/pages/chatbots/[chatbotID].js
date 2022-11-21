import React, { useState, useEffect } from 'react'
import Layout from '../../layouts'
import { withRedux } from '../../lib/redux'
import SectionTitle from '../../components/section-title'
import Widget from '../../components/widget'
import { useRouter } from 'next/router'
import * as Icon from 'react-feather'
import Switch from 'react-switch'
import _ from 'lodash'
import {ax} from "../../utils/apiCalls"
import axios from "axios";
import { UnderlinedTabs } from "../../components/tabs";
import Link from "next/link";
import ls from 'local-storage'
import { NotificationManager } from 'react-notifications'

const Index = () => {
  /** Chatbot data Management */
  const [chatbot, setChatbot] = useState({});
  const [flowCharts, setFlowCharts] = useState([]);
  const [status, setStatus] = useState(undefined);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const chatid = router.query.chatbotID;
  const [keyword, setkeyword] = useState([]);
  const updateChatbot = (path, value) => {
    const cb = {...chatbot};
    _.set(cb, path, value);
    setChatbot(cb);
  }

  /** Keywords List Management */
  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const selectKeyword = (idx) => {
    setCurrentIndex(idx);
    setCurrentKeyword((idx >= 0 && idx < keywords.length) ? keywords[idx] : null);
  }

  const deleteKeyword = async (idx) => {
    const kws = [...keywords];
    await kws.splice(idx, 1);
    setKeywords(kws);
    if (idx === currentIndex) {
      selectKeyword(kws.length ? 0 : -1);
    }
  }

  const updateKeyword = (key, value) => {
    const kw = {...currentKeyword};
    kw[key] = value;
    setCurrentKeyword(kw);
    const kws = [...keywords];
    kws[currentIndex] = kw;
    setKeywords(kws);
  }

  const addKeyword = () => {
    const kw = {
      key: 'Keyword_' + Math.random().toString(36).slice(2,6),
      type: 'message',
      description: '',
      keywordMessage: '',
      flowchartName: ''
    };
    setKeywords((kws) => ([...kws, kw]));
  }

  /** Chatbot Operations */
  let valid = true;
  const chatbotID = useRouter().query.chatbotID;
  const token1 = ls.get("token");


  const fetchChatbot = () => {
    const token = localStorage.getItem("token");
    axios.get('https://cb.mtalkz.cloud/export/' + chatbotID, {
      headers: {
        'x-api-key': token
      }
    }).then(res => {
      const cb = res?.data;
      if (cb) {
        setChatbot(cb.chatbot);
        setFlowCharts(cb.flowCharts);
        setKeywords(cb.chatbot.keywords);
      }
    }).catch((err)=>{
        console.error("errorhgfg ufuf fur uyiefjef fhref ")
    });
  }

  const saveChatbot = () => {
    valid = true;
    document.querySelectorAll('form.cb-form').forEach(form => {
      if (!form.checkValidity()) {
        valid = false;
        form.reportValidity();
      }
    })
    if (valid) {
      const data = { ...chatbot, keywords }
      const token1 = localStorage.getItem("token");
      ax.post(
        "https://cb.mtalkz.cloud/import",
        { type: "chatbot", data },
        {
          headers: {
            "x-api-key": token1,
          },
        }
      )
        .then((res) => {
          // router.push("/chatbots");
        setStatus({ type: "success" });
        setStatus(undefined);

         
        })
        .catch((err) => {
          setStatus({ type: "error" });
        });
    }
  }

  useEffect(() => {
    fetchChatbot();
  }, [])

 

   const InstallationTab=()=>{
   return( 
    chatbot?._id ?
  <div className="w-full mb-4">
    <div className="inline-block w-5/6">
      <SectionTitle title={chatbot?.name} />
    </div>
    <div className="inline-block w-1/6 text-right">
      <a className="btn btn-default btn-indigo" onClick={() => saveChatbot()}>Save</a>
    </div>

    {/** Chatbot Form */}
    <Widget>
      <label className="inline-block w-5/6">
        <span className="font-bold">Callback URL</span>
        <input
          type="text"
          className="text-sm form-input mt-1 block w-full border"
          value={`https://cb.mtalkz.cloud/cb/${chatbot._id}`}
          readOnly={true}
        />
      </label>
      <label className="inline-block w-1/6 text-right">
        <span className="font-bold">Published</span><br/>
        <Switch
          checked={chatbot.published}
          onChange={(checked) => updateChatbot('published', checked)}
        />
      </label>
    </Widget>

    <Widget>
      <form className="w-full grid grid-cols-3 gap-4 cb-form">
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="font-bold">Name</span>
            <input
              type="text"
              className="text-sm form-input mt-1 block w-full border"
              placeholder="Name"
              onChange={(e) => updateChatbot('name', e.target.value)}
              value={chatbot.name}
              required={true}
            />
          </label>
          <label className="block">
            <span className="font-bold">Welcome</span>
            <div className="grid grid-cols-3 w-full mb-2">
              <span>Message</span>
              <Switch
                checked={chatbot?.welcome?.type === 'flowchart'}
                onChange={(checked) => updateChatbot('welcome.type', checked ? 'flowchart' : 'message')}
                offColor="#2c5282"
                onColor="#553c9a"
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <span>Flowchart</span>
            </div>
            {chatbot?.welcome?.type !== 'flowchart' && (
              <textarea
                className="text-sm form-input mt-1 block w-full border"
                placeholder="Message"
                onChange={(e) => updateChatbot('welcome.textOrFlowChartName', e.target.value)}
                value={chatbot?.welcome?.textOrFlowChartName || ''}
                required={true}
              />
            )}
            {chatbot?.welcome?.type === 'flowchart' && (
              <select
                className="text-sm form-select block w-full"
                onChange={(e) => updateChatbot('welcome.textOrFlowChartName', e.target.value)}
                value={chatbot?.welcome?.textOrFlowChartName || ''}
              >
                <option value="">(None)</option>
                {flowCharts.map((fc) => (<option key={fc._id} value={fc.name}>{fc.name}</option>))}
              </select>
            )}
          </label>
          <label className="block">
            <span className="font-bold">Unrecognized Input</span>
            <textarea
              className="text-sm form-input mt-1 block w-full border"
              placeholder="Message"
              onChange={(e) => updateChatbot('unrecognizedInputMessage', e.target.value)}
              value={chatbot?.unrecognizedInputMessage || ''}
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="font-bold">Channel</span>
            <select
              className="text-sm form-select block w-full"
              onChange={(e) => updateChatbot('channel', e.target.value)}
              value={chatbot.channel || ''}
              required={true}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="open-web" disabled={true}>Web</option>
            </select>
          </label>
          <label className="block">
            <span className="font-bold">Phone</span>
            <input
              type="tel"
              pattern="91[0-9]{10}"
              className="text-sm form-input mt-1 block w-full border"
              placeholder="91xxxxxxxxxx"
              onChange={(e) => updateChatbot('phone', e.target.value)}
              value={chatbot?.phone || ''}
              required={true}
            />
          </label>
          <label className="block">
            <span className="font-bold">Token</span>
            <input
              type="password"
              className="text-sm form-input mt-1 block w-full border"
              placeholder="API Token"
              onChange={(e) => updateChatbot('token', e.target.value)}
              value={chatbot.token || ''}
              required={true}
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <label className="block">
            <span className="font-bold">Timeout</span>
            <input
              type="number"
              className="text-sm form-input mt-1 block w-full border"
              placeholder="Seconds"
              min={10}
              onChange={(e) => updateChatbot('timeout.seconds', e.target.value)}
              value={chatbot?.timeout?.seconds || ''}
            />
            <textarea
              className="text-sm form-input mt-1 block w-full border"
              placeholder="Message"
              onChange={(e) => updateChatbot('timeout.message', e.target.value)}
              value={chatbot?.timeout?.message || ''}
              required={chatbot?.timeout?.seconds >= 10}
            />
          </label>
          <label className="block">
            <span className="font-bold">Exit</span>
            <input
              type="text"
              className="text-sm form-input mt-1 block w-full border"
              placeholder="Keyword"
              onChange={(e) => updateChatbot('exit.keyword', e.target.value)}
              value={chatbot?.exit?.keyword || ''}
            />
            <textarea
              className="text-sm form-input mt-1 block w-full border"
              placeholder="Message"
              onChange={(e) => updateChatbot('exit.message', e.target.value)}
              value={chatbot?.exit?.message || ''}
              required={!!(chatbot?.exit?.keyword)}
            />
          </label>
        </div>
      </form>
    </Widget>
    {/** Keyword Builder */}
    <div className="w-full grid grid-cols-2 gap-4">
      <Widget title="Keywords" right={<a onClick={() => addKeyword()}><Icon.Plus/></a>}>
        {keywords.map((kw,idx)=>(
          <a key={kw.key} onClick={() => selectKeyword(idx)} className="flex flex-row items-center justify-between border rounded p-2 mb-2">
            <div className="inline-block">
              <b>{kw.key}</b>
              <p>{kw.description}</p>
              <i>{kw.type === 'flowchart' ? kw.flowchartName : kw.keywordMessage}</i>
            </div>
            <div className="inline-block">
              <Icon.Trash2 onClick={() => deleteKeyword(idx)} size={16}/>
            </div>
          </a>
        ))}
      </Widget>
      <Widget title="Edit Keyword">
      { currentKeyword ? (
        <form className="flex flex-col gap-4 cb-form">
          <label className="block">
            <span className="font-bold">Key</span>
            <input
              type="text"
              className="text-sm form-input mt-1 block w-full border"
              placeholder="Key"
              onChange={(e) => updateKeyword('key', e.target.value)}
              value={currentKeyword.key}
              required={true}
            />
          </label>
          <label className="block">
            <span className="font-bold">Description</span>
            <input
              type="text"
              className="text-sm form-input mt-1 block w-full border"
              placeholder="Description"
              onChange={(e) => updateKeyword('description', e.target.value)}
              value={currentKeyword.description || ''}
            />
          </label>
          <label className="block">
            <span className="font-bold">Type</span>
            <div className="grid grid-cols-3 w-1/2 mb-2">
              <span>Message</span>
              <Switch
                checked={currentKeyword.type === 'flowchart'}
                onChange={(checked) => updateKeyword('type', checked ? 'flowchart' : 'message')}
                offColor="#2c5282"
                onColor="#553c9a"
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <span>Flowchart</span>
            </div>
            {currentKeyword.type !== 'flowchart' && (
              <textarea
                className="text-sm form-input mt-1 block w-full border"
                placeholder="Message"
                onChange={(e) => updateKeyword('keywordMessage', e.target.value)}
                value={currentKeyword.keywordMessage || ''}
                required={true}
              />
            )}
            {currentKeyword.type === 'flowchart' && (
              <select
                className="text-sm form-select block w-full"
                onChange={(e) => updateKeyword('flowchartName', e.target.value)}
                value={currentKeyword.flowchartName}
                required={true}
              >
                <option value="">(None)</option>
                {flowCharts.map((fc) => (<option key={fc._id} value={fc.name}>{fc.name}</option>))}
              </select>
            )}
          </label>
        </form>
      ) : <p>Please Select A Keyword</p>}          
      </Widget>
    </div>
  </div> : <p>Loading...</p>
  )
   

   }

   const CodeStructureTab = () => (
    <div className="flex">
      <div className="w-full">
        <div className="flex flex-row">
          <div className=" w-5/6">
            <input
              type="text"
              autoFocus="autoFocus"
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full p-2 ..."
              defaultValue={searchTerm}
            />
          </div>
          <div className="w-1/6 ">
            <Link href={`flow/${chatid}&ak=${token1}`}>
              <a className="link">
                <button
                  className="ml-3 btn btn-default btn-indigo create-btn w-full"
                  type="button"
                >
                  Create Flows
                </button>
              </a>
            </Link>
          </div>
        </div>

        <div className="flex flex-row flex-wrap w-full mt-4">
          {flowCharts &&flowCharts
            ?.filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
              ) {
                return val;
              }
            })
            .map((value) => {
              return (
                <div
                  className="flex flex-col w-full mb-4 lg:w-1/3 "
                  key={value._id}
                >
                  <div className="card bg-white shadow-sm py-4 p-4 relative">
                    <Link href={`flow/${chatid}&fc=${value.name}&ak=${token1}`}>
                      <a className="w-full">
                        <div className="card-body ">
                          <div className="title text-base font-base font-poppins flex">
                            {value.name}
                          </div>
                          <p className="text-secondary pt-4">
                            Updated By : {ls.get("userName")}
                          </p>
                          <p className="text-secondary pb-3">
                            Updated On :{" "}
                            {new Date(value.updatedAt).toLocaleString()}
                          </p>

                          <hr />
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
  const tabs = [
    { index: 0, title: "Chatbot Configuration", content: <InstallationTab /> },
    { index: 1, title: "Flows", content: <CodeStructureTab /> },
  ]; 
  return (
    <Layout>
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Saved successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        {   NotificationManager.error(status.message,"Error")}
      </div>
      )}
    <div className="flex flex-wrap">
      <div className="w-full">
          <UnderlinedTabs tabs={tabs} />
      </div>
    </div>
  </Layout>
   )
}
export default withRedux(Index)