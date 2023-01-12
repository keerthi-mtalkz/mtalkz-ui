import React, { useEffect, useState } from "react";
import { withRedux } from "../../../lib/redux";
import Select from "react-select";
import { createFlow } from "./helper"

const Content = ({ saveContinue, goBack }) => {
  const [shortLinks, setShortLinks] = useState(false);
  const [unicode, setUnicode] = useState(false);
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState("");
  const [phnMessage, setPhnMessage] = useState("");
  const [customer, setCustomer] = useState(undefined)
  const [property, setProperty] = useState(undefined)
  const [targetAttribute, setTargetAttribute] = useState(undefined)

  const handleSwitchProperty = (value) => {
    createFlow.property = value
    setProperty(value)
    let msg = message + " " + "<<" + value.label + ">>"
    setMessage(msg)
  }

  const handleSwitchAttribute = (value) => {
    setTargetAttribute(value)
    createFlow.targetattributes = value
  }

  const getCampaignsSample = async () => {
    const token = localStorage.getItem('token');
    let target_lists = [];
    let exclude_lists = [];
    createFlow.target_lists.map((data) => {
      target_lists.push(data.label)
    })
    createFlow.exclude_lists.map((data) => {
      exclude_lists.push(data.label)
    })
    const data = {
      "target_lists": target_lists,
      "exclude_lists": exclude_lists
    }
    fetch("http://20.193.136.151:5000/campaigns/sample", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'x-api-key': `${token}`,
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }
    }
    )
      .then((res) => {
        return res.json()
      }).then((response) => {
        const getKeys = (obj, prefix = []) => {
          let keys = [];
          Object.entries(obj).forEach(([k, v]) => {
            const p = prefix.concat([k]);
            if (typeof v === 'object') {
              keys = keys.concat(getKeys(v, p));
            } else {
              keys.push(p.join('.'));
            }
          });
          return keys;
        }
        const keys = ['customer_id'].concat(getKeys(response.attributes));
        let opt = []
        keys.map((key) => {
          opt.push({ label: key, value: key })
        })
        setOptions([...opt])
        setCustomer(response)
      })
      .catch((err) => {
        console.error("get /getCampaignsSample error", err);
      });
  }

  const messageUpdate = () => {
    const vars = message.match(/<<[^<>]+>>/g);
    try {
      vars?.forEach(variable => {
        const key = variable.slice(2, -2).trim();
        let value = customer.attributes;
        if (key === 'customer_id') {
          value = customer.customer_id;
        } else if (key.indexOf('.') < 0) {
          value = value[key];
        } else {
          key.split('.').forEach(k => {
            value = value[k];
          })
        }
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        message = message.replace(variable, value);
      });
    } catch (e) {
      message = 'INVALID CONTENT';
    }

    setPhnMessage(message)
  }

  useEffect(() => {
    getCampaignsSample()
    setMessage(createFlow.message);
    setPhnMessage(createFlow.content);
    setShortLinks(createFlow.shorten_link);
    setUnicode(createFlow.unicode);
    createFlow.target_attribute != "" && setTargetAttribute(createFlow.target_attribute[0]);
    createFlow.property != "" && setProperty(createFlow.property[0]);
  }, [])

  const goNext = () => {
    createFlow.content = phnMessage;
    createFlow.shorten_link = shortLinks;
    createFlow.unicode = unicode;
    createFlow.message = message
    createFlow.target_attribute = [targetAttribute];
    createFlow.property = [property]
    createFlow.targetattributes = targetAttribute.value
    saveContinue()
  }

  const getBtnStatus = () => {
    if (phnMessage == "") {
      return true
    }
    return false
  }

  return (
    <div>
      <div className="flex">
        <div style={{ width: "35%" }} className="p-2 w-full  bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
          <div className="text-center font-semibold p-3 mb-4">Message Content</div>
          <textarea
            name="message"
            className="text-xs form-textarea mt-1  block w-full"
            rows="6"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Your message"></textarea>
          <label className="block mt-2">
            <span className="text-default">Add Property</span>
            <div >
              <Select
                options={options}
                placeholder="Select Property"
                onChange={handleSwitchProperty}
                value={property}
              />
            </div>
          </label>
          <label className="block mt-2">
            <span className="text-default">Target Attribute</span>

            <div >
              <Select
                options={options}
                placeholder="Select Attribute"
                onChange={handleSwitchAttribute}
                value={targetAttribute}
              />
            </div>
          </label>
          <div className="mt-2">
            <input
              name="shortLinks"
              type="checkbox"
              className="form-checkbox"
              checked={shortLinks}
              onChange={() => setShortLinks(!shortLinks)}
            />
            <label className="ml-2 mt-3 text-sm">Automatically Shorten Links</label>
          </div>
          <div className="mt-2">
            <input
              name="unicode"
              type="checkbox"
              className="form-checkbox"
              checked={unicode}
              onChange={() => setUnicode(!unicode)}
            />
            <label className="ml-2 mt-3 text-sm">Unicode Message</label>
          </div>
          <div
            style={{
              "display": "flex",
              justifyContent: "right",
              color: "blue",
              cursor: "pointer"
            }}
            onClick={() => {
              messageUpdate()
            }}>Refresh</div>

        </div>
        <div className="ml-30" style={{ width: "300px", border: "6px solid gray", marginLeft: "100px", borderRadius: "44px" }}>
          <div style={{ background: "#d3d3d34d", height: "16%", padding: "17px", borderTopLeftRadius: "36px", borderTopRightRadius: "36px" }} className="text-center p-2 font-bold">SENDER-ID</div>
          <div className="mt-2" style={{ fontSize: "10px" }} >
            <div className="flex justify-center">Text Message
            </div>
            <div className="flex justify-center"> {new Date().toLocaleTimeString('en-HI', { timeStyle: 'short' })}
            </div>
          </div>
          <div
            className="mt-1"
            style={{
              width: " 95%",
              background: "#d3d3d34a",
              borderRadius: " 5px",
              padding: "4px",
              marginLeft: "6px",
              wordBreak: "break-all",
              fontSize: "10px"
            }}>
            {phnMessage}
          </div>
        </div>

      </div>
      <div style={{ marginTop: "30px" }}>
        <button
          className="ml-3  btn btn-default btn-indigo create-btn" type="button" onClick={() => {
            goBack()
          }}>
          Back
        </button>
        <button
          disabled={getBtnStatus()}
          style={{ background: getBtnStatus() ? "grey" : "#434190" }}
          className="ml-3  btn btn-default btn-indigo create-btn" type="button" onClick={() => {
            goNext()
          }}>
          Save & Continue
        </button>
      </div>
    </div>
  );

};
export default withRedux(Content);

