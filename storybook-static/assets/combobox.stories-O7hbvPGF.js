import{a as Ce}from"./index-B-lxVbXh.js";import{u,e as c}from"./index-CeujA6c9.js";import{u as K}from"./index-DDrVoSdw.js";import{g as Se}from"./storybook-utils-BWaCeRRT.js";import{i as y,x as i}from"./lit-element-CzkqXGGu.js";import{s as Be,a as Oe,c as Ee,t as Pe,M as Te,d as Z,A as $e}from"./auro-menu-BXEacBn8.js";import{A as W,u as v,e as J,o as Me}from"./static-CzM4uoyW.js";import{A as ke,f as F,a as Ve}from"./version-CcLPgAjI.js";import{A as Ae}from"./auroElement-CqxMywsH.js";import{x as Ne}from"./auro-icon-CNMF0wKG-vCjlPHA5.js";import{A as ze}from"./validation-DrYD_Tc9.js";import{A as Ie,a as He}from"./index-B1GZsKVb.js";import{A as je}from"./index-CXFB-ZtJ.js";import"./registered-DrZ9fufq.js";import"./registered-BmRy1yHw.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class qe{constructor(o,e,a,t){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(r,l)=>{this.unsubscribe&&(this.unsubscribe!==l&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=r,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(r,l)),this.unsubscribe=l},this.host=o,e.context!==void 0){const r=e;this.context=r.context,this.callback=r.callback,this.subscribe=r.subscribe??!1}else this.context=e,this.callback=a,this.subscribe=t??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new Be(this.context,this.host,this.t,this.subscribe))}}const Ge="9.1.0",Re={svg:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="checkmark-sm__desc" class="ico_squareLarge" role="img" style="min-width:var(--auro-size-lg, var(--ds-size-300, 1.5rem));height:var(--auro-size-lg, var(--ds-size-300, 1.5rem));fill:currentColor" viewBox="0 0 24 24" part="svg"><title/><desc id="checkmark-sm__desc">a small check mark.</desc><path d="M8.461 11.84a.625.625 0 1 0-.922.844l2.504 2.738c.247.27.674.27.922 0l5.496-6a.625.625 0 1 0-.922-.844l-5.035 5.496z"/></svg>'};class _ extends Ae{static register(o="auro-menuoption"){W.prototype.registerComponent(o,_)}get isActive(){return!this.hasAttribute("hidden")&&!this.disabled&&!this.hasAttribute("static")}constructor(){super(),this.bindEvents(),this.shape=void 0,this.size=void 0;const o=new ke;this.iconTag=o.generateTag("auro-formkit-menuoption-icon",Ge,Ne),this.selected=!1,this.nocheckmark=!1,this.disabled=!1,this.runtimeUtils=new W,this.menuService=null,this.unsubscribe=null,this.handleMenuChange=this.handleMenuChange.bind(this)}static get properties(){return{...super.properties,disabled:{type:Boolean,reflect:!0},event:{type:String,reflect:!0},key:{type:String,reflect:!0},menuService:{type:Object,state:!0},matchWord:{type:String,state:!0},nocheckmark:{type:Boolean,reflect:!0},selected:{type:Boolean,reflect:!0},tabIndex:{type:Number,reflect:!0},value:{type:String,reflect:!0}}}static get styles(){return[Oe,Ee,Pe]}connectedCallback(){super.connectedCallback(),this.runtimeUtils.handleComponentTagRename(this,"auro-menuoption"),this._contextConsumer=new qe(this,{context:Te,callback:this.attachTo.bind(this),subscribe:!0});const o=this.getAttribute("value"),e=this.getAttribute("key");this.key=e!==null?e:o}firstUpdated(){this.runtimeUtils.handleComponentTagRename(this,"auro-menuoption"),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseover",()=>{this.dispatchEvent(new CustomEvent("auroMenuOption-mouseover",{bubbles:!0,cancelable:!1,composed:!0,detail:this}))})}updated(o){super.updated(o),o.has("selected")&&(this.setAttribute("aria-selected",this.selected.toString()),this.internalUpdateInProgress!==!0&&this.menuService[this.selected?"selectOption":"deselectOption"](this)),o.has("active")&&this.updateActiveClasses(),o.has("matchWord")&&this.updateTextHighlight(),o.has("value")&&this.key===void 0&&(this.key=this.value)}disconnectedCallback(){this.menuService&&(this.menuService.unsubscribe(this.handleMenuChange),this.menuService.removeMenuOption(this))}bindEvents(){this.addEventListener("click",this.handleClick.bind(this)),this.addEventListener("mouseenter",this.handleMouseEnter.bind(this))}attachTo(o){o&&(this.menuService=o,this.menuService.addMenuOption(this),this.menuService.subscribe(this.handleMenuChange))}handleMenuChange(o){if(!(!o||!o.type&&!o.property)){if(o.property&&Object.keys(_.properties).includes(o.property)&&(this[o.property]=o.value),o.type==="highlightChange"){const e=o.option===this;this.active=e,this.updateActiveClasses()}if(o.type==="stateChange"){const e=o.selectedOptions.includes(this);this.setInternalSelected(e)}}}setInternalSelected(o){this.internalUpdateInProgress=!0,this.selected=o,o&&this.handleCustomEvent(),setTimeout(()=>{this.internalUpdateInProgress=!1},0)}setSelected(o){this.selected=o}updateActive(o){this.active=o,this.updateActiveClasses()}updateActiveClasses(){this.active?this.classList.add("active"):this.classList.remove("active")}updateTextHighlight(){let o=null;if(this.matchWord&&this.matchWord.length){const e=this.matchWord.replace(/[.*+?^${}()|[\]\\]/gu,"\\$&");o=new RegExp(e,"giu")}if(o&&this.isActive&&!this.hasAttribute("persistent")){const e=this.querySelectorAll(".nestingSpacer"),a=this.querySelector('[slot="displayValue"]');a&&this.removeChild(a);const t=[...e].map(()=>this.nestingSpacer).join("");this.innerHTML=t+this.textContent.replace(o,r=>`<strong>${r}</strong>`),a&&this.append(a)}}handleClick(){this.disabled||(this.dispatchClickEvent(),this.selected=!this.selected)}handleMouseEnter(){this.disabled||this.menuService.setHighlightedOption(this)}handleCustomEvent(){this.event&&(Z(this,this.event,{option:this}),Z(this,"auroMenu-customEventFired",{option:this}))}dispatchClickEvent(){this.dispatchEvent(new CustomEvent("auroMenuOption-click",{bubbles:!0,cancelable:!1,composed:!0,detail:this}))}generateIconHtml(o){const a=new DOMParser().parseFromString(o,"text/html").body.firstChild;return a.setAttribute("slot","svg"),v`<${this.iconTag} customColor customSvg>${a}</${this.iconTag}>`}renderLayout(){const o={xs:"body-sm",sm:"body-default",md:"body-default",lg:"body-lg",xl:"body-lg"},e=J({wrapper:!0,[this.size?o[this.size]:"body-sm"]:!0});return v`
      <div class="${e}">
        ${this.selected&&!this.nocheckmark?this.generateIconHtml(Re.svg):void 0}
        <slot></slot>
      </div>
    `}}$e.register();_.register();const Le=y`.util_displayInline{display:inline}.util_displayInlineBlock{display:inline-block}.util_displayBlock{display:block}.util_displayFlex{display:flex}.util_displayHidden{display:none}.util_displayHiddenVisually{position:absolute;overflow:hidden;clip:rect(1px, 1px, 1px, 1px);width:1px;height:1px;padding:0;border:0}:host{display:block;text-align:left}:host [auro-dropdown]{--ds-auro-dropdown-trigger-background-color: transparent}:host #inputInBib::part(wrapper){box-shadow:none}:host #inputInBib::part(accent-left){display:none}:host([layout*=classic]) [auro-input]{width:100%}:host([layout*=classic]) [auro-input]::part(helpText){display:none}:host([layout*=classic]) #slotHolder{display:none}`,De=y`:host([layout*=emphasized][shape*=pill]) [auro-input]{--ds-auro-input-background-color: var(--ds-advanced-color-dropdown-emphasized-background, rgba(0, 39, 74, 0.1019607843));--ds-auro-input-container-color: var(--ds-advanced-color-dropdown-emphasized-background, rgba(0, 39, 74, 0.1019607843))}:host([layout*=emphasized][shape*=pill]) [auro-input]:hover{--ds-auro-input-background-color: var(--ds-advanced-color-dropdown-emphasized-background, rgba(0, 39, 74, 0.1019607843));--ds-auro-input-container-color: var(--ds-advanced-color-dropdown-emphasized-background, rgba(0, 39, 74, 0.1019607843))}:host([layout*=emphasized][shape*=pill]) [auro-input]{width:100%}:host([layout*=emphasized][shape*=pill]) [auro-input]::part(inputHelpText){display:none}:host([layout=emphasized]) [auro-dropdown]{--ds-auro-dropdown-trigger-background-color: var(--ds-advanced-color-dropdown-emphasized-background, rgba(0, 39, 74, 0.1019607843))}:host([layout=emphasized]) [auro-dropdown]:hover{--ds-auro-dropdown-trigger-hover-background-color: var(--ds-advanced-color-dropdown-emphasized-background, rgba(0, 39, 74, 0.1019607843))}:host([layout=emphasized]) [auro-dropdown][layout*=emphasized]::part(wrapper){--ds-auro-dropdown-trigger-background-color: transparent}`,Fe=y`:host([layout*=snowflake][shape*=snowflake]) [auro-input]{width:100%}:host([layout*=snowflake][shape*=snowflake]) [auro-input]::part(inputHelpText){display:none}:host([layout*=snowflake][shape*=snowflake])::part(helpText){text-align:center}`;class U extends Ae{constructor(){super(),this.appearance="default",this.disabled=!1,this.msgSelectionMissing="Please select an option.",this.noFilter=!1,this.noValidate=!1,this.optionActive=null,this.persistInput=!1,this.required=!1,this.value=void 0,this.typedValue=void 0,this.behavior="suggestion",this.checkmark=!1,this.dvInputOnly=!1,this.fullscreenBreakpoint="sm",this.layout="classic",this.matchWidth=!0,this.shape="classic",this.size="xl",this.triggerIcon=!1,this.placement="bottom-start",this.offset=0,this.noFlip=!1,this.shift=!1,this.autoPlacement=!1,this.privateDefaults()}privateDefaults(){const o=new ke;this.dropdownTag=o.generateTag("auro-formkit-combobox-dropdown",F,Ie),this.bibtemplateTag=o.generateTag("auro-formkit-combobox-bibtemplate",F,He),this.inputTag=o.generateTag("auro-formkit-combobox-input",F,je),this.helpTextTag=o.generateTag("auro-formkit-input-helptext",F,Ve),this.availableOptions=[],this.dropdownId=void 0,this.dropdownOpen=!1,this.errorMessage=null,this.isHiddenWhileLoading=!1,this.largeFullscreenHeadline=!1,this.onDark=!1,this.optionSelected=void 0,this.runtimeUtils=new W,this.touched=!1,this.validation=new ze,this.validity=void 0}static get properties(){return{appearance:{type:String,reflect:!0},autocomplete:{type:String,reflect:!0},autoPlacement:{type:Boolean,reflect:!0},availableOptions:{state:!0,type:Array,reflect:!1},behavior:{type:String,reflect:!0},checkmark:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0},dropdownId:{type:String,reflect:!1,attribute:!1},dropdownOpen:{type:Boolean,reflect:!1,attribute:!1},dvInputOnly:{type:Boolean,reflect:!0},error:{type:String,reflect:!0},format:{type:String,reflect:!0},inputmode:{type:String,attribute:!0,reflect:!0},matchWidth:{type:Boolean,reflect:!0},noFilter:{type:Boolean,reflect:!0},noFlip:{type:Boolean,reflect:!0},shift:{type:Boolean,reflect:!0},noValidate:{type:Boolean,reflect:!0},offset:{type:Number,reflect:!0},onDark:{type:Boolean,reflect:!0},optionSelected:{type:Object},persistInput:{type:Boolean,reflect:!0},placement:{type:String,reflect:!0},placeholder:{type:String,reflect:!0},required:{type:Boolean,reflect:!0},setCustomValidity:{type:String},setCustomValidityCustomError:{type:String},setCustomValidityValueMissing:{type:String},setCustomValidityValueMissingFilter:{type:String},touched:{type:Boolean,reflect:!0,attribute:!1},triggerIcon:{type:Boolean,reflect:!0},type:{type:String,reflect:!0},typedValue:{type:String,reflect:!0},validity:{type:String,reflect:!0},value:{type:String},largeFullscreenHeadline:{type:Boolean,reflect:!0},fullscreenBreakpoint:{type:String,reflect:!0},optionActive:{type:Object,reflect:!1,attribute:!1}}}static get styles(){return[y`${Le}`,y`${De}`,y`${Fe}`]}get inputValue(){if(this.input)return this.input.value}isValid(){let o=!0;return this.validity!==void 0&&this.validity!=="valid"&&(o=!1),o}static register(o="auro-combobox"){W.prototype.registerComponent(o,U)}updateFilter(){if(this.noFilter){this.availableOptions=[...this.options];return}this.noMatchOption=void 0,this.options.forEach(o=>{let e=o.textContent.toLowerCase();o.hasAttribute("nomatch")&&(this.noMatchOption=o),o.hasAttribute("persistent")&&this.availableOptions.push(o),o.hasAttribute("suggest")&&(e=`${e} ${o.getAttribute("suggest")}`.toLowerCase()),!this.input.value||this.input.value.length===0?o.hasAttribute("static")||(o.removeAttribute("hidden"),this.availableOptions.push(o)):e.includes(this.input.value.toLowerCase())&&!o.hasAttribute("static")?(o.removeAttribute("hidden"),this.availableOptions.push(o)):o.hasAttribute("persistent")||o.setAttribute("hidden","")}),this.availableOptions.length===0?this.noMatchOption?this.noMatchOption.removeAttribute("hidden"):(!this.menu.loading||this.isHiddenWhileLoading)&&this.hideBib():this.noMatchOption&&this.noMatchOption.setAttribute("hidden","")}syncValuesAndStates(){this.menu&&(this.menu.matchWord=this.input.value),this.updateTriggerTextDisplay()}updateTriggerTextDisplay(){this.persistInput||(this.input.value=this.value);const o=this.input.querySelector('[slot="displayValue"]');if(o&&o.remove(),this.menu.optionSelected){const e=this.menu.optionSelected.querySelector("[slot='displayValue']");e&&this.input.appendChild(e.cloneNode(!0))}this.requestUpdate()}handleMenuOptions(){this.generateOptionsArray(),this.availableOptions=[],this.updateFilter(),this.value&&this.input.value&&!this.menu.value&&this.syncValuesAndStates()}generateOptionsArray(){this.menu&&this.menu.options?this.options=this.menu.options:this.options=[]}hideBib(){this.dropdown&&this.dropdown.isPopoverVisible&&this.dropdown.hide()}showBib(){if(!this.input.value){this.dropdown.hide();return}!this.dropdown.isPopoverVisible&&this.input.value&&this.input.value.length>0&&(this.menu.getAttribute("loading")||this.availableOptions.length>0||this.noMatchOption!==void 0)&&(this.menu.hasAttribute("loading")&&!this.menu.hasLoadingPlaceholder?this.isHiddenWhileLoading=!0:this.dropdown.show())}configureDropdown(){this.dropdown.a11yRole="combobox",this.dropdown.addEventListener("auroDropdown-idAdded",o=>{this.dropdownId=o.detail.id}),this.dropdown.addEventListener("auroDropdown-toggled",o=>{this.dropdownOpen=o.detail.expanded,this.updateMenuShapeSize(),setTimeout(()=>{this.componentHasFocus&&this.setInputFocus()},0)}),this.dropdown.addEventListener("auroDropdown-triggerClick",()=>{this.showBib()}),this.bibtemplate=this.dropdown.querySelector(this.bibtemplateTag._$litStatic$),this.inputInBib=this.bibtemplate.querySelector(this.inputTag._$litStatic$),this.bibtemplate.exposeCssParts(),this.hideBib=this.hideBib.bind(this),this.bibtemplate.addEventListener("close-click",this.hideBib),this.setInputFocus=this.setInputFocus.bind(this),this.dropdown.addEventListener("auroDropdown-strategy-change",()=>{this.updateMenuShapeSize(),setTimeout(()=>{this.setInputFocus()},0)})}setClearBtnFocus(){const o=this.input.shadowRoot.querySelector(".clearBtn");o&&o.focus()}setInputFocus(){if(this.dropdown.isBibFullscreen&&this.dropdown.isPopoverVisible)this.inputInBib.focus();else if(!this.input.componentHasFocus){const o=this.querySelector(":focus");this.input.focus(),this.persistInput&&o&&(o.tagName.toLowerCase()==="auro-menuoption"||o.hasAttribute("auro-menuoption"))&&(this.setClearBtnFocus(),this.validate(!0))}}updateMenuShapeSize(){if(this.menu)if(this.dropdown&&this.dropdown.isBibFullscreen)this.menu.setAttribute("size","md"),this.menu.setAttribute("shape","box");else switch(this.menu.setAttribute("size",this.layout==="emphasized"?"lg":"md"),this.layout){case"classic":this.menu.setAttribute("shape","box");break;case"emphasized":this.dropdown&&this.dropdown.bib&&(this.dropdown.bib.shape="rounded"),this.menu.setAttribute("shape","rounded");break;default:this.menu.setAttribute("shape",this.defaultMenuShape||this.shape);break}}configureMenu(){if(this.menu=this.querySelector("auro-menu, [auro-menu]"),this.defaultMenuShape=this.menu.getAttribute("shape"),!this.menu){setTimeout(()=>{this.configureMenu()},0);return}this.updateMenuShapeSize(),this.options=this.menu.options,this.menu.addEventListener("auroMenu-loadingChange",o=>this.handleMenuLoadingChange(o)),this.checkmark?this.menu.removeAttribute("nocheckmark"):this.menu.setAttribute("nocheckmark",""),this.menu.addEventListener("auroMenu-selectedOption",o=>{[this.optionSelected]=o.detail.options,this.value=o.detail.stringValue,this.updateTriggerTextDisplay(),this.menu.matchWord!==this.input.value&&(this.menu.matchWord=this.input.value),this.handleMenuOptions(),o.detail&&o.detail.source!=="slotchange"&&setTimeout(()=>{this.hideBib()},0)}),this.menu.addEventListener("auroMenu-customEventFired",()=>{this.hideBib()}),this.menu.addEventListener("auroMenu-activatedOption",o=>{this.optionActive=o.detail,this.optionActive.scrollIntoView({alignToTop:!1,block:"nearest",behavior:"smooth"})}),this.menu.shadowRoot.addEventListener("slotchange",o=>this.handleSlotChange(o))}configureInput(){this.addEventListener("focusout",()=>{this.componentHasFocus||this.validate()})}handleMenuLoadingChange(o){!o.detail.loading&&this.isHiddenWhileLoading&&(this.contains(document.activeElement)&&this.dropdown.show(),this.isHiddenWhileLoading=!1)}handleInputValueChange(o){if(o.target===this.inputInBib){this.input.value=this.inputInBib.value;return}this.inputInBib.value=this.input.value,this.menu.matchWord=this.input.value,this.optionActive=null,this.input.value||this.clear(),this.handleMenuOptions(),this.componentHasFocus||this.validate(),this.input.value&&this.input.value.length===0?this.hideBib():this.menu.loading?this.showBib():this.availableOptions.length===0&&!this.dropdown.isBibFullscreen&&this.hideBib(),this.dispatchEvent(new CustomEvent("inputValue",{detail:{value:this.inputValue}}))}configureCombobox(){this.addEventListener("keydown",async o=>{if(o.key==="Enter"&&(this.dropdown.isPopoverVisible&&this.optionActive?(this.menu.makeSelection(),await this.updateComplete,o.preventDefault(),o.stopPropagation(),this.setClearBtnFocus()):this.showBib()),o.key==="Tab"&&this.dropdown.isPopoverVisible&&(this.dropdown.isBibFullscreen?document.activeElement.shadowRoot.activeElement===this.inputInBib&&(o.preventDefault(),this.dropdown.focus()):(this.menu.optionActive&&this.menu.optionActive.value&&(this.menu.value=this.menu.optionActive.value),setTimeout(()=>{this.componentHasFocus||this.hideBib()},0))),(o.key==="ArrowUp"||o.key==="ArrowDown")&&(this.availableOptions.length>0&&this.showBib(),this.dropdown.isPopoverVisible&&(o.preventDefault(),!this.dropdown.isBibFullscreen||this.dropdown.isPopoverVisible))){const e=o.key.replace("Arrow","").toLowerCase();this.menu.navigateOptions(e)}}),this.addEventListener("focusin",()=>{this.touched=!0,this.focus()}),this.addEventListener("auroFormElement-validated",o=>{this.input.validity=o.detail.validity,this.input.errorMessage=o.detail.message,this.validity=o.detail.validity,this.errorMessage=o.detail.message})}performUpdate(){super.performUpdate(),this.menus=[...this.querySelectorAll("auro-menu, [auro-menu]")];for(let o=0;o<this.menus.length;o+=1)this.checkmark?this.menus[o].removeAttribute("nocheckmark"):this.menus[o].setAttribute("nocheckmark","")}firstUpdated(){this.runtimeUtils.handleComponentTagRename(this,"auro-combobox"),this.dropdown=this.shadowRoot.querySelector(this.dropdownTag._$litStatic$),this.input=this.dropdown.querySelector(this.inputTag._$litStatic$),this.configureInput(),this.configureDropdown(),this.configureCombobox(),this.configureMenu(),this.hasAttribute("value")&&this.getAttribute("value").length>0&&(this.menu.value=this.value)}focus(){this.componentHasFocus||this.input.focus()}setMenuValue(o){this.menu&&(this.menu.value=o)}reset(){this.optionSelected=void 0,this.value=void 0,this.typedValue=void 0,this.input.value=void 0,this.menu.value=void 0,this.validation.reset(this),this.touched=!1}clear(){this.optionSelected=void 0,this.value=void 0,this.input.value&&this.input.clear(),(this.menu.value||this.menu.optionSelected)&&this.menu.reset()}validate(o=!1){this.validation.validate(this,o)}updated(o){if(o.has("value")&&(this.value&&this.value.length>0?this.hasValue=!0:this.hasValue=!1,this.hasValue&&!this.input.value&&(!this.menu.options||this.menu.options.length===0)&&(this.input.value=this.value),this.setMenuValue(this.value),this.value?this.componentHasFocus||this.hideBib():this.clear(),this.menu&&(this.menu.matchWord=this.input.value),this.dispatchEvent(new CustomEvent("input",{bubbles:!0,cancelable:!1,composed:!0,detail:{optionSelected:this.menu.optionSelected,value:this.menu.value}})),this.dispatchEvent(new CustomEvent("auroCombobox-valueSet",{bubbles:!0,cancelable:!1,composed:!0}))),o.has("availableOptions")&&(this.availableOptions.length>0&&this.componentHasFocus||this.menu.loading||this.availableOptions.length===0&&this.noMatchOption?this.showBib():this.hideBib()),o.has("error")&&(this.input.setAttribute("error",this.getAttribute("error")),this.validate()),o.has("shape")&&this.menu)switch(this.layout){case"classic":this.menu.setAttribute("shape","box");break;case"emphasized":this.menu.setAttribute("shape","rounded");break;default:this.menu.setAttribute("shape",this.defaultMenuShape||this.shape);break}o.has("size")&&this.menu&&this.menu.setAttribute("size",this.layout==="emphasized"?"lg":"md")}transportAssignedNodes(o,e,a){e.querySelectorAll(`[slot="${a}"]`).forEach(t=>t.remove()),o.assignedNodes().forEach(t=>{const r=t.cloneNode(!0);r.setAttribute("slot",a),e.append(r)})}updateActiveOption(o){this.menu&&this.menu.updateActiveOption(o)}handleSlotChange(o){switch(o.target.name){case"":(!this.menu||this.menu!==this.querySelector("auro-menu, [auro-menu]"))&&this.configureMenu(),this.options=this.menu.querySelectorAll("auro-menuoption, [auro-menuoption]"),this.options.forEach(e=>{this.checkmark?e.removeAttribute("nocheckmark"):e.setAttribute("nocheckmark","")}),this.handleMenuOptions();break;case"label":case"ariaLabel.input.clear":case"optionalLabel":this.transportAssignedNodes(o.target,this.inputInBib,o.target.name);break;case"bib.fullscreen.headline":this.transportAssignedNodes(o.target,this.bibtemplate,"header");break}}render(){const o={util_displayHidden:this.validity!==void 0&&this.validity!=="valid",helpTextMessage:!0},e={util_displayHidden:this.validity===void 0||this.validity==="valid",errorMessage:!0};return v`
      <div>
        <div aria-live="polite" class="util_displayHiddenVisually">
          ${this.optionActive&&this.availableOptions.length>0?v`
              ${`${this.optionActive.textContent}, selected, ${this.availableOptions.indexOf(this.optionActive)+1} of ${this.availableOptions.length}`}
            `:void 0}
        </div>
        <${this.dropdownTag}
          appearance="${this.onDark?"inverse":this.appearance}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          ?autoPlacement="${this.autoPlacement}"
          ?disabled="${this.disabled}"
          ?error="${this.validity!==void 0&&this.validity!=="valid"}"
          ?noFlip="${this.noFlip}"
          ?shift="${this.shift}"
          disableEventShow
          fluid
          for="dropdownMenu"
          layout="${this.layout}"
          matchWidth="${Me(this.matchWidth)}"
          nocheckmark
          rounded
          simple
          shape="${this.shape}"
          size="${this.size}">
            <${this.inputTag}
              @input="${this.handleInputValueChange}"
              appearance="${this.onDark?"inverse":this.appearance}"
              .a11yExpanded="${this.dropdownOpen}"
              .a11yControls="${this.dropdownId}"
              .autocomplete="${this.autocomplete}"
              .inputmode="${this.inputmode}"
              .placeholder="${this.placeholder}"
              .type="${this.type}"
              .value="${this.typedValue}"
              ?disabled="${this.disabled}"
              ?icon="${this.triggerIcon}"
              ?dvInputOnly="${this.dvInputOnly}"
              ?required="${this.required}"
              a11yRole="combobox"
              id="${this.id}"
              layout="${this.layout}"
              noValidate="true"
              setCustomValidity="${this.setCustomValidity}"
              setCustomValidityCustomError="${this.setCustomValidityCustomError}"
              setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
              shape="${this.shape}"
              size="${this.size}"
              slot="trigger">
              <slot name="ariaLabel.input.clear" slot="ariaLabel.clear" @slotchange="${this.handleSlotChange}"></slot>
              <slot name="label" slot="label" @slotchange="${this.handleSlotChange}"></slot>
              <slot name="optionalLabel" slot="optionalLabel" @slotchange="${this.handleSlotChange}"> (optional)</slot>
              <slot name="displayValue" slot="displayValue"></slot>
            </${this.inputTag}>

          <${this.bibtemplateTag} ?large="${this.largeFullscreenHeadline}">
            <slot name="bib.fullscreen.headline" slot="header"></slot>
            <slot name="ariaLabel.bib.close" slot="ariaLabel.close">Close</slot>
            <slot @slotchange="${this.handleSlotChange}"></slot>
            <${this.inputTag}
              id="inputInBib"
              @input="${this.handleInputValueChange}"
              .a11yControls="${this.dropdownId}"
              .autocomplete="${this.autocomplete}"
              .format="${this.format}"
              .inputmode="${this.inputmode}"
              .placeholder="${this.placeholder}"
              .type="${this.type}"
              .value="${this.typedValue}"
              ?disabled="${this.disabled}"
              ?icon="${this.triggerIcon}"
              ?required="${this.required}"
              a11yRole="combobox"
              a11yExpanded="true"
              layout="classic"
              noValidate="true"
              shape="classic"
              simple
              size="sm"
              slot="subheader">
            </${this.inputTag}>
          </${this.bibtemplateTag}>

          <span slot="helpText">
            ${!this.validity||this.validity==="valid"?v`
                <${this.helpTextTag} class="${J(o)}" appearance="${this.onDark?"inverse":this.appearance}"">
                  <p id="${this.uniqueId}" part="helpText">
                    <slot name="helpText"></slot>
                  </p>
                </${this.helpTextTag}>
              `:v`
                <${this.helpTextTag} class="${J(e)}" error appearance="${this.onDark?"inverse":this.appearance}"">
                  <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
                    ${this.errorMessage}
                  </p>
                </${this.helpTextTag}>
              `}
          </span>
        </${this.dropdownTag}>
      </div>
    `}}class We{getData(){return[{iso2:"AR",iso3:"ARG",country:"Argentina",cities:["Germania"]},{iso2:"CA",iso3:"CAN",country:"Canada",cities:["Saint-Germain-de-Grantham"]},{iso2:"FR",iso3:"FRA",country:"France",cities:["Chatel-Saint-Germain","Domgermain","Germaine","Germainville","Germenay"]},{iso2:"DE",iso3:"DEU",country:"Germany",cities:["Algermissen","Angermunde","Germering","Hilgermissen","Tangermunde"]},{iso2:"IR",iso3:"IRN",country:"Iran",cities:["Germi"]}]}filterData(o,e){const a=[];for(let t=0;t<o.length;t++){let r=o[t].country.toLowerCase();e&&(o[t].cities=o[t].cities.filter(l=>l.toLowerCase().includes(e.toLowerCase())),(r.includes(e.toLowerCase())||o[t].cities.length>0)&&a.push(o[t]))}return a}}U.register();U.register("custom-combobox");const{events:_e,args:Ue,argTypes:Ye,template:Je}=Se("auro-combobox"),Ke={component:"auro-combobox",title:"Combobox",args:Ue,argTypes:Ye,parameters:{actions:{handles:_e}}},x={render:n=>Je(n),args:{"default-slot":`
<auro-menu>
  <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
  <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
  <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
  <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
  <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
  <auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
    `}},d={render:()=>i`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},w={...d,async play({canvas:n}){const o=await n.findByShadowRole("textbox");await u.type(o,"a")}},k={render:()=>{function n(){var Q;const e=document.querySelector("#dynamicMenuExample"),a=(Q=e==null?void 0:e.shadowRoot)==null?void 0:Q.querySelector(e.dropdownTag._$litStatic$),t=a==null?void 0:a.querySelector(e==null?void 0:e.inputTag._$litStatic$),r=new We;function l(s){for(;s.firstChild;)s.removeChild(s.firstChild)}function p(s,m,g){let b=document.createElement("auro-menuoption");b.value=g,b.innerHTML=m,s.appendChild(b)}function h(s){const m=document.querySelector("#initMenu");l(m);for(let g=0;g<s.length;g++){let b=s[g].country,Y=s[g].cities;p(m,b,b);for(let D=0;D<Y.length;D++){let X=document.createElement("auro-menu");p(X,Y[D],Y[D]),m==null||m.appendChild(X)}}}t.addEventListener("input",()=>{let s=r.getData();s=r.filterData(s,t.value),h(s)})}const o=i`
<auro-combobox id="dynamicMenuExample" noFilter>
  <span slot="bib.fullscreen.headline">Dynamic Combobox Header</span>
  <span slot="label">Name</span>
  <!--
The auro-combobox element requires an empty auro-menu element
due to the requirements of auro-dropdown and auro-input
-->
  <auro-menu id="initMenu"></auro-menu>
</auro-combobox>
    `;return setTimeout(n,0),o},parameters:{docs:{source:{type:"code"}}}},A={render:()=>i`
<auro-combobox disabled>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},C={render:()=>i`
<auro-combobox noFilter>
  <span slot="bib.fullscreen.headline">noFilter Combobox Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,parameters:{chromatic:{disableSnapshot:!0}},async play({canvas:n}){const o=await n.findByShadowRole("textbox");await u.type(o,"x");const e=await K.findByShadowRole("option",{name:/No matching option/i});c(e).toBeInTheDocument()}},S={render:()=>i`
<auro-combobox error="Custom error message">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},B={render:()=>i`
<auro-combobox required noValidate>
  <span slot="bib.fullscreen.headline">noValidate Combobox Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},O={render:()=>i`
<auro-combobox required>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,parameters:{chromatic:{disableSnapshot:!0}},async play({canvas:n}){const o=await n.findByShadowRole("textbox");await u.click(o),await u.click(document.body);const e=await K.findAllByShadowText(/Please fill out this field/i);c(e.length).toBeGreaterThan(0)}},E={render:()=>i`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},P={render:()=>{function n(){const a=document.querySelector("#valueExample");a&&(a.value=["Oranges"])}function o(){const a=document.querySelector("#valueExample");a&&(a.value=["Dragon Fruit"])}function e(){const a=document.querySelector("#valueExample");a&&(a.value=void 0)}return i`
<auro-button id="valueValidExampleBtn" @click="${n}">Set to an existing option</auro-button>
<auro-button id="valueInvalidExampleBtn" @click="${o}">Set to custom value</auro-button>
<auro-button id="valueUndefinedExampleBtn" @click="${e}">Reset</auro-button>
<br/><br/>
<auro-combobox id="valueExample">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},parameters:{docs:{source:{type:"code"}},chromatic:{disableSnapshot:!0}},async play({canvas:n}){const o=await n.findByShadowRole("textbox"),e=await n.findByShadowRole("button",{name:/Set to an existing option/i});await u.click(e),c(o).toHaveValue("Oranges");const a=await n.findByShadowRole("button",{name:/Set to custom value/i});await u.click(a),c(o).toHaveValue("Dragon Fruit");const t=await n.findByShadowRole("button",{name:/Reset/i});await u.click(t),c(o).toHaveValue("")}},f={render:()=>i`
<auro-combobox type="date" triggerIcon>
  <span slot="bib.fullscreen.headline">Date Combobox Header</span>
  <span slot="label">Date</span>
  <auro-menu>
    <auro-menuoption value="01/02/2020" id="option-date-0">
      01/02/2020
    </auro-menuoption>
    <auro-menuoption value="05/16/2022" id="option-date-1">
      05/16/2022
    </auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,async play({canvas:n}){const o=await n.findByShadowRole("textbox");await u.click(o)}},T={...f,async play({canvas:n}){const o=await n.findByShadowRole("textbox");await u.type(o,"0")}},$={render:()=>{function n(){const o=document.querySelector("#focusExample");o==null||o.focus()}return i`
<auro-button id="focusExampleBtn" @click="${n}">Apply focus to combobox</auro-button>
<br /><br />
<auro-combobox id="focusExample">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},parameters:{docs:{source:{type:"code"}}},async play({canvas:n}){const o=await n.findByShadowRole("button",{name:/Apply focus to combobox/i});await u.click(o)}},M={render:()=>{function n(){const o=document.querySelector("#resetStateExample");o==null||o.reset()}return i`
<auro-button id="resetStateBtn" @click="${n}">Reset</auro-button>
<br /><br />

<auro-combobox id="resetStateExample" required>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},parameters:{docs:{source:{type:"code"}},chromatic:{disableSnapshot:!0}},async play({canvas:n}){const o=await n.findByShadowRole("textbox");await u.type(o,"a");const e=await K.findByShadowRole("option",{name:/Apples/i});await u.click(e),c(o).toHaveValue("Apples");const a=await n.findByShadowRole("button",{name:/Reset/i});await u.click(a),c(o).toHaveValue("")}},V={render:()=>i`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <span slot="helpText">Custom help text</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},N={render:()=>{function n(){const e=document.querySelector("#loadingExample"),a=document.querySelector("#loadingExampleComboboxMenu");function t(){(a==null?void 0:a.querySelectorAll("auro-menuoption")).forEach(h=>a==null?void 0:a.removeChild(h))}function r(){a&&(a.innerHTML+=`
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
            <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
            <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
            <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
            <auro-menuoption static nomatch>No matching option</auro-menuoption>
          `)}const l=()=>{clearTimeout(l.id),t(),a==null||a.setAttribute("loading","loading"),l.id=setTimeout(()=>{a==null||a.removeAttribute("loading"),r()},1e3)};e==null||e.addEventListener("input",p=>{var h;p.target.value&&p.target.value!==((h=p.target.optionSelected)==null?void 0:h.textContent)&&l()})}const o=i`
<auro-combobox id="loadingExample">
  <span slot="bib.fullscreen.headline">Loading Combobox Header</span>
  <span slot="label">Please select a preference</span>
  <auro-menu id="loadingExampleComboboxMenu">
    <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
  </auro-menu>
</auro-combobox>
    `;return setTimeout(n,0),o},parameters:{docs:{source:{type:"code"}}}},z={render:()=>i`
<auro-combobox fullscreenBreakpoint="lg">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},I={render:()=>{function n(){const o=document.querySelector("#combobox-dialog");o==null||o.setAttribute("open","true")}return i`
<div>
  <auro-button id="combobox-dialog-opener" @click="${n}">Combobox in Dialog</auro-button>

  <auro-dialog id="combobox-dialog">
    <span slot="header">Combobox in Dialog</span>
    <div slot="content">
      <auro-combobox id="focusExample">
        <span slot="bib.fullscreen.headline">Bib Header</span>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
          <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
          <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
          <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
          <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
          <auro-menuoption static nomatch>No matching option</auro-menuoption>
        </auro-menu>
      </auro-combobox>
    </div>
  </auro-dialog>
</div>
  `},parameters:{docs:{source:{type:"code"}}}},H={render:()=>i`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Airports</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="fca" id="airport-fca" suggest="fca montana kalispell">glacier park international</auro-menuoption>
    <auro-menuoption value="sfo" id="airport-sfo" suggest="sfo california san francisco">san francisco international</auro-menuoption>
    <auro-menuoption value="boi" id="airport-boi" suggest="boi idaho boise">gowen field</auro-menuoption>
    <auro-menuoption value="stl" id="airport-stl" suggest="stl missouri st louis">lambert st louis international</auro-menuoption>
    <auro-menuoption value="ylw" id="airport-ylw" suggest="ylw british columbia kelowna">kelowna international</auro-menuoption>
    <auro-menuoption value="ykm" id="airport-ykm" suggest="ykm washington yakima">yakima air terminal</auro-menuoption>
    <auro-menuoption value="puw" id="airport-puw" suggest="puw washington pullman">pullman moscow regional</auro-menuoption>
    <auro-menuoption value="yeg" id="airport-yeg" suggest="yeg alberta edmonton">edmonton international</auro-menuoption>
    <auro-menuoption value="tpa" id="airport-tpa" suggest="tpa florida tampa">tampa international</auro-menuoption>
    <auro-menuoption value="msp" id="airport-msp" suggest="msp minnesota minneapolis">minneapolis st paul international</auro-menuoption>
    <auro-menuoption value="ida" id="airport-ida" suggest="ida idaho idaho falls">idaho falls regional airport</auro-menuoption>
    <auro-menuoption value="mfr" id="airport-mfr" suggest="mfr oregon medford">rogue valley international</auro-menuoption>
    <auro-menuoption value="psp" id="airport-psp" suggest="psp california palm springs">palm springs international</auro-menuoption>
    <auro-menuoption value="lir" id="airport-lir" suggest="lir guanacaste liberia">guanacaste airport</auro-menuoption>
    <auro-menuoption value="oak" id="airport-oak" suggest="oak california oakland">oakland international</auro-menuoption>
    <auro-menuoption value="bos" id="airport-bos" suggest="bos massachusetts boston">logan international</auro-menuoption>
    <auro-menuoption value="bwi" id="airport-bwi" suggest="bwi maryland baltimore">thurgood marshall international</auro-menuoption>
    <auro-menuoption value="dal" id="airport-dal" suggest="dal texas dallas">dallas love field</auro-menuoption>
    <auro-menuoption value="sba" id="airport-sba" suggest="sba california santa barbara">santa barbara municipal</auro-menuoption>
    <auro-menuoption value="mci" id="airport-mci" suggest="mci missouri kansas city">kansas city international</auro-menuoption>
    <auro-menuoption value="koa" id="airport-koa" suggest="koa hawaii kona">kona international</auro-menuoption>
    <auro-menuoption value="pvr" id="airport-pvr" suggest="pvr jalisco puerto vallarta">licenciado gustavo diaz ordaz international</auro-menuoption>
    <auro-menuoption value="wrg" id="airport-wrg" suggest="wrg alaska wrangell">wrangell</auro-menuoption>
    <auro-menuoption value="scc" id="airport-scc" suggest="scc alaska prudhoe bay">deadhorse</auro-menuoption>
    <auro-menuoption value="lto" id="airport-lto" suggest="lto baja california loreto">loreto international</auro-menuoption>
    <auro-menuoption value="ome" id="airport-ome" suggest="ome alaska nome">nome</auro-menuoption>
    <auro-menuoption value="ict" id="airport-ict" suggest="ict kansas wichita">dwight d eisenhower national</auro-menuoption>
    <auro-menuoption value="phl" id="airport-phl" suggest="phl pennsylvania philadelphia">philadelphia international</auro-menuoption>
    <auro-menuoption value="dfw" id="airport-dfw" suggest="dfw texas dallas">dallas fort worth international</auro-menuoption>
    <auro-menuoption value="ind" id="airport-ind" suggest="ind indiana indianapolis">indianapolis international</auro-menuoption>
    <auro-menuoption value="smf" id="airport-smf" suggest="smf california sacramento">sacramento international</auro-menuoption>
    <auro-menuoption value="sit" id="airport-sit" suggest="sit alaska sitka">rocky gutierrez</auro-menuoption>
    <auro-menuoption value="dut" id="airport-dut" suggest="dut alaska dutch harbor">unalaska</auro-menuoption>
    <auro-menuoption value="cdv" id="airport-cdv" suggest="cdv alaska cordova">merle mudhole smith</auro-menuoption>
    <auro-menuoption value="psg" id="airport-psg" suggest="psg alaska petersburg">james a johnson</auro-menuoption>
    <auro-menuoption value="bna" id="airport-bna" suggest="bna tennessee nashville">nashville international</auro-menuoption>
    <auro-menuoption value="geg" id="airport-geg" suggest="geg washington spokane">spokane international</auro-menuoption>
    <auro-menuoption value="ktn" id="airport-ktn" suggest="ktn alaska ketchikan">ketchikan international</auro-menuoption>
    <auro-menuoption value="pit" id="airport-pit" suggest="pit pennsylvania pittsburgh">pittsburgh international</auro-menuoption>
    <auro-menuoption value="sbp" id="airport-sbp" suggest="sbp california san luis obispo">san luis obispo regional</auro-menuoption>
    <auro-menuoption value="bur" id="airport-bur" suggest="bur california burbank">hollywood burbank</auro-menuoption>
    <auro-menuoption value="msy" id="airport-msy" suggest="msy louisiana new orleans">louis armstrong international</auro-menuoption>
    <auro-menuoption value="pae" id="airport-pae" suggest="pae washington everett">paine field</auro-menuoption>
    <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg ohio cincinnati">cincinnati northern kentucky international</auro-menuoption>
    <auro-menuoption value="yak" id="airport-yak" suggest="yak alaska yakutat">yakutat</auro-menuoption>
    <auro-menuoption value="pdx" id="airport-pdx" suggest="pdx oregon portland">portland international</auro-menuoption>
    <auro-menuoption value="anc" id="airport-anc" suggest="anc alaska anchorage">ted stevens</auro-menuoption>
    <auro-menuoption value="sea" id="airport-sea" suggest="sea washington seattle">seattle tacoma international</auro-menuoption>
    <auro-menuoption value="san" id="airport-san" suggest="san california san diego">san diego international</auro-menuoption>
    <auro-menuoption value="sat" id="airport-sat" suggest="sat texas san antonio">san antonio international</auro-menuoption>
    <auro-menuoption value="fat" id="airport-fat" suggest="fat california fresno">fresno yosemite international</auro-menuoption>
    <auro-menuoption value="aus" id="airport-aus" suggest="aus texas austin">austin bergstrom international</auro-menuoption>
    <auro-menuoption value="ord" id="airport-ord" suggest="ord illinois chicago">ohare international</auro-menuoption>
    <auro-menuoption value="gdl" id="airport-gdl" suggest="gdl jalisco guadalajara">guadalajara international</auro-menuoption>
    <auro-menuoption value="sjc" id="airport-sjc" suggest="sjc california san jose">san jose international</auro-menuoption>
    <auro-menuoption value="jnu" id="airport-jnu" suggest="jnu alaska juneau">juneau international</auro-menuoption>
    <auro-menuoption value="rdm" id="airport-rdm" suggest="rdm oregon redmond">roberts field</auro-menuoption>
    <auro-menuoption value="sts" id="airport-sts" suggest="sts california sonoma">charles m schulz</auro-menuoption>
    <auro-menuoption value="fai" id="airport-fai" suggest="fai alaska fairbanks">fairbanks international</auro-menuoption>
    <auro-menuoption value="rdu" id="airport-rdu" suggest="rdu north carolina raleigh">raleigh durham international</auro-menuoption>
    <auro-menuoption value="oma" id="airport-oma" suggest="oma nebraska omaha">eppley airfield</auro-menuoption>
    <auro-menuoption value="bzn" id="airport-bzn" suggest="bzn montana bozeman">bozeman yellowstone international</auro-menuoption>
    <auro-menuoption value="ont" id="airport-ont" suggest="ont california ontario">ontario international</auro-menuoption>
    <auro-menuoption value="ogg" id="airport-ogg" suggest="ogg hawaii maui">kahului international</auro-menuoption>
    <auro-menuoption value="sun" id="airport-sun" suggest="sun idaho sun valley">friedman memorial</auro-menuoption>
    <auro-menuoption value="mzt" id="airport-mzt" suggest="mzt sinaloa mazatlan">general rafael buelna international</auro-menuoption>
    <auro-menuoption value="dlg" id="airport-dlg" suggest="dlg alaska dillingham">dillingham</auro-menuoption>
    <auro-menuoption value="adq" id="airport-adq" suggest="adq alaska kodiak">kodiak</auro-menuoption>
    <auro-menuoption value="den" id="airport-den" suggest="den colorado denver">denver international</auro-menuoption>
    <auro-menuoption value="zlo" id="airport-zlo" suggest="zlo colima manzanillo">manzanillo international</auro-menuoption>
    <auro-menuoption value="sjd" id="airport-sjd" suggest="sjd baja california los cabos">los cabos international</auro-menuoption>
    <auro-menuoption value="elp" id="airport-elp" suggest="elp texas el paso">el paso international airport</auro-menuoption>
    <auro-menuoption value="atl" id="airport-atl" suggest="atl georgia atlanta">hartsfield jackson international</auro-menuoption>
    <auro-menuoption value="lax" id="airport-lax" suggest="lax california los angeles">los angeles international</auro-menuoption>
    <auro-menuoption value="rsw" id="airport-rsw" suggest="rsw florida fort myers">southwest florida international</auro-menuoption>
    <auro-menuoption value="cle" id="airport-cle" suggest="cle ohio cleveland">cleveland hopkins international airport</auro-menuoption>
    <auro-menuoption value="otz" id="airport-otz" suggest="otz alaska kotzebue">ralph wien memorial</auro-menuoption>
    <auro-menuoption value="bze" id="airport-bze" suggest="bze belize belize city">philip sw goldson international airport</auro-menuoption>
    <auro-menuoption value="eat" id="airport-eat" suggest="eat washington wenatchee">pangborn memorial</auro-menuoption>
    <auro-menuoption value="dtw" id="airport-dtw" suggest="dtw michigan detroit">detroit metropolitan</auro-menuoption>
    <auro-menuoption value="bet" id="airport-bet" suggest="bet alaska bethel">bethel</auro-menuoption>
    <auro-menuoption value="dca" id="airport-dca" suggest="dca district of columbia washington">ronald reagan national</auro-menuoption>
    <auro-menuoption value="rno" id="airport-rno" suggest="rno nevada reno">reno tahoe international</auro-menuoption>
    <auro-menuoption value="brw" id="airport-brw" suggest="brw alaska barrow">wiley post will rogers</auro-menuoption>
    <auro-menuoption value="mry" id="airport-mry" suggest="mry california monterey">monterey regional</auro-menuoption>
    <auro-menuoption value="hnl" id="airport-hnl" suggest="hnl hawaii oahu">honolulu international</auro-menuoption>
    <auro-menuoption value="okc" id="airport-okc" suggest="okc oklahoma oklahoma city">will rogers world</auro-menuoption>
    <auro-menuoption value="iad" id="airport-iad" suggest="iad virginia dulles">washington dulles international</auro-menuoption>
    <auro-menuoption value="mia" id="airport-mia" suggest="mia florida miami">miami international</auro-menuoption>
    <auro-menuoption value="bli" id="airport-bli" suggest="bli washington bellingham">bellingham international</auro-menuoption>
    <auro-menuoption value="hln" id="airport-hln" suggest="hln montana helena">helena regional</auro-menuoption>
    <auro-menuoption value="gtf" id="airport-gtf" suggest="gtf montana great falls">great falls international</auro-menuoption>
    <auro-menuoption value="zih" id="airport-zih" suggest="zih guerrero zihuatanejo">ixtapa zihuatanejo international</auro-menuoption>
    <auro-menuoption value="yyc" id="airport-yyc" suggest="yyc alberta calgary">calgary international</auro-menuoption>
    <auro-menuoption value="sna" id="airport-sna" suggest="sna california santa ana">john wayne</auro-menuoption>
    <auro-menuoption value="fll" id="airport-fll" suggest="fll florida fort lauderdale">fort lauderdale hollywood international</auro-menuoption>
    <auro-menuoption value="ewr" id="airport-ewr" suggest="ewr new jersey newark">newark liberty international</auro-menuoption>
    <auro-menuoption value="hdn" id="airport-hdn" suggest="hdn colorado steamboat springs">yampa valley regional</auro-menuoption>
    <auro-menuoption value="psc" id="airport-psc" suggest="psc washington pasco">tri cities</auro-menuoption>
    <auro-menuoption value="tus" id="airport-tus" suggest="tus arizona tucson">tucson international</auro-menuoption>
    <auro-menuoption value="abq" id="airport-abq" suggest="abq new mexico albuquerque">albuquerque international sunport</auro-menuoption>
    <auro-menuoption value="jfk" id="airport-jfk" suggest="jfk new york new york">john f kennedy international</auro-menuoption>
    <auro-menuoption value="yvr" id="airport-yvr" suggest="yvr british columbia vancouver">vancouver international</auro-menuoption>
    <auro-menuoption value="sjo" id="airport-sjo" suggest="sjo san jose alajuela province">juan santamaria international</auro-menuoption>
    <auro-menuoption value="las" id="airport-las" suggest="las nevada las vegas">harry reid international airport</auro-menuoption>
    <auro-menuoption value="lih" id="airport-lih" suggest="lih hawaii kauai">lihue international</auro-menuoption>
    <auro-menuoption value="mso" id="airport-mso" suggest="mso montana missoula">missoula international</auro-menuoption>
    <auro-menuoption value="alw" id="airport-alw" suggest="alw washington walla walla">walla walla regional</auro-menuoption>
    <auro-menuoption value="mke" id="airport-mke" suggest="mke wisconsin milwaukee">milwaukee mitchell international</auro-menuoption>
    <auro-menuoption value="eug" id="airport-eug" suggest="eug oregon eugene">mahlon sweet field</auro-menuoption>
    <auro-menuoption value="akn" id="airport-akn" suggest="akn alaska king salmon">king salmon</auro-menuoption>
    <auro-menuoption value="cun" id="airport-cun" suggest="cun quintana roo cancun">cancun international</auro-menuoption>
    <auro-menuoption value="rdd" id="airport-rdd" suggest="rdd california redding">redding municipal airport</auro-menuoption>
    <auro-menuoption value="mco" id="airport-mco" suggest="mco florida orlando">orlando international</auro-menuoption>
    <auro-menuoption value="slc" id="airport-slc" suggest="slc utah salt lake city">salt lake city international</auro-menuoption>
    <auro-menuoption value="phx" id="airport-phx" suggest="phx arizona phoenix">sky harbor international</auro-menuoption>
    <auro-menuoption value="bil" id="airport-bil" suggest="bil montana billings">billings logan international</auro-menuoption>
    <auro-menuoption value="gst" id="airport-gst" suggest="gst alaska gustavus">gustavus</auro-menuoption>
    <auro-menuoption value="adk" id="airport-adk" suggest="adk alaska adak">adak</auro-menuoption>
    <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg kentucky hebron">cincinnati northern kentucky international</auro-menuoption>
    <auro-menuoption value="jac" id="airport-jac" suggest="jac wyoming jackson">jackson hole airport</auro-menuoption>
    <auro-menuoption value="cmh" id="airport-cmh" suggest="cmh ohio columbus">john glenn columbus international</auro-menuoption>
    <auro-menuoption value="yyj" id="airport-yyj" suggest="yyj british columbia victoria">victoria international</auro-menuoption>
    <auro-menuoption value="chs" id="airport-chs" suggest="chs south carolina charleston">charleston international</auro-menuoption>
    <auro-menuoption value="iah" id="airport-iah" suggest="iah texas houston">george bush intercontinental</auro-menuoption>
    <auro-menuoption static nomatch>Unknown airport... </auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,parameters:{chromatic:{disableSnapshot:!0}}},j={...d,render:()=>i`
<custom-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</custom-combobox>
  `,parameters:{chromatic:{disableSnapshot:!0}}},q={render:()=>i`
<auro-combobox type="credit-card" triggerIcon>
  <span slot="bib.fullscreen.headline">Credit Card</span>
  <span slot="label">Credit Card Number</span>
  <auro-menu>
    <auro-menuoption value="4500000000000000" id="option-cc-0">
      <auro-icon category="payment" customcolor name="cc-visa"></auro-icon>
      4000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption value="340000000000000" id="option-cc-1">
      <auro-icon category="payment" customcolor name="cc-amex"></auro-icon>
      3400 000000 00000
    </auro-menuoption>
    <auro-menuoption value="30000000000000" id="option-cc-2">
      <auro-icon category="payment" customcolor name="credit-card"></auro-icon>
      3000 000000 0000
    </auro-menuoption>
    <auro-menuoption value="5100000000000000" id="option-cc-4">
      <auro-icon category="payment" customcolor name="cc-mastercard"></auro-icon>
      5000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption value="6011000000000000" id="option-cc-5">
      <auro-icon category="payment" customcolor name="cc-discover"></auro-icon>
      6000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption static nomatch>No matching credit card saved</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `,async play({canvas:n}){const o=await n.findByShadowRole("textbox");await u.type(o,"0")}},G={render:()=>i`
<auro-combobox checkmark>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},R={render:()=>{function n(){console.warn("addNewAddress event fired"),Ce("addNewAddress event fired")}return i`
<auro-combobox id="persistent" @addNewAddress="${n}">
  <span slot="bib.fullscreen.headline">Address Combobox</span>
  <span slot="label">Address</span>
  <auro-menu id="customEvent">
    <auro-menuoption value="555 Address Way Seattle, WA 99999">555 Address Way Seattle, WA 99999</auro-menuoption>
    <auro-menuoption value="333 Some Street Seattle, WA 99999">333 Some Street Seattle, WA 99999</auro-menuoption>
    <auro-menuoption event="addNewAddress" persistent>Add new address</auro-menuoption>
  </auro-menu>
</auro-combobox>
  `},parameters:{docs:{source:{type:"code"}}}},L={render:()=>{function n(){const o=document.querySelector("#swapExampleLeft"),e=document.querySelector("#swapExampleRight");if(o&&e){const a=o.value,t=e.value;o.value=t,e.value=a}}return i`
<div id="swapExample">
  <auro-combobox id="swapExampleLeft">
    <span slot="bib.fullscreen.headline">Left Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <auro-button id="swapExampleBtn" @click="${n}" iconOnly>
    <auro-icon
      customColor
      category="terminal" 
      name="round-trip-arrows"
      slot="icon">
    </auro-icon>
  </auro-button>
  <auro-combobox id="swapExampleRight">
    <span slot="bib.fullscreen.headline">Right Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
</div>

<style>
  #swapExample {
    display: flex;
    flex-direction: row;

    align-items: center;
  }

  #swapExampleLeft,
  #swapExampleRight {
    flex: 1;
  }

  #swapExampleBtn {
    margin: 0 5px;
  }
