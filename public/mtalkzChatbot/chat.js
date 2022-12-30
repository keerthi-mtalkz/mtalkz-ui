//Configuring Default Values
let show=false;
const matlkzchatbotdefaultValues={
    backgroundColor: '#434190',
    chatbotId:null,
    logo:"./mtalkz-logo.png",
    name:"mTalkz Support",
    welcomeText:"Welcome To MtalkzSupport",
    polingIntervalSec:5,
    botmesgbd: "#f4f4f4",
    usermesgbg: '#434190',
    sendbtnbg:"#434190",
    chatbotHeight:"360px",
    autoOpenDelay:0,
    chatbotMaxHeight:"80vh",
}




function showChatBot(){
    if(document.getElementsByClassName("mtalkz-cb-chat-bar-collapsible")[0].style.visibility==="visible")
    {
        document.getElementById("mtalkz-cb-showHideChatbot").innerHTML="&#x1F4AC;"
        document.getElementsByClassName("mtalkz-cb-chat-bar-collapsible")[0].style.visibility="hidden"
    }else{
        document.getElementById("mtalkz-cb-showHideChatbot").innerHTML="&times; "
        document.getElementsByClassName("mtalkz-cb-chat-bar-collapsible")[0].style.visibility="visible"

    }
}

//Main html
const mtkzcbInit=(configureValues={})=>{
mtkzcbgetUserIp();
     if(configureValues){
        let keys = Object.keys(configureValues);
        keys.map((key, i) =>matlkzchatbotdefaultValues[key]=configureValues[key]) 
        if( matlkzchatbotdefaultValues.autoOpenDelay >= 0){
            setTimeout(() => {
                document.getElementsByClassName("mtalkz-cb-chat-bar-collapsible")[0].style.visibility!="visible" && showChatBot()
            }, matlkzchatbotdefaultValues.autoOpenDelay*1000);
        }
    
        if(matlkzchatbotdefaultValues.chatbotId!=null)
        {
            mtkzcbfrequentApiCall()
        }
     }

     if(matlkzchatbotdefaultValues.chatbotId){
    const botHtml=`
    <style>
    .mtalkz-cb-chat-bar-collapsible {
        position: fixed;
        bottom: 48px;
        right: 12px;
        box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2);
        border-radius: 10px 10px 0px 0px;   
        visibility: hidden;
    }

    .mtalkz-cb-image-div{
        line-height: 1.5em;
        display: inline-block;
        background: #f4f4f4;
        padding: 10px;
        border-radius: 6px;
        border-bottom-left-radius: 2px;
        max-width: 80%;
        margin-left: 10px;
        animation: floatup .5s forwards;
        margin-top: 15px;
    }
    .mtalkz-cb-showHideButtonDiv{
        bottom: 12px;
        position: fixed;
        right: 12px;
      
    }
    .mtalkz-cb-showHideButton{
        border: none;
        padding: 0;
        border-radius: 50%;
        background: #434190;
        color: white;
        width: 2rem;
        height: 2rem;
        font-size: 1.5em;
       }
    .mtalkz-cb-collapsible {
        background-color: ${matlkzchatbotdefaultValues.backgroundColor};
        color: white;
        cursor: pointer;
        padding: 18px;
        width: 350px;
        text-align: left;
        outline: none;
        font-size: 18px;
        border-radius: 10px 10px 0px 0px;
        border:none;
        border-bottom: 3px solid white;
        display: flex;
        align-items: center;
    }
    
    .mtalkz-cb-content {
        max-height: ${matlkzchatbotdefaultValues.chatbotHeight} ;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        background-color: #f1f1f1;
    }
    
    .mtalkz-cb-full-chat-block {
        width: 350px;
        background: white;
        text-align: center;
        overflow: auto;
        scrollbar-width: none;
        height: max-content;
        transition: max-height 0.2s ease-out;
    }
    
    .mtalkz-cb-outer-container {
        max-height: ${matlkzchatbotdefaultValues.chatbotMaxHeight};
        bottom: 0%;
        position: relative;
        height:${matlkzchatbotdefaultValues.chatbotHeight};

    }
    
    .mtalkz-cb-chat-container {
        max-height: 200px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        scroll-behavior: smooth;
        hyphens: auto;
    }

    .mtalkz-cb-list-description{
        font-size: 10px;
        margin-left: 10px;
        color: gray;
    }
.mtalkz-cb-chat-btn-div{
    line-height: 1.5em;
    display: inline-block;
    background: #f4f4f4;
    padding: 10px;
    border-radius: 6px;
    border-bottom-left-radius: 2px;
    max-width: 95%;
    margin-left: 10px;
    animation: floatup .5s forwards;
}
    .btn-group-vertical {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    .btn-dark {
        color: #fff;
        background-color: #212529;
        border-color: #212529;
    }
    .btn {
        display: inline-block;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
    
    .mtalkz-cb-chat-container::-webkit-scrollbar {
        display: none;
    }
    
    .mtalkz-cb-chat-bar-input-block {
        display: flex;
        float: left;
        box-sizing: border-box;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        background-color: rgb(235, 235, 235);
        border-radius: 10px 10px 0px 0px;
        padding: 10px 0px 10px 10px;
        position: sticky;
        bottom:0
    }
    
    .mtalkz-cb-chat-bar-icons {
        display: flex;
        justify-content: space-evenly;
        box-sizing: border-box;
        width: 25%;
        float: right;
        font-size: 20px;
    }
    
    .mtalkz-cb-rcw-message-client {
        flex-direction: row-reverse
    }
    
    .mtalkz-cb-rcw-message {
        margin: 10px 10px 4px 0px;
        display: flex;
        word-wrap: break-word;
    }
    
    ;
    
    .mtalkz-cb-rcw-client {
        display: flex;
        flex-direction: column;
        margin-left: auto
    }
    
    ;
    
    .mtalkz-cb-rcw-message-text {
        background-color: #a3eaf7;
        border-radius: 10px;
        max-width: 215px;
        padding: 15px;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
        color: black;
    }
    
    ;
    
    .mtalkz-cb-rcw-snippet {
        color: black;
        background-color: white;
        border-radius: 10px;
        max-width: 215px;
        padding: 15px;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word
    }
    
    ;
    
    .mtalkz-cb-rcw-messages-container {
        background-color: lightgrey;
        height: 60vh;
        max-height: 500px;
        overflow-y: scroll !important;
        padding-top: 10px;
    }
    .mtalkz-cb-button-div:first-child {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
      }
      .mtalkz-cb-button-div:last-child {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    ;
    
    .mtalkz-cb-rcw-img-btn {
        color: black;
        background-color: white;
        border-radius: 10px;
        max-width: 215px;
        padding: 15px;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
        cursor: pointer;
    
    }
    
    ;
    
    .mtalkz-cb-rcw-btn {
        background: lightblue;
        padding: 8px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 10px;
        cursor: pointer
    }
    
    ;
    
    
    #mtalkz-cb-chat-icon:hover {
        opacity: .7;
    }
    
    /* Chat bubbles */
    
    #mtalkz-cb-userInput {
        width: 75%;
    }
    
    .mtalkz-cb-input-box {
        float: left;
        border: none;
        box-sizing: border-box;
        width: 100%;
        border-radius: 10px;
        padding: 10px;
        font-size: 16px;
        color: #000;
        background-color: white;
        outline: none
    }
    
    .mtalkz-cb-userText {
        color: white;
        font-family: Helvetica;
        font-size: 16px;
        font-weight: normal;
        text-align: right;
        clear: both;
    }
    
    .mtalkz-cb-userText span {
        line-height: 1.5em;
        display: inline-block;
        background:${matlkzchatbotdefaultValues.usermesgbg};
        padding: 10px;
        border-radius: 6px;
        border-bottom-right-radius: 2px;
        max-width: 80%;
        margin-right: 10px;
        animation: floatup .5s forwards
    }
    
    .mtalkz-cb-botText {
        color: #000;
        font-family: Helvetica;
        font-weight: normal;
        font-size: 16px;
        text-align: left;
    }


    .mtalkz-cb-botText span {
        line-height: 1.5em;
        display: inline-block;
        background:${matlkzchatbotdefaultValues.botmesgbd};
        padding: 10px;
        border-radius: 6px;
        border-bottom-left-radius: 2px;
        max-width: 85%;
        margin-left: 10px;
        animation: floatup .5s forwards;
        
    }
    
    
    .mtalkz-cb-button-div {
        color: white;
        background-color: #5d76cb;
        padding: 5px;
        text-align: center;
        white-space: pre-wrap;
        cursor: pointer;
        margin-bottom: 2px;
        font-weight: 700;
        max-width:100%
    }
    
    .mtalkz-cb-section-list {
        background-color: #f4f4f4;
        max-width:100%
    }
     
    .mtalkz-cb-logo{
        max-width:40px;
        max-height:40px;
    }



    .mtalkz-cb-radio-lable {
        font-size: 11px;
        color: darkblue;
        text-transform: uppercase;
    }
    
    .mtalkz-cb-radio-div {
        display: flex;
        justify-content: space-between;
        padding-right: 8px;
    }
    .mtalkz-cb-sendbutton{
        line-height: 1.5em;
        display: inline-block;
        background: ${matlkzchatbotdefaultValues.sendbtnbg};
        padding: 10px;
        border-radius: 8px;
        max-width: 80%;
        margin-right: 10px;
        animation: floatup .5s forwards;
        text-transform: capitalize;
    }

    .mtalkz-cb-chat-timestamp{
        font-family: Helvetica;
    }
    
    p {
        margin-bottom: 0px !important;
    }
    
    label {
        font-size: 10px;
        display: flex;
        margin-left: 10px;
        color: black;
        margin-top:3px;
        font-family: Helvetica;
        font-weight: normal;
    }
    
    @keyframes floatup {
        from {
            transform: translateY(14px);
            opacity: .0;
        }
    
        to {
            transform: translateY(0px);
            opacity: 1;
        }
    }
    
    @media screen and (max-width:600px) {
        .mtalkz-cb-full-chat-block {
            width: 100%;
            border-radius: 0px;
        }
    
        .mtalkz-cb-chat-bar-collapsible {
            position: fixed;
            bottom: 0;
            right: 0;
            width: 100%;
        }
    
        .mtalkz-cb-collapsible {
            width: 100%;
            border: 0px;
            border-top: 3px solid white;
            border-radius: 0px;
            display: flex !important;
        }
        .mtalkz-cb-header{
            display: flex !important;
    height: 65px;
    align-items: center;
        }
     
        
    }
  
    </style>
    <div>
    <div  class="mtalkz-cb-showHideButtonDiv" >
    <button class="mtalkz-cb-showHideButton" id="mtalkz-cb-showHideChatbot" type="button" onclick="showChatBot()" value="show">
    &#x1F4AC;
    </button>
    </div>
    <div   class="mtalkz-cb-chat-bar-collapsible"  >
    <button id="mtalkz-cb-chat-button"  class="mtalkz-cb-collapsible mtalkz-cb-header" type="button" >
    <img class="mtalkz-cb-logo"  src=${matlkzchatbotdefaultValues.logo} alt="Mtalkz Connect" >
    <span> ${matlkzchatbotdefaultValues.name}</span>
  </img>
    </button>
    <div class="mtalkz-cb-content" id="mtalkz-cb-content">
        <div class="mtalkz-cb-full-chat-block">
            <!-- Message Container -->
            <div class="mtalkz-cb-outer-container" id="mtalkz-cb-outer-container"  >
                <div class="mtalkz-cb-chat-container">
                    <!-- Messages -->
                    <div id="mtalkz-cb-chatbox">
                        <div id="mtalkz-cb-chat-timestamp" class="mtalkz-cb-chat-timestamp" ></div>
                    </div>

                    <!-- User input box -->
                    <div class="mtalkz-cb-chat-bar-input-block">
                        <div id="mtalkz-cb-userInput">
                            <input id="mtalkz-cb-textInput" class="mtalkz-cb-input-box" type="text" name="msg"
                                placeholder="Tap 'Enter' to send a message">
                            <p></p>
                        </div>

                        <div class="mtalkz-cb-chat-bar-icons">
                        <button class="mtalkz-cb-sendbutton" style=" 
                        color: white;
                        border: none;"   onclick="mtkzcbbotsendButton()"   >send</button>
                            
                        </div>
                    </div>

                    <div id="mtalkz-cb-chat-bar-bottom">
                        <p></p>
                    </div>

                </div>
            </div>

        </div>
    </div>
</div>
</div>`
document.querySelector("body").innerHTML+=botHtml;

mtkzcbfirstBotMessage();}else{
    console.error("chatbot is not available")
}
}


