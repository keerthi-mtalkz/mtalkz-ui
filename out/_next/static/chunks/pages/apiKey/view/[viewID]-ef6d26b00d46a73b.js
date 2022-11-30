(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[795],{86175:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/apiKey/view/[viewID]",function(){return s(88747)}])},14101:function(e,t,s){"use strict";var i=s(85893);t.Z=function(e){var t=e.title,s=e.subtitle;return(0,i.jsxs)("div",{className:"flex flex-col py-4 mb-4",children:[(0,i.jsx)("h1",{className:"text-lg text-default font-bold font-poppins",children:t}),(0,i.jsx)("h2",{className:"text-sm text-secondary",children:s})]})}},88747:function(e,t,s){"use strict";s.r(t);var i=s(47568),a=s(70655),r=s(85893),l=s(67294),d=s(36804),c=s(14101),n=s(34120),x=s(11163),m=s(94379),o=s(30882),h=s(81817);t.default=(0,n.X)((function(){var e,t=(0,x.useRouter)().query.viewID,s=(0,l.useState)({}),n=s[0],u=s[1],f=(0,l.useState)(void 0),v=f[0],y=f[1],N=function(){var e=(0,i.Z)((function(){var e;return(0,a.__generator)(this,(function(s){switch(s.label){case 0:return e=localStorage.getItem("token"),[4,o.ax.get("/api-keys/".concat(t),{headers:{Authorization:"Bearer ".concat(e)}}).then((function(e){u(e.data.api_key)})).catch((function(e){y({type:"error",message:e.response.data.message})}))];case 1:s.sent(),s.label=2;case 2:return[2]}}))}));return function(){return e.apply(this,arguments)}}();return(0,l.useEffect)((function(){N()}),[]),(0,r.jsxs)(d.Z,{children:[(0,r.jsx)(c.Z,{title:"View API Key",subtitle:""}),"error"===(null===v||void 0===v?void 0:v.type)&&(0,r.jsx)("div",{className:"flex flex-wrap w-full",children:(0,r.jsx)("div",{className:"p-2",children:m.fn.error(v.message,"Error")})}),(0,r.jsxs)("div",{className:"p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700",children:[(0,r.jsx)("div",{className:"flow-root",children:(0,r.jsx)("ul",{role:"list",className:"divide-y divide-gray-200 dark:divide-gray-700",children:(0,r.jsx)("li",{className:"py-3 sm:py-4",children:(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:"Key"})}),(0,r.jsx)("div",{className:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:n.masked_key})})]})})})}),(0,r.jsx)("div",{className:"flow-root",children:(0,r.jsx)("ul",{role:"list",className:"divide-y divide-gray-200 dark:divide-gray-700",children:(0,r.jsx)("li",{className:"py-3 sm:py-4",children:(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:"Resource"})}),(0,r.jsx)("div",{className:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:null===(e=n.resource)||void 0===e?void 0:e.name})})]})})})}),(0,r.jsx)("div",{className:"flow-root",children:(0,r.jsx)("ul",{role:"list",className:"divide-y divide-gray-200 dark:divide-gray-700",children:(0,r.jsx)("li",{className:"py-3 sm:py-4",children:(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:"Credits"})}),(0,r.jsx)("div",{className:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:n.credits})})]})})})}),(0,r.jsx)("div",{className:"flow-root",children:(0,r.jsx)("ul",{role:"list",className:"divide-y divide-gray-200 dark:divide-gray-700",children:(0,r.jsx)("li",{className:"py-3 sm:py-4",children:(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:"Status"})}),(0,r.jsx)("div",{className:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white",children:(0,r.jsx)(h.C,{size:"default",color:1==n.is_active?"green":"red",rounded:!0,children:n.is_active?"Active":"Inactive"})})]})})})}),(0,r.jsx)("div",{className:"flow-root",children:(0,r.jsx)("ul",{role:"list",className:"divide-y divide-gray-200 dark:divide-gray-700",children:(0,r.jsx)("li",{className:"py-3 sm:py-4",children:(0,r.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:"Total Credits"})}),(0,r.jsx)("div",{className:"inline-flex items-center text-base font-semibold text-gray-900 dark:text-white",children:(0,r.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:n.total_credits})})]})})})})]})]})}))}},function(e){e.O(0,[5367,196,7955,6268,5776,9774,2888,179],(function(){return t=86175,e(e.s=t);var t}));var t=e.O();_N_E=t}]);