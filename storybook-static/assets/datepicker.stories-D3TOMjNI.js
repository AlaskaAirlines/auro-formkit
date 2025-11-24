var rn=Object.defineProperty;var nn=(s,t,e)=>t in s?rn(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var u=(s,t,e)=>nn(s,typeof t!="symbol"?t+"":t,e);import{a as Tr}from"./index-B-lxVbXh.js";import{u as se,w as Mr,e as be}from"./index-CeujA6c9.js";import{g as on}from"./_commonjsHelpers-gnU0ypJ3.js";import{u as yt}from"./index-DDrVoSdw.js";import{g as ln}from"./storybook-utils-BWaCeRRT.js";import{x as w,i as L,f as cn,u as dn,a as De}from"./lit-element-CzkqXGGu.js";import{A as bt,e as X,u as E,o as hn}from"./static-CzM4uoyW.js";import{A as un}from"./validation-DrYD_Tc9.js";import{A as Kt,f as Ft,a as pn}from"./version-CcLPgAjI.js";import{a as mn,A as fn}from"./index-B1GZsKVb.js";import{T as $r}from"./auro-button-CvWxpTkj-B19uADyS.js";import{A as gn}from"./index-CXFB-ZtJ.js";import{i as Yt}from"./i18n-CTuy9VQV.js";import{x as yn}from"./auro-icon-CNMF0wKG-vCjlPHA5.js";import"./registered-DrZ9fufq.js";var Ie={exports:{}},vn=Ie.exports,xa;function wn(){return xa||(xa=1,(function(s,t){(function(e,a){a(t)})(vn,(function(e){/*! *****************************************************************************
		    Copyright (c) Microsoft Corporation.

		    Permission to use, copy, modify, and/or distribute this software for any
		    purpose with or without fee is hereby granted.

		    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
		    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
		    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
		    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
		    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
		    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
		    PERFORMANCE OF THIS SOFTWARE.
		    ***************************************************************************** */var a=function(p,f){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(m,y){m.__proto__=y}||function(m,y){for(var v in y)Object.prototype.hasOwnProperty.call(y,v)&&(m[v]=y[v])},a(p,f)};function r(p,f){if(typeof f!="function"&&f!==null)throw new TypeError("Class extends value "+String(f)+" is not a constructor or null");a(p,f);function m(){this.constructor=p}p.prototype=f===null?Object.create(f):(m.prototype=f.prototype,new m)}var n=Date,i=null,o=(function(p){r(f,p);function f(m,y,v,D,T,S,k){p.call(this);var h;switch(arguments.length){case 0:i!==null?h=new n(i.valueOf()):h=new n;break;case 1:h=new n(m);break;default:v=typeof v>"u"?1:v,D=D||0,T=T||0,S=S||0,k=k||0,h=new n(m,y,v,D,T,S,k);break}return h}return f})(n);o.prototype=n.prototype,o.UTC=n.UTC,o.now=function(){return new o().valueOf()},o.parse=function(p){return n.parse(p)},o.toString=function(){return n.toString()};function l(p){var f=new Date(p.valueOf());if(isNaN(f.getTime()))throw new TypeError("mockdate: The time set is an invalid date: "+p);Date=o,i=f.valueOf()}function d(){Date=n}var c={set:l,reset:d};e.default=c,e.reset=d,e.set=l,Object.defineProperty(e,"__esModule",{value:!0})}))})(Ie,Ie.exports)),Ie.exports}var bn=wn();const $e=on(bn);class Ht{validDateStr(t,e){return!!(e!==void 0&&t!==void 0&&t.length===10&&Date.parse(this.toNorthAmericanFormat(t,e)))}toNorthAmericanFormat(t,e){if(e==="mm/dd/yyyy")return t;const a=this.parseDate(t,e);if(!a)return a;const{month:r,day:n,year:i}=a,o=[];return r&&o.push(r),n&&o.push(n),i&&o.push(i),o.join("/")}parseDate(t,e){if(!t)return;const a=e||"mm/dd/yyyy",r={yyyy:"(?<year>\\d{4})",mm:"(?<month>\\d{2})",dd:"(?<day>\\d{2})"};let n=a.replace(/(?:yyyy|mm|dd)/gu,l=>r[l]);n=`^${n}$`;const i=new RegExp(n,"u"),o=t.match(i);if(o&&o.groups)return{year:o.groups.year,month:o.groups.month,day:o.groups.day}}toCustomFormat(t,e){const[a,r,n]=t.split("/");if(!a||!r||!n)return;let i=e;return i=i.replace("mm",a).replace("dd",r).replace("yyyy",n),i}convertDateToFirstOfMonth(t){const e=new Date(t);return new Date(e.getFullYear(),e.getMonth(),1)}monthDiff(t,e){let a=0;return a=(e.getFullYear()-t.getFullYear())*12,a-=t.getMonth(),a+=e.getMonth(),a+=1,a<=0?0:a}getDateAsString(t){const e=new Date(t).getFullYear(),a=this.formatTwoDigits(new Date(t).getMonth()+1),r=this.formatTwoDigits(new Date(t).getDate());return`${a}/${r}/${e}`}formatTwoDigits(t){return t<10?`0${t}`:t}generateIconHtml(t){return this.dom=new DOMParser().parseFromString(t.svg,"text/html"),this.svg=this.dom.body.firstChild,this.svg}datesMatch(t,e){return new Date(t).getTime()===new Date(e).getTime()}}class Er{constructor(){this.util=new Ht}updateCentralDate(t,e){const a=new Date(e);isNaN(a)||(t.centralDate=a)}determineDefinedCalendarRange(t){return t.getAttribute("calendarStartDate")&&t.getAttribute("calendarEndDate")?t.calendarRangeMonths=t.util.monthDiff(new Date(t.getAttribute("calendarStartDate")),new Date(t.getAttribute("calendarEndDate"))):t.calendarRangeMonths=void 0,t.calendarRangeMonths}maximumRenderableMonths(t,e){const a=this.determineDefinedCalendarRange(t);let r=1;return t.noRange||(r=2),e&&(r=a||12),a&&a<r&&(r=a),r}determineNumCalendarsToRender(t,e){const a=this.maximumRenderableMonths(t,e);let r=a;if(!r&&t.minDate&&t.maxDate){const n=this.util.monthDiff(new Date(t.minDate),new Date(t.maxDate));n<a&&(r=n)}t.numCalendars!==r&&(t.numCalendars=r,t.requestUpdate())}setFirstRenderableMonthDate(t){const e=t.getAttribute("calendarStartDate"),a=t.getAttribute("minDate");let r=new Date;e?r=new Date(e):a&&(r=new Date(a)),t.firstMonthRenderable=t.util.convertDateToFirstOfMonth(r)}renderCalendar(t,e,a){return w`
      <auro-formkit-calendar-month
        id="${`month-${e}-${a}`}"
        .disabledDays="${t.disabledDays}"
        .min="${t.min}"
        .max="${t.max}"
        ?noRange="${t.noRange}"
        .monthFirst="${t.monthFirst}"
        .hoveredDate="${t.hoveredDate}"
        .dateTo="${t.dateTo}"
        .dateFrom="${t.dateFrom}"
        .locale="${t.locale}"
        .monthNames="${t.monthNames}"
        month="${e}"
        year="${a}"
        @hovered-date-changed="${t.hoveredDateChanged}"
        @date-from-changed="${t.dateFromChanged}"
        @date-to-changed="${t.dateToChanged}"
      >
      </auro-formkit-calendar-month>
    `}}const xn=L`.util_displayInline{display:inline}.util_displayInlineBlock{display:inline-block}.util_displayBlock{display:block}.util_displayFlex{display:flex}.util_displayHidden{display:none}.util_displayHiddenVisually{position:absolute;overflow:hidden;clip:rect(1px, 1px, 1px, 1px);width:1px;height:1px;padding:0;border:0}.body-default{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-default-font-size, 1rem);line-height:var(--wcss-body-default-line-height, 1.5rem)}.body-lg{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-lg-font-size, 1.125rem);line-height:var(--wcss-body-lg-line-height, 1.625rem)}.body-sm{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-sm-font-size, 0.875rem);line-height:var(--wcss-body-sm-line-height, 1.25rem)}.body-xs{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-xs-font-size, 0.75rem);line-height:var(--wcss-body-xs-line-height, 1rem)}.body-2xs{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-2xs-font-size, 0.625rem);line-height:var(--wcss-body-2xs-line-height, 0.875rem)}.display-2xl{font-family:var(--wcss-display-2xl-family, "AS Circular"),var(--wcss-display-2xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-2xl-letter-spacing, 0);font-weight:var(--wcss-display-2xl-weight, 300);line-height:var(--wcss-display-2xl-line-height, 1.3);font-size:var(--wcss-display-2xl-font-size, clamp(3.5rem, 6vw, 5.375rem))}.display-xl{font-family:var(--wcss-display-xl-family, "AS Circular"),var(--wcss-display-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-xl-letter-spacing, 0);font-weight:var(--wcss-display-xl-weight, 300);line-height:var(--wcss-display-xl-line-height, 1.3);font-size:var(--wcss-display-xl-font-size, clamp(3rem, 5.3333333333vw, 4.5rem))}.display-lg{font-family:var(--wcss-display-lg-family, "AS Circular"),var(--wcss-display-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-lg-letter-spacing, 0);font-weight:var(--wcss-display-lg-weight, 300);line-height:var(--wcss-display-lg-line-height, 1.3);font-size:var(--wcss-display-lg-font-size, clamp(2.75rem, 4.6666666667vw, 4rem))}.display-md{font-family:var(--wcss-display-md-family, "AS Circular"),var(--wcss-display-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-md-letter-spacing, 0);font-weight:var(--wcss-display-md-weight, 300);line-height:var(--wcss-display-md-line-height, 1.3);font-size:var(--wcss-display-md-font-size, clamp(2.5rem, 4vw, 3.5rem))}.display-sm{font-family:var(--wcss-display-sm-family, "AS Circular"),var(--wcss-display-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-sm-letter-spacing, 0);font-weight:var(--wcss-display-sm-weight, 300);line-height:var(--wcss-display-sm-line-height, 1.3);font-size:var(--wcss-display-sm-font-size, clamp(2rem, 3.6666666667vw, 3rem))}.display-xs{font-family:var(--wcss-display-xs-family, "AS Circular"),var(--wcss-display-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-xs-letter-spacing, 0);font-weight:var(--wcss-display-xs-weight, 300);line-height:var(--wcss-display-xs-line-height, 1.3);font-size:var(--wcss-display-xs-font-size, clamp(1.75rem, 3vw, 2.375rem))}.heading-xl{font-family:var(--wcss-heading-xl-family, "AS Circular"),var(--wcss-heading-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-xl-letter-spacing, 0);font-weight:var(--wcss-heading-xl-weight, 300);line-height:var(--wcss-heading-xl-line-height, 1.3);font-size:var(--wcss-heading-xl-font-size, clamp(2rem, 3vw, 2.5rem))}.heading-lg{font-family:var(--wcss-heading-lg-family, "AS Circular"),var(--wcss-heading-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-lg-letter-spacing, 0);font-weight:var(--wcss-heading-lg-weight, 300);line-height:var(--wcss-heading-lg-line-height, 1.3);font-size:var(--wcss-heading-lg-font-size, clamp(1.75rem, 2.6666666667vw, 2.25rem))}.heading-md{font-family:var(--wcss-heading-md-family, "AS Circular"),var(--wcss-heading-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-md-letter-spacing, 0);font-weight:var(--wcss-heading-md-weight, 300);line-height:var(--wcss-heading-md-line-height, 1.3);font-size:var(--wcss-heading-md-font-size, clamp(1.625rem, 2.3333333333vw, 1.75rem))}.heading-sm{font-family:var(--wcss-heading-sm-family, "AS Circular"),var(--wcss-heading-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-sm-letter-spacing, 0);font-weight:var(--wcss-heading-sm-weight, 300);line-height:var(--wcss-heading-sm-line-height, 1.3);font-size:var(--wcss-heading-sm-font-size, clamp(1.375rem, 2vw, 1.5rem))}.heading-xs{font-family:var(--wcss-heading-xs-family, "AS Circular"),var(--wcss-heading-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-xs-letter-spacing, 0);font-weight:var(--wcss-heading-xs-weight, 450);line-height:var(--wcss-heading-xs-line-height, 1.3);font-size:var(--wcss-heading-xs-font-size, clamp(1.25rem, 1.6666666667vw, 1.25rem))}.heading-2xs{font-family:var(--wcss-heading-2xs-family, "AS Circular"),var(--wcss-heading-2xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-2xs-letter-spacing, 0);font-weight:var(--wcss-heading-2xs-weight, 450);line-height:var(--wcss-heading-2xs-line-height, 1.3);font-size:var(--wcss-heading-2xs-font-size, clamp(1.125rem, 1.5vw, 1.125rem))}.accent-2xl{font-family:var(--wcss-accent-2xl-family, "Good OT"),var(--wcss-accent-2xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-2xl-letter-spacing, 0.05em);font-weight:var(--wcss-accent-2xl-weight, 450);line-height:var(--wcss-accent-2xl-line-height, 1);font-size:var(--wcss-accent-2xl-font-size, clamp(2rem, 3.1666666667vw, 2.375rem));text-transform:uppercase}.accent-xl{font-family:var(--wcss-accent-xl-family, "Good OT"),var(--wcss-accent-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-xl-letter-spacing, 0.05em);font-weight:var(--wcss-accent-xl-weight, 450);line-height:var(--wcss-accent-xl-line-height, 1.3);font-size:var(--wcss-accent-xl-font-size, clamp(1.625rem, 2.3333333333vw, 2rem));text-transform:uppercase}.accent-lg{font-family:var(--wcss-accent-lg-family, "Good OT"),var(--wcss-accent-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-lg-letter-spacing, 0.05em);font-weight:var(--wcss-accent-lg-weight, 450);line-height:var(--wcss-accent-lg-line-height, 1.3);font-size:var(--wcss-accent-lg-font-size, clamp(1.5rem, 2.1666666667vw, 1.75rem));text-transform:uppercase}.accent-md{font-family:var(--wcss-accent-md-family, "Good OT"),var(--wcss-accent-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-md-letter-spacing, 0.05em);font-weight:var(--wcss-accent-md-weight, 500);line-height:var(--wcss-accent-md-line-height, 1.3);font-size:var(--wcss-accent-md-font-size, clamp(1.375rem, 1.8333333333vw, 1.5rem));text-transform:uppercase}.accent-sm{font-family:var(--wcss-accent-sm-family, "Good OT"),var(--wcss-accent-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-sm-letter-spacing, 0.05em);font-weight:var(--wcss-accent-sm-weight, 500);line-height:var(--wcss-accent-sm-line-height, 1.3);font-size:var(--wcss-accent-sm-font-size, clamp(1.125rem, 1.5vw, 1.25rem));text-transform:uppercase}.accent-xs{font-family:var(--wcss-accent-xs-family, "Good OT"),var(--wcss-accent-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-xs-letter-spacing, 0.1em);font-weight:var(--wcss-accent-xs-weight, 500);line-height:var(--wcss-accent-xs-line-height, 1.3);font-size:var(--wcss-accent-xs-font-size, clamp(1rem, 1.3333333333vw, 1rem));text-transform:uppercase}.accent-2xs{font-family:var(--wcss-accent-2xs-family, "Good OT"),var(--wcss-accent-2xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-2xs-letter-spacing, 0.1em);font-weight:var(--wcss-accent-2xs-weight, 450);line-height:var(--wcss-accent-2xs-line-height, 1.3);font-size:var(--wcss-accent-2xs-font-size, clamp(0.875rem, 1.1666666667vw, 0.875rem));text-transform:uppercase}.accents{flex-grow:0;flex-shrink:0;display:flex;align-items:center;justify-content:center}.accents.left{padding-right:var(--ds-size-100, 0.5rem)}.accents.right{width:var(--ds-size-400, 2rem)}.accents .notification:not(.util_displayHidden){display:flex;align-items:center;justify-content:center}.mainContent{height:100%;max-height:100%;flex-grow:1;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden}.inputSection{display:flex;flex-direction:row;align-items:center;width:100%;margin:0 auto}.inputContainer{display:flex;flex-direction:row;align-items:center;width:100%}.inputContainer:first-of-type{justify-content:flex-end}.inputContainer:last-of-type{justify-content:flex-start}.dpTriggerContent{width:100%}.wrapper:not(:focus-within):not(:hover) .notification.clear{display:none}@media screen and (max-width: 576px){::part(popover){position:fixed !important;top:0 !important;left:0 !important;width:100vw !important;height:100vh !important;margin-bottom:var(--ds-size-200, 1rem);transform:unset !important}.calendarWrapper{display:flex;height:100dvh;flex-direction:row;justify-content:center}}`,kn=L`.util_displayInline{display:inline}.util_displayInlineBlock{display:inline-block}.util_displayBlock{display:block}.util_displayFlex{display:flex}.util_displayHidden{display:none}.util_displayHiddenVisually{position:absolute;overflow:hidden;clip:rect(1px, 1px, 1px, 1px);width:1px;height:1px;padding:0;border:0}:host label{color:var(--ds-auro-datepicker-label-text-color)}:host .inputDivider{background-color:var(--ds-auro-datepicker-range-input-divider-color)}:host .error{color:var(--ds-auro-datepicker-error-icon-color)}[auro-dropdown]{--ds-auro-dropdown-trigger-outline-color: var(--ds-auro-datepicker-outline-color)}[auro-input]::part(wrapper){--ds-auro-input-border-color: transparent;--ds-auro-input-container-color: transparent}.dpTriggerContent [auro-input]:nth-child(2):before{background-color:var(--ds-auro-datepicker-range-input-divider-color)}:host(:not([ondark])[disabled]),:host(:not([appearance=inverse])[disabled]){--ds-auro-datepicker-border-color: var(--ds-basic-color-border-subtle, #dddddd);--ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-disabled, #d0d0d0);--ds-auro-datepicker-placeholder-text-color: var(--ds-basic-color-texticon-disabled, #d0d0d0)}:host([ondark][disabled]),:host([appearance=inverse][disabled]){--ds-auro-datepicker-border-color: var(--ds-advanced-color-button-primary-border-inverse-disabled, rgba(255, 255, 255, 0.75));--ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-inverse-disabled, #7e8894);--ds-auro-datepicker-placeholder-text-color: var(--ds-basic-color-texticon-inverse-disabled, #7e8894)}:host(:not([ondark]):is([validity]:not([validity=valid]))),:host(:not([appearance=inverse]):is([validity]:not([validity=valid]))){--ds-auro-datepicker-outline-color: var(--ds-basic-color-status-error, #e31f26)}:host([ondark]:is([validity]:not([validity=valid]))),:host([appearance=inverse]:is([validity]:not([validity=valid]))){--ds-auro-datepicker-outline-color: var(--ds-advanced-color-state-error-inverse, #f9a4a8)}`,Pt=L`:host(:not([ondark])),:host(:not([appearance=inverse])){--ds-auro-datepicker-range-input-divider-color: var(--ds-basic-color-border-bold, #585e67);--ds-auro-datepicker-error-icon-color: var(--ds-basic-color-status-error, #e31f26);--ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-muted, #676767);--ds-auro-datepicker-outline-color: transparent;--ds-auro-calendar-mobile-header-container-color: var(--ds-basic-color-surface-default, #ffffff);--ds-auro-calendar-mobile-header-divider-color: var(--ds-basic-color-border-divider, rgba(0, 0, 0, 0.15));--ds-auro-calendar-mobile-header-text-color: var(--ds-basic-color-texticon-muted, #676767);--ds-auro-calendar-nav-btn-border-color: transparent;--ds-auro-calendar-nav-btn-chevron-color: var(--ds-basic-color-brand-primary, #01426a);--ds-auro-calendar-nav-btn-container-color: transparent;--ds-auro-calendar-month-container-color: var(--ds-basic-color-surface-default, #ffffff);--ds-auro-calendar-month-divider-color: var(--ds-basic-color-border-divider, rgba(0, 0, 0, 0.15));--ds-auro-calendar-month-header-color: var(--ds-basic-color-texticon-default, #2a2a2a);--ds-auro-calendar-cell-border-color: transparent;--ds-auro-calendar-cell-container-color: transparent;--ds-auro-calendar-cell-in-range-color: var(--ds-advanced-color-shared-background-muted, #f7f7f7);--ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-default, #2a2a2a);--ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-default, #2a2a2a)}:host([ondark]),:host([appearance=inverse]){--ds-auro-datepicker-range-input-divider-color: var(--ds-basic-color-texticon-inverse-muted, #ccd2db);--ds-auro-datepicker-error-icon-color: var(--ds-advanced-color-state-error-inverse, #f9a4a8);--ds-auro-datepicker-label-text-color: var(--ds-basic-color-texticon-inverse-muted, #ccd2db);--ds-auro-datepicker-outline-color: transparent;--ds-auro-calendar-mobile-header-container-color: var(--ds-basic-color-surface-default, #ffffff);--ds-auro-calendar-mobile-header-divider-color: var(--ds-basic-color-border-divider, rgba(0, 0, 0, 0.15));--ds-auro-calendar-mobile-header-text-color: var(--ds-basic-color-texticon-muted, #676767);--ds-auro-calendar-nav-btn-border-color: transparent;--ds-auro-calendar-nav-btn-chevron-color: var(--ds-basic-color-brand-primary, #01426a);--ds-auro-calendar-nav-btn-container-color: transparent;--ds-auro-calendar-month-container-color: var(--ds-basic-color-surface-default, #ffffff);--ds-auro-calendar-month-divider-color: var(--ds-basic-color-border-divider, rgba(0, 0, 0, 0.15));--ds-auro-calendar-month-header-color: var(--ds-basic-color-texticon-default, #2a2a2a);--ds-auro-calendar-cell-border-color: transparent;--ds-auro-calendar-cell-container-color: transparent;--ds-auro-calendar-cell-in-range-color: var(--ds-advanced-color-shared-background-muted, #f7f7f7);--ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-default, #2a2a2a);--ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-default, #2a2a2a)}`,Dn=L`.shape-classic-xl,.shape-classic-lg,.shape-classic-md,.shape-classic-sm,.shape-classic-xs{min-height:56px;max-height:56px;border-style:solid;border-width:1px;border-radius:var(--ds-border-radius, 0.375rem)}.shape-classic-xl.simple,.shape-classic-lg.simple,.shape-classic-md.simple,.shape-classic-sm.simple,.shape-classic-xs.simple{border-width:0px;min-height:58px;max-height:58px;background-color:unset;box-shadow:none}.shape-classic-xl.thin,.shape-classic-lg.thin,.shape-classic-md.thin,.shape-classic-sm.thin,.shape-classic-xs.thin{border-width:1px;min-height:56px;max-height:56px;background-color:unset}.shape-classic-xl.parentBorder,.shape-classic-lg.parentBorder,.shape-classic-md.parentBorder,.shape-classic-sm.parentBorder,.shape-classic-xs.parentBorder{border:0;box-shadow:unset;min-height:54px;max-height:54px}.shape-snowflake-xl,.shape-snowflake-lg,.shape-snowflake-md,.shape-snowflake-sm,.shape-snowflake-xs{min-height:56px;max-height:56px;border-style:solid;border-width:2px;border-color:transparent;border-radius:30px}.shape-snowflake-xl.simple,.shape-snowflake-lg.simple,.shape-snowflake-md.simple,.shape-snowflake-sm.simple,.shape-snowflake-xs.simple{border-width:0px;min-height:60px;max-height:60px;background-color:unset;box-shadow:none}.shape-snowflake-xl.thin,.shape-snowflake-lg.thin,.shape-snowflake-md.thin,.shape-snowflake-sm.thin,.shape-snowflake-xs.thin{border-width:1px;min-height:58px;max-height:58px;background-color:unset}.shape-snowflake-xl.parentBorder,.shape-snowflake-lg.parentBorder,.shape-snowflake-md.parentBorder,.shape-snowflake-sm.parentBorder,.shape-snowflake-xs.parentBorder{border:0;box-shadow:unset;min-height:56px;max-height:56px}.shape-box-xl{min-height:68px;max-height:68px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-xl.simple{border-width:0px;min-height:72px;max-height:72px;background-color:unset;box-shadow:none}.shape-box-xl.thin{border-width:1px;min-height:70px;max-height:70px;background-color:unset}.shape-box-xl.parentBorder{border:0;box-shadow:unset;min-height:68px;max-height:68px}.shape-box-lg{min-height:52px;max-height:52px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-lg.simple{border-width:0px;min-height:56px;max-height:56px;background-color:unset;box-shadow:none}.shape-box-lg.thin{border-width:1px;min-height:54px;max-height:54px;background-color:unset}.shape-box-lg.parentBorder{border:0;box-shadow:unset;min-height:52px;max-height:52px}.shape-box-md{min-height:44px;max-height:44px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-md.simple{border-width:0px;min-height:48px;max-height:48px;background-color:unset;box-shadow:none}.shape-box-md.thin{border-width:1px;min-height:46px;max-height:46px;background-color:unset}.shape-box-md.parentBorder{border:0;box-shadow:unset;min-height:44px;max-height:44px}.shape-box-sm{min-height:32px;max-height:32px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-sm.simple{border-width:0px;min-height:36px;max-height:36px;background-color:unset;box-shadow:none}.shape-box-sm.thin{border-width:1px;min-height:34px;max-height:34px;background-color:unset}.shape-box-sm.parentBorder{border:0;box-shadow:unset;min-height:32px;max-height:32px}.shape-box-xs{min-height:20px;max-height:20px;border-style:solid;border-width:2px;border-color:transparent}.shape-box-xs.simple{border-width:0px;min-height:24px;max-height:24px;background-color:unset;box-shadow:none}.shape-box-xs.thin{border-width:1px;min-height:22px;max-height:22px;background-color:unset}.shape-box-xs.parentBorder{border:0;box-shadow:unset;min-height:20px;max-height:20px}.shape-rounded-lg{min-height:56px;max-height:56px;border-style:solid;border-width:2px;border-color:transparent;border-radius:6px}.shape-rounded-lg.simple{border-width:0px;min-height:56px;max-height:56px;background-color:unset;box-shadow:none}.shape-rounded-lg.thin{border-width:1px;min-height:54px;max-height:54px;background-color:unset}.shape-rounded-lg.parentBorder{border:0;box-shadow:unset;min-height:52px;max-height:52px}.shape-pill-xl{min-height:68px;max-height:68px;border-style:solid;border-width:2px;border-color:transparent;border-radius:36px}.shape-pill-xl.simple{border-width:0px;min-height:72px;max-height:72px;background-color:unset;box-shadow:none}.shape-pill-xl.thin{border-width:1px;min-height:70px;max-height:70px;background-color:unset}.shape-pill-xl.parentBorder{border:0;box-shadow:unset;min-height:68px;max-height:68px}.shape-pill-left-xl{min-height:68px;max-height:68px;border-style:solid;border-width:2px;border-color:transparent;border-radius:36px 0 0 36px}.shape-pill-left-xl.simple{border-width:0px;min-height:72px;max-height:72px;background-color:unset;box-shadow:none}.shape-pill-left-xl.thin{border-width:1px;min-height:70px;max-height:70px;background-color:unset}.shape-pill-left-xl.parentBorder{border:0;box-shadow:unset;min-height:68px;max-height:68px}.shape-pill-right-xl{min-height:68px;max-height:68px;border-style:solid;border-width:2px;border-color:transparent;border-radius:0 36px 36px 0}.shape-pill-right-xl.simple{border-width:0px;min-height:72px;max-height:72px;background-color:unset;box-shadow:none}.shape-pill-right-xl.thin{border-width:1px;min-height:70px;max-height:70px;background-color:unset}.shape-pill-right-xl.parentBorder{border:0;box-shadow:unset;min-height:68px;max-height:68px}.shape-pill-md{min-height:44px;max-height:44px;border-style:solid;border-width:2px;border-color:transparent;border-radius:36px}.shape-pill-md.simple{border-width:0px;min-height:48px;max-height:48px;background-color:unset;box-shadow:none}.shape-pill-md.thin{border-width:1px;min-height:46px;max-height:46px;background-color:unset}.shape-pill-md.parentBorder{border:0;box-shadow:unset;min-height:44px;max-height:44px}.shape-pill-left-md{min-height:44px;max-height:44px;border-style:solid;border-width:2px;border-color:transparent;border-radius:36px 0 0 36px}.shape-pill-left-md.simple{border-width:0px;min-height:48px;max-height:48px;background-color:unset;box-shadow:none}.shape-pill-left-md.thin{border-width:1px;min-height:46px;max-height:46px;background-color:unset}.shape-pill-left-md.parentBorder{border:0;box-shadow:unset;min-height:44px;max-height:44px}.shape-pill-right-md{min-height:44px;max-height:44px;border-style:solid;border-width:2px;border-color:transparent;border-radius:0 36px 36px 0}.shape-pill-right-md.simple{border-width:0px;min-height:48px;max-height:48px;background-color:unset;box-shadow:none}.shape-pill-right-md.thin{border-width:1px;min-height:46px;max-height:46px;background-color:unset}.shape-pill-right-md.parentBorder{border:0;box-shadow:unset;min-height:44px;max-height:44px}`,Sn=L`.util_displayInline{display:inline}.util_displayInlineBlock{display:inline-block}.util_displayBlock{display:block}.util_displayFlex{display:flex}.util_displayHidden{display:none}.util_displayHiddenVisually{position:absolute;overflow:hidden;clip:rect(1px, 1px, 1px, 1px);width:1px;height:1px;padding:0;border:0}:host([layout*=classic]) .accents{display:none}:host([layout*=classic]) [auro-input]{width:100%}:host([layout*=classic]) [auro-input]::part(helpText){display:none}:host([layout*=classic]) [auro-input]::part(wrapper){border-width:0;box-shadow:none}:host([layout*=classic]) [auro-input].dateTo{margin-left:var(--ds-size-150, 0.75rem)}:host([layout*=classic]) [auro-input].dateTo::part(accent-left){display:none}:host([layout*=classic]) .inputDivider{width:1px;height:2rem}`,Cn=L``,Tn=L`:host([layout*=snowflake]) [auro-input]{flex:1;text-align:center}:host([layout*=snowflake]) [auro-input]::part(label),:host([layout*=snowflake]) [auro-input]::part(accent-left),:host([layout*=snowflake]) [auro-input]::part(accent-right){display:none}:host([layout*=snowflake]) [auro-input]::part(input){padding-bottom:unset;text-align:center;transition:unset}:host([layout*=snowflake]) [auro-input]::part(wrapper){min-height:unset;max-height:unset;box-shadow:unset;border-radius:unset}:host([layout*=snowflake]) [auro-input]::part(wrapper) .mainContent{padding-bottom:unset}:host([layout*=snowflake]) [auro-input]::part(inputHelpText){display:none}:host([layout*=snowflake]) [auro-input]::part(displayValue){justify-content:center}:host([layout*=snowflake])::part(helpText){text-align:center}:host([layout*=snowflake]) .dpTriggerContent{width:100%}:host([layout*=snowflake]) .wrapper{width:calc(100% - var(--ds-size-400, 2rem));display:flex;flex-direction:row;justify-content:space-between;padding-inline:var(--ds-size-200, 1rem)}:host([layout*=snowflake]) .mainLabel{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:flex;align-items:center}:host([layout*=snowflake]) .mainLabel:is(.hasFocus,.hasValue){padding-block-start:var(--ds-size-75, 0.375rem)}:host([layout*=snowflake]) .inputDivider{height:calc(var(--ds-size-200, 1rem) + var(--ds-size-25, 0.125rem));margin:var(--ds-size-50, 0.25rem) var(--ds-size-75, 0.375rem);width:var(--ds-size-25, 0.125rem)}:host([layout*=snowflake]) .inputSection:not(:is(.disabled,.hasFocus,.hasValue)) .inputDivider{display:none}:host([layout*=snowflake][disabled]){pointer-events:none}`,Mn=L`:host([layout=snowflake]) [auro-dropdown]:not(:is([error],.hasFocus)){--ds-auro-dropdown-trigger-border-color: transparent}`,$n=L`.body-default{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-default-font-size, 1rem);line-height:var(--wcss-body-default-line-height, 1.5rem)}.body-lg{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-lg-font-size, 1.125rem);line-height:var(--wcss-body-lg-line-height, 1.625rem)}.body-sm{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-sm-font-size, 0.875rem);line-height:var(--wcss-body-sm-line-height, 1.25rem)}.body-xs{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-xs-font-size, 0.75rem);line-height:var(--wcss-body-xs-line-height, 1rem)}.body-2xs{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-2xs-font-size, 0.625rem);line-height:var(--wcss-body-2xs-line-height, 0.875rem)}.display-2xl{font-family:var(--wcss-display-2xl-family, "AS Circular"),var(--wcss-display-2xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-2xl-letter-spacing, 0);font-weight:var(--wcss-display-2xl-weight, 300);line-height:var(--wcss-display-2xl-line-height, 1.3);font-size:var(--wcss-display-2xl-font-size, clamp(3.5rem, 6vw, 5.375rem))}.display-xl{font-family:var(--wcss-display-xl-family, "AS Circular"),var(--wcss-display-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-xl-letter-spacing, 0);font-weight:var(--wcss-display-xl-weight, 300);line-height:var(--wcss-display-xl-line-height, 1.3);font-size:var(--wcss-display-xl-font-size, clamp(3rem, 5.3333333333vw, 4.5rem))}.display-lg{font-family:var(--wcss-display-lg-family, "AS Circular"),var(--wcss-display-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-lg-letter-spacing, 0);font-weight:var(--wcss-display-lg-weight, 300);line-height:var(--wcss-display-lg-line-height, 1.3);font-size:var(--wcss-display-lg-font-size, clamp(2.75rem, 4.6666666667vw, 4rem))}.display-md{font-family:var(--wcss-display-md-family, "AS Circular"),var(--wcss-display-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-md-letter-spacing, 0);font-weight:var(--wcss-display-md-weight, 300);line-height:var(--wcss-display-md-line-height, 1.3);font-size:var(--wcss-display-md-font-size, clamp(2.5rem, 4vw, 3.5rem))}.display-sm{font-family:var(--wcss-display-sm-family, "AS Circular"),var(--wcss-display-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-sm-letter-spacing, 0);font-weight:var(--wcss-display-sm-weight, 300);line-height:var(--wcss-display-sm-line-height, 1.3);font-size:var(--wcss-display-sm-font-size, clamp(2rem, 3.6666666667vw, 3rem))}.display-xs{font-family:var(--wcss-display-xs-family, "AS Circular"),var(--wcss-display-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-xs-letter-spacing, 0);font-weight:var(--wcss-display-xs-weight, 300);line-height:var(--wcss-display-xs-line-height, 1.3);font-size:var(--wcss-display-xs-font-size, clamp(1.75rem, 3vw, 2.375rem))}.heading-xl{font-family:var(--wcss-heading-xl-family, "AS Circular"),var(--wcss-heading-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-xl-letter-spacing, 0);font-weight:var(--wcss-heading-xl-weight, 300);line-height:var(--wcss-heading-xl-line-height, 1.3);font-size:var(--wcss-heading-xl-font-size, clamp(2rem, 3vw, 2.5rem))}.heading-lg{font-family:var(--wcss-heading-lg-family, "AS Circular"),var(--wcss-heading-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-lg-letter-spacing, 0);font-weight:var(--wcss-heading-lg-weight, 300);line-height:var(--wcss-heading-lg-line-height, 1.3);font-size:var(--wcss-heading-lg-font-size, clamp(1.75rem, 2.6666666667vw, 2.25rem))}.heading-md{font-family:var(--wcss-heading-md-family, "AS Circular"),var(--wcss-heading-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-md-letter-spacing, 0);font-weight:var(--wcss-heading-md-weight, 300);line-height:var(--wcss-heading-md-line-height, 1.3);font-size:var(--wcss-heading-md-font-size, clamp(1.625rem, 2.3333333333vw, 1.75rem))}.heading-sm{font-family:var(--wcss-heading-sm-family, "AS Circular"),var(--wcss-heading-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-sm-letter-spacing, 0);font-weight:var(--wcss-heading-sm-weight, 300);line-height:var(--wcss-heading-sm-line-height, 1.3);font-size:var(--wcss-heading-sm-font-size, clamp(1.375rem, 2vw, 1.5rem))}.heading-xs{font-family:var(--wcss-heading-xs-family, "AS Circular"),var(--wcss-heading-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-xs-letter-spacing, 0);font-weight:var(--wcss-heading-xs-weight, 450);line-height:var(--wcss-heading-xs-line-height, 1.3);font-size:var(--wcss-heading-xs-font-size, clamp(1.25rem, 1.6666666667vw, 1.25rem))}.heading-2xs{font-family:var(--wcss-heading-2xs-family, "AS Circular"),var(--wcss-heading-2xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-2xs-letter-spacing, 0);font-weight:var(--wcss-heading-2xs-weight, 450);line-height:var(--wcss-heading-2xs-line-height, 1.3);font-size:var(--wcss-heading-2xs-font-size, clamp(1.125rem, 1.5vw, 1.125rem))}.accent-2xl{font-family:var(--wcss-accent-2xl-family, "Good OT"),var(--wcss-accent-2xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-2xl-letter-spacing, 0.05em);font-weight:var(--wcss-accent-2xl-weight, 450);line-height:var(--wcss-accent-2xl-line-height, 1);font-size:var(--wcss-accent-2xl-font-size, clamp(2rem, 3.1666666667vw, 2.375rem));text-transform:uppercase}.accent-xl{font-family:var(--wcss-accent-xl-family, "Good OT"),var(--wcss-accent-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-xl-letter-spacing, 0.05em);font-weight:var(--wcss-accent-xl-weight, 450);line-height:var(--wcss-accent-xl-line-height, 1.3);font-size:var(--wcss-accent-xl-font-size, clamp(1.625rem, 2.3333333333vw, 2rem));text-transform:uppercase}.accent-lg{font-family:var(--wcss-accent-lg-family, "Good OT"),var(--wcss-accent-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-lg-letter-spacing, 0.05em);font-weight:var(--wcss-accent-lg-weight, 450);line-height:var(--wcss-accent-lg-line-height, 1.3);font-size:var(--wcss-accent-lg-font-size, clamp(1.5rem, 2.1666666667vw, 1.75rem));text-transform:uppercase}.accent-md{font-family:var(--wcss-accent-md-family, "Good OT"),var(--wcss-accent-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-md-letter-spacing, 0.05em);font-weight:var(--wcss-accent-md-weight, 500);line-height:var(--wcss-accent-md-line-height, 1.3);font-size:var(--wcss-accent-md-font-size, clamp(1.375rem, 1.8333333333vw, 1.5rem));text-transform:uppercase}.accent-sm{font-family:var(--wcss-accent-sm-family, "Good OT"),var(--wcss-accent-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-sm-letter-spacing, 0.05em);font-weight:var(--wcss-accent-sm-weight, 500);line-height:var(--wcss-accent-sm-line-height, 1.3);font-size:var(--wcss-accent-sm-font-size, clamp(1.125rem, 1.5vw, 1.25rem));text-transform:uppercase}.accent-xs{font-family:var(--wcss-accent-xs-family, "Good OT"),var(--wcss-accent-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-xs-letter-spacing, 0.1em);font-weight:var(--wcss-accent-xs-weight, 500);line-height:var(--wcss-accent-xs-line-height, 1.3);font-size:var(--wcss-accent-xs-font-size, clamp(1rem, 1.3333333333vw, 1rem));text-transform:uppercase}.accent-2xs{font-family:var(--wcss-accent-2xs-family, "Good OT"),var(--wcss-accent-2xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-2xs-letter-spacing, 0.1em);font-weight:var(--wcss-accent-2xs-weight, 450);line-height:var(--wcss-accent-2xs-line-height, 1.3);font-size:var(--wcss-accent-2xs-font-size, clamp(0.875rem, 1.1666666667vw, 0.875rem));text-transform:uppercase}:host{--calendar-width: 336px;--mobile-footer-height: 150px;--mobile-header-height: 68px;height:100vh;height:100dvh}.calendars{display:flex;flex-direction:row}.calendarNavButtons{position:absolute;top:var(--ds-size-200, 1rem);right:var(--ds-size-50, 0.25rem);left:var(--ds-size-50, 0.25rem)}.calendarNavBtn{display:flex;width:var(--ds-size-500, 2.5rem);height:var(--ds-size-500, 2.5rem);align-items:center;justify-content:center;border-width:1px;border-style:solid;border-radius:50%;cursor:pointer}.prevMonth,.nextMonth{position:absolute;top:0}.prevMonth{left:0}.nextMonth{right:0}.headerActions{padding:0 var(--ds-size-200, 1rem)}.mobileHeader{width:100%;height:var(--mobile-header-height);z-index:1;align-items:center;flex-direction:row}.headerDateFrom{display:flex;height:var(--mobile-header-height);flex:1;flex-direction:column;justify-content:center;padding:0 var(--ds-size-150, 0.75rem) 0 var(--ds-size-200, 1rem)}.mobileDateLabel{padding:var(--ds-size-25, 0.125rem) 0}.headerDateTo{height:calc(var(--mobile-header-height) - var(--ds-size-300, 1.5rem));padding:var(--ds-size-300, 1.5rem) var(--ds-size-100, 0.5rem) 0 var(--ds-size-200, 1rem)}:host(:not([noRange])) .headerDateTo{position:relative;display:flex;flex:1;flex-direction:column;justify-content:center}:host(:not([noRange])) .headerDateTo:after{position:absolute;top:calc(50% + 10px);left:0;display:block;width:1px;height:var(--ds-size-300, 1.5rem);content:"";transform:translateY(-50%)}.mobileFooter{display:none;width:100%;align-items:flex-end;flex-direction:column;justify-content:flex-end}.mobileFooterActions{position:relative;bottom:0;left:50%;display:none;width:calc(100% - var(--ds-size-200, 1rem)*2);align-items:flex-end;flex-direction:column;justify-content:flex-end;padding:var(--ds-size-150) calc(var(--ds-size-200, 1rem));transform:translateX(-50%)}.mobileFooterActions auro-button{width:100%}:host([isfullscreen]){width:100%;max-height:100dvh;overflow:hidden}:host([isfullscreen]) .prevMonth,:host([isfullscreen]) .nextMonth{display:none}:host([isfullscreen]) .mobileHeader,:host([isfullscreen]) .mobileFooter,:host([isfullscreen]) .mobileFooterActions{display:flex}:host([isfullscreen]) .calendarWrapper{display:flex;flex-direction:column}:host([isfullscreen]) .calendars{display:flex;flex-direction:column;flex:1;align-items:center;width:100%;overscroll-behavior:contain}:host([isfullscreen]) .calendars:after{display:block;width:100%;height:var(--mobile-footer-height);content:""}`,En=L`.calendarNavBtn{border-color:var(--ds-auro-calendar-nav-btn-border-color);background-color:var(--ds-auro-calendar-nav-btn-container-color);color:var(--ds-auro-calendar-nav-btn-chevron-color)}.calendarNavBtn:hover{--ds-auro-calendar-nav-btn-container-color: var(--ds-advanced-color-state-background-hover, #f2f2f2);--ds-auro-calendar-nav-btn-border-color: var(--ds-basic-color-brand-primary, #01426a)}.calendarNavBtn:focus{--ds-auro-calendar-nav-btn-border-color: var(--ds-basic-color-brand-primary, #01426a)}.calendarNavBtn:active{--ds-auro-calendar-nav-btn-border-color: var(--ds-basic-color-brand-primary, #01426a);box-shadow:inset 0 0 0 1px var(--ds-auro-calendar-nav-btn-border-color)}.mobileHeader{background-color:var(--ds-auro-calendar-mobile-header-container-color)}.mobileDateLabel{color:var(--ds-auro-calendar-mobile-header-text-color)}:host(:not([noRange])) .headerDateTo:after{background-color:var(--ds-auro-calendar-mobile-header-divider-color)}::slotted([slot="bib.fullscreen.fromStr"]),::slotted([slot=mobileDateToStr]){color:var(--ds-auro-datepicker-placeholder-color)}@media screen and (max-width: 576px){.calendarNavBtn{--ds-auro-calendar-nav-btn-border-color: var(--ds-basic-color-brand-primary, #01426a)}}`,An=L`:focus:not(:focus-visible){outline:3px solid transparent}.body-default{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-default-font-size, 1rem);line-height:var(--wcss-body-default-line-height, 1.5rem)}.body-lg{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-lg-font-size, 1.125rem);line-height:var(--wcss-body-lg-line-height, 1.625rem)}.body-sm{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-sm-font-size, 0.875rem);line-height:var(--wcss-body-sm-line-height, 1.25rem)}.body-xs{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-xs-font-size, 0.75rem);line-height:var(--wcss-body-xs-line-height, 1rem)}.body-2xs{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-2xs-font-size, 0.625rem);line-height:var(--wcss-body-2xs-line-height, 0.875rem)}.display-2xl{font-family:var(--wcss-display-2xl-family, "AS Circular"),var(--wcss-display-2xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-2xl-letter-spacing, 0);font-weight:var(--wcss-display-2xl-weight, 300);line-height:var(--wcss-display-2xl-line-height, 1.3);font-size:var(--wcss-display-2xl-font-size, clamp(3.5rem, 6vw, 5.375rem))}.display-xl{font-family:var(--wcss-display-xl-family, "AS Circular"),var(--wcss-display-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-xl-letter-spacing, 0);font-weight:var(--wcss-display-xl-weight, 300);line-height:var(--wcss-display-xl-line-height, 1.3);font-size:var(--wcss-display-xl-font-size, clamp(3rem, 5.3333333333vw, 4.5rem))}.display-lg{font-family:var(--wcss-display-lg-family, "AS Circular"),var(--wcss-display-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-lg-letter-spacing, 0);font-weight:var(--wcss-display-lg-weight, 300);line-height:var(--wcss-display-lg-line-height, 1.3);font-size:var(--wcss-display-lg-font-size, clamp(2.75rem, 4.6666666667vw, 4rem))}.display-md{font-family:var(--wcss-display-md-family, "AS Circular"),var(--wcss-display-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-md-letter-spacing, 0);font-weight:var(--wcss-display-md-weight, 300);line-height:var(--wcss-display-md-line-height, 1.3);font-size:var(--wcss-display-md-font-size, clamp(2.5rem, 4vw, 3.5rem))}.display-sm{font-family:var(--wcss-display-sm-family, "AS Circular"),var(--wcss-display-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-sm-letter-spacing, 0);font-weight:var(--wcss-display-sm-weight, 300);line-height:var(--wcss-display-sm-line-height, 1.3);font-size:var(--wcss-display-sm-font-size, clamp(2rem, 3.6666666667vw, 3rem))}.display-xs{font-family:var(--wcss-display-xs-family, "AS Circular"),var(--wcss-display-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-xs-letter-spacing, 0);font-weight:var(--wcss-display-xs-weight, 300);line-height:var(--wcss-display-xs-line-height, 1.3);font-size:var(--wcss-display-xs-font-size, clamp(1.75rem, 3vw, 2.375rem))}.heading-xl{font-family:var(--wcss-heading-xl-family, "AS Circular"),var(--wcss-heading-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-xl-letter-spacing, 0);font-weight:var(--wcss-heading-xl-weight, 300);line-height:var(--wcss-heading-xl-line-height, 1.3);font-size:var(--wcss-heading-xl-font-size, clamp(2rem, 3vw, 2.5rem))}.heading-lg{font-family:var(--wcss-heading-lg-family, "AS Circular"),var(--wcss-heading-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-lg-letter-spacing, 0);font-weight:var(--wcss-heading-lg-weight, 300);line-height:var(--wcss-heading-lg-line-height, 1.3);font-size:var(--wcss-heading-lg-font-size, clamp(1.75rem, 2.6666666667vw, 2.25rem))}.heading-md{font-family:var(--wcss-heading-md-family, "AS Circular"),var(--wcss-heading-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-md-letter-spacing, 0);font-weight:var(--wcss-heading-md-weight, 300);line-height:var(--wcss-heading-md-line-height, 1.3);font-size:var(--wcss-heading-md-font-size, clamp(1.625rem, 2.3333333333vw, 1.75rem))}.heading-sm{font-family:var(--wcss-heading-sm-family, "AS Circular"),var(--wcss-heading-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-sm-letter-spacing, 0);font-weight:var(--wcss-heading-sm-weight, 300);line-height:var(--wcss-heading-sm-line-height, 1.3);font-size:var(--wcss-heading-sm-font-size, clamp(1.375rem, 2vw, 1.5rem))}.heading-xs{font-family:var(--wcss-heading-xs-family, "AS Circular"),var(--wcss-heading-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-xs-letter-spacing, 0);font-weight:var(--wcss-heading-xs-weight, 450);line-height:var(--wcss-heading-xs-line-height, 1.3);font-size:var(--wcss-heading-xs-font-size, clamp(1.25rem, 1.6666666667vw, 1.25rem))}.heading-2xs{font-family:var(--wcss-heading-2xs-family, "AS Circular"),var(--wcss-heading-2xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-2xs-letter-spacing, 0);font-weight:var(--wcss-heading-2xs-weight, 450);line-height:var(--wcss-heading-2xs-line-height, 1.3);font-size:var(--wcss-heading-2xs-font-size, clamp(1.125rem, 1.5vw, 1.125rem))}.accent-2xl{font-family:var(--wcss-accent-2xl-family, "Good OT"),var(--wcss-accent-2xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-2xl-letter-spacing, 0.05em);font-weight:var(--wcss-accent-2xl-weight, 450);line-height:var(--wcss-accent-2xl-line-height, 1);font-size:var(--wcss-accent-2xl-font-size, clamp(2rem, 3.1666666667vw, 2.375rem));text-transform:uppercase}.accent-xl{font-family:var(--wcss-accent-xl-family, "Good OT"),var(--wcss-accent-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-xl-letter-spacing, 0.05em);font-weight:var(--wcss-accent-xl-weight, 450);line-height:var(--wcss-accent-xl-line-height, 1.3);font-size:var(--wcss-accent-xl-font-size, clamp(1.625rem, 2.3333333333vw, 2rem));text-transform:uppercase}.accent-lg{font-family:var(--wcss-accent-lg-family, "Good OT"),var(--wcss-accent-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-lg-letter-spacing, 0.05em);font-weight:var(--wcss-accent-lg-weight, 450);line-height:var(--wcss-accent-lg-line-height, 1.3);font-size:var(--wcss-accent-lg-font-size, clamp(1.5rem, 2.1666666667vw, 1.75rem));text-transform:uppercase}.accent-md{font-family:var(--wcss-accent-md-family, "Good OT"),var(--wcss-accent-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-md-letter-spacing, 0.05em);font-weight:var(--wcss-accent-md-weight, 500);line-height:var(--wcss-accent-md-line-height, 1.3);font-size:var(--wcss-accent-md-font-size, clamp(1.375rem, 1.8333333333vw, 1.5rem));text-transform:uppercase}.accent-sm{font-family:var(--wcss-accent-sm-family, "Good OT"),var(--wcss-accent-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-sm-letter-spacing, 0.05em);font-weight:var(--wcss-accent-sm-weight, 500);line-height:var(--wcss-accent-sm-line-height, 1.3);font-size:var(--wcss-accent-sm-font-size, clamp(1.125rem, 1.5vw, 1.25rem));text-transform:uppercase}.accent-xs{font-family:var(--wcss-accent-xs-family, "Good OT"),var(--wcss-accent-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-xs-letter-spacing, 0.1em);font-weight:var(--wcss-accent-xs-weight, 500);line-height:var(--wcss-accent-xs-line-height, 1.3);font-size:var(--wcss-accent-xs-font-size, clamp(1rem, 1.3333333333vw, 1rem));text-transform:uppercase}.accent-2xs{font-family:var(--wcss-accent-2xs-family, "Good OT"),var(--wcss-accent-2xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-2xs-letter-spacing, 0.1em);font-weight:var(--wcss-accent-2xs-weight, 450);line-height:var(--wcss-accent-2xs-line-height, 1.3);font-size:var(--wcss-accent-2xs-font-size, clamp(0.875rem, 1.1666666667vw, 0.875rem));text-transform:uppercase}:host{position:relative;display:block;width:calc(100% - var(--ds-size-200, 1rem) - var(--ds-size-200, 1rem));margin:0 var(--ds-size-200, 1rem)}@media screen and (min-width: 576px){:host{width:336px;padding:var(--ds-size-200, 1rem)}}@media screen and (min-width: 576px){:host(:not(:last-of-type)):after{position:absolute;top:var(--ds-size-200, 1rem);right:calc(-1*var(--ds-size-200, 1rem));height:calc(100% - var(--ds-size-200, 1rem) - var(--ds-size-200, 1rem));display:block;width:1px;content:""}}.header{display:flex;height:var(--ds-size-500, 2.5rem);margin-bottom:var(--ds-size-150, 0.75rem);align-items:center;flex-direction:row;text-align:center}.headerTitle{display:flex;align-items:center;flex:1;flex-direction:row;justify-content:center}.headerTitle div:first-child{margin-right:var(--ds-size-100, 0.5rem)}.calendarNavBtn{position:relative;display:flex;width:var(--ds-size-500, 2.5rem);height:var(--ds-size-500, 2.5rem);align-items:center;justify-content:center;border-width:1px;border-style:solid;border-radius:50%;cursor:pointer}.table{width:100%;border-collapse:collapse}.thead{margin-bottom:var(--ds-size-100, 0.5rem)}.th{display:flex;flex:1;align-items:center;justify-content:center}.tbody{width:100%;transition:all 0ms;transform:translateX(0)}@media screen and (min-width: 576px){.tbody{height:384px}}.td{flex:1;margin:0;padding:0}.tr{display:flex;flex-direction:row;width:100%}`,Rn=L`:focus:not(:focus-visible){outline:3px solid transparent}:host{background-color:var(--ds-auro-calendar-month-container-color)}@media screen and (min-width: 576px){:host(:not(:last-of-type)):after{background-color:var(--ds-auro-calendar-month-divider-color)}}.header{color:var(--ds-auro-calendar-month-header-color)}`;function b(s,t,e,a){var r=arguments.length,n=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,e):a,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,t,e,a);else for(var o=s.length-1;o>=0;o--)(i=s[o])&&(n=(r<3?i(n):r>3?i(t,e,n):i(t,e))||n);return r>3&&n&&Object.defineProperty(t,e,n),n}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fn={attribute:!0,type:String,converter:dn,reflect:!1,hasChanged:cn},Ln=(s=Fn,t,e)=>{const{kind:a,metadata:r}=e;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),a==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(e.name,s),a==="accessor"){const{name:i}=e;return{set(o){const l=t.get.call(this);t.set.call(this,o),this.requestUpdate(i,l,s)},init(o){return o!==void 0&&this.C(i,void 0,s,o),o}}}if(a==="setter"){const{name:i}=e;return function(o){const l=this[i];t.call(this,o),this.requestUpdate(i,l,s)}}throw Error("Unsupported decorator location: "+a)};function x(s){return(t,e)=>typeof e=="object"?Ln(s,t,e):((a,r,n)=>{const i=r.hasOwnProperty(n);return r.constructor.createProperty(n,a),i?Object.getOwnPropertyDescriptor(r,n):void 0})(s,t,e)}const Ar=6048e5,On=864e5,Bn=6e4,zn=36e5,Nn=1e3,ka=Symbol.for("constructDateFrom");function I(s,t){return typeof s=="function"?s(t):s&&typeof s=="object"&&ka in s?s[ka](t):s instanceof Date?new s.constructor(t):new Date(t)}function A(s,t){return I(t||s,s)}function Zt(s,t,e){const a=A(s,e==null?void 0:e.in);return isNaN(t)?I((e==null?void 0:e.in)||s,NaN):(t&&a.setDate(a.getDate()+t),a)}function ea(s,t,e){const a=A(s,e==null?void 0:e.in);if(isNaN(t))return I(s,NaN);if(!t)return a;const r=a.getDate(),n=I(s,a.getTime());n.setMonth(a.getMonth()+t+1,0);const i=n.getDate();return r>=i?n:(a.setFullYear(n.getFullYear(),n.getMonth(),r),a)}let Hn={};function Oe(){return Hn}function ue(s,t){var o,l,d,c;const e=Oe(),a=(t==null?void 0:t.weekStartsOn)??((l=(o=t==null?void 0:t.locale)==null?void 0:o.options)==null?void 0:l.weekStartsOn)??e.weekStartsOn??((c=(d=e.locale)==null?void 0:d.options)==null?void 0:c.weekStartsOn)??0,r=A(s,t==null?void 0:t.in),n=r.getDay(),i=(n<a?7:0)+n-a;return r.setDate(r.getDate()-i),r.setHours(0,0,0,0),r}function Ee(s,t){return ue(s,{...t,weekStartsOn:1})}function Rr(s,t){const e=A(s,t==null?void 0:t.in),a=e.getFullYear(),r=I(e,0);r.setFullYear(a+1,0,4),r.setHours(0,0,0,0);const n=Ee(r),i=I(e,0);i.setFullYear(a,0,4),i.setHours(0,0,0,0);const o=Ee(i);return e.getTime()>=n.getTime()?a+1:e.getTime()>=o.getTime()?a:a-1}function Ot(s){const t=A(s),e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),+s-+e}function Pn(s,...t){const e=I.bind(null,t.find(a=>typeof a=="object"));return t.map(e)}function le(s,t){const e=A(s,t==null?void 0:t.in);return e.setHours(0,0,0,0),e}function _n(s,t,e){const[a,r]=Pn(e==null?void 0:e.in,s,t),n=le(a),i=le(r),o=+n-Ot(n),l=+i-Ot(i);return Math.round((o-l)/On)}function In(s,t){const e=Rr(s,t),a=I(s,0);return a.setFullYear(e,0,4),a.setHours(0,0,0,0),Ee(a)}function Fr(s,t,e){return ea(s,t*12,e)}function Vn(s){return s instanceof Date||typeof s=="object"&&Object.prototype.toString.call(s)==="[object Date]"}function qn(s){return!(!Vn(s)&&typeof s!="number"||isNaN(+A(s)))}function Un(s,t){const e=A(s,t==null?void 0:t.in),a=e.getMonth();return e.setFullYear(e.getFullYear(),a+1,0),e.setHours(23,59,59,999),e}function Wn(s,t){const e=A(s,t==null?void 0:t.in);return e.setFullYear(e.getFullYear(),0,1),e.setHours(0,0,0,0),e}const Yn={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},jn=(s,t,e)=>{let a;const r=Yn[s];return typeof r=="string"?a=r:t===1?a=r.one:a=r.other.replace("{{count}}",t.toString()),e!=null&&e.addSuffix?e.comparison&&e.comparison>0?"in "+a:a+" ago":a};function jt(s){return(t={})=>{const e=t.width?String(t.width):s.defaultWidth;return s.formats[e]||s.formats[s.defaultWidth]}}const Gn={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},Xn={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},Qn={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},Jn={date:jt({formats:Gn,defaultWidth:"full"}),time:jt({formats:Xn,defaultWidth:"full"}),dateTime:jt({formats:Qn,defaultWidth:"full"})},Kn={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},Zn=(s,t,e,a)=>Kn[s];function Ne(s){return(t,e)=>{const a=e!=null&&e.context?String(e.context):"standalone";let r;if(a==="formatting"&&s.formattingValues){const i=s.defaultFormattingWidth||s.defaultWidth,o=e!=null&&e.width?String(e.width):i;r=s.formattingValues[o]||s.formattingValues[i]}else{const i=s.defaultWidth,o=e!=null&&e.width?String(e.width):s.defaultWidth;r=s.values[o]||s.values[i]}const n=s.argumentCallback?s.argumentCallback(t):t;return r[n]}}const ei={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},ti={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},ai={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},si={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},ri={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},ni={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},ii=(s,t)=>{const e=Number(s),a=e%100;if(a>20||a<10)switch(a%10){case 1:return e+"st";case 2:return e+"nd";case 3:return e+"rd"}return e+"th"},oi={ordinalNumber:ii,era:Ne({values:ei,defaultWidth:"wide"}),quarter:Ne({values:ti,defaultWidth:"wide",argumentCallback:s=>s-1}),month:Ne({values:ai,defaultWidth:"wide"}),day:Ne({values:si,defaultWidth:"wide"}),dayPeriod:Ne({values:ri,defaultWidth:"wide",formattingValues:ni,defaultFormattingWidth:"wide"})};function He(s){return(t,e={})=>{const a=e.width,r=a&&s.matchPatterns[a]||s.matchPatterns[s.defaultMatchWidth],n=t.match(r);if(!n)return null;const i=n[0],o=a&&s.parsePatterns[a]||s.parsePatterns[s.defaultParseWidth],l=Array.isArray(o)?ci(o,p=>p.test(i)):li(o,p=>p.test(i));let d;d=s.valueCallback?s.valueCallback(l):l,d=e.valueCallback?e.valueCallback(d):d;const c=t.slice(i.length);return{value:d,rest:c}}}function li(s,t){for(const e in s)if(Object.prototype.hasOwnProperty.call(s,e)&&t(s[e]))return e}function ci(s,t){for(let e=0;e<s.length;e++)if(t(s[e]))return e}function di(s){return(t,e={})=>{const a=t.match(s.matchPattern);if(!a)return null;const r=a[0],n=t.match(s.parsePattern);if(!n)return null;let i=s.valueCallback?s.valueCallback(n[0]):n[0];i=e.valueCallback?e.valueCallback(i):i;const o=t.slice(r.length);return{value:i,rest:o}}}const hi=/^(\d+)(th|st|nd|rd)?/i,ui=/\d+/i,pi={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},mi={any:[/^b/i,/^(a|c)/i]},fi={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},gi={any:[/1/i,/2/i,/3/i,/4/i]},yi={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},vi={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},wi={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},bi={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},xi={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},ki={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Di={ordinalNumber:di({matchPattern:hi,parsePattern:ui,valueCallback:s=>parseInt(s,10)}),era:He({matchPatterns:pi,defaultMatchWidth:"wide",parsePatterns:mi,defaultParseWidth:"any"}),quarter:He({matchPatterns:fi,defaultMatchWidth:"wide",parsePatterns:gi,defaultParseWidth:"any",valueCallback:s=>s+1}),month:He({matchPatterns:yi,defaultMatchWidth:"wide",parsePatterns:vi,defaultParseWidth:"any"}),day:He({matchPatterns:wi,defaultMatchWidth:"wide",parsePatterns:bi,defaultParseWidth:"any"}),dayPeriod:He({matchPatterns:xi,defaultMatchWidth:"any",parsePatterns:ki,defaultParseWidth:"any"})},Dt={code:"en-US",formatDistance:jn,formatLong:Jn,formatRelative:Zn,localize:oi,match:Di,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Si(s,t){const e=A(s,t==null?void 0:t.in);return _n(e,Wn(e))+1}function Lr(s,t){const e=A(s,t==null?void 0:t.in),a=+Ee(e)-+In(e);return Math.round(a/Ar)+1}function ta(s,t){var c,p,f,m;const e=A(s,t==null?void 0:t.in),a=e.getFullYear(),r=Oe(),n=(t==null?void 0:t.firstWeekContainsDate)??((p=(c=t==null?void 0:t.locale)==null?void 0:c.options)==null?void 0:p.firstWeekContainsDate)??r.firstWeekContainsDate??((m=(f=r.locale)==null?void 0:f.options)==null?void 0:m.firstWeekContainsDate)??1,i=I((t==null?void 0:t.in)||s,0);i.setFullYear(a+1,0,n),i.setHours(0,0,0,0);const o=ue(i,t),l=I((t==null?void 0:t.in)||s,0);l.setFullYear(a,0,n),l.setHours(0,0,0,0);const d=ue(l,t);return+e>=+o?a+1:+e>=+d?a:a-1}function Ci(s,t){var o,l,d,c;const e=Oe(),a=(t==null?void 0:t.firstWeekContainsDate)??((l=(o=t==null?void 0:t.locale)==null?void 0:o.options)==null?void 0:l.firstWeekContainsDate)??e.firstWeekContainsDate??((c=(d=e.locale)==null?void 0:d.options)==null?void 0:c.firstWeekContainsDate)??1,r=ta(s,t),n=I((t==null?void 0:t.in)||s,0);return n.setFullYear(r,0,a),n.setHours(0,0,0,0),ue(n,t)}function Or(s,t){const e=A(s,t==null?void 0:t.in),a=+ue(e,t)-+Ci(e,t);return Math.round(a/Ar)+1}function $(s,t){const e=s<0?"-":"",a=Math.abs(s).toString().padStart(t,"0");return e+a}const he={y(s,t){const e=s.getFullYear(),a=e>0?e:1-e;return $(t==="yy"?a%100:a,t.length)},M(s,t){const e=s.getMonth();return t==="M"?String(e+1):$(e+1,2)},d(s,t){return $(s.getDate(),t.length)},a(s,t){const e=s.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return e.toUpperCase();case"aaa":return e;case"aaaaa":return e[0];case"aaaa":default:return e==="am"?"a.m.":"p.m."}},h(s,t){return $(s.getHours()%12||12,t.length)},H(s,t){return $(s.getHours(),t.length)},m(s,t){return $(s.getMinutes(),t.length)},s(s,t){return $(s.getSeconds(),t.length)},S(s,t){const e=t.length,a=s.getMilliseconds(),r=Math.trunc(a*Math.pow(10,e-3));return $(r,t.length)}},Ce={midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},Da={G:function(s,t,e){const a=s.getFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return e.era(a,{width:"abbreviated"});case"GGGGG":return e.era(a,{width:"narrow"});case"GGGG":default:return e.era(a,{width:"wide"})}},y:function(s,t,e){if(t==="yo"){const a=s.getFullYear(),r=a>0?a:1-a;return e.ordinalNumber(r,{unit:"year"})}return he.y(s,t)},Y:function(s,t,e,a){const r=ta(s,a),n=r>0?r:1-r;if(t==="YY"){const i=n%100;return $(i,2)}return t==="Yo"?e.ordinalNumber(n,{unit:"year"}):$(n,t.length)},R:function(s,t){const e=Rr(s);return $(e,t.length)},u:function(s,t){const e=s.getFullYear();return $(e,t.length)},Q:function(s,t,e){const a=Math.ceil((s.getMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return $(a,2);case"Qo":return e.ordinalNumber(a,{unit:"quarter"});case"QQQ":return e.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return e.quarter(a,{width:"narrow",context:"formatting"});case"QQQQ":default:return e.quarter(a,{width:"wide",context:"formatting"})}},q:function(s,t,e){const a=Math.ceil((s.getMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return $(a,2);case"qo":return e.ordinalNumber(a,{unit:"quarter"});case"qqq":return e.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return e.quarter(a,{width:"narrow",context:"standalone"});case"qqqq":default:return e.quarter(a,{width:"wide",context:"standalone"})}},M:function(s,t,e){const a=s.getMonth();switch(t){case"M":case"MM":return he.M(s,t);case"Mo":return e.ordinalNumber(a+1,{unit:"month"});case"MMM":return e.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return e.month(a,{width:"narrow",context:"formatting"});case"MMMM":default:return e.month(a,{width:"wide",context:"formatting"})}},L:function(s,t,e){const a=s.getMonth();switch(t){case"L":return String(a+1);case"LL":return $(a+1,2);case"Lo":return e.ordinalNumber(a+1,{unit:"month"});case"LLL":return e.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return e.month(a,{width:"narrow",context:"standalone"});case"LLLL":default:return e.month(a,{width:"wide",context:"standalone"})}},w:function(s,t,e,a){const r=Or(s,a);return t==="wo"?e.ordinalNumber(r,{unit:"week"}):$(r,t.length)},I:function(s,t,e){const a=Lr(s);return t==="Io"?e.ordinalNumber(a,{unit:"week"}):$(a,t.length)},d:function(s,t,e){return t==="do"?e.ordinalNumber(s.getDate(),{unit:"date"}):he.d(s,t)},D:function(s,t,e){const a=Si(s);return t==="Do"?e.ordinalNumber(a,{unit:"dayOfYear"}):$(a,t.length)},E:function(s,t,e){const a=s.getDay();switch(t){case"E":case"EE":case"EEE":return e.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return e.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return e.day(a,{width:"short",context:"formatting"});case"EEEE":default:return e.day(a,{width:"wide",context:"formatting"})}},e:function(s,t,e,a){const r=s.getDay(),n=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(n);case"ee":return $(n,2);case"eo":return e.ordinalNumber(n,{unit:"day"});case"eee":return e.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return e.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return e.day(r,{width:"short",context:"formatting"});case"eeee":default:return e.day(r,{width:"wide",context:"formatting"})}},c:function(s,t,e,a){const r=s.getDay(),n=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(n);case"cc":return $(n,t.length);case"co":return e.ordinalNumber(n,{unit:"day"});case"ccc":return e.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return e.day(r,{width:"narrow",context:"standalone"});case"cccccc":return e.day(r,{width:"short",context:"standalone"});case"cccc":default:return e.day(r,{width:"wide",context:"standalone"})}},i:function(s,t,e){const a=s.getDay(),r=a===0?7:a;switch(t){case"i":return String(r);case"ii":return $(r,t.length);case"io":return e.ordinalNumber(r,{unit:"day"});case"iii":return e.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return e.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return e.day(a,{width:"short",context:"formatting"});case"iiii":default:return e.day(a,{width:"wide",context:"formatting"})}},a:function(s,t,e){const r=s.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return e.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return e.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(s,t,e){const a=s.getHours();let r;switch(a===12?r=Ce.noon:a===0?r=Ce.midnight:r=a/12>=1?"pm":"am",t){case"b":case"bb":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return e.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return e.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(s,t,e){const a=s.getHours();let r;switch(a>=17?r=Ce.evening:a>=12?r=Ce.afternoon:a>=4?r=Ce.morning:r=Ce.night,t){case"B":case"BB":case"BBB":return e.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return e.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return e.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(s,t,e){if(t==="ho"){let a=s.getHours()%12;return a===0&&(a=12),e.ordinalNumber(a,{unit:"hour"})}return he.h(s,t)},H:function(s,t,e){return t==="Ho"?e.ordinalNumber(s.getHours(),{unit:"hour"}):he.H(s,t)},K:function(s,t,e){const a=s.getHours()%12;return t==="Ko"?e.ordinalNumber(a,{unit:"hour"}):$(a,t.length)},k:function(s,t,e){let a=s.getHours();return a===0&&(a=24),t==="ko"?e.ordinalNumber(a,{unit:"hour"}):$(a,t.length)},m:function(s,t,e){return t==="mo"?e.ordinalNumber(s.getMinutes(),{unit:"minute"}):he.m(s,t)},s:function(s,t,e){return t==="so"?e.ordinalNumber(s.getSeconds(),{unit:"second"}):he.s(s,t)},S:function(s,t){return he.S(s,t)},X:function(s,t,e){const a=s.getTimezoneOffset();if(a===0)return"Z";switch(t){case"X":return Ca(a);case"XXXX":case"XX":return we(a);case"XXXXX":case"XXX":default:return we(a,":")}},x:function(s,t,e){const a=s.getTimezoneOffset();switch(t){case"x":return Ca(a);case"xxxx":case"xx":return we(a);case"xxxxx":case"xxx":default:return we(a,":")}},O:function(s,t,e){const a=s.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+Sa(a,":");case"OOOO":default:return"GMT"+we(a,":")}},z:function(s,t,e){const a=s.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+Sa(a,":");case"zzzz":default:return"GMT"+we(a,":")}},t:function(s,t,e){const a=Math.trunc(+s/1e3);return $(a,t.length)},T:function(s,t,e){return $(+s,t.length)}};function Sa(s,t=""){const e=s>0?"-":"+",a=Math.abs(s),r=Math.trunc(a/60),n=a%60;return n===0?e+String(r):e+String(r)+t+$(n,2)}function Ca(s,t){return s%60===0?(s>0?"-":"+")+$(Math.abs(s)/60,2):we(s,t)}function we(s,t=""){const e=s>0?"-":"+",a=Math.abs(s),r=$(Math.trunc(a/60),2),n=$(a%60,2);return e+r+t+n}const Ta=(s,t)=>{switch(s){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}},Br=(s,t)=>{switch(s){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}},Ti=(s,t)=>{const e=s.match(/(P+)(p+)?/)||[],a=e[1],r=e[2];if(!r)return Ta(s,t);let n;switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"});break}return n.replace("{{date}}",Ta(a,t)).replace("{{time}}",Br(r,t))},Gt={p:Br,P:Ti},Mi=/^D+$/,$i=/^Y+$/,Ei=["D","DD","YY","YYYY"];function zr(s){return Mi.test(s)}function Nr(s){return $i.test(s)}function Xt(s,t,e){const a=Ai(s,t,e);if(console.warn(a),Ei.includes(s))throw new RangeError(a)}function Ai(s,t,e){const a=s[0]==="Y"?"years":"days of the month";return`Use \`${s.toLowerCase()}\` instead of \`${s}\` (in \`${t}\`) for formatting ${a} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const Ri=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Fi=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Li=/^'([^]*?)'?$/,Oi=/''/g,Bi=/[a-zA-Z]/;function J(s,t,e){var c,p,f,m,y,v,D,T;const a=Oe(),r=(e==null?void 0:e.locale)??a.locale??Dt,n=(e==null?void 0:e.firstWeekContainsDate)??((p=(c=e==null?void 0:e.locale)==null?void 0:c.options)==null?void 0:p.firstWeekContainsDate)??a.firstWeekContainsDate??((m=(f=a.locale)==null?void 0:f.options)==null?void 0:m.firstWeekContainsDate)??1,i=(e==null?void 0:e.weekStartsOn)??((v=(y=e==null?void 0:e.locale)==null?void 0:y.options)==null?void 0:v.weekStartsOn)??a.weekStartsOn??((T=(D=a.locale)==null?void 0:D.options)==null?void 0:T.weekStartsOn)??0,o=A(s,e==null?void 0:e.in);if(!qn(o))throw new RangeError("Invalid time value");let l=t.match(Fi).map(S=>{const k=S[0];if(k==="p"||k==="P"){const h=Gt[k];return h(S,r.formatLong)}return S}).join("").match(Ri).map(S=>{if(S==="''")return{isToken:!1,value:"'"};const k=S[0];if(k==="'")return{isToken:!1,value:zi(S)};if(Da[k])return{isToken:!0,value:S};if(k.match(Bi))throw new RangeError("Format string contains an unescaped latin alphabet character `"+k+"`");return{isToken:!1,value:S}});r.localize.preprocessor&&(l=r.localize.preprocessor(o,l));const d={firstWeekContainsDate:n,weekStartsOn:i,locale:r};return l.map(S=>{if(!S.isToken)return S.value;const k=S.value;(!(e!=null&&e.useAdditionalWeekYearTokens)&&Nr(k)||!(e!=null&&e.useAdditionalDayOfYearTokens)&&zr(k))&&Xt(k,t,String(s));const h=Da[k[0]];return h(o,k,r.localize,d)}).join("")}function zi(s){const t=s.match(Li);return t?t[1].replace(Oi,"'"):s}function Ni(s,t){return A(s,t==null?void 0:t.in).getDay()}function Hi(){return Object.assign({},Oe())}function Pi(s,t){const e=A(s,t==null?void 0:t.in).getDay();return e===0?7:e}function Ma(s,t){return A(s,t==null?void 0:t.in).getMonth()}function $a(s){return+A(s)}function Ea(s,t){return A(s,t==null?void 0:t.in).getFullYear()}function _i(s,t){const e=Ii(t)?new t(0):I(t,0);return e.setFullYear(s.getFullYear(),s.getMonth(),s.getDate()),e.setHours(s.getHours(),s.getMinutes(),s.getSeconds(),s.getMilliseconds()),e}function Ii(s){var t;return typeof s=="function"&&((t=s.prototype)==null?void 0:t.constructor)===s}const Vi=10;class Hr{constructor(){u(this,"subPriority",0)}validate(t,e){return!0}}class qi extends Hr{constructor(t,e,a,r,n){super(),this.value=t,this.validateValue=e,this.setValue=a,this.priority=r,n&&(this.subPriority=n)}validate(t,e){return this.validateValue(t,this.value,e)}set(t,e,a){return this.setValue(t,e,this.value,a)}}class Ui extends Hr{constructor(e,a){super();u(this,"priority",Vi);u(this,"subPriority",-1);this.context=e||(r=>I(a,r))}set(e,a){return a.timestampIsSet?e:I(e,_i(e,this.context))}}class M{run(t,e,a,r){const n=this.parse(t,e,a,r);return n?{setter:new qi(n.value,this.validate,this.set,this.priority,this.subPriority),rest:n.rest}:null}validate(t,e,a){return!0}}class Wi extends M{constructor(){super(...arguments);u(this,"priority",140);u(this,"incompatibleTokens",["R","u","t","T"])}parse(e,a,r){switch(a){case"G":case"GG":case"GGG":return r.era(e,{width:"abbreviated"})||r.era(e,{width:"narrow"});case"GGGGG":return r.era(e,{width:"narrow"});case"GGGG":default:return r.era(e,{width:"wide"})||r.era(e,{width:"abbreviated"})||r.era(e,{width:"narrow"})}}set(e,a,r){return a.era=r,e.setFullYear(r,0,1),e.setHours(0,0,0,0),e}}const H={month:/^(1[0-2]|0?\d)/,date:/^(3[0-1]|[0-2]?\d)/,dayOfYear:/^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,week:/^(5[0-3]|[0-4]?\d)/,hour23h:/^(2[0-3]|[0-1]?\d)/,hour24h:/^(2[0-4]|[0-1]?\d)/,hour11h:/^(1[0-1]|0?\d)/,hour12h:/^(1[0-2]|0?\d)/,minute:/^[0-5]?\d/,second:/^[0-5]?\d/,singleDigit:/^\d/,twoDigits:/^\d{1,2}/,threeDigits:/^\d{1,3}/,fourDigits:/^\d{1,4}/,anyDigitsSigned:/^-?\d+/,singleDigitSigned:/^-?\d/,twoDigitsSigned:/^-?\d{1,2}/,threeDigitsSigned:/^-?\d{1,3}/,fourDigitsSigned:/^-?\d{1,4}/},re={basicOptionalMinutes:/^([+-])(\d{2})(\d{2})?|Z/,basic:/^([+-])(\d{2})(\d{2})|Z/,basicOptionalSeconds:/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,extended:/^([+-])(\d{2}):(\d{2})|Z/,extendedOptionalSeconds:/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/};function P(s,t){return s&&{value:t(s.value),rest:s.rest}}function F(s,t){const e=t.match(s);return e?{value:parseInt(e[0],10),rest:t.slice(e[0].length)}:null}function ne(s,t){const e=t.match(s);if(!e)return null;if(e[0]==="Z")return{value:0,rest:t.slice(1)};const a=e[1]==="+"?1:-1,r=e[2]?parseInt(e[2],10):0,n=e[3]?parseInt(e[3],10):0,i=e[5]?parseInt(e[5],10):0;return{value:a*(r*zn+n*Bn+i*Nn),rest:t.slice(e[0].length)}}function Pr(s){return F(H.anyDigitsSigned,s)}function B(s,t){switch(s){case 1:return F(H.singleDigit,t);case 2:return F(H.twoDigits,t);case 3:return F(H.threeDigits,t);case 4:return F(H.fourDigits,t);default:return F(new RegExp("^\\d{1,"+s+"}"),t)}}function Bt(s,t){switch(s){case 1:return F(H.singleDigitSigned,t);case 2:return F(H.twoDigitsSigned,t);case 3:return F(H.threeDigitsSigned,t);case 4:return F(H.fourDigitsSigned,t);default:return F(new RegExp("^-?\\d{1,"+s+"}"),t)}}function aa(s){switch(s){case"morning":return 4;case"evening":return 17;case"pm":case"noon":case"afternoon":return 12;case"am":case"midnight":case"night":default:return 0}}function _r(s,t){const e=t>0,a=e?t:1-t;let r;if(a<=50)r=s||100;else{const n=a+50,i=Math.trunc(n/100)*100,o=s>=n%100;r=s+i-(o?100:0)}return e?r:1-r}function Ir(s){return s%400===0||s%4===0&&s%100!==0}class Yi extends M{constructor(){super(...arguments);u(this,"priority",130);u(this,"incompatibleTokens",["Y","R","u","w","I","i","e","c","t","T"])}parse(e,a,r){const n=i=>({year:i,isTwoDigitYear:a==="yy"});switch(a){case"y":return P(B(4,e),n);case"yo":return P(r.ordinalNumber(e,{unit:"year"}),n);default:return P(B(a.length,e),n)}}validate(e,a){return a.isTwoDigitYear||a.year>0}set(e,a,r){const n=e.getFullYear();if(r.isTwoDigitYear){const o=_r(r.year,n);return e.setFullYear(o,0,1),e.setHours(0,0,0,0),e}const i=!("era"in a)||a.era===1?r.year:1-r.year;return e.setFullYear(i,0,1),e.setHours(0,0,0,0),e}}class ji extends M{constructor(){super(...arguments);u(this,"priority",130);u(this,"incompatibleTokens",["y","R","u","Q","q","M","L","I","d","D","i","t","T"])}parse(e,a,r){const n=i=>({year:i,isTwoDigitYear:a==="YY"});switch(a){case"Y":return P(B(4,e),n);case"Yo":return P(r.ordinalNumber(e,{unit:"year"}),n);default:return P(B(a.length,e),n)}}validate(e,a){return a.isTwoDigitYear||a.year>0}set(e,a,r,n){const i=ta(e,n);if(r.isTwoDigitYear){const l=_r(r.year,i);return e.setFullYear(l,0,n.firstWeekContainsDate),e.setHours(0,0,0,0),ue(e,n)}const o=!("era"in a)||a.era===1?r.year:1-r.year;return e.setFullYear(o,0,n.firstWeekContainsDate),e.setHours(0,0,0,0),ue(e,n)}}class Gi extends M{constructor(){super(...arguments);u(this,"priority",130);u(this,"incompatibleTokens",["G","y","Y","u","Q","q","M","L","w","d","D","e","c","t","T"])}parse(e,a){return Bt(a==="R"?4:a.length,e)}set(e,a,r){const n=I(e,0);return n.setFullYear(r,0,4),n.setHours(0,0,0,0),Ee(n)}}class Xi extends M{constructor(){super(...arguments);u(this,"priority",130);u(this,"incompatibleTokens",["G","y","Y","R","w","I","i","e","c","t","T"])}parse(e,a){return Bt(a==="u"?4:a.length,e)}set(e,a,r){return e.setFullYear(r,0,1),e.setHours(0,0,0,0),e}}class Qi extends M{constructor(){super(...arguments);u(this,"priority",120);u(this,"incompatibleTokens",["Y","R","q","M","L","w","I","d","D","i","e","c","t","T"])}parse(e,a,r){switch(a){case"Q":case"QQ":return B(a.length,e);case"Qo":return r.ordinalNumber(e,{unit:"quarter"});case"QQQ":return r.quarter(e,{width:"abbreviated",context:"formatting"})||r.quarter(e,{width:"narrow",context:"formatting"});case"QQQQQ":return r.quarter(e,{width:"narrow",context:"formatting"});case"QQQQ":default:return r.quarter(e,{width:"wide",context:"formatting"})||r.quarter(e,{width:"abbreviated",context:"formatting"})||r.quarter(e,{width:"narrow",context:"formatting"})}}validate(e,a){return a>=1&&a<=4}set(e,a,r){return e.setMonth((r-1)*3,1),e.setHours(0,0,0,0),e}}class Ji extends M{constructor(){super(...arguments);u(this,"priority",120);u(this,"incompatibleTokens",["Y","R","Q","M","L","w","I","d","D","i","e","c","t","T"])}parse(e,a,r){switch(a){case"q":case"qq":return B(a.length,e);case"qo":return r.ordinalNumber(e,{unit:"quarter"});case"qqq":return r.quarter(e,{width:"abbreviated",context:"standalone"})||r.quarter(e,{width:"narrow",context:"standalone"});case"qqqqq":return r.quarter(e,{width:"narrow",context:"standalone"});case"qqqq":default:return r.quarter(e,{width:"wide",context:"standalone"})||r.quarter(e,{width:"abbreviated",context:"standalone"})||r.quarter(e,{width:"narrow",context:"standalone"})}}validate(e,a){return a>=1&&a<=4}set(e,a,r){return e.setMonth((r-1)*3,1),e.setHours(0,0,0,0),e}}class Ki extends M{constructor(){super(...arguments);u(this,"incompatibleTokens",["Y","R","q","Q","L","w","I","D","i","e","c","t","T"]);u(this,"priority",110)}parse(e,a,r){const n=i=>i-1;switch(a){case"M":return P(F(H.month,e),n);case"MM":return P(B(2,e),n);case"Mo":return P(r.ordinalNumber(e,{unit:"month"}),n);case"MMM":return r.month(e,{width:"abbreviated",context:"formatting"})||r.month(e,{width:"narrow",context:"formatting"});case"MMMMM":return r.month(e,{width:"narrow",context:"formatting"});case"MMMM":default:return r.month(e,{width:"wide",context:"formatting"})||r.month(e,{width:"abbreviated",context:"formatting"})||r.month(e,{width:"narrow",context:"formatting"})}}validate(e,a){return a>=0&&a<=11}set(e,a,r){return e.setMonth(r,1),e.setHours(0,0,0,0),e}}class Zi extends M{constructor(){super(...arguments);u(this,"priority",110);u(this,"incompatibleTokens",["Y","R","q","Q","M","w","I","D","i","e","c","t","T"])}parse(e,a,r){const n=i=>i-1;switch(a){case"L":return P(F(H.month,e),n);case"LL":return P(B(2,e),n);case"Lo":return P(r.ordinalNumber(e,{unit:"month"}),n);case"LLL":return r.month(e,{width:"abbreviated",context:"standalone"})||r.month(e,{width:"narrow",context:"standalone"});case"LLLLL":return r.month(e,{width:"narrow",context:"standalone"});case"LLLL":default:return r.month(e,{width:"wide",context:"standalone"})||r.month(e,{width:"abbreviated",context:"standalone"})||r.month(e,{width:"narrow",context:"standalone"})}}validate(e,a){return a>=0&&a<=11}set(e,a,r){return e.setMonth(r,1),e.setHours(0,0,0,0),e}}function eo(s,t,e){const a=A(s,e==null?void 0:e.in),r=Or(a,e)-t;return a.setDate(a.getDate()-r*7),A(a,e==null?void 0:e.in)}class to extends M{constructor(){super(...arguments);u(this,"priority",100);u(this,"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","i","t","T"])}parse(e,a,r){switch(a){case"w":return F(H.week,e);case"wo":return r.ordinalNumber(e,{unit:"week"});default:return B(a.length,e)}}validate(e,a){return a>=1&&a<=53}set(e,a,r,n){return ue(eo(e,r,n),n)}}function ao(s,t,e){const a=A(s,e==null?void 0:e.in),r=Lr(a,e)-t;return a.setDate(a.getDate()-r*7),a}class so extends M{constructor(){super(...arguments);u(this,"priority",100);u(this,"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","e","c","t","T"])}parse(e,a,r){switch(a){case"I":return F(H.week,e);case"Io":return r.ordinalNumber(e,{unit:"week"});default:return B(a.length,e)}}validate(e,a){return a>=1&&a<=53}set(e,a,r){return Ee(ao(e,r))}}const ro=[31,28,31,30,31,30,31,31,30,31,30,31],no=[31,29,31,30,31,30,31,31,30,31,30,31];class io extends M{constructor(){super(...arguments);u(this,"priority",90);u(this,"subPriority",1);u(this,"incompatibleTokens",["Y","R","q","Q","w","I","D","i","e","c","t","T"])}parse(e,a,r){switch(a){case"d":return F(H.date,e);case"do":return r.ordinalNumber(e,{unit:"date"});default:return B(a.length,e)}}validate(e,a){const r=e.getFullYear(),n=Ir(r),i=e.getMonth();return n?a>=1&&a<=no[i]:a>=1&&a<=ro[i]}set(e,a,r){return e.setDate(r),e.setHours(0,0,0,0),e}}class oo extends M{constructor(){super(...arguments);u(this,"priority",90);u(this,"subpriority",1);u(this,"incompatibleTokens",["Y","R","q","Q","M","L","w","I","d","E","i","e","c","t","T"])}parse(e,a,r){switch(a){case"D":case"DD":return F(H.dayOfYear,e);case"Do":return r.ordinalNumber(e,{unit:"date"});default:return B(a.length,e)}}validate(e,a){const r=e.getFullYear();return Ir(r)?a>=1&&a<=366:a>=1&&a<=365}set(e,a,r){return e.setMonth(0,r),e.setHours(0,0,0,0),e}}function sa(s,t,e){var p,f,m,y;const a=Oe(),r=(e==null?void 0:e.weekStartsOn)??((f=(p=e==null?void 0:e.locale)==null?void 0:p.options)==null?void 0:f.weekStartsOn)??a.weekStartsOn??((y=(m=a.locale)==null?void 0:m.options)==null?void 0:y.weekStartsOn)??0,n=A(s,e==null?void 0:e.in),i=n.getDay(),l=(t%7+7)%7,d=7-r,c=t<0||t>6?t-(i+d)%7:(l+d)%7-(i+d)%7;return Zt(n,c,e)}class lo extends M{constructor(){super(...arguments);u(this,"priority",90);u(this,"incompatibleTokens",["D","i","e","c","t","T"])}parse(e,a,r){switch(a){case"E":case"EE":case"EEE":return r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"});case"EEEEE":return r.day(e,{width:"narrow",context:"formatting"});case"EEEEEE":return r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"});case"EEEE":default:return r.day(e,{width:"wide",context:"formatting"})||r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"})}}validate(e,a){return a>=0&&a<=6}set(e,a,r,n){return e=sa(e,r,n),e.setHours(0,0,0,0),e}}class co extends M{constructor(){super(...arguments);u(this,"priority",90);u(this,"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","c","t","T"])}parse(e,a,r,n){const i=o=>{const l=Math.floor((o-1)/7)*7;return(o+n.weekStartsOn+6)%7+l};switch(a){case"e":case"ee":return P(B(a.length,e),i);case"eo":return P(r.ordinalNumber(e,{unit:"day"}),i);case"eee":return r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"});case"eeeee":return r.day(e,{width:"narrow",context:"formatting"});case"eeeeee":return r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"});case"eeee":default:return r.day(e,{width:"wide",context:"formatting"})||r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"})}}validate(e,a){return a>=0&&a<=6}set(e,a,r,n){return e=sa(e,r,n),e.setHours(0,0,0,0),e}}class ho extends M{constructor(){super(...arguments);u(this,"priority",90);u(this,"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","e","t","T"])}parse(e,a,r,n){const i=o=>{const l=Math.floor((o-1)/7)*7;return(o+n.weekStartsOn+6)%7+l};switch(a){case"c":case"cc":return P(B(a.length,e),i);case"co":return P(r.ordinalNumber(e,{unit:"day"}),i);case"ccc":return r.day(e,{width:"abbreviated",context:"standalone"})||r.day(e,{width:"short",context:"standalone"})||r.day(e,{width:"narrow",context:"standalone"});case"ccccc":return r.day(e,{width:"narrow",context:"standalone"});case"cccccc":return r.day(e,{width:"short",context:"standalone"})||r.day(e,{width:"narrow",context:"standalone"});case"cccc":default:return r.day(e,{width:"wide",context:"standalone"})||r.day(e,{width:"abbreviated",context:"standalone"})||r.day(e,{width:"short",context:"standalone"})||r.day(e,{width:"narrow",context:"standalone"})}}validate(e,a){return a>=0&&a<=6}set(e,a,r,n){return e=sa(e,r,n),e.setHours(0,0,0,0),e}}function uo(s,t,e){const a=A(s,e==null?void 0:e.in),r=Pi(a,e),n=t-r;return Zt(a,n,e)}class po extends M{constructor(){super(...arguments);u(this,"priority",90);u(this,"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","E","e","c","t","T"])}parse(e,a,r){const n=i=>i===0?7:i;switch(a){case"i":case"ii":return B(a.length,e);case"io":return r.ordinalNumber(e,{unit:"day"});case"iii":return P(r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"}),n);case"iiiii":return P(r.day(e,{width:"narrow",context:"formatting"}),n);case"iiiiii":return P(r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"}),n);case"iiii":default:return P(r.day(e,{width:"wide",context:"formatting"})||r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"}),n)}}validate(e,a){return a>=1&&a<=7}set(e,a,r){return e=uo(e,r),e.setHours(0,0,0,0),e}}class mo extends M{constructor(){super(...arguments);u(this,"priority",80);u(this,"incompatibleTokens",["b","B","H","k","t","T"])}parse(e,a,r){switch(a){case"a":case"aa":case"aaa":return r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"});case"aaaaa":return r.dayPeriod(e,{width:"narrow",context:"formatting"});case"aaaa":default:return r.dayPeriod(e,{width:"wide",context:"formatting"})||r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"})}}set(e,a,r){return e.setHours(aa(r),0,0,0),e}}class fo extends M{constructor(){super(...arguments);u(this,"priority",80);u(this,"incompatibleTokens",["a","B","H","k","t","T"])}parse(e,a,r){switch(a){case"b":case"bb":case"bbb":return r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"});case"bbbbb":return r.dayPeriod(e,{width:"narrow",context:"formatting"});case"bbbb":default:return r.dayPeriod(e,{width:"wide",context:"formatting"})||r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"})}}set(e,a,r){return e.setHours(aa(r),0,0,0),e}}class go extends M{constructor(){super(...arguments);u(this,"priority",80);u(this,"incompatibleTokens",["a","b","t","T"])}parse(e,a,r){switch(a){case"B":case"BB":case"BBB":return r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"});case"BBBBB":return r.dayPeriod(e,{width:"narrow",context:"formatting"});case"BBBB":default:return r.dayPeriod(e,{width:"wide",context:"formatting"})||r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"})}}set(e,a,r){return e.setHours(aa(r),0,0,0),e}}class yo extends M{constructor(){super(...arguments);u(this,"priority",70);u(this,"incompatibleTokens",["H","K","k","t","T"])}parse(e,a,r){switch(a){case"h":return F(H.hour12h,e);case"ho":return r.ordinalNumber(e,{unit:"hour"});default:return B(a.length,e)}}validate(e,a){return a>=1&&a<=12}set(e,a,r){const n=e.getHours()>=12;return n&&r<12?e.setHours(r+12,0,0,0):!n&&r===12?e.setHours(0,0,0,0):e.setHours(r,0,0,0),e}}class vo extends M{constructor(){super(...arguments);u(this,"priority",70);u(this,"incompatibleTokens",["a","b","h","K","k","t","T"])}parse(e,a,r){switch(a){case"H":return F(H.hour23h,e);case"Ho":return r.ordinalNumber(e,{unit:"hour"});default:return B(a.length,e)}}validate(e,a){return a>=0&&a<=23}set(e,a,r){return e.setHours(r,0,0,0),e}}class wo extends M{constructor(){super(...arguments);u(this,"priority",70);u(this,"incompatibleTokens",["h","H","k","t","T"])}parse(e,a,r){switch(a){case"K":return F(H.hour11h,e);case"Ko":return r.ordinalNumber(e,{unit:"hour"});default:return B(a.length,e)}}validate(e,a){return a>=0&&a<=11}set(e,a,r){return e.getHours()>=12&&r<12?e.setHours(r+12,0,0,0):e.setHours(r,0,0,0),e}}class bo extends M{constructor(){super(...arguments);u(this,"priority",70);u(this,"incompatibleTokens",["a","b","h","H","K","t","T"])}parse(e,a,r){switch(a){case"k":return F(H.hour24h,e);case"ko":return r.ordinalNumber(e,{unit:"hour"});default:return B(a.length,e)}}validate(e,a){return a>=1&&a<=24}set(e,a,r){const n=r<=24?r%24:r;return e.setHours(n,0,0,0),e}}class xo extends M{constructor(){super(...arguments);u(this,"priority",60);u(this,"incompatibleTokens",["t","T"])}parse(e,a,r){switch(a){case"m":return F(H.minute,e);case"mo":return r.ordinalNumber(e,{unit:"minute"});default:return B(a.length,e)}}validate(e,a){return a>=0&&a<=59}set(e,a,r){return e.setMinutes(r,0,0),e}}class ko extends M{constructor(){super(...arguments);u(this,"priority",50);u(this,"incompatibleTokens",["t","T"])}parse(e,a,r){switch(a){case"s":return F(H.second,e);case"so":return r.ordinalNumber(e,{unit:"second"});default:return B(a.length,e)}}validate(e,a){return a>=0&&a<=59}set(e,a,r){return e.setSeconds(r,0),e}}class Do extends M{constructor(){super(...arguments);u(this,"priority",30);u(this,"incompatibleTokens",["t","T"])}parse(e,a){const r=n=>Math.trunc(n*Math.pow(10,-a.length+3));return P(B(a.length,e),r)}set(e,a,r){return e.setMilliseconds(r),e}}class So extends M{constructor(){super(...arguments);u(this,"priority",10);u(this,"incompatibleTokens",["t","T","x"])}parse(e,a){switch(a){case"X":return ne(re.basicOptionalMinutes,e);case"XX":return ne(re.basic,e);case"XXXX":return ne(re.basicOptionalSeconds,e);case"XXXXX":return ne(re.extendedOptionalSeconds,e);case"XXX":default:return ne(re.extended,e)}}set(e,a,r){return a.timestampIsSet?e:I(e,e.getTime()-Ot(e)-r)}}class Co extends M{constructor(){super(...arguments);u(this,"priority",10);u(this,"incompatibleTokens",["t","T","X"])}parse(e,a){switch(a){case"x":return ne(re.basicOptionalMinutes,e);case"xx":return ne(re.basic,e);case"xxxx":return ne(re.basicOptionalSeconds,e);case"xxxxx":return ne(re.extendedOptionalSeconds,e);case"xxx":default:return ne(re.extended,e)}}set(e,a,r){return a.timestampIsSet?e:I(e,e.getTime()-Ot(e)-r)}}class To extends M{constructor(){super(...arguments);u(this,"priority",40);u(this,"incompatibleTokens","*")}parse(e){return Pr(e)}set(e,a,r){return[I(e,r*1e3),{timestampIsSet:!0}]}}class Mo extends M{constructor(){super(...arguments);u(this,"priority",20);u(this,"incompatibleTokens","*")}parse(e){return Pr(e)}set(e,a,r){return[I(e,r),{timestampIsSet:!0}]}}const $o={G:new Wi,y:new Yi,Y:new ji,R:new Gi,u:new Xi,Q:new Qi,q:new Ji,M:new Ki,L:new Zi,w:new to,I:new so,d:new io,D:new oo,E:new lo,e:new co,c:new ho,i:new po,a:new mo,b:new fo,B:new go,h:new yo,H:new vo,K:new wo,k:new bo,m:new xo,s:new ko,S:new Do,X:new So,x:new Co,t:new To,T:new Mo},Eo=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Ao=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Ro=/^'([^]*?)'?$/,Fo=/''/g,Lo=/\S/,Oo=/[a-zA-Z]/;function Pe(s,t,e,a){var D,T,S,k;const r=()=>I(e,NaN),n=Hi(),i=n.locale??Dt,o=n.firstWeekContainsDate??((T=(D=n.locale)==null?void 0:D.options)==null?void 0:T.firstWeekContainsDate)??1,l=n.weekStartsOn??((k=(S=n.locale)==null?void 0:S.options)==null?void 0:k.weekStartsOn)??0;if(!t)return s?r():A(e,a==null?void 0:a.in);const d={firstWeekContainsDate:o,weekStartsOn:l,locale:i},c=[new Ui(a==null?void 0:a.in,e)],p=t.match(Ao).map(h=>{const g=h[0];if(g in Gt){const C=Gt[g];return C(h,i.formatLong)}return h}).join("").match(Eo),f=[];for(let h of p){Nr(h)&&Xt(h,t,s),zr(h)&&Xt(h,t,s);const g=h[0],C=$o[g];if(C){const{incompatibleTokens:R}=C;if(Array.isArray(R)){const N=f.find(O=>R.includes(O.token)||O.token===g);if(N)throw new RangeError(`The format string mustn't contain \`${N.fullToken}\` and \`${h}\` at the same time`)}else if(C.incompatibleTokens==="*"&&f.length>0)throw new RangeError(`The format string mustn't contain \`${h}\` and any other token at the same time`);f.push({token:g,fullToken:h});const z=C.run(s,h,i.match,d);if(!z)return r();c.push(z.setter),s=z.rest}else{if(g.match(Oo))throw new RangeError("Format string contains an unescaped latin alphabet character `"+g+"`");if(h==="''"?h="'":g==="'"&&(h=Bo(h)),s.indexOf(h)===0)s=s.slice(h.length);else return r()}}if(s.length>0&&Lo.test(s))return r();const m=c.map(h=>h.priority).sort((h,g)=>g-h).filter((h,g,C)=>C.indexOf(h)===g).map(h=>c.filter(g=>g.priority===h).sort((g,C)=>C.subPriority-g.subPriority)).map(h=>h[0]);let y=A(e,a==null?void 0:a.in);if(isNaN(+y))return r();const v={};for(const h of m){if(!h.validate(y,d))return r();const g=h.set(y,v,d);Array.isArray(g)?(y=g[0],Object.assign(v,g[1])):y=g}return y}function Bo(s){return s.match(Ro)[1].replace(Fo,"'")}function zo(s,t,e){return ea(s,-1,e)}function No(s,t,e){return Fr(s,-1,e)}class W extends De{constructor(){super(...arguments),this.day=null,this.selected=!1,this.hovered=!1,this.dateTo=null,this.dateFrom=null,this.month=null,this.min=null,this.max=null,this.disabled=!1,this.disabledDays=[],this.hoveredDate=null,this.isCurrentDate=!1,this._locale=null}get locale(){return this._locale?this._locale:Dt}set locale(t){const e=this._locale;this._locale=t,this.requestUpdate("locale",e)}render(){let t,e;return w`
    <button
      @click="${this.handleTap}"
      @mouseover="${this.handleHover}"
      @focus="${this.handleHover}"
      class="day body-lg ${this.isCurrentDate?"currentDate":""} ${this.isSelected(this.selected)} ${this.isHovered(this.hovered)} ${this.isEnabled(this.day,this.min,this.max,this.disabledDays)}"
      ?disabled="${this.disabled}"
      title="${this.getTitle((t=this.day)===null||t===void 0?void 0:t.date)}">
      <div class="currentDayMarker">${(e=this.day)===null||e===void 0?void 0:e.title}</div>
    </button>
  `}updated(t){(t.has("dateFrom")||t.has("dateTo")||t.has("hoveredDate")||t.has("day"))&&this.dateChanged(this.dateFrom,this.dateTo,this.hoveredDate,this.day)}dateChanged(t,e,a,r){this.selected=!1,this.hovered=!1;const n=parseInt(t,10),i=parseInt(e,10);r&&(($a(le(i*1e3))/1e3===r.date||$a(le(n*1e3))/1e3===r.date)&&(this.selected=!0),((a===r.date||r.date<a)&&r.date>n&&!i&&!Number.isNaN(n)&&n!==void 0&&!this.selected||r.date>n&&r.date<i)&&(this.hovered=!0))}handleTap(){let t;this.disabled||this.dispatchEvent(new CustomEvent("date-is-selected",{detail:{date:(t=this.day)===null||t===void 0?void 0:t.date}}))}handleHover(){let t;this.dispatchEvent(new CustomEvent("date-is-hovered",{detail:{date:(t=this.day)===null||t===void 0?void 0:t.date}}))}isSelected(t){return t?"selected":""}isHovered(t){return t?"hovered":""}isEnabled(t,e,a,r){return this.disabled=!1,r&&t&&t.date&&(t.date<e||t.date>a||r.findIndex(n=>parseInt(n,10)===t.date)!==-1)?(this.disabled=!0,"disabled"):""}getTitle(t){return t===void 0?"":J(t*1e3,"PPPP",{locale:this.locale})}}W.styles=L`
  :host {
    display: block;
  }

  .day {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 38px;
    width: 38px;
    margin: 0;
    padding: 0;
    color: var(--wc-datepicker-cell-text);

    border: none;
    outline: none;
    background-color: transparent;
  }

  .day:focus {
    outline: 1px solid
    var(--wc-datepicker-cell-hovered, rgba(0, 150, 136, 0.5));
  }

  .day:not(.disabled):hover {
    background: var(--wc-datepicker-cell-hover, #e4e7e7);
    cursor: pointer;
  }

  .day.hovered {
    background: var(
    --wc-datepicker-cell-hovered,
    rgba(0, 150, 136, 0.5)
    ) !important;
    color: var(--wc-datepicker-cell-hovered-text, white);
  }

  .day.selected {
    background: var(
    --wc-datepicker-cell-selected,
    rgb(0, 150, 136)
    ) !important;
    color: var(--wc-datepicker-cell-selected-text, white);
  }

  .day.currentDate .currentDayMarker {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 80%;
    height: 80%;
    // TODO: talk to design about this
    font-weight: var(--wc-current-day-font-weight, bold);
    border-radius: 50%;
    background-color: var(--wc-current-day-color);
    color: var(--wc-current-day-color-text);
  }

  .day.disabled {
    opacity: 0.4;
  }
  `;b([x({type:Object})],W.prototype,"day",void 0);b([x({type:Boolean})],W.prototype,"selected",void 0);b([x({type:Boolean})],W.prototype,"hovered",void 0);b([x({type:String})],W.prototype,"dateTo",void 0);b([x({type:String})],W.prototype,"dateFrom",void 0);b([x({type:String})],W.prototype,"month",void 0);b([x({type:Number})],W.prototype,"min",void 0);b([x({type:Number})],W.prototype,"max",void 0);b([x({type:Boolean})],W.prototype,"disabled",void 0);b([x({type:Array})],W.prototype,"disabledDays",void 0);b([x({type:String})],W.prototype,"hoveredDate",void 0);b([x({type:Boolean})],W.prototype,"isCurrentDate",void 0);b([x({type:Object})],W.prototype,"locale",null);bt.prototype.registerComponent("wc-range-datepicker-cell",W);class Aa{constructor(t){this.date=parseInt(J(t,"t"),10),this.title=parseInt(J(t,"d"),10)}}class _ extends De{constructor(){super(),this.dateFrom=null,this.dateTo=null,this.hoveredDate=null,this.enableYearChange=!1,this.month="01",this.narrow=!1,this.noRange=!1,this.next=!1,this.prev=!1,this.year=2020,this.disabledDays=[],this.max=null,this.min=null,this.yearsList=[],this.monthsList=[],this.dayNamesOfTheWeek=[],this.daysOfMonth=[],this._locale=null,this.currentDate=parseInt(J(le(Date.now()),"t"),10),this.localeChanged(),this.yearAndMonthChanged(this.year,this.month)}get locale(){return this._locale?this._locale:Dt}set locale(t){const e=this._locale;this._locale=t,this.requestUpdate("locale",e)}render(){let t,e;return w`
    <div>
      <div class="header">
        ${this.renderPrevButton()}
        <div class="headerTitle">
          <div>${this.computeCurrentMonthName(this.month,this.year)}</div>
          <div>${this.renderYear()}</div>
        </div>
        ${this.renderNextButton()}
      </div>

      <div class="table">
        <div class="thead">
          <div class="tr">
            ${(t=this.dayNamesOfTheWeek)===null||t===void 0?void 0:t.map(a=>this.renderDayOfWeek(a))}
          </div>
        </div>
        <div class="tbody">
          ${(e=this.daysOfMonth)===null||e===void 0?void 0:e.map(a=>this.renderWeek(a))}
        </div>
      </div>
    </div>
    `}renderPrevButton(){return this.prev||this.narrow||this.enableYearChange?w`
        <button
          icon="chevron_left"
          @click="${this.handlePrevMonth}">
        </button>
      `:null}renderNextButton(){return this.next||this.narrow||this.enableYearChange?w`
        <button
          icon="chevron_right"
          @click="${this.handleNextMonth}">
        </button>`:null}renderYear(){return w`${this.year}`}renderDayOfWeek(t){return w`<div class="th body-default">${t}</div>`}renderWeek(t){return w`
      <div class="tr">${t.map(e=>this.renderDay(e))}</div>
    `}renderDay(t){return w`
    <div class="td ${this.tdIsEnabled(t)}">
      ${t?w`
        <wc-range-datepicker-cell
          .disabledDays="${this.disabledDays}"
          .min="${this.min}"
          .max="${this.max}"
          .month="${this.month}"
          .hoveredDate="${this.hoveredDate}"
          .dateTo="${this.dateTo}"
          .dateFrom="${this.dateFrom}"
          .locale="${this.locale}"
          .day="${t}"
          ?isCurrentDate="${this.isCurrentDate(t)}"
          @date-is-selected="${this.handleDateSelected}"
          @date-is-hovered="${this.handleDateHovered}">
        </wc-range-datepicker-cell>
      `:null}
    </div>
    `}async firstUpdated(){this.monthsList=["01","02","03","04","05","06","07","08","09","10","11","12"],setTimeout(()=>{this.setYears(1930,2100)}),await this.updateComplete}updated(t){t.has("locale")&&this.localeChanged(),t.has("year")&&this.dispatchEvent(new CustomEvent("year-changed",{detail:{value:this.year}})),(t.has("year")||t.has("month"))&&this.yearAndMonthChanged(this.year,this.month)}isCurrentDate(t){return t.date===this.currentDate}localeChanged(){const t=[];for(let n=0;n<7;n+=1)t.push(this.locale.localize.day(n,{width:"short"}));const e=this.locale.options.weekStartsOn?this.locale.options.weekStartsOn:0,a=t.slice().splice(0,e),r=t.slice().splice(e,t.length).concat(a);this.dayNamesOfTheWeek=r}yearAndMonthChanged(t,e){if(t&&e){let a=`${e}`;a=a.substring(a.length-2);let r=`01/${a}/${t}`,n=Pe(r,"dd/MM/yyyy",new Date);const i=Un(n),o=J(i,"dd/MM/yyyy"),l=this.locale.options.weekStartsOn?this.locale.options.weekStartsOn:0,d=[];let c=[];const p=6;for(;r!==o;){let f=Ni(n)-l;f<0&&(f=6);const m=new Aa(n);if(c.push(m),f===p){for(let y=c.length;y<p+1;y+=1)c.unshift(null);d.push(c.slice()),c=[]}if(n=Zt(n,1),r=J(n,"dd/MM/yyyy"),r===o){const y=new Aa(n);c.push(y);for(let v=c.length;v<=p;v+=1)c.push(null);d.push(c.slice()),c=[]}}this.daysOfMonth=d}}computeCurrentMonthName(t,e){return J(new Date(e,parseInt(t,10)-1),"MMMM",{locale:this.locale})}tdIsEnabled(t){return t?"enabled":""}handleDateSelected(t){const{detail:e}=t,{date:a}=e;this.noRange?this.dateFrom=a:this.dateFrom&&this.dateTo?(this.dateFrom=a,this.dateTo=null,this.hoveredDate=null):!this.dateFrom||this.dateFrom&&a<this.dateFrom?this.dateFrom=a:(!this.dateTo||this.dateTo&&a>this.dateTo)&&(this.dateTo=a),this.dispatchEvent(new CustomEvent("date-from-changed",{detail:{value:this.dateFrom}})),this.dispatchEvent(new CustomEvent("date-to-changed",{detail:{value:this.dateTo}}))}handleOpenYearSelection(){let t;const e=(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(".year-change"),a=e.items.findIndex(r=>r.value===this.year.toString());e.select(a),e.show()}handleYearSelected(){let t;const a=((t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(".year-change")).selected;this.year=parseInt(a==null?void 0:a.value,10)}handleDateHovered(t){this.hoveredDate=t.detail.date,this.dispatchEvent(new CustomEvent("hovered-date-changed",{detail:{value:this.hoveredDate}}))}handleNextMonth(){let t,e;const a=(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(".tbody"),r=(e=this.shadowRoot)===null||e===void 0?void 0:e.querySelector(".header > div");a==null||a.classList.add("withTransition"),a==null||a.classList.add("moveToLeft"),r==null||r.classList.add("withTransition"),r==null||r.classList.add("moveToLeft");const n=Pe(this.month,"MM",new Date),i=ea(n,1),o=J(i,"MM",{locale:this.locale});if(this.month=o,this.month==="01"){const l=Pe(this.year.toString(),"yyyy",new Date),d=Fr(l,1),c=J(d,"yyyy",{locale:this.locale});this.year=parseInt(c,10)}this.dispatchEvent(new CustomEvent("next-month")),setTimeout(()=>{a==null||a.classList.remove("withTransition"),a==null||a.classList.add("moveToRight"),a==null||a.classList.remove("moveToLeft"),r==null||r.classList.remove("withTransition"),r==null||r.classList.add("moveToRight"),r==null||r.classList.remove("moveToLeft"),setTimeout(()=>{a==null||a.classList.add("withTransition"),a==null||a.classList.remove("moveToRight"),r==null||r.classList.add("withTransition"),r==null||r.classList.remove("moveToRight"),setTimeout(()=>{a==null||a.classList.remove("withTransition"),r==null||r.classList.remove("withTransition")},100)},100)},100)}handlePrevMonth(){let t,e;const a=(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(".tbody"),r=(e=this.shadowRoot)===null||e===void 0?void 0:e.querySelector(".header > div");a==null||a.classList.add("withTransition"),a==null||a.classList.add("moveToRight"),r==null||r.classList.add("withTransition"),r==null||r.classList.add("moveToRight");const n=Pe(this.month,"MM",new Date),i=zo(n),o=J(i,"MM",{locale:this.locale});if(this.month=o,this.month==="12"){const l=Pe(this.year.toString(),"yyyy",new Date),d=No(l),c=J(d,"yyyy",{locale:this.locale});this.year=parseInt(c,10)}this.dispatchEvent(new CustomEvent("prev-month")),setTimeout(()=>{a==null||a.classList.remove("withTransition"),a==null||a.classList.add("moveToLeft"),a==null||a.classList.remove("moveToRight"),r==null||r.classList.remove("withTransition"),r==null||r.classList.add("moveToLeft"),r==null||r.classList.remove("moveToRight"),setTimeout(()=>{a==null||a.classList.add("withTransition"),a==null||a.classList.remove("moveToLeft"),r==null||r.classList.add("withTransition"),r==null||r.classList.remove("moveToLeft"),setTimeout(()=>{r==null||r.classList.remove("withTransition"),r==null||r.classList.remove("withTransition")},100)},100)},100)}setYears(t,e){const a=[];for(let r=t;r<=e;r+=1)a.push(r);this.yearsList=a}}_.styles=L`
  :host {
    display: block;
    width: 266px;
  }

  :host > div {
    overflow: hidden;
  }

  div.table {
    display: table;
    border-collapse: collapse;
    table-layout: fixed;
  }

  div.th {
    display: table-cell;
    color: var(--range-datepicker-day-names-text, rgb(117, 117, 117));
    font-size: 11px;
    width: 38px;
    padding: 0;
    margin: 0;
    text-align: center;
  }

  div.tr {
    display: table-row;
    height: 38px;
  }

  div.td {
    display: table-cell;
    padding: 0;
    width: 38px;
    margin: 0;
    height: 38px;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 266px;
    margin: 10px 0;
    text-align: center;
    color: var(--range-datepicker-month-text);
  }

  .headerTitle {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .header mwc-icon-button {
    padding: 0;
    --mdc-icon-size: 30px;
  }

  .header::first-letter {
    text-transform: uppercase;
  }

  .header > div > div {
    margin-right: 8px;
  }

  div.tbody {
    transition: all 0ms;
    transform: translateX(0);
    height: 235px;
  }

  .withTransition {
    transition: all 100ms;
  }

  .moveToLeft {
    transform: translateX(-274px);
  }

  .moveToRight {
    transform: translateX(274px);
  }

  .withTransition td,
  .moveToLeft td,
  .moveToRight td {
    border: none;
  }

  .year-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .year-change {
    max-height: 200px;
  }
  `;b([x({type:String})],_.prototype,"dateFrom",void 0);b([x({type:String})],_.prototype,"dateTo",void 0);b([x({type:String})],_.prototype,"hoveredDate",void 0);b([x({type:Boolean})],_.prototype,"enableYearChange",void 0);b([x({type:String})],_.prototype,"month",void 0);b([x({type:Boolean})],_.prototype,"narrow",void 0);b([x({type:Boolean})],_.prototype,"noRange",void 0);b([x({type:Boolean})],_.prototype,"next",void 0);b([x({type:Boolean})],_.prototype,"prev",void 0);b([x({type:String})],_.prototype,"year",void 0);b([x({type:Array})],_.prototype,"disabledDays",void 0);b([x({type:Object})],_.prototype,"locale",null);b([x({type:String})],_.prototype,"max",void 0);b([x({type:String})],_.prototype,"min",void 0);b([x({type:Array})],_.prototype,"yearsList",void 0);b([x({type:Array})],_.prototype,"monthsList",void 0);b([x({type:Array})],_.prototype,"dayNamesOfTheWeek",void 0);b([x({type:Array})],_.prototype,"daysOfMonth",void 0);bt.prototype.registerComponent("wc-range-datepicker-calendar",_);const Ho=L`.body-default{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-default-font-size, 1rem);line-height:var(--wcss-body-default-line-height, 1.5rem)}.body-lg{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-lg-font-size, 1.125rem);line-height:var(--wcss-body-lg-line-height, 1.625rem)}.body-sm{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-sm-font-size, 0.875rem);line-height:var(--wcss-body-sm-line-height, 1.25rem)}.body-xs{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-xs-font-size, 0.75rem);line-height:var(--wcss-body-xs-line-height, 1rem)}.body-2xs{font-family:var(--wcss-body-family, "AS Circular"),system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);font-size:var(--wcss-body-2xs-font-size, 0.625rem);line-height:var(--wcss-body-2xs-line-height, 0.875rem)}.display-2xl{font-family:var(--wcss-display-2xl-family, "AS Circular"),var(--wcss-display-2xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-2xl-letter-spacing, 0);font-weight:var(--wcss-display-2xl-weight, 300);line-height:var(--wcss-display-2xl-line-height, 1.3);font-size:var(--wcss-display-2xl-font-size, clamp(3.5rem, 6vw, 5.375rem))}.display-xl{font-family:var(--wcss-display-xl-family, "AS Circular"),var(--wcss-display-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-xl-letter-spacing, 0);font-weight:var(--wcss-display-xl-weight, 300);line-height:var(--wcss-display-xl-line-height, 1.3);font-size:var(--wcss-display-xl-font-size, clamp(3rem, 5.3333333333vw, 4.5rem))}.display-lg{font-family:var(--wcss-display-lg-family, "AS Circular"),var(--wcss-display-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-lg-letter-spacing, 0);font-weight:var(--wcss-display-lg-weight, 300);line-height:var(--wcss-display-lg-line-height, 1.3);font-size:var(--wcss-display-lg-font-size, clamp(2.75rem, 4.6666666667vw, 4rem))}.display-md{font-family:var(--wcss-display-md-family, "AS Circular"),var(--wcss-display-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-md-letter-spacing, 0);font-weight:var(--wcss-display-md-weight, 300);line-height:var(--wcss-display-md-line-height, 1.3);font-size:var(--wcss-display-md-font-size, clamp(2.5rem, 4vw, 3.5rem))}.display-sm{font-family:var(--wcss-display-sm-family, "AS Circular"),var(--wcss-display-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-sm-letter-spacing, 0);font-weight:var(--wcss-display-sm-weight, 300);line-height:var(--wcss-display-sm-line-height, 1.3);font-size:var(--wcss-display-sm-font-size, clamp(2rem, 3.6666666667vw, 3rem))}.display-xs{font-family:var(--wcss-display-xs-family, "AS Circular"),var(--wcss-display-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-display-xs-letter-spacing, 0);font-weight:var(--wcss-display-xs-weight, 300);line-height:var(--wcss-display-xs-line-height, 1.3);font-size:var(--wcss-display-xs-font-size, clamp(1.75rem, 3vw, 2.375rem))}.heading-xl{font-family:var(--wcss-heading-xl-family, "AS Circular"),var(--wcss-heading-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-xl-letter-spacing, 0);font-weight:var(--wcss-heading-xl-weight, 300);line-height:var(--wcss-heading-xl-line-height, 1.3);font-size:var(--wcss-heading-xl-font-size, clamp(2rem, 3vw, 2.5rem))}.heading-lg{font-family:var(--wcss-heading-lg-family, "AS Circular"),var(--wcss-heading-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-lg-letter-spacing, 0);font-weight:var(--wcss-heading-lg-weight, 300);line-height:var(--wcss-heading-lg-line-height, 1.3);font-size:var(--wcss-heading-lg-font-size, clamp(1.75rem, 2.6666666667vw, 2.25rem))}.heading-md{font-family:var(--wcss-heading-md-family, "AS Circular"),var(--wcss-heading-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-md-letter-spacing, 0);font-weight:var(--wcss-heading-md-weight, 300);line-height:var(--wcss-heading-md-line-height, 1.3);font-size:var(--wcss-heading-md-font-size, clamp(1.625rem, 2.3333333333vw, 1.75rem))}.heading-sm{font-family:var(--wcss-heading-sm-family, "AS Circular"),var(--wcss-heading-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-sm-letter-spacing, 0);font-weight:var(--wcss-heading-sm-weight, 300);line-height:var(--wcss-heading-sm-line-height, 1.3);font-size:var(--wcss-heading-sm-font-size, clamp(1.375rem, 2vw, 1.5rem))}.heading-xs{font-family:var(--wcss-heading-xs-family, "AS Circular"),var(--wcss-heading-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-xs-letter-spacing, 0);font-weight:var(--wcss-heading-xs-weight, 450);line-height:var(--wcss-heading-xs-line-height, 1.3);font-size:var(--wcss-heading-xs-font-size, clamp(1.25rem, 1.6666666667vw, 1.25rem))}.heading-2xs{font-family:var(--wcss-heading-2xs-family, "AS Circular"),var(--wcss-heading-2xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-heading-2xs-letter-spacing, 0);font-weight:var(--wcss-heading-2xs-weight, 450);line-height:var(--wcss-heading-2xs-line-height, 1.3);font-size:var(--wcss-heading-2xs-font-size, clamp(1.125rem, 1.5vw, 1.125rem))}.accent-2xl{font-family:var(--wcss-accent-2xl-family, "Good OT"),var(--wcss-accent-2xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-2xl-letter-spacing, 0.05em);font-weight:var(--wcss-accent-2xl-weight, 450);line-height:var(--wcss-accent-2xl-line-height, 1);font-size:var(--wcss-accent-2xl-font-size, clamp(2rem, 3.1666666667vw, 2.375rem));text-transform:uppercase}.accent-xl{font-family:var(--wcss-accent-xl-family, "Good OT"),var(--wcss-accent-xl-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-xl-letter-spacing, 0.05em);font-weight:var(--wcss-accent-xl-weight, 450);line-height:var(--wcss-accent-xl-line-height, 1.3);font-size:var(--wcss-accent-xl-font-size, clamp(1.625rem, 2.3333333333vw, 2rem));text-transform:uppercase}.accent-lg{font-family:var(--wcss-accent-lg-family, "Good OT"),var(--wcss-accent-lg-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-lg-letter-spacing, 0.05em);font-weight:var(--wcss-accent-lg-weight, 450);line-height:var(--wcss-accent-lg-line-height, 1.3);font-size:var(--wcss-accent-lg-font-size, clamp(1.5rem, 2.1666666667vw, 1.75rem));text-transform:uppercase}.accent-md{font-family:var(--wcss-accent-md-family, "Good OT"),var(--wcss-accent-md-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-md-letter-spacing, 0.05em);font-weight:var(--wcss-accent-md-weight, 500);line-height:var(--wcss-accent-md-line-height, 1.3);font-size:var(--wcss-accent-md-font-size, clamp(1.375rem, 1.8333333333vw, 1.5rem));text-transform:uppercase}.accent-sm{font-family:var(--wcss-accent-sm-family, "Good OT"),var(--wcss-accent-sm-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-sm-letter-spacing, 0.05em);font-weight:var(--wcss-accent-sm-weight, 500);line-height:var(--wcss-accent-sm-line-height, 1.3);font-size:var(--wcss-accent-sm-font-size, clamp(1.125rem, 1.5vw, 1.25rem));text-transform:uppercase}.accent-xs{font-family:var(--wcss-accent-xs-family, "Good OT"),var(--wcss-accent-xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-xs-letter-spacing, 0.1em);font-weight:var(--wcss-accent-xs-weight, 500);line-height:var(--wcss-accent-xs-line-height, 1.3);font-size:var(--wcss-accent-xs-font-size, clamp(1rem, 1.3333333333vw, 1rem));text-transform:uppercase}.accent-2xs{font-family:var(--wcss-accent-2xs-family, "Good OT"),var(--wcss-accent-2xs-family-fallback, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);letter-spacing:var(--wcss-accent-2xs-letter-spacing, 0.1em);font-weight:var(--wcss-accent-2xs-weight, 450);line-height:var(--wcss-accent-2xs-line-height, 1.3);font-size:var(--wcss-accent-2xs-font-size, clamp(0.875rem, 1.1666666667vw, 0.875rem));text-transform:uppercase}@media screen and (max-width: 576px){:host{display:flex;justify-content:center}}.day{position:relative;width:var(--ds-size-500, 2.5rem);height:calc(var(--ds-size-700, 3.5rem) - 2px);padding:0;border-width:1px;border-style:solid;border-radius:var(--ds-size-300, 1.5rem);cursor:pointer;user-select:none}.day.disabled{cursor:default !important}.day.reference{box-shadow:inset 0 0 0 2px var(--ds-advanced-color-shared-background, #ffffff)}.day.inRange::before{position:absolute;z-index:-1;top:50%;left:50%;display:block;width:14.2857142857vw;height:var(--ds-size-600, 3rem);content:"";transform:translate(-50%, -50%)}@media screen and (min-width: 576px){.day.inRange::before{width:var(--ds-size-600, 3rem)}}.day.rangeDepartDate::before{position:absolute;z-index:-1;top:50%;left:50%;display:block;width:14.2857142857vw;height:var(--ds-size-600, 3rem);content:"";transform:translate(-50%, -50%);width:7.1428571429vw;transform:translate(0%, -50%)}@media screen and (min-width: 576px){.day.rangeDepartDate::before{width:calc(var(--ds-size-600, 3rem)/2)}}.day.rangeReturnDate::before,.day.lastHoveredDate::before{position:absolute;z-index:-1;top:50%;left:50%;display:block;width:14.2857142857vw;height:var(--ds-size-600, 3rem);content:"";transform:translate(-50%, -50%);width:7.1428571429vw;transform:translate(-100%, -50%)}@media screen and (min-width: 576px){.day.rangeReturnDate::before,.day.lastHoveredDate::before{width:calc(var(--ds-size-600, 3rem)/2)}}.dateSlot{display:flex;flex-direction:column}::slotted([slot^=date_]){position:absolute;top:80%;left:50%;width:100%;white-space:nowrap;transform:translate(-50%, -50%)}::slotted(auro-icon){max-height:24px;max-width:24px}:host([renderForDateSlot]) .buttonWrapper{position:relative;width:100%;top:5px}:host([renderForDateSlot]) .currentDayMarker{position:relative;padding-bottom:5px;top:-8px}@media screen and (min-width: 576px){.day{width:var(--ds-size-600, 3rem);height:var(--ds-size-800, 4rem)}.day:hover{cursor:pointer}}`,Po=L`:host ::slotted([slot^=date_]){color:var(--ds-auro-calendar-cell-price-text-color)}:host ::slotted([slot^=date_][highlight]){--ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-status-success, #447a1f)}:host .day{border-color:var(--ds-auro-calendar-cell-border-color);background-color:var(--ds-auro-calendar-cell-container-color);color:var(--ds-auro-calendar-cell-text-color)}:host .day.selected{--ds-auro-calendar-cell-container-color: var(--ds-advanced-color-state-selected, #01426a);--ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-inverse, #ffffff);--ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-inverse, #ffffff)}:host .day.selected ::slotted([slot^=date_][highlight]){--ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-status-success-subtle, #d6eac7)}:host .day.selected:hover{--ds-auro-calendar-cell-container-color: var(--ds-advanced-color-state-selected-hover, #00274a);--ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-inverse, #ffffff)}:host .day.reference{--ds-auro-calendar-cell-border-color: var(--ds-basic-color-border-default, #959595)}:host .day.reference:not(.selected):not(.disabled){--ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-muted, #676767)}:host .day.reference.selected{--ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-inverse, #ffffff)}:host .day:hover{--ds-auro-calendar-cell-container-color: var(--ds-advanced-color-state-background-hover, #f2f2f2);--ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-default, #2a2a2a)}:host .day.disabled{--ds-auro-calendar-cell-container-color: transparent;--ds-auro-calendar-cell-text-color: var(--ds-basic-color-texticon-disabled, #d0d0d0);--ds-auro-calendar-cell-price-text-color: var(--ds-basic-color-texticon-disabled, #d0d0d0)}:host .day.inRange:before,:host .day.rangeDepartDate:before,:host .day.rangeReturnDate:before,:host .day.lastHoveredDate:before{background-color:var(--ds-auro-calendar-cell-in-range-color)}:host .day.sameDateTrip:before{--ds-auro-calendar-cell-in-range-color: transparent}`;class Ra{registerComponent(t,e){customElements.get(t)||customElements.define(t,class extends e{})}closestElement(t,e=this,a=(r,n=r&&r.closest(t))=>!r||r===document||r===window?null:n||a(r.getRootNode().host)){return a(e)}handleComponentTagRename(t,e){const a=e.toLowerCase();t.tagName.toLowerCase()!==a&&t.setAttribute(a,!0)}elementMatch(t,e){const a=e.toLowerCase();return t.tagName.toLowerCase()===a||t.hasAttribute(a)}}const _o=L`.body-default{font-size:var(--wcss-body-default-font-size, 1rem);line-height:var(--wcss-body-default-line-height, 1.5)}.body-default,.body-lg{font-family:var(--wcss-body-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0)}.body-lg{font-size:var(--wcss-body-lg-font-size, 1.125rem);line-height:var(--wcss-body-lg-line-height, 1.63)}.body-sm{font-size:var(--wcss-body-sm-font-size, 0.875rem);line-height:var(--wcss-body-sm-line-height, 1.25)}.body-sm,.body-xs{font-family:var(--wcss-body-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0)}.body-xs{font-size:var(--wcss-body-xs-font-size, 0.75rem);line-height:var(--wcss-body-xs-line-height, 1)}.body-2xs{font-family:var(--wcss-body-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-body-2xs-font-size, 0.625rem);font-weight:var(--wcss-body-weight, 450);letter-spacing:var(--wcss-body-letter-spacing, 0);line-height:var(--wcss-body-2xs-line-height, 0.88)}.display-2xl{font-family:var(--wcss-display-2xl-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-display-2xl-font-size, clamp(3.5rem, 6vw, 5.375rem));font-weight:var(--wcss-display-2xl-weight, 300);letter-spacing:var(--wcss-display-2xl-letter-spacing, 0);line-height:var(--wcss-display-2xl-line-height, 1.3)}.display-xl{font-family:var(--wcss-display-xl-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-display-xl-font-size, clamp(3rem, 5.3333333333vw, 4.5rem));font-weight:var(--wcss-display-xl-weight, 300);letter-spacing:var(--wcss-display-xl-letter-spacing, 0);line-height:var(--wcss-display-xl-line-height, 1.3)}.display-lg{font-family:var(--wcss-display-lg-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-display-lg-font-size, clamp(2.75rem, 4.6666666667vw, 4rem));font-weight:var(--wcss-display-lg-weight, 300);letter-spacing:var(--wcss-display-lg-letter-spacing, 0);line-height:var(--wcss-display-lg-line-height, 1.3)}.display-md{font-family:var(--wcss-display-md-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-display-md-font-size, clamp(2.5rem, 4vw, 3.5rem));font-weight:var(--wcss-display-md-weight, 300);letter-spacing:var(--wcss-display-md-letter-spacing, 0);line-height:var(--wcss-display-md-line-height, 1.3)}.display-sm{font-family:var(--wcss-display-sm-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-display-sm-font-size, clamp(2rem, 3.6666666667vw, 3rem));font-weight:var(--wcss-display-sm-weight, 300);letter-spacing:var(--wcss-display-sm-letter-spacing, 0);line-height:var(--wcss-display-sm-line-height, 1.3)}.display-xs{font-family:var(--wcss-display-xs-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-display-xs-font-size, clamp(1.75rem, 3vw, 2.375rem));font-weight:var(--wcss-display-xs-weight, 300);letter-spacing:var(--wcss-display-xs-letter-spacing, 0);line-height:var(--wcss-display-xs-line-height, 1.3)}.heading-xl{font-family:var(--wcss-heading-xl-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-heading-xl-font-size, clamp(2rem, 3vw, 2.5rem));font-weight:var(--wcss-heading-xl-weight, 300);letter-spacing:var(--wcss-heading-xl-letter-spacing, 0);line-height:var(--wcss-heading-xl-line-height, 1.3)}.heading-lg{font-family:var(--wcss-heading-lg-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-heading-lg-font-size, clamp(1.75rem, 2.6666666667vw, 2.25rem));font-weight:var(--wcss-heading-lg-weight, 300);letter-spacing:var(--wcss-heading-lg-letter-spacing, 0);line-height:var(--wcss-heading-lg-line-height, 1.3)}.heading-md{font-family:var(--wcss-heading-md-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-heading-md-font-size, clamp(1.625rem, 2.3333333333vw, 1.75rem));font-weight:var(--wcss-heading-md-weight, 300);letter-spacing:var(--wcss-heading-md-letter-spacing, 0);line-height:var(--wcss-heading-md-line-height, 1.3)}.heading-sm{font-family:var(--wcss-heading-sm-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-heading-sm-font-size, clamp(1.375rem, 2vw, 1.5rem));font-weight:var(--wcss-heading-sm-weight, 300);letter-spacing:var(--wcss-heading-sm-letter-spacing, 0);line-height:var(--wcss-heading-sm-line-height, 1.3)}.heading-xs{font-family:var(--wcss-heading-xs-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-heading-xs-font-size, clamp(1.25rem, 1.6666666667vw, 1.25rem));font-weight:var(--wcss-heading-xs-weight, 450);letter-spacing:var(--wcss-heading-xs-letter-spacing, 0);line-height:var(--wcss-heading-xs-line-height, 1.3)}.heading-2xs{font-family:var(--wcss-heading-2xs-family, "AS Circular", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-heading-2xs-font-size, clamp(1.125rem, 1.5vw, 1.125rem));font-weight:var(--wcss-heading-2xs-weight, 450);letter-spacing:var(--wcss-heading-2xs-letter-spacing, 0);line-height:var(--wcss-heading-2xs-line-height, 1.3)}.accent-2xl{font-family:var(--wcss-accent-2xl-family, "Good OT", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-accent-2xl-font-size, clamp(2rem, 3.1666666667vw, 2.375rem));font-weight:var(--wcss-accent-2xl-weight, 450);letter-spacing:var(--wcss-accent-2xl-letter-spacing, 0.05em);line-height:var(--wcss-accent-2xl-line-height, 1)}.accent-xl{font-family:var(--wcss-accent-xl-family, "Good OT", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-accent-xl-font-size, clamp(1.625rem, 2.3333333333vw, 2rem));font-weight:var(--wcss-accent-xl-weight, 450);letter-spacing:var(--wcss-accent-xl-letter-spacing, 0.05em);line-height:var(--wcss-accent-xl-line-height, 1.3)}.accent-lg{font-family:var(--wcss-accent-lg-family, "Good OT", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-accent-lg-font-size, clamp(1.5rem, 2.1666666667vw, 1.75rem));font-weight:var(--wcss-accent-lg-weight, 450);letter-spacing:var(--wcss-accent-lg-letter-spacing, 0.05em);line-height:var(--wcss-accent-lg-line-height, 1.3)}.accent-md{font-family:var(--wcss-accent-md-family, "Good OT", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-accent-md-font-size, clamp(1.375rem, 1.8333333333vw, 1.5rem));font-weight:var(--wcss-accent-md-weight, 500);letter-spacing:var(--wcss-accent-md-letter-spacing, 0.05em);line-height:var(--wcss-accent-md-line-height, 1.3)}.accent-sm{font-family:var(--wcss-accent-sm-family, "Good OT", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-accent-sm-font-size, clamp(1.125rem, 1.5vw, 1.25rem));font-weight:var(--wcss-accent-sm-weight, 500);letter-spacing:var(--wcss-accent-sm-letter-spacing, 0.05em);line-height:var(--wcss-accent-sm-line-height, 1.3)}.accent-xs{font-family:var(--wcss-accent-xs-family, "Good OT", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-accent-xs-font-size, clamp(1rem, 1.3333333333vw, 1rem));font-weight:var(--wcss-accent-xs-weight, 500);letter-spacing:var(--wcss-accent-xs-letter-spacing, 0.1em);line-height:var(--wcss-accent-xs-line-height, 1.3)}.accent-2xs{font-family:var(--wcss-accent-2xs-family, "Good OT", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif);font-size:var(--wcss-accent-2xs-font-size, clamp(0.875rem, 1.1666666667vw, 0.875rem));font-weight:var(--wcss-accent-2xs-weight, 450);letter-spacing:var(--wcss-accent-2xs-letter-spacing, 0.1em);line-height:var(--wcss-accent-2xs-line-height, 1.3)}:focus:not(:focus-visible){outline:3px solid transparent}.util_displayInline{display:inline}.util_displayInlineBlock{display:inline-block}.util_displayBlock{display:block}.util_displayFlex{display:flex}.util_displayHidden,:host(:not([data-show])) .popover,:host([disabled]) .popover,:host([addSpace]) :host(:not([data-show])) .popover{display:none}.util_displayHiddenVisually{position:absolute;overflow:hidden;clip:rect(1px, 1px, 1px, 1px);width:1px;height:1px;padding:0;border:0}.util_insetNone{padding:0}.util_insetXxxs{padding:.125rem}.util_insetXxxs--stretch{padding:.25rem .125rem}.util_insetXxxs--squish{padding:0 .125rem}.util_insetXxs{padding:.25rem}.util_insetXxs--stretch{padding:.375rem .25rem}.util_insetXxs--squish{padding:.125rem .25rem}.util_insetXs{padding:.5rem}.util_insetXs--stretch{padding:.75rem .5rem}.util_insetXs--squish{padding:.25rem .5rem}.util_insetSm{padding:.75rem}.util_insetSm--stretch{padding:1.125rem .75rem}.util_insetSm--squish{padding:.375rem .75rem}.util_insetMd{padding:1rem}.util_insetMd--stretch{padding:1.5rem 1rem}.util_insetMd--squish{padding:.5rem 1rem}.util_insetLg{padding:1.5rem}.util_insetLg--stretch{padding:2.25rem 1.5rem}.util_insetLg--squish{padding:.75rem 1.5rem}.util_insetXl{padding:2rem}.util_insetXl--stretch{padding:3rem 2rem}.util_insetXl--squish{padding:1rem 2rem}.util_insetXxl{padding:3rem}.util_insetXxl--stretch{padding:4.5rem 3rem}.util_insetXxl--squish{padding:1.5rem 3rem}.util_insetXxxl{padding:4rem}.util_insetXxxl--stretch{padding:6rem 4rem}.util_insetXxxl--squish{padding:2rem 4rem}::slotted(*){white-space:normal}::slotted(*:hover){cursor:pointer}[data-trigger-placement]::slotted(*:hover){position:relative}[data-trigger-placement]::slotted(*:hover):before{position:absolute;left:0;display:block;width:100%;height:calc(var(--ds-size-200, 1rem) + var(--ds-size-50, 0.25rem));content:""}[data-trigger-placement^=top]::slotted(*:hover):before{top:calc(-1*(var(--ds-size-200, 1rem) + var(--ds-size-50, 0.25rem)))}[data-trigger-placement^=bottom]::slotted(*:hover):before{bottom:calc(-1*(var(--ds-size-200, 1rem) + var(--ds-size-50, 0.25rem)))}:host([data-show]) .popover{z-index:var(--ds-depth-tooltip, 400)}:host([removeSpace]) .popover{margin:calc(-1*(var(--ds-size-50, 0.25rem) + 1px)) 0 !important}:host([addSpace]) .popover{margin:var(--ds-size-200, 1rem) 0 !important}:host([addSpace]) [data-trigger-placement]::slotted(*:hover):before{height:var(--ds-size-500, 2.5rem)}:host([addSpace]) [data-trigger-placement^=top]::slotted(*:hover):before{top:calc(-1*var(--ds-size-500, 2.5rem))}:host([addSpace]) [data-trigger-placement^=bottom]::slotted(*:hover):before{bottom:calc(-1*var(--ds-size-500, 2.5rem))}.popover{display:inline-block;max-width:calc(100% - var(--ds-size-400, 2rem));border-radius:var(--ds-border-radius, 0.375rem)}@media screen and (min-width: 576px){.popover{max-width:50%}}@media screen and (min-width: 768px){.popover{max-width:40%}}@media screen and (min-width: 1024px){.popover{max-width:27rem}}[data-popper-placement^=top]>.arrow{bottom:calc(-1*(var(--ds-size-100, 0.5rem) + var(--ds-size-25, 0.125rem)))}[data-popper-placement^=top]>.arrow:before{top:calc(-1*var(--ds-size-200, 1rem));left:calc(-1*var(--ds-size-75, 0.375rem));transform:rotate(45deg)}[data-popper-placement^=bottom]>.arrow{top:calc(-1*(var(--ds-size-100, 0.5rem) + var(--ds-size-25, 0.125rem)))}[data-popper-placement^=bottom]>.arrow:before{top:var(--ds-size-50, 0.25rem);right:calc(-1*var(--ds-size-200, 1rem));transform:rotate(-135deg)}.arrow{position:relative;margin-top:-var(--ds-size-100, 0.5rem)}.arrow:before{position:absolute;width:var(--ds-size-150, 0.75rem);height:var(--ds-size-150, 0.75rem);content:""}`,Io=L`::slotted(*){color:var(--ds-auro-popover-text-color)}.popover{background-color:var(--ds-auro-popover-container-color);box-shadow:var(--ds-auro-popover-boxshadow-color)}.arrow:before{background-color:var(--ds-auro-popover-container-color);box-shadow:2px 2px 1px 0 var(--ds-auro-popover-boxshadow-color)}`,Vo=L`:host{--ds-auro-popover-boxshadow-color:var(--ds-elevation-200, 0px 0px 10px rgba(0, 0, 0, 0.15));--ds-auro-popover-container-color:var(--ds-basic-color-surface-default, #ffffff);--ds-auro-popover-text-color:var(--ds-basic-color-texticon-default, #2a2a2a)}`;var Y="top",Z="bottom",ee="right",j="left",ra="auto",St=[Y,Z,ee,j],Ae="start",xt="end",qo="clippingParents",Vr="viewport",_e="popper",Uo="reference",Fa=St.reduce(function(s,t){return s.concat([t+"-"+Ae,t+"-"+xt])},[]),qr=[].concat(St,[ra]).reduce(function(s,t){return s.concat([t,t+"-"+Ae,t+"-"+xt])},[]),Wo="beforeRead",Yo="read",jo="afterRead",Go="beforeMain",Xo="main",Qo="afterMain",Jo="beforeWrite",Ko="write",Zo="afterWrite",el=[Wo,Yo,jo,Go,Xo,Qo,Jo,Ko,Zo];function oe(s){return s?(s.nodeName||"").toLowerCase():null}function Q(s){if(s==null)return window;if(s.toString()!=="[object Window]"){var t=s.ownerDocument;return t&&t.defaultView||window}return s}function ke(s){var t=Q(s).Element;return s instanceof t||s instanceof Element}function K(s){var t=Q(s).HTMLElement;return s instanceof t||s instanceof HTMLElement}function na(s){if(typeof ShadowRoot>"u")return!1;var t=Q(s).ShadowRoot;return s instanceof t||s instanceof ShadowRoot}function tl(s){var t=s.state;Object.keys(t.elements).forEach(function(e){var a=t.styles[e]||{},r=t.attributes[e]||{},n=t.elements[e];!K(n)||!oe(n)||(Object.assign(n.style,a),Object.keys(r).forEach(function(i){var o=r[i];o===!1?n.removeAttribute(i):n.setAttribute(i,o===!0?"":o)}))})}function al(s){var t=s.state,e={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,e.popper),t.styles=e,t.elements.arrow&&Object.assign(t.elements.arrow.style,e.arrow),function(){Object.keys(t.elements).forEach(function(a){var r=t.elements[a],n=t.attributes[a]||{},i=Object.keys(t.styles.hasOwnProperty(a)?t.styles[a]:e[a]),o=i.reduce(function(l,d){return l[d]="",l},{});!K(r)||!oe(r)||(Object.assign(r.style,o),Object.keys(n).forEach(function(l){r.removeAttribute(l)}))})}}const sl={name:"applyStyles",enabled:!0,phase:"write",fn:tl,effect:al,requires:["computeStyles"]};function ie(s){return s.split("-")[0]}var xe=Math.max,zt=Math.min,Re=Math.round;function Qt(){var s=navigator.userAgentData;return s!=null&&s.brands&&Array.isArray(s.brands)?s.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function Ur(){return!/^((?!chrome|android).)*safari/i.test(Qt())}function Fe(s,t,e){t===void 0&&(t=!1),e===void 0&&(e=!1);var a=s.getBoundingClientRect(),r=1,n=1;t&&K(s)&&(r=s.offsetWidth>0&&Re(a.width)/s.offsetWidth||1,n=s.offsetHeight>0&&Re(a.height)/s.offsetHeight||1);var i=ke(s)?Q(s):window,o=i.visualViewport,l=!Ur()&&e,d=(a.left+(l&&o?o.offsetLeft:0))/r,c=(a.top+(l&&o?o.offsetTop:0))/n,p=a.width/r,f=a.height/n;return{width:p,height:f,top:c,right:d+p,bottom:c+f,left:d,x:d,y:c}}function ia(s){var t=Fe(s),e=s.offsetWidth,a=s.offsetHeight;return Math.abs(t.width-e)<=1&&(e=t.width),Math.abs(t.height-a)<=1&&(a=t.height),{x:s.offsetLeft,y:s.offsetTop,width:e,height:a}}function Wr(s,t){var e=t.getRootNode&&t.getRootNode();if(s.contains(t))return!0;if(e&&na(e)){var a=t;do{if(a&&s.isSameNode(a))return!0;a=a.parentNode||a.host}while(a)}return!1}function ce(s){return Q(s).getComputedStyle(s)}function rl(s){return["table","td","th"].indexOf(oe(s))>=0}function pe(s){return((ke(s)?s.ownerDocument:s.document)||window.document).documentElement}function _t(s){return oe(s)==="html"?s:s.assignedSlot||s.parentNode||(na(s)?s.host:null)||pe(s)}function La(s){return!K(s)||ce(s).position==="fixed"?null:s.offsetParent}function nl(s){var t=/firefox/i.test(Qt()),e=/Trident/i.test(Qt());if(e&&K(s)){var a=ce(s);if(a.position==="fixed")return null}var r=_t(s);for(na(r)&&(r=r.host);K(r)&&["html","body"].indexOf(oe(r))<0;){var n=ce(r);if(n.transform!=="none"||n.perspective!=="none"||n.contain==="paint"||["transform","perspective"].indexOf(n.willChange)!==-1||t&&n.willChange==="filter"||t&&n.filter&&n.filter!=="none")return r;r=r.parentNode}return null}function Ct(s){for(var t=Q(s),e=La(s);e&&rl(e)&&ce(e).position==="static";)e=La(e);return e&&(oe(e)==="html"||oe(e)==="body"&&ce(e).position==="static")?t:e||nl(s)||t}function oa(s){return["top","bottom"].indexOf(s)>=0?"x":"y"}function vt(s,t,e){return xe(s,zt(t,e))}function il(s,t,e){var a=vt(s,t,e);return a>e?e:a}function Yr(){return{top:0,right:0,bottom:0,left:0}}function jr(s){return Object.assign({},Yr(),s)}function Gr(s,t){return t.reduce(function(e,a){return e[a]=s,e},{})}var ol=function(t,e){return t=typeof t=="function"?t(Object.assign({},e.rects,{placement:e.placement})):t,jr(typeof t!="number"?t:Gr(t,St))};function ll(s){var t,e=s.state,a=s.name,r=s.options,n=e.elements.arrow,i=e.modifiersData.popperOffsets,o=ie(e.placement),l=oa(o),d=[j,ee].indexOf(o)>=0,c=d?"height":"width";if(!(!n||!i)){var p=ol(r.padding,e),f=ia(n),m=l==="y"?Y:j,y=l==="y"?Z:ee,v=e.rects.reference[c]+e.rects.reference[l]-i[l]-e.rects.popper[c],D=i[l]-e.rects.reference[l],T=Ct(n),S=T?l==="y"?T.clientHeight||0:T.clientWidth||0:0,k=v/2-D/2,h=p[m],g=S-f[c]-p[y],C=S/2-f[c]/2+k,R=vt(h,C,g),z=l;e.modifiersData[a]=(t={},t[z]=R,t.centerOffset=R-C,t)}}function cl(s){var t=s.state,e=s.options,a=e.element,r=a===void 0?"[data-popper-arrow]":a;r!=null&&(typeof r=="string"&&(r=t.elements.popper.querySelector(r),!r)||Wr(t.elements.popper,r)&&(t.elements.arrow=r))}const dl={name:"arrow",enabled:!0,phase:"main",fn:ll,effect:cl,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Le(s){return s.split("-")[1]}var hl={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ul(s,t){var e=s.x,a=s.y,r=t.devicePixelRatio||1;return{x:Re(e*r)/r||0,y:Re(a*r)/r||0}}function Oa(s){var t,e=s.popper,a=s.popperRect,r=s.placement,n=s.variation,i=s.offsets,o=s.position,l=s.gpuAcceleration,d=s.adaptive,c=s.roundOffsets,p=s.isFixed,f=i.x,m=f===void 0?0:f,y=i.y,v=y===void 0?0:y,D=typeof c=="function"?c({x:m,y:v}):{x:m,y:v};m=D.x,v=D.y;var T=i.hasOwnProperty("x"),S=i.hasOwnProperty("y"),k=j,h=Y,g=window;if(d){var C=Ct(e),R="clientHeight",z="clientWidth";if(C===Q(e)&&(C=pe(e),ce(C).position!=="static"&&o==="absolute"&&(R="scrollHeight",z="scrollWidth")),C=C,r===Y||(r===j||r===ee)&&n===xt){h=Z;var N=p&&C===g&&g.visualViewport?g.visualViewport.height:C[R];v-=N-a.height,v*=l?1:-1}if(r===j||(r===Y||r===Z)&&n===xt){k=ee;var O=p&&C===g&&g.visualViewport?g.visualViewport.width:C[z];m-=O-a.width,m*=l?1:-1}}var q=Object.assign({position:o},d&&hl),te=c===!0?ul({x:m,y:v},Q(e)):{x:m,y:v};if(m=te.x,v=te.y,l){var U;return Object.assign({},q,(U={},U[h]=S?"0":"",U[k]=T?"0":"",U.transform=(g.devicePixelRatio||1)<=1?"translate("+m+"px, "+v+"px)":"translate3d("+m+"px, "+v+"px, 0)",U))}return Object.assign({},q,(t={},t[h]=S?v+"px":"",t[k]=T?m+"px":"",t.transform="",t))}function pl(s){var t=s.state,e=s.options,a=e.gpuAcceleration,r=a===void 0?!0:a,n=e.adaptive,i=n===void 0?!0:n,o=e.roundOffsets,l=o===void 0?!0:o,d={placement:ie(t.placement),variation:Le(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:r,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Oa(Object.assign({},d,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:i,roundOffsets:l})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Oa(Object.assign({},d,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const ml={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:pl,data:{}};var Rt={passive:!0};function fl(s){var t=s.state,e=s.instance,a=s.options,r=a.scroll,n=r===void 0?!0:r,i=a.resize,o=i===void 0?!0:i,l=Q(t.elements.popper),d=[].concat(t.scrollParents.reference,t.scrollParents.popper);return n&&d.forEach(function(c){c.addEventListener("scroll",e.update,Rt)}),o&&l.addEventListener("resize",e.update,Rt),function(){n&&d.forEach(function(c){c.removeEventListener("scroll",e.update,Rt)}),o&&l.removeEventListener("resize",e.update,Rt)}}const gl={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:fl,data:{}};var yl={left:"right",right:"left",bottom:"top",top:"bottom"};function Lt(s){return s.replace(/left|right|bottom|top/g,function(t){return yl[t]})}var vl={start:"end",end:"start"};function Ba(s){return s.replace(/start|end/g,function(t){return vl[t]})}function la(s){var t=Q(s),e=t.pageXOffset,a=t.pageYOffset;return{scrollLeft:e,scrollTop:a}}function ca(s){return Fe(pe(s)).left+la(s).scrollLeft}function wl(s,t){var e=Q(s),a=pe(s),r=e.visualViewport,n=a.clientWidth,i=a.clientHeight,o=0,l=0;if(r){n=r.width,i=r.height;var d=Ur();(d||!d&&t==="fixed")&&(o=r.offsetLeft,l=r.offsetTop)}return{width:n,height:i,x:o+ca(s),y:l}}function bl(s){var t,e=pe(s),a=la(s),r=(t=s.ownerDocument)==null?void 0:t.body,n=xe(e.scrollWidth,e.clientWidth,r?r.scrollWidth:0,r?r.clientWidth:0),i=xe(e.scrollHeight,e.clientHeight,r?r.scrollHeight:0,r?r.clientHeight:0),o=-a.scrollLeft+ca(s),l=-a.scrollTop;return ce(r||e).direction==="rtl"&&(o+=xe(e.clientWidth,r?r.clientWidth:0)-n),{width:n,height:i,x:o,y:l}}function da(s){var t=ce(s),e=t.overflow,a=t.overflowX,r=t.overflowY;return/auto|scroll|overlay|hidden/.test(e+r+a)}function Xr(s){return["html","body","#document"].indexOf(oe(s))>=0?s.ownerDocument.body:K(s)&&da(s)?s:Xr(_t(s))}function wt(s,t){var e;t===void 0&&(t=[]);var a=Xr(s),r=a===((e=s.ownerDocument)==null?void 0:e.body),n=Q(a),i=r?[n].concat(n.visualViewport||[],da(a)?a:[]):a,o=t.concat(i);return r?o:o.concat(wt(_t(i)))}function Jt(s){return Object.assign({},s,{left:s.x,top:s.y,right:s.x+s.width,bottom:s.y+s.height})}function xl(s,t){var e=Fe(s,!1,t==="fixed");return e.top=e.top+s.clientTop,e.left=e.left+s.clientLeft,e.bottom=e.top+s.clientHeight,e.right=e.left+s.clientWidth,e.width=s.clientWidth,e.height=s.clientHeight,e.x=e.left,e.y=e.top,e}function za(s,t,e){return t===Vr?Jt(wl(s,e)):ke(t)?xl(t,e):Jt(bl(pe(s)))}function kl(s){var t=wt(_t(s)),e=["absolute","fixed"].indexOf(ce(s).position)>=0,a=e&&K(s)?Ct(s):s;return ke(a)?t.filter(function(r){return ke(r)&&Wr(r,a)&&oe(r)!=="body"}):[]}function Dl(s,t,e,a){var r=t==="clippingParents"?kl(s):[].concat(t),n=[].concat(r,[e]),i=n[0],o=n.reduce(function(l,d){var c=za(s,d,a);return l.top=xe(c.top,l.top),l.right=zt(c.right,l.right),l.bottom=zt(c.bottom,l.bottom),l.left=xe(c.left,l.left),l},za(s,i,a));return o.width=o.right-o.left,o.height=o.bottom-o.top,o.x=o.left,o.y=o.top,o}function Qr(s){var t=s.reference,e=s.element,a=s.placement,r=a?ie(a):null,n=a?Le(a):null,i=t.x+t.width/2-e.width/2,o=t.y+t.height/2-e.height/2,l;switch(r){case Y:l={x:i,y:t.y-e.height};break;case Z:l={x:i,y:t.y+t.height};break;case ee:l={x:t.x+t.width,y:o};break;case j:l={x:t.x-e.width,y:o};break;default:l={x:t.x,y:t.y}}var d=r?oa(r):null;if(d!=null){var c=d==="y"?"height":"width";switch(n){case Ae:l[d]=l[d]-(t[c]/2-e[c]/2);break;case xt:l[d]=l[d]+(t[c]/2-e[c]/2);break}}return l}function kt(s,t){t===void 0&&(t={});var e=t,a=e.placement,r=a===void 0?s.placement:a,n=e.strategy,i=n===void 0?s.strategy:n,o=e.boundary,l=o===void 0?qo:o,d=e.rootBoundary,c=d===void 0?Vr:d,p=e.elementContext,f=p===void 0?_e:p,m=e.altBoundary,y=m===void 0?!1:m,v=e.padding,D=v===void 0?0:v,T=jr(typeof D!="number"?D:Gr(D,St)),S=f===_e?Uo:_e,k=s.rects.popper,h=s.elements[y?S:f],g=Dl(ke(h)?h:h.contextElement||pe(s.elements.popper),l,c,i),C=Fe(s.elements.reference),R=Qr({reference:C,element:k,placement:r}),z=Jt(Object.assign({},k,R)),N=f===_e?z:C,O={top:g.top-N.top+T.top,bottom:N.bottom-g.bottom+T.bottom,left:g.left-N.left+T.left,right:N.right-g.right+T.right},q=s.modifiersData.offset;if(f===_e&&q){var te=q[r];Object.keys(O).forEach(function(U){var me=[ee,Z].indexOf(U)>=0?1:-1,fe=[Y,Z].indexOf(U)>=0?"y":"x";O[U]+=te[fe]*me})}return O}function Sl(s,t){t===void 0&&(t={});var e=t,a=e.placement,r=e.boundary,n=e.rootBoundary,i=e.padding,o=e.flipVariations,l=e.allowedAutoPlacements,d=l===void 0?qr:l,c=Le(a),p=c?o?Fa:Fa.filter(function(y){return Le(y)===c}):St,f=p.filter(function(y){return d.indexOf(y)>=0});f.length===0&&(f=p);var m=f.reduce(function(y,v){return y[v]=kt(s,{placement:v,boundary:r,rootBoundary:n,padding:i})[ie(v)],y},{});return Object.keys(m).sort(function(y,v){return m[y]-m[v]})}function Cl(s){if(ie(s)===ra)return[];var t=Lt(s);return[Ba(s),t,Ba(t)]}function Tl(s){var t=s.state,e=s.options,a=s.name;if(!t.modifiersData[a]._skip){for(var r=e.mainAxis,n=r===void 0?!0:r,i=e.altAxis,o=i===void 0?!0:i,l=e.fallbackPlacements,d=e.padding,c=e.boundary,p=e.rootBoundary,f=e.altBoundary,m=e.flipVariations,y=m===void 0?!0:m,v=e.allowedAutoPlacements,D=t.options.placement,T=ie(D),S=T===D,k=l||(S||!y?[Lt(D)]:Cl(D)),h=[D].concat(k).reduce(function(Se,de){return Se.concat(ie(de)===ra?Sl(t,{placement:de,boundary:c,rootBoundary:p,padding:d,flipVariations:y,allowedAutoPlacements:v}):de)},[]),g=t.rects.reference,C=t.rects.popper,R=new Map,z=!0,N=h[0],O=0;O<h.length;O++){var q=h[O],te=ie(q),U=Le(q)===Ae,me=[Y,Z].indexOf(te)>=0,fe=me?"width":"height",G=kt(t,{placement:q,boundary:c,rootBoundary:p,altBoundary:f,padding:d}),ae=me?U?ee:j:U?Z:Y;g[fe]>C[fe]&&(ae=Lt(ae));var Tt=Lt(ae),ge=[];if(n&&ge.push(G[te]<=0),o&&ge.push(G[ae]<=0,G[Tt]<=0),ge.every(function(Se){return Se})){N=q,z=!1;break}R.set(q,ge)}if(z)for(var Mt=y?3:1,Vt=function(de){var ze=h.find(function(Et){var ye=R.get(Et);if(ye)return ye.slice(0,de).every(function(qt){return qt})});if(ze)return N=ze,"break"},Be=Mt;Be>0;Be--){var $t=Vt(Be);if($t==="break")break}t.placement!==N&&(t.modifiersData[a]._skip=!0,t.placement=N,t.reset=!0)}}const Ml={name:"flip",enabled:!0,phase:"main",fn:Tl,requiresIfExists:["offset"],data:{_skip:!1}};function Na(s,t,e){return e===void 0&&(e={x:0,y:0}),{top:s.top-t.height-e.y,right:s.right-t.width+e.x,bottom:s.bottom-t.height+e.y,left:s.left-t.width-e.x}}function Ha(s){return[Y,ee,Z,j].some(function(t){return s[t]>=0})}function $l(s){var t=s.state,e=s.name,a=t.rects.reference,r=t.rects.popper,n=t.modifiersData.preventOverflow,i=kt(t,{elementContext:"reference"}),o=kt(t,{altBoundary:!0}),l=Na(i,a),d=Na(o,r,n),c=Ha(l),p=Ha(d);t.modifiersData[e]={referenceClippingOffsets:l,popperEscapeOffsets:d,isReferenceHidden:c,hasPopperEscaped:p},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":p})}const El={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:$l};function Al(s,t,e){var a=ie(s),r=[j,Y].indexOf(a)>=0?-1:1,n=typeof e=="function"?e(Object.assign({},t,{placement:s})):e,i=n[0],o=n[1];return i=i||0,o=(o||0)*r,[j,ee].indexOf(a)>=0?{x:o,y:i}:{x:i,y:o}}function Rl(s){var t=s.state,e=s.options,a=s.name,r=e.offset,n=r===void 0?[0,0]:r,i=qr.reduce(function(c,p){return c[p]=Al(p,t.rects,n),c},{}),o=i[t.placement],l=o.x,d=o.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=d),t.modifiersData[a]=i}const Fl={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Rl};function Ll(s){var t=s.state,e=s.name;t.modifiersData[e]=Qr({reference:t.rects.reference,element:t.rects.popper,placement:t.placement})}const Ol={name:"popperOffsets",enabled:!0,phase:"read",fn:Ll,data:{}};function Bl(s){return s==="x"?"y":"x"}function zl(s){var t=s.state,e=s.options,a=s.name,r=e.mainAxis,n=r===void 0?!0:r,i=e.altAxis,o=i===void 0?!1:i,l=e.boundary,d=e.rootBoundary,c=e.altBoundary,p=e.padding,f=e.tether,m=f===void 0?!0:f,y=e.tetherOffset,v=y===void 0?0:y,D=kt(t,{boundary:l,rootBoundary:d,padding:p,altBoundary:c}),T=ie(t.placement),S=Le(t.placement),k=!S,h=oa(T),g=Bl(h),C=t.modifiersData.popperOffsets,R=t.rects.reference,z=t.rects.popper,N=typeof v=="function"?v(Object.assign({},t.rects,{placement:t.placement})):v,O=typeof N=="number"?{mainAxis:N,altAxis:N}:Object.assign({mainAxis:0,altAxis:0},N),q=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,te={x:0,y:0};if(C){if(n){var U,me=h==="y"?Y:j,fe=h==="y"?Z:ee,G=h==="y"?"height":"width",ae=C[h],Tt=ae+D[me],ge=ae-D[fe],Mt=m?-z[G]/2:0,Vt=S===Ae?R[G]:z[G],Be=S===Ae?-z[G]:-R[G],$t=t.elements.arrow,Se=m&&$t?ia($t):{width:0,height:0},de=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Yr(),ze=de[me],Et=de[fe],ye=vt(0,R[G],Se[G]),qt=k?R[G]/2-Mt-ye-ze-O.mainAxis:Vt-ye-ze-O.mainAxis,Kr=k?-R[G]/2+Mt+ye+Et+O.mainAxis:Be+ye+Et+O.mainAxis,Ut=t.elements.arrow&&Ct(t.elements.arrow),Zr=Ut?h==="y"?Ut.clientTop||0:Ut.clientLeft||0:0,ua=(U=q==null?void 0:q[h])!=null?U:0,en=ae+qt-ua-Zr,tn=ae+Kr-ua,pa=vt(m?zt(Tt,en):Tt,ae,m?xe(ge,tn):ge);C[h]=pa,te[h]=pa-ae}if(o){var ma,an=h==="x"?Y:j,sn=h==="x"?Z:ee,ve=C[g],At=g==="y"?"height":"width",fa=ve+D[an],ga=ve-D[sn],Wt=[Y,j].indexOf(T)!==-1,ya=(ma=q==null?void 0:q[g])!=null?ma:0,va=Wt?fa:ve-R[At]-z[At]-ya+O.altAxis,wa=Wt?ve+R[At]+z[At]-ya-O.altAxis:ga,ba=m&&Wt?il(va,ve,wa):vt(m?va:fa,ve,m?wa:ga);C[g]=ba,te[g]=ba-ve}t.modifiersData[a]=te}}const Nl={name:"preventOverflow",enabled:!0,phase:"main",fn:zl,requiresIfExists:["offset"]};function Hl(s){return{scrollLeft:s.scrollLeft,scrollTop:s.scrollTop}}function Pl(s){return s===Q(s)||!K(s)?la(s):Hl(s)}function _l(s){var t=s.getBoundingClientRect(),e=Re(t.width)/s.offsetWidth||1,a=Re(t.height)/s.offsetHeight||1;return e!==1||a!==1}function Il(s,t,e){e===void 0&&(e=!1);var a=K(t),r=K(t)&&_l(t),n=pe(t),i=Fe(s,r,e),o={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(a||!a&&!e)&&((oe(t)!=="body"||da(n))&&(o=Pl(t)),K(t)?(l=Fe(t,!0),l.x+=t.clientLeft,l.y+=t.clientTop):n&&(l.x=ca(n))),{x:i.left+o.scrollLeft-l.x,y:i.top+o.scrollTop-l.y,width:i.width,height:i.height}}function Vl(s){var t=new Map,e=new Set,a=[];s.forEach(function(n){t.set(n.name,n)});function r(n){e.add(n.name);var i=[].concat(n.requires||[],n.requiresIfExists||[]);i.forEach(function(o){if(!e.has(o)){var l=t.get(o);l&&r(l)}}),a.push(n)}return s.forEach(function(n){e.has(n.name)||r(n)}),a}function ql(s){var t=Vl(s);return el.reduce(function(e,a){return e.concat(t.filter(function(r){return r.phase===a}))},[])}function Ul(s){var t;return function(){return t||(t=new Promise(function(e){Promise.resolve().then(function(){t=void 0,e(s())})})),t}}function Wl(s){var t=s.reduce(function(e,a){var r=e[a.name];return e[a.name]=r?Object.assign({},r,a,{options:Object.assign({},r.options,a.options),data:Object.assign({},r.data,a.data)}):a,e},{});return Object.keys(t).map(function(e){return t[e]})}var Pa={placement:"bottom",modifiers:[],strategy:"absolute"};function _a(){for(var s=arguments.length,t=new Array(s),e=0;e<s;e++)t[e]=arguments[e];return!t.some(function(a){return!(a&&typeof a.getBoundingClientRect=="function")})}function Yl(s){s===void 0&&(s={});var t=s,e=t.defaultModifiers,a=e===void 0?[]:e,r=t.defaultOptions,n=r===void 0?Pa:r;return function(o,l,d){d===void 0&&(d=n);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},Pa,n),modifiersData:{},elements:{reference:o,popper:l},attributes:{},styles:{}},p=[],f=!1,m={state:c,setOptions:function(T){var S=typeof T=="function"?T(c.options):T;v(),c.options=Object.assign({},n,c.options,S),c.scrollParents={reference:ke(o)?wt(o):o.contextElement?wt(o.contextElement):[],popper:wt(l)};var k=ql(Wl([].concat(a,c.options.modifiers)));return c.orderedModifiers=k.filter(function(h){return h.enabled}),y(),m.update()},forceUpdate:function(){if(!f){var T=c.elements,S=T.reference,k=T.popper;if(_a(S,k)){c.rects={reference:Il(S,Ct(k),c.options.strategy==="fixed"),popper:ia(k)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(O){return c.modifiersData[O.name]=Object.assign({},O.data)});for(var h=0;h<c.orderedModifiers.length;h++){if(c.reset===!0){c.reset=!1,h=-1;continue}var g=c.orderedModifiers[h],C=g.fn,R=g.options,z=R===void 0?{}:R,N=g.name;typeof C=="function"&&(c=C({state:c,options:z,name:N,instance:m})||c)}}}},update:Ul(function(){return new Promise(function(D){m.forceUpdate(),D(c)})}),destroy:function(){v(),f=!0}};if(!_a(o,l))return m;m.setOptions(d).then(function(D){!f&&d.onFirstUpdate&&d.onFirstUpdate(D)});function y(){c.orderedModifiers.forEach(function(D){var T=D.name,S=D.options,k=S===void 0?{}:S,h=D.effect;if(typeof h=="function"){var g=h({state:c,name:T,instance:m,options:k}),C=function(){};p.push(g||C)}})}function v(){p.forEach(function(D){return D()}),p=[]}return m}}var jl=[gl,Ol,ml,sl,Fl,Ml,Nl,dl,El],Gl=Yl({defaultModifiers:jl});const Xl=18,Ql=0;class Jl{constructor(t,e,a,r){this.anchor=t,this.popover=e,this.boundaryElement=this.setBoundary(r),this.options={placement:a,visibleClass:"data-show"},this.popover.classList.remove(this.options.visibleClass)}setBoundary(t){return typeof t=="string"?document.querySelector(t)||document.body:t||document.body}show(){this.popper&&this.popper.destroy(),this.popper=Gl(this.anchor,this.popover,{tooltip:this.anchor,placement:this.options.placement,modifiers:[{name:"offset",options:{offset:[Ql,Xl]}},{name:"preventOverflow",options:{mainAxis:!0,boundary:this.boundaryElement,rootBoundary:"document",padding:16}}]})}triggerUpdate(){this.popper.update()}hide(){this.popover.classList.remove(this.options.visibleClass)}}class ha extends De{constructor(){super(),this.placement="top"}privateDefaults(){this.isPopoverVisible=!1,this.id=`popover-${(Math.random()+1).toString(36).substring(7)}`,this.runtimeUtils=new Ra}static get properties(){return{placement:{type:String},for:{type:String},disabled:{type:Boolean},boundary:{type:String}}}static get styles(){return[L`${_o}`,L`${Io}`,L`${Vo}`]}static register(t="auro-popover"){Ra.prototype.registerComponent(t,ha)}connectedCallback(){super.connectedCallback(),this.privateDefaults(),this.addEventListener("touchstart",function(){this.toggle(),this.setAttribute("isTouch","true")})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.documentClickHandler)}firstUpdated(){this.runtimeUtils.handleComponentTagRename(this,"auro-popover"),this.for&&(this.trigger=document.querySelector(`#${this.for}`)||this.getRootNode().querySelector(`#${this.for}`)),this.trigger||([this.trigger]=this.shadowRoot.querySelector('slot[name="trigger"]').assignedElements()),this.auroPopover=this.shadowRoot.querySelector("#popover"),this.popper=new Jl(this.trigger,this.auroPopover,this.placement,this.boundary);const t=()=>{this.toggleShow()},e=()=>{this.toggleHide()},a=n=>{const i=n.key.toLowerCase();this.isPopoverVisible&&(i==="tab"||i==="escape")&&this.toggleHide(),(i===" "||i==="enter")&&this.toggle()},r=this.trigger.parentElement.nodeName==="AURO-POPOVER"?this:this.trigger;r.addEventListener("mouseenter",t),r.addEventListener("mouseleave",e),this.trigger.addEventListener("keydown",a),this.trigger.addEventListener("focus",t),this.trigger.addEventListener("blur",e),this.addEventListener("hidePopover",e)}toggle(){this.isPopoverVisible?this.toggleHide():this.toggleShow()}toggleHide(){this.popper.hide(),this.isPopoverVisible=!1,this.removeAttribute("data-show"),document.querySelector("body").removeEventListener("mouseover",this.mouseoverHandler)}toggleShow(){this.popper.show(),this.isPopoverVisible=!0,this.setAttribute("data-show",!0),this.mouseoverHandler=t=>this.handleMouseoverEvent(t),document.querySelector("body").addEventListener("mouseover",this.mouseoverHandler)}handleMouseoverEvent(t){this.isPopoverVisible&&!t.composedPath().includes(this)&&this.toggleHide()}updated(t){t.has("boundary")&&(this.popper.boundaryElement=this.boundary)}render(){return w`
      <div id="popover" class="popover util_insetLg body-default" aria-live="polite" part="popover">
        <div id="arrow" class="arrow" data-popper-arrow></div>
        <span role="tooltip" aria-labelledby="${this.id}"><slot></slot></span>
      </div>

      <span id="${this.id}">
        <slot name="trigger" data-trigger-placement="${this.placement}"></slot>
      </span>
    `}}const Kl="5.1.0";class Zl extends De{constructor(){super(),this.day=null,this.selected=!1,this.hovered=!1,this.dateTo=null,this.dateFrom=null,this.month=null,this.min=null,this.max=null,this.disabled=!1,this.disabledDays=[],this.hoveredDate=null,this.isCurrentDate=!1,this._locale=null,this.dateStr=null,this.renderForDateSlot=!1,this.runtimeUtils=new bt;const t=new Kt;this.popoverTag=t.generateTag("auro-formkit-datepicker-popover",Kl,ha)}static get properties(){return{day:{type:Object},selected:{type:Boolean},hovered:{type:Boolean},dateTo:{type:String},dateFrom:{type:String},month:{type:String},min:{type:Number},max:{type:Number},disabled:{type:Boolean,reflect:!0},disabledDays:{type:Array},hoveredDate:{type:String},isCurrentDate:{type:Boolean},locale:{type:Object},dateStr:{type:String},renderForDateSlot:{type:Boolean}}}get locale(){return this._locale?this._locale:Dt}set locale(t){const e=this._locale;this._locale=t,this.requestUpdate("locale",e)}static get styles(){return[Ho,Po,Pt]}dateChanged(t,e,a,r){this.selected=!1,this.hovered=!1;const n=parseInt(t,10),i=parseInt(e,10);if(r){const o=le(n*1e3)/1e3,l=le(i*1e3)/1e3;(r.date===o||r.date===l)&&(this.selected=!0),((a===r.date||r.date<a)&&r.date>n&&!i&&!Number.isNaN(n)&&n!==void 0&&!this.selected||r.date>n&&r.date<i)&&(this.hovered=!0)}}handleTap(){this.disabled||this.datepicker.handleCellClick(this.day.date)}handleHover(){this.hovered=!0;let t;this.dispatchEvent(new CustomEvent("date-is-hovered",{detail:{date:(t=this.day)===null||t===void 0?void 0:t.date}}))}isEnabled(t,e,a,r){return this.removeAttribute("disabled"),r&&t&&t.date&&(t.date<e||t.date>a||r.findIndex(n=>parseInt(n,10)===t.date)!==-1)?(this.setAttribute("disabled",!0),!0):!1}isDepartDate(t,e){const a=parseInt(e,10),r=le(a*1e3)/1e3;return this.selected&&t.date===r}isReturnDate(t,e,a){const r=parseInt(a,10),n=le(r*1e3)/1e3;return this.selected&&t.date===n&&e}isInRange(t,e,a){return!(!this.datepicker.hasAttribute("range")||!e||t.date<=e||a&&t.date>=a)}isLastHoveredDate(t,e,a,r){return e&&r>e&&t.date===r&&!a}isReferenceDate(t){if(this.datepicker&&this.datepicker.hasAttribute("referenceDates")){const{referenceDates:e}=this.datepicker;if(!Array.isArray(e)||e.length===0)return!1;const a=t.replace(/_/gu,"-");return e.includes(a)}return!1}getTitle(t){return t===void 0?"":J(t*1e3,"PPPP",{locale:this.locale})}setDateSlotName(){const t=new Date(this.day.date*1e3);let e=t.getMonth()+1,a=t.getDate();e.toString().length===1&&(e=`0${e}`),a.toString().length===1&&(a=`0${a}`);const r=t.getFullYear();this.dateStr=`${e}_${a}_${r}`}handleSlotContent(){try{const t=`date_${this.dateStr}`,e=`popover_${this.dateStr}`;this.querySelectorAll("[slot]").forEach(i=>{i.remove()});const r=this.datepicker.querySelector(`[slot="${t}"]`),n=this.datepicker.querySelector(`[slot="${e}"]`);r?(this.appendChild(r.cloneNode(!0)),this.setAttribute("renderForDateSlot",!0)):this.removeAttribute("renderForDateSlot"),n?(this.appendChild(n.cloneNode(!0)),this.auroPopover.removeAttribute("disabled")):this.auroPopover.setAttribute("disabled",!0)}catch{}}firstUpdated(){const t=this.runtimeUtils.closestElement("auro-formkit-calendar-month",this),e=this.runtimeUtils.closestElement("auro-formkit-calendar",t);if(!e){setTimeout(()=>this.firstUpdated(),0);return}this.datepicker=e.datepicker,this.datepicker.addEventListener("auroDatePicker-newSlotContent",()=>{this.handleSlotContent()}),this.auroPopover=this.shadowRoot.querySelector(this.popoverTag._$litStatic$),this.auroPopover.boundary=t}updated(t){(t.has("dateFrom")||t.has("dateTo")||t.has("hoveredDate")||t.has("day"))&&this.dateChanged(this.dateFrom,this.dateTo,this.hoveredDate,this.day),this.setDateSlotName(),this.handleSlotContent()}render(){const t={day:!0,"body-lg":!0,currentDate:this.currentDate,selected:this.selected,inRange:this.hovered&&this.isInRange(this.day,this.dateFrom,this.dateTo),lastHoveredDate:this.isLastHoveredDate(this.day,this.dateFrom,this.dateTo,this.hoveredDate)&&this.datepicker&&this.datepicker.hasAttribute("range"),disabled:this.isEnabled(this.day,this.min,this.max,this.disabledDays),rangeDepartDate:this.isDepartDate(this.day,this.dateFrom)&&(this.hoveredDate>this.dateFrom||this.dateTo),rangeReturnDate:this.isReturnDate(this.day,this.dateFrom,this.dateTo),reference:this.isReferenceDate(this.dateStr),sameDateTrip:this.dateFrom===this.dateTo};let e,a;return E`
      <${this.popoverTag}>
        <slot name="popover_${this.dateStr}"></slot>
        <button
          slot="trigger"
          @click="${this.handleTap}"
          @mouseover="${this.handleHover}"
          @focus="${this.handleHover}"
          class="${X(t)}"
          ?disabled="${this.disabled}"
          title="${this.getTitle((e=this.day)===null||e===void 0?void 0:e.date)}"
          tabindex="-1">
          <div class="buttonWrapper">
            <div class="currentDayMarker">${(a=this.day)===null||a===void 0?void 0:a.title}</div>
            <div class="dateSlot body-2xs" part="dateSlot">
              <slot name="date_${this.dateStr}"></slot>
            </div>
          </div>
        </button>
      </${this.popoverTag}>
    `}}customElements.get("auro-formkit-calendar-cell")||customElements.define("auro-formkit-calendar-cell",Zl);class ec extends _{static get styles(){return[An,Rn,Pt]}static get properties(){return{monthFirst:{type:Boolean,reflect:!0}}}async firstUpdated(){this.monthsList=["01","02","03","04","05","06","07","08","09","10","11","12"],setTimeout(()=>{this.setYears(1930,2100)}),await this.updateComplete}computeCurrentMonthName(t){return this.monthNames[t-1]}localeChanged(){const t=[];for(let n=0;n<7;n+=1)t.push(this.locale.localize.day(n,{width:"narrow"}));const e=this.locale.options.weekStartsOn?this.locale.options.weekStartsOn:0,a=t.slice().splice(0,e),r=t.slice().splice(e,t.length).concat(a);this.dayNamesOfTheWeek=r}renderDay(t){return w`
      <div class="td ${this.tdIsEnabled(t)}">
        ${t?w`
              <auro-formkit-calendar-cell
                .disabledDays="${this.disabledDays}"
                .min="${this.min}"
                .max="${this.max}"
                .month="${this.month}"
                .hoveredDate="${this.hoveredDate}"
                .dateTo="${this.dateTo}"
                .dateFrom="${this.dateFrom}"
                .locale="${this.locale}"
                .day="${t}"
                ?isCurrentDate="${this.isCurrentDate(t)}"
                @date-is-selected="${this.handleDateSelected}"
                @date-is-hovered="${this.handleDateHovered}"
              >
              </auro-formkit-calendar-cell>
          `:null}
      </div>
    `}render(){var t,e;return w`
      <div>
        <div class="header">
          ${this.renderPrevButton()}
          <div class="headerTitle heading-xs">
            ${this.monthFirst?w`
              <div>${this.computeCurrentMonthName(this.month)}</div>
              <div>${this.renderYear()}</div>
            `:w`
              <div>${this.renderYear()}</div>
              <div>${this.computeCurrentMonthName(this.month)}</div>
            `}
          </div>
          ${this.renderNextButton()}
        </div>

        <div class="table">
          <div class="thead">
            <div class="tr">
              ${(t=this.dayNamesOfTheWeek)===null||t===void 0?void 0:t.map(a=>this.renderDayOfWeek(a))}
            </div>
          </div>
          <div class="tbody">
            ${(e=this.daysOfMonth)===null||e===void 0?void 0:e.map(a=>this.renderWeek(a))}
          </div>
        </div>
      </div>
    `}}customElements.get("auro-formkit-calendar-month")||customElements.define("auro-formkit-calendar-month",ec);class V extends De{constructor(){super(),this.disabledDays=[],this.enableYearChange=!1,this.forceNarrow=!1,this.locale=null,this.max="8640000000000",this.min="-8640000000000",this.noRange=!1,this.dateFrom=null,this.dateTo=null,this.hoveredDate=null,this.monthPlus=null,this.yearPlus=null,this.narrow=!1;const t=new Date;this.month=Ma(t)+1,this.year=Ea(t),this.monthChanged(this.month,this.year)}render(){return this.isNarrow(this.forceNarrow,this.narrow)?this.renderNarrow():this.renderNormal()}renderNormal(){return w`
    <div id="container">
    <wc-range-datepicker-calendar
      id="firstDatePicker"
      .disabledDays="${this.disabledDays}"
      min="${this.min}"
      max="${this.max}"
      ?enableYearChange="${this.enableYearChange}"
      ?prev="${!0}"
      ?noRange="${this.noRange}"
      .hoveredDate="${this.hoveredDate}"
      .dateTo="${this.dateTo}"
      .dateFrom="${this.dateFrom}"
      .locale="${this.locale}"
      month="${this.month}"
      year="${this.year}"
      @prev-month="${this.handlePrevMonth}"
      @hovered-date-changed="${this.hoveredDateChanged}"
      @date-from-changed="${this.dateFromChanged}"
      @date-to-changed="${this.dateToChanged}"
    >
    </wc-range-datepicker-calendar>
    <wc-range-datepicker-calendar
      .disabledDays="${this.disabledDays}"
      min="${this.min}"
      max="${this.max}"
      ?enableYearChange="${this.enableYearChange}"
      ?next="${!0}"
      ?noRange="${this.noRange}"
      .hoveredDate="${this.hoveredDate}"
      .dateTo="${this.dateTo}"
      .dateFrom="${this.dateFrom}"
      .locale="${this.locale}"
      month="${this.monthPlus}"
      year="${this.yearPlus}"
      @next-month="${this.handleNextMonth}"
      @hovered-date-changed="${this.hoveredDateChanged}"
      @date-from-changed="${this.dateFromChanged}"
      @date-to-changed="${this.dateToChanged}"
    >
    </wc-range-datepicker-calendar>
    </div>
  `}renderNarrow(){return w`
    <wc-range-datepicker-calendar
    .disabledDays="${this.disabledDays}"
    min="${this.min}"
    max="${this.max}"
    ?enableYearChange="${this.enableYearChange}"
    ?noRange="${this.noRange}"
    ?narrow="${this.isNarrow(this.forceNarrow,this.narrow)}"
    .hoveredDate="${this.hoveredDate}"
    .dateTo="${this.dateTo}"
    .dateFrom="${this.dateFrom}"
    .locale="${this.locale}"
    ?prev="${!0}"
    ?next="${!0}"
    month="${this.monthPlus}"
    year="${this.yearPlus}"
    @hovered-date-changed="${this.hoveredDateChanged}"
    @date-from-changed="${this.dateFromChanged}"
    @date-to-changed="${this.dateToChanged}"
    >
    </wc-range-datepicker-calendar>
  `}firstUpdated(){const t=window.matchMedia("(max-width: 650px)");t.addListener(e=>this.queryMatchesChanged(e)),this.queryMatchesChanged(t)}updated(t){(t.has("month")||t.has("year"))&&this.monthChanged(this.month,this.year),t.has("noRange")&&this.noRangeChanged(this.noRange,t.get("noRange")),t.has("narrow")&&this.dispatchEvent(new CustomEvent("narrow-changed",{detail:{value:this.narrow}})),t.has("locale")&&this.localeChanged()}isNarrow(t,e){return t||e}queryMatchesChanged(t){this.narrow=t.matches,this.requestUpdate()}handlePrevMonth(){let t;if(!this.enableYearChange){const e=(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector("wc-range-datepicker-calendar[next]");e==null||e.handlePrevMonth()}}handleNextMonth(){let t;if(!this.enableYearChange){const e=(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector("wc-range-datepicker-calendar[prev]");e==null||e.handleNextMonth()}}hoveredDateChanged(t){this.hoveredDate=t.detail.value}monthChanged(t,e){e&&t&&(this.monthPlus=t%12+1,this.monthPlus===1?this.yearPlus=e+1:this.yearPlus=e)}noRangeChanged(t,e){!e&&t&&(this.dateTo=null,this.hoveredDate=null)}localeChanged(){this.month||(this.month=Ma(new Date)),this.year||(this.year=Ea(new Date))}dateToChanged(t){this.dateTo=t.detail.value,this.dispatchEvent(new CustomEvent("date-to-changed",{detail:{value:t.detail.value}}))}dateFromChanged(t){this.dateFrom=t.detail.value,this.dispatchEvent(new CustomEvent("date-from-changed",{detail:{value:t.detail.value}}))}}V.styles=L`
  :host {
    display: block;
    position: relative;
  }

  #container {
    display: flex;
    flex-direction: row;
  }

  #firstDatePicker {
    margin-right: 16px;
  }
  `;b([x({type:Array})],V.prototype,"disabledDays",void 0);b([x({type:Boolean})],V.prototype,"enableYearChange",void 0);b([x({type:Boolean})],V.prototype,"forceNarrow",void 0);b([x({type:Object})],V.prototype,"locale",void 0);b([x({type:String})],V.prototype,"max",void 0);b([x({type:String})],V.prototype,"min",void 0);b([x({type:Number})],V.prototype,"month",void 0);b([x({type:Boolean})],V.prototype,"noRange",void 0);b([x({type:Number})],V.prototype,"year",void 0);b([x({type:String})],V.prototype,"dateFrom",void 0);b([x({type:String})],V.prototype,"dateTo",void 0);b([x({type:String})],V.prototype,"hoveredDate",void 0);b([x({type:Number})],V.prototype,"monthPlus",void 0);b([x({type:Number})],V.prototype,"yearPlus",void 0);b([x({type:Boolean})],V.prototype,"narrow",void 0);const tc={role:"img",color:"currentColor",title:"",desc:"Directional indicator; left.",width:"var(--auro-size-lg, var(--ds-size-300, 1.5rem))",height:"var(--auro-size-lg, var(--ds-size-300, 1.5rem))",xmlns:"http://www.w3.org/2000/svg",xmlns_xlink:"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24",path:"/icons",style:"ico_squareLarge",type:"icon",name:"chevron-left",category:"interface",svg:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="chevron-left__desc" class="ico_squareLarge" role="img" style="min-width:var(--auro-size-lg, var(--ds-size-300, 1.5rem));height:var(--auro-size-lg, var(--ds-size-300, 1.5rem));fill:currentColor" viewBox="0 0 24 24" part="svg"><title/><desc id="chevron-left__desc">Directional indicator; left.</desc><path d="m14.395 6.345.084.073a.75.75 0 0 1 .072.977l-.072.084-4.47 4.47 4.47 4.47a.75.75 0 0 1 .072.976l-.072.084a.75.75 0 0 1-.977.072l-.084-.072-4.823-4.823a1 1 0 0 1 0-1.415l4.823-4.823a.75.75 0 0 1 .977-.073"/></svg>'},ac={role:"img",color:"currentColor",title:"",desc:"Directional indicator; right.",width:"var(--auro-size-lg, var(--ds-size-300, 1.5rem))",height:"var(--auro-size-lg, var(--ds-size-300, 1.5rem))",xmlns:"http://www.w3.org/2000/svg",xmlns_xlink:"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24",path:"/icons",style:"ico_squareLarge",type:"icon",name:"chevron-right",category:"interface",svg:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="chevron-right__desc" class="ico_squareLarge" role="img" style="min-width:var(--auro-size-lg, var(--ds-size-300, 1.5rem));height:var(--auro-size-lg, var(--ds-size-300, 1.5rem));fill:currentColor" viewBox="0 0 24 24" part="svg"><title/><desc id="chevron-right__desc">Directional indicator; right.</desc><path d="m9.605 17.551-.084-.072a.75.75 0 0 1-.072-.977l.072-.084 4.47-4.47-4.47-4.47a.75.75 0 0 1-.072-.976l.072-.084a.75.75 0 0 1 .977-.073l.084.073 4.823 4.823a1 1 0 0 1 0 1.415l-4.823 4.823a.75.75 0 0 1-.977.072"/></svg>'};class sc{constructor(){this.util=new Ht}scrollMonthIntoView(t,e,a){const r=window.innerWidth<t.mobileBreakpoint;if(this.util.validDateStr(e,a)&&r){const n=new Date(e).getMonth()+1,i=new Date(e).getFullYear(),o=`#month-${n}-${i}`;t.shadowRoot.querySelector(o).scrollIntoView()}}requestDismiss(){this.dispatchEvent(new CustomEvent("auroCalendar-dismissRequest",{bubbles:!0,cancelable:!1,composed:!0}))}assessNavigationButtonVisibility(t){!t.hasAttribute("calendarStartDate")&&!t.hasAttribute("minDate")?t.showPrevMonthBtn=!0:this.util.convertDateToFirstOfMonth(new Date(t.centralDate))<=t.firstMonthRenderable?t.showPrevMonthBtn=!1:t.showPrevMonthBtn=!0;let e;t.hasAttribute("calendarEndDate")?e=new Date(t.getAttribute("calendarEndDate")):t.hasAttribute("maxDate")&&(e=new Date(t.getAttribute("maxDate"))),e&&(e=this.util.convertDateToFirstOfMonth(e));let a=new Date(t.centralDate);t.noRange||(a=new Date(a.setMonth(a.getMonth()+1))),a=this.util.convertDateToFirstOfMonth(a),a>=e?t.showNextMonthBtn=!1:t.showNextMonthBtn=!0,t.requestUpdate()}centralDateChanged(t){this.assessNavigationButtonVisibility(t),t.dispatchEvent(new CustomEvent("auroCalendar-centralDateChanged",{detail:{bubbles:!0,cancelable:!1,composed:!0,date:t.centralDate}}))}handleMonthChange(t,e){let a=0;e==="next"?a=1:e==="prev"&&(a=-1);const{firstRenderedMonth:r,centralDate:n,datepicker:i}=t,o=this.util.getDateAsString(n,i.format);let l=null;this.util.validDateStr(o,i.format)?l=new Date(o).setMonth(new Date(o).getMonth()+a):l=new Date(r).setMonth(new Date(r).getMonth()+a),l&&(t.centralDate=this.util.convertDateToFirstOfMonth(l))}}const Jr="12.3.0";class rc extends V{constructor(){super(),this.util=new Ht,this.utilCal=new sc,this.utilCalRender=new Er,this.calendarStartDate=void 0,this.calendarEndDate=void 0,this.centralDate=void 0,this.showPrevMonthBtn=!0,this.showNextMonthBtn=!0,this.visible=!1,this.largeFullscreenHeadline=!1,this.isFullscreen=!1,this.firstMonthRenderable=void 0,this.calendarRangeMonths=null,this.numCalendars=void 0,this.slots={};const t=new Kt;this.bibtemplateTag=t.generateTag("auro-formkit-datepicker-bibtemplate",Ft,mn),this.buttonTag=t.generateTag("auro-formkit-datepicker-button",Jr,$r),this.dropdown=void 0}static get styles(){return[$n,En,Pt]}static get properties(){return{numCalendars:{type:Number},dateFrom:{type:String},dateTo:{type:String},maxDate:{type:String,reflect:!0},minDate:{type:String,reflect:!0},calendarStartMonth:{type:String,reflect:!0},calendarEndMonth:{type:String,reflect:!0},centralDate:{type:String,reflect:!0},visible:{type:Boolean,reflect:!1},largeFullscreenHeadline:{type:Boolean,reflect:!0},isFullscreen:{type:Boolean,reflect:!0},dropdown:{type:Object},mobileBreakpoint:{type:Number,reflect:!1},monthFirst:{type:Boolean}}}handlePrevMonth(){this.utilCal.handleMonthChange(this,"prev")}handleNextMonth(){this.utilCal.handleMonthChange(this,"next")}renderAllCalendars(){let t;if(this.visible){this.utilCalRender.setFirstRenderableMonthDate(this),this.utilCal.assessNavigationButtonVisibility(this),this.isFullscreen=this.dropdown.bibContent.hasAttribute("isFullscreen"),this.utilCalRender.determineNumCalendarsToRender(this,this.isFullscreen);let e;if(this.isFullscreen)this.firstRenderedMonth=this.firstMonthRenderable;else{const i=this.util.getDateAsString(new Date(this.centralDate),this.datepicker.format);if(this.util.validDateStr(i,this.datepicker.format))e=this.util.datesMatch(this.firstRenderedMonth,this.util.convertDateToFirstOfMonth(this.centralDate)),e||(this.firstRenderedMonth=this.util.convertDateToFirstOfMonth(this.centralDate));else if(this.minDate)e=this.util.datesMatch(this.firstRenderedMonth,this.util.convertDateToFirstOfMonth(this.minDate)),e||(this.firstRenderedMonth=this.util.convertDateToFirstOfMonth(this.minDate));else{const o=new Date;e=this.util.datesMatch(this.firstRenderedMonth,this.util.convertDateToFirstOfMonth(o)),e||(this.firstRenderedMonth=this.util.convertDateToFirstOfMonth(o))}}const a=this.firstRenderedMonth.getMonth()+1,r=this.firstRenderedMonth.getFullYear();t=E`${t}${this.utilCalRender.renderCalendar(this,a,r)}`;let n;for(let i=0;i<this.numCalendars-1;i+=1){const o=n||this.firstRenderedMonth,l=o.getMonth()+1,d=o.getFullYear();let c,p;l===12?(c=1,p=d+1):(c=l+1,p=d);const f=`${c}/1/${p}`;n=new Date(f),t=E`${t}${this.utilCalRender.renderCalendar(this,c,p)}`}}return t}scrollMonthIntoView(t){this.utilCal.scrollMonthIntoView(this,t,this.format)}firstUpdated(){this.addEventListener("date-from-changed",()=>{this.dispatchEvent(new CustomEvent("auroCalendar-dateSelected",{bubbles:!0,cancelable:!1,composed:!0}))}),this.addEventListener("date-to-changed",()=>{this.dateTo===null&&(this.dateTo=void 0),this.dispatchEvent(new CustomEvent("auroCalendar-dateSelected",{bubbles:!0,cancelable:!1,composed:!0}))})}injectSlot(t,e){this.slots[t]=e}updated(t){t.has("noRange")&&this.noRangeChanged(this.noRange,t.get("noRange")),t.has("narrow")&&this.dispatchEvent(new CustomEvent("narrow-changedProperties",{detail:{value:this.narrow}})),t.has("locale")&&this.localeChanged(),t.has("centralDate")&&this.utilCal.centralDateChanged(this),t.has("visible")&&setTimeout(()=>this.requestUpdate())}render(){return E`
    <${this.bibtemplateTag}
      ?large="${this.largeFullscreenHeadline}"
      ?isFullscreen="${this.isFullscreen}"
      @close-click="${this.utilCal.requestDismiss}">
      <span slot="ariaLabel.close">${this.slots["ariaLabel.bib.close"]}</span>

      <span slot="header">${this.slots["bib.fullscreen.headline"]}</span>

      <div slot="subheader" class="mobileHeader">
        <div class="headerDateFrom">
          <span class="mobileDateLabel body-xs">${this.slots["bib.fullscreen.dateLabel"]}</span>
          <slot name="bib.fullscreen.fromStr"></slot>
        </div>
        <div class="headerDateTo"><slot name="mobileDateToStr"></slot></div>
      </div>

      <div class="calendarWrapper">

        <div class="calendars">
          ${this.renderAllCalendars()}
        </div>
        <div class="calendarNavButtons">
          ${this.showPrevMonthBtn?E`
            <button class="calendarNavBtn prevMonth" @click="${this.handlePrevMonth}">
              ${this.util.generateIconHtml(tc)}
            </button>
          `:void 0}
          ${this.showNextMonthBtn?E`
            <button class="calendarNavBtn nextMonth" @click="${this.handleNextMonth}">
              ${this.util.generateIconHtml(ac)}
            </button>
          `:void 0}
        </div>
      </div>

      <${this.buttonTag} slot="footer" fluid @click="${this.utilCal.requestDismiss}">Done</${this.buttonTag}>
    </${this.bibtemplateTag}>
    `}}customElements.get("auro-formkit-calendar")||customElements.define("auro-formkit-calendar",rc);class nc extends De{static get properties(){return{layout:{type:String,attribute:"layout",reflect:!0},shape:{type:String,attribute:"shape",reflect:!0},size:{type:String,attribute:"size",reflect:!0},onDark:{type:Boolean,attribute:"ondark",reflect:!0}}}get componentHasFocus(){return this.matches(":focus")||this.matches(":focus-within")}resetShapeClasses(){const t=this.shadowRoot.querySelector(".wrapper");t&&(t.classList.forEach(e=>{e.startsWith("shape-")&&t.classList.remove(e)}),this.shape&&this.size?t.classList.add(`shape-${this.shape.toLowerCase()}-${this.size.toLowerCase()}`):t.classList.add("shape-none"))}resetLayoutClasses(){if(this.layout){const t=this.shadowRoot.querySelector(".wrapper");t&&(t.classList.forEach(e=>{e.startsWith("layout-")&&t.classList.remove(e)}),t.classList.add(`layout-${this.layout.toLowerCase()}`))}}updateComponentArchitecture(){this.resetLayoutClasses(),this.resetShapeClasses()}updated(t){(t.has("layout")||t.has("shape")||t.has("size"))&&this.updateComponentArchitecture()}render(){try{return this.renderLayout()}catch(t){return console.error("Failed to get the defined layout - using the default layout",t),this.getLayout("default")}}}const ic="9.1.0";class It extends nc{constructor(){super(),this.util=new Ht,this.calendarRenderUtil=new Er,this.getAttribute("calendarStartDate")&&this.util.validDateStr(this.getAttribute("calendarStartDate"),this.getAttribute("format"))?(this.formattedStartDate=this.util.toNorthAmericanFormat(this.getAttribute("calendarStartDate"),this.getAttribute("format")),this.calendarRenderUtil.updateCentralDate(this,this.formattedStartDate)):this.calendarRenderUtil.updateCentralDate(this,new Date),this.appearance="default",this.touched=!1,this.disabled=!1,this.dvInputOnly=!1,this.required=!1,this.onDark=!1,this.range=!1,this.stacked=!1,this.noValidate=!1,this.validity=void 0,this.value=void 0,this.valueEnd=void 0,this.calendarStartDate=void 0,this.calendarEndDate=void 0,this.calendarFocusDate=this.value,this.format="mm/dd/yyyy",this.fullscreenBreakpoint="sm",this.monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],this.placement="bottom-start",this.offset=0,this.noFlip=!1,this.shift=!1,this.autoPlacement=!1,this.largeFullscreenHeadline=!1,this.dateSlotContent=[],this.hasDisplayValueContent=!0,this.hasFocus=!1,this.hasValue=!1,this.hasAllValues=!1,this.validation=new un,this.runtimeUtils=new bt,this.forceScrollOnNextMobileCalendarRender=!1;const t=new Kt;this.dropdownTag=t.generateTag("auro-formkit-datepicker-dropdown",Ft,fn),this.buttonTag=t.generateTag("auro-formkit-datepicker-button",Jr,$r),this.iconTag=t.generateTag("auro-formkit-input-icon",ic,yn),this.inputTag=t.generateTag("auro-formkit-datepicker-input",Ft,gn),this.helpTextTag=t.generateTag("auro-formkit-input-helptext",Ft,pn),this.handleClick=this.handleClick.bind(this),this.layout="classic",this.shape="classic",this.size="lg",this.constructor.shadowRootOptions={...De.shadowRootOptions,delegatesFocus:!0}}static get properties(){return{appearance:{type:String,reflect:!0},autoPlacement:{type:Boolean,reflect:!0},calendarEndDate:{type:String,reflect:!0},calendarFocusDate:{type:String,reflect:!0},calendarStartDate:{type:String,reflect:!0},centralDate:{type:String},disabled:{type:Boolean,reflect:!0},dvInputOnly:{type:Boolean,reflect:!0},error:{type:String,reflect:!0},hasFocus:{type:Boolean,reflect:!1},hasValue:{type:Boolean,reflect:!1},hasAllValues:{type:Boolean,reflect:!1},format:{type:String,reflect:!0},fullscreenBreakpoint:{type:String,reflect:!0},inputmode:{type:String,attribute:!0,reflect:!0},largeFullscreenHeadline:{type:Boolean,reflect:!0},maxDate:{type:String,reflect:!0},minDate:{type:String,reflect:!0},monthNames:{type:Array},monthFirst:{type:Boolean},noFlip:{type:Boolean,reflect:!0},shift:{type:Boolean,reflect:!0},noValidate:{type:Boolean,reflect:!0},offset:{type:Number,reflect:!0},onDark:{type:Boolean,reflect:!0},placeholder:{type:String,reflect:!0},placeholderEndDate:{type:String,reflect:!0},placement:{type:String,reflect:!0},range:{type:Boolean,reflect:!0},referenceDates:{type:Array,reflect:!0},required:{type:Boolean,reflect:!0},setCustomValidity:{type:String},setCustomValidityCustomError:{type:String},setCustomValidityRangeOverflow:{type:String},setCustomValidityRangeUnderflow:{type:String},setCustomValidityValueMissing:{type:String},stacked:{type:Boolean,reflect:!0},validity:{type:String,reflect:!0},value:{type:String},valueEnd:{type:String},touched:{type:Boolean,reflect:!0,attribute:!1}}}static get styles(){return[xn,kn,Pt,Dn,Sn,Cn,Tn,Mn]}static register(t="auro-datepicker"){bt.prototype.registerComponent(t,It)}get values(){return this.range&&this.value&&this.valueEnd?[this.value,this.valueEnd]:this.value?[this.value]:[]}get labelHidden(){return this.hasDisplayValueContent&&this.dvInputOnly&&!this.hasFocus&&this.hasAllValues}get dvHidden(){return!this.hasDisplayValueContent||this.hasFocus||!this.hasAllValues}get displayValueFontClass(){if(this.layout.startsWith("emphasized")){let t="accent-xl";return this.hasDisplayValueContent?this.hasValue||(t="body-sm"):this.noFocusOrValue&&(t="body-sm"),t}return this.layout==="snowflake"||this.layout==="classic"&&this.shape==="snowflake"?"body-lg":"body-default"}get commonDisplayValueWrapperClasses(){return{displayValueWrapper:!0,util_displayHiddenVisually:this.dvHidden,[this.displayValueFontClass]:!0}}checkDisplayValueSlotChange(){let t=this.shadowRoot.querySelector('slot[name="displayValue"]').assignedNodes();t&&t[0]&&t[0].tagName==="SLOT"&&(t=t[0].assignedNodes());let e=!1;t.length>0&&(e=!0),this.hasDisplayValueContent=e}handleFocusDateChange(){this.formattedFocusDate&&(this.calendarRenderUtil.updateCentralDate(this,this.formattedFocusDate),this.forceScrollOnNextMobileCalendarRender=!0)}generateRandomString(t){return Math.random().toString(36).substring(2,t+2)}focus(t=""){this.hasFocus=!0,this.range&&t==="endDate"?this.inputList[1].focus():this.inputList[0].focus()}convertToWcValidTime(t){return new Date(t).getTime()/1e3}convertWcTimeToDate(t){return new Date(t*1e3).toLocaleDateString("en-US",{day:"2-digit",month:"2-digit",year:"numeric"})}notifyValueChanged(){let t=null;t=new Event("auroDatePicker-valueSet",{bubbles:!0,composed:!0}),this.dispatchEvent(t)}handleCentralDateChange(){this.calendar.setAttribute("centralDate",this.centralDate)}notifyDatepickerToggled(){this.dispatchEvent(new CustomEvent("auroDatePicker-toggled",{bubbles:!0,composed:!0,detail:{expanded:this.dropdown.isPopoverVisible}}))}notifyMonthChanged(t){this.dispatchEvent(new CustomEvent("auroDatePicker-monthChanged",{bubbles:!0,composed:!0,detail:{month:t.detail.month,year:t.detail.year,numCalendars:t.detail.numCalendars}}))}configureDropdown(){this.dropdown=this.shadowRoot.querySelector(this.dropdownTag._$litStatic$),this.dropdown.addEventListener("auroDropdown-triggerClick",()=>{this.isPopoverVisible||this.dropdown.show()}),this.dropdown.addEventListener("auroDropdown-toggled",()=>{this.notifyDatepickerToggled(),this.calendar.visible=this.dropdown.isPopoverVisible,this.dropdown.isPopoverVisible&&this.forceScrollOnNextMobileCalendarRender&&setTimeout(()=>{this.calendar.scrollMonthIntoView(this.formattedFocusDate),this.forceScrollOnNextMobileCalendarRender=!1},0)})}configureInput(){this.triggerInput=this.dropdown.querySelector('[slot="trigger"]'),this.inputList=[...this.dropdown.querySelectorAll(this.inputTag._$litStatic$)],this.handleReadOnly(),this.inputList.forEach((t,e)=>{t.addEventListener("keyup",a=>{(a.key.length===1||a.key==="Delete"||a.key==="Backspace")&&this.dropdown.show()}),t.addEventListener("input",()=>{e===0?this.value=t.value:e===1&&(this.valueEnd=t.value),this.notifyValueChanged()}),t.addEventListener("auroFormElement-validated",a=>{a.stopPropagation(),a.detail.validity==="customError"?(this.validity=a.detail.validity,this.errorMessage=a.detail.message):a.target===this.inputList[0]?(this.validity=a.detail.validity,this.errorMessage=a.detail.message):this.inputList.length>1&&a.target===this.inputList[1]&&(this.inputList[0].validity==="valid"||this.inputList[0].validity===void 0)&&(this.validity=a.detail.validity,this.errorMessage=a.detail.message)})})}configureCalendar(){this.calendar=this.shadowRoot.querySelector("auro-formkit-calendar"),this.calendar.datepicker=this,this.calendar.format=this.format,this.calendar.dropdown=this.dropdown,this.calendar.addEventListener("auroCalendar-dateSelected",()=>{this.inputList[0].value!==this.calendar.dateFrom&&this.calendar.dateFrom!==void 0&&(this.inputList[0].value=this.convertWcTimeToDate(this.calendar.dateFrom)),this.inputList[1]&&this.calendar.dateTo&&this.inputList[1].value!==this.calendar.dateTo&&(this.inputList[1].value=this.convertWcTimeToDate(this.calendar.dateTo))}),this.calendar.addEventListener("auroCalendar-dismissRequest",()=>{this.dropdown.hide()}),this.calendar.addEventListener("auroCalendar-centralDateChanged",t=>{this.util.datesMatch(t.detail.date,this.centralDate)||this.calendarRenderUtil.updateCentralDate(this,t.detail.date),this.notifyMonthChanged(t)})}configureDatepicker(){this.addEventListener("focusin",()=>{this.touched=!0,this.hasFocus=!0}),this.addEventListener("focusout",()=>{this.hasFocus=!1,!this.noValidate&&(this.contains(document.activeElement)||this.validate())}),this.hasAttribute("value")&&this.getAttribute("value").length>0&&(this.calendar.dateFrom=new Date(this.formattedValue).getTime()),this.hasAttribute("valueEnd")&&this.getAttribute("valueEnd").length>0&&(this.calendar.dateTo=new Date(this.formattedValueEnd).getTime())}blur(){super.blur(),this.hideBib()}hideBib(){this.dropdown&&this.dropdown.isPopoverVisible&&this.dropdown.hide()}showBib(){this.dropdown&&!this.dropdown.isPopoverVisible&&this.dropdown.show()}handleReadOnly(){const t=getComputedStyle(document.documentElement);this.mobileBreakpoint=Number(t.getPropertyValue("--ds-grid-breakpoint-sm").replace("px",""));const e=window.innerWidth<this.mobileBreakpoint;this.inputList.forEach(a=>{e?a.setAttribute("readonly",!0):a.removeAttribute("readonly")})}handleCalendarCentralDateChange(t){this.util.datesMatch(t.detail.date,this.centralDate)||this.calendarRenderUtil.updateCentralDate(this,t.detail.date)}handleCellClick(t){this.cellClickActive=!0;const e=this.convertWcTimeToDate(t),a=this.util.toCustomFormat(e,this.format);let r=!1;if(this.util.validDateStr(a,this.format)){if(this.range){const n=this.value&&this.util.validDateStr(this.value,this.format),i=this.valueEnd&&this.util.validDateStr(this.valueEnd,this.format);n&&!i?new Date(this.util.toNorthAmericanFormat(a,this.format))>=new Date(this.formattedValue)&&(r=!0):n&&i&&(this.valueEnd="")}r?(this.valueEnd=a,this.dropdown.isPopoverVisible&&!this.dropdown.isBibFullscreen&&this.focus("startDate")):(this.value=a,this.dropdown.isPopoverVisible&&!this.dropdown.isBibFullscreen&&this.focus("endDate"))}}pushSlotContent(){this.dispatchEvent(new CustomEvent("auroDatePicker-newSlotContent"))}handleKeydownReset(t){(t.key==="Enter"||t.key===" ")&&(this.resetInputs(),this.focus())}resetInputs(){this.inputList.forEach(t=>{t.reset()})}reset(){this.resetInputs(),this.validation.reset(this)}clear(){this.resetInputs()}validate(t=!1){this.inputList[0].validate(t),this.range&&this.inputList[1].validate(t),this.validation.validate(this,t)}setHasValue(){if(!this.range){this.hasValue=this.value&&this.value.length>0,this.hasAllValues=this.hasValue;return}this.hasValue=this.value&&this.value.length>0||this.valueEnd&&this.valueEnd.length>0,this.hasAllValues=this.value&&this.value.length>0&&this.valueEnd&&this.valueEnd.length>0}get hasError(){return this.validity!==void 0&&this.validity!=="valid"}updated(t){if(t.has("format")&&(this.monthFirst=this.format.indexOf("mm")<this.format.indexOf("yyyy")),t.has("disabled")&&(this.disabled?(this.previousTabIndex=this.getAttribute("tabindex"),this.setAttribute("tabindex","-1")):!this.disabled&&this.previousTabIndex>-1?this.tabIndex=this.previousTabIndex:this.removeAttribute("tabindex")),t.has("calendarFocusDate")&&(this.formattedFocusDate=this.util.toNorthAmericanFormat(this.calendarFocusDate,this.format),this.handleFocusDateChange()),t.has("calendarStartDate")&&(this.formattedStartDate=this.util.toNorthAmericanFormat(this.calendarStartDate,this.format),this.calendar.setAttribute("calendarStartDate",this.formattedStartDate)),t.has("calendarEndDate")&&(this.formattedEndDate=this.util.toNorthAmericanFormat(this.calendarEndDate,this.format),this.calendar.setAttribute("calendarEndDate",this.formattedEndDate)),t.has("value")&&(this.formattedValue=this.util.toNorthAmericanFormat(this.value,this.format),!this.calendarFocusDate&&this.util.validDateStr(this.value,this.format)&&(this.dropdown.isPopoverVisible||(this.calendarFocusDate=this.value,this.forceScrollOnNextMobileCalendarRender=!0)),this.cellClickActive&&(this.cellClickActive=!1),this.value&&this.util.validDateStr(this.value,this.format)?this.calendar.dateFrom!==this.value&&(this.calendar.dateFrom=this.convertToWcValidTime(this.formattedValue)):(this.inputList[0].value!==this.value&&(this.value?this.inputList[0].value=this.value:this.inputList[0].value=""),this.calendar.dateFrom!==void 0&&(this.calendar.dateFrom=void 0)),this.inputList[0].value!==this.value&&(this.value?this.inputList[0].value=this.value:this.inputList[0].value=""),this.value&&this.value.length===this.inputList[0].lengthForType&&this.calendarRenderUtil.updateCentralDate(this,this.formattedValue),this.setHasValue()),t.has("valueEnd")&&this.inputList[1]&&(this.formattedValueEnd=this.util.toNorthAmericanFormat(this.valueEnd,this.format),this.valueEnd&&this.util.validDateStr(this.valueEnd,this.format)?this.calendar.dateTo=this.convertToWcValidTime(this.formattedValueEnd):(this.inputList[1].value!==this.valueEnd&&(this.valueEnd?this.inputList[1].value=this.valueEnd:this.inputList[1].value=""),this.calendar.dateTo!==void 0&&(this.calendar.dateTo=void 0)),this.inputList[1].value!==this.valueEnd&&(this.valueEnd?this.inputList[1].value=this.valueEnd:this.inputList[1].value=""),this.valueEnd&&this.valueEnd.length===this.inputList[1].lengthForType&&this.calendarRenderUtil.updateCentralDate(this,this.formattedValueEnd),this.validate(),this.setHasValue()),t.has("error")){const e=this.inputList[this.inputList.length-1];this.hasAttribute("error")?e.setAttribute("error",this.getAttribute("error")):e.removeAttribute("error"),this.validation.validate(e,!0)}if(this.value&&this.valueEnd&&this.util.validDateStr(this.value,this.format)&&this.util.validDateStr(this.valueEnd,this.format)&&new Date(this.formattedValue)>new Date(this.formattedValueEnd)&&(this.valueEnd=void 0),t.has("minDate")){if(this.formattedMinDate=this.util.toNorthAmericanFormat(this.minDate,this.format),this.minDate){const e=Number(this.formattedMinDate.split("/")[0]),a=Number(this.formattedMinDate.split("/")[2]);a>this.calendar.year?this.calendarRenderUtil.updateCentralDate(this,this.formattedMinDate):a===this.calendar.year&&e>this.calendar.month&&this.calendarRenderUtil.updateCentralDate(this,this.formattedMinDate),this.value&&new Date(this.formattedMinDate).getTime()>new Date(this.formattedValue).getTime()&&(this.value=void 0,this.range&&this.valueEnd&&(this.valueEnd=void 0),this.calendarRenderUtil.updateCentralDate(this,this.formattedMinDate))}if(this.util.validDateStr(this.minDate,this.format)){const e=!this.calendarFocusDate&&!this.value,a=new Date(this.formattedFocusDate)<new Date(this.formattedMinDate);(e||a)&&(this.calendarFocusDate=this.minDate)}this.calendar.requestUpdate()}if(t.has("maxDate")){this.formattedMaxDate=this.util.toNorthAmericanFormat(this.maxDate,this.format);const e=Number(this.formattedMaxDate.split("/")[0]),a=Number(this.formattedMaxDate.split("/")[2]);a<this.calendar.year?this.calendarRenderUtil.updateCentralDate(this,this.formattedMaxDate):a===this.calendar.year&&e<this.calendar.month&&this.calendarRenderUtil.updateCentralDate(this,this.formattedMaxDate),this.maxDate&&this.value&&new Date(this.formattedMaxDate).getTime()<new Date(this.formattedValue).getTime()&&(this.value=void 0,this.range&&this.valueEnd&&(this.valueEnd=void 0),this.calendarRenderUtil.updateCentralDate(this,this.formattedMaxDate)),this.calendar.requestUpdate()}t.has("centralDate")&&this.handleCentralDateChange()}handleSlotToSlot(t){const e=this.querySelector(`[slot='${t.target.name}']`);this.calendar.injectSlot(t.target.name,e.cloneNode(!0))}handleClick(t){const[e]=t.composedPath(),a=["snowflake"].includes(this.layout),r=e.tagName==="INPUT",n=this.inputList.includes(this.shadowRoot.activeElement);a&&!r&&!n&&!t.composedPath().includes(this.dropdown.bibContent)&&this.inputList[0].focus()}configureClickHandler(){this.addEventListener("click",this.handleClick)}firstUpdated(){this.runtimeUtils.handleComponentTagRename(this,"auro-datepicker"),this.configureDropdown(),this.configureInput(),this.configureCalendar(),this.configureDatepicker(),this.configureClickHandler(),window.addEventListener("resize",()=>{this.handleReadOnly()})}connectedCallback(){super.connectedCallback(),this.monthFirst=this.format.indexOf("mm")<this.format.indexOf("yyyy")}renderSnowflakeLayout(){const t={error:this.hasError},e={inputSection:!0,hasValue:this.hasValue,hasFocus:this.hasFocus,util_displayHiddenVisually:!this.dvHidden},a={mainLabel:!0,hasValue:this.hasValue,hasFocus:this.hasFocus,util_displayHiddenVisually:this.labelHidden,[this.hasFocus||this.hasValue?"body-xs":"body-lg"]:!0};return E`
      <div
        class="wrapper trigger"
        part="wrapper">
        <div class="accents left">
          ${this.renderHtmlIconCalendar()}
        </div>
        <div class="mainContent">
          <label class="${X(a)}" part="mainLabel">
            <slot name="label"></slot>
          </label>
          <div class="${X(e)}" part="inputSection">
            ${this.renderHtmlInputs()}
          </div>
          <div class="${X(this.commonDisplayValueWrapperClasses)}">
            <slot name="displayValue" @slotchange=${this.checkDisplayValueSlotChange}>
              <span>
                ${this.formatShortDate(this.value)}${this.range?E`–${this.formatShortDate(this.valueEnd)}`:void 0}
              </span>
            </slot>
          </div>
        </div>
        <div class="accents right ${X(t)}">
          ${this.hasError?this.renderHtmlIconError():this.renderHtmlActionClear()}
        </div>
      </div>
    `}renderClassicLayout(){const t={error:this.hasError},e={inputSection:!0,hasValue:this.hasValue,hasFocus:this.hasFocus};return E`
      <div
        class="wrapper trigger"
        part="wrapper">
        <div class="accents left">
          ${this.renderHtmlIconCalendar()}
        </div>
        <div class="mainContent">
          <div class="${X(e)}" part="inputSection">
            ${this.renderHtmlInputs()}
          </div>
        </div>
        <div class="accents right ${X(t)}">
          ${this.hasError?this.renderHtmlIconError():this.renderHtmlActionClear()}
        </div>
      </div>
    `}renderLayoutFromAttributes(){switch(this.layout){case"snowflake":return this.renderSnowflakeLayout();default:return this.renderClassicLayout()}}formatShortDate(t){const e={month:"short",day:"2-digit"};return new Date(t).toLocaleDateString("en-US",e).replace(",","")}renderDisplayTextDate(t){return E`
        <div>
          <div class="${X({displayValueText:!0,"body-lg":!0})}">
            ${t&&this.util.validDateStr(t,this.format)?this.formatShortDate(t):void 0}
          </div>
        </div>
    `}renderHtmlInputs(){const t={util_displayHiddenVisually:!this.hasValue&&!this.hasFocus&&this.layout!=="classic",parentBorder:this.layout==="classic"};return E`
      <div class="inputContainer">
        <${this.inputTag}
          appearance="${this.onDark?"inverse":this.appearance}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          .format="${this.format}"
          .max="${this.maxDate}"
          .min="${this.minDate}"
          .placeholder="${this.placeholder}"
          .size="${this.size}"
          .shape="${this.shape}"
          class="dateFrom ${X(t)}"
          id="${this.generateRandomString(12)}"
          inputmode="${hn(this.inputmode)}"
          layout="classic"
          noValidate
          part="input"
          setCustomValidity="${this.setCustomValidity}"
          setCustomValidityCustomError="${this.setCustomValidityCustomError}"
          setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
          setCustomValidityRangeOverflow="${this.setCustomValidityRangeOverflow}"
          setCustomValidityRangeUnderflow="${this.setCustomValidityRangeUnderflow}"
          type="date"
        >
          ${this.layout!=="classic"?E`
              <span slot="displayValue">
                ${this.renderDisplayTextDate(this.value)}
              </span>
            `:void 0}
          <span slot="ariaLabel.clear">${this.runtimeUtils.getSlotText(this,"ariaLabel.input.clear")||Yt(this.lang,"clearInput")}</span>
          <span slot="label"><slot name="fromLabel"></slot></span>
        </${this.inputTag}>
      </div>

      <!--  Divider  -->
      ${this.range?E`
        <div class="inputDivider"></div>
      `:void 0}

      ${this.range?E`
        <div class="inputContainer">
          <${this.inputTag}
            appearance="${this.onDark?"inverse":this.appearance}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            .format="${this.format}"
            .max="${this.maxDate}"
            .min="${this.minDate}"
            .placeholder="${this.placeholderEndDate||this.placeholder}"
            .size="${this.size}"
            .shape="${this.shape}"
            class="dateTo ${X(t)}"
            id="${this.generateRandomString(12)}"
            layout="classic"
            noValidate
            part="input"
            setCustomValidity="${this.setCustomValidity}"
            setCustomValidityCustomError="${this.setCustomValidityCustomError}"
            setCustomValidityValueMissing="${this.setCustomValidityValueMissing}"
            setCustomValidityRangeOverflow="${this.setCustomValidityRangeOverflow}"
            setCustomValidityRangeUnderflow="${this.setCustomValidityRangeUnderflow}"
            type="date"
          >
            ${this.layout!=="classic"?E`
              <span slot="displayValue">
                ${this.renderDisplayTextDate(this.valueEnd)}
              </span>
            `:void 0}
            <span slot="ariaLabel.clear">${this.runtimeUtils.getSlotText(this,"ariaLabel.input.clear")||this.runtimeUtils.getSlotText(this,"ariaLabel.input.clear")||Yt(this.lang,"clearInput")}</span>
            <span slot="label"><slot name="toLabel"></slot></span>
          </${this.inputTag}>
        </div>
      `:void 0}
    `}renderHtmlActionClear(){const t={notification:!0,clear:!0,util_displayHidden:(!this.value||this.value.length===0)&&(!this.valueEnd||this.valueEnd.length===0)};return E`
      <div class="${X(t)}">
        <${this.buttonTag}
          @click="${this.resetInputs}"
          @keydown="${this.handleKeydownReset}"
          ?onDark="${this.onDark}"
          appearance="${this.onDark?"inverse":this.appearance}"
          aria-label="${this.runtimeUtils.getSlotText(this,"ariaLabel.input.clear")||Yt(this.lang,"clearInput")}"
          class="notificationBtn clearBtn"
          shape="circle"
          size="sm"
          variant="ghost">
          <${this.iconTag}
            ?customColor="${this.onDark||this.appearance==="inverse"}"
            category="interface"
            name="x-lg"
            >
          </${this.iconTag}>
        </${this.buttonTag}>
      </div>
    `}renderHtmlIconError(){return E`
      <div class="${X({notification:!0,error:!0})}">
        <${this.iconTag}
          category="alert"
          customColor
          name="error-stroke"
          >
        </${this.iconTag}>
      </div>
    `}renderHtmlIconCalendar(){return E`
      <${this.iconTag}
        appearance="${this.onDark?"inverse":this.appearance}"
        category="interface"
        class="accentIcon"
        name="calendar"
        part="accentIcon"
        variant="${this.disabled?"disabled":"muted"}">
      </${this.iconTag}>`}renderHtmlHelpText(){return E`
      ${!this.validity||this.validity===void 0||this.validity==="valid"?E`
          <${this.helpTextTag} appearance="${this.onDark?"inverse":this.appearance}">
            <p id="${this.uniqueId}" part="helpText">
              <slot name="helpText"></slot>
            </p>
          </${this.helpTextTag}>
        `:E`
          <${this.helpTextTag} error appearance="${this.onDark?"inverse":this.appearance}">
            <p id="${this.uniqueId}" role="alert" aria-live="assertive" part="helpText">
              ${this.errorMessage}
            </p>
          </${this.helpTextTag}>
        `}
    `}renderCalendar(){return E`
      <auro-formkit-calendar
        ?largeFullscreenHeadline="${this.largeFullscreenHeadline}"
        ?noRange="${!this.range}"
        .format="${this.format}"
        .monthFirst="${this.monthFirst}"
        .min="${this.convertToWcValidTime(new Date(this.formattedMinDate))}"
        .max="${this.convertToWcValidTime(new Date(this.formattedMaxDate))}"
        .maxDate="${this.maxDate}"
        .minDate="${this.minDate}"
        .monthNames="${this.monthNames}"
        .mobileBreakpoint="${this.mobileBreakpoint}"
        part="calendar"
      >
        <slot name="ariaLabel.bib.close" slot="ariaLabel.close" @slotchange="${this.handleSlotToSlot}">Close</slot>
        <slot slot="bib.fullscreen.headline" name="bib.fullscreen.headline" @slotchange="${this.handleSlotToSlot}"></slot>
        <slot slot="bib.fullscreen.dateLabel" name="bib.fullscreen.dateLabel" @slotchange="${this.handleSlotToSlot}"></slot>
        <span slot="bib.fullscreen.fromStr">${this.value||E`<span class="placeholderDate">${this.format.toUpperCase()}</span>`}</span>
        ${this.range?E`<span slot="mobileDateToStr">${this.valueEnd||E`<span class="placeholderDate">${this.format.toUpperCase()}</span>`}</span>`:void 0}
      </auro-formkit-calendar>
    `}render(){const t={hasFocus:this.hasFocus};return E`
      <!-- Hidden slot for clear button aria-label -->
      <slot name="ariaLabel.input.clear" hidden @slotchange=${this.requestUpdate}></slot>

      <${this.dropdownTag}
          appearance="${this.onDark?"inverse":this.appearance}"
          ?autoPlacement="${this.autoPlacement}"}"
          ?disabled="${this.disabled}"
          ?error="${this.validity!==void 0&&this.validity!=="valid"}"
          ?noFlip="${this.noFlip}"
          ?shift="${this.shift}"
          .fullscreenBreakpoint="${this.fullscreenBreakpoint}"
          .layout="${this.layout}"
          .matchWidth="${!1}"
          .offset="${this.offset}"
          .placement="${this.placement}"
          .shape="${this.shape}"
          .size="${this.size}"
          class="${X(t)}"
          disableEventShow
          disableFocusTrap
          for="dropdownMenu"
          part="dropdown"
        >
          <div slot="trigger" class="dpTriggerContent" part="trigger">
            ${this.renderLayoutFromAttributes()}
          </div>

          <div class="calendarWrapper" part="calendarWrapper">
            ${this.renderCalendar()}
          </div>
          <div slot="helpText" part="helpTextSpan">
            ${this.renderHtmlHelpText()}
          </div>
        </${this.dropdownTag}>
    `}}It.register();It.register("custom-datepicker");const{events:oc,args:lc,argTypes:cc,template:dc}=ln("auro-datepicker");function Nt(s){const t=("0"+s.getDate()).slice(-2);return`${("0"+(s.getMonth()+1)).slice(-2)}/${t}/${s.getFullYear()}`}const hc={component:"auro-datepicker",title:"Datepicker",args:lc,argTypes:cc,parameters:{actions:{handles:oc}}},Ve={render:s=>dc(s),args:{}},Te={render:()=>w`
<auro-datepicker>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},qe={...Te,async play({canvas:s}){const t=await s.findByShadowRole("textbox");await se.click(t)}},Me={render:()=>w`
<auro-datepicker range>
  <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Roundtrip</span>
</auro-datepicker>
  `},Ue={...Me,async play({canvas:s}){const t=(await s.findAllByShadowRole("textbox"))[0];await se.click(t)}},We={render:()=>w`
<auro-datepicker disabled>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},Ye={render:()=>{function s(){const e=document.querySelector("#errorExample");e==null||e.removeAttribute("error"),e==null||e.setAttribute("error","Custom New Error")}function t(){const e=document.querySelector("#errorExample");e==null||e.removeAttribute("error")}return w`
<auro-datepicker error="Custom error message" id="errorExample">
  <span slot="bib.fullscreen.headline">Error Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>

<auro-button id="undefinedValueExampleBtnAddError" @click="${s}">Set Error</auro-button>
<auro-button id="undefinedValueExampleBtnRemoveError" @click="${t}">Remove Error</auro-button
>
  `},parameters:{docs:{source:{type:"code"}}},async play({canvas:s}){const t=await s.findByShadowRole("button",{name:"Remove Error"});await se.click(t),await Mr(()=>{be(s.queryByShadowRole("alert")).not.toBeInTheDocument()});const e=await s.findByShadowRole("button",{name:"Set Error"});await se.click(e),be(await s.findByShadowRole("alert")).toHaveTextContent("Custom New Error")}},je={render:()=>w`
<auro-datepicker
  calendarStartDate="01/01/2022"
  calendarEndDate="06/01/2022"
>
  <span slot="bib.fullscreen.headline"
    >calendarStartDate & calendarEndDate Example</span
  >
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,parameters:{chromatic:{disableSnapshot:!0}},async play({canvas:s,step:t}){const e=await s.findByShadowRole("textbox");await se.click(e),be((await yt.findByShadowText(/January/i)).parentNode).toHaveTextContent(/January 2022/i);const a=await yt.findByShadowRole("button",{name:/Directional indicator; right/i});await t("Navigate to end date",async()=>{for(let r=0;r<5;r++)await se.click(a)}),be((await yt.findByShadowText(/June/i)).parentNode).toHaveTextContent(/June 2022/i),await Mr(()=>{be(a).not.toBeInTheDocument()})}},Ge={render:()=>w`
<auro-datepicker
  calendarStartDate="01/01/2022"
  calendarEndDate="12/01/2023"
  calendarFocusDate="11/01/2022"
>
  <span slot="bib.fullscreen.headline">calendarFocusDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,parameters:{chromatic:{disableSnapshot:!0}},async play({canvas:s,step:t}){const e=await s.findByShadowRole("textbox");await se.click(e),be((await yt.findByShadowText(/November/i)).parentNode).toHaveTextContent(/November 2022/i)}},Xe={render:()=>w`
<auro-datepicker
  maxDate="03/25/2023"
  setCustomValidityRangeOverflow="Selected date is later than maximum date."
>
  <span slot="bib.fullscreen.headline">maxDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `,async play({canvas:s,step:t}){const e=await s.findByShadowRole("textbox");await se.click(e)}},Qe={render:()=>{function s(){const e=document.querySelector("#maxDateExample"),a=document.querySelector("#maxDateChange"),r=document.querySelector("#resetMaxDate"),n=Nt(new Date);let i=new Date;i.setDate(i.getDate()+7);const o=Nt(i);e==null||e.setAttribute("value",o),e==null||e.setAttribute("maxDate",o),a==null||a.addEventListener("click",()=>{e==null||e.setAttribute("maxDate",n)}),r==null||r.addEventListener("click",()=>{e==null||e.setAttribute("value",o),e==null||e.setAttribute("maxDate",o)})}const t=w`
<auro-datepicker
  id="maxDateExample"
  setCustomValidityRangeOverflow="Selected date is later than maximum date."
>
  <span slot="bib.fullscreen.headline">maxDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-button id="maxDateChange">Change maxDate to 03/18/25</auro-button>
<auro-button id="resetMaxDate"
  >Reset Datepicker to Initial Example</auro-button
>
  `;return setTimeout(s,0),t},parameters:{docs:{source:{type:"code"}},chromatic:{disableSnapshot:!0}},async beforeEach(){return $e.set("2025-03-18"),()=>{$e.reset()}},async play({canvas:s,step:t}){const e=await s.findByShadowRole("button",{name:/Change maxDate to/i});await se.click(e)}},Je={render:()=>w`
<auro-datepicker
  minDate="03/25/2028"
  setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date."
>
  <span slot="bib.fullscreen.headline">minDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},Ke={render:()=>{function s(){const e=document.querySelector("#minDateExample"),a=document.querySelector("#minDateChange"),r=document.querySelector("#resetMinDate"),n=Nt(new Date);let i=new Date,o=i.getDate()+7;i.setDate(o);const l=Nt(i);e==null||e.setAttribute("value",n),e==null||e.setAttribute("minDate",n),a==null||a.addEventListener("click",()=>{e==null||e.setAttribute("minDate",l)}),r==null||r.addEventListener("click",()=>{e==null||e.setAttribute("value",n),e==null||e.setAttribute("minDate",n)})}const t=w`
<auro-datepicker
  id="minDateExample"
  setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date."
>
  <span slot="bib.fullscreen.headline">minDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-button id="minDateChange"
  >Change minDate to a week from Today</auro-button
>
<auro-button id="resetMinDate"
  >Reset Datepicker to Initial Example</auro-button
>
    `;return setTimeout(s,0),t},parameters:{docs:{source:{type:"code"}},chromatic:{disableSnapshot:!0}},async beforeEach(){return $e.set("2025-03-18"),()=>{$e.reset()}},async play({canvas:s,step:t}){const e=await s.findByShadowRole("button",{name:/Change minDate to/i});await se.click(e)}},Ze={render:()=>w`
<auro-datepicker required noValidate>
  <span slot="bib.fullscreen.headline">noValidate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},et={render:()=>w`
<auro-datepicker
  required
  setCustomValidityValueMissing="Custom value missing message."
>
  <span slot="bib.fullscreen.headline">Required Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-datepicker
  required
  range
  setCustomValidityValueMissing="Custom value missing message."
>
  <span slot="bib.fullscreen.headline">Required Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Roundtrip</span>
</auro-datepicker>
  `},tt={render:()=>{function s(){const t=document.querySelector("#validityExample");console.warn("Validity set to:",t==null?void 0:t.validity),Tr(`Validity set to: ${t==null?void 0:t.validity}`)()}return w`
<auro-datepicker required id="validityExample">
  <span slot="bib.fullscreen.headline">validity Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-button id="validityExampleBtn" @click="${s}">Get validity</auro-button>
  `},parameters:{docs:{source:{type:"code"}}}},at={render:()=>w`
<auro-datepicker id="valueExample" value="02/02/2022">
  <span slot="bib.fullscreen.headline">value Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},st={render:()=>w`
<auro-datepicker id="valueEndExample" range valueEnd="03/03/2023">
  <span slot="bib.fullscreen.headline">valueEnd Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},rt={render:()=>w`
<auro-datepicker format="yyyy/mm/dd">
  <span slot="bib.fullscreen.headline">Format Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},nt={render:()=>{function s(){const e=document.querySelector("#focusExampleElem");e==null||e.focus()}function t(){const e=document.querySelector("#focusExampleElem");e==null||e.focus("endDate")}return w`
<auro-datepicker id="focusExampleElem" range>
  <span slot="bib.fullscreen.headline">Focus Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>

<auro-button id="focusExampleBtn" @click="${s}">Apply focus to datepicker</auro-button>
<auro-button id="focusExampleBtnTwo" @click="${t}">Apply focus to the second input in datepicker</auro-button>
  `},parameters:{docs:{source:{type:"code"}}}},it={render:()=>w`
<auro-datepicker>
  <span slot="bib.fullscreen.headline">helpText Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  <span slot="helpText">Choose a date must be today or earlier.</span>
</auro-datepicker>
  `},ot={render:()=>w`
<auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
  <span slot="bib.fullscreen.headline">dateSlot Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  <span slot="date_12_03_2023">Sold</span>
  <span highlight slot="date_12_04_2023">$89</span>
  <span slot="date_12_05_2023">$100</span>
  <span slot="date_12_06_2023">$2345</span>
  <span highlight slot="date_12_07_2023">$149</span>
  <span highlight slot="date_12_08_2023">$382</span>
  <span slot="date_12_09_2023">$560</span>
</auro-datepicker>
  `},lt={render:()=>w`
<auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
  <span slot="bib.fullscreen.headline">Popover Slot Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  <span slot="popover_12_03_2023">Tickets for this day are sold out</span>
  <span slot="popover_12_04_2023">Tickets for this day are $89</span>
  <span slot="popover_12_05_2023">Tickets for this day are $100</span>
  <span slot="popover_12_06_2023">Tickets for this day are $2345</span>
  <span slot="popover_12_07_2023">Tickets for this day are $149</span>
  <span slot="popover_12_08_2023">Tickets for this day are $382</span>
  <span slot="popover_12_09_2023">Tickets for this day are $560</span>
</auro-datepicker>
  `},ct={render:()=>{function s(){const e=document.querySelector("#localizationExample");e&&(e.monthNames=["일월","이월","삼월","사월","오월","유월","칠월","팔월","구월","시월","십일월","십이월"])}const t=w`
<auro-datepicker format="yyyy/mm/dd" id="localizationExample">
  <span slot="bib.fullscreen.headline">Localization Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
    `;return setTimeout(s,0),t},parameters:{docs:{source:{type:"code"}}},async beforeEach(){return $e.set("2025-03-18"),()=>{$e.reset()}},async play({canvas:s,step:t}){const e=await s.findByShadowRole("textbox");await se.click(e),be(await yt.findByShadowText("삼월"))}},dt={render:()=>{function s(){const t=document.querySelector("#resetStateExample");t==null||t.reset()}return w`
<auro-datepicker id="resetStateExample" range minDate="06/30/2025" calendarStartDate="06/30/2025" calendarFocusDate="06/30/2025" value="02/14/2025" valueEnd="04/05/2025" setCustomValidityRangeUnderflow="The date you entered is too early.">
  <span slot="bib.fullscreen.headline">Reset Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>

<auro-button id="resetStateBtn" @click="${s}">Reset</auro-button>
  `},parameters:{docs:{source:{type:"code"}}}},ht={render:()=>{function s(t){t.detail.expanded&&[{slot:"date",month:"12",day:"1",year:2023,content:"Sold"},{slot:"date",month:"12",day:"2",year:2023,content:"Sold"},{slot:"date",month:"12",day:"3",year:2023,content:"Sold"},{slot:"date",month:"12",day:"4",year:2023,content:"Sold"},{slot:"date",month:"12",day:"5",year:2023,content:"Sold"},{slot:"date",month:"12",day:"6",year:2023,content:"Sold"},{slot:"date",month:"12",day:"7",year:2023,content:"Sold"},{slot:"date",month:"12",day:"8",year:2023,content:"Sold"},{slot:"date",month:"12",day:"9",year:2023,content:"Sold"},{slot:"date",month:"12",day:"10",year:2023,content:"Sold"},{slot:"date",month:"12",day:"11",year:2023,content:"Sold"},{slot:"date",month:"12",day:"12",year:2023,content:"Sold"},{slot:"date",month:"12",day:"13",year:2023,content:"$560"},{slot:"date",month:"12",day:"14",year:2023,content:"$89",highlight:!0},{slot:"date",month:"12",day:"15",year:2023,content:"$100"},{slot:"date",month:"12",day:"16",year:2023,content:"$2345"},{slot:"date",month:"12",day:"17",year:2023,content:"$2345"},{slot:"date",month:"12",day:"18",year:2023,content:"$2345"},{slot:"date",month:"12",day:"19",year:2023,content:"$2345"},{slot:"date",month:"12",day:"20",year:2023,content:"$2345"},{slot:"date",month:"12",day:"21",year:2023,content:"$2345"},{slot:"date",month:"12",day:"22",year:2023,content:"$2345"},{slot:"date",month:"12",day:"23",year:2023,content:"$2345"},{slot:"date",month:"12",day:"24",year:2023,content:"$2345"},{slot:"date",month:"12",day:"25",year:2023,content:"$2345"},{slot:"date",month:"12",day:"26",year:2023,content:"$2345"},{slot:"date",month:"12",day:"27",year:2023,content:"$2345"},{slot:"date",month:"12",day:"28",year:2023,content:"$2345"},{slot:"date",month:"12",day:"29",year:2023,content:"$2345"},{slot:"date",month:"12",day:"30",year:2023,content:"$2345"},{slot:"date",month:"12",day:"31",year:2023,content:"$2345"},{slot:"date",month:"1",day:"14",year:2024,content:"$83",highlight:!0},{slot:"date",month:"1",day:"15",year:2024,content:"$203"},{slot:"date",month:"1",day:"16",year:2024,content:"$4444"},{slot:"date",month:"1",day:"17",year:2024,content:"$83",highlight:!0},{slot:"date",month:"1",day:"18",year:2024,content:"$96",highlight:!0},{slot:"date",month:"1",day:"19",year:2024,content:"Sold"},{slot:"date",month:"1",day:"20",year:2024,content:"Sold"},{slot:"popover",month:"12",day:"1",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"2",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"3",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"4",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"5",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"6",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"7",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"8",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"9",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"10",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"11",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"12",year:2023,content:"Tickets for this date are sold out"},{slot:"popover",month:"12",day:"13",year:2023,content:"Tickets for this date are $560"},{slot:"popover",month:"12",day:"14",year:2023,content:"Tickets for this date are $89"},{slot:"popover",month:"12",day:"15",year:2023,content:"Tickets for this date are $100"},{slot:"popover",month:"12",day:"16",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"17",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"18",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"19",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"20",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"21",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"22",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"23",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"24",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"25",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"26",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"27",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"28",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"29",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"30",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"12",day:"31",year:2023,content:"Tickets for this date are $2345"},{slot:"popover",month:"1",day:"14",year:2024,content:"Tickets for this date are $83"},{slot:"popover",month:"1",day:"15",year:2024,content:"Tickets for this date are $203"},{slot:"popover",month:"1",day:"16",year:2024,content:"Tickets for this date are $4444"},{slot:"popover",month:"1",day:"17",year:2024,content:"Tickets for this date are $83"},{slot:"popover",month:"1",day:"18",year:2024,content:"Tickets for this date are $96"},{slot:"popover",month:"1",day:"19",year:2024,content:"Tickets for this date are sold out"},{slot:"popover",month:"1",day:"20",year:2024,content:"Tickets for this date are sold out"}].forEach(a=>{const r=document.createElement("span");a.month.toString().length===1&&(a.month="0"+a.month),a.day.toString().length===1&&(a.day="0"+a.day);const n=`${a.slot}_${a.month}_${a.day}_${a.year}`;r.setAttribute("slot",n),r.textContent=a.content,a.slot==="date"&&a.highlight&&r.setAttribute("highlight",a.highlight?"true":"false"),this.appendChild(r)}),this.pushSlotContent()}return w`
<auro-datepicker id="slotContentExample" @auroDatePicker-toggled=${s} centralDate="12/13/2023" minDate="12/13/2023" maxDate="01/18/2024" range>
  <span slot="bib.fullscreen.headline">dynamic slot  Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},parameters:{docs:{source:{type:"code"}}}},ut={render:()=>{function s(){console.warn("Select value changed to:",this.value),Tr(`Select value changed to: ${this.value}`)()}return w`
<auro-datepicker id="datePickerValueAlert" @auroDatePicker-valueSet="${s}">
  <span slot="bib.fullscreen.headline">Alert Value Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},parameters:{docs:{source:{type:"code"}}}},pt={render:()=>{function s(){const t=document.querySelector("#datepicker-dialog");t==null||t.setAttribute("open","true")}return w`
<div>
  <auro-button id="datepicker-dialog-opener" @click="${s}">Datepicker in Dialog</auro-button>

  <auro-dialog id="datepicker-dialog">
    <span slot="bib.fullscreen.headline">inDialog Example</span>
    <span slot="header">Datepicker in Dialog</span>
    <div slot="content">
      <auro-datepicker />
    </div>
  </auro-dialog>
</div>
  `},parameters:{docs:{source:{type:"code"}}}},mt={render:()=>w`
<auro-datepicker centralDate="06/16/1980">
  <span slot="bib.fullscreen.headline">centralDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `},ft={render:()=>w`
<custom-datepicker selectedDate="06/16/2022">
  <span slot="bib.fullscreen.headline">custom-datepicker Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</custom-datepicker>
  `},gt={render:()=>w`
<auro-datepicker selectedDate="06/16/2022">
  <span slot="bib.fullscreen.headline">selectedDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  `};var Ia,Va,qa;Ve.parameters={...Ve.parameters,docs:{...(Ia=Ve.parameters)==null?void 0:Ia.docs,source:{originalSource:`{
  render: args => template(args),
  args: {}
}`,...(qa=(Va=Ve.parameters)==null?void 0:Va.docs)==null?void 0:qa.source}}};var Ua,Wa,Ya;Te.parameters={...Te.parameters,docs:{...(Ua=Te.parameters)==null?void 0:Ua.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker>
  <span slot="bib.fullscreen.headline">Datepicker Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`
}`,...(Ya=(Wa=Te.parameters)==null?void 0:Wa.docs)==null?void 0:Ya.source}}};var ja,Ga,Xa;qe.parameters={...qe.parameters,docs:{...(ja=qe.parameters)==null?void 0:ja.docs,source:{originalSource:`{
  ...Basic,
  async play({
    canvas
  }) {
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);
  }
}`,...(Xa=(Ga=qe.parameters)==null?void 0:Ga.docs)==null?void 0:Xa.source}}};var Qa,Ja,Ka;Me.parameters={...Me.parameters,docs:{...(Qa=Me.parameters)==null?void 0:Qa.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker range>
  <span slot="bib.fullscreen.headline">Datepicker Range Headline</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Roundtrip</span>
</auro-datepicker>
  \`
}`,...(Ka=(Ja=Me.parameters)==null?void 0:Ja.docs)==null?void 0:Ka.source}}};var Za,es,ts;Ue.parameters={...Ue.parameters,docs:{...(Za=Ue.parameters)==null?void 0:Za.docs,source:{originalSource:`{
  ...BasicRange,
  async play({
    canvas
  }) {
    const datepickerInput = (await canvas.findAllByShadowRole('textbox'))[0];
    await userEvent.click(datepickerInput);
  }
}`,...(ts=(es=Ue.parameters)==null?void 0:es.docs)==null?void 0:ts.source}}};var as,ss,rs;We.parameters={...We.parameters,docs:{...(as=We.parameters)==null?void 0:as.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker disabled>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`
}`,...(rs=(ss=We.parameters)==null?void 0:ss.docs)==null?void 0:rs.source}}};var ns,is,os;Ye.parameters={...Ye.parameters,docs:{...(ns=Ye.parameters)==null?void 0:ns.docs,source:{originalSource:`{
  render: () => {
    function handleSetErrorClick() {
      const datePicker: AuroDatePicker | null = document.querySelector('#errorExample');
      datePicker?.removeAttribute('error');
      datePicker?.setAttribute('error', 'Custom New Error');
    }
    function handleRemoveErrorClick() {
      const datePicker: AuroDatePicker | null = document.querySelector('#errorExample');
      datePicker?.removeAttribute('error');
    }
    return html\`
<auro-datepicker error="Custom error message" id="errorExample">
  <span slot="bib.fullscreen.headline">Error Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>

<auro-button id="undefinedValueExampleBtnAddError" @click="\${handleSetErrorClick}">Set Error</auro-button>
<auro-button id="undefinedValueExampleBtnRemoveError" @click="\${handleRemoveErrorClick}">Remove Error</auro-button
>
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
    const removeErrorButton = await canvas.findByShadowRole('button', {
      name: 'Remove Error'
    });
    await userEvent.click(removeErrorButton);
    await waitFor(() => {
      expect(canvas.queryByShadowRole('alert')).not.toBeInTheDocument();
    });
    const setErrorButton = await canvas.findByShadowRole('button', {
      name: 'Set Error'
    });
    await userEvent.click(setErrorButton);
    expect(await canvas.findByShadowRole('alert')).toHaveTextContent('Custom New Error');
  }
}`,...(os=(is=Ye.parameters)==null?void 0:is.docs)==null?void 0:os.source}}};var ls,cs,ds;je.parameters={...je.parameters,docs:{...(ls=je.parameters)==null?void 0:ls.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker
  calendarStartDate="01/01/2022"
  calendarEndDate="06/01/2022"
>
  <span slot="bib.fullscreen.headline"
    >calendarStartDate & calendarEndDate Example</span
  >
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
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
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);

    // No role on the heading and the text is split into \`div\`s, so had to resort to this
    expect((await screen.findByShadowText(/January/i)).parentNode).toHaveTextContent(/January 2022/i);
    const nextMonthButton = await screen.findByShadowRole('button', {
      name: /Directional indicator; right/i
    });
    await step('Navigate to end date', async () => {
      for (let i = 0; i < 5; i++) {
        await userEvent.click(nextMonthButton);
      }
    });

    // No role on the heading and the text is split into \`div\`s, so had to resort to this
    expect((await screen.findByShadowText(/June/i)).parentNode).toHaveTextContent(/June 2022/i);
    await waitFor(() => {
      expect(nextMonthButton).not.toBeInTheDocument();
    });
  }
}`,...(ds=(cs=je.parameters)==null?void 0:cs.docs)==null?void 0:ds.source}}};var hs,us,ps;Ge.parameters={...Ge.parameters,docs:{...(hs=Ge.parameters)==null?void 0:hs.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker
  calendarStartDate="01/01/2022"
  calendarEndDate="12/01/2023"
  calendarFocusDate="11/01/2022"
>
  <span slot="bib.fullscreen.headline">calendarFocusDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
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
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);

    // No role on the heading and the text is split into \`div\`s, so had to resort to this
    expect((await screen.findByShadowText(/November/i)).parentNode).toHaveTextContent(/November 2022/i);
  }
}`,...(ps=(us=Ge.parameters)==null?void 0:us.docs)==null?void 0:ps.source}}};var ms,fs,gs;Xe.parameters={...Xe.parameters,docs:{...(ms=Xe.parameters)==null?void 0:ms.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker
  maxDate="03/25/2023"
  setCustomValidityRangeOverflow="Selected date is later than maximum date."
>
  <span slot="bib.fullscreen.headline">maxDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`,
  async play({
    canvas,
    step
  }) {
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);
  }
}`,...(gs=(fs=Xe.parameters)==null?void 0:fs.docs)==null?void 0:gs.source}}};var ys,vs,ws;Qe.parameters={...Qe.parameters,docs:{...(ys=Qe.parameters)==null?void 0:ys.docs,source:{originalSource:`{
  render: () => {
    function setup() {
      const datepicker: AuroDatePicker | null = document.querySelector('#maxDateExample');
      const changeMaxDateButton = document.querySelector('#maxDateChange');
      const resetButton = document.querySelector('#resetMaxDate');
      const today = formatDateString(new Date());
      let nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const nextWeekStr = formatDateString(nextWeek);
      datepicker?.setAttribute('value', nextWeekStr);
      datepicker?.setAttribute('maxDate', nextWeekStr);
      changeMaxDateButton?.addEventListener('click', () => {
        datepicker?.setAttribute('maxDate', today);
      });
      resetButton?.addEventListener('click', () => {
        datepicker?.setAttribute('value', nextWeekStr);
        datepicker?.setAttribute('maxDate', nextWeekStr);
      });
    }
    const template = html\`
<auro-datepicker
  id="maxDateExample"
  setCustomValidityRangeOverflow="Selected date is later than maximum date."
>
  <span slot="bib.fullscreen.headline">maxDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-button id="maxDateChange">Change maxDate to 03/18/25</auro-button>
<auro-button id="resetMaxDate"
  >Reset Datepicker to Initial Example</auro-button
>
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
  async beforeEach() {
    MockDate.set('2025-03-18');
    return () => {
      MockDate.reset();
    };
  },
  async play({
    canvas,
    step
  }) {
    const maxDateButton = await canvas.findByShadowRole('button', {
      name: /Change maxDate to/i
    });
    await userEvent.click(maxDateButton);

    // TODO: Cannot find this button
    // const firstPastMax = await screen.findByShadowRole('button', { name: '18', hidden: true });
    // expect(firstPastMax).toBeDisabled();

    // console.log(await screen.findAllByShadowRole('button', { hidden: true }));
  }
}`,...(ws=(vs=Qe.parameters)==null?void 0:vs.docs)==null?void 0:ws.source}}};var bs,xs,ks;Je.parameters={...Je.parameters,docs:{...(bs=Je.parameters)==null?void 0:bs.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker
  minDate="03/25/2028"
  setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date."
>
  <span slot="bib.fullscreen.headline">minDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`
}`,...(ks=(xs=Je.parameters)==null?void 0:xs.docs)==null?void 0:ks.source}}};var Ds,Ss,Cs;Ke.parameters={...Ke.parameters,docs:{...(Ds=Ke.parameters)==null?void 0:Ds.docs,source:{originalSource:`{
  render: () => {
    function setup() {
      const datepicker: AuroDatePicker | null = document.querySelector('#minDateExample');
      const changeMinDateButton = document.querySelector('#minDateChange');
      const resetButton = document.querySelector('#resetMinDate');
      const today = formatDateString(new Date());
      let nextWeek = new Date();
      let addOneWeek = nextWeek.getDate() + 7;
      nextWeek.setDate(addOneWeek);
      const nextWeekStr = formatDateString(nextWeek);
      datepicker?.setAttribute('value', today);
      datepicker?.setAttribute('minDate', today);
      changeMinDateButton?.addEventListener('click', () => {
        datepicker?.setAttribute('minDate', nextWeekStr);
      });
      resetButton?.addEventListener('click', () => {
        datepicker?.setAttribute('value', today);
        datepicker?.setAttribute('minDate', today);
      });
    }
    const template = html\`
<auro-datepicker
  id="minDateExample"
  setCustomValidityRangeUnderflow="Selected date is earlier than the minimum date."
>
  <span slot="bib.fullscreen.headline">minDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-button id="minDateChange"
  >Change minDate to a week from Today</auro-button
>
<auro-button id="resetMinDate"
  >Reset Datepicker to Initial Example</auro-button
>
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
  async beforeEach() {
    MockDate.set('2025-03-18');
    return () => {
      MockDate.reset();
    };
  },
  async play({
    canvas,
    step
  }) {
    const maxDateButton = await canvas.findByShadowRole('button', {
      name: /Change minDate to/i
    });
    await userEvent.click(maxDateButton);

    // TODO: Cannot find this button
    // const lastBeforeMin = await screen.findByShadowRole('button', { name: '16', hidden: true });
    // expect(lastBeforeMin).toBeDisabled();

    // console.log(await screen.findAllByShadowRole('button', { hidden: true }));
  }
}`,...(Cs=(Ss=Ke.parameters)==null?void 0:Ss.docs)==null?void 0:Cs.source}}};var Ts,Ms,$s;Ze.parameters={...Ze.parameters,docs:{...(Ts=Ze.parameters)==null?void 0:Ts.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker required noValidate>
  <span slot="bib.fullscreen.headline">noValidate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`
}`,...($s=(Ms=Ze.parameters)==null?void 0:Ms.docs)==null?void 0:$s.source}}};var Es,As,Rs;et.parameters={...et.parameters,docs:{...(Es=et.parameters)==null?void 0:Es.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker
  required
  setCustomValidityValueMissing="Custom value missing message."
>
  <span slot="bib.fullscreen.headline">Required Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-datepicker
  required
  range
  setCustomValidityValueMissing="Custom value missing message."
>
  <span slot="bib.fullscreen.headline">Required Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Roundtrip</span>
</auro-datepicker>
  \`
}`,...(Rs=(As=et.parameters)==null?void 0:As.docs)==null?void 0:Rs.source}}};var Fs,Ls,Os;tt.parameters={...tt.parameters,docs:{...(Fs=tt.parameters)==null?void 0:Fs.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const datepicker: AuroDatePicker | null = document.querySelector('#validityExample');
      console.warn('Validity set to:', datepicker?.validity);
      action(\`Validity set to: \${datepicker?.validity}\`)();
    }
    return html\`
<auro-datepicker required id="validityExample">
  <span slot="bib.fullscreen.headline">validity Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
<auro-button id="validityExampleBtn" @click="\${handleClick}">Get validity</auro-button>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(Os=(Ls=tt.parameters)==null?void 0:Ls.docs)==null?void 0:Os.source}}};var Bs,zs,Ns;at.parameters={...at.parameters,docs:{...(Bs=at.parameters)==null?void 0:Bs.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker id="valueExample" value="02/02/2022">
  <span slot="bib.fullscreen.headline">value Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`
}`,...(Ns=(zs=at.parameters)==null?void 0:zs.docs)==null?void 0:Ns.source}}};var Hs,Ps,_s;st.parameters={...st.parameters,docs:{...(Hs=st.parameters)==null?void 0:Hs.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker id="valueEndExample" range valueEnd="03/03/2023">
  <span slot="bib.fullscreen.headline">valueEnd Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`
}`,...(_s=(Ps=st.parameters)==null?void 0:Ps.docs)==null?void 0:_s.source}}};var Is,Vs,qs;rt.parameters={...rt.parameters,docs:{...(Is=rt.parameters)==null?void 0:Is.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker format="yyyy/mm/dd">
  <span slot="bib.fullscreen.headline">Format Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`
}`,...(qs=(Vs=rt.parameters)==null?void 0:Vs.docs)==null?void 0:qs.source}}};var Us,Ws,Ys;nt.parameters={...nt.parameters,docs:{...(Us=nt.parameters)==null?void 0:Us.docs,source:{originalSource:`{
  render: () => {
    function handleFocus1Click() {
      const datepicker: AuroDatePicker | null = document.querySelector('#focusExampleElem');
      // @ts-expect-error - TODO: \`AuroDatePicker['focus']\` is not typed to accept zero arguments
      datepicker?.focus();
    }
    function handleFocus2Click() {
      const datepicker: AuroDatePicker | null = document.querySelector('#focusExampleElem');
      datepicker?.focus('endDate');
    }
    return html\`
<auro-datepicker id="focusExampleElem" range>
  <span slot="bib.fullscreen.headline">Focus Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>

<auro-button id="focusExampleBtn" @click="\${handleFocus1Click}">Apply focus to datepicker</auro-button>
<auro-button id="focusExampleBtnTwo" @click="\${handleFocus2Click}">Apply focus to the second input in datepicker</auro-button>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(Ys=(Ws=nt.parameters)==null?void 0:Ws.docs)==null?void 0:Ys.source}}};var js,Gs,Xs;it.parameters={...it.parameters,docs:{...(js=it.parameters)==null?void 0:js.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker>
  <span slot="bib.fullscreen.headline">helpText Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  <span slot="helpText">Choose a date must be today or earlier.</span>
</auro-datepicker>
  \`
}`,...(Xs=(Gs=it.parameters)==null?void 0:Gs.docs)==null?void 0:Xs.source}}};var Qs,Js,Ks;ot.parameters={...ot.parameters,docs:{...(Qs=ot.parameters)==null?void 0:Qs.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
  <span slot="bib.fullscreen.headline">dateSlot Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  <span slot="date_12_03_2023">Sold</span>
  <span highlight slot="date_12_04_2023">$89</span>
  <span slot="date_12_05_2023">$100</span>
  <span slot="date_12_06_2023">$2345</span>
  <span highlight slot="date_12_07_2023">$149</span>
  <span highlight slot="date_12_08_2023">$382</span>
  <span slot="date_12_09_2023">$560</span>
</auro-datepicker>
  \`
}`,...(Ks=(Js=ot.parameters)==null?void 0:Js.docs)==null?void 0:Ks.source}}};var Zs,er,tr;lt.parameters={...lt.parameters,docs:{...(Zs=lt.parameters)==null?void 0:Zs.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker centralDate="12/03/2023" minDate="12/04/2023" maxDate="12/09/2023">
  <span slot="bib.fullscreen.headline">Popover Slot Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
  <span slot="popover_12_03_2023">Tickets for this day are sold out</span>
  <span slot="popover_12_04_2023">Tickets for this day are $89</span>
  <span slot="popover_12_05_2023">Tickets for this day are $100</span>
  <span slot="popover_12_06_2023">Tickets for this day are $2345</span>
  <span slot="popover_12_07_2023">Tickets for this day are $149</span>
  <span slot="popover_12_08_2023">Tickets for this day are $382</span>
  <span slot="popover_12_09_2023">Tickets for this day are $560</span>
</auro-datepicker>
  \`
}`,...(tr=(er=lt.parameters)==null?void 0:er.docs)==null?void 0:tr.source}}};var ar,sr,rr;ct.parameters={...ct.parameters,docs:{...(ar=ct.parameters)==null?void 0:ar.docs,source:{originalSource:`{
  render: () => {
    function setup() {
      const datepicker: AuroDatePicker | null = document.querySelector("#localizationExample");
      if (datepicker) {
        datepicker.monthNames = ['일월', '이월', '삼월', '사월', '오월', '유월', '칠월', '팔월', '구월', '시월', '십일월', '십이월'];
      }
    }
    const template = html\`
<auro-datepicker format="yyyy/mm/dd" id="localizationExample">
  <span slot="bib.fullscreen.headline">Localization Headline</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
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
  },
  async beforeEach() {
    MockDate.set('2025-03-18');
    return () => {
      MockDate.reset();
    };
  },
  async play({
    canvas,
    step
  }) {
    const datepickerInput = await canvas.findByShadowRole('textbox');
    await userEvent.click(datepickerInput);

    // TODO: Not sure why this isn't working. Once it does, Chromatic snapshot can be disabled
    expect(await screen.findByShadowText('삼월'));
  }
}`,...(rr=(sr=ct.parameters)==null?void 0:sr.docs)==null?void 0:rr.source}}};var nr,ir,or;dt.parameters={...dt.parameters,docs:{...(nr=dt.parameters)==null?void 0:nr.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const datepicker: AuroDatePicker | null = document.querySelector('#resetStateExample');
      datepicker?.reset();
    }
    ;
    return html\`
<auro-datepicker id="resetStateExample" range minDate="06/30/2025" calendarStartDate="06/30/2025" calendarFocusDate="06/30/2025" value="02/14/2025" valueEnd="04/05/2025" setCustomValidityRangeUnderflow="The date you entered is too early.">
  <span slot="bib.fullscreen.headline">Reset Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>

<auro-button id="resetStateBtn" @click="\${handleClick}">Reset</auro-button>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(or=(ir=dt.parameters)==null?void 0:ir.docs)==null?void 0:or.source}}};var lr,cr,dr;ht.parameters={...ht.parameters,docs:{...(lr=ht.parameters)==null?void 0:lr.docs,source:{originalSource:`{
  render: () => {
    // Insert slot content when the datepicker has been opened
    function populateSlotContentExample(event) {
      if (event.detail.expanded) {
        // Array of object(s) containing key, value pairs defining what slot content to render
        const data = [{
          slot: 'date',
          month: '12',
          day: '1',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '2',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '3',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '4',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '5',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '6',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '7',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '8',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '9',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '10',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '11',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '12',
          year: 2023,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '12',
          day: '13',
          year: 2023,
          content: '$560'
        }, {
          slot: 'date',
          month: '12',
          day: '14',
          year: 2023,
          content: '$89',
          highlight: true
        }, {
          slot: 'date',
          month: '12',
          day: '15',
          year: 2023,
          content: '$100'
        }, {
          slot: 'date',
          month: '12',
          day: '16',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '17',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '18',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '19',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '20',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '21',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '22',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '23',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '24',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '25',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '26',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '27',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '28',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '29',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '30',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '12',
          day: '31',
          year: 2023,
          content: '$2345'
        }, {
          slot: 'date',
          month: '1',
          day: '14',
          year: 2024,
          content: '$83',
          highlight: true
        }, {
          slot: 'date',
          month: '1',
          day: '15',
          year: 2024,
          content: '$203'
        }, {
          slot: 'date',
          month: '1',
          day: '16',
          year: 2024,
          content: '$4444'
        }, {
          slot: 'date',
          month: '1',
          day: '17',
          year: 2024,
          content: '$83',
          highlight: true
        }, {
          slot: 'date',
          month: '1',
          day: '18',
          year: 2024,
          content: '$96',
          highlight: true
        }, {
          slot: 'date',
          month: '1',
          day: '19',
          year: 2024,
          content: 'Sold'
        }, {
          slot: 'date',
          month: '1',
          day: '20',
          year: 2024,
          content: 'Sold'
        }, {
          slot: 'popover',
          month: '12',
          day: '1',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '2',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '3',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '4',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '5',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '6',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '7',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '8',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '9',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '10',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '11',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '12',
          year: 2023,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '12',
          day: '13',
          year: 2023,
          content: 'Tickets for this date are $560'
        }, {
          slot: 'popover',
          month: '12',
          day: '14',
          year: 2023,
          content: 'Tickets for this date are $89'
        }, {
          slot: 'popover',
          month: '12',
          day: '15',
          year: 2023,
          content: 'Tickets for this date are $100'
        }, {
          slot: 'popover',
          month: '12',
          day: '16',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '17',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '18',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '19',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '20',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '21',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '22',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '23',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '24',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '25',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '26',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '27',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '28',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '29',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '30',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '12',
          day: '31',
          year: 2023,
          content: 'Tickets for this date are $2345'
        }, {
          slot: 'popover',
          month: '1',
          day: '14',
          year: 2024,
          content: 'Tickets for this date are $83'
        }, {
          slot: 'popover',
          month: '1',
          day: '15',
          year: 2024,
          content: 'Tickets for this date are $203'
        }, {
          slot: 'popover',
          month: '1',
          day: '16',
          year: 2024,
          content: 'Tickets for this date are $4444'
        }, {
          slot: 'popover',
          month: '1',
          day: '17',
          year: 2024,
          content: 'Tickets for this date are $83'
        }, {
          slot: 'popover',
          month: '1',
          day: '18',
          year: 2024,
          content: 'Tickets for this date are $96'
        }, {
          slot: 'popover',
          month: '1',
          day: '19',
          year: 2024,
          content: 'Tickets for this date are sold out'
        }, {
          slot: 'popover',
          month: '1',
          day: '20',
          year: 2024,
          content: 'Tickets for this date are sold out'
        }];

        // For each item in the array, parse the keys into an HTML element and insert it into the DOM
        data.forEach(item => {
          // Create the new element for the slot content
          const slotElement = document.createElement('span');
          if (item.month.toString().length === 1) {
            item.month = \`0\` + item.month;
          }
          if (item.day.toString().length === 1) {
            item.day = \`0\` + item.day;
          }

          // Create the slot name from the item's keys
          const slotName = \`\${item.slot}_\${item.month}_\${item.day}_\${item.year}\`;

          // Set the slot name and content
          slotElement.setAttribute('slot', slotName);
          slotElement.textContent = item.content;

          // Set the 'highlight' attribute on date slot content
          if (item.slot === 'date' && item.highlight) {
            slotElement.setAttribute('highlight', item.highlight ? 'true' : 'false');
          }

          // Append the new element to the DOM
          this.appendChild(slotElement);
        });
      }
      this.pushSlotContent();
    }
    ;
    return html\`
<auro-datepicker id="slotContentExample" @auroDatePicker-toggled=\${populateSlotContentExample} centralDate="12/13/2023" minDate="12/13/2023" maxDate="01/18/2024" range>
  <span slot="bib.fullscreen.headline">dynamic slot  Example</span>
  <span slot="fromLabel">Departure</span>
  <span slot="toLabel">Return</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(dr=(cr=ht.parameters)==null?void 0:cr.docs)==null?void 0:dr.source}}};var hr,ur,pr;ut.parameters={...ut.parameters,docs:{...(hr=ut.parameters)==null?void 0:hr.docs,source:{originalSource:`{
  render: () => {
    function handleValueSet() {
      console.warn('Select value changed to:', this.value);
      action(\`Select value changed to: \${this.value}\`)();
    }
    return html\`
<auro-datepicker id="datePickerValueAlert" @auroDatePicker-valueSet="\${handleValueSet}">
  <span slot="bib.fullscreen.headline">Alert Value Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`;
  },
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}`,...(pr=(ur=ut.parameters)==null?void 0:ur.docs)==null?void 0:pr.source}}};var mr,fr,gr;pt.parameters={...pt.parameters,docs:{...(mr=pt.parameters)==null?void 0:mr.docs,source:{originalSource:`{
  render: () => {
    function handleClick() {
      const dialog = document.querySelector("#datepicker-dialog");
      dialog?.setAttribute('open', 'true');
    }
    return html\`
<div>
  <auro-button id="datepicker-dialog-opener" @click="\${handleClick}">Datepicker in Dialog</auro-button>

  <auro-dialog id="datepicker-dialog">
    <span slot="bib.fullscreen.headline">inDialog Example</span>
    <span slot="header">Datepicker in Dialog</span>
    <div slot="content">
      <auro-datepicker />
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
}`,...(gr=(fr=pt.parameters)==null?void 0:fr.docs)==null?void 0:gr.source}}};var yr,vr,wr;mt.parameters={...mt.parameters,docs:{...(yr=mt.parameters)==null?void 0:yr.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker centralDate="06/16/1980">
  <span slot="bib.fullscreen.headline">centralDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`
}`,...(wr=(vr=mt.parameters)==null?void 0:vr.docs)==null?void 0:wr.source}}};var br,xr,kr;ft.parameters={...ft.parameters,docs:{...(br=ft.parameters)==null?void 0:br.docs,source:{originalSource:`{
  render: () => html\`
<custom-datepicker selectedDate="06/16/2022">
  <span slot="bib.fullscreen.headline">custom-datepicker Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</custom-datepicker>
  \`
}`,...(kr=(xr=ft.parameters)==null?void 0:xr.docs)==null?void 0:kr.source}}};var Dr,Sr,Cr;gt.parameters={...gt.parameters,docs:{...(Dr=gt.parameters)==null?void 0:Dr.docs,source:{originalSource:`{
  render: () => html\`
<auro-datepicker selectedDate="06/16/2022">
  <span slot="bib.fullscreen.headline">selectedDate Example</span>
  <span slot="fromLabel">Choose a date</span>
  <span slot="bib.fullscreen.dateLabel">Choose a date</span>
</auro-datepicker>
  \`
}`,...(Cr=(Sr=gt.parameters)==null?void 0:Sr.docs)==null?void 0:Cr.source}}};const uc=["Playground","Basic","BasicOpen","BasicRange","BasicRangeOpen","Disabled","Error","CalendarStartAndEndDate","CalendarFocusDate","MaxDate","UpdateMaxDate","MinDate","UpdateMinDate","NoValidate","Required","Validity","Value","ValueEnd","Format","Focus","HelpText","DateSlot","PopoverSlot","Localization","ResetState","DynamicSlot","LogValue","InDialog","CentralDate","Custom","SelectedDate"],Ec=Object.freeze(Object.defineProperty({__proto__:null,Basic:Te,BasicOpen:qe,BasicRange:Me,BasicRangeOpen:Ue,CalendarFocusDate:Ge,CalendarStartAndEndDate:je,CentralDate:mt,Custom:ft,DateSlot:ot,Disabled:We,DynamicSlot:ht,Error:Ye,Focus:nt,Format:rt,HelpText:it,InDialog:pt,Localization:ct,LogValue:ut,MaxDate:Xe,MinDate:Je,NoValidate:Ze,Playground:Ve,PopoverSlot:lt,Required:et,ResetState:dt,SelectedDate:gt,UpdateMaxDate:Qe,UpdateMinDate:Ke,Validity:tt,Value:at,ValueEnd:st,__namedExportsOrder:uc,default:hc},Symbol.toStringTag,{value:"Module"}));export{Te as B,je as C,We as D,Ye as E,rt as F,it as H,pt as I,ct as L,Xe as M,Ze as N,lt as P,et as R,Qe as U,tt as V,Me as a,Ge as b,Je as c,Ke as d,at as e,st as f,nt as g,ot as h,dt as i,ht as j,ut as k,Ec as s};
