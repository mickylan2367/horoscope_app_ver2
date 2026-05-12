var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(e&&(t=e(e=0)),t),s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,a)=>(a=n==null?{}:e(i(n)),l(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),d=e=>a.call(e,`module.exports`)?e[`module.exports`]:l(t({},`__esModule`,{value:!0}),e);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var f=s((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,D());else{var t=n(l);t!==null&&re(x,t.startTime-e)}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function ee(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&re(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?D():S=!1}}}var D;if(typeof y==`function`)D=function(){y(ee)};else if(typeof MessageChannel<`u`){var te=new MessageChannel,ne=te.port2;te.port1.onmessage=ee,D=function(){ne.postMessage(null)}}else D=function(){_(ee,0)};function re(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,re(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,D()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=s(((e,t)=>{t.exports=f()})),m=s((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.iterator;function m(e){return typeof e!=`object`||!e?null:(e=p&&e[p]||e[`@@iterator`],typeof e==`function`?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},g=Object.assign,_={};function v(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}v.prototype.isReactComponent={},v.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},v.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function y(){}y.prototype=v.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=_,this.updater=n||h}var x=b.prototype=new y;x.constructor=b,g(x,v.prototype),x.isPureReactComponent=!0;var S=Array.isArray;function C(){}var w={H:null,A:null,T:null,S:null},T=Object.prototype.hasOwnProperty;function E(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ee(e,t){return E(e.type,t,e.props)}function D(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function te(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ne=/\/+/g;function re(e,t){return typeof e==`object`&&e&&e.key!=null?te(``+e.key):t.toString(36)}function ie(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(C,C):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ae(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ae(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+re(e,0):a,S(o)?(i=``,c!=null&&(i=c.replace(ne,`$&/`)+`/`),ae(o,r,i,``,function(e){return e})):o!=null&&(D(o)&&(o=ee(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ne,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(S(e))for(var u=0;u<e.length;u++)a=e[u],s=l+re(a,u),c+=ae(a,r,i,s,o);else if(u=m(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+re(a,u++),c+=ae(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ae(ie(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function oe(e,t,n){if(e==null)return e;var r=[],i=0;return ae(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function se(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var O=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},k={map:oe,forEach:function(e,t,n){oe(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return oe(e,function(){t++}),t},toArray:function(e){return oe(e,function(e){return e})||[]},only:function(e){if(!D(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=k,e.Component=v,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=g({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!T.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return E(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)T.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return E(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=D,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:se}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=w.T,n={};w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(C,O)}catch(e){O(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}},e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.2.5`})),h=s(((e,t)=>{t.exports=m()})),g=s((e=>{var t=h();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.2.5`})),_=s(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=s((e=>{var t=p(),n=h(),r=_();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function d(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=d(e),t!==null)return t;e=e.sibling}return null}var f=Object.assign,m=Symbol.for(`react.element`),g=Symbol.for(`react.transitional.element`),v=Symbol.for(`react.portal`),y=Symbol.for(`react.fragment`),b=Symbol.for(`react.strict_mode`),x=Symbol.for(`react.profiler`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),E=Symbol.for(`react.suspense_list`),ee=Symbol.for(`react.memo`),D=Symbol.for(`react.lazy`),te=Symbol.for(`react.activity`),ne=Symbol.for(`react.memo_cache_sentinel`),re=Symbol.iterator;function ie(e){return typeof e!=`object`||!e?null:(e=re&&e[re]||e[`@@iterator`],typeof e==`function`?e:null)}var ae=Symbol.for(`react.client.reference`);function oe(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ae?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case y:return`Fragment`;case x:return`Profiler`;case b:return`StrictMode`;case T:return`Suspense`;case E:return`SuspenseList`;case te:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case v:return`Portal`;case C:return e.displayName||`Context`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ee:return t=e.displayName||null,t===null?oe(e.type)||`Memo`:t;case D:t=e._payload,e=e._init;try{return oe(e(t))}catch{}}return null}var se=Array.isArray,O=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ce={pending:!1,data:null,method:null,action:null},le=[],ue=-1;function de(e){return{current:e}}function fe(e){0>ue||(e.current=le[ue],le[ue]=null,ue--)}function A(e,t){ue++,le[ue]=e.current,e.current=t}var pe=de(null),me=de(null),he=de(null),ge=de(null);function _e(e,t){switch(A(he,t),A(me,e),A(pe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Ud(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Ud(t),e=Wd(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}fe(pe),A(pe,e)}function ve(){fe(pe),fe(me),fe(he)}function ye(e){e.memoizedState!==null&&A(ge,e);var t=pe.current,n=Wd(t,e.type);t!==n&&(A(me,e),A(pe,n))}function j(e){me.current===e&&(fe(pe),fe(me)),ge.current===e&&(fe(ge),ep._currentValue=ce)}var M,be;function xe(e){if(M===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);M=t&&t[1]||``,be=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+M+e+be}var Se=!1;function N(e,t){if(!e||Se)return``;Se=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Se=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?xe(n):``}function P(e,t){switch(e.tag){case 26:case 27:case 5:return xe(e.type);case 16:return xe(`Lazy`);case 13:return e.child!==t&&t!==null?xe(`Suspense Fallback`):xe(`Suspense`);case 19:return xe(`SuspenseList`);case 0:case 15:return N(e.type,!1);case 11:return N(e.type.render,!1);case 1:return N(e.type,!0);case 31:return xe(`Activity`);default:return``}}function F(e){try{var t=``,n=null;do t+=P(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ce=Object.prototype.hasOwnProperty,we=t.unstable_scheduleCallback,I=t.unstable_cancelCallback,Te=t.unstable_shouldYield,Ee=t.unstable_requestPaint,De=t.unstable_now,Oe=t.unstable_getCurrentPriorityLevel,ke=t.unstable_ImmediatePriority,Ae=t.unstable_UserBlockingPriority,je=t.unstable_NormalPriority,Me=t.unstable_LowPriority,Ne=t.unstable_IdlePriority,Pe=t.log,Fe=t.unstable_setDisableYieldValue,Ie=null,Le=null;function Re(e){if(typeof Pe==`function`&&Fe(e),Le&&typeof Le.setStrictMode==`function`)try{Le.setStrictMode(Ie,e)}catch{}}var ze=Math.clz32?Math.clz32:He,Be=Math.log,Ve=Math.LN2;function He(e){return e>>>=0,e===0?32:31-(Be(e)/Ve|0)|0}var Ue=256,We=262144,Ge=4194304;function Ke(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function qe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ke(n))):i=Ke(o):i=Ke(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ke(n))):i=Ke(o)):i=Ke(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Je(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Ye(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Xe(){var e=Ge;return Ge<<=1,!(Ge&62914560)&&(Ge=4194304),e}function Ze(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Qe(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function $e(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-ze(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&et(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function et(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-ze(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function tt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ze(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function nt(e,t){var n=t&-t;return n=n&42?1:rt(n),(n&(e.suspendedLanes|t))===0?n:0}function rt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function it(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function at(){var e=k.p;return e===0?(e=window.event,e===void 0?32:gp(e.type)):e}function ot(e,t){var n=k.p;try{return k.p=e,t()}finally{k.p=n}}var st=Math.random().toString(36).slice(2),ct=`__reactFiber$`+st,lt=`__reactProps$`+st,ut=`__reactContainer$`+st,L=`__reactEvents$`+st,dt=`__reactListeners$`+st,ft=`__reactHandles$`+st,pt=`__reactResources$`+st,mt=`__reactMarker$`+st;function ht(e){delete e[ct],delete e[lt],delete e[L],delete e[dt],delete e[ft]}function gt(e){var t=e[ct];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ut]||n[ct]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=pf(e);e!==null;){if(n=e[ct])return n;e=pf(e)}return t}e=n,n=e.parentNode}return null}function _t(e){if(e=e[ct]||e[ut]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function vt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function yt(e){var t=e[pt];return t||=e[pt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function bt(e){e[mt]=!0}var xt=new Set,St={};function Ct(e,t){wt(e,t),wt(e+`Capture`,t)}function wt(e,t){for(St[e]=t,e=0;e<t.length;e++)xt.add(t[e])}var Tt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Et={},Dt={};function Ot(e){return Ce.call(Dt,e)?!0:Ce.call(Et,e)?!1:Tt.test(e)?Dt[e]=!0:(Et[e]=!0,!1)}function kt(e,t,n){if(Ot(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function At(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function jt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}function Mt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Nt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Pt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ft(e){if(!e._valueTracker){var t=Nt(e)?`checked`:`value`;e._valueTracker=Pt(e,t,``+e[t])}}function It(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Nt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Lt(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Rt=/[\n"\\]/g;function zt(e){return e.replace(Rt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Bt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Mt(t)):e.value!==``+Mt(t)&&(e.value=``+Mt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Ht(e,o,Mt(n)):Ht(e,o,Mt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Mt(s):e.removeAttribute(`name`)}function Vt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Ft(e);return}n=n==null?``:``+Mt(n),t=t==null?n:``+Mt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Ft(e)}function Ht(e,t,n){t===`number`&&Lt(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Ut(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Mt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Wt(e,t,n){if(t!=null&&(t=``+Mt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Mt(n)}function Gt(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(se(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Mt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Ft(e)}function Kt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var qt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Jt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||qt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Yt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Jt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Jt(e,o,t[o])}function Xt(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var Zt=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),Qt=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function $t(e){return Qt.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function en(){}var tn=null;function nn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var rn=null,an=null;function on(e){var t=_t(e);if(t&&(e=t.stateNode)){var n=e[lt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Bt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+zt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[lt]||null;if(!a)throw Error(i(90));Bt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&It(r)}break a;case`textarea`:Wt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Ut(e,!!n.multiple,t,!1)}}}var sn=!1;function cn(e,t,n){if(sn)return e(t,n);sn=!0;try{return e(t)}finally{if(sn=!1,(rn!==null||an!==null)&&(bu(),rn&&(t=rn,e=an,an=rn=null,on(t),e)))for(t=0;t<e.length;t++)on(e[t])}}function ln(e,t){var n=e.stateNode;if(n===null)return null;var r=n[lt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var un=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),dn=!1;if(un)try{var fn={};Object.defineProperty(fn,`passive`,{get:function(){dn=!0}}),window.addEventListener(`test`,fn,fn),window.removeEventListener(`test`,fn,fn)}catch{dn=!1}var pn=null,mn=null,hn=null;function gn(){if(hn)return hn;var e,t=mn,n=t.length,r,i=`value`in pn?pn.value:pn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return hn=i.slice(e,1<r?1-r:void 0)}function _n(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function vn(){return!0}function yn(){return!1}function bn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?vn:yn,this.isPropagationStopped=yn,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=vn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=vn)},persist:function(){},isPersistent:vn}),t}var xn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Sn=bn(xn),R=f({},xn,{view:0,detail:0}),Cn=bn(R),wn,Tn,En,Dn=f({},R,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ln,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==En&&(En&&e.type===`mousemove`?(wn=e.screenX-En.screenX,Tn=e.screenY-En.screenY):Tn=wn=0,En=e),wn)},movementY:function(e){return`movementY`in e?e.movementY:Tn}}),On=bn(Dn),kn=bn(f({},Dn,{dataTransfer:0})),An=bn(f({},R,{relatedTarget:0})),jn=bn(f({},xn,{animationName:0,elapsedTime:0,pseudoElement:0})),Mn=bn(f({},xn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Nn=bn(f({},xn,{data:0})),Pn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Fn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},In={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function z(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=In[e])?!!t[e]:!1}function Ln(){return z}var Rn=bn(f({},R,{key:function(e){if(e.key){var t=Pn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=_n(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Fn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ln,charCode:function(e){return e.type===`keypress`?_n(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?_n(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),zn=bn(f({},Dn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),B=bn(f({},R,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ln})),Bn=bn(f({},xn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Vn=bn(f({},Dn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Hn=bn(f({},xn,{newState:0,oldState:0})),Un=[9,13,27,32],Wn=un&&`CompositionEvent`in window,Gn=null;un&&`documentMode`in document&&(Gn=document.documentMode);var Kn=un&&`TextEvent`in window&&!Gn,qn=un&&(!Wn||Gn&&8<Gn&&11>=Gn),Jn=` `,Yn=!1;function Xn(e,t){switch(e){case`keyup`:return Un.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function Zn(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var Qn=!1;function V(e,t){switch(e){case`compositionend`:return Zn(t);case`keypress`:return t.which===32?(Yn=!0,Jn):null;case`textInput`:return e=t.data,e===Jn&&Yn?null:e;default:return null}}function $n(e,t){if(Qn)return e===`compositionend`||!Wn&&Xn(e,t)?(e=gn(),hn=mn=pn=null,Qn=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return qn&&t.locale!==`ko`?null:t.data;default:return null}}var er={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!er[e.type]:t===`textarea`}function nr(e,t,n,r){rn?an?an.push(r):an=[r]:rn=r,t=Dd(t,`onChange`),0<t.length&&(n=new Sn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var rr=null,ir=null;function ar(e){bd(e,0)}function or(e){if(It(vt(e)))return e}function sr(e,t){if(e===`change`)return t}var cr=!1;if(un){var lr;if(un){var ur=`oninput`in document;if(!ur){var dr=document.createElement(`div`);dr.setAttribute(`oninput`,`return;`),ur=typeof dr.oninput==`function`}lr=ur}else lr=!1;cr=lr&&(!document.documentMode||9<document.documentMode)}function fr(){rr&&(rr.detachEvent(`onpropertychange`,pr),ir=rr=null)}function pr(e){if(e.propertyName===`value`&&or(ir)){var t=[];nr(t,ir,e,nn(e)),cn(ar,t)}}function mr(e,t,n){e===`focusin`?(fr(),rr=t,ir=n,rr.attachEvent(`onpropertychange`,pr)):e===`focusout`&&fr()}function hr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return or(ir)}function gr(e,t){if(e===`click`)return or(t)}function _r(e,t){if(e===`input`||e===`change`)return or(t)}function vr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var H=typeof Object.is==`function`?Object.is:vr;function yr(e,t){if(H(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ce.call(t,i)||!H(e[i],t[i]))return!1}return!0}function br(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xr(e,t){var n=br(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=br(n)}}function Sr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Sr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Cr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Lt(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Lt(e.document)}return t}function wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Tr=un&&`documentMode`in document&&11>=document.documentMode,Er=null,Dr=null,Or=null,kr=!1;function Ar(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;kr||Er==null||Er!==Lt(r)||(r=Er,`selectionStart`in r&&wr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Or&&yr(Or,r)||(Or=r,r=Dd(Dr,`onSelect`),0<r.length&&(t=new Sn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Er)))}function jr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var U={animationend:jr(`Animation`,`AnimationEnd`),animationiteration:jr(`Animation`,`AnimationIteration`),animationstart:jr(`Animation`,`AnimationStart`),transitionrun:jr(`Transition`,`TransitionRun`),transitionstart:jr(`Transition`,`TransitionStart`),transitioncancel:jr(`Transition`,`TransitionCancel`),transitionend:jr(`Transition`,`TransitionEnd`)},Mr={},Nr={};un&&(Nr=document.createElement(`div`).style,`AnimationEvent`in window||(delete U.animationend.animation,delete U.animationiteration.animation,delete U.animationstart.animation),`TransitionEvent`in window||delete U.transitionend.transition);function Pr(e){if(Mr[e])return Mr[e];if(!U[e])return e;var t=U[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Nr)return Mr[e]=t[n];return e}var Fr=Pr(`animationend`),Ir=Pr(`animationiteration`),Lr=Pr(`animationstart`),Rr=Pr(`transitionrun`),zr=Pr(`transitionstart`),Br=Pr(`transitioncancel`),Vr=Pr(`transitionend`),Hr=new Map,Ur=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Ur.push(`scrollEnd`);function Wr(e,t){Hr.set(e,t),Ct(t,[e])}var Gr=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Kr=[],qr=0,Jr=0;function Yr(){for(var e=qr,t=Jr=qr=0;t<e;){var n=Kr[t];Kr[t++]=null;var r=Kr[t];Kr[t++]=null;var i=Kr[t];Kr[t++]=null;var a=Kr[t];if(Kr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&$r(n,i,a)}}function Xr(e,t,n,r){Kr[qr++]=e,Kr[qr++]=t,Kr[qr++]=n,Kr[qr++]=r,Jr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Zr(e,t,n,r){return Xr(e,t,n,r),ei(e)}function Qr(e,t){return Xr(e,null,null,t),ei(e)}function $r(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-ze(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ei(e){if(50<du)throw du=0,fu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ti={};function ni(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ri(e,t,n,r){return new ni(e,t,n,r)}function ii(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ai(e,t){var n=e.alternate;return n===null?(n=ri(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function oi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function si(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ii(e)&&(s=1);else if(typeof e==`string`)s=Gf(e,n,pe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case te:return e=ri(31,n,t,a),e.elementType=te,e.lanes=o,e;case y:return W(n.children,a,o,t);case b:s=8,a|=24;break;case x:return e=ri(12,n,t,a|2),e.elementType=x,e.lanes=o,e;case T:return e=ri(13,n,t,a),e.elementType=T,e.lanes=o,e;case E:return e=ri(19,n,t,a),e.elementType=E,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case ee:s=14;break a;case D:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ri(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function W(e,t,n,r){return e=ri(7,e,r,t),e.lanes=n,e}function ci(e,t,n){return e=ri(6,e,null,t),e.lanes=n,e}function li(e){var t=ri(18,null,null,0);return t.stateNode=e,t}function ui(e,t,n){return t=ri(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var di=new WeakMap;function G(e,t){if(typeof e==`object`&&e){var n=di.get(e);return n===void 0?(t={value:e,source:t,stack:F(t)},di.set(e,t),t):n}return{value:e,source:t,stack:F(t)}}var fi=[],pi=0,mi=null,hi=0,gi=[],_i=0,vi=null,yi=1,bi=``;function xi(e,t){fi[pi++]=hi,fi[pi++]=mi,mi=e,hi=t}function Si(e,t,n){gi[_i++]=yi,gi[_i++]=bi,gi[_i++]=vi,vi=e;var r=yi;e=bi;var i=32-ze(r)-1;r&=~(1<<i),n+=1;var a=32-ze(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,yi=1<<32-ze(t)+i|n<<i|r,bi=a+e}else yi=1<<a|n<<i|r,bi=e}function Ci(e){e.return!==null&&(xi(e,1),Si(e,1,0))}function wi(e){for(;e===mi;)mi=fi[--pi],fi[pi]=null,hi=fi[--pi],fi[pi]=null;for(;e===vi;)vi=gi[--_i],gi[_i]=null,bi=gi[--_i],gi[_i]=null,yi=gi[--_i],gi[_i]=null}function Ti(e,t){gi[_i++]=yi,gi[_i++]=bi,gi[_i++]=vi,yi=t.id,bi=t.overflow,vi=e}var Ei=null,K=null,q=!1,Di=null,Oi=!1,ki=Error(i(519));function Ai(e){throw Ii(G(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ki}function ji(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ct]=e,t[lt]=r,n){case`dialog`:Z(`cancel`,t),Z(`close`,t);break;case`iframe`:case`object`:case`embed`:Z(`load`,t);break;case`video`:case`audio`:for(n=0;n<vd.length;n++)Z(vd[n],t);break;case`source`:Z(`error`,t);break;case`img`:case`image`:case`link`:Z(`error`,t),Z(`load`,t);break;case`details`:Z(`toggle`,t);break;case`input`:Z(`invalid`,t),Vt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Z(`invalid`,t);break;case`textarea`:Z(`invalid`,t),Gt(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||Nd(t.textContent,n)?(r.popover!=null&&(Z(`beforetoggle`,t),Z(`toggle`,t)),r.onScroll!=null&&Z(`scroll`,t),r.onScrollEnd!=null&&Z(`scrollend`,t),r.onClick!=null&&(t.onclick=en),t=!0):t=!1,t||Ai(e,!0)}function Mi(e){for(Ei=e.return;Ei;)switch(Ei.tag){case 5:case 31:case 13:Oi=!1;return;case 27:case 3:Oi=!0;return;default:Ei=Ei.return}}function Ni(e){if(e!==Ei)return!1;if(!q)return Mi(e),q=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||Gd(e.type,e.memoizedProps)),n=!n),n&&K&&Ai(e),Mi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));K=ff(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));K=ff(e)}else t===27?(t=K,$d(e.type)?(e=df,df=null,K=e):K=t):K=Ei?uf(e.stateNode.nextSibling):null;return!0}function Pi(){K=Ei=null,q=!1}function Fi(){var e=Di;return e!==null&&(Zl===null?Zl=e:Zl.push.apply(Zl,e),Di=null),e}function Ii(e){Di===null?Di=[e]:Di.push(e)}var Li=de(null),Ri=null,zi=null;function Bi(e,t,n){A(Li,t._currentValue),t._currentValue=n}function Vi(e){e._currentValue=Li.current,fe(Li)}function Hi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Ui(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Hi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Hi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Wi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;H(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ge.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[ep]:e.push(ep))}a=a.return}e!==null&&Ui(t,e,n,r),t.flags|=262144}function Gi(e){for(e=e.firstContext;e!==null;){if(!H(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ki(e){Ri=e,zi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function qi(e){return Yi(Ri,e)}function Ji(e,t){return Ri===null&&Ki(e),Yi(e,t)}function Yi(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},zi===null){if(e===null)throw Error(i(308));zi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else zi=zi.next=t;return n}var Xi=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Zi=t.unstable_scheduleCallback,Qi=t.unstable_NormalPriority,$i={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ea(){return{controller:new Xi,data:new Map,refCount:0}}function ta(e){e.refCount--,e.refCount===0&&Zi(Qi,function(){e.controller.abort()})}var na=null,ra=0,ia=0,aa=null;function oa(e,t){if(na===null){var n=na=[];ra=0,ia=fd(),aa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ra++,t.then(sa,sa),t}function sa(){if(--ra===0&&na!==null){aa!==null&&(aa.status=`fulfilled`);var e=na;na=null,ia=0,aa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ca(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var la=O.S;O.S=function(e,t){eu=De(),typeof t==`object`&&t&&typeof t.then==`function`&&oa(e,t),la!==null&&la(e,t)};var ua=de(null);function da(){var e=ua.current;return e===null?Ll.pooledCache:e}function fa(e,t){t===null?A(ua,ua.current):A(ua,t.pool)}function pa(){var e=da();return e===null?null:{parent:$i._currentValue,pool:e}}var ma=Error(i(460)),ha=Error(i(474)),ga=Error(i(542)),_a={then:function(){}};function va(e){return e=e.status,e===`fulfilled`||e===`rejected`}function ya(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(en,en),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ca(e),e;default:if(typeof t.status==`string`)t.then(en,en);else{if(e=Ll,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ca(e),e}throw xa=t,ma}}function ba(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(xa=e,ma):e}}var xa=null;function Sa(){if(xa===null)throw Error(i(459));var e=xa;return xa=null,e}function Ca(e){if(e===ma||e===ga)throw Error(i(483))}var wa=null,Ta=0;function Ea(e){var t=Ta;return Ta+=1,wa===null&&(wa=[]),ya(wa,e,t)}function Da(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Oa(e,t){throw t.$$typeof===m?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function ka(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=ai(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=ci(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===y?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===D&&ba(i)===t.type)?(t=a(t,n.props),Da(t,n),t.return=e,t):(t=si(n.type,n.key,n.props,null,e.mode,r),Da(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=ui(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=W(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=ci(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case g:return n=si(t.type,t.key,t.props,null,e.mode,n),Da(n,t),n.return=e,n;case v:return t=ui(t,e.mode,n),t.return=e,t;case D:return t=ba(t),f(e,t,n)}if(se(t)||ie(t))return t=W(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ea(t),n);if(t.$$typeof===C)return f(e,Ji(e,t),n);Oa(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case g:return n.key===i?l(e,t,n,r):null;case v:return n.key===i?u(e,t,n,r):null;case D:return n=ba(n),p(e,t,n,r)}if(se(n)||ie(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ea(n),r);if(n.$$typeof===C)return p(e,t,Ji(e,n),r);Oa(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case g:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case v:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case D:return r=ba(r),m(e,t,n,r,i)}if(se(r)||ie(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ea(r),i);if(r.$$typeof===C)return m(e,t,n,Ji(t,r),i);Oa(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),q&&xi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return q&&xi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),q&&xi(i,h),l}function _(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),q&&xi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return q&&xi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),q&&xi(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===y&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case g:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===y){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===D&&ba(l)===r.type){n(e,r.sibling),c=a(r,o.props),Da(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===y?(c=W(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=si(o.type,o.key,o.props,null,e.mode,c),Da(c,o),c.return=e,e=c)}return s(e);case v:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=ui(o,e.mode,c),c.return=e,e=c}return s(e);case D:return o=ba(o),b(e,r,o,c)}if(se(o))return h(e,r,o,c);if(ie(o)){if(l=ie(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),_(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,Ea(o),c);if(o.$$typeof===C)return b(e,r,Ji(e,o),c);Oa(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=ci(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{Ta=0;var i=b(e,t,n,r);return wa=null,i}catch(t){if(t===ma||t===ga)throw t;var a=ri(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Aa=ka(!0),ja=ka(!1),Ma=!1;function Na(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Pa(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Fa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ia(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Il&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ei(e),$r(e,null,n),t}return Xr(e,r,t,n),ei(e)}function La(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tt(e,n)}}function Ra(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var za=!1;function Ba(){if(za){var e=aa;if(e!==null)throw e}}function Va(e,t,n,r){za=!1;var i=e.updateQueue;Ma=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var p=s.lane&-536870913,m=p!==s.lane;if(m?(X&p)===p:(r&p)===p){p!==0&&p===ia&&(za=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;p=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,p);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,p=typeof h==`function`?h.call(_,d,p):h,p==null)break a;d=f({},d,p);break a;case 2:Ma=!0}}p=s.callback,p!==null&&(e.flags|=64,m&&(e.flags|=8192),m=i.callbacks,m===null?i.callbacks=[p]:m.push(p))}else m={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=m,c=d):u=u.next=m,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Gl|=o,e.lanes=o,e.memoizedState=d}}function Ha(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Ua(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Ha(n[e],t)}var Wa=de(null),Ga=de(0);function Ka(e,t){e=Ul,A(Ga,e),A(Wa,t),Ul=e|t.baseLanes}function qa(){A(Ga,Ul),A(Wa,Wa.current)}function Ja(){Ul=Ga.current,fe(Wa),fe(Ga)}var Ya=de(null),Xa=null;function Za(e){var t=e.alternate;A(no,no.current&1),A(Ya,e),Xa===null&&(t===null||Wa.current!==null||t.memoizedState!==null)&&(Xa=e)}function Qa(e){A(no,no.current),A(Ya,e),Xa===null&&(Xa=e)}function $a(e){e.tag===22?(A(no,no.current),A(Ya,e),Xa===null&&(Xa=e)):eo(e)}function eo(){A(no,no.current),A(Ya,Ya.current)}function to(e){fe(Ya),Xa===e&&(Xa=null),fe(no)}var no=de(0);function ro(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||sf(n)||cf(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder===`forwards`||t.memoizedProps.revealOrder===`backwards`||t.memoizedProps.revealOrder===`unstable_legacy-backwards`||t.memoizedProps.revealOrder===`together`)){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var io=0,J=null,ao=null,oo=null,so=!1,co=!1,lo=!1,uo=0,fo=0,po=null,mo=0;function ho(){throw Error(i(321))}function go(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!H(e[n],t[n]))return!1;return!0}function _o(e,t,n,r,i,a){return io=a,J=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,O.H=e===null||e.memoizedState===null?Ps:Fs,lo=!1,a=n(r,i),lo=!1,co&&(a=yo(t,n,r,i)),vo(e),a}function vo(e){O.H=Ns;var t=ao!==null&&ao.next!==null;if(io=0,oo=ao=J=null,so=!1,fo=0,po=null,t)throw Error(i(300));e===null||Qs||(e=e.dependencies,e!==null&&Gi(e)&&(Qs=!0))}function yo(e,t,n,r){J=e;var a=0;do{if(co&&(po=null),fo=0,co=!1,25<=a)throw Error(i(301));if(a+=1,oo=ao=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}O.H=Is,o=t(n,r)}while(co);return o}function bo(){var e=O.H,t=e.useState()[0];return t=typeof t.then==`function`?Do(t):t,e=e.useState()[0],(ao===null?null:ao.memoizedState)!==e&&(J.flags|=1024),t}function xo(){var e=uo!==0;return uo=0,e}function So(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Co(e){if(so){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}so=!1}io=0,oo=ao=J=null,co=!1,fo=uo=0,po=null}function wo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return oo===null?J.memoizedState=oo=e:oo=oo.next=e,oo}function To(){if(ao===null){var e=J.alternate;e=e===null?null:e.memoizedState}else e=ao.next;var t=oo===null?J.memoizedState:oo.next;if(t!==null)oo=t,ao=e;else{if(e===null)throw J.alternate===null?Error(i(467)):Error(i(310));ao=e,e={memoizedState:ao.memoizedState,baseState:ao.baseState,baseQueue:ao.baseQueue,queue:ao.queue,next:null},oo===null?J.memoizedState=oo=e:oo=oo.next=e}return oo}function Eo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Do(e){var t=fo;return fo+=1,po===null&&(po=[]),e=ya(po,e,t),t=J,(oo===null?t.memoizedState:oo.next)===null&&(t=t.alternate,O.H=t===null||t.memoizedState===null?Ps:Fs),e}function Oo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Do(e);if(e.$$typeof===C)return qi(e)}throw Error(i(438,String(e)))}function ko(e){var t=null,n=J.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=J.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Eo(),J.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function Ao(e,t){return typeof t==`function`?t(e):t}function jo(e){return Mo(To(),ao,e)}function Mo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(io&f)===f:(X&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===ia&&(d=!0);else if((io&p)===p){u=u.next,p===ia&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,J.lanes|=p,Gl|=p;f=u.action,lo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,J.lanes|=f,Gl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!H(o,e.memoizedState)&&(Qs=!0,d&&(n=aa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function No(e){var t=To(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);H(o,t.memoizedState)||(Qs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Po(e,t,n){var r=J,a=To(),o=q;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!H((ao||a).memoizedState,n);if(s&&(a.memoizedState=n,Qs=!0),a=a.queue,as(Lo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||oo!==null&&oo.memoizedState.tag&1){if(r.flags|=2048,es(9,{destroy:void 0},Io.bind(null,r,a,n,t),null),Ll===null)throw Error(i(349));o||io&127||Fo(r,t,n)}return n}function Fo(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=J.updateQueue,t===null?(t=Eo(),J.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Io(e,t,n,r){t.value=n,t.getSnapshot=r,Ro(t)&&zo(e)}function Lo(e,t,n){return n(function(){Ro(t)&&zo(e)})}function Ro(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!H(e,n)}catch{return!0}}function zo(e){var t=Qr(e,2);t!==null&&hu(t,e,2)}function Bo(e){var t=wo();if(typeof e==`function`){var n=e;if(e=n(),lo){Re(!0);try{n()}finally{Re(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:e},t}function Vo(e,t,n,r){return e.baseState=n,Mo(e,ao,typeof r==`function`?r:Ao)}function Ho(e,t,n,r,a){if(As(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};O.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Uo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Uo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=O.T,o={};O.T=o;try{var s=n(i,r),c=O.S;c!==null&&c(o,s),Wo(e,t,s)}catch(n){Ko(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),O.T=a}}else try{a=n(i,r),Wo(e,t,a)}catch(n){Ko(e,t,n)}}function Wo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Go(e,t,n)},function(n){return Ko(e,t,n)}):Go(e,t,n)}function Go(e,t,n){t.status=`fulfilled`,t.value=n,qo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Uo(e,n)))}function Ko(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,qo(t),t=t.next;while(t!==r)}e.action=null}function qo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Jo(e,t){return t}function Yo(e,t){if(q){var n=Ll.formState;if(n!==null){a:{var r=J;if(q){if(K){b:{for(var i=K,a=Oi;i.nodeType!==8;){if(!a){i=null;break b}if(i=uf(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){K=uf(i.nextSibling),r=i.data===`F!`;break a}}Ai(r)}r=!1}r&&(t=n[0])}}return n=wo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Jo,lastRenderedState:t},n.queue=r,n=Ds.bind(null,J,r),r.dispatch=n,r=Bo(!1),a=ks.bind(null,J,!1,r.queue),r=wo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Ho.bind(null,J,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Xo(e){return Zo(To(),ao,e)}function Zo(e,t,n){if(t=Mo(e,t,Jo)[0],e=jo(Ao)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Do(t)}catch(e){throw e===ma?ga:e}else r=t;t=To();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(J.flags|=2048,es(9,{destroy:void 0},Qo.bind(null,i,n),null)),[r,a,e]}function Qo(e,t){e.action=t}function $o(e){var t=To(),n=ao;if(n!==null)return Zo(t,n,e);To(),t=t.memoizedState,n=To();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function es(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=J.updateQueue,t===null&&(t=Eo(),J.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function ts(){return To().memoizedState}function ns(e,t,n,r){var i=wo();J.flags|=e,i.memoizedState=es(1|t,{destroy:void 0},n,r===void 0?null:r)}function rs(e,t,n,r){var i=To();r=r===void 0?null:r;var a=i.memoizedState.inst;ao!==null&&r!==null&&go(r,ao.memoizedState.deps)?i.memoizedState=es(t,a,n,r):(J.flags|=e,i.memoizedState=es(1|t,a,n,r))}function is(e,t){ns(8390656,8,e,t)}function as(e,t){rs(2048,8,e,t)}function os(e){J.flags|=4;var t=J.updateQueue;if(t===null)t=Eo(),J.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function ss(e){var t=To().memoizedState;return os({ref:t,nextImpl:e}),function(){if(Il&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function cs(e,t){return rs(4,2,e,t)}function ls(e,t){return rs(4,4,e,t)}function us(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ds(e,t,n){n=n==null?null:n.concat([e]),rs(4,4,us.bind(null,t,e),n)}function fs(){}function ps(e,t){var n=To();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&go(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function ms(e,t){var n=To();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&go(t,r[1]))return r[0];if(r=e(),lo){Re(!0);try{e()}finally{Re(!1)}}return n.memoizedState=[r,t],r}function hs(e,t,n){return n===void 0||io&1073741824&&!(X&261930)?e.memoizedState=t:(e.memoizedState=n,e=mu(),J.lanes|=e,Gl|=e,n)}function gs(e,t,n,r){return H(n,t)?n:Wa.current===null?!(io&42)||io&1073741824&&!(X&261930)?(Qs=!0,e.memoizedState=n):(e=mu(),J.lanes|=e,Gl|=e,t):(e=hs(e,n,r),H(e,t)||(Qs=!0),e)}function _s(e,t,n,r,i){var a=k.p;k.p=a!==0&&8>a?a:8;var o=O.T,s={};O.T=s,ks(e,!1,t,n);try{var c=i(),l=O.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?Os(e,t,ca(c,r),pu(e)):Os(e,t,r,pu(e))}catch(n){Os(e,t,{then:function(){},status:`rejected`,reason:n},pu())}finally{k.p=a,o!==null&&s.types!==null&&(o.types=s.types),O.T=o}}function vs(){}function ys(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=bs(e).queue;_s(e,a,t,ce,n===null?vs:function(){return xs(e),n(r)})}function bs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ce,baseState:ce,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:ce},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function xs(e){var t=bs(e);t.next===null&&(t=e.alternate.memoizedState),Os(e,t.next.queue,{},pu())}function Ss(){return qi(ep)}function Cs(){return To().memoizedState}function ws(){return To().memoizedState}function Ts(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=pu();e=Fa(n);var r=Ia(t,e,n);r!==null&&(hu(r,t,n),La(r,t,n)),t={cache:ea()},e.payload=t;return}t=t.return}}function Es(e,t,n){var r=pu();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},As(e)?js(t,n):(n=Zr(e,t,n,r),n!==null&&(hu(n,e,r),Ms(n,t,r)))}function Ds(e,t,n){Os(e,t,n,pu())}function Os(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(As(e))js(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,H(s,o))return Xr(e,t,i,0),Ll===null&&Yr(),!1}catch{}if(n=Zr(e,t,i,r),n!==null)return hu(n,e,r),Ms(n,t,r),!0}return!1}function ks(e,t,n,r){if(r={lane:2,revertLane:fd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},As(e)){if(t)throw Error(i(479))}else t=Zr(e,n,r,2),t!==null&&hu(t,e,2)}function As(e){var t=e.alternate;return e===J||t!==null&&t===J}function js(e,t){co=so=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Ms(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tt(e,n)}}var Ns={readContext:qi,use:Oo,useCallback:ho,useContext:ho,useEffect:ho,useImperativeHandle:ho,useLayoutEffect:ho,useInsertionEffect:ho,useMemo:ho,useReducer:ho,useRef:ho,useState:ho,useDebugValue:ho,useDeferredValue:ho,useTransition:ho,useSyncExternalStore:ho,useId:ho,useHostTransitionStatus:ho,useFormState:ho,useActionState:ho,useOptimistic:ho,useMemoCache:ho,useCacheRefresh:ho};Ns.useEffectEvent=ho;var Ps={readContext:qi,use:Oo,useCallback:function(e,t){return wo().memoizedState=[e,t===void 0?null:t],e},useContext:qi,useEffect:is,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),ns(4194308,4,us.bind(null,t,e),n)},useLayoutEffect:function(e,t){return ns(4194308,4,e,t)},useInsertionEffect:function(e,t){ns(4,2,e,t)},useMemo:function(e,t){var n=wo();t=t===void 0?null:t;var r=e();if(lo){Re(!0);try{e()}finally{Re(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=wo();if(n!==void 0){var i=n(t);if(lo){Re(!0);try{n(t)}finally{Re(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Es.bind(null,J,e),[r.memoizedState,e]},useRef:function(e){var t=wo();return e={current:e},t.memoizedState=e},useState:function(e){e=Bo(e);var t=e.queue,n=Ds.bind(null,J,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:fs,useDeferredValue:function(e,t){return hs(wo(),e,t)},useTransition:function(){var e=Bo(!1);return e=_s.bind(null,J,e.queue,!0,!1),wo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=J,a=wo();if(q){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Ll===null)throw Error(i(349));X&127||Fo(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,is(Lo.bind(null,r,o,e),[e]),r.flags|=2048,es(9,{destroy:void 0},Io.bind(null,r,o,n,t),null),n},useId:function(){var e=wo(),t=Ll.identifierPrefix;if(q){var n=bi,r=yi;n=(r&~(1<<32-ze(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=uo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=mo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:Ss,useFormState:Yo,useActionState:Yo,useOptimistic:function(e){var t=wo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=ks.bind(null,J,!0,n),n.dispatch=t,[e,t]},useMemoCache:ko,useCacheRefresh:function(){return wo().memoizedState=Ts.bind(null,J)},useEffectEvent:function(e){var t=wo(),n={impl:e};return t.memoizedState=n,function(){if(Il&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},Fs={readContext:qi,use:Oo,useCallback:ps,useContext:qi,useEffect:as,useImperativeHandle:ds,useInsertionEffect:cs,useLayoutEffect:ls,useMemo:ms,useReducer:jo,useRef:ts,useState:function(){return jo(Ao)},useDebugValue:fs,useDeferredValue:function(e,t){return gs(To(),ao.memoizedState,e,t)},useTransition:function(){var e=jo(Ao)[0],t=To().memoizedState;return[typeof e==`boolean`?e:Do(e),t]},useSyncExternalStore:Po,useId:Cs,useHostTransitionStatus:Ss,useFormState:Xo,useActionState:Xo,useOptimistic:function(e,t){return Vo(To(),ao,e,t)},useMemoCache:ko,useCacheRefresh:ws};Fs.useEffectEvent=ss;var Is={readContext:qi,use:Oo,useCallback:ps,useContext:qi,useEffect:as,useImperativeHandle:ds,useInsertionEffect:cs,useLayoutEffect:ls,useMemo:ms,useReducer:No,useRef:ts,useState:function(){return No(Ao)},useDebugValue:fs,useDeferredValue:function(e,t){var n=To();return ao===null?hs(n,e,t):gs(n,ao.memoizedState,e,t)},useTransition:function(){var e=No(Ao)[0],t=To().memoizedState;return[typeof e==`boolean`?e:Do(e),t]},useSyncExternalStore:Po,useId:Cs,useHostTransitionStatus:Ss,useFormState:$o,useActionState:$o,useOptimistic:function(e,t){var n=To();return ao===null?(n.baseState=e,[e,n.queue.dispatch]):Vo(n,ao,e,t)},useMemoCache:ko,useCacheRefresh:ws};Is.useEffectEvent=ss;function Ls(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:f({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Rs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Fa(r);i.payload=t,n!=null&&(i.callback=n),t=Ia(e,i,r),t!==null&&(hu(t,e,r),La(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=pu(),i=Fa(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Ia(e,i,r),t!==null&&(hu(t,e,r),La(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=pu(),r=Fa(n);r.tag=2,t!=null&&(r.callback=t),t=Ia(e,r,n),t!==null&&(hu(t,e,n),La(t,e,n))}};function zs(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!yr(n,r)||!yr(i,a):!0}function Bs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Rs.enqueueReplaceState(t,t.state,null)}function Vs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=f({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function Hs(e){Gr(e)}function Us(e){console.error(e)}function Ws(e){Gr(e)}function Gs(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ks(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function qs(e,t,n){return n=Fa(n),n.tag=3,n.payload={element:null},n.callback=function(){Gs(e,t)},n}function Js(e){return e=Fa(e),e.tag=3,e}function Ys(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ks(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ks(t,n,r),typeof i!=`function`&&(ru===null?ru=new Set([this]):ru.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Xs(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Wi(t,n,a,!0),n=Ya.current,n!==null){switch(n.tag){case 31:case 13:return Xa===null?Du():n.alternate===null&&Wl===0&&(Wl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===_a?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Ku(e,r,a)),!1;case 22:return n.flags|=65536,r===_a?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Ku(e,r,a)),!1}throw Error(i(435,n.tag))}return Ku(e,r,a),Du(),!1}if(q)return t=Ya.current,t===null?(r!==ki&&(t=Error(i(423),{cause:r}),Ii(G(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=G(r,n),a=qs(e.stateNode,r,a),Ra(e,a),Wl!==4&&(Wl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ki&&(e=Error(i(422),{cause:r}),Ii(G(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=G(o,n),Xl===null?Xl=[o]:Xl.push(o),Wl!==4&&(Wl=2),t===null)return!0;r=G(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=qs(n.stateNode,r,e),Ra(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(ru===null||!ru.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Js(a),Ys(a,e,n,r),Ra(n,a),!1}n=n.return}while(n!==null);return!1}var Zs=Error(i(461)),Qs=!1;function $s(e,t,n,r){t.child=e===null?ja(t,null,n,r):Aa(t,e.child,n,r)}function ec(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ki(t),r=_o(e,t,n,o,a,i),s=xo(),e!==null&&!Qs?(So(e,t,i),wc(e,t,i)):(q&&s&&Ci(t),t.flags|=1,$s(e,t,r,i),t.child)}function tc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ii(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,nc(e,t,a,r,i)):(e=si(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!Tc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?yr:n,n(o,r)&&e.ref===t.ref)return wc(e,t,i)}return t.flags|=1,e=ai(a,r),e.ref=t.ref,e.return=t,t.child=e}function nc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(yr(a,r)&&e.ref===t.ref)if(Qs=!1,t.pendingProps=r=a,Tc(e,i))e.flags&131072&&(Qs=!0);else return t.lanes=e.lanes,wc(e,t,i)}return uc(e,t,n,r,i)}function rc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return ac(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&fa(t,a===null?null:a.cachePool),a===null?qa():Ka(t,a),$a(t);else return r=t.lanes=536870912,ac(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&fa(t,null),qa(),eo(t)):(fa(t,a.cachePool),Ka(t,a),eo(t),t.memoizedState=null);return $s(e,t,i,n),t.child}function ic(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function ac(e,t,n,r,i){var a=da();return a=a===null?null:{parent:$i._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&fa(t,null),qa(),$a(t),e!==null&&Wi(e,t,r,!0),t.childLanes=i,null}function oc(e,t){return t=yc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function sc(e,t,n){return Aa(t,e.child,null,n),e=oc(t,t.pendingProps),e.flags|=2,to(t),t.memoizedState=null,e}function cc(e,t,n){var r=t.pendingProps,a=(t.flags&128)!=0;if(t.flags&=-129,e===null){if(q){if(r.mode===`hidden`)return e=oc(t,r),t.lanes=536870912,ic(null,e);if(Qa(t),(e=K)?(e=of(e,Oi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:vi===null?null:{id:yi,overflow:bi},retryLane:536870912,hydrationErrors:null},n=li(e),n.return=t,t.child=n,Ei=t,K=null)):e=null,e===null)throw Ai(t);return t.lanes=536870912,null}return oc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Qa(t),a)if(t.flags&256)t.flags&=-257,t=sc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558));else if(Qs||Wi(e,t,n,!1),a=(n&e.childLanes)!==0,Qs||a){if(r=Ll,r!==null&&(s=nt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Qr(e,s),hu(r,e,s),Zs;Du(),t=sc(e,t,n)}else e=o.treeContext,K=uf(s.nextSibling),Ei=t,q=!0,Di=null,Oi=!1,e!==null&&Ti(t,e),t=oc(t,r),t.flags|=4096;return t}return e=ai(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function lc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function uc(e,t,n,r,i){return Ki(t),n=_o(e,t,n,r,void 0,i),r=xo(),e!==null&&!Qs?(So(e,t,i),wc(e,t,i)):(q&&r&&Ci(t),t.flags|=1,$s(e,t,n,i),t.child)}function dc(e,t,n,r,i,a){return Ki(t),t.updateQueue=null,n=yo(t,r,n,i),vo(e),r=xo(),e!==null&&!Qs?(So(e,t,a),wc(e,t,a)):(q&&r&&Ci(t),t.flags|=1,$s(e,t,n,a),t.child)}function fc(e,t,n,r,i){if(Ki(t),t.stateNode===null){var a=ti,o=n.contextType;typeof o==`object`&&o&&(a=qi(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Rs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Na(t),o=n.contextType,a.context=typeof o==`object`&&o?qi(o):ti,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Ls(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Rs.enqueueReplaceState(a,a.state,null),Va(t,r,a,i),Ba(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Vs(n,s);a.props=c;var l=a.context,u=n.contextType;o=ti,typeof u==`object`&&u&&(o=qi(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Bs(t,a,r,o),Ma=!1;var f=t.memoizedState;a.state=f,Va(t,r,a,i),Ba(),l=t.memoizedState,s||f!==l||Ma?(typeof d==`function`&&(Ls(t,n,d,r),l=t.memoizedState),(c=Ma||zs(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Pa(e,t),o=t.memoizedProps,u=Vs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ti,typeof l==`object`&&l&&(c=qi(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Bs(t,a,r,c),Ma=!1,f=t.memoizedState,a.state=f,Va(t,r,a,i),Ba();var p=t.memoizedState;o!==d||f!==p||Ma||e!==null&&e.dependencies!==null&&Gi(e.dependencies)?(typeof s==`function`&&(Ls(t,n,s,r),p=t.memoizedState),(u=Ma||zs(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Gi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,lc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Aa(t,e.child,null,i),t.child=Aa(t,null,n,i)):$s(e,t,n,i),t.memoizedState=a.state,e=t.child):e=wc(e,t,i),e}function pc(e,t,n,r){return Pi(),t.flags|=256,$s(e,t,n,r),t.child}var mc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function hc(e){return{baseLanes:e,cachePool:pa()}}function gc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Jl),e}function _c(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(no.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(q){if(a?Za(t):eo(t),(e=K)?(e=of(e,Oi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:vi===null?null:{id:yi,overflow:bi},retryLane:536870912,hydrationErrors:null},n=li(e),n.return=t,t.child=n,Ei=t,K=null)):e=null,e===null)throw Ai(t);return cf(e)?t.lanes=32:t.lanes=536870912,null}var c=r.children;return r=r.fallback,a?(eo(t),a=t.mode,c=yc({mode:`hidden`,children:c},a),r=W(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,r=t.child,r.memoizedState=hc(n),r.childLanes=gc(e,s,n),t.memoizedState=mc,ic(null,r)):(Za(t),vc(t,c))}var l=e.memoizedState;if(l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(Za(t),t.flags&=-257,t=bc(e,t,n)):t.memoizedState===null?(eo(t),c=r.fallback,a=t.mode,r=yc({mode:`visible`,children:r.children},a),c=W(c,a,n,null),c.flags|=2,r.return=t,c.return=t,r.sibling=c,t.child=r,Aa(t,e.child,null,n),r=t.child,r.memoizedState=hc(n),r.childLanes=gc(e,s,n),t.memoizedState=mc,t=ic(null,r)):(eo(t),t.child=e.child,t.flags|=128,t=null);else if(Za(t),cf(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Ii({value:r,source:null,stack:null}),t=bc(e,t,n)}else if(Qs||Wi(e,t,n,!1),s=(n&e.childLanes)!==0,Qs||s){if(s=Ll,s!==null&&(r=nt(s,n),r!==0&&r!==l.retryLane))throw l.retryLane=r,Qr(e,r),hu(s,e,r),Zs;sf(c)||Du(),t=bc(e,t,n)}else sf(c)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,K=uf(c.nextSibling),Ei=t,q=!0,Di=null,Oi=!1,e!==null&&Ti(t,e),t=vc(t,r.children),t.flags|=4096);return t}return a?(eo(t),c=r.fallback,a=t.mode,l=e.child,u=l.sibling,r=ai(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(c=W(c,a,n,null),c.flags|=2):c=ai(u,c),c.return=t,r.return=t,r.sibling=c,t.child=r,ic(null,r),r=t.child,c=e.child.memoizedState,c===null?c=hc(n):(a=c.cachePool,a===null?a=pa():(l=$i._currentValue,a=a.parent===l?a:{parent:l,pool:l}),c={baseLanes:c.baseLanes|n,cachePool:a}),r.memoizedState=c,r.childLanes=gc(e,s,n),t.memoizedState=mc,ic(e.child,r)):(Za(t),n=e.child,e=n.sibling,n=ai(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function vc(e,t){return t=yc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function yc(e,t){return e=ri(22,e,null,t),e.lanes=0,e}function bc(e,t,n){return Aa(t,e.child,null,n),e=vc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function xc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Hi(e.return,t,n)}function Sc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Cc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=no.current,s=(o&2)!=0;if(s?(o=o&1|2,t.flags|=128):o&=1,A(no,o),$s(e,t,r,n),r=q?hi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&xc(e,n,t);else if(e.tag===19)xc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ro(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Sc(t,!1,i,n,a,r);break;case`backwards`:case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ro(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Sc(t,!0,n,null,a,r);break;case`together`:Sc(t,!1,null,null,void 0,r);break;default:t.memoizedState=null}return t.child}function wc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Gl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Wi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=ai(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ai(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Tc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Gi(e))):!0}function Ec(e,t,n){switch(t.tag){case 3:_e(t,t.stateNode.containerInfo),Bi(t,$i,e.memoizedState.cache),Pi();break;case 27:case 5:ye(t);break;case 4:_e(t,t.stateNode.containerInfo);break;case 10:Bi(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Qa(t),null;break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(Za(t),e=wc(e,t,n),e===null?null:e.sibling):_c(e,t,n):(Za(t),t.flags|=128,null);Za(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Wi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Cc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),A(no,no.current),r)break;return null;case 22:return t.lanes=0,rc(e,t,n,t.pendingProps);case 24:Bi(t,$i,e.memoizedState.cache)}return wc(e,t,n)}function Dc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Qs=!0;else{if(!Tc(e,n)&&!(t.flags&128))return Qs=!1,Ec(e,t,n);Qs=!!(e.flags&131072)}else Qs=!1,q&&t.flags&1048576&&Si(t,hi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=ba(t.elementType),t.type=e,typeof e==`function`)ii(e)?(r=Vs(e,r),t.tag=1,t=fc(null,t,e,r,n)):(t.tag=0,t=uc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===w){t.tag=11,t=ec(null,t,e,r,n);break a}else if(a===ee){t.tag=14,t=tc(null,t,e,r,n);break a}}throw t=oe(e)||e,Error(i(306,t,``))}}return t;case 0:return uc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Vs(r,t.pendingProps),fc(e,t,r,a,n);case 3:a:{if(_e(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Pa(e,t),Va(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Bi(t,$i,r),r!==o.cache&&Ui(t,[$i],n,!0),Ba(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=pc(e,t,r,n);break a}else if(r!==a){a=G(Error(i(424)),t),Ii(a),t=pc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(K=uf(e.firstChild),Ei=t,q=!0,Di=null,Oi=!0,n=ja(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Pi(),r===a){t=wc(e,t,n);break a}$s(e,t,r,n)}t=t.child}return t;case 26:return lc(e,t),e===null?(n=jf(t.type,null,t.pendingProps,null))?t.memoizedState=n:q||(n=t.type,e=t.pendingProps,r=Hd(he.current).createElement(n),r[ct]=t,r[lt]=e,Id(r,n,e),bt(r),t.stateNode=r):t.memoizedState=jf(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ye(t),e===null&&q&&(r=t.stateNode=mf(t.type,t.pendingProps,he.current),Ei=t,Oi=!0,a=K,$d(t.type)?(df=a,K=uf(r.firstChild)):K=a),$s(e,t,t.pendingProps.children,n),lc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&q&&((a=r=K)&&(r=rf(r,t.type,t.pendingProps,Oi),r===null?a=!1:(t.stateNode=r,Ei=t,K=uf(r.firstChild),Oi=!1,a=!0)),a||Ai(t)),ye(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,Gd(a,o)?r=null:s!==null&&Gd(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=_o(e,t,bo,null,null,n),ep._currentValue=a),lc(e,t),$s(e,t,r,n),t.child;case 6:return e===null&&q&&((e=n=K)&&(n=af(n,t.pendingProps,Oi),n===null?e=!1:(t.stateNode=n,Ei=t,K=null,e=!0)),e||Ai(t)),null;case 13:return _c(e,t,n);case 4:return _e(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Aa(t,null,r,n):$s(e,t,r,n),t.child;case 11:return ec(e,t,t.type,t.pendingProps,n);case 7:return $s(e,t,t.pendingProps,n),t.child;case 8:return $s(e,t,t.pendingProps.children,n),t.child;case 12:return $s(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Bi(t,t.type,r.value),$s(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Ki(t),a=qi(a),r=r(a),t.flags|=1,$s(e,t,r,n),t.child;case 14:return tc(e,t,t.type,t.pendingProps,n);case 15:return nc(e,t,t.type,t.pendingProps,n);case 19:return Cc(e,t,n);case 31:return cc(e,t,n);case 22:return rc(e,t,n,t.pendingProps);case 24:return Ki(t),r=qi($i),e===null?(a=da(),a===null&&(a=Ll,o=ea(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Na(t),Bi(t,$i,a)):((e.lanes&n)!==0&&(Pa(e,t),Va(t,null,null,n),Ba()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Bi(t,$i,r),r!==a.cache&&Ui(t,[$i],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Bi(t,$i,r))),$s(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Oc(e){e.flags|=4}function kc(e,t,n,r,i){if((t=(e.mode&32)!=0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(wu())e.flags|=8192;else throw xa=_a,ha}else e.flags&=-16777217}function Ac(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Kf(t))if(wu())e.flags|=8192;else throw xa=_a,ha}function jc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Xe(),e.lanes|=t,Yl|=t)}function Mc(e,t){if(!q)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Nc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Pc(e,t,n){var r=t.pendingProps;switch(wi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Nc(t),null;case 1:return Nc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Vi($i),ve(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ni(t)?Oc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Fi())),Nc(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(Oc(t),o===null?(Nc(t),kc(t,a,null,r,n)):(Nc(t),Ac(t,o))):o?o===e.memoizedState?(Nc(t),t.flags&=-16777217):(Oc(t),Nc(t),Ac(t,o)):(e=e.memoizedProps,e!==r&&Oc(t),Nc(t),kc(t,a,e,r,n)),null;case 27:if(j(t),n=he.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Nc(t),null}e=pe.current,Ni(t)?ji(t,e):(e=mf(a,r,n),t.stateNode=e,Oc(t))}return Nc(t),null;case 5:if(j(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Nc(t),null}if(o=pe.current,Ni(t))ji(t,o);else{var s=Hd(he.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[ct]=t,o[lt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(Id(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&Oc(t)}}return Nc(t),kc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Oc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=he.current,Ni(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ei,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[ct]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||Nd(e.nodeValue,n)),e||Ai(t,!0)}else e=Hd(e).createTextNode(r),e[ct]=t,t.stateNode=e}return Nc(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Ni(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[ct]=t}else Pi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Nc(t),e=!1}else n=Fi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(to(t),t):(to(t),null);if(t.flags&128)throw Error(i(558))}return Nc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ni(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[ct]=t}else Pi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Nc(t),a=!1}else a=Fi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(to(t),t):(to(t),null)}return to(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),jc(t,t.updateQueue),Nc(t),null);case 4:return ve(),e===null&&Cd(t.stateNode.containerInfo),Nc(t),null;case 10:return Vi(t.type),Nc(t),null;case 19:if(fe(no),r=t.memoizedState,r===null)return Nc(t),null;if(a=(t.flags&128)!=0,o=r.rendering,o===null)if(a)Mc(r,!1);else{if(Wl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ro(e),o!==null){for(t.flags|=128,Mc(r,!1),e=o.updateQueue,t.updateQueue=e,jc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)oi(n,e),n=n.sibling;return A(no,no.current&1|2),q&&xi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&De()>tu&&(t.flags|=128,a=!0,Mc(r,!1),t.lanes=4194304)}else{if(!a)if(e=ro(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,jc(t,e),Mc(r,!0),r.tail===null&&r.tailMode===`hidden`&&!o.alternate&&!q)return Nc(t),null}else 2*De()-r.renderingStartTime>tu&&n!==536870912&&(t.flags|=128,a=!0,Mc(r,!1),t.lanes=4194304);r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}return r.tail===null?(Nc(t),null):(e=r.tail,r.rendering=e,r.tail=e.sibling,r.renderingStartTime=De(),e.sibling=null,n=no.current,A(no,a?n&1|2:n&1),q&&xi(t,r.treeForkCount),e);case 22:case 23:return to(t),Ja(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Nc(t),t.subtreeFlags&6&&(t.flags|=8192)):Nc(t),n=t.updateQueue,n!==null&&jc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&fe(ua),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Vi($i),Nc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Fc(e,t){switch(wi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Vi($i),ve(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return j(t),null;case 31:if(t.memoizedState!==null){if(to(t),t.alternate===null)throw Error(i(340));Pi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(to(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Pi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return fe(no),null;case 4:return ve(),null;case 10:return Vi(t.type),null;case 22:case 23:return to(t),Ja(),e!==null&&fe(ua),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Vi($i),null;case 25:return null;default:return null}}function Ic(e,t){switch(wi(t),t.tag){case 3:Vi($i),ve();break;case 26:case 27:case 5:j(t);break;case 4:ve();break;case 31:t.memoizedState!==null&&to(t);break;case 13:to(t);break;case 19:fe(no);break;case 10:Vi(t.type);break;case 22:case 23:to(t),Ja(),e!==null&&fe(ua);break;case 24:Vi($i)}}function Lc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Gu(t,t.return,e)}}function Rc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Gu(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Gu(t,t.return,e)}}function zc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Ua(t,n)}catch(t){Gu(e,e.return,t)}}}function Bc(e,t,n){n.props=Vs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Gu(e,t,n)}}function Vc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Gu(e,t,n)}}function Hc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Gu(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Gu(e,t,n)}else n.current=null}function Uc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Gu(e,e.return,t)}}function Wc(e,t,n){try{var r=e.stateNode;Ld(r,e.type,n,t),r[lt]=t}catch(t){Gu(e,e.return,t)}}function Gc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&$d(e.type)||e.tag===4}function Kc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Gc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&$d(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function qc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=en));else if(r!==4&&(r===27&&$d(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(qc(e,t,n),e=e.sibling;e!==null;)qc(e,t,n),e=e.sibling}function Jc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&$d(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Jc(e,t,n),e=e.sibling;e!==null;)Jc(e,t,n),e=e.sibling}function Yc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Id(t,r,n),t[ct]=e,t[lt]=n}catch(t){Gu(e,e.return,t)}}var Xc=!1,Zc=!1,Qc=!1,$c=typeof WeakSet==`function`?WeakSet:Set,el=null;function tl(e,t){if(e=e.containerInfo,Bd=lp,e=Cr(e),wr(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(Vd={focusedElem:e,selectionRange:n},lp=!1,el=t;el!==null;)if(t=el,e=t.child,t.subtreeFlags&1028&&e!==null)e.return=t,el=e;else for(;el!==null;){switch(t=el,o=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e===null?null:e.events,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Vs(n.type,a);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Gu(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)nf(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:nf(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,el=e;break}el=t.return}}function nl(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:_l(e,n),r&4&&Lc(5,n);break;case 1:if(_l(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Gu(n,n.return,e)}else{var i=Vs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Gu(n,n.return,e)}}r&64&&zc(n),r&512&&Vc(n,n.return);break;case 3:if(_l(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Ua(e,t)}catch(e){Gu(n,n.return,e)}}break;case 27:t===null&&r&4&&Yc(n);case 26:case 5:_l(e,n),t===null&&r&4&&Uc(n),r&512&&Vc(n,n.return);break;case 12:_l(e,n);break;case 31:_l(e,n),r&4&&cl(e,n);break;case 13:_l(e,n),r&4&&ll(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Yu.bind(null,n),lf(e,n))));break;case 22:if(r=n.memoizedState!==null||Xc,!r){t=t!==null&&t.memoizedState!==null||Zc,i=Xc;var a=Zc;Xc=r,(Zc=t)&&!a?yl(e,n,(n.subtreeFlags&8772)!=0):_l(e,n),Xc=i,Zc=a}break;case 30:break;default:_l(e,n)}}function rl(e){var t=e.alternate;t!==null&&(e.alternate=null,rl(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ht(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var il=null,al=!1;function ol(e,t,n){for(n=n.child;n!==null;)sl(e,t,n),n=n.sibling}function sl(e,t,n){if(Le&&typeof Le.onCommitFiberUnmount==`function`)try{Le.onCommitFiberUnmount(Ie,n)}catch{}switch(n.tag){case 26:Zc||Hc(n,t),ol(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Zc||Hc(n,t);var r=il,i=al;$d(n.type)&&(il=n.stateNode,al=!1),ol(e,t,n),hf(n.stateNode),il=r,al=i;break;case 5:Zc||Hc(n,t);case 6:if(r=il,i=al,il=null,ol(e,t,n),il=r,al=i,il!==null)if(al)try{(il.nodeType===9?il.body:il.nodeName===`HTML`?il.ownerDocument.body:il).removeChild(n.stateNode)}catch(e){Gu(n,t,e)}else try{il.removeChild(n.stateNode)}catch(e){Gu(n,t,e)}break;case 18:il!==null&&(al?(e=il,ef(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Q(e)):ef(il,n.stateNode));break;case 4:r=il,i=al,il=n.stateNode.containerInfo,al=!0,ol(e,t,n),il=r,al=i;break;case 0:case 11:case 14:case 15:Rc(2,n,t),Zc||Rc(4,n,t),ol(e,t,n);break;case 1:Zc||(Hc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Bc(n,t,r)),ol(e,t,n);break;case 21:ol(e,t,n);break;case 22:Zc=(r=Zc)||n.memoizedState!==null,ol(e,t,n),Zc=r;break;default:ol(e,t,n)}}function cl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Q(e)}catch(e){Gu(t,t.return,e)}}}function ll(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Q(e)}catch(e){Gu(t,t.return,e)}}function ul(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new $c),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new $c),t;default:throw Error(i(435,e.tag))}}function dl(e,t){var n=ul(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=Xu.bind(null,e,t);t.then(r,r)}})}function fl(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if($d(c.type)){il=c.stateNode,al=!1;break a}break;case 5:il=c.stateNode,al=!1;break a;case 3:case 4:il=c.stateNode.containerInfo,al=!0;break a}c=c.return}if(il===null)throw Error(i(160));sl(o,s,a),il=null,al=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ml(t,e),t=t.sibling}var pl=null;function ml(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:fl(t,e),hl(e),r&4&&(Rc(3,e,e.return),Lc(3,e),Rc(5,e,e.return));break;case 1:fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),r&64&&Xc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=pl;if(fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[mt]||o[ct]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Id(o,r,n),o[ct]=e,bt(o),r=o;break a;case`link`:var s=Uf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Id(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Uf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Id(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[ct]=e,bt(o),r=o}e.stateNode=r}else Wf(a,e.type,e.stateNode);else e.stateNode=Rf(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Wc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?Wf(a,e.type,e.stateNode):Rf(a,r,e.memoizedProps))}break;case 27:fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),n!==null&&r&4&&Wc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(fl(t,e),hl(e),r&512&&(Zc||n===null||Hc(n,n.return)),e.flags&32){a=e.stateNode;try{Kt(a,``)}catch(t){Gu(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Wc(e,a,n===null?a:n.memoizedProps)),r&1024&&(Qc=!0);break;case 6:if(fl(t,e),hl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Gu(e,e.return,t)}}break;case 3:if(Hf=null,a=pl,pl=vf(t.containerInfo),fl(t,e),pl=a,hl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Q(t.containerInfo)}catch(t){Gu(e,e.return,t)}Qc&&(Qc=!1,gl(e));break;case 4:r=pl,pl=vf(e.stateNode.containerInfo),fl(t,e),hl(e),pl=r;break;case 12:fl(t,e),hl(e);break;case 31:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 13:fl(t,e),hl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&($l=De()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Xc,d=Zc;if(Xc=u||a,Zc=d||l,fl(t,e),Zc=d,Xc=u,hl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Xc||Zc||vl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Gu(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Gu(l,l.return,e)}}}else if(t.tag===18){if(n===null){l=t;try{var m=l.stateNode;a?tf(m,!0):tf(l.stateNode,!1)}catch(e){Gu(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,dl(e,n))));break;case 19:fl(t,e),hl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,dl(e,r)));break;case 30:break;case 21:break;default:fl(t,e),hl(e)}}function hl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Gc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Jc(e,Kc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Kt(o,``),n.flags&=-33),Jc(e,Kc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;qc(e,Kc(e),s);break;default:throw Error(i(161))}}catch(t){Gu(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function gl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;gl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function _l(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)nl(e,t.alternate,t),t=t.sibling}function vl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Rc(4,t,t.return),vl(t);break;case 1:Hc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Bc(t,t.return,n),vl(t);break;case 27:hf(t.stateNode);case 26:case 5:Hc(t,t.return),vl(t);break;case 22:t.memoizedState===null&&vl(t);break;case 30:vl(t);break;default:vl(t)}e=e.sibling}}function yl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:yl(i,a,n),Lc(4,a);break;case 1:if(yl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Gu(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Ha(c[i],s)}catch(e){Gu(r,r.return,e)}}n&&o&64&&zc(a),Vc(a,a.return);break;case 27:Yc(a);case 26:case 5:yl(i,a,n),n&&r===null&&o&4&&Uc(a),Vc(a,a.return);break;case 12:yl(i,a,n);break;case 31:yl(i,a,n),n&&o&4&&cl(i,a);break;case 13:yl(i,a,n),n&&o&4&&ll(i,a);break;case 22:a.memoizedState===null&&yl(i,a,n),Vc(a,a.return);break;case 30:break;default:yl(i,a,n)}t=t.sibling}}function bl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ta(n))}function xl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ta(e))}function Sl(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Cl(e,t,n,r),t=t.sibling}function Cl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:Sl(e,t,n,r),i&2048&&Lc(9,t);break;case 1:Sl(e,t,n,r);break;case 3:Sl(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ta(e)));break;case 12:if(i&2048){Sl(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Gu(t,t.return,e)}}else Sl(e,t,n,r);break;case 31:Sl(e,t,n,r);break;case 13:Sl(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?Sl(e,t,n,r):(a._visibility|=2,wl(e,t,n,r,(t.subtreeFlags&10256)!=0||!1)):a._visibility&2?Sl(e,t,n,r):Tl(e,t),i&2048&&bl(o,t);break;case 24:Sl(e,t,n,r),i&2048&&xl(t.alternate,t);break;default:Sl(e,t,n,r)}}function wl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:wl(a,o,s,c,i),Lc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,wl(a,o,s,c,i)):u._visibility&2?wl(a,o,s,c,i):Tl(a,o),i&&l&2048&&bl(o.alternate,o);break;case 24:wl(a,o,s,c,i),i&&l&2048&&xl(o.alternate,o);break;default:wl(a,o,s,c,i)}t=t.sibling}}function Tl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Tl(n,r),i&2048&&bl(r.alternate,r);break;case 24:Tl(n,r),i&2048&&xl(r.alternate,r);break;default:Tl(n,r)}t=t.sibling}}var El=8192;function Dl(e,t,n){if(e.subtreeFlags&El)for(e=e.child;e!==null;)Ol(e,t,n),e=e.sibling}function Ol(e,t,n){switch(e.tag){case 26:Dl(e,t,n),e.flags&El&&e.memoizedState!==null&&qf(n,pl,e.memoizedState,e.memoizedProps);break;case 5:Dl(e,t,n);break;case 3:case 4:var r=pl;pl=vf(e.stateNode.containerInfo),Dl(e,t,n),pl=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=El,El=16777216,Dl(e,t,n),El=r):Dl(e,t,n));break;default:Dl(e,t,n)}}function kl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Al(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];el=r,Nl(r,e)}kl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)jl(e),e=e.sibling}function jl(e){switch(e.tag){case 0:case 11:case 15:Al(e),e.flags&2048&&Rc(9,e,e.return);break;case 3:Al(e);break;case 12:Al(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ml(e)):Al(e);break;default:Al(e)}}function Ml(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];el=r,Nl(r,e)}kl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Rc(8,t,t.return),Ml(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ml(t));break;default:Ml(t)}e=e.sibling}}function Nl(e,t){for(;el!==null;){var n=el;switch(n.tag){case 0:case 11:case 15:Rc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ta(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,el=r;else a:for(n=e;el!==null;){r=el;var i=r.sibling,a=r.return;if(rl(r),r===n){el=null;break a}if(i!==null){i.return=a,el=i;break a}el=a}}}var Pl={getCacheForType:function(e){var t=qi($i),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return qi($i).controller.signal}},Fl=typeof WeakMap==`function`?WeakMap:Map,Il=0,Ll=null,Y=null,X=0,Rl=0,zl=null,Bl=!1,Vl=!1,Hl=!1,Ul=0,Wl=0,Gl=0,Kl=0,ql=0,Jl=0,Yl=0,Xl=null,Zl=null,Ql=!1,$l=0,eu=0,tu=1/0,nu=null,ru=null,iu=0,au=null,ou=null,su=0,cu=0,lu=null,uu=null,du=0,fu=null;function pu(){return Il&2&&X!==0?X&-X:O.T===null?at():fd()}function mu(){if(Jl===0)if(!(X&536870912)||q){var e=We;We<<=1,!(We&3932160)&&(We=262144),Jl=e}else Jl=536870912;return e=Ya.current,e!==null&&(e.flags|=32),Jl}function hu(e,t,n){(e===Ll&&(Rl===2||Rl===9)||e.cancelPendingCommit!==null)&&(Su(e,0),yu(e,X,Jl,!1)),Qe(e,n),(!(Il&2)||e!==Ll)&&(e===Ll&&(!(Il&2)&&(Kl|=n),Wl===4&&yu(e,X,Jl,!1)),id(e))}function gu(e,t,n){if(Il&6)throw Error(i(327));var r=!n&&(t&127)==0&&(t&e.expiredLanes)===0||Je(e,t),a=r?Au(e,t):Ou(e,t,!0),o=r;do{if(a===0){Vl&&!r&&yu(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!vu(n)){a=Ou(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=Xl;var l=c.current.memoizedState.isDehydrated;if(l&&(Su(c,s).flags|=256),s=Ou(c,s,!1),s!==2){if(Hl&&!l){c.errorRecoveryDisabledLanes|=o,Kl|=o,a=4;break a}o=Zl,Zl=a,o!==null&&(Zl===null?Zl=o:Zl.push.apply(Zl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Su(e,0),yu(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:yu(r,t,Jl,!Bl);break a;case 2:Zl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=$l+300-De(),10<a)){if(yu(r,t,Jl,!Bl),qe(r,0,!0)!==0)break a;su=t,r.timeoutHandle=Jd(_u.bind(null,r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,`Throttled`,-0,0),a);break a}_u(r,n,Zl,nu,Ql,t,Jl,Kl,Yl,Bl,o,null,-0,0)}}break}while(1);id(e)}function _u(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,d&8192||(d&16785408)==16785408){d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:en},Ol(t,a,d);var m=(a&62914560)===a?$l-De():(a&4194048)===a?eu-De():0;if(m=Yf(d,m),m!==null){su=a,e.cancelPendingCommit=m(Lu.bind(null,e,t,a,n,r,i,o,s,c,u,d,null,f,p)),yu(e,a,o,!l);return}}Lu(e,t,a,n,r,i,o,s,c)}function vu(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!H(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function yu(e,t,n,r){t&=~ql,t&=~Kl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-ze(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&et(e,n,t)}function bu(){return Il&6?!0:(ad(0,!1),!1)}function xu(){if(Y!==null){if(Rl===0)var e=Y.return;else e=Y,zi=Ri=null,Co(e),wa=null,Ta=0,e=Y;for(;e!==null;)Ic(e.alternate,e),e=e.return;Y=null}}function Su(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Yd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),su=0,xu(),Ll=e,Y=n=ai(e.current,null),X=t,Rl=0,zl=null,Bl=!1,Vl=Je(e,t),Hl=!1,Yl=Jl=ql=Kl=Gl=Wl=0,Zl=Xl=null,Ql=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-ze(r),a=1<<i;t|=e[i],r&=~a}return Ul=t,Yr(),n}function Cu(e,t){J=null,O.H=Ns,t===ma||t===ga?(t=Sa(),Rl=3):t===ha?(t=Sa(),Rl=4):Rl=t===Zs?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,zl=t,Y===null&&(Wl=1,Gs(e,G(t,e.current)))}function wu(){var e=Ya.current;return e===null?!0:(X&4194048)===X?Xa===null:(X&62914560)===X||X&536870912?e===Xa:!1}function Tu(){var e=O.H;return O.H=Ns,e===null?Ns:e}function Eu(){var e=O.A;return O.A=Pl,e}function Du(){Wl=4,Bl||(X&4194048)!==X&&Ya.current!==null||(Vl=!0),!(Gl&134217727)&&!(Kl&134217727)||Ll===null||yu(Ll,X,Jl,!1)}function Ou(e,t,n){var r=Il;Il|=2;var i=Tu(),a=Eu();(Ll!==e||X!==t)&&(nu=null,Su(e,t)),t=!1;var o=Wl;a:do try{if(Rl!==0&&Y!==null){var s=Y,c=zl;switch(Rl){case 8:xu(),o=6;break a;case 3:case 2:case 9:case 6:Ya.current===null&&(t=!0);var l=Rl;if(Rl=0,zl=null,Pu(e,s,c,l),n&&Vl){o=0;break a}break;default:l=Rl,Rl=0,zl=null,Pu(e,s,c,l)}}ku(),o=Wl;break}catch(t){Cu(e,t)}while(1);return t&&e.shellSuspendCounter++,zi=Ri=null,Il=r,O.H=i,O.A=a,Y===null&&(Ll=null,X=0,Yr()),o}function ku(){for(;Y!==null;)Mu(Y)}function Au(e,t){var n=Il;Il|=2;var r=Tu(),a=Eu();Ll!==e||X!==t?(nu=null,tu=De()+500,Su(e,t)):Vl=Je(e,t);a:do try{if(Rl!==0&&Y!==null){t=Y;var o=zl;b:switch(Rl){case 1:Rl=0,zl=null,Pu(e,t,o,1);break;case 2:case 9:if(va(o)){Rl=0,zl=null,Nu(t);break}t=function(){Rl!==2&&Rl!==9||Ll!==e||(Rl=7),id(e)},o.then(t,t);break a;case 3:Rl=7;break a;case 4:Rl=5;break a;case 7:va(o)?(Rl=0,zl=null,Nu(t)):(Rl=0,zl=null,Pu(e,t,o,7));break;case 5:var s=null;switch(Y.tag){case 26:s=Y.memoizedState;case 5:case 27:var c=Y;if(s?Kf(s):c.stateNode.complete){Rl=0,zl=null;var l=c.sibling;if(l!==null)Y=l;else{var u=c.return;u===null?Y=null:(Y=u,Fu(u))}break b}}Rl=0,zl=null,Pu(e,t,o,5);break;case 6:Rl=0,zl=null,Pu(e,t,o,6);break;case 8:xu(),Wl=6;break a;default:throw Error(i(462))}}ju();break}catch(t){Cu(e,t)}while(1);return zi=Ri=null,O.H=r,O.A=a,Il=n,Y===null?(Ll=null,X=0,Yr(),Wl):0}function ju(){for(;Y!==null&&!Te();)Mu(Y)}function Mu(e){var t=Dc(e.alternate,e,Ul);e.memoizedProps=e.pendingProps,t===null?Fu(e):Y=t}function Nu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=dc(n,t,t.pendingProps,t.type,void 0,X);break;case 11:t=dc(n,t,t.pendingProps,t.type.render,t.ref,X);break;case 5:Co(t);default:Ic(n,t),t=Y=oi(t,Ul),t=Dc(n,t,Ul)}e.memoizedProps=e.pendingProps,t===null?Fu(e):Y=t}function Pu(e,t,n,r){zi=Ri=null,Co(t),wa=null,Ta=0;var i=t.return;try{if(Xs(e,i,t,n,X)){Wl=1,Gs(e,G(n,e.current)),Y=null;return}}catch(t){if(i!==null)throw Y=i,t;Wl=1,Gs(e,G(n,e.current)),Y=null;return}t.flags&32768?(q||r===1?e=!0:Vl||X&536870912?e=!1:(Bl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ya.current,r!==null&&r.tag===13&&(r.flags|=16384))),Iu(t,e)):Fu(t)}function Fu(e){var t=e;do{if(t.flags&32768){Iu(t,Bl);return}e=t.return;var n=Pc(t.alternate,t,Ul);if(n!==null){Y=n;return}if(t=t.sibling,t!==null){Y=t;return}Y=t=e}while(t!==null);Wl===0&&(Wl=5)}function Iu(e,t){do{var n=Fc(e.alternate,e);if(n!==null){n.flags&=32767,Y=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Y=e;return}Y=e=n}while(e!==null);Wl=6,Y=null}function Lu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do Hu();while(iu!==0);if(Il&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Jr,$e(e,n,o,s,c,l),e===Ll&&(Y=Ll=null,X=0),ou=t,au=e,su=n,cu=o,lu=a,uu=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Zu(je,function(){return Uu(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=O.T,O.T=null,a=k.p,k.p=2,s=Il,Il|=4;try{tl(e,t,n)}finally{Il=s,k.p=a,O.T=r}}iu=1,Ru(),zu(),Bu()}}function Ru(){if(iu===1){iu=0;var e=au,t=ou,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=Il;Il|=4;try{ml(t,e);var a=Vd,o=Cr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Sr(s.ownerDocument.documentElement,s)){if(c!==null&&wr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=xr(s,h),v=xr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}lp=!!Bd,Vd=Bd=null}finally{Il=i,k.p=r,O.T=n}}e.current=t,iu=2}}function zu(){if(iu===2){iu=0;var e=au,t=ou,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=Il;Il|=4;try{nl(e,t.alternate,t)}finally{Il=i,k.p=r,O.T=n}}iu=3}}function Bu(){if(iu===4||iu===3){iu=0,Ee();var e=au,t=ou,n=su,r=uu;t.subtreeFlags&10256||t.flags&10256?iu=5:(iu=0,ou=au=null,Vu(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(ru=null),it(n),t=t.stateNode,Le&&typeof Le.onCommitFiberRoot==`function`)try{Le.onCommitFiberRoot(Ie,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=O.T,i=k.p,k.p=2,O.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{O.T=t,k.p=i}}su&3&&Hu(),id(e),i=e.pendingLanes,n&261930&&i&42?e===fu?du++:(du=0,fu=e):du=0,ad(0,!1)}}function Vu(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ta(t)))}function Hu(){return Ru(),zu(),Bu(),Uu()}function Uu(){if(iu!==5)return!1;var e=au,t=cu;cu=0;var n=it(su),r=O.T,a=k.p;try{k.p=32>n?32:n,O.T=null,n=lu,lu=null;var o=au,s=su;if(iu=0,ou=au=null,su=0,Il&6)throw Error(i(331));var c=Il;if(Il|=4,jl(o.current),Cl(o,o.current,s,n),Il=c,ad(0,!1),Le&&typeof Le.onPostCommitFiberRoot==`function`)try{Le.onPostCommitFiberRoot(Ie,o)}catch{}return!0}finally{k.p=a,O.T=r,Vu(e,t)}}function Wu(e,t,n){t=G(n,t),t=qs(e.stateNode,t,2),e=Ia(e,t,2),e!==null&&(Qe(e,2),id(e))}function Gu(e,t,n){if(e.tag===3)Wu(e,e,n);else for(;t!==null;){if(t.tag===3){Wu(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(ru===null||!ru.has(r))){e=G(n,e),n=Js(2),r=Ia(t,n,2),r!==null&&(Ys(n,r,t,e),Qe(r,2),id(r));break}}t=t.return}}function Ku(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Fl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(Hl=!0,i.add(n),e=qu.bind(null,e,t,n),t.then(e,e))}function qu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Ll===e&&(X&n)===n&&(Wl===4||Wl===3&&(X&62914560)===X&&300>De()-$l?!(Il&2)&&Su(e,0):ql|=n,Yl===X&&(Yl=0)),id(e)}function Ju(e,t){t===0&&(t=Xe()),e=Qr(e,t),e!==null&&(Qe(e,t),id(e))}function Yu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ju(e,n)}function Xu(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Ju(e,n)}function Zu(e,t){return we(e,t)}var Qu=null,$u=null,ed=!1,td=!1,nd=!1,rd=0;function id(e){e!==$u&&e.next===null&&($u===null?Qu=$u=e:$u=$u.next=e),td=!0,ed||(ed=!0,dd())}function ad(e,t){if(!nd&&td){nd=!0;do for(var n=!1,r=Qu;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-ze(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,ud(r,a))}else a=X,a=qe(r,r===Ll?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Je(r,a)||(n=!0,ud(r,a));r=r.next}while(n);nd=!1}}function od(){sd()}function sd(){td=ed=!1;var e=0;rd!==0&&qd()&&(e=rd);for(var t=De(),n=null,r=Qu;r!==null;){var i=r.next,a=cd(r,t);a===0?(r.next=null,n===null?Qu=i:n.next=i,i===null&&($u=n)):(n=r,(e!==0||a&3)&&(td=!0)),r=i}iu!==0&&iu!==5||ad(e,!1),rd!==0&&(rd=0)}function cd(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-ze(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Ye(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Ll,n=X,n=qe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Rl===2||Rl===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&I(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Je(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&I(r),it(n)){case 2:case 8:n=Ae;break;case 32:n=je;break;case 268435456:n=Ne;break;default:n=je}return r=ld.bind(null,e),n=we(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&I(r),e.callbackPriority=2,e.callbackNode=null,2}function ld(e,t){if(iu!==0&&iu!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Hu()&&e.callbackNode!==n)return null;var r=X;return r=qe(e,e===Ll?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(gu(e,r,t),cd(e,De()),e.callbackNode!=null&&e.callbackNode===n?ld.bind(null,e):null)}function ud(e,t){if(Hu())return null;gu(e,t,!0)}function dd(){Zd(function(){Il&6?we(ke,od):sd()})}function fd(){if(rd===0){var e=ia;e===0&&(e=Ue,Ue<<=1,!(Ue&261888)&&(Ue=256)),rd=e}return rd}function pd(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:$t(``+e)}function md(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function hd(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=pd((i[lt]||null).action),o=r.submitter;o&&(t=(t=o[lt]||null)?pd(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Sn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(rd!==0){var e=o?md(i,o):new FormData(i);ys(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?md(i,o):new FormData(i),ys(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var gd=0;gd<Ur.length;gd++){var _d=Ur[gd];Wr(_d.toLowerCase(),`on`+(_d[0].toUpperCase()+_d.slice(1)))}Wr(Fr,`onAnimationEnd`),Wr(Ir,`onAnimationIteration`),Wr(Lr,`onAnimationStart`),Wr(`dblclick`,`onDoubleClick`),Wr(`focusin`,`onFocus`),Wr(`focusout`,`onBlur`),Wr(Rr,`onTransitionRun`),Wr(zr,`onTransitionStart`),Wr(Br,`onTransitionCancel`),Wr(Vr,`onTransitionEnd`),wt(`onMouseEnter`,[`mouseout`,`mouseover`]),wt(`onMouseLeave`,[`mouseout`,`mouseover`]),wt(`onPointerEnter`,[`pointerout`,`pointerover`]),wt(`onPointerLeave`,[`pointerout`,`pointerover`]),Ct(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Ct(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Ct(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Ct(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Ct(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Ct(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var vd=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),yd=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(vd));function bd(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Gr(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Gr(e)}i.currentTarget=null,a=c}}}}function Z(e,t){var n=t[L];n===void 0&&(n=t[L]=new Set);var r=e+`__bubble`;n.has(r)||(wd(t,e,2,!1),n.add(r))}function xd(e,t,n){var r=0;t&&(r|=4),wd(n,e,r,t)}var Sd=`_reactListening`+Math.random().toString(36).slice(2);function Cd(e){if(!e[Sd]){e[Sd]=!0,xt.forEach(function(t){t!==`selectionchange`&&(yd.has(t)||xd(t,!1,e),xd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Sd]||(t[Sd]=!0,xd(`selectionchange`,!1,t))}}function wd(e,t,n,r){switch(gp(t)){case 2:var i=up;break;case 8:i=dp;break;default:i=fp}n=i.bind(null,t,n,e),i=void 0,!dn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Td(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=gt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}cn(function(){var r=a,i=nn(n),s=[];a:{var c=Hr.get(e);if(c!==void 0){var l=Sn,u=e;switch(e){case`keypress`:if(_n(n)===0)break a;case`keydown`:case`keyup`:l=Rn;break;case`focusin`:u=`focus`,l=An;break;case`focusout`:u=`blur`,l=An;break;case`beforeblur`:case`afterblur`:l=An;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=On;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=kn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=B;break;case Fr:case Ir:case Lr:l=jn;break;case Vr:l=Bn;break;case`scroll`:case`scrollend`:l=Cn;break;case`wheel`:l=Vn;break;case`copy`:case`cut`:case`paste`:l=Mn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=zn;break;case`toggle`:case`beforetoggle`:l=Hn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=ln(m,p),g!=null&&d.push(Ed(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==tn&&(u=n.relatedTarget||n.fromElement)&&(gt(u)||u[ut]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?gt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=On,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=zn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:vt(l),h=u==null?c:vt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,gt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=Od,p=l,m=u,h=0,g=p;g;g=d(g))h++;g=0;for(var _=m;_;_=d(_))g++;for(;0<h-g;)p=d(p),h--;for(;0<g-h;)m=d(m),g--;for(;h--;){if(p===m||m!==null&&p===m.alternate){d=p;break b}p=d(p),m=d(m)}d=null}else d=null;l!==null&&kd(s,c,l,d,!1),u!==null&&f!==null&&kd(s,f,u,d,!0)}}a:{if(c=r?vt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var v=sr;else if(tr(c))if(cr)v=_r;else{v=hr;var y=mr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&Xt(r.elementType)&&(v=sr):v=gr;if(v&&=v(e,r)){nr(s,v,n,i);break a}y&&y(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Ht(c,`number`,c.value)}switch(y=r?vt(r):window,e){case`focusin`:(tr(y)||y.contentEditable===`true`)&&(Er=y,Dr=r,Or=null);break;case`focusout`:Or=Dr=Er=null;break;case`mousedown`:kr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:kr=!1,Ar(s,n,i);break;case`selectionchange`:if(Tr)break;case`keydown`:case`keyup`:Ar(s,n,i)}var b;if(Wn)b:{switch(e){case`compositionstart`:var x=`onCompositionStart`;break b;case`compositionend`:x=`onCompositionEnd`;break b;case`compositionupdate`:x=`onCompositionUpdate`;break b}x=void 0}else Qn?Xn(e,n)&&(x=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(x=`onCompositionStart`);x&&(qn&&n.locale!==`ko`&&(Qn||x!==`onCompositionStart`?x===`onCompositionEnd`&&Qn&&(b=gn()):(pn=i,mn=`value`in pn?pn.value:pn.textContent,Qn=!0)),y=Dd(r,x),0<y.length&&(x=new Nn(x,e,null,n,i),s.push({event:x,listeners:y}),b?x.data=b:(b=Zn(n),b!==null&&(x.data=b)))),(b=Kn?V(e,n):$n(e,n))&&(x=Dd(r,`onBeforeInput`),0<x.length&&(y=new Nn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:y,listeners:x}),y.data=b)),hd(s,e,r,n,i)}bd(s,t)})}function Ed(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Dd(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=ln(e,n),i!=null&&r.unshift(Ed(e,i,a)),i=ln(e,t),i!=null&&r.push(Ed(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Od(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function kd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=ln(n,a),l!=null&&o.unshift(Ed(n,l,c))):i||(l=ln(n,a),l!=null&&o.push(Ed(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Ad=/\r\n?/g,jd=/\u0000|\uFFFD/g;function Md(e){return(typeof e==`string`?e:``+e).replace(Ad,`
`).replace(jd,``)}function Nd(e,t){return t=Md(t),Md(e)===t}function Pd(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Kt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Kt(e,``+r);break;case`className`:At(e,`class`,r);break;case`tabIndex`:At(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:At(e,n,r);break;case`style`:Yt(e,r,o);break;case`data`:if(t!==`object`){At(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=$t(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&Pd(e,t,`name`,a.name,a,null),Pd(e,t,`formEncType`,a.formEncType,a,null),Pd(e,t,`formMethod`,a.formMethod,a,null),Pd(e,t,`formTarget`,a.formTarget,a,null)):(Pd(e,t,`encType`,a.encType,a,null),Pd(e,t,`method`,a.method,a,null),Pd(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=$t(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=en);break;case`onScroll`:r!=null&&Z(`scroll`,e);break;case`onScrollEnd`:r!=null&&Z(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=$t(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Z(`beforetoggle`,e),Z(`toggle`,e),kt(e,`popover`,r);break;case`xlinkActuate`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:kt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=Zt.get(n)||n,kt(e,n,r))}}function Fd(e,t,n,r,a,o){switch(n){case`style`:Yt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Kt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Kt(e,``+r);break;case`onScroll`:r!=null&&Z(`scroll`,e);break;case`onScrollEnd`:r!=null&&Z(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=en);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!St.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[lt]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):kt(e,n,r)}}}function Id(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Z(`error`,e),Z(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Pd(e,t,o,s,n,null)}}a&&Pd(e,t,`srcSet`,n.srcSet,n,null),r&&Pd(e,t,`src`,n.src,n,null);return;case`input`:Z(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:Pd(e,t,r,d,n,null)}}Vt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Z(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:Pd(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Ut(e,!!r,n,!0):Ut(e,!!r,t,!1);return;case`textarea`:for(s in Z(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:Pd(e,t,s,c,n,null)}Gt(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:Pd(e,t,l,r,n,null)}return;case`dialog`:Z(`beforetoggle`,e),Z(`toggle`,e),Z(`cancel`,e),Z(`close`,e);break;case`iframe`:case`object`:Z(`load`,e);break;case`video`:case`audio`:for(r=0;r<vd.length;r++)Z(vd[r],e);break;case`image`:Z(`error`,e),Z(`load`,e);break;case`details`:Z(`toggle`,e);break;case`embed`:case`source`:case`link`:Z(`error`,e),Z(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:Pd(e,t,u,r,n,null)}return;default:if(Xt(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&Fd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&Pd(e,t,c,r,n,null))}function Ld(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||Pd(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&Pd(e,t,p,m,r,f)}}Bt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||Pd(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&Pd(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Ut(e,!!n,n?[]:``,!1):Ut(e,!!n,t,!0)):Ut(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:Pd(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&Pd(e,t,s,a,r,o)}Wt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:Pd(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:Pd(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&Pd(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:Pd(e,t,u,p,r,m)}return;default:if(Xt(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&Fd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||Fd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&Pd(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||Pd(e,t,f,p,r,m)}function Rd(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function zd(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&Rd(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&Rd(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var Bd=null,Vd=null;function Hd(e){return e.nodeType===9?e:e.ownerDocument}function Ud(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Wd(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function Gd(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Kd=null;function qd(){var e=window.event;return e&&e.type===`popstate`?e===Kd?!1:(Kd=e,!0):(Kd=null,!1)}var Jd=typeof setTimeout==`function`?setTimeout:void 0,Yd=typeof clearTimeout==`function`?clearTimeout:void 0,Xd=typeof Promise==`function`?Promise:void 0,Zd=typeof queueMicrotask==`function`?queueMicrotask:Xd===void 0?Jd:function(e){return Xd.resolve(null).then(e).catch(Qd)};function Qd(e){setTimeout(function(){throw e})}function $d(e){return e===`head`}function ef(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Q(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)hf(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,hf(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[mt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&hf(e.ownerDocument.body);n=i}while(n);Q(t)}function tf(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8)if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++;n=r}while(n)}function nf(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nf(n),ht(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rf(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[mt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=uf(e.nextSibling),e===null)break}return null}function af(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=uf(e.nextSibling),e===null))return null;return e}function of(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=uf(e.nextSibling),e===null))return null;return e}function sf(e){return e.data===`$?`||e.data===`$~`}function cf(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function lf(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function uf(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var df=null;function ff(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return uf(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function pf(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function mf(e,t,n){switch(t=Hd(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function hf(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ht(e)}var gf=new Map,_f=new Set;function vf(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var yf=k.d;k.d={f:bf,r:xf,D:wf,C:Tf,L:Ef,m:Df,X:kf,S:Of,M:Af};function bf(){var e=yf.f(),t=bu();return e||t}function xf(e){var t=_t(e);t!==null&&t.tag===5&&t.type===`form`?xs(t):yf.r(e)}var Sf=typeof document>`u`?null:document;function Cf(e,t,n){var r=Sf;if(r&&typeof t==`string`&&t){var i=zt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),_f.has(i)||(_f.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Id(t,`link`,e),bt(t),r.head.appendChild(t)))}}function wf(e){yf.D(e),Cf(`dns-prefetch`,e,null)}function Tf(e,t){yf.C(e,t),Cf(`preconnect`,e,t)}function Ef(e,t,n){yf.L(e,t,n);var r=Sf;if(r&&e&&t){var i=`link[rel="preload"][as="`+zt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+zt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+zt(n.imageSizes)+`"]`)):i+=`[href="`+zt(e)+`"]`;var a=i;switch(t){case`style`:a=Mf(e);break;case`script`:a=If(e)}gf.has(a)||(e=f({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),gf.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Nf(a))||t===`script`&&r.querySelector(Lf(a))||(t=r.createElement(`link`),Id(t,`link`,e),bt(t),r.head.appendChild(t)))}}function Df(e,t){yf.m(e,t);var n=Sf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+zt(r)+`"][href="`+zt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=If(e)}if(!gf.has(a)&&(e=f({rel:`modulepreload`,href:e},t),gf.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(Lf(a)))return}r=n.createElement(`link`),Id(r,`link`,e),bt(r),n.head.appendChild(r)}}}function Of(e,t,n){yf.S(e,t,n);var r=Sf;if(r&&e){var i=yt(r).hoistableStyles,a=Mf(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Nf(a)))s.loading=5;else{e=f({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=gf.get(a))&&Bf(e,n);var c=o=r.createElement(`link`);bt(c),Id(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,zf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function kf(e,t){yf.X(e,t);var n=Sf;if(n&&e){var r=yt(n).hoistableScripts,i=If(e),a=r.get(i);a||(a=n.querySelector(Lf(i)),a||(e=f({src:e,async:!0},t),(t=gf.get(i))&&Vf(e,t),a=n.createElement(`script`),bt(a),Id(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Af(e,t){yf.M(e,t);var n=Sf;if(n&&e){var r=yt(n).hoistableScripts,i=If(e),a=r.get(i);a||(a=n.querySelector(Lf(i)),a||(e=f({src:e,async:!0,type:`module`},t),(t=gf.get(i))&&Vf(e,t),a=n.createElement(`script`),bt(a),Id(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function jf(e,t,n,r){var a=(a=he.current)?vf(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=Mf(n.href),n=yt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Mf(n.href);var o=yt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Nf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),gf.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},gf.set(e,n),o||Ff(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=If(n),n=yt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Mf(e){return`href="`+zt(e)+`"`}function Nf(e){return`link[rel="stylesheet"][`+e+`]`}function Pf(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function Ff(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Id(t,`link`,n),bt(t),e.head.appendChild(t))}function If(e){return`[src="`+zt(e)+`"]`}function Lf(e){return`script[async]`+e}function Rf(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+zt(n.href)+`"]`);if(r)return t.instance=r,bt(r),r;var a=f({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),bt(r),Id(r,`style`,a),zf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Mf(n.href);var o=e.querySelector(Nf(a));if(o)return t.state.loading|=4,t.instance=o,bt(o),o;r=Pf(n),(a=gf.get(a))&&Bf(r,a),o=(e.ownerDocument||e).createElement(`link`),bt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Id(o,`link`,r),t.state.loading|=4,zf(o,n.precedence,e),t.instance=o;case`script`:return o=If(n.src),(a=e.querySelector(Lf(o)))?(t.instance=a,bt(a),a):(r=n,(a=gf.get(o))&&(r=f({},n),Vf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),bt(a),Id(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,zf(r,n.precedence,e));return t.instance}function zf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Bf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Vf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Hf=null;function Uf(e,t,n){if(Hf===null){var r=new Map,i=Hf=new Map;i.set(n,r)}else i=Hf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[mt]||a[ct]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Wf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Gf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Kf(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function qf(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Mf(r.href),a=t.querySelector(Nf(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=Xf.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,bt(a);return}a=t.ownerDocument||t,r=Pf(r),(i=gf.get(i))&&Bf(r,i),a=a.createElement(`link`),bt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),Id(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Xf.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var Jf=0;function Yf(e,t){return e.stylesheets&&e.count===0&&Qf(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&Qf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&Jf===0&&(Jf=62500*zd());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Qf(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>Jf?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function Xf(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Qf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Zf=null;function Qf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Zf=new Map,t.forEach($f,e),Zf=null,Xf.call(e))}function $f(e,t){if(!(t.state.loading&4)){var n=Zf.get(e);if(n)var r=n.get(null);else{n=new Map,Zf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=Xf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var ep={$$typeof:C,Provider:null,Consumer:null,_currentValue:ce,_currentValue2:ce,_threadCount:0};function tp(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ze(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ze(0),this.hiddenUpdates=Ze(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.incompleteTransitions=new Map}function np(e,t,n,r,i,a,o,s,c,l,u,d){return e=new tp(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ri(3,null,null,t),e.current=a,a.stateNode=e,t=ea(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Na(a),e}function rp(e){return e?(e=ti,e):ti}function ip(e,t,n,r,i,a){i=rp(i),r.context===null?r.context=i:r.pendingContext=i,r=Fa(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Ia(e,r,t),n!==null&&(hu(n,e,t),La(n,e,t))}function ap(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function op(e,t){ap(e,t),(e=e.alternate)&&ap(e,t)}function sp(e){if(e.tag===13||e.tag===31){var t=Qr(e,67108864);t!==null&&hu(t,e,67108864),op(e,67108864)}}function cp(e){if(e.tag===13||e.tag===31){var t=pu();t=rt(t);var n=Qr(e,t);n!==null&&hu(n,e,t),op(e,t)}}var lp=!0;function up(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=2,fp(e,t,n,r)}finally{k.p=a,O.T=i}}function dp(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=8,fp(e,t,n,r)}finally{k.p=a,O.T=i}}function fp(e,t,n,r){if(lp){var i=pp(r);if(i===null)Td(e,t,r,mp,n),Tp(e,r);else if(Dp(i,e,t,n,r))r.stopPropagation();else if(Tp(e,r),t&4&&-1<wp.indexOf(e)){for(;i!==null;){var a=_t(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ke(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-ze(o);s.entanglements[1]|=c,o&=~c}id(a),!(Il&6)&&(tu=De()+500,ad(0,!1))}}break;case 31:case 13:s=Qr(a,2),s!==null&&hu(s,a,2),bu(),op(a,2)}if(a=pp(r),a===null&&Td(e,t,r,mp,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Td(e,t,r,null,n)}}function pp(e){return e=nn(e),hp(e)}var mp=null;function hp(e){if(mp=null,e=gt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return mp=e,null}function gp(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Oe()){case ke:return 2;case Ae:return 8;case je:case Me:return 32;case Ne:return 268435456;default:return 32}default:return 32}}var _p=!1,vp=null,yp=null,bp=null,xp=new Map,Sp=new Map,Cp=[],wp=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Tp(e,t){switch(e){case`focusin`:case`focusout`:vp=null;break;case`dragenter`:case`dragleave`:yp=null;break;case`mouseover`:case`mouseout`:bp=null;break;case`pointerover`:case`pointerout`:xp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:Sp.delete(t.pointerId)}}function Ep(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=_t(t),t!==null&&sp(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Dp(e,t,n,r,i){switch(t){case`focusin`:return vp=Ep(vp,e,t,n,r,i),!0;case`dragenter`:return yp=Ep(yp,e,t,n,r,i),!0;case`mouseover`:return bp=Ep(bp,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return xp.set(a,Ep(xp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,Sp.set(a,Ep(Sp.get(a)||null,e,t,n,r,i)),!0}return!1}function Op(e){var t=gt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,ot(e.priority,function(){cp(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,ot(e.priority,function(){cp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function kp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=pp(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);tn=r,n.target.dispatchEvent(r),tn=null}else return t=_t(n),t!==null&&sp(t),e.blockedOn=n,!1;t.shift()}return!0}function Ap(e,t,n){kp(e)&&n.delete(t)}function jp(){_p=!1,vp!==null&&kp(vp)&&(vp=null),yp!==null&&kp(yp)&&(yp=null),bp!==null&&kp(bp)&&(bp=null),xp.forEach(Ap),Sp.forEach(Ap)}function Mp(e,n){e.blockedOn===n&&(e.blockedOn=null,_p||(_p=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,jp)))}var Np=null;function Pp(e){Np!==e&&(Np=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Np===e&&(Np=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(hp(r||n)===null)continue;break}var a=_t(n);a!==null&&(e.splice(t,3),t-=3,ys(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Q(e){function t(t){return Mp(t,e)}vp!==null&&Mp(vp,e),yp!==null&&Mp(yp,e),bp!==null&&Mp(bp,e),xp.forEach(t),Sp.forEach(t);for(var n=0;n<Cp.length;n++){var r=Cp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Cp.length&&(n=Cp[0],n.blockedOn===null);)Op(n),n.blockedOn===null&&Cp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[lt]||null;if(typeof a==`function`)o||Pp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[lt]||null)s=o.formAction;else if(hp(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Pp(n)}}}function Fp(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Ip(e){this._internalRoot=e}Lp.prototype.render=Ip.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;ip(n,pu(),e,t,null,null)},Lp.prototype.unmount=Ip.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;ip(e.current,2,null,e,null,null),bu(),t[ut]=null}};function Lp(e){this._internalRoot=e}Lp.prototype.unstable_scheduleHydration=function(e){if(e){var t=at();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Cp.length&&t!==0&&t<Cp[n].priority;n++);Cp.splice(n,0,e),n===0&&Op(e)}};var Rp=n.version;if(Rp!==`19.2.5`)throw Error(i(527,Rp,`19.2.5`));k.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:d(e),e=e===null?null:e.stateNode,e};var zp={bundleType:0,version:`19.2.5`,rendererPackageName:`react-dom`,currentDispatcherRef:O,reconcilerVersion:`19.2.5`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Bp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Bp.isDisabled&&Bp.supportsFiber)try{Ie=Bp.inject(zp),Le=Bp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Hs,s=Us,c=Ws;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=np(e,1,!1,null,null,n,r,null,o,s,c,Fp),e[ut]=t.current,Cd(e),new Ip(t)}})),y=s(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=v()}))(),b=`modulepreload`,x=function(e){return`/`+e},S={},C=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=x(t,n),t in S)return;S[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:b,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},w=u(h(),1),T=`popstate`;function E(e){return typeof e==`object`&&!!e&&`pathname`in e&&`search`in e&&`hash`in e&&`state`in e&&`key`in e}function ee(e={}){function t(e,t){let n=t.state?.masked,{pathname:r,search:i,hash:a}=n||e.location;return ie(``,{pathname:r,search:i,hash:a},t.state&&t.state.usr||null,t.state&&t.state.key||`default`,n?{pathname:e.location.pathname,search:e.location.search,hash:e.location.hash}:void 0)}function n(e,t){return typeof t==`string`?t:ae(t)}return se(t,n,null,e)}function D(e,t){if(e===!1||e==null)throw Error(t)}function te(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function ne(){return Math.random().toString(36).substring(2,10)}function re(e,t){return{usr:e.state,key:e.key,idx:t,masked:e.unstable_mask?{pathname:e.pathname,search:e.search,hash:e.hash}:void 0}}function ie(e,t,n=null,r,i){return{pathname:typeof e==`string`?e:e.pathname,search:``,hash:``,...typeof t==`string`?oe(t):t,state:n,key:t&&t.key||r||ne(),unstable_mask:i}}function ae({pathname:e=`/`,search:t=``,hash:n=``}){return t&&t!==`?`&&(e+=t.charAt(0)===`?`?t:`?`+t),n&&n!==`#`&&(e+=n.charAt(0)===`#`?n:`#`+n),e}function oe(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function se(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=`POP`,c=null,l=u();l??(l=0,o.replaceState({...o.state,idx:l},``));function u(){return(o.state||{idx:null}).idx}function d(){s=`POP`;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=`PUSH`;let r=E(e)?e:ie(h.location,e,t);n&&n(r,e),l=u()+1;let d=re(r,l),f=h.createHref(r.unstable_mask||r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=`REPLACE`;let r=E(e)?e:ie(h.location,e,t);n&&n(r,e),l=u();let i=re(r,l),d=h.createHref(r.unstable_mask||r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){return O(e)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(T,d),c=e,()=>{i.removeEventListener(T,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}function O(e,t=!1){let n=`http://localhost`;typeof window<`u`&&(n=window.location.origin===`null`?window.location.href:window.location.origin),D(n,`No window.location.(origin|href) available to create URL`);let r=typeof e==`string`?e:ae(e);return r=r.replace(/ $/,`%20`),!t&&r.startsWith(`//`)&&(r=n+r),new URL(r,n)}function k(e,t,n=`/`){return ce(e,t,n,!1)}function ce(e,t,n,r){let i=N((typeof t==`string`?oe(t):t).pathname||`/`,n);if(i==null)return null;let a=ue(e);fe(a);let o=null;for(let e=0;o==null&&e<a.length;++e){let t=Se(i);o=M(a[e],t,r)}return o}function le(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function ue(e,t=[],n=[],r=``,i=!1){let a=(e,a,o=i,s)=>{let c={relativePath:s===void 0?e.path||``:s,caseSensitive:e.caseSensitive===!0,childrenIndex:a,route:e};if(c.relativePath.startsWith(`/`)){if(!c.relativePath.startsWith(r)&&o)return;D(c.relativePath.startsWith(r),`Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),c.relativePath=c.relativePath.slice(r.length)}let l=De([r,c.relativePath]),u=n.concat(c);e.children&&e.children.length>0&&(D(e.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${l}".`),ue(e.children,t,u,l,o)),!(e.path==null&&!e.index)&&t.push({path:l,score:ye(l,e.index),routesMeta:u})};return e.forEach((e,t)=>{if(e.path===``||!e.path?.includes(`?`))a(e,t);else for(let n of de(e.path))a(e,t,!0,n)}),t}function de(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=de(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function fe(e){e.sort((e,t)=>e.score===t.score?j(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var A=/^:[\w-]+$/,pe=3,me=2,he=1,ge=10,_e=-2,ve=e=>e===`*`;function ye(e,t){let n=e.split(`/`),r=n.length;return n.some(ve)&&(r+=_e),t&&(r+=me),n.filter(e=>!ve(e)).reduce((e,t)=>e+(A.test(t)?pe:t===``?he:ge),r)}function j(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function M(e,t,n=!1){let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=be({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=be({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:De([a,u.pathname]),pathnameBase:Oe(De([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=De([a,u.pathnameBase]))}return o}function be(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=xe(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,{paramName:t,isOptional:n},r)=>{if(t===`*`){let e=s[r]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let i=s[r];return n&&!i?e[t]=void 0:e[t]=(i||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function xe(e,t=!1,n=!0){te(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,`/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,`/*`)}".`);let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n,i,a)=>{if(r.push({paramName:t,isOptional:n!=null}),n){let t=a.charAt(i+e.length);return t&&t!==`/`?`/([^\\/]*)`:`(?:/([^\\/]*))?`}return`/([^\\/]+)`}).replace(/\/([\w-]+)\?(\/|$)/g,`(/$1)?$2`);return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function Se(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return te(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function N(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var P=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;function F(e,t=`/`){let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?oe(e):e,a;return n?(n=n.replace(/\/\/+/g,`/`),a=n.startsWith(`/`)?Ce(n.substring(1),`/`):Ce(n,t)):a=t,{pathname:a,search:ke(r),hash:Ae(i)}}function Ce(e,t){let n=t.replace(/\/+$/,``).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function we(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function I(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Te(e){let t=I(e);return t.map((e,n)=>n===t.length-1?e.pathname:e.pathnameBase)}function Ee(e,t,n,r=!1){let i;typeof e==`string`?i=oe(e):(i={...e},D(!i.pathname||!i.pathname.includes(`?`),we(`?`,`pathname`,`search`,i)),D(!i.pathname||!i.pathname.includes(`#`),we(`#`,`pathname`,`hash`,i)),D(!i.search||!i.search.includes(`#`),we(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=F(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var De=e=>e.join(`/`).replace(/\/\/+/g,`/`),Oe=e=>e.replace(/\/+$/,``).replace(/^\/*/,`/`),ke=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ae=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e,je=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||``,this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function Me(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}function Ne(e){return e.map(e=>e.route.path).filter(Boolean).join(`/`).replace(/\/\/*/g,`/`)||`/`}var Pe=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;function Fe(e,t){let n=e;if(typeof n!=`string`||!P.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(Pe)try{let e=new URL(window.location.href),r=n.startsWith(`//`)?new URL(e.protocol+n):new URL(n),a=N(r.pathname,t);r.origin===e.origin&&a!=null?n=a+r.search+r.hash:i=!0}catch{te(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var Ie=[`POST`,`PUT`,`PATCH`,`DELETE`];new Set(Ie);var Le=[`GET`,...Ie];new Set(Le);var Re=w.createContext(null);Re.displayName=`DataRouter`;var ze=w.createContext(null);ze.displayName=`DataRouterState`;var Be=w.createContext(!1);function Ve(){return w.useContext(Be)}var He=w.createContext({isTransitioning:!1});He.displayName=`ViewTransition`;var Ue=w.createContext(new Map);Ue.displayName=`Fetchers`;var We=w.createContext(null);We.displayName=`Await`;var Ge=w.createContext(null);Ge.displayName=`Navigation`;var Ke=w.createContext(null);Ke.displayName=`Location`;var qe=w.createContext({outlet:null,matches:[],isDataRoute:!1});qe.displayName=`Route`;var Je=w.createContext(null);Je.displayName=`RouteError`;var Ye=`REACT_ROUTER_ERROR`,Xe=`REDIRECT`,Ze=`ROUTE_ERROR_RESPONSE`;function Qe(e){if(e.startsWith(`${Ye}:${Xe}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`&&typeof t.location==`string`&&typeof t.reloadDocument==`boolean`&&typeof t.replace==`boolean`)return t}catch{}}function $e(e){if(e.startsWith(`${Ye}:${Ze}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t==`object`&&t&&typeof t.status==`number`&&typeof t.statusText==`string`)return new je(t.status,t.statusText,t.data)}catch{}}function et(e,{relative:t}={}){D(tt(),`useHref() may be used only in the context of a <Router> component.`);let{basename:n,navigator:r}=w.useContext(Ge),{hash:i,pathname:a,search:o}=ct(e,{relative:t}),s=a;return n!==`/`&&(s=a===`/`?n:De([n,a])),r.createHref({pathname:s,search:o,hash:i})}function tt(){return w.useContext(Ke)!=null}function nt(){return D(tt(),`useLocation() may be used only in the context of a <Router> component.`),w.useContext(Ke).location}var rt=`You should call navigate() in a React.useEffect(), not when your component is first rendered.`;function it(e){w.useContext(Ge).static||w.useLayoutEffect(e)}function at(){let{isDataRoute:e}=w.useContext(qe);return e?Et():ot()}function ot(){D(tt(),`useNavigate() may be used only in the context of a <Router> component.`);let e=w.useContext(Re),{basename:t,navigator:n}=w.useContext(Ge),{matches:r}=w.useContext(qe),{pathname:i}=nt(),a=JSON.stringify(Te(r)),o=w.useRef(!1);return it(()=>{o.current=!0}),w.useCallback((r,s={})=>{if(te(o.current,rt),!o.current)return;if(typeof r==`number`){n.go(r);return}let c=Ee(r,JSON.parse(a),i,s.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:De([t,c.pathname])),(s.replace?n.replace:n.push)(c,s.state,s)},[t,n,a,i,e])}w.createContext(null);function st(){let{matches:e}=w.useContext(qe),t=e[e.length-1];return t?t.params:{}}function ct(e,{relative:t}={}){let{matches:n}=w.useContext(qe),{pathname:r}=nt(),i=JSON.stringify(Te(n));return w.useMemo(()=>Ee(e,JSON.parse(i),r,t===`path`),[e,i,r,t])}function lt(e,t){return ut(e,t)}function ut(e,t,n){D(tt(),`useRoutes() may be used only in the context of a <Router> component.`);let{navigator:r}=w.useContext(Ge),{matches:i}=w.useContext(qe),a=i[i.length-1],o=a?a.params:{},s=a?a.pathname:`/`,c=a?a.pathnameBase:`/`,l=a&&a.route;{let e=l&&l.path||``;Ot(s,!l||e.endsWith(`*`)||e.endsWith(`*?`),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e===`/`?`*`:`${e}/*`}">.`)}let u=nt(),d;if(t){let e=typeof t==`string`?oe(t):t;D(c===`/`||e.pathname?.startsWith(c),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`),d=e}else d=u;let f=d.pathname||`/`,p=f;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);p=`/`+f.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let m=k(e,{pathname:p});te(l||m!=null,`No routes matched location "${d.pathname}${d.search}${d.hash}" `),te(m==null||m[m.length-1].route.element!==void 0||m[m.length-1].route.Component!==void 0||m[m.length-1].route.lazy!==void 0,`Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let h=gt(m&&m.map(e=>Object.assign({},e,{params:Object.assign({},o,e.params),pathname:De([c,r.encodeLocation?r.encodeLocation(e.pathname.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:De([c,r.encodeLocation?r.encodeLocation(e.pathnameBase.replace(/%/g,`%25`).replace(/\?/g,`%3F`).replace(/#/g,`%23`)).pathname:e.pathnameBase])})),i,n);return t&&h?w.createElement(Ke.Provider,{value:{location:{pathname:`/`,search:``,hash:``,state:null,key:`default`,unstable_mask:void 0,...d},navigationType:`POP`}},h):h}function L(){let e=Tt(),t=Me(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r=`rgba(200,200,200, 0.5)`,i={padding:`0.5rem`,backgroundColor:r},a={padding:`2px 4px`,backgroundColor:r},o=null;return console.error(`Error handled by React Router default ErrorBoundary:`,e),o=w.createElement(w.Fragment,null,w.createElement(`p`,null,`💿 Hey developer 👋`),w.createElement(`p`,null,`You can provide a way better UX than this when your app throws errors by providing your own `,w.createElement(`code`,{style:a},`ErrorBoundary`),` or`,` `,w.createElement(`code`,{style:a},`errorElement`),` prop on your route.`)),w.createElement(w.Fragment,null,w.createElement(`h2`,null,`Unexpected Application Error!`),w.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?w.createElement(`pre`,{style:i},n):null,o)}var dt=w.createElement(L,null),ft=class extends w.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error(`React Router caught the following error during render`,e)}render(){let e=this.state.error;if(this.context&&typeof e==`object`&&e&&`digest`in e&&typeof e.digest==`string`){let t=$e(e.digest);t&&(e=t)}let t=e===void 0?this.props.children:w.createElement(qe.Provider,{value:this.props.routeContext},w.createElement(Je.Provider,{value:e,children:this.props.component}));return this.context?w.createElement(mt,{error:e},t):t}};ft.contextType=Be;var pt=new WeakMap;function mt({children:e,error:t}){let{basename:n}=w.useContext(Ge);if(typeof t==`object`&&t&&`digest`in t&&typeof t.digest==`string`){let e=Qe(t.digest);if(e){let r=pt.get(t);if(r)throw r;let i=Fe(e.location,n);if(Pe&&!pt.get(t))if(i.isExternal||e.reloadDocument)window.location.href=i.absoluteURL||i.to;else{let n=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(i.to,{replace:e.replace}));throw pt.set(t,n),n}return w.createElement(`meta`,{httpEquiv:`refresh`,content:`0;url=${i.absoluteURL||i.to}`})}}return e}function ht({routeContext:e,match:t,children:n}){let r=w.useContext(Re);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),w.createElement(qe.Provider,{value:e},n)}function gt(e,t=[],n){let r=n?.state;if(e==null){if(!r)return null;if(r.errors)e=r.matches;else if(t.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let i=e,a=r?.errors;if(a!=null){let e=i.findIndex(e=>e.route.id&&a?.[e.route.id]!==void 0);D(e>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`),i=i.slice(0,Math.min(i.length,e+1))}let o=!1,s=-1;if(n&&r){o=r.renderFallback;for(let e=0;e<i.length;e++){let t=i[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(s=e),t.route.id){let{loaderData:e,errors:a}=r,c=t.route.loader&&!e.hasOwnProperty(t.route.id)&&(!a||a[t.route.id]===void 0);if(t.route.lazy||c){n.isStatic&&(o=!0),i=s>=0?i.slice(0,s+1):[i[0]];break}}}}let c=n?.onError,l=r&&c?(e,t)=>{c(e,{location:r.location,params:r.matches?.[0]?.params??{},unstable_pattern:Ne(r.matches),errorInfo:t})}:void 0;return i.reduceRight((e,n,c)=>{let u,d=!1,f=null,p=null;r&&(u=a&&n.route.id?a[n.route.id]:void 0,f=n.route.errorElement||dt,o&&(s<0&&c===0?(Ot(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),d=!0,p=null):s===c&&(d=!0,p=n.route.hydrateFallbackElement||null)));let m=t.concat(i.slice(0,c+1)),h=()=>{let t;return t=u?f:d?p:n.route.Component?w.createElement(n.route.Component,null):n.route.element?n.route.element:e,w.createElement(ht,{match:n,routeContext:{outlet:e,matches:m,isDataRoute:r!=null},children:t})};return r&&(n.route.ErrorBoundary||n.route.errorElement||c===0)?w.createElement(ft,{location:r.location,revalidation:r.revalidation,component:f,error:u,children:h(),routeContext:{outlet:null,matches:m,isDataRoute:!0},onError:l}):h()},null)}function _t(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function vt(e){let t=w.useContext(Re);return D(t,_t(e)),t}function yt(e){let t=w.useContext(ze);return D(t,_t(e)),t}function bt(e){let t=w.useContext(qe);return D(t,_t(e)),t}function xt(e){let t=bt(e),n=t.matches[t.matches.length-1];return D(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function St(){return xt(`useRouteId`)}function Ct(){return yt(`useNavigation`).navigation}function wt(){let{matches:e,loaderData:t}=yt(`useMatches`);return w.useMemo(()=>e.map(e=>le(e,t)),[e,t])}function Tt(){let e=w.useContext(Je),t=yt(`useRouteError`),n=xt(`useRouteError`);return e===void 0?t.errors?.[n]:e}function Et(){let{router:e}=vt(`useNavigate`),t=xt(`useNavigate`),n=w.useRef(!1);return it(()=>{n.current=!0}),w.useCallback(async(r,i={})=>{te(n.current,rt),n.current&&(typeof r==`number`?await e.navigate(r):await e.navigate(r,{fromRouteId:t,...i}))},[e,t])}var Dt={};function Ot(e,t,n){!t&&!Dt[e]&&(Dt[e]=!0,te(!1,n))}w.useOptimistic,w.memo(kt);function kt({routes:e,future:t,state:n,isStatic:r,onError:i}){return ut(e,void 0,{state:n,isStatic:r,onError:i,future:t})}function At(e){D(!1,`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`)}function jt({basename:e=`/`,children:t=null,location:n,navigationType:r=`POP`,navigator:i,static:a=!1,unstable_useTransitions:o}){D(!tt(),`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`);let s=e.replace(/^\/*/,`/`),c=w.useMemo(()=>({basename:s,navigator:i,static:a,unstable_useTransitions:o,future:{}}),[s,i,a,o]);typeof n==`string`&&(n=oe(n));let{pathname:l=`/`,search:u=``,hash:d=``,state:f=null,key:p=`default`,unstable_mask:m}=n,h=w.useMemo(()=>{let e=N(l,s);return e==null?null:{location:{pathname:e,search:u,hash:d,state:f,key:p,unstable_mask:m},navigationType:r}},[s,l,u,d,f,p,r,m]);return te(h!=null,`<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`),h==null?null:w.createElement(Ge.Provider,{value:c},w.createElement(Ke.Provider,{children:t,value:h}))}function Mt({children:e,location:t}){return lt(Nt(e),t)}w.Component;function Nt(e,t=[]){let n=[];return w.Children.forEach(e,(e,r)=>{if(!w.isValidElement(e))return;let i=[...t,r];if(e.type===w.Fragment){n.push.apply(n,Nt(e.props.children,i));return}D(e.type===At,`[${typeof e.type==`string`?e.type:e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),D(!e.props.index||!e.props.children,`An index route cannot have child routes.`);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,middleware:e.props.middleware,loader:e.props.loader,action:e.props.action,hydrateFallbackElement:e.props.hydrateFallbackElement,HydrateFallback:e.props.HydrateFallback,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.hasErrorBoundary===!0||e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Nt(e.props.children,i)),n.push(a)}),n}var Pt=`get`,Ft=`application/x-www-form-urlencoded`;function It(e){return typeof HTMLElement<`u`&&e instanceof HTMLElement}function Lt(e){return It(e)&&e.tagName.toLowerCase()===`button`}function Rt(e){return It(e)&&e.tagName.toLowerCase()===`form`}function zt(e){return It(e)&&e.tagName.toLowerCase()===`input`}function Bt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Vt(e,t){return e.button===0&&(!t||t===`_self`)&&!Bt(e)}var Ht=null;function Ut(){if(Ht===null)try{new FormData(document.createElement(`form`),0),Ht=!1}catch{Ht=!0}return Ht}var Wt=new Set([`application/x-www-form-urlencoded`,`multipart/form-data`,`text/plain`]);function Gt(e){return e!=null&&!Wt.has(e)?(te(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ft}"`),null):e}function Kt(e,t){let n,r,i,a,o;if(Rt(e)){let o=e.getAttribute(`action`);r=o?N(o,t):null,n=e.getAttribute(`method`)||Pt,i=Gt(e.getAttribute(`enctype`))||Ft,a=new FormData(e)}else if(Lt(e)||zt(e)&&(e.type===`submit`||e.type===`image`)){let o=e.form;if(o==null)throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);let s=e.getAttribute(`formaction`)||o.getAttribute(`action`);if(r=s?N(s,t):null,n=e.getAttribute(`formmethod`)||o.getAttribute(`method`)||Pt,i=Gt(e.getAttribute(`formenctype`))||Gt(o.getAttribute(`enctype`))||Ft,a=new FormData(o,e),!Ut()){let{name:t,type:n,value:r}=e;if(n===`image`){let e=t?`${t}.`:``;a.append(`${e}x`,`0`),a.append(`${e}y`,`0`)}else t&&a.append(t,r)}}else if(It(e))throw Error(`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`);else n=Pt,r=null,i=Ft,o=e;return a&&i===`text/plain`&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);var qt={"&":`\\u0026`,">":`\\u003e`,"<":`\\u003c`,"\u2028":`\\u2028`,"\u2029":`\\u2029`},Jt=/[&><\u2028\u2029]/g;function Yt(e){return e.replace(Jt,e=>qt[e])}function Xt(e,t){if(e===!1||e==null)throw Error(t)}function Zt(e,t,n,r){let i=typeof e==`string`?new URL(e,typeof window>`u`?`server://singlefetch/`:window.location.origin):e;return n?i.pathname.endsWith(`/`)?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname===`/`?i.pathname=`_root.${r}`:t&&N(i.pathname,t)===`/`?i.pathname=`${t.replace(/\/$/,``)}/_root.${r}`:i.pathname=`${i.pathname.replace(/\/$/,``)}.${r}`,i}async function Qt(e,t){if(e.id in t)return t[e.id];try{let n=await C(()=>import(e.module),[]);return t[e.id]=n,n}catch(t){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(t),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function $t(e){return e!=null&&typeof e.page==`string`}function en(e){return e==null?!1:e.href==null?e.rel===`preload`&&typeof e.imageSrcSet==`string`&&typeof e.imageSizes==`string`:typeof e.rel==`string`&&typeof e.href==`string`}async function tn(e,t,n){return sn((await Promise.all(e.map(async e=>{let r=t.routes[e.route.id];if(r){let e=await Qt(r,n);return e.links?e.links():[]}return[]}))).flat(1).filter(en).filter(e=>e.rel===`stylesheet`||e.rel===`preload`).map(e=>e.rel===`stylesheet`?{...e,rel:`prefetch`,as:`style`}:{...e,rel:`prefetch`}))}function nn(e,t,n,r,i,a){let o=(e,t)=>n[t]?e.route.id!==n[t].route.id:!0,s=(e,t)=>n[t].pathname!==e.pathname||n[t].route.path?.endsWith(`*`)&&n[t].params[`*`]!==e.params[`*`];return a===`assets`?t.filter((e,t)=>o(e,t)||s(e,t)):a===`data`?t.filter((t,a)=>{let c=r.routes[t.route.id];if(!c||!c.hasLoader)return!1;if(o(t,a)||s(t,a))return!0;if(t.route.shouldRevalidate){let r=t.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:n[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:t.params,defaultShouldRevalidate:!0});if(typeof r==`boolean`)return r}return!0}):[]}function rn(e,t,{includeHydrateFallback:n}={}){return an(e.map(e=>{let r=t.routes[e.route.id];if(!r)return[];let i=[r.module];return r.clientActionModule&&(i=i.concat(r.clientActionModule)),r.clientLoaderModule&&(i=i.concat(r.clientLoaderModule)),n&&r.hydrateFallbackModule&&(i=i.concat(r.hydrateFallbackModule)),r.imports&&(i=i.concat(r.imports)),i}).flat(1))}function an(e){return[...new Set(e)]}function on(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function sn(e,t){let n=new Set,r=new Set(t);return e.reduce((e,i)=>{if(t&&!$t(i)&&i.as===`script`&&i.href&&r.has(i.href))return e;let a=JSON.stringify(on(i));return n.has(a)||(n.add(a),e.push({key:a,link:i})),e},[])}function cn(){let e=w.useContext(Re);return Xt(e,`You must render this element inside a <DataRouterContext.Provider> element`),e}function ln(){let e=w.useContext(ze);return Xt(e,`You must render this element inside a <DataRouterStateContext.Provider> element`),e}var un=w.createContext(void 0);un.displayName=`FrameworkContext`;function dn(){let e=w.useContext(un);return Xt(e,`You must render this element inside a <HydratedRouter> element`),e}function fn(e,t){let n=w.useContext(un),[r,i]=w.useState(!1),[a,o]=w.useState(!1),{onFocus:s,onBlur:c,onMouseEnter:l,onMouseLeave:u,onTouchStart:d}=t,f=w.useRef(null);w.useEffect(()=>{if(e===`render`&&o(!0),e===`viewport`){let e=new IntersectionObserver(e=>{e.forEach(e=>{o(e.isIntersecting)})},{threshold:.5});return f.current&&e.observe(f.current),()=>{e.disconnect()}}},[e]),w.useEffect(()=>{if(r){let e=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(e)}}},[r]);let p=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e===`intent`?[a,f,{onFocus:pn(s,p),onBlur:pn(c,m),onMouseEnter:pn(l,p),onMouseLeave:pn(u,m),onTouchStart:pn(d,p)}]:[a,f,{}]:[!1,f,{}]}function pn(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function mn({page:e,...t}){let n=Ve(),{router:r}=cn(),i=w.useMemo(()=>k(r.routes,e,r.basename),[r.routes,e,r.basename]);return i?n?w.createElement(gn,{page:e,matches:i,...t}):w.createElement(_n,{page:e,matches:i,...t}):null}function hn(e){let{manifest:t,routeModules:n}=dn(),[r,i]=w.useState([]);return w.useEffect(()=>{let r=!1;return tn(e,t,n).then(e=>{r||i(e)}),()=>{r=!0}},[e,t,n]),r}function gn({page:e,matches:t,...n}){let r=nt(),{future:i}=dn(),{basename:a}=cn(),o=w.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=Zt(e,a,i.unstable_trailingSlashAwareDataRequests,`rsc`),o=!1,s=[];for(let e of t)typeof e.route.shouldRevalidate==`function`?o=!0:s.push(e.route.id);return o&&s.length>0&&n.searchParams.set(`_routes`,s.join(`,`)),[n.pathname+n.search]},[a,i.unstable_trailingSlashAwareDataRequests,e,r,t]);return w.createElement(w.Fragment,null,o.map(e=>w.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})))}function _n({page:e,matches:t,...n}){let r=nt(),{future:i,manifest:a,routeModules:o}=dn(),{basename:s}=cn(),{loaderData:c,matches:l}=ln(),u=w.useMemo(()=>nn(e,t,l,a,r,`data`),[e,t,l,a,r]),d=w.useMemo(()=>nn(e,t,l,a,r,`assets`),[e,t,l,a,r]),f=w.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let n=new Set,l=!1;if(t.forEach(e=>{let t=a.routes[e.route.id];!t||!t.hasLoader||(!u.some(t=>t.route.id===e.route.id)&&e.route.id in c&&o[e.route.id]?.shouldRevalidate||t.hasClientLoader?l=!0:n.add(e.route.id))}),n.size===0)return[];let d=Zt(e,s,i.unstable_trailingSlashAwareDataRequests,`data`);return l&&n.size>0&&d.searchParams.set(`_routes`,t.filter(e=>n.has(e.route.id)).map(e=>e.route.id).join(`,`)),[d.pathname+d.search]},[s,i.unstable_trailingSlashAwareDataRequests,c,r,a,u,t,e,o]),p=w.useMemo(()=>rn(d,a),[d,a]),m=hn(d);return w.createElement(w.Fragment,null,f.map(e=>w.createElement(`link`,{key:e,rel:`prefetch`,as:`fetch`,href:e,...n})),p.map(e=>w.createElement(`link`,{key:e,rel:`modulepreload`,href:e,...n})),m.map(({key:e,link:t})=>w.createElement(`link`,{key:e,nonce:n.nonce,...t,crossOrigin:t.crossOrigin??n.crossOrigin})))}function vn(...e){return t=>{e.forEach(e=>{typeof e==`function`?e(t):e!=null&&(e.current=t)})}}w.Component;var yn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0;try{yn&&(window.__reactRouterVersion=`7.14.0`)}catch{}function bn({basename:e,children:t,unstable_useTransitions:n,window:r}){let i=w.useRef();i.current??=ee({window:r,v5Compat:!0});let a=i.current,[o,s]=w.useState({action:a.action,location:a.location}),c=w.useCallback(e=>{n===!1?s(e):w.startTransition(()=>s(e))},[n]);return w.useLayoutEffect(()=>a.listen(c),[a,c]),w.createElement(jt,{basename:e,children:t,location:o.location,navigationType:o.action,navigator:a,unstable_useTransitions:n})}function xn({basename:e,children:t,history:n,unstable_useTransitions:r}){let[i,a]=w.useState({action:n.action,location:n.location}),o=w.useCallback(e=>{r===!1?a(e):w.startTransition(()=>a(e))},[r]);return w.useLayoutEffect(()=>n.listen(o),[n,o]),w.createElement(jt,{basename:e,children:t,location:i.location,navigationType:i.action,navigator:n,unstable_useTransitions:r})}xn.displayName=`unstable_HistoryRouter`;var Sn=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,R=w.forwardRef(function({onClick:e,discover:t=`render`,prefetch:n=`none`,relative:r,reloadDocument:i,replace:a,unstable_mask:o,state:s,target:c,to:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m){let{basename:h,navigator:g,unstable_useTransitions:_}=w.useContext(Ge),v=typeof l==`string`&&Sn.test(l),y=Fe(l,h);l=y.to;let b=et(l,{relative:r}),x=nt(),S=null;if(o){let e=Ee(o,[],x.unstable_mask?x.unstable_mask.pathname:`/`,!0);h!==`/`&&(e.pathname=e.pathname===`/`?h:De([h,e.pathname])),S=g.createHref(e)}let[C,T,E]=fn(n,p),ee=kn(l,{replace:a,unstable_mask:o,state:s,target:c,preventScrollReset:u,relative:r,viewTransition:d,unstable_defaultShouldRevalidate:f,unstable_useTransitions:_});function D(t){e&&e(t),t.defaultPrevented||ee(t)}let te=!(y.isExternal||i),ne=w.createElement(`a`,{...p,...E,href:(te?S:void 0)||y.absoluteURL||b,onClick:te?D:e,ref:vn(m,T),target:c,"data-discover":!v&&t===`render`?`true`:void 0});return C&&!v?w.createElement(w.Fragment,null,ne,w.createElement(mn,{page:b})):ne});R.displayName=`Link`;var Cn=w.forwardRef(function({"aria-current":e=`page`,caseSensitive:t=!1,className:n=``,end:r=!1,style:i,to:a,viewTransition:o,children:s,...c},l){let u=ct(a,{relative:c.relative}),d=nt(),f=w.useContext(ze),{navigator:p,basename:m}=w.useContext(Ge),h=f!=null&&Rn(u)&&o===!0,g=p.encodeLocation?p.encodeLocation(u).pathname:u.pathname,_=d.pathname,v=f&&f.navigation&&f.navigation.location?f.navigation.location.pathname:null;t||(_=_.toLowerCase(),v=v?v.toLowerCase():null,g=g.toLowerCase()),v&&m&&(v=N(v,m)||v);let y=g!==`/`&&g.endsWith(`/`)?g.length-1:g.length,b=_===g||!r&&_.startsWith(g)&&_.charAt(y)===`/`,x=v!=null&&(v===g||!r&&v.startsWith(g)&&v.charAt(g.length)===`/`),S={isActive:b,isPending:x,isTransitioning:h},C=b?e:void 0,T;T=typeof n==`function`?n(S):[n,b?`active`:null,x?`pending`:null,h?`transitioning`:null].filter(Boolean).join(` `);let E=typeof i==`function`?i(S):i;return w.createElement(R,{...c,"aria-current":C,className:T,ref:l,style:E,to:a,viewTransition:o},typeof s==`function`?s(S):s)});Cn.displayName=`NavLink`;var wn=w.forwardRef(({discover:e=`render`,fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=Pt,action:s,onSubmit:c,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f,...p},m)=>{let{unstable_useTransitions:h}=w.useContext(Ge),g=Mn(),_=Nn(s,{relative:l}),v=o.toLowerCase()===`get`?`get`:`post`,y=typeof s==`string`&&Sn.test(s);return w.createElement(`form`,{ref:m,method:v,action:_,onSubmit:r?c:e=>{if(c&&c(e),e.defaultPrevented)return;e.preventDefault();let r=e.nativeEvent.submitter,s=r?.getAttribute(`formmethod`)||o,p=()=>g(r||e.currentTarget,{fetcherKey:t,method:s,navigate:n,replace:i,state:a,relative:l,preventScrollReset:u,viewTransition:d,unstable_defaultShouldRevalidate:f});h&&n!==!1?w.startTransition(()=>p()):p()},...p,"data-discover":!y&&e===`render`?`true`:void 0})});wn.displayName=`Form`;function Tn({getKey:e,storageKey:t,...n}){let r=w.useContext(un),{basename:i}=w.useContext(Ge),a=nt(),o=wt();z({getKey:e,storageKey:t});let s=w.useMemo(()=>{if(!r||!e)return null;let t=In(a,o,i,e);return t===a.key?null:t},[]);if(!r||r.isSpaMode)return null;let c=((e,t)=>{if(!window.history.state||!window.history.state.key){let e=Math.random().toString(32).slice(2);window.history.replaceState({key:e},``)}try{let n=JSON.parse(sessionStorage.getItem(e)||`{}`)[t||window.history.state.key];typeof n==`number`&&window.scrollTo(0,n)}catch(t){console.error(t),sessionStorage.removeItem(e)}}).toString();return w.createElement(`script`,{...n,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${c})(${Yt(JSON.stringify(t||Pn))}, ${Yt(JSON.stringify(s))})`}})}Tn.displayName=`ScrollRestoration`;function En(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Dn(e){let t=w.useContext(Re);return D(t,En(e)),t}function On(e){let t=w.useContext(ze);return D(t,En(e)),t}function kn(e,{target:t,replace:n,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c,unstable_useTransitions:l}={}){let u=at(),d=nt(),f=ct(e,{relative:o});return w.useCallback(p=>{if(Vt(p,t)){p.preventDefault();let t=n===void 0?ae(d)===ae(f):n,m=()=>u(e,{replace:t,unstable_mask:r,state:i,preventScrollReset:a,relative:o,viewTransition:s,unstable_defaultShouldRevalidate:c});l?w.startTransition(()=>m()):m()}},[d,u,f,n,r,i,t,e,a,o,s,c,l])}var An=0,jn=()=>`__${String(++An)}__`;function Mn(){let{router:e}=Dn(`useSubmit`),{basename:t}=w.useContext(Ge),n=St(),r=e.fetch,i=e.navigate;return w.useCallback(async(e,a={})=>{let{action:o,method:s,encType:c,formData:l,body:u}=Kt(e,t);a.navigate===!1?await r(a.fetcherKey||jn(),n,a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,flushSync:a.flushSync}):await i(a.action||o,{unstable_defaultShouldRevalidate:a.unstable_defaultShouldRevalidate,preventScrollReset:a.preventScrollReset,formData:l,body:u,formMethod:a.method||s,formEncType:a.encType||c,replace:a.replace,state:a.state,fromRouteId:n,flushSync:a.flushSync,viewTransition:a.viewTransition})},[r,i,t,n])}function Nn(e,{relative:t}={}){let{basename:n}=w.useContext(Ge),r=w.useContext(qe);D(r,`useFormAction must be used inside a RouteContext`);let[i]=r.matches.slice(-1),a={...ct(e||`.`,{relative:t})},o=nt();if(e==null){a.search=o.search;let e=new URLSearchParams(a.search),t=e.getAll(`index`);if(t.some(e=>e===``)){e.delete(`index`),t.filter(e=>e).forEach(t=>e.append(`index`,t));let n=e.toString();a.search=n?`?${n}`:``}}return(!e||e===`.`)&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,`?index&`):`?index`),n!==`/`&&(a.pathname=a.pathname===`/`?n:De([n,a.pathname])),ae(a)}var Pn=`react-router-scroll-positions`,Fn={};function In(e,t,n,r){let i=null;return r&&(i=r(n===`/`?e:{...e,pathname:N(e.pathname,n)||e.pathname},t)),i??=e.key,i}function z({getKey:e,storageKey:t}={}){let{router:n}=Dn(`useScrollRestoration`),{restoreScrollPosition:r,preventScrollReset:i}=On(`useScrollRestoration`),{basename:a}=w.useContext(Ge),o=nt(),s=wt(),c=Ct();w.useEffect(()=>(window.history.scrollRestoration=`manual`,()=>{window.history.scrollRestoration=`auto`}),[]),Ln(w.useCallback(()=>{if(c.state===`idle`){let t=In(o,s,a,e);Fn[t]=window.scrollY}try{sessionStorage.setItem(t||Pn,JSON.stringify(Fn))}catch(e){te(!1,`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${e}).`)}window.history.scrollRestoration=`auto`},[c.state,e,a,o,s,t])),typeof document<`u`&&(w.useLayoutEffect(()=>{try{let e=sessionStorage.getItem(t||Pn);e&&(Fn=JSON.parse(e))}catch{}},[t]),w.useLayoutEffect(()=>{let t=n?.enableScrollRestoration(Fn,()=>window.scrollY,e?(t,n)=>In(t,n,a,e):void 0);return()=>t&&t()},[n,a,e]),w.useLayoutEffect(()=>{if(r!==!1){if(typeof r==`number`){window.scrollTo(0,r);return}try{if(o.hash){let e=document.getElementById(decodeURIComponent(o.hash.slice(1)));if(e){e.scrollIntoView();return}}}catch{te(!1,`"${o.hash.slice(1)}" is not a decodable element ID. The view will not scroll to it.`)}i!==!0&&window.scrollTo(0,0)}},[o,r,i]))}function Ln(e,t){let{capture:n}=t||{};w.useEffect(()=>{let t=n==null?void 0:{capture:n};return window.addEventListener(`pagehide`,e,t),()=>{window.removeEventListener(`pagehide`,e,t)}},[e,n])}function Rn(e,{relative:t}={}){let n=w.useContext(He);D(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=Dn(`useViewTransitionState`),i=ct(e,{relative:t});if(!n.isTransitioning)return!1;let a=N(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=N(n.nextLocation.pathname,r)||n.nextLocation.pathname;return be(i.pathname,o)!=null||be(i.pathname,a)!=null}var zn=s(((e,t)=>{(()=>{var e={271:((e,t,n)=>{n.d(t,{Z:()=>r});let r=((e,t)=>e?function(){var e=[...arguments];return console.log(`<${t}/> Debug Log: `,...e)}:()=>{})}),88:((e,t,n)=>{n.d(t,{Z:()=>te});var r=n(497),i=n.n(r),a=n(379),o=n.n(a),s=n(795),c=n.n(s),l=n(569),u=n.n(l),d=n(565),f=n.n(d),p=n(216),m=n.n(p),h=n(589),g=n.n(h),_=n(563),v={};v.styleTagTransform=g(),v.setAttributes=f(),v.insert=u().bind(null,`head`),v.domAPI=c(),v.insertStyleElement=m(),o()(_.Z,v),_.Z&&_.Z.locals&&_.Z.locals;var y=n(271),b=n(542);function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?x(Object(n),!0).forEach(function(t){C(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let w,T=e=>typeof e==`function`,E=(e,t)=>e.length===t.length?e.find(e=>!t.includes(e))==null:!1,ee=[`afterLoad`,`afterRender`,`afterResize`,`afterResponsive`,`afterSlideLoad`,`onLeave`,`onSlideLeave`];class D extends i().Component{constructor(e){super(e);let{render:t,pluginWrapper:r}=this.props;if(!T(t))throw Error(`must provide render prop to <ReactFullpage />`);this.log=(0,y.Z)(this.props.debug,`ReactFullpage`),this.log(`Building component`),this.log(`Importing vendor files`),this.importVendors(),r&&(this.log(`Calling plugin wrapper`),r()),this.log(`Requiring fullpage.js`),w=n(933),this.state={initialized:!1,sectionCount:0,slideCount:0}}componentDidMount(){let e=this.buildOptions();this.log(`React Lifecycle: componentDidMount()`),w&&(this.init(e),this.markInitialized())}isReRenderNecessary(e){let t=this.getSectionCount(),n=this.getSlideCount(),{sectionCount:r,slideCount:i}=this.state,a=r!==t||i!==n;return[`sectionsColor`,`navigationTooltips`,`navigationPosition`,`navigation`,`scrollBar`].forEach(t=>{e[t]!==void 0&&(Array.isArray(e[t])?a||=!E(e[t],this.props[t]):a||=e[t]!==this.props[t])}),a}componentDidUpdate(e){if(this.log(`React Lifecycle: componentDidUpdate()`),this.isReRenderNecessary(e)){this.log(`rebuilding due to a change in fullpage.js props or num sections/slides`),this.reRender();return}}componentWillUnmount(){this.destroy()}getSectionCount(){let{sectionSelector:e=b.uS}=this.props,{length:t}=document.querySelectorAll(e);return t}getSlideCount(){let{slideSelector:e=b.xH}=this.props,{length:t}=document.querySelectorAll(e);return t}importVendors(){let{easing:e,css3:t}=this.props;e&&!t&&n(239)}init(e){this.log(`Reinitializing fullpage with options`,e);let t=e.animateAnchor;e.animateAnchor=!1,new w(b.Km,e),this.fullpageApi=window.fullpage_api,this.fpUtils=window.fp_utils,this.fpEasings=window.fp_easings,window.fullpage_api.getFullpageData().options.animateAnchor=t}destroy(){this.log(`Destroying fullpage instance`),this.fullpageApi.destroy(`all`)}reRender(){let e=this.props.slideSelector||`.slide`,t=this.props.sectionSelector||`.section`,n=document.querySelector(t+`.active`),r=n?this.fpUtils.index(n):this.state.destination?this.state.destination.index-1:0,i=document.querySelector(t+`.active `+e+`.active`),a=i?this.fpUtils.index(i):-1;this.destroy(),r>-1&&this.fpUtils.addClass(document.querySelectorAll(t)[r],`active`),a>-1&&this.fpUtils.addClass(i,`active`),this.init(this.buildOptions())}markInitialized(){this.log(`Marking initialized`),this.setState({initialized:!0,sectionCount:this.getSectionCount(),slideCount:this.getSlideCount()})}buildOptions(){var e=this;let t=null;this.state.initialized||(t=ee.filter(e=>!!Object.keys(this.props).find(t=>t===e)).reduce((t,n)=>S(S({},t),{},{[n]:function(){var t=[...arguments];return e.update(n,...t)}}),{}));let n=S(S({},this.props),t);return this.log(`Building fullpage.js options: `,n),n}update(e){var t=[...arguments].slice(1);this.log(`Event trigger: `,e);let n=S(S({},this.state),{},{sectionCount:this.getSectionCount(),slideCount:this.getSlideCount()}),r=t=>S(S(S({},n),t),{},{lastEvent:e}),i=e=>e.reduce((e,n,r)=>(e[n]=t[r],e),{});switch(e){case`afterLoad`:n=r(i([`origin`,`destination`,`direction`]));break;case`afterResize`:n=r(i([``]));break;case`afterResponsive`:n=r(i([`isResponsive`]));break;case`afterSlideLoad`:n=r(i([`section`,`origin`,`destination`,`direction`]));break;case`onLeave`:n=r(i([`origin`,`destination`,`direction`]));break;case`onSlideLeave`:n=r(i([`section`,`origin`,`slideIndex`,`destination`,`direction`]));break;default:break}let a=this.props[e](...t);return this.log(`Called callback: Returning => `,a),this.log(`Updating State => `,n),this.setState(n),a}render(){return this.log(`<== Rendering ==>`),i().createElement(`div`,{id:b.W1},this.props.render(this))}}D.defaultProps={sectionsColor:[]};let te=D}),882:((e,t,n)=>{n.d(t,{Z:()=>c});var r=n(497),i=n.n(r),a=n(271),o=n(542);class s extends i().Component{constructor(e){super(e),this.state={},this.log=(0,a.Z)(this.props.debug,`ReactFullpageShell`),this.log(`Building component`)}render(){return i().createElement(`div`,{id:o.W1},this.props.render(this))}}let c=s}),542:((e,t,n)=>{n.d(t,{W1:()=>r,Km:()=>i,uS:()=>a,xH:()=>o});let r=`fullpage`,i=`#${r}`,a=`.section`,o=`.slide`}),563:((e,t,n)=>{n.d(t,{Z:()=>a});var r=n(645),i=n.n(r)()(function(e){return e[1]});i.push([e.id,`/*!\r
 * fullPage 4.0.33\r
 * https://github.com/alvarotrigo/fullPage.js\r
 *\r
 * @license GPLv3 for open source use only\r
 * or Fullpage Commercial License for commercial use\r
 * http://alvarotrigo.com/fullPage/pricing/\r
 *\r
 * Copyright (C) 2021 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo\r
 */.fp-enabled body,html.fp-enabled{margin:0;padding:0;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0)}.fp-section{position:relative;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;height:100%;display:block}.fp-slide{float:left}.fp-slide,.fp-slidesContainer{height:100%;display:block}.fp-slides{z-index:1;height:100%;overflow:hidden;position:relative;-webkit-transition:all .3s ease-out;transition:all .3s ease-out}.fp-table{display:flex;flex-direction:column;justify-content:center;width:100%}.fp-slidesContainer{float:left;position:relative}.fp-controlArrow{-webkit-user-select:none;-moz-user-select:none;-khtml-user-select:none;-ms-user-select:none;position:absolute;z-index:4;top:50%;cursor:pointer;margin-top:-38px;-webkit-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.fp-prev{left:15px}.fp-next{right:15px}.fp-arrow{width:0;height:0;border-style:solid}.fp-arrow.fp-prev{border-width:38.5px 34px 38.5px 0;border-color:transparent #fff transparent transparent}.fp-arrow.fp-next{border-width:38.5px 0 38.5px 34px;border-color:transparent transparent transparent #fff}.fp-notransition{-webkit-transition:none!important;transition:none!important}#fp-nav{position:fixed;z-index:100;top:50%;opacity:1;transform:translateY(-50%);-ms-transform:translateY(-50%);-webkit-transform:translate3d(0,-50%,0);pointer-events:none}#fp-nav.fp-right{right:17px}#fp-nav.fp-left{left:17px}.fp-slidesNav{position:absolute;z-index:4;opacity:1;-webkit-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0);left:0!important;right:0;margin:0 auto!important;pointer-events:none}.fp-slidesNav.fp-bottom{bottom:17px}.fp-slidesNav.fp-top{top:17px}#fp-nav ul,.fp-slidesNav ul{margin:0;padding:0}#fp-nav ul li,.fp-slidesNav ul li{display:block;width:14px;height:13px;margin:7px;position:relative}.fp-slidesNav ul li{display:inline-block}#fp-nav ul li a,.fp-slidesNav ul li a{display:block;position:relative;z-index:1;width:100%;height:100%;cursor:pointer;text-decoration:none;pointer-events:all}#fp-nav ul li a.active span,#fp-nav ul li:hover a.active span,.fp-slidesNav ul li a.active span,.fp-slidesNav ul li:hover a.active span{height:12px;width:12px;margin:-6px 0 0 -6px;border-radius:100%}#fp-nav ul li a span,.fp-slidesNav ul li a span{border-radius:50%;position:absolute;z-index:1;height:4px;width:4px;border:0;background:#333;left:50%;top:50%;margin:-2px 0 0 -2px;-webkit-transition:all .1s ease-in-out;-moz-transition:all .1s ease-in-out;-o-transition:all .1s ease-in-out;transition:all .1s ease-in-out}#fp-nav ul li:hover a span,.fp-slidesNav ul li:hover a span{width:10px;height:10px;margin:-5px 0 0 -5px}#fp-nav ul li .fp-tooltip{position:absolute;top:-2px;color:#fff;font-size:14px;font-family:arial,helvetica,sans-serif;white-space:nowrap;max-width:220px;overflow:hidden;display:block;opacity:0;width:0;cursor:pointer}#fp-nav ul li:hover .fp-tooltip,#fp-nav.fp-show-active a.active+.fp-tooltip{-webkit-transition:opacity .2s ease-in;transition:opacity .2s ease-in;width:auto;opacity:1}#fp-nav ul li .fp-tooltip.fp-right{right:20px}#fp-nav ul li .fp-tooltip.fp-left{left:20px}.fp-auto-height .fp-slide,.fp-auto-height.fp-section{height:auto!important}.fp-responsive .fp-is-overflow.fp-section{height:auto!important}.fp-enabled .fp-scrollable{overflow:visible;height:initial}.fp-scrollable .fp-section,.fp-scrollable .fp-slide,.fp-scrollable.fp-responsive .fp-is-overflow.fp-section{height:100vh;height:calc(var(--vh,1vh) * 100)}.fp-scrollable .fp-section:not(.fp-auto-height):not([data-percentage]),.fp-scrollable .fp-slide:not(.fp-auto-height):not([data-percentage]),.fp-scrollable.fp-responsive .fp-is-overflow.fp-section:not(.fp-auto-height):not([data-percentage]){min-height:100vh;min-height:calc(var(--vh,1vh) * 100)}.fp-overflow{justify-content:flex-start}body:not(.fp-responsive) .fp-overflow{max-height:100vh;max-height:100dvh}.fp-scrollable .fp-auto-height .fp-overflow{max-height:none}.fp-is-overflow .fp-overflow.fp-auto-height,.fp-is-overflow .fp-overflow.fp-auto-height-responsive,.fp-is-overflow>.fp-overflow{overflow-y:auto}.fp-overflow{outline:0}.fp-overflow.fp-table{display:block}.fp-responsive .fp-auto-height-responsive .fp-overflow,.fp-responsive .fp-auto-height-responsive .fp-slide,.fp-responsive .fp-auto-height-responsive.fp-section{height:auto!important;min-height:auto!important}.fp-sr-only{position:absolute;width:1px;height:1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.fp-scroll-mac .fp-overflow::-webkit-scrollbar{background-color:transparent;width:9px}.fp-scroll-mac .fp-overflow::-webkit-scrollbar-track{background-color:transparent}.fp-scroll-mac .fp-overflow::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,.4);border-radius:16px;border:4px solid transparent}.fp-warning,.fp-watermark{z-index:9999999;position:absolute;bottom:0}.fp-warning,.fp-watermark a{text-decoration:none;color:#000;background:rgba(255,255,255,.6);padding:5px 8px;font-size:14px;font-family:arial;color:#000;display:inline-block;border-radius:3px;margin:12px}.fp-noscroll .fp-overflow{overflow:hidden}\r
`,``]);let a=i}),645:(e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=e(t);return t[2]?`@media ${t[2]} {${n}}`:n}).join(``)},t.i=function(e,n,r){typeof e==`string`&&(e=[[null,e,``]]);var i={};if(r)for(var a=0;a<this.length;a++){var o=this[a][0];o!=null&&(i[o]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);r&&i[c[0]]||(n&&(c[2]?c[2]=`${n} and ${c[2]}`:c[2]=n),t.push(c))}},t}}),933:(function(e){(function(t,n){e.exports=n()})(this,(function(){var e,t,n,r,i=Object.freeze({__proto__:null,get showError(){return Ln},get isVisible(){return Rn},get getVisible(){return zn},get $(){return B},get deepExtend(){return Bn},get hasClass(){return Vn},get getWindowHeight(){return Hn},get t(){return Un},get css(){return Wn},get prev(){return Gn},get next(){return Kn},get last(){return qn},get index(){return Jn},get getList(){return Yn},get hide(){return Xn},get show(){return Zn},get isArrayOrList(){return Qn},get addClass(){return V},get removeClass(){return $n},get appendTo(){return er},get wrap(){return tr},get wrapAll(){return nr},get wrapInner(){return rr},get unwrap(){return ir},get closest(){return ar},get after(){return or},get before(){return sr},get insertBefore(){return cr},get getScrollTop(){return lr},get siblings(){return ur},get preventDefault(){return dr},get i(){return fr},get o(){return pr},get u(){return mr},get l(){return hr},get v(){return gr},get isFunction(){return _r},get trigger(){return vr},get matches(){return H},get toggle(){return yr},get createElementFromHTML(){return br},get remove(){return xr},get filter(){return Sr},get untilAll(){return Cr},get nextAll(){return wr},get prevAll(){return Tr},get toArray(){return Er},get p(){return Dr},get h(){return Or},get g(){return kr},get S(){return Ar},get M(){return jr}});Array.prototype.find||Object.defineProperty(Array.prototype,`find`,{value:function(e){if(this==null)throw TypeError(`"this" is null or not defined`);var t=Object(this),n=t.length>>>0;if(typeof e!=`function`)throw TypeError(`predicate must be a function`);for(var r=arguments[1],i=0;i<n;){var a=t[i];if(e.call(r,a,i,t))return a;i++}}}),Array.from||(Array.from=(e=Object.prototype.toString,t=function(t){return typeof t==`function`||e.call(t)===`[object Function]`},n=2**53-1,r=function(e){var t=function(e){var t=Number(e);return isNaN(t)?0:t!==0&&isFinite(t)?(t>0?1:-1)*Math.floor(Math.abs(t)):t}(e);return Math.min(Math.max(t,0),n)},function(e){var n=this,i=Object(e);if(e==null)throw TypeError(`Array.from requires an array-like object - not null or undefined`);var a,o=arguments.length>1?arguments[1]:void 0;if(o!==void 0){if(!t(o))throw TypeError(`Array.from: when provided, the second argument must be a function`);arguments.length>2&&(a=arguments[2])}for(var s,c=r(i.length),l=t(n)?Object(new n(c)):Array(c),u=0;u<c;)s=i[u],l[u]=o?a===void 0?o(s,u):o.call(a,s,u):s,u+=1;return l.length=c,l}));var a,o=window,s=document,c=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/)||navigator.userAgent.includes(`Mac`)&&`ontouchend`in document,l=/(Mac|iPhone|iPod|iPad)/i.test(o.navigator.userAgent),u=`ontouchstart`in o||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints,d=!!window.MSInputMethodContext&&!!document.documentMode,f={test:{},shared:{}},p=(a=window.self!==window.top,function(){return a});o.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){t||=window;for(var n=0;n<this.length;n++)e.call(t,this[n],n,this)}),typeof Object.assign!=`function`&&Object.defineProperty(Object,`assign`,{value:function(e,t){if(e==null)throw TypeError(`Cannot convert undefined or null to object`);for(var n=Object(e),r=1;r<arguments.length;r++){var i=arguments[r];if(i!=null)for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(n[a]=i[a])}return n},writable:!0,T:!0});var m=`fullpage-wrapper`,h=`.`+m,g=`fp-scrollable`,_=`fp-responsive`,v=`fp-notransition`,y=`fp-destroyed`,b=`fp-enabled`,x=`active`,S=`.active`,C=`fp-completely`,w=`fp-section`,T=`.`+w,E=`.fp-tableCell`,ee=`#fp-nav`,D=`fp-slide`,te=`.`+D,ne=`.fp-slide.active`,re=`fp-slides`,ie=`.fp-slides`,ae=`fp-slidesContainer`,oe=`.`+ae,se=`fp-table`,O=`fp-overflow`,k=`.`+O,ce=`fp-is-overflow`,le=`.fp-slidesNav`,ue=`.fp-slidesNav a`,de=`fp-controlArrow`,fe=`.`+de,A=`fp-prev`,pe=`.fp-controlArrow.fp-prev`,me=`.fp-controlArrow.fp-next`,he={menu:!1,anchors:[],lockAnchors:!1,navigation:!1,navigationPosition:`right`,navigationTooltips:[],showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:`bottom`,scrollBar:!1,hybrid:!1,licenseKey:``,credits:{enabled:!0,label:`Made with fullPage.js`,position:`right`},css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,fitToSectionDelay:600,easing:`easeInOutCubic`,easingcss3:`ease`,loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,continuousHorizontal:!1,scrollHorizontally:!1,interlockedSlides:!1,dragAndMove:!1,offsetSections:!1,resetSliders:!1,fadingEffect:!1,normalScrollElements:null,scrollOverflow:!0,scrollOverflowReset:!1,skipIntermediateItems:!1,touchSensitivity:5,touchWrapper:null,bigSectionsDestination:null,adjustOnNavChange:!0,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,allowCorrectDirection:!1,scrollOverflowMacStyle:!0,controlArrows:!0,controlArrowsHTML:[`<div class="fp-arrow"></div>`,`<div class="fp-arrow"></div>`],controlArrowColor:`#fff`,verticalCentered:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,responsiveWidth:0,responsiveHeight:0,responsiveSlides:!1,parallax:!1,parallaxOptions:{type:`reveal`,percentage:62,property:`translate`},cards:!1,cardsOptions:{perspective:100,fadeContent:!0,fadeBackground:!0},sectionSelector:`.section`,slideSelector:`.slide`,afterLoad:null,beforeLeave:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null,afterResponsive:null,onScrollOverflow:null,lazyLoading:!0,lazyLoadThreshold:0,observer:!0,scrollBeyondFullpage:!0},ge=null,_e=!1,ve=Bn({},he),ye=null;function j(e){return ge}function M(){return ye||he}function be(){return ve}function xe(e,t,n){ye[e]=t,n!==`internal`&&(ve[e]=t)}function Se(){if(!M().anchors.length){var e=B(M().sectionSelector.split(`,`).join(`[data-anchor],`)+`[data-anchor]`,ge);e.length&&e.length===B(M().sectionSelector,ge).length&&(_e=!0,e.forEach((function(e){M().anchors.push(fr(e,`data-anchor`).toString())})))}if(!M().navigationTooltips.length){var t=B(M().sectionSelector.split(`,`).join(`[data-tooltip],`)+`[data-tooltip]`,ge);t.length&&t.forEach((function(e){M().navigationTooltips.push(fr(e,`data-tooltip`).toString())}))}}var N={A:0,O:0,slides:[],R:[],j:null,D:null,L:!1,N:!1,I:!1,P:!1,H:!1,C:void 0,W:void 0,F:!1,canScroll:!0,V:`none`,B:`none`,Z:!1,Y:!1,G:!0,X:0,U:Hn(),_:!1,J:{},scrollY:0,scrollX:0,K:!1};function P(e){Object.assign(N,e)}function F(){return N}function Ce(e){return window[`fp_`+e+`Extension`]!==void 0}function we(e){var t=M();return t[e]!==null&&Object.prototype.toString.call(t[e])===`[object Array]`?t[e].length&&f[e]:t[e]&&f[e]}function I(e,t,n){if(we(e))return _r(f[e][t])?f[e][t](n):f[e][t]}function Te(){return I(`dragAndMove`,`isAnimating`)}function Ee(){return I(`dragAndMove`,`isGrabbing`)}function De(e){if(M().offsetSections&&f.offsetSections){var t=I(`offsetSections`,`getWindowHeight`,e);return t===``?t:Math.round(t)+`px`}return Hn()+`px`}function Oe(e,t){e.insertBefore(t,e.firstChild)}function ke(e){var t=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;function n(e){var n,r,i,a,o,s,c=``,l=0;for(e=e.replace(/[^A-Za-z0-9+/=]/g,``);l<e.length;)n=t.indexOf(e.charAt(l++))<<2|(a=t.indexOf(e.charAt(l++)))>>4,r=(15&a)<<4|(o=t.indexOf(e.charAt(l++)))>>2,i=(3&o)<<6|(s=t.indexOf(e.charAt(l++))),c+=String.fromCharCode(n),o!=64&&(c+=String.fromCharCode(r)),s!=64&&(c+=String.fromCharCode(i));return c=function(e){for(var t,n=``,r=0,i=0,a=0;r<e.length;)(i=e.charCodeAt(r))<128?(n+=String.fromCharCode(i),r++):i>191&&i<224?(a=e.charCodeAt(r+1),n+=String.fromCharCode((31&i)<<6|63&a),r+=2):(a=e.charCodeAt(r+1),t=e.charCodeAt(r+2),n+=String.fromCharCode((15&i)<<12|(63&a)<<6|63&t),r+=3);return n}(c),c}function r(e){return e.slice(3).slice(0,-3)}return function(e){var t=e.split(`_`);if(t.length>1){var i=t[1];return n(e.replace(r(t[1]),``).split(`_`)[0].slice(2).slice(0,-2))+`_`+n(i.slice(3).slice(0,-3))}return r(e)}(n(e))}o.state=N,o.fp_utils=o.fp_utils||{},Object.assign(o.fp_utils,{prependTo:Oe,toggleClass:function(e,t,n){if(e.classList&&n==null)e.classList.toggle(t);else{var r=Vn(e,t);r&&n==null||!n?$n(e,t):(!r&&n==null||n)&&V(e,t)}}});var Ae=function(e){this.anchor=e.anchor,this.item=e.item,this.index=e.index(),this.isLast=this.index===e.item.parentElement.querySelectorAll(e.selector).length-1,this.isFirst=!this.index,this.isActive=e.isActive},je=function(e,t){this.parent=this.parent||null,this.selector=t,this.anchor=fr(e,`data-anchor`)||M().anchors[Jn(e,M().sectionSelector)],this.item=e,this.isVisible=Rn(e),this.isActive=Vn(e,x),this.q=Vn(e,O)||B(k,e)[0]!=null,this.nn=t===M().sectionSelector,this.container=ar(e,oe)||ar(e,h),this.index=function(){return this.siblings().indexOf(this)}};function Me(e){return e.map((function(e){return e.item}))}function Ne(e,t){return e.find((function(e){return e.item===t}))}je.prototype.siblings=function(){return this.nn?this.isVisible?N.R:N.tn:this.parent?this.parent.slides:0},je.prototype.prev=function(){var e=this.siblings(),t=(this.nn?e.indexOf(this):this.parent.slides.indexOf(this))-1;return t>=0?e[t]:null},je.prototype.next=function(){var e=this.siblings(),t=(this.nn?e.indexOf(this):this.parent.slides.indexOf(this))+1;return t<e.length?e[t]:null},je.prototype.prevPanel=function(){return this===this.prev()?this.parent?this.parent.prev():null:this.prev()||(this.parent?this.parent.prev():null)},je.prototype.nextPanel=function(){return this===this.next()?this.parent?this.parent.next():null:this.next()||(this.parent?this.parent.next():null)},je.prototype.en=function(){return this.nn?N.R:N.rn};var Pe,Fe=function(e){Ae.call(this,e)},Ie=function(e){Ae.call(this,e)};function Le(e){var t=B(ne,e);return t.length&&(e=t[0]),e}function Re(e){return e?e.activeSlide?e.activeSlide:e:null}function ze(e){var t,n,r=M();return r.autoScrolling&&!r.scrollBar?(t=-e,n=B(h)[0]):(t=e,n=window),{options:t,element:n}}function Be(e,t){!M().autoScrolling||M().scrollBar||e.self!=window&&Vn(e,re)?e.self!=window&&Vn(e,re)?e.scrollLeft=t:e.scrollTo(0,t):e.style.top=t+`px`}function Ve(e){var t=`transform `+M().scrollingSpeed+`ms `+M().easingcss3;return $n(e,v),Wn(e,{"-webkit-transition":t,transition:t})}function He(e,t){var n=e.index(),r=Jn(t,T);return n==r?`none`:n>r?`up`:`down`}function Ue(e){return V(e,v)}function We(e){return{"-webkit-transform":e,"-moz-transform":e,"-ms-transform":e,transform:e}}function Ge(e,t){t?Ve(j()):Ue(j()),clearTimeout(Pe),Wn(j(),We(e)),f.test.on=e,Pe=setTimeout((function(){$n(j(),v)}),10)}function Ke(e){var t=Math.round(e);if(M().css3&&M().autoScrolling&&!M().scrollBar)Ge(`translate3d(0px, -`+t+`px, 0px)`,!1);else if(M().autoScrolling&&!M().scrollBar)Wn(j(),{top:-t+`px`}),f.test.top=-t+`px`;else{var n=ze(t);Be(n.element,n.options)}}function qe(e,t){t!==`internal`&&I(`fadingEffect`,`update`,e),I(`cards`,`update_`,e),xe(`scrollingSpeed`,e,t)}f.setScrollingSpeed=qe;var Je,Ye=null,Xe=null,Ze=null;function Qe(e,t,n,r){var i,a=function(e){return e.self!=o&&Vn(e,re)?e.scrollLeft:!M().autoScrolling||M().scrollBar?lr():e.offsetTop}(e),s=t-a,c=!1,l=N.F;P({F:!0}),Je&&window.cancelAnimationFrame(Je),Je=function(u){i||=u;var d=Math.floor(u-i);if(N.F){var f=t;n&&(f=o.fp_easings[M().easing](d,a,s,n)),d<=n&&Be(e,f),d<n?window.requestAnimationFrame(Je):r===void 0||c||(r(),P({F:!1}),c=!0)}else c||l||(r(),P({F:!1}),c=!0)},window.requestAnimationFrame(Je)}function $e(e){return e.hasAttribute(`data-autoplay`)||e.hasAttribute(`autoplay`)}function et(e){var t=Le(e);B(`video, audio`,t).forEach((function(e){$e(e)&&typeof e.play==`function`&&(e.readyState>=e.HAVE_FUTURE_DATA?e.play():e.addEventListener(`canplay`,(function t(){e.play(),e.removeEventListener(`canplay`,t)})))})),B(`iframe[src*="youtube.com/embed/"]`,t).forEach((function(e){$e(e)&&tt(e),e.onload=function(){$e(e)&&tt(e)}}))}function tt(e){e.contentWindow.postMessage(`{"event":"command","func":"playVideo","args":""}`,`*`)}function nt(e){var t=Le(e);B(`video, audio`,t).forEach((function(e){e.hasAttribute(`data-keepplaying`)||typeof e.pause!=`function`||e.pause()})),B(`iframe[src*="youtube.com/embed/"]`,t).forEach((function(e){/youtube\.com\/embed\//.test(fr(e,`src`))&&!e.hasAttribute(`data-keepplaying`)&&e.contentWindow.postMessage(`{"event":"command","func":"pauseVideo","args":""}`,`*`)}))}function rt(e){M().lazyLoading&&B(`img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]`,Le(e)).forEach((function(e){if([`src`,`srcset`].forEach((function(t){var n=fr(e,`data-`+t);n!=null&&n&&(kr(e,t),e.addEventListener(`load`,(function(){})))})),H(e,`source`)){var t=ar(e,`video, audio`);t&&(t.load(),t.onloadeddata=function(){})}}))}function it(e){var t=M().lazyLoadThreshold;rt(e.item),t&&(at(e,`prev`,t),at(e,`next`,t))}function at(e,t,n){for(var r=e,i=0;i<n&&(r=r[t]());i++)rt(r.item)}function ot(){var e=F().j.item,t=F().j.activeSlide,n=st(e),r=String(n);t&&(r=r+`-`+st(t.item)),r=r.replace(`/`,`-`).replace(`#`,``).replace(/\s/g,``);var i=RegExp(`\\b\\s?fp-viewing-[^\\s]+\\b`,`g`);Ye.className=Ye.className.replace(i,``),V(Ye,`fp-viewing-`+r)}function st(e){if(!e)return null;var t=fr(e,`data-anchor`),n=Jn(e);return t??=n,t}function ct(e,t,n){var r=``;M().anchors.length&&!M().lockAnchors&&(e?(n!=null&&(r=n),t??=e,P({W:t}),lt(r+`/`+t)):(e==null||P({W:t}),lt(n))),ot()}function lt(e){if(M().recordHistory)location.hash=e;else if(c||u)o.history.replaceState(void 0,void 0,`#`+e);else{var t=o.location.href.split(`#`)[0];o.location.replace(t+`#`+e)}}function ut(e){return ut=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},ut(e)}var L={an:{},un:function(e,t){var n=this;return ut(this.an[e])!==`object`&&(this.an[e]=[]),this.an[e].push(t),function(){return n.removeListener(e,t)}},removeListener:function(e,t){if(ut(this.an[e])===`object`){var n=this.an[e].indexOf(t);n>-1&&this.an[e].splice(n,1)}},ln:function(e){for(var t=this,n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];ut(this.an[e])===`object`&&this.an[e].forEach((function(e){return e.apply(t,r)}))},once:function(e,t){var n=this,r=this.un(e,(function(){r();var e=[...arguments];t.apply(n,e)}))}};function dt(e,t,n){var r=t===`Section`?M().anchors[e]:fr(n,`data-anchor`);return encodeURI(M().navigationTooltips[e]||r||t+` `+(e+1))}var ft=`onAfterRenderNoAnchor`,pt=`onClickOrTouch`,mt=`moveSlideLeft`,ht=`moveSlideRight`,gt=`onInitialise`,_t=`beforeInit`,vt=`bindEvents`,yt=`onDestroy`,bt=`contentChanged`,xt=`onScrollOverflowScrolled`,St=`onScrollPageAndSlide`,Ct=`onKeyDown`,wt=`onMenuClick`,Tt=`scrollPage`,Et=`landscapeScroll`,Dt=`scrollBeyondFullpage`,Ot=`onPerformMovement`,kt=`onSlideLeave`,At=`onLeave`,jt=`afterSectionLoads`,Mt=`afterSlideLoads`;function Nt(e){e.cancelable&&dr(e),P({D:`horizontalNav`});var t=ar(this,T),n=B(ie,ar(this,T))[0],r=Ne(F().R,t).slides[Jn(ar(this,`li`))];L.ln(Et,{slides:n,destination:r.item})}function Pt(e,t){M().slidesNavigation&&e!=null&&($n(B(S,e),x),V(B(`a`,B(`li`,e)[t]),x))}var Ft,It={};function Lt(e,t,n){t===`all`?Object.keys(It[n]).forEach((function(t){It[n][t]=e})):It[n][t]=e}function Rt(){return It}function zt(){var e=ar(this,T);Vn(this,A)||ar(this,A)?Rt().m.left&&(P({D:`slideArrow`}),L.ln(mt,{section:e})):Rt().m.right&&(P({D:`slideArrow`}),L.ln(ht,{section:e}))}function Bt(e){!M().loopHorizontal&&M().controlArrows&&(yr(B(pe,e.section),e.slideIndex!==0),yr(B(me,e.section),Kn(e.destiny)!=null))}function Vt(){clearTimeout(Ft),P({I:!1})}function Ht(e,t,n){var r=ar(e,T),i=F().R.filter((function(e){return e.item==r}))[0],a=i.slides.filter((function(e){return e.item==t}))[0],o={slides:e,destiny:t,direction:n,destinyPos:{left:t.offsetLeft},slideIndex:a.index(),section:r,sectionIndex:i.index(),anchorLink:i.anchor,slidesNav:B(le,r)[0],slideAnchor:a.anchor,prevSlide:i.activeSlide.item,prevSlideIndex:i.activeSlide.index(),items:{section:i,origin:i.activeSlide,destination:a},localIsResizing:N.P};o.xMovement=Wt(o.prevSlideIndex,o.slideIndex),o.direction=o.direction?o.direction:o.xMovement,o.localIsResizing||P({canScroll:!1}),I(`parallax`,`applyHorizontal`,o),I(`cards`,`apply`,o),I(`dropEffect`,`apply`,o),I(`waterEffect`,`apply`,o),M().onSlideLeave&&!o.localIsResizing&&o.xMovement!==`none`&&_r(M().onSlideLeave)&&!1===an(`onSlideLeave`,o)?P({I:!1}):(we(`dropEffect`)&&M().dropEffect||(V(t,x),$n(ur(t),x)),Xt(),o.localIsResizing||(nt(o.prevSlide),it(a)),Bt(o),i.isActive&&!o.localIsResizing&&ct(o.slideIndex,o.slideAnchor,o.anchorLink),I(`continuousHorizontal`,`apply`,o),L.ln(kt,o),Ee()?Kt(o):Ut(e,o,!0),M().interlockedSlides&&f.interlockedSlides&&(we(`continuousHorizontal`)&&n!==void 0&&n!==o.xMovement||I(`interlockedSlides`,`apply`,o)))}function Ut(e,t,n){var r=t.destinyPos;if(Pt(t.slidesNav,t.slideIndex),P({scrollX:Math.round(r.left)}),M().css3){var i=`translate3d(-`+Math.round(r.left)+`px, 0px, 0px)`;f.test.cn[t.sectionIndex]=i,we(`dragAndMove`)&&t.sn!==void 0||Ve(B(oe,e)),Wn(B(oe,e),We(i)),we(`interlockedSlides`)||clearTimeout(Ft),Ft=setTimeout((function(){n&&Kt(t)}),M().scrollingSpeed)}else f.test.left[t.sectionIndex]=Math.round(r.left),Qe(e,Math.round(r.left),M().scrollingSpeed,(function(){n&&Kt(t)}))}function Wt(e,t){return e==t?`none`:e>t?`left`:`right`}function Gt(){clearTimeout(Ft)}function Kt(e){I(`continuousHorizontal`,`afterSlideLoads`,e),I(`dragAndMove`,`afterSlideLoads`,e),e.localIsResizing||(I(`parallax`,`afterSlideLoads`),I(`scrollOverflowReset`,`setPrevious`,e.prevSlide),I(`scrollOverflowReset`,`reset`),_r(M().afterSlideLoad)&&an(`afterSlideLoad`,e),P({canScroll:!0}),et(e.destiny),L.ln(Mt,e)),P({I:!1}),I(`interlockedSlides`,`interlockedSlides`,e)}function qt(e,t){qe(0,`internal`),t!==void 0&&P({P:!0}),Ht(ar(e,ie),e),t!==void 0&&P({P:!1}),qe(be().scrollingSpeed,`internal`)}It.m={up:!0,down:!0,left:!0,right:!0},It.k=Bn({},It.m),L.un(pt,(function(e){var t=e.target;(H(t,fe)||ar(t,fe))&&zt.call(t,e)})),f.landscapeScroll=Ht,L.un(vt,(function(){L.un(Ot,Vt)}));var Jt=null,Yt=null;function Xt(){N.j=null,N.R.map((function(e){var t=Vn(e.item,x);e.isActive=t,e.q=z.q(e.item),t&&(N.j=e),e.slides.length&&(e.activeSlide=null,e.slides.map((function(t){var n=Vn(t.item,x);t.q=z.q(e.item),t.isActive=n,n&&(e.activeSlide=t)})))})),function(){var e=N.j,t=!!N.j&&N.j.slides.length,n=N.j?N.j.activeSlide:null;if(!e&&N.R.length&&!F().L){if(Jt){var r=$t(Jt,N.R);r&&(N.j=r,N.j.isActive=!0,V(N.j.item,x)),N.j&&Ke(N.j.item.offsetTop)}if(t&&!n&&Yt){var i=$t(Yt,N.j.slides);i&&(N.j.activeSlide=i,N.j.activeSlide.isActive=!0,V(N.j.activeSlide.item,x)),N.j.activeSlide&&qt(N.j.activeSlide.item,`internal`)}}}(),vr(j(),`onUpdateStateDone`)}function Zt(){var e=B(M().sectionSelector+`, `+T,j()),t=zn(e),n=Array.from(e).map((function(e){return new en(e)})),r=n.filter((function(e){return e.isVisible})),i=r.reduce((function(e,t){return e.concat(t.slides)}),[]);Jt=Qt(N.j),Yt=Qt(N.j?N.j.activeSlide:null),N.A=t.length,N.O=r.reduce((function(e,t){return e+t.slides.length}),0),N.R=r,N.tn=n,N.slides=i,N.rn=N.R.concat(N.slides)}function Qt(e){if(!e)return null;var t=e?e.item:null,n=e.nn?N.tn:N.j.dn;if(t){var r=Ne(n,t);return r?r.index():null}return null}function $t(e,t){var n,r=e-1,i=e;do{if(n=t[r]||t[i])break;--r,i+=1}while(r>=0||i<t.length);return n}var en=function(e){var t=this;[].push.call(arguments,M().sectionSelector),je.apply(this,arguments),this.vn=B(M().slideSelector,e),this.dn=Array.from(this.vn).map((function(e){return new tn(e,t)})),this.slides=this.dn.filter((function(e){return e.isVisible})),this.activeSlide=this.slides.length?this.slides.filter((function(e){return e.isActive}))[0]||this.slides[0]:null};en.prototype=je.prototype,en.prototype.constructor=en;var tn=function(e,t){this.parent=t,je.call(this,e,M().slideSelector)};function nn(e){return e&&!e.item?new Fe(new en(e)):e?new Fe(e):null}function rn(e){return e?new Ie(e):null}function an(e,t){var n=function(e,t){var n={afterRender:function(){return{section:nn(F().j),pn:rn(F().j.activeSlide)}},onLeave:function(){return{origin:nn(t.items.origin),destination:nn(t.items.destination),direction:t.direction,trigger:F().D}},afterLoad:function(){return n.onLeave()},afterSlideLoad:function(){return{section:nn(t.items.section),origin:nn(t.items.origin),destination:nn(t.items.destination),direction:t.direction,trigger:F().D}},onSlideLeave:function(){return n.afterSlideLoad()},beforeLeave:function(){return n.onLeave()},onScrollOverflow:function(){return{section:nn(F().j),pn:rn(F().j.activeSlide),position:t.position,direction:t.direction}}};return n[e]()}(e,t);return vr(j(),e,n),!1!==M()[e].apply(n[Object.keys(n)[0]],Er(n))}function on(e,t){xe(`recordHistory`,e,t)}function sn(e,t){e||Ke(0),xe(`autoScrolling`,e,t);var n=F().j.item;if(M().autoScrolling&&!M().scrollBar)Wn(Ze,{overflow:`hidden`,height:`100%`}),$n(Ye,g),on(be().recordHistory,`internal`),Wn(j(),{"-ms-touch-action":`none`,"touch-action":`none`}),n!=null&&Ke(n.offsetTop);else if(Wn(Ze,{overflow:`visible`,height:`initial`}),V(Ye,g),on(!!M().autoScrolling&&be().recordHistory,`internal`),Wn(j(),{"-ms-touch-action":``,"touch-action":``}),Ue(j()),n!=null){var r=ze(n.offsetTop);r.element.scrollTo(0,r.options)}vr(j(),`setAutoScrolling`,e)}function cn(){for(var e=B(ne),t=0;t<e.length;t++)qt(e[t],`internal`)}function ln(){var e=B(`.fp-auto-height`)[0]||On()&&B(`.fp-auto-height-responsive`)[0];M().lazyLoading&&e&&B(`.fp-section:not(.active)`).forEach((function(e){var t,n=(t=e.getBoundingClientRect()).top,r=t.bottom,i=n+2<N.U&&n>0,a=r>2&&r<N.U;(i||a)&&it(Ne(F().R,e))}))}function un(){vr(Gn(this),`click`)}function dn(){xr(B(ee));var e=s.createElement(`div`);e.setAttribute(`id`,`fp-nav`);var t=s.createElement(`ul`);e.appendChild(t),er(e,Ye);var n=B(ee)[0];V(n,`fp-`+M().navigationPosition),M().showActiveTooltip&&V(n,`fp-show-active`);for(var r=``,i=0;i<F().R.length;i++){var a=F().R[i],o=``;M().anchors.length&&(o=a.anchor),r+=`<li><a href="#`+encodeURI(o)+`"><span class="fp-sr-only">`+dt(a.index(),`Section`)+`</span><span></span></a>`;var c=M().navigationTooltips[a.index()];c!==void 0&&c!==``&&(r+=`<div class="fp-tooltip fp-`+M().navigationPosition+`">`+c+`</div>`),r+=`</li>`}B(`ul`,n)[0].innerHTML=r;var l=B(`li`,B(ee)[0])[F().j.index()];V(B(`a`,l),x)}function fn(e){e.preventDefault&&dr(e),P({D:`verticalNav`});var t=Jn(ar(this,`#fp-nav li`));L.ln(Tt,{destination:F().R[t]})}function pn(e,t){var n=e;M().menu&&M().menu.length&&B(M().menu).forEach((function(e){e!=null&&($n(B(S,e),x),V(B(`[data-menuanchor="`+n+`"]`,e),x))})),function(e,t){var n=B(ee)[0];M().navigation&&n!=null&&n.style.display!==`none`&&($n(B(S,n),x),V(e?B(`a[href="#`+e+`"]`,n):B(`a`,B(`li`,n)[t]),x))}(e,t)}tn.prototype=je.prototype,tn.prototype.constructor=en,f.setRecordHistory=on,f.setAutoScrolling=sn,f.test.setAutoScrolling=sn,new Date().getTime();var mn,hn,gn,_n,vn,yn,bn=(hn=!0,gn=new Date().getTime(),_n=!o.fullpage_api,function(e,t){var n=new Date().getTime(),r=e===`wheel`?M().scrollingSpeed:100;return hn=_n||n-gn>=r,_n=!o.fullpage_api,hn&&(mn=t(),gn=n),mn===void 0||mn});function xn(e,t){if(_r(M().beforeLeave))return bn(F().D,(function(){return an(e,t)}))}function Sn(e,t,n){var r=e.item;if(r!=null){var i,a,o={element:r,callback:t,isMovementUp:n,dtop:R(r),yMovement:He(F().j,r),anchorLink:e.anchor,sectionIndex:e.index(),activeSlide:e.activeSlide?e.activeSlide.item:null,leavingSection:F().j.index()+1,localIsResizing:N.P,items:{origin:F().j,destination:e},direction:null};if(!(F().j.item==r&&!N.P||M().scrollBar&&lr()===o.dtop&&!Vn(r,`fp-auto-height`))){if(o.activeSlide!=null&&(i=fr(o.activeSlide,`data-anchor`),a=Jn(o.activeSlide,null)),!o.localIsResizing){var s=o.yMovement;if(n!==void 0&&(s=n?`up`:`down`),o.direction=s,Ce(`dropEffect`)&&f.dropEffect.onLeave_(o),Ce(`waterEffect`)&&f.waterEffect.onLeave_(o),_r(M().beforeLeave)&&!1===xn(`beforeLeave`,o)||_r(M().onLeave)&&!an(`onLeave`,o))return}I(`parallax`,`apply`,o),I(`cards`,`apply`,o),I(`dropEffect`,`apply`,o),I(`waterEffect`,`apply`,o),M().autoScrolling&&M().continuousVertical&&o.isMovementUp!==void 0&&(!o.isMovementUp&&o.yMovement==`up`||o.isMovementUp&&o.yMovement==`down`)&&(o=function(e){P({_:!0});var t=F().j.item;return e.isMovementUp?sr(t,wr(t,T)):or(t,Tr(t,T).reverse()),Ke(F().j.item.offsetTop),cn(),e.hn=t,e.dtop=e.element.offsetTop,e.yMovement=He(F().j,e.element),e.leavingSection=e.items.origin.index()+1,e.sectionIndex=e.items.destination.index(),vr(j(),`onContinuousVertical`,e),e}(o)),I(`scrollOverflowReset`,`setPrevious`,F().j.item),o.localIsResizing||nt(F().j.item),we(`dropEffect`)&&M().dropEffect||(V(r,x),$n(ur(r),x)),Xt(),it(e),P({canScroll:f.test.gn}),ct(a,i,o.anchorLink),L.ln(At,o),function(e){P({V:`none`,scrollY:Math.round(e.dtop)}),L.ln(Ot,e);var t=M().scrollingSpeed<700,n=t?700:M().scrollingSpeed;if(M().css3&&M().autoScrolling&&!M().scrollBar)Ge(`translate3d(0px, -`+Math.round(e.dtop)+`px, 0px)`,!0),we(`waterEffect`)&&cn(),M().scrollingSpeed?(clearTimeout(vn),vn=setTimeout((function(){Cn(e),P({canScroll:!t||f.test.gn})}),M().scrollingSpeed)):Cn(e);else{var r=ze(e.dtop);f.test.top=-e.dtop+`px`,clearTimeout(vn),Qe(r.element,r.options,M().scrollingSpeed,(function(){M().scrollBar?vn=setTimeout((function(){Cn(e)}),30):(Cn(e),P({canScroll:!t||f.test.gn}))}))}t&&(clearTimeout(yn),yn=setTimeout((function(){P({canScroll:!0})}),n))}(o),P({C:o.anchorLink}),pn(o.anchorLink,function(e){return e.hn==null?e.sectionIndex:e.isMovementUp?N.A-1:0}(o))}}}function R(e){var t=e.offsetHeight,n=e.offsetTop,r=n,i=we(`dragAndMove`)&&I(`dragAndMove`,`isGrabbing`)?I(`dragAndMove`,`isScrollingDown`):n>N.X,a=r-Hn()+t,o=M().bigSectionsDestination;return t>Hn()?(i||o)&&o!==`bottom`||(r=a):(i||N.P&&Kn(e)==null)&&(r=a),we(`offsetSections`)&&(r=f.offsetSections.getSectionPosition_(i,r,e)),P({X:r}),r}function Cn(e){P({L:!1}),function(e){e.hn!=null&&(e.isMovementUp?sr(B(T)[0],e.hn):or(B(T)[F().R.length-1],e.hn),Ke(F().j.item.offsetTop),function(){for(var e=B(ne),t=0;t<e.length;t++)qt(e[t],`internal`)}(),e.sectionIndex=e.items.destination.index(),e.leavingSection=e.items.origin.index()+1,P({_:!1}))}(e),_r(M().afterLoad)&&!e.localIsResizing&&an(`afterLoad`,e),I(`parallax`,`afterLoad`),I(`waterEffect`,`afterLoad`),I(`dropEffect`,`afterLoad`),I(`scrollOverflowReset`,`reset`),I(`resetSliders`,`apply`,e),Xt(),e.localIsResizing||et(e.element),V(e.element,C),$n(ur(e.element),C),ln(),P({canScroll:!0}),L.ln(jt,e),_r(e.callback)&&e.callback()}function wn(e,t){xe(`fitToSection`,e,t)}function Tn(){N.canScroll&&M().fitToSection&&(P({P:!0}),Sn(N.j),P({P:!1}))}function En(){var e=M().responsive||M().responsiveWidth,t=M().responsiveHeight,n=e&&o.innerWidth<e,r=t&&o.innerHeight<t;e&&t?Dn(n||r):e?Dn(n):t&&Dn(r)}function Dn(e){var t=On();e?t||(sn(!1,`internal`),wn(!1,`internal`),Xn(B(ee)),V(Ye,_),_r(M().afterResponsive)&&M().afterResponsive.call(j(),e),I(`responsiveSlides`,`toSections`),vr(j(),`afterResponsive`,e)):t&&(sn(be().autoScrolling,`internal`),wn(be().autoScrolling,`internal`),Zn(B(ee)),$n(Ye,_),_r(M().afterResponsive)&&M().afterResponsive.call(j(),e),I(`responsiveSlides`,`toSlides`),vr(j(),`afterResponsive`,e))}function On(){return Vn(Ye,_)}function kn(e){M().verticalCentered&&(!M().scrollOverflow&&z.mn(e.item)||z.wn(e)||Vn(e.item,se)||V(e.item,se))}f.moveTo=moveTo,f.getScrollY=function(){return N.scrollY},L.un(yt,(function(){clearTimeout(vn),clearTimeout(yn)})),f.setFitToSection=wn,f.fitToSection=Tn,f.setResponsive=Dn;var An,jn=null;function Mn(e){var t=e.item,n=e.vn.length,r=e.index();!F().j&&e.isVisible&&(V(t,x),Xt()),!jn&&e.isVisible&&(jn=F().j.item),we(`offsetSections`)&&Wn(t,{height:De(t)}),M().paddingTop&&Wn(t,{"padding-top":M().paddingTop}),M().paddingBottom&&Wn(t,{"padding-bottom":M().paddingBottom}),M().sectionsColor[r]!==void 0&&Wn(t,{"background-color":M().sectionsColor[r]}),M().anchors[r]!==void 0&&t.setAttribute(`data-anchor`,e.anchor),n||kn(e)}function Nn(){M().scrollOverflow&&!M().scrollBar&&(z.bn(),z.Sn())}function Pn(){L.removeListener(ft,Nn),hr(`keyup`,z.yn)}f.getActiveSection=function(){return F().j},L.un(vt,(function(){L.un(ft,Nn),L.un(At,z.onLeave),L.un(kt,z.onLeave),L.un(Mt,z.afterLoad),L.un(jt,z.afterLoad),L.un(yt,Pn),pr(`keyup`,z.yn)}));var Fn,In,z={Mn:null,Tn:!0,An:!0,xn:null,On:null,kn:function(e){var t=F().j;if(!N.canScroll||p()&&M().scrollOverflow&&z.wn(t)&&z.isScrolled(F().B,t.item))return dr(e),!1},En:function(e){if(!jr()&&M().keyboardScrolling&&[38,33,32,40,34,36,35].indexOf(e.keyCode)>-1&&!z.An)return dr(e),!1},yn:function(){z.Tn=N.canScroll},onLeave:function(){clearTimeout(An),z.An=!1},afterLoad:function(){z.An=!1,clearTimeout(An),An=setTimeout((function(){z.Tn=N.canScroll}),200)},Rn:function(){s.activeElement===this.Mn&&(this.Mn.blur(),z.An=!1)},Sn:function(){if(M().scrollOverflow&&z.Tn){z.Rn();var e=z.jn(F().j.item);!e||c||u||(this.Mn=e,requestAnimationFrame((function(){e.focus({Dn:!0}),z.An=!0}))),z.Tn=!1}},bn:function(){M().scrollOverflowMacStyle&&!l&&V(Ye,`fp-scroll-mac`),F().rn.forEach((function(e){if(!(e.slides&&e.slides.length||Vn(e.item,`fp-auto-height-responsive`)&&On())){var t,n=Le(e.item),r=z.mn(e.item),a=(t=e).nn?t:t.parent;if(d){var o=r?`addClass`:`removeClass`;i[o](a.item,ce),i[o](e.item,ce)}else V(a.item,ce),V(e.item,ce);e.q||(z.Ln(n),z.zn(n)),e.q=!0}}))},zn:function(e){z.jn(e).addEventListener(`scroll`,z.Nn),e.addEventListener(`wheel`,z.kn,{passive:!1}),e.addEventListener(`keydown`,z.En,{passive:!1})},Ln:function(e){var t=document.createElement(`div`);t.className=O,rr(e,t),t.setAttribute(`tabindex`,`-1`)},In:function(e){var t=B(k,e)[0];t&&(ir(t),e.removeAttribute(`tabindex`))},jn:function(e){var t=Le(e);return B(k,t)[0]||t},q:function(e){return Vn(e,O)||B(k,e)[0]!=null},wn:function(e){return e.nn&&e.activeSlide?e.activeSlide.q:e.q},mn:function(e){return z.jn(e).scrollHeight>o.innerHeight},isScrolled:function(e,t){if(!N.canScroll)return!1;if(M().scrollBar)return!0;var n=z.jn(t);if(!M().scrollOverflow||!Vn(n,O)||Vn(t,`fp-noscroll`)||Vn(Le(t),`fp-noscroll`))return!0;var r=+!!d,i=n.scrollTop,a=e===`up`&&i<=0,o=e===`down`&&n.scrollHeight<=Math.ceil(n.offsetHeight+i)+r,s=a||o;return s||e===`none`||(this.xn=new Date().getTime()),s},Pn:function(){this.On=new Date().getTime();var e=this.On-z.xn,t=(c||u)&&N.Z,n=N.Y&&e>600;return t&&e>400||n},Nn:(Fn=0,function(e){var t=e.target.scrollTop,n=N.V===`none`?Fn<t?`down`:`up`:N.V;Fn=t,_r(M().onScrollOverflow)&&an(`onScrollOverflow`,{position:t,direction:n}),Vn(e.target,O)&&N.canScroll&&z.isScrolled(n,e.target)&&z.Pn()&&z.mn(F().j.item)&&L.ln(xt,{direction:n})})};function Ln(e,t){o.console&&o.console[e]&&o.console[e](`fullPage: `+t)}function Rn(e){return o.getComputedStyle(e).display!==`none`}function zn(e){return Array.from(e).filter((function(e){return Rn(e)}))}function B(e,t){return(t=arguments.length>1?t:document)?t.querySelectorAll(e):null}function Bn(e){e||={};for(var t=1,n=arguments.length;t<n;++t){var r=arguments[t];if(r)for(var i in r)r.hasOwnProperty(i)&&i!=`__proto__`&&i!=`constructor`&&(Object.prototype.toString.call(r[i])===`[object Object]`?e[i]=Bn(e[i],r[i]):e[i]=r[i])}return e}function Vn(e,t){return e!=null&&e.classList.contains(t)}function Hn(){return`innerHeight`in o?o.innerHeight:s.documentElement.offsetHeight}function Un(){return o.innerWidth}function Wn(e,t){for(var n in e=Yn(e),t)if(t.hasOwnProperty(n)&&n!==null)for(var r=0;r<e.length;r++)e[r].style[n]=t[n];return e}function Gn(e,t){if(!e)return null;if(t==null)return e.previousElementSibling;var n=Gn(e);return n&&H(n,t)?n:null}function Kn(e,t){if(!e)return null;if(t==null)return e.nextElementSibling;var n=Kn(e);return n&&H(n,t)?n:null}function qn(e){return e[e.length-1]}function Jn(e,t){e=Qn(e)?e[0]:e;for(var n=t==null?e.parentNode.childNodes:B(t,e.parentNode),r=0,i=0;i<n.length;i++){if(n[i]==e)return r;n[i].nodeType==1&&r++}return-1}function Yn(e){return Qn(e)?e:[e]}function Xn(e){e=Yn(e);for(var t=0;t<e.length;t++)e[t].style.display=`none`;return e}function Zn(e){e=Yn(e);for(var t=0;t<e.length;t++)e[t].style.display=`block`;return e}function Qn(e){return Object.prototype.toString.call(e)===`[object Array]`||Object.prototype.toString.call(e)===`[object NodeList]`}function V(e,t){e=Yn(e);for(var n=0;n<e.length;n++)e[n].classList.add(t);return e}function $n(e,t){e=Yn(e);for(var n=t.split(` `),r=0;r<n.length;r++){t=n[r];for(var i=0;i<e.length;i++)e[i].classList.remove(t)}return e}function er(e,t){t.appendChild(e)}function tr(e,t,n){var r;t||=s.createElement(`div`);for(var i=0;i<e.length;i++){var a=e[i];(n&&!i||!n)&&(r=t.cloneNode(!0),a.parentNode.insertBefore(r,a)),r.appendChild(a)}return e}function nr(e,t){tr(e,t,!0)}function rr(e,t){for(typeof t==`string`&&(t=br(t)),e.appendChild(t);e.firstChild!==t;)t.appendChild(e.firstChild)}function ir(e){for(var t=s.createDocumentFragment();e.firstChild;)t.appendChild(e.firstChild);e.parentNode.replaceChild(t,e)}function ar(e,t){return e&&e.nodeType===1?H(e,t)?e:ar(e.parentNode,t):null}function or(e,t){cr(e,e.nextSibling,t)}function sr(e,t){cr(e,e,t)}function cr(e,t,n){Qn(n)||(typeof n==`string`&&(n=br(n)),n=[n]);for(var r=0;r<n.length;r++)e.parentNode.insertBefore(n[r],t)}function lr(){var e=s.documentElement;return(o.pageYOffset||e.scrollTop)-(e.clientTop||0)}function ur(e){return Array.prototype.filter.call(e.parentNode.children,(function(t){return t!==e}))}function dr(e){e.preventDefault()}function fr(e,t){return e.getAttribute(t)}function pr(e,t,n){s.addEventListener(e,t,n===`undefined`?null:n)}function mr(e,t,n){o.addEventListener(e,t,n===`undefined`?null:n)}function hr(e,t,n){s.removeEventListener(e,t,n===`undefined`?null:n)}function gr(e,t,n){o.removeEventListener(e,t,n===`undefined`?null:n)}function _r(e){if(typeof e==`function`)return!0;var t=Object.prototype.toString.call(e);return t===`[object Function]`||t===`[object GeneratorFunction]`}function vr(e,t,n){var r;n=n===void 0?{}:n,typeof o.CustomEvent==`function`?r=new CustomEvent(t,{detail:n}):(r=s.createEvent(`CustomEvent`)).initCustomEvent(t,!0,!0,n),e.dispatchEvent(r)}function H(e,t){return(e.matches||e.Hn||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector).call(e,t)}function yr(e,t){if(typeof t==`boolean`)for(var n=0;n<e.length;n++)e[n].style.display=t?`block`:`none`;return e}function br(e){var t=s.createElement(`div`);return t.innerHTML=e.trim(),t.firstChild}function xr(e){e=Yn(e);for(var t=0;t<e.length;t++){var n=e[t];n&&n.parentElement&&n.parentNode.removeChild(n)}}function Sr(e,t){Array.prototype.filter.call(e,t)}function Cr(e,t,n){for(var r=e[n],i=[];r;)(H(r,t)||t==null)&&i.push(r),r=r[n];return i}function wr(e,t){return Cr(e,t,`nextElementSibling`)}function Tr(e,t){return Cr(e,t,`previousElementSibling`)}function Er(e){return Object.keys(e).map((function(t){return e[t]}))}function Dr(e){return e[e.length-1]}function Or(e,t){for(var n=0,r=e.slice(Math.max(e.length-t,1)),i=0;i<r.length;i++)n+=r[i];return Math.ceil(n/t)}function kr(e,t){e.setAttribute(t,fr(e,`data-`+t)),e.removeAttribute(`data-`+t)}function Ar(e,t){var n=[e];do e=e.parentNode,n.push(e);while(!H(e,t));return n}function jr(){var e=s.activeElement;return H(e,`textarea`)||H(e,`input`)||H(e,`select`)||fr(e,`contentEditable`)==`true`||fr(e,`contentEditable`)==``}function U(e){L.ln(pt,{e,target:e.target})}function Mr(){[`click`,`touchstart`].forEach((function(e){hr(e,U,{passive:!1})}))}function Nr(){P({G:!0})}function Pr(){V(B(M().sectionSelector,j()),w),V(B(M().slideSelector,j()),D)}function Fr(e){var t=e.slides.length,n=e.vn,r=e.slides,i=100*t,a=100/t;if(!B(ie,e.item)[0]){var o=s.createElement(`div`);o.className=re,nr(n,o);var c=s.createElement(`div`);c.className=ae,nr(n,c)}Wn(B(oe,e.item),{width:i+`%`}),t>1&&(M().controlArrows&&function(e){var t=e.item,n=[br(M().controlArrowsHTML[0]),br(M().controlArrowsHTML[1])];or(B(ie,t)[0],n),V(n,de),V(n[0],A),V(n[1],`fp-next`),M().controlArrowColor!==`#fff`&&(Wn(B(me,t),{"border-color":`transparent transparent transparent `+M().controlArrowColor}),Wn(B(pe,t),{"border-color":`transparent `+M().controlArrowColor+` transparent transparent`})),M().loopHorizontal||Xn(B(pe,t))}(e),M().slidesNavigation&&function(e){var t=e.item,n=e.slides.length;er(br(`<div class="fp-slidesNav"><ul></ul></div>`),t);var r=B(le,t)[0];V(r,`fp-`+M().slidesNavPosition);for(var i=0;i<n;i++)er(br(`<li><a href="#"><span class="fp-sr-only">`+dt(i,`Slide`,B(te,t)[i])+`</span><span></span></a></li>`),B(`ul`,r)[0]);Wn(r,{"margin-left":`-`+r.innerWidth/2+`px`});var a=e.activeSlide?e.activeSlide.index():0;V(B(`a`,B(`li`,r)[a]),x)}(e)),r.forEach((function(e){Wn(e.item,{width:a+`%`}),M().verticalCentered&&kn(e)}));var l=we(`responsiveSlides`)?null:e.activeSlide||null;l!=null&&N.j&&(N.j.index()!==0||N.j.index()===0&&l.index()!==0)?(qt(l.item,`internal`),V(l.item,`fp-initial`)):V(n[0],x)}window.fp_utils=Object.assign(o.fp_utils||{},{$:B,deepExtend:Bn,hasClass:Vn,getWindowHeight:Hn,css:Wn,prev:Gn,next:Kn,last:qn,index:Jn,getList:Yn,hide:Xn,show:Zn,isArrayOrList:Qn,addClass:V,removeClass:$n,appendTo:er,wrap:tr,wrapAll:nr,wrapInner:rr,unwrap:ir,closest:ar,after:or,before:sr,insertBefore:cr,getScrollTop:lr,siblings:ur,preventDefault:dr,isFunction:_r,trigger:vr,matches:H,toggle:yr,createElementFromHTML:br,remove:xr,filter:Sr,untilAll:Cr,nextAll:wr,prevAll:Tr,showError:Ln,scrollOverflowHandler:z}),L.un(vt,(function(){[`click`,`touchstart`].forEach((function(e){pr(e,U,{passive:!1})})),mr(`focus`,Nr),L.un(yt,Mr)}));var Ir={attributes:!1,subtree:!0,childList:!0,characterData:!0};function Lr(){return I(`responsiveSlides`,`isResponsiveSlidesChanging`)||zn(B(M().slideSelector,j())).length!==F().O}function Rr(e){var t=Lr();(Lr()||I(`responsiveSlides`,`isResponsiveSlidesChanging`)||zn(B(M().sectionSelector,j())).length!==F().A)&&!N._&&(M().observer&&In&&In.disconnect(),Zt(),Xt(),M().anchors=[],xr(B(ee)),I(`responsiveSlides`,`isResponsiveSlidesChanging`)||Pr(),Se(),M().navigation&&dn(),t&&(xr(B(le)),xr(B(fe))),F().R.forEach((function(e){e.slides.length?t&&Fr(e):Mn(e)}))),M().observer&&In&&B(h)[0]&&In.observe(B(h)[0],Ir)}L.un(vt,(function(){var e,t,n;M().observer&&`MutationObserver`in window&&B(h)[0]&&(e=B(h)[0],t=Ir,(n=new MutationObserver(Rr)).observe(e,t),In=n),L.un(bt,Rr)})),f.render=Rr;var zr=function(){var e=!1;try{var t=Object.defineProperty({},`passive`,{get:function(){e=!0}});mr(`testPassive`,null,t),gr(`testPassive`,null,t)}catch{}return function(){return e}}();function Br(){return!!zr()&&{passive:!1}}var Vr,Hr,Ur,Wr,Gr=(Ur=new Date().getTime(),Wr=[],{Cn:function(e){var t=(e||=o.event).wheelDelta||-e.deltaY||-e.detail,n=Math.max(-1,Math.min(1,t)),r=e.wheelDeltaX!==void 0||e.deltaX!==void 0;Vr=Math.abs(e.wheelDeltaX)<Math.abs(e.wheelDelta)||Math.abs(e.deltaX)<Math.abs(e.deltaY)||!r;var i=new Date().getTime();Hr=n<0?`down`:`up`,Wr.length>149&&Wr.shift(),Wr.push(Math.abs(t));var a=i-Ur;Ur=i,a>200&&(Wr=[])},Wn:function(){var e=Or(Wr,10)>=Or(Wr,70);return!!Wr.length&&e&&Vr},Fn:function(){return Hr}});function Kr(){var e=M().css3?lr()+Hn():Dr(F().R).item.offsetTop+Dr(F().R).item.offsetHeight,t=ze(e);f.test.top=-e+`px`,P({canScroll:!1}),Qe(t.element,t.options,M().scrollingSpeed,(function(){setTimeout((function(){P({L:!0}),P({canScroll:!0})}),30)}))}function qr(){j().getBoundingClientRect().bottom>=0&&Jr()}function Jr(){var e=ze(Dr(F().R).item.offsetTop);P({canScroll:!1}),Qe(e.element,e.options,M().scrollingSpeed,(function(){P({canScroll:!0}),P({L:!1}),P({Vn:!1})}))}var Yr,Xr,Zr,Qr=(Yr=!1,Xr={},Zr={},function(e,t,n){switch(e){case`set`:Xr[t]=new Date().getTime(),Zr[t]=n;break;case`isNewKeyframe`:Yr=new Date().getTime()-Xr[t]>Zr[t]}return Yr});function $r(){var e=F().j.next();e||!M().loopBottom&&!M().continuousVertical||(e=F().R[0]),e==null?j().scrollHeight<Ye.scrollHeight&&M().scrollBar&&M().scrollBeyondFullpage&&L.ln(Dt):Sn(e,null,!1)}function ei(){var e=F().j.prev();e||!M().loopTop&&!M().continuousVertical||(e=Dr(F().R)),e!=null&&Sn(e,null,!0)}f.moveSectionDown=$r,f.moveSectionUp=ei;var ti=0;function ni(e){M().autoScrolling&&(N.canScroll&&(e.pageY<ti&&Rt().m.up?ei():e.pageY>ti&&Rt().m.down&&$r()),ti=e.pageY)}function ri(e){if(Rt().m[e]){var t=e===`down`?$r:ei;we(`scrollHorizontally`)&&(t=I(`scrollHorizontally`,`getScrollSection`,{type:e,scrollSection:t})),M().scrollOverflow&&z.wn(F().j)?z.isScrolled(e,F().j.item)&&z.Pn()&&t():t()}}var ii,ai,oi,si=0,W=0,ci=0,li=0,ui=gi(),di={Bn:`ontouchmove`in window?`touchmove`:ui?ui.move:null,Zn:`ontouchstart`in window?`touchstart`:ui?ui.down:null};function G(e){var t=ar(e.target,T)||F().j.item,n=z.wn(F().j);if(fi(e)){P({Z:!0,Y:!1}),M().autoScrolling&&(n&&!N.canScroll||M().scrollBar)&&dr(e);var r=hi(e);ci=r.y,li=r.x;var i=Math.abs(si-ci)>o.innerHeight/100*M().touchSensitivity,a=Math.abs(W-li)>Un()/100*M().touchSensitivity,s=B(ie,t).length&&Math.abs(W-li)>Math.abs(si-ci),c=si>ci?`down`:`up`;P({V:s?W>li?`right`:`left`:c}),s?!N.I&&a&&(W>li?Rt().m.right&&L.ln(ht,{section:t}):Rt().m.left&&L.ln(mt,{section:t})):M().autoScrolling&&N.canScroll&&i&&ri(c)}}function fi(e){return e.pointerType===void 0||e.pointerType!=`mouse`}function pi(e){if(M().fitToSection&&P({F:!1}),fi(e)){var t=hi(e);si=t.y,W=t.x}mr(`touchend`,mi)}function mi(){gr(`touchend`,mi),P({Z:!1})}function hi(e){var t={};return t.y=e.pageY!==void 0&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY,t.x=e.pageX!==void 0&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX,u&&fi(e)&&M().scrollBar&&e.touches!==void 0&&(t.y=e.touches[0].pageY,t.x=e.touches[0].pageX),t}function gi(){var e;return o.PointerEvent&&(e={down:`pointerdown`,move:`pointermove`}),e}function _i(e){M().autoScrolling&&fi(e)&&Rt().m.up&&(N.canScroll||dr(e))}function vi(e,t){var n=t??F().j.item,r=Ne(N.R,n),i=B(ie,n)[0];if(!(i==null||Te()||N.I||r.slides.length<2)){var a=r.activeSlide,o=e===`left`?a.prev():a.next();if(!o){if(!M().loopHorizontal)return;o=e===`left`?Dr(r.slides):r.slides[0]}P({I:!f.test.gn}),Ht(i,o.item,e)}}function yi(e){vi(`left`,e)}function bi(e){vi(`right`,e)}function xi(e){var t=F().R.filter((function(t){return t.anchor===e}))[0];if(!t){var n=e===void 0?0:e-1;t=F().R[n]}return t}function Si(e){e!=null&&Ht(ar(e,ie),e)}function Ci(e,t){var n=xi(e);if(n!=null){var r=function(e,t){var n=t.slides.filter((function(t){return t.anchor===e}))[0];return n??=(e=e===void 0?0:e,t.slides[e]),n?n.item:null}(t,n);n.anchor&&n.anchor===N.C||Vn(n.item,x)?Si(r):Sn(n,(function(){Si(r)}))}}function wi(e,t){var n=xi(e);t===void 0?n!=null&&Sn(n):Ci(e,t)}function Ti(){clearTimeout(ai),hr(`keydown`,Ei),hr(`keyup`,K)}function Ei(e){clearTimeout(ai);var t=e.keyCode,n=[37,39].indexOf(t)>-1,r=M().autoScrolling||M().fitToSection||n;t===9?function(e){var t=e.shiftKey,n=s.activeElement,r=Ai(Le(F().j.item));function i(e){return dr(e),r[0]?r[0].focus():null}if(N.canScroll){if(!function(e){var t=Ai(s),n=t.indexOf(s.activeElement),r=t[e.shiftKey?n-1:n+1],i=ar(r,te),a=ar(r,T);return!i&&!a}(e)){n?ar(n,`.fp-section.active,.fp-section.active .fp-slide.active`)??(n=i(e)):i(e);var a=n==r[0],o=n==r[r.length-1],c=t&&a;if(c||!t&&o){dr(e);var l=function(e){var t,n=e?`prevPanel`:`nextPanel`,r=[],i=Re((N.j&&N.j.activeSlide?N.j.activeSlide:N.j)[n]());do(r=Ai(i.item)).length&&(t={Yn:i,Gn:r[e?r.length-1:0]}),i=Re(i[n]());while(i&&r.length===0);return t}(c),u=l?l.Yn:null;if(u){var d=u.nn?u:u.parent;L.ln(St,{Xn:d.index()+1,slideAnchor:u.nn?0:u.index()}),oi=l.Gn,dr(e)}}}}else dr(e)}(e):!jr()&&M().keyboardScrolling&&r&&(ii=e.ctrlKey,ai=setTimeout((function(){(function(e){var t=e.shiftKey,n=s.activeElement,r=H(n,`video`)||H(n,`audio`),i=z.isScrolled(`up`,F().j.item),a=z.isScrolled(`down`,F().j.item),o=[37,39].indexOf(e.keyCode)>-1;if(function(e){(function(e){return[40,38,32,33,34].indexOf(e.keyCode)>-1&&!N.L})(e)&&!ar(e.target,k)&&e.preventDefault()}(e),N.canScroll||o)switch(P({D:`keydown`}),e.keyCode){case 38:case 33:Rt().k.up&&i?N.L?L.ln(Ct,{e}):ei():z.Sn();break;case 32:if(t&&Rt().k.up&&!r&&i){ei();break}case 40:case 34:if(Rt().k.down&&a){if(N.L)return;e.keyCode===32&&r||$r()}else z.Sn();break;case 36:Rt().k.up&&wi(1);break;case 35:Rt().k.down&&wi(F().R.length);break;case 37:Rt().k.left&&yi();break;case 39:Rt().k.right&&bi()}})(e)}),0))}function K(e){N.G&&(ii=e.ctrlKey)}function q(){P({G:!1}),ii=!1}function Di(e){ki()}function Oi(e){ar(oi,te)&&!ar(oi,ne)||ki()}function ki(){oi&&=(oi.focus(),null)}function Ai(e){return[].slice.call(B(`a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], summary:not([disabled]), [contenteditable]`,e)).filter((function(e){return fr(e,`tabindex`)!==`-1`&&e.offsetParent!==null}))}f.moveSlideLeft=yi,f.moveSlideRight=bi,f.moveTo=wi,L.un(vt,(function(){mr(`blur`,q),pr(`keydown`,Ei),pr(`keyup`,K),L.un(yt,Ti),L.un(Mt,Di),L.un(jt,Oi)}));var ji=new Date().getTime(),Mi=[];function Ni(e){e?(function(){var e,t=``;o.addEventListener?e=`addEventListener`:(e=`attachEvent`,t=`on`);var n=`onwheel`in s.createElement(`div`)?`wheel`:s.onmousewheel===void 0?`DOMMouseScroll`:`mousewheel`,r=Br();n==`DOMMouseScroll`?s[e](t+`MozMousePixelScroll`,Pi,r):s[e](t+n,Pi,r)}(),j().addEventListener(`mousedown`,Fi),j().addEventListener(`mouseup`,Ii)):(s.addEventListener?(hr(`mousewheel`,Pi,!1),hr(`wheel`,Pi,!1),hr(`MozMousePixelScroll`,Pi,!1)):s.detachEvent(`onmousewheel`,Pi),j().removeEventListener(`mousedown`,Fi),j().removeEventListener(`mouseup`,Ii))}function Pi(e){var t=new Date().getTime(),n=Vn(B(`.fp-completely`)[0],`fp-normal-scroll`),r=function(e,t){new Date().getTime();var n=F().L&&e.getBoundingClientRect().bottom>=0&&Gr.Fn()===`up`,r=F().Vn;if(r)return dr(t),!1;if(F().L){if(n){var i;if(!(r||Qr(`isNewKeyframe`,`beyondFullpage`)&&Gr.Wn()))return(i=ze(Dr(F().R).item.offsetTop+Dr(F().R).item.offsetHeight)).element.scrollTo(0,i.options),P({Vn:!1}),dr(t),!1;if(Gr.Wn())return n=!1,P({Vn:!0}),P({D:`wheel`}),Jr(),dr(t),!1}else Qr(`set`,`beyondFullpage`,1e3);if(!r&&!n)return!0}}(j(),e);if(N.Y||P({Z:!1,Y:!0,V:`none`}),!Rt().m.down&&!Rt().m.up)return!1;if(r)return!0;if(!1===r)return dr(e),!1;if(M().autoScrolling&&!ii&&!n){var i=(e||=o.event).wheelDelta||-e.deltaY||-e.detail,a=Math.max(-1,Math.min(1,i)),s=e.wheelDeltaX!==void 0||e.deltaX!==void 0,c=Math.abs(e.wheelDeltaX)<Math.abs(e.wheelDelta)||Math.abs(e.deltaX)<Math.abs(e.deltaY)||!s,l=a<0?`down`:a>0?`up`:`none`;Mi.length>149&&Mi.shift(),Mi.push(Math.abs(i)),M().scrollBar&&dr(e);var u=t-ji;return ji=t,u>200&&(Mi=[]),P({B:l}),N.canScroll&&!Te()&&Or(Mi,10)>=Or(Mi,70)&&c&&(P({D:`wheel`}),ri(a<0?`down`:`up`)),!1}M().fitToSection&&P({F:!1})}function Fi(e){var t;e.which==2&&(t=e.pageY,ti=t,j().addEventListener(`mousemove`,ni))}function Ii(e){e.which==2&&j().removeEventListener(`mousemove`,ni)}function Li(e){e?(Ni(!0),function(){if(di.Bn&&(c||u)&&(!we(`dragAndMove`)||M().dragAndMove===`mouseonly`)){M().autoScrolling&&(Ye.removeEventListener(di.Bn,_i,{passive:!1}),Ye.addEventListener(di.Bn,_i,{passive:!1}));var e=M().touchWrapper;e.removeEventListener(di.Zn,pi),e.removeEventListener(di.Bn,G,{passive:!1}),e.addEventListener(di.Zn,pi),e.addEventListener(di.Bn,G,{passive:!1})}}()):(Ni(!1),function(){if(di.Bn&&(c||u)){M().autoScrolling&&(Ye.removeEventListener(di.Bn,G,{passive:!1}),Ye.removeEventListener(di.Bn,_i,{passive:!1}));var e=M().touchWrapper;e.removeEventListener(di.Zn,pi),e.removeEventListener(di.Bn,G,{passive:!1})}}())}f.setMouseWheelScrolling=Ni;var Ri=!0;function zi(){[`mouseenter`,`touchstart`,`mouseleave`,`touchend`].forEach((function(e){hr(e,Vi,!0)}))}function Bi(e,t){document[`fp_`+e]=t,pr(e,Vi,!0)}function Vi(e){var t=e.type,n=!1,r=t===`mouseleave`?e.toElement||e.relatedTarget:e.target;r!=document&&r?(t===`touchend`&&(Ri=!1,setTimeout((function(){Ri=!0}),800)),(t!==`mouseenter`||Ri)&&(M().normalScrollElements.split(`,`).forEach((function(e){if(!n){var t=H(r,e),i=ar(r,e);(t||i)&&(f.shared.Un||Li(!1),f.shared.Un=!0,n=!0)}})),!n&&f.shared.Un&&(Li(!0),f.shared.Un=!1))):Li(!0)}function Hi(e,t){qe(0,`internal`),wi(e,t),qe(be().scrollingSpeed,`internal`)}L.un(vt,(function(){M().normalScrollElements&&([`mouseenter`,`touchstart`].forEach((function(e){Bi(e,!1)})),[`mouseleave`,`touchend`].forEach((function(e){Bi(e,!0)}))),L.un(yt,zi)})),f.silentMoveTo=Hi;var Ui,Wi,Gi=Hn(),Ki=Un(),qi=!1;function Ji(){clearTimeout(Ui),clearTimeout(Wi),gr(`resize`,Yi)}function Yi(){qi||(M().autoScrolling&&!M().scrollBar||!M().fitToSection)&&Zi(Hn()),N.K&&function(){if(c)for(var e=0;e<4;e++)Wi=setTimeout((function(){window.requestAnimationFrame((function(){M().autoScrolling&&!M().scrollBar&&(P({P:!0}),Hi(N.j.index()+1),P({P:!1}))}))}),200*e)}(),qi=!0,clearTimeout(Ui),Ui=setTimeout((function(){(function(){if(P({P:!0}),(!c||M().adjustOnNavChange)&&(Zi(``),vr(j(),`onResize`),M().autoScrolling||N.L||Qi()),L.ln(bt),Xt(),En(),c){var e=s.activeElement;if(!H(e,`textarea`)&&!H(e,`input`)&&!H(e,`select`)){var t=Hn();Math.abs(t-Gi)>20*Math.max(Gi,t)/100&&(Xi(!0),Gi=t)}}else n=Hn(),r=Un(),N.U===n&&Ki===r||(P({U:n}),Ki=r,Xi(!0));var n,r;vr(j(),`onResizeEnds`),P({P:!1})})(),qi=!1}),400)}function Xi(e){if(!Vn(j(),y)){P({P:!0,U:Hn(),_n:Un()});for(var t=F().R,n=0;n<t.length;++n){var r=t[n],i=B(ie,r.item)[0],a=r.slides;we(`offsetSections`)&&Wn(r.item,{height:De(r.item)}),a.length>1&&Ht(i,r.activeSlide.item)}M().scrollOverflow&&z.bn();var s=F().j.index();N.L||!s||we(`fadingEffect`)||we(`dropEffect`)||we(`waterEffect`)||Hi(s+1),P({P:!1}),_r(M().afterResize)&&e&&M().afterResize.call(j(),o.innerWidth,o.innerHeight),_r(M().afterReBuild)&&!e&&M().afterReBuild.call(j()),vr(j(),`afterRebuild`)}}function Zi(e){F().R.forEach((function(t){var n=e!==``||we(`offsetSections`)?De(t.item):``;Wn(t.item,{height:n})}))}function Qi(){if(!M().autoScrolling||M().scrollBar){var e=.01*o.innerHeight;s.documentElement.style.setProperty(`--vh`,`${e}px`)}}function $i(){var e,t,n=o.location.hash;if(n.length){var r=n.replace(`#`,``).split(`/`),i=n.indexOf(`#/`)>-1;e=i?`/`+r[1]:decodeURIComponent(r[0]);var a=i?r[2]:r[1];a&&a.length&&(t=decodeURIComponent(a))}return{section:e,pn:t}}function ea(){gr(`hashchange`,ta)}function ta(){if(!N.H&&!M().lockAnchors){var e=$i(),t=e.section,n=e.pn,r=N.C===void 0,i=N.C===void 0&&n===void 0&&!N.I;t&&t.length&&(t&&t!==N.C&&!r||i&&!Te()||!N.I&&N.W!=n&&!Te())&&L.ln(St,{Xn:t,slideAnchor:n})}}function na(e){var t=e.target;ar(t,M().menu+` [data-menuanchor]`)&&ra.call(t,e.e)}function ra(e){if(P({D:`menu`}),B(M().menu)[0]&&(M().lockAnchors||!M().anchors.length)){dr(e);var t=ar(this,`[data-menuanchor]`);L.ln(wt,{anchor:fr(t,`data-menuanchor`)})}}function ia(e){var t=e.target;t&&ar(t,`#fp-nav a`)?fn.call(t,e.e):H(t,`.fp-tooltip`)?un.call(t):(H(t,ue)||ar(t,ue)!=null)&&Nt.call(t,e.e)}f.reBuild=Xi,L.un(vt,(function(){Yi(),Qi(),mr(`resize`,Yi),L.un(yt,Ji)})),f.setLockAnchors=function(e){M().lockAnchors=e},L.un(vt,(function(){mr(`hashchange`,ta),L.un(yt,ea)})),L.un(vt,(function(){pr(`wheel`,Gr.Cn,Br()),L.un(Dt,Kr),L.un(Ct,qr)})),L.un(vt,(function(){L.un(pt,na)})),L.un(vt,(function(){L.un(pt,ia)}));var aa,oa,sa=0;function ca(e){var t,n,r,i,a;if(vr(j(),`onScroll`),!N.P&&F().j&&(Dr(F().R),!F().L&&!F().Vn&&(!M().autoScrolling||M().scrollBar||we(`dragAndMove`))&&!Ee())){var o=we(`dragAndMove`)?Math.abs(I(`dragAndMove`,`getCurrentScroll`)):lr(),s=function(e){var t=e>sa?`down`:`up`;return sa=e,P({X:e}),t}(o),l=0,u=o+Hn()/2,d=(we(`dragAndMove`)?I(`dragAndMove`,`getDocumentHeight`):Ye.scrollHeight-Hn())===o,f=F().R;if(P({scrollY:o}),d)l=f.length-1;else if(o)for(var p=0;p<f.length;++p)(ar(f[p].item,T)||f[p].item).offsetTop<=u&&(l=p);else l=0;if(r=s,i=F().j.item.offsetTop,a=i+Hn(),(r==`up`?a>=lr()+Hn():i<=lr())&&(Vn(F().j.item,C)||(V(F().j.item,C),$n(ur(F().j.item),C))),n=(t=f[l]).item,!t.isActive){P({H:!0});var m,h,g=F().j.item,_=F().j.index()+1,v=He(F().j,n),y=t.anchor,b=t.index()+1,S=t.activeSlide,w={j:g,sectionIndex:b-1,anchorLink:y,element:n,leavingSection:_,direction:v,items:{origin:F().j,destination:t}};S&&(h=S.anchor,m=S.index()),N.canScroll&&($n(f.filter((function(e){return e.index()!==t.index()})).map((function(e){return e.item})),x),V(n,x),I(`parallax`,`afterLoad`),_r(M().beforeLeave)&&xn(`beforeLeave`,w),_r(M().onLeave)&&an(`onLeave`,w),_r(M().afterLoad)&&an(`afterLoad`,w),I(`resetSliders`,`apply`,{localIsResizing:N.P,leavingSection:_}),nt(g),it(t),et(n),pn(y,b-1),M().anchors.length&&P({C:y}),Xt(),ct(m,h,y)),clearTimeout(aa),aa=setTimeout((function(){P({H:!1})}),100)}M().fitToSection&&N.canScroll&&(clearTimeout(oa),oa=setTimeout((function(){var e;if(!N.R.filter((function(e){var t=e.item.getBoundingClientRect();return Math.round(t.bottom)===Math.round(Hn())||Math.round(t.top)===0})).length){if(c&&(e=document.activeElement)&&e.matches(`input, textarea`))return;Tn()}}),M().fitToSectionDelay))}}function la(e){var t=e.items.destination.activeSlide;P({scrollX:t?Math.round(t.offsetLeft):0})}function ua(e){var t=M().skipIntermediateItems,n=e.items.origin.nn?`sections`:`slides`,r=Math.abs(e.items.origin.index()-e.items.destination.index())>1;(!0===t||t===n)&&r&&qe(0,`internal`)}function da(){M().skipIntermediateItems&&xe(`scrollingSpeed`,be().scrollingSpeed,`internal`)}function fa(e,t){t===void 0?(Lt(e,`all`,`k`),M().keyboardScrolling=e):(t=t.replace(/ /g,``).split(`,`)).forEach((function(t){Lt(e,t,`k`)}))}function pa(e){var t=e.index();M().anchors[t]!==void 0&&e.isActive&&pn(M().anchors[t],t),M().menu&&M().css3&&ar(B(M().menu)[0],h)!=null&&B(M().menu).forEach((function(e){Ye.appendChild(e)}))}function ma(){var e,t,n=F().j,r=F().j.item;V(r,C),it(F().j),ln(),et(r),t=xi((e=$i()).section),e.section&&t&&(t===void 0||t.index()!==Jn(jn))||!_r(M().afterLoad)||an(`afterLoad`,{j:r,element:r,direction:null,anchorLink:n.anchor,sectionIndex:n.index(),items:{origin:F().j,destination:F().j}}),_r(M().afterRender)&&an(`afterRender`),vr(j(),`afterRender`)}function ha(e,t){t===void 0?Lt(e,`all`,`m`):(t=t.replace(/ /g,``).split(`,`)).forEach((function(t){Lt(e,t,`m`)})),vr(j(),`setAllowScrolling`,{value:e,Qn:t})}function ga(){var e=$i(),t=e.section,n=e.pn;t?M().animateAnchor?Ci(t,n):Hi(t,n):L.ln(ft,null)}L.un(yt,(function(){clearTimeout(aa),clearTimeout(oa)})),L.un(vt,(function(){mr(`scroll`,ca),s.body.addEventListener(`scroll`,ca),L.un(St,(function(e){Ci(e.Xn,e.slideAnchor)})),L.un(wt,(function(e){wi(e.anchor,void 0)})),L.un(xt,(function(e){(e.direction===`down`?$r:ei)()})),L.un(Tt,(function(e){Sn(e.destination)}))})),L.un(yt,(function(){gr(`scroll`,ca)})),f.getActiveSlide=function(){return rn(F().j.activeSlide)},f.getScrollX=function(){return N.scrollX},L.un(vt,(function(){L.un(yt,Gt),L.un(Et,(function(e){Ht(e.slides,e.destination)})),L.un(ht,(function(e){bi(e.section)})),L.un(mt,(function(e){yi(e.section)})),L.un(jt,la)})),L.un(vt,(function(){var e=M().credits.position,t=`
        <div class="fp-watermark" style="${[`left`,`right`].indexOf(e)>-1?`${e}: 0;`:``}">
            <a href="https://alvarotrigo.com/fullPage/" 
                rel="nofollow noopener" 
                target="_blank" 
                style="text-decoration:none; color: #000;">
                    ${M().credits.label}
            </a>
        </div>
    `,n=Dr(N.R),r=!N.Jn||M().credits.enabled;n&&n.item&&r&&n.item.insertAdjacentHTML(`beforeend`,t)})),function(){L.un(gt,(function(){var t,s,c;P({Jn:(M().licenseKey,t=M().licenseKey,s=function(t){var n=`202`;if(!t||t.length<29||t.split(e[0]).length===4)return null;var r=[`Each`,`for`][i()]().join(``),s=t[[`split`]](`-`),c=[];s[r]((function(e,t){if(t<4){var r=function(e){var t=e[e.length-1],n=[`NaN`,`is`][i()]().join(``);return window[n](t)?a(t):function(e){return e-x.length}(t)}(e);c.push(r);var o=a(e[r]);if(t===1){var s=[`pa`,`dS`,`t`,`art`].join(``);o=o.toString()[s](2,`0`)}n+=o,t!==0&&t!==1||(n+=`-`)}}));var l=0,u=``;return t.split(`-`).forEach((function(e,t){if(t<4){for(var n=0,r=0;r<4;r++)r!==c[t]&&(n+=Math.abs(a(e[r])),isNaN(e[r])||l++);var i=o(n);u+=i}})),u+=o(l),{Kn:new Date(n+`T00:00`),$n:n.split(`-`)[2]===8*(x.length-2)+``,qn:u}}(t),c=function(e){var t=r[i()]().join(``);return e&&t.indexOf(e)===0&&e.length===t.length}(t)||function(e){return RegExp(`^(?=.*?[A-Y])(?=.*?[a-y])(?=.*?[0-8])(?=.*?[#?!@$%^&*-]).{8,}$`).test(e)}(t),(s||c)&&(s&&n<=s.Kn&&s.qn===t.split(e[0])[4]||c||s.$n)||!1)})}));var e=[`-`],t=`2025-0-27`.split(`-`),n=new Date(t[0],t[1],t[2]),r=[`se`,`licen`,`-`,`v3`,`l`,`gp`];function i(){return[[`re`,`verse`].join(``)][0]}function a(e){return e?isNaN(e)?e.charCodeAt(0)-72:e:``}function o(e){var t=72+e;return t>90&&t<97&&(t+=15),String.fromCharCode(t).toUpperCase()}}(),L.un(Ot,ua),L.un(jt,da),L.un(kt,ua),L.un(Mt,da),L.un(_t,(function(){fa(!0)})),f.setKeyboardScrolling=fa,f.shared.nt=ma,f.setAllowScrolling=ha;var _a={};function va(){return _a}var ya,ba,xa,Sa,Ca=!Vn(Ye,ke(`OHNsd3AtZnVsbHBhZ2UtanM5T20=`));function wa(e){if(ba=s.createElement(`div`),ya=ke(`MTIzPGRpdj48YSBocmVmPSJodHRwOi8vYWx2YXJvdHJpZ28uY29tL2Z1bGxQYWdlL2V4dGVuc2lvbnMvIiBzdHlsZT0iY29sb3I6ICNmZmYgIWltcG9ydGFudDsgdGV4dC1kZWNvcmF0aW9uOm5vbmUgIWltcG9ydGFudDsiPlVubGljZW5zZWQgZnVsbFBhZ2UuanMgRXh0ZW5zaW9uPC9hPjwvZGl2PjEyMw==`),Ca||(ya=ya.replace(`extensions/`,``).replace(`Extension`,``)),ba.innerHTML=ya,ba=ba.firstChild,`MutationObserver`in window&&new MutationObserver(Ea).observe(s.body,{childList:!0,subtree:!1}),(!Ca||we(e)&&f[e])&&(!function(e){var t=va()[e]!==void 0&&va()[e].length,n=[],r=!1;return Qn(va()[e])?n=va()[e]:n.push(va()[e]),n.forEach((function(n){var i=function(){if(s.domain.length){for(var e=s.domain.replace(/^(www\.)/,``).split(`.`);e.length>2;)e.shift();return e.join(`.`).replace(/(^\.*)|(\.*$)/g,``)}return``}(),a=[`MTM0bG9jYWxob3N0MjM0`,`MTM0MC4xMjM0`,`MTM0anNoZWxsLm5ldDIzNA==`,`UDdDQU5ZNlNN`,`NTY3YnVuZGxlNzg5`,`NTU1S2V5Nzc3`,`NDU2dGVzdDQ1Ng==`],o=ke(a[0]),c=ke(a[1]),l=ke(a[2]),u=ke(a[6]),d=ke(a[3]),f=ke(a[4]),p=ke(a[5]),m=M()[f+p]!==void 0;t||=m;var h=[o,c,l,u].indexOf(i)<0&&i.length!==0;if(!t&&!m&&h)return!1;var g=t?ke(n):``,_=(g=g.split(`_`)).length>1&&g[1].indexOf(e,g[1].length-e.length)>-1,v=g.length>1&&g[1].toLowerCase().indexOf(f)>-1,y=g[0].indexOf(i,g[0].length-i.length)<0,b=_||v;r=r||!(y&&h&&d!=g[0])&&b||!h})),r}(e)||!Ca)){Ta();var t=ke(`MzQ1c2V0SW50ZXJ2YWwxMjM=`);window[t](Ta,2e3)}}function Ta(){ba&&(Sa||=(Math.random()<.5?Oe(Ye,ba):er(ba,Ye),!0),ba.setAttribute(`style`,ke(`MTIzei1pbmRleDo5OTk5OTk5O3Bvc2l0aW9uOmZpeGVkO3RvcDoyMHB4O2JvdHRvbTphdXRvO2xlZnQ6MjBweDtyaWdodDphdXRvO2JhY2tncm91bmQ6cmVkO3BhZGRpbmc6N3B4IDE1cHg7Zm9udC1zaXplOjE0cHg7Zm9udC1mYW1pbHk6YXJpYWw7Y29sb3I6I2ZmZjtkaXNwbGF5OmlubGluZS1ibG9jazt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO29wYWNpdHk6MTtoZWlnaHQ6YXV0bzt3aWR0aDphdXRvO3pvb206MTttYXJnaW46YXV0bztib3JkZXI6bm9uZTt2aXNpYmlsaXR5OnZpc2libGU7Y2xpcC1wYXRoOm5vbmU7MTIz`).replace(/;/g,ke(`MTIzICFpbXBvcnRhbnQ7MzQ1`))))}function Ea(e){e.forEach((function(e){if(e.removedNodes[0]&&e.removedNodes[0].isEqualNode(ba)){clearTimeout(xa);var t=ke(`bDIwc2V0VGltZW91dDAzbA==`);xa=window[t](Da,900)}}))}function Da(){Sa=!1}function Oa(){Zt(),Xt(),M().scrollBar=M().scrollBar||M().hybrid,Se(),function(){Wn(Ar(j(),`body`),{height:`100%`,position:`relative`}),V(j(),m),V(Xe,b),P({U:Hn()}),$n(j(),y),Pr(),I(`parallax`,`init`);for(var e=F().tn,t=0;t<e.length;t++){var n=e[t],r=n.vn,i=fr(n.item,`style`);i&&n.item.setAttribute(`data-fp-styles`,i),Mn(n),pa(n),r.length>0&&Fr(n)}M().fixedElements&&M().css3&&B(M().fixedElements).forEach((function(e){Ye.appendChild(e)})),M().navigation&&dn(),B(`iframe[src*="youtube.com/embed/"]`,j()).forEach((function(e){var t,n=fr(t=e,`src`);t.setAttribute(`src`,n+(/\?/.test(n)?`&`:`?`)+`enablejsapi=1`)})),I(`fadingEffect`,`apply`),I(`waterEffect`,`init`),I(`dropEffect`,`init`),I(`cards`,`init`),M().scrollOverflow&&z.bn()}(),ha(!0),Li(!0),sn(M().autoScrolling,`internal`),En(),ot(),s.readyState===`complete`&&ga(),mr(`load`,ga),ma(),Ca||wa(`l`),Zt(),Xt()}function ka(){var e=M().licenseKey;M().licenseKey.trim()===``?(Ln(`error`,"Fullpage.js requires a `licenseKey` option. Read about it on the following website:"),Ln(`error`,`https://alvarotrigo.com/fullPage/docs/#licensekey`)):M()&&N.Jn||s.domain.indexOf(`alvarotrigo.com`)>-1?e&&e.length:(Ln(`error`,"Incorrect `licenseKey`. Get one for fullPage.js version 4 here:"),Ln(`error`,`https://alvarotrigo.com/fullPage/pricing`)),Vn(Xe,b)?Ln(`error`,`Fullpage.js can only be initialized once and you are doing it multiple times!`):(M().continuousVertical&&(M().loopTop||M().loopBottom)&&(M().continuousVertical=!1,Ln(`warn`,"Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),!M().scrollOverflow||!M().scrollBar&&M().autoScrolling||Ln(`warn`,`Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox`),!M().continuousVertical||!M().scrollBar&&M().autoScrolling||(M().continuousVertical=!1,Ln(`warn`,"Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),M().anchors.forEach((function(e){var t=[].slice.call(B(`[name]`)).filter((function(t){return fr(t,`name`)&&fr(t,`name`).toLowerCase()==e.toLowerCase()})),n=[].slice.call(B(`[id]`)).filter((function(t){return fr(t,`id`)&&fr(t,`id`).toLowerCase()==e.toLowerCase()}));if(n.length||t.length){Ln(`error`,"data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).");var r=n.length?`id`:`name`;(n.length||t.length)&&Ln(`error`,`"`+e+'" is is being used by another element `'+r+"` property")}})))}function Aa(){return{options:M(),internals:{container:j(),canScroll:N.canScroll,isScrollAllowed:Rt(),getDestinationPosition:R,isTouch:u,c:wa,getXmovement:Wt,removeAnimation:Ue,getTransforms:We,lazyLoad:rt,addAnimation:Ve,performHorizontalMove:Ut,landscapeScroll:Ht,silentLandscapeScroll:qt,keepSlidesPosition:cn,silentScroll:Ke,styleSlides:Fr,styleSection:Mn,scrollHandler:ca,getEventsPage:hi,getMSPointer:gi,isReallyTouch:fi,usingExtension:we,toggleControlArrows:Bt,touchStartHandler:pi,touchMoveHandler:G,nullOrSection:nn,items:{SectionPanel:en,SlidePanel:tn,Item:je},getVisible:zn,getState:F,updateState:Xt,updateStructuralState:Zt,activeSlidesNavigation:Pt,getPanels:function(){return N.rn},getSections:function(){return N.R},setActiveSection:function(e){N.j=e}}}}function ja(e){var t=[`NTY3YnVuZGxlNzg5`,`NTU1S2V5Nzc3`],n=ke(t[0]),r=ke(t[1]),i=M()[n+r]!==void 0,a=`fp_`+e+`Extension`;va()[e]=i?M()[n+r]:M()[e+r],f[e]=window[a]===void 0?null:new window[a],f[e]&&f[e].c(e)}function Ma(e,t){var n;if(Ye=B(`body`)[0],Xe=B(`html`)[0],Ze=B(`html, body`),!Vn(Xe,b))return n=typeof e==`string`?B(e)[0]:e,he.touchWrapper=n,function(e){ye=Bn({},he,e),ve=Object.assign({},ye)}(t),function(e){ge=e}(typeof e==`string`?B(e)[0]:e),L.ln(gt),ka(),f.getFullpageData=Aa,f.version=`4.0.33`,f.test=Object.assign(f.test,{top:`0px`,on:`translate3d(0px, 0px, 0px)`,cn:function(){for(var e=[],t=0;t<B(M().sectionSelector,j()).length;t++)e.push(`translate3d(0px, 0px, 0px)`);return e}(),left:function(){for(var e=[],t=0;t<B(M().sectionSelector,j()).length;t++)e.push(0);return e}(),options:M(),setAutoScrolling:null}),f.shared=Object.assign(f.shared,{nt:null,Un:!1}),o.fullpage_api=f,o.fullpage_extensions=!0,j()&&(L.ln(_t),ja(`continuousHorizontal`),ja(`scrollHorizontally`),ja(`resetSliders`),ja(`interlockedSlides`),ja(`responsiveSlides`),ja(`fadingEffect`),ja(`dragAndMove`),ja(`offsetSections`),ja(`scrollOverflowReset`),ja(`parallax`),ja(`cards`),ja(`dropEffect`),ja(`waterEffect`),I(`dragAndMove`,`init`),I(`responsiveSlides`,`init`),Oa(),L.ln(vt),P({K:!0}),I(`dragAndMove`,`turnOffTouch`)),o.fullpage_api;ka()}return f.destroy=function(e){vr(j(),`destroy`,e),sn(!1,`internal`),ha(!0),Li(!1),fa(!1),V(j(),y),L.ln(yt),I(`dragAndMove`,`destroy`),e&&(Ke(0),B(`img[data-src], source[data-src], audio[data-src], iframe[data-src]`,j()).forEach((function(e){kr(e,`src`)})),B(`img[data-srcset]`).forEach((function(e){kr(e,`srcset`)})),xr(B(`#fp-nav, .fp-slidesNav, .fp-controlArrow`)),Wn(Me(F().R),{height:``,"background-color":``,padding:``}),Wn(Me(F().slides),{width:``}),Wn(j(),{height:``,position:``,"-ms-touch-action":``,"touch-action":``}),Wn(Ze,{overflow:``,height:``}),$n(Xe,b),$n(Ye,_+` `+g),Ye.className.split(/\s+/).forEach((function(e){e.indexOf(`fp-viewing`)===0&&$n(Ye,e)})),Me(F().rn).forEach((function(e){M().scrollOverflow&&z.In(e),$n(e,`fp-table active fp-completely `+ce);var t=fr(e,`data-fp-styles`);t&&e.setAttribute(`style`,t),Vn(e,w)&&!_e&&e.removeAttribute(`data-anchor`)})),Ue(j()),[E,oe,ie].forEach((function(e){B(e,j()).forEach((function(e){ir(e)}))})),Wn(j(),{"-webkit-transition":`none`,transition:`none`}),$n(j(),m),o.scrollTo(0,0),[w,D,ae].forEach((function(e){$n(B(`.`+e),e)})))},o.fp_easings=Bn(o.fp_easings,{easeInOutCubic:function(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t}}),o.jQuery&&function(e,t){e&&t?e.fn.fullpage=function(n){n=e.extend({},n,{$:e}),new t(this[0],n),Object.keys(f).forEach((function(e){M().$.fn.fullpage[e]=f[e]}))}:Ln(`error`,`jQuery is required to use the jQuery fullpage adapter!`)}(o.jQuery,Ma),Ma}))}),239:(()=>{window.fp_easings={def:`easeOutQuad`,linear:function(e,t,n,r){return n*e/r+t},swing:function(e,t,n,r){return window.fp_easings[window.fp_easings.def](e,t,n,r)},easeInQuad:function(e,t,n,r){return n*(e/=r)*e+t},easeOutQuad:function(e,t,n,r){return-n*(e/=r)*(e-2)+t},easeInOutQuad:function(e,t,n,r){return(e/=r/2)<1?n/2*e*e+t:-n/2*(--e*(e-2)-1)+t},easeInCubic:function(e,t,n,r){return n*(e/=r)*e*e+t},easeOutCubic:function(e,t,n,r){return n*((e=e/r-1)*e*e+1)+t},easeInOutCubic:function(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e+t:n/2*((e-=2)*e*e+2)+t},easeInQuart:function(e,t,n,r){return n*(e/=r)*e*e*e+t},easeOutQuart:function(e,t,n,r){return-n*((e=e/r-1)*e*e*e-1)+t},easeInOutQuart:function(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e*e+t:-n/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(e,t,n,r){return n*(e/=r)*e*e*e*e+t},easeOutQuint:function(e,t,n,r){return n*((e=e/r-1)*e*e*e*e+1)+t},easeInOutQuint:function(e,t,n,r){return(e/=r/2)<1?n/2*e*e*e*e*e+t:n/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(e,t,n,r){return-n*Math.cos(e/r*(Math.PI/2))+n+t},easeOutSine:function(e,t,n,r){return n*Math.sin(e/r*(Math.PI/2))+t},easeInOutSine:function(e,t,n,r){return-n/2*(Math.cos(Math.PI*e/r)-1)+t},easeInExpo:function(e,t,n,r){return e==0?t:n*2**(10*(e/r-1))+t},easeOutExpo:function(e,t,n,r){return e==r?t+n:n*(1-2**(-10*e/r))+t},easeInOutExpo:function(e,t,n,r){return e==0?t:e==r?t+n:(e/=r/2)<1?n/2*2**(10*(e-1))+t:n/2*(2-2**(-10*--e))+t},easeInCirc:function(e,t,n,r){return-n*(Math.sqrt(1-(e/=r)*e)-1)+t},easeOutCirc:function(e,t,n,r){return n*Math.sqrt(1-(e=e/r-1)*e)+t},easeInOutCirc:function(e,t,n,r){return(e/=r/2)<1?-n/2*(Math.sqrt(1-e*e)-1)+t:n/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(e,t,n,r){var i=1.70158,a=0,o=n;return e==0?t:(e/=r)==1?t+n:(a||=.3*r,o<Math.abs(n)?(o=n,i=a/4):i=a/(2*Math.PI)*Math.asin(n/o),-o*2**(10*--e)*Math.sin((e*r-i)*(2*Math.PI)/a)+t)},easeOutElastic:function(e,t,n,r){var i=1.70158,a=0,o=n;return e==0?t:(e/=r)==1?t+n:(a||=.3*r,o<Math.abs(n)?(o=n,i=a/4):i=a/(2*Math.PI)*Math.asin(n/o),o*2**(-10*e)*Math.sin((e*r-i)*(2*Math.PI)/a)+n+t)},easeInOutElastic:function(e,t,n,r){var i=1.70158,a=0,o=n;return e==0?t:(e/=r/2)==2?t+n:(a||=.3*1.5*r,o<Math.abs(n)?(o=n,i=a/4):i=a/(2*Math.PI)*Math.asin(n/o),e<1?o*2**(10*--e)*Math.sin((e*r-i)*(2*Math.PI)/a)*-.5+t:o*2**(-10*--e)*Math.sin((e*r-i)*(2*Math.PI)/a)*.5+n+t)},easeInBack:function(e,t,n,r,i){return i??=1.70158,n*(e/=r)*e*((i+1)*e-i)+t},easeOutBack:function(e,t,n,r,i){return i??=1.70158,n*((e=e/r-1)*e*((i+1)*e+i)+1)+t},easeInOutBack:function(e,t,n,r,i){return i??=1.70158,(e/=r/2)<1?n/2*(e*e*((1+(i*=1.525))*e-i))+t:n/2*((e-=2)*e*((1+(i*=1.525))*e+i)+2)+t},easeInBounce:function(e,t,n,r){return n-window.fp_easings.easeOutBounce(r-e,0,n,r)+t},easeOutBounce:function(e,t,n,r){return(e/=r)<1/2.75?n*(7.5625*e*e)+t:e<2/2.75?n*(7.5625*(e-=1.5/2.75)*e+.75)+t:e<2.5/2.75?n*(7.5625*(e-=2.25/2.75)*e+.9375)+t:n*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(e,t,n,r){return e<r/2?.5*window.fp_easings.easeInBounce(2*e,0,n,r)+t:.5*window.fp_easings.easeOutBounce(2*e-r,0,n,r)+.5*n+t}}}),379:(e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},o=[],s=0;s<e.length;s++){var c=e[s],l=r.base?c[0]+r.base:c[0],u=a[l]||0,d=`${l} ${u}`;a[l]=u+1;var f=n(d),p={css:c[1],media:c[2],sourceMap:c[3]};f===-1?t.push({identifier:d,updater:i(p,r),references:1}):(t[f].references++,t[f].updater(p)),o.push(d)}return o}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){i||={},e||=[];var a=r(e,i);return function(e){e||=[];for(var o=0;o<a.length;o++){var s=a[o],c=n(s);t[c].references--}for(var l=r(e,i),u=0;u<a.length;u++){var d=a[u],f=n(d);t[f].references===0&&(t[f].updater(),t.splice(f,1))}a=l}}}),569:(e=>{var t={};function n(e){if(t[e]===void 0){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch{n=null}t[e]=n}return t[e]}function r(e,t){var r=n(e);if(!r)throw Error(`Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.`);r.appendChild(t)}e.exports=r}),216:(e=>{function t(e){var t=document.createElement(`style`);return e.setAttributes(t,e.attributes),e.insert(t),t}e.exports=t}),565:((e,t,n)=>{function r(e){var t=n.nc;t&&e.setAttribute(`nonce`,t)}e.exports=r}),795:(e=>{function t(e,t,n){var r=n.css,i=n.media,a=n.sourceMap;i?e.setAttribute(`media`,i):e.removeAttribute(`media`),a&&typeof btoa<`u`&&(r+=`
/*# sourceMappingURL=data:application/json;base64,${btoa(unescape(encodeURIComponent(JSON.stringify(a))))} */`),t.styleTagTransform(r,e)}function n(e){if(e.parentNode===null)return!1;e.parentNode.removeChild(e)}function r(e){var r=e.insertStyleElement(e);return{update:function(n){t(r,e,n)},remove:function(){n(r)}}}e.exports=r}),589:(e=>{function t(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}e.exports=t}),497:(e=>{e.exports=h()})},n={};function r(t){var i=n[t];if(i!==void 0)return i.exports;var a=n[t]={id:t,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{typeof Symbol<`u`&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:`Module`}),Object.defineProperty(e,`__esModule`,{value:!0})};var i={};(()=>{r.r(i),r.d(i,{default:()=>o});var e=r(497),t=r.n(e);let n=n=>{let{children:r}=n;return t().createElement(e.Fragment,null,r)},a=()=>{if(typeof window>`u`)return!1;try{return!`production`.match(/test/)}catch{return!0}},o=(()=>{let e;return e=a()?r(88).Z:r(882).Z,e.Wrapper=n,e})()})(),t.exports=i})()})),B=s((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Bn=s(((e,t)=>{t.exports=B()})),Vn=(0,w.createContext)({});function Hn(e){let t=(0,w.useRef)(null);return t.current===null&&(t.current=e()),t.current}var Un=typeof window<`u`?w.useLayoutEffect:w.useEffect,Wn=(0,w.createContext)(null);function Gn(e,t){e.indexOf(t)===-1&&e.push(t)}function Kn(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}var qn=(e,t,n)=>n>t?t:n<e?e:n,Jn={},Yn=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);function Xn(e){return typeof e==`object`&&!!e}var Zn=e=>/^0[^.\s]+$/u.test(e);function Qn(e){let t;return()=>(t===void 0&&(t=e()),t)}var V=e=>e,$n=(e,t)=>n=>t(e(n)),er=(...e)=>e.reduce($n),tr=(e,t,n)=>{let r=t-e;return r===0?1:(n-e)/r},nr=class{constructor(){this.subscriptions=[]}add(e){return Gn(this.subscriptions,e),()=>Kn(this.subscriptions,e)}notify(e,t,n){let r=this.subscriptions.length;if(r)if(r===1)this.subscriptions[0](e,t,n);else for(let i=0;i<r;i++){let r=this.subscriptions[i];r&&r(e,t,n)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}},rr=e=>e*1e3,ir=e=>e/1e3;function ar(e,t){return t?1e3/t*e:0}var or=(e,t,n)=>(((1-3*n+3*t)*e+(3*n-6*t))*e+3*t)*e,sr=1e-7,cr=12;function lr(e,t,n,r,i){let a,o,s=0;do o=t+(n-t)/2,a=or(o,r,i)-e,a>0?n=o:t=o;while(Math.abs(a)>sr&&++s<cr);return o}function ur(e,t,n,r){if(e===t&&n===r)return V;let i=t=>lr(t,0,1,e,n);return e=>e===0||e===1?e:or(i(e),t,r)}var dr=e=>t=>t<=.5?e(2*t)/2:(2-e(2*(1-t)))/2,fr=e=>t=>1-e(1-t),pr=ur(.33,1.53,.69,.99),mr=fr(pr),hr=dr(mr),gr=e=>e>=1?1:(e*=2)<1?.5*mr(e):.5*(2-2**(-10*(e-1))),_r=e=>1-Math.sin(Math.acos(e)),vr=fr(_r),H=dr(_r),yr=ur(.42,0,1,1),br=ur(0,0,.58,1),xr=ur(.42,0,.58,1),Sr=e=>Array.isArray(e)&&typeof e[0]!=`number`,Cr=e=>Array.isArray(e)&&typeof e[0]==`number`,wr={linear:V,easeIn:yr,easeInOut:xr,easeOut:br,circIn:_r,circInOut:H,circOut:vr,backIn:mr,backInOut:hr,backOut:pr,anticipate:gr},Tr=e=>typeof e==`string`,Er=e=>{if(Cr(e)){e.length;let[t,n,r,i]=e;return ur(t,n,r,i)}else if(Tr(e))return wr[e],`${e}`,wr[e];return e},Dr=[`setup`,`read`,`resolveKeyframes`,`preUpdate`,`update`,`preRender`,`render`,`postRender`],Or={value:null,addProjectionMetrics:null};function kr(e,t){let n=new Set,r=new Set,i=!1,a=!1,o=new WeakSet,s={delta:0,timestamp:0,isProcessing:!1},c=0;function l(t){o.has(t)&&(u.schedule(t),e()),c++,t(s)}let u={schedule:(e,t=!1,a=!1)=>{let s=a&&i?n:r;return t&&o.add(e),s.add(e),e},cancel:e=>{r.delete(e),o.delete(e)},process:e=>{if(s=e,i){a=!0;return}i=!0;let o=n;n=r,r=o,n.forEach(l),t&&Or.value&&Or.value.frameloop[t].push(c),c=0,n.clear(),i=!1,a&&(a=!1,u.process(e))}};return u}var Ar=40;function jr(e,t){let n=!1,r=!0,i={delta:0,timestamp:0,isProcessing:!1},a=()=>n=!0,o=Dr.reduce((e,n)=>(e[n]=kr(a,t?n:void 0),e),{}),{setup:s,read:c,resolveKeyframes:l,preUpdate:u,update:d,preRender:f,render:p,postRender:m}=o,h=()=>{let a=Jn.useManualTiming,o=a?i.timestamp:performance.now();n=!1,a||(i.delta=r?1e3/60:Math.max(Math.min(o-i.timestamp,Ar),1)),i.timestamp=o,i.isProcessing=!0,s.process(i),c.process(i),l.process(i),u.process(i),d.process(i),f.process(i),p.process(i),m.process(i),i.isProcessing=!1,n&&t&&(r=!1,e(h))},g=()=>{n=!0,r=!0,i.isProcessing||e(h)};return{schedule:Dr.reduce((e,t)=>{let r=o[t];return e[t]=(e,t=!1,i=!1)=>(n||g(),r.schedule(e,t,i)),e},{}),cancel:e=>{for(let t=0;t<Dr.length;t++)o[Dr[t]].cancel(e)},state:i,steps:o}}var{schedule:U,cancel:Mr,state:Nr,steps:Pr}=jr(typeof requestAnimationFrame<`u`?requestAnimationFrame:V,!0),Fr;function Ir(){Fr=void 0}var Lr={now:()=>(Fr===void 0&&Lr.set(Nr.isProcessing||Jn.useManualTiming?Nr.timestamp:performance.now()),Fr),set:e=>{Fr=e,queueMicrotask(Ir)}},Rr={layout:0,mainThread:0,waapi:0},zr=e=>t=>typeof t==`string`&&t.startsWith(e),Br=zr(`--`),Vr=zr(`var(--`),Hr=e=>Vr(e)?Ur.test(e.split(`/*`)[0].trim()):!1,Ur=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;function Wr(e){return typeof e==`string`?e.split(`/*`)[0].includes(`var(--`):!1}var Gr={test:e=>typeof e==`number`,parse:parseFloat,transform:e=>e},Kr={...Gr,transform:e=>qn(0,1,e)},qr={...Gr,default:1},Jr=e=>Math.round(e*1e5)/1e5,Yr=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function Xr(e){return e==null}var Zr=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,Qr=(e,t)=>n=>!!(typeof n==`string`&&Zr.test(n)&&n.startsWith(e)||t&&!Xr(n)&&Object.prototype.hasOwnProperty.call(n,t)),$r=(e,t,n)=>r=>{if(typeof r!=`string`)return r;let[i,a,o,s]=r.match(Yr);return{[e]:parseFloat(i),[t]:parseFloat(a),[n]:parseFloat(o),alpha:s===void 0?1:parseFloat(s)}},ei=e=>qn(0,255,e),ti={...Gr,transform:e=>Math.round(ei(e))},ni={test:Qr(`rgb`,`red`),parse:$r(`red`,`green`,`blue`),transform:({red:e,green:t,blue:n,alpha:r=1})=>`rgba(`+ti.transform(e)+`, `+ti.transform(t)+`, `+ti.transform(n)+`, `+Jr(Kr.transform(r))+`)`};function ri(e){let t=``,n=``,r=``,i=``;return e.length>5?(t=e.substring(1,3),n=e.substring(3,5),r=e.substring(5,7),i=e.substring(7,9)):(t=e.substring(1,2),n=e.substring(2,3),r=e.substring(3,4),i=e.substring(4,5),t+=t,n+=n,r+=r,i+=i),{red:parseInt(t,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:i?parseInt(i,16)/255:1}}var ii={test:Qr(`#`),parse:ri,transform:ni.transform},ai=e=>({test:t=>typeof t==`string`&&t.endsWith(e)&&t.split(` `).length===1,parse:parseFloat,transform:t=>`${t}${e}`}),oi=ai(`deg`),si=ai(`%`),W=ai(`px`),ci=ai(`vh`),li=ai(`vw`),ui={...si,parse:e=>si.parse(e)/100,transform:e=>si.transform(e*100)},di={test:Qr(`hsl`,`hue`),parse:$r(`hue`,`saturation`,`lightness`),transform:({hue:e,saturation:t,lightness:n,alpha:r=1})=>`hsla(`+Math.round(e)+`, `+si.transform(Jr(t))+`, `+si.transform(Jr(n))+`, `+Jr(Kr.transform(r))+`)`},G={test:e=>ni.test(e)||ii.test(e)||di.test(e),parse:e=>ni.test(e)?ni.parse(e):di.test(e)?di.parse(e):ii.parse(e),transform:e=>typeof e==`string`?e:e.hasOwnProperty(`red`)?ni.transform(e):di.transform(e),getAnimatableNone:e=>{let t=G.parse(e);return t.alpha=0,G.transform(t)}},fi=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function pi(e){return isNaN(e)&&typeof e==`string`&&(e.match(Yr)?.length||0)+(e.match(fi)?.length||0)>0}var mi=`number`,hi=`color`,gi=`var`,_i=`var(`,vi="${}",yi=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function bi(e){let t=e.toString(),n=[],r={color:[],number:[],var:[]},i=[],a=0;return{values:n,split:t.replace(yi,e=>(G.test(e)?(r.color.push(a),i.push(hi),n.push(G.parse(e))):e.startsWith(_i)?(r.var.push(a),i.push(gi),n.push(e)):(r.number.push(a),i.push(mi),n.push(parseFloat(e))),++a,vi)).split(vi),indexes:r,types:i}}function xi(e){return bi(e).values}function Si({split:e,types:t}){let n=e.length;return r=>{let i=``;for(let a=0;a<n;a++)if(i+=e[a],r[a]!==void 0){let e=t[a];e===mi?i+=Jr(r[a]):e===hi?i+=G.transform(r[a]):i+=r[a]}return i}}function Ci(e){return Si(bi(e))}var wi=e=>typeof e==`number`?0:G.test(e)?G.getAnimatableNone(e):e,Ti=(e,t)=>typeof e==`number`?t?.trim().endsWith(`/`)?e:0:wi(e);function Ei(e){let t=bi(e);return Si(t)(t.values.map((e,n)=>Ti(e,t.split[n])))}var K={test:pi,parse:xi,createTransformer:Ci,getAnimatableNone:Ei};function q(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Di({hue:e,saturation:t,lightness:n,alpha:r}){e/=360,t/=100,n/=100;let i=0,a=0,o=0;if(!t)i=a=o=n;else{let r=n<.5?n*(1+t):n+t-n*t,s=2*n-r;i=q(s,r,e+1/3),a=q(s,r,e),o=q(s,r,e-1/3)}return{red:Math.round(i*255),green:Math.round(a*255),blue:Math.round(o*255),alpha:r}}function Oi(e,t){return n=>n>0?t:e}var ki=(e,t,n)=>e+(t-e)*n,Ai=(e,t,n)=>{let r=e*e,i=n*(t*t-r)+r;return i<0?0:Math.sqrt(i)},ji=[ii,ni,di],Mi=e=>ji.find(t=>t.test(e));function Ni(e){let t=Mi(e);if(`${e}`,!t)return!1;let n=t.parse(e);return t===di&&(n=Di(n)),n}var Pi=(e,t)=>{let n=Ni(e),r=Ni(t);if(!n||!r)return Oi(e,t);let i={...n};return e=>(i.red=Ai(n.red,r.red,e),i.green=Ai(n.green,r.green,e),i.blue=Ai(n.blue,r.blue,e),i.alpha=ki(n.alpha,r.alpha,e),ni.transform(i))},Fi=new Set([`none`,`hidden`]);function Ii(e,t){return Fi.has(e)?n=>n<=0?e:t:n=>n>=1?t:e}function Li(e,t){return n=>ki(e,t,n)}function Ri(e){return typeof e==`number`?Li:typeof e==`string`?Hr(e)?Oi:G.test(e)?Pi:Hi:Array.isArray(e)?zi:typeof e==`object`?G.test(e)?Pi:Bi:Oi}function zi(e,t){let n=[...e],r=n.length,i=e.map((e,n)=>Ri(e)(e,t[n]));return e=>{for(let t=0;t<r;t++)n[t]=i[t](e);return n}}function Bi(e,t){let n={...e,...t},r={};for(let i in n)e[i]!==void 0&&t[i]!==void 0&&(r[i]=Ri(e[i])(e[i],t[i]));return e=>{for(let t in r)n[t]=r[t](e);return n}}function Vi(e,t){let n=[],r={color:0,var:0,number:0};for(let i=0;i<t.values.length;i++){let a=t.types[i],o=e.indexes[a][r[a]];n[i]=e.values[o]??0,r[a]++}return n}var Hi=(e,t)=>{let n=K.createTransformer(t),r=bi(e),i=bi(t);return r.indexes.var.length===i.indexes.var.length&&r.indexes.color.length===i.indexes.color.length&&r.indexes.number.length>=i.indexes.number.length?Fi.has(e)&&!i.values.length||Fi.has(t)&&!r.values.length?Ii(e,t):er(zi(Vi(r,i),i.values),n):(`${e}${t}`,Oi(e,t))};function Ui(e,t,n){return typeof e==`number`&&typeof t==`number`&&typeof n==`number`?ki(e,t,n):Ri(e)(e,t)}var Wi=e=>{let t=({timestamp:t})=>e(t);return{start:(e=!0)=>U.update(t,e),stop:()=>Mr(t),now:()=>Nr.isProcessing?Nr.timestamp:Lr.now()}},Gi=(e,t,n=10)=>{let r=``,i=Math.max(Math.round(t/n),2);for(let t=0;t<i;t++)r+=Math.round(e(t/(i-1))*1e4)/1e4+`, `;return`linear(${r.substring(0,r.length-2)})`},Ki=2e4;function qi(e){let t=0,n=e.next(t);for(;!n.done&&t<2e4;)t+=50,n=e.next(t);return t>=2e4?1/0:t}function Ji(e,t=100,n){let r=n({...e,keyframes:[0,t]}),i=Math.min(qi(r),Ki);return{type:`keyframes`,ease:e=>r.next(i*e).value/t,duration:ir(i)}}var Yi={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1};function Xi(e,t){return e*Math.sqrt(1-t*t)}var Zi=12;function Qi(e,t,n){let r=n;for(let n=1;n<Zi;n++)r-=e(r)/t(r);return r}var $i=.001;function ea({duration:e=Yi.duration,bounce:t=Yi.bounce,velocity:n=Yi.velocity,mass:r=Yi.mass}){let i,a;Yi.maxDuration;let o=1-t;o=qn(Yi.minDamping,Yi.maxDamping,o),e=qn(Yi.minDuration,Yi.maxDuration,ir(e)),o<1?(i=t=>{let r=t*o,i=r*e,a=r-n,s=Xi(t,o),c=Math.exp(-i);return $i-a/s*c},a=t=>{let r=t*o*e,a=r*n+n,s=o**2*t**2*e,c=Math.exp(-r),l=Xi(t**2,o);return(-i(t)+$i>0?-1:1)*((a-s)*c)/l}):(i=t=>{let r=Math.exp(-t*e),i=(t-n)*e+1;return-$i+r*i},a=t=>Math.exp(-t*e)*((n-t)*(e*e)));let s=5/e,c=Qi(i,a,s);if(e=rr(e),isNaN(c))return{stiffness:Yi.stiffness,damping:Yi.damping,duration:e};{let t=c**2*r;return{stiffness:t,damping:o*2*Math.sqrt(r*t),duration:e}}}var ta=[`duration`,`bounce`],na=[`stiffness`,`damping`,`mass`];function ra(e,t){return t.some(t=>e[t]!==void 0)}function ia(e){let t={velocity:Yi.velocity,stiffness:Yi.stiffness,damping:Yi.damping,mass:Yi.mass,isResolvedFromDuration:!1,...e};if(!ra(e,na)&&ra(e,ta))if(t.velocity=0,e.visualDuration){let n=e.visualDuration,r=2*Math.PI/(n*1.2),i=r*r,a=2*qn(.05,1,1-(e.bounce||0))*Math.sqrt(i);t={...t,mass:Yi.mass,stiffness:i,damping:a}}else{let n=ea({...e,velocity:0});t={...t,...n,mass:Yi.mass},t.isResolvedFromDuration=!0}return t}function aa(e=Yi.visualDuration,t=Yi.bounce){let n=typeof e==`object`?e:{visualDuration:e,keyframes:[0,1],bounce:t},{restSpeed:r,restDelta:i}=n,a=n.keyframes[0],o=n.keyframes[n.keyframes.length-1],s={done:!1,value:a},{stiffness:c,damping:l,mass:u,duration:d,velocity:f,isResolvedFromDuration:p}=ia({...n,velocity:-ir(n.velocity||0)}),m=f||0,h=l/(2*Math.sqrt(c*u)),g=o-a,_=ir(Math.sqrt(c/u)),v=Math.abs(g)<5;r||=v?Yi.restSpeed.granular:Yi.restSpeed.default,i||=v?Yi.restDelta.granular:Yi.restDelta.default;let y,b,x,S,C,w;if(h<1)x=Xi(_,h),S=(m+h*_*g)/x,y=e=>o-Math.exp(-h*_*e)*(S*Math.sin(x*e)+g*Math.cos(x*e)),C=h*_*S+g*x,w=h*_*g-S*x,b=e=>Math.exp(-h*_*e)*(C*Math.sin(x*e)+w*Math.cos(x*e));else if(h===1){y=e=>o-Math.exp(-_*e)*(g+(m+_*g)*e);let e=m+_*g;b=t=>Math.exp(-_*t)*(_*e*t-m)}else{let e=_*Math.sqrt(h*h-1);y=t=>{let n=Math.exp(-h*_*t),r=Math.min(e*t,300);return o-n*((m+h*_*g)*Math.sinh(r)+e*g*Math.cosh(r))/e};let t=(m+h*_*g)/e,n=h*_*t-g*e,r=h*_*g-t*e;b=t=>{let i=Math.exp(-h*_*t),a=Math.min(e*t,300);return i*(n*Math.sinh(a)+r*Math.cosh(a))}}let T={calculatedDuration:p&&d||null,velocity:e=>rr(b(e)),next:e=>{if(!p&&h<1){let t=Math.exp(-h*_*e),n=Math.sin(x*e),a=Math.cos(x*e),c=o-t*(S*n+g*a),l=rr(t*(C*n+w*a));return s.done=Math.abs(l)<=r&&Math.abs(o-c)<=i,s.value=s.done?o:c,s}let t=y(e);if(p)s.done=e>=d;else{let n=rr(b(e));s.done=Math.abs(n)<=r&&Math.abs(o-t)<=i}return s.value=s.done?o:t,s},toString:()=>{let e=Math.min(qi(T),Ki),t=Gi(t=>T.next(e*t).value,e,30);return e+`ms `+t},toTransition:()=>{}};return T}aa.applyToOptions=e=>{let t=Ji(e,100,aa);return e.ease=t.ease,e.duration=rr(t.duration),e.type=`keyframes`,e};var oa=5;function sa(e,t,n){let r=Math.max(t-oa,0);return ar(n-e(r),t-r)}function ca({keyframes:e,velocity:t=0,power:n=.8,timeConstant:r=325,bounceDamping:i=10,bounceStiffness:a=500,modifyTarget:o,min:s,max:c,restDelta:l=.5,restSpeed:u}){let d=e[0],f={done:!1,value:d},p=e=>s!==void 0&&e<s||c!==void 0&&e>c,m=e=>s===void 0?c:c===void 0||Math.abs(s-e)<Math.abs(c-e)?s:c,h=n*t,g=d+h,_=o===void 0?g:o(g);_!==g&&(h=_-d);let v=e=>-h*Math.exp(-e/r),y=e=>_+v(e),b=e=>{let t=v(e),n=y(e);f.done=Math.abs(t)<=l,f.value=f.done?_:n},x,S,C=e=>{p(f.value)&&(x=e,S=aa({keyframes:[f.value,m(f.value)],velocity:sa(y,e,f.value),damping:i,stiffness:a,restDelta:l,restSpeed:u}))};return C(0),{calculatedDuration:null,next:e=>{let t=!1;return!S&&x===void 0&&(t=!0,b(e),C(e)),x!==void 0&&e>=x?S.next(e-x):(!t&&b(e),f)}}}function la(e,t,n){let r=[],i=n||Jn.mix||Ui,a=e.length-1;for(let n=0;n<a;n++){let a=i(e[n],e[n+1]);t&&(a=er(Array.isArray(t)?t[n]||V:t,a)),r.push(a)}return r}function ua(e,t,{clamp:n=!0,ease:r,mixer:i}={}){let a=e.length;if(t.length,a===1)return()=>t[0];if(a===2&&t[0]===t[1])return()=>t[1];let o=e[0]===e[1];e[0]>e[a-1]&&(e=[...e].reverse(),t=[...t].reverse());let s=la(t,r,i),c=s.length,l=n=>{if(o&&n<e[0])return t[0];let r=0;if(c>1)for(;r<e.length-2&&!(n<e[r+1]);r++);let i=tr(e[r],e[r+1],n);return s[r](i)};return n?t=>l(qn(e[0],e[a-1],t)):l}function da(e,t){let n=e[e.length-1];for(let r=1;r<=t;r++){let i=tr(0,t,r);e.push(ki(n,1,i))}}function fa(e){let t=[0];return da(t,e.length-1),t}function pa(e,t){return e.map(e=>e*t)}function ma(e,t){return e.map(()=>t||xr).splice(0,e.length-1)}function ha({duration:e=300,keyframes:t,times:n,ease:r=`easeInOut`}){let i=Sr(r)?r.map(Er):Er(r),a={done:!1,value:t[0]},o=ua(pa(n&&n.length===t.length?n:fa(t),e),t,{ease:Array.isArray(i)?i:ma(t,i)});return{calculatedDuration:e,next:t=>(a.value=o(t),a.done=t>=e,a)}}var ga=e=>e!==null;function _a(e,{repeat:t,repeatType:n=`loop`},r,i=1){let a=e.filter(ga),o=i<0||t&&n!==`loop`&&t%2==1?0:a.length-1;return!o||r===void 0?a[o]:r}var va={decay:ca,inertia:ca,tween:ha,keyframes:ha,spring:aa};function ya(e){typeof e.type==`string`&&(e.type=va[e.type])}var ba=class{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(e=>{this.resolve=e})}notifyFinished(){this.resolve()}then(e,t){return this.finished.then(e,t)}},xa=e=>e/100,Sa=class extends ba{constructor(e){super(),this.state=`idle`,this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.delayState={done:!1,value:void 0},this.stop=()=>{let{motionValue:e}=this.options;e&&e.updatedAt!==Lr.now()&&this.tick(Lr.now()),this.isStopped=!0,this.state!==`idle`&&(this.teardown(),this.options.onStop?.())},Rr.mainThread++,this.options=e,this.initAnimation(),this.play(),e.autoplay===!1&&this.pause()}initAnimation(){let{options:e}=this;ya(e);let{type:t=ha,repeat:n=0,repeatDelay:r=0,repeatType:i,velocity:a=0}=e,{keyframes:o}=e,s=t||ha;s!==ha&&typeof o[0]!=`number`&&(this.mixKeyframes=er(xa,Ui(o[0],o[1])),o=[0,100]);let c=s({...e,keyframes:o});i===`mirror`&&(this.mirroredGenerator=s({...e,keyframes:[...o].reverse(),velocity:-a})),c.calculatedDuration===null&&(c.calculatedDuration=qi(c));let{calculatedDuration:l}=c;this.calculatedDuration=l,this.resolvedDuration=l+r,this.totalDuration=this.resolvedDuration*(n+1)-r,this.generator=c}updateTime(e){let t=Math.round(e-this.startTime)*this.playbackSpeed;this.holdTime===null?this.currentTime=t:this.currentTime=this.holdTime}tick(e,t=!1){let{generator:n,totalDuration:r,mixKeyframes:i,mirroredGenerator:a,resolvedDuration:o,calculatedDuration:s}=this;if(this.startTime===null)return n.next(0);let{delay:c=0,keyframes:l,repeat:u,repeatType:d,repeatDelay:f,type:p,onUpdate:m,finalKeyframe:h}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,e):this.speed<0&&(this.startTime=Math.min(e-r/this.speed,this.startTime)),t?this.currentTime=e:this.updateTime(e);let g=this.currentTime-c*(this.playbackSpeed>=0?1:-1),_=this.playbackSpeed>=0?g<0:g>r;this.currentTime=Math.max(g,0),this.state===`finished`&&this.holdTime===null&&(this.currentTime=r);let v=this.currentTime,y=n;if(u){let e=Math.min(this.currentTime,r)/o,t=Math.floor(e),n=e%1;!n&&e>=1&&(n=1),n===1&&t--,t=Math.min(t,u+1),t%2&&(d===`reverse`?(n=1-n,f&&(n-=f/o)):d===`mirror`&&(y=a)),v=qn(0,1,n)*o}let b;_?(this.delayState.value=l[0],b=this.delayState):b=y.next(v),i&&!_&&(b.value=i(b.value));let{done:x}=b;!_&&s!==null&&(x=this.playbackSpeed>=0?this.currentTime>=r:this.currentTime<=0);let S=this.holdTime===null&&(this.state===`finished`||this.state===`running`&&x);return S&&p!==ca&&(b.value=_a(l,this.options,h,this.speed)),m&&m(b.value),S&&this.finish(),b}then(e,t){return this.finished.then(e,t)}get duration(){return ir(this.calculatedDuration)}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+ir(e)}get time(){return ir(this.currentTime)}set time(e){e=rr(e),this.currentTime=e,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=e:this.driver&&(this.startTime=this.driver.now()-e/this.playbackSpeed),this.driver?this.driver.start(!1):(this.startTime=0,this.state=`paused`,this.holdTime=e,this.tick(e))}getGeneratorVelocity(){let e=this.currentTime;if(e<=0)return this.options.velocity||0;if(this.generator.velocity)return this.generator.velocity(e);let t=this.generator.next(e).value;return sa(e=>this.generator.next(e).value,e,t)}get speed(){return this.playbackSpeed}set speed(e){let t=this.playbackSpeed!==e;t&&this.driver&&this.updateTime(Lr.now()),this.playbackSpeed=e,t&&this.driver&&(this.time=ir(this.currentTime))}play(){if(this.isStopped)return;let{driver:e=Wi,startTime:t}=this.options;this.driver||=e(e=>this.tick(e)),this.options.onPlay?.();let n=this.driver.now();this.state===`finished`?(this.updateFinished(),this.startTime=n):this.holdTime===null?this.startTime||=t??n:this.startTime=n-this.holdTime,this.state===`finished`&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state=`running`,this.driver.start()}pause(){this.state=`paused`,this.updateTime(Lr.now()),this.holdTime=this.currentTime}complete(){this.state!==`running`&&this.play(),this.state=`finished`,this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state=`finished`,this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state=`idle`,this.stopDriver(),this.startTime=this.holdTime=null,Rr.mainThread--}stopDriver(){this.driver&&=(this.driver.stop(),void 0)}sample(e){return this.startTime=0,this.tick(e,!0)}attachTimeline(e){return this.options.allowFlatten&&(this.options.type=`keyframes`,this.options.ease=`linear`,this.initAnimation()),this.driver?.stop(),e.observe(this)}};function Ca(e){for(let t=1;t<e.length;t++)e[t]??(e[t]=e[t-1])}var wa=e=>e*180/Math.PI,Ta=e=>Da(wa(Math.atan2(e[1],e[0]))),Ea={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:Ta,rotateZ:Ta,skewX:e=>wa(Math.atan(e[1])),skewY:e=>wa(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},Da=e=>(e%=360,e<0&&(e+=360),e),Oa=Ta,ka=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),Aa=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),ja={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:ka,scaleY:Aa,scale:e=>(ka(e)+Aa(e))/2,rotateX:e=>Da(wa(Math.atan2(e[6],e[5]))),rotateY:e=>Da(wa(Math.atan2(-e[2],e[0]))),rotateZ:Oa,rotate:Oa,skewX:e=>wa(Math.atan(e[4])),skewY:e=>wa(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function Ma(e){return+!!e.includes(`scale`)}function Na(e,t){if(!e||e===`none`)return Ma(t);let n=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u),r,i;if(n)r=ja,i=n;else{let t=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);r=Ea,i=t}if(!i)return Ma(t);let a=r[t],o=i[1].split(`,`).map(Fa);return typeof a==`function`?a(o):o[a]}var Pa=(e,t)=>{let{transform:n=`none`}=getComputedStyle(e);return Na(n,t)};function Fa(e){return parseFloat(e.trim())}var Ia=[`transformPerspective`,`x`,`y`,`z`,`translateX`,`translateY`,`translateZ`,`scale`,`scaleX`,`scaleY`,`rotate`,`rotateX`,`rotateY`,`rotateZ`,`skew`,`skewX`,`skewY`],La=new Set(Ia),Ra=e=>e===Gr||e===W,za=new Set([`x`,`y`,`z`]),Ba=Ia.filter(e=>!za.has(e));function Va(e){let t=[];return Ba.forEach(n=>{let r=e.getValue(n);r!==void 0&&(t.push([n,r.get()]),r.set(+!!n.startsWith(`scale`)))}),t}var Ha={width:({x:e},{paddingLeft:t=`0`,paddingRight:n=`0`,boxSizing:r})=>{let i=e.max-e.min;return r===`border-box`?i:i-parseFloat(t)-parseFloat(n)},height:({y:e},{paddingTop:t=`0`,paddingBottom:n=`0`,boxSizing:r})=>{let i=e.max-e.min;return r===`border-box`?i:i-parseFloat(t)-parseFloat(n)},top:(e,{top:t})=>parseFloat(t),left:(e,{left:t})=>parseFloat(t),bottom:({y:e},{top:t})=>parseFloat(t)+(e.max-e.min),right:({x:e},{left:t})=>parseFloat(t)+(e.max-e.min),x:(e,{transform:t})=>Na(t,`x`),y:(e,{transform:t})=>Na(t,`y`)};Ha.translateX=Ha.x,Ha.translateY=Ha.y;var Ua=new Set,Wa=!1,Ga=!1,Ka=!1;function qa(){if(Ga){let e=Array.from(Ua).filter(e=>e.needsMeasurement),t=new Set(e.map(e=>e.element)),n=new Map;t.forEach(e=>{let t=Va(e);t.length&&(n.set(e,t),e.render())}),e.forEach(e=>e.measureInitialState()),t.forEach(e=>{e.render();let t=n.get(e);t&&t.forEach(([t,n])=>{e.getValue(t)?.set(n)})}),e.forEach(e=>e.measureEndState()),e.forEach(e=>{e.suspendedScrollY!==void 0&&window.scrollTo(0,e.suspendedScrollY)})}Ga=!1,Wa=!1,Ua.forEach(e=>e.complete(Ka)),Ua.clear()}function Ja(){Ua.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(Ga=!0)})}function Ya(){Ka=!0,Ja(),qa(),Ka=!1}var Xa=class{constructor(e,t,n,r,i,a=!1){this.state=`pending`,this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...e],this.onComplete=t,this.name=n,this.motionValue=r,this.element=i,this.isAsync=a}scheduleResolve(){this.state=`scheduled`,this.isAsync?(Ua.add(this),Wa||(Wa=!0,U.read(Ja),U.resolveKeyframes(qa))):(this.readKeyframes(),this.complete())}readKeyframes(){let{unresolvedKeyframes:e,name:t,element:n,motionValue:r}=this;if(e[0]===null){let i=r?.get(),a=e[e.length-1];if(i!==void 0)e[0]=i;else if(n&&t){let r=n.readValue(t,a);r!=null&&(e[0]=r)}e[0]===void 0&&(e[0]=a),r&&i===void 0&&r.set(e[0])}Ca(e)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(e=!1){this.state=`complete`,this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,e),Ua.delete(this)}cancel(){this.state===`scheduled`&&(Ua.delete(this),this.state=`pending`)}resume(){this.state===`pending`&&this.scheduleResolve()}},Za=e=>e.startsWith(`--`);function Qa(e,t,n){Za(t)?e.style.setProperty(t,n):e.style[t]=n}var $a={};function eo(e,t){let n=Qn(e);return()=>$a[t]??n()}var to=eo(()=>window.ScrollTimeline!==void 0,`scrollTimeline`),no=eo(()=>{try{document.createElement(`div`).animate({opacity:0},{easing:`linear(0, 1)`})}catch{return!1}return!0},`linearEasing`),ro=([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`,io={linear:`linear`,ease:`ease`,easeIn:`ease-in`,easeOut:`ease-out`,easeInOut:`ease-in-out`,circIn:ro([0,.65,.55,1]),circOut:ro([.55,0,1,.45]),backIn:ro([.31,.01,.66,-.59]),backOut:ro([.33,1.53,.69,.99])};function J(e,t){if(e)return typeof e==`function`?no()?Gi(e,t):`ease-out`:Cr(e)?ro(e):Array.isArray(e)?e.map(e=>J(e,t)||io.easeOut):io[e]}function ao(e,t,n,{delay:r=0,duration:i=300,repeat:a=0,repeatType:o=`loop`,ease:s=`easeOut`,times:c}={},l=void 0){let u={[t]:n};c&&(u.offset=c);let d=J(s,i);Array.isArray(d)&&(u.easing=d),Or.value&&Rr.waapi++;let f={delay:r,duration:i,easing:Array.isArray(d)?`linear`:d,fill:`both`,iterations:a+1,direction:o===`reverse`?`alternate`:`normal`};l&&(f.pseudoElement=l);let p=e.animate(u,f);return Or.value&&p.finished.finally(()=>{Rr.waapi--}),p}function oo(e){return typeof e==`function`&&`applyToOptions`in e}function so({type:e,...t}){return oo(e)&&no()?e.applyToOptions(t):(t.duration??=300,t.ease??=`easeOut`,t)}var co=class extends ba{constructor(e){if(super(),this.finishedTime=null,this.isStopped=!1,this.manualStartTime=null,!e)return;let{element:t,name:n,keyframes:r,pseudoElement:i,allowFlatten:a=!1,finalKeyframe:o,onComplete:s}=e;this.isPseudoElement=!!i,this.allowFlatten=a,this.options=e,e.type;let c=so(e);this.animation=ao(t,n,r,c,i),c.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!i){let e=_a(r,this.options,o,this.speed);this.updateMotionValue&&this.updateMotionValue(e),Qa(t,n,e),this.animation.cancel()}s?.(),this.notifyFinished()}}play(){this.isStopped||(this.manualStartTime=null,this.animation.play(),this.state===`finished`&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;let{state:e}=this;e===`idle`||e===`finished`||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){let e=this.options?.element;!this.isPseudoElement&&e?.isConnected&&this.animation.commitStyles?.()}get duration(){let e=this.animation.effect?.getComputedTiming?.().duration||0;return ir(Number(e))}get iterationDuration(){let{delay:e=0}=this.options||{};return this.duration+ir(e)}get time(){return ir(Number(this.animation.currentTime)||0)}set time(e){let t=this.finishedTime!==null;this.manualStartTime=null,this.finishedTime=null,this.animation.currentTime=rr(e),t&&this.animation.pause()}get speed(){return this.animation.playbackRate}set speed(e){e<0&&(this.finishedTime=null),this.animation.playbackRate=e}get state(){return this.finishedTime===null?this.animation.playState:`finished`}get startTime(){return this.manualStartTime??Number(this.animation.startTime)}set startTime(e){this.manualStartTime=this.animation.startTime=e}attachTimeline({timeline:e,rangeStart:t,rangeEnd:n,observe:r}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:`linear`}),this.animation.onfinish=null,e&&to()?(this.animation.timeline=e,t&&(this.animation.rangeStart=t),n&&(this.animation.rangeEnd=n),V):r(this)}},lo={anticipate:gr,backInOut:hr,circInOut:H};function uo(e){return e in lo}function fo(e){typeof e.ease==`string`&&uo(e.ease)&&(e.ease=lo[e.ease])}var po=10,mo=class extends co{constructor(e){fo(e),ya(e),super(e),e.startTime!==void 0&&e.autoplay!==!1&&(this.startTime=e.startTime),this.options=e}updateMotionValue(e){let{motionValue:t,onUpdate:n,onComplete:r,element:i,...a}=this.options;if(!t)return;if(e!==void 0){t.set(e);return}let o=new Sa({...a,autoplay:!1}),s=Math.max(po,Lr.now()-this.startTime),c=qn(0,po,s-po),l=o.sample(s).value,{name:u}=this.options;i&&u&&Qa(i,u,l),t.setWithVelocity(o.sample(Math.max(0,s-c)).value,l,c),o.stop()}},ho=(e,t)=>t===`zIndex`?!1:!!(typeof e==`number`||Array.isArray(e)||typeof e==`string`&&(K.test(e)||e===`0`)&&!e.startsWith(`url(`));function go(e){let t=e[0];if(e.length===1)return!0;for(let n=0;n<e.length;n++)if(e[n]!==t)return!0}function _o(e,t,n,r){let i=e[0];if(i===null)return!1;if(t===`display`||t===`visibility`)return!0;let a=e[e.length-1],o=ho(i,t),s=ho(a,t);return`${t}${i}${a}${o?a:i}`,!o||!s?!1:go(e)||(n===`spring`||oo(n))&&r}function vo(e){e.duration=0,e.type=`keyframes`}var yo=new Set([`opacity`,`clipPath`,`filter`,`transform`]),bo=/^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;function xo(e){for(let t=0;t<e.length;t++)if(typeof e[t]==`string`&&bo.test(e[t]))return!0;return!1}var So=new Set([`color`,`backgroundColor`,`outlineColor`,`fill`,`stroke`,`borderColor`,`borderTopColor`,`borderRightColor`,`borderBottomColor`,`borderLeftColor`]),Co=Qn(()=>Object.hasOwnProperty.call(Element.prototype,`animate`));function wo(e){let{motionValue:t,name:n,repeatDelay:r,repeatType:i,damping:a,type:o,keyframes:s}=e;if(!(t?.owner?.current instanceof HTMLElement))return!1;let{onUpdate:c,transformTemplate:l}=t.owner.getProps();return Co()&&n&&(yo.has(n)||So.has(n)&&xo(s))&&(n!==`transform`||!l)&&!c&&!r&&i!==`mirror`&&a!==0&&o!==`inertia`}var To=40,Eo=class extends ba{constructor({autoplay:e=!0,delay:t=0,type:n=`keyframes`,repeat:r=0,repeatDelay:i=0,repeatType:a=`loop`,keyframes:o,name:s,motionValue:c,element:l,...u}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=Lr.now();let d={autoplay:e,delay:t,type:n,repeat:r,repeatDelay:i,repeatType:a,name:s,motionValue:c,element:l,...u};this.keyframeResolver=new(l?.KeyframeResolver||Xa)(o,(e,t,n)=>this.onKeyframesResolved(e,t,d,!n),s,c,l),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(e,t,n,r){this.keyframeResolver=void 0;let{name:i,type:a,velocity:o,delay:s,isHandoff:c,onUpdate:l}=n;this.resolvedAt=Lr.now();let u=!0;_o(e,i,a,o)||(u=!1,(Jn.instantAnimations||!s)&&l?.(_a(e,n,t)),e[0]=e[e.length-1],vo(n),n.repeat=0);let d={startTime:r?this.resolvedAt&&this.resolvedAt-this.createdAt>To?this.resolvedAt:this.createdAt:void 0,finalKeyframe:t,...n,keyframes:e},f=u&&!c&&wo(d),p=d.motionValue?.owner?.current,m;if(f)try{m=new mo({...d,element:p})}catch{m=new Sa(d)}else m=new Sa(d);m.finished.then(()=>{this.notifyFinished()}).catch(V),this.pendingTimeline&&=(this.stopTimeline=m.attachTimeline(this.pendingTimeline),void 0),this._animation=m}get finished(){return this._animation?this.animation.finished:this._finished}then(e,t){return this.finished.finally(e).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),Ya()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(e){this.animation.time=e}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(e){this.animation.speed=e}get startTime(){return this.animation.startTime}attachTimeline(e){return this._animation?this.stopTimeline=this.animation.attachTimeline(e):this.pendingTimeline=e,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}};function Do(e,t,n,r=0,i=1){let a=Array.from(e).sort((e,t)=>e.sortNodePosition(t)).indexOf(t),o=e.size,s=(o-1)*r;return typeof n==`function`?n(a,o):i===1?a*r:s-a*r}var Oo=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function ko(e){let t=Oo.exec(e);if(!t)return[,];let[,n,r,i]=t;return[`--${n??r}`,i]}function Ao(e,t,n=1){`${e}`;let[r,i]=ko(e);if(!r)return;let a=window.getComputedStyle(t).getPropertyValue(r);if(a){let e=a.trim();return Yn(e)?parseFloat(e):e}return Hr(i)?Ao(i,t,n+1):i}var jo={type:`spring`,stiffness:500,damping:25,restSpeed:10},Mo=e=>({type:`spring`,stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),No={type:`keyframes`,duration:.8},Po={type:`keyframes`,ease:[.25,.1,.35,1],duration:.3},Fo=(e,{keyframes:t})=>t.length>2?No:La.has(e)?e.startsWith(`scale`)?Mo(t[1]):jo:Po;function Io(e,t){if(e?.inherit&&t){let{inherit:n,...r}=e;return{...t,...r}}return e}function Lo(e,t){let n=e?.[t]??e?.default??e;return n===e?n:Io(n,e)}var Ro=new Set([`when`,`delay`,`delayChildren`,`staggerChildren`,`staggerDirection`,`repeat`,`repeatType`,`repeatDelay`,`from`,`elapsed`]);function zo(e){for(let t in e)if(!Ro.has(t))return!0;return!1}var Bo=(e,t,n,r={},i,a)=>o=>{let s=Lo(r,e)||{},c=s.delay||r.delay||0,{elapsed:l=0}=r;l-=rr(c);let u={keyframes:Array.isArray(n)?n:[null,n],ease:`easeOut`,velocity:t.getVelocity(),...s,delay:-l,onUpdate:e=>{t.set(e),s.onUpdate&&s.onUpdate(e)},onComplete:()=>{o(),s.onComplete&&s.onComplete()},name:e,motionValue:t,element:a?void 0:i};zo(s)||Object.assign(u,Fo(e,u)),u.duration&&=rr(u.duration),u.repeatDelay&&=rr(u.repeatDelay),u.from!==void 0&&(u.keyframes[0]=u.from);let d=!1;if((u.type===!1||u.duration===0&&!u.repeatDelay)&&(vo(u),u.delay===0&&(d=!0)),(Jn.instantAnimations||Jn.skipAnimations||i?.shouldSkipAnimations)&&(d=!0,vo(u),u.delay=0),u.allowFlatten=!s.type&&!s.ease,d&&!a&&t.get()!==void 0){let e=_a(u.keyframes,s);if(e!==void 0){U.update(()=>{u.onUpdate(e),u.onComplete()});return}}return s.isSync?new Sa(u):new Eo(u)};function Vo(e){let t=[{},{}];return e?.values.forEach((e,n)=>{t[0][n]=e.get(),t[1][n]=e.getVelocity()}),t}function Ho(e,t,n,r){if(typeof t==`function`){let[i,a]=Vo(r);t=t(n===void 0?e.custom:n,i,a)}if(typeof t==`string`&&(t=e.variants&&e.variants[t]),typeof t==`function`){let[i,a]=Vo(r);t=t(n===void 0?e.custom:n,i,a)}return t}function Uo(e,t,n){let r=e.getProps();return Ho(r,t,n===void 0?r.custom:n,e)}var Wo=new Set([`width`,`height`,`top`,`left`,`right`,`bottom`,...Ia]),Go=30,Ko=e=>!isNaN(parseFloat(e)),qo={current:void 0},Jo=class{constructor(e,t={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=e=>{let t=Lr.now();if(this.updatedAt!==t&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(e),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(let e of this.dependents)e.dirty()},this.hasAnimated=!1,this.setCurrent(e),this.owner=t.owner}setCurrent(e){this.current=e,this.updatedAt=Lr.now(),this.canTrackVelocity===null&&e!==void 0&&(this.canTrackVelocity=Ko(this.current))}setPrevFrameValue(e=this.current){this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt}onChange(e){return this.on(`change`,e)}on(e,t){this.events[e]||(this.events[e]=new nr);let n=this.events[e].add(t);return e===`change`?()=>{n(),U.read(()=>{this.events.change.getSize()||this.stop()})}:n}clearListeners(){for(let e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e){this.passiveEffect?this.passiveEffect(e,this.updateAndNotify):this.updateAndNotify(e)}setWithVelocity(e,t,n){this.set(t),this.prev=void 0,this.prevFrameValue=e,this.prevUpdatedAt=this.updatedAt-n}jump(e,t=!0){this.updateAndNotify(e),this.prev=e,this.prevUpdatedAt=this.prevFrameValue=void 0,t&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(e){this.dependents||=new Set,this.dependents.add(e)}removeDependent(e){this.dependents&&this.dependents.delete(e)}get(){return qo.current&&qo.current.push(this),this.current}getPrevious(){return this.prev}getVelocity(){let e=Lr.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||e-this.updatedAt>Go)return 0;let t=Math.min(this.updatedAt-this.prevUpdatedAt,Go);return ar(parseFloat(this.current)-parseFloat(this.prevFrameValue),t)}start(e){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=e(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}};function Yo(e,t){return new Jo(e,t)}var Xo=e=>Array.isArray(e);function Zo(e,t,n){e.hasValue(t)?e.getValue(t).set(n):e.addValue(t,Yo(n))}function Qo(e){return Xo(e)?e[e.length-1]||0:e}function $o(e,t){let{transitionEnd:n={},transition:r={},...i}=Uo(e,t)||{};i={...i,...n};for(let t in i)Zo(e,t,Qo(i[t]))}var es=e=>!!(e&&e.getVelocity);function ts(e){return!!(es(e)&&e.add)}function ns(e,t){let n=e.getValue(`willChange`);if(ts(n))return n.add(t);if(!n&&Jn.WillChange){let n=new Jn.WillChange(`auto`);e.addValue(`willChange`,n),n.add(t)}}function rs(e){return e.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`)}var is=`data-`+rs(`framerAppearId`);function as(e){return e.props[is]}function os({protectedKeys:e,needsAnimating:t},n){let r=e.hasOwnProperty(n)&&t[n]!==!0;return t[n]=!1,r}function ss(e,t,{delay:n=0,transitionOverride:r,type:i}={}){let{transition:a,transitionEnd:o,...s}=t,c=e.getDefaultTransition();a=a?Io(a,c):c;let l=a?.reduceMotion;r&&(a=r);let u=[],d=i&&e.animationState&&e.animationState.getState()[i];for(let t in s){let r=e.getValue(t,e.latestValues[t]??null),i=s[t];if(i===void 0||d&&os(d,t))continue;let o={delay:n,...Lo(a||{},t)},c=r.get();if(c!==void 0&&!r.isAnimating()&&!Array.isArray(i)&&i===c&&!o.velocity){U.update(()=>r.set(i));continue}let f=!1;if(window.MotionHandoffAnimation){let n=as(e);if(n){let e=window.MotionHandoffAnimation(n,t,U);e!==null&&(o.startTime=e,f=!0)}}ns(e,t);let p=l??e.shouldReduceMotion;r.start(Bo(t,r,i,p&&Wo.has(t)?{type:!1}:o,e,f));let m=r.animation;m&&u.push(m)}if(o){let t=()=>U.update(()=>{o&&$o(e,o)});u.length?Promise.all(u).then(t):t()}return u}function cs(e,t,n={}){let r=Uo(e,t,n.type===`exit`?e.presenceContext?.custom:void 0),{transition:i=e.getDefaultTransition()||{}}=r||{};n.transitionOverride&&(i=n.transitionOverride);let a=r?()=>Promise.all(ss(e,r,n)):()=>Promise.resolve(),o=e.variantChildren&&e.variantChildren.size?(r=0)=>{let{delayChildren:a=0,staggerChildren:o,staggerDirection:s}=i;return ls(e,t,r,a,o,s,n)}:()=>Promise.resolve(),{when:s}=i;if(s){let[e,t]=s===`beforeChildren`?[a,o]:[o,a];return e().then(()=>t())}else return Promise.all([a(),o(n.delay)])}function ls(e,t,n=0,r=0,i=0,a=1,o){let s=[];for(let c of e.variantChildren)c.notify(`AnimationStart`,t),s.push(cs(c,t,{...o,delay:n+(typeof r==`function`?0:r)+Do(e.variantChildren,c,r,i,a)}).then(()=>c.notify(`AnimationComplete`,t)));return Promise.all(s)}function us(e,t,n={}){e.notify(`AnimationStart`,t);let r;if(Array.isArray(t)){let i=t.map(t=>cs(e,t,n));r=Promise.all(i)}else if(typeof t==`string`)r=cs(e,t,n);else{let i=typeof t==`function`?Uo(e,t,n.custom):t;r=Promise.all(ss(e,i,n))}return r.then(()=>{e.notify(`AnimationComplete`,t)})}var ds={test:e=>e===`auto`,parse:e=>e},fs=e=>t=>t.test(e),ps=[Gr,W,si,oi,li,ci,ds],ms=e=>ps.find(fs(e));function hs(e){return typeof e==`number`?e===0:e===null?!0:e===`none`||e===`0`||Zn(e)}var gs=new Set([`brightness`,`contrast`,`saturate`,`opacity`]);function _s(e){let[t,n]=e.slice(0,-1).split(`(`);if(t===`drop-shadow`)return e;let[r]=n.match(Yr)||[];if(!r)return e;let i=n.replace(r,``),a=+!!gs.has(t);return r!==n&&(a*=100),t+`(`+a+i+`)`}var vs=/\b([a-z-]*)\(.*?\)/gu,ys={...K,getAnimatableNone:e=>{let t=e.match(vs);return t?t.map(_s).join(` `):e}},bs={...K,getAnimatableNone:e=>{let t=K.parse(e);return K.createTransformer(e)(t.map(e=>typeof e==`number`?0:typeof e==`object`?{...e,alpha:1}:e))}},xs={...Gr,transform:Math.round},Ss={borderWidth:W,borderTopWidth:W,borderRightWidth:W,borderBottomWidth:W,borderLeftWidth:W,borderRadius:W,borderTopLeftRadius:W,borderTopRightRadius:W,borderBottomRightRadius:W,borderBottomLeftRadius:W,width:W,maxWidth:W,height:W,maxHeight:W,top:W,right:W,bottom:W,left:W,inset:W,insetBlock:W,insetBlockStart:W,insetBlockEnd:W,insetInline:W,insetInlineStart:W,insetInlineEnd:W,padding:W,paddingTop:W,paddingRight:W,paddingBottom:W,paddingLeft:W,paddingBlock:W,paddingBlockStart:W,paddingBlockEnd:W,paddingInline:W,paddingInlineStart:W,paddingInlineEnd:W,margin:W,marginTop:W,marginRight:W,marginBottom:W,marginLeft:W,marginBlock:W,marginBlockStart:W,marginBlockEnd:W,marginInline:W,marginInlineStart:W,marginInlineEnd:W,fontSize:W,backgroundPositionX:W,backgroundPositionY:W,rotate:oi,rotateX:oi,rotateY:oi,rotateZ:oi,scale:qr,scaleX:qr,scaleY:qr,scaleZ:qr,skew:oi,skewX:oi,skewY:oi,distance:W,translateX:W,translateY:W,translateZ:W,x:W,y:W,z:W,perspective:W,transformPerspective:W,opacity:Kr,originX:ui,originY:ui,originZ:W,zIndex:xs,fillOpacity:Kr,strokeOpacity:Kr,numOctaves:xs},Cs={...Ss,color:G,backgroundColor:G,outlineColor:G,fill:G,stroke:G,borderColor:G,borderTopColor:G,borderRightColor:G,borderBottomColor:G,borderLeftColor:G,filter:ys,WebkitFilter:ys,mask:bs,WebkitMask:bs},ws=e=>Cs[e],Ts=new Set([ys,bs]);function Es(e,t){let n=ws(e);return Ts.has(n)||(n=K),n.getAnimatableNone?n.getAnimatableNone(t):void 0}var Ds=new Set([`auto`,`none`,`0`]);function Os(e,t,n){let r=0,i;for(;r<e.length&&!i;){let t=e[r];typeof t==`string`&&!Ds.has(t)&&bi(t).values.length&&(i=e[r]),r++}if(i&&n)for(let r of t)e[r]=Es(n,i)}var ks=class extends Xa{constructor(e,t,n,r,i){super(e,t,n,r,i,!0)}readKeyframes(){let{unresolvedKeyframes:e,element:t,name:n}=this;if(!t||!t.current)return;super.readKeyframes();for(let n=0;n<e.length;n++){let r=e[n];if(typeof r==`string`&&(r=r.trim(),Hr(r))){let i=Ao(r,t.current);i!==void 0&&(e[n]=i),n===e.length-1&&(this.finalKeyframe=r)}}if(this.resolveNoneKeyframes(),!Wo.has(n)||e.length!==2)return;let[r,i]=e,a=ms(r),o=ms(i);if(Wr(r)!==Wr(i)&&Ha[n]){this.needsMeasurement=!0;return}if(a!==o)if(Ra(a)&&Ra(o))for(let t=0;t<e.length;t++){let n=e[t];typeof n==`string`&&(e[t]=parseFloat(n))}else Ha[n]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){let{unresolvedKeyframes:e,name:t}=this,n=[];for(let t=0;t<e.length;t++)(e[t]===null||hs(e[t]))&&n.push(t);n.length&&Os(e,n,t)}measureInitialState(){let{element:e,unresolvedKeyframes:t,name:n}=this;if(!e||!e.current)return;n===`height`&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=Ha[n](e.measureViewportBox(),window.getComputedStyle(e.current)),t[0]=this.measuredOrigin;let r=t[t.length-1];r!==void 0&&e.getValue(n,r).jump(r,!1)}measureEndState(){let{element:e,name:t,unresolvedKeyframes:n}=this;if(!e||!e.current)return;let r=e.getValue(t);r&&r.jump(this.measuredOrigin,!1);let i=n.length-1,a=n[i];n[i]=Ha[t](e.measureViewportBox(),window.getComputedStyle(e.current)),a!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=a),this.removedTransforms?.length&&this.removedTransforms.forEach(([t,n])=>{e.getValue(t).set(n)}),this.resolveNoneKeyframes()}};function As(e,t,n){if(e==null)return[];if(e instanceof EventTarget)return[e];if(typeof e==`string`){let r=document;t&&(r=t.current);let i=n?.[e]??r.querySelectorAll(e);return i?Array.from(i):[]}return Array.from(e).filter(e=>e!=null)}var js=(e,t)=>t&&typeof e==`number`?t.transform(e):e;function Ms(e){return Xn(e)&&`offsetHeight`in e&&!(`ownerSVGElement`in e)}var{schedule:Ns,cancel:Ps}=jr(queueMicrotask,!1),Fs={x:!1,y:!1};function Is(){return Fs.x||Fs.y}function Ls(e){return e===`x`||e===`y`?Fs[e]?null:(Fs[e]=!0,()=>{Fs[e]=!1}):Fs.x||Fs.y?null:(Fs.x=Fs.y=!0,()=>{Fs.x=Fs.y=!1})}function Rs(e,t){let n=As(e),r=new AbortController;return[n,{passive:!0,...t,signal:r.signal},()=>r.abort()]}function zs(e){return!(e.pointerType===`touch`||Is())}function Bs(e,t,n={}){let[r,i,a]=Rs(e,n);return r.forEach(e=>{let n=!1,r=!1,a,o=()=>{e.removeEventListener(`pointerleave`,u)},s=e=>{a&&=(a(e),void 0),o()},c=e=>{n=!1,window.removeEventListener(`pointerup`,c),window.removeEventListener(`pointercancel`,c),r&&(r=!1,s(e))},l=()=>{n=!0,window.addEventListener(`pointerup`,c,i),window.addEventListener(`pointercancel`,c,i)},u=e=>{if(e.pointerType!==`touch`){if(n){r=!0;return}s(e)}};e.addEventListener(`pointerenter`,n=>{if(!zs(n))return;r=!1;let o=t(e,n);typeof o==`function`&&(a=o,e.addEventListener(`pointerleave`,u,i))},i),e.addEventListener(`pointerdown`,l,i)}),a}var Vs=(e,t)=>t?e===t?!0:Vs(e,t.parentElement):!1,Hs=e=>e.pointerType===`mouse`?typeof e.button!=`number`||e.button<=0:e.isPrimary!==!1,Us=new Set([`BUTTON`,`INPUT`,`SELECT`,`TEXTAREA`,`A`]);function Ws(e){return Us.has(e.tagName)||e.isContentEditable===!0}var Gs=new Set([`INPUT`,`SELECT`,`TEXTAREA`]);function Ks(e){return Gs.has(e.tagName)||e.isContentEditable===!0}var qs=new WeakSet;function Js(e){return t=>{t.key===`Enter`&&e(t)}}function Ys(e,t){e.dispatchEvent(new PointerEvent(`pointer`+t,{isPrimary:!0,bubbles:!0}))}var Xs=(e,t)=>{let n=e.currentTarget;if(!n)return;let r=Js(()=>{if(qs.has(n))return;Ys(n,`down`);let e=Js(()=>{Ys(n,`up`)});n.addEventListener(`keyup`,e,t),n.addEventListener(`blur`,()=>Ys(n,`cancel`),t)});n.addEventListener(`keydown`,r,t),n.addEventListener(`blur`,()=>n.removeEventListener(`keydown`,r),t)};function Zs(e){return Hs(e)&&!Is()}var Qs=new WeakSet;function $s(e,t,n={}){let[r,i,a]=Rs(e,n),o=e=>{let r=e.currentTarget;if(!Zs(e)||Qs.has(e))return;qs.add(r),n.stopPropagation&&Qs.add(e);let a=t(r,e),o=(e,t)=>{window.removeEventListener(`pointerup`,s),window.removeEventListener(`pointercancel`,c),qs.has(r)&&qs.delete(r),Zs(e)&&typeof a==`function`&&a(e,{success:t})},s=e=>{o(e,r===window||r===document||n.useGlobalTarget||Vs(r,e.target))},c=e=>{o(e,!1)};window.addEventListener(`pointerup`,s,i),window.addEventListener(`pointercancel`,c,i)};return r.forEach(e=>{(n.useGlobalTarget?window:e).addEventListener(`pointerdown`,o,i),Ms(e)&&(e.addEventListener(`focus`,e=>Xs(e,i)),!Ws(e)&&!e.hasAttribute(`tabindex`)&&(e.tabIndex=0))}),a}function ec(e){return Xn(e)&&`ownerSVGElement`in e}var tc=new WeakMap,nc,rc=(e,t,n)=>(r,i)=>i&&i[0]?i[0][e+`Size`]:ec(r)&&`getBBox`in r?r.getBBox()[t]:r[n],ic=rc(`inline`,`width`,`offsetWidth`),ac=rc(`block`,`height`,`offsetHeight`);function oc({target:e,borderBoxSize:t}){tc.get(e)?.forEach(n=>{n(e,{get width(){return ic(e,t)},get height(){return ac(e,t)}})})}function sc(e){e.forEach(oc)}function cc(){typeof ResizeObserver>`u`||(nc=new ResizeObserver(sc))}function lc(e,t){nc||cc();let n=As(e);return n.forEach(e=>{let n=tc.get(e);n||(n=new Set,tc.set(e,n)),n.add(t),nc?.observe(e)}),()=>{n.forEach(e=>{let n=tc.get(e);n?.delete(t),n?.size||nc?.unobserve(e)})}}var uc=new Set,dc;function fc(){dc=()=>{let e={get width(){return window.innerWidth},get height(){return window.innerHeight}};uc.forEach(t=>t(e))},window.addEventListener(`resize`,dc)}function pc(e){return uc.add(e),dc||fc(),()=>{uc.delete(e),!uc.size&&typeof dc==`function`&&(window.removeEventListener(`resize`,dc),dc=void 0)}}function mc(e,t){return typeof e==`function`?pc(e):lc(e,t)}function hc(e){return ec(e)&&e.tagName===`svg`}var gc=[...ps,G,K],_c=e=>gc.find(fs(e)),vc=()=>({translate:0,scale:1,origin:0,originPoint:0}),yc=()=>({x:vc(),y:vc()}),bc=()=>({min:0,max:0}),xc=()=>({x:bc(),y:bc()}),Sc=new WeakMap;function Cc(e){return typeof e==`object`&&!!e&&typeof e.start==`function`}function wc(e){return typeof e==`string`||Array.isArray(e)}var Tc=[`animate`,`whileInView`,`whileFocus`,`whileHover`,`whileTap`,`whileDrag`,`exit`],Ec=[`initial`,...Tc];function Dc(e){return Cc(e.animate)||Ec.some(t=>wc(e[t]))}function Oc(e){return!!(Dc(e)||e.variants)}function kc(e,t,n){for(let r in t){let i=t[r],a=n[r];if(es(i))e.addValue(r,i);else if(es(a))e.addValue(r,Yo(i,{owner:e}));else if(a!==i)if(e.hasValue(r)){let t=e.getValue(r);t.liveStyle===!0?t.jump(i):t.hasAnimated||t.set(i)}else{let t=e.getStaticValue(r);e.addValue(r,Yo(t===void 0?i:t,{owner:e}))}}for(let r in n)t[r]===void 0&&e.removeValue(r);return t}var Ac={current:null},jc={current:!1},Mc=typeof window<`u`;function Nc(){if(jc.current=!0,Mc)if(window.matchMedia){let e=window.matchMedia(`(prefers-reduced-motion)`),t=()=>Ac.current=e.matches;e.addEventListener(`change`,t),t()}else Ac.current=!1}var Pc=[`AnimationStart`,`AnimationComplete`,`Update`,`BeforeLayoutMeasure`,`LayoutMeasure`,`LayoutAnimationStart`,`LayoutAnimationComplete`],Fc={};function Ic(e){Fc=e}function Lc(){return Fc}var Rc=class{scrapeMotionValuesFromProps(e,t,n){return{}}constructor({parent:e,props:t,presenceContext:n,reducedMotionConfig:r,skipAnimations:i,blockInitialAnimation:a,visualState:o},s={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.shouldSkipAnimations=!1,this.values=new Map,this.KeyframeResolver=Xa,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.hasBeenMounted=!1,this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify(`Update`,this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{let e=Lr.now();this.renderScheduledAt<e&&(this.renderScheduledAt=e,U.render(this.render,!1,!0))};let{latestValues:c,renderState:l}=o;this.latestValues=c,this.baseTarget={...c},this.initialValues=t.initial?{...c}:{},this.renderState=l,this.parent=e,this.props=t,this.presenceContext=n,this.depth=e?e.depth+1:0,this.reducedMotionConfig=r,this.skipAnimationsConfig=i,this.options=s,this.blockInitialAnimation=!!a,this.isControllingVariants=Dc(t),this.isVariantNode=Oc(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);let{willChange:u,...d}=this.scrapeMotionValuesFromProps(t,{},this);for(let e in d){let t=d[e];c[e]!==void 0&&es(t)&&t.set(c[e])}}mount(e){if(this.hasBeenMounted)for(let e in this.initialValues)this.values.get(e)?.jump(this.initialValues[e]),this.latestValues[e]=this.initialValues[e];this.current=e,Sc.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((e,t)=>this.bindToMotionValue(t,e)),this.reducedMotionConfig===`never`?this.shouldReduceMotion=!1:this.reducedMotionConfig===`always`?this.shouldReduceMotion=!0:(jc.current||Nc(),this.shouldReduceMotion=Ac.current),this.shouldSkipAnimations=this.skipAnimationsConfig??!1,this.parent?.addChild(this),this.update(this.props,this.presenceContext),this.hasBeenMounted=!0}unmount(){this.projection&&this.projection.unmount(),Mr(this.notifyUpdate),Mr(this.render),this.valueSubscriptions.forEach(e=>e()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(let e in this.events)this.events[e].clear();for(let e in this.features){let t=this.features[e];t&&(t.unmount(),t.isMounted=!1)}this.current=null}addChild(e){this.children.add(e),this.enteringChildren??=new Set,this.enteringChildren.add(e)}removeChild(e){this.children.delete(e),this.enteringChildren&&this.enteringChildren.delete(e)}bindToMotionValue(e,t){if(this.valueSubscriptions.has(e)&&this.valueSubscriptions.get(e)(),t.accelerate&&yo.has(e)&&this.current instanceof HTMLElement){let{factory:n,keyframes:r,times:i,ease:a,duration:o}=t.accelerate,s=new co({element:this.current,name:e,keyframes:r,times:i,ease:a,duration:rr(o)}),c=n(s);this.valueSubscriptions.set(e,()=>{c(),s.cancel()});return}let n=La.has(e);n&&this.onBindTransform&&this.onBindTransform();let r=t.on(`change`,t=>{this.latestValues[e]=t,this.props.onUpdate&&U.preRender(this.notifyUpdate),n&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()}),i;typeof window<`u`&&window.MotionCheckAppearSync&&(i=window.MotionCheckAppearSync(this,e,t)),this.valueSubscriptions.set(e,()=>{r(),i&&i(),t.owner&&t.stop()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}updateFeatures(){let e=`animation`;for(e in Fc){let t=Fc[e];if(!t)continue;let{isEnabled:n,Feature:r}=t;if(!this.features[e]&&r&&n(this.props)&&(this.features[e]=new r(this)),this.features[e]){let t=this.features[e];t.isMounted?t.update():(t.mount(),t.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):xc()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}update(e,t){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let t=0;t<Pc.length;t++){let n=Pc[t];this.propEventSubscriptions[n]&&(this.propEventSubscriptions[n](),delete this.propEventSubscriptions[n]);let r=e[`on`+n];r&&(this.propEventSubscriptions[n]=this.on(n,r))}this.prevMotionValues=kc(this,this.scrapeMotionValuesFromProps(e,this.prevProps||{},this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(e){let t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(e),()=>t.variantChildren.delete(e)}addValue(e,t){let n=this.values.get(e);t!==n&&(n&&this.removeValue(e),this.bindToMotionValue(e,t),this.values.set(e,t),this.latestValues[e]=t.get())}removeValue(e){this.values.delete(e);let t=this.valueSubscriptions.get(e);t&&(t(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){if(this.props.values&&this.props.values[e])return this.props.values[e];let n=this.values.get(e);return n===void 0&&t!==void 0&&(n=Yo(t===null?void 0:t,{owner:this}),this.addValue(e,n)),n}readValue(e,t){let n=this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:this.getBaseTargetFromProps(this.props,e)??this.readValueFromInstance(this.current,e,this.options);return n!=null&&(typeof n==`string`&&(Yn(n)||Zn(n))?n=parseFloat(n):!_c(n)&&K.test(t)&&(n=Es(e,t)),this.setBaseTarget(e,es(n)?n.get():n)),es(n)?n.get():n}setBaseTarget(e,t){this.baseTarget[e]=t}getBaseTarget(e){let{initial:t}=this.props,n;if(typeof t==`string`||typeof t==`object`){let r=Ho(this.props,t,this.presenceContext?.custom);r&&(n=r[e])}if(t&&n!==void 0)return n;let r=this.getBaseTargetFromProps(this.props,e);return r!==void 0&&!es(r)?r:this.initialValues[e]!==void 0&&n===void 0?void 0:this.baseTarget[e]}on(e,t){return this.events[e]||(this.events[e]=new nr),this.events[e].add(t)}notify(e,...t){this.events[e]&&this.events[e].notify(...t)}scheduleRenderMicrotask(){Ns.render(this.render)}},zc=class extends Rc{constructor(){super(...arguments),this.KeyframeResolver=ks}sortInstanceNodePosition(e,t){return e.compareDocumentPosition(t)&2?1:-1}getBaseTargetFromProps(e,t){let n=e.style;return n?n[t]:void 0}removeValueFromRenderState(e,{vars:t,style:n}){delete t[e],delete n[e]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);let{children:e}=this.props;es(e)&&(this.childSubscription=e.on(`change`,e=>{this.current&&(this.current.textContent=`${e}`)}))}},Bc=class{constructor(e){this.isMounted=!1,this.node=e}update(){}};function Vc({top:e,left:t,right:n,bottom:r}){return{x:{min:t,max:n},y:{min:e,max:r}}}function Hc({x:e,y:t}){return{top:t.min,right:e.max,bottom:t.max,left:e.min}}function Uc(e,t){if(!t)return e;let n=t({x:e.left,y:e.top}),r=t({x:e.right,y:e.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}function Wc(e){return e===void 0||e===1}function Gc({scale:e,scaleX:t,scaleY:n}){return!Wc(e)||!Wc(t)||!Wc(n)}function Kc(e){return Gc(e)||qc(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function qc(e){return Jc(e.x)||Jc(e.y)}function Jc(e){return e&&e!==`0%`}function Yc(e,t,n){return n+t*(e-n)}function Xc(e,t,n,r,i){return i!==void 0&&(e=Yc(e,i,r)),Yc(e,n,r)+t}function Zc(e,t=0,n=1,r,i){e.min=Xc(e.min,t,n,r,i),e.max=Xc(e.max,t,n,r,i)}function Qc(e,{x:t,y:n}){Zc(e.x,t.translate,t.scale,t.originPoint),Zc(e.y,n.translate,n.scale,n.originPoint)}var $c=.999999999999,el=1.0000000000001;function tl(e,t,n,r=!1){let i=n.length;if(!i)return;t.x=t.y=1;let a,o;for(let s=0;s<i;s++){a=n[s],o=a.projectionDelta;let{visualElement:i}=a.options;i&&i.props.style&&i.props.style.display===`contents`||(r&&a.options.layoutScroll&&a.scroll&&a!==a.root&&(nl(e.x,-a.scroll.offset.x),nl(e.y,-a.scroll.offset.y)),o&&(t.x*=o.x.scale,t.y*=o.y.scale,Qc(e,o)),r&&Kc(a.latestValues)&&al(e,a.latestValues,a.layout?.layoutBox))}t.x<el&&t.x>$c&&(t.x=1),t.y<el&&t.y>$c&&(t.y=1)}function nl(e,t){e.min+=t,e.max+=t}function rl(e,t,n,r,i=.5){Zc(e,t,n,ki(e.min,e.max,i),r)}function il(e,t){return typeof e==`string`?parseFloat(e)/100*(t.max-t.min):e}function al(e,t,n){let r=n??e;rl(e.x,il(t.x,r.x),t.scaleX,t.scale,t.originX),rl(e.y,il(t.y,r.y),t.scaleY,t.scale,t.originY)}function ol(e,t){return Vc(Uc(e.getBoundingClientRect(),t))}function sl(e,t,n){let r=ol(e,n),{scroll:i}=t;return i&&(nl(r.x,i.offset.x),nl(r.y,i.offset.y)),r}var cl={x:`translateX`,y:`translateY`,z:`translateZ`,transformPerspective:`perspective`},ll=Ia.length;function ul(e,t,n){let r=``,i=!0;for(let a=0;a<ll;a++){let o=Ia[a],s=e[o];if(s===void 0)continue;let c=!0;if(typeof s==`number`)c=s===+!!o.startsWith(`scale`);else{let e=parseFloat(s);c=o.startsWith(`scale`)?e===1:e===0}if(!c||n){let e=js(s,Ss[o]);if(!c){i=!1;let t=cl[o]||o;r+=`${t}(${e}) `}n&&(t[o]=e)}}return r=r.trim(),n?r=n(t,i?``:r):i&&(r=`none`),r}function dl(e,t,n){let{style:r,vars:i,transformOrigin:a}=e,o=!1,s=!1;for(let e in t){let n=t[e];if(La.has(e)){o=!0;continue}else if(Br(e)){i[e]=n;continue}else{let t=js(n,Ss[e]);e.startsWith(`origin`)?(s=!0,a[e]=t):r[e]=t}}if(t.transform||(o||n?r.transform=ul(t,e.transform,n):r.transform&&=`none`),s){let{originX:e=`50%`,originY:t=`50%`,originZ:n=0}=a;r.transformOrigin=`${e} ${t} ${n}`}}function fl(e,{style:t,vars:n},r,i){let a=e.style,o;for(o in t)a[o]=t[o];for(o in i?.applyProjectionStyles(a,r),n)a.setProperty(o,n[o])}function pl(e,t){return t.max===t.min?0:e/(t.max-t.min)*100}var ml={correct:(e,t)=>{if(!t.target)return e;if(typeof e==`string`)if(W.test(e))e=parseFloat(e);else return e;return`${pl(e,t.target.x)}% ${pl(e,t.target.y)}%`}},hl={correct:(e,{treeScale:t,projectionDelta:n})=>{let r=e,i=K.parse(e);if(i.length>5)return r;let a=K.createTransformer(e),o=typeof i[0]==`number`?0:1,s=n.x.scale*t.x,c=n.y.scale*t.y;i[0+o]/=s,i[1+o]/=c;let l=ki(s,c,.5);return typeof i[2+o]==`number`&&(i[2+o]/=l),typeof i[3+o]==`number`&&(i[3+o]/=l),a(i)}},gl={borderRadius:{...ml,applyTo:[`borderTopLeftRadius`,`borderTopRightRadius`,`borderBottomLeftRadius`,`borderBottomRightRadius`]},borderTopLeftRadius:ml,borderTopRightRadius:ml,borderBottomLeftRadius:ml,borderBottomRightRadius:ml,boxShadow:hl};function _l(e,{layout:t,layoutId:n}){return La.has(e)||e.startsWith(`origin`)||(t||n!==void 0)&&(!!gl[e]||e===`opacity`)}function vl(e,t,n){let r=e.style,i=t?.style,a={};if(!r)return a;for(let t in r)(es(r[t])||i&&es(i[t])||_l(t,e)||n?.getValue(t)?.liveStyle!==void 0)&&(a[t]=r[t]);return a}function yl(e){return window.getComputedStyle(e)}var bl=class extends zc{constructor(){super(...arguments),this.type=`html`,this.renderInstance=fl}readValueFromInstance(e,t){if(La.has(t))return this.projection?.isProjecting?Ma(t):Pa(e,t);{let n=yl(e),r=(Br(t)?n.getPropertyValue(t):n[t])||0;return typeof r==`string`?r.trim():r}}measureInstanceViewportBox(e,{transformPagePoint:t}){return ol(e,t)}build(e,t,n){dl(e,t,n.transformTemplate)}scrapeMotionValuesFromProps(e,t,n){return vl(e,t,n)}},xl={offset:`stroke-dashoffset`,array:`stroke-dasharray`},Sl={offset:`strokeDashoffset`,array:`strokeDasharray`};function Cl(e,t,n=1,r=0,i=!0){e.pathLength=1;let a=i?xl:Sl;e[a.offset]=`${-r}`,e[a.array]=`${t} ${n}`}var wl=[`offsetDistance`,`offsetPath`,`offsetRotate`,`offsetAnchor`];function Tl(e,{attrX:t,attrY:n,attrScale:r,pathLength:i,pathSpacing:a=1,pathOffset:o=0,...s},c,l,u){if(dl(e,s,l),c){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};let{attrs:d,style:f}=e;d.transform&&(f.transform=d.transform,delete d.transform),(f.transform||d.transformOrigin)&&(f.transformOrigin=d.transformOrigin??`50% 50%`,delete d.transformOrigin),f.transform&&(f.transformBox=u?.transformBox??`fill-box`,delete d.transformBox);for(let e of wl)d[e]!==void 0&&(f[e]=d[e],delete d[e]);t!==void 0&&(d.x=t),n!==void 0&&(d.y=n),r!==void 0&&(d.scale=r),i!==void 0&&Cl(d,i,a,o,!1)}var El=new Set([`baseFrequency`,`diffuseConstant`,`kernelMatrix`,`kernelUnitLength`,`keySplines`,`keyTimes`,`limitingConeAngle`,`markerHeight`,`markerWidth`,`numOctaves`,`targetX`,`targetY`,`surfaceScale`,`specularConstant`,`specularExponent`,`stdDeviation`,`tableValues`,`viewBox`,`gradientTransform`,`pathLength`,`startOffset`,`textLength`,`lengthAdjust`]),Dl=e=>typeof e==`string`&&e.toLowerCase()===`svg`;function Ol(e,t,n,r){fl(e,t,void 0,r);for(let n in t.attrs)e.setAttribute(El.has(n)?n:rs(n),t.attrs[n])}function kl(e,t,n){let r=vl(e,t,n);for(let n in e)if(es(e[n])||es(t[n])){let t=Ia.indexOf(n)===-1?n:`attr`+n.charAt(0).toUpperCase()+n.substring(1);r[t]=e[n]}return r}var Al=class extends zc{constructor(){super(...arguments),this.type=`svg`,this.isSVGTag=!1,this.measureInstanceViewportBox=xc}getBaseTargetFromProps(e,t){return e[t]}readValueFromInstance(e,t){if(La.has(t)){let e=ws(t);return e&&e.default||0}return t=El.has(t)?t:rs(t),e.getAttribute(t)}scrapeMotionValuesFromProps(e,t,n){return kl(e,t,n)}build(e,t,n){Tl(e,t,this.isSVGTag,n.transformTemplate,n.style)}renderInstance(e,t,n,r){Ol(e,t,n,r)}mount(e){this.isSVGTag=Dl(e.tagName),super.mount(e)}},jl=Ec.length;function Ml(e){if(!e)return;if(!e.isControllingVariants){let t=e.parent&&Ml(e.parent)||{};return e.props.initial!==void 0&&(t.initial=e.props.initial),t}let t={};for(let n=0;n<jl;n++){let r=Ec[n],i=e.props[r];(wc(i)||i===!1)&&(t[r]=i)}return t}function Nl(e,t){if(!Array.isArray(t))return!1;let n=t.length;if(n!==e.length)return!1;for(let r=0;r<n;r++)if(t[r]!==e[r])return!1;return!0}var Pl=[...Tc].reverse(),Fl=Tc.length;function Il(e){return t=>Promise.all(t.map(({animation:t,options:n})=>us(e,t,n)))}function Ll(e){let t=Il(e),n=Rl(),r=!0,i=!1,a=t=>(n,r)=>{let i=Uo(e,r,t===`exit`?e.presenceContext?.custom:void 0);if(i){let{transition:e,transitionEnd:t,...r}=i;n={...n,...r,...t}}return n};function o(n){t=n(e)}function s(o){let{props:s}=e,c=Ml(e.parent)||{},l=[],u=new Set,d={},f=1/0;for(let t=0;t<Fl;t++){let p=Pl[t],m=n[p],h=s[p]===void 0?c[p]:s[p],g=wc(h),_=p===o?m.isActive:null;_===!1&&(f=t);let v=h===c[p]&&h!==s[p]&&g;if(v&&(r||i)&&e.manuallyAnimateOnMount&&(v=!1),m.protectedKeys={...d},!m.isActive&&_===null||!h&&!m.prevProp||Cc(h)||typeof h==`boolean`)continue;if(p===`exit`&&m.isActive&&_!==!0){m.prevResolvedValues&&(d={...d,...m.prevResolvedValues});continue}let y=Y(m.prevProp,h),b=y||p===o&&m.isActive&&!v&&g||t>f&&g,x=!1,S=Array.isArray(h)?h:[h],C=S.reduce(a(p),{});_===!1&&(C={});let{prevResolvedValues:w={}}=m,T={...w,...C},E=t=>{b=!0,u.has(t)&&(x=!0,u.delete(t)),m.needsAnimating[t]=!0;let n=e.getValue(t);n&&(n.liveStyle=!1)};for(let e in T){let t=C[e],n=w[e];if(d.hasOwnProperty(e))continue;let r=!1;r=Xo(t)&&Xo(n)?!Nl(t,n):t!==n,r?t==null?u.add(e):E(e):t!==void 0&&u.has(e)?E(e):m.protectedKeys[e]=!0}m.prevProp=h,m.prevResolvedValues=C,m.isActive&&(d={...d,...C}),(r||i)&&e.blockInitialAnimation&&(b=!1);let ee=v&&y;b&&(!ee||x)&&l.push(...S.map(t=>{let n={type:p};if(typeof t==`string`&&(r||i)&&!ee&&e.manuallyAnimateOnMount&&e.parent){let{parent:r}=e,i=Uo(r,t);if(r.enteringChildren&&i){let{delayChildren:t}=i.transition||{};n.delay=Do(r.enteringChildren,e,t)}}return{animation:t,options:n}}))}if(u.size){let t={};if(typeof s.initial!=`boolean`){let n=Uo(e,Array.isArray(s.initial)?s.initial[0]:s.initial);n&&n.transition&&(t.transition=n.transition)}u.forEach(n=>{let r=e.getBaseTarget(n),i=e.getValue(n);i&&(i.liveStyle=!0),t[n]=r??null}),l.push({animation:t})}let p=!!l.length;return r&&(s.initial===!1||s.initial===s.animate)&&!e.manuallyAnimateOnMount&&(p=!1),r=!1,i=!1,p?t(l):Promise.resolve()}function c(t,r){if(n[t].isActive===r)return Promise.resolve();e.variantChildren?.forEach(e=>e.animationState?.setActive(t,r)),n[t].isActive=r;let i=s(t);for(let e in n)n[e].protectedKeys={};return i}return{animateChanges:s,setActive:c,setAnimateFunction:o,getState:()=>n,reset:()=>{n=Rl(),i=!0}}}function Y(e,t){return typeof t==`string`?t!==e:Array.isArray(t)?!Nl(t,e):!1}function X(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function Rl(){return{animate:X(!0),whileInView:X(),whileHover:X(),whileTap:X(),whileDrag:X(),whileFocus:X(),exit:X()}}function zl(e,t){e.min=t.min,e.max=t.max}function Bl(e,t){zl(e.x,t.x),zl(e.y,t.y)}function Vl(e,t){e.translate=t.translate,e.scale=t.scale,e.originPoint=t.originPoint,e.origin=t.origin}var Hl=1e-4,Ul=1-Hl,Wl=1+Hl,Gl=.01,Kl=0-Gl,ql=0+Gl;function Jl(e){return e.max-e.min}function Yl(e,t,n){return Math.abs(e-t)<=n}function Xl(e,t,n,r=.5){e.origin=r,e.originPoint=ki(t.min,t.max,e.origin),e.scale=Jl(n)/Jl(t),e.translate=ki(n.min,n.max,e.origin)-e.originPoint,(e.scale>=Ul&&e.scale<=Wl||isNaN(e.scale))&&(e.scale=1),(e.translate>=Kl&&e.translate<=ql||isNaN(e.translate))&&(e.translate=0)}function Zl(e,t,n,r){Xl(e.x,t.x,n.x,r?r.originX:void 0),Xl(e.y,t.y,n.y,r?r.originY:void 0)}function Ql(e,t,n,r=0){e.min=(r?ki(n.min,n.max,r):n.min)+t.min,e.max=e.min+Jl(t)}function $l(e,t,n,r){Ql(e.x,t.x,n.x,r?.x),Ql(e.y,t.y,n.y,r?.y)}function eu(e,t,n,r=0){let i=r?ki(n.min,n.max,r):n.min;e.min=t.min-i,e.max=e.min+Jl(t)}function tu(e,t,n,r){eu(e.x,t.x,n.x,r?.x),eu(e.y,t.y,n.y,r?.y)}function nu(e,t,n,r,i){return e-=t,e=Yc(e,1/n,r),i!==void 0&&(e=Yc(e,1/i,r)),e}function ru(e,t=0,n=1,r=.5,i,a=e,o=e){if(si.test(t)&&(t=parseFloat(t),t=ki(o.min,o.max,t/100)-o.min),typeof t!=`number`)return;let s=ki(a.min,a.max,r);e===a&&(s-=t),e.min=nu(e.min,t,n,s,i),e.max=nu(e.max,t,n,s,i)}function iu(e,t,[n,r,i],a,o){ru(e,t[n],t[r],t[i],t.scale,a,o)}var au=[`x`,`scaleX`,`originX`],ou=[`y`,`scaleY`,`originY`];function su(e,t,n,r){iu(e.x,t,au,n?n.x:void 0,r?r.x:void 0),iu(e.y,t,ou,n?n.y:void 0,r?r.y:void 0)}function cu(e){return e.translate===0&&e.scale===1}function lu(e){return cu(e.x)&&cu(e.y)}function uu(e,t){return e.min===t.min&&e.max===t.max}function du(e,t){return uu(e.x,t.x)&&uu(e.y,t.y)}function fu(e,t){return Math.round(e.min)===Math.round(t.min)&&Math.round(e.max)===Math.round(t.max)}function pu(e,t){return fu(e.x,t.x)&&fu(e.y,t.y)}function mu(e){return Jl(e.x)/Jl(e.y)}function hu(e,t){return e.translate===t.translate&&e.scale===t.scale&&e.originPoint===t.originPoint}function gu(e){return[e(`x`),e(`y`)]}function _u(e,t,n){let r=``,i=e.x.translate/t.x,a=e.y.translate/t.y,o=n?.z||0;if((i||a||o)&&(r=`translate3d(${i}px, ${a}px, ${o}px) `),(t.x!==1||t.y!==1)&&(r+=`scale(${1/t.x}, ${1/t.y}) `),n){let{transformPerspective:e,rotate:t,rotateX:i,rotateY:a,skewX:o,skewY:s}=n;e&&(r=`perspective(${e}px) ${r}`),t&&(r+=`rotate(${t}deg) `),i&&(r+=`rotateX(${i}deg) `),a&&(r+=`rotateY(${a}deg) `),o&&(r+=`skewX(${o}deg) `),s&&(r+=`skewY(${s}deg) `)}let s=e.x.scale*t.x,c=e.y.scale*t.y;return(s!==1||c!==1)&&(r+=`scale(${s}, ${c})`),r||`none`}var vu=[`borderTopLeftRadius`,`borderTopRightRadius`,`borderBottomLeftRadius`,`borderBottomRightRadius`],yu=vu.length,bu=e=>typeof e==`string`?parseFloat(e):e,xu=e=>typeof e==`number`||W.test(e);function Su(e,t,n,r,i,a){i?(e.opacity=ki(0,n.opacity??1,wu(r)),e.opacityExit=ki(t.opacity??1,0,Tu(r))):a&&(e.opacity=ki(t.opacity??1,n.opacity??1,r));for(let i=0;i<yu;i++){let a=vu[i],o=Cu(t,a),s=Cu(n,a);o===void 0&&s===void 0||(o||=0,s||=0,o===0||s===0||xu(o)===xu(s)?(e[a]=Math.max(ki(bu(o),bu(s),r),0),(si.test(s)||si.test(o))&&(e[a]+=`%`)):e[a]=s)}(t.rotate||n.rotate)&&(e.rotate=ki(t.rotate||0,n.rotate||0,r))}function Cu(e,t){return e[t]===void 0?e.borderRadius:e[t]}var wu=Eu(0,.5,vr),Tu=Eu(.5,.95,V);function Eu(e,t,n){return r=>r<e?0:r>t?1:n(tr(e,t,r))}function Du(e,t,n){let r=es(e)?e:Yo(e);return r.start(Bo(``,r,t,n)),r.animation}function Ou(e,t,n,r={passive:!0}){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n)}var ku=(e,t)=>e.depth-t.depth,Au=class{constructor(){this.children=[],this.isDirty=!1}add(e){Gn(this.children,e),this.isDirty=!0}remove(e){Kn(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(ku),this.isDirty=!1,this.children.forEach(e)}};function ju(e,t){let n=Lr.now(),r=({timestamp:i})=>{let a=i-n;a>=t&&(Mr(r),e(a-t))};return U.setup(r,!0),()=>Mr(r)}function Mu(e){return es(e)?e.get():e}var Nu=class{constructor(){this.members=[]}add(e){Gn(this.members,e);for(let t=this.members.length-1;t>=0;t--){let n=this.members[t];if(n===e||n===this.lead||n===this.prevLead)continue;let r=n.instance;(!r||r.isConnected===!1)&&!n.snapshot&&(Kn(this.members,n),n.unmount())}e.scheduleRender()}remove(e){if(Kn(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){let e=this.members[this.members.length-1];e&&this.promote(e)}}relegate(e){for(let t=this.members.indexOf(e)-1;t>=0;t--){let e=this.members[t];if(e.isPresent!==!1&&e.instance?.isConnected!==!1)return this.promote(e),!0}return!1}promote(e,t){let n=this.lead;if(e!==n&&(this.prevLead=n,this.lead=e,e.show(),n)){n.updateSnapshot(),e.scheduleRender();let{layoutDependency:r}=n.options,{layoutDependency:i}=e.options;(r===void 0||r!==i)&&(e.resumeFrom=n,t&&(n.preserveOpacity=!0),n.snapshot&&(e.snapshot=n.snapshot,e.snapshot.latestValues=n.animationValues||n.latestValues),e.root?.isUpdating&&(e.isLayoutDirty=!0)),e.options.crossfade===!1&&n.hide()}}exitAnimationComplete(){this.members.forEach(e=>{e.options.onExitComplete?.(),e.resumingFrom?.options.onExitComplete?.()})}scheduleRender(){this.members.forEach(e=>e.instance&&e.scheduleRender(!1))}removeLeadSnapshot(){this.lead?.snapshot&&(this.lead.snapshot=void 0)}},Pu={hasAnimatedSinceResize:!0,hasEverUpdated:!1},Fu={nodes:0,calculatedTargetDeltas:0,calculatedProjections:0},Iu=[``,`X`,`Y`,`Z`],Lu=1e3,Ru=0;function zu(e,t,n,r){let{latestValues:i}=t;i[e]&&(n[e]=i[e],t.setStaticValue(e,0),r&&(r[e]=0))}function Bu(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;let{visualElement:t}=e.options;if(!t)return;let n=as(t);if(window.MotionHasOptimisedAnimation(n,`transform`)){let{layout:t,layoutId:r}=e.options;window.MotionCancelOptimisedAnimation(n,`transform`,U,!(t||r))}let{parent:r}=e;r&&!r.hasCheckedOptimisedAppear&&Bu(r)}function Vu({attachResizeListener:e,defaultParent:t,measureScroll:n,checkIsScrollRoot:r,resetTransform:i}){return class{constructor(e={},n=t?.()){this.id=Ru++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.layoutVersion=0,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,Or.value&&(Fu.nodes=Fu.calculatedTargetDeltas=Fu.calculatedProjections=0),this.nodes.forEach(Wu),this.nodes.forEach($u),this.nodes.forEach(ed),this.nodes.forEach(Gu),Or.addProjectionMetrics&&Or.addProjectionMetrics(Fu)},this.resolvedRelativeTargetAt=0,this.linkedParentVersion=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=e,this.root=n?n.root||n:this,this.path=n?[...n.path,n]:[],this.parent=n,this.depth=n?n.depth+1:0;for(let e=0;e<this.path.length;e++)this.path[e].shouldResetTransform=!0;this.root===this&&(this.nodes=new Au)}addEventListener(e,t){return this.eventHandlers.has(e)||this.eventHandlers.set(e,new nr),this.eventHandlers.get(e).add(t)}notifyListeners(e,...t){let n=this.eventHandlers.get(e);n&&n.notify(...t)}hasListeners(e){return this.eventHandlers.has(e)}mount(t){if(this.instance)return;this.isSVG=ec(t)&&!hc(t),this.instance=t;let{layoutId:n,layout:r,visualElement:i}=this.options;if(i&&!i.current&&i.mount(t),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(r||n)&&(this.isLayoutDirty=!0),e){let n,r=0,i=()=>this.root.updateBlockedByResize=!1;U.read(()=>{r=window.innerWidth}),e(t,()=>{let e=window.innerWidth;e!==r&&(r=e,this.root.updateBlockedByResize=!0,n&&n(),n=ju(i,250),Pu.hasAnimatedSinceResize&&(Pu.hasAnimatedSinceResize=!1,this.nodes.forEach(Qu)))})}n&&this.root.registerSharedNode(n,this),this.options.animate!==!1&&i&&(n||r)&&this.addEventListener(`didUpdate`,({delta:e,hasLayoutChanged:t,hasRelativeLayoutChanged:n,layout:r})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}let a=this.options.transition||i.getDefaultTransition()||sd,{onLayoutAnimationStart:o,onLayoutAnimationComplete:s}=i.getProps(),c=!this.targetLayout||!pu(this.targetLayout,r),l=!t&&n;if(this.options.layoutRoot||this.resumeFrom||l||t&&(c||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);let t={...Lo(a,`layout`),onPlay:o,onComplete:s};(i.shouldReduceMotion||this.options.layoutRoot)&&(t.delay=0,t.type=!1),this.startAnimation(t),this.setAnimationOrigin(e,l)}else t||Qu(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=r})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);let e=this.getStack();e&&e.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Mr(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(td),this.animationId++)}getTransformTemplate(){let{visualElement:e}=this.options;return e&&e.getProps().transformTemplate}willUpdate(e=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&Bu(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let e=0;e<this.path.length;e++){let t=this.path[e];t.shouldResetTransform=!0,(typeof t.latestValues.x==`string`||typeof t.latestValues.y==`string`)&&(t.isLayoutDirty=!0),t.updateScroll(`snapshot`),t.options.layoutRoot&&t.willUpdate(!1)}let{layoutId:t,layout:n}=this.options;if(t===void 0&&!n)return;let r=this.getTransformTemplate();this.prevTransformTemplateValue=r?r(this.latestValues,``):void 0,this.updateSnapshot(),e&&this.notifyListeners(`willUpdate`)}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){let e=this.updateBlockedByResize;this.unblockUpdate(),this.updateBlockedByResize=!1,this.clearAllSnapshots(),e&&this.nodes.forEach(Ju),this.nodes.forEach(qu);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(Yu);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(Xu),this.nodes.forEach(Zu),this.nodes.forEach(Hu),this.nodes.forEach(Uu)):this.nodes.forEach(Yu),this.clearAllSnapshots();let e=Lr.now();Nr.delta=qn(0,1e3/60,e-Nr.timestamp),Nr.timestamp=e,Nr.isProcessing=!0,Pr.update.process(Nr),Pr.preRender.process(Nr),Pr.render.process(Nr),Nr.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,Ns.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(Ku),this.sharedNodes.forEach(nd)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,U.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){U.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!Jl(this.snapshot.measuredBox.x)&&!Jl(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let e=0;e<this.path.length;e++)this.path[e].updateScroll();let e=this.layout;this.layout=this.measure(!1),this.layoutVersion++,this.layoutCorrected||=xc(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners(`measure`,this.layout.layoutBox);let{visualElement:t}=this.options;t&&t.notify(`LayoutMeasure`,this.layout.layoutBox,e?e.layoutBox:void 0)}updateScroll(e=`measure`){let t=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===e&&(t=!1),t&&this.instance){let t=r(this.instance);this.scroll={animationId:this.root.animationId,phase:e,isRoot:t,offset:n(this.instance),wasRoot:this.scroll?this.scroll.isRoot:t}}}resetTransform(){if(!i)return;let e=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,t=this.projectionDelta&&!lu(this.projectionDelta),n=this.getTransformTemplate(),r=n?n(this.latestValues,``):void 0,a=r!==this.prevTransformTemplateValue;e&&this.instance&&(t||Kc(this.latestValues)||a)&&(i(this.instance,r),this.shouldResetTransform=!1,this.scheduleRender())}measure(e=!0){let t=this.measurePageBox(),n=this.removeElementScroll(t);return e&&(n=this.removeTransform(n)),dd(n),{animationId:this.root.animationId,measuredBox:t,layoutBox:n,latestValues:{},source:this.id}}measurePageBox(){let{visualElement:e}=this.options;if(!e)return xc();let t=e.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(pd))){let{scroll:e}=this.root;e&&(nl(t.x,e.offset.x),nl(t.y,e.offset.y))}return t}removeElementScroll(e){let t=xc();if(Bl(t,e),this.scroll?.wasRoot)return t;for(let n=0;n<this.path.length;n++){let r=this.path[n],{scroll:i,options:a}=r;r!==this.root&&i&&a.layoutScroll&&(i.wasRoot&&Bl(t,e),nl(t.x,i.offset.x),nl(t.y,i.offset.y))}return t}applyTransform(e,t=!1,n){let r=n||xc();Bl(r,e);for(let e=0;e<this.path.length;e++){let n=this.path[e];!t&&n.options.layoutScroll&&n.scroll&&n!==n.root&&(nl(r.x,-n.scroll.offset.x),nl(r.y,-n.scroll.offset.y)),Kc(n.latestValues)&&al(r,n.latestValues,n.layout?.layoutBox)}return Kc(this.latestValues)&&al(r,this.latestValues,this.layout?.layoutBox),r}removeTransform(e){let t=xc();Bl(t,e);for(let e=0;e<this.path.length;e++){let n=this.path[e];if(!Kc(n.latestValues))continue;let r;n.instance&&(Gc(n.latestValues)&&n.updateSnapshot(),r=xc(),Bl(r,n.measurePageBox())),su(t,n.latestValues,n.snapshot?.layoutBox,r)}return Kc(this.latestValues)&&su(t,this.latestValues),t}setTargetDelta(e){this.targetDelta=e,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(e){this.options={...this.options,...e,crossfade:e.crossfade===void 0?!0:e.crossfade}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Nr.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(e=!1){let t=this.getLead();this.isProjectionDirty||=t.isProjectionDirty,this.isTransformDirty||=t.isTransformDirty,this.isSharedProjectionDirty||=t.isSharedProjectionDirty;let n=!!this.resumingFrom||this!==t;if(!(e||n&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;let{layout:r,layoutId:i}=this.options;if(!this.layout||!(r||i))return;this.resolvedRelativeTargetAt=Nr.timestamp;let a=this.getClosestProjectingParent();a&&this.linkedParentVersion!==a.layoutVersion&&!a.options.layoutRoot&&this.removeRelativeTarget(),!this.targetDelta&&!this.relativeTarget&&(this.options.layoutAnchor!==!1&&a&&a.layout?this.createRelativeTarget(a,this.layout.layoutBox,a.layout.layoutBox):this.removeRelativeTarget()),!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=xc(),this.targetWithTransforms=xc()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),$l(this.target,this.relativeTarget,this.relativeParent.target,this.options.layoutAnchor||void 0)):this.targetDelta?(this.resumingFrom?this.applyTransform(this.layout.layoutBox,!1,this.target):Bl(this.target,this.layout.layoutBox),Qc(this.target,this.targetDelta)):Bl(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget&&(this.attemptToResolveRelativeTarget=!1,this.options.layoutAnchor!==!1&&a&&!!a.resumingFrom==!!this.resumingFrom&&!a.options.layoutScroll&&a.target&&this.animationProgress!==1?this.createRelativeTarget(a,this.target,a.target):this.relativeParent=this.relativeTarget=void 0),Or.value&&Fu.calculatedTargetDeltas++)}getClosestProjectingParent(){if(!(!this.parent||Gc(this.parent.latestValues)||qc(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}createRelativeTarget(e,t,n){this.relativeParent=e,this.linkedParentVersion=e.layoutVersion,this.forceRelativeParentToResolveTarget(),this.relativeTarget=xc(),this.relativeTargetOrigin=xc(),tu(this.relativeTargetOrigin,t,n,this.options.layoutAnchor||void 0),Bl(this.relativeTarget,this.relativeTargetOrigin)}removeRelativeTarget(){this.relativeParent=this.relativeTarget=void 0}calcProjection(){let e=this.getLead(),t=!!this.resumingFrom||this!==e,n=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(n=!1),t&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(n=!1),this.resolvedRelativeTargetAt===Nr.timestamp&&(n=!1),n)return;let{layout:r,layoutId:i}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(r||i))return;Bl(this.layoutCorrected,this.layout.layoutBox);let a=this.treeScale.x,o=this.treeScale.y;tl(this.layoutCorrected,this.treeScale,this.path,t),e.layout&&!e.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(e.target=e.layout.layoutBox,e.targetWithTransforms=xc());let{target:s}=e;if(!s){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Vl(this.prevProjectionDelta.x,this.projectionDelta.x),Vl(this.prevProjectionDelta.y,this.projectionDelta.y)),Zl(this.projectionDelta,this.layoutCorrected,s,this.latestValues),(this.treeScale.x!==a||this.treeScale.y!==o||!hu(this.projectionDelta.x,this.prevProjectionDelta.x)||!hu(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners(`projectionUpdate`,s)),Or.value&&Fu.calculatedProjections++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(e=!0){if(this.options.visualElement?.scheduleRender(),e){let e=this.getStack();e&&e.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=yc(),this.projectionDelta=yc(),this.projectionDeltaWithTransform=yc()}setAnimationOrigin(e,t=!1){let n=this.snapshot,r=n?n.latestValues:{},i={...this.latestValues},a=yc();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!t;let o=xc(),s=(n?n.source:void 0)!==(this.layout?this.layout.source:void 0),c=this.getStack(),l=!c||c.members.length<=1,u=!!(s&&!l&&this.options.crossfade===!0&&!this.path.some(od));this.animationProgress=0;let d;this.mixTargetDelta=t=>{let n=t/1e3;rd(a.x,e.x,n),rd(a.y,e.y,n),this.setTargetDelta(a),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(tu(o,this.layout.layoutBox,this.relativeParent.layout.layoutBox,this.options.layoutAnchor||void 0),ad(this.relativeTarget,this.relativeTargetOrigin,o,n),d&&du(this.relativeTarget,d)&&(this.isProjectionDirty=!1),d||=xc(),Bl(d,this.relativeTarget)),s&&(this.animationValues=i,Su(i,r,this.latestValues,n,u,l)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=n},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(e){this.notifyListeners(`animationStart`),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&=(Mr(this.pendingAnimation),void 0),this.pendingAnimation=U.update(()=>{Pu.hasAnimatedSinceResize=!0,Rr.layout++,this.motionValue||=Yo(0),this.motionValue.jump(0,!1),this.currentAnimation=Du(this.motionValue,[0,1e3],{...e,velocity:0,isSync:!0,onUpdate:t=>{this.mixTargetDelta(t),e.onUpdate&&e.onUpdate(t)},onStop:()=>{Rr.layout--},onComplete:()=>{Rr.layout--,e.onComplete&&e.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);let e=this.getStack();e&&e.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners(`animationComplete`)}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Lu),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){let e=this.getLead(),{targetWithTransforms:t,target:n,layout:r,latestValues:i}=e;if(!(!t||!n||!r)){if(this!==e&&this.layout&&r&&fd(this.options.animationType,this.layout.layoutBox,r.layoutBox)){n=this.target||xc();let t=Jl(this.layout.layoutBox.x);n.x.min=e.target.x.min,n.x.max=n.x.min+t;let r=Jl(this.layout.layoutBox.y);n.y.min=e.target.y.min,n.y.max=n.y.min+r}Bl(t,n),al(t,i),Zl(this.projectionDeltaWithTransform,this.layoutCorrected,t,i)}}registerSharedNode(e,t){this.sharedNodes.has(e)||this.sharedNodes.set(e,new Nu),this.sharedNodes.get(e).add(t);let n=t.options.initialPromotionConfig;t.promote({transition:n?n.transition:void 0,preserveFollowOpacity:n&&n.shouldPreserveFollowOpacity?n.shouldPreserveFollowOpacity(t):void 0})}isLead(){let e=this.getStack();return e?e.lead===this:!0}getLead(){let{layoutId:e}=this.options;return e&&this.getStack()?.lead||this}getPrevLead(){let{layoutId:e}=this.options;return e?this.getStack()?.prevLead:void 0}getStack(){let{layoutId:e}=this.options;if(e)return this.root.sharedNodes.get(e)}promote({needsReset:e,transition:t,preserveFollowOpacity:n}={}){let r=this.getStack();r&&r.promote(this,n),e&&(this.projectionDelta=void 0,this.needsReset=!0),t&&this.setOptions({transition:t})}relegate(){let e=this.getStack();return e?e.relegate(this):!1}resetSkewAndRotation(){let{visualElement:e}=this.options;if(!e)return;let t=!1,{latestValues:n}=e;if((n.z||n.rotate||n.rotateX||n.rotateY||n.rotateZ||n.skewX||n.skewY)&&(t=!0),!t)return;let r={};n.z&&zu(`z`,e,r,this.animationValues);for(let t=0;t<Iu.length;t++)zu(`rotate${Iu[t]}`,e,r,this.animationValues),zu(`skew${Iu[t]}`,e,r,this.animationValues);e.render();for(let t in r)e.setStaticValue(t,r[t]),this.animationValues&&(this.animationValues[t]=r[t]);e.scheduleRender()}applyProjectionStyles(e,t){if(!this.instance||this.isSVG)return;if(!this.isVisible){e.visibility=`hidden`;return}let n=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,e.visibility=``,e.opacity=``,e.pointerEvents=Mu(t?.pointerEvents)||``,e.transform=n?n(this.latestValues,``):`none`;return}let r=this.getLead();if(!this.projectionDelta||!this.layout||!r.target){this.options.layoutId&&(e.opacity=this.latestValues.opacity===void 0?1:this.latestValues.opacity,e.pointerEvents=Mu(t?.pointerEvents)||``),this.hasProjected&&!Kc(this.latestValues)&&(e.transform=n?n({},``):`none`,this.hasProjected=!1);return}e.visibility=``;let i=r.animationValues||r.latestValues;this.applyTransformsToTarget();let a=_u(this.projectionDeltaWithTransform,this.treeScale,i);n&&(a=n(i,a)),e.transform=a;let{x:o,y:s}=this.projectionDelta;e.transformOrigin=`${o.origin*100}% ${s.origin*100}% 0`,r.animationValues?e.opacity=r===this?i.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:i.opacityExit:e.opacity=r===this?i.opacity===void 0?``:i.opacity:i.opacityExit===void 0?0:i.opacityExit;for(let t in gl){if(i[t]===void 0)continue;let{correct:n,applyTo:o,isCSSVariable:s}=gl[t],c=a===`none`?i[t]:n(i[t],r);if(o){let t=o.length;for(let n=0;n<t;n++)e[o[n]]=c}else s?this.options.visualElement.renderState.vars[t]=c:e[t]=c}this.options.layoutId&&(e.pointerEvents=r===this?Mu(t?.pointerEvents)||``:`none`)}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(e=>e.currentAnimation?.stop()),this.root.nodes.forEach(qu),this.root.sharedNodes.clear()}}}function Hu(e){e.updateLayout()}function Uu(e){let t=e.resumeFrom?.snapshot||e.snapshot;if(e.isLead()&&e.layout&&t&&e.hasListeners(`didUpdate`)){let{layoutBox:n,measuredBox:r}=e.layout,{animationType:i}=e.options,a=t.source!==e.layout.source;if(i===`size`)gu(e=>{let r=a?t.measuredBox[e]:t.layoutBox[e],i=Jl(r);r.min=n[e].min,r.max=r.min+i});else if(i===`x`||i===`y`){let e=i===`x`?`y`:`x`;zl(a?t.measuredBox[e]:t.layoutBox[e],n[e])}else fd(i,t.layoutBox,n)&&gu(r=>{let i=a?t.measuredBox[r]:t.layoutBox[r],o=Jl(n[r]);i.max=i.min+o,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[r].max=e.relativeTarget[r].min+o)});let o=yc();Zl(o,n,t.layoutBox);let s=yc();a?Zl(s,e.applyTransform(r,!0),t.measuredBox):Zl(s,n,t.layoutBox);let c=!lu(o),l=!1;if(!e.resumeFrom){let r=e.getClosestProjectingParent();if(r&&!r.resumeFrom){let{snapshot:i,layout:a}=r;if(i&&a){let o=e.options.layoutAnchor||void 0,s=xc();tu(s,t.layoutBox,i.layoutBox,o);let c=xc();tu(c,n,a.layoutBox,o),pu(s,c)||(l=!0),r.options.layoutRoot&&(e.relativeTarget=c,e.relativeTargetOrigin=s,e.relativeParent=r)}}}e.notifyListeners(`didUpdate`,{layout:n,snapshot:t,delta:s,layoutDelta:o,hasLayoutChanged:c,hasRelativeLayoutChanged:l})}else if(e.isLead()){let{onExitComplete:t}=e.options;t&&t()}e.options.transition=void 0}function Wu(e){Or.value&&Fu.nodes++,e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty),e.isTransformDirty||=e.parent.isTransformDirty)}function Gu(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function Ku(e){e.clearSnapshot()}function qu(e){e.clearMeasurements()}function Ju(e){e.isLayoutDirty=!0,e.updateLayout()}function Yu(e){e.isLayoutDirty=!1}function Xu(e){e.isAnimationBlocked&&e.layout&&!e.isLayoutDirty&&(e.snapshot=e.layout,e.isLayoutDirty=!0)}function Zu(e){let{visualElement:t}=e.options;t&&t.getProps().onBeforeLayoutMeasure&&t.notify(`BeforeLayoutMeasure`),e.resetTransform()}function Qu(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function $u(e){e.resolveTargetDelta()}function ed(e){e.calcProjection()}function td(e){e.resetSkewAndRotation()}function nd(e){e.removeLeadSnapshot()}function rd(e,t,n){e.translate=ki(t.translate,0,n),e.scale=ki(t.scale,1,n),e.origin=t.origin,e.originPoint=t.originPoint}function id(e,t,n,r){e.min=ki(t.min,n.min,r),e.max=ki(t.max,n.max,r)}function ad(e,t,n,r){id(e.x,t.x,n.x,r),id(e.y,t.y,n.y,r)}function od(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}var sd={duration:.45,ease:[.4,0,.1,1]},cd=e=>typeof navigator<`u`&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),ld=cd(`applewebkit/`)&&!cd(`chrome/`)?Math.round:V;function ud(e){e.min=ld(e.min),e.max=ld(e.max)}function dd(e){ud(e.x),ud(e.y)}function fd(e,t,n){return e===`position`||e===`preserve-aspect`&&!Yl(mu(t),mu(n),.2)}function pd(e){return e!==e.root&&e.scroll?.wasRoot}var md=Vu({attachResizeListener:(e,t)=>Ou(e,`resize`,t),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body?.scrollLeft||0,y:document.documentElement.scrollTop||document.body?.scrollTop||0}),checkIsScrollRoot:()=>!0}),hd={current:void 0},gd=Vu({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!hd.current){let e=new md({});e.mount(window),e.setOptions({layoutScroll:!0}),hd.current=e}return hd.current},resetTransform:(e,t)=>{e.style.transform=t===void 0?`none`:t},checkIsScrollRoot:e=>window.getComputedStyle(e).position===`fixed`}),_d=(0,w.createContext)({transformPagePoint:e=>e,isStatic:!1,reducedMotion:`never`});function vd(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}function yd(...e){return t=>{let n=!1,r=e.map(e=>{let r=vd(e,t);return!n&&typeof r==`function`&&(n=!0),r});if(n)return()=>{for(let t=0;t<r.length;t++){let n=r[t];typeof n==`function`?n():vd(e[t],null)}}}}function bd(...e){return w.useCallback(yd(...e),e)}var Z=Bn(),xd=class extends w.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(Ms(t)&&e.isPresent&&!this.props.isPresent&&this.props.pop!==!1){let e=t.offsetParent,n=Ms(e)&&e.offsetWidth||0,r=Ms(e)&&e.offsetHeight||0,i=getComputedStyle(t),a=this.props.sizeRef.current;a.height=parseFloat(i.height),a.width=parseFloat(i.width),a.top=t.offsetTop,a.left=t.offsetLeft,a.right=n-a.width-a.left,a.bottom=r-a.height-a.top}return null}componentDidUpdate(){}render(){return this.props.children}};function Sd({children:e,isPresent:t,anchorX:n,anchorY:r,root:i,pop:a}){let o=(0,w.useId)(),s=(0,w.useRef)(null),c=(0,w.useRef)({width:0,height:0,top:0,left:0,right:0,bottom:0}),{nonce:l}=(0,w.useContext)(_d),u=bd(s,e.props?.ref??e?.ref);return(0,w.useInsertionEffect)(()=>{let{width:e,height:u,top:d,left:f,right:p,bottom:m}=c.current;if(t||a===!1||!s.current||!e||!u)return;let h=n===`left`?`left: ${f}`:`right: ${p}`,g=r===`bottom`?`bottom: ${m}`:`top: ${d}`;s.current.dataset.motionPopId=o;let _=document.createElement(`style`);l&&(_.nonce=l);let v=i??document.head;return v.appendChild(_),_.sheet&&_.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${u}px !important;
            ${h}px !important;
            ${g}px !important;
          }
        `),()=>{s.current?.removeAttribute(`data-motion-pop-id`),v.contains(_)&&v.removeChild(_)}},[t]),(0,Z.jsx)(xd,{isPresent:t,childRef:s,sizeRef:c,pop:a,children:a===!1?e:w.cloneElement(e,{ref:u})})}var Cd=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:i,presenceAffectsLayout:a,mode:o,anchorX:s,anchorY:c,root:l})=>{let u=Hn(wd),d=(0,w.useId)(),f=!0,p=(0,w.useMemo)(()=>(f=!1,{id:d,initial:t,isPresent:n,custom:i,onExitComplete:e=>{u.set(e,!0);for(let e of u.values())if(!e)return;r&&r()},register:e=>(u.set(e,!1),()=>u.delete(e))}),[n,u,r]);return a&&f&&(p={...p}),(0,w.useMemo)(()=>{u.forEach((e,t)=>u.set(t,!1))},[n]),w.useEffect(()=>{!n&&!u.size&&r&&r()},[n]),e=(0,Z.jsx)(Sd,{pop:o===`popLayout`,isPresent:n,anchorX:s,anchorY:c,root:l,children:e}),(0,Z.jsx)(Wn.Provider,{value:p,children:e})};function wd(){return new Map}function Td(e=!0){let t=(0,w.useContext)(Wn);if(t===null)return[!0,null];let{isPresent:n,onExitComplete:r,register:i}=t,a=(0,w.useId)();(0,w.useEffect)(()=>{if(e)return i(a)},[e]);let o=(0,w.useCallback)(()=>e&&r&&r(a),[a,r,e]);return!n&&r?[!1,o]:[!0]}var Ed=e=>e.key||``;function Dd(e){let t=[];return w.Children.forEach(e,e=>{(0,w.isValidElement)(e)&&t.push(e)}),t}var Od=({children:e,custom:t,initial:n=!0,onExitComplete:r,presenceAffectsLayout:i=!0,mode:a=`sync`,propagate:o=!1,anchorX:s=`left`,anchorY:c=`top`,root:l})=>{let[u,d]=Td(o),f=(0,w.useMemo)(()=>Dd(e),[e]),p=o&&!u?[]:f.map(Ed),m=(0,w.useRef)(!0),h=(0,w.useRef)(f),g=Hn(()=>new Map),_=(0,w.useRef)(new Set),[v,y]=(0,w.useState)(f),[b,x]=(0,w.useState)(f);Un(()=>{m.current=!1,h.current=f;for(let e=0;e<b.length;e++){let t=Ed(b[e]);p.includes(t)?(g.delete(t),_.current.delete(t)):g.get(t)!==!0&&g.set(t,!1)}},[b,p.length,p.join(`-`)]);let S=[];if(f!==v){let e=[...f];for(let t=0;t<b.length;t++){let n=b[t],r=Ed(n);p.includes(r)||(e.splice(t,0,n),S.push(n))}return a===`wait`&&S.length&&(e=S),x(Dd(e)),y(f),null}let{forceRender:C}=(0,w.useContext)(Vn);return(0,Z.jsx)(Z.Fragment,{children:b.map(e=>{let v=Ed(e),y=o&&!u?!1:f===b||p.includes(v);return(0,Z.jsx)(Cd,{isPresent:y,initial:!m.current||n?void 0:!1,custom:t,presenceAffectsLayout:i,mode:a,root:l,onExitComplete:y?void 0:()=>{if(_.current.has(v))return;if(g.has(v))_.current.add(v),g.set(v,!0);else return;let e=!0;g.forEach(t=>{t||(e=!1)}),e&&(C?.(),x(h.current),o&&d?.(),r&&r())},anchorX:s,anchorY:c,children:e},v)})})},kd=(0,w.createContext)({strict:!1}),Ad={animation:[`animate`,`variants`,`whileHover`,`whileTap`,`exit`,`whileInView`,`whileFocus`,`whileDrag`],exit:[`exit`],drag:[`drag`,`dragControls`],focus:[`whileFocus`],hover:[`whileHover`,`onHoverStart`,`onHoverEnd`],tap:[`whileTap`,`onTap`,`onTapStart`,`onTapCancel`],pan:[`onPan`,`onPanStart`,`onPanSessionStart`,`onPanEnd`],inView:[`whileInView`,`onViewportEnter`,`onViewportLeave`],layout:[`layout`,`layoutId`]},jd=!1;function Md(){if(jd)return;let e={};for(let t in Ad)e[t]={isEnabled:e=>Ad[t].some(t=>!!e[t])};Ic(e),jd=!0}function Nd(){return Md(),Lc()}function Pd(e){let t=Nd();for(let n in e)t[n]={...t[n],...e[n]};Ic(t)}var Fd=new Set(`animate.exit.variants.initial.style.values.variants.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.propagate.ignoreStrict.viewport`.split(`.`));function Id(e){return e.startsWith(`while`)||e.startsWith(`drag`)&&e!==`draggable`||e.startsWith(`layout`)||e.startsWith(`onTap`)||e.startsWith(`onPan`)||e.startsWith(`onLayout`)||Fd.has(e)}var Ld=c({default:()=>Rd}),Rd,zd=o((()=>{throw Rd={},Error(`Could not resolve "@emotion/is-prop-valid" imported by "framer-motion". Is it installed?`)})),Bd=e=>!Id(e);function Vd(e){typeof e==`function`&&(Bd=t=>t.startsWith(`on`)?!Id(t):e(t))}try{Vd((zd(),d(Ld)).default)}catch{}function Hd(e,t,n){let r={};for(let i in e)i===`values`&&typeof e.values==`object`||es(e[i])||(Bd(i)||n===!0&&Id(i)||!t&&!Id(i)||e.draggable&&i.startsWith(`onDrag`))&&(r[i]=e[i]);return r}var Ud=(0,w.createContext)({});function Wd(e,t){if(Dc(e)){let{initial:t,animate:n}=e;return{initial:t===!1||wc(t)?t:void 0,animate:wc(n)?n:void 0}}return e.inherit===!1?{}:t}function Gd(e){let{initial:t,animate:n}=Wd(e,(0,w.useContext)(Ud));return(0,w.useMemo)(()=>({initial:t,animate:n}),[Kd(t),Kd(n)])}function Kd(e){return Array.isArray(e)?e.join(` `):e}var qd=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Jd(e,t,n){for(let r in t)!es(t[r])&&!_l(r,n)&&(e[r]=t[r])}function Yd({transformTemplate:e},t){return(0,w.useMemo)(()=>{let n=qd();return dl(n,t,e),Object.assign({},n.vars,n.style)},[t])}function Xd(e,t){let n=e.style||{},r={};return Jd(r,n,e),Object.assign(r,Yd(e,t)),r}function Zd(e,t){let n={},r=Xd(e,t);return e.drag&&e.dragListener!==!1&&(n.draggable=!1,r.userSelect=r.WebkitUserSelect=r.WebkitTouchCallout=`none`,r.touchAction=e.drag===!0?`none`:`pan-${e.drag===`x`?`y`:`x`}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(n.tabIndex=0),n.style=r,n}var Qd=()=>({...qd(),attrs:{}});function $d(e,t,n,r){let i=(0,w.useMemo)(()=>{let n=Qd();return Tl(n,t,Dl(r),e.transformTemplate,e.style),{...n.attrs,style:{...n.style}}},[t]);if(e.style){let t={};Jd(t,e.style,e),i.style={...t,...i.style}}return i}var ef=[`animate`,`circle`,`defs`,`desc`,`ellipse`,`g`,`image`,`line`,`filter`,`marker`,`mask`,`metadata`,`path`,`pattern`,`polygon`,`polyline`,`rect`,`stop`,`switch`,`symbol`,`svg`,`text`,`tspan`,`use`,`view`];function tf(e){return typeof e!=`string`||e.includes(`-`)?!1:!!(ef.indexOf(e)>-1||/[A-Z]/u.test(e))}function nf(e,t,n,{latestValues:r},i,a=!1,o){let s=(o??tf(e)?$d:Zd)(t,r,i,e),c=Hd(t,typeof e==`string`,a),l=e===w.Fragment?{}:{...c,...s,ref:n},{children:u}=t,d=(0,w.useMemo)(()=>es(u)?u.get():u,[u]);return(0,w.createElement)(e,{...l,children:d})}function rf({scrapeMotionValuesFromProps:e,createRenderState:t},n,r,i){return{latestValues:af(n,r,i,e),renderState:t()}}function af(e,t,n,r){let i={},a=r(e,{});for(let e in a)i[e]=Mu(a[e]);let{initial:o,animate:s}=e,c=Dc(e),l=Oc(e);t&&l&&!c&&e.inherit!==!1&&(o===void 0&&(o=t.initial),s===void 0&&(s=t.animate));let u=n?n.initial===!1:!1;u||=o===!1;let d=u?s:o;if(d&&typeof d!=`boolean`&&!Cc(d)){let t=Array.isArray(d)?d:[d];for(let n=0;n<t.length;n++){let r=Ho(e,t[n]);if(r){let{transitionEnd:e,transition:t,...n}=r;for(let e in n){let t=n[e];if(Array.isArray(t)){let e=u?t.length-1:0;t=t[e]}t!==null&&(i[e]=t)}for(let t in e)i[t]=e[t]}}}return i}var of=e=>(t,n)=>{let r=(0,w.useContext)(Ud),i=(0,w.useContext)(Wn),a=()=>rf(e,t,r,i);return n?a():Hn(a)},sf=of({scrapeMotionValuesFromProps:vl,createRenderState:qd}),cf=of({scrapeMotionValuesFromProps:kl,createRenderState:Qd}),lf=Symbol.for(`motionComponentSymbol`);function uf(e,t,n){let r=(0,w.useRef)(n);(0,w.useInsertionEffect)(()=>{r.current=n});let i=(0,w.useRef)(null);return(0,w.useCallback)(n=>{n&&e.onMount?.(n);let a=r.current;if(typeof a==`function`)if(n){let e=a(n);typeof e==`function`&&(i.current=e)}else i.current?(i.current(),i.current=null):a(n);else a&&(a.current=n);t&&(n?t.mount(n):t.unmount())},[t])}var df=(0,w.createContext)({});function ff(e){return e&&typeof e==`object`&&Object.prototype.hasOwnProperty.call(e,`current`)}function pf(e,t,n,r,i,a){let{visualElement:o}=(0,w.useContext)(Ud),s=(0,w.useContext)(kd),c=(0,w.useContext)(Wn),l=(0,w.useContext)(_d),u=l.reducedMotion,d=l.skipAnimations,f=(0,w.useRef)(null),p=(0,w.useRef)(!1);r||=s.renderer,!f.current&&r&&(f.current=r(e,{visualState:t,parent:o,props:n,presenceContext:c,blockInitialAnimation:c?c.initial===!1:!1,reducedMotionConfig:u,skipAnimations:d,isSVG:a}),p.current&&f.current&&(f.current.manuallyAnimateOnMount=!0));let m=f.current,h=(0,w.useContext)(df);m&&!m.projection&&i&&(m.type===`html`||m.type===`svg`)&&mf(f.current,n,i,h);let g=(0,w.useRef)(!1);(0,w.useInsertionEffect)(()=>{m&&g.current&&m.update(n,c)});let _=n[is],v=(0,w.useRef)(!!_&&typeof window<`u`&&!window.MotionHandoffIsComplete?.(_)&&window.MotionHasOptimisedAnimation?.(_));return Un(()=>{p.current=!0,m&&(g.current=!0,window.MotionIsMounted=!0,m.updateFeatures(),m.scheduleRenderMicrotask(),v.current&&m.animationState&&m.animationState.animateChanges())}),(0,w.useEffect)(()=>{m&&(!v.current&&m.animationState&&m.animationState.animateChanges(),v.current&&=(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(_)}),!1),m.enteringChildren=void 0)}),m}function mf(e,t,n,r){let{layoutId:i,layout:a,drag:o,dragConstraints:s,layoutScroll:c,layoutRoot:l,layoutAnchor:u,layoutCrossfade:d}=t;e.projection=new n(e.latestValues,t[`data-framer-portal-id`]?void 0:hf(e.parent)),e.projection.setOptions({layoutId:i,layout:a,alwaysMeasureLayout:!!o||s&&ff(s),visualElement:e,animationType:typeof a==`string`?a:`both`,initialPromotionConfig:r,crossfade:d,layoutScroll:c,layoutRoot:l,layoutAnchor:u})}function hf(e){if(e)return e.options.allowProjection===!1?hf(e.parent):e.projection}function gf(e,{forwardMotionProps:t=!1,type:n}={},r,i){r&&Pd(r);let a=n?n===`svg`:tf(e),o=a?cf:sf;function s(n,s){let c,l={...(0,w.useContext)(_d),...n,layoutId:_f(n)},{isStatic:u}=l,d=Gd(n),f=o(n,u);if(!u&&typeof window<`u`){vf(l,r);let t=yf(l);c=t.MeasureLayout,d.visualElement=pf(e,f,l,i,t.ProjectionNode,a)}return(0,Z.jsxs)(Ud.Provider,{value:d,children:[c&&d.visualElement?(0,Z.jsx)(c,{visualElement:d.visualElement,...l}):null,nf(e,n,uf(f,d.visualElement,s),f,u,t,a)]})}s.displayName=`motion.${typeof e==`string`?e:`create(${e.displayName??e.name??``})`}`;let c=(0,w.forwardRef)(s);return c[lf]=e,c}function _f({layoutId:e}){let t=(0,w.useContext)(Vn).id;return t&&e!==void 0?t+`-`+e:e}function vf(e,t){(0,w.useContext)(kd).strict}function yf(e){let{drag:t,layout:n}=Nd();if(!t&&!n)return{};let r={...t,...n};return{MeasureLayout:t?.isEnabled(e)||n?.isEnabled(e)?r.MeasureLayout:void 0,ProjectionNode:r.ProjectionNode}}function bf(e,t){if(typeof Proxy>`u`)return gf;let n=new Map,r=(n,r)=>gf(n,r,e,t);return new Proxy((e,t)=>r(e,t),{get:(i,a)=>a===`create`?r:(n.has(a)||n.set(a,gf(a,void 0,e,t)),n.get(a))})}var xf=(e,t)=>t.isSVG??tf(e)?new Al(t):new bl(t,{allowProjection:e!==w.Fragment}),Sf=class extends Bc{constructor(e){super(e),e.animationState||=Ll(e)}updateAnimationControlsSubscription(){let{animate:e}=this.node.getProps();Cc(e)&&(this.unmountControls=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){let{animate:e}=this.node.getProps(),{animate:t}=this.node.prevProps||{};e!==t&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}},Cf=0,wf={animation:{Feature:Sf},exit:{Feature:class extends Bc{constructor(){super(...arguments),this.id=Cf++,this.isExitComplete=!1}update(){if(!this.node.presenceContext)return;let{isPresent:e,onExitComplete:t}=this.node.presenceContext,{isPresent:n}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===n)return;if(e&&n===!1){if(this.isExitComplete){let{initial:e,custom:t}=this.node.getProps();if(typeof e==`string`){let n=Uo(this.node,e,t);if(n){let{transition:e,transitionEnd:t,...r}=n;for(let e in r)this.node.getValue(e)?.jump(r[e])}}this.node.animationState.reset(),this.node.animationState.animateChanges()}else this.node.animationState.setActive(`exit`,!1);this.isExitComplete=!1;return}let r=this.node.animationState.setActive(`exit`,!e);t&&!e&&r.then(()=>{this.isExitComplete=!0,t(this.id)})}mount(){let{register:e,onExitComplete:t}=this.node.presenceContext||{};t&&t(this.id),e&&(this.unmount=e(this.id))}unmount(){}}}};function Tf(e){return{point:{x:e.pageX,y:e.pageY}}}var Ef=e=>t=>Hs(t)&&e(t,Tf(t));function Df(e,t,n,r){return Ou(e,t,Ef(n),r)}var Of=({current:e})=>e?e.ownerDocument.defaultView:null,kf=(e,t)=>Math.abs(e-t);function Af(e,t){let n=kf(e.x,t.x),r=kf(e.y,t.y);return Math.sqrt(n**2+r**2)}var jf=new Set([`auto`,`scroll`]),Mf=class{constructor(e,t,{transformPagePoint:n,contextWindow:r=window,dragSnapToOrigin:i=!1,distanceThreshold:a=3,element:o}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.lastRawMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.scrollPositions=new Map,this.removeScrollListeners=null,this.onElementScroll=e=>{this.handleScroll(e.target)},this.onWindowScroll=()=>{this.handleScroll(window)},this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;this.lastRawMoveEventInfo&&(this.lastMoveEventInfo=Nf(this.lastRawMoveEventInfo,this.transformPagePoint));let e=Ff(this.lastMoveEventInfo,this.history),t=this.startEvent!==null,n=Af(e.offset,{x:0,y:0})>=this.distanceThreshold;if(!t&&!n)return;let{point:r}=e,{timestamp:i}=Nr;this.history.push({...r,timestamp:i});let{onStart:a,onMove:o}=this.handlers;t||(a&&a(this.lastMoveEvent,e),this.startEvent=this.lastMoveEvent),o&&o(this.lastMoveEvent,e)},this.handlePointerMove=(e,t)=>{this.lastMoveEvent=e,this.lastRawMoveEventInfo=t,this.lastMoveEventInfo=Nf(t,this.transformPagePoint),U.update(this.updatePoint,!0)},this.handlePointerUp=(e,t)=>{this.end();let{onEnd:n,onSessionEnd:r,resumeAnimation:i}=this.handlers;if((this.dragSnapToOrigin||!this.startEvent)&&i&&i(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;let a=Ff(e.type===`pointercancel`?this.lastMoveEventInfo:Nf(t,this.transformPagePoint),this.history);this.startEvent&&n&&n(e,a),r&&r(e,a)},!Hs(e))return;this.dragSnapToOrigin=i,this.handlers=t,this.transformPagePoint=n,this.distanceThreshold=a,this.contextWindow=r||window;let s=Nf(Tf(e),this.transformPagePoint),{point:c}=s,{timestamp:l}=Nr;this.history=[{...c,timestamp:l}];let{onSessionStart:u}=t;u&&u(e,Ff(s,this.history)),this.removeListeners=er(Df(this.contextWindow,`pointermove`,this.handlePointerMove),Df(this.contextWindow,`pointerup`,this.handlePointerUp),Df(this.contextWindow,`pointercancel`,this.handlePointerUp)),o&&this.startScrollTracking(o)}startScrollTracking(e){let t=e.parentElement;for(;t;){let e=getComputedStyle(t);(jf.has(e.overflowX)||jf.has(e.overflowY))&&this.scrollPositions.set(t,{x:t.scrollLeft,y:t.scrollTop}),t=t.parentElement}this.scrollPositions.set(window,{x:window.scrollX,y:window.scrollY}),window.addEventListener(`scroll`,this.onElementScroll,{capture:!0}),window.addEventListener(`scroll`,this.onWindowScroll),this.removeScrollListeners=()=>{window.removeEventListener(`scroll`,this.onElementScroll,{capture:!0}),window.removeEventListener(`scroll`,this.onWindowScroll)}}handleScroll(e){let t=this.scrollPositions.get(e);if(!t)return;let n=e===window,r=n?{x:window.scrollX,y:window.scrollY}:{x:e.scrollLeft,y:e.scrollTop},i={x:r.x-t.x,y:r.y-t.y};i.x===0&&i.y===0||(n?this.lastMoveEventInfo&&(this.lastMoveEventInfo.point.x+=i.x,this.lastMoveEventInfo.point.y+=i.y):this.history.length>0&&(this.history[0].x-=i.x,this.history[0].y-=i.y),this.scrollPositions.set(e,r),U.update(this.updatePoint,!0))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),this.removeScrollListeners&&this.removeScrollListeners(),this.scrollPositions.clear(),Mr(this.updatePoint)}};function Nf(e,t){return t?{point:t(e.point)}:e}function Pf(e,t){return{x:e.x-t.x,y:e.y-t.y}}function Ff({point:e},t){return{point:e,delta:Pf(e,Lf(t)),offset:Pf(e,If(t)),velocity:Rf(t,.1)}}function If(e){return e[0]}function Lf(e){return e[e.length-1]}function Rf(e,t){if(e.length<2)return{x:0,y:0};let n=e.length-1,r=null,i=Lf(e);for(;n>=0&&(r=e[n],!(i.timestamp-r.timestamp>rr(t)));)n--;if(!r)return{x:0,y:0};r===e[0]&&e.length>2&&i.timestamp-r.timestamp>rr(t)*2&&(r=e[1]);let a=ir(i.timestamp-r.timestamp);if(a===0)return{x:0,y:0};let o={x:(i.x-r.x)/a,y:(i.y-r.y)/a};return o.x===1/0&&(o.x=0),o.y===1/0&&(o.y=0),o}function zf(e,{min:t,max:n},r){return t!==void 0&&e<t?e=r?ki(t,e,r.min):Math.max(e,t):n!==void 0&&e>n&&(e=r?ki(n,e,r.max):Math.min(e,n)),e}function Bf(e,t,n){return{min:t===void 0?void 0:e.min+t,max:n===void 0?void 0:e.max+n-(e.max-e.min)}}function Vf(e,{top:t,left:n,bottom:r,right:i}){return{x:Bf(e.x,n,i),y:Bf(e.y,t,r)}}function Hf(e,t){let n=t.min-e.min,r=t.max-e.max;return t.max-t.min<e.max-e.min&&([n,r]=[r,n]),{min:n,max:r}}function Uf(e,t){return{x:Hf(e.x,t.x),y:Hf(e.y,t.y)}}function Wf(e,t){let n=.5,r=Jl(e),i=Jl(t);return i>r?n=tr(t.min,t.max-r,e.min):r>i&&(n=tr(e.min,e.max-i,t.min)),qn(0,1,n)}function Gf(e,t){let n={};return t.min!==void 0&&(n.min=t.min-e.min),t.max!==void 0&&(n.max=t.max-e.min),n}var Kf=.35;function qf(e=Kf){return e===!1?e=0:e===!0&&(e=Kf),{x:Jf(e,`left`,`right`),y:Jf(e,`top`,`bottom`)}}function Jf(e,t,n){return{min:Yf(e,t),max:Yf(e,n)}}function Yf(e,t){return typeof e==`number`?e:e[t]||0}var Xf=new WeakMap,Zf=class{constructor(e){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=xc(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=e}start(e,{snapToCursor:t=!1,distanceThreshold:n}={}){let{presenceContext:r}=this.visualElement;if(r&&r.isPresent===!1)return;let i=e=>{t&&this.snapToCursor(Tf(e).point),this.stopAnimation()},a=(e,t)=>{let{drag:n,dragPropagation:r,onDragStart:i}=this.getProps();if(n&&!r&&(this.openDragLock&&this.openDragLock(),this.openDragLock=Ls(n),!this.openDragLock))return;this.latestPointerEvent=e,this.latestPanInfo=t,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),gu(e=>{let t=this.getAxisMotionValue(e).get()||0;if(si.test(t)){let{projection:n}=this.visualElement;if(n&&n.layout){let r=n.layout.layoutBox[e];r&&(t=Jl(r)*(parseFloat(t)/100))}}this.originPoint[e]=t}),i&&U.update(()=>i(e,t),!1,!0),ns(this.visualElement,`transform`);let{animationState:a}=this.visualElement;a&&a.setActive(`whileDrag`,!0)},o=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t;let{dragPropagation:n,dragDirectionLock:r,onDirectionLock:i,onDrag:a}=this.getProps();if(!n&&!this.openDragLock)return;let{offset:o}=t;if(r&&this.currentDirection===null){this.currentDirection=tp(o),this.currentDirection!==null&&i&&i(this.currentDirection);return}this.updateAxis(`x`,t.point,o),this.updateAxis(`y`,t.point,o),this.visualElement.render(),a&&U.update(()=>a(e,t),!1,!0)},s=(e,t)=>{this.latestPointerEvent=e,this.latestPanInfo=t,this.stop(e,t),this.latestPointerEvent=null,this.latestPanInfo=null},c=()=>{let{dragSnapToOrigin:e}=this.getProps();(e||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:l}=this.getProps();this.panSession=new Mf(e,{onSessionStart:i,onStart:a,onMove:o,onSessionEnd:s,resumeAnimation:c},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:l,distanceThreshold:n,contextWindow:Of(this.visualElement),element:this.visualElement.current})}stop(e,t){let n=e||this.latestPointerEvent,r=t||this.latestPanInfo,i=this.isDragging;if(this.cancel(),!i||!r||!n)return;let{velocity:a}=r;this.startAnimation(a);let{onDragEnd:o}=this.getProps();o&&U.postRender(()=>o(n,r))}cancel(){this.isDragging=!1;let{projection:e,animationState:t}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.endPanSession();let{dragPropagation:n}=this.getProps();!n&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),t&&t.setActive(`whileDrag`,!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(e,t,n){let{drag:r}=this.getProps();if(!n||!ep(e,r,this.currentDirection))return;let i=this.getAxisMotionValue(e),a=this.originPoint[e]+n[e];this.constraints&&this.constraints[e]&&(a=zf(a,this.constraints[e],this.elastic[e])),i.set(a)}resolveConstraints(){let{dragConstraints:e,dragElastic:t}=this.getProps(),n=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,r=this.constraints;e&&ff(e)?this.constraints||=this.resolveRefConstraints():e&&n?this.constraints=Vf(n.layoutBox,e):this.constraints=!1,this.elastic=qf(t),r!==this.constraints&&!ff(e)&&n&&this.constraints&&!this.hasMutatedConstraints&&gu(e=>{this.constraints!==!1&&this.getAxisMotionValue(e)&&(this.constraints[e]=Gf(n.layoutBox[e],this.constraints[e]))})}resolveRefConstraints(){let{dragConstraints:e,onMeasureDragConstraints:t}=this.getProps();if(!e||!ff(e))return!1;let n=e.current,{projection:r}=this.visualElement;if(!r||!r.layout)return!1;let i=sl(n,r.root,this.visualElement.getTransformPagePoint()),a=Uf(r.layout.layoutBox,i);if(t){let e=t(Hc(a));this.hasMutatedConstraints=!!e,e&&(a=Vc(e))}return a}startAnimation(e){let{drag:t,dragMomentum:n,dragElastic:r,dragTransition:i,dragSnapToOrigin:a,onDragTransitionEnd:o}=this.getProps(),s=this.constraints||{},c=gu(o=>{if(!ep(o,t,this.currentDirection))return;let c=s&&s[o]||{};(a===!0||a===o)&&(c={min:0,max:0});let l=r?200:1e6,u=r?40:1e7,d={type:`inertia`,velocity:n?e[o]:0,bounceStiffness:l,bounceDamping:u,timeConstant:750,restDelta:1,restSpeed:10,...i,...c};return this.startAxisValueAnimation(o,d)});return Promise.all(c).then(o)}startAxisValueAnimation(e,t){let n=this.getAxisMotionValue(e);return ns(this.visualElement,e),n.start(Bo(e,n,0,t,this.visualElement,!1))}stopAnimation(){gu(e=>this.getAxisMotionValue(e).stop())}getAxisMotionValue(e){let t=`_drag${e.toUpperCase()}`,n=this.visualElement.getProps();return n[t]||this.visualElement.getValue(e,(n.initial?n.initial[e]:void 0)||0)}snapToCursor(e){gu(t=>{let{drag:n}=this.getProps();if(!ep(t,n,this.currentDirection))return;let{projection:r}=this.visualElement,i=this.getAxisMotionValue(t);if(r&&r.layout){let{min:n,max:a}=r.layout.layoutBox[t],o=i.get()||0;i.set(e[t]-ki(n,a,.5)+o)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;let{drag:e,dragConstraints:t}=this.getProps(),{projection:n}=this.visualElement;if(!ff(t)||!n||!this.constraints)return;this.stopAnimation();let r={x:0,y:0};gu(e=>{let t=this.getAxisMotionValue(e);if(t&&this.constraints!==!1){let n=t.get();r[e]=Wf({min:n,max:n},this.constraints[e])}});let{transformTemplate:i}=this.visualElement.getProps();this.visualElement.current.style.transform=i?i({},``):`none`,n.root&&n.root.updateScroll(),n.updateLayout(),this.constraints=!1,this.resolveConstraints(),gu(t=>{if(!ep(t,e,null))return;let n=this.getAxisMotionValue(t),{min:i,max:a}=this.constraints[t];n.set(ki(i,a,r[t]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;Xf.set(this.visualElement,this);let e=this.visualElement.current,t=Df(e,`pointerdown`,t=>{let{drag:n,dragListener:r=!0}=this.getProps(),i=t.target,a=i!==e&&Ks(i);n&&r&&!a&&this.start(t)}),n,r=()=>{let{dragConstraints:t}=this.getProps();ff(t)&&t.current&&(this.constraints=this.resolveRefConstraints(),n||=$f(e,t.current,()=>this.scalePositionWithinConstraints()))},{projection:i}=this.visualElement,a=i.addEventListener(`measure`,r);i&&!i.layout&&(i.root&&i.root.updateScroll(),i.updateLayout()),U.read(r);let o=Ou(window,`resize`,()=>this.scalePositionWithinConstraints()),s=i.addEventListener(`didUpdate`,(({delta:e,hasLayoutChanged:t})=>{this.isDragging&&t&&(gu(t=>{let n=this.getAxisMotionValue(t);n&&(this.originPoint[t]+=e[t].translate,n.set(n.get()+e[t].translate))}),this.visualElement.render())}));return()=>{o(),t(),a(),s&&s(),n&&n()}}getProps(){let e=this.visualElement.getProps(),{drag:t=!1,dragDirectionLock:n=!1,dragPropagation:r=!1,dragConstraints:i=!1,dragElastic:a=Kf,dragMomentum:o=!0}=e;return{...e,drag:t,dragDirectionLock:n,dragPropagation:r,dragConstraints:i,dragElastic:a,dragMomentum:o}}};function Qf(e){let t=!0;return()=>{if(t){t=!1;return}e()}}function $f(e,t,n){let r=mc(e,Qf(n)),i=mc(t,Qf(n));return()=>{r(),i()}}function ep(e,t,n){return(t===!0||t===e)&&(n===null||n===e)}function tp(e,t=10){let n=null;return Math.abs(e.y)>t?n=`y`:Math.abs(e.x)>t&&(n=`x`),n}var np=class extends Bc{constructor(e){super(e),this.removeGroupControls=V,this.removeListeners=V,this.controls=new Zf(e)}mount(){let{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||V}update(){let{dragControls:e}=this.node.getProps(),{dragControls:t}=this.node.prevProps||{};e!==t&&(this.removeGroupControls(),e&&(this.removeGroupControls=e.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}},rp=e=>(t,n)=>{e&&U.update(()=>e(t,n),!1,!0)},ip=class extends Bc{constructor(){super(...arguments),this.removePointerDownListener=V}onPointerDown(e){this.session=new Mf(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:Of(this.node)})}createPanHandlers(){let{onPanSessionStart:e,onPanStart:t,onPan:n,onPanEnd:r}=this.node.getProps();return{onSessionStart:rp(e),onStart:rp(t),onMove:rp(n),onEnd:(e,t)=>{delete this.session,r&&U.postRender(()=>r(e,t))}}}mount(){this.removePointerDownListener=Df(this.node.current,`pointerdown`,e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}},ap=!1,op=class extends w.Component{componentDidMount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:n,layoutId:r}=this.props,{projection:i}=e;i&&(t.group&&t.group.add(i),n&&n.register&&r&&n.register(i),ap&&i.root.didUpdate(),i.addEventListener(`animationComplete`,()=>{this.safeToRemove()}),i.setOptions({...i.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),Pu.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){let{layoutDependency:t,visualElement:n,drag:r,isPresent:i}=this.props,{projection:a}=n;return a?(a.isPresent=i,e.layoutDependency!==t&&a.setOptions({...a.options,layoutDependency:t}),ap=!0,r||e.layoutDependency!==t||t===void 0||e.isPresent!==i?a.willUpdate():this.safeToRemove(),e.isPresent!==i&&(i?a.promote():a.relegate()||U.postRender(()=>{let e=a.getStack();(!e||!e.members.length)&&this.safeToRemove()})),null):null}componentDidUpdate(){let{visualElement:e,layoutAnchor:t}=this.props,{projection:n}=e;n&&(n.options.layoutAnchor=t,n.root.didUpdate(),Ns.postRender(()=>{!n.currentAnimation&&n.isLead()&&this.safeToRemove()}))}componentWillUnmount(){let{visualElement:e,layoutGroup:t,switchLayoutGroup:n}=this.props,{projection:r}=e;ap=!0,r&&(r.scheduleCheckAfterUnmount(),t&&t.group&&t.group.remove(r),n&&n.deregister&&n.deregister(r))}safeToRemove(){let{safeToRemove:e}=this.props;e&&e()}render(){return null}};function sp(e){let[t,n]=Td(),r=(0,w.useContext)(Vn);return(0,Z.jsx)(op,{...e,layoutGroup:r,switchLayoutGroup:(0,w.useContext)(df),isPresent:t,safeToRemove:n})}var cp={pan:{Feature:ip},drag:{Feature:np,ProjectionNode:gd,MeasureLayout:sp}};function lp(e,t,n){let{props:r}=e;e.animationState&&r.whileHover&&e.animationState.setActive(`whileHover`,n===`Start`);let i=r[`onHover`+n];i&&U.postRender(()=>i(t,Tf(t)))}var up=class extends Bc{mount(){let{current:e}=this.node;e&&(this.unmount=Bs(e,(e,t)=>(lp(this.node,t,`Start`),e=>lp(this.node,e,`End`))))}unmount(){}},dp=class extends Bc{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(`:focus-visible`)}catch{e=!0}!e||!this.node.animationState||(this.node.animationState.setActive(`whileFocus`,!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive(`whileFocus`,!1),this.isActive=!1)}mount(){this.unmount=er(Ou(this.node.current,`focus`,()=>this.onFocus()),Ou(this.node.current,`blur`,()=>this.onBlur()))}unmount(){}};function fp(e,t,n){let{props:r}=e;if(e.current instanceof HTMLButtonElement&&e.current.disabled)return;e.animationState&&r.whileTap&&e.animationState.setActive(`whileTap`,n===`Start`);let i=r[`onTap`+(n===`End`?``:n)];i&&U.postRender(()=>i(t,Tf(t)))}var pp=class extends Bc{mount(){let{current:e}=this.node;if(!e)return;let{globalTapTarget:t,propagate:n}=this.node.props;this.unmount=$s(e,(e,t)=>(fp(this.node,t,`Start`),(e,{success:t})=>fp(this.node,e,t?`End`:`Cancel`)),{useGlobalTarget:t,stopPropagation:n?.tap===!1})}unmount(){}},mp=new WeakMap,hp=new WeakMap,gp=e=>{let t=mp.get(e.target);t&&t(e)},_p=e=>{e.forEach(gp)};function vp({root:e,...t}){let n=e||document;hp.has(n)||hp.set(n,{});let r=hp.get(n),i=JSON.stringify(t);return r[i]||(r[i]=new IntersectionObserver(_p,{root:e,...t})),r[i]}function yp(e,t,n){let r=vp(t);return mp.set(e,n),r.observe(e),()=>{mp.delete(e),r.unobserve(e)}}var bp={some:0,all:1},xp=class extends Bc{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.stopObserver?.();let{viewport:e={}}=this.node.getProps(),{root:t,margin:n,amount:r=`some`,once:i}=e,a={root:t?t.current:void 0,rootMargin:n,threshold:typeof r==`number`?r:bp[r]};this.stopObserver=yp(this.node.current,a,e=>{let{isIntersecting:t}=e;if(this.isInView===t||(this.isInView=t,i&&!t&&this.hasEnteredView))return;t&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive(`whileInView`,t);let{onViewportEnter:n,onViewportLeave:r}=this.node.getProps(),a=t?n:r;a&&a(e)})}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>`u`)return;let{props:e,prevProps:t}=this.node;[`amount`,`margin`,`root`].some(Sp(e,t))&&this.startObserver()}unmount(){this.stopObserver?.(),this.hasEnteredView=!1,this.isInView=!1}};function Sp({viewport:e={}},{viewport:t={}}={}){return n=>e[n]!==t[n]}var Cp={inView:{Feature:xp},tap:{Feature:pp},focus:{Feature:dp},hover:{Feature:up}},wp={layout:{ProjectionNode:gd,MeasureLayout:sp}},Tp=bf({...wf,...Cp,...cp,...wp},xf),Ep=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),Dp=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),Op=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),kp=e=>{let t=Op(e);return t.charAt(0).toUpperCase()+t.slice(1)},Ap={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},jp=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},Mp=(0,w.createContext)({}),Np=()=>(0,w.useContext)(Mp),Pp=(0,w.forwardRef)(({color:e,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>{let{size:l=24,strokeWidth:u=2,absoluteStrokeWidth:d=!1,color:f=`currentColor`,className:p=``}=Np()??{},m=r??d?Number(n??u)*24/Number(t??l):n??u;return(0,w.createElement)(`svg`,{ref:c,...Ap,width:t??l??Ap.width,height:t??l??Ap.height,stroke:e??f,strokeWidth:m,className:Ep(`lucide`,p,i),...!a&&!jp(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,w.createElement)(e,t)),...Array.isArray(a)?a:[a]])}),Q=(e,t)=>{let n=(0,w.forwardRef)(({className:n,...r},i)=>(0,w.createElement)(Pp,{ref:i,iconNode:t,className:Ep(`lucide-${Dp(kp(e))}`,`lucide-${e}`,n),...r}));return n.displayName=kp(e),n},Fp=Q(`arrow-left`,[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]),Ip=Q(`arrow-right`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`m12 5 7 7-7 7`,key:`xquz4c`}]]),Lp=Q(`book-open`,[[`path`,{d:`M12 7v14`,key:`1akyts`}],[`path`,{d:`M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z`,key:`ruj8y`}]]),Rp=Q(`calendar-days`,[[`path`,{d:`M8 2v4`,key:`1cmpym`}],[`path`,{d:`M16 2v4`,key:`4m81vk`}],[`rect`,{width:`18`,height:`18`,x:`3`,y:`4`,rx:`2`,key:`1hopcy`}],[`path`,{d:`M3 10h18`,key:`8toen8`}],[`path`,{d:`M8 14h.01`,key:`6423bh`}],[`path`,{d:`M12 14h.01`,key:`1etili`}],[`path`,{d:`M16 14h.01`,key:`1gbofw`}],[`path`,{d:`M8 18h.01`,key:`lrp35t`}],[`path`,{d:`M12 18h.01`,key:`mhygvu`}],[`path`,{d:`M16 18h.01`,key:`kzsmim`}]]),zp=Q(`check`,[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]),Bp=Q(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),Vp=Q(`chevron-left`,[[`path`,{d:`m15 18-6-6 6-6`,key:`1wnfg3`}]]),Hp=Q(`chevron-right`,[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]),Up=Q(`chevron-up`,[[`path`,{d:`m18 15-6-6-6 6`,key:`153udz`}]]),Wp=Q(`external-link`,[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`M10 14 21 3`,key:`gplh6r`}],[`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,key:`a6xqqp`}]]),Gp=Q(`eye`,[[`path`,{d:`M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0`,key:`1nclc0`}],[`circle`,{cx:`12`,cy:`12`,r:`3`,key:`1v7zrd`}]]),Kp=Q(`heart`,[[`path`,{d:`M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,key:`mvr1a0`}]]),qp=Q(`image-plus`,[[`path`,{d:`M16 5h6`,key:`1vod17`}],[`path`,{d:`M19 2v6`,key:`4bpg5p`}],[`path`,{d:`M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5`,key:`1ue2ih`}],[`path`,{d:`m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`,key:`1xmnt7`}],[`circle`,{cx:`9`,cy:`9`,r:`2`,key:`af1f0g`}]]),Jp=Q(`image`,[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,ry:`2`,key:`1m3agn`}],[`circle`,{cx:`9`,cy:`9`,r:`2`,key:`af1f0g`}],[`path`,{d:`m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`,key:`1xmnt7`}]]),Yp=Q(`log-in`,[[`path`,{d:`m10 17 5-5-5-5`,key:`1bsop3`}],[`path`,{d:`M15 12H3`,key:`6jk70r`}],[`path`,{d:`M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4`,key:`u53s6r`}]]),Xp=Q(`log-out`,[[`path`,{d:`m16 17 5-5-5-5`,key:`1bji2h`}],[`path`,{d:`M21 12H9`,key:`dn1m92`}],[`path`,{d:`M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`,key:`1uf3rs`}]]),Zp=Q(`menu`,[[`path`,{d:`M4 5h16`,key:`1tepv9`}],[`path`,{d:`M4 12h16`,key:`1lakjw`}],[`path`,{d:`M4 19h16`,key:`1djgab`}]]),Qp=Q(`moon`,[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,key:`kfwtm`}]]),$p=Q(`mouse-pointer-2`,[[`path`,{d:`M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z`,key:`edeuup`}]]),em=Q(`pen-line`,[[`path`,{d:`M13 21h8`,key:`1jsn5i`}],[`path`,{d:`M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z`,key:`1a8usu`}]]),tm=Q(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),nm=Q(`save`,[[`path`,{d:`M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z`,key:`1c8476`}],[`path`,{d:`M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7`,key:`1ydtos`}],[`path`,{d:`M7 3v4a1 1 0 0 0 1 1h7`,key:`t51u73`}]]),rm=Q(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),im=Q(`sparkles`,[[`path`,{d:`M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z`,key:`1s2grr`}],[`path`,{d:`M20 2v4`,key:`1rf3ol`}],[`path`,{d:`M22 4h-4`,key:`gwowj6`}],[`circle`,{cx:`4`,cy:`20`,r:`2`,key:`6kqj1y`}]]),am=Q(`star`,[[`path`,{d:`M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,key:`r04s7s`}]]),om=Q(`trash-2`,[[`path`,{d:`M10 11v6`,key:`nco0om`}],[`path`,{d:`M14 11v6`,key:`outv1u`}],[`path`,{d:`M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,key:`miytrc`}],[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,key:`e791ji`}]]),sm=Q(`user-plus`,[[`path`,{d:`M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`,key:`1yyitq`}],[`circle`,{cx:`9`,cy:`7`,r:`4`,key:`nufk8`}],[`line`,{x1:`19`,x2:`19`,y1:`8`,y2:`14`,key:`1bvyxn`}],[`line`,{x1:`22`,x2:`16`,y1:`11`,y2:`11`,key:`1shjgl`}]]),cm=Q(`user`,[[`path`,{d:`M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2`,key:`975kel`}],[`circle`,{cx:`12`,cy:`7`,r:`4`,key:`17ys0d`}]]),lm=Q(`wand-sparkles`,[[`path`,{d:`m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72`,key:`ul74o6`}],[`path`,{d:`m14 7 3 3`,key:`1r5n42`}],[`path`,{d:`M5 6v4`,key:`ilb8ba`}],[`path`,{d:`M19 14v4`,key:`blhpug`}],[`path`,{d:`M10 2v2`,key:`7u0qdc`}],[`path`,{d:`M7 8H3`,key:`zfb6yr`}],[`path`,{d:`M21 16h-4`,key:`1cnmox`}],[`path`,{d:`M11 3H9`,key:`1obp7u`}]]),um=Q(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),dm=u(zn(),1),fm={base:{stars:10,mistScale:.72,mistOpacity:.12,gridOpacity:.04,vignetteOpacity:.72},soft:{stars:16,mistScale:.88,mistOpacity:.16,gridOpacity:.07,vignetteOpacity:.62},hero:{stars:30,mistScale:1,mistOpacity:.22,gridOpacity:.12,vignetteOpacity:.48}},pm={navy:`#070b17`,indigo:`#3b4b92`,fuchsia:`#c45bd6`,cyan:`#58d6ff`,star:`rgba(255, 255, 255, 0.7)`};function mm(e){return fm[e]??fm.base}function hm({variant:e=`base`,animated:t=!0}){let n=mm(e),r=(0,w.useMemo)(()=>Array.from({length:n.stars}).map((e,t)=>({id:t,left:`${t*13%100}%`,top:`${t*19%100}%`,delay:t%6*.5,duration:2.8+t%5})),[n.stars]),i=n.mistScale;return(0,Z.jsxs)(`div`,{className:`pointer-events-none fixed inset-0 z-0 overflow-hidden`,children:[(0,Z.jsx)(`div`,{className:`absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(196,91,214,0.14),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(168,85,247,0.24),transparent_20%),radial-gradient(circle_at_70%_82%,rgba(34,197,94,0.18),transparent_20%),radial-gradient(circle_at_52%_52%,rgba(196,91,214,0.18),transparent_34%),radial-gradient(circle_at_62%_68%,rgba(88,214,255,0.14),transparent_28%),radial-gradient(circle_at_30%_78%,rgba(59,75,146,0.22),transparent_30%),linear-gradient(180deg,rgba(7,11,23,0.1),rgba(7,11,23,0.88))]`}),t?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Tp.div,{className:`absolute left-1/2 top-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2)_0%,rgba(59,75,146,0.18)_14%,rgba(196,91,214,0.16)_28%,rgba(88,214,255,0.1)_42%,transparent_72%)] blur-3xl`,style:{height:`${72*i}rem`,width:`${72*i}rem`},animate:{rotate:360,scale:[1,1.03,1]},transition:{repeat:1/0,duration:180,ease:`linear`}}),(0,Z.jsx)(Tp.div,{className:`absolute rounded-full bg-[radial-gradient(circle,rgba(196,91,214,0.18)_0%,rgba(59,75,146,0.12)_20%,transparent_72%)] blur-3xl`,style:{left:`8%`,top:`14%`,height:`${42*i}rem`,width:`${42*i}rem`,opacity:n.mistOpacity},animate:{x:[0,18,0],y:[0,-10,0]},transition:{repeat:1/0,duration:42,ease:`easeInOut`}}),(0,Z.jsx)(Tp.div,{className:`absolute rounded-full bg-[radial-gradient(circle,rgba(88,214,255,0.11)_0%,rgba(34,197,94,0.16)_18%,rgba(59,75,146,0.08)_32%,transparent_70%)] blur-3xl`,style:{right:`4%`,bottom:`8%`,height:`${38*i}rem`,width:`${38*i}rem`,opacity:n.mistOpacity*.9},animate:{x:[0,-16,0],y:[0,12,0]},transition:{repeat:1/0,duration:48,ease:`easeInOut`}})]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`div`,{className:`absolute left-1/2 top-1/2 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.2)_0%,rgba(59,75,146,0.18)_14%,rgba(196,91,214,0.16)_28%,rgba(88,214,255,0.1)_42%,transparent_72%)] blur-3xl`,style:{height:`${72*i}rem`,width:`${72*i}rem`}}),(0,Z.jsx)(`div`,{className:`absolute rounded-full bg-[radial-gradient(circle,rgba(196,91,214,0.18)_0%,rgba(59,75,146,0.12)_20%,transparent_72%)] blur-3xl`,style:{left:`8%`,top:`14%`,height:`${42*i}rem`,width:`${42*i}rem`,opacity:n.mistOpacity}}),(0,Z.jsx)(`div`,{className:`absolute rounded-full bg-[radial-gradient(circle,rgba(88,214,255,0.11)_0%,rgba(34,197,94,0.16)_18%,rgba(59,75,146,0.08)_32%,transparent_70%)] blur-3xl`,style:{right:`4%`,bottom:`8%`,height:`${38*i}rem`,width:`${38*i}rem`,opacity:n.mistOpacity*.9}})]}),(0,Z.jsx)(`div`,{className:`absolute inset-0`,style:{opacity:n.vignetteOpacity,background:`linear-gradient(180deg, rgba(7,11,23,0.1) 0%, rgba(7,11,23,0.48) 45%, rgba(7,11,23,0.8) 100%)`}}),r.map(e=>(0,Z.jsx)(Tp.div,{className:`absolute`,style:{left:e.left,top:e.top},animate:{opacity:[.25,.95,.25],scale:[.8,1.15,.8],y:[0,-8,0]},transition:{repeat:1/0,duration:e.duration,delay:e.delay,ease:`easeInOut`},children:(0,Z.jsx)(im,{className:`h-4 w-4`,style:{color:pm.star}})},e.id))]})}var gm=dm?.default?.default??dm?.default??dm,_m=[{id:1,title:`Diary Notes`,subtitle:`Diary / Tarot`,text:`Capture the mood of the day and let tarot add another layer of meaning.`},{id:2,title:`Follow the Stars`,subtitle:`Astrology`,text:`Astrology helps me see patterns, timing, and the shape of the future.`},{id:3,title:`Keep It as an Archive`,subtitle:`Your Archive`,text:`Save what matters and return to it whenever you need a quiet reminder.`}],vm=[{id:1,title:`The Fool`,subtitle:`Major Arcana`,text:`A fresh start, trust, and an open path ahead.`},{id:2,title:`The Magician`,subtitle:`Major Arcana`,text:`Focus, skill, and the will to shape what comes next.`},{id:3,title:`The High Priestess`,subtitle:`Major Arcana`,text:`Intuition, quiet knowing, and hidden layers.`},{id:4,title:`The Empress`,subtitle:`Major Arcana`,text:`Abundance, care, and creative growth.`},{id:5,title:`The Moon`,subtitle:`Major Arcana`,text:`Unclear signals, dreams, and the need to listen closely.`},{id:6,title:`The World`,subtitle:`Major Arcana`,text:`Completion, integration, and the feeling of arrival.`}];function ym({icon:e,eyebrow:t,title:n,description:r}){return(0,Z.jsxs)(`div`,{className:`mb-8`,children:[(0,Z.jsxs)(`div`,{className:`mb-3 flex items-center gap-2 text-sm tracking-[0.22em] uppercase text-fuchsia-200/80`,children:[e,(0,Z.jsx)(`span`,{children:t})]}),(0,Z.jsx)(`h1`,{className:`text-3xl font-semibold text-white md:text-4xl`,children:n}),r&&(0,Z.jsx)(`p`,{className:`mt-3 max-w-2xl text-sm leading-7 text-slate-300 md:text-base`,children:r})]})}var bm={original:{ring:`border-fuchsia-200/20`,shadow:`shadow-[0_20px_80px_rgba(168,85,247,0.25)]`,glow:`from-[#23152f] via-[#15162a] to-[#0d1020]`,accent:`text-fuchsia-200/80`,dot:`bg-fuchsia-300`},tarot:{ring:`border-[#8d7444]/45`,shadow:`shadow-[0_20px_80px_rgba(84,68,36,0.3)]`,glow:`from-[#3a3025]/95 via-[#2c241c]/95 to-[#1f1814]/95`,accent:`text-[#b99a62]/80`,dot:`bg-[#b99a62]`}};function xm(e){let t=[[1e3,`M`],[900,`CM`],[500,`D`],[400,`CD`],[100,`C`],[90,`XC`],[50,`L`],[40,`XL`],[10,`X`],[9,`IX`],[5,`V`],[4,`IV`],[1,`I`]],n=e,r=``;return t.forEach(([e,t])=>{for(;n>=e;)r+=t,n-=e}),r}function Sm({cards:e,theme:t,title:n,icon:r}){let[i,a]=(0,w.useState)(0),o=e[i],s=bm[t],c=r,l=t===`tarot`,u=()=>a(t=>(t-1+e.length)%e.length),d=()=>a(t=>(t+1)%e.length);return(0,Z.jsxs)(`div`,{className:`mx-auto flex w-full max-w-[340px] flex-col`,children:[(0,Z.jsxs)(`div`,{className:`mb-2 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400`,children:[(0,Z.jsx)(c,{className:`h-4 w-4 ${s.accent}`}),(0,Z.jsx)(`span`,{children:n})]}),(0,Z.jsxs)(`div`,{className:`group relative flex min-h-[440px] w-full items-center justify-center outline-none`,tabIndex:0,onKeyDown:e=>{e.key===`ArrowLeft`&&(e.preventDefault(),u()),e.key===`ArrowRight`&&(e.preventDefault(),d())},"aria-label":`${n} deck`,children:[(0,Z.jsx)(`div`,{className:`absolute h-[360px] w-[290px] -translate-x-6 translate-y-5 rounded-[2rem] border ${s.ring} bg-white/5 shadow-2xl backdrop-blur-sm`}),(0,Z.jsx)(`div`,{className:`absolute h-[360px] w-[290px] translate-x-6 -translate-y-5 rounded-[2rem] border ${s.ring} bg-white/5 shadow-2xl backdrop-blur-sm`}),(0,Z.jsx)(Od,{mode:`wait`,children:(0,Z.jsxs)(Tp.div,{initial:{opacity:0,y:20,rotate:-4,scale:.95},animate:{opacity:1,y:0,rotate:0,scale:1},exit:{opacity:0,y:-20,rotate:4,scale:.95},transition:{duration:.35},className:`relative z-10 h-[420px] w-[340px] rounded-[2rem] border ${s.ring} bg-gradient-to-b ${s.glow} p-7 ${s.shadow} ${l?`backdrop-blur-sm`:``} transition-transform duration-300 group-hover:scale-[1.01]`,children:[l?(0,Z.jsxs)(`div`,{className:`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#8d7444]/40 bg-[#1a1512]/85 text-[#f1e6cf]`,children:[(0,Z.jsx)(`div`,{className:`pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(circle_at_top,_rgba(185,154,98,0.12),_transparent_42%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.03),_transparent_48%)]`}),(0,Z.jsxs)(`div`,{className:`relative flex h-full flex-col p-5`,children:[(0,Z.jsxs)(`div`,{className:`flex items-start justify-between text-[10px] font-medium uppercase tracking-[0.4em] text-[#b99a62]/80`,children:[(0,Z.jsx)(`span`,{children:xm(i+1)}),(0,Z.jsx)(`span`,{children:o.subtitle})]}),(0,Z.jsxs)(`div`,{className:`mt-5 flex flex-1 flex-col rounded-[1.25rem] border border-[#b99a62]/20 bg-[#241d18]/70 px-4 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]`,children:[(0,Z.jsxs)(`div`,{className:`flex items-center gap-3 text-[#b99a62]/70`,children:[(0,Z.jsx)(`div`,{className:`h-px flex-1 bg-[#b99a62]/25`}),(0,Z.jsx)(im,{className:`h-4 w-4`}),(0,Z.jsx)(`div`,{className:`h-px flex-1 bg-[#b99a62]/25`})]}),(0,Z.jsxs)(`div`,{className:`flex flex-1 flex-col items-center justify-center text-center`,children:[(0,Z.jsx)(`div`,{className:`mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#b99a62]/35 bg-[#faf2df]/8 text-[#d8c08e] shadow-[0_0_18px_rgba(185,154,98,0.12)]`,children:(0,Z.jsx)(Qp,{className:`h-9 w-9`})}),(0,Z.jsx)(`h3`,{className:`font-serif text-3xl uppercase tracking-[0.22em] text-[#f1e6cf]`,children:o.title}),(0,Z.jsx)(`div`,{className:`mt-4 h-px w-28 bg-[#b99a62]/30`})]}),(0,Z.jsx)(`p`,{className:`mx-auto mt-auto max-w-[240px] text-center text-sm leading-7 text-[#d8c9ab]`,children:o.text}),(0,Z.jsxs)(`div`,{className:`mt-4 flex items-center gap-3 text-[#b99a62]/70`,children:[(0,Z.jsx)(`div`,{className:`h-px flex-1 bg-[#b99a62]/25`}),(0,Z.jsx)(im,{className:`h-4 w-4`}),(0,Z.jsx)(`div`,{className:`h-px flex-1 bg-[#b99a62]/25`})]})]}),(0,Z.jsxs)(`div`,{className:`mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-[#b99a62]/80`,children:[(0,Z.jsx)(`span`,{children:`Arcana`}),(0,Z.jsxs)(`span`,{children:[String(i+1).padStart(2,`0`),`/`,String(e.length).padStart(2,`0`)]})]})]})]}):(0,Z.jsxs)(`div`,{className:`flex h-full flex-col justify-between`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsxs)(`div`,{className:`mb-5 flex items-center justify-between ${s.accent}`,children:[(0,Z.jsx)(Qp,{className:`h-5 w-5`}),(0,Z.jsx)(`span`,{className:`text-xs uppercase tracking-[0.3em]`,children:`Arcana`})]}),(0,Z.jsx)(`p`,{className:`text-xs uppercase tracking-[0.28em] text-slate-400`,children:o.subtitle}),(0,Z.jsx)(`h3`,{className:`mt-3 text-3xl font-semibold leading-tight text-white`,children:o.title}),(0,Z.jsx)(`p`,{className:`mt-4 text-base leading-8 text-slate-300`,children:o.text})]}),(0,Z.jsxs)(`div`,{className:`flex items-center justify-between text-sm text-slate-400`,children:[(0,Z.jsx)(`span`,{children:String(i+1).padStart(2,`0`)}),(0,Z.jsx)(`span`,{children:String(e.length).padStart(2,`0`)})]})]}),(0,Z.jsx)(`div`,{className:`pointer-events-none absolute inset-x-0 bottom-5 flex justify-center`,children:(0,Z.jsxs)(`div`,{className:`inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/80 opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100`,children:[(0,Z.jsx)($p,{className:`h-3.5 w-3.5`}),(0,Z.jsx)(`span`,{children:`Click left or right side`})]})})]},o.id)}),(0,Z.jsx)(`button`,{type:`button`,onClick:u,"aria-label":`Previous ${n}`,className:`absolute left-1/2 top-1/2 z-20 h-[420px] w-[170px] -translate-x-full -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/30`}),(0,Z.jsx)(`button`,{type:`button`,onClick:d,"aria-label":`Next ${n}`,className:`absolute left-1/2 top-1/2 z-20 h-[420px] w-[170px] -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-white/30`})]})]})}function Cm(){return(0,Z.jsxs)(`div`,{className:`grid gap-6 lg:grid-cols-2 lg:items-start`,children:[(0,Z.jsx)(Sm,{cards:_m,theme:`original`,title:`Original Tarot`,icon:Qp}),(0,Z.jsx)(Sm,{cards:vm,theme:`tarot`,title:`Major Arcana`,icon:im})]})}function wm(){return(0,Z.jsxs)(`div`,{className:`relative isolate bg-[#070b17] text-white`,children:[(0,Z.jsx)(hm,{variant:`hero`}),(0,Z.jsxs)(`div`,{className:`relative z-10`,children:[(0,Z.jsx)(`header`,{className:`fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-gradient-to-r from-[#1a1026]/18 via-[#2a1530]/14 to-[#1a1026]/18 backdrop-blur-2xl`,children:(0,Z.jsx)(`div`,{className:`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10`,children:(0,Z.jsx)(R,{to:`/`,className:`text-lg font-semibold tracking-[0.22em] text-white`,children:`Daily Witchcrafts`})})}),(0,Z.jsx)(gm,{licenseKey:`gplv3-license`,navigation:!0,anchors:[`home`,`concept`,`experience`,`author`],scrollingSpeed:1e3,easingcss3:`cubic-bezier(0.645, 0.045, 0.355, 1)`,autoScrolling:!0,fitToSection:!0,fitToSectionDelay:150,scrollOverflow:!1,navigationPosition:`right`,credits:{enabled:!1},render:({fullpageApi:e})=>(0,Z.jsxs)(gm.Wrapper,{children:[(0,Z.jsx)(`section`,{className:`section relative isolate overflow-hidden`,children:(0,Z.jsx)(`div`,{className:`relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-24 pt-32 md:px-10 md:pt-36`,children:(0,Z.jsxs)(`div`,{className:`max-w-3xl`,children:[(0,Z.jsxs)(`div`,{className:`mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/5 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur-md`,children:[(0,Z.jsx)(am,{className:`h-4 w-4`}),(0,Z.jsx)(`span`,{children:`WELCOME`})]}),(0,Z.jsx)(`h1`,{className:`text-5xl font-semibold leading-tight text-white md:text-7xl md:leading-[1.1]`,children:`Daily Witchcrafts`}),(0,Z.jsx)(`p`,{className:`mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg`,children:`A quiet space where astrology, tarot, and daily notes meet. It is a place to look back gently, read the symbols around you, and gather the stories that feel worth keeping.`}),(0,Z.jsxs)(`div`,{className:`mt-10 flex flex-wrap items-center gap-4`,children:[(0,Z.jsxs)(R,{to:`/login`,className:`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-3.5 text-base font-medium text-white transition hover:bg-white/15`,children:[(0,Z.jsx)(Yp,{className:`h-5 w-5`}),`LOGIN`]}),(0,Z.jsxs)(R,{to:`/register`,className:`inline-flex items-center gap-2 rounded-full bg-fuchsia-300 px-7 py-3.5 text-base font-medium text-slate-950 transition hover:scale-[1.02]`,children:[(0,Z.jsx)(sm,{className:`h-5 w-5`}),`NEW`]}),(0,Z.jsx)(`button`,{type:`button`,onClick:()=>e.moveTo(`concept`),className:`rounded-full border border-white/15 px-7 py-3.5 text-base text-slate-200 transition hover:bg-white/5`,children:`CONCEPT`})]})]})})}),(0,Z.jsx)(`section`,{className:`section`,children:(0,Z.jsxs)(`div`,{className:`mx-auto flex min-h-screen max-w-[88rem] flex-col justify-center px-6 py-24 md:px-10`,children:[(0,Z.jsx)(ym,{icon:(0,Z.jsx)(im,{className:`h-4 w-4`}),eyebrow:`Concept`,title:`AI & Witchcrafts`,description:`A quiet space where astrology, tarot, and daily notes meet.`}),(0,Z.jsx)(`div`,{className:`mx-auto grid w-full max-w-5xl gap-5 md:grid-cols-3`,children:[{title:`Diary`,text:`Hold on to the thoughts and moods that matter most.`},{title:`Astrology`,text:`Read timing, patterns, and the shape of what comes next.`},{title:`Tarot`,text:`Turn cards into small hints and clear directions.`}].map(e=>(0,Z.jsxs)(`div`,{className:`rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md`,children:[(0,Z.jsx)(`h3`,{className:`text-xl font-semibold text-white`,children:e.title}),(0,Z.jsx)(`p`,{className:`mt-3 text-sm leading-7 text-slate-300`,children:e.text})]},e.title))})]})}),(0,Z.jsx)(`section`,{className:`section`,children:(0,Z.jsxs)(`div`,{className:`mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 md:px-10`,children:[(0,Z.jsx)(ym,{icon:(0,Z.jsx)(Qp,{className:`h-4 w-4`}),eyebrow:`Experience`,title:`Your Original Tarot`,description:`A custom reading flow built around your own symbols and story. \r
                    Click the left or right side of each card, or let it flip by itself.`}),(0,Z.jsx)(Cm,{})]})}),(0,Z.jsx)(`section`,{className:`section`,children:(0,Z.jsxs)(`div`,{className:`mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 md:px-10`,children:[(0,Z.jsx)(ym,{icon:(0,Z.jsx)(lm,{className:`h-4 w-4`}),eyebrow:`Author`,title:`MICKYLAN`,description:`I love anime and reading, and I’m especially interested in Western astrology.`}),(0,Z.jsx)(`div`,{className:`rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md md:p-8`,children:(0,Z.jsxs)(`div`,{className:`max-w-5xl`,children:[(0,Z.jsx)(`h3`,{className:`text-2xl font-semibold text-white`,children:`Disclaimer(免責事項)`}),(0,Z.jsxs)(`p`,{className:`mt-4 text-sm leading-8 text-slate-300 md:text-base`,children:[`This site is created for personal reflection and entertainment. It is not intended to replace professional advice, diagnosis, or treatment.The content on this site is meant for reflection and enjoyment only, and should not be considered professional advice.`,(0,Z.jsx)(`br`,{}),(0,Z.jsx)(`br`,{}),`Astrology and tarot content on this site are provided for reflection and entertainment only, and are not a substitute for professional advice.`]}),(0,Z.jsx)(`div`,{className:`mt-6 flex flex-wrap gap-3`,children:(0,Z.jsx)(R,{to:`/about`,className:`inline-flex items-center gap-2 rounded-full bg-fuchsia-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:scale-[1.02]`,children:`AboutUs`})})]})})]})})]})})]})]})}var Tm=`/assets/logo2-DgaA8R6w.jpg`,Em=[{year:`2021~`,en:`Programming and making things with code.`,ja:`プログラミングを始め、コードで何かを作ることに向き合いはじめました。`},{year:`2023~`,en:`Focused more on front-end work and user-facing design.`,ja:`フロントエンド制作と、使う人に届くデザインをより意識するようになりました。`},{year:`Now`,en:`Building Daily Witchcrafts as one connected world.`,ja:`Daily Witchcrafts を、ひとつのつながった世界として育てています。`}];function Dm(){let e=Array.from({length:16}).map((e,t)=>({id:t,left:`${t*17%100}%`,top:`${t*23%100}%`,delay:t%5*.45,duration:3+t%4}));return(0,Z.jsxs)(`div`,{className:`pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070b17]`,children:[(0,Z.jsx)(`div`,{className:`absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl`}),(0,Z.jsx)(`div`,{className:`absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl`}),(0,Z.jsx)(`div`,{className:`absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl`}),e.map(e=>(0,Z.jsx)(`span`,{className:`absolute text-white/70`,style:{left:e.left,top:e.top,animationDelay:`${e.delay}s`,animationDuration:`${e.duration}s`},children:`✦`},e.id))]})}function Om(){return(0,Z.jsxs)(`div`,{className:`relative isolate min-h-screen bg-[#070b17] text-white`,children:[(0,Z.jsx)(Dm,{}),(0,Z.jsxs)(`main`,{className:`relative z-10 mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-12`,children:[(0,Z.jsx)(`div`,{className:`flex items-center justify-between`,children:(0,Z.jsx)(R,{to:`/`,className:`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10`,children:`Back to Home`})}),(0,Z.jsx)(`section`,{className:`mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md md:p-10`,children:(0,Z.jsxs)(`div`,{className:`mx-auto max-w-4xl`,children:[(0,Z.jsx)(`h1`,{className:`text-sm font-medium uppercase tracking-[0.32em] text-fuchsia-100/80 md:text-base`,children:`profile & contact`}),(0,Z.jsxs)(`p`,{className:`mt-5 max-w-3xl text-base leading-8 text-slate-200`,children:[`If you have any questions or would like to get in touch, please e-mail me at `,(0,Z.jsx)(`a`,{href:`mailto:mickylan2367@gmail.com`,className:`text-fuchsia-400 hover:underline`,children:`mickylan2367@gmail.com`})]}),(0,Z.jsxs)(`div`,{className:`mt-10 grid items-center gap-6 rounded-[2rem] border border-white/10 bg-black/10 p-6 shadow-xl backdrop-blur-md md:grid-cols-[180px_1fr] md:p-8`,children:[(0,Z.jsx)(Tp.div,{animate:{scale:[1,1.05,1]},transition:{repeat:1/0,duration:2},className:`h-28 w-28 rounded-full p-[3px] bg-gradient-to-br from-fuchsia-400 to-indigo-400 shadow-[0_0_20px_rgba(168,85,247,0.6)]`,children:(0,Z.jsx)(`img`,{src:Tm,alt:`profile`,className:`h-full w-full rounded-full object-cover`})}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h2`,{className:`text-xl font-semibold text-white md:text-2xl`,children:`MICKYLAN`}),(0,Z.jsxs)(`div`,{className:`mt-4 space-y-5 text-base leading-8 text-slate-200`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{children:`I love anime and reading, and I am especially passionate about Western astrology.`}),(0,Z.jsx)(`p`,{className:`mt-1 text-base leading-8 text-fuchsia-100/80`,children:`アニメと読書、そして特に西洋占星術が大好き。`})]}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{children:`I am still learning tarot, so I have a long way to go.`}),(0,Z.jsx)(`p`,{className:`mt-1 text-base leading-8 text-fuchsia-100/80`,children:`タロットはまだ勉強中です。`})]}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{children:`Even though AI, science, and astrology may seem different, I find it fascinating that they all try to understand the future in their own way.`}),(0,Z.jsx)(`p`,{className:`mt-1 text-base leading-8 text-fuchsia-100/80`,children:`AI、科学、占星術は一見ちがうものに見えますが、それぞれの方法で未来を理解しようとしているところがとても面白いとおもい制作しました。`})]})]}),(0,Z.jsxs)(`div`,{className:`mt-6 flex flex-wrap gap-3`,children:[(0,Z.jsxs)(`a`,{href:`https://github.com/mickylan2367`,target:`_blank`,rel:`noreferrer`,className:`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10`,children:[(0,Z.jsx)(Wp,{className:`h-4 w-4`}),`GitHub`]}),(0,Z.jsxs)(`a`,{href:`https://qiita.com/mitzukan`,target:`_blank`,rel:`noreferrer`,className:`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10`,children:[(0,Z.jsx)(im,{className:`h-4 w-4`}),`Qiita`]})]})]})]}),(0,Z.jsxs)(`div`,{className:`mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md`,children:[(0,Z.jsx)(`div`,{className:`inline-flex items-center gap-2 text-sm tracking-[0.22em] uppercase text-fuchsia-200/80`,children:(0,Z.jsx)(`span`,{children:`Motto`})}),(0,Z.jsx)(`h2`,{className:`mt-4 text-2xl font-semibold text-white`,children:`THE SERENITY PRAYER`}),(0,Z.jsxs)(`div`,{className:`mt-4 space-y-4 text-base leading-8 text-slate-200`,children:[(0,Z.jsxs)(`p`,{children:[`O God, give me the serenity to accept what cannot be changed,`,(0,Z.jsx)(`br`,{}),`変えられないものを受け入れる静けさを、私にお与えください。`]}),(0,Z.jsxs)(`p`,{children:[`courage to change what should be changed,`,(0,Z.jsx)(`br`,{}),`変えるべきものを変える勇気を、私にお与えください。`]}),(0,Z.jsxs)(`p`,{children:[`and wisdom to distinguish the one from the other.`,(0,Z.jsx)(`br`,{}),`その違いを見分ける知恵を、私にお与えください。`]})]})]}),(0,Z.jsxs)(`div`,{className:`mt-10 rounded-3xl border border-white/10 bg-black/10 p-6 shadow-xl backdrop-blur-md`,children:[(0,Z.jsx)(`p`,{className:`text-xs uppercase tracking-[0.28em] text-fuchsia-200/70`,children:`Career`}),(0,Z.jsx)(`div`,{className:`mt-3 space-y-3`,children:Em.map(e=>(0,Z.jsxs)(`div`,{className:`rounded-2xl border border-white/10 bg-white/5 p-4`,children:[(0,Z.jsx)(`p`,{className:`text-xs uppercase tracking-[0.28em] text-fuchsia-200/70`,children:e.year}),(0,Z.jsx)(`p`,{className:`mt-2 text-base leading-8 text-slate-200`,children:e.en}),(0,Z.jsx)(`p`,{className:`mt-1 text-base leading-8 text-fuchsia-100/80`,children:e.ja})]},e.year))})]})]})})]})]})}function km(e){let t=`; ${document.cookie}`.split(`; ${e}=`);return t.length===2?t.pop().split(`;`).shift():``}var Am=null;async function jm(){Am||=fetch(`/api/csrf/`,{method:`GET`,credentials:`include`}).catch(e=>{throw Am=null,e}),await Am}async function $(e,t={}){let n=t.method??`GET`,r=new Headers(t.headers??{});if(t.body!==void 0&&!(t.body instanceof FormData)&&!r.has(`Content-Type`)&&r.set(`Content-Type`,`application/json`),![`GET`,`HEAD`,`OPTIONS`].includes(n.toUpperCase())){await jm();let e=km(`csrftoken`);e&&r.set(`X-CSRFToken`,e)}let i=await fetch(e,{...t,method:n,headers:r,credentials:`include`}),a=(i.headers.get(`content-type`)??``).includes(`application/json`)?await i.json():await i.text();if(!i.ok){let e=typeof a==`object`?a.error??`Request failed`:a;throw Error(e||`HTTP ${i.status}`)}return a}var Mm=e=>{let t=Math.sin(e)*1e4;return t-Math.floor(t)},Nm=(e,t)=>e===`warm`?t%17==0?{background:`#ff9a62`,boxShadow:`0 0 8px rgba(255,154,98,0.95), 0 0 18px rgba(255,106,92,0.55), 0 0 30px rgba(255,189,112,0.25)`}:t%9==0?{background:`#ffd08a`,boxShadow:`0 0 8px rgba(255,208,138,0.95), 0 0 18px rgba(255,155,98,0.44), 0 0 28px rgba(255,120,120,0.22)`}:{background:`#ffffff`,boxShadow:`0 0 8px rgba(255,255,255,0.95), 0 0 18px rgba(180,210,255,0.55), 0 0 28px rgba(181,120,255,0.25)`}:{background:`#ffffff`,boxShadow:`0 0 8px rgba(255,255,255,0.95), 0 0 18px rgba(180,210,255,0.55), 0 0 28px rgba(181,120,255,0.25)`};function Pm({className:e=``,fixed:t=!1,tone:n=`cool`,shootingAngle:r=-26}){let i=(0,w.useMemo)(()=>Array.from({length:110},(e,t)=>{let r=Mm(t+1)*3.5+1.2,i=Nm(n,t);return{width:`${r}px`,height:`${r}px`,top:`${Mm(t+201)*100}%`,left:`${Mm(t+401)*100}%`,opacity:Mm(t+601)*.7+.2,animationDuration:`${Mm(t+801)*4+3}s`,animationDelay:`${Mm(t+1001)*4}s`,...i}}),[n]);return(0,Z.jsxs)(`div`,{className:`starry-sky ${t?`starry-sky-fixed`:``} ${e}`,"aria-hidden":`true`,children:[(0,Z.jsx)(`style`,{children:Fm}),i.map((e,t)=>(0,Z.jsx)(`span`,{className:`starry-sky-star`,style:e},t)),Array.from({length:4}).map((e,t)=>(0,Z.jsx)(`span`,{className:`starry-sky-shooting-star`,style:{top:`${12+t*18}%`,left:`${12+t*22}%`,animationDelay:`${t*3.5}s`,animationDuration:`${10+t*1.2}s`,"--starry-sky-angle":`${r}deg`}},`shooting-${t}`))]})}var Fm=`
  .starry-sky {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .starry-sky-fixed {
    position: fixed;
    z-index: -1;
  }

  .starry-sky-star {
    position: absolute;
    border-radius: 999px;
    animation: starrySkyTwinkle ease-in-out infinite;
    will-change: opacity, transform;
  }

  .starry-sky-shooting-star {
    position: absolute;
    width: 128px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95), rgba(255,255,255,0));
    opacity: 0;
    transform: rotate(var(--starry-sky-angle, -26deg));
    box-shadow:
      0 0 8px rgba(255,255,255,0.72),
      0 0 18px rgba(197, 225, 255, 0.34);
    animation: starrySkyShooting ease-in-out infinite;
    will-change: opacity, transform;
  }

  .starry-sky-shooting-star::after {
    content: "";
    position: absolute;
    right: -2px;
    top: 50%;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: white;
    transform: translateY(-50%);
    box-shadow:
      0 0 10px rgba(255,255,255,0.92),
      0 0 20px rgba(115, 206, 255, 0.36);
  }

  @keyframes starrySkyTwinkle {
    0%, 100% {
      opacity: 0.25;
      transform: scale(0.85);
    }
    50% {
      opacity: 1;
      transform: scale(1.55);
    }
  }

  @keyframes starrySkyShooting {
    0% {
      opacity: 0;
      transform: rotate(var(--starry-sky-angle, -26deg)) translate3d(0, 0, 0);
    }
    10% {
      opacity: 1;
    }
    35% {
      opacity: 1;
      transform: rotate(var(--starry-sky-angle, -26deg)) translate3d(260px, 110px, 0);
    }
    70% {
      opacity: 1;
      transform: rotate(var(--starry-sky-angle, -26deg)) translate3d(560px, 192px, 0);
    }
    100% {
      opacity: 0;
      transform: rotate(var(--starry-sky-angle, -26deg)) translate3d(840px, 168px, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .starry-sky-star,
    .starry-sky-shooting-star {
      animation: none;
    }

    .starry-sky-shooting-star {
      display: none;
    }
  }
`;function Im(e,t,n){return`${e}-${String(t+1).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`}function Lm({diaryDates:e=[],markerTypes:t={},selectedDate:n=``,displayDate:r=new Date,onChangeMonth:i,onSelectDate:a}){let o=new Date,s=r.getFullYear(),c=r.getMonth(),l=`${s} / ${String(c+1).padStart(2,`0`)}`,u=(0,w.useMemo)(()=>new Set(e),[e]),d=(0,w.useMemo)(()=>new Set(t.diaryDates??[]),[t.diaryDates]),f=(0,w.useMemo)(()=>new Set(t.tarotOnlyDates??[]),[t.tarotOnlyDates]),p=(0,w.useMemo)(()=>{let e=new Date(s,c,1).getDay(),t=new Date(s,c+1,0).getDate(),n=[];for(let t=0;t<e;t+=1)n.push(``);for(let e=1;e<=t;e+=1)n.push(e);for(;n.length<42;)n.push(``);return n},[c,s]);return(0,Z.jsx)(`div`,{className:`flex h-full w-full max-w-[640px] flex-col`,children:(0,Z.jsxs)(`aside`,{className:`flex min-h-0 flex-1 flex-col rounded-3xl bg-[#2a2f4d]/92 p-3 pb-4 shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm sm:p-5 sm:pb-6 md:p-7 md:pb-7`,children:[(0,Z.jsx)(`div`,{className:`mb-2 flex shrink-0 items-start justify-center gap-3 sm:mb-4`,children:(0,Z.jsx)(`div`,{children:(0,Z.jsx)(`h2`,{className:`text-lg font-bold tracking-[0.08em] text-[#f7f8ff] sm:text-xl`,children:l})})}),(0,Z.jsxs)(`div`,{className:`grid min-h-0 flex-1 grid-cols-7 grid-rows-[auto_repeat(6,minmax(0,1fr))] gap-1 text-center text-[0.86rem] text-slate-300 sm:gap-2 sm:text-[1rem] md:gap-3 md:text-[1.05rem]`,children:[[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`].map(e=>(0,Z.jsx)(`div`,{className:`flex min-h-5 items-center justify-center font-semibold tracking-[0.08em] sm:min-h-6`,children:e},e)),p.map((e,t)=>{let r=e===o.getDate()&&c===o.getMonth()&&s===o.getFullYear(),i=e===``?``:Im(s,c,e),l=u.has(i),p=d.has(i),m=f.has(i),h=n===i;return(0,Z.jsxs)(`button`,{type:`button`,disabled:e===``,onClick:()=>a?.(i),className:`relative isolate flex aspect-square h-full max-h-8 w-full max-w-8 items-center justify-center self-center justify-self-center rounded-full text-[0.86rem] transition sm:max-h-10 sm:max-w-10 sm:text-[1rem] md:max-h-11 md:max-w-11 md:text-[1.05rem] ${e===``?`opacity-0`:h?`bg-[#f4c2c2] text-[#2a2f4d]`:r?`calendar-today overflow-hidden text-[#2a2f4d] font-bold`:l?`font-semibold text-[#f7f8ff] hover:bg-white/8`:`text-[#f7f8ff] hover:bg-white/8`}`,children:[l&&!h?p?(0,Z.jsx)(Kp,{className:`absolute inset-1/2 -z-10 h-[108%] w-[108%] -translate-x-1/2 -translate-y-1/2 fill-[#f4c2c2]/22 text-[#ffdbe6]/55`,strokeWidth:1.25,"aria-hidden":`true`}):m?(0,Z.jsx)(am,{className:`absolute inset-1/2 -z-10 h-[94%] w-[94%] -translate-x-1/2 -translate-y-1/2 fill-white/12 text-white/30`,strokeWidth:1.2,"aria-hidden":`true`}):null:null,(0,Z.jsx)(`span`,{className:`relative z-10`,children:e})]},`${e}-${t}`)})]}),(0,Z.jsxs)(`div`,{className:`mt-2 flex shrink-0 items-center justify-between gap-3 px-1 sm:mt-3 sm:px-2`,children:[(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>i?.(-1),"aria-label":`Previous month`,className:`group relative flex h-9 w-11 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(244,194,194,0.12),rgba(216,196,255,0.16))] text-[#f7f8ff] shadow-[0_8px_18px_rgba(0,0,0,0.16),0_0_14px_rgba(244,194,194,0.12)] transition hover:-translate-y-0.5 hover:border-white/34 hover:bg-white/18 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2),0_0_20px_rgba(244,194,194,0.22)] md:h-10 md:w-12`,children:[(0,Z.jsx)(`span`,{className:`absolute left-2 top-1.5 h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]`}),(0,Z.jsx)(Vp,{className:`h-4 w-4 transition group-hover:-translate-x-0.5`})]}),(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>i?.(1),"aria-label":`Next month`,className:`group relative flex h-9 w-11 items-center justify-center rounded-full border border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(244,194,194,0.12),rgba(216,196,255,0.16))] text-[#f7f8ff] shadow-[0_8px_18px_rgba(0,0,0,0.16),0_0_14px_rgba(216,196,255,0.12)] transition hover:-translate-y-0.5 hover:border-white/34 hover:bg-white/18 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2),0_0_20px_rgba(216,196,255,0.22)] md:h-10 md:w-12`,children:[(0,Z.jsx)(`span`,{className:`absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)]`}),(0,Z.jsx)(Hp,{className:`h-4 w-4 transition group-hover:translate-x-0.5`})]})]})]})})}var Rm=(0,w.memo)(Lm);function zm({diary:e,isActive:t=!1,cardRef:n,deferImages:r=!1,onOpenEdit:i}){let[a,o]=(0,w.useState)(null),s=(0,w.useMemo)(()=>e.images?.slice(0,3)??[],[e.images]),c=Math.max((e.images?.length??0)-s.length,0),l=e.sourceType===`tarot`;return(0,Z.jsxs)(`article`,{ref:n,role:`button`,tabIndex:0,onClick:()=>i?.(e),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),i?.(e))},className:`mb-6 scroll-mt-6 rounded-2xl border border-white/8 bg-[#31385d]/92 p-6 text-inherit shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-[#383f66]/95 hover:shadow-[0_16px_34px_rgba(0,0,0,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f4c2c2] ${l?`cursor-pointer`:``} ${t?`ring-2 ring-[#f4c2c2] ring-offset-4 ring-offset-[#070b17]/40`:``}`,style:{contentVisibility:`auto`,containIntrinsicSize:`420px`},children:[(0,Z.jsxs)(`div`,{className:`mb-4 flex items-start justify-between gap-4`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h3`,{className:`text-2xl font-bold text-[#fbfcff]`,children:e.date}),e.title&&e.title!==e.date?(0,Z.jsx)(`p`,{className:`mt-2 text-sm text-slate-200`,children:e.title}):null]}),l?(0,Z.jsx)(`span`,{className:`rounded-full border border-[#f4c2c2]/30 bg-[#f4c2c2]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#ffdbe3]`,children:`Tarot`}):null]}),(0,Z.jsx)(`div`,{className:`diary-snippet max-w-none text-sm leading-7 text-[#eef1ff]`,dangerouslySetInnerHTML:{__html:e.renderedContent??e.rendered_content??``}}),!r&&s.length?(0,Z.jsx)(`div`,{className:`mt-5 grid gap-3 sm:grid-cols-3`,children:s.map((e,t)=>(0,Z.jsxs)(`button`,{type:`button`,onClick:t=>{t.stopPropagation(),o(e)},className:`relative overflow-hidden rounded-2xl text-left`,children:[(0,Z.jsx)(`img`,{src:e.url,alt:e.caption||`Diary`,loading:`lazy`,decoding:`async`,width:`480`,height:`288`,className:`h-36 w-full object-cover transition hover:scale-[1.02]`}),c>0&&t===s.length-1?(0,Z.jsxs)(`span`,{className:`absolute inset-0 flex items-center justify-center bg-black/45 text-lg font-semibold text-white`,children:[`+`,c]}):null,e.caption?(0,Z.jsx)(`span`,{className:`absolute inset-x-0 bottom-0 bg-black/45 px-3 py-2 text-xs text-white`,children:e.caption}):null]},e.id))}):null,a?(0,Z.jsx)(`div`,{className:`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6`,onClick:e=>{e.stopPropagation(),o(null)},role:`presentation`,children:(0,Z.jsxs)(`div`,{className:`max-w-3xl rounded-2xl bg-white p-4 shadow-2xl`,onClick:e=>e.stopPropagation(),children:[(0,Z.jsx)(`img`,{src:a.url,alt:a.caption||`Diary`,decoding:`async`,className:`max-h-[75vh] w-full rounded-xl object-contain`}),a.caption?(0,Z.jsx)(`p`,{className:`mt-3 text-sm text-[#2a2f4d]`,children:a.caption}):null,(0,Z.jsx)(`button`,{type:`button`,onClick:()=>o(null),className:`mt-4 rounded-full bg-[#f4c2c2] px-5 py-2 text-sm font-semibold text-[#2a2f4d]`,children:`Close`})]})}):null]})}var Bm=(0,w.memo)(zm);function Vm({diaryId:e=null,isEdit:t=!1,onSaved:n,compact:r=!1,formId:i}){let a=at(),[o,s]=(0,w.useState)(``),[c,l]=(0,w.useState)(``),[u,d]=(0,w.useState)([]),[f,p]=(0,w.useState)([]),[m,h]=(0,w.useState)(`write`),[g,_]=(0,w.useState)(``),[v,y]=(0,w.useState)(!1),[b,x]=(0,w.useState)(``),S=(0,w.useRef)(null),C=(0,w.useCallback)(()=>{let e=S.current;if(!e)return;let t=r?130:152;e.style.height=`auto`,e.style.height=`${Math.max(e.scrollHeight,t)}px`},[r]);(0,w.useEffect)(()=>{s(``),l(``),d([]),p([]),h(`write`),_(``),x(``),!(!t||!e)&&$(`/api/diaries/${e}/`).then(e=>{s(e.date??``),l(e.content??``),p(e.images??[])}).catch(e=>x(e.message||`Failed to load diary.`))},[e,t]),(0,w.useEffect)(()=>{m===`preview`&&(y(!0),$(`/api/markdown/preview/`,{method:`POST`,body:JSON.stringify({content:c})}).then(e=>_(e.html??``)).catch(e=>x(e.message||`Failed to render preview.`)).finally(()=>y(!1)))},[c,m]),(0,w.useEffect)(()=>{m===`write`&&C()},[c,m,C]);let T=(0,w.useMemo)(()=>Array.from(u).map((e,t)=>({key:`${e.name}-${e.lastModified}-${t}`,name:e.name,url:URL.createObjectURL(e)})),[u]);(0,w.useEffect)(()=>()=>{T.forEach(e=>URL.revokeObjectURL(e.url))},[T]);let E=(e,t)=>{p(n=>n.map(n=>n.id===e?{...n,caption:t}:n))},ee=(e,t)=>{p(n=>{let r=[...n],i=r.findIndex(t=>t.id===e),a=i+t;return i<0||a<0||a>=r.length?n:([r[i],r[a]]=[r[a],r[i]],r.map((e,t)=>({...e,order:t})))})},D=async e=>{if(window.confirm(`Delete this photo?`)){x(``);try{await $(`/api/diary-images/${e}/`,{method:`DELETE`}),p(t=>t.filter(t=>t.id!==e))}catch(e){x(e.message||`Failed to delete photo.`)}}},te=async()=>{!t||!e||f.length===0||(await Promise.all(f.map((e,t)=>$(`/api/diary-images/${e.id}/`,{method:`PATCH`,body:JSON.stringify({caption:e.caption??``,order:t})}))),await $(`/api/diaries/${e}/images/reorder/`,{method:`POST`,body:JSON.stringify({imageIds:f.map(e=>e.id)})}))},ne=async()=>{if(!t||!e||u.length===0)return;let n=new FormData;return Array.from(u).forEach(e=>{n.append(`images`,e)}),$(`/api/diaries/${e}/images/`,{method:`POST`,body:n})};return(0,Z.jsxs)(`form`,{id:i,onSubmit:async r=>{r.preventDefault(),x(``);try{let r=null;if(t)r=await $(`/api/diaries/${e}/`,{method:`PUT`,body:JSON.stringify({date:o,content:c})}),await te(),u.length>0&&(r=await ne());else{let e=new FormData;e.append(`date`,o),e.append(`content`,c),Array.from(u).forEach(t=>{e.append(`images`,t)}),r=await $(`/api/diaries/`,{method:`POST`,body:e})}n?.(r)}catch(e){if(e.message===`Login required`){a(`/login`);return}x(e.message||`Failed to save diary.`)}},className:`rounded-2xl border border-white/8 bg-[#31385d]/92 text-[#f7f8ff] shadow-[0_12px_30px_rgba(0,0,0,0.16)] backdrop-blur-sm ${r?`p-4 md:p-5`:`p-6 md:p-8`}`,children:[b?(0,Z.jsx)(`p`,{className:`mb-4 text-sm text-[#ffd7e0]`,children:b}):null,(0,Z.jsxs)(`div`,{className:`mb-5`,children:[(0,Z.jsxs)(`label`,{className:`mb-2 flex items-center gap-2 text-sm font-semibold text-[#f7f8ff]`,children:[(0,Z.jsx)(Rp,{className:`h-4 w-4`}),`Date`]}),(0,Z.jsx)(`input`,{type:`date`,value:o,onChange:e=>s(e.target.value),className:`w-full rounded-3xl border border-white/10 bg-[#2a3050] px-4 py-3 text-[#f7f8ff] outline-none focus:border-white/25`})]}),(0,Z.jsxs)(`div`,{className:`mb-6`,children:[(0,Z.jsxs)(`div`,{className:`mb-3 flex items-center justify-between gap-3`,children:[(0,Z.jsx)(`label`,{className:`block text-sm font-semibold text-[#f7f8ff]`,children:`Markdown Content`}),(0,Z.jsxs)(`div`,{className:`inline-flex rounded-full border border-white/10 bg-[#2a3050] p-1`,children:[(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>h(`write`),className:`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${m===`write`?`bg-[#f4c2c2] text-[#2a2f4d]`:`text-[#f7f8ff]`}`,children:[(0,Z.jsx)(em,{className:`h-3.5 w-3.5`}),`Write`]}),(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>h(`preview`),className:`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs ${m===`preview`?`bg-[#f4c2c2] text-[#2a2f4d]`:`text-[#f7f8ff]`}`,children:[(0,Z.jsx)(Gp,{className:`h-3.5 w-3.5`}),`Preview`]})]})]}),m===`write`?(0,Z.jsx)(`textarea`,{ref:S,value:c,onChange:e=>l(e.target.value),placeholder:`# 今日の記録

- できごと:
- 気づき:

ここに今日の出来事を書いてください。`,className:`w-full resize-none overflow-hidden rounded-3xl border border-white/10 bg-[#2a3050] px-4 py-3 text-[#f7f8ff] outline-none placeholder:text-slate-400 focus:border-white/25`}):(0,Z.jsx)(`div`,{className:`min-h-[320px] rounded-3xl border border-white/10 bg-[#2a3050] px-4 py-3`,children:v?(0,Z.jsx)(`p`,{className:`text-sm text-slate-300`,children:`Rendering preview...`}):(0,Z.jsx)(`div`,{className:`diary-markdown text-sm leading-7 text-[#f7f8ff]`,dangerouslySetInnerHTML:{__html:g}})})]}),(0,Z.jsxs)(`div`,{className:`mb-6`,children:[(0,Z.jsxs)(`label`,{className:`mb-2 flex items-center gap-2 text-sm font-semibold text-[#f7f8ff]`,children:[(0,Z.jsx)(qp,{className:`h-4 w-4`}),`Photos`]}),(0,Z.jsx)(`input`,{type:`file`,accept:`image/*`,multiple:!0,onChange:e=>d(e.target.files??[]),className:`w-full rounded-3xl border border-white/10 bg-[#2a3050] px-4 py-3 text-[#f7f8ff] outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[#f4c2c2] file:px-4 file:py-2 file:text-[#2a2f4d]`}),(f.length>0||T.length>0)&&(0,Z.jsxs)(`div`,{className:`mt-4 grid gap-4 ${r?``:`sm:grid-cols-2`}`,children:[f.map((e,t)=>(0,Z.jsxs)(`div`,{className:`rounded-2xl border border-white/10 bg-[#2a3050] p-3`,children:[(0,Z.jsx)(`img`,{src:e.url,alt:e.caption||`Diary`,loading:`lazy`,decoding:`async`,className:`h-32 w-full rounded-2xl object-cover`}),(0,Z.jsx)(`input`,{value:e.caption??``,onChange:t=>E(e.id,t.target.value),placeholder:`Caption`,className:`mt-3 w-full rounded-full border border-white/10 bg-[#20253d] px-3 py-2 text-sm text-[#f7f8ff] outline-none placeholder:text-slate-400`}),(0,Z.jsxs)(`div`,{className:`mt-3 flex flex-wrap gap-2`,children:[(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>ee(e.id,-1),disabled:t===0,className:`inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#20253d] px-3 py-2 text-xs text-[#f7f8ff] disabled:opacity-40`,children:[(0,Z.jsx)(Up,{className:`h-3.5 w-3.5`}),`Up`]}),(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>ee(e.id,1),disabled:t===f.length-1,className:`inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#20253d] px-3 py-2 text-xs text-[#f7f8ff] disabled:opacity-40`,children:[(0,Z.jsx)(Bp,{className:`h-3.5 w-3.5`}),`Down`]}),(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>D(e.id),className:`inline-flex items-center gap-1 rounded-full border border-white/10 bg-[#20253d] px-3 py-2 text-xs text-[#ffd7e0]`,children:[(0,Z.jsx)(om,{className:`h-3.5 w-3.5`}),`Delete`]})]})]},e.id)),T.map(e=>(0,Z.jsxs)(`div`,{className:`rounded-2xl border border-white/10 bg-[#2a3050] p-3`,children:[(0,Z.jsx)(`img`,{src:e.url,alt:e.name,loading:`lazy`,decoding:`async`,className:`h-32 w-full rounded-2xl object-cover`}),(0,Z.jsx)(`p`,{className:`mt-2 truncate text-xs text-slate-300`,children:e.name})]},e.key))]})]})]})}var Hm=12,Um=220,Wm=460,Gm={initial:{opacity:0,filter:`blur(12px)`,scale:.985},animate:{opacity:1,filter:`blur(0px)`,scale:1},exit:{opacity:0,filter:`blur(12px)`,scale:.985},transition:{duration:.46,ease:`easeInOut`}},Km=(e=``)=>String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`),qm=e=>{let t=new Date(e);return Number.isNaN(t.getTime())?``:`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`},Jm=e=>{let t=qm(e.createdAt??e.created_at),n=e.cards?.map(e=>e.cardName??e.card_name).filter(Boolean)??[],r=e.question||`Untitled reading`,i=e.aiInterpretation||e.ai_interpretation||``,a=e.memo||``,o=n.length?n.join(` / `):`No cards recorded`,s=`
    <p><strong>Tarot Reading</strong></p>
    <p>${Km(r)}</p>
    <p><small>${Km(o)}</small></p>
    ${i?`<p>${Km(i).replace(/\n/g,`<br />`)}</p>`:``}
    ${a?`<p><strong>Memo</strong><br />${Km(a).replace(/\n/g,`<br />`)}</p>`:``}
  `;return{id:`tarot-${e.id}`,sourceType:`tarot`,tarotReadingId:e.id,date:t,sortDateTime:e.createdAt??e.created_at??t,title:`Tarot: ${r}`,renderedContent:s,rendered_content:s,images:[],cards:e.cards??[]}};function Ym({authReady:e=!0,diaryId:t=null,isEdit:n=!1,forceEditor:r=!1,initialPageIndex:i=0}){return(0,Z.jsx)(Xm,{authReady:e,diaryId:t,isEdit:n,forceEditor:r,initialPageIndex:i})}function Xm({authReady:e=!0,diaryId:t=null,isEdit:n=!1,forceEditor:r=!1,initialPageIndex:i=0,initialSelectedDate:a=``,embedded:o=!1,onExitToBook:s,onPageStateChange:c,onOpenTarotReading:l}){let u=at(),d=nt(),f=o?a:d.state?.selectedDate??``,[p,m]=(0,w.useState)([]),[h,g]=(0,w.useState)(!0),[_,v]=(0,w.useState)(``),[y,b]=(0,w.useState)(``),[x,S]=(0,w.useState)(f),[C,T]=(0,w.useState)(()=>{if(!f)return new Date;let e=new Date(`${f}T00:00:00`);return Number.isNaN(e.getTime())?new Date:e}),[E,ee]=(0,w.useState)(()=>r||t||n?2:i),[D,te]=(0,w.useState)(Hm),[ne,re]=(0,w.useState)(!1),[ie,ae]=(0,w.useState)(null),[oe,se]=(0,w.useState)(null),O=(0,w.useRef)(null),k=(0,w.useRef)(null),ce=(0,w.useRef)(null);(0,w.useEffect)(()=>{Promise.all([$(`/api/diaries/`),$(`/api/tarot/readings/`).then(e=>e.readings??[]).catch(()=>[])]).then(([e,t])=>{let n=Array.isArray(e)?e.map(e=>({...e,sourceType:`diary`,sortDateTime:e.date})):[],r=t.map(Jm).filter(e=>e.date);m([...n,...r])}).catch(e=>v(e.message||`Failed to load diaries.`)).finally(()=>g(!1))},[]),(0,w.useEffect)(()=>{if(!ie||E!==ie.targetPageIndex)return;let e=window.setTimeout(()=>{o||u(ie.route,ie.state),ae(null)},Wm);return()=>{window.clearTimeout(e)}},[o,u,E,ie]),(0,w.useEffect)(()=>{if(!(!oe||E!==2)&&!o)return ce.current=window.setTimeout(()=>{u(oe.route,x?{state:{selectedDate:x}}:void 0)},Wm),()=>{ce.current&&=(window.clearTimeout(ce.current),null)}},[oe,o,u,E,x]),(0,w.useEffect)(()=>{if(E!==1||h||_)return;let e=window.setTimeout(()=>{re(!0)},Um);return()=>{window.clearTimeout(e)}},[_,h,E]);let le=(0,w.useMemo)(()=>[...new Set(p.filter(e=>e.sourceType===`diary`).map(e=>e.date).filter(Boolean))],[p]),ue=(0,w.useMemo)(()=>{let e=new Set(le);return[...new Set(p.filter(t=>t.sourceType===`tarot`&&t.date&&!e.has(t.date)).map(e=>e.date))]},[p,le]),de=(0,w.useMemo)(()=>[...new Set([...le,...ue])],[le,ue]),fe=(0,w.useMemo)(()=>({diaryDates:le,tarotOnlyDates:ue}),[le,ue]),A=(0,w.useMemo)(()=>[...p].sort((e,t)=>new Date(t.sortDateTime||t.date||0).getTime()-new Date(e.sortDateTime||e.date||0).getTime()),[p]),pe=(0,w.useMemo)(()=>{if(!x)return-1;let e=A.findIndex(e=>e.date===x);if(e>=0)return e;let t=A.findIndex(e=>e.date&&e.date<=x);return t>=0?t:A.length>0?A.length-1:-1},[x,A]),me=(0,w.useMemo)(()=>pe<0?D:Math.max(D,pe+Hm),[pe,D]),he=(0,w.useMemo)(()=>A.slice(0,me),[A,me]),ge=me<A.length,_e=(0,w.useCallback)(()=>{let e=O.current,t=k.current;if(!e||!t)return!1;let n=e.scrollTop+t.getBoundingClientRect().top-e.getBoundingClientRect().top;return e.scrollTo({top:n,behavior:`auto`}),!0},[]);(0,w.useLayoutEffect)(()=>{E!==1||pe<0||_e()},[E,pe,_e,me]),(0,w.useEffect)(()=>{if(E!==1||pe<0||h||_)return;let e=0,t=[],n=n=>{let r=window.setTimeout(()=>{e=window.requestAnimationFrame(()=>{_e()})},n);t.push(r)};return n(0),n(ne?240:520),()=>{t.forEach(e=>window.clearTimeout(e)),e&&window.cancelAnimationFrame(e)}},[_,ne,h,E,pe,_e,me]);let ve=oe?.diaryId??t,ye=p.find(e=>String(e.id)===String(ve)),j=n?`Edit Diary`:`Add Your Journal`,M=`diary-editor-form`,be=(0,w.useCallback)(()=>{if(o){s?.();return}u(`/bookdesign`,{state:{page:1}})},[o,u,s]),xe=(0,w.useCallback)(()=>{re(!1),ae({route:`/diary/list`,targetPageIndex:1,state:x?{selectedDate:x}:void 0}),ee(1)},[x]),Se=(0,w.useCallback)(()=>{ae({route:`/diary`,targetPageIndex:0,state:void 0}),ee(0)},[]),N=(0,w.useCallback)(()=>{re(!1),ae({route:`/diary/list`,targetPageIndex:1,state:x?{selectedDate:x}:void 0}),ee(1)},[x]),P=(0,w.useCallback)((e,t=null)=>{ce.current&&=(window.clearTimeout(ce.current),null),se({route:e,diaryId:t}),ee(2)},[]),F=(0,w.useCallback)(e=>{b(``),S(e),re(!1);let t=A.findIndex(t=>t.date===e),n=t>=0?t:A.findIndex(t=>t.date&&t.date<=e);te(n>=0?Math.max(Hm,n+Hm):Hm),ae({route:`/diary/list`,targetPageIndex:1,state:{selectedDate:e}}),ee(1)},[A]),Ce=(0,w.useCallback)(e=>{b(``),T(t=>{let n=new Date(t);return n.setMonth(t.getMonth()+e,1),n})},[]),we=(0,w.useCallback)(e=>{let t=e?.date||x||``;if(t&&S(t),re(!1),se(null),ae({route:`/diary/list`,targetPageIndex:1,state:t?{selectedDate:t}:void 0}),ee(1),!o){if(t){u(`/diary/list`,{state:{selectedDate:t}});return}u(`/diary/list`)}},[o,u,x]),I=(0,w.useCallback)(e=>{if(e?.sourceType===`tarot`){if(o&&l){l(e);return}u(`/tarot/readings/${e.tarotReadingId}`);return}P(`/diary/${e.id}/edit`,e.id)},[o,P,u,l]),Te=(0,w.useCallback)(()=>{te(e=>Math.max(e,me)+Hm)},[me]);(0,w.useEffect)(()=>{o&&c?.({pageIndex:E,canGoBack:E>0,canGoForward:E<1,goBack:E===0?be:E===1?Se:xe,goForward:E===0?N:null})},[o,be,Se,xe,N,c,E]);let Ee=(0,Z.jsxs)(Z.Fragment,{children:[o?null:(0,Z.jsx)(hm,{variant:`hero`,animated:!0}),o?null:(0,Z.jsx)(`div`,{className:`absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(196,136,255,0.16),transparent_26%),radial-gradient(circle_at_82%_16%,rgba(126,214,255,0.14),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(117,138,255,0.12),transparent_28%),linear-gradient(180deg,rgba(7,11,23,0.1),rgba(7,11,23,0.88))]`}),o?null:(0,Z.jsx)(Pm,{}),(0,Z.jsx)(`div`,{className:o?`diary-embedded-stage`:`relative z-10 flex min-h-screen items-center justify-center px-4 py-6 md:px-6`,children:(0,Z.jsxs)(`div`,{className:`diary-book-shell ${o?`diary-book-shell-embedded`:``}`,children:[(0,Z.jsx)(`div`,{className:`diary-book-spine`}),(0,Z.jsx)(`div`,{className:`diary-book-page-stack`,children:(0,Z.jsxs)(Od,{mode:`wait`,initial:!1,children:[E===0?(0,Z.jsx)(Tp.section,{...Gm,className:`diary-page diary-page-calendar`,children:(0,Z.jsxs)(`div`,{className:`diary-page-inner`,children:[(0,Z.jsx)(`div`,{className:`diary-page-topbar`,children:(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h2`,{className:`reading-title`,children:`CALENDAR`}),(0,Z.jsx)(`p`,{className:`reading-subtitle`,children:`Diary / Calendar`})]})}),(0,Z.jsx)(`div`,{className:`diary-sheet diary-sheet-calendar`,children:(0,Z.jsx)(Rm,{diaryDates:de,markerTypes:fe,selectedDate:x,displayDate:C,onChangeMonth:Ce,onSelectDate:F})}),(0,Z.jsxs)(`div`,{className:`diary-page-nav diary-page-nav-calendar`,children:[(0,Z.jsx)(`button`,{type:`button`,className:`diary-nav-button`,onClick:be,children:(0,Z.jsx)(Fp,{className:`h-4 w-4`})}),(0,Z.jsxs)(`button`,{type:`button`,className:`diary-nav-button`,onClick:N,children:[(0,Z.jsx)(`span`,{children:`LIST`}),(0,Z.jsx)(Fp,{className:`h-4 w-4 rotate-180`})]})]})]})},`calendar`):null,E===1?(0,Z.jsx)(Tp.section,{...Gm,className:`diary-page diary-page-list`,children:(0,Z.jsxs)(`div`,{className:`diary-page-inner`,children:[(0,Z.jsx)(`div`,{className:`diary-page-topbar`,children:(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h2`,{className:`reading-title`,children:x||`All entries`}),(0,Z.jsx)(`p`,{className:`reading-subtitle`,children:`Diary / Entries`}),(0,Z.jsx)(`p`,{className:`diary-page-caption`,children:x?`Jumped back to: ${x}`:`Browse your archive and open any card to edit it.`})]})}),(0,Z.jsx)(`div`,{className:`diary-sheet diary-sheet-list`,children:(0,Z.jsxs)(`div`,{ref:O,className:`diary-list-scroll`,children:[h||!e?(0,Z.jsx)(`p`,{className:`diary-muted`,children:`Loading...`}):null,_?(0,Z.jsx)(`p`,{className:`diary-error`,children:_}):null,y?(0,Z.jsx)(`p`,{className:`diary-notice`,children:y}):null,!h&&!_&&he.length>0?he.map(e=>(0,Z.jsx)(Bm,{diary:e,cardRef:e.id===A[pe]?.id?k:void 0,deferImages:!ne,onOpenEdit:I},e.id)):null,!h&&!_&&ge?(0,Z.jsx)(`button`,{type:`button`,className:`diary-more-button`,onClick:Te,children:`MORE`}):null,!h&&!_&&A.length===0?(0,Z.jsx)(`div`,{className:`diary-empty`,children:`No diary entries yet.`}):null]})}),(0,Z.jsxs)(`div`,{className:`diary-page-nav diary-page-nav-list`,children:[(0,Z.jsx)(`button`,{type:`button`,className:`diary-nav-button`,onClick:Se,children:(0,Z.jsx)(Fp,{className:`h-4 w-4`})}),(0,Z.jsxs)(`button`,{type:`button`,className:`diary-add-button`,onClick:()=>P(`/diary/new`),children:[(0,Z.jsx)(`span`,{children:`+ADD`}),(0,Z.jsx)(Ip,{className:`h-4 w-4`})]})]})]})},`list`):null,E===2?(0,Z.jsx)(Tp.section,{...Gm,className:`diary-page diary-page-editor`,children:(0,Z.jsxs)(`div`,{className:`diary-page-inner`,children:[(0,Z.jsx)(`div`,{className:`diary-page-topbar`,children:(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h2`,{className:`reading-title`,children:ye?.date??j}),(0,Z.jsx)(`p`,{className:`reading-subtitle`,children:`Diary / Edit`})]})}),(0,Z.jsx)(`div`,{className:`diary-sheet diary-sheet-editor`,children:(0,Z.jsx)(Vm,{formId:M,diaryId:ve,isEdit:!!ve||n,compact:!0,onSaved:we})}),(0,Z.jsxs)(`div`,{className:`diary-page-nav diary-page-nav-editor`,children:[(0,Z.jsxs)(`button`,{type:`button`,className:`diary-nav-button`,onClick:xe,children:[(0,Z.jsx)(Fp,{className:`h-4 w-4`}),(0,Z.jsx)(`span`,{children:`LIST`})]}),(0,Z.jsxs)(`button`,{type:`submit`,form:M,className:`diary-add-button`,children:[(0,Z.jsx)(`span`,{children:n||ve?`UPDATE`:`SAVE`}),(0,Z.jsx)(nm,{className:`h-4 w-4`})]})]})]})},`editor`):null]})}),(0,Z.jsx)(`div`,{className:`diary-book-glow`})]})}),(0,Z.jsx)(`style`,{children:`
        .diary-embedded-stage {
          position: relative;
          z-index: 2;
          height: 100%;
          min-height: 0;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }

        .diary-book-shell {
          position: relative;
          width: min(760px, calc(100vw - 28px));
          min-height: min(90vh, 900px);
          perspective: 1600px;
        }

        .diary-book-shell-embedded {
          width: 100%;
          min-height: 100%;
          perspective: none;
        }

        .diary-book-shell-embedded .diary-book-spine,
        .diary-book-shell-embedded .diary-book-glow {
          display: none;
        }

        .diary-book-spine {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 34px;
          border-radius: 8px;
          background:
            radial-gradient(circle at 10% 10%, #ffffff 1px, transparent 2px),
            radial-gradient(circle at 25% 25%, #aeefff 1.5px, transparent 3px),
            radial-gradient(circle at 40% 15%, #ffd6ff 2px, transparent 4px),
            radial-gradient(circle at 60% 30%, #ffffff 1px, transparent 2px),
            radial-gradient(circle at 80% 20%, #c8b6ff 1.5px, transparent 3px),
            radial-gradient(circle at 15% 60%, #ffffff 2px, transparent 4px),
            radial-gradient(circle at 35% 75%, #aeefff 1px, transparent 2px),
            radial-gradient(circle at 55% 85%, #ffd6ff 1.5px, transparent 3px),
            radial-gradient(circle at 75% 70%, #ffffff 2px, transparent 4px),
            radial-gradient(circle at 90% 50%, #c8b6ff 1px, transparent 2px),
            linear-gradient(to bottom, rgba(120,150,255,0.42), rgba(180,120,255,0.62));
          box-shadow:
            0 0 12px rgba(140, 160, 255, 0.55),
            inset 0 0 6px rgba(255,255,255,0.2);
          animation: spineSparkle 3s ease-in-out infinite alternate;
          z-index: 2;
        }

        .diary-book-spine::after {
          content: "";
          position: absolute;
          left: 27px;
          top: 0;
          bottom: 0;
          width: 10px;
          background: linear-gradient(to right, rgba(0,0,0,0.22), rgba(255,255,255,0.10));
        }

        .diary-book-page-stack {
          position: relative;
          min-height: min(90vh, 900px);
          padding-left: 34px;
        }

        .diary-book-shell-embedded .diary-book-page-stack {
          min-height: 100%;
          padding-left: 0;
        }

        .diary-page {
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background:
            radial-gradient(circle at top left, rgba(143, 168, 255, 0.12), transparent 26%),
            linear-gradient(135deg, rgba(31, 34, 56, 0.96), rgba(42, 47, 77, 0.96));
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow:
            0 18px 42px rgba(0,0,0,0.32),
            inset 0 1px 0 rgba(255,255,255,0.06);
          overflow: hidden;
          transform-origin: left center;
          backface-visibility: hidden;
        }

        .diary-book-shell-embedded .diary-page {
          border: 0;
          border-radius: 16px;
          background: transparent;
          box-shadow: none;
        }

        .diary-book-shell-embedded .diary-page-inner {
          padding: 18px 20px 58px 22px;
        }

        .diary-book-shell-embedded .diary-page-list .diary-page-inner {
          padding: 18px 20px 58px 22px;
        }

        .diary-book-shell-embedded .diary-page-calendar .diary-page-inner {
          padding: 18px 20px 58px 22px;
        }

        .diary-book-shell-embedded .diary-page-editor .diary-page-inner {
          padding: 18px 20px 58px 22px;
        }

        .diary-book-shell-embedded .diary-page-topbar {
          margin-bottom: 8px;
        }

        .diary-book-shell-embedded .diary-page-nav {
          left: 22px;
          right: 20px;
          bottom: 6px;
        }

        .diary-book-shell-embedded .diary-page-nav .diary-nav-button {
          display: none;
        }

        .diary-book-shell-embedded .diary-page-nav {
          justify-content: flex-end;
        }

        .diary-book-shell-embedded .diary-sheet-calendar,
        .diary-book-shell-embedded .diary-sheet-list {
          margin-bottom: 8px;
        }

        .diary-page-inner {
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 32px 40px 76px 44px;
        }

        .diary-page-list .diary-page-inner {
          padding-top: 40px;
          padding-bottom: 92px;
        }

        .diary-page-calendar .diary-page-inner {
          padding-top: 44px;
          padding-bottom: 96px;
        }

        .diary-page-editor .diary-page-inner {
          padding-bottom: 88px;
        }

        .diary-page-editor .diary-page-topbar {
          margin-bottom: 10px;
        }

        .diary-page-topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 14px;
        }

        .reading-title {
          margin: 0 0 12px;
          padding-left: 12px;
          border-left: 4px solid #8fa8ff;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #f7f8ff;
          text-shadow: 0 0 10px rgba(180, 190, 255, 0.24);
          flex-shrink: 0;
        }

        .reading-subtitle {
          margin: 0;
          padding-left: 12px;
          font-size: 13px;
          letter-spacing: 0.16em;
          color: rgba(220, 228, 255, 0.72);
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .diary-page-caption {
          margin: 10px 0 0;
          max-width: 36rem;
          font-size: 14px;
          line-height: 1.8;
          color: rgba(220, 228, 255, 0.75);
        }

        .diary-page-nav {
          position: absolute;
          left: 44px;
          right: 10px;
          bottom: 24px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          pointer-events: none;
          z-index: 10;
        }

        .diary-page-nav .diary-nav-button,
        .diary-page-nav .diary-add-button {
          pointer-events: auto;
        }

        .diary-nav-button,
        .diary-add-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 46px;
          padding: 0 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          color: #f5f7ff;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 10px 24px rgba(0,0,0,0.18);
          cursor: pointer;
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease,
            filter 180ms ease;
          white-space: nowrap;
        }

        .diary-nav-button:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.34);
          transform: translateY(-1px);
          filter: brightness(1.12);
          box-shadow:
            0 14px 28px rgba(0,0,0,0.22),
            0 0 0 1px rgba(255,255,255,0.18) inset,
            0 0 18px rgba(255,255,255,0.16);
        }

        .diary-add-button:hover {
          background: linear-gradient(135deg, #f8dede, #ece3ff);
          transform: translateY(-1px);
          filter: brightness(1.04);
          box-shadow:
            0 14px 28px rgba(0,0,0,0.22),
            0 0 0 1px rgba(255,255,255,0.16) inset,
            0 0 18px rgba(255,255,255,0.12);
        }

        .diary-nav-button:active,
        .diary-add-button:active {
          transform: translateY(0);
          filter: brightness(0.98);
        }

        .diary-add-button {
          background: linear-gradient(135deg, #f4c2c2, #d8c4ff);
          color: #2c2036;
          border-color: rgba(255,255,255,0.18);
          font-weight: 700;
        }

        .diary-sheet {
          flex: 1;
          min-height: 0;
          border-radius: 22px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
          overflow: hidden;
        }

        .diary-sheet-calendar {
          display: flex;
          align-items: stretch;
          justify-content: center;
          padding: 10px 12px;
          margin-bottom: 18px;
          border: none;
          box-shadow: none;
          background: transparent;
        }

        .diary-sheet-list {
          display: flex;
          flex-direction: column;
          padding: 14px 14px 4px;
          margin-bottom: 18px;
          border: none;
          box-shadow: none;
          background: transparent;
        }

        .diary-sheet-editor {
          padding: 8px 14px 14px;
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          border: none;
          box-shadow: none;
          background: transparent;
        }

        .diary-sheet-editor::-webkit-scrollbar {
          display: none;
        }

        .diary-list-scroll {
          height: 100%;
          min-height: 0;
          overflow-y: auto;
          padding-right: 10px;
          padding-bottom: 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .diary-list-scroll::-webkit-scrollbar {
          display: none;
        }

        .diary-muted,
        .diary-notice,
        .diary-error,
        .diary-empty {
          margin: 0 0 16px;
          padding: 12px 16px;
          border-radius: 16px;
          background: rgba(255,255,255,0.08);
          color: rgba(245,247,255,0.84);
        }

        .diary-error {
          background: rgba(167, 70, 93, 0.2);
          color: #ffdce4;
        }

        .diary-notice {
          background: rgba(244, 194, 194, 0.18);
          color: #f8e7f0;
        }

        .diary-empty {
          text-align: center;
          padding: 22px 16px;
        }

        .diary-more-button {
          display: flex;
          width: min(220px, 100%);
          height: 44px;
          align-items: center;
          justify-content: center;
          margin: 4px auto 20px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.1);
          color: #f5f7ff;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease;
        }

        .diary-more-button:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.18);
          box-shadow:
            0 14px 28px rgba(0,0,0,0.18),
            0 0 0 1px rgba(255,255,255,0.14) inset;
        }

        .diary-page-footer {
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        .diary-footer-note {
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(220, 228, 255, 0.64);
        }

        .diary-book-glow {
          position: absolute;
          inset: auto 18% 10% 18%;
          height: 140px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(255,255,255,0.18), rgba(123,165,255,0.06) 42%, transparent 72%);
          filter: blur(24px);
          opacity: 0.55;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 768px) {
          .diary-book-shell {
            width: min(100vw - 12px, 760px);
            min-height: calc(100vh - 28px);
          }

          .diary-book-page-stack {
            min-height: calc(100vh - 28px);
            padding-left: 34px;
          }

          .diary-book-shell-embedded {
            width: 100%;
            min-height: 100%;
          }

          .diary-book-shell-embedded .diary-book-page-stack {
            min-height: 100%;
            padding-left: 0;
          }

          .diary-book-shell-embedded .diary-page-inner,
          .diary-book-shell-embedded .diary-page-list .diary-page-inner,
          .diary-book-shell-embedded .diary-page-calendar .diary-page-inner,
          .diary-book-shell-embedded .diary-page-editor .diary-page-inner {
            padding: 14px 12px 66px 14px;
          }

          .diary-book-shell-embedded .diary-page-nav {
            left: 14px;
            right: 12px;
            bottom: 6px;
          }

          .diary-book-spine {
            left: 0;
          }

          .diary-page-inner {
            padding: 24px 16px 72px 20px;
          }

          .diary-page-list .diary-page-inner {
            padding-top: 32px;
            padding-bottom: 60px;
          }

          .diary-page-calendar .diary-page-inner {
            padding-top: 26px;
            padding-bottom: 72px;
          }

          .diary-page-editor .diary-page-inner {
            padding-bottom: 58px;
          }

          .diary-page-editor .diary-page-topbar {
            margin-bottom: 8px;
          }

          .diary-page-topbar {
            flex-direction: column;
          }

          .diary-page-nav {
            left: 20px;
            right: 10px;
            bottom: 14px;
          }

          .diary-sheet-editor {
            padding: 8px 14px 14px;
          }

          .diary-sheet-calendar {
            padding: 8px;
            margin-bottom: 10px;
          }

          .diary-sheet-list {
            margin-bottom: 10px;
          }
        }
      `})]});return o?Ee:(0,Z.jsx)(`div`,{className:`relative isolate min-h-screen overflow-hidden bg-[#070b17] text-white`,children:Ee})}var Zm=[`✦`,`✧`,`ᚠ`,`ᛟ`,`ᛉ`,`⟡`,`⋆`,`☾`],Qm=[`✦`,`✧`,`ᚠ`,`ᛟ`,`ᛉ`,`⟡`,`✺`],$m=[`#fff8fb`,`#f1b8cf`,`#d8c4ff`,`#f6d37c`,`#ffcadf`,`#f4e6ff`];function eh(e,t){return Math.random()*(t-e)+e}function th({children:e,user:t,wide:n=!1,spellEffects:r=!1,compactHeader:i=!0,backgroundVariant:a=`base`,headerVariant:o=`pink`,hideAuthActions:s=!1,hideHeader:c=!1,hideBackground:l=!1}){let[u,d]=(0,w.useState)(!1),[f,p]=(0,w.useState)(!1),[m,h]=(0,w.useState)([]),g=at(),_=async()=>{await $(`/api/auth/logout/`,{method:`POST`,body:`{}`}),p(!1),d(!1),g(`/diary/warp`,{state:{target:`/thank-you`,reloadAfter:!0,warpMode:`collapse`}})};(0,w.useEffect)(()=>{if(!r)return;let e,t,n=!0,i=(e=0)=>{t=window.setTimeout(()=>{if(!n)return;let e={id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,glyph:Qm[Math.floor(Math.random()*Qm.length)],x:eh(8,90),y:eh(10,84),color:$m[Math.floor(Math.random()*$m.length)],size:eh(1.2,2.9),duration:eh(1200,2e3),angle:eh(-32,32)};h(t=>[...t.slice(-12),e]),window.setTimeout(()=>{n&&h(t=>t.filter(t=>t.id!==e.id))},e.duration)},e)},a=()=>{let t=eh(1400,3400);e=window.setTimeout(()=>{n&&(i(0),i(360),a())},t)};return i(0),i(320),a(),()=>{n=!1,window.clearTimeout(e),window.clearTimeout(t)}},[r]);let v=o===`cosmic`,y=v?`sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#1a1026]/18 via-[#2a1530]/14 to-[#1a1026]/18 shadow-sm backdrop-blur-2xl`:`sticky top-0 z-50 border-b border-[#cfabc0] bg-gradient-to-r from-[#c98ca8] via-[#ddb0c0] to-[#dca5b6] shadow-sm`,b=v?`font-bold tracking-wide text-[#efe8ff] transition hover:text-white ${i?`text-lg md:text-xl`:`text-xl`}`:`font-bold tracking-wide text-[#4b3850] transition hover:text-[#7b5b70] ${i?`text-lg md:text-xl`:`text-xl`}`,x=v?`inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 text-base text-[#f4eeff] transition hover:bg-white/14 ${i?`px-4 py-2`:`px-5 py-2.5`}`:`inline-flex items-center gap-2 rounded-full border border-[#d7a4bb] bg-white/72 text-base text-[#4b3850] transition hover:bg-white ${i?`px-4 py-2`:`px-5 py-2.5`}`,S=v?`inline-flex items-center gap-2 rounded-full bg-white/88 text-base font-medium text-[#312040] transition hover:bg-white ${i?`px-4 py-2`:`px-5 py-2.5`}`:`inline-flex items-center gap-2 rounded-full bg-[#e7b2c5] text-base font-medium text-[#4b3850] transition hover:bg-[#d999b2] ${i?`px-4 py-2`:`px-5 py-2.5`}`,C=v?`border-t border-white/10 bg-[#171024] px-6 ${i?`py-3`:`py-4`} md:hidden`:`border-t border-[#d7a4bb] bg-[#f3e2eb] px-6 ${i?`py-3`:`py-4`} md:hidden`;return(0,Z.jsxs)(`div`,{className:`relative min-h-screen bg-[#070b17] text-[#eae5f6]`,children:[l?null:(0,Z.jsx)(hm,{variant:a}),c?null:(0,Z.jsxs)(`header`,{className:y,children:[(0,Z.jsxs)(`div`,{className:`mx-auto flex max-w-6xl items-center justify-between px-6 ${i?`py-3 md:px-8 md:py-3`:`py-4 md:px-10`}`,children:[(0,Z.jsx)(R,{to:`/`,className:b,children:`Daily Witchcrafts`}),!s&&(0,Z.jsx)(`div`,{className:`hidden items-center gap-4 md:flex`,children:t?(0,Z.jsxs)(`div`,{className:`relative`,children:[(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>p(e=>!e),className:x,children:[t.iconUrl?(0,Z.jsx)(`img`,{src:t.iconUrl,alt:t.username??`user icon`,className:i?`h-9 w-9 rounded-full object-cover`:`h-10 w-10 rounded-full object-cover`}):(0,Z.jsx)(`div`,{className:`flex items-center justify-center rounded-full bg-[#e7b2c5] text-[#4b3850] ${i?`h-9 w-9`:`h-10 w-10`}`,children:(0,Z.jsx)(cm,{className:`h-5 w-5`})}),(0,Z.jsx)(`span`,{className:`max-w-[140px] truncate text-sm text-[#4b3850]`,children:t.username})]}),f&&(0,Z.jsxs)(`div`,{className:`absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-[#d7a4bb] bg-[#fff8fb] shadow-2xl`,children:[(0,Z.jsxs)(R,{to:`/profile`,className:`flex items-center gap-3 px-4 py-3 text-sm text-[#4b3850] transition hover:bg-[#f8edf2]`,onClick:()=>p(!1),children:[(0,Z.jsx)(cm,{className:`h-4 w-4`}),`PROFILE`]}),(0,Z.jsxs)(R,{to:`/diary/list`,className:`flex items-center gap-3 px-4 py-3 text-sm text-[#4b3850] transition hover:bg-[#f8edf2]`,onClick:()=>p(!1),children:[(0,Z.jsx)(Lp,{className:`h-4 w-4`}),`RECORDS`]}),(0,Z.jsxs)(R,{to:`/tarot`,className:`flex items-center gap-3 px-4 py-3 text-sm text-[#4b3850] transition hover:bg-[#f8edf2]`,onClick:()=>p(!1),children:[(0,Z.jsx)(im,{className:`h-4 w-4`}),`TAROT`]}),(0,Z.jsxs)(`button`,{type:`button`,className:`flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#9d5f7e] transition hover:bg-[#f8edf2]`,onClick:_,children:[(0,Z.jsx)(Xp,{className:`h-4 w-4`}),`LOGOUT`]})]})]}):s?null:(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(R,{to:`/login`,className:x,children:[(0,Z.jsx)(Yp,{className:`h-4 w-4`}),`LOGIN`]}),(0,Z.jsxs)(R,{to:`/register`,className:S,children:[(0,Z.jsx)(sm,{className:`h-4 w-4`}),`NEW`]})]})}),!s&&(0,Z.jsx)(`button`,{type:`button`,className:i?`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7a4bb] bg-white/72 md:hidden`:`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d7a4bb] bg-white/72 md:hidden`,onClick:()=>d(e=>!e),"aria-label":`Open menu`,children:u?(0,Z.jsx)(um,{className:`h-5 w-5`}):(0,Z.jsx)(Zp,{className:`h-5 w-5`})})]}),!s&&u&&(0,Z.jsx)(`div`,{className:C,children:(0,Z.jsx)(`div`,{className:`flex flex-col gap-3`,children:t?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(R,{to:`/profile`,className:`rounded-xl border border-[#d7a4bb] bg-white/72 px-4 py-3 text-sm text-[#4b3850]`,onClick:()=>d(!1),children:`PROFILE`}),(0,Z.jsx)(R,{to:`/diary/list`,className:`rounded-xl border border-[#d7a4bb] bg-white/72 px-4 py-3 text-sm text-[#4b3850]`,onClick:()=>d(!1),children:`RECORDS`}),(0,Z.jsx)(R,{to:`/tarot`,className:`rounded-xl border border-[#d7a4bb] bg-white/72 px-4 py-3 text-sm text-[#4b3850]`,onClick:()=>d(!1),children:`TAROT`}),(0,Z.jsx)(`button`,{type:`button`,className:`rounded-xl border border-[#d7a4bb] bg-white/72 px-4 py-3 text-left text-sm text-[#9d5f7e]`,onClick:_,children:`LOGOUT`})]}):s?null:(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(R,{to:`/login`,className:`rounded-xl border border-[#d7a4bb] bg-white/72 px-4 py-3 text-sm text-[#4b3850]`,onClick:()=>d(!1),children:`LOGIN`}),(0,Z.jsx)(R,{to:`/register`,className:`rounded-xl bg-[#e7b2c5] px-4 py-3 text-sm font-medium text-[#4b3850]`,onClick:()=>d(!1),children:`NEW`})]})})})]}),(0,Z.jsxs)(`main`,{className:`relative z-10 mx-auto px-6 py-8 md:px-10 ${n?`max-w-[1600px] lg:px-8 2xl:px-10`:`max-w-6xl`}`,children:[r&&(0,Z.jsxs)(`div`,{className:`pointer-events-none absolute inset-0 z-20 overflow-hidden`,children:[(0,Z.jsx)(`div`,{className:`spell-rim spell-rim-left`}),(0,Z.jsx)(`div`,{className:`spell-rim spell-rim-right`}),(0,Z.jsx)(`div`,{className:`spell-rim spell-rim-bottom`}),Zm.map((e,t)=>(0,Z.jsx)(`span`,{className:`spell-ambient spell-ambient-${t+1}`,style:{left:`${5+t*9}%`,top:`${5+t%4*15}%`,color:$m[t%$m.length],animationDelay:`${t*.7}s`},children:e},`${e}-${t}`)),m.map(e=>(0,Z.jsx)(`span`,{className:`spell-burst`,style:{left:`${e.x}%`,top:`${e.y}%`,color:e.color,fontSize:`${e.size}rem`,transform:`translate(-50%, -50%) rotate(${e.angle}deg)`,animationDuration:`${e.duration}ms`},children:e.glyph},e.id)),(0,Z.jsx)(`style`,{children:`
              .spell-rim {
                position: absolute;
                border-radius: 9999px;
                filter: blur(24px);
                display: none;
                animation: spellGlow 8.5s ease-in-out infinite;
              }

              .spell-rim-left {
                left: -6rem;
                top: 18%;
                width: 14rem;
                height: 14rem;
                background: radial-gradient(circle, rgba(255, 248, 251, 0.95), rgba(217, 127, 168, 0.22) 55%, transparent 72%);
              }

              .spell-rim-right {
                right: -5rem;
                top: 26%;
                width: 12rem;
                height: 12rem;
                background: radial-gradient(circle, rgba(228, 198, 255, 0.84), rgba(255, 202, 223, 0.2) 50%, transparent 72%);
                animation-delay: -1.5s;
              }

              .spell-rim-bottom {
                left: 30%;
                bottom: -4rem;
                width: 18rem;
                height: 18rem;
                background: radial-gradient(circle, rgba(255, 222, 163, 0.6), rgba(255, 202, 223, 0.18) 50%, transparent 72%);
                animation-delay: -3s;
              }

              .spell-ambient {
                position: absolute;
                z-index: 0;
                display: inline-block;
                opacity: 0.56;
                font-size: 1.15rem;
                text-shadow: 0 0 14px rgba(255, 255, 255, 0.75);
                animation: spellFloat 7.8s ease-in-out infinite;
              }

              .spell-ambient-1 { animation-delay: 0s; }
              .spell-ambient-2 { animation-delay: 0.5s; }
              .spell-ambient-3 { animation-delay: 1s; }
              .spell-ambient-4 { animation-delay: 1.5s; }
              .spell-ambient-5 { animation-delay: 2s; }
              .spell-ambient-6 { animation-delay: 2.5s; }
              .spell-ambient-7 { animation-delay: 3s; }
              .spell-ambient-8 { animation-delay: 3.5s; }

              .spell-burst {
                position: absolute;
                z-index: 0;
                pointer-events: none;
                font-weight: 700;
                opacity: 0;
                text-shadow:
                  0 0 10px rgba(255, 255, 255, 0.98),
                  0 0 20px rgba(255, 224, 238, 0.92),
                  0 0 30px rgba(226, 169, 190, 0.8),
                  0 0 42px rgba(233, 216, 255, 0.7);
                animation-name: spellBurst;
                animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
                animation-fill-mode: forwards;
              }

              @keyframes spellGlow {
                0%, 100% { transform: scale(1); opacity: 0.24; }
                50% { transform: scale(1.08); opacity: 0.44; }
              }

              @keyframes spellFloat {
                0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0.22; }
                35% { transform: translate3d(0.45rem, -0.75rem, 0) rotate(10deg); opacity: 0.54; }
                60% { transform: translate3d(-0.3rem, 0.4rem, 0) rotate(-8deg); opacity: 0.3; }
              }

              @keyframes spellBurst {
                0% {
                  transform: translate(-50%, -50%) scale(0.3);
                  opacity: 0;
                }
                18% {
                  opacity: 1;
                }
                45% {
                  transform: translate(-50%, -72%) scale(1.7);
                  opacity: 1;
                }
                100% {
                  transform: translate(-50%, -110%) scale(0.8);
                  opacity: 0;
                }
              }
            `})]}),(0,Z.jsx)(`div`,{className:`relative z-10`,children:e})]})]})}var nh=[`major`,`minor`,`oracle`],rh=[`none`,`cups`,`pentacles`,`swords`,`wands`];function ih({children:e,user:t,wide:n=!1,hideHeader:r=!1,hideBackground:i=!1}){return(0,Z.jsx)(th,{user:t,wide:n,headerVariant:`cosmic`,backgroundVariant:`hero`,hideHeader:r,hideBackground:i,children:e})}function ah({children:e,className:t=``}){return(0,Z.jsx)(`section`,{className:`rounded-2xl border border-white/10 bg-[#171226]/72 p-5 text-[#f7f3ff] shadow-[0_18px_70px_rgba(0,0,0,0.26)] backdrop-blur-xl ${t}`,children:e})}function oh({message:e}){return e?(0,Z.jsx)(`p`,{className:`rounded-xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100`,children:e}):null}function sh(){return(0,Z.jsx)(`p`,{className:`rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-200`,children:`Loading...`})}function ch({children:e,showDeckListButton:t=!1}){return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`style`,{children:jh}),(0,Z.jsxs)(`div`,{className:`tarot-library-page mx-auto max-w-7xl`,children:[(0,Z.jsx)(Pm,{fixed:!0,tone:`warm`}),(0,Z.jsx)(lh,{showDeckListButton:t}),e]})]})}function lh({showDeckListButton:e=!1}){return(0,Z.jsxs)(`div`,{className:`tarot-library-hero mb-6 flex flex-wrap items-center justify-between gap-4`,children:[(0,Z.jsx)(`h1`,{className:`tarot-library-title`,children:`Card Library`}),(0,Z.jsxs)(`div`,{className:`flex flex-wrap items-center gap-3`,children:[e?(0,Z.jsxs)(R,{to:`/tarot/decks`,className:`tarot-library-header-btn tarot-library-soft-btn inline-flex items-center gap-2 rounded-full text-sm font-semibold text-white transition hover:text-white`,children:[(0,Z.jsx)(Fp,{className:`h-4 w-4`}),`BACK TO DECK LIST`]}):null,(0,Z.jsxs)(R,{to:`/diary/warp`,state:{target:`/bookdesign`,targetState:{bookSection:`tarot`}},className:`tarot-library-header-btn tarot-library-soft-btn inline-flex items-center gap-2 rounded-full text-sm font-semibold text-[#f4c2c2] transition hover:text-white`,children:[(0,Z.jsx)(Fp,{className:`h-4 w-4`}),`BACK TO BOOK`]}),(0,Z.jsxs)(R,{to:`/bookdesign`,state:{bookSection:`tarot`,tarotPage:`draw`},className:`tarot-library-header-btn tarot-library-draw-btn inline-flex items-center gap-2 rounded-full text-sm font-semibold`,children:[(0,Z.jsx)(im,{className:`h-4 w-4`}),` DRAW`]})]})]})}function uh(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}function dh(e){return e.image||``}function fh(e){return e.coverImage||e.cover_image||``}var ph={"the fool":{design:`uranus`,tone:`from-[#24304d] via-[#1e3150] to-[#101322]`},"the magician":{design:`mercury`,tone:`from-[#263456] via-[#2a2351] to-[#101322]`},"the high priestess":{design:`moon`,tone:`from-[#1d2f52] via-[#282458] to-[#101322]`},"the empress":{design:`venus`,tone:`from-[#40233f] via-[#2d3150] to-[#101322]`},"the emperor":{design:`aries`,tone:`from-[#4a2432] via-[#35234d] to-[#101322]`},"the hierophant":{design:`taurus`,tone:`from-[#263d36] via-[#302d4d] to-[#101322]`},"the lovers":{design:`gemini`,tone:`from-[#2a3154] via-[#3b2752] to-[#101322]`},"the chariot":{design:`cancer`,tone:`from-[#1e3954] via-[#2b2853] to-[#101322]`},strength:{design:`leo`,tone:`from-[#4a2e29] via-[#3b2850] to-[#101322]`},"the hermit":{design:`virgo`,tone:`from-[#293a3a] via-[#2b2b50] to-[#101322]`},"wheel of fortune":{design:`jupiter`,tone:`from-[#2c2f5c] via-[#3b2a4f] to-[#101322]`},justice:{design:`libra`,tone:`from-[#293450] via-[#42284c] to-[#101322]`},"the hanged man":{design:`neptune`,tone:`from-[#1d3a4d] via-[#2b2d53] to-[#101322]`},death:{design:`scorpio`,tone:`from-[#31263f] via-[#1d3548] to-[#101322]`},temperance:{design:`sagittarius`,tone:`from-[#443035] via-[#2d3155] to-[#101322]`},"the devil":{design:`capricorn`,tone:`from-[#342d3c] via-[#26384a] to-[#101322]`},"the tower":{design:`mars`,tone:`from-[#4b2530] via-[#322348] to-[#101322]`},"the star":{design:`aquarius`,tone:`from-[#1f3f55] via-[#2d2a55] to-[#101322]`},"the moon":{design:`pisces`,tone:`from-[#22345b] via-[#30275b] to-[#101322]`},"the sun":{design:`sun`,tone:`from-[#4b3420] via-[#403152] to-[#101322]`},judgement:{design:`pluto`,tone:`from-[#4a2934] via-[#3b2a4f] to-[#101322]`},"the world":{design:`saturn`,tone:`from-[#30364a] via-[#2a294d] to-[#101322]`}},mh=[`✦`,`☉`,`☾`,`♃`,`♀`,`♄`,`☿`,`♆`],hh=[`from-[#2d1b42] via-[#1b2342] to-[#101322]`,`from-[#321d36] via-[#2a2347] to-[#111827]`,`from-[#1f2d46] via-[#2a1d42] to-[#141224]`,`from-[#3a2635] via-[#202f4c] to-[#111322]`],gh={cups:`from-[#1d3556] via-[#2c2552] to-[#101322]`,pentacles:`from-[#243f36] via-[#342b49] to-[#101322]`,swords:`from-[#263650] via-[#202a4c] to-[#101322]`,wands:`from-[#4a2a2d] via-[#3a284d] to-[#101322]`};function _h(e){return[...e.cardName||e.name||`Tarot`].reduce((e,t)=>e+t.charCodeAt(0),0)}function vh(e){return yh(e)?``:mh[_h(e)%mh.length]}function yh(e){return ph[`${e.cardName||e.name||``}`.toLowerCase().replace(/^the\s+/,`the `)]??null}function bh(e){let t=`${e.suit||``}`.toLowerCase();if([`cups`,`pentacles`,`swords`,`wands`].includes(t))return t;let n=`${e.cardName||e.name||``}`.toLowerCase();return[`cups`,`pentacles`,`swords`,`wands`].find(e=>n.includes(e))??``}function xh(e){let t=Number(e.number);if(Number.isFinite(t)&&t>0)return t;let n=`${e.cardName||e.name||``}`.toLowerCase(),r=[`page`,`knight`,`queen`,`king`].find(e=>n.includes(e));return r===`page`?11:r===`knight`?12:r===`queen`?13:r===`king`?14:Object.entries({ace:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,ten:10}).find(([e])=>n.includes(e))?.[1]??0}var Sh={1:[[50,50]],2:[[50,32],[50,68]],3:[[50,24],[34,66],[66,66]],4:[[34,30],[66,30],[34,70],[66,70]],5:[[34,28],[66,28],[50,50],[34,72],[66,72]],6:[[34,24],[66,24],[34,50],[66,50],[34,76],[66,76]],7:[[34,22],[66,22],[50,38],[34,56],[66,56],[34,78],[66,78]],8:[[32,20],[68,20],[32,40],[68,40],[32,60],[68,60],[32,80],[68,80]],9:[[32,20],[68,20],[32,38],[68,38],[50,50],[32,62],[68,62],[32,80],[68,80]],10:[[32,18],[68,18],[32,34],[68,34],[32,50],[68,50],[32,66],[68,66],[32,82],[68,82]]};function Ch({suit:e,variant:t=`pip`,className:n=``,style:r}){let i=t!==`pip`;return e===`cups`?(0,Z.jsxs)(`span`,{className:`relative block ${n}`,style:r,children:[(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-[18%] -translate-x-1/2 rotate-45 rounded-[55%_5%_55%_55%] bg-cyan-100/76 shadow-[0_0_16px_rgba(126,214,255,0.34)] ${i?`h-[54%] w-[54%]`:`h-[62%] w-[62%]`}`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[14%] left-[16%] h-[18%] w-[68%] rounded-full border border-cyan-100/28 bg-cyan-200/10`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[20%] left-[28%] h-[8%] w-[44%] rounded-full bg-white/20 blur-[1px]`})]}):e===`pentacles`?(0,Z.jsxs)(`span`,{className:`relative block ${n}`,style:r,children:[(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-1/2 h-[64%] w-[64%] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[18%] bg-emerald-200/56 shadow-[0_0_18px_rgba(165,231,177,0.26)]`}),(0,Z.jsx)(`span`,{className:`absolute left-[28%] top-[22%] h-[28%] w-[28%] rounded-full bg-[#fff1c7]/54`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[16%] left-[18%] h-[26%] w-[64%] rounded-full bg-emerald-300/16`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[30%] left-1/2 h-[26%] w-px -translate-x-1/2 bg-emerald-100/42`})]}):e===`swords`?(0,Z.jsxs)(`span`,{className:`relative block ${n}`,style:r,children:[(0,Z.jsx)(`span`,{className:`absolute left-[8%] top-[46%] h-[8%] w-[84%] rotate-[-18deg] rounded-full bg-sky-100/54 shadow-[0_0_16px_rgba(186,220,255,0.24)]`}),(0,Z.jsx)(`span`,{className:`absolute left-[18%] top-[24%] h-[5%] w-[54%] rotate-[-18deg] rounded-full bg-white/30`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[22%] right-[16%] h-[5%] w-[56%] rotate-[-18deg] rounded-full bg-sky-200/24`}),(0,Z.jsx)(`span`,{className:`absolute right-[10%] top-[32%] h-[28%] w-[28%] rounded-full border border-sky-100/20`})]}):(0,Z.jsxs)(`span`,{className:`relative block ${n}`,style:r,children:[(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-[18%] h-[60%] w-[28%] -translate-x-1/2 rounded-full bg-amber-200/72 shadow-[0_0_18px_rgba(246,211,124,0.36)]`}),(0,Z.jsx)(`span`,{className:`absolute left-[30%] top-[8%] h-[42%] w-[40%] rounded-full bg-rose-300/34 blur-[2px]`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[10%] left-[28%] h-[18%] w-[44%] rounded-full bg-amber-100/28`})]})}function wh({card:e,compact:t=!1}){let n=bh(e),r=xh(e);if(!n)return null;let i=t?`h-8 w-8`:`h-10 w-10`,a=Sh[Math.min(r,10)]??Sh[1],o=r>10,s=r===11?`page`:r===12?`knight`:r===13?`queen`:r===14?`king`:``;return(0,Z.jsxs)(`div`,{className:`relative h-full w-full`,children:[(0,Z.jsx)(`div`,{className:`absolute inset-[9%] rounded-full border border-white/10 bg-white/5`}),(0,Z.jsx)(`div`,{className:`absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_62%)]`}),o?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`div`,{className:`absolute left-1/2 top-[50%] flex h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-white/7 shadow-[0_0_32px_rgba(255,255,255,0.08)]`,children:(0,Z.jsx)(Ch,{suit:n,variant:s,className:t?`h-20 w-20`:`h-28 w-28`})}),s===`page`?(0,Z.jsx)(`span`,{className:`absolute left-[34%] top-[18%] h-2 w-[32%] rounded-full bg-white/28`}):null,s===`knight`?(0,Z.jsx)(`span`,{className:`absolute left-[22%] top-[18%] h-[28%] w-[56%] rounded-t-full border border-white/30 border-b-0 bg-white/5`}):null,s===`queen`||s===`king`?(0,Z.jsx)(`span`,{className:`absolute left-[28%] top-[13%] h-[14%] w-[44%] rounded-t-md border border-white/34 border-b-0 bg-white/8`}):null,s===`king`?(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-[7%] h-[18%] w-1 -translate-x-1/2 rounded-full bg-white/34`}):null,(0,Z.jsx)(`span`,{className:`absolute bottom-[13%] left-[22%] h-2 w-[56%] rounded-full bg-gradient-to-r from-transparent via-white/28 to-transparent`})]}):a.map(([e,t],a)=>(0,Z.jsx)(Ch,{suit:n,className:`absolute ${i} -translate-x-1/2 -translate-y-1/2`,style:{left:`${e}%`,top:`${t}%`}},`${n}-${r}-${a}`))]})}function Th({type:e,compact:t=!1}){let n=t?`h-20 w-20`:`h-28 w-28`,r=`absolute border border-[#fff1c7]/72 shadow-[0_0_18px_rgba(255,241,199,0.22)]`;if(e===`sun`)return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`${r} inset-0 rounded-full`}),(0,Z.jsx)(`span`,{className:`${r} inset-[24%] rounded-full`}),(0,Z.jsx)(`span`,{className:`absolute rounded-full bg-[#fff1c7]/82 shadow-[0_0_18px_rgba(255,241,199,0.34)] left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2`}),(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-[-12%] h-[124%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#fff1c7]/58 to-transparent`}),(0,Z.jsx)(`span`,{className:`absolute left-[-12%] top-1/2 h-px w-[124%] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#fff1c7]/58 to-transparent`})]});if(e===`moon`)return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`${r} inset-[6%] rounded-full border-[#d8c4ff]/70`}),(0,Z.jsx)(`span`,{className:`absolute inset-[2%] rounded-full bg-[#fff1c7]/82 shadow-[0_0_26px_rgba(255,241,199,0.28)]`}),(0,Z.jsx)(`span`,{className:`absolute -right-[4%] top-[-2%] h-[104%] w-[82%] rounded-full bg-[#252557]`})]});if(e===`air`||e===`fire`||e===`water`){let t=e===`air`,r=e===`water`||e===`air`?`rotate-180`:``;return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 ${r} bg-[#fff1c7]/76 shadow-[0_0_18px_rgba(255,241,199,0.22)]`,style:{clipPath:`polygon(50% 0, 100% 86%, 94% 90%, 50% 12%, 6% 90%, 0 86%)`}}),t?(0,Z.jsx)(`span`,{className:`absolute left-[23%] top-[58%] h-px w-[54%] bg-[#fff1c7]/70`}):null]})}if(e===`venus`||e===`mercury`)return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[e===`mercury`?(0,Z.jsx)(`span`,{className:`${r} left-[24%] top-[-2%] h-[34%] w-[52%] rounded-b-full border-t-0`}):null,(0,Z.jsx)(`span`,{className:`${r} left-[20%] top-[10%] h-[58%] w-[60%] rounded-full`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[8%] left-1/2 h-[30%] w-px -translate-x-1/2 bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[20%] left-[32%] h-px w-[36%] bg-[#fff1c7]/70`})]});if(e===`mars`)return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`${r} bottom-[10%] left-[8%] h-[56%] w-[56%] rounded-full`}),(0,Z.jsx)(`span`,{className:`absolute right-[8%] top-[8%] h-px w-[48%] rotate-[-45deg] bg-[#fff1c7]/70 origin-right`}),(0,Z.jsx)(`span`,{className:`absolute right-[7%] top-[8%] h-[26%] w-[26%] border-r border-t border-[#fff1c7]/70`})]});if(e===`jupiter`)return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`${r} left-[15%] top-[12%] h-[46%] w-[46%] rounded-full border-r-0`}),(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-[8%] h-[82%] w-px bg-[#fff1c7]/68`}),(0,Z.jsx)(`span`,{className:`absolute left-[26%] top-[52%] h-px w-[54%] bg-[#fff1c7]/68`})]});if(e===`saturn`)return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-[10%] h-[78%] w-px -translate-x-1/2 bg-[#fff1c7]/72 shadow-[0_0_14px_rgba(255,241,199,0.22)]`}),(0,Z.jsx)(`span`,{className:`absolute left-[28%] top-[28%] h-px w-[44%] bg-[#fff1c7]/72 shadow-[0_0_14px_rgba(255,241,199,0.22)]`}),(0,Z.jsx)(`span`,{className:`${r} left-[34%] bottom-[10%] h-[38%] w-[42%] rounded-b-full border-t-0`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[20%] right-[22%] h-px w-[26%] rotate-[-32deg] bg-[#fff1c7]/62`})]});if(e===`uranus`)return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`${r} left-[30%] top-[22%] h-[38%] w-[40%] rounded-full`}),(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-[9%] h-[78%] w-px -translate-x-1/2 bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[11%] left-[31%] h-px w-[38%] bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`absolute left-[18%] top-[22%] h-[42%] w-px bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`absolute right-[18%] top-[22%] h-[42%] w-px bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`absolute left-[10%] top-[28%] h-px w-[22%] bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`absolute right-[10%] top-[28%] h-px w-[22%] bg-[#fff1c7]/70`})]});if(e===`neptune`)return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-[12%] h-[78%] w-px -translate-x-1/2 bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[16%] left-[31%] h-px w-[38%] bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`${r} left-[18%] top-[10%] h-[42%] w-[64%] rounded-b-full border-t-0`}),(0,Z.jsx)(`span`,{className:`absolute left-[16%] top-[15%] h-[18%] w-px rotate-[24deg] bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`absolute right-[16%] top-[15%] h-[18%] w-px rotate-[-24deg] bg-[#fff1c7]/70`})]});if(e===`pluto`)return(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`${r} left-[31%] top-[4%] h-[38%] w-[38%] rounded-full`}),(0,Z.jsx)(`span`,{className:`${r} left-[22%] top-[34%] h-[28%] w-[56%] rounded-b-full border-t-0`}),(0,Z.jsx)(`span`,{className:`absolute left-1/2 top-[34%] h-[56%] w-px -translate-x-1/2 bg-[#fff1c7]/70`}),(0,Z.jsx)(`span`,{className:`absolute bottom-[16%] left-[32%] h-px w-[36%] bg-[#fff1c7]/70`})]});let i={aries:[`left-[18%] top-[14%] h-[60%] w-[34%] rounded-t-full border-r-0`,`right-[18%] top-[14%] h-[60%] w-[34%] rounded-t-full border-l-0`],taurus:[`left-[20%] top-[34%] h-[56%] w-[60%] rounded-full`,`left-[22%] top-[6%] h-[36%] w-[24%] rounded-t-full border-b-0`,`right-[22%] top-[6%] h-[36%] w-[24%] rounded-t-full border-b-0`],gemini:[`left-[28%] top-[12%] h-[76%] w-px`,`right-[28%] top-[12%] h-[76%] w-px`,`left-[22%] top-[16%] h-px w-[56%]`,`left-[22%] bottom-[16%] h-px w-[56%]`],cancer:[`left-[14%] top-[22%] h-[36%] w-[36%] rounded-full`,`right-[14%] bottom-[22%] h-[36%] w-[36%] rounded-full`,`left-[28%] top-[38%] h-px w-[46%] rotate-[-16deg]`,`left-[26%] bottom-[38%] h-px w-[46%] rotate-[-16deg]`],leo:[`left-[18%] top-[36%] h-[36%] w-[36%] rounded-full`,`right-[16%] top-[16%] h-[62%] w-[44%] rounded-full border-l-0`],virgo:[`left-[18%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0`,`left-[34%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0`,`left-[50%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0`,`right-[10%] bottom-[18%] h-[34%] w-[34%] rounded-b-full border-t-0`],libra:[`left-[18%] bottom-[22%] h-px w-[64%]`,`left-[24%] top-[30%] h-[34%] w-[52%] rounded-t-full border-b-0`,`left-[22%] bottom-[36%] h-px w-[56%]`],scorpio:[`left-[18%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0`,`left-[34%] top-[18%] h-[66%] w-[18%] rounded-full border-r-0`,`left-[50%] top-[18%] h-[58%] w-[18%] rounded-full border-r-0`,`right-[12%] bottom-[18%] h-px w-[26%] rotate-[-28deg]`],sagittarius:[`left-[18%] bottom-[22%] h-px w-[76%] origin-left rotate-[-45deg]`,`right-[11%] top-[14%] h-px w-[28%] origin-right rotate-[0deg]`,`right-[11%] top-[14%] h-px w-[28%] origin-right rotate-[90deg]`,`left-[30%] top-[48%] h-px w-[34%] origin-center rotate-[45deg]`,`left-[50%] top-[28%] h-px w-[24%] origin-center rotate-[45deg]`],capricorn:[`left-[18%] top-[18%] h-[56%] w-[20%] rounded-full border-r-0`,`left-[36%] top-[20%] h-[56%] w-[24%] rounded-full border-r-0`,`right-[10%] bottom-[10%] h-[42%] w-[42%] rounded-full`],aquarius:[`left-[12%] top-[36%] h-px w-[76%]`,`left-[12%] top-[52%] h-px w-[76%]`],pisces:[`left-[16%] top-[14%] h-[72%] w-[30%] rounded-l-full border-r-0`,`right-[16%] top-[14%] h-[72%] w-[30%] rounded-r-full border-l-0`,`left-[22%] top-1/2 h-px w-[56%]`]};return i[e]?(0,Z.jsx)(`div`,{className:`relative ${n}`,children:i[e].map(e=>(0,Z.jsx)(`span`,{className:`${r} ${e}`},e))}):(0,Z.jsxs)(`div`,{className:`relative ${n}`,children:[(0,Z.jsx)(`span`,{className:`${r} inset-0 rotate-45`}),(0,Z.jsx)(`span`,{className:`${r} inset-[24%] rounded-full`})]})}function Eh({card:e,className:t=``,compact:n=!1}){let r=dh(e);if(r)return(0,Z.jsx)(`img`,{src:r,alt:e.cardName||e.name,loading:`lazy`,decoding:`async`,className:`h-full w-full object-cover ${t}`});let i=_h(e),a=yh(e),o=bh(e),s=!a&&o,c=a?.tone??gh[o]??hh[i%hh.length],l=vh(e),u=e.cardName||e.name||`Tarot`;return(0,Z.jsxs)(`div`,{className:`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${c} ${t}`,children:[(0,Z.jsx)(`div`,{className:`absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(255,246,214,0.18),transparent_24%),radial-gradient(circle_at_20%_78%,rgba(244,194,194,0.16),transparent_28%),radial-gradient(circle_at_82%_74%,rgba(126,214,255,0.13),transparent_26%)]`}),(0,Z.jsx)(`div`,{className:`absolute inset-[8%] rounded-[18px] border border-white/22 shadow-[0_0_28px_rgba(216,196,255,0.16)_inset]`}),(0,Z.jsx)(`div`,{className:`absolute left-1/2 top-[16%] h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/34 to-transparent`}),(0,Z.jsx)(`div`,{className:`absolute bottom-[16%] left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f4c2c2]/34 to-transparent`}),(0,Z.jsx)(`div`,{className:`absolute h-[62%] w-[62%] rounded-full border border-white/18 shadow-[0_0_34px_rgba(244,194,194,0.12)]`}),(0,Z.jsx)(`div`,{className:`absolute h-[43%] w-[43%] rotate-45 border border-[#d8c4ff]/24`}),(0,Z.jsx)(`div`,{className:`absolute h-[74%] w-px bg-gradient-to-b from-transparent via-white/18 to-transparent`}),(0,Z.jsx)(`div`,{className:`absolute h-px w-[74%] bg-gradient-to-r from-transparent via-white/18 to-transparent`}),a?(0,Z.jsx)(`div`,{className:`relative flex h-[52%] w-[52%] items-center justify-center rounded-full border border-white/18 bg-white/7 shadow-[0_0_36px_rgba(255,255,255,0.12)] backdrop-blur-sm`,children:(0,Z.jsx)(Th,{type:a.design,compact:n})}):s?(0,Z.jsx)(`div`,{className:`relative h-[76%] w-[76%]`,children:(0,Z.jsx)(wh,{card:e,compact:n})}):(0,Z.jsx)(`div`,{className:`relative flex h-[44%] w-[44%] items-center justify-center rounded-full border border-white/24 bg-white/8 shadow-[0_0_36px_rgba(255,255,255,0.12)] backdrop-blur-sm`,children:(0,Z.jsx)(`span`,{className:n?`text-4xl text-[#fff1c7] drop-shadow-[0_0_16px_rgba(255,241,199,0.48)]`:`text-6xl text-[#fff1c7] drop-shadow-[0_0_20px_rgba(255,241,199,0.52)]`,children:l})}),(0,Z.jsxs)(`div`,{className:`absolute left-4 right-4 top-4 flex justify-between text-[10px] text-white/54`,children:[(0,Z.jsx)(`span`,{children:`✦`}),(0,Z.jsx)(`span`,{children:`✦`})]}),(0,Z.jsx)(`div`,{className:`absolute bottom-4 left-4 right-4 text-center`,children:(0,Z.jsx)(`p`,{className:`truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70`,children:u})})]})}function Dh({card:e,editable:t=!1}){return(0,Z.jsxs)(`article`,{className:`flex min-h-[260px] flex-col rounded-xl border border-white/10 bg-white/7 p-4 shadow-lg`,children:[(0,Z.jsx)(`div`,{className:`aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-[#241b34]`,children:(0,Z.jsx)(Eh,{card:e})}),(0,Z.jsxs)(`div`,{className:`mt-4 flex items-start justify-between gap-3`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`h3`,{className:`font-semibold text-white`,children:e.name}),(0,Z.jsxs)(`p`,{className:`mt-1 text-xs uppercase tracking-[0.18em] text-slate-400`,children:[e.arcana,` `,e.suit&&e.suit!==`none`?`/ ${e.suit}`:``]})]}),t?(0,Z.jsx)(R,{to:`/tarot/cards/${e.id}/edit`,className:`rounded-full border border-white/12 p-2 text-slate-100 transition hover:bg-white/10`,"aria-label":`Edit ${e.name}`,children:(0,Z.jsx)(em,{className:`h-4 w-4`})}):null]}),(0,Z.jsx)(`p`,{className:`mt-3 line-clamp-3 text-sm leading-6 text-slate-300`,children:e.uprightMeaning||e.upright_meaning}),e.keywords?.length?(0,Z.jsx)(`div`,{className:`mt-auto flex flex-wrap gap-2 pt-4`,children:e.keywords.slice(0,3).map(e=>(0,Z.jsx)(`span`,{className:`rounded-full bg-white/8 px-2.5 py-1 text-xs text-slate-200`,children:e},e))}):null]})}function Oh({user:e}){return(0,Z.jsx)(ih,{user:e,children:(0,Z.jsxs)(`div`,{className:`mx-auto max-w-5xl`,children:[(0,Z.jsxs)(`div`,{className:`mb-8`,children:[(0,Z.jsx)(`p`,{className:`mb-3 text-sm uppercase tracking-[0.28em] text-[#f4c2c2]`,children:`Tarot`}),(0,Z.jsx)(`h1`,{className:`text-4xl font-semibold text-white md:text-5xl`,children:`Cards, readings, and saved signs`})]}),(0,Z.jsx)(`div`,{className:`grid gap-4 md:grid-cols-2`,children:[{to:`/tarot/decks`,icon:Lp,title:`Decks`,text:`Browse the default 78 cards or create your own deck.`},{to:`/tarot/read`,icon:im,title:`Draw`,text:`Ask a question and draw one or three cards.`}].map(e=>{let t=e.icon;return(0,Z.jsxs)(R,{to:e.to,className:`rounded-2xl border border-white/10 bg-white/7 p-5 transition hover:-translate-y-0.5 hover:bg-white/11`,children:[(0,Z.jsx)(t,{className:`h-6 w-6 text-[#f4c2c2]`}),(0,Z.jsx)(`h2`,{className:`mt-5 text-xl font-semibold text-white`,children:e.title}),(0,Z.jsx)(`p`,{className:`mt-3 text-sm leading-7 text-slate-300`,children:e.text})]},e.to)})})]})})}function kh({user:e}){let[t,n]=(0,w.useState)(null),[r,i]=(0,w.useState)(``),[a,o]=(0,w.useState)(``),[s,c]=(0,w.useState)(``),[l,u]=(0,w.useState)(null),[d,f]=(0,w.useState)(`tarot`),[p,m]=(0,w.useState)(!0),h=(0,w.useRef)(null),g=(0,w.useMemo)(()=>l?URL.createObjectURL(l):``,[l]),_=()=>{i(``),$(`/api/tarot/decks/`).then(n).catch(e=>i(e.message||`Failed to load decks.`))};(0,w.useEffect)(()=>{$(`/api/tarot/decks/`).then(n).catch(e=>i(e.message||`Failed to load decks.`))},[]);let v=async e=>{e.preventDefault(),i(``);try{let e=l?Object.entries({name:a,description:s,deckType:d,allowReversed:p,isPublic:!1}).reduce((e,[t,n])=>(e.append(t,n??``),e),new FormData):JSON.stringify({name:a,description:s,deckType:d,allowReversed:p,isPublic:!1});l&&e.append(`coverImageFile`,l),await $(`/api/tarot/decks/`,{method:`POST`,body:e}),o(``),c(``),u(null),h.current&&(h.current.value=``),_()}catch(e){i(e.message||`Failed to create deck.`)}};return(0,w.useEffect)(()=>{let e=g;return()=>{e&&URL.revokeObjectURL(e)}},[g]),(0,Z.jsx)(ih,{user:e,wide:!0,hideHeader:!0,hideBackground:!0,children:(0,Z.jsxs)(ch,{children:[(0,Z.jsx)(oh,{message:r}),t?null:(0,Z.jsx)(sh,{}),t?(0,Z.jsxs)(`div`,{className:`grid gap-5 lg:grid-cols-[1fr_360px]`,children:[(0,Z.jsxs)(`div`,{className:`space-y-6`,children:[(0,Z.jsx)(Ah,{title:`System & Shared Decks`,label:`Public Archive`,decks:[...t.systemDecks??[],...t.sharedDecks??[]]}),(0,Z.jsx)(Ah,{title:`My Decks`,label:`Private Shelf`,decks:t.myDecks,editable:!0})]}),(0,Z.jsxs)(ah,{className:`tarot-library-counter`,children:[(0,Z.jsx)(`p`,{className:`text-xs uppercase tracking-[0.24em] text-[#ffcf9f]`,children:`Archive Counter`}),(0,Z.jsx)(`h2`,{className:`mt-2 text-lg font-semibold text-white`,children:`Create Deck`}),e?(0,Z.jsxs)(`form`,{className:`mt-4 space-y-4`,onSubmit:v,children:[(0,Z.jsx)(`input`,{className:`tarot-library-input w-full rounded-xl px-4 py-3 text-white outline-none`,placeholder:`Deck name`,value:a,onChange:e=>o(e.target.value)}),(0,Z.jsx)(`textarea`,{className:`tarot-library-input min-h-28 w-full rounded-xl px-4 py-3 text-white outline-none`,placeholder:`Description`,value:s,onChange:e=>c(e.target.value)}),(0,Z.jsxs)(`div`,{className:`tarot-library-cover-field grid gap-3 rounded-xl p-3`,children:[(0,Z.jsx)(`div`,{className:`tarot-library-cover-preview aspect-[3/2] overflow-hidden rounded-lg`,children:g?(0,Z.jsx)(`img`,{src:g,alt:`Deck cover preview`,className:`h-full w-full object-cover`}):(0,Z.jsx)(Eh,{card:{name:a||`New Deck`},compact:!0})}),(0,Z.jsx)(`input`,{ref:h,className:`hidden`,type:`file`,accept:`image/jpeg,image/png,image/webp`,onChange:e=>{u(e.target.files?.[0]??null)}}),(0,Z.jsxs)(`button`,{className:`tarot-library-soft-btn inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-white transition`,type:`button`,onClick:()=>h.current?.click(),children:[(0,Z.jsx)(Jp,{className:`h-4 w-4`}),`Cover`]}),l?(0,Z.jsxs)(`p`,{className:`text-sm text-slate-300`,children:[`Selected: `,l.name,` `,(0,Z.jsx)(`button`,{className:`font-semibold text-[#f4c2c2] hover:text-white`,type:`button`,onClick:()=>{u(null),h.current&&(h.current.value=``)},children:`clear`})]}):null]}),(0,Z.jsxs)(`select`,{className:`w-full rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white`,value:d,onChange:e=>f(e.target.value),children:[(0,Z.jsx)(`option`,{value:`tarot`,children:`Tarot`}),(0,Z.jsx)(`option`,{value:`oracle`,children:`Oracle`})]}),(0,Z.jsxs)(`label`,{className:`flex items-center gap-3 text-sm text-slate-200`,children:[(0,Z.jsx)(`input`,{type:`checkbox`,checked:p,onChange:e=>m(e.target.checked)}),`Allow reversed cards`]}),(0,Z.jsxs)(`button`,{className:`tarot-library-create-btn inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold`,type:`submit`,children:[(0,Z.jsx)(tm,{className:`h-4 w-4`}),` CREATE`]})]}):(0,Z.jsx)(`p`,{className:`mt-4 text-sm leading-7 text-slate-300`,children:`Login to create personal decks. System decks are available to browse.`})]})]}):null]})})}function Ah({title:e,label:t,decks:n,editable:r=!1}){return(0,Z.jsxs)(ah,{className:`tarot-library-shelf`,children:[(0,Z.jsxs)(`div`,{className:`mb-5 flex flex-wrap items-end justify-between gap-3`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`text-xs uppercase tracking-[0.24em] text-[#ffcf9f]`,children:t}),(0,Z.jsx)(`h2`,{className:`mt-2 text-xl font-semibold text-white`,children:e})]}),(0,Z.jsxs)(`span`,{className:`rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-slate-300`,children:[n.length,` decks`]})]}),n.length?(0,Z.jsx)(`div`,{className:`tarot-library-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3`,children:n.map(e=>(0,Z.jsxs)(R,{to:`/tarot/decks/${e.id}`,className:`tarot-library-deck-card rounded-xl p-4 transition`,children:[(0,Z.jsx)(`div`,{className:`tarot-library-deck-cover mb-4 aspect-[3/4] overflow-hidden rounded-lg`,children:fh(e)?(0,Z.jsx)(`img`,{src:fh(e),alt:`${e.name} cover`,loading:`lazy`,decoding:`async`,className:`h-full w-full object-cover`}):(0,Z.jsx)(Eh,{card:{name:e.name},compact:!0})}),(0,Z.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,Z.jsx)(`h3`,{className:`font-semibold text-white`,children:e.name}),(0,Z.jsxs)(`span`,{className:`rounded-full bg-white/8 px-2 py-1 text-xs text-slate-300`,children:[e.cardCount,` cards`]})]}),(0,Z.jsx)(`p`,{className:`mt-2 line-clamp-2 text-sm leading-6 text-slate-300`,children:e.description||`No description.`}),(0,Z.jsxs)(`p`,{className:`mt-4 text-xs uppercase tracking-[0.18em] text-slate-400`,children:[e.deckType,` / `,e.allowReversed?`reversed`:`upright only`,` `,r?``:`/ readonly`,e.isPublic?` / shared`:``]}),e.ownerName?(0,Z.jsxs)(`p`,{className:`mt-2 text-xs text-slate-500`,children:[`by `,e.ownerName]}):null]},e.id))}):(0,Z.jsx)(`p`,{className:`text-sm text-slate-300`,children:`No decks yet.`})]})}var jh=`
  .tarot-library-page {
    position: relative;
    isolation: isolate;
    margin-top: -32px;
  }

  .tarot-library-page::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(circle at 18% 14%, rgba(255, 153, 96, 0.16), transparent 24%),
      radial-gradient(circle at 82% 18%, rgba(192, 124, 255, 0.18), transparent 25%),
      radial-gradient(circle at 44% 82%, rgba(244, 194, 194, 0.12), transparent 28%),
      linear-gradient(180deg, rgba(5, 7, 20, 0.38), rgba(5, 7, 20, 0.82));
  }

  .tarot-library-hero {
    position: sticky;
    top: 0;
    z-index: 40;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    padding: 14px max(24px, calc((100vw - 1280px) / 2 + 24px));
    border-bottom: 1px solid rgba(255,255,255,0.09);
    background:
      linear-gradient(90deg, rgba(12, 12, 28, 0.72), rgba(40, 25, 58, 0.58), rgba(12, 12, 28, 0.7)),
      radial-gradient(circle at 88% 12%, rgba(255, 206, 148, 0.18), transparent 24%);
    box-shadow: 0 16px 42px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.05);
    backdrop-filter: blur(14px);
    overflow: hidden;
  }

  .tarot-library-hero::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 207, 159, 0.52), rgba(244, 194, 194, 0.26), transparent);
    pointer-events: none;
  }

  .tarot-library-hero h1 {
    line-height: 1.05;
  }

  .tarot-library-title {
    font-size: clamp(1.125rem, 1.7vw, 1.35rem);
    line-height: 1.2;
    font-weight: 700;
    letter-spacing: 0.025em;
    color: #efe8ff;
    transition: color 180ms ease;
  }

  .tarot-library-draw-btn,
  .tarot-library-create-btn {
    border: 1px solid rgba(255, 207, 159, 0.48);
    background: rgba(244, 194, 194, 0.14);
    color: #ffe7d0;
    box-shadow: 0 12px 34px rgba(244, 128, 99, 0.14);
    transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
  }

  .tarot-library-draw-btn:hover,
  .tarot-library-create-btn:hover {
    transform: translateY(-1px);
    background: rgba(244, 194, 194, 0.23);
    box-shadow: 0 18px 42px rgba(244, 128, 99, 0.22);
  }

  .tarot-library-header-btn {
    min-height: 44px;
    padding: 0 18px;
    justify-content: center;
    white-space: nowrap;
  }

  .tarot-library-shelf,
  .tarot-library-counter {
    position: relative;
    border-width: 2px;
    border-color: rgba(255,255,255,0.22);
    background: transparent;
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.045);
    backdrop-filter: none;
  }

  .tarot-library-shelf {
    overflow: hidden;
  }

  .tarot-library-grid {
    position: relative;
    z-index: 1;
  }

  .tarot-library-deck-card {
    position: relative;
    z-index: 1;
    border: 1px solid rgba(255,255,255,0.1);
    background:
      linear-gradient(180deg, rgba(255,255,255,0.068), rgba(255,255,255,0.026)),
      rgba(18, 17, 31, 0.48);
    box-shadow: 0 14px 34px rgba(0,0,0,0.2);
    overflow: hidden;
  }

  .tarot-library-deck-card::before {
    content: "";
    position: absolute;
    inset: -40%;
    background: linear-gradient(115deg, transparent 34%, rgba(255,255,255,0.22) 48%, transparent 62%);
    opacity: 0;
    transform: translateX(-35%);
    transition: opacity 220ms ease, transform 520ms ease;
    pointer-events: none;
  }

  .tarot-library-deck-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 207, 159, 0.34);
    background:
      linear-gradient(180deg, rgba(255,255,255,0.095), rgba(255,255,255,0.038)),
      rgba(28, 22, 41, 0.58);
    box-shadow: 0 20px 44px rgba(0,0,0,0.28), 0 0 26px rgba(244,194,194,0.12);
  }

  .tarot-library-deck-card:hover::before {
    opacity: 1;
    transform: translateX(38%);
  }

  .tarot-library-deck-cover,
  .tarot-library-cover-preview {
    border: 1px solid rgba(255,255,255,0.11);
    background: #241b34;
    box-shadow: inset 0 0 26px rgba(255,255,255,0.05), 0 10px 24px rgba(0,0,0,0.22);
  }

  .tarot-library-counter {
    align-self: start;
  }

  .tarot-library-input,
  .tarot-library-cover-field {
    border: 2px solid rgba(255,255,255,0.2);
    background: transparent;
  }

  .tarot-library-input:focus {
    border-color: rgba(255, 207, 159, 0.38);
    box-shadow: 0 0 0 3px rgba(255, 207, 159, 0.1);
  }

  .tarot-library-soft-btn {
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.08);
  }

  .tarot-library-soft-btn:hover {
    background: rgba(255, 207, 159, 0.14);
    border-color: rgba(255, 207, 159, 0.28);
  }

  @media (max-width: 760px) {
    .tarot-library-page {
      margin-top: -24px;
    }

    .tarot-library-hero {
      align-items: flex-start;
      gap: 10px;
      padding: 10px 12px;
    }

    .tarot-library-title {
      width: 100%;
      font-size: 1.05rem;
    }

    .tarot-library-hero > div {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .tarot-library-hero > div:has(a:nth-child(3)) {
      grid-template-columns: 1fr;
    }

    .tarot-library-header-btn {
      min-height: 40px;
      padding: 0 12px;
      font-size: 0.72rem;
      letter-spacing: 0.02em;
    }

    .tarot-library-shelf,
    .tarot-library-counter {
      border-width: 1.5px;
    }

    .tarot-library-grid {
      grid-template-columns: 1fr;
    }

    .tarot-library-deck-card {
      padding: 12px;
    }

    .tarot-library-deck-cover {
      max-width: min(230px, 78vw);
      margin-left: auto;
      margin-right: auto;
    }

    .tarot-library-counter {
      order: -1;
    }
  }
`;function Mh({user:e}){let{deckId:t}=st(),n=at(),r=(0,w.useRef)(null),[i,a]=(0,w.useState)(null),[o,s]=(0,w.useState)(``),[c,l]=(0,w.useState)(`all`),[u,d]=(0,w.useState)(``),[f,p]=(0,w.useState)(null),m=(0,w.useMemo)(()=>f?URL.createObjectURL(f):``,[f]),[h,g]=(0,w.useState)({name:``,description:``,coverImage:``,deckType:`tarot`,allowReversed:!0,isPublic:!1});(0,w.useEffect)(()=>{$(`/api/tarot/decks/${t}/cards/`).then(e=>{a(e),g({name:e.deck.name,description:e.deck.description??``,coverImage:e.deck.coverImage??``,deckType:e.deck.deckType,allowReversed:e.deck.allowReversed,isPublic:!1}),p(null),r.current&&(r.current.value=``)}).catch(e=>d(e.message||`Failed to load deck.`))},[t]),(0,w.useEffect)(()=>{let e=m;return()=>{e&&URL.revokeObjectURL(e)}},[m]);let _=(0,w.useMemo)(()=>{let e=i?.cards??[],t=o.trim().toLowerCase();return e.filter(e=>{let n=c===`all`||e.arcana===c,r=`${e.name} ${(e.keywords??[]).join(` `)} ${e.uprightMeaning??``}`.toLowerCase();return n&&(!t||r.includes(t))})},[c,i,o]),v=!!(i?.deck&&!i.deck.isSystem&&(i.deck.ownerId===e?.id||i.deck.ownerId==null&&e));return(0,Z.jsx)(ih,{user:e,wide:!0,hideHeader:!0,hideBackground:!0,children:(0,Z.jsxs)(ch,{showDeckListButton:!0,children:[(0,Z.jsx)(oh,{message:u}),i?null:(0,Z.jsx)(sh,{}),i?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:`mb-6 flex flex-wrap items-end justify-between gap-4`,children:[(0,Z.jsxs)(`div`,{className:`flex flex-wrap items-end gap-4`,children:[(0,Z.jsx)(`div`,{className:`h-28 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#241b34]`,children:fh(i.deck)?(0,Z.jsx)(`img`,{src:fh(i.deck),alt:`${i.deck.name} cover`,className:`h-full w-full object-cover`}):(0,Z.jsx)(Eh,{card:{name:i.deck.name},compact:!0})}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`mb-2 text-sm uppercase tracking-[0.28em] text-[#f4c2c2]`,children:`Deck Archive`}),(0,Z.jsx)(`h1`,{className:`text-3xl font-semibold text-white`,children:i.deck.name}),(0,Z.jsx)(`p`,{className:`mt-2 max-w-3xl text-sm leading-7 text-slate-300`,children:i.deck.description})]})]}),(0,Z.jsx)(`div`,{className:`flex gap-3`,children:v?(0,Z.jsxs)(R,{to:`/tarot/decks/${i.deck.id}/cards/new`,className:`tarot-library-create-btn inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold`,children:[(0,Z.jsx)(tm,{className:`h-4 w-4`}),` CARD`]}):null})]}),(0,Z.jsx)(ah,{className:`mb-5`,children:(0,Z.jsxs)(`div`,{className:`flex flex-col gap-3 md:flex-row`,children:[(0,Z.jsxs)(`label`,{className:`relative flex-1`,children:[(0,Z.jsx)(rm,{className:`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400`}),(0,Z.jsx)(`input`,{className:`w-full rounded-xl border border-white/10 bg-white/8 px-10 py-3 text-white outline-none`,placeholder:`Search cards`,value:o,onChange:e=>s(e.target.value)})]}),(0,Z.jsxs)(`select`,{className:`rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white`,value:c,onChange:e=>l(e.target.value),children:[(0,Z.jsx)(`option`,{value:`all`,children:`All`}),nh.map(e=>(0,Z.jsx)(`option`,{value:e,children:e},e))]})]})}),(0,Z.jsxs)(`div`,{className:`grid gap-5 lg:grid-cols-[1fr_340px]`,children:[(0,Z.jsx)(`div`,{className:`grid gap-4 sm:grid-cols-2 xl:grid-cols-3`,children:_.map(e=>(0,Z.jsx)(Dh,{card:e,editable:v},e.id))}),v?(0,Z.jsxs)(ah,{className:`h-fit`,children:[(0,Z.jsx)(`h2`,{className:`text-lg font-semibold text-white`,children:`Edit Deck`}),(0,Z.jsxs)(`form`,{className:`mt-4 space-y-4`,onSubmit:async e=>{e.preventDefault(),d(``);try{let e={name:h.name,description:h.description,deckType:h.deckType,allowReversed:h.allowReversed,isPublic:!1},n=f?Object.entries(e).reduce((e,[t,n])=>(e.append(t,n??``),e),new FormData):JSON.stringify(e);f&&n.append(`coverImageFile`,f);let i=await $(`/api/tarot/decks/${t}/`,{method:`PUT`,body:n});a(e=>e&&{...e,deck:i}),g(e=>({...e,coverImage:i.coverImage??``,isPublic:!1})),p(null),r.current&&(r.current.value=``)}catch(e){d(e.message||`Failed to save deck.`)}},children:[(0,Z.jsx)(`input`,{className:`w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none`,value:h.name,onChange:e=>g(t=>({...t,name:e.target.value}))}),(0,Z.jsx)(`textarea`,{className:`min-h-28 w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none`,value:h.description,onChange:e=>g(t=>({...t,description:e.target.value}))}),(0,Z.jsxs)(`div`,{className:`grid gap-3 rounded-xl border border-white/10 bg-white/6 p-3`,children:[(0,Z.jsx)(`div`,{className:`aspect-[3/2] overflow-hidden rounded-lg border border-white/10 bg-[#241b34]`,children:m||h.coverImage?(0,Z.jsx)(`img`,{src:m||h.coverImage,alt:`Deck cover preview`,className:`h-full w-full object-cover`}):(0,Z.jsx)(Eh,{card:{name:h.name||`Deck`},compact:!0})}),(0,Z.jsx)(`input`,{ref:r,className:`hidden`,type:`file`,accept:`image/jpeg,image/png,image/webp`,onChange:e=>{let t=e.target.files?.[0]??null;p(t),t&&g(e=>({...e,coverImage:``}))}}),(0,Z.jsxs)(`button`,{className:`inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/8 px-4 py-3 font-semibold text-white transition hover:bg-white/12`,type:`button`,onClick:()=>r.current?.click(),children:[(0,Z.jsx)(Jp,{className:`h-4 w-4`}),`Cover`]}),f?(0,Z.jsxs)(`p`,{className:`text-sm text-slate-300`,children:[`Selected: `,f.name,` `,(0,Z.jsx)(`button`,{className:`font-semibold text-[#f4c2c2] hover:text-white`,type:`button`,onClick:()=>{p(null),r.current&&(r.current.value=``)},children:`clear`})]}):null]}),(0,Z.jsxs)(`select`,{className:`w-full rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white`,value:h.deckType,onChange:e=>g(t=>({...t,deckType:e.target.value})),children:[(0,Z.jsx)(`option`,{value:`tarot`,children:`Tarot`}),(0,Z.jsx)(`option`,{value:`oracle`,children:`Oracle`})]}),(0,Z.jsxs)(`label`,{className:`flex items-center gap-3 text-sm text-slate-200`,children:[(0,Z.jsx)(`input`,{type:`checkbox`,checked:h.allowReversed,onChange:e=>g(t=>({...t,allowReversed:e.target.checked}))}),`Allow reversed cards`]}),(0,Z.jsx)(`div`,{className:`rounded-xl border border-white/10 bg-white/6 p-4`,children:(0,Z.jsxs)(`div`,{className:`flex items-start justify-between gap-3`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`text-sm font-semibold text-white`,children:`Private Deck`}),(0,Z.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-slate-300`,children:`Personal decks stay private while sharing is paused.`})]}),(0,Z.jsx)(`span`,{className:`rounded-full bg-white/8 px-2.5 py-1 text-xs text-slate-300`,children:`PRIVATE`})]})}),(0,Z.jsxs)(`div`,{className:`flex gap-3`,children:[(0,Z.jsxs)(`button`,{className:`inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]`,type:`submit`,children:[(0,Z.jsx)(zp,{className:`h-4 w-4`}),` SAVE`]}),(0,Z.jsx)(`button`,{className:`inline-flex items-center justify-center rounded-full border border-rose-200/20 px-4 py-3 text-rose-100 transition hover:bg-rose-300/10`,type:`button`,onClick:async()=>{if(window.confirm(`Delete this deck and all of its cards?`)){d(``);try{await $(`/api/tarot/decks/${t}/`,{method:`DELETE`}),n(`/tarot/decks`)}catch(e){d(e.message||`Failed to delete deck.`)}}},"aria-label":`Delete deck`,children:(0,Z.jsx)(om,{className:`h-4 w-4`})})]})]})]}):null]})]}):null]})})}function Nh({user:e}){let{deckId:t,cardId:n}=st(),r=at(),i=(0,w.useRef)(null),[a,o]=(0,w.useState)(t??``),[s,c]=(0,w.useState)(null),l=(0,w.useMemo)(()=>s?URL.createObjectURL(s):``,[s]),[u,d]=(0,w.useState)({name:``,arcana:`oracle`,suit:`none`,number:``,keywords:``,uprightMeaning:``,reversedMeaning:``,image:``,order:0}),[f,p]=(0,w.useState)(``);(0,w.useEffect)(()=>{n&&$(`/api/tarot/cards/${n}/`).then(e=>{d({name:e.name,arcana:e.arcana,suit:e.suit,number:e.number??``,keywords:(e.keywords??[]).join(`, `),uprightMeaning:e.uprightMeaning,reversedMeaning:e.reversedMeaning,image:e.image,order:e.order}),o(String(e.deckId))}).catch(e=>p(e.message||`Failed to load card.`))},[n]),(0,w.useEffect)(()=>{let e=l;return()=>{e&&URL.revokeObjectURL(e)}},[l]);let m=e=>t=>d(n=>({...n,[e]:t.target.value})),h=()=>{i.current?.click()},g=e=>{c(e.target.files?.[0]??null)},_=async e=>{e.preventDefault(),p(``);let i={...u,deckId:t,suit:u.arcana===`minor`?u.suit:`none`,number:u.number===``?null:Number(u.number),order:Number(u.order||0),keywords:u.keywords.split(`,`).map(e=>e.trim()).filter(Boolean)};delete i.image;let a=s?Object.entries(i).reduce((e,[t,n])=>(e.append(t,Array.isArray(n)?JSON.stringify(n):n??``),e),new FormData):JSON.stringify(i);s&&a.append(`imageFile`,s);try{r(`/tarot/decks/${(await $(n?`/api/tarot/cards/${n}/`:`/api/tarot/cards/`,{method:s||!n?`POST`:`PUT`,body:a})).deckId}`)}catch(e){p(e.message||`Failed to save card.`)}},v=l||u.image,y=async()=>{if(!(!n||!window.confirm(`Delete this card?`))){p(``);try{await $(`/api/tarot/cards/${n}/`,{method:`DELETE`}),r(`/tarot/decks/${a}`)}catch(e){p(e.message||`Failed to delete card.`)}}};return(0,Z.jsx)(ih,{user:e,children:(0,Z.jsxs)(ah,{className:`mx-auto max-w-3xl`,children:[(0,Z.jsx)(`p`,{className:`mb-2 text-sm uppercase tracking-[0.28em] text-[#f4c2c2]`,children:`Tarot / Card`}),(0,Z.jsx)(`h1`,{className:`text-3xl font-semibold text-white`,children:n?`Edit Card`:`Create Card`}),(0,Z.jsx)(oh,{message:f}),(0,Z.jsxs)(`form`,{className:`mt-6 grid gap-4`,onSubmit:_,children:[(0,Z.jsx)(`input`,{className:`rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none`,placeholder:`Card name`,value:u.name,onChange:m(`name`)}),(0,Z.jsxs)(`div`,{className:`grid gap-4 md:grid-cols-3`,children:[(0,Z.jsx)(`select`,{className:`rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white`,value:u.arcana,onChange:m(`arcana`),children:nh.map(e=>(0,Z.jsx)(`option`,{value:e,children:e},e))}),(0,Z.jsx)(`select`,{className:`rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white`,value:u.suit,onChange:m(`suit`),disabled:u.arcana!==`minor`,children:rh.map(e=>(0,Z.jsx)(`option`,{value:e,children:e},e))}),(0,Z.jsx)(`input`,{className:`rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none`,placeholder:`Number`,value:u.number,onChange:m(`number`)})]}),(0,Z.jsx)(`input`,{className:`rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none`,placeholder:`Keywords, comma separated`,value:u.keywords,onChange:m(`keywords`)}),(0,Z.jsx)(`textarea`,{className:`min-h-32 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none`,placeholder:`Upright meaning`,value:u.uprightMeaning,onChange:m(`uprightMeaning`)}),(0,Z.jsx)(`textarea`,{className:`min-h-32 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none`,placeholder:`Reversed meaning`,value:u.reversedMeaning,onChange:m(`reversedMeaning`)}),(0,Z.jsxs)(`div`,{className:`grid gap-3`,children:[(0,Z.jsx)(`input`,{ref:i,className:`hidden`,type:`file`,accept:`image/jpeg,image/png,image/webp`,onChange:g}),(0,Z.jsxs)(`button`,{className:`inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/8 px-4 py-3 font-semibold text-white transition hover:bg-white/12`,type:`button`,onClick:h,children:[(0,Z.jsx)(Jp,{className:`h-4 w-4`}),`Image`]})]}),s?(0,Z.jsxs)(`p`,{className:`text-sm text-slate-300`,children:[`Selected: `,s.name,` `,(0,Z.jsx)(`button`,{className:`font-semibold text-[#f4c2c2] hover:text-white`,type:`button`,onClick:()=>{c(null),i.current&&(i.current.value=``)},children:`clear`})]}):null,(0,Z.jsxs)(`div`,{className:`grid gap-3 rounded-xl border border-white/10 bg-white/6 p-3 md:grid-cols-[120px_1fr] md:items-center`,children:[(0,Z.jsx)(`div`,{className:`aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-[#241b34]`,children:v?(0,Z.jsx)(`img`,{src:v,alt:`Selected tarot card preview`,className:`h-full w-full object-cover`}):(0,Z.jsx)(Eh,{card:{...u,name:u.name||`New Card`},compact:!0})}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`text-sm font-semibold text-white`,children:`Card image preview`}),(0,Z.jsx)(`p`,{className:`mt-2 text-sm leading-6 text-slate-300`,children:v?`This image will be shown on the card.`:`Choose an image file.`})]})]}),(0,Z.jsxs)(`div`,{className:`flex gap-3`,children:[(0,Z.jsxs)(`button`,{className:`inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]`,type:`submit`,children:[(0,Z.jsx)(zp,{className:`h-4 w-4`}),` SAVE`]}),n?(0,Z.jsx)(`button`,{className:`inline-flex items-center justify-center rounded-full border border-rose-200/20 px-5 py-3 text-rose-100 transition hover:bg-rose-300/10`,type:`button`,onClick:y,children:(0,Z.jsx)(om,{className:`h-4 w-4`})}):null]})]})]})})}function Ph({user:e}){return(0,Z.jsx)(ih,{user:e,wide:!0,children:(0,Z.jsx)(Fh,{})})}function Fh({embedded:e=!1,showResultPanel:t=!0,onReadingComplete:n}){let[r,i]=(0,w.useState)([]),[a,o]=(0,w.useState)(``),[s,c]=(0,w.useState)(`one_card`),[l,u]=(0,w.useState)(!0),[d,f]=(0,w.useState)(``),[p,m]=(0,w.useState)(null),[h,g]=(0,w.useState)(``),[_,v]=(0,w.useState)(!1),y=(0,w.useMemo)(()=>r.find(e=>String(e.id)===String(a)),[a,r]);return(0,w.useEffect)(()=>{$(`/api/tarot/decks/`).then(e=>{let t=[...e.systemDecks,...e.sharedDecks??[],...e.myDecks];i(t),o(String(t[0]?.id??``))}).catch(e=>g(e.message||`Failed to load decks.`))},[]),(0,Z.jsxs)(`div`,{className:`${e?`tarot-reading-embedded`:`mx-auto max-w-7xl`} grid gap-5 ${t?`lg:grid-cols-[360px_1fr]`:``}`,children:[(0,Z.jsxs)(ah,{children:[e?null:(0,Z.jsxs)(R,{to:`/bookdesign`,state:{bookSection:`tarot`},className:`mb-2 inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-[#f4c2c2] transition hover:text-white`,children:[(0,Z.jsx)(Fp,{className:`h-4 w-4`}),`Tarot / Draw`]}),e?null:(0,Z.jsx)(`h1`,{className:`text-3xl font-semibold text-white`,children:`Draw Cards`}),(0,Z.jsx)(oh,{message:h}),(0,Z.jsxs)(`form`,{className:`${e?`mt-0 space-y-3`:`mt-6 space-y-4`}`,onSubmit:async e=>{if(e.preventDefault(),g(``),m(null),!y||Number(y.cardCount??0)<2){window.alert(`このデッキにはカードが2枚以上ありません。カードを追加してからシャッフルしてください。`);return}v(!0);try{let e=await $(`/api/tarot/readings/draw/`,{method:`POST`,body:JSON.stringify({deckId:Number(a),spreadType:s,allowReversed:l,question:d,includeAi:!0})});m(e),n?.(e)}catch(e){g(e.message||`Failed to draw cards.`)}finally{v(!1)}},children:[(0,Z.jsx)(Ih,{decks:r,selectedDeckId:a,onSelect:o,compact:e}),(0,Z.jsxs)(`select`,{className:`w-full rounded-xl border border-white/10 bg-[#221a32] px-4 py-3 text-white`,value:s,onChange:e=>c(e.target.value),children:[(0,Z.jsx)(`option`,{value:`one_card`,children:`One card`}),(0,Z.jsx)(`option`,{value:`three_card`,children:`Three cards`})]}),(0,Z.jsx)(`textarea`,{className:`${e?`min-h-24`:`min-h-28`} w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none`,placeholder:`Question`,value:d,onChange:e=>f(e.target.value)}),(0,Z.jsxs)(`label`,{className:`flex items-center gap-3 text-sm text-slate-200`,children:[(0,Z.jsx)(`input`,{type:`checkbox`,checked:l,onChange:e=>u(e.target.checked)}),`Allow reversed cards`]}),(0,Z.jsxs)(`button`,{className:`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[#f4c2c2]/55 bg-[#f4c2c2]/14 px-5 py-3 font-semibold text-[#ffe4ec] shadow-[0_10px_28px_rgba(244,194,194,0.14)] transition hover:-translate-y-0.5 hover:border-[#ffdbe6]/75 hover:bg-[#f4c2c2]/24 hover:shadow-[0_14px_34px_rgba(244,194,194,0.22)] disabled:cursor-wait disabled:opacity-70`,type:`submit`,disabled:_,children:[(0,Z.jsx)(im,{className:`h-4 w-4`}),` `,_?`DRAWING...`:`DRAW AND SAVE`]})]})]}),t?(0,Z.jsx)(Lh,{result:p,loading:_}):null]})}function Ih({decks:e,selectedDeckId:t,onSelect:n,compact:r=!1}){return e.length?(0,Z.jsx)(`div`,{children:(0,Z.jsx)(`div`,{className:`-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 pt-2 sm:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`,children:e.map(e=>{let i=String(e.id)===String(t);return(0,Z.jsxs)(`button`,{type:`button`,onClick:()=>n(String(e.id)),className:`${r?`min-w-[132px] sm:min-w-[156px]`:`min-w-[136px] sm:min-w-[148px]`} rounded-2xl border p-2 text-left transition hover:-translate-y-1 hover:bg-white/12 ${i?`border-[#f4c2c2] bg-[#f4c2c2]/12 shadow-[0_0_0_1px_rgba(244,194,194,0.26)]`:`border-white/10 bg-white/7`}`,children:[(0,Z.jsx)(`span`,{className:`block aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-[#241b34]`,children:fh(e)?(0,Z.jsx)(`img`,{src:fh(e),alt:`${e.name} cover`,loading:`lazy`,decoding:`async`,className:`h-full w-full object-cover`}):(0,Z.jsx)(`span`,{className:`block h-full w-full`,children:(0,Z.jsx)(Eh,{card:{name:e.name},compact:!0})})}),(0,Z.jsx)(`span`,{className:`mt-2 block truncate text-sm font-semibold text-white`,children:e.name}),(0,Z.jsxs)(`span`,{className:`mt-1 block text-xs text-slate-400`,children:[e.cardCount,` cards`]})]},e.id)})})}):(0,Z.jsx)(`p`,{className:`rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-200`,children:`Loading decks...`})}function Lh({result:e,loading:t=!1,showHeader:n=!0}){return t?(0,Z.jsx)(ah,{className:`flex min-h-[420px] items-center justify-center text-center text-slate-300`,children:`Drawing cards and listening for the reading...`}):e?(0,Z.jsxs)(ah,{children:[n?(0,Z.jsxs)(`div`,{className:`mb-5 flex flex-wrap items-start justify-between gap-3`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`text-sm uppercase tracking-[0.22em] text-[#f4c2c2]`,children:e.spreadType}),(0,Z.jsx)(`h2`,{className:`mt-2 text-2xl font-semibold text-white`,children:e.question||`Untitled reading`})]}),(0,Z.jsx)(R,{to:`/tarot/readings/${e.id}`,className:`rounded-full border border-white/12 px-4 py-2 text-sm text-white`,children:`DETAIL`})]}):null,(0,Z.jsx)(Rh,{result:e}),(0,Z.jsxs)(`p`,{className:`mt-5 text-sm text-slate-400`,children:[`Remaining saved readings: `,e.remaining,`/`,e.limit]}),(0,Z.jsx)(Bh,{result:e})]}):(0,Z.jsx)(ah,{className:`flex min-h-[420px] items-center justify-center text-center text-slate-300`,children:`Your reading will appear here.`})}function Rh({result:e}){let[t,n]=(0,w.useState)(null);if(!e)return null;let r=e.cards.length===1,i=(e,t)=>{e.currentTarget.blur(),n(t.position),window.setTimeout(()=>{n(e=>e===t.position?null:e)},760)};return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`style`,{children:zh}),(0,Z.jsx)(`div`,{className:`grid gap-4 ${r?`place-items-center`:`md:grid-cols-3`}`,children:e.cards.map((e,n)=>(0,Z.jsxs)(`article`,{className:`tarot-reading-card-live cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/7 p-4 ${t===e.position?`tarot-reading-card-awake`:``} ${r?`w-full max-w-[280px]`:``}`,onClick:t=>i(t,e),style:{animationDelay:`${n*160}ms`},children:[(0,Z.jsxs)(`div`,{className:`tarot-reading-card-face mb-4 aspect-[3/4] overflow-hidden rounded-lg border border-white/10 bg-[#241b34] ${e.isReversed?`rotate-180`:``}`,children:[(0,Z.jsx)(Eh,{card:{...e,image:e.image,name:e.cardName},compact:!0}),(0,Z.jsx)(`span`,{className:`tarot-reading-card-shine`,"aria-hidden":`true`}),(0,Z.jsx)(`span`,{className:`tarot-reading-card-aura`,"aria-hidden":`true`}),(0,Z.jsx)(`span`,{className:`tarot-reading-card-spark tarot-reading-card-spark-one`,"aria-hidden":`true`}),(0,Z.jsx)(`span`,{className:`tarot-reading-card-spark tarot-reading-card-spark-two`,"aria-hidden":`true`}),(0,Z.jsx)(`span`,{className:`tarot-reading-card-spark tarot-reading-card-spark-three`,"aria-hidden":`true`})]}),(0,Z.jsx)(`p`,{className:`text-xs uppercase tracking-[0.2em] text-slate-400`,children:e.positionLabel}),(0,Z.jsx)(`h3`,{className:`mt-3 text-lg font-semibold text-white`,children:e.cardName}),(0,Z.jsx)(`p`,{className:`mt-1 text-sm text-[#f4c2c2]`,children:e.isReversed?`Reversed`:`Upright`}),(0,Z.jsx)(`p`,{className:`mt-4 text-sm leading-7 text-slate-300`,children:e.meaning})]},e.position))})]})}var zh=`
  .tarot-reading-card-live {
    position: relative;
    animation: tarotReadingCardFloat 5.8s ease-in-out infinite;
    box-shadow: 0 14px 34px rgba(0,0,0,0.22), 0 0 22px rgba(244,194,194,0.08);
  }

  .tarot-reading-card-live:active {
    transform: translateY(-2px) scale(0.99);
  }

  .tarot-reading-card-awake {
    animation: tarotReadingCardAwake 760ms ease-out both, tarotReadingCardFloat 5.8s ease-in-out infinite 760ms;
    border-color: rgba(255,232,246,0.34);
  }

  .tarot-reading-card-face {
    position: relative;
    isolation: isolate;
    box-shadow: 0 0 22px rgba(216,196,255,0.18), inset 0 0 18px rgba(255,255,255,0.06);
  }

  .tarot-reading-card-shine {
    position: absolute;
    inset: -35%;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.34) 45%, rgba(244,194,194,0.18) 50%, transparent 64%);
    mix-blend-mode: screen;
    transform: translateX(-72%) rotate(8deg);
    animation: tarotReadingCardShine 4.2s ease-in-out infinite;
  }

  .tarot-reading-card-aura {
    position: absolute;
    inset: 6%;
    z-index: 2;
    border-radius: 16px;
    pointer-events: none;
    opacity: 0;
    background:
      radial-gradient(circle at 50% 46%, rgba(255,255,255,0.36), transparent 28%),
      radial-gradient(circle at 50% 50%, rgba(244,194,194,0.26), transparent 58%);
    box-shadow:
      0 0 28px rgba(255,255,255,0.34),
      0 0 48px rgba(244,194,194,0.34),
      inset 0 0 26px rgba(255,255,255,0.18);
    mix-blend-mode: screen;
  }

  .tarot-reading-card-awake .tarot-reading-card-face {
    animation: tarotReadingCardFaceAwake 760ms ease-out both;
  }

  .tarot-reading-card-awake .tarot-reading-card-aura {
    animation: tarotReadingCardAuraAwake 760ms ease-out both;
  }

  .tarot-reading-card-awake .tarot-reading-card-shine {
    animation: tarotReadingCardShineAwake 760ms ease-out both, tarotReadingCardShine 4.2s ease-in-out infinite 760ms;
  }

  .tarot-reading-card-spark {
    position: absolute;
    z-index: 3;
    width: 7px;
    height: 7px;
    border-radius: 999px;
    pointer-events: none;
    background: rgba(255,255,255,0.9);
    box-shadow: 0 0 10px rgba(255,255,255,0.85), 0 0 18px rgba(244,194,194,0.48);
    animation: tarotReadingCardSpark 2.8s ease-in-out infinite;
  }

  .tarot-reading-card-spark-one {
    left: 18%;
    top: 22%;
  }

  .tarot-reading-card-spark-two {
    right: 19%;
    top: 44%;
    animation-delay: 720ms;
  }

  .tarot-reading-card-spark-three {
    left: 48%;
    bottom: 16%;
    animation-delay: 1380ms;
  }

  @keyframes tarotReadingCardFloat {
    0%, 100% {
      transform: translateY(0);
      filter: brightness(1);
    }
    50% {
      transform: translateY(-5px);
      filter: brightness(1.06);
    }
  }

  @keyframes tarotReadingCardAwake {
    0% {
      transform: translateY(0) scale(1) rotate(0deg);
      box-shadow: 0 14px 34px rgba(0,0,0,0.22), 0 0 22px rgba(244,194,194,0.08);
    }
    28% {
      transform: translateY(-7px) scale(1.025) rotate(-0.8deg);
      box-shadow: 0 18px 42px rgba(0,0,0,0.26), 0 0 42px rgba(244,194,194,0.34), 0 0 58px rgba(216,196,255,0.22);
    }
    52% {
      transform: translateY(-4px) scale(1.012) rotate(0.7deg);
    }
    100% {
      transform: translateY(0) scale(1) rotate(0deg);
      box-shadow: 0 14px 34px rgba(0,0,0,0.22), 0 0 22px rgba(244,194,194,0.08);
    }
  }

  @keyframes tarotReadingCardFaceAwake {
    0%, 100% {
      filter: brightness(1) saturate(1);
    }
    34% {
      filter: brightness(1.22) saturate(1.18);
    }
  }

  @keyframes tarotReadingCardAuraAwake {
    0% {
      opacity: 0;
      transform: scale(0.82);
    }
    32% {
      opacity: 0.95;
      transform: scale(1.02);
    }
    100% {
      opacity: 0;
      transform: scale(1.18);
    }
  }

  @keyframes tarotReadingCardShineAwake {
    0% {
      opacity: 0;
      transform: translateX(-86%) rotate(8deg);
    }
    38% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(86%) rotate(8deg);
    }
  }

  @keyframes tarotReadingCardShine {
    0%, 46% {
      opacity: 0;
      transform: translateX(-72%) rotate(8deg);
    }
    58% {
      opacity: 0.9;
    }
    82%, 100% {
      opacity: 0;
      transform: translateX(72%) rotate(8deg);
    }
  }

  @keyframes tarotReadingCardSpark {
    0%, 100% {
      opacity: 0.18;
      transform: scale(0.65);
    }
    42% {
      opacity: 1;
      transform: scale(1.18);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tarot-reading-card-live,
    .tarot-reading-card-shine,
    .tarot-reading-card-spark,
    .tarot-reading-card-aura,
    .tarot-reading-card-awake,
    .tarot-reading-card-awake .tarot-reading-card-face {
      animation: none;
    }
  }
`;function Bh({result:e}){return e?.aiInterpretation?(0,Z.jsxs)(`div`,{className:`mt-4 rounded-2xl border border-[#f4c2c2]/20 bg-[#f4c2c2]/8 p-5`,children:[(0,Z.jsx)(`p`,{className:`text-xs uppercase tracking-[0.24em] text-[#f4c2c2]`,children:`Witch's Reading`}),(0,Z.jsx)(`div`,{className:`mt-3 whitespace-pre-line text-sm leading-8 text-slate-100`,children:e.aiInterpretation})]}):null}function Vh({user:e}){let{readingId:t}=st(),n=at(),[r,i]=(0,w.useState)(null),[a,o]=(0,w.useState)(``),[s,c]=(0,w.useState)(``);return(0,w.useEffect)(()=>{$(`/api/tarot/readings/${t}/`).then(e=>{i(e),o(e.memo||``)}).catch(e=>c(e.message||`Failed to load reading.`))},[t]),(0,Z.jsx)(ih,{user:e,wide:!0,children:(0,Z.jsxs)(`div`,{className:`mx-auto max-w-5xl`,children:[(0,Z.jsx)(oh,{message:s}),r?null:(0,Z.jsx)(sh,{}),r?(0,Z.jsxs)(ah,{children:[(0,Z.jsxs)(`div`,{className:`mb-6 flex flex-wrap items-start justify-between gap-3`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`text-sm uppercase tracking-[0.22em] text-[#f4c2c2]`,children:r.spreadType}),(0,Z.jsx)(`h1`,{className:`mt-2 text-3xl font-semibold text-white`,children:r.question||`Untitled reading`})]}),(0,Z.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,Z.jsx)(`button`,{type:`button`,className:`cursor-pointer rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10`,onClick:()=>{n(`/bookdesign`,{state:{bookSection:`diary`,diaryPage:`list`,selectedDate:uh(r?.createdAt)}})},children:`BACK TO DIARY LIST`}),(0,Z.jsx)(`button`,{type:`button`,className:`rounded-full border border-white/12 px-4 py-2 text-white`,onClick:async()=>i(await $(`/api/tarot/readings/${r.id}/`,{method:`PATCH`,body:JSON.stringify({isPinned:!r.isPinned})})),children:(0,Z.jsx)(am,{className:`h-4 w-4 ${r.isPinned?`fill-[#f4c2c2] text-[#f4c2c2]`:``}`})})]})]}),(0,Z.jsx)(Lh,{result:r,showHeader:!1}),(0,Z.jsxs)(`div`,{className:`mt-5`,children:[(0,Z.jsx)(`label`,{className:`mb-2 block text-sm text-slate-300`,children:`Memo`}),(0,Z.jsx)(`textarea`,{className:`min-h-32 w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-white outline-none`,value:a,onChange:e=>o(e.target.value)}),(0,Z.jsx)(`button`,{type:`button`,onClick:async()=>{i(await $(`/api/tarot/readings/${t}/`,{method:`PATCH`,body:JSON.stringify({memo:a})}))},className:`mt-3 rounded-full bg-[#f4c2c2] px-5 py-3 font-semibold text-[#2a2036]`,children:`SAVE MEMO`})]})]}):null]})})}var Hh={personName:``,place:``,birthDate:``,birthTime:``},Uh=e=>e.reduce((e,t)=>{let n=(t.personName||`#`).charAt(0).toUpperCase(),r=/[A-Z]/.test(n)?n:`#`;return{...e,[r]:[...e[r]??[],t]}},{}),Wh=e=>Object.entries(e).sort(([e],[t])=>e===`#`?1:t===`#`?-1:e.localeCompare(t));function Gh({user:e}){let t=at(),n=nt(),[r,i]=(0,w.useState)({publicProfiles:[],privateProfiles:[]}),[a,o]=(0,w.useState)(Hh),[s,c]=(0,w.useState)(null),[l,u]=(0,w.useState)(null),[d,f]=(0,w.useState)(()=>n.state?.page??0),[p,m]=(0,w.useState)(!1),[h,g]=(0,w.useState)(``),[_,v]=(0,w.useState)(!1),[y,b]=(0,w.useState)(!1),[x,S]=(0,w.useState)(null),[C,T]=(0,w.useState)(null),[E,ee]=(0,w.useState)(0),[D,te]=(0,w.useState)(``),[ne,re]=(0,w.useState)(null),[ie,ae]=(0,w.useState)(``),oe=!!e;(0,w.useEffect)(()=>{$(`/api/chart/profiles/`).then(e=>{if(Array.isArray(e)){i({publicProfiles:e,privateProfiles:[]});return}i({publicProfiles:e.publicProfiles??[],privateProfiles:oe?e.privateProfiles??[]:[]})}).catch(e=>g(e.message||`Failed to load profiles.`)),oe||(o(Hh),u(null),f(0),m(!1),g(``))},[oe]),(0,w.useEffect)(()=>{if(n.state?.bookSection===`tarot`){v(!1),b(!0),S(null),ae(``),f(n.state?.tarotPage===`draw`?3:2);return}if(n.state?.bookSection===`diary`){b(!1),v(!0),S(null),ee(+(n.state?.diaryPage===`list`)),te(n.state?.selectedDate??``),f(2);return}typeof n.state?.page==`number`&&f(n.state.page)},[n.state?.bookSection,n.state?.diaryPage,n.state?.page,n.state?.selectedDate,n.state?.tarotPage]);let se=(0,w.useMemo)(()=>Wh(Uh(r.publicProfiles)),[r.publicProfiles]),O=(0,w.useMemo)(()=>Wh(Uh(r.privateProfiles)),[r.privateProfiles]),k=e=>t=>{o(n=>({...n,[e]:t.target.value}))},ce=(0,w.useCallback)(async()=>{let e=await $(`/api/chart/profiles/`);i({publicProfiles:e.publicProfiles??[],privateProfiles:e.privateProfiles??[]})},[]),le=(0,w.useCallback)(e=>{o({personName:e.personName??``,place:e.place??``,birthDate:e.birthDate??``,birthTime:e.birthTime??``}),c(e),u(null),g(``),f(4)},[]),ue=(0,w.useCallback)(async()=>{if(oe){m(!0),g(``);try{let e={personName:a.personName,place:a.place,birthDate:a.birthDate,birthTime:a.birthTime},t=s?.id?`/api/chart/profiles/update/`:`/api/chart/profiles/create/`,n={...e,...s?.id?{profileId:s.id}:{},...s&&s.place===a.place&&s.lat!=null&&s.lon!=null?{lat:s.lat,lon:s.lon}:{}},r=await $(t,{method:`POST`,body:JSON.stringify(n)});c(r),o({personName:r.personName??e.personName,place:r.place??e.place,birthDate:r.birthDate??e.birthDate,birthTime:r.birthTime??e.birthTime}),await ce(),f(4)}catch(e){g(e.message||`Failed to save profile.`)}finally{m(!1)}}},[a.birthDate,a.birthTime,a.personName,a.place,oe,ce,s]),de=(0,w.useCallback)(async({includeAi:e=!1,saveProfile:t=!1,profileId:n=null}={})=>{if(!(!oe&&!n)){m(!0),g(``);try{let r=n?{profileId:n,includeAi:e,saveProfile:t}:{...a,includeAi:e,saveProfile:t};u(await $(`/api/chart/calculate/`,{method:`POST`,body:JSON.stringify(r)})),f(oe?5:3),t&&await ce()}catch(e){g(e.message||`Chart calculation failed.`)}finally{m(!1)}}},[a,oe,ce]),fe=(0,w.useCallback)(async()=>{if(oe){await $(`/api/auth/logout/`,{method:`POST`,body:`{}`}),t(`/diary/warp`,{state:{target:`/thank-you`,reloadAfter:!0,warpMode:`collapse`}});return}t(`/diary/warp`,{state:{target:`/`}})},[oe,t]),A=(0,w.useCallback)(()=>{v(!0),b(!1),ae(``),ee(0),te(``),f(1),S(`diary`)},[]),pe=(0,w.useCallback)(()=>{b(!0),v(!1),re(null),ae(``),f(1),S(`tarot`)},[]),me=(0,w.useCallback)(()=>{v(!1),b(!1),S(null),ae(``),f(2)},[]),he=(0,w.useCallback)(()=>{v(!1),T(null),f(1)},[]),ge=(0,w.useCallback)(()=>{b(!1),re(null),ae(``),f(1)},[]),_e=(0,w.useCallback)(()=>{b(!1),re(null),ae(``),v(!0),ee(1),te(ie),f(2)},[ie]),ve=(0,w.useCallback)(async e=>{let t=e?.tarotReadingId;if(t){g(``);try{re(await $(`/api/tarot/readings/${t}/`)),ae(e.date??``),v(!1),T(null),b(!0),S(null),f(4)}catch(e){g(e.message||`Failed to load tarot reading.`)}}},[]),ye=(0,w.useMemo)(()=>{let e=[{key:`intro`,title:`Welcome to your Star Book`,content:(0,Z.jsxs)(`div`,{className:`guest-card`,children:[(0,Z.jsxs)(`div`,{className:`guest-eyebrow`,children:[(0,Z.jsx)(im,{className:`h-4 w-4`}),(0,Z.jsx)(`span`,{children:`あなたの星の物語を、ひとつずつ開いていく。`})]}),(0,Z.jsx)(`h2`,{className:`guest-subtitle`,children:`Horoscope & Sabian Symbol Reading`}),(0,Z.jsxs)(`p`,{className:`guest-text`,children:[(0,Z.jsx)(`br`,{}),`最初のページでは、ここで何が見えるのかをやさしく案内します。`,(0,Z.jsx)(`br`,{}),`On the first page, we gently guide you through what you can discover here.`,(0,Z.jsx)(`br`,{}),`その先には、誰でものぞける無料の Akashic Index。`,(0,Z.jsx)(`br`,{}),`Beyond that, you can explore the free Akashic Index that anyone can browse.`,(0,Z.jsx)(`br`,{}),(0,Z.jsx)(`br`,{}),(0,Z.jsx)(`br`,{}),`有名人の星の並びや、運命の輪の気配を、ページをめくるように楽しめます。`,(0,Z.jsx)(`br`,{}),`You can enjoy celebrity charts and the subtle hints of fate as if turning the pages of a storybook.`,(0,Z.jsx)(`br`,{}),`ログインすると、あなた自身の記録が加わり、保存したホロスコープや新しい星の読み解きを続けて開けます。`,(0,Z.jsx)(`br`,{}),`When you sign in, your own records appear, along with saved horoscopes and new readings that continue your journey through the stars.`]}),(0,Z.jsx)(`div`,{className:`guest-actions`,children:(0,Z.jsx)(`button`,{type:`button`,className:`guest-button`,onClick:fe,children:`CLOSE & LOGOUT`})})]})},{key:`chooser`,title:`INDEX`,subtitle:`select page`,content:(0,Z.jsx)(`div`,{className:`chooser-page`,children:(0,Z.jsxs)(`div`,{className:`chooser-grid`,children:[(0,Z.jsxs)(`button`,{type:`button`,className:`chooser-card`,onClick:me,children:[(0,Z.jsx)(`div`,{className:`chooser-media`,"aria-hidden":`true`,children:(0,Z.jsxs)(`div`,{className:`chooser-media-frame chooser-media-chart`,children:[(0,Z.jsx)(`div`,{className:`chooser-media-glow`}),(0,Z.jsxs)(`div`,{className:`chooser-illustration chart-illustration`,children:[(0,Z.jsx)(`span`,{className:`chart-orbit chart-orbit-outer`}),(0,Z.jsx)(`span`,{className:`chart-orbit chart-orbit-inner`}),(0,Z.jsx)(`span`,{className:`chart-dot chart-dot-one`}),(0,Z.jsx)(`span`,{className:`chart-dot chart-dot-two`}),(0,Z.jsx)(`span`,{className:`chart-dot chart-dot-three`})]})]})}),(0,Z.jsxs)(`div`,{className:`chooser-copy`,children:[(0,Z.jsx)(`div`,{className:`chooser-eyebrow`,children:`Chart`}),(0,Z.jsx)(`h3`,{children:`Open Akashic Index`}),(0,Z.jsx)(`p`,{children:`Open the current chart app pages and the shared free index.`})]})]}),(0,Z.jsxs)(`button`,{type:`button`,className:`chooser-card`,onClick:A,children:[(0,Z.jsx)(`div`,{className:`chooser-media`,"aria-hidden":`true`,children:(0,Z.jsxs)(`div`,{className:`chooser-media-frame chooser-media-diary`,children:[(0,Z.jsx)(`div`,{className:`chooser-media-glow`}),(0,Z.jsxs)(`div`,{className:`chooser-illustration diary-illustration`,children:[(0,Z.jsx)(`span`,{className:`diary-book`}),(0,Z.jsx)(`span`,{className:`diary-ribbon`}),(0,Z.jsx)(`span`,{className:`diary-line diary-line-one`}),(0,Z.jsx)(`span`,{className:`diary-line diary-line-two`}),(0,Z.jsx)(`span`,{className:`diary-heart`})]})]})}),(0,Z.jsxs)(`div`,{className:`chooser-copy`,children:[(0,Z.jsx)(`div`,{className:`chooser-eyebrow`,children:`Diary`}),(0,Z.jsx)(`h3`,{children:`Open Diary Book`}),(0,Z.jsx)(`p`,{children:`Move into the diary book with the calendar, list, and edit pages.`})]})]}),(0,Z.jsxs)(`button`,{type:`button`,className:`chooser-card`,onClick:pe,children:[(0,Z.jsx)(`div`,{className:`chooser-media`,"aria-hidden":`true`,children:(0,Z.jsxs)(`div`,{className:`chooser-media-frame chooser-media-tarot`,children:[(0,Z.jsx)(`div`,{className:`chooser-media-glow`}),(0,Z.jsxs)(`div`,{className:`chooser-illustration tarot-illustration`,children:[(0,Z.jsx)(`span`,{className:`tarot-card tarot-card-back`}),(0,Z.jsx)(`span`,{className:`tarot-card tarot-card-front`}),(0,Z.jsx)(`span`,{className:`tarot-moon`}),(0,Z.jsx)(`span`,{className:`tarot-star tarot-star-one`}),(0,Z.jsx)(`span`,{className:`tarot-star tarot-star-two`})]})]})}),(0,Z.jsxs)(`div`,{className:`chooser-copy`,children:[(0,Z.jsx)(`div`,{className:`chooser-eyebrow`,children:`Tarot`}),(0,Z.jsx)(`h3`,{children:`Open Tarot Room`}),(0,Z.jsx)(`p`,{children:`Enter the tarot app to draw cards, browse decks, and keep saved readings.`})]})]})]})})},{key:`public-index`,title:`SHARED AKASHIC INDEX`,subtitle:`notable people star charts`,content:(0,Z.jsx)(qh,{entries:se,emptyMessage:`No shared profiles are available yet.`,interactive:!0,onSelect:e=>de({includeAi:!0,profileId:e.id})})}].filter(Boolean);return oe&&e.push({key:`private-index`,title:`MY AKASHIC INDEX`,subtitle:`Your saved profiles`,content:(0,Z.jsx)(qh,{entries:O,emptyMessage:`No saved profiles yet.`,interactive:!0,onSelect:le})},{key:`form`,title:`STAR TITLE`,content:(0,Z.jsxs)(`form`,{className:`form-card`,onSubmit:e=>{e.preventDefault(),de({includeAi:!0})},children:[(0,Z.jsxs)(`div`,{className:`form-row`,children:[(0,Z.jsx)(`label`,{htmlFor:`person-name`,children:`Person Name`}),(0,Z.jsx)(`input`,{id:`person-name`,type:`text`,value:a.personName,onChange:k(`personName`),placeholder:`Name`})]}),(0,Z.jsxs)(`div`,{className:`form-row`,children:[(0,Z.jsx)(`label`,{htmlFor:`birth-place`,children:`Place`}),(0,Z.jsx)(`input`,{id:`birth-place`,type:`text`,value:a.place,onChange:k(`place`),placeholder:`Birth place`})]}),(0,Z.jsxs)(`div`,{className:`form-row`,children:[(0,Z.jsx)(`label`,{htmlFor:`birth-date`,children:`Birth Date`}),(0,Z.jsx)(`input`,{id:`birth-date`,type:`date`,value:a.birthDate,onChange:k(`birthDate`),required:!0})]}),(0,Z.jsxs)(`div`,{className:`form-row`,children:[(0,Z.jsx)(`label`,{htmlFor:`birth-time`,children:`Birth Time`}),(0,Z.jsx)(`input`,{id:`birth-time`,type:`time`,value:a.birthTime,onChange:k(`birthTime`)})]}),(0,Z.jsxs)(`div`,{className:`form-actions`,children:[(0,Z.jsx)(`button`,{className:`secondary-btn`,type:`button`,onClick:ue,disabled:p,children:s?.id?`Update`:`Save`}),(0,Z.jsx)(`button`,{className:`primary-btn`,type:`submit`,disabled:p,children:p?`Opening...`:`Open`})]})]})}),l?.aiTextGeo&&e.push({key:`record`,title:`RECORD`,content:(0,Z.jsx)(`div`,{className:`reading-body`,children:l.aiTextGeo})}),l?.aiTextHelio&&e.push({key:`gift`,title:`GIFT`,content:(0,Z.jsx)(`div`,{className:`reading-body`,children:l.aiTextHelio})}),l?.chartGeoUrl&&e.push({key:`chart`,title:`GEOCENTRIC`,content:(0,Z.jsx)(`div`,{className:`reading-body`,children:(0,Z.jsx)(`div`,{className:`chart-box`,children:(0,Z.jsx)(`img`,{src:l.chartGeoUrl,alt:`Horoscope chart`})})})}),l?.resultGeo&&e.push({key:`geo`,title:`GEOCENTRIC`,content:(0,Z.jsx)(Jh,{rows:l.resultGeo,type:`geo`})}),l?.resultHelio&&e.push({key:`helio`,title:`HELIOCENTRIC`,content:(0,Z.jsx)(Jh,{rows:l.resultHelio,type:`helio`})}),_&&e.splice(2,0,{key:`diary-book`,title:`DIARY CALENDAR`,subtitle:`Diary / Calendar`,content:(0,Z.jsx)(`div`,{className:`book-diary-content`,children:(0,Z.jsx)(Xm,{authReady:!0,embedded:!0,initialPageIndex:E,initialSelectedDate:D,onExitToBook:he,onOpenTarotReading:ve,onPageStateChange:T})})}),y&&(e.splice(2,0,{key:`tarot-index`,title:`TAROT INDEX`,subtitle:`select tarot page`,content:(0,Z.jsxs)(`div`,{className:`tarot-index-page`,children:[(0,Z.jsxs)(`button`,{type:`button`,className:`tarot-index-card`,onClick:()=>{re(null),ae(``),f(3)},children:[(0,Z.jsxs)(`span`,{className:`tarot-index-art tarot-index-art-reading`,"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{className:`tarot-art-card tarot-art-card-one`}),(0,Z.jsx)(`span`,{className:`tarot-art-card tarot-art-card-two`}),(0,Z.jsx)(`span`,{className:`tarot-art-moon`}),(0,Z.jsx)(`span`,{className:`tarot-art-face`}),(0,Z.jsx)(`span`,{className:`tarot-art-bow tarot-art-bow-reading`}),(0,Z.jsx)(`span`,{className:`tarot-art-spark tarot-art-spark-one`}),(0,Z.jsx)(`span`,{className:`tarot-art-spark tarot-art-spark-two`})]}),(0,Z.jsx)(`span`,{className:`tarot-index-kicker`,children:`Reading`}),(0,Z.jsx)(`strong`,{children:`Draw Cards`}),(0,Z.jsx)(`span`,{children:`Open a tarot reading and save the result.`})]}),(0,Z.jsxs)(`button`,{type:`button`,className:`tarot-index-card`,onClick:()=>t(`/tarot/decks`),children:[(0,Z.jsxs)(`span`,{className:`tarot-index-art tarot-index-art-decks`,"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{className:`tarot-art-stack tarot-art-stack-one`}),(0,Z.jsx)(`span`,{className:`tarot-art-stack tarot-art-stack-two`}),(0,Z.jsx)(`span`,{className:`tarot-art-stack tarot-art-stack-three`}),(0,Z.jsx)(`span`,{className:`tarot-art-gem`}),(0,Z.jsx)(`span`,{className:`tarot-art-bow tarot-art-bow-decks`}),(0,Z.jsx)(`span`,{className:`tarot-art-spark tarot-art-spark-three`})]}),(0,Z.jsx)(`span`,{className:`tarot-index-kicker`,children:`Decks`}),(0,Z.jsx)(`strong`,{children:`Card Library`}),(0,Z.jsx)(`span`,{children:`Browse and edit tarot decks and cards.`})]})]})}),e.splice(3,0,{key:`tarot-read`,title:`TAROT DRAW`,subtitle:`draw cards`,content:(0,Z.jsx)(`div`,{className:`book-tarot-reading-content`,children:(0,Z.jsx)(Fh,{embedded:!0,showResultPanel:!1,onReadingComplete:e=>{re(e),f(4)}})})}),e.splice(4,0,{key:`tarot-cards`,title:`TAROT CARDS`,subtitle:`drawn cards`,content:(0,Z.jsx)(`div`,{className:`book-tarot-result-content`,children:ne?(0,Z.jsx)(Rh,{result:ne}):(0,Z.jsx)(`p`,{className:`rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-200`,children:`Your reading will appear here.`})})}),e.splice(5,0,{key:`tarot-message`,title:`TAROT MESSAGE`,subtitle:`witch's reading`,content:(0,Z.jsx)(`div`,{className:`book-tarot-result-content`,children:ne?(0,Z.jsx)(Z.Fragment,{children:(0,Z.jsx)(`div`,{className:`book-tarot-message-scroll`,children:(0,Z.jsx)(Bh,{result:ne})})}):(0,Z.jsx)(`p`,{className:`rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-200`,children:`Your reading will appear here.`})})}),e.splice(6,0,{key:`tarot-consult`,title:`TAROT CONSULT`,subtitle:`talk with the reading`,content:(0,Z.jsx)(`div`,{className:`book-tarot-result-content book-tarot-consult-content`,children:(0,Z.jsx)(Kh,{reading:ne,onBackToMessage:()=>f(5)})})})),e},[de,fe,he,a.birthDate,a.birthTime,a.personName,a.place,oe,_,y,E,D,p,t,me,A,ve,pe,O,se,le,l,ue,s,ne]),j=ye.length;return(0,w.useEffect)(()=>{f(e=>Math.min(e,j-1))},[j]),(0,w.useEffect)(()=>{if(!x)return;let e=window.requestAnimationFrame(()=>{f(2),S(null)});return()=>{window.cancelAnimationFrame(e)}},[x]),(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`style`,{children:Yh}),(0,Z.jsxs)(`div`,{className:`app-shell ${_?`app-shell-diary-opening`:``}`,children:[h?(0,Z.jsx)(`div`,{className:`chart-error`,children:h}):null,(0,Z.jsx)(Pm,{className:`book-starry-sky`,tone:`warm`,shootingAngle:-18}),(0,Z.jsxs)(`div`,{className:`page-wrap`,children:[(0,Z.jsx)(`div`,{className:`book-shell`,children:(0,Z.jsxs)(`div`,{className:`book`,children:[ye.map((e,t)=>(0,Z.jsxs)(`section`,{className:`page ${t===d?`active`:`hidden`}`,children:[(0,Z.jsx)(`h2`,{className:`reading-title`,children:e.title}),e.subtitle?(0,Z.jsx)(`p`,{className:`reading-subtitle`,children:e.subtitle}):null,e.content]},e.key)),_?(0,Z.jsxs)(`div`,{className:`book-nav`,children:[(0,Z.jsx)(`button`,{onClick:C?.goBack??he,disabled:!C?.goBack,type:`button`,children:`<`}),C?.goForward?(0,Z.jsx)(`button`,{onClick:C.goForward,type:`button`,children:`>`}):null]}):null,y?(0,Z.jsxs)(`div`,{className:`book-nav`,children:[(0,Z.jsx)(`button`,{onClick:()=>{if(d===4&&ie){_e();return}if(d>2){f(e=>e-1);return}ge()},type:`button`,children:`<`}),d===2?(0,Z.jsx)(`button`,{onClick:()=>f(3),type:`button`,children:`>`}):null,(d===3||d===4||d===5)&&ne?(0,Z.jsx)(`button`,{onClick:()=>f(e=>e+1),type:`button`,children:`>`}):null]}):null,!_&&!y?(0,Z.jsxs)(`div`,{className:`book-nav`,children:[(0,Z.jsx)(`button`,{onClick:()=>f(e=>Math.max(0,e-1)),disabled:d===0,type:`button`,children:`<`}),(0,Z.jsx)(`button`,{onClick:()=>f(e=>Math.min(j-1,e+1)),disabled:d===j-1,type:`button`,children:`>`})]}):null]})}),(0,Z.jsx)(`footer`,{className:`footer`,children:`@2025 Horoscope App`})]})]})]})}function Kh({reading:e,onBackToMessage:t}){let n=(0,w.useMemo)(()=>[{role:`assistant`,content:`Ask about this saved reading. I will stay close to the cards, the question, and the message already on the page.`}],[]),[r,i]=(0,w.useState)([{role:`assistant`,content:`Ask about this saved reading. I will stay close to the cards, the question, and the message already on the page.`}]),[a,o]=(0,w.useState)(``),[s,c]=(0,w.useState)(!1),[l,u]=(0,w.useState)(!1),[d,f]=(0,w.useState)(``);return(0,w.useEffect)(()=>{if(!e?.id){i(n);return}let t=!0;return u(!0),f(``),$(`/api/tarot/readings/${e.id}/consult/`).then(e=>{t&&i(e.messages?.length?e.messages:n)}).catch(e=>{t&&(i(n),f(e.message||`Could not load the consult history.`))}).finally(()=>{t&&u(!1)}),()=>{t=!1}},[n,e?.id]),e?(0,Z.jsxs)(`div`,{className:`tarot-consult-panel`,children:[(0,Z.jsxs)(`div`,{className:`tarot-consult-summary`,children:[(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`tarot-consult-kicker`,children:e.spreadType}),(0,Z.jsx)(`h3`,{children:e.question||`Untitled reading`})]}),(0,Z.jsx)(`button`,{type:`button`,onClick:t,children:`Message`})]}),(0,Z.jsxs)(`div`,{className:`tarot-consult-messages`,"aria-live":`polite`,children:[l?(0,Z.jsx)(`div`,{className:`tarot-consult-message tarot-consult-message-assistant`,children:`Loading previous consult...`}):null,r.map((e,t)=>(0,Z.jsx)(`div`,{className:`tarot-consult-message tarot-consult-message-${e.role}`,children:e.content},e.id??`${e.role}-${t}`)),s?(0,Z.jsx)(`div`,{className:`tarot-consult-message tarot-consult-message-assistant`,children:`Listening to the reading...`}):null]}),d?(0,Z.jsx)(`p`,{className:`tarot-consult-error`,children:d}):null,(0,Z.jsxs)(`form`,{className:`tarot-consult-form`,onSubmit:async t=>{t.preventDefault();let n=a.trim();if(!(!n||!e?.id||s)){i(e=>[...e,{role:`user`,content:n}]),o(``),f(``),c(!0);try{let t=await $(`/api/tarot/readings/${e.id}/consult/`,{method:`POST`,body:JSON.stringify({message:n})});i(t.messages?.length?t.messages:e=>[...e,{role:`assistant`,content:t.reply}])}catch(e){f(e.message||`Could not open the consult.`)}finally{c(!1)}}},children:[(0,Z.jsx)(`textarea`,{value:a,onChange:e=>o(e.target.value),placeholder:`Ask about this reading`,rows:3}),(0,Z.jsx)(`button`,{type:`submit`,disabled:!a.trim()||s,children:s?`SENDING...`:`SEND`})]})]}):(0,Z.jsxs)(`div`,{className:`tarot-consult-empty`,children:[(0,Z.jsx)(`p`,{children:`Draw cards first, then the consult page can open around that saved reading.`}),(0,Z.jsx)(`button`,{type:`button`,onClick:t,children:`Back to message`})]})}function qh({entries:e,emptyMessage:t,interactive:n=!1,onSelect:r,note:i}){return(0,Z.jsxs)(`div`,{className:`index-book-page`,children:[i?(0,Z.jsx)(`p`,{className:`index-note`,children:i}):null,(0,Z.jsx)(`div`,{className:`index-body`,children:e.length===0?(0,Z.jsx)(`p`,{className:`reading-muted`,children:t}):e.map(([e,t])=>(0,Z.jsxs)(`section`,{className:`index-group`,children:[(0,Z.jsx)(`h3`,{className:`index-letter`,children:e}),(0,Z.jsx)(`div`,{className:`index-list`,children:t.map(e=>n?(0,Z.jsxs)(`button`,{className:`index-name-btn`,type:`button`,disabled:!n,onClick:()=>r?.(e),children:[(0,Z.jsx)(`span`,{className:`index-name`,children:e.personName}),(0,Z.jsx)(`span`,{className:`index-meta`,children:e.birthDate})]},e.id):(0,Z.jsxs)(`div`,{className:`index-name-btn index-name-btn-static`,children:[(0,Z.jsx)(`span`,{className:`index-name`,children:e.personName}),(0,Z.jsx)(`span`,{className:`index-meta`,children:e.birthDate})]},e.id))})]},e))})]})}function Jh({rows:e,type:t}){return(0,Z.jsx)(`div`,{className:`reading-body`,children:(0,Z.jsxs)(`table`,{className:`result-table`,children:[(0,Z.jsx)(`thead`,{children:(0,Z.jsxs)(`tr`,{children:[(0,Z.jsx)(`th`,{children:`Planet`}),(0,Z.jsx)(`th`,{children:`Meaning`}),(0,Z.jsx)(`th`,{children:`Sign`}),(0,Z.jsx)(`th`,{children:`Degree`}),(0,Z.jsx)(`th`,{children:`Sabian`})]})}),(0,Z.jsx)(`tbody`,{children:e.map((e,n)=>(0,Z.jsx)(`tr`,{children:t===`geo`?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`td`,{children:e[0]}),(0,Z.jsx)(`td`,{children:e[6]}),(0,Z.jsxs)(`td`,{children:[e[1],` `,e[2]]}),(0,Z.jsx)(`td`,{children:e[5]}),(0,Z.jsx)(`td`,{children:e[4]})]}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`td`,{children:e[0]}),(0,Z.jsx)(`td`,{children:e[4]}),(0,Z.jsx)(`td`,{children:e[1]}),(0,Z.jsx)(`td`,{children:e[2]}),(0,Z.jsx)(`td`,{children:e[3]})]})},`${e[0]}-${n}`))})]})})}var Yh=`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    min-height: 100%;
    font-family: "Segoe UI", "Hiragino Sans", "Yu Gothic UI", sans-serif;
    background:
      radial-gradient(circle at 15% 20%, rgba(196, 136, 255, 0.18), transparent 26%),
      radial-gradient(circle at 82% 16%, rgba(126, 214, 255, 0.16), transparent 24%),
      radial-gradient(circle at 50% 80%, rgba(117, 138, 255, 0.14), transparent 28%),
      linear-gradient(180deg, #161b2d 0%, #252b46 45%, #32385a 100%);
    color: #f2f4ff;
  }

  .app-shell {
    position: relative;
    min-height: calc(100vh - 81px);
    overflow: hidden;
    background:
      radial-gradient(circle at 15% 20%, rgba(196, 136, 255, 0.18), transparent 26%),
      radial-gradient(circle at 82% 16%, rgba(126, 214, 255, 0.16), transparent 24%),
      radial-gradient(circle at 50% 80%, rgba(117, 138, 255, 0.14), transparent 28%),
      linear-gradient(180deg, #161b2d 0%, #252b46 45%, #32385a 100%);
    transition: background 720ms ease, filter 720ms ease;
  }

  .app-shell::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 17% 18%, rgba(151, 91, 218, 0.16), transparent 24%),
      radial-gradient(circle at 78% 18%, rgba(255, 147, 97, 0.13), transparent 22%),
      radial-gradient(circle at 42% 78%, rgba(190, 73, 104, 0.12), transparent 26%),
      linear-gradient(180deg, rgba(5, 7, 18, 0.34), rgba(5, 7, 18, 0.94));
    opacity: 0;
    transition: opacity 720ms ease;
    z-index: 0;
  }

  .app-shell-diary-opening::before {
    opacity: 1;
  }

  .app-shell-diary-opening .book-starry-sky {
    opacity: 0.88;
    transition: opacity 720ms ease;
  }

  .page-wrap {
    position: relative;
    z-index: 1;
    min-height: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  .chart-error {
    width: min(760px, calc(100vw - 28px));
    margin: 18px auto 0;
    padding: 12px 16px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(167, 70, 93, 0.16);
    color: #ffdce4;
    backdrop-filter: blur(6px);
  }

  .book-shell {
    width: min(760px, calc(100vw - 28px));
    height: calc(100vh - 80px);
    margin: 18px auto 24px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    perspective: 1600px;
    position: relative;
    overflow: hidden;
  }

  .book {
    position: relative;
    flex: 1;
    min-height: 0;
    width: 100%;
  }

  .book::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 34px;
    z-index: 3;
    border-radius: 8px;
    border: 1.5px solid rgba(255,255,255,0.24);
    background:
      radial-gradient(circle at 10% 10%, #ffffff 1px, transparent 2px),
      radial-gradient(circle at 25% 25%, #aeefff 1.5px, transparent 3px),
      radial-gradient(circle at 40% 15%, #ffd6ff 2px, transparent 4px),
      radial-gradient(circle at 60% 30%, #ffffff 1px, transparent 2px),
      radial-gradient(circle at 80% 20%, #c8b6ff 1.5px, transparent 3px),
      radial-gradient(circle at 15% 60%, #ffffff 2px, transparent 4px),
      radial-gradient(circle at 35% 75%, #aeefff 1px, transparent 2px),
      radial-gradient(circle at 55% 85%, #ffd6ff 1.5px, transparent 3px),
      radial-gradient(circle at 75% 70%, #ffffff 2px, transparent 4px),
      radial-gradient(circle at 90% 50%, #c8b6ff 1px, transparent 2px),
      linear-gradient(to bottom, rgba(120,150,255,0.42), rgba(180,120,255,0.62));
    box-shadow:
      0 0 16px rgba(140, 160, 255, 0.68),
      0 0 28px rgba(216, 196, 255, 0.22),
      inset 0 0 8px rgba(255,255,255,0.28);
    animation: spineSparkle 3s ease-in-out infinite alternate;
  }

  .book::after {
    content: "";
    position: absolute;
    left: 27px;
    top: 0;
    bottom: 0;
    width: 10px;
    background: linear-gradient(to right, rgba(0,0,0,0.3), rgba(255,255,255,0.18), rgba(255,255,255,0.04));
    box-shadow: 1px 0 0 rgba(255,255,255,0.14), -1px 0 0 rgba(0,0,0,0.22);
    z-index: 3;
  }

  @keyframes spineSparkle {
    0% {
      opacity: 0.65;
      filter: brightness(0.92);
    }
    100% {
      opacity: 1;
      filter: brightness(1.28);
    }
  }

  .page {
    position: absolute;
    inset: 0;
    padding: 36px 44px 88px 48px;
    margin-left: 0;
    border-radius: 22px;
    background:
      radial-gradient(circle at top left, rgba(143, 168, 255, 0.08), transparent 28%),
      linear-gradient(135deg, rgba(31, 34, 56, 0.18), rgba(42, 47, 77, 0.12));
    color: #f5f7ff;
    box-shadow:
      0 14px 34px rgba(0,0,0,0.18),
      0 0 0 1px rgba(255,255,255,0.08),
      0 0 24px rgba(216,196,255,0.12),
      inset 0 1px 0 rgba(255,255,255,0.08),
      inset 0 0 30px rgba(255,255,255,0.025);
    border: 2px solid rgba(255,255,255,0.28);
    backdrop-filter: blur(2px);
    transform-origin: left center;
    backface-visibility: hidden;
    transition: transform 0.8s ease, opacity 0.45s ease;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .page.hidden {
    opacity: 0;
    pointer-events: none;
    transform: rotateY(-100deg);
  }

  .page.active {
    opacity: 1;
    transform: rotateY(0deg);
    z-index: 2;
  }

  .diary-entry-page {
    position: relative;
    flex: 1;
    min-height: 0;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 18px;
    background:
      radial-gradient(circle at 18% 18%, rgba(196, 136, 255, 0.16), transparent 26%),
      radial-gradient(circle at 82% 18%, rgba(126, 214, 255, 0.12), transparent 24%),
      linear-gradient(180deg, rgba(7, 11, 23, 0.42), rgba(13, 20, 41, 0.92));
  }

  .book-diary-content {
    height: 100%;
    min-height: 0;
    margin: -12px -14px -70px -22px;
    color: #fff;
  }

  .book-diary-content .reading-title,
  .book-diary-content .reading-subtitle {
    display: none;
  }

  .book-diary-content .diary-page {
    border-radius: 20px;
    box-shadow:
      0 12px 34px rgba(0,0,0,0.26),
      inset 0 1px 0 rgba(255,255,255,0.06);
  }

  .tarot-index-page {
    position: relative;
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-content: center;
    max-width: 720px;
    margin: 0 auto;
    gap: 18px;
    padding: 34px 8px 12px;
  }

  .book-tarot-reading-content,
  .book-tarot-result-content {
    flex: 1;
    min-height: 0;
    margin: -10px -14px -44px -22px;
    overflow-y: auto;
    padding: 8px 12px 78px 32px;
    scrollbar-width: none;
  }

  .book-tarot-reading-content {
    padding-top: 0;
  }

  .book-tarot-reading-content::-webkit-scrollbar,
  .book-tarot-result-content::-webkit-scrollbar,
  .book-tarot-message-scroll::-webkit-scrollbar {
    display: none;
  }

  .book-tarot-reading-content .tarot-reading-embedded {
    align-items: start;
  }

  .book-tarot-message-scroll {
    max-height: 100%;
    overflow-y: auto;
    padding-left: 18px;
    padding-right: 8px;
    scrollbar-width: none;
  }

  .book-tarot-message-scroll > div {
    border-color: transparent;
    background: transparent;
    padding: 0;
  }

  .book-tarot-message-scroll > div > p:first-child {
    display: none;
  }

  .book-tarot-message-scroll > div > div {
    font-size: 16px;
    line-height: 1.9;
    color: rgba(245,247,255,0.93);
    text-align: justify;
  }

  .book-tarot-consult-content {
    display: flex;
    padding-bottom: 90px;
  }

  .tarot-consult-panel {
    min-height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto auto minmax(0, 1fr) auto auto;
    gap: 12px;
    color: #f5f7ff;
  }

  .tarot-consult-summary {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 14px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    background: rgba(255,255,255,0.07);
    padding: 14px;
  }

  .tarot-consult-summary h3 {
    margin: 4px 0 0;
    color: #fff;
    font-size: 18px;
    line-height: 1.4;
  }

  .tarot-consult-summary button,
  .tarot-consult-empty button {
    flex: 0 0 auto;
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    color: #fff;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .tarot-consult-kicker {
    margin: 0;
    color: #f4c2c2;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .tarot-consult-messages {
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 4px 8px 0;
    scrollbar-width: none;
  }

  .tarot-consult-messages::-webkit-scrollbar {
    display: none;
  }

  .tarot-consult-message {
    max-width: 88%;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    padding: 12px 14px;
    white-space: pre-line;
    font-size: 14px;
    line-height: 1.75;
  }

  .tarot-consult-message-assistant {
    align-self: flex-start;
    background: rgba(255,255,255,0.08);
    color: rgba(245,247,255,0.92);
  }

  .tarot-consult-message-user {
    align-self: flex-end;
    background: rgba(244,194,194,0.16);
    color: #fff;
  }

  .tarot-consult-error {
    margin: 0;
    border: 1px solid rgba(255,126,126,0.36);
    border-radius: 12px;
    background: rgba(255,126,126,0.12);
    color: #ffd6d6;
    padding: 10px 12px;
    font-size: 13px;
  }

  .tarot-consult-form {
    display: grid;
    grid-template-columns: minmax(0, 4fr) minmax(88px, 1fr);
    gap: 10px;
    align-items: stretch;
    margin-bottom: 34px;
  }

  .tarot-consult-form textarea {
    width: 100%;
    min-height: 74px;
    resize: vertical;
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    background: rgba(255,255,255,0.08);
    color: #fff;
    padding: 12px 14px;
    outline: none;
  }

  .tarot-consult-form button {
    position: relative;
    overflow: hidden;
    min-height: 46px;
    width: 100%;
    border: 1px solid rgba(244,194,194,0.52);
    border-radius: 12px;
    background:
      radial-gradient(circle at 24% 22%, rgba(255,255,255,0.28), transparent 24%),
      linear-gradient(135deg, rgba(244,194,194,0.26), rgba(216,196,255,0.14));
    color: #ffe4ec;
    padding: 0 18px;
    font-weight: 800;
    letter-spacing: 0.08em;
    cursor: pointer;
    box-shadow:
      0 10px 24px rgba(244,194,194,0.14),
      inset 0 1px 0 rgba(255,255,255,0.16);
    transition:
      transform 0.18s ease,
      border-color 0.18s ease,
      background 0.18s ease,
      box-shadow 0.18s ease,
      filter 0.18s ease;
  }

  .tarot-consult-form button::after {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.12);
    pointer-events: none;
  }

  .tarot-consult-form button:hover:not(:disabled) {
    cursor: pointer;
    transform: translateY(-1px);
    border-color: rgba(255,232,246,0.72);
    background:
      radial-gradient(circle at 24% 22%, rgba(255,255,255,0.34), transparent 24%),
      linear-gradient(135deg, rgba(244,194,194,0.34), rgba(216,196,255,0.22));
    box-shadow:
      0 14px 30px rgba(244,194,194,0.22),
      0 0 18px rgba(255,255,255,0.12),
      inset 0 1px 0 rgba(255,255,255,0.2);
  }

  .tarot-consult-form button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .tarot-consult-empty {
    margin: auto;
    max-width: 420px;
    display: grid;
    gap: 16px;
    place-items: center;
    text-align: center;
    color: rgba(245,247,255,0.9);
  }

  .book-tarot-reading-content section,
  .book-tarot-result-content section {
    border-radius: 16px;
    padding: 16px;
  }

  .book-tarot-reading-content section:first-child {
    border-color: transparent;
    background: transparent;
    box-shadow: none;
    padding: 0 12px 10px;
  }

  .book-tarot-reading-content .min-h-\\[420px\\],
  .book-tarot-result-content .min-h-\\[420px\\] {
    min-height: 320px;
  }

  .tarot-index-card {
    min-height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 10px;
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 18px;
    background:
      radial-gradient(circle at 50% 24%, rgba(255, 232, 176, 0.18), transparent 28%),
      linear-gradient(150deg, rgba(46, 38, 76, 0.82), rgba(244, 194, 194, 0.18));
    color: #fff;
    text-align: left;
    padding: 20px;
    cursor: pointer;
    box-shadow:
      0 16px 36px rgba(0,0,0,0.2),
      inset 0 1px 0 rgba(255,255,255,0.08);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  .tarot-index-art {
    position: relative;
    width: 100%;
    aspect-ratio: 1.12;
    margin-bottom: auto;
    overflow: hidden;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.16);
    background:
      radial-gradient(circle at 34% 24%, rgba(255, 248, 211, 0.3), transparent 24%),
      radial-gradient(circle at 72% 76%, rgba(126, 214, 255, 0.18), transparent 28%),
      linear-gradient(150deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      0 12px 26px rgba(0,0,0,0.16);
  }

  .tarot-index-art::before {
    content: "";
    position: absolute;
    left: 12%;
    right: 12%;
    bottom: 10%;
    height: 14%;
    border-radius: 999px;
    background: radial-gradient(ellipse, rgba(244, 194, 194, 0.22), transparent 72%);
    filter: blur(2px);
  }

  .tarot-index-art::after {
    content: "";
    position: absolute;
    inset: 10px;
    border-radius: 12px;
    border: 1px dashed rgba(255,255,255,0.16);
    pointer-events: none;
  }

  .tarot-index-art span {
    position: absolute;
    display: block;
  }

  .tarot-art-card,
  .tarot-art-stack {
    width: 32%;
    height: 56%;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.48);
    box-shadow:
      0 12px 18px rgba(0,0,0,0.18),
      inset 0 0 14px rgba(255,255,255,0.12);
  }

  .tarot-art-card-one {
    left: 25%;
    top: 27%;
    background: linear-gradient(150deg, rgba(164, 138, 255, 0.68), rgba(255, 218, 180, 0.28));
    transform: rotate(-13deg);
  }

  .tarot-art-card-two {
    right: 25%;
    top: 19%;
    background:
      radial-gradient(circle at 50% 34%, rgba(255, 239, 183, 0.6), transparent 22%),
      linear-gradient(150deg, rgba(47, 39, 78, 0.94), rgba(244, 194, 194, 0.36));
    transform: rotate(10deg);
  }

  .tarot-art-card-one::before,
  .tarot-art-card-two::before,
  .tarot-art-stack-one::before,
  .tarot-art-stack-two::before,
  .tarot-art-stack-three::before {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.24);
  }

  .tarot-art-moon {
    right: 34%;
    top: 30%;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: #ffedb5;
    box-shadow: 0 0 18px rgba(255, 232, 168, 0.58);
  }

  .tarot-art-moon::after {
    content: "";
    position: absolute;
    left: 8px;
    top: -2px;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: rgba(52, 42, 80, 0.95);
  }

  .tarot-art-face {
    left: 52%;
    top: 42%;
    width: 38px;
    height: 22px;
    transform: translateX(-50%);
    z-index: 3;
  }

  .tarot-art-face::before,
  .tarot-art-face::after {
    content: "";
    position: absolute;
    top: 2px;
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: rgba(255,255,255,0.82);
    box-shadow: 0 0 8px rgba(255,255,255,0.45);
  }

  .tarot-art-face::before {
    left: 8px;
  }

  .tarot-art-face::after {
    right: 8px;
  }

  .tarot-art-face {
    border-bottom: 2px solid rgba(255,255,255,0.66);
    border-radius: 0 0 999px 999px;
  }

  .tarot-art-spark {
    width: 9px;
    height: 9px;
    background: #fff;
    clip-path: polygon(50% 0, 61% 36%, 100% 50%, 61% 64%, 50% 100%, 39% 64%, 0 50%, 39% 36%);
    box-shadow: 0 0 12px rgba(255,255,255,0.7);
  }

  .tarot-art-spark-one {
    left: 22%;
    top: 19%;
  }

  .tarot-art-spark-two {
    right: 20%;
    bottom: 22%;
    width: 7px;
    height: 7px;
    opacity: 0.78;
  }

  .tarot-art-spark-three {
    left: 17%;
    bottom: 22%;
    width: 8px;
    height: 8px;
  }

  .tarot-art-spark-four {
    right: 18%;
    top: 20%;
    width: 8px;
    height: 8px;
  }

  .tarot-art-bow {
    width: 34px;
    height: 18px;
    z-index: 4;
  }

  .tarot-art-bow::before,
  .tarot-art-bow::after {
    content: "";
    position: absolute;
    top: 3px;
    width: 15px;
    height: 12px;
    border-radius: 10px 10px 3px 10px;
    background: linear-gradient(135deg, #ffd6e8, #f4c2c2);
    box-shadow: 0 0 10px rgba(244, 194, 194, 0.32);
  }

  .tarot-art-bow::before {
    left: 1px;
    transform: rotate(-28deg);
  }

  .tarot-art-bow::after {
    right: 1px;
    transform: rotate(28deg) scaleX(-1);
  }

  .tarot-art-bow-reading {
    left: 50%;
    top: 14%;
    transform: translateX(-50%);
  }

  .tarot-art-bow-decks {
    left: 50%;
    bottom: 17%;
    transform: translateX(-50%);
  }

  .tarot-art-stack-one {
    left: 24%;
    top: 28%;
    background: linear-gradient(150deg, rgba(255, 210, 230, 0.46), rgba(117, 138, 255, 0.28));
    transform: rotate(-14deg);
  }

  .tarot-art-stack-two {
    left: 34%;
    top: 22%;
    background: linear-gradient(150deg, rgba(255, 239, 183, 0.42), rgba(216, 196, 255, 0.34));
    transform: rotate(-2deg);
  }

  .tarot-art-stack-three {
    right: 25%;
    top: 28%;
    background: linear-gradient(150deg, rgba(126, 214, 255, 0.36), rgba(244, 194, 194, 0.34));
    transform: rotate(12deg);
  }

  .tarot-art-gem {
    left: 50%;
    top: 45%;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #fff3b8, #f4c2c2);
    transform: translate(-50%, -50%) rotate(45deg);
    border-radius: 6px 2px 6px 2px;
    box-shadow: 0 0 18px rgba(255, 231, 166, 0.5);
  }

  .tarot-art-gem::before {
    content: "";
    position: absolute;
    inset: 6px;
    border-radius: 3px 1px 3px 1px;
    background: rgba(255,255,255,0.34);
  }

  .tarot-art-scroll {
    left: 22%;
    top: 20%;
    width: 56%;
    height: 62%;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.38);
    background:
      linear-gradient(90deg, rgba(255,255,255,0.2) 0 14%, transparent 14%),
      linear-gradient(150deg, rgba(255, 248, 211, 0.34), rgba(244, 194, 194, 0.16));
    box-shadow:
      0 14px 24px rgba(0,0,0,0.18),
      inset 0 1px 0 rgba(255,255,255,0.14);
  }

  .tarot-art-seal {
    right: 25%;
    bottom: 22%;
    width: 26px;
    height: 26px;
    border-radius: 999px;
    background: radial-gradient(circle, #fff3b8 0 34%, #f4c2c2 36% 64%, rgba(244,194,194,0.2) 66%);
    box-shadow: 0 0 16px rgba(244, 194, 194, 0.42);
  }

  .tarot-art-heart {
    left: 27%;
    bottom: 24%;
    width: 17px;
    height: 17px;
    border-radius: 9px 9px 2px 9px;
    background: #ffd1df;
    transform: rotate(45deg);
    box-shadow: 0 0 14px rgba(255, 193, 214, 0.48);
  }

  .tarot-art-heart::before,
  .tarot-art-heart::after {
    content: "";
    position: absolute;
    width: 17px;
    height: 17px;
    border-radius: 999px;
    background: inherit;
  }

  .tarot-art-heart::before {
    left: -8px;
    top: 0;
  }

  .tarot-art-heart::after {
    left: 0;
    top: -8px;
  }

  .tarot-art-line {
    left: 38%;
    height: 2px;
    border-radius: 999px;
    background: rgba(255,255,255,0.46);
  }

  .tarot-art-line-one {
    top: 43%;
    width: 28%;
  }

  .tarot-art-line-two {
    top: 54%;
    width: 20%;
  }

  .tarot-index-card:hover {
    transform: translateY(-1px);
    border-color: rgba(255,255,255,0.3);
    background-color: rgba(255,255,255,0.12);
    box-shadow:
      0 18px 42px rgba(0,0,0,0.24),
      0 0 0 1px rgba(255,255,255,0.1) inset;
  }

  .tarot-index-card-subtle {
    opacity: 0.82;
  }

  .tarot-index-kicker {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(244, 194, 194, 0.92);
  }

  .tarot-index-card strong {
    font-size: 24px;
    line-height: 1.2;
  }

  .tarot-index-card span:last-child {
    font-size: 14px;
    line-height: 1.7;
    color: rgba(226, 231, 255, 0.78);
  }

  .diary-entry-page::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent),
      radial-gradient(circle at 50% 72%, rgba(255,255,255,0.12), transparent 34%);
    opacity: 0.58;
  }

  .diary-entry-cover {
    position: relative;
    width: min(260px, 64vw);
    aspect-ratio: 3 / 4;
    border-radius: 18px 12px 12px 18px;
    border: 1px solid rgba(255,255,255,0.14);
    background:
      linear-gradient(90deg, rgba(255,255,255,0.18) 0 12px, transparent 12px),
      radial-gradient(circle at 32% 24%, rgba(244, 194, 194, 0.2), transparent 22%),
      linear-gradient(135deg, #171d34, #252b4a 56%, #121827);
    box-shadow:
      0 26px 46px rgba(0,0,0,0.32),
      0 0 40px rgba(126, 214, 255, 0.1),
      inset 0 1px 0 rgba(255,255,255,0.08);
    transform: translateY(4px);
  }

  .diary-entry-moon {
    position: absolute;
    left: 50%;
    top: 22%;
    width: 58px;
    height: 58px;
    border-radius: 999px;
    transform: translateX(-50%);
    background: radial-gradient(circle, #fff8d9 0 32%, #f4c2c2 34% 48%, transparent 50%);
    box-shadow: 0 0 24px rgba(244, 194, 194, 0.26);
  }

  .diary-entry-line {
    position: absolute;
    left: 24%;
    right: 18%;
    height: 2px;
    border-radius: 999px;
    background: rgba(220, 228, 255, 0.42);
  }

  .diary-entry-line-one {
    top: 54%;
  }

  .diary-entry-line-two {
    top: 62%;
    right: 30%;
  }

  .diary-entry-ribbon {
    position: absolute;
    right: 24px;
    top: 0;
    width: 24px;
    height: 42%;
    background: linear-gradient(180deg, #f4c2c2, #d8c4ff);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%);
    box-shadow: 0 0 16px rgba(244, 194, 194, 0.22);
  }

  .page::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 42px;
    background: linear-gradient(to bottom, transparent, rgba(28, 31, 52, 0.9));
    pointer-events: none;
  }

  .reading-title {
    margin: 0 0 12px;
    padding-left: 12px;
    border-left: 4px solid #8fa8ff;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #f7f8ff;
    text-shadow: 0 0 10px rgba(180, 190, 255, 0.24);
    flex-shrink: 0;
  }

  .reading-subtitle {
    margin: 0 0 18px;
    padding-left: 12px;
    font-size: 13px;
    letter-spacing: 0.16em;
    color: rgba(220, 228, 255, 0.72);
    text-transform: uppercase;
    flex-shrink: 0;
  }

  .index-book-page {
    height: 100%;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 8px 10px 0;
    border-radius: 18px;
    background: transparent;
    backdrop-filter: none;
  }

  .index-note {
    margin: 0 0 14px;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(220, 228, 255, 0.72);
  }

  .index-body,
  .reading-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .index-body::-webkit-scrollbar,
  .reading-body::-webkit-scrollbar {
    display: none;
  }

  .reading-muted {
    margin: 0;
    color: rgba(220, 228, 255, 0.72);
  }

  .index-group {
    margin-bottom: 28px;
  }

  .index-letter {
    margin: 0 0 12px;
    padding-bottom: 6px;
    font-size: 22px;
    font-weight: 600;
    color: #d9deff;
    border-bottom: 1px solid rgba(180, 190, 255, 0.22);
    text-shadow: 0 0 8px rgba(170, 180, 255, 0.18);
  }

  .index-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 10px 18px;
  }

  .index-name-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 14px;
    border: 1px solid rgba(180, 190, 255, 0.16);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    color: #f5f7ff;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease;
    text-align: left;
    backdrop-filter: blur(3px);
  }

  .index-name-btn:hover {
    transform: translateY(-1px);
    background: rgba(255,255,255,0.1);
    border-color: rgba(220, 228, 255, 0.42);
    filter: brightness(1.08);
    box-shadow:
      0 8px 20px rgba(60, 80, 170, 0.18),
      0 0 0 1px rgba(255,255,255,0.12) inset,
      0 0 18px rgba(255,255,255,0.1);
  }

  .index-name-btn-static {
    cursor: default;
  }

  .index-name-btn-static:hover {
    transform: none;
    background: rgba(255,255,255,0.04);
    border-color: rgba(180, 190, 255, 0.16);
    box-shadow: none;
  }

  .index-name-btn:disabled {
    opacity: 0.65;
    cursor: default;
    transform: none;
    box-shadow: none;
  }

  .index-name {
    font-size: 15px;
    font-weight: 500;
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .index-meta {
    flex-shrink: 0;
    font-size: 12px;
    color: rgba(215, 222, 255, 0.65);
  }

  .guest-card {
    border-radius: 22px;
    background:ze: 12px;
    color: rgba(215, 222, 255, 0.65);
    border: none;
    padding: 8px 10px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .guest-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
    color: rgba(220, 228, 255, 0.82);
    letter-spacing: 0.18em;
    font-size: 12px;
    text-transform: uppercase;
  }

  .guest-title {
    margin: 0;
    font-size: clamp(28px, 4vw, 46px);
    line-height: 1.15;
    color: #f7f8ff;
  }

  .guest-subtitle {
    margin: 8px 0 0;
    font-size: clamp(20px, 2.8vw, 20px);
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #fff6fb;
    text-shadow: 0 0 10px rgba(189, 171, 255, 0.16);
  }

  .guest-text {
    margin: 18px 0 0;
    max-width: 56rem;
    line-height: 2;
    color: rgba(245,247,255,0.9);
    font-size: 15px;
  }

  .guest-actions {
    margin-top: 28px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .guest-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 12px 20px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.08);
    background: linear-gradient(135deg, #7f8cff, #97a8ff);
    color: white;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }

  .chooser-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 28px;
    padding: 10px 4px 0;
  }

  .chooser-header {
    max-width: 56rem;
  }

  .chooser-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 12px;
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(220, 228, 255, 0.78);
  }

  .chooser-title {
    margin: 0;
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1.1;
    color: #f7f8ff;
  }

  .chooser-text {
    margin: 12px 0 0;
    max-width: 44rem;
    font-size: 15px;
    line-height: 1.9;
    color: rgba(220, 228, 255, 0.78);
  }

  .chooser-grid {
    display: grid;
    gap: 18px;
    grid-template-columns: minmax(0, 1fr);
    padding-left: 22px;
  }

  .chooser-card {
    display: grid;
    grid-template-columns: minmax(120px, 168px) minmax(0, 1fr);
    align-items: center;
    gap: 18px;
    width: 100%;
    text-align: left;
    border-radius: 26px;
    border: 1px solid rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.08);
    padding: 18px;
    color: #fff;
    box-shadow: 0 16px 40px rgba(0,0,0,0.18);
    cursor: pointer;
    transition:
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease;
  }

  .chooser-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.1);
    filter: brightness(1.03);
    box-shadow:
      0 10px 22px rgba(127, 140, 255, 0.12),
      0 18px 44px rgba(0,0,0,0.2),
      0 0 0 1px rgba(255,255,255,0.08) inset,
      0 0 26px rgba(255,255,255,0.08);
  }

  .chooser-media {
    min-width: 0;
  }

  .chooser-media-frame {
    position: relative;
    aspect-ratio: 4 / 3;
    width: 100%;
    overflow: hidden;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.03);
    background: transparent;
    backdrop-filter: blur(14px);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.04),
      0 0 18px rgba(255,255,255,0.03);
  }

  .chooser-media-frame::before {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.05);
    background: none;
    box-shadow: 0 0 18px rgba(255,255,255,0.04);
    filter: blur(1.5px);
    opacity: 0.75;
  }

  .chooser-media-glow {
    position: absolute;
    inset: -16px;
    border-radius: 28px;
    background: radial-gradient(circle at center, rgba(255,255,255,0.035), transparent 68%);
    filter: blur(22px);
    opacity: 0.28;
  }

  .chooser-media-chart::before {
    background:
      linear-gradient(180deg, rgba(127,140,255,0.16), rgba(255,255,255,0.04)),
      radial-gradient(circle at 35% 25%, rgba(175, 202, 255, 0.18), transparent 36%),
      radial-gradient(circle at 70% 78%, rgba(196, 91, 214, 0.12), transparent 38%);
  }

  .chooser-media-diary::before {
    background:
      linear-gradient(180deg, rgba(255, 210, 230, 0.16), rgba(255,255,255,0.04)),
      radial-gradient(circle at 30% 28%, rgba(255, 255, 255, 0.18), transparent 36%),
      radial-gradient(circle at 72% 76%, rgba(116, 140, 255, 0.12), transparent 38%);
  }

  .chooser-media-tarot::before {
    background:
      linear-gradient(180deg, rgba(244, 194, 194, 0.18), rgba(255,255,255,0.04)),
      radial-gradient(circle at 38% 26%, rgba(255, 232, 176, 0.18), transparent 36%),
      radial-gradient(circle at 70% 78%, rgba(174, 120, 255, 0.14), transparent 38%);
  }

  .chooser-illustration {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }

  .chooser-illustration span {
    position: absolute;
    display: block;
  }

  .chart-orbit {
    left: 50%;
    top: 50%;
    border-radius: 999px;
    border: 1px solid rgba(244, 247, 255, 0.56);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 16px rgba(169, 190, 255, 0.18);
  }

  .chart-orbit-outer {
    width: 68%;
    aspect-ratio: 1;
  }

  .chart-orbit-inner {
    width: 38%;
    aspect-ratio: 1;
    border-color: rgba(244, 194, 194, 0.54);
  }

  .chart-illustration::before,
  .chart-illustration::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 62%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.54), transparent);
    transform: translate(-50%, -50%) rotate(28deg);
  }

  .chart-illustration::after {
    transform: translate(-50%, -50%) rotate(118deg);
  }

  .chart-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: #fff6d6;
    box-shadow: 0 0 14px rgba(255, 239, 175, 0.62);
  }

  .chart-dot-one {
    left: 28%;
    top: 27%;
  }

  .chart-dot-two {
    right: 24%;
    top: 39%;
    width: 8px;
    height: 8px;
    background: #dce7ff;
  }

  .chart-dot-three {
    left: 46%;
    bottom: 22%;
    width: 7px;
    height: 7px;
    background: #ffd6e8;
  }

  .diary-book {
    left: 24%;
    top: 19%;
    width: 50%;
    height: 64%;
    border-radius: 12px 16px 16px 12px;
    border: 1px solid rgba(255,255,255,0.62);
    background:
      linear-gradient(90deg, rgba(255,255,255,0.16) 0 14%, transparent 14%),
      linear-gradient(145deg, rgba(255, 202, 224, 0.64), rgba(156, 179, 255, 0.26));
    box-shadow:
      0 16px 28px rgba(0,0,0,0.16),
      inset 0 0 18px rgba(255,255,255,0.18);
  }

  .diary-ribbon {
    left: 33%;
    top: 18%;
    width: 8px;
    height: 58%;
    border-radius: 999px;
    background: linear-gradient(180deg, #fff0a8, #f4a9c6);
    box-shadow: 0 0 14px rgba(255, 226, 150, 0.4);
  }

  .diary-line {
    left: 44%;
    width: 22%;
    height: 2px;
    border-radius: 999px;
    background: rgba(255,255,255,0.58);
  }

  .diary-line-one {
    top: 42%;
  }

  .diary-line-two {
    top: 53%;
    width: 16%;
  }

  .diary-heart {
    right: 21%;
    bottom: 23%;
    width: 14px;
    height: 14px;
    border-radius: 8px 8px 2px 8px;
    background: #ffd1df;
    transform: rotate(45deg);
    box-shadow: 0 0 14px rgba(255, 193, 214, 0.5);
  }

  .diary-heart::before,
  .diary-heart::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 999px;
    background: inherit;
  }

  .diary-heart::before {
    left: -7px;
    top: 0;
  }

  .diary-heart::after {
    left: 0;
    top: -7px;
  }

  .tarot-card {
    width: 38%;
    height: 66%;
    border-radius: 13px;
    border: 1px solid rgba(255,255,255,0.62);
    box-shadow:
      0 18px 30px rgba(0,0,0,0.18),
      inset 0 0 18px rgba(255,255,255,0.14);
  }

  .tarot-card-back {
    left: 24%;
    top: 20%;
    background: linear-gradient(150deg, rgba(166, 137, 255, 0.46), rgba(255, 212, 156, 0.2));
    transform: rotate(-10deg);
  }

  .tarot-card-front {
    right: 24%;
    top: 16%;
    background:
      radial-gradient(circle at 50% 36%, rgba(255, 239, 183, 0.44), transparent 22%),
      linear-gradient(150deg, rgba(46, 38, 76, 0.86), rgba(244, 194, 194, 0.3));
    transform: rotate(8deg);
  }

  .tarot-card-front::before {
    content: "";
    position: absolute;
    inset: 10px;
    border-radius: 9px;
    border: 1px solid rgba(255,255,255,0.28);
  }

  .tarot-moon {
    right: 33%;
    top: 28%;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: #ffe9a8;
    box-shadow: 0 0 18px rgba(255, 232, 168, 0.52);
  }

  .tarot-moon::after {
    content: "";
    position: absolute;
    left: 8px;
    top: -2px;
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: rgba(55, 42, 82, 0.92);
  }

  .tarot-star {
    width: 8px;
    height: 8px;
    background: #ffffff;
    clip-path: polygon(50% 0, 61% 36%, 100% 50%, 61% 64%, 50% 100%, 39% 64%, 0 50%, 39% 36%);
    box-shadow: 0 0 12px rgba(255,255,255,0.65);
  }

  .tarot-star-one {
    right: 30%;
    bottom: 25%;
  }

  .tarot-star-two {
    right: 44%;
    bottom: 35%;
    width: 6px;
    height: 6px;
    opacity: 0.78;
  }

  .chooser-copy {
    min-width: 0;
  }

  .chooser-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 0 12px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(240, 243, 255, 0.72);
  }

  .chooser-card h3 {
    margin: 0;
    font-size: 24px;
    line-height: 1.2;
    color: #ffffff;
  }

  .chooser-card p {
    margin: 12px 0 0;
    font-size: 14px;
    line-height: 1.85;
    color: rgba(226, 231, 255, 0.78);
  }

  @media (max-width: 840px) {
    .chooser-grid {
      grid-template-columns: 1fr;
      padding-left: 0;
      gap: 12px;
    }

    .chooser-card {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 18px;
    }

    .tarot-index-page {
      grid-template-columns: 1fr;
      align-content: start;
      overflow-y: auto;
      padding: 42px 8px 12px;
    }

    .tarot-index-card {
      min-height: 150px;
    }

  }

  .form-card {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 10px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 130px 1fr;
    align-items: center;
    gap: 16px;
  }

  .form-row label {
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
  }

  .form-row input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    background: rgba(255,255,255,0.14);
    color: #ffffff;
    font-size: 15px;
  }

  .form-row input:focus {
    outline: none;
    border-color: #8fa8ff;
    box-shadow: 0 0 0 3px rgba(143, 168, 255, 0.18);
  }

  .form-actions {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 20px;
  }

  .form-actions button,
  .book-nav button {
    border: none;
    border-radius: 14px;
    cursor: pointer;
    color: white;
    font-size: 16px;
    font-weight: 600;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      opacity 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease,
      filter 0.2s ease;
  }

  .form-actions button:hover,
  .book-nav button:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }

  .primary-btn {
    padding: 12px 20px;
    background: linear-gradient(135deg, #7f8cff, #97a8ff);
    box-shadow: 0 6px 18px rgba(127, 140, 255, 0.28);
  }

  .primary-btn:hover {
    background: linear-gradient(135deg, #99a5ff, #c2cbff);
    box-shadow:
      0 10px 22px rgba(127, 140, 255, 0.24),
      0 0 0 1px rgba(255,255,255,0.18) inset,
      0 0 18px rgba(255,255,255,0.12);
  }

  .secondary-btn {
    padding: 12px 20px;
    background: rgba(255,255,255,0.12);
    color: #f5f7ff;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .secondary-btn:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.22);
    box-shadow:
      0 10px 22px rgba(0,0,0,0.18),
      0 0 0 1px rgba(255,255,255,0.12) inset,
      0 0 18px rgba(255,255,255,0.12);
  }

  .reading-body {
    white-space: pre-wrap;
    line-height: 1.9;
    font-size: 16px;
    padding: 4px 6px 14px 18px;
    color: rgba(245,247,255,0.93);
    text-align: justify;
  }

  .chart-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 4px 0 14px;
  }

  .chart-box img {
    display: block;
    max-width: 100%;
    max-height: calc(100vh - 260px);
    object-fit: contain;
    border-radius: 18px;
    box-shadow:
      0 18px 44px rgba(0,0,0,0.28),
      0 0 0 1px rgba(255,255,255,0.06);
  }

  .result-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 4px;
  }

  .result-table th,
  .result-table td {
    border-bottom: 1px solid rgba(255,255,255,0.16);
    padding: 10px;
    text-align: center;
    word-break: break-word;
  }

  .result-table th {
    background: rgba(255,255,255,0.08);
    font-weight: 500;
  }

  .book-nav {
    position: absolute;
    left: 44px;
    right: 10px;
    bottom: 24px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    pointer-events: none;
    z-index: 10;
  }

  .book-nav button {
    pointer-events: auto;
    width: 52px;
    height: 46px;
    padding: 0 18px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.08);
    box-shadow: 0 10px 24px rgba(0,0,0,0.18);
    color: #f5f7ff;
    font-size: 22px;
  }

  .book-nav button:hover {
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.34);
    box-shadow:
      0 14px 28px rgba(0,0,0,0.22),
      0 0 0 1px rgba(255,255,255,0.18) inset,
      0 0 18px rgba(255,255,255,0.14);
  }

  .book-nav button:disabled {
    opacity: 0.25;
    cursor: default;
    transform: none;
  }

  .book-nav-hidden {
    opacity: 0;
    pointer-events: none;
    transition: opacity 180ms ease;
  }

  .book-nav-hidden button {
    pointer-events: none;
  }

  .footer {
    text-align: center;
    padding: 0 16px 18px;
    color: #c3c7ff;
    opacity: 0.72;
    font-size: 14px;
  }

  @media (max-width: 760px) {
    .book-shell {
      width: calc(100vw - 18px);
      height: calc(100vh - 86px);
      height: calc(100dvh - 86px);
      margin: 10px auto 18px;
    }

    .page {
      padding: 22px 16px 76px 26px;
      margin-left: 0;
    }

    .chooser-page {
      justify-content: center;
      gap: 12px;
      padding: 0;
    }

    .chooser-card {
      grid-template-columns: minmax(76px, 92px) minmax(0, 1fr);
      gap: 12px;
      min-height: 122px;
      padding: 12px;
      border-radius: 18px;
    }

    .chooser-media-frame {
      border-radius: 14px;
    }

    .chooser-card h3 {
      font-size: 16px;
      line-height: 1.22;
    }

    .chooser-card p {
      display: none;
    }

    .chooser-eyebrow {
      margin-bottom: 5px;
      font-size: 10px;
      letter-spacing: 0.16em;
    }

    .tarot-index-page {
      gap: 12px;
      padding: 8px 2px 4px;
    }

    .tarot-index-card {
      min-height: 190px;
      padding: 14px;
    }

    .tarot-index-art {
      width: min(200px, 58vw);
    }

    .book-tarot-reading-content,
    .book-tarot-result-content {
      margin: -6px -10px -36px -18px;
      padding: 4px 8px 70px 24px;
    }

    .book-tarot-reading-content section,
    .book-tarot-result-content section {
      padding: 12px;
    }

    .tarot-consult-panel {
      gap: 10px;
      min-height: 100%;
    }

    .tarot-consult-summary {
      padding: 12px;
    }

    .tarot-consult-summary h3 {
      font-size: 15px;
    }

    .tarot-consult-message {
      max-width: 96%;
      font-size: 13px;
      line-height: 1.65;
    }

    .tarot-consult-form {
      grid-template-columns: minmax(0, 4fr) minmax(74px, 1fr);
      gap: 8px;
    }

    .tarot-consult-form textarea {
      min-height: 68px;
      resize: none;
    }

    .diary-entry-cover {
      width: min(220px, 62vw);
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .reading-title {
      margin-bottom: 8px;
      font-size: 18px;
    }

    .reading-subtitle {
      margin-bottom: 12px;
      font-size: 11px;
      letter-spacing: 0.14em;
    }

    .index-list {
      grid-template-columns: 1fr;
    }

    .book-nav {
      left: 22px;
      right: 8px;
      bottom: 10px;
    }

    .book-nav button {
      width: 46px;
      height: 40px;
      font-size: 19px;
    }

    .chart-box img {
      max-height: calc(100vh - 310px);
    }
  }
`;function Xh({authReady:e,initialPageIndex:t=1}){return(0,Z.jsx)(Ym,{authReady:e,initialPageIndex:t})}function Zh({authReady:e,isEdit:t=!1}){let{id:n}=st();return(0,Z.jsx)(Ym,{authReady:e,diaryId:n,isEdit:t,forceEditor:!0})}function Qh({onAuth:e}){let t=at(),[n,r]=(0,w.useState)(``),[i,a]=(0,w.useState)(``),[o,s]=(0,w.useState)(``);return(0,Z.jsx)(th,{user:null,headerVariant:`cosmic`,hideAuthActions:!0,children:(0,Z.jsxs)(`form`,{onSubmit:async r=>{r.preventDefault(),s(``);try{e(await $(`/api/auth/login/`,{method:`POST`,body:JSON.stringify({username:n,password:i})})),t(`/chart/warp`,{state:{source:`login`}})}catch(e){s(e.message||`Login failed.`)}},className:`mx-auto max-w-md rounded-[2rem] border border-white/12 bg-[#1a1530]/58 p-8 text-white shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl`,children:[(0,Z.jsx)(`h1`,{className:`mb-3 text-3xl font-bold tracking-[0.08em] text-[#f4eeff]`,children:`LOGIN`}),(0,Z.jsx)(`p`,{className:`mb-6 text-sm leading-7 text-slate-300`,children:`Sign in with your LovelyWitch Life account to keep your charts and records in one place.`}),o?(0,Z.jsx)(`p`,{className:`mb-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200`,children:o}):null,(0,Z.jsx)(`label`,{className:`mb-2 block text-sm font-medium text-slate-200`,children:`Username`}),(0,Z.jsx)(`input`,{className:`mb-4 w-full rounded-full border border-white/12 bg-[#2a2146]/75 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-white/20 focus:bg-[#332953]/82`,value:n,onChange:e=>r(e.target.value)}),(0,Z.jsx)(`label`,{className:`mb-2 block text-sm font-medium text-slate-200`,children:`Password`}),(0,Z.jsx)(`input`,{className:`mb-6 w-full rounded-full border border-white/12 bg-[#2a2146]/75 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-white/20 focus:bg-[#332953]/82`,type:`password`,value:i,onChange:e=>a(e.target.value)}),(0,Z.jsx)(`button`,{className:`w-full cursor-pointer rounded-full bg-[#f4c2c2]/82 px-6 py-3.5 text-base font-semibold text-[#5c3a3a] shadow-[0_10px_24px_rgba(244,194,194,0.14)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffe5ea]/95 hover:text-[#7b4c5a] hover:shadow-[0_14px_30px_rgba(244,194,194,0.24),0_0_0_1px_rgba(255,255,255,0.38)_inset] active:translate-y-0`,type:`submit`,children:`LOGIN`}),(0,Z.jsxs)(`div`,{className:`my-7 flex items-center gap-3`,children:[(0,Z.jsx)(`div`,{className:`h-px flex-1 bg-white/10`}),(0,Z.jsx)(`span`,{className:`text-xs tracking-[0.28em] text-slate-400`,children:`OR`}),(0,Z.jsx)(`div`,{className:`h-px flex-1 bg-white/10`})]}),(0,Z.jsx)(`button`,{type:`button`,onClick:()=>t(`/chart/warp`,{state:{source:`skip-auth`}}),className:`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 py-3.5 text-base font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12 hover:text-white active:translate-y-0`,children:`Set up later`}),(0,Z.jsx)(`p`,{className:`mt-3 text-center text-xs text-slate-400`,children:`You can create an account or sign in later.`}),(0,Z.jsxs)(`p`,{className:`mt-5 text-center text-sm text-slate-300`,children:[`New here?`,` `,(0,Z.jsx)(R,{className:`font-semibold text-[#f4c2c2] transition hover:text-white`,to:`/register`,children:`Create an account`})]})]})})}function $h({onAuth:e}){let t=at(),[n,r]=(0,w.useState)({username:``,email:``,password1:``,password2:``}),[i,a]=(0,w.useState)(``),o=e=>t=>r(n=>({...n,[e]:t.target.value})),s=async r=>{r.preventDefault(),a(``);try{e(await $(`/api/auth/register/`,{method:`POST`,body:JSON.stringify(n)})),t(`/chart/warp`,{state:{source:`register`}})}catch(e){a(e.message||`Registration failed.`)}},c=e=>e===`email`?`email (optional)`:e.replace(`1`,``).replace(`2`,` confirmation`);return(0,Z.jsx)(th,{user:null,headerVariant:`cosmic`,hideAuthActions:!0,children:(0,Z.jsxs)(`form`,{onSubmit:s,className:`mx-auto max-w-md rounded-[2rem] border border-white/12 bg-[#1a1530]/58 p-8 text-white shadow-[0_18px_70px_rgba(0,0,0,0.32)] backdrop-blur-2xl`,children:[(0,Z.jsx)(`h1`,{className:`mb-3 text-3xl font-bold tracking-[0.08em] text-[#f4eeff]`,children:`NEW ACCOUNT`}),(0,Z.jsx)(`p`,{className:`mb-6 text-sm leading-7 text-slate-300`,children:`Create a LovelyWitch Life account to save your chart history and diary flow.`}),i?(0,Z.jsx)(`p`,{className:`mb-4 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200`,children:i}):null,[`username`,`email`,`password1`,`password2`].map(e=>(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`label`,{className:`mb-2 block text-sm font-medium capitalize text-slate-200`,children:c(e)}),(0,Z.jsx)(`input`,{className:`mb-4 w-full rounded-full border border-white/12 bg-[#2a2146]/75 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-white/20 focus:bg-[#332953]/82`,type:e.startsWith(`password`)?`password`:`text`,value:n[e],onChange:o(e)})]},e)),(0,Z.jsx)(`p`,{className:`mb-4 text-xs leading-6 text-slate-400`,children:`Password must be at least 8 characters and cannot be too common or entirely numeric.`}),(0,Z.jsx)(`button`,{className:`w-full cursor-pointer rounded-full bg-[#f4c2c2] px-6 py-3.5 text-base font-semibold text-[#5c3a3a] transition hover:scale-[1.01]`,type:`submit`,children:`CREATE`}),(0,Z.jsxs)(`div`,{className:`my-7 flex items-center gap-3`,children:[(0,Z.jsx)(`div`,{className:`h-px flex-1 bg-white/10`}),(0,Z.jsx)(`span`,{className:`text-xs tracking-[0.28em] text-slate-400`,children:`OR`}),(0,Z.jsx)(`div`,{className:`h-px flex-1 bg-white/10`})]}),(0,Z.jsx)(`button`,{type:`button`,onClick:()=>t(`/chart/warp`,{state:{source:`skip-auth`}}),className:`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 px-6 py-3.5 text-base font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12 hover:text-white active:translate-y-0`,children:`Set up later`}),(0,Z.jsx)(`p`,{className:`mt-3 text-center text-xs text-slate-400`,children:`You can create an account or sign in later.`})]})})}function eg({user:e,onAuth:t}){let[n,r]=(0,w.useState)(e?.username??``),[i,a]=(0,w.useState)(e?.email??``),[o,s]=(0,w.useState)(``),[c,l]=(0,w.useState)(``);return(0,w.useEffect)(()=>{$(`/api/profile/`).then(e=>{r(e.username??``),a(e.email??``),t(e.authenticated?e:null)}).catch(e=>l(e.message||`Failed to load profile.`))},[t]),(0,Z.jsx)(th,{user:e,children:(0,Z.jsxs)(`form`,{onSubmit:async e=>{e.preventDefault(),s(``),l(``);try{t(await $(`/api/profile/`,{method:`PUT`,body:JSON.stringify({username:n,email:i})})),s(`Profile updated.`)}catch(e){l(e.message||`Failed to update profile.`)}},className:`mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm`,children:[(0,Z.jsx)(`h1`,{className:`mb-6 text-3xl font-bold text-[#5c3a3a]`,children:`PROFILE`}),o?(0,Z.jsx)(`p`,{className:`mb-4 text-sm text-[#5c7d3a]`,children:o}):null,c?(0,Z.jsx)(`p`,{className:`mb-4 text-sm text-[#a8465d]`,children:c}):null,(0,Z.jsx)(`label`,{className:`mb-2 block text-sm font-semibold`,children:`Username`}),(0,Z.jsx)(`input`,{className:`mb-4 w-full rounded-full border border-[#f1cbd3] bg-[#fffafc] px-4 py-3`,value:n,onChange:e=>r(e.target.value)}),(0,Z.jsx)(`label`,{className:`mb-2 block text-sm font-semibold`,children:`Email`}),(0,Z.jsx)(`input`,{className:`mb-6 w-full rounded-full border border-[#f1cbd3] bg-[#fffafc] px-4 py-3`,value:i,onChange:e=>a(e.target.value)}),(0,Z.jsx)(`button`,{className:`rounded-full bg-[#f4c2c2] px-6 py-3 font-semibold text-[#5c3a3a]`,type:`submit`,children:`SAVE`})]})})}var tg=2200;function ng({defaultTarget:e=`/diary`}){let t=at(),n=nt(),r=n.state?.target??e,i=n.state?.targetState,a=!!n.state?.reloadAfter,o=n.state?.warpMode===`collapse`?`collapse`:`expand`;return(0,w.useEffect)(()=>{let e=window.setTimeout(()=>{t(r,{replace:!0,state:i}),a&&window.setTimeout(()=>window.location.reload(),0)},tg);return()=>{window.clearTimeout(e)}},[t,a,r,i]),(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:`relative min-h-screen overflow-hidden text-white diary-warp-${o}`,style:{"--duration-ms":`${tg}ms`},children:[(0,Z.jsx)(`div`,{className:`diary-warp-source absolute inset-0`}),(0,Z.jsx)(`div`,{className:`diary-warp-target absolute inset-0`}),(0,Z.jsxs)(`div`,{className:`diary-warp-ripples absolute inset-0`,"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{className:`ripple ripple-1`}),(0,Z.jsx)(`span`,{className:`ripple ripple-2`}),(0,Z.jsx)(`span`,{className:`ripple ripple-3`}),(0,Z.jsx)(`span`,{className:`ripple ripple-4`}),(0,Z.jsx)(`span`,{className:`ripple ripple-5`})]}),(0,Z.jsxs)(`div`,{className:`diary-warp-rays absolute inset-0`,"aria-hidden":`true`,children:[(0,Z.jsx)(`span`,{className:`warp-ray warp-ray-1`}),(0,Z.jsx)(`span`,{className:`warp-ray warp-ray-2`}),(0,Z.jsx)(`span`,{className:`warp-ray warp-ray-3`}),(0,Z.jsx)(`span`,{className:`warp-ray warp-ray-4`})]}),(0,Z.jsx)(`div`,{className:`diary-warp-veil absolute inset-0`,"aria-hidden":`true`}),(0,Z.jsx)(`div`,{className:`diary-warp-core absolute inset-0`,"aria-hidden":`true`}),(0,Z.jsx)(`div`,{className:`diary-warp-glow absolute inset-0`,"aria-hidden":`true`})]}),(0,Z.jsx)(`style`,{children:`
        .diary-warp-source {
          background:
            radial-gradient(circle at 18% 20%, rgba(196, 91, 214, 0.14), transparent 28%),
            radial-gradient(circle at 78% 18%, rgba(126, 214, 255, 0.12), transparent 26%),
            radial-gradient(circle at 52% 50%, rgba(255, 255, 255, 0.06), transparent 30%),
            linear-gradient(180deg, #161b2d 0%, #252b46 45%, #32385a 100%);
          animation: diary-warp-source-fade var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transform-origin: center;
        }

        .diary-warp-collapse .diary-warp-source {
          animation-name: diary-warp-source-close;
        }

        .diary-warp-target {
          background:
            radial-gradient(circle at 15% 20%, rgba(196,136,255,0.18), transparent 28%),
            radial-gradient(circle at 82% 16%, rgba(126,214,255,0.12), transparent 26%),
            radial-gradient(circle at 50% 80%, rgba(117,138,255,0.14), transparent 30%),
            linear-gradient(180deg, #070b17 0%, #090d1d 55%, #0d1429 100%);
          opacity: 0;
          animation: diary-warp-target-fade var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          transform-origin: center;
        }

        .diary-warp-collapse .diary-warp-target {
          animation-name: diary-warp-target-close;
        }

        .diary-warp-glow {
          background:
            radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.32), transparent 10%),
            radial-gradient(circle at 50% 50%, rgba(216, 196, 255, 0.3), transparent 28%),
            radial-gradient(circle at 50% 50%, rgba(126, 214, 255, 0.14), transparent 44%),
            radial-gradient(circle at 50% 50%, rgba(244, 194, 194, 0.12), transparent 62%);
          filter: blur(22px);
          mix-blend-mode: screen;
          animation: diary-warp-glow-fade var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .diary-warp-collapse .diary-warp-glow {
          animation-name: diary-warp-glow-close;
        }

        .diary-warp-ripples {
          display: grid;
          place-items: center;
          pointer-events: none;
        }

        .diary-warp-rays {
          display: grid;
          place-items: center;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .diary-warp-veil {
          background:
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.28), rgba(216,196,255,0.16) 14%, transparent 38%),
            linear-gradient(90deg, transparent, rgba(216,196,255,0.12), transparent),
            linear-gradient(180deg, transparent, rgba(126,214,255,0.08), transparent);
          opacity: 0;
          mix-blend-mode: screen;
          animation: diary-warp-veil-fade var(--duration-ms) ease-in-out forwards;
        }

        .diary-warp-collapse .diary-warp-veil {
          animation-name: diary-warp-veil-close;
        }

        .diary-warp-core {
          background:
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.72) 0 2%, rgba(255,246,214,0.48) 5%, rgba(216,196,255,0.28) 15%, transparent 32%);
          opacity: 0;
          filter: blur(5px);
          mix-blend-mode: screen;
          animation: diary-warp-core-burst var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .diary-warp-collapse .diary-warp-core {
          animation-name: diary-warp-core-close;
        }

        .warp-ray {
          position: absolute;
          width: min(150vmin, 1400px);
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.38), rgba(216,196,255,0.28), transparent);
          filter: blur(2px) drop-shadow(0 0 14px rgba(216,196,255,0.24));
          opacity: 0;
          transform-origin: center;
          animation: diary-warp-ray-streak var(--duration-ms) cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .diary-warp-collapse .warp-ray {
          animation-name: diary-warp-ray-close;
        }

        .warp-ray-1 {
          transform: rotate(18deg) scaleX(0.08);
        }

        .warp-ray-2 {
          animation-delay: 70ms;
          transform: rotate(-18deg) scaleX(0.08);
        }

        .warp-ray-3 {
          animation-delay: 140ms;
          transform: rotate(62deg) scaleX(0.08);
        }

        .warp-ray-4 {
          animation-delay: 210ms;
          transform: rotate(-62deg) scaleX(0.08);
        }

        .ripple {
          position: absolute;
          width: min(92vmin, 860px);
          height: min(92vmin, 860px);
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.34);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.1) inset,
            0 0 34px var(--ripple-glow-soft, rgba(186, 220, 255, 0.14)),
            0 0 80px var(--ripple-glow-wide, rgba(216, 196, 255, 0.1));
          filter: blur(2.4px);
          opacity: 0;
          transform: scale(0.08);
          animation: ripple-expand var(--duration-ms) cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .diary-warp-collapse .ripple {
          transform: scale(1.18);
          animation-name: ripple-collapse;
          animation-timing-function: cubic-bezier(0.7, 0, 0.84, 0);
        }

        .ripple-1 {
          width: min(26vmin, 260px);
          height: min(26vmin, 260px);
          animation-delay: 20ms;
          border-color: rgba(244, 194, 194, 0.34);
          --ripple-glow-soft: rgba(244, 194, 194, 0.18);
          --ripple-glow-wide: rgba(244, 194, 194, 0.1);
        }

        .ripple-2 {
          width: min(44vmin, 430px);
          height: min(44vmin, 430px);
          animation-delay: 110ms;
          border-color: rgba(216, 196, 255, 0.32);
          --ripple-glow-soft: rgba(216, 196, 255, 0.18);
          --ripple-glow-wide: rgba(216, 196, 255, 0.11);
        }

        .ripple-3 {
          width: min(62vmin, 610px);
          height: min(62vmin, 610px);
          animation-delay: 200ms;
          border-color: rgba(126, 214, 255, 0.28);
          --ripple-glow-soft: rgba(126, 214, 255, 0.15);
          --ripple-glow-wide: rgba(126, 214, 255, 0.09);
        }

        .ripple-4 {
          width: min(80vmin, 780px);
          height: min(80vmin, 780px);
          animation-delay: 300ms;
          border-color: rgba(246, 211, 124, 0.24);
          --ripple-glow-soft: rgba(246, 211, 124, 0.13);
          --ripple-glow-wide: rgba(246, 211, 124, 0.08);
        }

        .ripple-5 {
          width: min(98vmin, 960px);
          height: min(98vmin, 960px);
          animation-delay: 400ms;
          border-color: rgba(196, 91, 214, 0.2);
          --ripple-glow-soft: rgba(196, 91, 214, 0.12);
          --ripple-glow-wide: rgba(196, 91, 214, 0.08);
        }

        @keyframes diary-warp-source-fade {
          0% {
            opacity: 1;
            filter: saturate(1.02) brightness(0.98);
            transform: scale(1);
          }
          48% {
            opacity: 1;
            filter: saturate(1.2) brightness(1.08);
            transform: scale(1.035);
          }
          100% {
            opacity: 0;
            filter: saturate(0.96) brightness(0.82);
            transform: scale(1.1);
          }
        }

        @keyframes diary-warp-source-close {
          0% {
            opacity: 1;
            filter: saturate(1.02) brightness(0.98);
            transform: scale(1);
          }
          54% {
            opacity: 0.94;
            filter: saturate(0.95) brightness(0.92);
            transform: scale(0.98);
          }
          100% {
            opacity: 0;
            filter: saturate(0.82) brightness(0.64);
            transform: scale(0.9);
          }
        }

        @keyframes diary-warp-target-fade {
          0% {
            opacity: 0;
            filter: saturate(0.9) brightness(0.82);
            transform: scale(0.96);
          }
          44% {
            opacity: 0.25;
          }
          72% {
            opacity: 0.86;
            filter: saturate(1.08) brightness(1.04);
          }
          100% {
            opacity: 1;
            filter: saturate(1) brightness(1);
            transform: scale(1);
          }
        }

        @keyframes diary-warp-target-close {
          0% {
            opacity: 0;
            filter: saturate(0.9) brightness(0.82);
            transform: scale(1.04);
          }
          54% {
            opacity: 0.18;
          }
          82% {
            opacity: 0.72;
            filter: saturate(0.92) brightness(0.88);
            transform: scale(0.98);
          }
          100% {
            opacity: 1;
            filter: saturate(0.96) brightness(0.92);
            transform: scale(1);
          }
        }

        @keyframes diary-warp-glow-fade {
          0% {
            opacity: 0.24;
            transform: scale(0.7);
          }
          36% {
            opacity: 0.72;
            transform: scale(1.04);
          }
          62% {
            opacity: 0.42;
            transform: scale(1.18);
          }
          100% {
            opacity: 0;
            transform: scale(1.46);
          }
        }

        @keyframes diary-warp-glow-close {
          0% {
            opacity: 0.52;
            transform: scale(1.42);
          }
          46% {
            opacity: 0.68;
            transform: scale(0.96);
          }
          72% {
            opacity: 0.34;
            transform: scale(0.42);
          }
          100% {
            opacity: 0;
            transform: scale(0.16);
          }
        }

        @keyframes diary-warp-veil-fade {
          0%, 20% {
            opacity: 0;
          }
          42% {
            opacity: 0.2;
          }
          66% {
            opacity: 0.14;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes diary-warp-veil-close {
          0%, 18% {
            opacity: 0.16;
          }
          48% {
            opacity: 0.2;
          }
          78% {
            opacity: 0.08;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes diary-warp-core-burst {
          0% {
            opacity: 0;
            transform: scale(0.14);
          }
          26% {
            opacity: 0.2;
            transform: scale(0.52);
          }
          46% {
            opacity: 0.58;
            transform: scale(1.08);
          }
          68% {
            opacity: 0.2;
            transform: scale(1.5);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }

        @keyframes diary-warp-core-close {
          0% {
            opacity: 0.18;
            transform: scale(1.8);
          }
          42% {
            opacity: 0.5;
            transform: scale(0.84);
          }
          70% {
            opacity: 0.36;
            transform: scale(0.28);
          }
          100% {
            opacity: 0;
            transform: scale(0.08);
          }
        }

        @keyframes diary-warp-ray-streak {
          0% {
            opacity: 0;
          }
          24% {
            opacity: 0;
          }
          42% {
            opacity: 0.36;
          }
          64% {
            opacity: 0.14;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes diary-warp-ray-close {
          0% {
            opacity: 0.14;
          }
          32% {
            opacity: 0.3;
          }
          68% {
            opacity: 0.16;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes ripple-expand {
          0% {
            opacity: 0;
            transform: scale(0.08);
          }
          10% {
            opacity: 0.58;
          }
          42% {
            opacity: 0.28;
          }
          72% {
            opacity: 0.1;
          }
          100% {
            opacity: 0;
            transform: scale(1.52);
          }
        }

        @keyframes ripple-collapse {
          0% {
            opacity: 0;
            transform: scale(1.18);
          }
          18% {
            opacity: 0;
            transform: scale(1.02);
          }
          34% {
            opacity: 0.28;
            transform: scale(0.78);
          }
          58% {
            opacity: 0.34;
            transform: scale(0.42);
          }
          78% {
            opacity: 0.12;
            transform: scale(0.18);
          }
          100% {
            opacity: 0;
            transform: scale(0.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .diary-warp-source,
          .diary-warp-target,
          .diary-warp-glow,
          .diary-warp-veil,
          .diary-warp-core,
          .warp-ray,
          .ripple {
            animation-duration: 1ms;
            animation-delay: 0ms;
          }

          .diary-warp-rays,
          .diary-warp-ripples,
          .diary-warp-veil,
          .diary-warp-core {
            display: none;
          }
        }

      `})]})}function rg(){return(0,Z.jsx)(ng,{defaultTarget:`/chart`})}function ig({user:e}){return(0,Z.jsx)(Gh,{user:e})}function ag(){return(0,Z.jsx)(th,{user:null,backgroundVariant:`cosmic`,headerVariant:`cosmic`,hideAuthActions:!0,children:(0,Z.jsx)(`section`,{className:`mx-auto flex min-h-[68vh] max-w-3xl items-center justify-center`,children:(0,Z.jsxs)(`div`,{className:`relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 px-8 py-12 text-center shadow-2xl backdrop-blur-xl md:px-14`,children:[(0,Z.jsx)(`div`,{className:`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,194,194,0.2),transparent_42%),radial-gradient(circle_at_18%_72%,rgba(216,196,255,0.14),transparent_32%)]`}),(0,Z.jsxs)(`div`,{className:`relative`,children:[(0,Z.jsx)(`p`,{className:`text-sm uppercase tracking-[0.32em] text-[#f4c2c2]`,children:`The spell is closed`}),(0,Z.jsx)(`h1`,{className:`mt-4 text-4xl font-semibold text-white md:text-5xl`,children:`Thank you`}),(0,Z.jsx)(`p`,{className:`mx-auto mt-5 max-w-xl text-sm leading-8 text-slate-200`,children:`Your session has been gently sealed. When you return, the door will open again from a fresh login.`})]})]})})})}function og(){let[e,t]=(0,w.useState)(null),[n,r]=(0,w.useState)(!1),i=window.location.pathname.startsWith(`/app`)?`/app`:`/`;return(0,w.useEffect)(()=>{$(`/api/auth/me/`).then(e=>{t(e.authenticated?e:null)}).catch(()=>t(null)).finally(()=>r(!0))},[]),(0,Z.jsx)(bn,{basename:i,children:(0,Z.jsxs)(Mt,{children:[(0,Z.jsx)(At,{path:`/`,element:(0,Z.jsx)(wm,{})}),(0,Z.jsx)(At,{path:`/about`,element:(0,Z.jsx)(Om,{user:e})}),(0,Z.jsx)(At,{path:`/bookdesign`,element:(0,Z.jsx)(Gh,{user:e})}),(0,Z.jsx)(At,{path:`/chart/warp`,element:(0,Z.jsx)(rg,{})}),(0,Z.jsx)(At,{path:`/chart`,element:(0,Z.jsx)(ig,{user:e})}),(0,Z.jsx)(At,{path:`/tarot`,element:(0,Z.jsx)(Oh,{user:e})}),(0,Z.jsx)(At,{path:`/tarot/decks`,element:(0,Z.jsx)(kh,{user:e})}),(0,Z.jsx)(At,{path:`/tarot/decks/:deckId`,element:(0,Z.jsx)(Mh,{user:e})}),(0,Z.jsx)(At,{path:`/tarot/decks/:deckId/cards/new`,element:(0,Z.jsx)(Nh,{user:e})}),(0,Z.jsx)(At,{path:`/tarot/cards/:cardId/edit`,element:(0,Z.jsx)(Nh,{user:e})}),(0,Z.jsx)(At,{path:`/tarot/read`,element:(0,Z.jsx)(Ph,{user:e})}),(0,Z.jsx)(At,{path:`/tarot/readings/:readingId`,element:(0,Z.jsx)(Vh,{user:e})}),(0,Z.jsx)(At,{path:`/diary/warp`,element:(0,Z.jsx)(ng,{})}),(0,Z.jsx)(At,{path:`/diary`,element:(0,Z.jsx)(Xh,{user:e,authReady:n,initialPageIndex:0},`diary-calendar`)}),(0,Z.jsx)(At,{path:`/diary/list`,element:(0,Z.jsx)(Xh,{user:e,authReady:n,initialPageIndex:1},`diary-list`)}),(0,Z.jsx)(At,{path:`/diary/new`,element:(0,Z.jsx)(Zh,{user:e})}),(0,Z.jsx)(At,{path:`/diary/:id/edit`,element:(0,Z.jsx)(Zh,{user:e,isEdit:!0})}),(0,Z.jsx)(At,{path:`/login`,element:(0,Z.jsx)(Qh,{onAuth:t})}),(0,Z.jsx)(At,{path:`/register`,element:(0,Z.jsx)($h,{onAuth:t})}),(0,Z.jsx)(At,{path:`/profile`,element:(0,Z.jsx)(eg,{user:e,onAuth:t})}),(0,Z.jsx)(At,{path:`/thank-you`,element:(0,Z.jsx)(ag,{})})]})})}(0,y.createRoot)(document.getElementById(`root`)).render((0,Z.jsx)(og,{}));