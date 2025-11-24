var Pr=Object.defineProperty;var qr=(t,e,o)=>e in t?Pr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var Ne=(t,e,o)=>qr(t,typeof e!="symbol"?e+"":e,o);import{g as Or}from"./storybook-utils-BWaCeRRT.js";import{i as F,a as fr,x as g}from"./lit-element-CzkqXGGu.js";import{A as Je,e as Ze,u as j,o as Q}from"./static-CzM4uoyW.js";import{e as Hr,n as Rr}from"./ref-3AivGw2q.js";import{A as zr,f as at,a as Ir}from"./version-CcLPgAjI.js";import{x as Nr}from"./auro-icon-CNMF0wKG-vCjlPHA5.js";import{A as $r}from"./auroElement-CqxMywsH.js";import"./registered-DrZ9fufq.js";import"./registered-BmRy1yHw.js";import"./index-CXFB-ZtJ.js";const Vr=["top","right","bottom","left"],lt=["start","end"],dt=Vr.reduce((t,e)=>t.concat(e,e+"-"+lt[0],e+"-"+lt[1]),[]),Ve=Math.min,_=Math.max,Me=Math.round,$e=Math.floor,B=t=>({x:t,y:t}),Mr={left:"right",right:"left",bottom:"top",top:"bottom"},Wr={start:"end",end:"start"};function ct(t,e,o){return _(t,Ve(e,o))}function Oe(t,e){return typeof t=="function"?t(e):t}function H(t){return t.split("-")[0]}function O(t){return t.split("-")[1]}function br(t){return t==="x"?"y":"x"}function wr(t){return t==="y"?"height":"width"}const _r=new Set(["top","bottom"]);function N(t){return _r.has(H(t))?"y":"x"}function vr(t){return br(N(t))}function xr(t,e,o){o===void 0&&(o=!1);const r=O(t),n=vr(t),i=wr(n);let s=n==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[i]>e.floating[i]&&(s=_e(s)),[s,_e(s)]}function Ur(t){const e=_e(t);return[We(t),e,We(e)]}function We(t){return t.replace(/start|end/g,e=>Wr[e])}const ut=["left","right"],pt=["right","left"],jr=["top","bottom"],Kr=["bottom","top"];function Xr(t,e,o){switch(t){case"top":case"bottom":return o?e?pt:ut:e?ut:pt;case"left":case"right":return e?jr:Kr;default:return[]}}function Yr(t,e,o,r){const n=O(t);let i=Xr(H(t),o==="start",r);return n&&(i=i.map(s=>s+"-"+n),e&&(i=i.concat(i.map(We)))),i}function _e(t){return t.replace(/left|right|bottom|top/g,e=>Mr[e])}function Gr(t){return{top:0,right:0,bottom:0,left:0,...t}}function Qr(t){return typeof t!="number"?Gr(t):{top:t,right:t,bottom:t,left:t}}function Ue(t){const{x:e,y:o,width:r,height:n}=t;return{width:r,height:n,top:o,left:e,right:e+r,bottom:o+n,x:e,y:o}}function ht(t,e,o){let{reference:r,floating:n}=t;const i=N(e),s=vr(e),a=wr(s),l=H(e),d=i==="y",p=r.x+r.width/2-n.width/2,c=r.y+r.height/2-n.height/2,h=r[a]/2-n[a]/2;let u;switch(l){case"top":u={x:p,y:r.y-n.height};break;case"bottom":u={x:p,y:r.y+r.height};break;case"right":u={x:r.x+r.width,y:c};break;case"left":u={x:r.x-n.width,y:c};break;default:u={x:r.x,y:r.y}}switch(O(e)){case"start":u[s]-=h*(o&&d?-1:1);break;case"end":u[s]+=h*(o&&d?-1:1);break}return u}const Jr=async(t,e,o)=>{const{placement:r="bottom",strategy:n="absolute",middleware:i=[],platform:s}=o,a=i.filter(Boolean),l=await(s.isRTL==null?void 0:s.isRTL(e));let d=await s.getElementRects({reference:t,floating:e,strategy:n}),{x:p,y:c}=ht(d,r,l),h=r,u={},f=0;for(let b=0;b<a.length;b++){const{name:v,fn:m}=a[b],{x:w,y:x,data:E,reset:y}=await m({x:p,y:c,initialPlacement:r,placement:h,strategy:n,middlewareData:u,rects:d,platform:s,elements:{reference:t,floating:e}});p=w??p,c=x??c,u={...u,[v]:{...u[v],...E}},y&&f<=50&&(f++,typeof y=="object"&&(y.placement&&(h=y.placement),y.rects&&(d=y.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:n}):y.rects),{x:p,y:c}=ht(d,h,l)),b=-1)}return{x:p,y:c,placement:h,strategy:n,middlewareData:u}};async function ot(t,e){var o;e===void 0&&(e={});const{x:r,y:n,platform:i,rects:s,elements:a,strategy:l}=t,{boundary:d="clippingAncestors",rootBoundary:p="viewport",elementContext:c="floating",altBoundary:h=!1,padding:u=0}=Oe(e,t),f=Qr(u),v=a[h?c==="floating"?"reference":"floating":c],m=Ue(await i.getClippingRect({element:(o=await(i.isElement==null?void 0:i.isElement(v)))==null||o?v:v.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(a.floating)),boundary:d,rootBoundary:p,strategy:l})),w=c==="floating"?{x:r,y:n,width:s.floating.width,height:s.floating.height}:s.reference,x=await(i.getOffsetParent==null?void 0:i.getOffsetParent(a.floating)),E=await(i.isElement==null?void 0:i.isElement(x))?await(i.getScale==null?void 0:i.getScale(x))||{x:1,y:1}:{x:1,y:1},y=Ue(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:w,offsetParent:x,strategy:l}):w);return{top:(m.top-y.top+f.top)/E.y,bottom:(y.bottom-m.bottom+f.bottom)/E.y,left:(m.left-y.left+f.left)/E.x,right:(y.right-m.right+f.right)/E.x}}function Zr(t,e,o){return(t?[...o.filter(n=>O(n)===t),...o.filter(n=>O(n)!==t)]:o.filter(n=>H(n)===n)).filter(n=>t?O(n)===t||(e?We(n)!==n:!1):!0)}const en=function(t){return t===void 0&&(t={}),{name:"autoPlacement",options:t,async fn(e){var o,r,n;const{rects:i,middlewareData:s,placement:a,platform:l,elements:d}=e,{crossAxis:p=!1,alignment:c,allowedPlacements:h=dt,autoAlignment:u=!0,...f}=Oe(t,e),b=c!==void 0||h===dt?Zr(c||null,u,h):h,v=await ot(e,f),m=((o=s.autoPlacement)==null?void 0:o.index)||0,w=b[m];if(w==null)return{};const x=xr(w,i,await(l.isRTL==null?void 0:l.isRTL(d.floating)));if(a!==w)return{reset:{placement:b[0]}};const E=[v[H(w)],v[x[0]],v[x[1]]],y=[...((r=s.autoPlacement)==null?void 0:r.overflows)||[],{placement:w,overflows:E}],R=b[m+1];if(R)return{data:{index:m+1,overflows:y},reset:{placement:R}};const q=y.map(k=>{const z=O(k.placement);return[k.placement,z&&p?k.overflows.slice(0,2).reduce((ze,Ie)=>ze+Ie,0):k.overflows[0],k.overflows]}).sort((k,z)=>k[1]-z[1]),V=((n=q.filter(k=>k[2].slice(0,O(k[0])?2:3).every(z=>z<=0))[0])==null?void 0:n[0])||q[0][0];return V!==a?{data:{index:m+1,overflows:y},reset:{placement:V}}:{}}}},tn=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;const{placement:n,middlewareData:i,rects:s,initialPlacement:a,platform:l,elements:d}=e,{mainAxis:p=!0,crossAxis:c=!0,fallbackPlacements:h,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:b=!0,...v}=Oe(t,e);if((o=i.arrow)!=null&&o.alignmentOffset)return{};const m=H(n),w=N(a),x=H(a)===a,E=await(l.isRTL==null?void 0:l.isRTL(d.floating)),y=h||(x||!b?[_e(a)]:Ur(a)),R=f!=="none";!h&&R&&y.push(...Yr(a,b,f,E));const q=[a,...y],Re=await ot(e,v),V=[];let k=((r=i.flip)==null?void 0:r.overflows)||[];if(p&&V.push(Re[m]),c){const M=xr(n,s,E);V.push(Re[M[0]],Re[M[1]])}if(k=[...k,{placement:n,overflows:V}],!V.every(M=>M<=0)){var z,ze;const M=(((z=i.flip)==null?void 0:z.index)||0)+1,Ge=q[M];if(Ge&&(!(c==="alignment"?w!==N(Ge):!1)||k.every(C=>N(C.placement)===w?C.overflows[0]>0:!0)))return{data:{index:M,overflows:k},reset:{placement:Ge}};let G=(ze=k.filter(W=>W.overflows[0]<=0).sort((W,C)=>W.overflows[1]-C.overflows[1])[0])==null?void 0:ze.placement;if(!G)switch(u){case"bestFit":{var Ie;const W=(Ie=k.filter(C=>{if(R){const I=N(C.placement);return I===w||I==="y"}return!0}).map(C=>[C.placement,C.overflows.filter(I=>I>0).reduce((I,Fr)=>I+Fr,0)]).sort((C,I)=>C[1]-I[1])[0])==null?void 0:Ie[0];W&&(G=W);break}case"initialPlacement":G=a;break}if(n!==G)return{reset:{placement:G}}}return{}}}},on=new Set(["left","top"]);async function rn(t,e){const{placement:o,platform:r,elements:n}=t,i=await(r.isRTL==null?void 0:r.isRTL(n.floating)),s=H(o),a=O(o),l=N(o)==="y",d=on.has(s)?-1:1,p=i&&l?-1:1,c=Oe(e,t);let{mainAxis:h,crossAxis:u,alignmentAxis:f}=typeof c=="number"?{mainAxis:c,crossAxis:0,alignmentAxis:null}:{mainAxis:c.mainAxis||0,crossAxis:c.crossAxis||0,alignmentAxis:c.alignmentAxis};return a&&typeof f=="number"&&(u=a==="end"?f*-1:f),l?{x:u*p,y:h*d}:{x:h*d,y:u*p}}const nn=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,r;const{x:n,y:i,placement:s,middlewareData:a}=e,l=await rn(e,t);return s===((o=a.offset)==null?void 0:o.placement)&&(r=a.arrow)!=null&&r.alignmentOffset?{}:{x:n+l.x,y:i+l.y,data:{...l,placement:s}}}}},sn=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:r,placement:n}=e,{mainAxis:i=!0,crossAxis:s=!1,limiter:a={fn:v=>{let{x:m,y:w}=v;return{x:m,y:w}}},...l}=Oe(t,e),d={x:o,y:r},p=await ot(e,l),c=N(H(n)),h=br(c);let u=d[h],f=d[c];if(i){const v=h==="y"?"top":"left",m=h==="y"?"bottom":"right",w=u+p[v],x=u-p[m];u=ct(w,u,x)}if(s){const v=c==="y"?"top":"left",m=c==="y"?"bottom":"right",w=f+p[v],x=f-p[m];f=ct(w,f,x)}const b=a.fn({...e,[h]:u,[c]:f});return{...b,data:{x:b.x-o,y:b.y-r,enabled:{[h]:i,[c]:s}}}}}};function je(){return typeof window<"u"}function Y(t){return yr(t)?(t.nodeName||"").toLowerCase():"#document"}function S(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function P(t){var e;return(e=(yr(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function yr(t){return je()?t instanceof Node||t instanceof S(t).Node:!1}function L(t){return je()?t instanceof Element||t instanceof S(t).Element:!1}function A(t){return je()?t instanceof HTMLElement||t instanceof S(t).HTMLElement:!1}function mt(t){return!je()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof S(t).ShadowRoot}const an=new Set(["inline","contents"]);function He(t){const{overflow:e,overflowX:o,overflowY:r,display:n}=D(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&!an.has(n)}const ln=new Set(["table","td","th"]);function dn(t){return ln.has(Y(t))}const cn=[":popover-open",":modal"];function Ke(t){return cn.some(e=>{try{return t.matches(e)}catch{return!1}})}const un=["transform","translate","scale","rotate","perspective"],pn=["transform","translate","scale","rotate","perspective","filter"],hn=["paint","layout","strict","content"];function rt(t){const e=nt(),o=L(t)?D(t):t;return un.some(r=>o[r]?o[r]!=="none":!1)||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||pn.some(r=>(o.willChange||"").includes(r))||hn.some(r=>(o.contain||"").includes(r))}function mn(t){let e=$(t);for(;A(e)&&!X(e);){if(rt(e))return e;if(Ke(e))return null;e=$(e)}return null}function nt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}const gn=new Set(["html","body","#document"]);function X(t){return gn.has(Y(t))}function D(t){return S(t).getComputedStyle(t)}function Xe(t){return L(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function $(t){if(Y(t)==="html")return t;const e=t.assignedSlot||t.parentNode||mt(t)&&t.host||P(t);return mt(e)?e.host:e}function Tr(t){const e=$(t);return X(e)?t.ownerDocument?t.ownerDocument.body:t.body:A(e)&&He(e)?e:Tr(e)}function qe(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);const n=Tr(t),i=n===((r=t.ownerDocument)==null?void 0:r.body),s=S(n);if(i){const a=et(s);return e.concat(s,s.visualViewport||[],He(n)?n:[],a&&o?qe(a):[])}return e.concat(n,qe(n,[],o))}function et(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function kr(t){const e=D(t);let o=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const n=A(t),i=n?t.offsetWidth:o,s=n?t.offsetHeight:r,a=Me(o)!==i||Me(r)!==s;return a&&(o=i,r=s),{width:o,height:r,$:a}}function it(t){return L(t)?t:t.contextElement}function K(t){const e=it(t);if(!A(e))return B(1);const o=e.getBoundingClientRect(),{width:r,height:n,$:i}=kr(e);let s=(i?Me(o.width):o.width)/r,a=(i?Me(o.height):o.height)/n;return(!s||!Number.isFinite(s))&&(s=1),(!a||!Number.isFinite(a))&&(a=1),{x:s,y:a}}const fn=B(0);function Er(t){const e=S(t);return!nt()||!e.visualViewport?fn:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function bn(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==S(t)?!1:e}function U(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);const n=t.getBoundingClientRect(),i=it(t);let s=B(1);e&&(r?L(r)&&(s=K(r)):s=K(t));const a=bn(i,o,r)?Er(i):B(0);let l=(n.left+a.x)/s.x,d=(n.top+a.y)/s.y,p=n.width/s.x,c=n.height/s.y;if(i){const h=S(i),u=r&&L(r)?S(r):r;let f=h,b=et(f);for(;b&&r&&u!==f;){const v=K(b),m=b.getBoundingClientRect(),w=D(b),x=m.left+(b.clientLeft+parseFloat(w.paddingLeft))*v.x,E=m.top+(b.clientTop+parseFloat(w.paddingTop))*v.y;l*=v.x,d*=v.y,p*=v.x,c*=v.y,l+=x,d+=E,f=S(b),b=et(f)}}return Ue({width:p,height:c,x:l,y:d})}function st(t,e){const o=Xe(t).scrollLeft;return e?e.left+o:U(P(t)).left+o}function Sr(t,e,o){o===void 0&&(o=!1);const r=t.getBoundingClientRect(),n=r.left+e.scrollLeft-(o?0:st(t,r)),i=r.top+e.scrollTop;return{x:n,y:i}}function wn(t){let{elements:e,rect:o,offsetParent:r,strategy:n}=t;const i=n==="fixed",s=P(r),a=e?Ke(e.floating):!1;if(r===s||a&&i)return o;let l={scrollLeft:0,scrollTop:0},d=B(1);const p=B(0),c=A(r);if((c||!c&&!i)&&((Y(r)!=="body"||He(s))&&(l=Xe(r)),A(r))){const u=U(r);d=K(r),p.x=u.x+r.clientLeft,p.y=u.y+r.clientTop}const h=s&&!c&&!i?Sr(s,l,!0):B(0);return{width:o.width*d.x,height:o.height*d.y,x:o.x*d.x-l.scrollLeft*d.x+p.x+h.x,y:o.y*d.y-l.scrollTop*d.y+p.y+h.y}}function vn(t){return Array.from(t.getClientRects())}function xn(t){const e=P(t),o=Xe(t),r=t.ownerDocument.body,n=_(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),i=_(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let s=-o.scrollLeft+st(t);const a=-o.scrollTop;return D(r).direction==="rtl"&&(s+=_(e.clientWidth,r.clientWidth)-n),{width:n,height:i,x:s,y:a}}function yn(t,e){const o=S(t),r=P(t),n=o.visualViewport;let i=r.clientWidth,s=r.clientHeight,a=0,l=0;if(n){i=n.width,s=n.height;const d=nt();(!d||d&&e==="fixed")&&(a=n.offsetLeft,l=n.offsetTop)}return{width:i,height:s,x:a,y:l}}const Tn=new Set(["absolute","fixed"]);function kn(t,e){const o=U(t,!0,e==="fixed"),r=o.top+t.clientTop,n=o.left+t.clientLeft,i=A(t)?K(t):B(1),s=t.clientWidth*i.x,a=t.clientHeight*i.y,l=n*i.x,d=r*i.y;return{width:s,height:a,x:l,y:d}}function gt(t,e,o){let r;if(e==="viewport")r=yn(t,o);else if(e==="document")r=xn(P(t));else if(L(e))r=kn(e,o);else{const n=Er(t);r={x:e.x-n.x,y:e.y-n.y,width:e.width,height:e.height}}return Ue(r)}function Cr(t,e){const o=$(t);return o===e||!L(o)||X(o)?!1:D(o).position==="fixed"||Cr(o,e)}function En(t,e){const o=e.get(t);if(o)return o;let r=qe(t,[],!1).filter(a=>L(a)&&Y(a)!=="body"),n=null;const i=D(t).position==="fixed";let s=i?$(t):t;for(;L(s)&&!X(s);){const a=D(s),l=rt(s);!l&&a.position==="fixed"&&(n=null),(i?!l&&!n:!l&&a.position==="static"&&!!n&&Tn.has(n.position)||He(s)&&!l&&Cr(t,s))?r=r.filter(p=>p!==s):n=a,s=$(s)}return e.set(t,r),r}function Sn(t){let{element:e,boundary:o,rootBoundary:r,strategy:n}=t;const s=[...o==="clippingAncestors"?Ke(e)?[]:En(e,this._c):[].concat(o),r],a=s[0],l=s.reduce((d,p)=>{const c=gt(e,p,n);return d.top=_(c.top,d.top),d.right=Ve(c.right,d.right),d.bottom=Ve(c.bottom,d.bottom),d.left=_(c.left,d.left),d},gt(e,a,n));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Cn(t){const{width:e,height:o}=kr(t);return{width:e,height:o}}function Ln(t,e,o){const r=A(e),n=P(e),i=o==="fixed",s=U(t,!0,i,e);let a={scrollLeft:0,scrollTop:0};const l=B(0);function d(){l.x=st(n)}if(r||!r&&!i)if((Y(e)!=="body"||He(n))&&(a=Xe(e)),r){const u=U(e,!0,i,e);l.x=u.x+e.clientLeft,l.y=u.y+e.clientTop}else n&&d();i&&!r&&n&&d();const p=n&&!r&&!i?Sr(n,a):B(0),c=s.left+a.scrollLeft-l.x-p.x,h=s.top+a.scrollTop-l.y-p.y;return{x:c,y:h,width:s.width,height:s.height}}function Qe(t){return D(t).position==="static"}function ft(t,e){if(!A(t)||D(t).position==="fixed")return null;if(e)return e(t);let o=t.offsetParent;return P(t)===o&&(o=o.ownerDocument.body),o}function Lr(t,e){const o=S(t);if(Ke(t))return o;if(!A(t)){let n=$(t);for(;n&&!X(n);){if(L(n)&&!Qe(n))return n;n=$(n)}return o}let r=ft(t,e);for(;r&&dn(r)&&Qe(r);)r=ft(r,e);return r&&X(r)&&Qe(r)&&!rt(r)?o:r||mn(t)||o}const Dn=async function(t){const e=this.getOffsetParent||Lr,o=this.getDimensions,r=await o(t.floating);return{reference:Ln(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Bn(t){return D(t).direction==="rtl"}const An={convertOffsetParentRelativeRectToViewportRelativeRect:wn,getDocumentElement:P,getClippingRect:Sn,getOffsetParent:Lr,getElementRects:Dn,getClientRects:vn,getDimensions:Cn,getScale:K,isElement:L,isRTL:Bn};function Dr(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Fn(t,e){let o=null,r;const n=P(t);function i(){var a;clearTimeout(r),(a=o)==null||a.disconnect(),o=null}function s(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),i();const d=t.getBoundingClientRect(),{left:p,top:c,width:h,height:u}=d;if(a||e(),!h||!u)return;const f=$e(c),b=$e(n.clientWidth-(p+h)),v=$e(n.clientHeight-(c+u)),m=$e(p),x={rootMargin:-f+"px "+-b+"px "+-v+"px "+-m+"px",threshold:_(0,Ve(1,l))||1};let E=!0;function y(R){const q=R[0].intersectionRatio;if(q!==l){if(!E)return s();q?s(!1,q):r=setTimeout(()=>{s(!1,1e-7)},1e3)}q===1&&!Dr(d,t.getBoundingClientRect())&&s(),E=!1}try{o=new IntersectionObserver(y,{...x,root:n.ownerDocument})}catch{o=new IntersectionObserver(y,x)}o.observe(t)}return s(!0),i}function Pn(t,e,o,r){r===void 0&&(r={});const{ancestorScroll:n=!0,ancestorResize:i=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=r,d=it(t),p=n||i?[...d?qe(d):[],...qe(e)]:[];p.forEach(m=>{n&&m.addEventListener("scroll",o,{passive:!0}),i&&m.addEventListener("resize",o)});const c=d&&a?Fn(d,o):null;let h=-1,u=null;s&&(u=new ResizeObserver(m=>{let[w]=m;w&&w.target===d&&u&&(u.unobserve(e),cancelAnimationFrame(h),h=requestAnimationFrame(()=>{var x;(x=u)==null||x.observe(e)})),o()}),d&&!l&&u.observe(d),u.observe(e));let f,b=l?U(t):null;l&&v();function v(){const m=U(t);b&&!Dr(b,m)&&o(),b=m,f=requestAnimationFrame(v)}return o(),()=>{var m;p.forEach(w=>{n&&w.removeEventListener("scroll",o),i&&w.removeEventListener("resize",o)}),c==null||c(),(m=u)==null||m.disconnect(),u=null,l&&cancelAnimationFrame(f)}}const qn=nn,On=en,Hn=sn,Rn=tn,bt=(t,e,o)=>{const r=new Map,n={platform:An,...o},i={...n.platform,_c:r};return Jr(t,e,{...n,platform:i})},zn=10,T=class T{static setupMousePressChecker(){if(!T.isMousePressHandlerInitialized&&window&&window.addEventListener){T.isMousePressHandlerInitialized=!0,T._mousePressedTimeout||(T._mousePressedTimeout=null);const e=o=>{const r=o.type==="mousedown";r?(T._mousePressedTimeout!==null&&(clearTimeout(T._mousePressedTimeout),T._mousePressedTimeout=null),T.isMousePressed||(T.isMousePressed=!0)):T.isMousePressed&&!r&&(T._mousePressedTimeout=setTimeout(()=>{T.isMousePressed=!1,T._mousePressedTimeout=null},0))};window.addEventListener("mousedown",e),window.addEventListener("mouseup",e)}}constructor(e,o){this.element=e,this.behavior=o,this.focusHandler=null,this.clickHandler=null,this.keyDownHandler=null,this.configureTrial=0,this.eventPrefix=void 0,this.id=void 0,this.showing=!1,this.strategy=void 0}mirrorSize(){if(this.element.bibSizer&&this.element.matchWidth){const e=window.getComputedStyle(this.element.bibSizer),o=this.element.bib.shadowRoot.querySelector(".container");e.width!=="0px"&&(o.style.width=e.width),e.height!=="0px"&&(o.style.height=e.height),o.style.maxWidth=e.maxWidth,o.style.maxHeight=e.maxHeight}}getPositioningStrategy(){var o;const e=this.element.bib.mobileFullscreenBreakpoint||((o=this.element.floaterConfig)==null?void 0:o.fullscreenBreakpoint);switch(this.behavior){case"tooltip":return"floating";case"dialog":case"drawer":if(e){const r=window.matchMedia(`(max-width: ${e})`).matches;this.element.expanded=r}return this.element.nested?"cover":"fullscreen";case"dropdown":case void 0:case null:return e&&window.matchMedia(`(max-width: ${e})`).matches?"fullscreen":"floating";default:return this.behavior}}position(){var o,r,n,i,s,a;const e=this.getPositioningStrategy();if(this.configureBibStrategy(e),e==="floating"){this.mirrorSize();const l=[qn(((o=this.element.floaterConfig)==null?void 0:o.offset)||0),...(r=this.element.floaterConfig)!=null&&r.shift?[Hn()]:[],...(n=this.element.floaterConfig)!=null&&n.flip?[Rn()]:[],...(i=this.element.floaterConfig)!=null&&i.autoPlacement?[On()]:[]];bt(this.element.trigger,this.element.bib,{strategy:((s=this.element.floaterConfig)==null?void 0:s.strategy)||"fixed",placement:(a=this.element.floaterConfig)==null?void 0:a.placement,middleware:l||[]}).then(({x:d,y:p})=>{Object.assign(this.element.bib.style,{left:`${d}px`,top:`${p}px`})})}else e==="cover"&&bt(this.element.parentNode,this.element.bib,{placement:"bottom-start"}).then(({x:l,y:d})=>{Object.assign(this.element.bib.style,{left:`${l}px`,top:`${d-this.element.parentNode.offsetHeight}px`,width:`${this.element.parentNode.offsetWidth}px`,height:`${this.element.parentNode.offsetHeight}px`})})}lockScroll(e=!0){var o;e?(document.body.style.overflow="hidden",this.element.bib.style.transform=`translateY(${(o=window==null?void 0:window.visualViewport)==null?void 0:o.offsetTop}px)`):document.body.style.overflow=""}configureBibStrategy(e){var r;if(e==="fullscreen"){this.element.isBibFullscreen=!0,this.element.bib.setAttribute("isfullscreen",""),this.element.bib.style.position="fixed",this.element.bib.style.top="0px",this.element.bib.style.left="0px",this.element.bib.style.width="",this.element.bib.style.height="",this.element.style.contain="";const n=this.element.bib.shadowRoot.querySelector(".container");n?(n.style.width="",n.style.height="",n.style.maxWidth="",n.style.maxHeight=`${(r=window==null?void 0:window.visualViewport)==null?void 0:r.height}px`,this.configureTrial=0):this.configureTrial<zn&&(this.configureTrial+=1,setTimeout(()=>{this.configureBibStrategy(e)},0)),this.element.isPopoverVisible&&this.lockScroll(!0)}else this.element.bib.style.position="",this.element.bib.removeAttribute("isfullscreen"),this.element.isBibFullscreen=!1,this.element.style.contain="layout";const o=this.strategy&&this.strategy!==e;if(this.strategy=e,o){const n=new CustomEvent(this.eventPrefix?`${this.eventPrefix}-strategy-change`:"strategy-change",{detail:{value:e},composed:!0});this.element.dispatchEvent(n)}}updateState(){var o,r;if(!this.element.isPopoverVisible){this.cleanupHideHandlers();try{(r=(o=this.element).cleanup)==null||r.call(o)}catch{}}}handleFocusLoss(){var o;if(T.isMousePressed||this.element.noHideOnThisFocusLoss||this.element.hasAttribute("noHideOnThisFocusLoss"))return;const{activeElement:e}=document;this.element.contains(e)||(o=this.element.bib)!=null&&o.contains(e)||this.element.bib.hasAttribute("isfullscreen")||this.hideBib("keydown")}setupHideHandlers(){this.focusHandler=()=>this.handleFocusLoss(),this.clickHandler=e=>{if(!e.composedPath().includes(this.element.trigger)&&!e.composedPath().includes(this.element.bib)||this.element.bib.backdrop&&e.composedPath().includes(this.element.bib.backdrop)){const o=document.expandedAuroFormkitDropdown||document.expandedAuroFloater;o&&o.element.isPopoverVisible?(o.hideBib(),document.expandedAuroFormkitDropdown=null,document.expandedAuroFloater=this):this.hideBib("click")}},this.keyDownHandler=e=>{if(e.key==="Escape"&&this.element.isPopoverVisible){const o=document.expandedAuroFormkitDropdown||document.expandedAuroFloater;if(o&&o!==this&&o.element.isPopoverVisible)return;this.hideBib("keydown")}},this.behavior!=="drawer"&&this.behavior!=="dialog"&&document.addEventListener("focusin",this.focusHandler),document.addEventListener("keydown",this.keyDownHandler),setTimeout(()=>{window.addEventListener("click",this.clickHandler)},0)}cleanupHideHandlers(){this.focusHandler&&(document.removeEventListener("focusin",this.focusHandler),this.focusHandler=null),this.clickHandler&&(window.removeEventListener("click",this.clickHandler),this.clickHandler=null),this.keyDownHandler&&(document.removeEventListener("keydown",this.keyDownHandler),this.keyDownHandler=null)}handleUpdate(e){e.has("isPopoverVisible")&&this.updateState()}updateCurrentExpandedDropdown(){const e=document.expandedAuroFormkitDropdown||document.expandedAuroFloater;e&&e!==this&&e.element.isPopoverVisible&&document.expandedAuroFloater.eventPrefix===this.eventPrefix&&document.expandedAuroFloater.hideBib(),document.expandedAuroFloater=this}showBib(){var e;!this.element.disabled&&!this.showing&&(this.updateCurrentExpandedDropdown(),(e=this.element.triggerChevron)==null||e.setAttribute("data-expanded",!0),this.showing||(this.element.modal||this.setupHideHandlers(),this.showing=!0,this.element.isPopoverVisible=!0,this.position(),this.dispatchEventDropdownToggle()),this.element.cleanup=Pn(this.element.trigger||this.element.parentNode,this.element.bib,()=>{this.position()}))}hideBib(e="unknown"){var o;!this.element.disabled&&!this.element.noToggle&&(this.lockScroll(!1),(o=this.element.triggerChevron)==null||o.removeAttribute("data-expanded"),this.element.isPopoverVisible&&(this.element.isPopoverVisible=!1),this.showing&&(this.cleanupHideHandlers(),this.showing=!1,this.dispatchEventDropdownToggle(e))),document.expandedAuroFloater=null}dispatchEventDropdownToggle(e){const o=new CustomEvent(this.eventPrefix?`${this.eventPrefix}-toggled`:"toggled",{detail:{expanded:this.showing,eventType:e||"unknown"},composed:!0});this.element.dispatchEvent(o)}handleClick(){this.element.isPopoverVisible?this.hideBib("click"):this.showBib();const e=new CustomEvent(this.eventPrefix?`${this.eventPrefix}-triggerClick`:"triggerClick",{composed:!0,detail:{expanded:this.element.isPopoverVisible}});this.element.dispatchEvent(e)}handleEvent(e){if(!this.element.disableEventShow)switch(e.type){case"keydown":const o=e.composedPath()[0];(e.key==="Enter"||e.key===" "&&(!o||o.tagName!=="INPUT"))&&(e.preventDefault(),this.handleClick());break;case"mouseenter":this.element.hoverToggle&&this.showBib();break;case"mouseleave":this.element.hoverToggle&&this.hideBib("mouseleave");break;case"focus":this.element.focusShow&&this.showBib();break;case"blur":setTimeout(()=>this.handleFocusLoss(),0);break;case"click":document.activeElement===document.body&&e.currentTarget.focus(),this.handleClick();break}}handleTriggerTabIndex(){const e=["a","button",'input:not([type="hidden"])',"select","textarea",'[tabindex]:not([tabindex="-1"])',"auro-button","auro-input","auro-hyperlink"],o=this.element.querySelectorAll('[slot="trigger"]')[0];if(!o)return;const r=o.tagName.toLowerCase();e.forEach(n=>{if(r===n){this.element.tabIndex=-1;return}o.querySelector(n)&&(this.element.tabIndex=-1)})}regenerateBibId(){this.id=this.element.getAttribute("id"),this.id||(this.id=window.crypto.randomUUID(),this.element.setAttribute("id",this.id)),this.element.bib.setAttribute("id",`${this.id}-floater-bib`)}configure(e,o){T.setupMousePressChecker(),this.eventPrefix=o,this.element!==e&&(this.element=e),this.behavior!==this.element.behavior&&(this.behavior=this.element.behavior),this.element.trigger&&this.disconnect(),this.element.trigger=this.element.triggerElement||this.element.shadowRoot.querySelector("#trigger")||this.element.trigger,this.element.bib=this.element.shadowRoot.querySelector("#bib")||this.element.bib,this.element.bibSizer=this.element.shadowRoot.querySelector("#bibSizer"),this.element.triggerChevron=this.element.shadowRoot.querySelector("#showStateIcon"),this.element.floaterConfig&&(this.element.hoverToggle=this.element.floaterConfig.hoverToggle),this.regenerateBibId(),this.handleTriggerTabIndex(),this.handleEvent=this.handleEvent.bind(this),this.element.trigger&&(this.element.trigger.addEventListener("keydown",this.handleEvent),this.element.trigger.addEventListener("click",this.handleEvent),this.element.trigger.addEventListener("mouseenter",this.handleEvent),this.element.trigger.addEventListener("mouseleave",this.handleEvent),this.element.trigger.addEventListener("focus",this.handleEvent),this.element.trigger.addEventListener("blur",this.handleEvent))}disconnect(){var e,o,r;this.cleanupHideHandlers(),this.element&&((o=(e=this.element).cleanup)==null||o.call(e),this.element.bib&&this.element.shadowRoot.append(this.element.bib),(r=this.element)!=null&&r.trigger&&(this.element.trigger.removeEventListener("keydown",this.handleEvent),this.element.trigger.removeEventListener("click",this.handleEvent),this.element.trigger.removeEventListener("mouseenter",this.handleEvent),this.element.trigger.removeEventListener("mouseleave",this.handleEvent),this.element.trigger.removeEventListener("focus",this.handleEvent),this.element.trigger.removeEventListener("blur",this.handleEvent)))}};Ne(T,"isMousePressed",!1),Ne(T,"isMousePressHandlerInitialized",!1);let tt=T;const In=["a[href]","button:not([disabled])","textarea:not([disabled])","input:not([disabled])","select:not([disabled])",'[role="tab"]:not([disabled])','[role="link"]:not([disabled])','[role="button"]:not([disabled])','[tabindex]:not([tabindex="-1"])','[contenteditable]:not([contenteditable="false"])'],Nn=["auro-checkbox","auro-radio","auro-dropdown","auro-button","auro-combobox","auro-input","auro-counter","auro-menu","auro-select","auro-datepicker","auro-hyperlink","auro-accordion"];function $n(t){const e=t.tagName.toLowerCase();return!(!Nn.some(o=>t.hasAttribute(o)||e===o)||t.hasAttribute("disabled")||e.match("hyperlink")&&!t.hasAttribute("href"))}function Br(t){const e=[],o=i=>{var s;if(i.nodeType===Node.ELEMENT_NODE){if($n(i)){e.push(i);return}for(const l of In)if((s=i.matches)!=null&&s.call(i,l)){e.push(i);break}if(i.shadowRoot&&i.shadowRoot.children&&Array.from(i.shadowRoot.children).forEach(l=>{o(l)}),i.tagName==="SLOT"){const l=i.assignedNodes({flatten:!0});for(const d of l)o(d)}else i.children&&Array.from(i.children).forEach(l=>{o(l)})}};o(t);const r=[],n=new Set;for(const i of e)n.has(i)||(n.add(i),r.push(i));return r}class Vn{constructor(e){Ne(this,"_onKeydown",e=>{var o;if(e.key==="Tab"){this.tabDirection=e.shiftKey?"backward":"forward";let r=document.activeElement;const n=[r];for(;(o=r==null?void 0:r.shadowRoot)!=null&&o.activeElement;)n.push(r.shadowRoot.activeElement),r=r.shadowRoot.activeElement;const i=this._getFocusableElements(),s=(n.includes(i[0])||n.includes(this.container))&&this.tabDirection==="backward"?i.length-1:n.includes(i[i.length-1])&&this.tabDirection==="forward"?0:null;s!==null&&(i[s].focus(),e.preventDefault(),e.stopPropagation())}});if(!e||!(e instanceof HTMLElement))throw new Error("FocusTrap requires a valid HTMLElement.");this.container=e,this.tabDirection="forward",this._init()}_init(){"inert"in HTMLElement.prototype&&(this.container.inert=!1,this.container.setAttribute("data-focus-trap-container",!0)),this.container.addEventListener("keydown",this._onKeydown)}_getFocusableElements(){return Br(this.container)}focusFirstElement(){const e=this._getFocusableElements();e.length&&e[0].focus()}focusLastElement(){const e=this._getFocusableElements();e.length&&e[e.length-1].focus()}disconnect(){this.container.hasAttribute("data-focus-trap-container")&&this.container.removeAttribute("data-focus-trap-container"),this.container.removeEventListener("keydown",this._onKeydown)}}const Mn="9.1.0",Wn=F`:host{position:fixed;z-index:var(--depth-tooltip, 400);display:none;isolation:isolate}:host(:not([matchWidth])) .container{min-width:fit-content}:host([isfullscreen]){position:fixed;top:0;left:0}:host([isfullscreen]) .container{width:100dvw;max-width:none;height:100dvh;max-height:none;border-radius:unset;margin-top:0;box-shadow:unset;overscroll-behavior:contain}:host([data-show]){display:flex}:host([common]:not([isfullscreen])) .container,:host([rounded]:not([isfullscreen])) .container{border-radius:var(--ds-border-radius, 0.375rem)}:host([common][isfullscreen]) .container,:host([rounded][isfullscreen]) .container{border-radius:unset;box-shadow:unset}:host(:not([isfullscreen])) .container.shape-box{border-radius:unset}:host(:not([isfullscreen])) .container[class*=shape-pill],:host(:not([isfullscreen])) .container[class*=shape-snowflake]{border-radius:30px}:host(:not([isfullscreen])) .container[class*=shape-rounded]{border-radius:16px}.container{display:inline-block;overflow:auto;box-sizing:border-box;border-radius:var(--ds-border-radius, 0.375rem);margin:var(--ds-size-50, 0.25rem) 0}`,_n=F`.container{background-color:var(--ds-auro-dropdownbib-container-color);box-shadow:var(--ds-auro-dropdownbib-boxshadow-color);color:var(--ds-auro-dropdownbib-text-color)}`,Ar=F`:host(:not([ondark])),:host(:not([appearance=inverse])){--ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-muted, #676767);--ds-auro-dropdown-trigger-background-color: var(--ds-basic-color-surface-default, #ffffff);--ds-auro-dropdown-trigger-hover-background-color: var(--ds-basic-color-surface-default, #ffffff);--ds-auro-dropdown-trigger-container-color: var(--ds-basic-color-surface-default, #ffffff);--ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-bold, #585e67);--ds-auro-dropdown-trigger-outline-color: transparent;--ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-default, #2a2a2a);--ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, 0px 0px 10px rgba(0, 0, 0, 0.15));--ds-auro-dropdownbib-background-color: var(--ds-basic-color-surface-default, #ffffff);--ds-auro-dropdownbib-container-color: var(--ds-basic-color-surface-default, #ffffff);--ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-default, #2a2a2a)}:host([ondark]),:host([appearance=inverse]){--ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #ccd2db);--ds-auro-dropdown-trigger-background-color: var(--ds-advanced-color-shared-background-inverse, rgba(255, 255, 255, 0.15));--ds-auro-dropdown-trigger-hover-background-color: var(--ds-advanced-color-shared-background-inverse, rgba(255, 255, 255, 0.15));--ds-auro-dropdown-trigger-container-color: var(--ds-advanced-color-shared-background-inverse, rgba(255, 255, 255, 0.15));--ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-inverse, #ffffff);--ds-auro-dropdown-trigger-outline-color: transparent;--ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-inverse, #ffffff);--ds-auro-dropdownbib-boxshadow-color: var(--ds-elevation-200, 0px 0px 10px rgba(0, 0, 0, 0.15));--ds-auro-dropdownbib-background-color: var(--ds-advanced-color-shared-background-inverse, rgba(255, 255, 255, 0.15));--ds-auro-dropdownbib-container-color: var(--ds-advanced-color-shared-background-inverse, rgba(255, 255, 255, 0.15));--ds-auro-dropdownbib-text-color: var(--ds-basic-color-texticon-inverse, #ffffff)}`,Un="--ds-grid-breakpoint-",jn=["xl","lg","md","sm","xs"];class Kn extends fr{constructor(){super(),this._mobileBreakpointValue=void 0,Je.prototype.handleComponentTagRename(this,"auro-dropdownbib"),this.shape="rounded",this.matchWidth=!1}static get styles(){return[Wn,_n,Ar]}static get properties(){return{isFullscreen:{type:Boolean,reflect:!0},common:{type:Boolean,reflect:!0},inset:{type:Boolean,reflect:!0},matchWidth:{type:Boolean,reflect:!0},rounded:{type:Boolean,reflect:!0},bibTemplate:{type:Object},shape:{type:String,reflect:!0}}}set mobileFullscreenBreakpoint(e){if(!(jn.includes(e)?e:void 0))this._mobileBreakpointValue=void 0;else{const r=getComputedStyle(document.documentElement);this._mobileBreakpointValue=r.getPropertyValue(Un+e)}}get mobileFullscreenBreakpoint(){return this._mobileBreakpointValue}updated(e){e.has("isFullscreen")&&(this.childNodes.forEach(o=>{o.nodeName!=="#text"&&(this.isFullscreen?o.setAttribute("isFullscreen","true"):o.removeAttribute("isFullscreen"))}),this.bibTemplate&&(this.isFullscreen?this.bibTemplate.setAttribute("isFullscreen","true"):this.bibTemplate.removeAttribute("isFullscreen")))}connectedCallback(){super.connectedCallback(),this.addEventListener("auro-bibtemplate-connected",e=>{const o=e.detail.element;this.bibTemplate=o,o&&(this.isFullscreen?o.setAttribute("isFullscreen","true"):o.removeAttribute("isFullscreen"))})}firstUpdated(e){super.firstUpdated(e),this.dispatchEvent(new CustomEvent("auro-dropdownbib-connected",{bubbles:!0,composed:!0,detail:{element:this}}))}render(){const e={container:!0};return e[`shape-${this.shape}`]=!0,j`
      <div class="${Ze(e)}" part="bibContainer">
        <slot></slot>
      </div>
    `}}const Xn=F`.shape-classic-xl,.shape-classic-lg,.shape-classic-md,.shape-classic-sm,.shape-classic-xs{min-height:56px;max-height:56px;border-style:solid;border-width:1px;border-radius:var(--ds-border-radius, 0.375rem)}.shape-classic-xl.simple,.shape-classic-lg.simple,.shape-classic-md.simple,.shape-classic-sm.simple,.shape-classic-xs.simple{border-width:0px;min-height:58px;max-height:58px;background-color:unset;box-shadow:none}.shape-classic-xl.thin,.shape-classic-lg.thin,.shape-classic-md.thin,.shape-classic-sm.thin,.shape-classic-xs.thin{border-width:1px;min-height:56px;max-height:56px;background-color:unset}.shape-classic-xl.parentBorder,.shape-classic-lg.parentBorder,.shape-classic-md.parentBorder,.shape-classic-sm.parentBorder,.shape-classic-xs.parentBorder{border:0;box-shadow:unset;min-height:54px;max-height:54px}.shape-snowflake-xl,.shape-snowflake-lg,.shape-snowflake-md,.shape-snowflake-sm,.shape-snowflake-xs{min-height:56px;max-height:56px;border-style:solid;border-width:2px;border-color:transparent;border-radius:30px}.shape-snowflake-xl.simple,.shape-snowflake-lg.simple,.shape-snowflake-md.simple,.shape-snowflake-sm.simple,.shape-snowflake-xs.simple{border-width:0px;min-height:60px;max-height:60px;background-color:unset;box-shadow:none}.shape-snowflake-xl.thin,.shape-snowflake-lg.thin,.shape-snowflake-md.thin,.shape-snowflake-sm.thin,.shape-snowflake-xs.thin{border-width:1px;min-height:58px;max-height:58px;background-color:unset}.shape-snowflake-xl.parentBorder,.shape-snowflake-lg.parentBorder,.shape-snowflake-md.parentBorder,.shape-snowflake-sm.parentBorder,.shape-snowflake-xs.parentBorder{border:0;box-shadow:unset;min-height:56px;max-height:56px}.shape-box-xl{min-height:68px;max-height:68px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-xl.simple{border-width:0px;min-height:72px;max-height:72px;background-color:unset;box-shadow:none}.shape-box-xl.thin{border-width:1px;min-height:70px;max-height:70px;background-color:unset}.shape-box-xl.parentBorder{border:0;box-shadow:unset;min-height:68px;max-height:68px}.shape-box-lg{min-height:52px;max-height:52px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-lg.simple{border-width:0px;min-height:56px;max-height:56px;background-color:unset;box-shadow:none}.shape-box-lg.thin{border-width:1px;min-height:54px;max-height:54px;background-color:unset}.shape-box-lg.parentBorder{border:0;box-shadow:unset;min-height:52px;max-height:52px}.shape-box-md{min-height:44px;max-height:44px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-md.simple{border-width:0px;min-height:48px;max-height:48px;background-color:unset;box-shadow:none}.shape-box-md.thin{border-width:1px;min-height:46px;max-height:46px;background-color:unset}.shape-box-md.parentBorder{border:0;box-shadow:unset;min-height:44px;max-height:44px}.shape-box-sm{min-height:32px;max-height:32px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-sm.simple{border-width:0px;min-height:36px;max-height:36px;background-color:unset;box-shadow:none}.shape-box-sm.thin{border-width:1px;min-height:34px;max-height:34px;background-color:unset}.shape-box-sm.parentBorder{border:0;box-shadow:unset;min-height:32px;max-height:32px}.shape-box-xs{min-height:20px;max-height:20px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-xs.simple{border-width:0px;min-height:24px;max-height:24px;background-color:unset;box-shadow:none}.shape-box-xs.thin{border-width:1px;min-height:22px;max-height:22px;background-color:unset}.shape-box-xs.parentBorder{border:0;box-shadow:unset;min-height:20px;max-height:20px}.shape-rounded-lg{min-height:56px;max-height:56px;border-style:solid;border-width:2px;border-color:transparent;border-radius:6px}.shape-rounded-lg.simple{border-width:0px;min-height:56px;max-height:56px;background-color:unset;box-shadow:none}.shape-rounded-lg.thin{border-width:1px;min-height:54px;max-height:54px;background-color:unset}.shape-rounded-lg.parentBorder{border:0;box-shadow:unset;min-height:52px;max-height:52px}.shape-pill-xl{min-height:68px;max-height:68px;border-style:solid;border-width:2px;border-color:transparent;border-radius:36px}.shape-pill-xl.simple{border-width:0px;min-height:72px;max-height:72px;background-color:unset;box-shadow:none}.shape-pill-xl.thin{border-width:1px;min-height:70px;max-height:70px;background-color:unset}.shape-pill-xl.parentBorder{border:0;box-shadow:unset;min-height:68px;max-height:68px}.shape-pill-left-xl{min-height:68px;max-height:68px;border-style:solid;border-width:2px;border-color:transparent;border-radius:36px 0 0 36px}.shape-pill-left-xl.simple{border-width:0px;min-height:72px;max-height:72px;background-color:unset;box-shadow:none}.shape-pill-left-xl.thin{border-width:1px;min-height:70px;max-height:70px;background-color:unset}.shape-pill-left-xl.parentBorder{border:0;box-shadow:unset;min-height:68px;max-height:68px}.shape-pill-right-xl{min-height:68px;max-height:68px;border-style:solid;border-width:2px;border-color:transparent;border-radius:0 36px 36px 0}.shape-pill-right-xl.simple{border-width:0px;min-height:72px;max-height:72px;background-color:unset;box-shadow:none}.shape-pill-right-xl.thin{border-width:1px;min-height:70px;max-height:70px;background-color:unset}.shape-pill-right-xl.parentBorder{border:0;box-shadow:unset;min-height:68px;max-height:68px}.shape-pill-md{min-height:44px;max-height:44px;border-style:solid;border-width:2px;border-color:transparent;border-radius:36px}.shape-pill-md.simple{border-width:0px;min-height:48px;max-height:48px;background-color:unset;box-shadow:none}.shape-pill-md.thin{border-width:1px;min-height:46px;max-height:46px;background-color:unset}.shape-pill-md.parentBorder{border:0;box-shadow:unset;min-height:44px;max-height:44px}.shape-pill-left-md{min-height:44px;max-height:44px;border-style:solid;border-width:2px;border-color:transparent;border-radius:36px 0 0 36px}.shape-pill-left-md.simple{border-width:0px;min-height:48px;max-height:48px;background-color:unset;box-shadow:none}.shape-pill-left-md.thin{border-width:1px;min-height:46px;max-height:46px;background-color:unset}.shape-pill-left-md.parentBorder{border:0;box-shadow:unset;min-height:44px;max-height:44px}.shape-pill-right-md{min-height:44px;max-height:44px;border-style:solid;border-width:2px;border-color:transparent;border-radius:0 36px 36px 0}.shape-pill-right-md.simple{border-width:0px;min-height:48px;max-height:48px;background-color:unset;box-shadow:none}.shape-pill-right-md.thin{border-width:1px;min-height:46px;max-height:46px;background-color:unset}.shape-pill-right-md.parentBorder{border:0;box-shadow:unset;min-height:44px;max-height:44px}`,Yn=F`:host(:not([layout*=classic])){--ds-auro-dropdown-trigger-border-color: transparent}:host(:not([disabled],[onDark])) .wrapper:focus-within,:host(:not([disabled],[onDark])) .wrapper:active,:host(:not([disabled],[appearance=inverse])) .wrapper:focus-within,:host(:not([disabled],[appearance=inverse])) .wrapper:active{--ds-auro-dropdown-trigger-border-color: var(--ds-advanced-color-state-focused, #01426a);--ds-auro-dropdown-trigger-outline-color: var(--ds-advanced-color-state-focused, #01426a)}:host(:not([disabled],[onDark])) .wrapper:hover,:host(:not([disabled],[appearance=inverse])) .wrapper:hover{--ds-auro-dropdown-trigger-background-color: var(--ds-auro-dropdown-trigger-hover-background-color)}:host(:not([ondark])) .wrapper,:host(:not([appearance=inverse])) .wrapper{border-color:var(--ds-auro-dropdown-trigger-border-color);background-color:var(--ds-auro-dropdown-trigger-background-color);color:var(--ds-auro-dropdown-trigger-text-color)}:host(:not([onDark])[disabled]),:host(:not([appearance=inverse])[disabled]){--ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-disabled, #d0d0d0);--ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-disabled, #d0d0d0);--ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-border-subtle, #dddddd)}:host(:not([onDark])[disabled]) #triggerLabel,:host(:not([appearance=inverse])[disabled]) #triggerLabel{cursor:default}:host(:not([ondark])[error]),:host(:not([appearance=inverse])[error]){--ds-auro-dropdown-trigger-border-color: var(--ds-basic-color-status-error, #e31f26)}:host(:not([disabled])[onDark]) .wrapper:focus-within,:host(:not([disabled])[onDark]) .wrapper:active,:host(:not([disabled])[appearance=inverse]) .wrapper:focus-within,:host(:not([disabled])[appearance=inverse]) .wrapper:active{--ds-auro-dropdown-trigger-border-color: var(--ds-advanced-color-state-focused-inverse, #ffffff);--ds-auro-dropdown-trigger-outline-color: var(--ds-advanced-color-state-focused-inverse, #ffffff)}:host(:not([disabled])[onDark]) .wrapper:hover,:host(:not([disabled])[appearance=inverse]) .wrapper:hover{--ds-auro-dropdown-trigger-background-color: var(--ds-auro-dropdown-trigger-hover-background-color)}:host([onDark]) .label,:host([onDark]) .helpText,:host([appearance=inverse]) .label,:host([appearance=inverse]) .helpText{color:var(--ds-auro-dropdown-label-text-color)}:host([onDark]) .wrapper,:host([appearance=inverse]) .wrapper{border-color:var(--ds-auro-dropdown-trigger-border-color);background-color:var(--ds-auro-dropdown-trigger-background-color);color:var(--ds-auro-dropdown-trigger-text-color)}:host([onDark][disabled]),:host([appearance=inverse][disabled]){--ds-auro-dropdown-trigger-text-color: var(--ds-basic-color-texticon-inverse-disabled, #7e8894);--ds-auro-dropdown-label-text-color: var(--ds-basic-color-texticon-inverse-disabled, #7e8894);--ds-auro-dropdown-trigger-container-color: var(--ds-advanced-color-shared-background-inverse-disabled, rgba(255, 255, 255, 0.1))}:host([onDark][disabled]) #triggerLabel,:host([appearance=inverse][disabled]) #triggerLabel{cursor:default}:host([ondark][error]),:host([appearance=inverse][error]){--ds-auro-dropdown-trigger-border-color: var(--ds-advanced-color-state-error-inverse, #f9a4a8)}`,Gn=F`:host{position:relative;display:block;text-align:left}[popover=manual]{overflow:visible;padding:0;border:inherit;margin:0;background:inherit;outline:inherit}:host([open]){z-index:var(--depth-tooltip, 400)}.wrapper{display:flex;flex:1;flex-direction:row;align-items:center;justify-content:center;outline:none}.triggerContentWrapper{display:flex;overflow:hidden;width:100%;flex:1;align-items:center;justify-content:center;text-overflow:ellipsis;white-space:nowrap}:host([matchwidth]) #bibSizer{width:100%}`,Qn=F``,Jn=F`@media(hover: hover){:host(:not([disabled])) .wrapper:hover{cursor:pointer}}:host([layout*=classic]){position:relative;max-width:100%}:host([layout*=classic]) #bibSizer{position:absolute;z-index:-1;opacity:0;pointer-events:none}:host([layout*=classic]) label{transition:font-size .3s cubic-bezier(0.215, 0.61, 0.355, 1);white-space:normal}:host([layout*=classic]) .wrapper{display:flex;flex-direction:row;box-shadow:inset 0 0 0 1px var(--ds-auro-dropdown-trigger-outline-color)}:host([layout*=classic]) .triggerContentWrapper{overflow:hidden;flex:1;justify-content:start;text-overflow:ellipsis;white-space:nowrap}:host([layout*=classic]) #showStateIcon{display:flex;overflow:hidden;height:100%;align-items:center;padding-right:var(--ds-size-150, 0.75rem)}:host([layout*=classic]) #showStateIcon [auro-icon]{height:var(--ds-size-300, 1.5rem)}:host([layout*=classic]) #showStateIcon[data-expanded=true] [auro-icon]{transform:rotate(-180deg)}`,Zn=F`.layout-emphasized .chevron,.layout-emphasized-left .chevron,.layout-emphasized-right .chevron{margin-right:var(--ds-size-300, 1.5rem)}:host([layout*=emphasized][shape*=pill]:not([layout*=right])) .leftIndent{width:calc(100% - var(--ds-size-300, 1.5rem));margin-left:var(--ds-size-300, 1.5rem)}:host([layout*=emphasized][shape*=pill]:not([layout*=left])) .rightIndent{width:calc(100% - var(--ds-size-300, 1.5rem));margin-right:var(--ds-size-300, 1.5rem)}:host([layout*=emphasized][shape*=pill]:not([layout*=left]):not([layout*=right])) .rightIndent{width:calc(100% - var(--ds-size-600, 3rem));margin-right:var(--ds-size-300, 1.5rem)}`,ei=F`:host([layout*=snowflake]) .leftIndent{width:calc(100% - var(--ds-size-400, 2rem));margin-left:var(--ds-size-200, 1rem)}:host([layout*=snowflake]) .rightIndent{width:calc(100% - var(--ds-size-400, 2rem));margin-right:var(--ds-size-200, 1rem)}:host([layout*=snowflake]) .trigger,:host([layout*=snowflake]) .helpText{text-align:center}.layout-snowflake .chevron,.layout-snowflake-left .chevron,.layout-snowflake-right .chevron{margin-right:var(--ds-size-200, 1rem)}`;class Ye extends $r{constructor(){super(),this.isPopoverVisible=!1,this.isBibFullscreen=!1,this.matchWidth=!1,this.noHideOnThisFocusLoss=!1,this.errorMessage=void 0,this.layout=void 0,this.shape=void 0,this.size=void 0,this.parentBorder=!1,this.handleDropdownToggle=this.handleDropdownToggle.bind(this),this.bibElement=Hr(),this.privateDefaults()}get commonWrapperClasses(){return{trigger:!0,wrapper:!0,hasFocus:this.hasFocus,simple:this.simple,parentBorder:this.parentBorder}}privateDefaults(){this.appearance="default",this.chevron=!1,this.disabled=!1,this.disableFocusTrap=!1,this.error=!1,this.tabIndex=0,this.noToggle=!1,this.a11yRole="button",this.onDark=!1,this.showTriggerBorders=!0,this.triggerContentFocusable=!1,this.simple=!1,this.placement="bottom-start",this.offset=0,this.noFlip=!1,this.shift=!1,this.autoPlacement=!1,this.constructor.shadowRootOptions={...fr.shadowRootOptions,delegatesFocus:!0},this.hasTriggerContent=!1,this.triggerContentSlot=void 0,this.runtimeUtils=new Je,this.floater=new tt;const e=new zr;this.iconTag=e.generateTag("auro-formkit-dropdown-icon",Mn,Nr),this.dropdownBibTag=e.generateTag("auro-formkit-dropdown-dropdownbib",at,Kn),this.helpTextTag=e.generateTag("auro-formkit-dropdown-helptext",at,Ir),this.bindFocusEventToTrigger=this.bindFocusEventToTrigger.bind(this)}get floaterConfig(){return{placement:this.placement,flip:!this.noFlip,shift:this.shift,autoPlacement:this.autoPlacement,offset:this.offset}}hide(){this.floater.hideBib()}show(){this.floater.showBib()}focus(){this.isPopoverVisible&&this.focusTrap?this.focusTrap.focusFirstElement():this.trigger.focus()}static get properties(){return{appearance:{type:String,reflect:!0},autoPlacement:{type:Boolean,reflect:!0},disableEventShow:{type:Boolean,reflect:!0},simple:{type:Boolean,reflect:!0},chevron:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0},disableFocusTrap:{type:Boolean,reflect:!0},dropdownWidth:{type:Number},dropdownId:{type:String,reflect:!1,attribute:!1},error:{type:Boolean,reflect:!0},errorMessage:{type:String},focusShow:{type:Boolean,reflect:!0},isPopoverVisible:{type:Boolean,reflect:!0,attribute:"open"},isBibFullscreen:{type:Boolean,reflect:!0},hoverToggle:{type:Boolean,reflect:!0},hasTriggerContent:{type:Boolean},fullscreenBreakpoint:{type:String,reflect:!0},parentBorder:{type:Boolean,reflect:!0},matchWidth:{type:Boolean,reflect:!0},noFlip:{type:Boolean,reflect:!0},shift:{type:Boolean,reflect:!0},noHideOnThisFocusLoss:{type:Boolean,reflect:!0},noToggle:{type:Boolean,reflect:!0},offset:{type:Number,reflect:!0},onDark:{type:Boolean,reflect:!0},onSlotChange:{type:Function,reflect:!1},placement:{type:String,reflect:!0},tabIndex:{type:Number},a11yRole:{type:String||void 0,attribute:!1,reflect:!1}}}static get styles(){return[Gn,Ar,Yn,Qn,Jn,Zn,ei,Xn]}static register(e="auro-dropdown"){Je.prototype.registerComponent(e,Ye)}get focusableEntityQuery(){return"auro-input, [auro-input], auro-button, [auro-button], button, input"}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this.floater.disconnect(),this.clearTriggerFocusEventBinding()}updated(e){super.updated(e),this.floater.handleUpdate(e),e.has("fullscreenBreakpoint")&&(this.bibContent.mobileFullscreenBreakpoint=this.fullscreenBreakpoint),(e.size===0||e.has("isPopoverVisible"))&&this.handleTriggerContentSlotChange(),e.has("isPopoverVisible")&&this.bibElement.value&&(this.isPopoverVisible?this.bibElement.value.showPopover():this.bibElement.value.hidePopover())}handleDropdownToggle(e){this.updateFocusTrap(),this.isPopoverVisible=e.detail.expanded;const o=e.detail.eventType||"unknown";!this.isPopoverVisible&&this.hasFocus&&o==="keydown"&&this.trigger.focus()}firstUpdated(){this.floater.configure(this,"auroDropdown"),this.addEventListener("auroDropdown-toggled",this.handleDropdownToggle),this.dispatchEvent(new CustomEvent("auroDropdown-idAdded",{detail:{id:this.floater.element.id}})),this.triggerContentFocusable||(this.dropdownId=this.floater.element.id),this.bibContent=this.floater.element.bib,this.runtimeUtils.handleComponentTagRename(this,"auro-dropdown"),this.trigger.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("auroDropdown-triggerClick",{bubbles:!0,composed:!0}))})}exposeCssParts(){this.setAttribute("exportparts","trigger:dropdownTrigger, chevron:dropdownChevron, helpText:dropdownHelpText, size:dropdownSize")}isCustomSlotContent(e){let o=e,r=!1;for(;o;)if(o=o.parentElement,o&&o.hasAttribute("slot")){r=!0;break}return r}handleFocusin(){this.hasFocus=!0}updateFocusTrap(){if(this.isPopoverVisible&&!this.disableFocusTrap){this.focusTrap=new Vn(this.bibContent),this.focusTrap.focusFirstElement();return}this.focusTrap&&(this.focusTrap.disconnect(),this.focusTrap=void 0)}handleFocusout(){this.hasFocus=!1}bindFocusEventToTrigger(e){const o=new FocusEvent(e.type,{bubbles:!1,cancelable:!1,composed:!0});this.trigger.dispatchEvent(o)}setupTriggerFocusEventBinding(){!this.triggerContentSlot||this.triggerContentSlot.length===0||this.triggerContentSlot.forEach(e=>{e.querySelectorAll&&e.querySelectorAll(this.focusableEntityQuery).forEach(r=>{r.addEventListener("focus",this.bindFocusEventToTrigger),r.addEventListener("blur",this.bindFocusEventToTrigger)})})}clearTriggerFocusEventBinding(){!this.triggerContentSlot||this.triggerContentSlot.length===0||this.triggerContentSlot.forEach(e=>{e.querySelectorAll&&e.querySelectorAll(this.focusableEntityQuery).forEach(r=>{r.removeEventListener("focus",this.bindFocusEventToTrigger),r.removeEventListener("blur",this.bindFocusEventToTrigger)})})}clearTriggerA11yAttributes(e){!e||!e.removeAttribute||(e.removeAttribute("aria-labelledby"),e.getAttribute("id")===`${this.id}-trigger-element`&&e.removeAttribute("id"),e.removeAttribute("role"),e.removeAttribute("aria-expanded"),e.removeAttribute("aria-controls"),e.removeAttribute("aria-autocomplete"))}handleTriggerContentSlotChange(e){this.floater.handleTriggerTabIndex();const o=this.shadowRoot.querySelector("#trigger"),r=this.shadowRoot.querySelector(".triggerContentWrapper slot");if(r){const n=r.assignedNodes();n&&(this.triggerContentFocusable=n.some(i=>Br(i).length>0),this.triggerContentFocusable?(this.clearTriggerA11yAttributes(o),o.removeAttribute("tabindex")):o.setAttribute("tabindex","0"))}if(e)try{this.triggerNode=e.target,this.triggerContentSlot=e.target.assignedNodes()}catch(n){console.warn("auro-dropdown: Unable to access the trigger content slot.",n)}this.triggerContentSlot?(this.setupTriggerFocusEventBinding(),this.hasTriggerContent=this.triggerContentSlot.some(n=>{if(n.textContent.trim())return!0;const i=n.querySelector("slot");return i?i.assignedNodes().some(a=>!!a.textContent.trim()):!1})):this.hasTriggerContent=!1}handleDefaultSlot(){this.onSlotChange&&this.onSlotChange()}renderBasicHtml(e){return j`
      <div>
        <div
          id="trigger"
          class="${Ze(this.commonWrapperClasses)}" part="wrapper"
          tabindex="${Q(this.triggerContentFocusable?void 0:this.tabIndex)}"
          role="${Q(this.triggerContentFocusable?void 0:this.a11yRole)}"
          aria-expanded="${Q(this.a11yRole==="button"||this.triggerContentFocusable?void 0:this.isPopoverVisible)}"
          aria-controls="${Q(this.a11yRole==="button"||this.triggerContentFocusable?void 0:this.dropdownId)}"
          aria-labelledby="${Q(this.triggerContentFocusable?void 0:"triggerLabel")}"
          @focusin="${this.handleFocusin}"
          @blur="${this.handleFocusOut}">
          <div class="triggerContentWrapper" id="triggerLabel">
            <slot
              name="trigger"
              @slotchange="${this.handleTriggerContentSlotChange}"></slot>
          </div>
          ${this.chevron?j`
              <div
                id="showStateIcon"
                class="chevron"
                part="chevron">
                <${this.iconTag}
                  category="interface"
                  name="${this.isPopoverVisible?"chevron-up":"chevron-down"}"
                  appearance="${this.onDark?"inverse":this.appearance}"
                  variant="${this.disabled?"disabled":"muted"}">
                  >
                </${this.iconTag}>
              </div>
            `:void 0}
        </div>
        <div class="${Ze(e)}">
          <slot name="helpText"></slot>
        </div>
        <div id="bibSizer" part="size"></div>
        <${this.dropdownBibTag}
          id="bib"
          shape="${this.shape}"
          ?data-show="${this.isPopoverVisible}"
          ?isfullscreen="${this.isBibFullscreen}"
          ${Rr(this.bibElement)}
          popover="manual"
          >
          <div class="slotContent">
            <slot @slotchange="${this.handleDefaultSlot}"></slot>
          </div>
        </${this.dropdownBibTag}>
      </div>
    `}renderLayoutClassic(){const e={helpText:!0};return j`
      ${this.renderBasicHtml(e)}
    `}renderLayoutSnowflake(){const e={helpText:!0,leftIndent:!0,rightIndent:!0};return j`
      ${this.renderBasicHtml(e)}
    `}renderLayoutEmphasized(){const e={helpText:!0,leftIndent:this.shape.toLowerCase().includes("pill")&&!this.shape.toLowerCase().includes("right"),rightIndent:this.shape.toLowerCase().includes("pill")&&!this.shape.toLowerCase().includes("left")};return j`
      ${this.renderBasicHtml(e)}
    `}renderLayout(e){switch(e||this.layout){case"emphasized":return this.renderLayoutEmphasized();case"emphasized-left":return this.renderLayoutEmphasized();case"emphasized-right":return this.renderLayoutEmphasized();case"snowflake":return this.renderLayoutSnowflake();case"snowflake-left":return this.renderLayoutSnowflake();case"snowflake-right":return this.renderLayoutSnowflake();default:return this.renderLayoutClassic()}}}Ye.register();Ye.register("custom-dropdown");const{events:ti,args:oi,argTypes:ri,template:ni}=Or("auro-dropdown"),ii={component:"auro-dropdown",title:"Dropdown",args:oi,argTypes:ri,parameters:{actions:{handles:ti}}},J={render:t=>ni(t),args:{"default-slot":"Lorem ipsum solar","trigger-slot":"Trigger"}},Z={render:()=>g`
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},ee={render:()=>g`
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    <auro-icon
      category="interface"
      name="arrow-down"></auro-icon>
  </div>
</auro-dropdown>
  `},te={render:()=>g`
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
  `},oe={render:()=>g`
<auro-dropdown aria-label="custom label" bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},re={render:()=>g`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},ne={render:()=>g`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-icon
      category="interface"
      name="arrow-down"></auro-icon>
  </div>
</auro-dropdown>
  `},ie={render:()=>g`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
  `},se={render:()=>g`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-input
      slot="trigger"
      id="inputExampleTrigger">
    </auro-input>
  </div>
</auro-dropdown>
  `},ae={render:()=>g`
<auro-dropdown aria-label="custom label" disabled>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},le={render:()=>g`
<auro-dropdown
  aria-label="custom label"
  disabled
  chevron
  rounded
  inset
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
  <span slot="helpText">
    Helper text
  </span>
  <span slot="label">
    Name
  </span>
</auro-dropdown>
  `},de={render:()=>g`
<auro-dropdown aria-label="custom label" error>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},ce={render:()=>g`
<auro-dropdown
  aria-label="custom label"
  inset
  error
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},ue={render:()=>g`
<auro-dropdown aria-label="custom label" fluid>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-input
      borderless
      slot="trigger"
      id="inputExampleTrigger">
    </auro-input>
  </div>
</auro-dropdown>
  `},pe={render:()=>g`
<auro-dropdown aria-label="custom label" inset>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},he={render:()=>g`
<auro-dropdown
  aria-label="custom label"
  inset
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},me={render:()=>g`
<auro-dropdown
  aria-label="custom label"
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},ge={render:()=>g`
<auro-dropdown aria-label="custom label" noToggle>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},fe={render:()=>g`
<div style="width: 300px;" aria-label="custom label">
  <auro-dropdown id="customDropdown300" inset bordered rounded chevron fullscreenBreakpoint="sm">
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
</div>

<style>
  #customDropdown300::part(size) {
    width: 300px;
    max-height: 200px;
  }
</style>
  `},be={render:()=>g`
<auro-dropdown
  bordered
  rounded
  inset
  chevron>
  Lorem ipsum solar
  <span slot="label">Name</span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},we={render:()=>g`
<auro-dropdown
  aria-label="custom label"
  inset
  bordered
  rounded>
  Lorem ipsum solar
  <span slot="helpText">
    Helper text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},ve={render:()=>g`
<auro-dropdown
  aria-label="custom label"
  inset
  bordered
  rounded
  error>
  Lorem ipsum solar
  <span slot="helpText">
    Helper text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},xe={render:()=>{function t(e){const o=document.querySelector("#showMethodExample");o==null||o.show()}return g`
<auro-input id="showExampleTriggerInput" @keydown="${t}" required>
  <span slot="label">Enter a value to show the dropdown</span>
</auro-input>

<auro-dropdown id="showMethodExample" aria-label="custom label" fluid rounded bordered inset>
  <p>
    Lorem ipsum solar
  </p>
  <span slot="trigger">Trigger Label</span>
</auro-dropdown>
  `},parameters:{docs:{source:{type:"code"}}}},ye={render:()=>{function t(){const e=document.querySelector("#hideExample");e==null||e.hide()}return g`
<auro-dropdown id="hideExample" aria-label="custom label" fluid rounded bordered inset>
  <p>
    Lorem ipsum solar
  </p>
  <auro-button id="hideExampleBtn" @click="${t}">
    Dismiss Dropdown
  </auro-button>
  <auro-input
    slot="trigger"
    id="hideExampleTrigger">
  </auro-input>
</auro-dropdown>
  `}},Te={render:()=>g`
<div style="width: 100px;" aria-label="custom label">
  <auro-dropdown id="customDropdown100" inset bordered rounded chevron>
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
</div>

<style>
  #customDropdown100::part(size) {
    width: 100px;
    max-height: 200px;
  }
</style>
  `},ke={render:()=>g`
<div style="width: 250px;">
  <auro-dropdown common aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150); width: 500px;">
      I really prefer Alaska Airlines for my vacation travels
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      I really prefer Alaska Airlines for my vacation travels
    </div>
  </auro-dropdown>
</div>
  `},Ee={render:()=>{function t(){const e=document.querySelector("#dropdown-dialog");e.open=!0}return g`
<div>
  <auro-button id="dropdown-dialog-opener" @click="${t}">Dropdown in Dialog</auro-button>

  <auro-dialog id="dropdown-dialog">
    <span slot="header">Dropdown in Dialog</span>
    <div slot="content">
      <auro-dropdown id="commonSlot" common bordered rounded inset chevron>
        <div style="padding: var(--ds-size-150);">
          Lorem ipsum solar
          <br />
          <auro-button onclick="document.querySelector('#commonSlot').hide()">
            Dismiss Dropdown
          </auro-button>
        </div>
        <span slot="helpText">
          Help text
        </span>
        <span slot="label">
          Element label (default text will be read by screen reader)
        </span>
        <div slot="trigger">
          Dropdown Trigger in Dialog
        </div>
      </auro-dropdown>
    </div>
  </auro-dialog>
</div>  
  `}},Se={render:()=>g`
<auro-dropdown id="common" common aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#common').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},Ce={render:()=>g`
<p id="foo">The element is labelled by content external to the element.</p>

<auro-dropdown id="commonAdvanced" aria-labelledby="foo" bordered rounded inset chevron>
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#commonAdvanced').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},Le={render:()=>g`
<auro-dropdown id="common" common fluid matchWidth aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#common').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},De={render:()=>g`
<auro-dropdown id="commonSlot" bordered rounded inset chevron>
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#commonSlot').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <span slot="label">
    Element label (default text will be read by screen reader)
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},Be={render:()=>g`
<custom-dropdown id="customCommon" common aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#customCommon').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</custom-dropdown>
  `},Ae={render:()=>g`
<auro-dropdown
  aria-label="custom label"
  disabled
  chevron>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  `},Fe={render:()=>g`
<table style="text-align: center;">
  <thead>
    <tr>
      <td>Icon Only</td>
      <td>Text Only</td>
      <td>Text with Icon</td>
    </tr>
  </thead>
  <tr>
    <td>
      <auro-dropdown aria-div="custom div" inset style="display: inline-block;">
        Icon Only Dropdown
        <div slot="trigger">
          <auro-icon category="interface" name="arrow-down"></auro-icon>
        </div>
      </auro-dropdown>
    </td>
    <td>
      <auro-dropdown aria-div="custom div" inset style="display: inline-block;">
        Text Only Dropdown
        <div slot="trigger">
          Trigger Text
        </div>
      </auro-dropdown>
    </td>
    <td>
      <auro-dropdown aria-div="custom div" inset style="display: inline-block;">
        Icon and Text Dropdown
        <div slot="trigger">
          <div style="white-space:nowrap">
            Trigger Text
            <auro-icon category="interface" name="arrow-down"></auro-icon>
          </div>
        </div>
      </auro-dropdown>
    </td>
  </tr>
</table>
  `},Pe={render:()=>g`
<div style="width: 250px;">
  <auro-dropdown common aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150); width: 500px;">
      This is special content.
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
</div>
  `};var wt,vt,xt;J.parameters={...J.parameters,docs:{...(wt=J.parameters)==null?void 0:wt.docs,source:{originalSource:`{
  render: args => template(args),
  args: {
    'default-slot': 'Lorem ipsum solar',
    'trigger-slot': 'Trigger'
  }
}`,...(xt=(vt=J.parameters)==null?void 0:vt.docs)==null?void 0:xt.source}}};var yt,Tt,kt;Z.parameters={...Z.parameters,docs:{...(yt=Z.parameters)==null?void 0:yt.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(kt=(Tt=Z.parameters)==null?void 0:Tt.docs)==null?void 0:kt.source}}};var Et,St,Ct;ee.parameters={...ee.parameters,docs:{...(Et=ee.parameters)==null?void 0:Et.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    <auro-icon
      category="interface"
      name="arrow-down"></auro-icon>
  </div>
</auro-dropdown>
  \`
}`,...(Ct=(St=ee.parameters)==null?void 0:St.docs)==null?void 0:Ct.source}}};var Lt,Dt,Bt;te.parameters={...te.parameters,docs:{...(Lt=te.parameters)==null?void 0:Lt.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label">
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
  \`
}`,...(Bt=(Dt=te.parameters)==null?void 0:Dt.docs)==null?void 0:Bt.source}}};var At,Ft,Pt;oe.parameters={...oe.parameters,docs:{...(At=oe.parameters)==null?void 0:At.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(Pt=(Ft=oe.parameters)==null?void 0:Ft.docs)==null?void 0:Pt.source}}};var qt,Ot,Ht;re.parameters={...re.parameters,docs:{...(qt=re.parameters)==null?void 0:qt.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(Ht=(Ot=re.parameters)==null?void 0:Ot.docs)==null?void 0:Ht.source}}};var Rt,zt,It;ne.parameters={...ne.parameters,docs:{...(Rt=ne.parameters)==null?void 0:Rt.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-icon
      category="interface"
      name="arrow-down"></auro-icon>
  </div>
</auro-dropdown>
  \`
}`,...(It=(zt=ne.parameters)==null?void 0:zt.docs)==null?void 0:It.source}}};var Nt,$t,Vt;ie.parameters={...ie.parameters,docs:{...(Nt=ie.parameters)==null?void 0:Nt.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-button
      slot="trigger"
      fluid>
      Dropdown
    </auro-button>
  </div>
</auro-dropdown>
  \`
}`,...(Vt=($t=ie.parameters)==null?void 0:$t.docs)==null?void 0:Vt.source}}};var Mt,Wt,_t;se.parameters={...se.parameters,docs:{...(Mt=se.parameters)==null?void 0:Mt.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" chevron>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-input
      slot="trigger"
      id="inputExampleTrigger">
    </auro-input>
  </div>
</auro-dropdown>
  \`
}`,...(_t=(Wt=se.parameters)==null?void 0:Wt.docs)==null?void 0:_t.source}}};var Ut,jt,Kt;ae.parameters={...ae.parameters,docs:{...(Ut=ae.parameters)==null?void 0:Ut.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" disabled>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(Kt=(jt=ae.parameters)==null?void 0:jt.docs)==null?void 0:Kt.source}}};var Xt,Yt,Gt;le.parameters={...le.parameters,docs:{...(Xt=le.parameters)==null?void 0:Xt.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown
  aria-label="custom label"
  disabled
  chevron
  rounded
  inset
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
  <span slot="helpText">
    Helper text
  </span>
  <span slot="label">
    Name
  </span>
</auro-dropdown>
  \`
}`,...(Gt=(Yt=le.parameters)==null?void 0:Yt.docs)==null?void 0:Gt.source}}};var Qt,Jt,Zt;de.parameters={...de.parameters,docs:{...(Qt=de.parameters)==null?void 0:Qt.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" error>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(Zt=(Jt=de.parameters)==null?void 0:Jt.docs)==null?void 0:Zt.source}}};var eo,to,oo;ce.parameters={...ce.parameters,docs:{...(eo=ce.parameters)==null?void 0:eo.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown
  aria-label="custom label"
  inset
  error
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(oo=(to=ce.parameters)==null?void 0:to.docs)==null?void 0:oo.source}}};var ro,no,io;ue.parameters={...ue.parameters,docs:{...(ro=ue.parameters)==null?void 0:ro.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" fluid>
  Lorem ipsum solar
  <div slot="trigger">
    <auro-input
      borderless
      slot="trigger"
      id="inputExampleTrigger">
    </auro-input>
  </div>
</auro-dropdown>
  \`
}`,...(io=(no=ue.parameters)==null?void 0:no.docs)==null?void 0:io.source}}};var so,ao,lo;pe.parameters={...pe.parameters,docs:{...(so=pe.parameters)==null?void 0:so.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" inset>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(lo=(ao=pe.parameters)==null?void 0:ao.docs)==null?void 0:lo.source}}};var co,uo,po;he.parameters={...he.parameters,docs:{...(co=he.parameters)==null?void 0:co.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown
  aria-label="custom label"
  inset
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(po=(uo=he.parameters)==null?void 0:uo.docs)==null?void 0:po.source}}};var ho,mo,go;me.parameters={...me.parameters,docs:{...(ho=me.parameters)==null?void 0:ho.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown
  aria-label="custom label"
  rounded
  bordered>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(go=(mo=me.parameters)==null?void 0:mo.docs)==null?void 0:go.source}}};var fo,bo,wo;ge.parameters={...ge.parameters,docs:{...(fo=ge.parameters)==null?void 0:fo.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown aria-label="custom label" noToggle>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(wo=(bo=ge.parameters)==null?void 0:bo.docs)==null?void 0:wo.source}}};var vo,xo,yo;fe.parameters={...fe.parameters,docs:{...(vo=fe.parameters)==null?void 0:vo.docs,source:{originalSource:`{
  render: () => html\`
<div style="width: 300px;" aria-label="custom label">
  <auro-dropdown id="customDropdown300" inset bordered rounded chevron fullscreenBreakpoint="sm">
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
</div>

<style>
  #customDropdown300::part(size) {
    width: 300px;
    max-height: 200px;
  }
</style>
  \`
}`,...(yo=(xo=fe.parameters)==null?void 0:xo.docs)==null?void 0:yo.source}}};var To,ko,Eo;be.parameters={...be.parameters,docs:{...(To=be.parameters)==null?void 0:To.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown
  bordered
  rounded
  inset
  chevron>
  Lorem ipsum solar
  <span slot="label">Name</span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(Eo=(ko=be.parameters)==null?void 0:ko.docs)==null?void 0:Eo.source}}};var So,Co,Lo;we.parameters={...we.parameters,docs:{...(So=we.parameters)==null?void 0:So.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown
  aria-label="custom label"
  inset
  bordered
  rounded>
  Lorem ipsum solar
  <span slot="helpText">
    Helper text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(Lo=(Co=we.parameters)==null?void 0:Co.docs)==null?void 0:Lo.source}}};var Do,Bo,Ao;ve.parameters={...ve.parameters,docs:{...(Do=ve.parameters)==null?void 0:Do.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown
  aria-label="custom label"
  inset
  bordered
  rounded
  error>
  Lorem ipsum solar
  <span slot="helpText">
    Helper text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(Ao=(Bo=ve.parameters)==null?void 0:Bo.docs)==null?void 0:Ao.source}}};var Fo,Po,qo;xe.parameters={...xe.parameters,docs:{...(Fo=xe.parameters)==null?void 0:Fo.docs,source:{originalSource:`{
  render: () => {
    function handleKeydown(event) {
      const dropdownElem: AuroDropdown | null = document.querySelector('#showMethodExample');
      dropdownElem?.show();
    }
    return html\`
<auro-input id="showExampleTriggerInput" @keydown="\${handleKeydown}" required>
  <span slot="label">Enter a value to show the dropdown</span>
</auro-input>

<auro-dropdown id="showMethodExample" aria-label="custom label" fluid rounded bordered inset>
  <p>
    Lorem ipsum solar
  </p>
  <span slot="trigger">Trigger Label</span>
</auro-dropdown>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(qo=(Po=xe.parameters)==null?void 0:Po.docs)==null?void 0:qo.source}}};var Oo,Ho,Ro;ye.parameters={...ye.parameters,docs:{...(Oo=ye.parameters)==null?void 0:Oo.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const dropdown: AuroDropdown | null = document.querySelector('#hideExample');
      dropdown?.hide();
    }
    return html\`
<auro-dropdown id="hideExample" aria-label="custom label" fluid rounded bordered inset>
  <p>
    Lorem ipsum solar
  </p>
  <auro-button id="hideExampleBtn" @click="\${handleClick}">
    Dismiss Dropdown
  </auro-button>
  <auro-input
    slot="trigger"
    id="hideExampleTrigger">
  </auro-input>
</auro-dropdown>
  \`;
  }
}`,...(Ro=(Ho=ye.parameters)==null?void 0:Ho.docs)==null?void 0:Ro.source}}};var zo,Io,No;Te.parameters={...Te.parameters,docs:{...(zo=Te.parameters)==null?void 0:zo.docs,source:{originalSource:`{
  render: () => html\`
<div style="width: 100px;" aria-label="custom label">
  <auro-dropdown id="customDropdown100" inset bordered rounded chevron>
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
</div>

<style>
  #customDropdown100::part(size) {
    width: 100px;
    max-height: 200px;
  }
</style>
  \`
}`,...(No=(Io=Te.parameters)==null?void 0:Io.docs)==null?void 0:No.source}}};var $o,Vo,Mo;ke.parameters={...ke.parameters,docs:{...($o=ke.parameters)==null?void 0:$o.docs,source:{originalSource:`{
  render: () => html\`
<div style="width: 250px;">
  <auro-dropdown common aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150); width: 500px;">
      I really prefer Alaska Airlines for my vacation travels
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      I really prefer Alaska Airlines for my vacation travels
    </div>
  </auro-dropdown>
</div>
  \`
}`,...(Mo=(Vo=ke.parameters)==null?void 0:Vo.docs)==null?void 0:Mo.source}}};var Wo,_o,Uo;Ee.parameters={...Ee.parameters,docs:{...(Wo=Ee.parameters)==null?void 0:Wo.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const dialog = document.querySelector('#dropdown-dialog');
      dialog.open = true;
    }
    return html\`
<div>
  <auro-button id="dropdown-dialog-opener" @click="\${handleClick}">Dropdown in Dialog</auro-button>

  <auro-dialog id="dropdown-dialog">
    <span slot="header">Dropdown in Dialog</span>
    <div slot="content">
      <auro-dropdown id="commonSlot" common bordered rounded inset chevron>
        <div style="padding: var(--ds-size-150);">
          Lorem ipsum solar
          <br />
          <auro-button onclick="document.querySelector('#commonSlot').hide()">
            Dismiss Dropdown
          </auro-button>
        </div>
        <span slot="helpText">
          Help text
        </span>
        <span slot="label">
          Element label (default text will be read by screen reader)
        </span>
        <div slot="trigger">
          Dropdown Trigger in Dialog
        </div>
      </auro-dropdown>
    </div>
  </auro-dialog>
</div>  
  \`;
  }
}`,...(Uo=(_o=Ee.parameters)==null?void 0:_o.docs)==null?void 0:Uo.source}}};var jo,Ko,Xo;Se.parameters={...Se.parameters,docs:{...(jo=Se.parameters)==null?void 0:jo.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown id="common" common aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#common').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(Xo=(Ko=Se.parameters)==null?void 0:Ko.docs)==null?void 0:Xo.source}}};var Yo,Go,Qo;Ce.parameters={...Ce.parameters,docs:{...(Yo=Ce.parameters)==null?void 0:Yo.docs,source:{originalSource:`{
  render: () => html\`
<p id="foo">The element is labelled by content external to the element.</p>

<auro-dropdown id="commonAdvanced" aria-labelledby="foo" bordered rounded inset chevron>
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#commonAdvanced').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(Qo=(Go=Ce.parameters)==null?void 0:Go.docs)==null?void 0:Qo.source}}};var Jo,Zo,er;Le.parameters={...Le.parameters,docs:{...(Jo=Le.parameters)==null?void 0:Jo.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown id="common" common fluid matchWidth aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#common').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(er=(Zo=Le.parameters)==null?void 0:Zo.docs)==null?void 0:er.source}}};var tr,or,rr;De.parameters={...De.parameters,docs:{...(tr=De.parameters)==null?void 0:tr.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown id="commonSlot" bordered rounded inset chevron>
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#commonSlot').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <span slot="label">
    Element label (default text will be read by screen reader)
  </span>
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(rr=(or=De.parameters)==null?void 0:or.docs)==null?void 0:rr.source}}};var nr,ir,sr;Be.parameters={...Be.parameters,docs:{...(nr=Be.parameters)==null?void 0:nr.docs,source:{originalSource:`{
  render: () => html\`
<custom-dropdown id="customCommon" common aria-label="Label content for screen reader">
  <div style="padding: var(--ds-size-150);">
    Lorem ipsum solar
    <br />
    <auro-button onclick="document.querySelector('#customCommon').hide()">
      Dismiss Dropdown
    </auro-button>
  </div>
  <span slot="helpText">
    Help text
  </span>
  <div slot="trigger">
    Trigger
  </div>
</custom-dropdown>
  \`
}`,...(sr=(ir=Be.parameters)==null?void 0:ir.docs)==null?void 0:sr.source}}};var ar,lr,dr;Ae.parameters={...Ae.parameters,docs:{...(ar=Ae.parameters)==null?void 0:ar.docs,source:{originalSource:`{
  render: () => html\`
<auro-dropdown
  aria-label="custom label"
  disabled
  chevron>
  Lorem ipsum solar
  <div slot="trigger">
    Trigger
  </div>
</auro-dropdown>
  \`
}`,...(dr=(lr=Ae.parameters)==null?void 0:lr.docs)==null?void 0:dr.source}}};var cr,ur,pr;Fe.parameters={...Fe.parameters,docs:{...(cr=Fe.parameters)==null?void 0:cr.docs,source:{originalSource:`{
  render: () => html\`
<table style="text-align: center;">
  <thead>
    <tr>
      <td>Icon Only</td>
      <td>Text Only</td>
      <td>Text with Icon</td>
    </tr>
  </thead>
  <tr>
    <td>
      <auro-dropdown aria-div="custom div" inset style="display: inline-block;">
        Icon Only Dropdown
        <div slot="trigger">
          <auro-icon category="interface" name="arrow-down"></auro-icon>
        </div>
      </auro-dropdown>
    </td>
    <td>
      <auro-dropdown aria-div="custom div" inset style="display: inline-block;">
        Text Only Dropdown
        <div slot="trigger">
          Trigger Text
        </div>
      </auro-dropdown>
    </td>
    <td>
      <auro-dropdown aria-div="custom div" inset style="display: inline-block;">
        Icon and Text Dropdown
        <div slot="trigger">
          <div style="white-space:nowrap">
            Trigger Text
            <auro-icon category="interface" name="arrow-down"></auro-icon>
          </div>
        </div>
      </auro-dropdown>
    </td>
  </tr>
</table>
  \`
}`,...(pr=(ur=Fe.parameters)==null?void 0:ur.docs)==null?void 0:pr.source}}};var hr,mr,gr;Pe.parameters={...Pe.parameters,docs:{...(hr=Pe.parameters)==null?void 0:hr.docs,source:{originalSource:`{
  render: () => html\`
<div style="width: 250px;">
  <auro-dropdown common aria-label="Label content for screen reader">
    <div style="padding: var(--ds-size-150); width: 500px;">
      This is special content.
    </div>
    <span slot="helpText">
      Help text
    </span>
    <div slot="trigger">
      Trigger
    </div>
  </auro-dropdown>
</div>
  \`
}`,...(gr=(mr=Pe.parameters)==null?void 0:mr.docs)==null?void 0:gr.source}}};const si=["Playground","Basic","BasicIcon","BasicButton","Bordered","Chevron","ChevronIcon","ChevronButton","ChevronInput","Disabled","DisabledAll","Error","ErrorBordered","Fluid","Inset","InsetBordered","Rounded","NoToggle","CustomDimensions300","Label","HelpText","HelpTextError","ProgramaticallyShow","ProgramaticallyHide","CustomDimensions100","TruncatedText","InDialog","Common","CommonLabeledBy","CommonMatchWidth","CommonSlot","Custom","DisabledChevron","Inline","WiderPopover"],wi=Object.freeze(Object.defineProperty({__proto__:null,Basic:Z,BasicButton:te,BasicIcon:ee,Bordered:oe,Chevron:re,ChevronButton:ie,ChevronIcon:ne,ChevronInput:se,Common:Se,CommonLabeledBy:Ce,CommonMatchWidth:Le,CommonSlot:De,Custom:Be,CustomDimensions100:Te,CustomDimensions300:fe,Disabled:ae,DisabledAll:le,DisabledChevron:Ae,Error:de,ErrorBordered:ce,Fluid:ue,HelpText:we,HelpTextError:ve,InDialog:Ee,Inline:Fe,Inset:pe,InsetBordered:he,Label:be,NoToggle:ge,Playground:J,ProgramaticallyHide:ye,ProgramaticallyShow:xe,Rounded:me,TruncatedText:ke,WiderPopover:Pe,__namedExportsOrder:si,default:ii},Symbol.toStringTag,{value:"Module"}));export{Z as B,re as C,ae as D,de as E,ue as F,we as H,pe as I,be as L,ge as N,xe as P,me as R,ke as T,ee as a,te as b,oe as c,ne as d,ie as e,se as f,le as g,ce as h,he as i,fe as j,ve as k,ye as l,Te as m,Ee as n,wi as s};