// // Collapsible

function mtkzcbgetHumanReadableDate(timestamp){
   return new Date(timestamp).toLocaleTimeString('en-HI', {timeStyle: 'short'})
  }


  
  function mtkzcbgetBotResponse(input,chatbotId,uniq_id) {
      const data={
          message: input,
          uniq_id:uniq_id
        }
      fetch(`https://cb.mtalkz.cloud/cb/${chatbotId}`,{
        method:"POST",
        body: JSON.stringify(data),
        headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json',
        'origin':"https://cb.mtalkz.cloud"
    }
      })
          .then((res) => {
        })
          .catch((err) => {
            console.log(err,"error")
               
          });
  }



 function mtkzcbgetTime() {
    return new Date().toLocaleDateString('en-HI', {dateStyle: 'full'})
  }


async function mtkzcbgetUserIp (){
     localStorage.setItem("uniqueId",Math.floor(100000 + Math.random() * 900000))
    }


// Gets the first message
function mtkzcbfirstBotMessage() {
    var coll = document.getElementsByClassName("mtalkz-cb-collapsible");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}
var input = document.getElementById("mtalkz-cb-textInput")
input?.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
    mtkzcbgetResponse(document.getElementById("mtalkz-cb-textInput").value);
        event.preventDefault();
    }
});
setTimeout(() => {
    if( matlkzchatbotdefaultValues.welcomeText != ""){
        document.querySelector("#mtalkz-cb-chatbox").innerHTML+='<p class="mtalkz-cb-botText"><span>' +  matlkzchatbotdefaultValues.welcomeText + '</span></p>';
    }
    let time = mtkzcbgetTime();

    document.querySelector("#mtalkz-cb-chat-timestamp").append(time);
    document.getElementById("mtalkz-cb-userInput").scrollIntoView(false);
}, 1000);

  
}

