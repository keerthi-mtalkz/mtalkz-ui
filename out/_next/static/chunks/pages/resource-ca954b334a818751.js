(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8697],{94120:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/resource",function(){return r(68353)}])},5341:function(e,t,r){"use strict";var n=r(26042),s=r(69396),c=r(99534),o=r(29815),i=r(85893),a=r(67294),l=r(79521),u=r(44172),d=a.forwardRef((function(e,t){var r=e.indeterminate,o=(0,c.Z)(e,["indeterminate"]),l=a.useRef(),u=t||l;return a.useEffect((function(){u.current.indeterminate=r}),[u,r]),(0,i.jsx)("input",(0,s.Z)((0,n.Z)({type:"checkbox",ref:u},o),{className:"form-checkbox h-4 w-4"}))}));t.Z=function(e){var t=e.columns,r=e.data,c=(0,l.useTable)({columns:t,data:r,initialState:{pageIndex:0,pageSize:10}},l.useSortBy,l.usePagination,l.useRowSelect,(function(e){e.visibleColumns.push((function(e){return[{id:"selection",Header:function(e){var t=e.getToggleAllRowsSelectedProps;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(d,(0,n.Z)({},t()))})},Cell:function(e){var t=e.row;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(d,(0,n.Z)({},t.getToggleRowSelectedProps()))})}}].concat((0,o.Z)(e))}))})),a=c.getTableProps,f=c.getTableBodyProps,x=c.headerGroups,h=c.prepareRow,p=c.page,m=c.canPreviousPage,g=c.canNextPage,j=c.pageOptions,v=c.pageCount,b=c.gotoPage,w=c.nextPage,N=c.previousPage,y=c.setPageSize,C=(c.selectedFlatRows,c.state),k=C.pageIndex,Z=C.pageSize;C.selectedRowIds;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("table",(0,s.Z)((0,n.Z)({},a()),{className:"table",children:[(0,i.jsx)("thead",{children:x.map((function(e){return(0,i.jsx)("tr",(0,s.Z)((0,n.Z)({},e.getHeaderGroupProps()),{children:e.headers.map((function(e){return(0,i.jsx)("th",(0,s.Z)((0,n.Z)({},e.getHeaderProps(e.getSortByToggleProps())),{children:(0,i.jsxs)("div",{className:"flex flex-row items-center justify-start",children:[(0,i.jsx)("span",{children:e.render("Header")}),(0,i.jsx)("span",{className:"ltr:ml-auto rtl:mr-auto",children:e.isSorted?e.isSortedDesc?(0,i.jsx)("icon",{className:"icon-arrow-down text-xxs"}):(0,i.jsx)("icon",{className:"icon-arrow-up text-xxs"}):""})]})}))}))}))}))}),(0,i.jsx)("tbody",(0,s.Z)((0,n.Z)({},f()),{children:p.map((function(e,t){return h(e),(0,i.jsx)("tr",(0,s.Z)((0,n.Z)({},e.getRowProps()),{children:e.cells.map((function(e){return(0,i.jsx)("td",(0,s.Z)((0,n.Z)({},e.getCellProps()),{children:e.render("Cell")}))}))}))}))}))]})),(0,i.jsxs)("div",{className:"flex flex-row items-center justify-between my-4",children:[(0,i.jsxs)("div",{className:"flex flex-wrap items-center justify-start children-x-2 pagination",children:[0!==k&&(0,i.jsx)(u.dq,{onClick:function(){return b(0)},color:"text-default",children:"First"}),m&&(0,i.jsx)(u.dq,{onClick:function(){return N()},color:"text-default",children:"Previous"}),g&&(0,i.jsx)(u.dq,{onClick:function(){return w()},disabled:!g,color:"text-default",children:"Next"}),k!==v-1&&(0,i.jsx)(u.dq,{onClick:function(){return b(v-1)},disabled:!g,color:"text-default",children:"Last"})]}),(0,i.jsxs)("span",{children:["Page"," ",(0,i.jsxs)("b",{children:[k+1," of ",j.length]})," "]}),(0,i.jsx)("select",{className:"form-select text-sm",value:Z,onChange:function(e){y(Number(e.target.value))},children:[10,25,50,100].map((function(e){return(0,i.jsxs)("option",{value:e,children:["Show ",e]},e)}))})]})]})}},44172:function(e,t,r){"use strict";r.d(t,{dq:function(){return o},tl:function(){return u},vv:function(){return d}});var n=r(85893),s=(r(67294),r(45697)),c=r.n(s),o=function(e){var t=e.color,r=e.children,s=e.active,c=void 0!==s&&s,o=e.onClick;return c?(0,n.jsx)("button",{onClick:o,className:"btn btn-default btn-".concat(t),children:r}):(0,n.jsx)("button",{onClick:o,className:"btn btn-default btn-default-color",children:r})},i=function(e){var t=e.color,r=e.page,s=e.onClick;return(0,n.jsx)("button",{onClick:s,className:"btn btn-circle btn-".concat(t),children:r})},a=function(e){var t=e.page,r=e.onClick;return(0,n.jsx)("button",{onClick:r,className:"btn btn-circle btn-default-color",children:t})},l=function(e){var t=e.color,r=e.page,s=e.active,c=void 0!==s&&s,o=e.onClick;return c?(0,n.jsx)(i,{onClick:o,page:r,color:t}):(0,n.jsx)(a,{onClick:o,page:r,color:t})},u=function(e){var t=e.color,r=e.items,s=(e.active,e.onClick);return(0,n.jsx)(n.Fragment,{children:r.map((function(e){return(0,n.jsx)(l,{onClick:s,color:t,page:e+1,active:e+1===5},e)}))})};u.propTypes={color:c().string.isRequired,items:c().array.isRequired,active:c().number.isRequired};var d=function(e){var t=e.color,r=void 0===t?"text-default":t,s=e.items,c=e.active;return(0,n.jsxs)("div",{className:"flex flex-wrap items-center justify-start children-x-2 pagination",children:[(0,n.jsx)(o,{onClick:function(){return null},color:r,children:"Previous"}),(0,n.jsx)(u,{onClick:function(){return null},color:r,items:s,active:c}),(0,n.jsx)(o,{onClick:function(){return null},color:r,children:"Next"})]})};d.propTypes={color:c().string.isRequired,items:c().array.isRequired,active:c().number.isRequired}},14101:function(e,t,r){"use strict";var n=r(85893);t.Z=function(e){var t=e.title,r=e.subtitle;return(0,n.jsxs)("div",{className:"flex flex-col py-4 mb-4",children:[(0,n.jsx)("h1",{className:"text-lg text-default font-bold font-poppins",children:t}),(0,n.jsx)("h2",{className:"text-sm text-secondary",children:r})]})}},68353:function(e,t,r){"use strict";r.r(t);var n=r(47568),s=r(20414),c=r(85893),o=r(34120),i=r(12596),a=r(41664),l=r.n(a),u=r(67294),d=r(5341),f=r(30882),x=r(94379),h=r(14101);t.default=(0,o.X)((function(){var e=(0,u.useState)([]),t=e[0],r=e[1],o=(0,u.useState)(void 0),a=o[0],p=o[1],m=(0,u.useState)(""),g=(m[0],m[1]),j=function(){var e=(0,n.Z)((function(){var e;return(0,s.__generator)(this,(function(t){switch(t.label){case 0:return e=localStorage.getItem("token"),[4,f.ax.get("/resources",{headers:{Authorization:"Bearer ".concat(e)}}).then((function(e){r(e.data)})).catch((function(e){p({type:"error",err:e}),console.error("get /Resources error",e)}))];case 1:return t.sent(),[2]}}))}));return function(){return e.apply(this,arguments)}}();u.useEffect((function(){j()}),[]);var v=[{Header:"ID",accessor:"id"},{Header:"Slug",accessor:"slug"},{Header:"Name",accessor:"name"},{Header:"Description",accessor:"description"},{Header:"Actions",sortable:!1,cell:function(){return(0,c.jsx)(Button,{variant:"danger","data-tag":"allowRowEvents","data-action":"delete",children:(0,c.jsx)(FontAwesomeIcon,{icon:faTrash})})},Cell:function(e){return(0,c.jsxs)("div",{className:"flex justify-evenly",children:[" ",(0,c.jsx)(l(),{href:"/resource/view/".concat(e.row.original.id),children:(0,c.jsx)("p",{children:(0,c.jsx)("i",{className:"icon-eye text-1xl font-bold mb-2"})})})," ",(0,c.jsx)("p",{style:{cursor:"pointer",lineHeight:"normal"},onClick:function(){return function(e){var t=localStorage.getItem("token");window.confirm("are you sure?")?f.ax.delete("/resources/".concat(e),{headers:{Authorization:"Bearer ".concat(t)}}).then((function(e){p({type:"success"}),setTimeout((function(){j()}),1e3)})).catch((function(e){console.error("get /resources error",e.message),p({type:"error",err:e})})):console.log("Thing was not saved to the database.")}(e.row.original.id)},children:(0,c.jsx)("i",{className:"icon-trash text-1xl font-bold mb-2"})}),(0,c.jsx)(l(),{href:"/resource/update/".concat(e.row.original.id),children:(0,c.jsx)("p",{children:(0,c.jsx)("i",{className:"icon-note text-1xl font-bold mb-2"})})})]})}}];return(0,c.jsxs)(i.Z,{children:[(0,c.jsx)(h.Z,{title:"Resource Management",subtitle:""}),"success"===(null===a||void 0===a?void 0:a.type)&&(0,c.jsx)("div",{className:"flex flex-wrap w-full",children:(0,c.jsx)("div",{className:"p-2",children:x.fn.success("Deleted Resource successfully","Success")})}),"error"===(null===a||void 0===a?void 0:a.type)&&(0,c.jsx)("div",{className:"flex flex-wrap w-full",children:(0,c.jsx)("div",{className:"p-2",children:x.fn.error(error,"Error")})}),(0,c.jsxs)("div",{className:"flex flex-row pb-4",children:[(0,c.jsx)("div",{className:" w-5/6",children:(0,c.jsx)("input",{type:"text",name:"search",className:"w-full p-2 ...",onChange:function(e){return g(e.target.value)},placeholder:"Search..."})}),(0,c.jsxs)("div",{className:"w-1/6 ",children:[" ",(0,c.jsx)(l(),{href:"/resource/addResource",children:(0,c.jsx)("button",{className:"ml-3 btn btn-default btn-indigo create-btn w-full",type:"button",children:"Add Resource"})})]})]}),(0,c.jsx)(d.Z,{columns:v,data:t})]})}))}},function(e){e.O(0,[5367,196,9350,9521,7106,9774,2888,179],(function(){return t=94120,e(e.s=t);var t}));var t=e.O();_N_E=t}]);