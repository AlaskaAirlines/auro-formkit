import{a as Po}from"./index-B-lxVbXh.js";import{g as yo}from"./storybook-utils-BWaCeRRT.js";import{x as o}from"./lit-element-CzkqXGGu.js";import{A as bo}from"./auro-menu-BXEacBn8.js";import"./registered-DrZ9fufq.js";import"./index-CXFB-ZtJ.js";import"https://cdn.jsdelivr.net/npm/@aurodesignsystem/auro-loader@latest/+esm";bo.register();bo.register("custom-menu");const{events:Do,args:Co,argTypes:Ao,template:fo}=yo("auro-menu"),Oo={component:"auro-menu",title:"Menu",args:Co,argTypes:Ao,parameters:{actions:{handles:Do}}},u={render:e=>fo(e),args:{"default-slot":`
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
    `}},a={render:()=>o`
<auro-menu>
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
  `},r={render:()=>o`
<auro-menu nocheckmark>
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <hr>
  <auro-menu>
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="pears">Pears</auro-menuoption>
    <auro-menuoption value="grapes">Grapes</auro-menuoption>
    <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
    <hr>
    <auro-menu>
      <auro-menuoption value="person">Person</auro-menuoption>
      <auro-menuoption value="woman">Woman</auro-menuoption>
      <auro-menuoption value="man">Man</auro-menuoption>
      <auro-menuoption value="camera">Camera</auro-menuoption>
      <auro-menuoption value="tv">TV</auro-menuoption>
    </auro-menu>
  </auro-menu>
  <hr>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
  <hr>
  <auro-menu>
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="trucks">Trucks</auro-menuoption>
    <auro-menuoption value="boats">Boats</auro-menuoption>
    <auro-menuoption value="planes">Planes</auro-menuoption>
    <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-menu>
  `},t={render:()=>o`
<auro-menu disabled>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab">Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share">Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `},i={render:()=>{function e(){const n=document.querySelector("#matchWordMenu");n&&(n.matchWord=this.value)}return o`
<auro-input id="matchWordInput" @keyup="${e}" required>
  <span slot="label">Enter a value to match in the menu</span>
</auro-input>
<br />
<auro-menu id="matchWordMenu">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menu>
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="peaches">Peaches</auro-menuoption>
  </auro-menu>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
  `},parameters:{docs:{source:{type:"code"}}}},p={render:()=>o`
<auro-menu multiselect>
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
  `},m={render:()=>{function e(){const n=document.querySelectorAll("#loadingExampleTable auro-menu");n==null||n.forEach(So=>So.toggleAttribute("loading"))}return o`
<auro-button common id="loadingExampleToggleButton" @click="${e}">Toggle Loading</auro-button>
<table id="loadingExampleTable">
  <thead>
    <tr>
      <td width="25%">Spinner + Text</td>
      <td width="25%">Text Only</td>
      <td width="25%">Spinner Only</td>
      <td width="25%">None</td>
    </tr>
  </thead>
  <tr>
    <td>
      <auro-menu>
        <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
    <td>
      <auro-menu>
        <span slot="loadingText">Loading...</span>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
    <td>
      <auro-menu>
        <auro-loader slot="loadingIcon" orbit xs></auro-loader>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
    <td>
      <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
</tr>
</table>
  `},parameters:{docs:{source:{type:"code"}}}},l={render:()=>o`
<auro-menu id="alpha" style="max-height: 200px">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <hr>
  <auro-menu id="beta">
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="pears">Pears</auro-menuoption>
    <auro-menuoption value="grapes">Grapes</auro-menuoption>
    <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
    <hr>
    <auro-menu id="charlie">
      <auro-menuoption value="person">Person</auro-menuoption>
      <auro-menuoption value="woman">Woman</auro-menuoption>
      <auro-menuoption value="man">Man</auro-menuoption>
      <auro-menuoption value="camera">Camera</auro-menuoption>
      <auro-menuoption value="tv">TV</auro-menuoption>
    </auro-menu>
  </auro-menu>
  <hr>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
  <hr>
  <auro-menu id="delta">
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="trucks">Trucks</auro-menuoption>
    <auro-menuoption value="boats">Boats</auro-menuoption>
    <auro-menuoption value="planes">Planes</auro-menuoption>
    <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-menu>
  `},s={render:()=>o`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab">Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share">Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `},v={render:()=>o`
<auro-menu id="alpha">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <hr>
  <auro-menu id="beta">
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="pears">Pears</auro-menuoption>
    <auro-menuoption value="grapes">Grapes</auro-menuoption>
    <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
    <hr>
    <auro-menu id="charlie">
      <auro-menuoption value="person">Person</auro-menuoption>
      <auro-menuoption value="woman">Woman</auro-menuoption>
      <auro-menuoption value="man">Man</auro-menuoption>
      <auro-menuoption value="camera">Camera</auro-menuoption>
      <auro-menuoption value="tv">TV</auro-menuoption>
    </auro-menu>
  </auro-menu>
  <hr>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
  <hr>
  <auro-menu id="delta">
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="trucks">Trucks</auro-menuoption>
    <auro-menuoption value="boats">Boats</auro-menuoption>
    <auro-menuoption value="planes">Planes</auro-menuoption>
    <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-menu>
  `},c={render:()=>o`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `},d={render:()=>o`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window" selected>New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>

  `},w={render:()=>o`
<auro-menu style="width: 300px">
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab">Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as 'option_10_redevelopment_hover_scenario.png'</auro-menuoption>
  <hr>
  <auro-menuoption value="share">Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `},h={render:()=>o`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" hidden>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  `},g={render:()=>{function e(){const n=document.querySelector("#resetExample");n==null||n.reset()}return o`
<auro-menu id="resetExample">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration" selected>Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<br/><br/>
<auro-button id="resetExampleBtn" @click="${e}">RESET</auro-button>
  `},parameters:{docs:{source:{type:"code"}}}},b={render:()=>o`
<custom-menu>
  <custom-menuoption value="stops">Stops</custom-menuoption>
  <custom-menuoption value="price">Price</custom-menuoption>
  <custom-menuoption value="duration">Duration</custom-menuoption>
  <custom-menuoption value="departure">Departure</custom-menuoption>
  <custom-menuoption value="arrival">Arrival</custom-menuoption>
</custom-menu>
  `},S={render:()=>{function e(n){console.warn("My Custom Event Fired",n),Po(`My Custom Event Fired, ${JSON.stringify(n,null,2)}`)()}return o`
<auro-menu id="customEvent" @mycustomevent="${e}">
  <auro-menuoption value="stops">555 Address Way Seattle, WA 99999</auro-menuoption>
  <auro-menuoption value="price">333 Some Street Seattle, WA 99999</auro-menuoption>
  <auro-menuoption event="mycustomevent">Add new address</auro-menuoption>
</auro-menu>
  `},parameters:{docs:{source:{type:"code"}}}};var P,y,D;u.parameters={...u.parameters,docs:{...(P=u.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: args => template(args),
  args: {
    'default-slot': \`
<auro-menuoption value="stops">Stops</auro-menuoption>
<auro-menuoption value="price">Price</auro-menuoption>
<auro-menuoption value="duration">Duration</auro-menuoption>
<auro-menuoption value="departure">Departure</auro-menuoption>
<auro-menuoption value="arrival">Arrival</auro-menuoption>
    \`
  }
}`,...(D=(y=u.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var C,A,f;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu>
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
  \`
}`,...(f=(A=a.parameters)==null?void 0:A.docs)==null?void 0:f.source}}};var O,k,M;r.parameters={...r.parameters,docs:{...(O=r.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu nocheckmark>
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <hr>
  <auro-menu>
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="pears">Pears</auro-menuoption>
    <auro-menuoption value="grapes">Grapes</auro-menuoption>
    <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
    <hr>
    <auro-menu>
      <auro-menuoption value="person">Person</auro-menuoption>
      <auro-menuoption value="woman">Woman</auro-menuoption>
      <auro-menuoption value="man">Man</auro-menuoption>
      <auro-menuoption value="camera">Camera</auro-menuoption>
      <auro-menuoption value="tv">TV</auro-menuoption>
    </auro-menu>
  </auro-menu>
  <hr>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
  <hr>
  <auro-menu>
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="trucks">Trucks</auro-menuoption>
    <auro-menuoption value="boats">Boats</auro-menuoption>
    <auro-menuoption value="planes">Planes</auro-menuoption>
    <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-menu>
  \`
}`,...(M=(k=r.parameters)==null?void 0:k.docs)==null?void 0:M.source}}};var x,N,E;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu disabled>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab">Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share">Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  \`
}`,...(E=(N=t.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};var T,W,_;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => {
    function handleKeyup() {
      const menu: AuroMenu | null = document.querySelector('#matchWordMenu');
      if (menu) menu.matchWord = this.value;
    }
    return html\`
<auro-input id="matchWordInput" @keyup="\${handleKeyup}" required>
  <span slot="label">Enter a value to match in the menu</span>
</auro-input>
<br />
<auro-menu id="matchWordMenu">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menu>
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="peaches">Peaches</auro-menuoption>
  </auro-menu>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(_=(W=i.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var B,$,L;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu multiselect>
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
  \`
}`,...(L=($=p.parameters)==null?void 0:$.docs)==null?void 0:L.source}}};var K,R,q;m.parameters={...m.parameters,docs:{...(K=m.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const menus: NodeListOf<AuroMenu> | null = document.querySelectorAll('#loadingExampleTable auro-menu');
      menus?.forEach(menu => menu.toggleAttribute('loading'));
    }
    return html\`
<auro-button common id="loadingExampleToggleButton" @click="\${handleClick}">Toggle Loading</auro-button>
<table id="loadingExampleTable">
  <thead>
    <tr>
      <td width="25%">Spinner + Text</td>
      <td width="25%">Text Only</td>
      <td width="25%">Spinner Only</td>
      <td width="25%">None</td>
    </tr>
  </thead>
  <tr>
    <td>
      <auro-menu>
        <auro-loader slot="loadingIcon" orbit xs></auro-loader><span slot="loadingText">Loading...</span>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
    <td>
      <auro-menu>
        <span slot="loadingText">Loading...</span>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
    <td>
      <auro-menu>
        <auro-loader slot="loadingIcon" orbit xs></auro-loader>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
    <td>
      <auro-menu>
        <auro-menuoption value="stops">Stops</auro-menuoption>
        <auro-menuoption value="price">Price</auro-menuoption>
        <auro-menuoption value="duration">Duration</auro-menuoption>
        <auro-menuoption value="departure">Departure</auro-menuoption>
        <auro-menuoption value="arrival">Arrival</auro-menuoption>
      </auro-menu>
    </td>
</tr>
</table>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(q=(R=m.parameters)==null?void 0:R.docs)==null?void 0:q.source}}};var G,H,I;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu id="alpha" style="max-height: 200px">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <hr>
  <auro-menu id="beta">
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="pears">Pears</auro-menuoption>
    <auro-menuoption value="grapes">Grapes</auro-menuoption>
    <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
    <hr>
    <auro-menu id="charlie">
      <auro-menuoption value="person">Person</auro-menuoption>
      <auro-menuoption value="woman">Woman</auro-menuoption>
      <auro-menuoption value="man">Man</auro-menuoption>
      <auro-menuoption value="camera">Camera</auro-menuoption>
      <auro-menuoption value="tv">TV</auro-menuoption>
    </auro-menu>
  </auro-menu>
  <hr>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
  <hr>
  <auro-menu id="delta">
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="trucks">Trucks</auro-menuoption>
    <auro-menuoption value="boats">Boats</auro-menuoption>
    <auro-menuoption value="planes">Planes</auro-menuoption>
    <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-menu>
  \`
}`,...(I=(H=l.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var V,F,j;s.parameters={...s.parameters,docs:{...(V=s.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab">Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share">Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  \`
}`,...(j=(F=s.parameters)==null?void 0:F.docs)==null?void 0:j.source}}};var J,z,Q;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu id="alpha">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration">Duration</auro-menuoption>
  <hr>
  <auro-menu id="beta">
    <auro-menuoption value="apples">Apples</auro-menuoption>
    <auro-menuoption value="oranges">Oranges</auro-menuoption>
    <auro-menuoption value="pears">Pears</auro-menuoption>
    <auro-menuoption value="grapes">Grapes</auro-menuoption>
    <auro-menuoption value="kiwi">Kiwi</auro-menuoption>
    <hr>
    <auro-menu id="charlie">
      <auro-menuoption value="person">Person</auro-menuoption>
      <auro-menuoption value="woman">Woman</auro-menuoption>
      <auro-menuoption value="man">Man</auro-menuoption>
      <auro-menuoption value="camera">Camera</auro-menuoption>
      <auro-menuoption value="tv">TV</auro-menuoption>
    </auro-menu>
  </auro-menu>
  <hr>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
  <hr>
  <auro-menu id="delta">
    <auro-menuoption value="cars">Cars</auro-menuoption>
    <auro-menuoption value="trucks">Trucks</auro-menuoption>
    <auro-menuoption value="boats">Boats</auro-menuoption>
    <auro-menuoption value="planes">Planes</auro-menuoption>
    <auro-menuoption value="motorcycles">Motorcycles</auro-menuoption>
  </auro-menu>
</auro-menu>
  \`
}`,...(Q=(z=v.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var U,X,Y;c.parameters={...c.parameters,docs:{...(U=c.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  \`
}`,...(Y=(X=c.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,oo,no;d.parameters={...d.parameters,docs:{...(Z=d.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window" selected>New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" disabled>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>

  \`
}`,...(no=(oo=d.parameters)==null?void 0:oo.docs)==null?void 0:no.source}}};var eo,uo,ao;w.parameters={...w.parameters,docs:{...(eo=w.parameters)==null?void 0:eo.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu style="width: 300px">
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab">Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as 'option_10_redevelopment_hover_scenario.png'</auro-menuoption>
  <hr>
  <auro-menuoption value="share">Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  \`
}`,...(ao=(uo=w.parameters)==null?void 0:uo.docs)==null?void 0:ao.source}}};var ro,to,io;h.parameters={...h.parameters,docs:{...(ro=h.parameters)==null?void 0:ro.docs,source:{originalSource:`{
  render: () => html\`
<auro-menu>
  <auro-menuoption value="new tab">New tab</auro-menuoption>
  <auro-menuoption value="new window">New window</auro-menuoption>
  <auro-menuoption value="open file">Open file</auro-menuoption>
  <auro-menuoption value="open location">Open location</auro-menuoption>
  <hr>
  <auro-menuoption value="close window">Close window</auro-menuoption>
  <auro-menuoption value="close tab" hidden>Close tab</auro-menuoption>
  <auro-menuoption value="save page as...">Save page as...</auro-menuoption>
  <hr>
  <auro-menuoption value="share" disabled>Share</auro-menuoption>
  <hr>
  <auro-menuoption value="print">Print</auro-menuoption>
</auro-menu>
  \`
}`,...(io=(to=h.parameters)==null?void 0:to.docs)==null?void 0:io.source}}};var po,mo,lo;g.parameters={...g.parameters,docs:{...(po=g.parameters)==null?void 0:po.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const menu: AuroMenu | null = document.querySelector('#resetExample');
      menu?.reset();
    }
    ;
    return html\`
<auro-menu id="resetExample">
  <auro-menuoption value="stops">Stops</auro-menuoption>
  <auro-menuoption value="price">Price</auro-menuoption>
  <auro-menuoption value="duration" selected>Duration</auro-menuoption>
  <auro-menuoption value="departure">Departure</auro-menuoption>
  <auro-menuoption value="arrival">Arrival</auro-menuoption>
</auro-menu>
<br/><br/>
<auro-button id="resetExampleBtn" @click="\${handleClick}">RESET</auro-button>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(lo=(mo=g.parameters)==null?void 0:mo.docs)==null?void 0:lo.source}}};var so,vo,co;b.parameters={...b.parameters,docs:{...(so=b.parameters)==null?void 0:so.docs,source:{originalSource:`{
  render: () => html\`
<custom-menu>
  <custom-menuoption value="stops">Stops</custom-menuoption>
  <custom-menuoption value="price">Price</custom-menuoption>
  <custom-menuoption value="duration">Duration</custom-menuoption>
  <custom-menuoption value="departure">Departure</custom-menuoption>
  <custom-menuoption value="arrival">Arrival</custom-menuoption>
</custom-menu>
  \`
}`,...(co=(vo=b.parameters)==null?void 0:vo.docs)==null?void 0:co.source}}};var wo,ho,go;S.parameters={...S.parameters,docs:{...(wo=S.parameters)==null?void 0:wo.docs,source:{originalSource:`{
  render: () => {
    function handleCustomEvent(event) {
      console.warn('My Custom Event Fired', event);
      action(\`My Custom Event Fired, \${JSON.stringify(event, null, 2)}\`)();
    }
    return html\`
<auro-menu id="customEvent" @mycustomevent="\${handleCustomEvent}">
  <auro-menuoption value="stops">555 Address Way Seattle, WA 99999</auro-menuoption>
  <auro-menuoption value="price">333 Some Street Seattle, WA 99999</auro-menuoption>
  <auro-menuoption event="mycustomevent">Add new address</auro-menuoption>
</auro-menu>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(go=(ho=S.parameters)==null?void 0:ho.docs)==null?void 0:go.source}}};const ko=["Playground","Basic","NoCheckmark","DisabledMenu","MatchWord","MultiSelect","Loading","Scroll","HR","NestedMenu","Disabled","Preselect","RestrictedWidth","Hidden","Reset","Custom","CustomEvent"],Bo=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,Custom:b,CustomEvent:S,Disabled:c,DisabledMenu:t,HR:s,Hidden:h,Loading:m,MatchWord:i,MultiSelect:p,NestedMenu:v,NoCheckmark:r,Playground:u,Preselect:d,Reset:g,RestrictedWidth:w,Scroll:l,__namedExportsOrder:ko,default:Oo},Symbol.toStringTag,{value:"Module"}));export{a as B,t as D,s as H,m as L,i as M,r as N,d as P,w as R,l as S,p as a,v as b,c,h as d,g as e,Bo as s};
