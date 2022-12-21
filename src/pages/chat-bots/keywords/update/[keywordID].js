import ls from 'local-storage';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NotificationManager } from 'react-notifications';
import Switch from 'react-switch';
import SectionTitle from "../../../../components/section-title";
import Layout from "../../../../layouts";
import { withRedux } from "../../../../lib/redux";
import { ax } from "../../../../utils/apiCalls";

const updateKeyword = () => {
  const router = useRouter();
  const [chatID, keywordID] = router.query.keywordID?.split('_') || [0,0];
  const [status, setStatus] = useState(undefined);
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(undefined);
  const [flowcharts, setFlowcharts] = useState([]);
  const [flowchartKeyword, setFlowchartKeyword] = useState(false);
  const [keyword, setKeyword] = useState({});

  // Create Keyword
  const onSubmit = (data) => {
    data.type = flowchartKeyword ? 'flowchart' : 'message';
    const token = ls.get('token');
    ax.put(`/keywords/${keywordID}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setStatus({ type: "success" });
      setTimeout(() => {
        router.push(`/chat-bots/${chatID}`);
      }, 1000);
    }).catch((err) => {
      if (err.response.data.errors) {
        setErrors(err.response.data.errors)
      } else {
        setStatus({ type: "error", message: err.response.data.message });
      }
    });
  };

  const getKeyword = () => {
    const token = ls.get('token');
    ax.get("/keywords/" + keywordID, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setKeyword(res.data);
      setFlowchartKeyword(res.data.type === 'flowchart');
      getFlowcharts();
    }).catch((err) => {
      setStatus({ type: "error", message: err.response.data.message });
    });
  }

  const getFlowcharts = () => {
    const token = ls.get('token');
    ax.get("/flowcharts?chatbot_id=" + chatID, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      if (res.data.length > 0) {
        setFlowcharts(res.data);
      }
    }).catch((err) => {
      setStatus({ type: "error", message: err.response.data.message });
    });
  }

  const handleDataUpdate = (e) => {
    const { name, value } = e.target;
    setKeyword({ ...keyword, [name]: value });
  }

  useEffect(() => {
    getKeyword();
  }, [])

  return (
    <Layout>
      <SectionTitle title="Update Keyword" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Keyword Updated Successfully', '')}
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
        className="flex flex-col text-sm mb-4 lg:w-1/3"
      >
        {/*input*/}
        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Keyword</span>
            <span className="text-red-600" >*</span>

            <input
              name="key"
              type="text"
              ref={register({ required: true, maxLength: 25 })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter keyword"
              value={keyword.key}
              onChange={handleDataUpdate}
              required
            />
          </label>
          {errors && errors.key && (
            errors.key.map((err) => {
              return <p className="mt-1 text-xs text-red-500">{err}</p>
            })
          )}
        </div>

        <div className="w-full mb-4">
          <label className="block">
            <span className="text-default">Description</span>

            <input
              name="description"
              type="text"
              ref={register({ required: false, maxLength: 255 })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter description"
              value={keyword.description}
              onChange={handleDataUpdate}
            />
          </label>
          {errors && errors.description && (
            errors.description.map((err) => {
              return <p className="mt-1 text-xs text-red-500">{err}</p>
            })
          )}
        </div>

        <div className="grid grid-cols-3 w-full mb-4">
          <span>Message</span>
          <Switch
            checked={flowchartKeyword}
            onChange={(checked) => setFlowchartKeyword(checked)}
            offColor="#2c5282"
            onColor="#553c9a"
            uncheckedIcon={false}
            checkedIcon={false}
          />
          <span>Flowchart</span>
        </div>

        {flowchartKeyword ?
          <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">Flowchart</span>
              <span className="text-red-600" >*</span>

              <select
                name="flowchart_id"
                ref={register()}
                className="form-select mt-1 text-xs block w-full bg-white"
                value={keyword.flowchart_id}
                onChange={handleDataUpdate}
              >
                <option>(Select a Flowchart)</option>
                {flowcharts.map(fc => (
                  <option value={fc.id}>{fc.name}</option>
                ))}
              </select>
            </label>

            {errors && errors.flowchart_id && (
              errors.flowchart_id.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })

            )}
          </div>
          :
          <div className="w-full mb-4">
            <label className="block">
              <span className="text-default">Message</span>
              <span className="text-red-600">*</span>

              <input
                name="message"
                type="text"
                ref={register({ required: false, maxLength: 255 })}
                className="form-input mt-1 text-xs block w-full bg-white"
                placeholder="Enter message"
                value={keyword.message}
                onChange={handleDataUpdate}
              />
            </label>

            {errors && errors.message && (
              errors.message.map((err) => {
                return <p className="mt-1 text-xs text-red-500">{err}</p>
              })

            )}
          </div>
        }

        <div className="w-full">
          <input
            type="submit"
            className="btn btn-default btn-block btn-indigo btn-rounded"
            value="Submit"
          />
        </div>
      </form>

    </Layout>
  );
};
export default withRedux(updateKeyword);

