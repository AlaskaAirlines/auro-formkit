import { expect } from '@open-wc/testing';
import { createDisplayContext, applyKeyboardStrategy, navigateArrow } from '../src/keyboard.js';

// ─── createDisplayContext ─────────────────────────────────────────────────────

describe('createDisplayContext', () => {
  it('returns safe defaults when dropdown is null', () => {
    const ctx = createDisplayContext({ dropdown: null });

    expect(ctx.isExpanded).to.be.false;
    expect(ctx.isModal).to.be.false;
    expect(ctx.isPopover).to.be.true;
    expect(ctx.activeInput).to.be.null;
  });

  it('returns safe defaults when component has no dropdown property', () => {
    const ctx = createDisplayContext({});

    expect(ctx.isExpanded).to.be.false;
    expect(ctx.isModal).to.be.false;
    expect(ctx.isPopover).to.be.true;
    expect(ctx.activeInput).to.be.null;
  });

  it('options.dropdown overrides component.dropdown', () => {
    const override = { isPopoverVisible: true, isBibFullscreen: false };
    const ctx = createDisplayContext({ dropdown: null }, { dropdown: override });

    expect(ctx.isExpanded).to.be.true;
  });

  it('reflects open popover state (not fullscreen)', () => {
    const component = { dropdown: { isPopoverVisible: true, isBibFullscreen: false } };
    const ctx = createDisplayContext(component);

    expect(ctx.isExpanded).to.be.true;
    expect(ctx.isModal).to.be.false;
    expect(ctx.isPopover).to.be.true;
  });

  it('reflects open modal state (fullscreen)', () => {
    const component = { dropdown: { isPopoverVisible: true, isBibFullscreen: true } };
    const ctx = createDisplayContext(component);

    expect(ctx.isExpanded).to.be.true;
    expect(ctx.isModal).to.be.true;
    expect(ctx.isPopover).to.be.false;
  });

  it('isModal reflects fullscreen mode even when dropdown is closed', () => {
    const component = { dropdown: { isPopoverVisible: false, isBibFullscreen: true } };
    const ctx = createDisplayContext(component);

    expect(ctx.isExpanded).to.be.false;
    expect(ctx.isModal).to.be.true;
    expect(ctx.isPopover).to.be.false;
  });

  it('isExpanded coerces undefined isPopoverVisible to false', () => {
    const component = { dropdown: { isBibFullscreen: false } };
    const ctx = createDisplayContext(component);

    expect(ctx.isExpanded).to.be.false;
  });

  it('activeInput is set when inputResolver returns an HTMLElement', () => {
    const el = document.createElement('input');
    const ctx = createDisplayContext({}, { inputResolver: () => el });

    expect(ctx.activeInput).to.equal(el);
  });

  it('activeInput is null when inputResolver returns undefined', () => {
    const ctx = createDisplayContext({}, { inputResolver: () => undefined });

    expect(ctx.activeInput).to.be.null;
  });

  it('activeInput is null when inputResolver returns a plain object', () => {
    const ctx = createDisplayContext({}, { inputResolver: () => ({ value: 'x' }) });

    expect(ctx.activeInput).to.be.null;
  });

  it('activeInput is null when no inputResolver is provided', () => {
    const ctx = createDisplayContext({ dropdown: null });

    expect(ctx.activeInput).to.be.null;
  });

  it('inputResolver receives the component and a partial ctx with flags already set', () => {
    let capturedComp;
    let capturedCtx;
    const component = { dropdown: { isPopoverVisible: true, isBibFullscreen: false } };

    createDisplayContext(component, {
      inputResolver: (comp, ctx) => {
        capturedComp = comp;
        capturedCtx = ctx;
        return undefined;
      },
    });

    expect(capturedComp).to.equal(component);
    expect(capturedCtx.isExpanded).to.be.true;
    expect(capturedCtx.isModal).to.be.false;
    expect(capturedCtx.isPopover).to.be.true;
  });
});

// ─── applyKeyboardStrategy ────────────────────────────────────────────────────

