import{u as k,e as $}from"./index-CeujA6c9.js";import{x as e}from"./lit-element-CzkqXGGu.js";import{A as Y}from"./auro-checkbox-BGfBNh4K.js";import{A as O}from"./auro-checkbox-group-vxXZxtgP.js";import"./registered-DrZ9fufq.js";Y.register();O.register();Y.register("custom-checkbox");O.register("custom-checkbox-group");const j={component:"auro-checkbox-group",title:"Checkbox & Checkbox Group"},a={render:()=>e`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
  `},r={render:()=>e`
<auro-checkbox-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabledGroup" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabledGroup" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabledGroup" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabledGroup" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
</auro-checkbox-group>
  `},u={render:()=>e`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabled" id="checkbox-disabled1">Checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabled" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabled" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabled" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
</auro-checkbox-group>
  `},b={render:()=>e`
<auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="required" id="checkbox-required1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="required" id="checkbox-required2">Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="required" id="checkbox-required3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="required" id="checkbox-required4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
  `,async play({canvas:o}){const l=(await o.findAllByShadowRole("checkbox"))[0];await k.click(l),await k.click(l)}},s={render:()=>e`
<auro-checkbox-group error="custom error">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="error-value1" name="error" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value2" name="error" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value3" name="error" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value4" name="error" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
</auro-checkbox-group>
  `},n={render:()=>{function o(){const c=document.querySelector("#resetStateExample");c==null||c.reset()}return e`
<auro-button id="resetStateBtn" @click="${o}">Reset</auro-button>
<br/><br/>

<auro-checkbox-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="resetState" id="checkbox-basic1" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="resetState" id="checkbox-basic2">Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="resetState" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="resetState" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
    `},parameters:{docs:{source:{type:"code"}},chromatic:{disableSnapshot:!0}},async play({canvas:o}){const c=await o.findByShadowRole("button",{name:/Reset/i});await k.click(c);const l=(await o.findAllByShadowRole("checkbox"))[0];$(l).not.toBeChecked()}},h={render:()=>e`
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="horizontal" id="checkbox-horizontal1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="horizontal" id="checkbox-horizontal2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="horizontal" id="checkbox-horizontal3">Maybe</auro-checkbox>
</auro-checkbox-group>
  `},i={render:()=>e`
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="horizontalLimit" id="checkbox-horizontalLimit1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="horizontalLimit" id="checkbox-horizontalLimit2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="horizontalLimit" id="checkbox-horizontalLimit3">Maybe</auro-checkbox>
  <auro-checkbox value="not sure" name="horizontalLimit" id="checkbox-horizontalLimit4">Not Sure</auro-checkbox>
</auro-checkbox-group>
  `},t={render:()=>e`
<custom-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <custom-checkbox value="value1" name="custom" id="checkbox-custom1">Custom checkbox option</custom-checkbox>
  <custom-checkbox value="value2" name="custom" id="checkbox-custom2" checked>Custom checkbox option</custom-checkbox>
  <custom-checkbox value="value3" name="custom" id="checkbox-custom3">Custom checkbox option</custom-checkbox>
  <custom-checkbox value="value4" name="custom" id="checkbox-custom4">Custom checkbox option</custom-checkbox>
</custom-checkbox-group>
  `,parameters:{chromatic:{disableSnapshot:!0}}};var x,d,m;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => html\`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="basic" id="checkbox-basic1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="basic" id="checkbox-basic2" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="basic" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="basic" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
  \`
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,v,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => html\`
<auro-checkbox-group disabled>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabledGroup" id="checkbox-disabledGroup1">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabledGroup" id="checkbox-disabledGroup2" checked>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabledGroup" id="checkbox-disabledGroup3">Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabledGroup" id="checkbox-disabledGroup4">Disabled checkbox option</auro-checkbox>
</auro-checkbox-group>
  \`
}`,...(g=(v=r.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var C,S,z;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => html\`
<auro-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="disabled-value1" name="disabled" id="checkbox-disabled1">Checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value2" name="disabled" id="checkbox-disabled2" checked disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value3" name="disabled" id="checkbox-disabled3" disabled>Disabled checkbox option</auro-checkbox>
  <auro-checkbox value="disabled-value4" name="disabled" id="checkbox-disabled4" checked>Checkbox option</auro-checkbox>
</auro-checkbox-group>
  \`
}`,...(z=(S=u.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var y,G,q;b.parameters={...b.parameters,docs:{...(y=b.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => html\`
<auro-checkbox-group required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="required" id="checkbox-required1">Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="required" id="checkbox-required2">Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="required" id="checkbox-required3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="required" id="checkbox-required4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
  \`,
  async play({
    canvas
  }) {
    const checkboxes = await canvas.findAllByShadowRole('checkbox');
    const firstCheckbox = checkboxes[0];
    await userEvent.click(firstCheckbox);
    await userEvent.click(firstCheckbox);
  }
}`,...(q=(G=b.parameters)==null?void 0:G.docs)==null?void 0:q.source}}};var f,E,w;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => html\`
<auro-checkbox-group error="custom error">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="error-value1" name="error" id="checkbox-errorGroup1">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value2" name="error" id="checkbox-errorGroup2">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value3" name="error" id="checkbox-errorGroup3">Error checkbox option</auro-checkbox>
  <auro-checkbox value="error-value4" name="error" id="checkbox-errorGroup4" checked>Error checkbox option</auro-checkbox>
</auro-checkbox-group>
  \`
}`,...(w=(E=s.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var F,L,D;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const checkboxGroup: AuroCheckboxGroup | null = document.querySelector('#resetStateExample');
      checkboxGroup?.reset();
    }
    ;
    return html\`
<auro-button id="resetStateBtn" @click="\${handleClick}">Reset</auro-button>
<br/><br/>

<auro-checkbox-group id="resetStateExample" required setCustomValidityValueMissing="Please select an option">
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="value1" name="resetState" id="checkbox-basic1" checked>Checkbox option</auro-checkbox>
  <auro-checkbox value="value2" name="resetState" id="checkbox-basic2">Checkbox option</auro-checkbox>
  <auro-checkbox value="value3" name="resetState" id="checkbox-basic3">Checkbox option</auro-checkbox>
  <auro-checkbox value="value4" name="resetState" id="checkbox-basic4">Checkbox option</auro-checkbox>
</auro-checkbox-group>
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
    const button = await canvas.findByShadowRole('button', {
      name: /Reset/i
    });
    await userEvent.click(button);
    const firstCheckbox = (await canvas.findAllByShadowRole('checkbox'))[0];
    expect(firstCheckbox).not.toBeChecked();
  }
}`,...(D=(L=n.parameters)==null?void 0:L.docs)==null?void 0:D.source}}};var R,B,A;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => html\`
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="horizontal" id="checkbox-horizontal1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="horizontal" id="checkbox-horizontal2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="horizontal" id="checkbox-horizontal3">Maybe</auro-checkbox>
</auro-checkbox-group>
  \`
}`,...(A=(B=h.parameters)==null?void 0:B.docs)==null?void 0:A.source}}};var M,V,N;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => html\`
<auro-checkbox-group horizontal>
  <span slot="legend">Form label goes here</span>
  <auro-checkbox value="yes" name="horizontalLimit" id="checkbox-horizontalLimit1">Yes</auro-checkbox>
  <auro-checkbox value="no" name="horizontalLimit" id="checkbox-horizontalLimit2">No</auro-checkbox>
  <auro-checkbox value="maybe" name="horizontalLimit" id="checkbox-horizontalLimit3">Maybe</auro-checkbox>
  <auro-checkbox value="not sure" name="horizontalLimit" id="checkbox-horizontalLimit4">Not Sure</auro-checkbox>
</auro-checkbox-group>
  \`
}`,...(N=(V=i.parameters)==null?void 0:V.docs)==null?void 0:N.source}}};var _,P,H;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => html\`
<custom-checkbox-group>
  <span slot="legend">Form label goes here</span>
  <custom-checkbox value="value1" name="custom" id="checkbox-custom1">Custom checkbox option</custom-checkbox>
  <custom-checkbox value="value2" name="custom" id="checkbox-custom2" checked>Custom checkbox option</custom-checkbox>
  <custom-checkbox value="value3" name="custom" id="checkbox-custom3">Custom checkbox option</custom-checkbox>
  <custom-checkbox value="value4" name="custom" id="checkbox-custom4">Custom checkbox option</custom-checkbox>
</custom-checkbox-group>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(H=(P=t.parameters)==null?void 0:P.docs)==null?void 0:H.source}}};const W=["Basic","DisabledGroup","DisabledCheckboxWithinGroup","Required","ErrorGroup","ResetState","Horizontal","HorizontalLimit","CustomCheckbox"],U=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,CustomCheckbox:t,DisabledCheckboxWithinGroup:u,DisabledGroup:r,ErrorGroup:s,Horizontal:h,HorizontalLimit:i,Required:b,ResetState:n,__namedExportsOrder:W,default:j},Symbol.toStringTag,{value:"Module"}));export{a as B,r as D,s as E,b as R,u as a,n as b,U as s};
