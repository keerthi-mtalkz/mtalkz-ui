import React, { useState } from "react";
import SectionTitle from "../../components/section-title";
import { useForm } from "react-hook-form";
import Layout from "../../layouts";
import { useRouter } from "next/router";
import { withRedux } from "../../lib/redux";
import {ax} from "../../utils/apiCalls";
import {NotificationManager} from 'react-notifications';
import Select from "react-select";
import Switch from 'react-switch';


const addApiKey = () => {
  const router = useRouter();
  const [status, setStatus] = useState(undefined);
  const [checked, handleChange] = useState(false);
  const [resources,setResources]=useState([]);
const [selectedResource,setSelectedResource]=useState([]);
  const { register, handleSubmit, watch, errors } = useForm();


  const getResources = async () => {
    const token = localStorage.getItem('token');
    await ax
      .get("/resources", {headers: {
        'Authorization': `Bearer ${token}`
       }})
      .then((res) => {
        setResources(res.data);
        setSelectedResource({ label: res.data[0].name, value: res.data[0].id })
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
        console.error("get /Resources error", err);
      });
  };


  const options = resources?.map((value) => {
    return { label: value.name, value: value.id };
  });

  React.useEffect(()=>{
    getResources()
  },[]);

  const onSubmit = () => {
    const data={"resource_id":selectedResource.value,"is_active":checked}
    if (typeof window !== "undefined") {
    const token = localStorage.getItem('token');
    ax.post("/api-keys", data, {headers: {
      'Authorization': `Bearer ${token}`
     }})
      .then((res) => {
        setStatus({ type: "success" });
        router.push("/apiKey");
      })
      .catch((err) => {
        setStatus({ type: "error",message: err.response.data.message });
        setTimeout(() => {
          setStatus(undefined)
          router.push("/apiKey");
        }, 1000);
      });
    }
  };

  const handleSwitch=(value)=>{
    setSelectedResource({label: value.label, value: value.value})
  }


  return (
    <Layout>
    <SectionTitle title="Create ApiKey" subtitle="" />
    {status?.type === "success" && (
      <div className="flex flex-wrap w-full">
      <div className="p-2">
      { NotificationManager.success('Added ApiKey successfully', 'Success')}
      </div>
    </div>
    )}
      {status?.type === "error" && (
        <div className="flex flex-wrap w-full">
        {   NotificationManager.error(status.message,"Error")}
      </div>
      )}

      <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-sm mb-4 lg:w-1/3"
    >
      {/*input*/}
      <div className="w-full mb-4">
        <label className="block">
          <span className="text-default">Resource</span>
          <div style={{ width: "300px" }}>
          <Select
            options={options}
            placeholder="Select Resource"
            onChange={handleSwitch}
            value={selectedResource}
          />
        </div>
        </label>
      </div>
      <div>
      <span className="text-default">Status Of Api Key</span>

      <Switch
        onChange={() => handleChange(!checked)}
        checked={checked}
        handleDiameter={24}
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={48}
        className="react-switch"
      />
    </div>
        
      <div className="w-full">
        <input
          type="submit"
          className="btn btn-default btn-block btn-indigo "
          value="Submit"
        />
      </div>
    </form>
    </Layout>
  );
};
export default withRedux(addApiKey);

