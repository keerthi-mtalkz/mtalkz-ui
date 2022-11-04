(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1310],{29493:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/permission/view/[viewID]",function(){return r(12086)}])},5556:function(e,t,r){"use strict";r.d(t,{RT:function(){return l},Xy:function(){return s},ZN:function(){return c},nA:function(){return a}});var i=r(85893),n=(r(67294),r(94379)),s=function(){return(0,i.jsx)("button",{className:"btn btn-default bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-white hover:text-white active:text-white",onClick:function(){return n.fn.info("Info message")},children:"Info"})},a=function(){return(0,i.jsx)("button",{className:"btn btn-default bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-600 text-white hover:text-white active:text-white",onClick:function(){return n.fn.warning("Warning message","Close after 3000ms",3e3)},children:"Warning"})},c=function(){return(0,i.jsx)("button",{className:"btn btn-default bg-red-500 hover:bg-red-600 active:bg-red-600 text-white hover:text-white active:text-white",onClick:function(){return n.fn.error("Error message","Click me!",5e3,(function(){alert("callback")}))},children:"Error"})},l=function(){return(0,i.jsx)("button",{className:"btn btn-default bg-green-500 hover:bg-green-600 active:bg-green-600 text-white hover:text-white active:text-white",onClick:function(){return n.fn.success("Success message","Title here")},children:"Success"})}},14101:function(e,t,r){"use strict";var i=r(85893);t.Z=function(e){var t=e.title,r=e.subtitle;return(0,i.jsxs)("div",{className:"flex flex-col py-4 mb-4",children:[(0,i.jsx)("h1",{className:"text-lg text-default font-bold font-poppins",children:t}),(0,i.jsx)("h2",{className:"text-sm text-secondary",children:r})]})}},12086:function(e,t,r){"use strict";r.r(t);var i=r(47568),n=r(20414),s=r(85893),a=r(67294),c=r(12596),l=r(14101),o=(r(64298),r(34120)),d=r(11163),u=(r(5556),r(94379)),x=r(30882);t.default=(0,o.X)((function(){var e=(0,d.useRouter)().query.viewID,t=(0,a.useState)({}),r=t[0],o=t[1],m=(0,a.useState)(void 0),h=m[0],f=m[1],v=function(){var t=(0,i.Z)((function(){var t;return(0,n.__generator)(this,(function(r){switch(r.label){case 0:return t=localStorage.getItem("token"),[4,x.ax.get("/permissions/".concat(e),{headers:{Authorization:"Bearer ".concat(t)}}).then((function(e){o(e.data.permission)})).catch((function(e){f({type:"error",err:e}),console.error("get /permissions error",e)}))];case 1:r.sent(),r.label=2;case 2:return[2]}}))}));return function(){return t.apply(this,arguments)}}();return(0,a.useEffect)((function(){v()}),[]),(0,s.jsxs)(c.Z,{children:[(0,s.jsx)(l.Z,{title:"View Permission",subtitle:""}),"error"===(null===h||void 0===h?void 0:h.type)&&(0,s.jsx)("div",{className:"flex flex-wrap w-full",children:(0,s.jsx)("div",{className:"p-2",children:u.fn.error(errors,"Error")})}),(0,s.jsxs)("div",{className:"p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700",children:[(0,s.jsx)("div",{className:"flow-root",children:(0,s.jsx)("ul",{role:"list",className:"divide-y divide-gray-200 dark:divide-gray-700",children:(0,s.jsx)("li",{className:"py-3 sm:py-4",children:(0,s.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,s.jsx)("div",{className:"flex-1 min-w-0",children:(0,s.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:"Route"})}),(0,s.jsx)("div",{className:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white",children:(0,s.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:r.route})})]})})})}),(0,s.jsx)("div",{className:"flow-root",children:(0,s.jsx)("ul",{role:"list",className:"divide-y divide-gray-200 dark:divide-gray-700",children:(0,s.jsx)("li",{className:"py-3 sm:py-4",children:(0,s.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,s.jsx)("div",{className:"flex-1 min-w-0",children:(0,s.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:"Name"})}),(0,s.jsx)("div",{className:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white",children:(0,s.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:r.name})})]})})})}),(0,s.jsx)("div",{className:"flow-root",children:(0,s.jsx)("ul",{role:"list",className:"divide-y divide-gray-200 dark:divide-gray-700",children:(0,s.jsx)("li",{className:"py-3 sm:py-4",children:(0,s.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,s.jsx)("div",{className:"flex-1 min-w-0",children:(0,s.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:"Description"})}),(0,s.jsx)("div",{className:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white",children:(0,s.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:r.description})})]})})})})]})]})}))}},function(e){e.O(0,[5367,196,9350,4298,7106,9774,2888,179],(function(){return t=29493,e(e.s=t);var t}));var t=e.O();_N_E=t}]);