import{u as s,e as u}from"./index-CeujA6c9.js";import{x as r}from"./lit-element-CzkqXGGu.js";import{A as qe}from"./auro-counter-PUo0hm6P.js";import{A as Le}from"./auro-counter-group-CCGQycyX.js";qe.register();Le.register();qe.register("custom-counter");Le.register("custom-counter-group");const Ve={component:"auro-counter-group",title:"Counter & Counter Group"},d={render:()=>r`
<auro-counter min="1" max="5" value="2">
  Adults
  <span slot="description">Min: 1, Max: 5</span>
</auro-counter>
  `},m={render:()=>r`
<auro-counter-group>
  <auro-counter disabled> Short label </auro-counter>
  <auro-counter disabled>
    This is an example of the wrapping behavior for a long label
    <span slot="description">with short sub label text</span>
  </auro-counter>
</auro-counter-group>
  `},b={render:()=>r`
<!-- Example of counter-group properties -->
<auro-counter-group max="10" min="2" isDropdown>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <div slot="label">Group with all properties</div>
  <div slot="helpText">Total must be between 2-10</div>
  <div slot="valueText">Custom total display</div>

  <auro-counter> Counter 1 </auro-counter>
  <auro-counter> Counter 2 </auro-counter>
</auro-counter-group>
  `,async play({canvas:t}){const o=await t.findByShadowText(/Custom total display/i);await s.click(o)}},l={render:()=>r`
<!-- Example of all available slots -->
<auro-counter-group isDropdown>
  <!-- Group slots -->
  <div slot="label">Group with all slots</div>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <div slot="helpText">Help text appears below the group</div>
  <div slot="valueText">Custom value display</div>

  <!-- Counter with all slots -->
  <auro-counter>
    Default slot content
    <span slot="description">Description slot content</span>
  </auro-counter>
</auro-counter-group>
  `},h={...l,async play({canvas:t}){const o=await t.findByShadowText(/Custom value display/i);await s.click(o)}},v={render:()=>{function t(){const e=document.querySelector("#eventExample"),a=document.querySelector("#eventOutput");e==null||e.addEventListener("input",n=>{a&&(a.textContent=`Values updated: ${JSON.stringify(n.detail)}`)})}const o=r`
<code id="eventOutput"> Event values will appear here </code><br /><br />
<auro-counter-group id="eventExample">
  <auro-counter> Adults </auro-counter>
  <auro-counter> Children </auro-counter>
</auro-counter-group>
    `;return setTimeout(t,0),o},parameters:{docs:{source:{type:"code"}},chromatic:{disableSnapshot:!0}},async play({canvas:t}){const o=await t.findAllByShadowRole("button"),e=o[1],a=o[3],n=await t.findByText(/Event values will appear here/i);await s.click(e),u(n).toHaveTextContent('Values updated: {"total":1,"value":{"counter-0":1,"counter-1":0}}'),await s.click(a),u(n).toHaveTextContent('Values updated: {"total":2,"value":{"counter-0":1,"counter-1":1}}')}},g={render:()=>r`
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="valueText">Custom value text</div>
    <div slot="label"></div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description"
        >Under 17 years old. Restrictions apply if traveling without an
        adult.</span
      >
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
  `,async play({canvas:t}){const o=await t.findByShadowText(/Custom value text/i);await s.click(o)}},x={render:()=>r`
<auro-counter-group max="12" min="0">
  <auro-counter> Short label </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
  `,parameters:{chromatic:{disableSnapshot:!0}},async play({canvas:t,step:o}){const e=await t.findAllByShadowRole("button"),a=e[0],n=e[1],i=e[3];await o("Increment both counters to 6",async()=>{for(let c=0;c<6;c++)await s.click(n);for(let c=0;c<6;c++)await s.click(i);u(n).toBeDisabled(),u(i).toBeDisabled()}),await o("Decrement first counter by one",async()=>{await s.click(a),u(n).toBeEnabled(),u(i).toBeEnabled()}),await o("Increment second counter by one",async()=>{await s.click(i),u(n).toBeDisabled(),u(i).toBeDisabled()})}},f={render:()=>r`
<auro-counter-group max="12" min="0">
  <auro-counter max="5"> This counter has a max value of 5 </auro-counter>
  <auro-counter max="8"> This counter has a max value of 8 </auro-counter>
</auro-counter-group>
  `,parameters:{chromatic:{disableSnapshot:!0}},async play({canvas:t,step:o}){const e=await t.findAllByShadowRole("button"),a=e[0],n=e[1],i=e[2],c=e[3];await o("Increment first counter to max value",async()=>{for(let p=0;p<5;p++)await s.click(n);u(n).toBeDisabled()}),await o("Decrement first counter by one",async()=>{await s.click(a),u(n).toBeEnabled()}),await o("Increment second counter to max value",async()=>{for(let p=0;p<8;p++)await s.click(c);u(c).toBeDisabled()}),await o("Decrement second counter by one",async()=>{await s.click(i),u(c).toBeEnabled()})}},w={render:()=>{function t(){var a;const e=document.querySelector("#dropdownCounterExample");(a=e==null?void 0:e.counters)==null||a.forEach(n=>{n.value=0})}function o(){var a;const e=document.querySelector("#dropdownCounterExample");(a=e==null?void 0:e.dropdown)==null||a.hide()}return r`
<div style="max-width: 350px;">
  <auro-counter-group
    id="dropdownCounterExample"
    isDropdown
    fullscreenBreakpoint="lg"
  >
    <span slot="label">Passengers</span>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="helpText">This is help text</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description"
        >Under 17 years old. Restrictions apply if traveling without an
        adult.</span
      >
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>

    <div
      slot="bib.fullscreen.footer"
      style="display:flex; justify-content: stretch; gap: 1.5rem"
    >
      <auro-button
        id="dropdownCounterExampleResetbutton"
        @click="${t}"
        fluid
        variant="secondary"
        style="flex: 1 50%"
        >Reset</auro-button
      >
      <auro-button
        id="dropdownCounterExampleSavebutton"
        @click="${o}"
        fluid
        style="flex: 1 50%"
        >Save</auro-button
      >
    </div>
  </auro-counter-group>
</div>
  `},parameters:{docs:{source:{type:"code"}}}},y={render:()=>r`
<!-- Example of all counter properties -->
<auro-counter-group>
  <!-- Basic counter with min/max -->
  <auro-counter min="1" max="5" value="2">
    Min 1, Max 5
  </auro-counter>

  <!-- Disabled counter -->
  <auro-counter disabled value="0">
    Disabled counter
  </auro-counter>

</auro-counter-group>
  `,parameters:{chromatic:{disableSnapshot:!0}}},S={render:()=>r`
<auro-counter>
  Adults
  <span slot="description">18 years or older</span>
</auro-counter>
  `,parameters:{chromatic:{disableSnapshot:!0}}},B={render:()=>r`
<auro-counter>
  Adults
</auro-counter>
  `,parameters:{chromatic:{disableSnapshot:!0}}},T={render:()=>r`
<auro-counter-group>
  <auro-counter>
    Short label
  </auro-counter>
  <auro-counter>
    Another short label
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
  `,parameters:{chromatic:{disableSnapshot:!0}}},C={render:()=>r`
<auro-counter disabled value="0">
  Disabled counter
  <span slot="description">This counter cannot be modified</span>
</auro-counter>
  `},D={render:()=>r`
<auro-counter-group>
  <auro-counter>
    Short label
    <span slot="description"
      >This is an example of a long sub label wrapping behavior</span
    >
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
    <span slot="description">with short sub label text</span>
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
    <span slot="description"
      >Combined with an example of a long sub label wrapping behavior</span
    >
  </auro-counter>
</auro-counter-group>
  `},E={render:()=>r`
<auro-counter-group isDropdown>
  <div slot="bib.fullscreen.headline">Passengers</div>
  <div slot="label">Passengers</div>
  <auro-counter>
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <auro-counter>
    Children
    <span slot="description">2-17 years</span>
  </auro-counter>
</auro-counter-group>
  `,parameters:{chromatic:{disableSnapshot:!0}}},P={render:()=>r`
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="helpText">This is help text</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
  `,parameters:{chromatic:{disableSnapshot:!0}}},A={render:()=>r`
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="label">Passengers</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
  `,parameters:{chromatic:{disableSnapshot:!0}}},k={render:()=>r`
<auro-counter-group max="4" min="1">
  <div slot="label">Room Occupants</div>
  <div slot="helpText">Total occupants must be between 1-4 people</div>
  <auro-counter>
    Adults
    <span slot="description">At least 1 adult required</span>
  </auro-counter>
  <auro-counter max="2">
    Children
    <span slot="description">Maximum 2 children per room</span>
  </auro-counter>
</auro-counter-group>
  `,parameters:{chromatic:{disableSnapshot:!0}}};var G,M,R;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter min="1" max="5" value="2">
  Adults
  <span slot="description">Min: 1, Max: 5</span>
