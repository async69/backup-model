(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{1574:function(e,a,t){"use strict";var r=t(32),l=t(1),s=t.n(l),o=(t(110),t(47)),n=t(1787),c=t(1788),i=t(1789),b=t(1790),d=t(1555),u=t(1589),m=t(17),g=o.a.create("page"),p=function(e){var a=e.title,t=e.breadcrumbs,l=e.tag,o=e.className,p=e.children,f=e.editable,y=Object(r.a)(e,["title","breadcrumbs","tag","className","children","editable"]),h=g.b("px-3",o);return s.a.createElement(l,Object.assign({className:h},y),s.a.createElement(n.a,null,s.a.createElement(c.a,{md:9,sm:12,xs:12},s.a.createElement("div",{className:g.e("header")},a&&"string"===typeof a?s.a.createElement(u.a,{type:"h4",className:g.e("title")},s.a.createElement("i",null,a)):a,t&&s.a.createElement(i.a,{size:"lg",className:g.e("breadcrumb")},t.length&&t.map(function(e,a){var t=e.name;e.active;return s.a.createElement(b.a,{key:a},s.a.createElement("small",null,t))}),t.length&&t.map(function(e,a){var t=e.name1,r=e.active;return s.a.createElement(b.a,{key:a,active:r},s.a.createElement("small",null,t))})))),f&&s.a.createElement(c.a,{md:3,sm:12,xs:12,className:"mt-1"},s.a.createElement(d.a,{size:"sm",className:"pr-5 pl-5 m-2",outline:!0},s.a.createElement(m.s,null)),s.a.createElement(d.a,{size:"sm",className:"pr-5 pl-5",outline:!0,color:"danger"},s.a.createElement(m.p,null)))),p)};p.defaultProps={tag:"div",title:""},a.a=p},1589:function(e,a,t){"use strict";var r=t(7),l=t(32),s=t(16),o=t.n(s),n=t(1),c=t.n(n),i=(t(110),{h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6","display-1":"h1","display-2":"h1","display-3":"h1","display-4":"h1",p:"p",lead:"p",blockquote:"blockquote"}),b=function(e){var a,t=e.tag,s=e.className,n=e.type,b=Object(l.a)(e,["tag","className","type"]),d=o()(Object(r.a)({},n,!!n),s);return a=t||(!t&&i[n]?i[n]:"p"),c.a.createElement(a,Object.assign({},b,{className:d}))};b.defaultProps={type:"p"},a.a=b},1640:function(e,a){e.exports=function(e){var a=typeof e;return!!e&&("object"==a||"function"==a)}},1711:function(e,a,t){"use strict";t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p;t.d(a,"b",function(){return r}),t.d(a,"a",function(){return s});var r={backgroundColor:["rgba(255, 99, 132, 0.5)","rgba(54, 162, 235, 0.5)","rgba(255, 206, 86, 0.5)","rgba(75, 192, 192, 0.5)","rgba(153, 102, 255, 0.5)","rgba(255, 159, 64, 0.7)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],allColors:["rgba(255, 99, 132, 0.5)","rgba(54, 162, 235, 0.5)","rgba(255, 206, 86, 0.5)","rgba(75, 192, 192, 0.5)","rgba(153, 102, 255, 0.5)","rgba(255, 159, 64, 0.7)","rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)","#45b649","#15c649","#102d46","#2368a5","#2368a5"]},l=function(){return Math.round(20*Math.random()-10)},s={bar:{data:{labels:["January","February","March","April","May","June","July"],datasets:[{label:"Expense for this year",backgroundColor:"#6a82fb",stack:"Expense",data:[1e4,3e4,5e4,8e4,6e4,2e4,1e4]},{label:"Expense for last year",backgroundColor:"#fc5c7d",stack:"Expense",data:[3e4,8e4,5e4,1e5,6e4,4e4,9e4]}]},options:{title:{display:!1,text:"Chart.js Bar Chart - Stacked"},tooltips:{mode:"index",intersect:!1},responsive:!0,legend:{display:!1},scales:{xAxes:[{stacked:!0,display:!1}],yAxes:[{stacked:!0,display:!1}]}}},accPay_accRec:{data:{labels:["January","February","March","April","May","June","July"],datasets:[{type:"bar",label:"Receivable",backgroundColor:"rgb(75, 192, 192)",borderWidth:2,fill:!1,data:[l(),l(),l(),l(),l(),l()]},{type:"bar",label:"Payable",backgroundColor:"rgb(255, 99, 132)",data:[l(),l(),l(),l(),l(),l(),l()],borderColor:"white",borderWidth:2}]}},operatingCosts:{data:{labels:["1","2","3","4","5","6"],datasets:[{type:"line",label:"Average Cost",borderColor:"#222222",borderWidth:2,fill:!0,data:[10,20,25,20,26,35]},{label:"Sales",data:[12,19,3,5,2,3],backgroundColor:"rgb(255, 99, 132)"},{label:"Marketing",data:[2,3,20,5,1,4],backgroundColor:"rgb(54, 162, 235)"},{label:"Inventory",data:[3,10,13,15,22,30],backgroundColor:"rgb(75, 192, 192)"},{label:"Procurement",data:[3,10,13,15,22,30],backgroundColor:"#6a82fb"}]},options:{scales:{yAxes:[{stacked:!0,ticks:{beginAtZero:!0}}],xAxes:[{stacked:!0}]}}},doughnut:{data:{datasets:[{data:[20,30,40,50,60],backgroundColor:["#6a82fb","#fc5c7d","#45b649","#00c9ff","#ffd700"],label:"Dataset 1"}],labels:["Red","Orange","Yellow","Green","Blue"]},options:{responsive:!0,legend:{display:!1},title:{display:!1,text:"Chart.js Doughnut Chart"},animation:{animateScale:!0,animateRotate:!0}}},topSalesman:{data:{labels:["Employee name1","Employee name2","Employee name3","Employee name4","Employee name5","Employee name6"],datasets:[{label:"# of Votes",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}},supplierDeliveryTime:{data:{labels:["Supplier name1","Supplier name2","Supplier name3","Supplier name4","Supplier name5","Supplier name6"],datasets:[{label:"# of days taken",data:[12,19,3,5,2,3],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}},monthlySalesRev:{data:{labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],datasets:[{label:"# of Votes",data:Array(12).fill(10),backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255, 99, 132, 1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}},salesSycleLength:{data:{labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],datasets:[{label:"# of Defects",data:Array(12).fill(10),fill:!1,backgroundColor:"rgba(153, 102, 255, 1)",borderColor:"rgba(255, 99, 132, 0.2)"}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}},supplierdeffectRate:{data:{labels:["Jan","Feb","Mar","Apr","May"],datasets:[{label:"# of Defects",data:[12,19,3,5,2,3,7,5,9],fill:!1,backgroundColor:"rgb(255, 99, 132)",borderColor:"rgba(255, 99, 132, 0.2)"}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}},supplierAvilability:{data:{labels:["Jan","Feb","Mar","Apr","May"],datasets:[{label:"# of Available suppliers ",data:[12,19,3,5,2,3,7,5,9],fill:!1,backgroundColor:"#ffd700",borderColor:"rgba(255, 99, 132, 0.2)"}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}},leadTime:{data:{labels:["Jan","Feb","Mar","Apr","May"],datasets:[{label:"# of leds",data:[12,19,3,5,2,3,7,5,9],fill:!1,backgroundColor:"#45b649",borderColor:"rgba(255, 99, 132, 0.2)"}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}},shipmentStatus:{data:{datasets:[{data:[60,40],backgroundColor:["#6a82fb","#fc5c7d","#45b649","#00c9ff","#ffd700"],label:"Dataset 1"}],labels:["On time Shipment : 99%","On time Shipment : 40%"]},options:{responsive:!0,legend:{display:!1},title:{display:!1,text:"Chart.js Doughnut Chart"},animation:{animateScale:!0,animateRotate:!0}}},turnOverperItem:{data:{labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],datasets:[{type:"line",label:"Average Turn over Rate",borderColor:"#222222",borderWidth:2,data:[10,20,25,20,26,35]},{label:"Item 1",data:[40,20,45,35,26,35],backgroundColor:"rgb(255, 99, 132)"},{label:"Item 2",data:[2,3,20,5,1,4],backgroundColor:"rgb(54, 162, 235)"},{label:"Item #",data:[3,10,13,15,22,30],backgroundColor:"rgb(75, 192, 192)"},{label:"Item 4",data:[3,10,13,15,22,30],backgroundColor:"#6a82fb"}]},options:{scales:{yAxes:[{stacked:!0,ticks:{beginAtZero:!0}}],xAxes:[{stacked:!0}]}}},rawMaterial:{data:{labels:["Material 1","Material 2","Material 3","Material 4"],datasets:[{data:[40,40,50,70],backgroundColor:r.backgroundColor,borderColor:r.borderColor,borderWidth:2}]}},warehousePieChart:{data:{labels:["Warehouse 1","Warehouse 2","Warehouse 3","Warehouse 4"],datasets:[{data:[30,20,10,40],backgroundColor:r.backgroundColor,borderColor:r.borderColor,borderWidth:2}]}},employeeTurnOverRate:{data:{labels:["Sales","Manufacturing","Inventory","IT","Finance","Marketing"],datasets:[{label:"Voluntary",data:[12,19,3,5,2,3],backgroundColor:"rgb(255, 99, 132)"},{label:"Involuntary",data:[2,3,20,5,1,4],backgroundColor:"rgb(54, 162, 235)"}]},options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]}}},employeesRating:{data:{labels:["Skillset","Delivery","Effectiveness","Communication","Knowledge"],datasets:[{label:"# of Votes",data:[1,9,3,5,2],backgroundColor:r.backgroundColor,borderColor:r.borderColor,borderWidth:2}]},options:{scale:{ticks:{beginAtZero:!0}}}},femaleToMaleRatio:{data:{labels:["Female","Male"],datasets:[{label:"# of Votes",data:[35,65],backgroundColor:r.backgroundColor,borderColor:r.borderColor,borderWidth:2}]}},line:{data:{labels:["January","February","March","April","May","June","July"],datasets:[{label:"Revenue for this year",borderColor:"#6a82fb",backgroundColor:"#6a82fb",data:[0,1300,2200,3400,4600,3500,3e3]},{label:"Revenue for last year",borderColor:"#fc5c7d",backgroundColor:"#fc5c7d",data:[0,1300,2200,3400,4600,3500,3e3]}]},options:{responsive:!0,legend:{display:!1},title:{display:!1,text:"Chart.js Line Chart - Stacked Area"},tooltips:{intersect:!1,mode:"nearest"},hover:{mode:"index"},scales:{xAxes:[{scaleLabel:{display:!1,labelString:"Month"},gridLines:{display:!1}}],yAxes:[{stacked:!0,scaleLabel:{display:!1,labelString:"Value"},gridLines:{display:!1}}]}}}}},1782:function(e,a,t){"use strict";var r=t(32),l=t(1),s=t.n(l),o=(t(110),t(1549)),n=t(1553),c=t(1551),i=t(2358),b=t(1589),d=function(e){var a=e.title,t=e.subtitle,l=e.number,d=e.color,u=e.progress,m=u.value,g=u.label,p=Object(r.a)(e,["title","subtitle","number","color","progress"]);return s.a.createElement(o.a,Object.assign({body:!0},p,{className:"someCard",style:{borderRadius:"15px"}}),s.a.createElement("div",{className:"d-flex justify-content-between  "},s.a.createElement(n.a,{tag:"div"},s.a.createElement(b.a,{className:"mb-0 p-2 "},s.a.createElement("strong",null,a)),s.a.createElement(b.a,{className:"mb-0 text-muted small"},t)),s.a.createElement(c.a,{className:"text-".concat(d," numWidTitle p-2")},l)),s.a.createElement(i.a,{className:"proressBar mb-3",value:m,color:d,style:{height:"8px"}}),s.a.createElement(n.a,{tag:"div",className:"d-flex justify-content-between"},s.a.createElement(b.a,{tag:"span",className:"text-left text-muted small "},g),s.a.createElement(b.a,{tag:"span",className:"text-right text-muted small"},m,"%")))};d.defaultProps={title:"",subtitle:"",number:0,color:"primary",progress:{value:0,label:""}};var u=d,m=t(7),g=t(16),p=t.n(g),f=t(1550),y=t(1552),h=function(e){var a=e.bgColor,t=e.icon,l=e.iconProps,n=e.title,i=e.subtitle,b=e.className,d=Object(r.a)(e,["bgColor","icon","iconProps","title","subtitle","className"]),u=p()("cr-widget br-15 iconWidget",b,Object(m.a)({},"bg-".concat(a),a));return s.a.createElement("div",null,s.a.createElement(o.a,Object.assign({inverse:!0,className:u},d),s.a.createElement(f.a,{className:"cr-widget__icon  neuIcon"},s.a.createElement(t,Object.assign({size:30,color:"primary"},l))),s.a.createElement(f.a,null,s.a.createElement(c.a,{style:{fontSize:"20px"}},n),s.a.createElement(y.a,null,i))))};h.defaultProps={bgColor:"primary",icon:"span",iconProps:{size:50}};var E=h;t.d(a,"b",function(){return u}),t.d(a,"a",function(){return E})},1784:function(e,a){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},1787:function(e,a,t){"use strict";var r=t(15),l=t(20),s=t(1),o=t.n(s),n=t(2),c=t.n(n),i=t(16),b=t.n(i),d=t(13),u={tag:d.p,noGutters:c.a.bool,className:c.a.string,cssModule:c.a.object,form:c.a.bool},m=function(e){var a=e.className,t=e.cssModule,s=e.noGutters,n=e.tag,c=e.form,i=Object(l.a)(e,["className","cssModule","noGutters","tag","form"]),u=Object(d.l)(b()(a,s?"no-gutters":null,c?"form-row":"row"),t);return o.a.createElement(n,Object(r.a)({},i,{className:u}))};m.propTypes=u,m.defaultProps={tag:"div"},a.a=m},1788:function(e,a,t){"use strict";var r=t(15),l=t(20),s=t(1640),o=t.n(s),n=t(1),c=t.n(n),i=t(2),b=t.n(i),d=t(16),u=t.n(d),m=t(13),g=b.a.oneOfType([b.a.number,b.a.string]),p=b.a.oneOfType([b.a.bool,b.a.number,b.a.string,b.a.shape({size:b.a.oneOfType([b.a.bool,b.a.number,b.a.string]),push:Object(m.h)(g,'Please use the prop "order"'),pull:Object(m.h)(g,'Please use the prop "order"'),order:g,offset:g})]),f={tag:m.p,xs:p,sm:p,md:p,lg:p,xl:p,className:b.a.string,cssModule:b.a.object,widths:b.a.array},y={tag:"div",widths:["xs","sm","md","lg","xl"]},h=function(e,a,t){return!0===t||""===t?e?"col":"col-"+a:"auto"===t?e?"col-auto":"col-"+a+"-auto":e?"col-"+t:"col-"+a+"-"+t},E=function(e){var a=e.className,t=e.cssModule,s=e.widths,n=e.tag,i=Object(l.a)(e,["className","cssModule","widths","tag"]),b=[];s.forEach(function(a,r){var l=e[a];if(delete i[a],l||""===l){var s=!r;if(o()(l)){var n,c=s?"-":"-"+a+"-",d=h(s,a,l.size);b.push(Object(m.l)(u()(((n={})[d]=l.size||""===l.size,n["order"+c+l.order]=l.order||0===l.order,n["offset"+c+l.offset]=l.offset||0===l.offset,n)),t))}else{var g=h(s,a,l);b.push(g)}}}),b.length||b.push("col");var d=Object(m.l)(u()(a,b),t);return c.a.createElement(n,Object(r.a)({},i,{className:d}))};E.propTypes=f,E.defaultProps=y,a.a=E},1789:function(e,a,t){"use strict";var r=t(15),l=t(20),s=t(1),o=t.n(s),n=t(2),c=t.n(n),i=t(16),b=t.n(i),d=t(13),u={tag:d.p,listTag:d.p,className:c.a.string,listClassName:c.a.string,cssModule:c.a.object,children:c.a.node,"aria-label":c.a.string},m=function(e){var a=e.className,t=e.listClassName,s=e.cssModule,n=e.children,c=e.tag,i=e.listTag,u=e["aria-label"],m=Object(l.a)(e,["className","listClassName","cssModule","children","tag","listTag","aria-label"]),g=Object(d.l)(b()(a),s),p=Object(d.l)(b()("breadcrumb",t),s);return o.a.createElement(c,Object(r.a)({},m,{className:g,"aria-label":u}),o.a.createElement(i,{className:p},n))};m.propTypes=u,m.defaultProps={tag:"nav",listTag:"ol","aria-label":"breadcrumb"},a.a=m},1790:function(e,a,t){"use strict";var r=t(15),l=t(20),s=t(1),o=t.n(s),n=t(2),c=t.n(n),i=t(16),b=t.n(i),d=t(13),u={tag:d.p,active:c.a.bool,className:c.a.string,cssModule:c.a.object},m=function(e){var a=e.className,t=e.cssModule,s=e.active,n=e.tag,c=Object(l.a)(e,["className","cssModule","active","tag"]),i=Object(d.l)(b()(a,!!s&&"active","breadcrumb-item"),t);return o.a.createElement(n,Object(r.a)({},c,{className:i,"aria-current":s?"page":void 0}))};m.propTypes=u,m.defaultProps={tag:"li"},a.a=m},2361:function(e,a,t){"use strict";t.r(a);var r=t(27),l=t(28),s=t(33),o=t(34),n=t(23),c=t(1574),i=t(1782),b=t(1711),d=t(1),u=t.n(d),m=t(1787),g=t(1788),p=t(1549),f=t(1554),y=t(1550),h=t(2012);function E(e){var a=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var t,r=Object(n.a)(e);if(a){var l=Object(n.a)(this).constructor;t=Reflect.construct(r,arguments,l)}else t=r.apply(this,arguments);return Object(o.a)(this,t)}}var v=function(e){Object(s.a)(t,e);var a=E(t);function t(){return Object(r.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){return u.a.createElement(c.a,{className:"DashboardPage mt-4 ml-2 mr-2",title:"Human Resource Dashboard"},u.a.createElement(m.a,null,u.a.createElement(g.a,{lg:4,md:6,sm:6,xs:12},u.a.createElement(i.b,{title:"Number of Employees ",number:"78",color:"danger",progress:{value:90,label:"Total"}})),u.a.createElement(g.a,{lg:4,md:6,sm:6,xs:12},u.a.createElement(i.b,{title:"Total Monthly Salary ",number:"345,890 ETB",color:"success",progress:{value:90,label:"Total"}})),u.a.createElement(g.a,{lg:4,md:6,sm:6,xs:12},u.a.createElement(i.b,{title:"Open Vacancies ",number:"8",color:"info",progress:{value:90,label:"Total"}})),u.a.createElement(g.a,{lg:3,md:6,sm:6,xs:12},u.a.createElement(i.b,{title:"Time to fill",number:"16 Days",color:"secondary",progress:{value:50,label:"This month"}})),u.a.createElement(g.a,{lg:3,md:6,sm:6,xs:12},u.a.createElement(i.b,{title:"New Hires",number:"5 Employees",color:"secondary",progress:{value:90,label:"This month"}})),u.a.createElement(g.a,{lg:3,md:6,sm:6,xs:12},u.a.createElement(i.b,{title:"Training Costs",number:"3,400 ETB",color:"secondary",progress:{value:90,label:"This month"}})),u.a.createElement(g.a,{lg:3,md:6,sm:6,xs:12},u.a.createElement(i.b,{title:"Costs PerHire",number:"680 ETB",color:"secondary",progress:{value:90,label:"This month"}}))),u.a.createElement(m.a,null,u.a.createElement(g.a,{lg:"5",md:"12",sm:12,xs:12},u.a.createElement(p.a,{className:"someTable"},u.a.createElement(f.a,{className:"shadow",align:"center"},"Employees Rating ","  ",u.a.createElement("small",{className:"text-muted text-capitalize"},"by employment period and Category"," ")),u.a.createElement(y.a,null,u.a.createElement(h.f,{width:"25%",height:"18%",data:b.a.employeesRating.data,options:b.a.employeesRating.options})))),u.a.createElement(g.a,{lg:"7",md:"12",sm:12,xs:12},u.a.createElement(p.a,{className:"someTable"},u.a.createElement(f.a,{className:"shadow",align:"center"},"Employee Turnover Rate ","  ",u.a.createElement("small",{className:"text-muted text-capitalize"},"By Departments"," ")),u.a.createElement(y.a,null,u.a.createElement(h.a,{data:b.a.employeeTurnOverRate.data,options:b.a.employeeTurnOverRate.options})," "))),u.a.createElement(g.a,{lg:"5",md:"12",sm:12,xs:12},u.a.createElement(p.a,{className:"someTable"},u.a.createElement(f.a,{className:"shadow",align:"center"},"Female to Male Ratio"),u.a.createElement(y.a,null,u.a.createElement(h.e,{data:b.a.femaleToMaleRatio.data}))))))}}]),t}(u.a.Component);a.default=v}}]);
//# sourceMappingURL=27.3401192e.chunk.js.map