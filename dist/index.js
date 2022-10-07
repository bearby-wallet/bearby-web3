(function(t,e){typeof exports==="object"&&typeof module!=="undefined"?e(exports):typeof define==="function"&&define.amd?define(["exports"],e):(t=typeof globalThis!=="undefined"?globalThis:t||self,e(t.web3={}))})(this,(function(t){"use strict";function e(t,e,s,n){if(s==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e==="function"?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return s==="m"?n:s==="a"?n.call(t):n?n.value:e.get(t)}function s(t,e,s,n,a){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!a)throw new TypeError("Private accessor was defined without a setter");if(typeof e==="function"?t!==e||!a:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?a.call(t,s):a?a.value=s:e.set(t,s),s}var n;class a{constructor(t){n.set(this,void 0);s(this,n,t,"f")}deploy(){}call(){}read(){}}n=new WeakMap;const i="BearBy";const r={CONTENT:`@/${i}/content-script`,INJECTED:`@/${i}/injected-script`};const o={GET_DATA:`@/${i}/get-wallet-data`,ACCOUNT_CHANGED:`@/${i}/accounts-just-changed`,CONTENT_PROXY_MEHTOD:`@/${i}/proxy-method`,CONTENT_PROXY_RESULT:`@/${i}/response-from-content`,CONNECT_APP:`@/${i}/connect-app`,RESPONSE_CONNECT_APP:`@/${i}/respoonse-connect-app`,NETWORK_CHANGED:`@/${i}/network-just-changed`,LOCKED:`@/${i}/guard-just-lock`,TX_TO_SEND:`@/${i}/add-tx-to-send`,TX_TO_SEND_RESULT:`@/${i}/response-tx-result`,SIGN_MESSAGE:`@/${i}/sign-message-call`,SING_MESSAGE_RESULT:`@/${i}/sign-message-response`};var c,l,h,d,u;const{document:f}=globalThis;class p{constructor(t){c.add(this);l.set(this,void 0);s(this,l,t,"f")}listen(t){f.addEventListener(e(this,l,"f"),(e=>{if(e&&e.detail){t(JSON.parse(e.detail))}}))}send(t,s){t.from=e(this,l,"f");if(Object.values(r).includes(s)){e(this,c,"m",h).call(this,JSON.stringify(t),s)}}}l=new WeakMap,c=new WeakSet,h=function t(s,n){f.dispatchEvent(e(this,c,"m",u).call(this,s,n))},d=function t(e){return{detail:e}},u=function t(s,n){return new CustomEvent(n,e(this,c,"m",d).call(this,s))};var E;class y{constructor(){E.set(this,[])}on(t){e(this,E,"f").push(t);return()=>this.removeListener(t)}removeListener(t){const s=e(this,E,"f").indexOf(t);if(s>-1)e(this,E,"f").splice(s,1)}removeAllListeners(){e(this,E,"f").splice(0,e(this,E,"f").length)}emit(...t){e(this,E,"f").forEach((e=>e.apply(this,t)))}once(t){const e=this.on(((...s)=>{e();t.apply(this,s)}))}}E=new WeakMap;var T;class w{constructor(t){T.set(this,void 0);s(this,T,t,"f")}get type(){return e(this,T,"f").type}get payload(){return e(this,T,"f").payload}send(t,s){const n=JSON.stringify(e(this,T,"f"));const a=JSON.parse(n);t.send(a,s)}}T=new WeakMap;class _{constructor(){this.stream=new p(r.INJECTED);this.subject=new y;this.stream.listen((t=>{this.subject.emit(t)}))}initialized(){const t=o.GET_DATA;const e=r.CONTENT;new w({type:t,payload:{}}).send(this.stream,e)}}function m(){const t=20;return[...Array(t)].map((()=>Math.floor(Math.random()*16).toString(16))).join("")}const S=5e3;const N="website favicon is required";const O="Wallet is not connected";const C="Invalid sign params";const g="Request failed by timeout";var b,v;class A{constructor(t,e){b.set(this,void 0);v.set(this,void 0);s(this,b,t,"f");s(this,v,e,"f")}async send(t){const s=o.CONTENT_PROXY_MEHTOD;const n=r.CONTENT;const a=m();let i;new w({type:s,payload:{body:t,uuid:a}}).send(e(this,b,"f"),n);const c=new Promise(((t,s)=>{i=e(this,v,"f").on((e=>{if(e.type!==o.CONTENT_PROXY_RESULT)return;if(!e.payload||!e.payload.uuid)return;if(e.payload.uuid!==a)return;if(e.payload&&e.payload.reject){i();return s(new Error(e.payload.reject))}delete e.payload.uuid;i();return t(e.payload.resolve)}))}));const l=new Promise(((t,e)=>{setTimeout((()=>{if(i)i();e(new Error(g))}),S)}));return Promise.race([c,l])}}b=new WeakMap,v=new WeakMap;var R;(function(t){t["GET_STATUS"]="get_status";t["GET_ADDRESSES"]="get_addresses";t["GET_BLOCKS"]="get_block";t["GET_ENDORSEMENTS"]="get_endorsements";t["GET_OPERATIONS"]="get_operations";t["GET_CLIQUES"]="get_cliques";t["GET_STAKERS"]="get_stakers";t["GET_FILTERED_SC_OUTPUT_EVENT"]="get_filtered_sc_output_event";t["EXECUTE_READ_ONLY_BYTECODE"]="execute_read_only_bytecode";t["EXECUTE_READ_ONLY_CALL"]="execute_read_only_call"})(R||(R={}));function k(t){return Array.from(t,(t=>t.toString(16).padStart(2,"0"))).join("")}class D{constructor(t,e,s,n,a,i){this.type=t;this.amount=String(e);this.recipient=s;this.parameter=n;this.contract=a?k(a):a;this.functionName=i}get payload(){return JSON.parse(JSON.stringify({type:this.type,amount:this.amount,fee:this.fee,gasPrice:this.gasPrice,gasLimit:this.gasLimit,coins:this.coins,code:this.contract,func:this.functionName,params:JSON.stringify(this.parameter),parallelCoins:this.parallelCoins,sequentialCoins:this.sequentialCoins,toAddr:this.recipient}))}}var G;(function(t){t[t["Payment"]=0]="Payment";t[t["RollBuy"]=1]="RollBuy";t[t["RollSell"]=2]="RollSell";t[t["ExecuteSC"]=3]="ExecuteSC";t[t["CallSC"]=4]="CallSC"})(G||(G={}));var P,M;class L{constructor(t,e){P.set(this,void 0);M.set(this,void 0);s(this,P,t,"f");s(this,M,e,"f")}async getNodesStatus(){const t=R.GET_STATUS;return e(this,P,"f").send([{method:t,params:[]}])}async getAddresses(...t){const s=R.GET_ADDRESSES;return e(this,P,"f").send([{method:s,params:[t]}])}async getBlocks(...t){const s=R.GET_BLOCKS;return e(this,P,"f").send([{method:s,params:[t]}])}async getOperations(...t){const s=R.GET_OPERATIONS;return e(this,P,"f").send([{method:s,params:[t]}])}async getStakers(){const t=R.GET_STAKERS;return e(this,P,"f").send([{method:t,params:[]}])}async getEndorsements(...t){const s=R.GET_ENDORSEMENTS;return e(this,P,"f").send([{method:s,params:[t]}])}async getCliques(){const t=R.GET_CLIQUES;return e(this,P,"f").send([{method:t,params:[]}])}async getFilteredSCOutputEvent(t){const s=R.GET_FILTERED_SC_OUTPUT_EVENT;return e(this,P,"f").send([{method:s,params:[t]}])}async executeReadOlyBytecode(t){const s=R.EXECUTE_READ_ONLY_BYTECODE;return e(this,P,"f").send([{method:s,params:[t]}])}async executeReadOnlyCall(t){const s=R.EXECUTE_READ_ONLY_CALL;return e(this,P,"f").send([{method:s,params:[t]}])}async payment(t,s){const n=new D(G.Payment,t,s);return e(this,M,"f").signTransaction(n)}async buyRolls(t){const s=new D(G.RollBuy,t);return e(this,M,"f").signTransaction(s)}async sellRolls(t){const s=new D(G.RollSell,t);return e(this,M,"f").signTransaction(s)}}P=new WeakMap,M=new WeakMap;function W(t,e){if(!t){throw new Error(e)}}function j(){let t=globalThis.document.querySelector("link[rel*='icon']");if(!t){throw new Error(N)}return t.href}var U,$;class x{constructor(t,e){U.set(this,void 0);$.set(this,void 0);s(this,U,t,"f");s(this,$,e,"f")}get base58(){return e(this,$,"f")}subscribe(t){if(this.base58){t(this.base58)}const n=e(this,U,"f").on((n=>{switch(n.type){case o.ACCOUNT_CHANGED:s(this,$,n.payload.base58,"f");break;case o.GET_DATA:s(this,$,n.payload.base58,"f");break;default:return}t(e(this,$,"f"))}));return{unsubscribe:()=>n()}}}U=new WeakMap,$=new WeakMap;var I,B;class X{constructor(t,e){I.set(this,void 0);B.set(this,void 0);s(this,I,t,"f");if(e){s(this,B,e,"f")}}get net(){return e(this,B,"f")}subscribe(t){t(this.net);const n=e(this,I,"f").on((e=>{switch(e.type){case o.GET_DATA:s(this,B,e.payload.net,"f");break;case o.NETWORK_CHANGED:s(this,B,e.payload.net,"f");break;default:return}t(this.net)}));return{unsubscribe:()=>n()}}}I=new WeakMap,B=new WeakMap;var Y,J,K,H,q,z,F,Q;class V{constructor(t,n){Y.add(this);J.set(this,void 0);K.set(this,void 0);H.set(this,void 0);q.set(this,void 0);z.set(this,false);F.set(this,false);s(this,H,t,"f");s(this,q,n,"f");s(this,J,new x(n),"f");s(this,K,new X(n),"f");e(this,Y,"m",Q).call(this)}get account(){return e(this,J,"f")}get network(){return e(this,K,"f")}get connected(){return e(this,z,"f")}get enabled(){return e(this,F,"f")}connect(){const t=o.CONNECT_APP;const n=r.CONTENT;const a=m();const i=window.document.title;const c=j();const l={title:i,icon:c,uuid:a};new w({type:t,payload:l}).send(e(this,H,"f"),n);return new Promise(((t,n)=>{const i=e(this,q,"f").on((r=>{if(r.type!==o.RESPONSE_CONNECT_APP)return;if(r.payload.uuid!==a)return;if(r.payload.reject){i();return n(new Error(r.payload.reject))}s(this,z,Boolean(r.payload.resolve),"f");s(this,J,new x(e(this,q,"f"),r.payload.base58),"f");i();return t(this.connected)}))}))}async signMessage(t){W(this.connected,O);const s=o.SIGN_MESSAGE;const n=r.CONTENT;const a=m();const i=window.document.title;const c=j();const l={message:t,uuid:a,title:i,icon:c};new w({type:s,payload:l}).send(e(this,H,"f"),n);return new Promise(((t,s)=>{const n=e(this,q,"f").on((e=>{if(e.type!==o.SING_MESSAGE_RESULT)return;if(e.payload.uuid!==a)return;if(e.payload&&e.payload.reject){n();return s(new Error(e.payload.reject))}n();return t(e.payload.resolve)}))}))}async signTransaction(t){W(this.connected,O);W(t instanceof D,C);const s=o.TX_TO_SEND;const n=r.CONTENT;const a=m();const i={...t.payload,uuid:a,title:window.document.title,icon:j()};new w({type:s,payload:i}).send(e(this,H,"f"),n);return new Promise(((t,s)=>{const n=e(this,q,"f").on((e=>{if(e.type!==o.TX_TO_SEND_RESULT)return;if(e.payload.uuid!==a)return;if(e.payload&&e.payload.reject){n();return s(new Error(e.payload.reject))}n();return t(e.payload.resolve)}))}))}}J=new WeakMap,K=new WeakMap,H=new WeakMap,q=new WeakMap,z=new WeakMap,F=new WeakMap,Y=new WeakSet,Q=function t(){e(this,q,"f").on((t=>{switch(t.type){case o.LOCKED:s(this,F,t.payload.enabled,"f");break;case o.ACCOUNT_CHANGED:s(this,J,new x(e(this,q,"f"),t.payload.base58),"f");break;case o.GET_DATA:s(this,J,new x(e(this,q,"f"),t.payload.base58),"f");s(this,F,t.payload.enabled,"f");s(this,z,t.payload.connected,"f");s(this,K,new X(e(this,q,"f"),t.payload.net),"f");break;case o.NETWORK_CHANGED:s(this,K,new X(e(this,q,"f"),t.payload.net),"f");break}}))};var Z;class tt{constructor(){Z.set(this,new _);this.wallet=new V(e(this,Z,"f").stream,e(this,Z,"f").subject);this.provider=new A(e(this,Z,"f").stream,e(this,Z,"f").subject);this.contract=new a(this.provider);this.massa=new L(this.provider,this.wallet);e(this,Z,"f").initialized();globalThis.window["bearby"]=Object.freeze(this)}}Z=new WeakMap;const et=new tt;t.web3=et;Object.defineProperty(t,"__esModule",{value:true})}));
//# sourceMappingURL=index.js.map