</style>
  `},parameters:{docs:{source:{type:"code"}}}};var oo,eo,ao;x.parameters={...x.parameters,docs:{...(oo=x.parameters)==null?void 0:oo.docs,source:{originalSource:`{
  render: args => template(args),
  args: {
    'default-slot': \`
<auro-menu>
  <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
  <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
  <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
  <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
  <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
  <auro-menuoption static nomatch>No matching option</auro-menuoption>
</auro-menu>
    \`
  }
}`,...(ao=(eo=x.parameters)==null?void 0:eo.docs)==null?void 0:ao.source}}};var no,to,io;d.parameters={...d.parameters,docs:{...(no=d.parameters)==null?void 0:no.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`
}`,...(io=(to=d.parameters)==null?void 0:to.docs)==null?void 0:io.source}}};var ro,uo,so;w.parameters={...w.parameters,docs:{...(ro=w.parameters)==null?void 0:ro.docs,source:{originalSource:`{
  ...Basic,
  async play({
    canvas
  }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.type(comboboxInput, 'a');
  }
}`,...(so=(uo=w.parameters)==null?void 0:uo.docs)==null?void 0:so.source}}};var lo,po,mo;k.parameters={...k.parameters,docs:{...(lo=k.parameters)==null?void 0:lo.docs,source:{originalSource:`{
  render: () => {
    function setup() {
      const combobox: AuroCombobox | null = document.querySelector('#dynamicMenuExample');
      const dropdownEl = combobox?.shadowRoot?.querySelector(combobox.dropdownTag._$litStatic$);
      const inputEl = dropdownEl?.querySelector(combobox?.inputTag._$litStatic$);
      const dynamicData = new DynamicData();

      // Resets the root menu
      function resetMenu(root) {
        while (root.firstChild) {
          root.removeChild(root.firstChild);
        }
      }

      // Helper function that generates HTML for menuoptions
      function generateMenuOptionHtml(menu, label, value) {
        let option = document.createElement('auro-menuoption') as AuroMenuOption;

        // @ts-expect-error - TODO: \`AuroMenuOption\`['value'] is not typed
        option.value = value;
        option.innerHTML = label;
        menu.appendChild(option);
      }

      // Generates HTML for menu and submenus using country & city data from an external API
      function generateHtml(data) {
        const initialMenu: AuroMenu | null = document.querySelector('#initMenu');
        resetMenu(initialMenu);
        for (let index = 0; index < data.length; index++) {
          let country = data[index]['country'];
          let cities = data[index]['cities'];
          generateMenuOptionHtml(initialMenu, country, country);
          for (let indexB = 0; indexB < cities.length; indexB++) {
            let subMenu = document.createElement('auro-menu') as AuroMenu;
            generateMenuOptionHtml(subMenu, cities[indexB], cities[indexB]);
            initialMenu?.appendChild(subMenu);
          }
        }
        ;
      }
      inputEl.addEventListener('input', () => {
        let data = dynamicData.getData();
        data = dynamicData.filterData(data, inputEl.value);
        generateHtml(data);
      });
    }
    const template = html\`
<auro-combobox id="dynamicMenuExample" noFilter>
  <span slot="bib.fullscreen.headline">Dynamic Combobox Header</span>
  <span slot="label">Name</span>
  <!--
The auro-combobox element requires an empty auro-menu element
due to the requirements of auro-dropdown and auro-input
-->
  <auro-menu id="initMenu"></auro-menu>
</auro-combobox>
    \`;
    setTimeout(setup, 0);
    return template;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(mo=(po=k.parameters)==null?void 0:po.docs)==null?void 0:mo.source}}};var co,ho,go;A.parameters={...A.parameters,docs:{...(co=A.parameters)==null?void 0:co.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox disabled>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`
}`,...(go=(ho=A.parameters)==null?void 0:ho.docs)==null?void 0:go.source}}};var bo,vo,fo;C.parameters={...C.parameters,docs:{...(bo=C.parameters)==null?void 0:bo.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox noFilter>
  <span slot="bib.fullscreen.headline">noFilter Combobox Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  async play({
    canvas
  }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.type(comboboxInput, 'x');
    const noMatchOption = await screen.findByShadowRole('option', {
      name: /No matching option/i
    });
    expect(noMatchOption).toBeInTheDocument();
  }
}`,...(fo=(vo=C.parameters)==null?void 0:vo.docs)==null?void 0:fo.source}}};var yo,xo,wo;S.parameters={...S.parameters,docs:{...(yo=S.parameters)==null?void 0:yo.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox error="Custom error message">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`
}`,...(wo=(xo=S.parameters)==null?void 0:xo.docs)==null?void 0:wo.source}}};var ko,Ao,Co;B.parameters={...B.parameters,docs:{...(ko=B.parameters)==null?void 0:ko.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox required noValidate>
  <span slot="bib.fullscreen.headline">noValidate Combobox Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`
}`,...(Co=(Ao=B.parameters)==null?void 0:Ao.docs)==null?void 0:Co.source}}};var So,Bo,Oo;O.parameters={...O.parameters,docs:{...(So=O.parameters)==null?void 0:So.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox required>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  async play({
    canvas
  }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(comboboxInput);
    await userEvent.click(document.body);
    const errorText = await screen.findAllByShadowText(/Please fill out this field/i);
    expect(errorText.length).toBeGreaterThan(0);
  }
}`,...(Oo=(Bo=O.parameters)==null?void 0:Bo.docs)==null?void 0:Oo.source}}};var Eo,Po,To;E.parameters={...E.parameters,docs:{...(Eo=E.parameters)==null?void 0:Eo.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`
}`,...(To=(Po=E.parameters)==null?void 0:Po.docs)==null?void 0:To.source}}};var $o,Mo,Vo;P.parameters={...P.parameters,docs:{...($o=P.parameters)==null?void 0:$o.docs,source:{originalSource:`{
  render: () => {
    function handleSetValidValueClick() {
      const combobox: AuroCombobox | null = document.querySelector('#valueExample');
      if (combobox) {
        combobox.value = ['Oranges'];
      }
    }
    function handleSetInvalidValueClick() {
      const combobox: AuroCombobox | null = document.querySelector('#valueExample');
      if (combobox) {
        combobox.value = ['Dragon Fruit'];
      }
    }
    function handleResetValueClick() {
      const combobox: AuroCombobox | null = document.querySelector('#valueExample');
      if (combobox) {
        combobox.value = undefined;
      }
    }
    return html\`
<auro-button id="valueValidExampleBtn" @click="\${handleSetValidValueClick}">Set to an existing option</auro-button>
<auro-button id="valueInvalidExampleBtn" @click="\${handleSetInvalidValueClick}">Set to custom value</auro-button>
<auro-button id="valueUndefinedExampleBtn" @click="\${handleResetValueClick}">Reset</auro-button>
<br/><br/>
<auro-combobox id="valueExample">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    },
    chromatic: {
      disableSnapshot: true
    }
  },
  async play({
    canvas
  }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    const setValidValueBtn = await canvas.findByShadowRole('button', {
      name: /Set to an existing option/i
    });
    await userEvent.click(setValidValueBtn);
    expect(comboboxInput).toHaveValue('Oranges');
    const setInvalidValueBtn = await canvas.findByShadowRole('button', {
      name: /Set to custom value/i
    });
    await userEvent.click(setInvalidValueBtn);
    expect(comboboxInput).toHaveValue('Dragon Fruit');
    const resetValueBtn = await canvas.findByShadowRole('button', {
      name: /Reset/i
    });
    await userEvent.click(resetValueBtn);
    expect(comboboxInput).toHaveValue('');
  }
}`,...(Vo=(Mo=P.parameters)==null?void 0:Mo.docs)==null?void 0:Vo.source}}};var No,zo,Io;f.parameters={...f.parameters,docs:{...(No=f.parameters)==null?void 0:No.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox type="date" triggerIcon>
  <span slot="bib.fullscreen.headline">Date Combobox Header</span>
  <span slot="label">Date</span>
  <auro-menu>
    <auro-menuoption value="01/02/2020" id="option-date-0">
      01/02/2020
    </auro-menuoption>
    <auro-menuoption value="05/16/2022" id="option-date-1">
      05/16/2022
    </auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`,
  async play({
    canvas
  }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(comboboxInput);
  }
}`,...(Io=(zo=f.parameters)==null?void 0:zo.docs)==null?void 0:Io.source}}};var Ho,jo,qo;T.parameters={...T.parameters,docs:{...(Ho=T.parameters)==null?void 0:Ho.docs,source:{originalSource:`{
  ...TypeMonthDayYear,
  async play({
    canvas
  }) {
    const combobox = await canvas.findByShadowRole('textbox');
    await userEvent.type(combobox, '0');
  }
}`,...(qo=(jo=T.parameters)==null?void 0:jo.docs)==null?void 0:qo.source}}};var Go,Ro,Lo;$.parameters={...$.parameters,docs:{...(Go=$.parameters)==null?void 0:Go.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const combobox: AuroCombobox | null = document.querySelector('#focusExample');
      combobox?.focus();
    }
    return html\`
<auro-button id="focusExampleBtn" @click="\${handleClick}">Apply focus to combobox</auro-button>
<br /><br />
<auro-combobox id="focusExample">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  },
  async play({
    canvas
  }) {
    const btn = await canvas.findByShadowRole('button', {
      name: /Apply focus to combobox/i
    });
    await userEvent.click(btn);
  }
}`,...(Lo=(Ro=$.parameters)==null?void 0:Ro.docs)==null?void 0:Lo.source}}};var Do,Fo,Wo;M.parameters={...M.parameters,docs:{...(Do=M.parameters)==null?void 0:Do.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const combobox: AuroCombobox | null = document.querySelector('#resetStateExample');
      combobox?.reset();
    }
    return html\`
<auro-button id="resetStateBtn" @click="\${handleClick}">Reset</auro-button>
<br /><br />

<auro-combobox id="resetStateExample" required>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    },
    chromatic: {
      disableSnapshot: true
    }
  },
  async play({
    canvas
  }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.type(comboboxInput, 'a');
    const option = await screen.findByShadowRole('option', {
      name: /Apples/i
    });
    await userEvent.click(option);
    expect(comboboxInput).toHaveValue('Apples');
    const resetValueBtn = await canvas.findByShadowRole('button', {
      name: /Reset/i
    });
    await userEvent.click(resetValueBtn);
    expect(comboboxInput).toHaveValue('');
  }
}`,...(Wo=(Fo=M.parameters)==null?void 0:Fo.docs)==null?void 0:Wo.source}}};var _o,Uo,Yo;V.parameters={...V.parameters,docs:{...(_o=V.parameters)==null?void 0:_o.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <span slot="helpText">Custom help text</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption value="Prefer Alaska" id="option-5">Prefer Alaska</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`
}`,...(Yo=(Uo=V.parameters)==null?void 0:Uo.docs)==null?void 0:Yo.source}}};var Jo,Ko,Qo;N.parameters={...N.parameters,docs:{...(Jo=N.parameters)==null?void 0:Jo.docs,source:{originalSource:`{
  render: () => {
    function setup() {
      const combobox: AuroCombobox | null = document.querySelector("#loadingExample");
      const menu: AuroMenu | null = document.querySelector("#loadingExampleComboboxMenu");
      function emptyMenu() {
        const menuoptions = menu?.querySelectorAll('auro-menuoption') as NodeListOf<AuroMenuOption>;
        menuoptions.forEach(mo => menu?.removeChild(mo));
      }
      function fillMenu() {
        if (menu) {
          menu.innerHTML += \`
            <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
            <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
            <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
            <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
            <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
            <auro-menuoption static nomatch>No matching option</auro-menuoption>
          \`;
        }
      }
      type Load = {
        (): void;
        id?: NodeJS.Timeout;
      };
      const load: Load = () => {
        clearTimeout(load.id);
        emptyMenu();
        menu?.setAttribute('loading', 'loading');
        load.id = setTimeout(() => {
          menu?.removeAttribute('loading');
          fillMenu();
        }, 1000);
      };
      combobox?.addEventListener("input", e => {
        // @ts-expect-error - TODO: Type event properly
        if (e.target.value && e.target.value !== e.target.optionSelected?.textContent) {
          load();
        }
      });
    }
    const template = html\`
<auro-combobox id="loadingExample">
  <span slot="bib.fullscreen.headline">Loading Combobox Header</span>
  <span slot="label">Please select a preference</span>
  <auro-menu id="loadingExampleComboboxMenu">
    <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
  </auro-menu>
</auro-combobox>
    \`;
    setTimeout(setup, 0);
    return template;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(Qo=(Ko=N.parameters)==null?void 0:Ko.docs)==null?void 0:Qo.source}}};var Xo,Zo,oe;z.parameters={...z.parameters,docs:{...(Xo=z.parameters)==null?void 0:Xo.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox fullscreenBreakpoint="lg">
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`
}`,...(oe=(Zo=z.parameters)==null?void 0:Zo.docs)==null?void 0:oe.source}}};var ee,ae,ne;I.parameters={...I.parameters,docs:{...(ee=I.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const dialog = document.querySelector('#combobox-dialog');
      dialog?.setAttribute('open', 'true');
    }
    return html\`
<div>
  <auro-button id="combobox-dialog-opener" @click="\${handleClick}">Combobox in Dialog</auro-button>

  <auro-dialog id="combobox-dialog">
    <span slot="header">Combobox in Dialog</span>
    <div slot="content">
      <auro-combobox id="focusExample">
        <span slot="bib.fullscreen.headline">Bib Header</span>
        <span slot="label">Name</span>
        <auro-menu>
          <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
          <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
          <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
          <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
          <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
          <auro-menuoption static nomatch>No matching option</auro-menuoption>
        </auro-menu>
      </auro-combobox>
    </div>
  </auro-dialog>
</div>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(ne=(ae=I.parameters)==null?void 0:ae.docs)==null?void 0:ne.source}}};var te,ie,re;H.parameters={...H.parameters,docs:{...(te=H.parameters)==null?void 0:te.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox>
  <span slot="bib.fullscreen.headline">Airports</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="fca" id="airport-fca" suggest="fca montana kalispell">glacier park international</auro-menuoption>
    <auro-menuoption value="sfo" id="airport-sfo" suggest="sfo california san francisco">san francisco international</auro-menuoption>
    <auro-menuoption value="boi" id="airport-boi" suggest="boi idaho boise">gowen field</auro-menuoption>
    <auro-menuoption value="stl" id="airport-stl" suggest="stl missouri st louis">lambert st louis international</auro-menuoption>
    <auro-menuoption value="ylw" id="airport-ylw" suggest="ylw british columbia kelowna">kelowna international</auro-menuoption>
    <auro-menuoption value="ykm" id="airport-ykm" suggest="ykm washington yakima">yakima air terminal</auro-menuoption>
    <auro-menuoption value="puw" id="airport-puw" suggest="puw washington pullman">pullman moscow regional</auro-menuoption>
    <auro-menuoption value="yeg" id="airport-yeg" suggest="yeg alberta edmonton">edmonton international</auro-menuoption>
    <auro-menuoption value="tpa" id="airport-tpa" suggest="tpa florida tampa">tampa international</auro-menuoption>
    <auro-menuoption value="msp" id="airport-msp" suggest="msp minnesota minneapolis">minneapolis st paul international</auro-menuoption>
    <auro-menuoption value="ida" id="airport-ida" suggest="ida idaho idaho falls">idaho falls regional airport</auro-menuoption>
    <auro-menuoption value="mfr" id="airport-mfr" suggest="mfr oregon medford">rogue valley international</auro-menuoption>
    <auro-menuoption value="psp" id="airport-psp" suggest="psp california palm springs">palm springs international</auro-menuoption>
    <auro-menuoption value="lir" id="airport-lir" suggest="lir guanacaste liberia">guanacaste airport</auro-menuoption>
    <auro-menuoption value="oak" id="airport-oak" suggest="oak california oakland">oakland international</auro-menuoption>
    <auro-menuoption value="bos" id="airport-bos" suggest="bos massachusetts boston">logan international</auro-menuoption>
    <auro-menuoption value="bwi" id="airport-bwi" suggest="bwi maryland baltimore">thurgood marshall international</auro-menuoption>
    <auro-menuoption value="dal" id="airport-dal" suggest="dal texas dallas">dallas love field</auro-menuoption>
    <auro-menuoption value="sba" id="airport-sba" suggest="sba california santa barbara">santa barbara municipal</auro-menuoption>
    <auro-menuoption value="mci" id="airport-mci" suggest="mci missouri kansas city">kansas city international</auro-menuoption>
    <auro-menuoption value="koa" id="airport-koa" suggest="koa hawaii kona">kona international</auro-menuoption>
    <auro-menuoption value="pvr" id="airport-pvr" suggest="pvr jalisco puerto vallarta">licenciado gustavo diaz ordaz international</auro-menuoption>
    <auro-menuoption value="wrg" id="airport-wrg" suggest="wrg alaska wrangell">wrangell</auro-menuoption>
    <auro-menuoption value="scc" id="airport-scc" suggest="scc alaska prudhoe bay">deadhorse</auro-menuoption>
    <auro-menuoption value="lto" id="airport-lto" suggest="lto baja california loreto">loreto international</auro-menuoption>
    <auro-menuoption value="ome" id="airport-ome" suggest="ome alaska nome">nome</auro-menuoption>
    <auro-menuoption value="ict" id="airport-ict" suggest="ict kansas wichita">dwight d eisenhower national</auro-menuoption>
    <auro-menuoption value="phl" id="airport-phl" suggest="phl pennsylvania philadelphia">philadelphia international</auro-menuoption>
    <auro-menuoption value="dfw" id="airport-dfw" suggest="dfw texas dallas">dallas fort worth international</auro-menuoption>
    <auro-menuoption value="ind" id="airport-ind" suggest="ind indiana indianapolis">indianapolis international</auro-menuoption>
    <auro-menuoption value="smf" id="airport-smf" suggest="smf california sacramento">sacramento international</auro-menuoption>
    <auro-menuoption value="sit" id="airport-sit" suggest="sit alaska sitka">rocky gutierrez</auro-menuoption>
    <auro-menuoption value="dut" id="airport-dut" suggest="dut alaska dutch harbor">unalaska</auro-menuoption>
    <auro-menuoption value="cdv" id="airport-cdv" suggest="cdv alaska cordova">merle mudhole smith</auro-menuoption>
    <auro-menuoption value="psg" id="airport-psg" suggest="psg alaska petersburg">james a johnson</auro-menuoption>
    <auro-menuoption value="bna" id="airport-bna" suggest="bna tennessee nashville">nashville international</auro-menuoption>
    <auro-menuoption value="geg" id="airport-geg" suggest="geg washington spokane">spokane international</auro-menuoption>
    <auro-menuoption value="ktn" id="airport-ktn" suggest="ktn alaska ketchikan">ketchikan international</auro-menuoption>
    <auro-menuoption value="pit" id="airport-pit" suggest="pit pennsylvania pittsburgh">pittsburgh international</auro-menuoption>
    <auro-menuoption value="sbp" id="airport-sbp" suggest="sbp california san luis obispo">san luis obispo regional</auro-menuoption>
    <auro-menuoption value="bur" id="airport-bur" suggest="bur california burbank">hollywood burbank</auro-menuoption>
    <auro-menuoption value="msy" id="airport-msy" suggest="msy louisiana new orleans">louis armstrong international</auro-menuoption>
    <auro-menuoption value="pae" id="airport-pae" suggest="pae washington everett">paine field</auro-menuoption>
    <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg ohio cincinnati">cincinnati northern kentucky international</auro-menuoption>
    <auro-menuoption value="yak" id="airport-yak" suggest="yak alaska yakutat">yakutat</auro-menuoption>
    <auro-menuoption value="pdx" id="airport-pdx" suggest="pdx oregon portland">portland international</auro-menuoption>
    <auro-menuoption value="anc" id="airport-anc" suggest="anc alaska anchorage">ted stevens</auro-menuoption>
    <auro-menuoption value="sea" id="airport-sea" suggest="sea washington seattle">seattle tacoma international</auro-menuoption>
    <auro-menuoption value="san" id="airport-san" suggest="san california san diego">san diego international</auro-menuoption>
    <auro-menuoption value="sat" id="airport-sat" suggest="sat texas san antonio">san antonio international</auro-menuoption>
    <auro-menuoption value="fat" id="airport-fat" suggest="fat california fresno">fresno yosemite international</auro-menuoption>
    <auro-menuoption value="aus" id="airport-aus" suggest="aus texas austin">austin bergstrom international</auro-menuoption>
    <auro-menuoption value="ord" id="airport-ord" suggest="ord illinois chicago">ohare international</auro-menuoption>
    <auro-menuoption value="gdl" id="airport-gdl" suggest="gdl jalisco guadalajara">guadalajara international</auro-menuoption>
    <auro-menuoption value="sjc" id="airport-sjc" suggest="sjc california san jose">san jose international</auro-menuoption>
    <auro-menuoption value="jnu" id="airport-jnu" suggest="jnu alaska juneau">juneau international</auro-menuoption>
    <auro-menuoption value="rdm" id="airport-rdm" suggest="rdm oregon redmond">roberts field</auro-menuoption>
    <auro-menuoption value="sts" id="airport-sts" suggest="sts california sonoma">charles m schulz</auro-menuoption>
    <auro-menuoption value="fai" id="airport-fai" suggest="fai alaska fairbanks">fairbanks international</auro-menuoption>
    <auro-menuoption value="rdu" id="airport-rdu" suggest="rdu north carolina raleigh">raleigh durham international</auro-menuoption>
    <auro-menuoption value="oma" id="airport-oma" suggest="oma nebraska omaha">eppley airfield</auro-menuoption>
    <auro-menuoption value="bzn" id="airport-bzn" suggest="bzn montana bozeman">bozeman yellowstone international</auro-menuoption>
    <auro-menuoption value="ont" id="airport-ont" suggest="ont california ontario">ontario international</auro-menuoption>
    <auro-menuoption value="ogg" id="airport-ogg" suggest="ogg hawaii maui">kahului international</auro-menuoption>
    <auro-menuoption value="sun" id="airport-sun" suggest="sun idaho sun valley">friedman memorial</auro-menuoption>
    <auro-menuoption value="mzt" id="airport-mzt" suggest="mzt sinaloa mazatlan">general rafael buelna international</auro-menuoption>
    <auro-menuoption value="dlg" id="airport-dlg" suggest="dlg alaska dillingham">dillingham</auro-menuoption>
    <auro-menuoption value="adq" id="airport-adq" suggest="adq alaska kodiak">kodiak</auro-menuoption>
    <auro-menuoption value="den" id="airport-den" suggest="den colorado denver">denver international</auro-menuoption>
    <auro-menuoption value="zlo" id="airport-zlo" suggest="zlo colima manzanillo">manzanillo international</auro-menuoption>
    <auro-menuoption value="sjd" id="airport-sjd" suggest="sjd baja california los cabos">los cabos international</auro-menuoption>
    <auro-menuoption value="elp" id="airport-elp" suggest="elp texas el paso">el paso international airport</auro-menuoption>
    <auro-menuoption value="atl" id="airport-atl" suggest="atl georgia atlanta">hartsfield jackson international</auro-menuoption>
    <auro-menuoption value="lax" id="airport-lax" suggest="lax california los angeles">los angeles international</auro-menuoption>
    <auro-menuoption value="rsw" id="airport-rsw" suggest="rsw florida fort myers">southwest florida international</auro-menuoption>
    <auro-menuoption value="cle" id="airport-cle" suggest="cle ohio cleveland">cleveland hopkins international airport</auro-menuoption>
    <auro-menuoption value="otz" id="airport-otz" suggest="otz alaska kotzebue">ralph wien memorial</auro-menuoption>
    <auro-menuoption value="bze" id="airport-bze" suggest="bze belize belize city">philip sw goldson international airport</auro-menuoption>
    <auro-menuoption value="eat" id="airport-eat" suggest="eat washington wenatchee">pangborn memorial</auro-menuoption>
    <auro-menuoption value="dtw" id="airport-dtw" suggest="dtw michigan detroit">detroit metropolitan</auro-menuoption>
    <auro-menuoption value="bet" id="airport-bet" suggest="bet alaska bethel">bethel</auro-menuoption>
    <auro-menuoption value="dca" id="airport-dca" suggest="dca district of columbia washington">ronald reagan national</auro-menuoption>
    <auro-menuoption value="rno" id="airport-rno" suggest="rno nevada reno">reno tahoe international</auro-menuoption>
    <auro-menuoption value="brw" id="airport-brw" suggest="brw alaska barrow">wiley post will rogers</auro-menuoption>
    <auro-menuoption value="mry" id="airport-mry" suggest="mry california monterey">monterey regional</auro-menuoption>
    <auro-menuoption value="hnl" id="airport-hnl" suggest="hnl hawaii oahu">honolulu international</auro-menuoption>
    <auro-menuoption value="okc" id="airport-okc" suggest="okc oklahoma oklahoma city">will rogers world</auro-menuoption>
    <auro-menuoption value="iad" id="airport-iad" suggest="iad virginia dulles">washington dulles international</auro-menuoption>
    <auro-menuoption value="mia" id="airport-mia" suggest="mia florida miami">miami international</auro-menuoption>
    <auro-menuoption value="bli" id="airport-bli" suggest="bli washington bellingham">bellingham international</auro-menuoption>
    <auro-menuoption value="hln" id="airport-hln" suggest="hln montana helena">helena regional</auro-menuoption>
    <auro-menuoption value="gtf" id="airport-gtf" suggest="gtf montana great falls">great falls international</auro-menuoption>
    <auro-menuoption value="zih" id="airport-zih" suggest="zih guerrero zihuatanejo">ixtapa zihuatanejo international</auro-menuoption>
    <auro-menuoption value="yyc" id="airport-yyc" suggest="yyc alberta calgary">calgary international</auro-menuoption>
    <auro-menuoption value="sna" id="airport-sna" suggest="sna california santa ana">john wayne</auro-menuoption>
    <auro-menuoption value="fll" id="airport-fll" suggest="fll florida fort lauderdale">fort lauderdale hollywood international</auro-menuoption>
    <auro-menuoption value="ewr" id="airport-ewr" suggest="ewr new jersey newark">newark liberty international</auro-menuoption>
    <auro-menuoption value="hdn" id="airport-hdn" suggest="hdn colorado steamboat springs">yampa valley regional</auro-menuoption>
    <auro-menuoption value="psc" id="airport-psc" suggest="psc washington pasco">tri cities</auro-menuoption>
    <auro-menuoption value="tus" id="airport-tus" suggest="tus arizona tucson">tucson international</auro-menuoption>
    <auro-menuoption value="abq" id="airport-abq" suggest="abq new mexico albuquerque">albuquerque international sunport</auro-menuoption>
    <auro-menuoption value="jfk" id="airport-jfk" suggest="jfk new york new york">john f kennedy international</auro-menuoption>
    <auro-menuoption value="yvr" id="airport-yvr" suggest="yvr british columbia vancouver">vancouver international</auro-menuoption>
    <auro-menuoption value="sjo" id="airport-sjo" suggest="sjo san jose alajuela province">juan santamaria international</auro-menuoption>
    <auro-menuoption value="las" id="airport-las" suggest="las nevada las vegas">harry reid international airport</auro-menuoption>
    <auro-menuoption value="lih" id="airport-lih" suggest="lih hawaii kauai">lihue international</auro-menuoption>
    <auro-menuoption value="mso" id="airport-mso" suggest="mso montana missoula">missoula international</auro-menuoption>
    <auro-menuoption value="alw" id="airport-alw" suggest="alw washington walla walla">walla walla regional</auro-menuoption>
    <auro-menuoption value="mke" id="airport-mke" suggest="mke wisconsin milwaukee">milwaukee mitchell international</auro-menuoption>
    <auro-menuoption value="eug" id="airport-eug" suggest="eug oregon eugene">mahlon sweet field</auro-menuoption>
    <auro-menuoption value="akn" id="airport-akn" suggest="akn alaska king salmon">king salmon</auro-menuoption>
    <auro-menuoption value="cun" id="airport-cun" suggest="cun quintana roo cancun">cancun international</auro-menuoption>
    <auro-menuoption value="rdd" id="airport-rdd" suggest="rdd california redding">redding municipal airport</auro-menuoption>
    <auro-menuoption value="mco" id="airport-mco" suggest="mco florida orlando">orlando international</auro-menuoption>
    <auro-menuoption value="slc" id="airport-slc" suggest="slc utah salt lake city">salt lake city international</auro-menuoption>
    <auro-menuoption value="phx" id="airport-phx" suggest="phx arizona phoenix">sky harbor international</auro-menuoption>
    <auro-menuoption value="bil" id="airport-bil" suggest="bil montana billings">billings logan international</auro-menuoption>
    <auro-menuoption value="gst" id="airport-gst" suggest="gst alaska gustavus">gustavus</auro-menuoption>
    <auro-menuoption value="adk" id="airport-adk" suggest="adk alaska adak">adak</auro-menuoption>
    <auro-menuoption value="cvg" id="airport-cvg" suggest="cvg kentucky hebron">cincinnati northern kentucky international</auro-menuoption>
    <auro-menuoption value="jac" id="airport-jac" suggest="jac wyoming jackson">jackson hole airport</auro-menuoption>
    <auro-menuoption value="cmh" id="airport-cmh" suggest="cmh ohio columbus">john glenn columbus international</auro-menuoption>
    <auro-menuoption value="yyj" id="airport-yyj" suggest="yyj british columbia victoria">victoria international</auro-menuoption>
    <auro-menuoption value="chs" id="airport-chs" suggest="chs south carolina charleston">charleston international</auro-menuoption>
    <auro-menuoption value="iah" id="airport-iah" suggest="iah texas houston">george bush intercontinental</auro-menuoption>
    <auro-menuoption static nomatch>Unknown airport... </auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(re=(ie=H.parameters)==null?void 0:ie.docs)==null?void 0:re.source}}};var ue,se,le;j.parameters={...j.parameters,docs:{...(ue=j.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  ...Basic,
  render: () => html\`
<custom-combobox>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
    <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
    <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
    <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
    <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
    <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
    <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</custom-combobox>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(le=(se=j.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};var pe,me,de;q.parameters={...q.parameters,docs:{...(pe=q.parameters)==null?void 0:pe.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox type="credit-card" triggerIcon>
  <span slot="bib.fullscreen.headline">Credit Card</span>
  <span slot="label">Credit Card Number</span>
  <auro-menu>
    <auro-menuoption value="4500000000000000" id="option-cc-0">
      <auro-icon category="payment" customcolor name="cc-visa"></auro-icon>
      4000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption value="340000000000000" id="option-cc-1">
      <auro-icon category="payment" customcolor name="cc-amex"></auro-icon>
      3400 000000 00000
    </auro-menuoption>
    <auro-menuoption value="30000000000000" id="option-cc-2">
      <auro-icon category="payment" customcolor name="credit-card"></auro-icon>
      3000 000000 0000
    </auro-menuoption>
    <auro-menuoption value="5100000000000000" id="option-cc-4">
      <auro-icon category="payment" customcolor name="cc-mastercard"></auro-icon>
      5000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption value="6011000000000000" id="option-cc-5">
      <auro-icon category="payment" customcolor name="cc-discover"></auro-icon>
      6000 0000 0000 0000
    </auro-menuoption>
    <auro-menuoption static nomatch>No matching credit card saved</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`,
  async play({
    canvas
  }) {
    const comboboxInput = await canvas.findByShadowRole('textbox');
    await userEvent.type(comboboxInput, '0');
  }
}`,...(de=(me=q.parameters)==null?void 0:me.docs)==null?void 0:de.source}}};var ce,he,ge;G.parameters={...G.parameters,docs:{...(ce=G.parameters)==null?void 0:ce.docs,source:{originalSource:`{
  render: () => html\`
<auro-combobox checkmark>
  <span slot="bib.fullscreen.headline">Bib Header</span>
  <span slot="label">Name</span>
  <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`
}`,...(ge=(he=G.parameters)==null?void 0:he.docs)==null?void 0:ge.source}}};var be,ve,fe;R.parameters={...R.parameters,docs:{...(be=R.parameters)==null?void 0:be.docs,source:{originalSource:`{
  render: () => {
    function handleAddNewAddress() {
      console.warn('addNewAddress event fired');
      action(\`addNewAddress event fired\`);
    }
    return html\`
<auro-combobox id="persistent" @addNewAddress="\${handleAddNewAddress}">
  <span slot="bib.fullscreen.headline">Address Combobox</span>
  <span slot="label">Address</span>
  <auro-menu id="customEvent">
    <auro-menuoption value="555 Address Way Seattle, WA 99999">555 Address Way Seattle, WA 99999</auro-menuoption>
    <auro-menuoption value="333 Some Street Seattle, WA 99999">333 Some Street Seattle, WA 99999</auro-menuoption>
    <auro-menuoption event="addNewAddress" persistent>Add new address</auro-menuoption>
  </auro-menu>
</auro-combobox>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(fe=(ve=R.parameters)==null?void 0:ve.docs)==null?void 0:fe.source}}};var ye,xe,we;L.parameters={...L.parameters,docs:{...(ye=L.parameters)==null?void 0:ye.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const comboboxOne: AuroCombobox | null = document.querySelector('#swapExampleLeft');
      const comboboxTwo: AuroCombobox | null = document.querySelector('#swapExampleRight');
      if (comboboxOne && comboboxTwo) {
        const valueOne = comboboxOne.value;
        const valueTwo = comboboxTwo.value;
        comboboxOne.value = valueTwo;
        comboboxTwo.value = valueOne;
      }
    }
    return html\`
<div id="swapExample">
  <auro-combobox id="swapExampleLeft">
    <span slot="bib.fullscreen.headline">Left Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
  <auro-button id="swapExampleBtn" @click="\${handleClick}" iconOnly>
    <auro-icon
      customColor
      category="terminal" 
      name="round-trip-arrows"
      slot="icon">
    </auro-icon>
  </auro-button>
  <auro-combobox id="swapExampleRight">
    <span slot="bib.fullscreen.headline">Right Combobox Header</span>
    <span slot="label">Name</span>
    <auro-menu>
      <auro-menuoption value="Apples" id="option-0">Apples</auro-menuoption>
      <auro-menuoption value="Oranges" id="option-1">Oranges</auro-menuoption>
      <auro-menuoption value="Peaches" id="option-2">Peaches</auro-menuoption>
      <auro-menuoption value="Grapes" id="option-3">Grapes</auro-menuoption>
      <auro-menuoption value="Cherries" id="option-4">Cherries</auro-menuoption>
      <auro-menuoption static nomatch>No matching option</auro-menuoption>
    </auro-menu>
  </auro-combobox>
</div>

<style>
  #swapExample {
    display: flex;
    flex-direction: row;

    align-items: center;
  }

  #swapExampleLeft,
  #swapExampleRight {
    flex: 1;
  }

  #swapExampleBtn {
    margin: 0 5px;
  }
</style>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(we=(xe=L.parameters)==null?void 0:xe.docs)==null?void 0:we.source}}};const Qe=["Playground","Basic","BasicOpen","DynamicMenu","Disabled","NoFilter","Error","NoValidate","Required","ProgrammaticValue","Value","TypeMonthDayYear","TypeMonthDayYearOpen","Focus","ResetState","HelpText","Loading","FullscreenBreakpoint","InDialog","Airports","Custom","TypeCreditCard","WithCheckmark","Persistent","SwapValue"],ca=Object.freeze(Object.defineProperty({__proto__:null,Airports:H,Basic:d,BasicOpen:w,Custom:j,Disabled:A,DynamicMenu:k,Error:S,Focus:$,FullscreenBreakpoint:z,HelpText:V,InDialog:I,Loading:N,NoFilter:C,NoValidate:B,Persistent:R,Playground:x,ProgrammaticValue:E,Required:O,ResetState:M,SwapValue:L,TypeCreditCard:q,TypeMonthDayYear:f,TypeMonthDayYearOpen:T,Value:P,WithCheckmark:G,__namedExportsOrder:Qe,default:Ke},Symbol.toStringTag,{value:"Module"}));export{d as B,k as D,S as E,$ as F,V as H,I,N as L,C as N,E as P,O as R,f as T,P as V,A as a,B as b,M as c,z as d,ca as s};
