(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{1573:function(e,t,n){"use strict";var a=n(3),r=n(1),c=n.n(r),i=n(27),o=n(28),u=n(33),s=n(34),l=n(23);function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(l.a)(e);if(t){var r=Object(l.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(s.a)(this,n)}}var d=function(e){Object(u.a)(n,e);var t=f(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return c.a.createElement("thead",null,c.a.createElement("tr",null,this.props.columns.map(function(e){return c.a.createElement("th",{key:e.path||e.key},e.label)})))}}]),n}(r.Component),m=n(1583),p=n.n(m),g=n(53),b=n(43),v=/[0-9\-+#]/,h=/[^\d\-+#]/g;function O(e){return e.search(v)}function j(e,t,n){var a=!1,r={value:e};e<0&&(a=!0,r.value=-r.value),r.sign=a?"-":"",r.value=Number(r.value).toFixed(t.fraction&&t.fraction.length),r.value=Number(r.value).toString();var c=t.fraction&&t.fraction.lastIndexOf("0"),i=r.value.split("."),o=Object(b.a)(i,2),u=o[0],s=void 0===u?"0":u,l=o[1],f=void 0===l?"":l;return(!f||f&&f.length<=c)&&(f=c<0?"":Number("0."+f).toFixed(c+1).replace("0.","")),r.integer=s,r.fraction=f,function(e,t){e.result="";var n=t.integer.split(t.separator),a=n.join(""),r=a&&a.indexOf("0");if(r>-1)for(;e.integer.length<a.length-r;)e.integer="0"+e.integer;else 0===Number(e.integer)&&(e.integer="");var c=n[1]&&n[n.length-1].length;if(c)for(var i=e.integer.length,o=i%c,u=0;u<i;u++)e.result+=e.integer.charAt(u),!((u-o+1)%c)&&u<i-c&&(e.result+=t.separator);else e.result=e.integer;e.result+=t.fraction&&e.fraction?t.decimal+e.fraction:""}(r,t),"0"!==r.result&&""!==r.result||(a=!1,r.sign=""),!a&&t.maskHasPositiveSign?r.sign="+":a&&t.maskHasPositiveSign?r.sign="-":a&&(r.sign=n&&n.enforceMaskSign&&!t.maskHasNegativeSign?"":"-"),r}var y=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e||isNaN(Number(t)))return t;var a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#.##",t={},n=e.length,a=O(e);t.prefix=a>0?e.substring(0,a):"";var r=O(e.split("").reverse().join("")),c=n-r,i=e.substring(c,c+1),o=c+("."===i||","===i?1:0);t.suffix=r>0?e.substring(o,n):"",t.mask=e.substring(a,o),t.maskHasNegativeSign="-"===t.mask.charAt(0),t.maskHasPositiveSign="+"===t.mask.charAt(0);var u=t.mask.match(h);return t.decimal=u&&u[u.length-1]||".",t.separator=u&&u[1]&&u[0]||",",u=t.mask.split(t.decimal),t.integer=u[0],t.fraction=u[1],t}(e),r=j(t,a,n);return a.prefix+r.sign+r.result+a.suffix},E=n(1578),S=n(1584);function k(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(l.a)(e);if(t){var r=Object(l.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(s.a)(this,n)}}var C=function(e){Object(u.a)(n,e);var t=k(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).renderCell=function(e,t,n){if(console.log("loaded",n),t.content)return t.content(e,n);var a=p.a.get(e,t.path),r=E.findIndex(function(e){return e===String(t.path)});return S.findIndex(function(e){return e===String(t.path)})>=0?Object(g.e)(a):r>=0?y("#,###.00",a,{enforceMaskSign:!0}):a?String(a):""},e.createKey=function(e,t){return e._id+(t.path||t.key)},e}return Object(o.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.data,a=t.columns;return c.a.createElement("tbody",null,n.map(function(t){return c.a.createElement("tr",{key:t.id},a.map(function(n){return c.a.createElement("td",{key:e.createKey(t,n)},e.renderCell(t,n,e.props.loading))}))}))}}]),n}(r.Component),T=n(1643),x=n(1644),N=n(1645),w=n(109),D=n(1575),R=function(){var e=Object(r.useContext)(w.a),t=e.rootState,n=e.dispatch,a=Object(r.useState)(0),i=Object(b.a)(a,2),o=i[0],u=i[1],s=Object(r.useState)(0),l=Object(b.a)(s,2),f=l[0],d=l[1],m=Object(r.useState)(0),p=Object(b.a)(m,2),g=p[0],v=p[1],h=Object(r.useState)(0),O=Object(b.a)(h,2),j=O[0],y=O[1],E=Object(r.useState)(!1),S=Object(b.a)(E,2),k=S[0],C=S[1],R=Object(r.useState)(!1),_=Object(b.a)(R,2),A=_[0],M=_[1],P=Object(r.useState)({count:0,results:[]}),I=Object(b.a)(P,2),L=I[0],H=I[1],z=Object(r.useState)(0),F=Object(b.a)(z,2),U=F[0],q=F[1],V=Object(r.useState)(""),B=Object(b.a)(V,2),J=B[0],K=B[1];Object(r.useEffect)(function(){Object(D.a)(t)},[t]),Object(r.useEffect)(function(){var e=L.count,t=L.results;0===t.length&&0===e||(y(Math.ceil(e/t.length)),d(t.length),v(e),C(!0))},[J,y,d,v,C]),Object(r.useEffect)(function(){if(U){var e=L.count,t=L.results;f<=t.length&&(y(Math.ceil(e/t.length)),d(t.length),v(e),C(!0))}},[U,L]),Object(r.useEffect)(function(){try{var e=Object(D.b)(t),n=e.results,a=e.amount,r=e.activeTab;if(""!==r?K(r):console.warn("Pass active tab for paginations"),a!==U&&"undefined"!==typeof a&&(q(a),H(n)),"undefined"!==String(n)&&!k){var c=n.count,i=n.results;y(Math.ceil(c/i.length)),d(i.length),v(c),C(!0)}}catch(o){}},[t,q,H]);var W=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;A||M(!0),u(e),t&&d(t)};return Object(r.useEffect)(function(){o<g&&A&&Object(D.c)({},n,{offset:o,limit:f,onClick:A})},[o,f]),c.a.createElement("div",null,c.a.createElement(T.a,{className:"pagination left",size:"md",color:"primary"},c.a.createElement(x.a,{disabled:0===o},c.a.createElement(N.a,{first:!0,href:"#",onClick:function(){return W(0)}},"First")),c.a.createElement(x.a,null,c.a.createElement(N.a,{previous:!0,disabled:0===o,onClick:function(){return W(o-f)}})),Array(j).fill("").map(function(e,t){return c.a.createElement(x.a,{active:t===Math.floor(o/f)},c.a.createElement(N.a,{onClick:function(){return W(t*f)}},t+1))}),c.a.createElement(x.a,null,c.a.createElement(N.a,{next:!0,onClick:function(){return W(o+f)},disabled:o+f>=g})),c.a.createElement(x.a,{disabled:o+f>=g},c.a.createElement(N.a,{last:!0,onClick:function(){return W((j-1)*f)}},"Last"))))},_=n(1549),A=n(1554),M=n(1619),P=n(177);t.a=Object(P.b)(function(e,t){return Object(a.a)({state:e},t)})(function(e){var t=e.columns,n=e.data,a=e.title,i=e.state,o=e.getLoading;Object(r.useEffect)(function(){"function"===typeof o&&console.log("result",o(i,{isPatch:!0}))},[i,o]);var u=Object(r.useContext)(w.a).rootState;return Object(r.useEffect)(function(){},[u]),console.log(o(i,{isPatch:!0})),c.a.createElement(_.a,{className:"p-2"},c.a.createElement(A.a,{className:"tableHeaders border-0"},c.a.createElement("div",null,""+a?a:"")),c.a.createElement(M.a,{size:"md",responsive:!0,striped:!0},c.a.createElement(d,{columns:t}),c.a.createElement(C,{data:n,columns:t,loading:"fucntion"===typeof o?o(i,{isPatch:!0}):{}}),c.a.createElement(R,null)))})},1575:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"d",function(){return c}),n.d(t,"a",function(){return i}),n.d(t,"c",function(){return o});var a=n(38),r=function(e){return e.page_values?e.page_values:null},c=function(e,t,n){var c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";if("undefined"!==typeof n){if(0===n.count)return null;t({type:a.a.UPDATE,stateName:"page_values",payload:{results:n,options:c,pageLimit:n.length?5*Math.ceil(n.length/5):5,amount:r(e)?r(e).amount+1:0,activeTab:i}})}},i=function(e){var t=e.page_values;try{var n=t.pageLimit?t.pageLimit:0;return n||0}catch(a){}},o=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{offset:0,limit:0};t({type:a.a.UPDATE,stateName:"page_values",payload:{options:n}})}},1578:function(e){e.exports=["credit","debit","total","total_amount","paid_amount","account_balance","balance","price","unit_price","tax","unit_cost","tax_amount","amount_excl_vat","quantity","inventory_quantity","account.balance"]},1580:function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"a",function(){return r}),n.d(t,"c",function(){return c});var a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"name",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=void 0;return n.length>0&&(r=e.filter(function(e){var r=a?"":"^";try{return n&&String(e[t]).match(new RegExp(r+n,"gi"))}catch(c){console.error("Tag does not exist: ".concat(String(c)))}return null})),"undefined"===typeof r?e:r},r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"posting_date",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",r=void 0;return n.length>0&&a.length>0&&(r=e.filter(function(e){try{var r=new Date(e[t]).getTime(),c=new Date(n).getTime(),i=new Date(a).getTime();return n&&a&&r<=i&&r>=c}catch(o){console.error("Tag does not exist: ".concat(String(o)))}return null})),"undefined"===typeof r?e:r},c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"country",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"addresses",r=arguments.length>4&&void 0!==arguments[4]&&arguments[4],c=void 0;return n.length>0&&(c=e.filter(function(e){var c=r?"":"^";try{var i=e[a].findIndex(function(e){return e[t].match(new RegExp(c+n,"gi"))});return n&&i>=0}catch(o){console.error("Tag does not exist: ".concat(String(o)))}return null})),"undefined"===typeof c?e:c}},1582:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a=function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]}},2431:function(e,t,n){"use strict";n.r(t);var a=n(43),r=n(1),c=n.n(r),i=n(3),o=n(1574),u=n(1555),s=n(1788),l=n(1549),f=n(1550),d=n(1579),m=n(27),p=n(28),g=n(33),b=n(34),v=n(23),h=n(1577),O=n(1576),j=n.n(O),y=n(1554),E=n(1556),S=n(1787),k=n(1622);function C(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(v.a)(e);if(t){var r=Object(v.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(b.a)(this,n)}}var T=function(e){Object(g.a)(n,e);var t=C(n);function n(e){var a;return Object(m.a)(this,n),(a=t.call(this,e)).initialState={data:{id:"",name:"",code:"",remarks:""},errors:{}},a.state=a.initialState,a.schema={id:j.a.string().allow("").optional(),name:j.a.string().required().label("Name"),code:j.a.string().required().label("Code"),remarks:j.a.string().allow("").optional()},a}return Object(p.a)(n,[{key:"populateState",value:function(e){var t=Object(i.a)({},this.state,{data:{id:e.id?e.id:"",name:e.name?e.name:"",code:e.code?e.code:"",remarks:e.remarks?e.remarks:""},lockUpdate:!0});this.setState(t)}},{key:"componentDidUpdate",value:function(){!this.props.isEdit&&!this.props.isView||this.state.lockUpdate||this.populateState(this.props.data)}},{key:"componentDidMount",value:function(){this.componentDidUpdate()}},{key:"doSubmit",value:function(){this.props.submit(this.state.data)}},{key:"render",value:function(){return c.a.createElement(l.a,{className:"border-0"},c.a.createElement(y.a,{className:"border-0"},this.props.title),c.a.createElement(f.a,null,c.a.createElement(E.a,{onSubmit:this.handleSubmit},c.a.createElement(S.a,null,c.a.createElement(s.a,{md:6,sm:12,xs:12},this.renderInput({name:"name",label:"Name"})),c.a.createElement(s.a,{md:6,sm:12,xs:12},this.renderInput({name:"code",label:"Code"})),c.a.createElement(s.a,{md:12,sm:12,xs:12},this.renderInput({name:"remarks",label:"Remarks",type:"textarea"}))),c.a.createElement(k.a,{align:"center"},this.renderButton("Save")))))}}]),n}(h.a),x=n(17),N=n(1582),w=n(1573),D=n(1581),R=n(53),_=function(e){var t=e.doneAdd,n=e.addConsignmentType,m=e.doneEdit,p=e.editConsignmentType,g=e.deleteConsignmentType,b=e.consignmentTypes,v=Object(r.useReducer)(D.c,D.b),h=Object(a.a)(v,2),O=h[0],j=h[1],y=[{path:"name",label:"Name"},{path:"code",label:"Code"},{path:"remarks",label:"Remarks"},{path:"updated_at",label:"Last Modified Date"},{key:"view",content:function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement(u.a,{className:"m-1",size:"sm",outline:!0,color:"info",onClick:function(){Object(D.a)({type:"VIEW",Component:T,data:e,title:"View Consignment Type"},j)}},c.a.createElement(x.M,null)),c.a.createElement(u.a,{className:"m-1",size:"sm",outline:!0,color:"warning",onClick:function(){Object(D.a)({type:"EDIT",Component:T,submit:p,data:e,title:"Edit Consignment Type"},j)}},c.a.createElement(x.s,null)),c.a.createElement(u.a,{className:"m-1",size:"sm",outline:!0,color:"danger",onClick:function(){Object(D.a)({type:"DELETE",deleteOptions:{okCallback:E,title:"Are you sure?",id:e.id,message:""}},j)}},c.a.createElement(x.p,null)))}}];Object(r.useEffect)(function(){(t||m)&&Object(D.a)({type:"CLOSE"},j)},[t,m]);var E=function(e){g(e)};return c.a.createElement("div",null,c.a.createElement(o.a,{title:"Consignment Type",breadcrumbs:[{name:"Human Resource",active:!0}]},c.a.createElement(d.a,{data:O.data,openModal:O.openModal,component:O.Component,toggle:D.a,dispatch:j,title:O.title}),c.a.createElement(s.a,{align:"right",className:"mb-1 pl-3 pr-3"},c.a.createElement(u.a,{onClick:function(){return Object(D.a)({type:"ADD",Component:T,submit:n,title:"New Consignment Type"},j)},outline:!0,size:"sm"},"New Consignment Type")),c.a.createElement(l.a,{className:"border-0"},c.a.createElement(f.a,null,c.a.createElement(w.a,{title:"Consignment Types",columns:y,data:Object(N.a)(b.map(function(e){return Object(i.a)({},e,{updated_at:Object(R.d)(e.updated_at)})}))})))))},A=n(165),M=n(177),P=n(102),I=n(19),L=n(54),H=n(36),z=n(1580),F=n(1557);t.default=Object(M.b)(function(e){return{fetchStatus:Object(A.j)(e),addStatus:Object(A.f)(e),editStatus:Object(A.i)(e),deleteStatus:Object(A.h)(e),consignmentTypes:Object(A.g)(e)}},function(e){return{fetchConsignmentTypes:function(){return e(Object(A.c)())},addConsignmentType:function(t){return e(Object(A.a)(t))},editConsignmentType:function(t){return e(Object(A.b)(t))},deleteConsignmentType:function(t){return e(Object(A.d)(t))}}})(function(e){var t=e.fetchStatus,n=e.addStatus,i=e.fetchConsignmentTypes,o=e.addConsignmentType,u=e.editStatus,s=e.editConsignmentType,l=e.deleteStatus,f=e.deleteConsignmentType,d=e.consignmentTypes,m=Object(r.useState)([]),p=Object(a.a)(m,2),g=p[0],b=p[1],v=Object(r.useState)(!0),h=Object(a.a)(v,2),O=h[0],j=h[1],y=Object(r.useState)(!0),E=Object(a.a)(y,2),S=E[0],k=E[1],C=Object(r.useState)(!0),T=Object(a.a)(C,2),x=T[0],N=T[1],w=Object(r.useState)(!0),D=Object(a.a)(w,2),R=D[0],A=D[1],M=Object(r.useState)("name"),U=Object(a.a)(M,2),q=U[0],V=U[1];Object(r.useEffect)(function(){b(d)},[d,b]);var B=Object(r.useContext)(L.c).searchValue,J=Object(r.useContext)(L.b).dispatch,K=function(){return c.a.createElement(F.a,{type:"select",onChange:function(e){var t=e.currentTarget.value;return V(t)}},c.a.createElement("option",{value:"name"},"By Name"),c.a.createElement("option",{value:"code"},"By Code"))};Object(r.useEffect)(function(){Object(H.a)({},J,K)},[J]),Object(r.useEffect)(function(){b(Object(z.b)(d,q,B))},[B,b,q]),Object(r.useEffect)(function(){j(!1),i()},[i,j]),Object(r.useEffect)(function(){t.status!==I.e.failure||O||(P.toast.error("Failed fetching Consignment Types"),j(!0))},[t,j]),Object(r.useEffect)(function(){var e=n.status,t=n.errors;e!==I.e.failure||S?e!==I.e.success||S||(P.toast.success("Added Consignment Type"),k(!0)):(P.toast.error(String(Object.values(t.errors))),k(!0))},[n,k]),Object(r.useEffect)(function(){var e=u.status,t=u.errors;e!==I.e.failure||x?e!==I.e.success||x||(P.toast.success("Edited Consignment Type"),N(!0)):(P.toast.error(String(Object.values(t.errors))),P.toast.error("Failed editing Consignment Type"),N(!0))},[u,N]),Object(r.useEffect)(function(){var e=l.status;e!==I.e.failure||R?e!==I.e.success||R||(P.toast.success("Deleted Consignment Type"),A(!0)):(P.toast.error(l.errors.errors.detail[0]),A(!0))},[l,A]);return c.a.createElement(_,{doneAdd:n.status===I.e.success&&!S,addConsignmentType:function(e){k(!1);var t={name:e.name,code:e.code,remarks:e.remarks};o(t)},doneEdit:u.status===I.e.success&&!x,editConsignmentType:function(e){N(!1);var t={id:e.id,name:e.name,code:e.code,remarks:e.remarks};s(t)},doneDelete:l.status===I.e.success&&!R,deleteConsignmentType:function(e){A(!1),f(e)},consignmentTypes:g})})}}]);
//# sourceMappingURL=64.ddd183b7.chunk.js.map