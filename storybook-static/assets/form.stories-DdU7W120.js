import{g as p}from"./storybook-utils-BWaCeRRT.js";import{i as f,a as E,x as c}from"./lit-element-CzkqXGGu.js";import{A as g}from"./static-CzM4uoyW.js";import"./registered-DrZ9fufq.js";import"./index-CXFB-ZtJ.js";const v=f``;class i extends E{static get properties(){return{formState:{attribute:!1},_validity:{attribute:!1},_isInitialState:{attribute:!1},_elements:{attribute:!1},_submitElements:{attribute:!1},_resetElements:{attribute:!1}}}constructor(){super(),this.formState={},this._validity=null,this._isInitialState=!0,this._elements=[],this._submitelements=[],this._resetElements=[],this.mutationObservers=[],this.reset=this.reset.bind(this),this.submit=this.submit.bind(this),this.sharedInputListener=this.sharedInputListener.bind(this),this.sharedValidationListener=this.sharedValidationListener.bind(this),this.mutationEventListener=this.mutationEventListener.bind(this)}static get formElementTags(){return["auro-input","auro-select","auro-datepicker","auro-combobox","auro-checkbox-group","auro-radio-group","auro-counter-group"]}_isElementTag(t,e){return e.tagName.toLowerCase()===t||e.hasAttribute(t.toLowerCase())}_isInElementCollection(t,e){return t.some(s=>this._isElementTag(s,e))}isFormElement(t){return this._isInElementCollection(i.formElementTags,t)}_eventIsValidFormEvent(t){const e=t.target.getAttribute("name");return this.isFormElement(t.target)&&e}static get buttonElementTags(){return["button","auro-button"]}isButtonElement(t){return this._isInElementCollection(i.buttonElementTags,t)}static get styles(){return[v]}get value(){return Object.keys(this.formState).reduce((t,e)=>(t[e]=this.formState[e].value,t),{})}get submitElements(){return this._submitelements}get resetElements(){return this._resetElements}_calculateValidity(){if(this.isInitialState)this._validity=null;else{const t=Object.keys(this.formState).find(e=>{const s=this.formState[e];return s.validity!=="valid"&&s.required||s.validity!=="valid"&&s.value!==null});this._validity=t?"invalid":"valid"}}get validity(){return this._calculateValidity(),this._validity}_setInitialState(){const t=Object.keys(this.formState).some(e=>this.formState[e].validity!==null||this.formState[e].value!==null);this._isInitialState=!t,this._resetElements.forEach(e=>{e.hasAttribute("disabled")&&e.removeAttribute("disabled")})}get isInitialState(){return this._isInitialState}setDisabledStateOnButtons(){this._resetElements.forEach(t=>{this.isInitialState?t.setAttribute("disabled",""):t.removeAttribute("disabled")}),this._submitelements.forEach(t=>{this.isInitialState||this.validity!=="valid"?t.setAttribute("disabled",""):t.removeAttribute("disabled")})}queryAuroElements(){const t=[[i.formElementTags,"[name]"],[i.buttonElementTags,"[type=submit]"],[i.buttonElementTags,"[type=reset]"]];return this.querySelectorAll(t.flatMap(([e,s])=>e.map(a=>`${a}${s}, [${a}]${s}`)).join(", "))}_addElementToState(t){const e=t.getAttribute("name");this.formState[e]||(this.formState[e]={value:t.value||t.getAttribute("value"),validity:t.validity||null,required:t.hasAttribute("required")},this._elements.push(t))}initializeState(){this.formState={},this._submitelements=[],this._resetElements=[],this._elements=[],this.queryAuroElements().forEach(t=>{this.isFormElement(t)&&this._addElementToState(t),this.isButtonElement(t)&&t.getAttribute("type")==="submit"&&(t.removeEventListener("click",this.submit),t.addEventListener("click",this.submit),this._submitelements.push(t)),this.isButtonElement(t)&&t.getAttribute("type")==="reset"&&(t.removeEventListener("click",this.reset),t.addEventListener("click",this.reset),this._resetElements.push(t))}),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0})),this.setDisabledStateOnButtons()}reset(){const t=this.value;this._elements.forEach(e=>e.reset()),this.updateComplete.then(()=>{this.initializeState(),this._setInitialState(),this._calculateValidity(),this.updateComplete.then(()=>{this.setDisabledStateOnButtons(),this.dispatchEvent(new CustomEvent("reset",{bubbles:!0,composed:!0,detail:{previousValue:t}}))})})}submit(){this._elements.forEach(t=>{t.tagName.toLowerCase()!=="auro-datepicker"&&t.validate()}),this.dispatchEvent(new CustomEvent("submit",{bubbles:!0,composed:!0,detail:{value:this.value}}))}static register(t="auro-form"){g.prototype.registerComponent(t,i)}sharedInputListener(t){const e=t.target.getAttribute("name");this._eventIsValidFormEvent(t)&&(!this.formState[e]&&this.isFormElement(t.target)&&this._addElementToState(t.target),this._isElementTag("auro-datepicker",t.target)&&t.target.hasAttribute("range")?this.formState[e].value=t.target.values:this.formState[e].value=t.target.value,this.requestUpdate("formState"),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0,cancelable:!0})))}sharedValidationListener(t){const e=t.target.getAttribute("name");this._eventIsValidFormEvent(t)&&(this.formState[e]||this._addElementToState(t.target),this.formState[e].validity=t.detail.validity,this._calculateValidity(),this.requestUpdate("formState"))}_attachEventListeners(){this.queryAuroElements().forEach(t=>{t.removeEventListener("input",this.sharedInputListener),t.removeEventListener("auroFormElement-validated",this.sharedValidationListener),t.addEventListener("input",this.sharedInputListener),t.addEventListener("auroFormElement-validated",this.sharedValidationListener)})}firstUpdated(t){super.firstUpdated(t),this._attachEventListeners()}updated(t){super.updated(t),t.has("formState")&&(this._setInitialState(),this.setDisabledStateOnButtons()),t.has("_validity")&&this._setInitialState()}mutationEventListener(){this.initializeState(),this._attachEventListeners()}onSlotChange(t){this.initializeState(),this._attachEventListeners(),this.mutationObservers.forEach(s=>s.disconnect()),this.mutationObservers=[],t.currentTarget.assignedNodes().forEach(s=>{if(s.tagName&&!this.isFormElement(s)){const a=new MutationObserver(this.mutationEventListener);a.observe(s,{subtree:!0,childList:!0}),this.mutationObservers.push(a)}})}render(){return c`
        <form>
          <slot @slotchange="${this.onSlotChange}"></slot>
        </form>
    `}}i.register();i.register("custom-form");const{events:S,args:_,argTypes:y,template:L}=p("auro-form"),I={component:"auro-form",title:"Form",args:_,argTypes:y,parameters:{actions:{handles:S}}},r={render:b=>L(b),args:{"default-slot":`
<auro-input id="search-box" name="searchBox" required>
  <span slot="label">Search flights</span>
</auro-input>

<auro-button type="submit">Submit</auro-button>    
    `}},n={render:()=>c`
<auro-form>
  <auro-input id="search-box" name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>

  <auro-button type="submit">Submit</auro-button>
</auro-form>
  `};var o,u,l;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: args => template(args),
  args: {
    'default-slot': \`
<auro-input id="search-box" name="searchBox" required>
  <span slot="label">Search flights</span>
</auro-input>

<auro-button type="submit">Submit</auro-button>    
    \`
  }
}`,...(l=(u=r.parameters)==null?void 0:u.docs)==null?void 0:l.source}}};var h,m,d;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => html\`
<auro-form>
  <auro-input id="search-box" name="searchBox" required>
    <span slot="label">Search flights</span>
  </auro-input>

  <auro-button type="submit">Submit</auro-button>
</auro-form>
  \`
}`,...(d=(m=n.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const T=["Playground","Basic"],B=Object.freeze(Object.defineProperty({__proto__:null,Basic:n,Playground:r,__namedExportsOrder:T,default:I},Symbol.toStringTag,{value:"Module"}));export{n as B,B as s};