function mtkzcbonSubmit(data){
    mtkzcbbotsendButton(data);
}

// Retrieves the response
 async function mtkzcbHardResponse(userText) {
    const id= parseInt(localStorage.getItem("uniqueId")) 
    await mtkzcbgetBotResponse(userText,matlkzchatbotdefaultValues.chatbotId,id);
   
    
}


//Gets the text text from the input box and processes it
function mtkzcbgetResponse(data=undefined) {
    let userText;
    if(data){
        userText=data
    }else{
        return
    }

    var d=new Date().toLocaleTimeString('en-HI', {timeStyle: 'short'})
    let userHtml = '<p class="mtalkz-cb-userText"><span>' + userText + '</span><label style="justify-content:end;margin-right: 10px;margin-top: 2px;"}">'+d+'</label></p>';
    document.getElementById("mtalkz-cb-textInput").value=""
    document.querySelector("#mtalkz-cb-chatbox").innerHTML+=userHtml
    document.getElementById("mtalkz-cb-chat-bar-bottom").scrollIntoView(true);
    setTimeout(() => {
        mtkzcbHardResponse(userText);
    }, 1000)

}

function mtkzcbfrequentApiCall(){
    const id=parseInt(localStorage.getItem('uniqueId'));
    if(id){
        setInterval(()=>{
            if( document.getElementsByClassName("mtalkz-cb-chat-bar-collapsible")[0].style.visibility==="visible" &&  matlkzchatbotdefaultValues.chatbotId){
                fetch(`https://cb.mtalkz.cloud/messages/${matlkzchatbotdefaultValues.chatbotId}/${id}`,{
                    method:"GET",
                    headers: {
                        'origin':"https://cb.mtalkz.cloud"
                    },
              }
                ).then((res) => {
                    return res.json()
                }).then((res)=>{
                    let _botResponse=[]
                     res.forEach((data)=>{
                        const d= data.replaceAll("\\n","<br/>")
                        _botResponse.push(JSON.parse(d))})
                    _botResponse && _botResponse.map((res)=>{
                        if( res.data.preview_url){
                          let messages=  res.data.message.split("https://");
                          let link= "https://" + messages[1]
                          link = `<a href=${link} target="_blank">${link}</a>`
                          res.data.message =  messages[0] + link
                        }
                        if(res.type== "list"){
                            Object.values(res.data.sectionsList).map((item,pindex)=>
                                 item.map((i,index)=> {
                                    i.description= i.description || " " 
                            
                                 }))
                        }
                    res.ts=mtkzcbgetHumanReadableDate(res.ts)
                    })
                    let botHtml;
                    
                    _botResponse && _botResponse.map((botResponse)=>{
                            if(botResponse && botResponse.type == "text"){
                                botHtml = `<div><p class="mtalkz-cb-botText" id="textMesg">  ${botResponse.data &&  '<span>'+  botResponse.data.message +'</span>'}</p><label>${botResponse.ts}</label></div>`;
                           }else if(botResponse && botResponse.type == "reply"){
                               botHtml = `<div class="mtalkz-cb-botText">
                               <span id="mtalkz-cb" >

                               <div  class="mtalkz-cb-rcw-message">
                             <div  class="mtalkz-cb-rcw-img-btn">
                           ${botResponse.data.options?.header?.type==="text" ? '<div style="font-weight: bold;">' + botResponse.data.options.header.text.trim() + '</div>' : ""} 
                           ${botResponse.data.options?.header?.type==="image"?
                           '<img src='+ botResponse.data.options.header.image.link+' alt="invalid url" style="max-width:80%; max-height:200px"></img>':""} 
                             
                             ${botResponse.data.bodyText}
                             </div>
                            </div> 
                            ${botResponse.data.options?.footerText ? '<div style="color: gray;font-size: small;">'+botResponse.data.options.footerText+'</div>' : ""}

                            <div>
                            ${
                             Object.values(botResponse.data.buttonsList).map((item,index) =>  {
                            return (
                             '<div class="mtalkz-cb-button-div"  onclick="mtkzcbonSubmit(`'  +item + '`)" >'
                             + item
                            +'</div>'
                            )
                             }
                             ).join('')
                             }
                            </div>

                            </span>

                           
                            <label>${botResponse.ts}</label>
                               </div>`;
                           }else if(botResponse && botResponse.type == "list"){
                               botHtml=`<div class="mtalkz-cb-botText">
                               <div class="mtalkz-cb-rcw-message">
                               <div class="mtalkz-cb-rcw-img-btn mtalkz-cb-botText">
                           ${botResponse.data.options?.header?.type==="text" ? '<div style="margin-left: 10px;"><span>' + botResponse.data.options.header.text.trim() + '</span></div>' : ""} 
                          
                               <div>
                               <span id="mtalkz-cb-list-text">
                               ${botResponse.data.options?.header?.type==="image" ?
                               '<img src='+botResponse.data.options.header.image.link+' alt="invalid url" style="max-width:200px; height:100px"></img></br>':""} 
                              <div style="font-size: 14px;"> ${botResponse.data.bodyText}</div>
                               <div style="text-transform: uppercase;
                               font-size: 12px;">${botResponse.data.button}</div>
                               <div class="mtalkz-cb-section-list" style="border-radius:10px;padding-bottom: 4px;">
                               ${
                                   Object.values(botResponse.data.sectionsList).map((item,pindex)=>
                                 item.map((i,index)=> {
                                    return (
                                        index===0? '<div class="mtalkz-cb-radio-lable">'+   
                                         Object.keys(botResponse.data.sectionsList)[pindex] +'</div>'+ '<div class="mtalkz-cb-rcw-img-btn mtalkz-cb-radio-div" style="display:flex justify-content :space-evenly"  onclick="mtkzcbbotsendButton(`'  +i.title + '`)" ><label style="font-size:14px" >'+i.title+'</label> <input type="radio" id='+i.title+' name="mtalkzcontact" value='+ i.title + '></input></div>'+'<div class="mtalkz-cb-list-description">'+i.description+'</div>': ""+
                                         '<div class="mtalkz-cb-rcw-img-btn mtalkz-cb-radio-div" style="display:flex justify-content :space-evenly"  onclick="mtkzcbbotsendButton(`'  +i.title + '`)" ><label style="font-size:14px" >'+i.title+'</label> <input type="radio" id='+i.title+' name="mtalkzcontac1t" value='+ i.title + '></input></div>'
                                            +'<div class="mtalkz-cb-list-description">'+i.description+'</div>'         )
                                   } ).join('')
                                   ).join('')
                                   }
                                   ${botResponse.data.options?.footerText ? '<div style=" color: gray;font-size: small">'+botResponse.data.options.footerText+'</div>' : ""}
                               </div>
                               </span>
                               </div>
                               </div>
                               </div> 
                             
                            <label>${botResponse.ts}</label>
                               </div>`
                           }else if(botResponse && botResponse.type == 'document'){
                            botHtml = `<div><p class="mtalkz-cb-botText"><span><a href="${botResponse.data.link}" target="_blank">${botResponse.data.options?.filename||botResponse.data.link.split('/').pop()}</a></span></p><label>${botResponse.ts}</label></div>`;
                           }else if(botResponse && botResponse.type == 'video'){
                            botHtml =`<div class="mtalkz-cb-botText" ><p><span><video style="max-width:200px; max-height:200px" controls>
                            <source src=${botResponse.data.link} type="video/mp4">
                            Your browser does not support HTML video.
                          </video></span></p> <label>${botResponse.ts}</label></div>`
                           }else if(botResponse && botResponse.type == 'audio'){
                            botHtml =`<div class="mtalkz-cb-botText" style="margin-top:10px; margin-bottom:10px"><span>
                            <audio controls style="max-width:250px !important;max-height:200px">
                            <source  src=${botResponse.data.link} type="audio/ogg"></source>
                          </audio></span>
                          <label>${botResponse.ts}</label>
                            </div>`
                           }else if(botResponse && botResponse.type == 'location'){
                            botHtml =`<div><p class="mtalkz-cb-botText" > 
                            <span> Latitude : ${botResponse.data.latitude}</br> Longitude : ${botResponse.data.longitude} </br>
                            ${botResponse.data.options.name ?  'Name:'+  botResponse.data.options.name +'</br>':""}
                            ${botResponse.data.options.address ?  'Address:'+  botResponse.data.options.address :""}
                            </span>
                            
                           </p><label>${botResponse.ts}</label></div>`
                           }else if(botResponse && botResponse.type == 'image'){
                            botHtml =   `
                           <div class="mtalkz-cb-botText" ><div class="mtalkz-cb-image-div"> <div>  <img src=${botResponse.data.link}  alt="invalid url" style="max-width:80%; max-height:200px">
                          
                          </img></div><div style="text-align: center;">${botResponse.data.options?.caption} </div></div><label>${botResponse.ts}</label><div>` 
                           }
                           document.querySelector("#mtalkz-cb-chatbox").innerHTML+=botHtml;
                        //    document.getElementById("mtalkz-cb-list-text").innerHTML=document.getElementById("mtalkz-cb-list-text")?.innerHTML?.trim().replace(/&nbsp;/g, '')
                    })
                    res.length>0 && document.getElementById("mtalkz-cb-chat-bar-bottom").scrollIntoView(true);
    
    
                })  .catch((err) => {
                  console.error(err,"error in getting ")
                });
              
         }
        },(matlkzchatbotdefaultValues.polingIntervalSec <2 ? 2:matlkzchatbotdefaultValues.polingIntervalSec) * 1000 )
    }
   
   
}
// Handles sending text via button clicks
function mtkzcbbuttonSendText(sampleText) {
    let userHtml = '<p class="mtalkz-cb-userText"><span>' + sampleText + '</span></p>';
    document.getElementById("mtalkz-cb-textInput").value=""
    document.getElementById("mtalkz-cb-chatbox").append(userHtml);
    // document.getElementById("mtalkz-cb-chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this mtkzcbbuttonSendText event
    // setTimeout(() => {
    //     mtkzcbHardResponse(sampleText);
    // }, 1000)
}
function mtkzcbbotsendButton(data=undefined) {
    mtkzcbgetResponse(data ? data:document.getElementById("mtalkz-cb-textInput").value);
}