</auro-counter>
  \`
}`,...(R=(M=d.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var O,I,U;m.parameters={...m.parameters,docs:{...(O=m.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter-group>
  <auro-counter disabled> Short label </auro-counter>
  <auro-counter disabled>
    This is an example of the wrapping behavior for a long label
    <span slot="description">with short sub label text</span>
  </auro-counter>
</auro-counter-group>
  \`
}`,...(U=(I=m.parameters)==null?void 0:I.docs)==null?void 0:U.source}}};var q,L,V;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => html\`
<!-- Example of counter-group properties -->
<auro-counter-group max="10" min="2" isDropdown>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <div slot="label">Group with all properties</div>
  <div slot="helpText">Total must be between 2-10</div>
  <div slot="valueText">Custom total display</div>

  <auro-counter> Counter 1 </auro-counter>
  <auro-counter> Counter 2 </auro-counter>
</auro-counter-group>
  \`,
  async play({
    canvas
  }) {
    const counterGroupTrigger = await canvas.findByShadowText(/Custom total display/i);
    await userEvent.click(counterGroupTrigger);
  }
}`,...(V=(L=b.parameters)==null?void 0:L.docs)==null?void 0:V.source}}};var H,$,_;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => html\`
<!-- Example of all available slots -->
<auro-counter-group isDropdown>
  <!-- Group slots -->
  <div slot="label">Group with all slots</div>
  <div slot="bib.fullscreen.headline">Group fullscreen label</div>
  <div slot="helpText">Help text appears below the group</div>
  <div slot="valueText">Custom value display</div>

  <!-- Counter with all slots -->
  <auro-counter>
    Default slot content
    <span slot="description">Description slot content</span>
  </auro-counter>
</auro-counter-group>
  \`
}`,...(_=($=l.parameters)==null?void 0:$.docs)==null?void 0:_.source}}};var j,J,N;h.parameters={...h.parameters,docs:{...(j=h.parameters)==null?void 0:j.docs,source:{originalSource:`{
  ...Slots,
  async play({
    canvas
  }) {
    const counterGroupTrigger = await canvas.findByShadowText(/Custom value display/i);
    await userEvent.click(counterGroupTrigger);
  }
}`,...(N=(J=h.parameters)==null?void 0:J.docs)==null?void 0:N.source}}};var z,F,K;v.parameters={...v.parameters,docs:{...(z=v.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => {
    function setup() {
      const counter = document.querySelector('#eventExample');
      const output = document.querySelector('#eventOutput');
      counter?.addEventListener('input', event => {
        if (output) {
          // @ts-expect-error - TODO: Type event properly
          output.textContent = \`Values updated: \${JSON.stringify(event.detail)}\`;
        }
      });
    }
    const template = html\`
<code id="eventOutput"> Event values will appear here </code><br /><br />
<auro-counter-group id="eventExample">
  <auro-counter> Adults </auro-counter>
  <auro-counter> Children </auro-counter>
</auro-counter-group>
    \`;
    setTimeout(setup, 0);
    return template;
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
    // TODO: Resorted to finding all buttons then referencing by index, because buttons do not have any accessible names
    const buttons = await canvas.findAllByShadowRole('button');
    const adultsPlusButton = buttons[1];
    const childrenPlusButton = buttons[3];
    const output = await canvas.findByText(/Event values will appear here/i);
    await userEvent.click(adultsPlusButton);
    expect(output).toHaveTextContent('Values updated: {"total":1,"value":{"counter-0":1,"counter-1":0}}');
    await userEvent.click(childrenPlusButton);
    expect(output).toHaveTextContent('Values updated: {"total":2,"value":{"counter-0":1,"counter-1":1}}');
  }
}`,...(K=(F=v.parameters)==null?void 0:F.docs)==null?void 0:K.source}}};var Q,W,X;g.parameters={...g.parameters,docs:{...(Q=g.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => html\`
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="valueText">Custom value text</div>
    <div slot="label"></div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description"
        >Under 17 years old. Restrictions apply if traveling without an
        adult.</span
      >
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
  \`,
  async play({
    canvas
  }) {
    const counterGroupTrigger = await canvas.findByShadowText(/Custom value text/i);
    await userEvent.click(counterGroupTrigger);
  }
}`,...(X=(W=g.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,ee;x.parameters={...x.parameters,docs:{...(Y=x.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter-group max="12" min="0">
  <auro-counter> Short label </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  async play({
    canvas,
    step
  }) {
    // TODO: Resorted to finding all buttons then referencing by index, because buttons do not have any accessible names
    const buttons = await canvas.findAllByShadowRole('button');
    const firstMinusButton = buttons[0];
    const firstPlusButton = buttons[1];
    const secondPlusButton = buttons[3];
    await step('Increment both counters to 6', async () => {
      for (let i = 0; i < 6; i++) {
        await userEvent.click(firstPlusButton);
      }
      for (let i = 0; i < 6; i++) {
        await userEvent.click(secondPlusButton);
      }
      expect(firstPlusButton).toBeDisabled();
      expect(secondPlusButton).toBeDisabled();
    });
    await step('Decrement first counter by one', async () => {
      await userEvent.click(firstMinusButton);
      expect(firstPlusButton).toBeEnabled();
      expect(secondPlusButton).toBeEnabled();
    });
    await step('Increment second counter by one', async () => {
      await userEvent.click(secondPlusButton);
      expect(firstPlusButton).toBeDisabled();
      expect(secondPlusButton).toBeDisabled();
    });
  }
}`,...(ee=(Z=x.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var oe,re,te;f.parameters={...f.parameters,docs:{...(oe=f.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter-group max="12" min="0">
  <auro-counter max="5"> This counter has a max value of 5 </auro-counter>
  <auro-counter max="8"> This counter has a max value of 8 </auro-counter>
</auro-counter-group>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  },
  async play({
    canvas,
    step
  }) {
    // TODO: Resorted to finding all buttons then referencing by index, because buttons do not have any accessible names
    const buttons = await canvas.findAllByShadowRole('button');
    const firstMinusButton = buttons[0];
    const firstPlusButton = buttons[1];
    const secondMinusButton = buttons[2];
    const secondPlusButton = buttons[3];
    await step('Increment first counter to max value', async () => {
      for (let i = 0; i < 5; i++) {
        await userEvent.click(firstPlusButton);
      }
      expect(firstPlusButton).toBeDisabled();
    });
    await step('Decrement first counter by one', async () => {
      await userEvent.click(firstMinusButton);
      expect(firstPlusButton).toBeEnabled();
    });
    await step('Increment second counter to max value', async () => {
      for (let i = 0; i < 8; i++) {
        await userEvent.click(secondPlusButton);
      }
      expect(secondPlusButton).toBeDisabled();
    });
    await step('Decrement second counter by one', async () => {
      await userEvent.click(secondMinusButton);
      expect(secondPlusButton).toBeEnabled();
    });
  }
}`,...(te=(re=f.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ne,ae,se;w.parameters={...w.parameters,docs:{...(ne=w.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: () => {
    function handleResetClick() {
      const counterGroup: AuroCounterGroup | null = document.querySelector('#dropdownCounterExample');
      // @ts-expect-error - TODO: Private access to \`AuroCounterGroup['counters']\`
      counterGroup?.counters?.forEach(counter => {
        (counter as AuroCounter).value = 0;
      });
    }
    function handleSaveClick() {
      const counterGroup: AuroCounterGroup | null = document.querySelector('#dropdownCounterExample');
      // @ts-expect-error - TODO: Private access to \`AuroCounterGroup['dropdown']\`
      counterGroup?.dropdown?.hide();
    }
    return html\`
<div style="max-width: 350px;">
  <auro-counter-group
    id="dropdownCounterExample"
    isDropdown
    fullscreenBreakpoint="lg"
  >
    <span slot="label">Passengers</span>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="helpText">This is help text</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description"
        >Under 17 years old. Restrictions apply if traveling without an
        adult.</span
      >
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>

    <div
      slot="bib.fullscreen.footer"
      style="display:flex; justify-content: stretch; gap: 1.5rem"
    >
      <auro-button
        id="dropdownCounterExampleResetbutton"
        @click="\${handleResetClick}"
        fluid
        variant="secondary"
        style="flex: 1 50%"
        >Reset</auro-button
      >
      <auro-button
        id="dropdownCounterExampleSavebutton"
        @click="\${handleSaveClick}"
        fluid
        style="flex: 1 50%"
        >Save</auro-button
      >
    </div>
  </auro-counter-group>
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
}`,...(se=(ae=w.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var ue,ce,ie;y.parameters={...y.parameters,docs:{...(ue=y.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: () => html\`
<!-- Example of all counter properties -->
<auro-counter-group>
  <!-- Basic counter with min/max -->
  <auro-counter min="1" max="5" value="2">
    Min 1, Max 5
  </auro-counter>

  <!-- Disabled counter -->
  <auro-counter disabled value="0">
    Disabled counter
  </auro-counter>

</auro-counter-group>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(ie=(ce=y.parameters)==null?void 0:ce.docs)==null?void 0:ie.source}}};var le,pe,de;S.parameters={...S.parameters,docs:{...(le=S.parameters)==null?void 0:le.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter>
  Adults
  <span slot="description">18 years or older</span>
</auro-counter>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(de=(pe=S.parameters)==null?void 0:pe.docs)==null?void 0:de.source}}};var me,be,he;B.parameters={...B.parameters,docs:{...(me=B.parameters)==null?void 0:me.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter>
  Adults
</auro-counter>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(he=(be=B.parameters)==null?void 0:be.docs)==null?void 0:he.source}}};var ve,ge,xe;T.parameters={...T.parameters,docs:{...(ve=T.parameters)==null?void 0:ve.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter-group>
  <auro-counter>
    Short label
  </auro-counter>
  <auro-counter>
    Another short label
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
  </auro-counter>
</auro-counter-group>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(xe=(ge=T.parameters)==null?void 0:ge.docs)==null?void 0:xe.source}}};var fe,we,ye;C.parameters={...C.parameters,docs:{...(fe=C.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter disabled value="0">
  Disabled counter
  <span slot="description">This counter cannot be modified</span>
</auro-counter>
  \`
}`,...(ye=(we=C.parameters)==null?void 0:we.docs)==null?void 0:ye.source}}};var Se,Be,Te;D.parameters={...D.parameters,docs:{...(Se=D.parameters)==null?void 0:Se.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter-group>
  <auro-counter>
    Short label
    <span slot="description"
      >This is an example of a long sub label wrapping behavior</span
    >
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
    <span slot="description">with short sub label text</span>
  </auro-counter>
  <auro-counter>
    This is an example of the wrapping behavior for a long label
    <span slot="description"
      >Combined with an example of a long sub label wrapping behavior</span
    >
  </auro-counter>
</auro-counter-group>
  \`
}`,...(Te=(Be=D.parameters)==null?void 0:Be.docs)==null?void 0:Te.source}}};var Ce,De,Ee;E.parameters={...E.parameters,docs:{...(Ce=E.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter-group isDropdown>
  <div slot="bib.fullscreen.headline">Passengers</div>
  <div slot="label">Passengers</div>
  <auro-counter>
    Adults
    <span slot="description">18 years or older</span>
  </auro-counter>
  <auro-counter>
    Children
    <span slot="description">2-17 years</span>
  </auro-counter>
</auro-counter-group>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(Ee=(De=E.parameters)==null?void 0:De.docs)==null?void 0:Ee.source}}};var Pe,Ae,ke;P.parameters={...P.parameters,docs:{...(Pe=P.parameters)==null?void 0:Pe.docs,source:{originalSource:`{
  render: () => html\`
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="helpText">This is help text</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(ke=(Ae=P.parameters)==null?void 0:Ae.docs)==null?void 0:ke.source}}};var Ge,Me,Re;A.parameters={...A.parameters,docs:{...(Ge=A.parameters)==null?void 0:Ge.docs,source:{originalSource:`{
  render: () => html\`
<div style="max-width: 350px;">
  <auro-counter-group isDropdown>
    <span slot="bib.fullscreen.headline">Passengers</span>
    <div slot="label">Passengers</div>
    <auro-counter>
      Adults
      <span slot="description">18 years or older</span>
    </auro-counter>
    <auro-counter>
      Children
      <span slot="description">Under 17 years old. Restrictions apply if traveling without an adult.</span>
    </auro-counter>
    <auro-counter>
      Lap Infants
      <span slot="description">Under 2 years</span>
    </auro-counter>
  </auro-counter-group>
</div>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(Re=(Me=A.parameters)==null?void 0:Me.docs)==null?void 0:Re.source}}};var Oe,Ie,Ue;k.parameters={...k.parameters,docs:{...(Oe=k.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  render: () => html\`
<auro-counter-group max="4" min="1">
  <div slot="label">Room Occupants</div>
  <div slot="helpText">Total occupants must be between 1-4 people</div>
  <auro-counter>
    Adults
    <span slot="description">At least 1 adult required</span>
  </auro-counter>
  <auro-counter max="2">
    Children
    <span slot="description">Maximum 2 children per room</span>
  </auro-counter>
</auro-counter-group>
  \`,
  parameters: {
    chromatic: {
      disableSnapshot: true
    }
  }
}`,...(Ue=(Ie=k.parameters)==null?void 0:Ie.docs)==null?void 0:Ue.source}}};const He=["MinMax","Disabled","GroupProperties","Slots","SlotsOpen","Events","DropdownValueText","GroupMax","GroupCounterMax","DropdownMobileProperties","Properties","BasicDescription","BasicStandalone","Basic","CounterDisabled","Description","DropdownBasic","DropdownHelpText","Dropdown","Validation"],Ne=Object.freeze(Object.defineProperty({__proto__:null,Basic:T,BasicDescription:S,BasicStandalone:B,CounterDisabled:C,Description:D,Disabled:m,Dropdown:A,DropdownBasic:E,DropdownHelpText:P,DropdownMobileProperties:w,DropdownValueText:g,Events:v,GroupCounterMax:f,GroupMax:x,GroupProperties:b,MinMax:d,Properties:y,Slots:l,SlotsOpen:h,Validation:k,__namedExportsOrder:He,default:Ve},Symbol.toStringTag,{value:"Module"}));export{m as D,v as E,b as G,d as M,l as S,g as a,x as b,f as c,w as d,Ne as s};
