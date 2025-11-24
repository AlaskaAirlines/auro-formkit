import{T as m,E as f,x as g}from"./lit-element-CzkqXGGu.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const p={ATTRIBUTE:1,CHILD:2},T=e=>(...t)=>({_$litDirective$:e,values:t});let w=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,o){this._$Ct=t,this._$AM=n,this._$Ci=o}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=T(class extends w{constructor(e){var t;if(super(e),e.type!==p.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){var o,r;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((s=>s!==""))));for(const s in t)t[s]&&!((o=this.nt)!=null&&o.has(s))&&this.st.add(s);return this.render(t)}const n=e.element.classList;for(const s of this.st)s in t||(n.remove(s),this.st.delete(s));for(const s in t){const i=!!t[s];i===this.st.has(s)||(r=this.nt)!=null&&r.has(s)||(i?(n.add(s),this.st.add(s)):(n.remove(s),this.st.delete(s)))}return m}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=e=>e??f;class C{registerComponent(t,n){customElements.get(t)||customElements.define(t,class extends n{})}closestElement(t,n=this,o=(r,s=r&&r.closest(t))=>!r||r===document||r===window?null:s||o(r.getRootNode().host)){return o(n)}handleComponentTagRename(t,n){const o=n.toLowerCase();t.tagName.toLowerCase()!==o&&t.setAttribute(o,!0)}elementMatch(t,n){const o=n.toLowerCase();return t.tagName.toLowerCase()===o||t.hasAttribute(o)}getSlotText(t,n){var i;const o=(i=t.shadowRoot)==null?void 0:i.querySelector(`slot[name="${n}"]`);return((o==null?void 0:o.assignedNodes({flatten:!0}))||[]).map(l=>{var c;return(c=l.textContent)==null?void 0:c.trim()}).join(" ").trim()||null}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const u=Symbol.for(""),b=e=>{if((e==null?void 0:e.r)===u)return e==null?void 0:e._$litStatic$},y=e=>({_$litStatic$:e,r:u}),E=(e,...t)=>({_$litStatic$:t.reduce(((n,o,r)=>n+(s=>{if(s._$litStatic$!==void 0)return s._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${s}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+e[r+1]),e[0]),r:u}),$=new Map,A=e=>(t,...n)=>{const o=n.length;let r,s;const i=[],l=[];let c,a=0,h=!1;for(;a<o;){for(c=t[a];a<o&&(s=n[a],(r=b(s))!==void 0);)c+=r+t[++a],h=!0;a!==o&&l.push(s),i.push(c),a++}if(a===o&&i.push(t[o]),h){const d=i.join("$$lit$$");(t=$.get(d))===void 0&&(i.raw=i,$.set(d,t=i)),n=l}return e(t,...n)},L=A(g);export{C as A,w as a,T as b,v as e,E as i,x as o,y as s,p as t,L as u};
