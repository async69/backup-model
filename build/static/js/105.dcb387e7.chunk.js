(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{1573:function(e,t,a){"use strict";var n=a(3),c=a(1),r=a.n(c),i=a(27),o=a(28),s=a(33),u=a(34),l=a(23);function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(l.a)(e);if(t){var c=Object(l.a)(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return Object(u.a)(this,a)}}var d=function(e){Object(s.a)(a,e);var t=f(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return r.a.createElement("thead",null,r.a.createElement("tr",null,this.props.columns.map(function(e){return r.a.createElement("th",{key:e.path||e.key},e.label)})))}}]),a}(c.Component),m=a(1583),b=a.n(m),p=a(53),O=a(43),g=/[0-9\-+#]/,h=/[^\d\-+#]/g;function v(e){return e.search(g)}function j(e,t,a){var n=!1,c={value:e};e<0&&(n=!0,c.value=-c.value),c.sign=n?"-":"",c.value=Number(c.value).toFixed(t.fraction&&t.fraction.length),c.value=Number(c.value).toString();var r=t.fraction&&t.fraction.lastIndexOf("0"),i=c.value.split("."),o=Object(O.a)(i,2),s=o[0],u=void 0===s?"0":s,l=o[1],f=void 0===l?"":l;return(!f||f&&f.length<=r)&&(f=r<0?"":Number("0."+f).toFixed(r+1).replace("0.","")),c.integer=u,c.fraction=f,function(e,t){e.result="";var a=t.integer.split(t.separator),n=a.join(""),c=n&&n.indexOf("0");if(c>-1)for(;e.integer.length<n.length-c;)e.integer="0"+e.integer;else 0===Number(e.integer)&&(e.integer="");var r=a[1]&&a[a.length-1].length;if(r)for(var i=e.integer.length,o=i%r,s=0;s<i;s++)e.result+=e.integer.charAt(s),!((s-o+1)%r)&&s<i-r&&(e.result+=t.separator);else e.result=e.integer;e.result+=t.fraction&&e.fraction?t.decimal+e.fraction:""}(c,t),"0"!==c.result&&""!==c.result||(n=!1,c.sign=""),!n&&t.maskHasPositiveSign?c.sign="+":n&&t.maskHasPositiveSign?c.sign="-":n&&(c.sign=a&&a.enforceMaskSign&&!t.maskHasNegativeSign?"":"-"),c}var E=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e||isNaN(Number(t)))return t;var n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#.##",t={},a=e.length,n=v(e);t.prefix=n>0?e.substring(0,n):"";var c=v(e.split("").reverse().join("")),r=a-c,i=e.substring(r,r+1),o=r+("."===i||","===i?1:0);t.suffix=c>0?e.substring(o,a):"",t.mask=e.substring(n,o),t.maskHasNegativeSign="-"===t.mask.charAt(0),t.maskHasPositiveSign="+"===t.mask.charAt(0);var s=t.mask.match(h);return t.decimal=s&&s[s.length-1]||".",t.separator=s&&s[1]&&s[0]||",",s=t.mask.split(t.decimal),t.integer=s[0],t.fraction=s[1],t}(e),c=j(t,n,a);return n.prefix+c.sign+c.result+n.suffix},k=a(1578),y=a(1584);function S(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(l.a)(e);if(t){var c=Object(l.a)(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return Object(u.a)(this,a)}}var M=function(e){Object(s.a)(a,e);var t=S(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).renderCell=function(e,t,a){if(console.log("loaded",a),t.content)return t.content(e,a);var n=b.a.get(e,t.path),c=k.findIndex(function(e){return e===String(t.path)});return y.findIndex(function(e){return e===String(t.path)})>=0?Object(p.e)(n):c>=0?E("#,###.00",n,{enforceMaskSign:!0}):n?String(n):""},e.createKey=function(e,t){return e._id+(t.path||t.key)},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.data,n=t.columns;return r.a.createElement("tbody",null,a.map(function(t){return r.a.createElement("tr",{key:t.id},n.map(function(a){return r.a.createElement("td",{key:e.createKey(t,a)},e.renderCell(t,a,e.props.loading))}))}))}}]),a}(c.Component),C=a(1643),D=a(1644),U=a(1645),N=a(109),x=a(1575),R=function(){var e=Object(c.useContext)(N.a),t=e.rootState,a=e.dispatch,n=Object(c.useState)(0),i=Object(O.a)(n,2),o=i[0],s=i[1],u=Object(c.useState)(0),l=Object(O.a)(u,2),f=l[0],d=l[1],m=Object(c.useState)(0),b=Object(O.a)(m,2),p=b[0],g=b[1],h=Object(c.useState)(0),v=Object(O.a)(h,2),j=v[0],E=v[1],k=Object(c.useState)(!1),y=Object(O.a)(k,2),S=y[0],M=y[1],R=Object(c.useState)(!1),w=Object(O.a)(R,2),_=w[0],A=w[1],P=Object(c.useState)({count:0,results:[]}),I=Object(O.a)(P,2),L=I[0],T=I[1],F=Object(c.useState)(0),z=Object(O.a)(F,2),H=z[0],V=z[1],q=Object(c.useState)(""),J=Object(O.a)(q,2),K=J[0],W=J[1];Object(c.useEffect)(function(){Object(x.a)(t)},[t]),Object(c.useEffect)(function(){var e=L.count,t=L.results;0===t.length&&0===e||(E(Math.ceil(e/t.length)),d(t.length),g(e),M(!0))},[K,E,d,g,M]),Object(c.useEffect)(function(){if(H){var e=L.count,t=L.results;f<=t.length&&(E(Math.ceil(e/t.length)),d(t.length),g(e),M(!0))}},[H,L]),Object(c.useEffect)(function(){try{var e=Object(x.b)(t),a=e.results,n=e.amount,c=e.activeTab;if(""!==c?W(c):console.warn("Pass active tab for paginations"),n!==H&&"undefined"!==typeof n&&(V(n),T(a)),"undefined"!==String(a)&&!S){var r=a.count,i=a.results;E(Math.ceil(r/i.length)),d(i.length),g(r),M(!0)}}catch(o){}},[t,V,T]);var B=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;_||A(!0),s(e),t&&d(t)};return Object(c.useEffect)(function(){o<p&&_&&Object(x.c)({},a,{offset:o,limit:f,onClick:_})},[o,f]),r.a.createElement("div",null,r.a.createElement(C.a,{className:"pagination left",size:"md",color:"primary"},r.a.createElement(D.a,{disabled:0===o},r.a.createElement(U.a,{first:!0,href:"#",onClick:function(){return B(0)}},"First")),r.a.createElement(D.a,null,r.a.createElement(U.a,{previous:!0,disabled:0===o,onClick:function(){return B(o-f)}})),Array(j).fill("").map(function(e,t){return r.a.createElement(D.a,{active:t===Math.floor(o/f)},r.a.createElement(U.a,{onClick:function(){return B(t*f)}},t+1))}),r.a.createElement(D.a,null,r.a.createElement(U.a,{next:!0,onClick:function(){return B(o+f)},disabled:o+f>=p})),r.a.createElement(D.a,{disabled:o+f>=p},r.a.createElement(U.a,{last:!0,onClick:function(){return B((j-1)*f)}},"Last"))))},w=a(1549),_=a(1554),A=a(1619),P=a(177);t.a=Object(P.b)(function(e,t){return Object(n.a)({state:e},t)})(function(e){var t=e.columns,a=e.data,n=e.title,i=e.state,o=e.getLoading;Object(c.useEffect)(function(){"function"===typeof o&&console.log("result",o(i,{isPatch:!0}))},[i,o]);var s=Object(c.useContext)(N.a).rootState;return Object(c.useEffect)(function(){},[s]),console.log(o(i,{isPatch:!0})),r.a.createElement(w.a,{className:"p-2"},r.a.createElement(_.a,{className:"tableHeaders border-0"},r.a.createElement("div",null,""+n?n:"")),r.a.createElement(A.a,{size:"md",responsive:!0,striped:!0},r.a.createElement(d,{columns:t}),r.a.createElement(M,{data:a,columns:t,loading:"fucntion"===typeof o?o(i,{isPatch:!0}):{}}),r.a.createElement(R,null)))})},1575:function(e,t,a){"use strict";a.d(t,"b",function(){return c}),a.d(t,"d",function(){return r}),a.d(t,"a",function(){return i}),a.d(t,"c",function(){return o});var n=a(38),c=function(e){return e.page_values?e.page_values:null},r=function(e,t,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";if("undefined"!==typeof a){if(0===a.count)return null;t({type:n.a.UPDATE,stateName:"page_values",payload:{results:a,options:r,pageLimit:a.length?5*Math.ceil(a.length/5):5,amount:c(e)?c(e).amount+1:0,activeTab:i}})}},i=function(e){var t=e.page_values;try{var a=t.pageLimit?t.pageLimit:0;return a||0}catch(n){}},o=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{offset:0,limit:0};t({type:n.a.UPDATE,stateName:"page_values",payload:{options:a}})}},1578:function(e){e.exports=["credit","debit","total","total_amount","paid_amount","account_balance","balance","price","unit_price","tax","unit_cost","tax_amount","amount_excl_vat","quantity","inventory_quantity","account.balance"]},1621:function(e,t,a){"use strict";a.d(t,"a",function(){return l});a(7);var n=a(3),c=a(1),r=a.n(c),i=a(14),o=a(1620),s={modalData:{openModal:!1,data:{},options:{},isDone:!1,title:"",submit:function(e){return null},Component:r.a.createElement(c.Fragment,null),okCallback:function(e){return null},cancelCallback:function(e){return null}}},u=Object(i.c)({name:"modalData",reducers:{toggle:function(e,t){var a=t.payload,c=a.type,i=a.data,s=a.title,u=a.Component,l=a.submit,f=a._toggle,d=a.isDone,m=a.deleteOptions,b=a.options;switch(c){case"OPEN":e.modalData=Object(n.a)({},e.modalData,{openModal:!0,title:s,data:i,Component:r.a.createElement(u,{toggle:f})});break;case"ADD":e.modalData=Object(n.a)({},e.modalData,{openModal:!0,title:s,data:i,submit:l,isDone:d,options:b,Component:r.a.createElement(u,{submit:l,options:b})});break;case"VIEW":e.modalData=Object(n.a)({},e.modalData,{openModal:!0,title:s,data:i,options:b,Component:r.a.createElement(u,{disabled:!0,data:i,isView:!0,options:b})});break;case"EDIT":e.modalData=Object(n.a)({},e.modalData,{openModal:!0,title:s,data:i,isDone:d,options:b,Component:r.a.createElement(u,{isEdit:!0,data:i,submit:l,options:b})});break;case"DELETE":var p=m.okCallback,O=m.cancelCallback,g=m.title,h=m.id,v=m.message;Object(o.a)({okCallback:p,errCallback:O,title:g,id:h,message:v});break;case"CLOSE":e.modalData=Object(n.a)({},e.modalData,{openModal:!1})}}},initialState:s}),l=u.actions.toggle;u.reducer},2408:function(e,t,a){"use strict";a.r(t);var n=a(43),c=a(1),r=a.n(c),i=a(1574),o=a(1555),s=a(1788),u=a(1549),l=a(17),f=a(3),d=a(27),m=a(28),b=a(179),p=a(33),O=a(34),g=a(23),h=a(1577),v=a(1576),j=a.n(v),E=a(1550),k=a(1556),y=a(1787),S=a(1622),M=a(56),C=a(177);function D(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var a,n=Object(g.a)(e);if(t){var c=Object(g.a)(this).constructor;a=Reflect.construct(n,arguments,c)}else a=n.apply(this,arguments);return Object(O.a)(this,a)}}var U=function(e){Object(p.a)(a,e);var t=D(a);function a(e){var n;return Object(d.a)(this,a),(n=t.call(this,e)).initialState={data:{id:"",code:"",name:"",remarks:""},errors:{},lockUpdate:!1},n.state=n.initialState,n.schema={id:j.a.string().allow("").optional(),code:j.a.string().required().label("Code"),name:j.a.string().required().label("Name"),remarks:j.a.string().allow("").optional()},n.populateState=n.populateState.bind(Object(b.a)(n)),n}return Object(m.a)(a,[{key:"doSubmit",value:function(){this.props.submit(this.state.data)}},{key:"populateState",value:function(e){var t=Object(f.a)({},this.state,{data:{id:e.id?e.id:"",code:e.code?e.code:"",name:e.name?e.name:"",remarks:e.remarks?e.remarks:""},lockUpdate:!0});this.setState(t)}},{key:"componentDidUpdate",value:function(){this.props.doneAdd&&this.resetForm(),!this.props.isEdit&&!this.props.isView||this.state.lockUpdate||this.populateState(this.props.data)}},{key:"componentDidMount",value:function(){this.componentDidUpdate()}},{key:"render",value:function(){return r.a.createElement(u.a,{className:"border-0"},r.a.createElement(E.a,null,r.a.createElement(k.a,{onSubmit:this.handleSubmit},r.a.createElement(y.a,null,r.a.createElement(s.a,{md:6,sm:12,xs:12},this.renderInput("code"," Code")),r.a.createElement(s.a,{md:6,sm:12,xs:12},this.renderInput("name"," Name")),r.a.createElement(s.a,{md:12,sm:12,xs:12},this.renderInput("remarks","Remarks","textarea"))),r.a.createElement(S.a,{align:"center"},this.renderButton("Save")))))}}]),a}(h.a),N=Object(C.b)(M.e)(U),x=a(1573),R=a(1581),w=a(1579),_=function(e){var t=e.UOMs,a=e.addUOM,f=e.editUOM,d=e.deleteUOM,m=e.doneAdd,b=e.doneEdit,p=Object(c.useReducer)(R.c,R.b),O=Object(n.a)(p,2),g=O[0],h=O[1],v=[{path:"code",label:"Code"},{path:"name",label:"Name"},{path:"remarks",label:"Remarks"},{key:"view",content:function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,{className:"m-1",size:"sm",outline:!0,color:"info",onClick:function(){Object(R.a)({type:"VIEW",Component:N,data:e,title:"View Unit of Measurement"},h)}},r.a.createElement(l.M,null)),r.a.createElement(o.a,{className:"m-1",size:"sm",outline:!0,color:"warning",onClick:function(){Object(R.a)({type:"EDIT",title:"Edit Unit of Measurement",Component:N,submit:f,isEdit:!0,data:e},h)}},r.a.createElement(l.s,null)),r.a.createElement(o.a,{className:"m-1",size:"sm",outline:!0,color:"danger",onClick:function(){Object(R.a)({type:"DELETE",deleteOptions:{okCallback:j,title:"Are you sure?",id:e.id,message:""}},h)}},r.a.createElement(l.p,null)))}}],j=function(e){d(e)};return Object(c.useEffect)(function(){(m||b)&&Object(R.a)({type:"CLOSE"},h)},[m,b]),r.a.createElement("div",null,r.a.createElement(i.a,null,r.a.createElement(w.a,{data:g.data,openModal:g.openModal,component:g.Component,toggle:R.a,dispatch:h,title:g.title}),r.a.createElement(s.a,{align:"right",className:"mb-1 pl-3 pr-3"},r.a.createElement(o.a,{onClick:function(){Object(R.a)({type:"ADD",Component:N,submit:a,isEdit:!0,data:t},h)},outline:!0,size:"sm"},"New Unit Of Measurment")),r.a.createElement(u.a,{className:"border-0"},r.a.createElement(x.a,{title:"Unit Of Measurments",columns:v,data:t}))))},A=a(102),P=a(19),I=a(1621);t.default=Object(C.b)(function(e){return{fetchStatus:Object(M.j)(e),addStatus:Object(M.g)(e),UOMs:Object(M.k)(e),editStatus:Object(M.i)(e),deleteStatus:Object(M.h)(e)}},function(e){return{fetchUOMs:function(){return e(Object(M.c)())},addUOM:function(t){return e(Object(M.a)(t))},editUOM:function(t){return e(Object(M.b)(t))},deleteUOM:function(t){return e(Object(M.d)(t))},toggle:function(t){return e(Object(I.a)(t))}}})(function(e){var t=e.fetchStatus,a=e.addStatus,i=e.UOMs,o=e.fetchUOMs,s=e.addUOM,u=e.editStatus,l=e.editUOM,f=e.deleteStatus,d=e.deleteUOM,m=e.toggle,b=Object(c.useState)(!0),p=Object(n.a)(b,2),O=p[0],g=p[1],h=Object(c.useState)(!0),v=Object(n.a)(h,2),j=v[0],E=v[1],k=Object(c.useState)(!0),y=Object(n.a)(k,2),S=y[0],M=y[1],C=Object(c.useState)(!0),D=Object(n.a)(C,2),U=D[0],N=D[1],x=a.status===P.e.success&&!j,R=u.status===P.e.success&&!S,w=f.status===P.e.success&&!U;Object(c.useEffect)(function(){g(!1),o()},[o,g]),Object(c.useEffect)(function(){t.status!==P.e.failure||O||(A.toast.error("Failed fetching UOMs"),g(!0))},[t,g]),Object(c.useEffect)(function(){var e=a.status;e!==P.e.failure||j?e!==P.e.success||j||(A.toast.success("Added UOM"),E(!0)):E(!0)},[a,E]),Object(c.useEffect)(function(){var e=u.status;e!==P.e.failure||S?e!==P.e.success||S||(A.toast.success("Edited UOM"),M(!0)):M(!0)},[u,M]),Object(c.useEffect)(function(){var e=f.status;e!==P.e.failure||U?e!==P.e.success||U||(A.toast.success("Deleted UOM"),N(!0)):N(!0)},[f,N]);return Object(c.useEffect)(function(){(x||R||w)&&m({type:"CLOSE"})},[x,R,w]),r.a.createElement(_,{UOMs:i,doneAdd:a.status===P.e.success&&!j,addUOM:function(e){E(!1);var t={name:e.name,code:e.code,remarks:e.remarks};s(t)},doneEdit:u.status===P.e.success&&!S,editUOM:function(e){M(!1);var t={id:e.id,name:e.name,code:e.code,remarks:e.remarks};l(t)},doneDelete:f.status===P.e.success&&!U,deleteUOM:function(e){N(!1),d(e)},_toggle:m})})}}]);
//# sourceMappingURL=105.dcb387e7.chunk.js.map