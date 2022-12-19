//Configuring Default Values
const defaultValues={
    backgroundColor: '#434190',
    chatbotId:null,
    logo:"./mtalkz-logo.png",
    name:"mTalkz Support"
}
function initializeValues(configureValues){
    let keys = Object.keys(configureValues);
    keys.map((key, i) =>defaultValues[key]=configureValues[key])
}
initializeValues({ backgroundColor: '#434190',chatbotId:"639aebe410afd9ce5533261f"})
//Main html
const createMainHtml=()=>{
    const botHtml=`
    <style>
    .chat-bar-collapsible {
        position: fixed;
        bottom: 0;
        right: 50px;
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
    
    .collapsible {
        background-color: ${defaultValues.backgroundColor};
        color: white;
        cursor: pointer;
        padding: 18px;
        width: 350px;
        text-align: left;
        outline: none;
        font-size: 18px;
        border-radius: 10px 10px 0px 0px;
        border: 3px solid white;
        border-bottom: none;
    }
    
    .content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.2s ease-out;
        background-color: #f1f1f1;
    }
    
    .full-chat-block {
        width: 350px;
        background: white;
        text-align: center;
        overflow: auto;
        scrollbar-width: none;
        height: max-content;
        transition: max-height 0.2s ease-out;
    }
    
    .outer-container {
        min-height: 500px;
        bottom: 0%;
        position: relative;
    }
    
    .chat-container {
        max-height: 500px;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        scroll-behavior: smooth;
        hyphens: auto;
    }
    
    .chat-container::-webkit-scrollbar {
        display: none;
    }
    
    .chat-bar-input-block {
        display: flex;
        float: left;
        box-sizing: border-box;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        background-color: rgb(235, 235, 235);
        border-radius: 10px 10px 0px 0px;
        padding: 10px 0px 10px 10px;
    }
    
    .chat-bar-icons {
        display: flex;
        justify-content: space-evenly;
        box-sizing: border-box;
        width: 25%;
        float: right;
        font-size: 20px;
    }
    
    .rcw-message-client {
        flex-direction: row-reverse
    }
    
    .rcw-message {
        margin: 10px 10px 10px 0px;
        display: flex;
        word-wrap: break-word
    }
    
    ;
    
    .rcw-client {
        display: flex;
        flex-direction: column;
        margin-left: auto
    }
    
    ;
    
    .rcw-message-text {
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
    
    .rcw-snippet {
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
    
    .rcw-messages-container {
        background-color: lightgrey;
        height: 60vh;
        max-height: 330px;
        overflow-y: scroll !important;
        padding-top: 10px;
    }
    
    ;
    
    .rcw-img-btn {
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
    
    .rcw-btn {
        background: lightblue;
        padding: 8px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 10px;
        cursor: pointer
    }
    
    ;
    
    
    #chat-icon:hover {
        opacity: .7;
    }
    
    /* Chat bubbles */
    
    #userInput {
        width: 75%;
    }
    
    .input-box {
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
    
    .userText {
        color: white;
        font-family: Helvetica;
        font-size: 16px;
        font-weight: normal;
        text-align: right;
        clear: both;
    }
    
    .userText span {
        line-height: 1.5em;
        display: inline-block;
        background: #434190;
        padding: 10px;
        border-radius: 8px;
        border-bottom-right-radius: 2px;
        max-width: 80%;
        margin-right: 10px;
        animation: floatup .5s forwards
    }
    
    .botText {
        color: #000;
        font-family: Helvetica;
        font-weight: normal;
        font-size: 16px;
        text-align: left;
    }
    .fa {
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;};

        .fa-fw {
            width: 1.28571429em;
            text-align: center;
        };

        .fa-send {
            content: "\f1d8";
        }


    .botText span {
        line-height: 1.5em;
        display: inline-block;
        background: #e0e0e0;
        padding: 10px;
        border-radius: 8px;
        border-bottom-left-radius: 2px;
        max-width: 80%;
        margin-left: 10px;
        animation: floatup .5s forwards
    }
    
    
    .button-div {
        color: black;
        background-color: #e0e0e0;
        border-radius: 10px;
        max-width: 70%;
        padding: 5px;
        text-align: center;
        white-space: pre-wrap;
        cursor: pointer;
        margin-left: 10px;
        margin-bottom: 2px;
        margin-top: -8px;
    }
    
    .section-list {
        background-color: #e0e0e0;
        margin: 10px;
        width: 215px
    }
    
    .radio-lable {
        font-size: 11px;
        color: darkblue;
        padding: 10px
    }
    
    .radio-div {
        margin-left: 10px;
        margin-bottom: 2px;
        padding: 5px;
        display: flex;
        justify-content: space-between
    }
    
    p {
        margin-bottom: 0px !important;
    }
    
    label {
        font-size: 10px;
        display: flex;
        margin-left: 10px;
        color: black;
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
        .full-chat-block {
            width: 100%;
            border-radius: 0px;
        }
    
        .chat-bar-collapsible {
            position: fixed;
            bottom: 0;
            right: 0;
            width: 100%;
        }
    
        .collapsible {
            width: 100%;
            border: 0px;
            border-top: 3px solid white;
            border-radius: 0px;
        }
     
        
    }
    </style>
    <div   class="chat-bar-collapsible"  >
    <button id="chat-button"  class="collapsible" type="button" >
    <img style="margin-bottom: 10px;" src=${defaultValues.logo} alt="Mtalkz Connect" />
   <span style="margin-left: -35px;"> ${defaultValues.name}</span>
    </button>
    <div class="content">
        <div class="full-chat-block">
            <!-- Message Container -->
            <div class="outer-container">
                <div class="chat-container">
                    <!-- Messages -->
                    <div id="chatbox">
                        <h5 id="chat-timestamp"></h5>
                        <p id="botStarterMessage" class="botText"><span>Loading...</span></p>
                    </div>

                    <!-- User input box -->
                    <div class="chat-bar-input-block">
                        <div id="userInput">
                            <input id="textInput" class="input-box" type="text" name="msg"
                                placeholder="Tap 'Enter' to send a message">
                            <p></p>
                        </div>

                        <div class="chat-bar-icons">
                        <button style=" height: 33px;
                        background: indigo;
                        color: white;
                        border: none;"   onclick="sendButton()"   >send</button>
                            
                        </div>
                    </div>

                    <div id="chat-bar-bottom">
                        <p></p>
                    </div>

                </div>
            </div>

        </div>
    </div>

</div>`
const script = `<script src="chat.js"></script>`
document.querySelector("body").innerHTML+=botHtml;
document.querySelector("html").innerHTML+=script;

setTimeout(() => {
    firstBotMessage();
getUserIp();
}, 1000);

}
createMainHtml()
// Collapsible
var coll = document.getElementsByClassName("collapsible");
var chat = []

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
function getHumanReadableDate(timestamp){
    let date = new Date(timestamp);
      const day = date.toLocaleString('default', { day: '2-digit' });
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.toLocaleString('default', { year: 'numeric' });
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return day + '-' + month + " "  + hour + ':' + minute + ':' + second +(date.getHours() >= 12 ? "PM" : "AM");
    
  }
  
  function getBotResponse(input,chatbotId,uniq_id) {
      const token= `168|9KOW6dOzVhbPTWIGdjhw9b0tbsNAdZyRdLXoh3Oh`
      const data={
          message: input,
          uniq_id:uniq_id
        }
      fetch(`https://cb.mtalkz.cloud/cb/${chatbotId}`,{
        method:"POST",
        body: JSON.stringify(data),
        headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }
      })
          .then((res) => {
           return getChatDetails(chatbotId,uniq_id)
        })
          .catch((err) => {
            console.log(err,"error")
               
          });
  }
  function getChatDetails(chatbotId,uniq_id){
    const token= `168|9KOW6dOzVhbPTWIGdjhw9b0tbsNAdZyRdLXoh3Oh`
    axios.get(`https://cb.mtalkz.cloud/messages/${chatbotId}/${uniq_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      let _replies=[]
   _replies.map((res)=>{
    res.ts=getHumanReadableDate(res.ts)
  })
     return _replies;
  
    }).catch((err) => {
      console.error(err,"errorhgfg ufuf fur uyiefjef fhref ")
    });
      
  
  }
 function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
  }

async function getUserIp (){
    // const ip= await fetch("https://ipapi.co/json",{method:"GET"});
    //  let ipAddress=ip.data.ip
    //  ipAddress= ipAddress.replaceAll('.', '')
     localStorage.setItem("uniqueId",123456789)
    }

// Gets the first message
function firstBotMessage() {
    let firstMessage = "Welome to Mtalkz"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';
     
    let time = getTime();

    document.querySelector("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}
function onSubmit(data){
    sendButton(data);
}
// Retrieves the response
function getHardResponse(userText) {
    let _botResponse = getBotResponse(userText,defaultValues.chatbotId,12345432);
    let botHtml;
    _botResponse.map((botResponse)=>{
            if(botResponse && botResponse.type == "text"){
                botHtml = `<div><p class="botText" id="textMesg">  ${botResponse.data &&  '<span>'+  botResponse.data.message +'</span>'}</p><label>${botResponse.ts}</label></div>`;
           }else if(botResponse && botResponse.type == "reply"){
               botHtml = `<div class="botText">
               <div  class="rcw-message">
             <div  class="rcw-img-btn">
           ${botResponse.data.options && botResponse.data.options.header.type=="text" ? '<div>' + botResponse.data.options.header.text + '</div>' : ""} 
           ${botResponse.data.options && botResponse.data.options.header.type=="image" ?
           '<img src={botResponse.data.options.header.image.link} alt="invalid url" style={{"max-width":"200px", height:"100px"}}></img>':""} 
             <span>
             ${botResponse.data.bodyText}
            </span>
             </div>
            </div> 
            <div>
            ${
             Object.values(botResponse.data.buttonsList).map((item,index) =>  {
            return (
             '<div class="button-div"  onclick="onSubmit(`'  +item + '`)" >'
             + item
            +'</div>'
            )
             }
             )
             }
            </div>
            <label>${botResponse.ts}</label>
               </div>`;
           }else if(botResponse && botResponse.type == "list"){
               botHtml=`<div class="botText">
               <div class="rcw-message">
               <div class="rcw-img-btn">
               <div>
               <span>
               ${botResponse.data.bodyText}
               ${botResponse.data.button}
               </span>
               </div>
               </div>
               </div> 
               <div class="section-list" style="border-radius:10px">
               ${
                   Object.values(botResponse.data.sectionsList).map((item,pindex)=>
                   item.map((i,index)=> {
                     return (
                      
       index==0 ?'<div class="radio-lable">'+   Object.keys(botResponse.data.sectionsList)[pindex] +'</div>': "" 
           +'<div   class="rcw-img-btn radio-div" style="display:flex justify-content :space-evenly"  onclick="onSubmit(`'  +i.title + '`)" >'+
           '<label style="font-size:14px" >'+i.title+'</label> <input type="radio" id='+i.title+' name="contact" value={'+ i.title + '}></input> </div>'
                       )
                   } )
                   )
                   }
               </div>
            <label>${botResponse.ts}</label>
               </div>`
           }

           document.querySelector("#chatbox").innerHTML+=botHtml;
    })
  
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    
}
//Gets the text text from the input box and processes it
function getResponse(data=undefined) {
    let userText;
    if(data){
        userText=data
    }else{
        userText  = document.getElementById("textInput").value 
        if (userText == "") {
            userText = "I love Code Palace!";
        }
    }
    
    const date = new Date();
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var d= day + '-' + month + " "  + hour + ':' + minute + ':' + second +(date.getHours() >= 12 ? "PM" : "AM");
    let userHtml = '<p class="userText"><span>' + userText + '</span><label style="justify-content:end">'+d+'</label></p>';
    document.getElementById("textInput").value=""
    document.querySelector("#chatbox").innerHTML+=userHtml
    document.getElementById("chat-bar-bottom").scrollIntoView(true);
    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}
// Handles sending text via button clicks
function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';
    document.getElementById("textInput").value=""
    document.getElementById("chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    //Uncomment this if you want the bot to respond to this buttonSendText event
    // setTimeout(() => {
    //     getHardResponse(sampleText);
    // }, 1000)
}
function sendButton(data=undefined) {
    getResponse(data);
}
function heartButton() {
    buttonSendText("Heart clicked!")
}
