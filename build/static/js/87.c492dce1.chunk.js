(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{1573:function(e,t,n){"use strict";var a=n(3),r=n(1),i=n.n(r),u=n(27),c=n(28),s=n(33),l=n(34),o=n(23);function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(o.a)(e);if(t){var r=Object(o.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(l.a)(this,n)}}var m=function(e){Object(s.a)(n,e);var t=f(n);function n(){return Object(u.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){return i.a.createElement("thead",null,i.a.createElement("tr",null,this.props.columns.map(function(e){return i.a.createElement("th",{key:e.path||e.key},e.label)})))}}]),n}(r.Component),b=n(1583),d=n.n(b),p=n(53),g=n(43),h=/[0-9\-+#]/,v=/[^\d\-+#]/g;function O(e){return e.search(h)}function S(e,t,n){var a=!1,r={value:e};e<0&&(a=!0,r.value=-r.value),r.sign=a?"-":"",r.value=Number(r.value).toFixed(t.fraction&&t.fraction.length),r.value=Number(r.value).toString();var i=t.fraction&&t.fraction.lastIndexOf("0"),u=r.value.split("."),c=Object(g.a)(u,2),s=c[0],l=void 0===s?"0":s,o=c[1],f=void 0===o?"":o;return(!f||f&&f.length<=i)&&(f=i<0?"":Number("0."+f).toFixed(i+1).replace("0.","")),r.integer=l,r.fraction=f,function(e,t){e.result="";var n=t.integer.split(t.separator),a=n.join(""),r=a&&a.indexOf("0");if(r>-1)for(;e.integer.length<a.length-r;)e.integer="0"+e.integer;else 0===Number(e.integer)&&(e.integer="");var i=n[1]&&n[n.length-1].length;if(i)for(var u=e.integer.length,c=u%i,s=0;s<u;s++)e.result+=e.integer.charAt(s),!((s-c+1)%i)&&s<u-i&&(e.result+=t.separator);else e.result=e.integer;e.result+=t.fraction&&e.fraction?t.decimal+e.fraction:""}(r,t),"0"!==r.result&&""!==r.result||(a=!1,r.sign=""),!a&&t.maskHasPositiveSign?r.sign="+":a&&t.maskHasPositiveSign?r.sign="-":a&&(r.sign=n&&n.enforceMaskSign&&!t.maskHasNegativeSign?"":"-"),r}var j=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e||isNaN(Number(t)))return t;var a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#.##",t={},n=e.length,a=O(e);t.prefix=a>0?e.substring(0,a):"";var r=O(e.split("").reverse().join("")),i=n-r,u=e.substring(i,i+1),c=i+("."===u||","===u?1:0);t.suffix=r>0?e.substring(c,n):"",t.mask=e.substring(a,c),t.maskHasNegativeSign="-"===t.mask.charAt(0),t.maskHasPositiveSign="+"===t.mask.charAt(0);var s=t.mask.match(v);return t.decimal=s&&s[s.length-1]||".",t.separator=s&&s[1]&&s[0]||",",s=t.mask.split(t.decimal),t.integer=s[0],t.fraction=s[1],t}(e),r=S(t,a,n);return a.prefix+r.sign+r.result+a.suffix},E=n(1578),N=n(1584);function y(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(o.a)(e);if(t){var r=Object(o.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(l.a)(this,n)}}var x=function(e){Object(s.a)(n,e);var t=y(n);function n(){var e;Object(u.a)(this,n);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).renderCell=function(e,t,n){if(console.log("loaded",n),t.content)return t.content(e,n);var a=d.a.get(e,t.path),r=E.findIndex(function(e){return e===String(t.path)});return N.findIndex(function(e){return e===String(t.path)})>=0?Object(p.e)(a):r>=0?j("#,###.00",a,{enforceMaskSign:!0}):a?String(a):""},e.createKey=function(e,t){return e._id+(t.path||t.key)},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this,t=this.props,n=t.data,a=t.columns;return i.a.createElement("tbody",null,n.map(function(t){return i.a.createElement("tr",{key:t.id},a.map(function(n){return i.a.createElement("td",{key:e.createKey(t,n)},e.renderCell(t,n,e.props.loading))}))}))}}]),n}(r.Component),k=n(1643),_=n(1644),C=n(1645),D=n(109),R=n(1575),P=function(){var e=Object(r.useContext)(D.a),t=e.rootState,n=e.dispatch,a=Object(r.useState)(0),u=Object(g.a)(a,2),c=u[0],s=u[1],l=Object(r.useState)(0),o=Object(g.a)(l,2),f=o[0],m=o[1],b=Object(r.useState)(0),d=Object(g.a)(b,2),p=d[0],h=d[1],v=Object(r.useState)(0),O=Object(g.a)(v,2),S=O[0],j=O[1],E=Object(r.useState)(!1),N=Object(g.a)(E,2),y=N[0],x=N[1],P=Object(r.useState)(!1),I=Object(g.a)(P,2),w=I[0],A=I[1],q=Object(r.useState)({count:0,results:[]}),M=Object(g.a)(q,2),T=M[0],J=M[1],F=Object(r.useState)(0),L=Object(g.a)(F,2),z=L[0],H=L[1],U=Object(r.useState)(""),V=Object(g.a)(U,2),B=V[0],G=V[1];Object(r.useEffect)(function(){Object(R.a)(t)},[t]),Object(r.useEffect)(function(){var e=T.count,t=T.results;0===t.length&&0===e||(j(Math.ceil(e/t.length)),m(t.length),h(e),x(!0))},[B,j,m,h,x]),Object(r.useEffect)(function(){if(z){var e=T.count,t=T.results;f<=t.length&&(j(Math.ceil(e/t.length)),m(t.length),h(e),x(!0))}},[z,T]),Object(r.useEffect)(function(){try{var e=Object(R.b)(t),n=e.results,a=e.amount,r=e.activeTab;if(""!==r?G(r):console.warn("Pass active tab for paginations"),a!==z&&"undefined"!==typeof a&&(H(a),J(n)),"undefined"!==String(n)&&!y){var i=n.count,u=n.results;j(Math.ceil(i/u.length)),m(u.length),h(i),x(!0)}}catch(c){}},[t,H,J]);var K=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;w||A(!0),s(e),t&&m(t)};return Object(r.useEffect)(function(){c<p&&w&&Object(R.c)({},n,{offset:c,limit:f,onClick:w})},[c,f]),i.a.createElement("div",null,i.a.createElement(k.a,{className:"pagination left",size:"md",color:"primary"},i.a.createElement(_.a,{disabled:0===c},i.a.createElement(C.a,{first:!0,href:"#",onClick:function(){return K(0)}},"First")),i.a.createElement(_.a,null,i.a.createElement(C.a,{previous:!0,disabled:0===c,onClick:function(){return K(c-f)}})),Array(S).fill("").map(function(e,t){return i.a.createElement(_.a,{active:t===Math.floor(c/f)},i.a.createElement(C.a,{onClick:function(){return K(t*f)}},t+1))}),i.a.createElement(_.a,null,i.a.createElement(C.a,{next:!0,onClick:function(){return K(c+f)},disabled:c+f>=p})),i.a.createElement(_.a,{disabled:c+f>=p},i.a.createElement(C.a,{last:!0,onClick:function(){return K((S-1)*f)}},"Last"))))},I=n(1549),w=n(1554),A=n(1619),q=n(177);t.a=Object(q.b)(function(e,t){return Object(a.a)({state:e},t)})(function(e){var t=e.columns,n=e.data,a=e.title,u=e.state,c=e.getLoading;Object(r.useEffect)(function(){"function"===typeof c&&console.log("result",c(u,{isPatch:!0}))},[u,c]);var s=Object(r.useContext)(D.a).rootState;return Object(r.useEffect)(function(){},[s]),console.log(c(u,{isPatch:!0})),i.a.createElement(I.a,{className:"p-2"},i.a.createElement(w.a,{className:"tableHeaders border-0"},i.a.createElement("div",null,""+a?a:"")),i.a.createElement(A.a,{size:"md",responsive:!0,striped:!0},i.a.createElement(m,{columns:t}),i.a.createElement(x,{data:n,columns:t,loading:"fucntion"===typeof c?c(u,{isPatch:!0}):{}}),i.a.createElement(P,null)))})},1575:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"d",function(){return i}),n.d(t,"a",function(){return u}),n.d(t,"c",function(){return c});var a=n(38),r=function(e){return e.page_values?e.page_values:null},i=function(e,t,n){var i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";if("undefined"!==typeof n){if(0===n.count)return null;t({type:a.a.UPDATE,stateName:"page_values",payload:{results:n,options:i,pageLimit:n.length?5*Math.ceil(n.length/5):5,amount:r(e)?r(e).amount+1:0,activeTab:u}})}},u=function(e){var t=e.page_values;try{var n=t.pageLimit?t.pageLimit:0;return n||0}catch(a){}},c=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{offset:0,limit:0};t({type:a.a.UPDATE,stateName:"page_values",payload:{options:n}})}},1578:function(e){e.exports=["credit","debit","total","total_amount","paid_amount","account_balance","balance","price","unit_price","tax","unit_cost","tax_amount","amount_excl_vat","quantity","inventory_quantity","account.balance"]},1582:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a=function(){return arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]}},2357:function(e){e.exports=["Purchase Order","General Journal","Vendor","Sales Journal","Purchase Requisition","Sales Order","Transfer Order Issue","Transfer Order Receive","Sales Return","Store Requisition","Purchase Return","Bank","Purchase Journal","Cash Payment Journal","Cash Receipt Journal","Sales Invoice","Purchase Invoice","Item","Goods Receiving Note","Inventory Journal","Customer","Disposal","Store Issue Voucher"]},2410:function(e,t,n){"use strict";n.r(t);var a=n(43),r=n(1),i=n.n(r),u=n(1574),c=n(1555),s=n(1788),l=n(1549),o=n(1554),f=n(1550),m=n(1579),b=n(3),d=n(27),p=n(28),g=n(33),h=n(34),v=n(23),O=n(1577),S=n(1576),j=n.n(S),E=n(1556),N=n(1787),y=n(1622),x=n(2357);function k(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(v.a)(e);if(t){var r=Object(v.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(h.a)(this,n)}}var _=function(e){Object(g.a)(n,e);var t=k(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).initialState={data:{id:"",featureName:"",prefix:"",suffix:"",numberOfDigits:"",startingNumber:"",endingNumber:"",remarks:""},errors:{}},a.state=a.initialState,a.schema={id:j.a.string().allow("").optional(),featureName:j.a.string().required().label("featureName"),prefix:j.a.string().required().label("prefix"),suffix:j.a.string().required().label("suffix"),numberOfDigits:j.a.number().required().label("numberOfDigits"),startingNumber:j.a.number().required().label("startingNumber"),endingNumber:j.a.number().required().label("endingNumber"),remarks:j.a.string().allow("").optional()},a}return Object(p.a)(n,[{key:"populateState",value:function(e){var t=Object(b.a)({},this.state,{data:{id:e.id?e.id:"",featureName:e.feature_name?e.feature_name:"",prefix:e.prefix?e.prefix:"",suffix:e.sufix?e.sufix:"",startingNumber:e.starting_number?e.starting_number:"",numberOfDigits:e.number_of_digits?e.number_of_digits:"",endingNumber:e.last_doc_number?Number(e.last_doc_number):"",remarks:e.remark?e.remark:""},lockUpdate:!0});this.setState(t)}},{key:"componentDidUpdate",value:function(){!this.props.isEdit&&!this.props.isView||this.state.lockUpdate||this.populateState(this.props.data)}},{key:"doSubmit",value:function(){this.props.submit(this.state.data)}},{key:"render",value:function(){return i.a.createElement(l.a,{className:"border-0"},i.a.createElement(o.a,{className:"border-0"},"No. Series"),i.a.createElement(f.a,null,i.a.createElement(E.a,{onSubmit:this.handleSubmit},i.a.createElement(N.a,null,i.a.createElement(s.a,{md:4,sm:12,xs:12},this.renderSelect({name:"featureName",label:"Feature Name",options:x})),i.a.createElement(s.a,{md:4,sm:12,xs:12},this.renderInput({name:"prefix",label:"Prefix"})),i.a.createElement(s.a,{md:4,sm:12,xs:12},this.renderInput({name:"suffix",label:"Suffix"})),i.a.createElement(s.a,{md:4,sm:12,xs:12},this.renderInput({name:"numberOfDigits",label:"Number Of Digits",type:"number"})),i.a.createElement(s.a,{md:4,sm:12,xs:12},this.renderInput({name:"startingNumber",label:"Starting Number",type:"number"})),i.a.createElement(s.a,{md:4,sm:12,xs:12},this.renderInput({name:"endingNumber",label:"Ending Number",type:"number"})),i.a.createElement(s.a,{md:12,sm:12,xs:12},this.renderInput({name:"remarks",label:"Remarks",type:"textarea"}))),i.a.createElement(y.a,{align:"center"},this.renderButton("Save")))))}}]),n}(O.a),C=n(17),D=n(1582),R=n(1573),P=n(1581),I=function(e){var t=e.doneAdd,n=e.addNumberSeries,b=e.doneEdit,d=e.editNumberSeries,p=e.deleteNumberSeries,g=e.numberSeries,h=Object(r.useReducer)(P.c,P.b),v=Object(a.a)(h,2),O=v[0],S=v[1],j=[{path:"feature_name",label:"Feature Name"},{path:"prefix",label:"Prefix"},{path:"sufix",label:"Suffix"},{path:"number_of_digits",label:"No of Digits"},{path:"starting_number",label:"Starting Number"},{path:"last_doc_number",label:"Ending Number"},{key:"view",content:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(c.a,{className:"m-1",size:"sm",outline:!0,color:"info",onClick:function(){Object(P.a)({type:"VIEW",Component:_,data:e,title:"View Number Series"},S)}},i.a.createElement(C.M,null)),i.a.createElement(c.a,{className:"m-1",size:"sm",outline:!0,color:"warning",onClick:function(){Object(P.a)({type:"EDIT",Component:_,submit:d,data:e,title:"Edit Number Series"},S)}},i.a.createElement(C.s,null)),i.a.createElement(c.a,{className:"m-1",size:"sm",outline:!0,color:"danger",onClick:function(){Object(P.a)({type:"DELETE",deleteOptions:{okCallback:E,title:"Are you sure?",id:e.id,message:""}},S)}},i.a.createElement(C.p,null)))}}];Object(r.useEffect)(function(){(t||b)&&Object(P.a)({type:"CLOSE"},S)},[t,b]);var E=function(e){p(e)};return i.a.createElement("div",null,i.a.createElement(u.a,null,i.a.createElement(m.a,{data:O.data,openModal:O.openModal,component:O.Component,toggle:P.a,dispatch:S,title:O.title}),i.a.createElement(s.a,{align:"right",className:"mb-1 pl-3 pr-3"},i.a.createElement(c.a,{onClick:function(){return Object(P.a)({type:"ADD",Component:_,submit:n,title:"New Account Type"},S)},outline:!0,size:"sm"},"New Number Series")),i.a.createElement(l.a,{className:"border-0"},i.a.createElement(s.a,{md:12,sm:12,xs:12},i.a.createElement(o.a,{className:"border-0"},"No. Series ")),i.a.createElement(f.a,null,i.a.createElement(R.a,{columns:j,data:Object(D.a)(g)})))))},w=n(92),A=n(177),q=n(102),M=n(19);t.default=Object(A.b)(function(e){return{fetchStatus:Object(w.i)(e),addStatus:Object(w.f)(e),editStatus:Object(w.h)(e),deleteStatus:Object(w.g)(e),numberSeries:Object(w.j)(e)}},function(e){return{fetchNumberSeries:function(){return e(Object(w.c)())},addNumberSeries:function(t){return e(Object(w.a)(t))},editNumberSeries:function(t){return e(Object(w.b)(t))},deleteNumberSeries:function(t){return e(Object(w.d)(t))}}})(function(e){var t=e.fetchStatus,n=e.addStatus,u=e.fetchNumberSeries,c=e.addNumberSeries,s=e.editStatus,l=e.editNumberSeries,o=e.deleteStatus,f=e.deleteNumberSeries,m=e.numberSeries,b=Object(r.useState)(!0),d=Object(a.a)(b,2),p=d[0],g=d[1],h=Object(r.useState)(!0),v=Object(a.a)(h,2),O=v[0],S=v[1],j=Object(r.useState)(!0),E=Object(a.a)(j,2),N=E[0],y=E[1],x=Object(r.useState)(!0),k=Object(a.a)(x,2),_=k[0],C=k[1];Object(r.useEffect)(function(){g(!1),u()},[u,g]),Object(r.useEffect)(function(){t.status!==M.e.failure||p||(q.toast.error("Failed fetching Number Series"),g(!0))},[t,g]),Object(r.useEffect)(function(){var e=n.status;e!==M.e.failure||O?e!==M.e.success||O||(q.toast.success("Added Number Series"),S(!0)):S(!0)},[n,S]),Object(r.useEffect)(function(){var e=s.status;e!==M.e.failure||N?e!==M.e.success||N||(q.toast.success("Edited Number Series"),y(!0)):y(!0)},[s,y]),Object(r.useEffect)(function(){var e=o.status;e!==M.e.failure||_?e!==M.e.success||_||(q.toast.success("Deleted Number Series"),C(!0)):C(!0)},[o,C]);return i.a.createElement(I,{doneAdd:n.status===M.e.success&&!O,addNumberSeries:function(e){S(!1);var t={feature_name:String(e.featureName),number_of_digits:Number(e.numberOfDigits),prefix:String(e.prefix),sufix:String(e.suffix),starting_number:Number(e.startingNumber),last_doc_number:String(e.endingNumber),remarks:String(e.remarks)};c(t)},doneEdit:s.status===M.e.success&&!N,editNumberSeries:function(e){y(!1);var t={id:e.id,feature_name:String(e.featureName),number_of_digits:Number(e.numberOfDigits),prefix:String(e.prefix),sufix:String(e.suffix),starting_number:Number(e.startingNumber),last_doc_number:String(e.endingNumber),remarks:String(e.remarks)};l(t)},doneDelete:o.status===M.e.success&&!_,deleteNumberSeries:function(e){C(!1),f(e)},numberSeries:m})})}}]);
//# sourceMappingURL=87.c492dce1.chunk.js.map