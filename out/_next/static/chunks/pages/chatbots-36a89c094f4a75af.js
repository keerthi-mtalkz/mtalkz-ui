(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4549],{42222:function(e,t,n){"use strict";var s=n(63907),r=n(50542),a=n(12478),i="localStorage"in n.g&&n.g.localStorage?n.g.localStorage:s;function o(e,t){return 1===arguments.length?c(e):l(e,t)}function c(e){const t=i.getItem(e);return r(t)}function l(e,t){try{return i.setItem(e,JSON.stringify(t)),!0}catch(n){return!1}}o.set=l,o.get=c,o.remove=function(e){return i.removeItem(e)},o.clear=function(){return i.clear()},o.backend=function(e){return e&&(i=e),i},o.on=a.on,o.off=a.off,e.exports=o},50542:function(e){"use strict";e.exports=function(e){const t=function(e){try{return JSON.parse(e)}catch(t){return e}}(e);return void 0===t?null:t}},63907:function(e){"use strict";var t={};e.exports={getItem:function(e){return e in t?t[e]:null},setItem:function(e,n){return t[e]=n,!0},removeItem:function(e){return!!(e in t)&&delete t[e]},clear:function(){return t={},!0}}},12478:function(e,t,n){"use strict";var s=n(50542),r={};function a(e){e||(e=n.g.event);var t=r[e.key];t&&t.forEach((function(t){t(s(e.newValue),s(e.oldValue),e.url||e.uri)}))}e.exports={on:function(e,t){r[e]?r[e].push(t):r[e]=[t],n.g.addEventListener?n.g.addEventListener("storage",a,!1):n.g.attachEvent?n.g.attachEvent("onstorage",a):n.g.onstorage=a},off:function(e,t){var n=r[e];n.length>1?n.splice(n.indexOf(t),1):r[e]=[]}}},65962:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/chatbots",function(){return n(36459)}])},3695:function(e,t,n){"use strict";var s=n(85893),r=(n(67294),function(e){var t=e.onClick;return(0,s.jsxs)("div",{className:"modal-header",children:[(0,s.jsx)("h3",{className:"text-xl font-semibold",children:"Delete Confirmation"}),(0,s.jsx)("button",{className:"modal-close btn btn-transparent",onClick:t,children:(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",className:"text-secondary stroke-current inline-block h-5 w-5",children:[(0,s.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,s.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),a=function(e){var t=e.onClick,n=e.onSubmit;return(0,s.jsxs)("div",{className:"modal-footer children-x-2",children:[(0,s.jsx)("button",{style:{background:"red",padding:"10px",color:"white"},type:"button",onClick:t,children:"Cancel"}),(0,s.jsx)("button",{style:{background:"#667eea",padding:"10px",width:"60px",color:"white"},type:"button",onClick:n,children:"Ok"})]})};t.Z=function(e){var t=e.onCancel,n=e.onSubmit;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"backdrop fade-in fixed inset-0 z-40 bg-black"}),(0,s.jsx)("div",{className:"modal show justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",children:(0,s.jsx)("div",{className:"relative w-auto my-4 mx-auto max-w-lg",children:(0,s.jsxs)("div",{className:"modal-content",style:{width:"550px"},children:[(0,s.jsx)(r,{onClick:function(){return t()}}),(0,s.jsx)("p",{className:"ml-5",children:"Are you sure?"}),(0,s.jsx)("p",{className:"ml-5",children:"Do you want to delete"}),(0,s.jsx)(a,{onClick:function(){return t()},onSubmit:function(){return n()}})]})})})]})}},98499:function(e,t,n){"use strict";var s=n(85893);t.Z=function(e){var t=e.icon,n=e.classNames;return(0,s.jsx)("i",{className:"".concat(t," ").concat(n)})}},36459:function(e,t,n){"use strict";n.r(t);var s=n(47568),r=n(828),a=n(70655),i=n(85893),o=n(67294),c=n(36804),l=n(34120),u=n(50196),d=n(41664),f=n.n(d),h=n(11163),x=n(94379),m=n(98499),v=n(42222),p=n.n(v),g=n(3695);t.default=(0,l.X)((function(){var e,t=(0,o.useState)([]),n=t[0],l=t[1],d=(0,o.useState)(""),v=d[0],b=d[1],j=(0,o.useState)(void 0),w=j[0],y=j[1],N=(0,r.Z)(o.useState(!1),2),k=N[0],C=N[1],S=(0,o.useState)(void 0),_=S[0],E=S[1],Z=((0,h.useRouter)(),p().get("user")),I=function(){var e=(0,s.Z)((function(){var e;return(0,a.__generator)(this,(function(t){return e=p().get("token"),u.ZP.get("https://cb.mtalkz.cloud/export/",{headers:{"x-api-key":"Bearer ".concat(e)}}).then((function(e){return l(e.data)})).catch((function(e){})),[2]}))}));return function(){return e.apply(this,arguments)}}();(0,o.useEffect)((function(){I()}),[]);var A=function(){var e=p().get("token");u.ZP.get("https://cb.mtalkz.cloud/delete/".concat(_),{headers:{"x-api-key":"Bearer ".concat(e)}}).then((function(e){C(!1),y({type:"success"}),y(void 0),I()})).catch((function(e){C(!1),y({type:"error",message:e.response.data.message}),y(void 0)}))};return(0,i.jsxs)(c.Z,{children:[k&&(0,i.jsx)(g.Z,{onCancel:function(){y(void 0),C(!1)},onSubmit:function(){A()},children:" "}),"success"===(null===w||void 0===w?void 0:w.type)&&(0,i.jsx)("div",{className:"flex flex-wrap w-full",children:(0,i.jsx)("div",{className:"p-2",children:x.fn.success("Chatbot Deleted Successfully","")})}),"error"===(null===w||void 0===w?void 0:w.type)&&(0,i.jsx)("div",{className:"flex flex-wrap w-full",children:(0,i.jsx)("div",{className:"p-2",children:x.fn.error(w.message,"Error")})}),(0,i.jsxs)("div",{className:"flex flex-row",children:[(0,i.jsx)("div",{className:" w-5/6",children:(0,i.jsx)("input",{type:"text",name:"search",className:"w-full p-2 ...",onChange:function(e){return b(e.target.value)},placeholder:"Search..."})}),(0,i.jsxs)("div",{className:"w-1/6 ",children:[" ",(0,i.jsx)(f(),{href:"/chatbots/createChatbot",children:(0,i.jsx)("a",{children:(0,i.jsx)("button",{className:"ml-3 btn btn-default btn-indigo create-btn w-full",type:"button",children:"Add Chatbot"})})})]})]}),(0,i.jsx)("div",{className:"flex flex-row flex-wrap w-full mt-4",children:null===(e=n.existingChatbots)||void 0===e?void 0:e.filter((function(e){return""==v||e.name.toLowerCase().includes(v.toLocaleLowerCase())?e:void 0})).map((function(e,t){return(0,i.jsxs)("div",{className:"flex flex-col w-full mb-4 lg:w-1/3 relative",children:[!e.deleted&&(0,i.jsx)("p",{className:"p-4 absolute right-0",style:{textAlign:"right",cursor:"pointer",lineHeight:"normal"},onClick:function(){var t;1==Z.is_system_user&&(t=e._id,E(t),C(!0))},children:(0,i.jsx)("i",{className:"icon-trash text-1xl font-bold mb-2 "})}),(0,i.jsx)(f(),{href:e.deleted?"/chatbots":"/chatbots/".concat(e._id),children:(0,i.jsx)("a",{className:"w-full",children:(0,i.jsx)("div",{className:"card bg-white shadow-lg py-4 p-4",style:{background:e.deleted?"lightgrey":"white"},children:(0,i.jsxs)("div",{className:"card-body",children:[(0,i.jsx)("div",{className:"title text-base font-base font-bold font-poppins",children:e.name}),(0,i.jsxs)("p",{className:"text-secondary pb-3",children:["Phone : ",e.phone]}),(0,i.jsx)("hr",{}),(0,i.jsxs)("div",{className:"flex justify-between pt-3",children:[(0,i.jsxs)("div",{className:"col-lg-6",children:[(0,i.jsx)("div",{className:"title font-base font-poppins",children:"Channel Type"}),(0,i.jsxs)("p",{className:"text-secondary ",children:[(0,i.jsx)("img",{src:"/images/whatsapp.svg",style:{width:12,display:"inline",marginRight:6},alt:"WhatsApp"}),e.channel]})]}),(0,i.jsxs)("div",{className:"col-lg-6",children:[(0,i.jsx)("div",{className:"title font-base font-poppins",children:"Created On"}),(0,i.jsx)("p",{className:"text-secondary ",children:(0,i.jsxs)("div",{children:[(0,i.jsx)(m.Z,{icon:"icon-note",className:"inline-block mr-1"}),new Date(e.createdAt).toLocaleString("en-IN")]})})]})]})]})})})})]},t)}))})]})}))},828:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var s=n(13375);var r=n(91566);function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||(0,s.Z)(e,t)||(0,r.Z)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}},function(e){e.O(0,[5367,196,7955,6268,5776,9774,2888,179],(function(){return t=65962,e(e.s=t);var t}));var t=e.O();_N_E=t}]);