import React, { useState } from "react";
import { withRedux } from "../../../lib/redux";
import {ax} from "../../../utils/apiCalls";
import Select from "react-select";
import { WithContext as ReactTags } from 'react-tag-input';
import {createFlow} from "./helper";

const Recipients = ({saveContinue}) => {
    const [listSegments,setListSegments]=React.useState([
    ]);
    const [tags, setTags] = React.useState([
    ]);
    const [params, setParams] = React.useState([
    ]);
  const [apiKeys, setApiKeys] = useState([])
  const [campaignName,setCampaignName]=useState("")
 const [selectedSendto,setSelectedSendto]=useState([])
 const [selectedDontsendto,setSelectedDontsendto]=useState([]);
 const [selectedApikey,setSelectedApikey]=useState([]);

    const KeyCodes = {
      comma: 188,
      enter: 13
    };
    
    const delimiters = [KeyCodes.comma, KeyCodes.enter];
  
   
    const handleParamDelete = i => {
        setParams(params.filter((tag, index) => index !== i));
      };
    
      const handleParamsAddition = tag => {
        setParams([...params, tag]);
      };
    
      const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setTags(newTags);
      };
    
      const handleParamDrag = (tag, currPos, newPos) => {
        const newTags = params.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        setParams(newTags);
      };
    

    const handleSwitchSend=(value)=>{
        let sendto=[];
        value.map((val)=>{
            sendto.push({label:val.label, value:val.value})
        })
        setSelectedSendto([...sendto])
    }

    const handleSwitchDontsend=(value)=>{
        let dontsendto=[];
        value.map((val)=>{
            dontsendto.push({label:val.label, value:val.value})
        })
        setSelectedDontsendto([...dontsendto])
    }

    const handleSwitchapikey=(value)=>{
        setSelectedApikey([]);
        let apikey=[]
        apikey.push({label:value.label, value:value.value})
          setSelectedApikey([...apikey])
    }



    React.useEffect(()=>{
        getListsApi()
        getApiKeys()
        setCampaignName(createFlow.name)
        setParams(createFlow.tags);
        setSelectedSendto(createFlow.target_lists);
        setSelectedDontsendto(createFlow.exclude_lists);
        setSelectedApikey(createFlow.api_key);
      },[]);

      const getBtnStatus = () =>{
        if(campaignName=="" || params.length == 0 || selectedSendto.length==0 )
        {
            return true
        }
        return false
      }

      const goNext = ()=>{
        createFlow.channel="sms";
        createFlow.name= campaignName;
        createFlow.tags= params;
        createFlow.exclude_lists=selectedDontsendto;
        createFlow.target_lists=selectedSendto;
        // createFlow.api_key=selectedApikey[0].value;
        saveContinue()
      }
    
        {/*get list api integration*/}
        const getListsApi=async(search=false)=>{
            const token= localStorage.getItem("token");
           let url=   "http://20.193.136.151:5000/lists/?like=false&skip=0&limit=10"
                    await ax
                      .get(url, {
                        headers: {
                          'x-api-key': `Bearer ${token}`
                        }
                      })
                      .then((res) => {
                     let data=   res.data.map((element)=>{
                            return { label: element.name, value: element.name };
                        })
                          setListSegments(data)
                      })
                      .catch((err) => {
                      
                      });
                     
                 }

                 const getApiKeys = async () => {
                    const token = localStorage.getItem('token');
                    await ax
                      .get("/api-keys", {
                        headers: {
                          'Authorization': `Bearer ${token}`
                        }
                      })
                      .then((res) => {
                        res.data.map((key) => {
                          key.is_active = key.is_active == 1 ? "Active" : "Inactive"
                        })
                        let data=   res.data.map((element)=>{
                            return { label: element.masked_key, value: element.masked_key };
                        })
                        
                        setApiKeys(data);
                      })
                      .catch((err) => {
                        console.error("get /apiKeys error", err);
                      });
                  };   
                  
 
  return (
    <div>
<div style={{width:"80%"}} className=" m-5 p-3  mt-5 bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
 <div className="font-semibold mb-3">Campaign Information</div>
 <div>
 <div className="flex">
    <div className="w-full mr-2 mb-4">
          <label className="block">
            <span className="text-default font-semibold">Name</span>
     <span className="text-red-600" >*</span>

            <input
              name="firstname"
              type="text"
              className="form-input mt-1 text-xs block w-full bg-white"
              placeholder="Please enter campaign name"
              onChange={(e)=>{setCampaignName(e.target.value)}}
              value={campaignName}
            />
          </label>
        </div>
        <div className="w-full mb-4">
        <div style={{marginBottom:"10px"}}>
        <span className="text-default font-semibold">Tags</span>
        <ReactTags
        tags={params}
        delimiters={delimiters}
        handleDelete={handleParamDelete}
        handleAddition={handleParamsAddition}
        handleDrag={handleParamDrag}
        inputFieldPosition="top"
        autocomplete
        classNames={{tag:"badge badge-default badge-indigo ml-1 rounded-lg",tagInputField:"form-input mt-1 mb-2 text-xs block w-full bg-white"}}
      />
        </div>
        </div>
    <div>
    </div>
 </div>
 </div>
</div>
<div style={{width:"80%"}} className=" m-5 p-3  mt-5 bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
 <div className="font-semibold mb-3">Recipients</div>
    <div className="w-full mr-2 mb-4">  
          <label className="block">
            <span className="text-default font-semibold">Send to</span>
     <span className="text-red-600" >*</span>

            <Select
            options={listSegments}
            placeholder="Choose list or segment"
            onChange={handleSwitchSend}
            isMulti={true}
            value={selectedSendto}
            
          />  
          </label>
          <label className="block mt-3">
          <span className="text-default font-semibold ">Don't send to</span>
          <Select
          options={listSegments}
          placeholder="Choose list or segment"
          onChange={handleSwitchDontsend}
          isMulti={true}
          value={selectedDontsendto}

        />  
        </label>
        </div>
</div>
<div style={{width:"80%"}} className=" m-5 p-3  mt-5 bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
 
<span className="font-semibold mb-3">Api Key</span>
 <span className="text-red-600" >*</span>

 <div className="mb-3" style={{color:"grey"}}>Customer Profile attributes to target</div>
 <label className="block mt-3">
 <Select
 options={apiKeys}
 placeholder="Choose your api key"
 onChange={handleSwitchapikey}
 isMulti={true}
 value={selectedApikey}

/>  
</label>
</div>
<div>
<button 
 disabled={getBtnStatus()}
 style={{background:getBtnStatus()?"grey":"#434190"}}
className="ml-3  btn btn-default btn-indigo create-btn" type="button" onClick={()=>{
   goNext()
}}>
Save & Continue
</button>
</div>
    </div>
  );
};
export default withRedux(Recipients);

