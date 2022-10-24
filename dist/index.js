(function(t,e){typeof exports==="object"&&typeof module!=="undefined"?e(exports):typeof define==="function"&&define.amd?define(["exports"],e):(t=typeof globalThis!=="undefined"?globalThis:t||self,e(t.web3={}))})(this,(function(t){"use strict";function e(t,e,s,n){if(s==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e==="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return s==="m"?n:s==="a"?n.call(t):n?n.value:e.get(t)}function s(t,e,s,n,a){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof e==="function"?t!==e||!a:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?a.call(t,s):a?a.value=s:e.set(t,s),s}const n="website favicon is required";const a="Wallet is not connected";const i="Invalid sign params";const r="Request failed by timeout";const o="bearby-web3 available only browser";const c="bearby Web3 instance already created!";class d{constructor(t,e,s,n,a,i,r){this.type=t;this.amount=String(e);this.recipient=s;this.parameter=n;this.contract=a;this.functionName=i;this.datastore=r}get payload(){return JSON.parse(JSON.stringify({type:this.type,amount:this.amount,fee:this.fee,gasPrice:this.gasPrice,gasLimit:this.gasLimit,coins:String(this.coins),code:this.contract,func:this.functionName,params:JSON.stringify(this.parameter),toAddr:this.recipient||this.contract,datastore:this.datastore}))}}var l;(function(t){t[t["Payment"]=0]="Payment";t[t["RollBuy"]=1]="RollBuy";t[t["RollSell"]=2]="RollSell";t[t["ExecuteSC"]=3]="ExecuteSC";t[t["CallSC"]=4]="CallSC"})(l||(l={}));var h;(function(t){t["GET_STATUS"]="get_status";t["GET_ADDRESSES"]="get_addresses";t["GET_BLOCKS"]="get_block";t["GET_ENDORSEMENTS"]="get_endorsements";t["GET_OPERATIONS"]="get_operations";t["GET_CLIQUES"]="get_cliques";t["GET_STAKERS"]="get_stakers";t["GET_FILTERED_SC_OUTPUT_EVENT"]="get_filtered_sc_output_event";t["EXECUTE_READ_ONLY_BYTECODE"]="execute_read_only_bytecode";t["EXECUTE_READ_ONLY_CALL"]="execute_read_only_call"})(h||(h={}));var u,f;class p{constructor(t,e){u.set(this,void 0);f.set(this,void 0);s(this,u,t,"f");s(this,f,e,"f")}async deploy(t){const s=new d(l.ExecuteSC,"0",undefined,undefined,t.contractDataBase64,undefined,t.datastore);s.fee=String(t.fee);s.gasLimit=Number(t.maxGas);s.gasPrice=Number(t.gasPrice);return e(this,f,"f").signTransaction(s)}async call(t){const s=new d(l.CallSC,"0",undefined,t.parameter,t.targetAddress,t.functionName);s.fee=String(t.fee);s.gasLimit=Number(t.maxGas);s.coins=String(t.coins||0);s.gasPrice=Number(t.gasPrice||0);return e(this,f,"f").signTransaction(s)}async getFilteredSCOutputEvent(...t){const s=h.GET_FILTERED_SC_OUTPUT_EVENT;const n=await e(this,u,"f").send(t.map((t=>({method:s,params:[t]}))));if(t.length===1){return n[0]}return n}async executeReadOlyBytecode(t){const s=h.EXECUTE_READ_ONLY_BYTECODE;return e(this,u,"f").send([{method:s,params:[t]}])}async readSmartContract(...t){const s=h.EXECUTE_READ_ONLY_CALL;const n=await e(this,u,"f").send([{method:s,params:[t.map((t=>({max_gas:t.maxGas,simulated_gas_price:String(t.simulatedGasPrice),target_address:t.targetAddress,target_function:t.targetFunction,parameter:t.parameter,caller_address:t.callerAddress||e(this,f,"f").account.base58})))]}]);if(t.length===1){return n[0]}return n}}u=new WeakMap,f=new WeakMap;const E="BearBy";const y={CONTENT:`@/${E}/content-script`,INJECTED:`@/${E}/injected-script`};const T={GET_DATA:`@/${E}/get-wallet-data`,ACCOUNT_CHANGED:`@/${E}/accounts-just-changed`,CONTENT_PROXY_MEHTOD:`@/${E}/proxy-method`,CONTENT_PROXY_RESULT:`@/${E}/response-from-content`,CONNECT_APP:`@/${E}/connect-app`,RESPONSE_CONNECT_APP:`@/${E}/respoonse-connect-app`,NETWORK_CHANGED:`@/${E}/network-just-changed`,LOCKED:`@/${E}/guard-just-lock`,TX_TO_SEND:`@/${E}/add-tx-to-send`,TX_TO_SEND_RESULT:`@/${E}/response-tx-result`,SIGN_MESSAGE:`@/${E}/sign-message-call`,SING_MESSAGE_RESULT:`@/${E}/sign-message-response`};var w,m,_,g,S;const{document:b}=globalThis;class N{constructor(t){w.add(this);m.set(this,void 0);s(this,m,t,"f")}listen(t){b.addEventListener(e(this,m,"f"),(e=>{if(e&&e.detail){t(JSON.parse(e.detail))}}))}send(t,s){t.from=e(this,m,"f");if(Object.values(y).includes(s)){e(this,w,"m",_).call(this,JSON.stringify(t),s)}}}m=new WeakMap,w=new WeakSet,_=function t(s,n){b.dispatchEvent(e(this,w,"m",S).call(this,s,n))},g=function t(e){return{detail:e}},S=function t(s,n){return new CustomEvent(n,e(this,w,"m",g).call(this,s))};var C;class O{constructor(){C.set(this,[])}on(t){e(this,C,"f").push(t);return()=>this.removeListener(t)}removeListener(t){const s=e(this,C,"f").indexOf(t);if(s>-1)e(this,C,"f").splice(s,1)}removeAllListeners(){e(this,C,"f").splice(0,e(this,C,"f").length)}emit(...t){e(this,C,"f").forEach((e=>e.apply(this,t)))}once(t){const e=this.on(((...s)=>{e();t.apply(this,s)}))}}C=new WeakMap;var v;class A{constructor(t){v.set(this,void 0);s(this,v,t,"f")}get type(){return e(this,v,"f").type}get payload(){return e(this,v,"f").payload}send(t,s){const n=JSON.stringify(e(this,v,"f"));const a=JSON.parse(n);t.send(a,s)}}v=new WeakMap;class k{constructor(){this.stream=new N(y.INJECTED);this.subject=new O;if(globalThis.document){this.stream.listen((t=>{this.subject.emit(t)}))}}initialized(){const t=T.GET_DATA;const e=y.CONTENT;new A({type:t,payload:{}}).send(this.stream,e)}}function G(){const t=20;return[...Array(t)].map((()=>Math.floor(Math.random()*16).toString(16))).join("")}const P=5e3;var R,D;class M{constructor(t,e){R.set(this,void 0);D.set(this,void 0);s(this,R,t,"f");s(this,D,e,"f")}async send(t){const s=T.CONTENT_PROXY_MEHTOD;const n=y.CONTENT;const a=G();let i;new A({type:s,payload:{body:t,uuid:a}}).send(e(this,R,"f"),n);const o=new Promise(((t,s)=>{i=e(this,D,"f").on((e=>{if(e.type!==T.CONTENT_PROXY_RESULT)return;if(!e.payload||!e.payload.uuid)return;if(e.payload.uuid!==a)return;if(e.payload&&e.payload.reject){i();return s(new Error(e.payload.reject))}delete e.payload.uuid;i();return t(e.payload.resolve)}))}));const c=new Promise(((t,e)=>{setTimeout((()=>{if(i)i();e(new Error(r))}),P)}));return Promise.race([o,c])}}R=new WeakMap,D=new WeakMap;var L,W;class j{constructor(t,e){L.set(this,void 0);W.set(this,void 0);s(this,L,t,"f");s(this,W,e,"f")}async getNodesStatus(){const t=h.GET_STATUS;return e(this,L,"f").send([{method:t,params:[]}])}async getAddresses(...t){const s=h.GET_ADDRESSES;return e(this,L,"f").send([{method:s,params:[t]}])}async getBlocks(...t){const s=h.GET_BLOCKS;return e(this,L,"f").send([{method:s,params:[t]}])}async getOperations(...t){const s=h.GET_OPERATIONS;return e(this,L,"f").send([{method:s,params:[t]}])}async getStakers(){const t=h.GET_STAKERS;return e(this,L,"f").send([{method:t,params:[]}])}async getEndorsements(...t){const s=h.GET_ENDORSEMENTS;return e(this,L,"f").send([{method:s,params:[t]}])}async getCliques(){const t=h.GET_CLIQUES;return e(this,L,"f").send([{method:t,params:[]}])}async payment(t,s){const n=new d(l.Payment,t,s);return e(this,W,"f").signTransaction(n)}async buyRolls(t){const s=new d(l.RollBuy,t);return e(this,W,"f").signTransaction(s)}async sellRolls(t){const s=new d(l.RollSell,t);return e(this,W,"f").signTransaction(s)}}L=new WeakMap,W=new WeakMap;function U(t,e){if(!t){throw new Error(e)}}function x(){let t=globalThis.document.querySelector("link[rel*='icon']");if(!t){throw new Error(n)}return t.href}var $,B;class I{constructor(t,e){$.set(this,void 0);B.set(this,void 0);s(this,$,t,"f");s(this,B,e,"f")}get base58(){return e(this,B,"f")}subscribe(t){if(this.base58){t(this.base58)}const n=e(this,$,"f").on((n=>{switch(n.type){case T.ACCOUNT_CHANGED:s(this,B,n.payload.base58,"f");break;case T.GET_DATA:s(this,B,n.payload.base58,"f");break;default:return}t(e(this,B,"f"))}));return{unsubscribe:()=>n()}}}$=new WeakMap,B=new WeakMap;var X,Y;class J{constructor(t,e){X.set(this,void 0);Y.set(this,void 0);s(this,X,t,"f");if(e){s(this,Y,e,"f")}}get net(){return e(this,Y,"f")}subscribe(t){t(this.net);const n=e(this,X,"f").on((e=>{switch(e.type){case T.GET_DATA:s(this,Y,e.payload.net,"f");break;case T.NETWORK_CHANGED:s(this,Y,e.payload.net,"f");break;default:return}t(this.net)}));return{unsubscribe:()=>n()}}}X=new WeakMap,Y=new WeakMap;var K,H,q,F,z,Q,V,Z;class tt{constructor(t,n){K.add(this);H.set(this,void 0);q.set(this,void 0);F.set(this,void 0);z.set(this,void 0);Q.set(this,false);V.set(this,false);s(this,F,t,"f");s(this,z,n,"f");s(this,H,new I(n),"f");s(this,q,new J(n),"f");e(this,K,"m",Z).call(this)}get account(){return e(this,H,"f")}get network(){return e(this,q,"f")}get connected(){return e(this,Q,"f")}get enabled(){return e(this,V,"f")}async connect(){const t=T.CONNECT_APP;const n=y.CONTENT;const a=G();const i=window.document.title;const r=x();const o={title:i,icon:r,uuid:a};new A({type:t,payload:o}).send(e(this,F,"f"),n);return new Promise(((t,n)=>{const i=e(this,z,"f").on((r=>{if(r.type!==T.RESPONSE_CONNECT_APP)return;if(r.payload.uuid!==a)return;if(r.payload.reject){i();return n(new Error(r.payload.reject))}s(this,Q,Boolean(r.payload.resolve),"f");s(this,H,new I(e(this,z,"f"),r.payload.base58),"f");s(this,q,new J(e(this,z,"f"),r.payload.net),"f");i();return t(this.connected)}))}))}async signMessage(t){U(this.connected,a);const s=T.SIGN_MESSAGE;const n=y.CONTENT;const i=G();const r=window.document.title;const o=x();const c={message:t,uuid:i,title:r,icon:o};new A({type:s,payload:c}).send(e(this,F,"f"),n);return new Promise(((t,s)=>{const n=e(this,z,"f").on((e=>{if(e.type!==T.SING_MESSAGE_RESULT)return;if(e.payload.uuid!==i)return;if(e.payload&&e.payload.reject){n();return s(new Error(e.payload.reject))}n();return t(e.payload.resolve)}))}))}async signTransaction(t){U(this.connected,a);U(t instanceof d,i);const s=T.TX_TO_SEND;const n=y.CONTENT;const r=G();const o={...t.payload,uuid:r,title:window.document.title,icon:x()};new A({type:s,payload:o}).send(e(this,F,"f"),n);return new Promise(((t,s)=>{const n=e(this,z,"f").on((e=>{if(e.type!==T.TX_TO_SEND_RESULT)return;if(e.payload.uuid!==r)return;if(e.payload&&e.payload.reject){n();return s(new Error(e.payload.reject))}n();return t(e.payload.resolve)}))}))}subscribe(t){const s=e(this,z,"f").on((()=>{setTimeout((()=>t()),1)}));return{unsubscribe:()=>s()}}}H=new WeakMap,q=new WeakMap,F=new WeakMap,z=new WeakMap,Q=new WeakMap,V=new WeakMap,K=new WeakSet,Z=function t(){if(!globalThis.window)return;e(this,z,"f").on((t=>{switch(t.type){case T.LOCKED:s(this,V,t.payload.enabled,"f");break;case T.ACCOUNT_CHANGED:s(this,H,new I(e(this,z,"f"),t.payload.base58),"f");break;case T.GET_DATA:s(this,H,new I(e(this,z,"f"),t.payload.base58),"f");s(this,V,t.payload.enabled,"f");s(this,Q,t.payload.connected,"f");s(this,q,new J(e(this,z,"f"),t.payload.net),"f");break;case T.NETWORK_CHANGED:s(this,q,new J(e(this,z,"f"),t.payload.net),"f");break}}))};var et,st;class nt{constructor(){et.set(this,new k);st.set(this,new M(e(this,et,"f").stream,e(this,et,"f").subject));this.wallet=new tt(e(this,et,"f").stream,e(this,et,"f").subject);this.contract=new p(e(this,st,"f"),this.wallet);this.massa=new j(e(this,st,"f"),this.wallet);if(globalThis.window){if(globalThis.window["bearby"]){throw new Error(c)}try{e(this,et,"f").initialized();globalThis.window["bearby"]=Object.freeze(this)}catch(t){console.debug(o)}}}}et=new WeakMap,st=new WeakMap;const at=new nt;t.ContentProvider=M;t.Contract=p;t.Massa=j;t.Wallet=tt;t.Web3=nt;t.default=at;t.web3=at;Object.defineProperty(t,"__esModule",{value:true})}));
//# sourceMappingURL=index.js.map
