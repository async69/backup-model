(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{1573:function(e,t,n){"use strict";var a=n(3),r=n(1),c=n.n(r),i=n(27),u=n(28),o=n(33),l=n(34),s=n(23);function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(s.a)(e);if(t){var r=Object(s.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(l.a)(this,n)}}var d=function(e){Object(o.a)(n,e);var t=f(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return c.a.createElement("thead",null,c.a.createElement("tr",null,this.props.columns.map(function(e){return c.a.createElement("th",{key:e.path||e.key},e.label)})))}}]),n}(r.Component),m=n(1583),p=n.n(m),v=n(53),b=n(43),g=/[0-9\-+#]/,h=/[^\d\-+#]/g;function O(e){return e.search(g)}function j(e,t,n){var a=!1,r={value:e};e<0&&(a=!0,r.value=-r.value),r.sign=a?"-":"",r.value=Number(r.value).toFixed(t.fraction&&t.fraction.length),r.value=Number(r.value).toString();var c=t.fraction&&t.fraction.lastIndexOf("0"),i=r.value.split("."),u=Object(b.a)(i,2),o=u[0],l=void 0===o?"0":o,s=u[1],f=void 0===s?"":s;return(!f||f&&f.length<=c)&&(f=c<0?"":Number("0."+f).toFixed(c+1).replace("0.","")),r.integer=l,r.fraction=f,function(e,t){e.result="";var n=t.integer.split(t.separator),a=n.join(""),r=a&&a.indexOf("0");if(r>-1)for(;e.integer.length<a.length-r;)e.integer="0"+e.integer;else 0===Number(e.integer)&&(e.integer="");var c=n[1]&&n[n.length-1].length;if(c)for(var i=e.integer.length,u=i%c,o=0;o<i;o++)e.result+=e.integer.charAt(o),!((o-u+1)%c)&&o<i-c&&(e.result+=t.separator);else e.result=e.integer;e.result+=t.fraction&&e.fraction?t.decimal+e.fraction:""}(r,t),"0"!==r.result&&""!==r.result||(a=!1,r.sign=""),!a&&t.maskHasPositiveSign?r.sign="+":a&&t.maskHasPositiveSign?r.sign="-":a&&(r.sign=n&&n.enforceMaskSign&&!t.maskHasNegativeSign?"":"-"),r}var y=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e||isNaN(Number(t)))return t;var a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#.##",t={},n=e.length,a=O(e);t.prefix=a>0?e.substring(0,a):"";var r=O(e.split("").reverse().join("")),c=n-r,i=e.substring(c,c+1),u=c+("."===i||","===i?1:0);t.suffix=r>0?e.substring(u,n):"",t.mask=e.substring(a,u),t.maskHasNegativeSign="-"===t.mask.charAt(0),t.maskHasPositiveSign="+"===t.mask.charAt(0);var o=t.mask.match(h);return t.decimal=o&&o[o.length-1]||".",t.separator=o&&o[1]&&o[0]||",",o=t.mask.split(t.decimal),t.integer=o[0],t.fraction=o[1],t}(e),r=j(t,a,n);return a.prefix+r.sign+r.result+a.suffix},E=n(1578),S=n(1584);function k(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(s.a)(e);if(t){var r=Object(s.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(l.a)(this,n)}}var T=function(e){Object(o.a)(n,e);var t=k(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).renderCell=function(e,t,n){if(console.log("loaded",n),t.content)return t.content(e,n);var a=p.a.get(e,t.path),r=E.findIndex(function(e){return e===String(t.path)});return S.findIndex(function(e){return e===String(t.path)})>=0?Object(v.e)(a):r>=0?y("#,###.00",a,{enforceMaskSign:!0}):a?String(a):""},e.createKey=function(e,t){return e._id+(t.path||t.key)},e}return Object(u.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.data,a=t.columns;return c.a.createElement("tbody",null,n.map(function(t){return c.a.createElement("tr",{key:t.id},a.map(function(n){return c.a.createElement("td",{key:e.createKey(t,n)},e.renderCell(t,n,e.props.loading))}))}))}}]),n}(r.Component),L=n(1643),x=n(1644),C=n(1645),N=n(109),Q=n(1575),w=function(){var e=Object(r.useContext)(N.a),t=e.rootState,n=e.dispatch,a=Object(r.useState)(0),i=Object(b.a)(a,2),u=i[0],o=i[1],l=Object(r.useState)(0),s=Object(b.a)(l,2),f=s[0],d=s[1],m=Object(r.useState)(0),p=Object(b.a)(m,2),v=p[0],g=p[1],h=Object(r.useState)(0),O=Object(b.a)(h,2),j=O[0],y=O[1],E=Object(r.useState)(!1),S=Object(b.a)(E,2),k=S[0],T=S[1],w=Object(r.useState)(!1),D=Object(b.a)(w,2),R=D[0],_=D[1],A=Object(r.useState)({count:0,results:[]}),M=Object(b.a)(A,2),P=M[0],I=M[1],q=Object(r.useState)(0),H=Object(b.a)(q,2),z=H[0],F=H[1],U=Object(r.useState)(""),V=Object(b.a)(U,2),B=V[0],J=V[1];Object(r.useEffect)(function(){Object(Q.a)(t)},[t]),Object(r.useEffect)(function(){var e=P.count,t=P.results;0===t.length&&0===e||(y(Math.ceil(e/t.length)),d(t.length),g(e),T(!0))},[B,y,d,g,T]),Object(r.useEffect)(function(){if(z){var e=P.count,t=P.results;f<=t.length&&(y(Math.ceil(e/t.length)),d(t.length),g(e),T(!0))}},[z,P]),Object(r.useEffect)(function(){try{var e=Object(Q.b)(t),n=e.results,a=e.amount,r=e.activeTab;if(""!==r?J(r):console.warn("Pass active tab for paginations"),a!==z&&"undefined"!==typeof a&&(F(a),I(n)),"undefined"!==String(n)&&!k){var c=n.count,i=n.results;y(Math.ceil(c/i.length)),d(i.length),g(c),T(!0)}}catch(u){}},[t,F,I]);var K=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;R||_(!0),o(e),t&&d(t)};return Object(r.useEffect)(function(){u<v&&R&&Object(Q.c)({},n,{offset:u,limit:f,onClick:R})},[u,f]),c.a.createElement("div",null,c.a.createElement(L.a,{className:"pagination left",size:"md",color:"primary"},c.a.createElement(x.a,{disabled:0===u},c.a.createElement(C.a,{first:!0,href:"#",onClick:function(){return K(0)}},"First")),c.a.createElement(x.a,null,c.a.createElement(C.a,{previous:!0,disabled:0===u,onClick:function(){return K(u-f)}})),Array(j).fill("").map(function(e,t){return c.a.createElement(x.a,{active:t===Math.floor(u/f)},c.a.createElement(C.a,{onClick:function(){return K(t*f)}},t+1))}),c.a.createElement(x.a,null,c.a.createElement(C.a,{next:!0,onClick:function(){return K(u+f)},disabled:u+f>=v})),c.a.createElement(x.a,{disabled:u+f>=v},c.a.createElement(C.a,{last:!0,onClick:function(){return K((j-1)*f)}},"Last"))))},D=n(1549),R=n(1554),_=n(1619),A=n(177);t.a=Object(A.b)(function(e,t){return Object(a.a)({state:e},t)})(function(e){var t=e.columns,n=e.data,a=e.title,i=e.state,u=e.getLoading;Object(r.useEffect)(function(){"function"===typeof u&&console.log("result",u(i,{isPatch:!0}))},[i,u]);var o=Object(r.useContext)(N.a).rootState;return Object(r.useEffect)(function(){},[o]),console.log(u(i,{isPatch:!0})),c.a.createElement(D.a,{className:"p-2"},c.a.createElement(R.a,{className:"tableHeaders border-0"},c.a.createElement("div",null,""+a?a:"")),c.a.createElement(_.a,{size:"md",responsive:!0,striped:!0},c.a.createElement(d,{columns:t}),c.a.createElement(T,{data:n,columns:t,loading:"fucntion"===typeof u?u(i,{isPatch:!0}):{}}),c.a.createElement(w,null)))})},1575:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"d",function(){return c}),n.d(t,"a",function(){return i}),n.d(t,"c",function(){return u});var a=n(38),r=function(e){return e.page_values?e.page_values:null},c=function(e,t,n){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";if("undefined"!==typeof n){if(0===n.count)return null;t({type:a.a.UPDATE,stateName:"page_values",payload:{results:n,options:c,pageLimit:n.length?5*Math.ceil(n.length/5):5,amount:r(e)?r(e).amount+1:0,activeTab:i}})}},i=function(e){var t=e.page_values;try{var n=t.pageLimit?t.pageLimit:0;return n||0}catch(a){}},u=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{offset:0,limit:0};t({type:a.a.UPDATE,stateName:"page_values",payload:{options:n}})}},1578:function(e){e.exports=["credit","debit","total","total_amount","paid_amount","account_balance","balance","price","unit_price","tax","unit_cost","tax_amount","amount_excl_vat","quantity","inventory_quantity","account.balance"]},1580:function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"a",function(){return r}),n.d(t,"c",function(){return c});var a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"name",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=void 0;return n.length>0&&(r=e.filter(function(e){var r=a?"":"^";try{return n&&String(e[t]).match(new RegExp(r+n,"gi"))}catch(c){console.error("Tag does not exist: ".concat(String(c)))}return null})),"undefined"===typeof r?e:r},r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"posting_date",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",r=void 0;return n.length>0&&a.length>0&&(r=e.filter(function(e){try{var r=new Date(e[t]).getTime(),c=new Date(n).getTime(),i=new Date(a).getTime();return n&&a&&r<=i&&r>=c}catch(u){console.error("Tag does not exist: ".concat(String(u)))}return null})),"undefined"===typeof r?e:r},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"country",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"addresses",r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],c=void 0;return n.length>0&&(c=e.filter(function(e){var c=r?"":"^";try{var i=e[a].findIndex(function(e){return e[t].match(new RegExp(c+n,"gi"))});return n&&i>=0}catch(u){console.error("Tag does not exist: ".concat(String(u)))}return null})),"undefined"===typeof c?e:c}},1582:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a=function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]}},2426:function(e,t,n){"use strict";n.r(t);var a=n(43),r=n(1),c=n.n(r),i=n(3),u=n(1574),o=n(1555),l=n(1788),s=n(1549),f=n(1550),d=n(1579),m=n(27),p=n(28),v=n(33),b=n(34),g=n(23),h=n(1577),O=n(1576),j=n.n(O),y=n(1554),E=n(1556),S=n(1787),k=n(1622);function T(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(g.a)(e);if(t){var r=Object(g.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(b.a)(this,n)}}var L=function(e){Object(v.a)(n,e);var t=T(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).initialState={data:{id:"",name:"",code:"",remarks:""},errors:{}},a.state=a.initialState,a.schema={id:j.a.string().allow("").optional(),name:j.a.string().required().label("Name"),code:j.a.string().required().label("Code"),remarks:j.a.string().allow("").optional()},a}return Object(p.a)(n,[{key:"populateState",value:function(e){var t=Object(i.a)({},this.state,{data:{id:e.id?e.id:"",name:e.name?e.name:"",code:e.code?e.code:"",remarks:e.remarks?e.remarks:""},lockUpdate:!0});this.setState(t)}},{key:"componentDidUpdate",value:function(){!this.props.isEdit&&!this.props.isView||this.state.lockUpdate||this.populateState(this.props.data)}},{key:"componentDidMount",value:function(){this.componentDidUpdate()}},{key:"doSubmit",value:function(){this.props.submit(this.state.data)}},{key:"render",value:function(){return c.a.createElement(s.a,{className:"border-0"},c.a.createElement(y.a,{className:"border-0"},this.props.title),c.a.createElement(f.a,null,c.a.createElement(E.a,{onSubmit:this.handleSubmit},c.a.createElement(S.a,null,c.a.createElement(l.a,{md:6,sm:12,xs:12},this.renderInput({name:"name",label:"Name"})),c.a.createElement(l.a,{md:6,sm:12,xs:12},this.renderInput({name:"code",label:"Code"})),c.a.createElement(l.a,{md:12,sm:12,xs:12},this.renderInput({name:"remarks",label:"Remarks",type:"textarea"}))),c.a.createElement(k.a,{align:"center"},this.renderButton("Save")))))}}]),n}(h.a),x=n(17),C=n(1582),N=n(1573),Q=n(1581),w=n(53),D=function(e){var t=e.doneAdd,n=e.addQualificationLevelType,m=e.doneEdit,p=e.editQualificationLevelType,v=e.deleteQualificationLevelType,b=e.qualificationLevelTypes,g=Object(r.useReducer)(Q.c,Q.b),h=Object(a.a)(g,2),O=h[0],j=h[1],y=[{path:"name",label:"Name"},{path:"code",label:"Code"},{path:"remarks",label:"Remarks"},{path:"updated_at",label:"Last Modified Date"},{key:"view",content:function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement(o.a,{className:"m-1",size:"sm",outline:!0,color:"info",onClick:function(){Object(Q.a)({type:"VIEW",Component:L,data:e,title:"View Qualification Level Type"},j)}},c.a.createElement(x.M,null)),c.a.createElement(o.a,{className:"m-1",size:"sm",outline:!0,color:"warning",onClick:function(){Object(Q.a)({type:"EDIT",Component:L,submit:p,data:e,title:"Edit Qualification Level Type"},j)}},c.a.createElement(x.s,null)),c.a.createElement(o.a,{className:"m-1",size:"sm",outline:!0,color:"danger",onClick:function(){Object(Q.a)({type:"DELETE",deleteOptions:{okCallback:E,title:"Are you sure?",id:e.id,message:""}},j)}},c.a.createElement(x.p,null)))}}];Object(r.useEffect)(function(){(t||m)&&Object(Q.a)({type:"CLOSE"},j)},[t,m]);var E=function(e){v(e)};return c.a.createElement("div",null,c.a.createElement(u.a,{title:"Qualification Level Type",breadcrumbs:[{name:"Human Resource",active:!0}]},c.a.createElement(d.a,{data:O.data,openModal:O.openModal,component:O.Component,toggle:Q.a,dispatch:j,title:O.title}),c.a.createElement(l.a,{align:"right",className:"mb-1 pl-3 pr-3"},c.a.createElement(o.a,{onClick:function(){return Object(Q.a)({type:"ADD",Component:L,submit:n,title:"New Qualification Level Type"},j)},outline:!0,size:"sm"},"New Qualification Level Type")),c.a.createElement(s.a,{className:"border-0"},c.a.createElement(f.a,null,c.a.createElement(N.a,{title:" Qualification Level Types",columns:y,data:Object(C.a)(b.map(function(e){return Object(i.a)({},e,{updated_at:Object(w.d)(e.updated_at)})}))})))))},R=n(170),_=n(177),A=n(102),M=n(19),P=n(54),I=n(36),q=n(1580),H=n(1557);t.default=Object(_.b)(function(e){return{fetchStatus:Object(R.i)(e),addStatus:Object(R.f)(e),editStatus:Object(R.h)(e),deleteStatus:Object(R.g)(e),qualificationLevelTypes:Object(R.j)(e)}},function(e){return{fetchQualificationLevelTypes:function(){return e(Object(R.c)())},addQualificationLevelType:function(t){return e(Object(R.a)(t))},editQualificationLevelType:function(t){return e(Object(R.b)(t))},deleteQualificationLevelType:function(t){return e(Object(R.d)(t))}}})(function(e){var t=e.fetchStatus,n=e.addStatus,i=e.fetchQualificationLevelTypes,u=e.addQualificationLevelType,o=e.editStatus,l=e.editQualificationLevelType,s=e.deleteStatus,f=e.deleteQualificationLevelType,d=e.qualificationLevelTypes,m=Object(r.useState)([]),p=Object(a.a)(m,2),v=p[0],b=p[1],g=Object(r.useState)(!0),h=Object(a.a)(g,2),O=h[0],j=h[1],y=Object(r.useState)(!0),E=Object(a.a)(y,2),S=E[0],k=E[1],T=Object(r.useState)(!0),L=Object(a.a)(T,2),x=L[0],C=L[1],N=Object(r.useState)(!0),Q=Object(a.a)(N,2),w=Q[0],R=Q[1],_=Object(r.useState)("name"),z=Object(a.a)(_,2),F=z[0],U=z[1];Object(r.useEffect)(function(){b(d)},[d,b]);var V=Object(r.useContext)(P.c).searchValue,B=Object(r.useContext)(P.b).dispatch,J=function(){return c.a.createElement(H.a,{type:"select",onChange:function(e){var t=e.currentTarget.value;return U(t)}},c.a.createElement("option",{value:"name"},"By Name"),c.a.createElement("option",{value:"code"},"By Code"))};Object(r.useEffect)(function(){Object(I.a)({},B,J)},[B]),Object(r.useEffect)(function(){b(Object(q.b)(d,F,V))},[V,b,F]),Object(r.useEffect)(function(){j(!1),i()},[i,j]),Object(r.useEffect)(function(){t.status!==M.e.failure||O||(A.toast.error("Failed fetching Qualification Level Types"),j(!0))},[t,j]),Object(r.useEffect)(function(){var e=n.status,t=n.errors;e!==M.e.failure||S?e!==M.e.success||S||(A.toast.success("Added Qualification Level Type"),k(!0)):(A.toast.error(String(Object.values(t.errors))),k(!0))},[n,k]),Object(r.useEffect)(function(){var e=o.status,t=o.errors;e!==M.e.failure||x?e!==M.e.success||x||(A.toast.success("Edited Qualification Level Type"),C(!0)):(A.toast.error(String(Object.values(t.errors))),A.toast.error("Failed editing Qualification Level Type"),C(!0))},[o,C]),Object(r.useEffect)(function(){var e=s.status;e!==M.e.failure||w?e!==M.e.success||w||(A.toast.success("Deleted Qualification Level Type"),R(!0)):(A.toast.error(s.errors.errors.detail[0]),R(!0))},[s,R]);return c.a.createElement(D,{doneAdd:n.status===M.e.success&&!S,addQualificationLevelType:function(e){k(!1);var t={name:e.name,code:e.code,remarks:e.remarks};u(t)},doneEdit:o.status===M.e.success&&!x,editQualificationLevelType:function(e){C(!1);var t={id:e.id,name:e.name,code:e.code,remarks:e.remarks};l(t)},doneDelete:s.status===M.e.success&&!w,deleteQualificationLevelType:function(e){R(!1),f(e)},qualificationLevelTypes:v})})}}]);
//# sourceMappingURL=73.4fe77b64.chunk.js.map