"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6704],{38487:function(e,t,s){var a=s(85893),r=s(2185),n=s(9008),l=s.n(n);t.Z=function(e){var t=e.children,s=(0,r.v9)((function(e){return{direction:e.direction,name:e.name}}),r.wU),n=s.direction,i=s.name;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l(),{children:(0,a.jsx)("title",{children:i})}),(0,a.jsx)("div",{"data-direction":n,children:t})]})}},34120:function(e,t,s){s.d(t,{X:function(){return p}});var a,r=s(47568),n=s(26042),l=s(69396),i=s(99534),c=s(70655),o=s(85893),u=(s(67294),s(2185)),d=s(14924),x=s(14890),m={name:"Mtalkz",description:"Mtalkz",user:JSON.parse('[{"name":"Lucas smith ejhfvefv","email":"lucas@smith.com","location":"Cupertino, CA","company":"Apple, Inc.","description":"Vital Database Dude","img":"m1.png","color":"green","country":"Australia","organization_id":2}]')[0],url:"#",layout:"layout-3",direction:"ltr",collapsed:!1,toggleRightSidebar:!1,userpermissions:[],colors:["gray","red","orange","yellow","green","teal","blue","indigo","purple","pink"],palettes:{background:"white",logo:"white",leftSidebar:"bg-indigo-800",rightSidebar:"white",navbar:"white",topNavigation:"white"},leftSidebar:{showButtonText:!0,showSectionTitle:!0,showLogo:!0,showCard:!1,showAccountLinks:!1,showProjects:!0,showTags:!0,card:1},test:"",codd:[],kword:[]},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_DEMO":return(0,l.Z)((0,n.Z)({},e),{layout:t.layout,collapsed:t.collapsed,direction:t.direction,leftSidebar:(0,n.Z)({},t.leftSidebar),palettes:(0,n.Z)({},t.palettes)});case"SET_PALETTE":return(0,l.Z)((0,n.Z)({},e),{palettes:(0,l.Z)((0,n.Z)({},e.palettes),(0,d.Z)({},"".concat(t.key),t.value))});case"UPDATE_USER":return console.log(t.value,"YGUyrduetfdeuwyfrtery"),(0,l.Z)((0,n.Z)({},e),{user:t.value});case"UPDATE_PERMISSIONS":return(0,l.Z)((0,n.Z)({},e),{userpermissions:t.value});case"SET_LEFT_SIDEBAR_CONFIG":return(0,l.Z)((0,n.Z)({},e),{leftSidebar:(0,l.Z)((0,n.Z)({},e.leftSidebar),(0,d.Z)({},"".concat(t.key),t.value))});case"SET_LAYOUT":return"layout-3"===t.layout||"layout-4"===t.layout?(0,l.Z)((0,n.Z)({},e),{layout:t.layout,collapsed:!0}):(0,l.Z)((0,n.Z)({},e),{layout:t.layout,collapsed:!1});case"SET_CONFIG":var s=(0,n.Z)({},t.config),a=s.key,r=s.value;return(0,l.Z)((0,n.Z)({},e),(0,d.Z)({},"".concat(a),r));default:return e}},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m;return(0,x.MT)(f,e)},p=(s(7544),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=t.ssr,a=void 0===s||s,d=function(t){var s=t.initialReduxState,a=(0,i.Z)(t,["initialReduxState"]),r=g(s);return(0,o.jsx)(u.zt,{store:r,children:(0,o.jsx)(e,(0,n.Z)({},a))})};return(a||e.getInitialProps)&&(d.getInitialProps=function(){var t=(0,r.Z)((function(t){var s,a,r;return(0,c.__generator)(this,(function(i){switch(i.label){case 0:return s=g(),t.reduxStore=s,"function"!==typeof e.getInitialProps?[3,2]:[4,e.getInitialProps(t)];case 1:return r=i.sent(),[3,3];case 2:r={},i.label=3;case 3:return a=r,[2,(0,l.Z)((0,n.Z)({},a),{initialReduxState:s.getState()})]}}))}));return function(e){return t.apply(this,arguments)}}()),d}),g=function(e){return a||(a=h(e)),a}},36704:function(e,t,s){s.r(t),s.d(t,{default:function(){return g}});var a=s(85893),r=s(67294),n=s(2185),l=s(38487),i=s(41664),c=s.n(i),o=s(34120),u=s(47568),d=s(70655),x=s(11163),m=s(64298),f=s(30882),h=function(){var e=(0,n.I0)(),t=(0,m.cI)(),s=t.register,l=t.handleSubmit,i=(t.watch,t.errors),o=(0,x.useRouter)(),h=(0,r.useState)(void 0),p=h[0],g=h[1],j=function(){var t=(0,u.Z)((function(t){return(0,d.__generator)(this,(function(s){switch(s.label){case 0:return[4,f.ax.post("/auth/login",t).then((function(t){g({type:"success"}),t.data.user.img="m1.png",localStorage.setItem("token",t.data.token),localStorage.setItem("user",JSON.stringify(t.data.user)),localStorage.setItem("userName",t.data.user.name),e({type:"UPDATE_USER",value:t.data.user}),setTimeout((function(){o.push("/dashboard")}),1e3)})).catch((function(e){console.error("get login error",e)}))];case 1:return s.sent(),[2]}}))}));return function(e){return t.apply(this,arguments)}}();return(0,a.jsxs)(a.Fragment,{children:["error"===(null===p||void 0===p?void 0:p.type)&&(0,a.jsx)("div",{className:"bg-red-500 text-white rounded w-full flex flex-wrap items-center justify-start p-3 text-sm mb-4",children:"Invalid login. Please try again"}),(0,a.jsxs)("form",{onSubmit:l(j),className:"flex flex-col text-sm mb-4 w-full",children:[(0,a.jsxs)("div",{className:"w-full mb-4",children:[(0,a.jsxs)("label",{className:"block",children:[(0,a.jsx)("span",{className:"text-default",children:"Email"}),(0,a.jsx)("input",{name:"email",type:"email",ref:s({required:!0}),className:"form-input mt-1 text-xs block w-full bg-white",placeholder:"Enter your email"})]}),i.email&&(0,a.jsx)("p",{className:"mt-1 text-xs text-red-500",children:"Email is required"})]}),(0,a.jsxs)("div",{className:"w-full mb-4",children:[(0,a.jsxs)("label",{className:"block",children:[(0,a.jsx)("span",{className:"text-default",children:"Password"}),(0,a.jsx)("input",{name:"password",type:"password",ref:s({required:!0}),className:"form-input mt-1 text-xs block w-full bg-white",placeholder:"Enter your password"})]}),i.password&&(0,a.jsx)("p",{className:"mt-1 text-xs text-red-500",children:"Password is required"})]}),(0,a.jsx)("div",{className:"w-full",children:(0,a.jsx)("input",{type:"submit",className:"px-4 py-3 uppercase font-bold text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:outline-none active:outline-none",value:"Login"})})]}),(0,a.jsxs)("div",{className:"w-full children-x-1",children:[(0,a.jsx)("span",{className:"text-secondary",children:"New user?"}),(0,a.jsx)("span",{children:(0,a.jsx)(c(),{href:"/pages/create-account",children:(0,a.jsx)("a",{className:"link",children:"Create account here"})})})]}),(0,a.jsx)("div",{className:"w-full",children:(0,a.jsx)("span",{children:(0,a.jsx)(c(),{href:"/pages/forgot-password",children:(0,a.jsx)("a",{className:"link",children:"Forgot password?"})})})})]})},p=function(){(0,n.v9)((function(e){return{name:e.name}}),n.wU).name;return(0,a.jsx)("div",{className:"bg-transparent text-white flex flex-row items-center uppercase font-bold text-2xl tracking-wider justify-start z-10",children:(0,a.jsx)(c(),{href:"/",children:(0,a.jsx)("a",{className:"flex flex-row items-center justify-start",children:(0,a.jsx)("span",{className:"ltr:ml-1 rtl:mr-2 font-sans"})})})})},g=(0,o.X)((function(){var e=(0,n.v9)((function(e){return{name:e.name}}),n.wU).name;return(0,a.jsx)(l.Z,{children:(0,a.jsxs)("div",{className:"w-full flex flex-row h-screen overflow-hidden",children:[(0,a.jsxs)("div",{className:"hidden lg:flex lg:flex-col w-1/2 bg-purple-700 text-white p-8 items-start justify-between relative",children:[(0,a.jsx)(p,{}),(0,a.jsxs)("div",{className:"flex flex-col z-10",children:[(0,a.jsxs)("p",{className:"text-3xl font-bold font-poppins mb-4",children:["Welcome to ",e,"!"]}),(0,a.jsx)("p",{className:"text-sm font-thin",children:"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo."})]}),(0,a.jsxs)("div",{className:"flex flex-row items-center justify-between w-full text-xs z-10",children:[(0,a.jsx)("div",{className:"text-white",children:"\xa9 Mtalkz 2020"}),(0,a.jsxs)("div",{className:"flex flex-row ml-auto",children:[(0,a.jsx)("div",{className:"px-1",children:(0,a.jsx)(c(),{href:"/#",children:(0,a.jsx)("a",{children:"Privacy policy"})})}),(0,a.jsx)("div",{className:"px-1",children:(0,a.jsx)(c(),{href:"/#",children:(0,a.jsx)("a",{children:"Terms of service"})})}),(0,a.jsx)("div",{className:"px-1",children:(0,a.jsx)(c(),{href:"/#",children:(0,a.jsx)("a",{children:"Contact us"})})})]})]})]}),(0,a.jsxs)("div",{className:"w-full lg:w-1/2 bg-white text-default p-8 lg:p-24 flex flex-col items-center justify-center",children:[(0,a.jsx)("p",{className:"text-3xl font-bold font-poppins mb-4",children:(0,a.jsx)("img",{src:"/logo.png",alt:"Mtalkz Connect"})}),(0,a.jsx)(h,{})]})]})})}))},30882:function(e,t,s){s.d(t,{ax:function(){return a}});var a=s(50196).ZP.create({baseURL:"https://app.mtalkz.cloud/api",withCredentials:!0,headers:{"Content-type":"application/json",Accept:"application/json"}})}}]);