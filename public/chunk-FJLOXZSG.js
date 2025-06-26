import{la as e,pa as v,sa as M}from"./chunk-F2X7M4DW.js";import{B as h}from"./chunk-J6775IRK.js";import{$ as a,Ab as f,Tb as m,Ub as b,V as i,W as u,hb as d,hc as y,ia as r,ib as s,lb as l,vb as c,yb as I,zb as g}from"./chunk-VDH5VFWZ.js";var x=["*"],D=({dt:t})=>`
.p-inputgroup,
.p-inputgroup .p-floatlabel,
.p-inputgroup .p-iftalabel {
    display: flex;
    align-items: stretch;
    width: 100%;
}

.p-inputgroup .p-inputtext,
.p-inputgroup .p-inputwrapper {
    flex: 1 1 auto;
    width: 1%;
}

.p-inputgroupaddon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${t("inputgroup.addon.padding")};
    background: ${t("inputgroup.addon.background")};
    color: ${t("inputgroup.addon.color")};
    border-block-start: 1px solid ${t("inputgroup.addon.border.color")};
    border-block-end: 1px solid ${t("inputgroup.addon.border.color")};
    min-width: ${t("inputgroup.addon.min.width")};
}

.p-inputgroupaddon:first-child,
.p-inputgroupaddon + .p-inputgroupaddon {
    border-inline-start: 1px solid ${t("inputgroup.addon.border.color")};
}

.p-inputgroupaddon:last-child {
    border-inline-end: 1px solid ${t("inputgroup.addon.border.color")};
}

.p-inputgroupaddon:has(.p-button) {
    padding: 0;
    overflow: hidden;
}

.p-inputgroupaddon .p-button {
    border-radius: 0;
}

.p-inputgroup > .p-component,
.p-inputgroup > .p-inputwrapper > .p-component,
.p-inputgroup:first-child > p-button > .p-button,
.p-inputgroup > .p-floatlabel > .p-component,
.p-inputgroup > .p-floatlabel > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel > .p-component,
.p-inputgroup > .p-iftalabel > .p-inputwrapper > .p-component {
    border-radius: 0;
    margin: 0;
}

.p-inputgroupaddon:first-child,
.p-inputgroup > .p-component:first-child,
.p-inputgroup > .p-inputwrapper:first-child > .p-component,
.p-inputgroup > .p-floatlabel:first-child > .p-component,
.p-inputgroup > .p-floatlabel:first-child > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel:first-child > .p-component,
.p-inputgroup > .p-iftalabel:first-child > .p-inputwrapper > .p-component {
    border-start-start-radius: ${t("inputgroup.addon.border.radius")};
    border-end-start-radius: ${t("inputgroup.addon.border.radius")};
}

.p-inputgroupaddon:last-child,
.p-inputgroup > .p-component:last-child,
.p-inputgroup > .p-inputwrapper:last-child > .p-component,
.p-inputgroup > .p-floatlabel:last-child > .p-component,
.p-inputgroup > .p-floatlabel:last-child > .p-inputwrapper > .p-component,
.p-inputgroup > .p-iftalabel:last-child > .p-component,
.p-inputgroup > .p-iftalabel:last-child > .p-inputwrapper > .p-component {
    border-start-end-radius: ${t("inputgroup.addon.border.radius")};
    border-end-end-radius: ${t("inputgroup.addon.border.radius")};
}

.p-inputgroup .p-component:focus,
.p-inputgroup .p-component.p-focus,
.p-inputgroup .p-inputwrapper-focus,
.p-inputgroup .p-component:focus ~ label,
.p-inputgroup .p-component.p-focus ~ label,
.p-inputgroup .p-inputwrapper-focus ~ label {
    z-index: 1;
}

.p-inputgroup > .p-button:not(.p-button-icon-only) {
    width: auto;
}

/*For PrimeNG*/

.p-inputgroup p-button:first-child, .p-inputgroup p-button:last-child {
    display: inline-flex;
}

.p-inputgroup:has(> p-button:first-child) .p-button{
    border-start-start-radius: ${t("inputgroup.addon.border.radius")};
    border-end-start-radius: ${t("inputgroup.addon.border.radius")};
}

.p-inputgroup:has(> p-button:last-child) .p-button {
    border-start-end-radius: ${t("inputgroup.addon.border.radius")};
    border-end-end-radius: ${t("inputgroup.addon.border.radius")};
}
`,$={root:({props:t})=>["p-inputgroup",{"p-inputgroup-fluid":t.fluid}]},w=(()=>{class t extends v{name="inputgroup";theme=D;classes=$;static \u0275fac=(()=>{let p;return function(n){return(p||(p=r(t)))(n||t)}})();static \u0275prov=i({token:t,factory:t.\u0275fac})}return t})();var j=(()=>{class t extends M{style;styleClass;_componentStyle=a(w);static \u0275fac=(()=>{let p;return function(n){return(p||(p=r(t)))(n||t)}})();static \u0275cmp=d({type:t,selectors:[["p-inputgroup"],["p-inputGroup"],["p-input-group"]],hostAttrs:[1,"p-inputgroup"],hostVars:5,hostBindings:function(o,n){o&2&&(c("data-pc-name","inputgroup"),g(n.style),f(n.styleClass))},inputs:{style:"style",styleClass:"styleClass"},features:[y([w]),l],ngContentSelectors:x,decls:1,vars:0,template:function(o,n){o&1&&(m(),b(0))},dependencies:[h,e],encapsulation:2})}return t})(),E=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=s({type:t});static \u0275inj=u({imports:[j,e,e]})}return t})();var B=["*"],G={root:"p-inputgroupaddon"},F=(()=>{class t extends v{name="inputgroupaddon";classes=G;static \u0275fac=(()=>{let p;return function(n){return(p||(p=r(t)))(n||t)}})();static \u0275prov=i({token:t,factory:t.\u0275fac})}return t})(),S=(()=>{class t extends M{style;styleClass;_componentStyle=a(F);get hostStyle(){return this.style}static \u0275fac=(()=>{let p;return function(n){return(p||(p=r(t)))(n||t)}})();static \u0275cmp=d({type:t,selectors:[["p-inputgroup-addon"],["p-inputGroupAddon"]],hostVars:7,hostBindings:function(o,n){o&2&&(c("data-pc-name","inputgroupaddon"),g(n.hostStyle),f(n.styleClass),I("p-inputgroupaddon",!0))},inputs:{style:"style",styleClass:"styleClass"},features:[y([F]),l],ngContentSelectors:B,decls:1,vars:0,template:function(o,n){o&1&&(m(),b(0))},dependencies:[h],encapsulation:2})}return t})(),_=(()=>{class t{static \u0275fac=function(o){return new(o||t)};static \u0275mod=s({type:t});static \u0275inj=u({imports:[S,e,e]})}return t})();export{j as a,E as b,S as c,_ as d};
