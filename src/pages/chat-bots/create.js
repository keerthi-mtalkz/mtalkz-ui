import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import { ax } from "../../utils/apiCalls";
import { NotificationManager } from 'react-notifications'
import SectionTitle from "../../components/section-title";
import ls from 'local-storage'

const createChatbot = () => {
  const router = useRouter();
  const [status, setStatus] = useState(undefined);
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(undefined);
  const [orgIntegrations, setOrgIntegrations] = useState([])

  // Create Chatbot
  const onSubmit = (data) => {
    const token = ls.get('token');
    ax.post("/chatbots", data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setStatus({ type: "success" });
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
  };

  const getOrgIntegrations = () => {
    const token = ls.get('token');
    ax.get("/integrations/active", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      if (res.data.length > 0) {
        setOrgIntegrations(res.data);
      }
    }).catch((err) => {
      setStatus({ type: "error", message: err.response.data.message });
    });
  }

  useEffect(() => {
    getOrgIntegrations();
  }, [])

  return (
    <Layout>
      <SectionTitle title="Create Chatbot" subtitle="" />
      {status?.type === "success" && (
        <div className="flex flex-wrap w-full">
          <div className="p-2">
            {NotificationManager.success('Chatbot Created Successfully', '')}
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
            <span className="text-default">Name</span>
            <span className="text-red-600" >*</span>

            <input
              name="name"
              type="text"
              ref={register({ required: true, maxLength: 25 })}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Enter chatbot name"
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
            <span className="text-default">With Integration</span>
            <span className="text-red-600" >*</span>

            <select
              name="organization_integration_id"
              ref={register()}
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Select an Integration"
              required
            >
              {orgIntegrations.map(integration => (
                <option value={integration.id}>{integration.name}</option>
              ))}
            </select>
          </label>

          {errors && errors.organization_integration_id && (
            errors.organization_integration_id.map((err) => {
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
      </form>

    </Layout>
  );
};
export default withRedux(createChatbot);

