(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4235],{49032:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user",function(){return n(60493)}])},3695:function(e,t,n){"use strict";var r=n(85893),s=(n(67294),function(e){var t=e.onClick;return(0,r.jsxs)("div",{className:"modal-header",children:[(0,r.jsx)("h3",{className:"text-xl font-semibold",children:"Delete Confirmation"}),(0,r.jsx)("button",{className:"modal-close btn btn-transparent",onClick:t,children:(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",className:"text-secondary stroke-current inline-block h-5 w-5",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})}),o=function(e){var t=e.onClick,n=e.onSubmit;return(0,r.jsxs)("div",{className:"modal-footer children-x-2",children:[(0,r.jsx)("button",{style:{background:"red",padding:"10px",color:"white"},type:"button",onClick:t,children:"Cancel"}),(0,r.jsx)("button",{style:{background:"#667eea",padding:"10px",width:"60px",color:"white"},type:"button",onClick:n,children:"Ok"})]})};t.Z=function(e){var t=e.onCancel,n=e.onSubmit;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"backdrop fade-in fixed inset-0 z-40 bg-black"}),(0,r.jsx)("div",{className:"modal show justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none",children:(0,r.jsx)("div",{className:"relative w-auto my-4 mx-auto max-w-lg",children:(0,r.jsxs)("div",{className:"modal-content",style:{width:"550px"},children:[(0,r.jsx)(s,{onClick:function(){return t()}}),(0,r.jsx)("p",{className:"ml-5",children:"Are you sure?"}),(0,r.jsx)("p",{className:"ml-5",children:"Do you want to delete"}),(0,r.jsx)(o,{onClick:function(){return t()},onSubmit:function(){return n()}})]})})})]})}},32360:function(e,t,n){"use strict";n.d(t,{Z:function(){return h}});var r=n(26042),s=n(69396),o=n(29815),i=n(85893),a=(n(67294),n(79521)),l=n(45697),c=n.n(l),u=function(e){var t=e.color,n=e.children,r=e.active,s=void 0!==r&&r,o=e.onClick;return s?(0,i.jsx)("button",{onClick:o,className:"btn btn-default btn-".concat(t),children:n}):(0,i.jsx)("button",{onClick:o,className:"btn btn-default btn-default-color",children:n})},d=function(e){var t=e.color,n=e.page,r=e.onClick;return(0,i.jsx)("button",{onClick:r,className:"btn btn-circle btn-".concat(t),children:n})},x=function(e){var t=e.page,n=e.onClick;return(0,i.jsx)("button",{onClick:n,className:"btn btn-circle btn-default-color",children:t})},f=function(e){var t=e.color,n=e.page,r=e.active,s=void 0!==r&&r,o=e.onClick;return s?(0,i.jsx)(d,{onClick:o,page:n,color:t}):(0,i.jsx)(x,{onClick:o,page:n,color:t})},m=function(e){var t=e.color,n=e.items,r=(e.active,e.onClick);return(0,i.jsx)(i.Fragment,{children:n.map((function(e){return(0,i.jsx)(f,{onClick:r,color:t,page:e+1,active:e+1===5},e)}))})};m.propTypes={color:c().string.isRequired,items:c().array.isRequired,active:c().number.isRequired};c().string.isRequired,c().array.isRequired,c().number.isRequired;var h=function(e){var t=e.columns,n=e.data,l=(0,a.useTable)({columns:t,data:n,initialState:{pageIndex:0,pageSize:10}},a.useSortBy,a.usePagination,a.useRowSelect,(function(e){e.visibleColumns.push((function(e){return(0,o.Z)(e)}))})),c=l.getTableProps,d=l.getTableBodyProps,x=l.headerGroups,f=l.prepareRow,m=l.page,h=l.canPreviousPage,p=l.canNextPage,v=l.pageOptions,j=l.pageCount,g=l.gotoPage,b=l.nextPage,w=l.previousPage,N=l.setPageSize,y=(l.selectedFlatRows,l.state),C=y.pageIndex,k=y.pageSize;y.selectedRowIds;return(null===n||void 0===n?void 0:n.length)>0?(0,i.jsxs)("div",{children:[(0,i.jsxs)("table",(0,s.Z)((0,r.Z)({},c()),{className:"table",children:[(0,i.jsx)("thead",{children:x.map((function(e){return(0,i.jsx)("tr",(0,s.Z)((0,r.Z)({},e.getHeaderGroupProps()),{children:e.headers.map((function(e){return(0,i.jsx)("th",(0,s.Z)((0,r.Z)({},e.getHeaderProps(e.getSortByToggleProps())),{children:(0,i.jsxs)("div",{className:"flex flex-row items-center justify-start",children:[(0,i.jsx)("span",{children:e.render("Header")}),(0,i.jsx)("span",{className:"ltr:ml-auto rtl:mr-auto",children:e.isSorted?e.isSortedDesc?(0,i.jsx)("icon",{className:"icon-arrow-down text-xxs"}):(0,i.jsx)("icon",{className:"icon-arrow-up text-xxs"}):""})]})}))}))}))}))}),(0,i.jsx)("tbody",(0,s.Z)((0,r.Z)({},d()),{children:m.map((function(e,t){return f(e),(0,i.jsx)("tr",(0,s.Z)((0,r.Z)({},e.getRowProps()),{children:e.cells.map((function(e){return(0,i.jsx)("td",(0,s.Z)((0,r.Z)({},e.getCellProps()),{style:{"max-width":"10rem"},className:"max-w-xs truncate break-words  text-ellipsis ",children:e.render("Cell")}))}))}))}))}))]})),(0,i.jsxs)("div",{className:"flex flex-row items-center justify-between my-4",children:[(0,i.jsxs)("div",{className:"flex flex-wrap items-center justify-start children-x-2 pagination",children:[0!==C&&(0,i.jsx)(u,{onClick:function(){return g(0)},color:"text-default",children:"First"}),h&&(0,i.jsx)(u,{onClick:function(){return w()},color:"text-default",children:"Previous"}),p&&(0,i.jsx)(u,{onClick:function(){return b()},disabled:!p,color:"text-default",children:"Next"}),C!==j-1&&(0,i.jsx)(u,{onClick:function(){return g(j-1)},disabled:!p,color:"text-default",children:"Last"})]}),(0,i.jsxs)("span",{children:["Page"," ",(0,i.jsxs)("b",{children:[C+1," of ",v.length]})," "]}),(0,i.jsx)("select",{className:"form-select text-sm",value:k,onChange:function(e){N(Number(e.target.value))},children:[10,25,50,100].map((function(e){return(0,i.jsxs)("option",{value:e,children:["Show ",e]},e)}))})]})]}):(0,i.jsx)("div",{className:"text-center",children:"No Records Found"})}},14101:function(e,t,n){"use strict";var r=n(85893);t.Z=function(e){var t=e.title,n=e.subtitle;return(0,r.jsxs)("div",{className:"flex flex-col py-4 mb-4",children:[(0,r.jsx)("h1",{className:"text-lg text-default font-bold font-poppins",children:t}),(0,r.jsx)("h2",{className:"text-sm text-secondary",children:n})]})}},60493:function(e,t,n){"use strict";n.r(t);var r=n(47568),s=n(14924),o=n(26042),i=n(828),a=n(70655),l=n(85893),c=n(34120),u=n(36804),d=n(14101),x=n(32360),f=n(67294),m=n(30882),h=n(41664),p=n.n(h),v=n(94379),j=n(3695),g=n(2185);t.default=(0,c.X)((function(){var e,t=(0,g.v9)((function(e){return{userpermissions:e.userpermissions}}),g.wU).userpermissions,n=(0,i.Z)(f.useState([]),2),c=n[0],h=n[1],b=(0,i.Z)(f.useState(void 0),2),w=b[0],N=b[1],y=(0,i.Z)(f.useState(""),2),C=y[0],k=y[1],Z=(0,i.Z)(f.useState((e={get:!1,update:!1,delete:!1,view:!1},(0,s.Z)(e,"update",!1),(0,s.Z)(e,"setRole",!1),e)),2),S=Z[0],P=Z[1],R=(0,i.Z)(f.useState(!1),2),_=R[0],L=R[1],E=(0,f.useState)(void 0),T=E[0],z=E[1],A=function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(n){return(e={get:!1,update:!1,delete:!1,view:!1,add:!1,setRole:!1}).get=t.includes("users.index")&&H(),e.update=t.includes("users.update"),e.delete=t.includes("users.destroy"),e.view=t.includes("users.show"),e.setRole=t.includes("users.role.set"),e.add=t.includes("users.store"),P((0,o.Z)({},e)),[2]}))}));return function(){return e.apply(this,arguments)}}(),H=function(){var e=(0,r.Z)((function(){var e;return(0,a.__generator)(this,(function(t){switch(t.label){case 0:return e=localStorage.getItem("token"),[4,m.ax.get("/users",{headers:{Authorization:"Bearer ".concat(e)}}).then((function(e){h(e.data)})).catch((function(e){N({type:"error",message:e.response.data.message})}))];case 1:return t.sent(),[2]}}))}));return function(){return e.apply(this,arguments)}}(),I=function(){var e=localStorage.getItem("token");m.ax.delete("/users/".concat(T),{headers:{Authorization:"Bearer ".concat(e)}}).then((function(e){L(!1),N({type:"success"}),setTimeout((function(){N(void 0),H()}),1e3)})).catch((function(e){L(!1),N({type:"error",message:e.response.data.message}),console.error("get /usres error",e.message)}))};(0,f.useEffect)((function(){A()}),[]);var B=[{Header:"Name",accessor:"name"},{Header:"Email",accessor:"email"},{Header:"Organization Name",accessor:"org_name"},{Header:"Actions",sortable:!1,cell:function(){return(0,l.jsx)(Button,{variant:"danger","data-tag":"allowRowEvents","data-action":"delete",children:(0,l.jsx)(FontAwesomeIcon,{icon:faTrash})})},Cell:function(e){return(0,l.jsxs)("div",{className:"flex justify-evenly",children:[S.view&&(0,l.jsx)(p(),{href:"/user/view/".concat(e.row.original.id),children:(0,l.jsx)("p",{children:(0,l.jsx)("i",{className:"icon-eye text-1xl font-bold mb-2"})})}),S.delete&&(0,l.jsx)("p",{style:{cursor:"pointer",lineHeight:"normal"},onClick:function(){return t=e.row.original.id,z(t),void L(!0);var t},children:(0,l.jsx)("i",{className:"icon-trash text-1xl font-bold mb-2"})}),S.update&&(0,l.jsx)(p(),{href:"/user/update/".concat(e.row.original.id),children:(0,l.jsx)("p",{children:(0,l.jsx)("i",{className:"icon-note text-1xl font-bold mb-2"})})}),S.setRole&&(0,l.jsx)(p(),{href:"/user/setRole/".concat(e.row.original.id),children:(0,l.jsx)("p",{children:(0,l.jsx)("i",{className:"icon-refresh text-1xl font-bold mb-2"})})})]})}}];return(0,l.jsxs)(u.Z,{children:[_&&(0,l.jsx)(j.Z,{onCancel:function(){N(void 0),L(!1)},onSubmit:function(){I()},children:" "}),(0,l.jsx)(d.Z,{title:"User Management",subtitle:""}),"success"===(null===w||void 0===w?void 0:w.type)&&(0,l.jsx)("div",{className:"flex flex-wrap w-full",children:(0,l.jsx)("div",{className:"p-2",children:v.fn.success("Deleted user successfully","Success")})}),"error"===(null===w||void 0===w?void 0:w.type)&&(0,l.jsx)("div",{className:"flex flex-wrap w-full",children:(0,l.jsx)("div",{className:"p-2",children:v.fn.error(w.message,"Error")})}),(0,l.jsxs)("div",{className:"flex flex-row pb-4",children:[(0,l.jsx)("div",{className:" w-5/6",children:(0,l.jsx)("input",{type:"text",name:"search",className:"w-full p-2 ...",onChange:function(e){return k(e.target.value)},placeholder:"Search..."})}),S.add&&(0,l.jsxs)("div",{className:"w-1/6 ",children:[" ",(0,l.jsx)(p(),{href:"/user/addUser",children:(0,l.jsx)("button",{className:"ml-3 btn btn-default btn-indigo create-btn w-full",type:"button",children:"Add User"})})]})]}),(0,l.jsx)(x.Z,{columns:B,data:null===c||void 0===c?void 0:c.filter((function(e){var t,n;return""==C||e.name.toLowerCase().includes(C.toLocaleLowerCase())||(null===(t=e.email)||void 0===t?void 0:t.toLowerCase().includes(C.toLocaleLowerCase()))||(null===(n=e.org_name)||void 0===n?void 0:n.toLowerCase().includes(C.toLocaleLowerCase()))?e:void 0})).map((function(e,t){return e})),customclassName:"usertableList"})]})}))},828:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(13375);var s=n(91566);function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||(0,r.Z)(e,t)||(0,s.Z)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}},function(e){e.O(0,[5367,196,7955,6268,9521,5776,9774,2888,179],(function(){return t=49032,e(e.s=t);var t}));var t=e.O();_N_E=t}]);