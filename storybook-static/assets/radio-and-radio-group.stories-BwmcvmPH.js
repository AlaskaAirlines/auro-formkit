import{x as a}from"./lit-element-CzkqXGGu.js";import{A as W}from"./auro-radio-1hfMn5UE.js";import{A as X}from"./auro-radio-group-dwDWJf-r.js";import"./registered-DrZ9fufq.js";W.register();X.register();W.register("custom-radio");X.register("custom-radio-group");const Z={component:"auro-radio-group",title:"Radio & Radio Group"},d={render:()=>a`
<auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  `},i={render:()=>a`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `},u={render:()=>a`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio4" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
  <auro-radio id="radio5" label="No" name="radioDemo" value="no" checked>No</auro-radio>
  <auro-radio id="radio6" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
</auro-radio-group>
  `},l={render:()=>a`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="disabledRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="disabledRadio2" label="No" name="radioDemo" value="no" disabled></auro-radio>
  <auro-radio id="disabledRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>

<auro-radio-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `},s={render:()=>a`
<auro-radio-group error="There is an error with this form entry">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="errorRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="errorRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="errorRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `},n={render:()=>a`
<auro-radio-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="horizontalRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="horizontalRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="horizontalRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `},m={render:()=>a`
<auro-radio-group required setCustomValidityValueMissing="value missing">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="requiredRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="requiredRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="requiredRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `},t={render:()=>a`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <span slot="optionalLabel">(add custom label here)</span>
  <auro-radio id="labelRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="labelRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="labelRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  `},p={render:()=>{function y(){const r=document.querySelector("#resetStateExample");r==null||r.reset()}return a`
<auro-button id="resetStateBtn" @click="${y}">Reset</auro-button>
<br/><br/>

<auro-radio-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="resetGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="resetGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="resetGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
    `},parameters:{docs:{source:{type:"code"}}}},c={render:()=>{function y(){const g=["Yes","No","Maybe"],R=document.querySelector("#dynamicExample");for(let o=0;o<g.length;o++){const e=document.createElement("auro-radio");e.id=`dynamicRadio${o}`,e.label=g[o],e.name="radioDemo",e.value=g[o],e.textContent=g[o],R==null||R.appendChild(e)}}const r=a`
<auro-radio-group required id="dynamicExample">
  <span slot="legend">Form label goes here</span>
</auro-radio-group>
    `;return setTimeout(y,0),r},parameters:{docs:{source:{type:"code"}}}},b={render:()=>a`
<custom-radio-group>
  <span slot="legend">Form label goes here</span>
  <custom-radio id="customRadio1" label="Yes" name="radioDemo" value="yes"></custom-radio>
  <custom-radio id="customRadio2" label="No" name="radioDemo" value="no"></custom-radio>
  <custom-radio id="customRadio3" label="Maybe" name="radioDemo" value="maybe"></custom-radio>
</custom-radio-group>
  `};var v,D,h;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => html\`
<auro-radio id="basicRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  \`
}`,...(h=(D=d.parameters)==null?void 0:D.docs)==null?void 0:h.source}}};var M,Y,S;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => html\`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="basicGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="basicGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="basicGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  \`
}`,...(S=(Y=i.parameters)==null?void 0:Y.docs)==null?void 0:S.source}}};var N,F,G;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => html\`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="radio4" label="Yes" name="radioDemo" value="yes">Yes</auro-radio>
  <auro-radio id="radio5" label="No" name="radioDemo" value="no" checked>No</auro-radio>
  <auro-radio id="radio6" label="Maybe" name="radioDemo" value="maybe">Maybe</auro-radio>
</auro-radio-group>
  \`
}`,...(G=(F=u.parameters)==null?void 0:F.docs)==null?void 0:G.source}}};var q,x,C;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => html\`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="disabledRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="disabledRadio2" label="No" name="radioDemo" value="no" disabled></auro-radio>
  <auro-radio id="disabledRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>

<auro-radio-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="disabledRadio4" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="disabledRadio5" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="disabledRadio6" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  \`
}`,...(C=(x=l.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var f,E,O;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => html\`
<auro-radio-group error="There is an error with this form entry">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="errorRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="errorRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="errorRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  \`
}`,...(O=(E=s.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var z,A,k;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => html\`
<auro-radio-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-radio id="horizontalRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="horizontalRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="horizontalRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  \`
}`,...(k=(A=n.parameters)==null?void 0:A.docs)==null?void 0:k.source}}};var T,V,B;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => html\`
<auro-radio-group required setCustomValidityValueMissing="value missing">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="requiredRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="requiredRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="requiredRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  \`
}`,...(B=(V=m.parameters)==null?void 0:V.docs)==null?void 0:B.source}}};var _,$,L;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => html\`
<auro-radio-group>
  <span slot="legend">Form label goes here</span>
  <span slot="optionalLabel">(add custom label here)</span>
  <auro-radio id="labelRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="labelRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="labelRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
  \`
}`,...(L=($=t.parameters)==null?void 0:$.docs)==null?void 0:L.source}}};var H,P,j;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const radioGroup: AuroRadioGroup | null = document.querySelector('#resetStateExample');
      radioGroup?.reset();
    }
    ;
    return html\`
<auro-button id="resetStateBtn" @click="\${handleClick}">Reset</auro-button>
<br/><br/>

<auro-radio-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-radio id="resetGroupRadio1" label="Yes" name="radioDemo" value="yes"></auro-radio>
  <auro-radio id="resetGroupRadio2" label="No" name="radioDemo" value="no"></auro-radio>
  <auro-radio id="resetGroupRadio3" label="Maybe" name="radioDemo" value="maybe"></auro-radio>
</auro-radio-group>
    \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(j=(P=p.parameters)==null?void 0:P.docs)==null?void 0:j.source}}};var w,I,J;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => {
    function setup() {
      const values = ['Yes', 'No', 'Maybe'];
      const radioGroup: AuroRadioGroup | null = document.querySelector('#dynamicExample');
      for (let i = 0; i < values.length; i++) {
        const radio = document.createElement('auro-radio') as AuroRadio;
        radio.id = \`dynamicRadio\${i}\`;
        // @ts-expect-error - TODO: \`AuroRadio['label']\` is not typed
        radio.label = values[i];
        // @ts-expect-error - TODO: \`AuroRadio['name']\` is not typed
        radio.name = 'radioDemo';
        // @ts-expect-error - TODO: \`AuroRadio['value']\` is not typed
        radio.value = values[i];
        radio.textContent = values[i];
        radioGroup?.appendChild(radio);
      }
    }
    const template = html\`
<auro-radio-group required id="dynamicExample">
  <span slot="legend">Form label goes here</span>
</auro-radio-group>
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
}`,...(J=(I=c.parameters)==null?void 0:I.docs)==null?void 0:J.source}}};var K,Q,U;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => html\`
<custom-radio-group>
  <span slot="legend">Form label goes here</span>
  <custom-radio id="customRadio1" label="Yes" name="radioDemo" value="yes"></custom-radio>
  <custom-radio id="customRadio2" label="No" name="radioDemo" value="no"></custom-radio>
  <custom-radio id="customRadio3" label="Maybe" name="radioDemo" value="maybe"></custom-radio>
</custom-radio-group>
  \`
}`,...(U=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};const aa=["Basic","BasicGroup","Checked","Disabled","Error","Horizontal","Required","OptionalLabel","ResetState","Dynamic","CustomRadio"],ia=Object.freeze(Object.defineProperty({__proto__:null,Basic:d,BasicGroup:i,Checked:u,CustomRadio:b,Disabled:l,Dynamic:c,Error:s,Horizontal:n,OptionalLabel:t,Required:m,ResetState:p,__namedExportsOrder:aa,default:Z},Symbol.toStringTag,{value:"Module"}));export{d as B,u as C,l as D,s as E,n as H,t as O,m as R,i as a,p as b,c,ia as s};