describe('applyKeyboardStrategy', () => {
  it('calls the matching key handler with (component, evt, ctx)', async () => {
    const el = document.createElement('div');
    const calls = [];
    const strategy = {
      Enter: (comp, evt, ctx) => calls.push({ comp, evt, ctx }),
    };

    applyKeyboardStrategy(el, strategy);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await new Promise((r) => setTimeout(r));

    expect(calls.length).to.equal(1);
    expect(calls[0].comp).to.equal(el);
    expect(calls[0].evt.key).to.equal('Enter');
    expect(calls[0].ctx).to.have.property('isExpanded');
    expect(calls[0].ctx).to.have.property('isModal');
    expect(calls[0].ctx).to.have.property('isPopover');
    expect(calls[0].ctx).to.have.property('activeInput');
  });

  it('falls back to strategy.default when no matching key handler exists', async () => {
    const el = document.createElement('div');
    const calls = [];
    const strategy = {
      default: (comp, evt) => calls.push(evt.key),
    };

    applyKeyboardStrategy(el, strategy);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'x', bubbles: true }));
    await new Promise((r) => setTimeout(r));

    expect(calls).to.deep.equal(['x']);
  });

  it('does not throw when no key matches and no default is defined', async () => {
    const el = document.createElement('div');
    applyKeyboardStrategy(el, {});

    let thrown = false;
    try {
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await new Promise((r) => setTimeout(r));
    } catch {
      thrown = true;
    }

    expect(thrown).to.be.false;
  });

  it('awaits async handlers before resolving', async () => {
    const el = document.createElement('div');
    let flag = false;
    const strategy = {
      Enter: async () => {
        await Promise.resolve();
        flag = true;
      },
    };

    applyKeyboardStrategy(el, strategy);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await new Promise((r) => setTimeout(r, 10));

    expect(flag).to.be.true;
  });

  it('forwards options to createDisplayContext so inputResolver is honoured', async () => {
    const el = document.createElement('div');
    const resolvedEl = document.createElement('input');
    let capturedCtx;
    const strategy = {
      Enter: (comp, evt, ctx) => {
        capturedCtx = ctx;
      },
    };

    applyKeyboardStrategy(el, strategy, { inputResolver: () => resolvedEl });
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await new Promise((r) => setTimeout(r));

    expect(capturedCtx.activeInput).to.equal(resolvedEl);
  });
});

// ─── navigateArrow ────────────────────────────────────────────────────────────

describe('navigateArrow', () => {
  it('calls menu.navigateOptions(direction) when ctx.isExpanded is true', () => {
    const calls = [];
    const component = {
      menu: { navigateOptions: (d) => calls.push(d) },
      dropdown: { isPopoverVisible: true },
    };

    navigateArrow(component, 'down', { ctx: { isExpanded: true } });

    expect(calls).to.deep.equal(['down']);
  });

  it('calls navigateOptions with "up" direction', () => {
    const calls = [];
    const component = {
      menu: { navigateOptions: (d) => calls.push(d) },
      dropdown: { isPopoverVisible: true },
    };

    navigateArrow(component, 'up', { ctx: { isExpanded: true } });

    expect(calls).to.deep.equal(['up']);
  });

  it('calls showFn and skips navigation when ctx.isExpanded is false', () => {
    let shown = false;
    let navigated = false;
    const component = {
      menu: { navigateOptions: () => { navigated = true; } },
      dropdown: { isPopoverVisible: false },
    };

    navigateArrow(component, 'down', {
      ctx: { isExpanded: false },
      showFn: () => { shown = true; },
    });

    expect(shown).to.be.true;
    expect(navigated).to.be.false;
  });

  it('does nothing when closed and no showFn is provided', () => {
    let navigated = false;
    const component = {
      menu: { navigateOptions: () => { navigated = true; } },
      dropdown: { isPopoverVisible: false },
    };

    navigateArrow(component, 'down', { ctx: { isExpanded: false } });

    expect(navigated).to.be.false;
  });

  it('falls back to live dropdown read when no ctx is provided — open case', () => {
    const calls = [];
    const component = {
      menu: { navigateOptions: (d) => calls.push(d) },
      dropdown: { isPopoverVisible: true },
    };

    navigateArrow(component, 'up');

    expect(calls).to.deep.equal(['up']);
  });

  it('falls back to live dropdown read when no ctx is provided — closed case', () => {
    let navigated = false;
    const component = {
      menu: { navigateOptions: () => { navigated = true; } },
      dropdown: { isPopoverVisible: false },
    };

    navigateArrow(component, 'down');

    expect(navigated).to.be.false;
  });
});

