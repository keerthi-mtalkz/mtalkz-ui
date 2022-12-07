import axios from "axios";


export const BASE_URl=`https://api.mtalkz.cloud/api`

export const ax = axios.create({
    baseURL: BASE_URl,
    withCredentials: false,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });

  export const SLACK_MESG_CONTENT={
    "blocks":
    [
      {"type":"section","text":{"type":"mrkdwn","text":"Hey Team :wave:"}},
      {"type":"section","text":{"type":"mrkdwn","text":"*STOP VOICE FLOW* :bell:\n\nDetails :point_right:"}},
      {"type":"section","text":{"type":"mrkdwn","text":"• Organisation: *`mTalkz Mobility Services (P) LTD.`* \n • Campaign Name:  *`New Offers (hindi)`*"}}]}

  export const HTTP_METHODS=[
    {
    value:"get",
    label:"GET" 
  },
  {
    value:"post",
    label:"POST" 
  },
  {
    value:"put",
    label:"PUT" 
  },
  {
    value:"delete",
    label:"DELETE" 
  },
  {
    value:"head",
    label:"HEAD" 
  },
  {
    value:"patch",
    label:"PATCH" 
  }
]


  