(function(e){function t(t){for(var r,c,o=t[0],i=t[1],d=t[2],f=0,l=[];f<o.length;f++)c=o[f],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&l.push(n[c][0]),n[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);u&&u(t);while(l.length)l.shift()();return s.push.apply(s,d||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],r=!0,o=1;o<a.length;o++){var i=a[o];0!==n[i]&&(r=!1)}r&&(s.splice(t--,1),e=c(c.s=a[0]))}return e}var r={},n={app:0},s=[];function c(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=e,c.c=r,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(a,r,function(t){return e[t]}.bind(null,r));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=t,o=o.slice();for(var d=0;d<o.length;d++)t(o[d]);var u=i;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},4678:function(e,t,a){var r={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var t=s(e);return a(t)}function s(e){if(!a.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}n.keys=function(){return Object.keys(r)},n.resolve=s,e.exports=n,n.id="4678"},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=a("bc3a"),s=a.n(n),c=a("2106"),o=a.n(c),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-snackbar",{attrs:{timeout:e.snackbar_timeout,color:e.snackbar_color,dark:""},scopedSlots:e._u([{key:"action",fn:function(t){var r=t.attrs;return[a("v-btn",e._b({attrs:{text:""},on:{click:function(t){e.snackbar_show=!1}}},"v-btn",r,!1),[e._v(" Close ")])]}}]),model:{value:e.snackbar_show,callback:function(t){e.snackbar_show=t},expression:"snackbar_show"}},[e._v(" "+e._s(e.snackbar_text)+" ")]),a("v-app-bar",{attrs:{app:""}},[a("v-app-bar-title",[e._v("Docker control panel")]),a("v-chip",{staticClass:"mx-10"},[e._v(e._s(e.current_time))]),a("v-spacer"),a("v-chip",{staticClass:"mx-10"},[e._v(e._s(e.address))]),a("v-dialog",{attrs:{width:"500"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,n=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"mr-2 primary",attrs:{depressed:""}},"v-btn",n,!1),r),[a("v-icon",{attrs:{left:""}},[e._v("mdi-plus")]),e._v("Add")],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[e.dialog_onload?a("v-progress-linear",{attrs:{height:"3",indeterminate:""}}):e._e(),a("v-card-title",{staticClass:"headline grey lighten-2"},[e._v("New Docker")]),a("v-card-text",[a("v-sheet",[a("v-text-field",{attrs:{label:"name"},model:{value:e.edit_docker.name,callback:function(t){e.$set(e.edit_docker,"name",t)},expression:"edit_docker.name"}})],1)],1),a("v-card-actions",[a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){return e.docker_add()}}},[e._v("Add")]),a("v-btn",{attrs:{text:"",color:"error"},on:{click:function(t){e.dialog=!1}}},[e._v("Cancel")])],1)],1)],1),a("v-btn",{staticClass:"success",attrs:{depressed:""},on:{click:function(t){return e.refresh()}}},[a("v-icon",{attrs:{left:""}},[e._v("mdi-refresh")]),e._v("Refresh")],1)],1),a("v-main",e._l(e.dockers,(function(t){return a("v-card",{key:t.id,staticClass:"mx-auto my-12",attrs:{"max-width":"600"}},[t.if_loading?a("v-progress-linear",{attrs:{height:"3",indeterminate:""}}):e._e(),a("v-card-title",[e._v(e._s(t.name))]),a("v-card-subtitle",{staticClass:"py-2"},[e._v(" id : "+e._s(t.id)+" "),a("br"),e._v(" "+e._s(t.status_info)+" ")]),a("div",{staticClass:"pb-4 px-2 pt-0"},[a("v-chip",{attrs:{outlined:"",small:"","close-label":"pr-5",color:t.on?"success":"error"}},[e._v(" "+e._s(t.on?"online":"offline")+" ")]),a("v-btn",{staticClass:"ml-3",attrs:{icon:"",small:""},on:{click:function(a){return e.docker_power(t)}}},[a("v-icon",[e._v("mdi-power")])],1)],1),a("v-divider"),a("v-card-text",{staticClass:"px-8 py-8"},[t.on?a("v-row",[a("div",{staticClass:"body-1 mr-5"},[e._v("Speed: "+e._s(t.act_speed)+" ")]),a("v-btn",{attrs:{small:"",depressed:"",color:"primary"},on:{click:function(a){return e.docker_speed_test(t)}}},[e._v("Do speed test")])],1):e._e(),a("v-sheet",{staticClass:"my-8 pa-0"}),a("v-row",[a("v-sheet",{staticClass:"mr-10",attrs:{width:"300"}},[a("v-text-field",{attrs:{label:"set speed (Mbits/sec)",disabled:!t.on},on:{change:function(a){return e.docker_speed_change(t)}},model:{value:t.speed,callback:function(a){e.$set(t,"speed",a)},expression:"docker.speed"}})],1)],1)],1),a("v-card-actions",[a("v-btn",{attrs:{text:"",color:"error"},on:{click:function(a){return e.docker_del(t)}}},[e._v("Delete")])],1)],1)})),1)],1)},d=[],u=a("1da1"),f=(a("b0c0"),a("c740"),a("96cf"),a("c1df")),l=a.n(f),b={name:"App",data:function(){return{temp_addr:"",snackbar_show:!1,snackbar_text:"",snackbar_timeout:2e3,snackbar_color:"primary",address:"",current_time:null,dialog:!1,dialog_onload:!1,dockers:[],def_docker:{id:0,name:"my docker",speed:100,act_speed:"",on:!1,if_loading:!1,status_info:""},edit_docker:{id:1,name:"my docker",speed:100,act_speed:"",on:!1,if_loading:!1,status_info:""}}},methods:{updateCurrentTime:function(){this.current_time=l()().format("HH:mm:ss")},refresh:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.check_dockers().catch((function(t){throw e.trigger_snackbar("connection error","e"),t})),e.trigger_snackbar("refresh success","i");case 2:case"end":return t.stop()}}),t)})))()},docker_speed_change:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.if_loading=!0,r={},r[e.name]=e.speed,n=new FormData,n.append("config",JSON.stringify(r)),a.next=7,s.a.post(t.temp_addr+"/update_conf",n,{headers:{"Content-Type":"multipart/form-data"}}).catch((function(a){throw t.trigger_snackbar(a,"e"),e.if_loading=!1,a}));case 7:e.if_loading=!1,t.trigger_snackbar("update "+e.name+" speed success","i");case 9:case"end":return a.stop()}}),a)})))()},docker_power:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var r,n,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.if_loading=!0,r=e.on?"/stop_docker":"/start_docker",n=new FormData,n.append("name",e.name),a.next=6,s.a.post(t.temp_addr+r,n,{headers:{"Content-Type":"multipart/form-data"}}).catch((function(e){throw t.trigger_snackbar(e,"e"),e}));case 6:return e.on=!e.on,e.if_loading=!1,a.next=10,s.a.get(t.temp_addr+"/read_docker").then((function(e){var a=function(a){var r=t.dockers.findIndex((function(e){return e.name===a}));t.dockers[r].status_info=e.data[a][1]};for(var r in e.data)a(r)})).catch((function(a){throw t.trigger_snackbar(a,"e"),e.if_loading=!1,a}));case 10:c=e.on?"start ":"stop ",t.trigger_snackbar(c+e.name+" success","i");case 12:case"end":return a.stop()}}),a)})))()},docker_speed_test:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.if_loading=!0,e.act_speed=0,r=new FormData,r.append("name",e.name),a.next=6,s.a.post(t.temp_addr+"/test_docker",r,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){return e.act_speed=t.data})).catch((function(a){throw t.trigger_snackbar(a,"e"),e.if_loading=!1,a}));case 6:e.if_loading=!1;case 7:case"end":return a.stop()}}),a)})))()},docker_add:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.dialog_onload=!0,a=new FormData,a.append("name",e.edit_docker.name),t.next=5,s.a.post(e.temp_addr+"/add_docker",a,{headers:{"Content-Type":"multipart/form-data"}}).catch((function(t){throw e.dialog=!1,e.trigger_snackbar(t,"e"),t}));case 5:return t.next=7,e.check_dockers();case 7:e.dialog_onload=!1,e.dialog=!1,e.trigger_snackbar("add "+e.edit_docker.name+" success","i");case 10:case"end":return t.stop()}}),t)})))()},docker_del:function(e){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function a(){var r,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.if_loading=!0,r=new FormData,n=e.name,r.append("name",n),a.next=6,s.a.post(t.temp_addr+"/delete_docker",r,{headers:{"Content-Type":"multipart/form-data"}}).catch((function(e){throw t.dialog=!1,t.trigger_snackbar(e,"e"),e}));case 6:return a.next=8,t.check_dockers();case 8:t.dialog_onload=!1,t.dialog=!1,t.trigger_snackbar("delete "+n+" success","i");case 11:case"end":return a.stop()}}),a)})))()},trigger_snackbar:function(e,t){this.snackbar_text=e,this.snackbar_color="i"===t?"primary":"error",this.snackbar_show=!0},check_dockers:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.dockers=[],t.next=3,s.a.get(e.temp_addr+"/read_docker").then((function(t){for(var a in t.data)e.dockers.push({id:t.data[a][0],name:a,speed:0,act_speed:0,on:"U"===t.data[a][1][0],if_loading:!1,status_info:t.data[a][1]})}));case 3:return t.next=5,s.a.get(e.temp_addr+"/read_conf").then((function(t){var a=function(a){var r=e.dockers.findIndex((function(e){return e.name===a}));console.log(),e.dockers[r].speed=t.data[a]};for(var r in t.data)a(r)}));case 5:case"end":return t.stop()}}),t)})))()}},created:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.current_time=l()().format("HH:mm:ss"),setInterval((function(){return e.updateCurrentTime()}),1e3),s.a.get(e.temp_addr+"/server_ip").then((function(t){return e.address=t.data.ip})).catch((function(t){return e.trigger_snackbar(t,"e")})),t.next=5,e.check_dockers().catch((function(t){throw e.trigger_snackbar(t,"e"),t}));case 5:e.trigger_snackbar("load success","i");case 6:case"end":return t.stop()}}),t)})))()},filters:{}},p=b,m=a("2877"),j=a("6544"),_=a.n(j),h=a("7496"),v=a("40dc"),k=a("bb78"),g=a("8336"),w=a("b0af"),y=a("99d9"),x=a("cc20"),C=a("169a"),O=a("ce7e"),z=a("132d"),V=a("f6c4"),R=a("8e36"),T=a("0fd9"),D=a("8dd9"),S=a("2db4"),P=a("2fa4"),A=a("8654"),F=Object(m["a"])(p,i,d,!1,null,"9355f918",null),M=F.exports;_()(F,{VApp:h["a"],VAppBar:v["a"],VAppBarTitle:k["a"],VBtn:g["a"],VCard:w["a"],VCardActions:y["a"],VCardSubtitle:y["b"],VCardText:y["c"],VCardTitle:y["d"],VChip:x["a"],VDialog:C["a"],VDivider:O["a"],VIcon:z["a"],VMain:V["a"],VProgressLinear:R["a"],VRow:T["a"],VSheet:D["a"],VSnackbar:S["a"],VSpacer:P["a"],VTextField:A["a"]});var H=a("f309");r["a"].use(H["a"]);var I=new H["a"]({});r["a"].use(o.a,s.a),r["a"].config.productionTip=!0,new r["a"]({vuetify:I,axios:s.a,render:function(e){return e(M)}}).$mount("#app")}});
//# sourceMappingURL=app.71b3fef1.js.map