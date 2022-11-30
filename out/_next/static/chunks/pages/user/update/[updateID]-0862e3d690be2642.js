(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7473],{2409:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/update/[updateID]",function(){return n(47511)}])},5556:function(e,t,n){"use strict";n.d(t,{RT:function(){return i},Xy:function(){return a},ZN:function(){return c},nA:function(){return l}});var r=n(85893),s=(n(67294),n(94379)),a=function(){return(0,r.jsx)("button",{className:"btn btn-default bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-white hover:text-white active:text-white",onClick:function(){return s.fn.info("Info message")},children:"Info"})},l=function(){return(0,r.jsx)("button",{className:"btn btn-default bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600 text-white hover:text-white active:text-white",onClick:function(){return s.fn.warning("Warning message","Close after 3000ms",3e3)},children:"Warning"})},c=function(){return(0,r.jsx)("button",{className:"btn btn-default bg-red-500 hover:bg-red-600 active:bg-red-600 text-white hover:text-white active:text-white",onClick:function(){return s.fn.error("Error message","Click me!",5e3,(function(){alert("callback")}))},children:"Error"})},i=function(){return(0,r.jsx)("button",{className:"btn btn-default bg-green-500 hover:bg-green-600 active:bg-green-600 text-white hover:text-white active:text-white",onClick:function(){return s.fn.success("Success message","Title here")},children:"Success"})}},14101:function(e,t,n){"use strict";var r=n(85893);t.Z=function(e){var t=e.title,n=e.subtitle;return(0,r.jsxs)("div",{className:"flex flex-col py-4 mb-4",children:[(0,r.jsx)("h1",{className:"text-lg text-default font-bold font-poppins",children:t}),(0,r.jsx)("h2",{className:"text-sm text-secondary",children:n})]})}},47511:function(e,t,n){"use strict";n.r(t);var r=n(47568),s=n(70655),a=n(85893),l=n(67294),c=n(36804),i=n(14101),u=n(64298),o=n(34120),d=n(11163),f=n(30882),m=(n(5556),n(94379));n(74865);t.default=(0,o.X)((function(){var e=(0,d.useRouter)(),t=e.query.updateID,n=(0,l.useState)({}),o=n[0],x=n[1],h=(0,l.useState)(void 0),b=h[0],p=h[1],v=(0,l.useState)(void 0),g=v[0],w=v[1],N=function(){var e=(0,r.Z)((function(){var e;return(0,s.__generator)(this,(function(n){switch(n.label){case 0:return e=localStorage.getItem("token"),[4,f.ax.get("/users/".concat(t),{headers:{Authorization:"Bearer ".concat(e)}}).then((function(e){x(e.data.user)})).catch((function(e){console.error("get /user error",e)}))];case 1:n.sent(),n.label=2;case 2:return[2]}}))}));return function(){return e.apply(this,arguments)}}();(0,l.useEffect)((function(){N()}),[]);var j=(0,u.cI)(),k=j.register,y=j.handleSubmit;j.watch;return(0,a.jsxs)(c.Z,{children:[(0,a.jsx)(i.Z,{title:"Update User",subtitle:""}),"success"===(null===b||void 0===b?void 0:b.type)&&(0,a.jsx)("div",{className:"flex flex-wrap w-full",children:(0,a.jsx)("div",{className:"p-2",children:m.fn.success("Updated user details successfully","Success")})}),"error"===(null===b||void 0===b?void 0:b.type)&&(0,a.jsx)("div",{className:"flex flex-wrap w-full",children:(0,a.jsx)("div",{className:"p-2",children:m.fn.error(b.message,"Error")})}),(0,a.jsx)("div",{className:"flex flex-wrap ",children:(0,a.jsx)("div",{className:"w-full",children:(0,a.jsxs)("form",{onSubmit:y((function(n){var r=localStorage.getItem("token");f.ax.put("/users/".concat(t),n,{headers:{Authorization:"Bearer ".concat(r)}}).then((function(t){x(t.data),p({type:"success"}),setTimeout((function(){e.push("/user")}),1e3)})).catch((function(e){e.response.data.errors===[]?w(e.response.data.errors):p({type:"error",message:e.response.data.message})}))})),className:"flex flex-col text-sm mb-4 lg:w-1/3",children:[(0,a.jsxs)("div",{className:"w-full mb-4",children:[(0,a.jsxs)("label",{className:"block",children:[(0,a.jsx)("span",{className:"text-default",children:"Name"}),(0,a.jsx)("span",{className:"text-red-600",children:"*"}),(0,a.jsx)("input",{name:"name",type:"text",ref:k({required:!0}),className:"form-input mt-1 text-xs block w-full bg-white",placeholder:"Enter your name",defaultValue:o.name,required:!0,minLength:3,maxLength:225})]}),g&&g.name&&g.name.map((function(e){return(0,a.jsx)("p",{className:"mt-1 text-xs text-red-500",children:e})}))]}),(0,a.jsxs)("div",{className:"w-full mb-4",children:[(0,a.jsxs)("label",{className:"block",children:[(0,a.jsx)("span",{className:"text-default",children:"Email address"}),(0,a.jsx)("span",{className:"text-red-600",children:"*"}),(0,a.jsx)("input",{name:"email",type:"email",ref:k({required:!0}),className:"form-input mt-1 text-xs block w-full bg-white",placeholder:"Enter your email",defaultValue:o.email,required:!0})]}),g&&g.email&&g.email.map((function(e){return(0,a.jsx)("p",{className:"mt-1 text-xs text-red-500",children:e})}))]}),(0,a.jsxs)("div",{className:"w-full flex",children:[(0,a.jsx)("input",{type:"cancel",className:"btn cursor-pointer btn-default btn-block btn-red mt-5 text-center mr-5 ",value:"Cancel",onClick:function(){e.push("/user")}}),(0,a.jsx)("input",{type:"submit",className:"btn cursor-pointer btn-default btn-block btn-indigo mt-5",value:"Update"})]})]})})})]})}))}},function(e){e.O(0,[5367,196,7955,6268,4298,5776,9774,2888,179],(function(){return t=2409,e(e.s=t);var t}));var t=e.O();_N_E=t}]);